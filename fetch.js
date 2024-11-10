const API_URL = "https://pokeapi.co/api/v2/"; 

const fetchPokemon = async (pokemon) => {
    try{
        const response = await fetch(`${API_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;

    }catch(err) {
        console.error(err); 
    }
};

pokemonLocalstorage();

function pokeCard (id, name, weight, image) {

    //Card principal
    const pokeCard = document.getElementById('card--container');
    pokeCard.innerHTML = '';

    //Agrega h2 con el nombre del pokemon
    const pokeNameText = document.createElement('h2');
    pokeNameText.textContent = name;
    pokeCard.append(pokeNameText); // Agregar el h2 al contenedor

    //Agrega p con el id del pokemon
    const pokeId = document.createElement('p');
    pokeId.textContent = `Id: ${id} `;
    pokeCard.append(pokeId);

    //Agrega o con peso del pokemon
    const pokeWeight = document.createElement('p');
    pokeWeight.textContent = `Peso: ${weight} `;
    pokeCard.append(pokeWeight);

    //Agrega imagen del pokemon
    const pokeImg = document.createElement('img');
    pokeImg.src = image;
    pokeImg.alt = `Imagen de ${name}`;
    pokeImg.height = 200;
    pokeImg.width = 200;
    pokeCard.append(pokeImg);
    console.log(image)

    localStorage.setItem('pokemonId', id); //Para guardar
    localStorage.setItem('pokemonName', name);
    localStorage.setItem('pokemonWeight', weight);
    localStorage.setItem('pokemonImage', image);

    //

}

//GET LOCAlSTORAGE





//GET 
document.getElementById('get-btn').addEventListener('click', async() =>{
    const text=document.getElementById('poke-name').value.toLowerCase();
    const pokemon = await fetchPokemon(text);
    console.log(pokemon);
    pokeCard (pokemon.id, pokemon.name, pokemon.weight, pokemon.sprites.front_default);
});

//GET-PREV 
document.getElementById('prev-btn').addEventListener('click', async () => {
    const currentPokemonId = localStorage.getItem("pokemonId");
    const newId=Math.max(1, currentPokemonId-1)
    const pokemon =await fetchPokemon(newId);
    console.log(pokemon);
    pokeCard (pokemon.id, pokemon.name, pokemon.weight, pokemon.sprites.front_default);
});

//GET-NEXT
document.getElementById('next-btn').addEventListener ('click', async() => {
    const currentPokemonId = parseInt(localStorage.getItem("pokemonId"));
    const newId = currentPokemonId + 1;
    const pokemon = await fetchPokemon(newId);
    console.log(pokemon);
    pokeCard (pokemon.id, pokemon.name, pokemon.weight, pokemon.sprites.front_default);
});