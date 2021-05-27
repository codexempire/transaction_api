import mongoose from 'mongoose';
import { passwordHasher } from '../utils';

const schema = mongoose.Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true}
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret.password;
            delete ret.__v;
            delete ret._id;
        }
    },
    timestamps: true,
});

schema.pre('save',async function (next) {
    this.password = await passwordHasher(this.password, 10);

    next();
});

export default mongoose.model('user', schema);