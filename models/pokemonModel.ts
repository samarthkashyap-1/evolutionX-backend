// Pokemon.ts
import { Schema, model, Document } from 'mongoose';
import User from './userModel'; 

interface IPokemon extends Document {
  speciesName: string;
  type: string;
  ability: string;
  image: string;
  level: number;
  owner: string | Schema.Types.ObjectId; 
  evolveTo: string | null;
  evolveFrom: string | null;
  leveltoEvolve: number;
  evolvePrice: number;
  health: number;
  totalMealCount: number;
  lastMealTime: Date;
  evolved : boolean;
  died : boolean;
  baseForm: boolean;
}

const pokemonSchema = new Schema<IPokemon>({
  speciesName: { type: String, required: true },
  type: { type: String, required: true },
  ability: { type: String, required: true },
  image: { type: String, required: true },
  level: { type: Number, default: 0 },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  evolveTo: { type: String, default: null },
  evolveFrom: { type: String, default: null },
  leveltoEvolve: { type: Number, default: 0 },
  evolvePrice: { type: Number, default: 0 },
  health: { type: Number, default: 100 },
  lastMealTime: { type: Date, default: Date.now },
    totalMealCount: { type: Number, default: 0 },
    evolved: { type: Boolean, default: false },
    died: { type: Boolean, default: false },
    baseForm: { type: Boolean, required : true }
});

const Pokemon = model<IPokemon>('Pokemon', pokemonSchema);

pokemonSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject.password;
        delete returnedObject._id;
        delete returnedObject.__v;
    },
    });

export default Pokemon;
