import exp from "constants"

const data = [
    {
      "speciesName": "Pichu",
      "type": "Electric",
      "ability": "Static",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/pichu.png?updatedAt=1720815356298",
      "evolveTo": "Pikachu",
      "leveltoEvolve": 5,
      "baseForm": true,
      "price": 35,
      "evolvePrice": 50
    },
    {
      "speciesName": "Pikachu",
      "type": "Electric",
      "ability": "Static",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/pikachu.png",
      "evolveTo": "Raichu",
      "leveltoEvolve": 10,
      "baseForm": false,
      "price": null,
      "evolvePrice": 40
    },
    {
      "speciesName": "Raichu",
      "type": "Electric",
      "ability": "Static",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/raichu.png",
      "evolveTo": null,
      "leveltoEvolve": null,
      "baseForm": false,
      "price": null,
      "evolvePrice": null
    },
    {
      "speciesName": "Bulbasaur",
      "type": "Grass",
      "ability": "Overgrow",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/bulbasaur.png?updatedAt=1720814413289",
      "evolveTo": "Ivysaur",
      "leveltoEvolve": 5,
      "baseForm": true,
      "price": 30,
      "evolvePrice": 40
    },
    {
      "speciesName": "Ivysaur",
      "type": "Grass",
      "ability": "Overgrow",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/ivysaur.png",
      "evolveTo": "Venusaur",
      "leveltoEvolve": 10,
      "baseForm": false,
      "price": 50,
      "evolvePrice": 60
    },
    {
      "speciesName": "Venusaur",
      "type": "Grass",
      "ability": "Overgrow",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/venusaur.png",
      "evolveTo": null,
      "leveltoEvolve": null,
      "baseForm": false,
      "price": null,
      "evolvePrice": null
    },
    {
      "speciesName": "Charmander",
      "type": "Fire",
      "ability": "Blaze",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/charmander.png",
      "evolveTo": "Charmeleon",
      "leveltoEvolve": 5,
      "baseForm": true,
      "price": 30,
      "evolvePrice": 40
    },
    {
      "speciesName": "Charmeleon",
      "type": "Fire",
      "ability": "Blaze",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/charmeleon.png",
      "evolveTo": "Charizard",
      "leveltoEvolve": 10,
      "baseForm": false,
      "price": 50,
      "evolvePrice": 60
    },
    {
      "speciesName": "Charizard",
      "type": "Fire",
      "ability": "Blaze",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/charizard.png",
      "evolveTo": null,
      "leveltoEvolve": null,
      "baseForm": false,
      "price": null,
      "evolvePrice": null
    },
    {
      "speciesName": "Squirtle",
      "type": "Water",
      "ability": "Torrent",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/squirtle.png?updatedAt=1720814061742",
      "evolveTo": "Wartortle",
      "leveltoEvolve": 5,
      "baseForm": true,
      "price": 30,
      "evolvePrice": 40
    },
    {
      "speciesName": "Wartortle",
      "type": "Water",
      "ability": "Torrent",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/wartortle.png",
      "evolveTo": "Blastoise",
      "leveltoEvolve": 10,
      "baseForm": false,
      "price": 50,
      "evolvePrice": 60
    },
    {
      "speciesName": "Blastoise",
      "type": "Water",
      "ability": "Torrent",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/blastoise.png",
      "evolveTo": null,
      "leveltoEvolve": null,
      "baseForm": false,
      "price": null,
      "evolvePrice": null
    },
    {
      "speciesName": "Jigglypuff",
      "type": "Normal",
      "ability": "Cute Charm",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/jigglypuff.png",
      "evolveTo": "Wigglytuff",
      "leveltoEvolve": 5,
      "baseForm": true,
      "price": 30,
      "evolvePrice": 40
    },
    {
      "speciesName": "Wigglytuff",
      "type": "Normal",
      "ability": "Cute Charm",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/wigglytuff.png?updatedAt=1720813807549",
      "evolveTo": null,
      "leveltoEvolve": null,
      "baseForm": false,
      "price": null,
      "evolvePrice": null
    },
    {
      "speciesName": "Geodude",
      "type": "Rock",
      "ability": "Rock Head",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/geodude.png?updatedAt=1720814448714",
      "evolveTo": "Graveler",
      "leveltoEvolve": 5,
      "baseForm": true,
      "price": 30,
      "evolvePrice": 40
    },
    {
      "speciesName": "Graveler",
      "type": "Rock",
      "ability": "Rock Head",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/graveler.png",
      "evolveTo": "Golem",
      "leveltoEvolve": 10,
      "baseForm": false,
      "price": 50,
      "evolvePrice": 60
    },
    {
      "speciesName": "Golem",
      "type": "Rock",
      "ability": "Rock Head",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/golem.png",
      "evolveTo": null,
      "leveltoEvolve": null,
      "baseForm": false,
      "price": null,
      "evolvePrice": null
    },
    {
      "speciesName": "Magikarp",
      "type": "Water",
      "ability": "Swift Swim",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/magikarp.png",
      "evolveTo": "Gyarados",
      "leveltoEvolve": 5,
      "baseForm": true,
      "price": 30,
      "evolvePrice": 40
    },
    {
      "speciesName": "Gyarados",
      "type": "Water",
      "ability": "Intimidate",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/gyarados.png",
      "evolveTo": null,
      "leveltoEvolve": null,
      "baseForm": false,
      "price": null,
      "evolvePrice": null
    },
    {
      "speciesName": "Snorlax",
      "type": "Normal",
      "ability": "Thick Fat",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/snorlax.png",
      "evolveTo": null,
      "leveltoEvolve": null,
      "baseForm": true,
      "price": 50,
      "evolvePrice": null
    },
    {
      "speciesName": "Dragonite",
      "type": "Dragon",
      "ability": "Inner Focus",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/dragonite.png",
      "evolveTo": null,
      "leveltoEvolve": null,
      "baseForm": true,
      "price": 70,
      "evolvePrice": null
    },
    {
      "speciesName": "Gengar",
      "type": "Ghost",
      "ability": "Levitate",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/gengar.png",
      "evolveTo": null,
      "leveltoEvolve": null,
      "baseForm": true,
      "price": 60,
      "evolvePrice": null
    },
    {
      "speciesName": "Psyduck",
      "type": "Water",
      "ability": "Damp",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/psyduck.png",
      "evolveTo": null,
      "leveltoEvolve": null,
      "baseForm": true,
      "price": 35,
      "evolvePrice": null
    },
    {
      "speciesName": "Meowth",
      "type": "Normal",
      "ability": "Pickup",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/meowth.png",
      "evolveTo": null,
      "leveltoEvolve": null,
      "baseForm": true,
      "price": 30,
      "evolvePrice": null
    },
    {
      "speciesName": "Growlithe",
      "type": "Fire",
      "ability": "Intimidate",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/growlithe.png",
      "evolveTo": null,
      "leveltoEvolve": null,
      "baseForm": true,
      "price": 35,
      "evolvePrice": null
    },
    {
      "speciesName": "Abra",
      "type": "Psychic",
      "ability": "Synchronize",
      "image": "https://ik.imagekit.io/2vgpdkh7c/pokemon/abra.png",
      "evolveTo": null,
      "leveltoEvolve": null,
      "baseForm": true,
      "price": 30,
      "evolvePrice": null
    }
  ]
  export default data;