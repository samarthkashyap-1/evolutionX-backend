// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { MongoError } from 'mongodb';
import mongoose from 'mongoose';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    if (res.headersSent) {
        return next(err);
    }

    // MongoDB/Mongoose specific error handling
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ message: err.message, details: err.errors });
    }

    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    if ((err as MongoError).code === 11000) {
        return res.status(400).json({ message: 'Duplicate key error', details: err.message });
    }

    // Default to 500 server error
    res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
