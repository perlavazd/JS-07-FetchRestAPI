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

//Se manda llamar la función con la información guardada en Localstorage.
pokemonLocalstorage();

//Se crea una función que me creará los elementos de las tarjetas, agregará su contenido y guardará la información en localstorage.
function pokeCard (id, name, weight, image) {

    //Card principal.
    const pokeCard = document.getElementById('card--container');
    pokeCard.innerHTML = ''; //Para limpiar el contenido de HTML.

    //Agrega h2 con el nombre del pokemon.
    const pokeNameText = document.createElement('h2');
    pokeNameText.textContent = name; //Agrega el texto al elemento.
    pokeCard.append(pokeNameText); // Agregar el h2 al contenedor.

    //Agrega p con el id del pokemon.
    const pokeId = document.createElement('p');
    pokeId.textContent = `Id: ${id} `;
    pokeCard.append(pokeId);

    //Agrega p con peso del pokemon
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

    localStorage.setItem('pokemonId', id); //Para guardar en localstorage. Guarda el ID con la clave "pokemonId"
    localStorage.setItem('pokemonName', name);
    localStorage.setItem('pokemonWeight', weight);
    localStorage.setItem('pokemonImage', image);

}

//LOCAlSTORAGE

//Esta función me permitirá mostrar la inf guardada en localstorage y mostrarla en cuanto de abra la página.
function pokemonLocalstorage() {
    const pokemonIdLocalstorage = localStorage.getItem("pokemonId"); //Se obtiene información guardada en localstorage con getItem y la palabra clave asociada "pokemonId".
    const pokemonNameLocalstorage = localStorage.getItem("pokemonName");
    const pokemonWeightLocalstorage = localStorage.getItem("pokemonWeight");
    const pokemonImagetLocalstorage = localStorage.getItem("pokemonImage");

    //Se manda llamar la función para poder formar la card con los datos de localstorage.
    pokeCard (pokemonIdLocalstorage, pokemonNameLocalstorage, pokemonWeightLocalstorage, pokemonImagetLocalstorage);
};


//GET 
document.getElementById('get-btn').addEventListener('click', async() =>{
    const text=document.getElementById('poke-name').value.toLowerCase();
    const pokemon = await fetchPokemon(text);
    console.log(pokemon);

    //Se establece el valor que tomaran los parametros de la función que formará la card.
    pokeCard (pokemon.id, pokemon.name, pokemon.weight, pokemon.sprites.front_default);
});

//GET-PREV 
document.getElementById('prev-btn').addEventListener('click', async () => {
    const currentPokemonId = localStorage.getItem("pokemonId");
    const newId=Math.max(1, currentPokemonId-1)
    const pokemon =await fetchPokemon(newId);
    console.log(pokemon);

    //Se establece el valor que tomaran los parametros de la función que formará la card.
    pokeCard (pokemon.id, pokemon.name, pokemon.weight, pokemon.sprites.front_default);
});

//GET-NEXT
document.getElementById('next-btn').addEventListener ('click', async() => {
    const currentPokemonId = parseInt(localStorage.getItem("pokemonId"));
    const newId = currentPokemonId + 1;
    const pokemon = await fetchPokemon(newId);
    console.log(pokemon);

    //Se establece el valor que tomaran los parametros de la función que formará la card.
    pokeCard (pokemon.id, pokemon.name, pokemon.weight, pokemon.sprites.front_default);
});