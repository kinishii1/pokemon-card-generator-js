const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};
const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");

const renderCard = (data) => {
  const hp = data.stats[0].base_stat;
  const imgSrc = data.sprites.other.dream_world.front_default;
  const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
  const statAttack = data.stats[1].base_stat;
  const statDefense = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;
  card.innerHTML = `
    <p class="hp">
      <span>HP</span>
      ${hp}
    </p>
    <img src='${imgSrc}' />
    <h2 class="poke-name">${pokeName}</h2>
    <div class="types">
    </div>
    <div class="stats">
      <div class='atk'>
        <h3>${statAttack}</h3>
        <p>Attack</p>
      </div>
      <div class='def'>
        <h3>${statDefense}</h3>
        <p>Defense</p>
      </div>
      <div class='speed'>
        <h3>${statSpeed}</h3>
        <p>Speed</p>
      </div>
    </div>`;
};

const setColorType = (data) => {
  const typesDiv = document.querySelector('.types');
  const dataTypes = data;
  typesDiv.innerHTML = '';
  card.style.background = `radial-gradient(circle at 50% 0%, ${typeColor[data[0].type.name]} 36%, #ffffff 60%)`;
  dataTypes.forEach((type) => {
    const spanType = document.createElement('span');
    spanType.textContent = type.type.name;
    spanType.style.backgroundColor = typeColor[type.type.name];
    typesDiv.appendChild(spanType);
  });
};

const getPokemon = () => {
  const randomPoke = Math.floor(Math.random() * 19) + 1;
  fetch(`${url}${randomPoke}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderCard(data);
      setColorType(data.types);
    });
};

btn.addEventListener('click', getPokemon);
