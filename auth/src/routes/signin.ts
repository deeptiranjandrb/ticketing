import express, {Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { Password } from '../services/password';
import { User } from '../models/user';
import {BadRequestError} from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signin', 
[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('Password must be valid')
],validateRequest,
async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({email});

    if(!existingUser) {
        throw new BadRequestError('Invalid Credentials');
    }
    const passwordsMatch = await Password.compare(existingUser.password, password);

    if(!passwordsMatch){
        throw new BadRequestError('Invalid Credentials');
    }

    //Generate JWT
    const userJwt = jwt.sign({id: existingUser.id, email: existingUser.email}, process.env.JWT_KEY!);

    // Store it on session object
    req.session = {
        jwt: userJwt
    };

    res.status(200).send(existingUser);

});

export { router as signinRouter };