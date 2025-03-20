declare module 'mongoose-sequence' {
    import { Mongoose } from 'mongoose';
    function mongooseSequence(mongoose: Mongoose): any;
    export = mongooseSequence;
}