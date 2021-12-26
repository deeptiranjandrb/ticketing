import mongoose from 'mongoose';
import {app} from './app';

const start = async () => {

    if(!process.env.JWT_KEY){
        throw new Error('jwt secret key is not ');
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('connected to mongodb');
    }catch(err) {
        console.log(err);
    }

    app.listen(3000, async () => {
        console.log('listening on port 3000!!!!!!!');
    });
}
start();
