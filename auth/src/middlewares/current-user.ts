import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload { 
    id: string;
    email: string;
}
declare global { //to add a new property "currentUser" to the already existing request Object;
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}
export const currentUser = (req: Request, res: Response, next: NextFunction) => {

    if(!req.session?.jwt){ //equivalent to !req.session || !req.session.jwt
        return next();
    }
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
    } catch(err) {
    }
    next();
}