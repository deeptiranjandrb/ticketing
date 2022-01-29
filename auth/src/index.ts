import mongoose from 'mongoose';
import {app} from './app';

const start = async () => {

    if(!process.env.JWT_KEY){
        throw new Error('jwt secret key is not ');
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined');

    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('auth connected to mongodb');
    }catch(err) {
        console.log(err);
    }

    app.listen(3000, async () => {
        console.log('listening on port 3000!!!!!!!');
    });
}
start();
