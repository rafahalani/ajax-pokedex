(function () {

    // Create randomizer to pull 4 different powers of a pokemon and push it into a new array
    function getRandomPower(movesArr, data) {
        let min = 0;
        let max = data.moves.length;
        let randomMove = Math.floor(Math.random() * (max - min) + min);
        movesArr.push(data.moves[randomMove]);      // put the four random moves in a new array
    }

    document.getElementById("run").addEventListener("click", function () {

        const api = "https://pokeapi.co/api/v2/pokemon/";       // the api base adress
        let idName = document.getElementById("name").value; // get the value from input user
        let url = api + idName;        // Api for fetch pokemon data
        let pokemonspecies = "https://pokeapi.co/api/v2/pokemon-species/" + idName; // API to fetch species data, for same input value


        fetch(url)          // fetch the pokemon data file
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                let movesArr = [];      // Create array to display four moves of the pokemon randomly
                let clone;              // variable for html template
                const MAX_MOVES = 4;    // we only need four powers to display

                document.getElementById("target").innerHTML = ''; // Empty the moves div each time before new loop
                document.getElementById("imgPrevious").src = '';  // Empty image of the previous character before loop
                document.getElementById("idnum").innerHTML ='';

                for (let i = 0; i < MAX_MOVES; i++) {           // Loop to use template four times and each time add a new move into the div
                    let template = document.getElementById("powers");
                    getRandomPower(movesArr, data);             // call the randomizer function
                    template.content.querySelector("div").innerHTML = movesArr[i].move.name; //put the values in the template

                    clone = template.content.cloneNode(true);       //general code to activate the template
                    document.getElementById("target").appendChild(clone);

                }
                console.log(movesArr);
                console.log(data);


                // put values in html
                document.getElementById("idPokemon").innerHTML = data.id;
                document.getElementById("namePokemon").innerHTML = data.name;
                document.getElementById("imgPokemon").src = data.sprites.front_default;

                // Fetch the species file after you are done fetching the general file
                fetch(pokemonspecies)
                    .then(function (give) {
                        return give.json();
                    })
                    .then(function (species) {
                        let previousChar = species.evolves_from_species;    // get the name of the Previous character
                        const url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";    // url base to get the picture of previous character

                        // Some character will not have a previous character, then we will show It's a baby
                        // So we create a for loop to display either the img and name of previous char or display 'it's a baby'
                        if (previousChar !== null) {
                            // to be able to display the img of the previous char, we have fetch the original file again
                            fetch(api + previousChar.name)
                                .then(function (response) {
                                    return response.json()
                                })
                                .then(function (data) {
                                    console.log(data);
                                    document.getElementById("evolution").innerHTML = data.name; // get the name of the previous character, by using the species API
                                    document.getElementById("imgPrevious").src = url + data.id + ".png"; // get the img, by going back to the first API, using the id form the species API
                                    document.getElementById("idnum").innerHTML = data.id
                                });
                        } else {
                            document.getElementById("evolution").innerHTML = "It's a baby!";
                            document.getElementById("imgPrevious").src = "https://www.pngkey.com/png/full/30-307419_image-egg-standard-k-pokemon-egg-clipart.png";
                            document.getElementById("idnum").innerHTML = data.id;
                        }
                        console.log(species);
                    });
            });
    });
})();