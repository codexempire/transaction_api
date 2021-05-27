import mongoose from 'mongoose';
import { passwordHasher } from '../utils';

const schema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {
    toJSON: {
        transform: (doc, ret) => {
            delete ret.password;
        }
    },
    timestamps: true,
});

schema.pre('save', next => {
    this.password = passwordHasher(this.password, 10);

    next();
});

export default mongoose.model('user', schema);