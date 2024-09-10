import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorHandler from "./customError";
import dotenv from "dotenv";

dotenv.config();

type UserForToken = {
	id: string ;
	email: string;
};

const JWT_SECRET = process.env.JWT_SECRET


const createJWT = (user: UserForToken): string => {
	const token = jwt.sign(
		{ id: user.id, email: user.email},
		JWT_SECRET
	);

	return token;
};

const protect = (req , _res, next) => {
	const bearer = req.headers.authorization;
	// console.log(bearer)

	if (!bearer || !bearer.startsWith("Bearer ")) {
		return next(new ErrorHandler("No token provided", 400));
	}

	const [, token] = bearer.split(" ");

	if (!token) {
		return next(new ErrorHandler("No token provided", 400));
	}

	try {
		
		const user = jwt.verify(token, JWT_SECRET);
		req.user = user;
		next();
	} catch (error) {
		return next(new ErrorHandler("Invalid token", 400));
	}
};

const comparePassword = async (password: string, passwordHash: string): Promise<boolean> => {
    return bcrypt.compare(password, passwordHash);
};

const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
};

export { comparePassword, createJWT, hashPassword, protect };
