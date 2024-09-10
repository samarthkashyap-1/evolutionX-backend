import cron from "node-cron";
import mongoose from "mongoose";
import Pokemon from "../models/pokemonModel";
import User from "../models/userModel";

const decreaseHP = async (pokemonId: string) => {
    let retries = 5; 
    while (retries > 0) {
      try {
        const session = await mongoose.startSession();
        session.startTransaction();
  
        const pokemon = await Pokemon.findById(pokemonId).session(session);
        if (!pokemon) {
          throw new Error(`Pokemon not found with ID: ${pokemonId}`);
        }
  
        const user = await User.findById(pokemon.owner).session(session);
        if (!user) {
          throw new Error(`User not found for Pokemon ID: ${pokemonId}`);
        }

        
        if (pokemon.lastMealTime){

          const currTime = new Date()

          const timeSinceWeLastEat = currTime.getTime() - pokemon.lastMealTime.getTime()
          if(timeSinceWeLastEat >= 10800000){
            if (pokemon.health > 0) {
              pokemon.health -= 10;
             
    
      
              if (pokemon.health <= 0) {
                pokemon.health = 0;
                user.trophies -= 25;
                user.trophies = user.trophies < 0 ? 0 : user.trophies;
                pokemon.died = true;
              } 
              await pokemon.save({ session });
                await user.save({ session });
      
              
            }
  
            
          }
          else{
            console.log("its not been 10 min for", pokemonId)
          }
          }

          
          
        
        
  
        await session.commitTransaction();
        session.endSession();
        return; // Exit the function if successful
      } catch (error) {
        console.error(`Error in decreaseHP for Pokemon ID ${pokemonId}:`, error);
        retries--;
        if (retries === 0) {
          throw new Error(`Exceeded maximum retries for Pokemon ID ${pokemonId}`);
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait before retrying
      }
    }
  };
  // 0 */3 * * *
// Schedule a cron job to run every 3 hrs
cron.schedule("*/10 * * * * *", async () => {
  try {
    console.log("Cron job for hp decrease running...");
    const alivePokemons = await Pokemon.find({ died: false });

    // Using for...of loop to handle async operations correctly
    for (const pokemon of alivePokemons) {
      await decreaseHP(pokemon.id);
    }
  } catch (error) {
    console.error("Error running cron job:", error);
  }
});
