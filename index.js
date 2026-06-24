import { GoogleGenerativeAI } from '@google/generative-ai';

const CHAVE_API = ""; 

const ia = new GoogleGenerativeAI(CHAVE_API);

const mensagensChat = document.getElementById('chat-messages');
const formularioChat = document.getElementById('chat-form');
const entradaUsuario = document.getElementById('user-input');

function adicionarMensagem(texto, remetente) {
  const elementoMensagem = document.createElement('div');
  elementoMensagem.classList.add('message', remetente);
  elementoMensagem.innerText = texto;
  mensagensChat.appendChild(elementoMensagem);
  mensagensChat.scrollTop = mensagensChat.scrollHeight;
}

formularioChat.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const textoUsuario = entradaUsuario.value.trim();
  if (!textoUsuario) return;

  entradaUsuario.value = '';
  adicionarMensagem(textoUsuario, 'user');
  adicionarMensagem('Pensando...', 'bot');

  const ultimaMensagemBot = mensagensChat.lastChild;

  try {
    const modelo = ia.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: 'Você é um Pokedex ambulante. O usuário vai descrever um Pokémon e você deve dizer qual é o nome dele em destaque, confirmar as características e contar uma curiosidade rápida.'
    });

    const resultado = await modelo.generateContent(textoUsuario);
    ultimaMensagemBot.innerText = resultado.response.text();
  } catch (erro) {
    console.error(erro);
    ultimaMensagemBot.innerText = 'Erro ao conectar com a Pokédex mental.';
  }
});
