import {Response, Request, NextFunction} from 'express';
import User from '../models/userModel';
import Pokemon from '../models/pokemonModel';
import {comparePassword, createJWT, hashPassword} from '../utils/auth';
import CustomRequest from '../utils/CustomRequest';

export const register = async (req: Request, res: Response,next: NextFunction) => {
  const {name, email, confirmPassword} = req.body;

  if (!name || !email || !confirmPassword) {
    return res.status(400).json({message: 'Please fill in all fields'});
  }
  const userExists = await User.findOne({email  });
  if (userExists) {
    return res.status(400).json({message: 'Email already registered'});
  }

  try {
    const user = await User.create({name, email, hashpass: await hashPassword(confirmPassword)});
    const token = createJWT({id: user.id, email: user.email});
    return res.status(201).json({token, user: {name: user.name, email: user.email , id: user.id}});
    } catch (error) {
    console.error(error);
    next(error);
    }
}

export const login = async (req: Request, res: Response) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({message: 'Please fill in all fields'});
  }

  try {
    const user = await User.findOne({email}).populate('pokemons');

    if (!user) {
      return res.status(400).json({message: 'Invalid credentials'});
    }

    if (!await comparePassword(password, user.hashpass)) {
      return res.status(400).json({message: 'Invalid credentials'});
    }

    const token = createJWT({id: user.id, email: user.email});
    return res.status(200).json({token, user:{name: user.name, email: user.email, id: user.id}});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Server error'});
  }
}

export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const user = await User.find({}).populate('pokemons');
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }

} 
export const getUser = async (req: Request, res: Response, next: NextFunction) => {

  const {id} = req.params;

  try {
    const user = await User.findById(id).populate('pokemons');
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }

} 

export const userMeals = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const {id} = req.params

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({message: 'User not found'});
    }

    return res.status(200).json({meals: user.meals});
  } catch (error) {
    console.error(error);
    next(error);
  }
}
export const getCoins = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const {id} = req.params

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({message: 'User not found'});
    }

    return res.status(200).json({coins: user.coins});
  } catch (error) {
    console.error(error);
    next(error);
  }
}
export const getTrophies = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const {id} = req.params

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({message: 'User not found'});
    }

    return res.status(200).json({trophies: user.trophies});
  } catch (error) {
    console.error(error);
    next(error);
  }
}






