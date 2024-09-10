import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  hashpass: string;
  coins: number;
  trophies: number;
  meals: number;
  pokemons: string[]; // Array of Pokemon IDs
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  hashpass: { type: String, required: true },
  coins: { type: Number, default: 50 },
  trophies: { type: Number, default: 100 },
  meals: { type: Number, default: 5 , max: 5},
  pokemons: [{ type: Schema.Types.ObjectId, ref: 'Pokemon' }] // Reference to Pokemon documents
});

const User = model<IUser>('User', userSchema);

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject.hashpass;
        delete returnedObject._id;
        delete returnedObject.__v;
    },
    });


export default User;
