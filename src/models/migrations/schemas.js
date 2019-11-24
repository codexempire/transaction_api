import Mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  fullName:  String,
  email: String,
  password:   String,
  phoneNumber: String,
});

const transactionSchema = new Schema({
  senderEmail:  String,
  recieverEmail: String,
  type:   String,
  amount: Number,
  pin: String,
  completed: Boolean,
  otp: String,
});

const accountSchema = new Schema({
  email:  String,
  accountNumber: String,
  balance: Number,
  pin: String,
  bvn: String,
});

export const User = Mongoose.model('User', userSchema);
export const Transaction = Mongoose.model('Transaction', transactionSchema);
export const Acoount = Mongoose.model('Account', accountSchema);
