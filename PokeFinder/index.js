import { GoogleGenerativeAI } from '@google/generative-ai';

// Sua chave de API configurada
const API_KEY = "AQ.Ab8RN6KwDQ8VJFRduFwEHNALTxs8Kd9QD6FvhUYc12mrPYLI3A"; 

// Ajustado para o formato correto da nova versão da biblioteca
const ai = new GoogleGenerativeAI(API_KEY);

const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

function adicionarMensagem(texto, remetente) {
  const msg = document.createElement('div');
  msg.classList.add('message', remetente);
  msg.innerText = texto;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const textoUsuario = userInput.value.trim();
  if (!textoUsuario) return;

  userInput.value = '';
  adicionarMensagem(textoUsuario, 'user');
  adicionarMensagem('Pensando...', 'bot');

  const ultimaMensagemBot = chatMessages.lastChild;

  try {
    const model = ai.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: 'Você é um Pokedex ambulante. O usuário vai descrever um Pokémon e você deve dizer qual é o nome dele em destaque, confirmar as características e contar uma curiosidade rápida.'
    });

    const resultado = await model.generateContent(textoUsuario);
    ultimaMensagemBot.innerText = resultado.response.text();
  } catch (erro) {
    console.error(erro);
    ultimaMensagemBot.innerText = 'Erro ao conectar com a Pokédex mental.';
  }
});