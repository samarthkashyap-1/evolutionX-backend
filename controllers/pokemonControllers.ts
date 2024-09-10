import { Router, Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import User from "../models/userModel";
import Pokemon from "../models/pokemonModel";
import data from "../utils/data";
import CustomRequest from "../utils/CustomRequest";



const getPokemons = async (req : CustomRequest, res : Response, next : NextFunction) => {
    const owner = req.user?.id;

    if (!owner) {
        return res.status(400).json({ message: "Something went wrong" });
    }

    try {
        const pokemons = await Pokemon.find({ owner });
        return res.status(200).json(pokemons);
    } catch (error) {
        console.error(error);
        next(error);
    }
}


const createPokemon = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { speciesName } = req.body;
    const owner = req.user?.id;

    if (!speciesName || !owner) {
        return res.status(400).json({ message: "Something went wrong" });
    }

    try {
        const user = await User.findById(owner);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const pokemonExists = await Pokemon.findOne({$or: [{speciesName, owner},{evolveFrom : speciesName, owner}]});
        if (pokemonExists) {
            return res.status(400).json({ message: "You already have this pokemon or an evolved form " });
        }

        const newPokemon = data.find((pokemon) => pokemon.speciesName === speciesName);
        if (!newPokemon) {
            return res.status(400).json({ message: "Pokemon not found" });
        }
        console.log(newPokemon);

        if (!newPokemon.price) {
            return res.status(400).json({ message: "You can't buy this" });
        }

        if (user.pokemons.length >= 6) {
            return res.status(400).json({ message: "You can't have more than 6 pokemons" });
        }

        if (user.coins < newPokemon.price) {
            return res.status(400).json({ message: "You don't have enough coins" });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const pokemon = new Pokemon({
                ...newPokemon,
                owner,
            });

            const savedPokemon = await pokemon.save({ session });
            user.coins -= newPokemon.price;
            user.trophies += 20;
            user.pokemons.push(savedPokemon.id);
            await user.save({ session });

            await session.commitTransaction();
            session.endSession();

            return res.status(201).json(savedPokemon);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error(error);
            next(error);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const feedPokemon = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { pokemonId } = req.body;
    const owner = req.user?.id;

    if (!pokemonId || !owner) {
        return res.status(400).json({ message: "Something went wrong" });
    }

    try {
        const pokemon = await Pokemon.findById(pokemonId);
        const user = await User.findById(owner);
        if (!pokemon) {
            return res.status(400).json({ message: "Pokemon not found" });
        }

        if (pokemon.owner.toString() !== owner) {
            return res.status(400).json({ message: "You don't own this pokemon" });
        }

        if (pokemon.health >= 100) {
            return res.status(400).json({ message: "Your pokemon is already full" });
        }

        if (pokemon.health <= 0) {
            return res.status(400).json({ message: "Your pokemon is dead" });
        }

        if (pokemon.health + 10 > 100) {
            pokemon.health = 100;
        } else {
            if(user.meals === 0){
                return res.status(400).json({message: "You don't have any meals left"});
            }
            user.meals -= 1;
            user.trophies += 1;
            pokemon.totalMealCount += 1;
            pokemon.health += 10;
        }

        if(pokemon.lastMealTime){
            pokemon.lastMealTime = new Date();
        }
        if(pokemon.totalMealCount % 5 === 0){
            pokemon.level += 1;
            user.trophies += 5;
        }


        await pokemon.save();
        await user.save();
        return res.status(200).json(pokemon);
    } catch (error) {
        console.error(error);
        next(error);
    }
}


const evolvePokemon = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { pokemonId } = req.body;
    const owner = req.user?.id;

    if (!pokemonId || !owner) {
        return res.status(400).json({ message: "Something went wrong" });
    }

    try {
        const pokemon = await Pokemon.findById(pokemonId);
        const user = await User.findById(owner);
        if (!pokemon) {
            return res.status(400).json({ message: "Pokemon not found" });
        }

        if (pokemon.owner.toString() !== owner) {
            return res.status(400).json({ message: "You don't own this pokemon" });
        }

        if (pokemon.health <= 0) {
            return res.status(400).json({ message: "Your pokemon is dead" });
        }

        if (pokemon.evolved) {
            return res.status(400).json({ message: "Your pokemon is already evolved" });
        }

        if (pokemon.level < pokemon.leveltoEvolve) {
            return res.status(400).json({ message: "Your pokemon is not ready to evolve" });
        }

        if (user.coins < pokemon.evolvePrice) {
            return res.status(400).json({ message: "You don't have enough coins" });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            user.coins -= pokemon.evolvePrice;
            user.trophies += 10;
            // pokemon.evolved = true;
            if(pokemon.baseForm){
                pokemon.evolveFrom = pokemon.speciesName;
            }

            pokemon.speciesName = pokemon.evolveTo;
            const newForm = data.find((p) => p.speciesName === pokemon.evolveTo);
            // console.log(newForm);
            if (!newForm) {
                return res.status(400).json({ message: "Evolved form not found" });
            }
            pokemon.type = newForm.type;
            pokemon.ability = newForm.ability;
            pokemon.image = newForm.image;
            pokemon.level = pokemon.level;
            pokemon.evolveTo = newForm.evolveTo;
            pokemon.leveltoEvolve = newForm.leveltoEvolve;
            pokemon.evolvePrice = newForm.evolvePrice;
            pokemon.health = 100;
            pokemon.totalMealCount = pokemon.totalMealCount;
            pokemon.lastMealTime = new Date();
            console.log(newForm.evolveTo);
            if(!newForm.evolveTo){
                pokemon.evolved = true;
            }
            pokemon.died = false;
            pokemon.baseForm = false;



            await user.save({ session });
            await pokemon.save({ session });

            await session.commitTransaction();
            session.endSession();

            return res.status(200).json(pokemon);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error(error);
            next(error);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const disownPokemon = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const owner = req.user?.id;

    // console.log(id)

    if (!id || !owner) {
        return res.status(400).json({ message: "Something went wrong" });
    }

    try {
        const pokemon = await Pokemon.findById(id);
        const user = await User.findById(owner);
        if (!pokemon) {
            return res.status(400).json({ message: "Pokemon not found" });
        }

        if (pokemon.owner.toString() !== owner) {
            return res.status(400).json({ message: "You don't own this pokemon" });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            user.pokemons = user.pokemons.filter((p) => p.toString() !== pokemon.id);
            await Pokemon.findByIdAndDelete(pokemon.id).session(session);
            await user.save({ session });

            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({ message: "Pokemon disowned" });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error(error);
            next(error);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const allPokemons = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getHealth = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    // console.log(req.param)
    const owner = req.user?.id;
    // console.log(id)

    if (!id || !owner) {
        return res.status(400).json({ message: "Something went wrong" });
    }

    try {
        const pokemon = await Pokemon.findById(id);
        if (!pokemon) {
            return res.status(400).json({ message: "Pokemon not found" });
        }

        if (pokemon.owner.toString() !== owner) {
            return res.status(400).json({ message: "You don't own this pokemon" });
        }

        return res.status(200).json({ health: pokemon.health });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export { createPokemon, getPokemons , feedPokemon, evolvePokemon , disownPokemon , allPokemons , getHealth};

