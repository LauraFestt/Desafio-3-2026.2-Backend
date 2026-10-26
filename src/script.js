//função de mudar imagem pelo id e pela url
function changeImage(id, url) {
  document.getElementById(id).src = url;
}
//função de mudar texto pelo id e pelo texto
function changeText(id, text) {
  document.getElementById(id).innerText = text;
}

// Daqui para baixo voce ira escrever
// o código para resolver o desafio

let listaPokemons = [];
let indexAtual = 0;

async function carregarPokemon(index) {
  const pokemon = listaPokemons[index];
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
  const data = await response.json();

  changeText("name", data.name);
  if (data.sprites && data.sprites.front_default) {
    changeImage("img_sprite_front_default", data.sprites.front_default);
  } else {
    changeImage("img_sprite_front_default", "../assets/missingno.png");
  }
}

async function iniciarPokedex() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1292");
  const data = await response.json();
  listaPokemons = data.results;
  await carregarPokemon(indexAtual);
}

async function previousPokemon() {
  if (listaPokemons.length === 0) return;

  if (indexAtual === 0) {
    indexAtual = listaPokemons.length - 1;
  } else {
    indexAtual--;
  }

  await carregarPokemon(indexAtual);
}

async function nextPokemon() {
  if (listaPokemons.length === 0) return;

  if (indexAtual === listaPokemons.length - 1) {
    indexAtual = 0;
  } else {
    indexAtual++;
  }

  await carregarPokemon(indexAtual);
}

iniciarPokedex();
