import { elements, bg_color } from "./helpers.js";

elements.formBtn.addEventListener("click", () => {
  elements.form.classList.toggle("active");

  elements.formInput.focus();
});

const getData = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    createPokemon(data);
  } catch (error) {
    throw new Error(error);
  }
};

const pokeInit = () => {
  for (let i = 1; i <= 150; i++) {
    getData(i);
  }
};

window.addEventListener("DOMContentLoaded", pokeInit);

const createPokemon = (item) => {
  const image = item.id;
  const id = String(item.id).padStart(3, "0");
  const weight = item.weight;
  const name =
    item.name[0].toUpperCase() + item.name.slice(1, item.name.length);
  const experience = item.base_experience;
  const type = item.types.shift().type.name;
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.backgroundColor = `${bg_color[type]}`;
  card.innerHTML = `
        <figure class="card-img">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${image}.png"/>
        </figure>

        <span class="card-id">#${id}</span>
        <h3 class="card-name">${name}</h3>
        <div class="card-detail">
            <small><i class="fa-solid fa-flask"></i> <span>${experience} Exp</span></small>
            <small><i class="fa-solid fa-weight-scale"></i> <span>${weight} Kg</span></small>
        </div>

        <div><i class="fa-brands fa-uncharted"></i> <span>${type}</span></div>
        `;

  elements.container.appendChild(card);
};

elements.formInput.addEventListener("input", () => {
  const value = elements.formInput.value;
  const cardName = elements.container.querySelectorAll(".card-name");
  cardName.forEach((name) => {
    name.parentElement.style.display = "flex";

    if (!name.textContent.toUpperCase().includes(value.toUpperCase())) {
      name.parentElement.style.display = "none";
    }
  });
});
