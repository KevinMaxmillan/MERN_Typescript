import mongoose, { Schema, Document, Model } from 'mongoose';

const AutoIncrementFactory = require('mongoose-sequence');

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
});


UserSchema.plugin(AutoIncrementFactory(mongoose), { inc_field: 'numericID' });

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;