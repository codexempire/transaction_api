import { User } from '../models/migrations/schemas';
import { passwordHasher, comparePassword, signToken } from '../utils';

export default class UserController {
  static async signUp(req, res) {
    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if(existingUser) {
        return res.status(409).json({ message: 'Email has been taken' });
      }
      const hashedPasssword = await passwordHasher(password);
      const user = new User({
        email,
        password: hashedPasssword,
      });

      const createUser = await user.save();

      delete createUser.password;

      const token = signToken(createUser);
      return res.status(201).json({ message: 'Signup successfull', token, user: createUser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if(!existingUser) {
        return res.status(404).json({ message: 'Inccorect email or password' });
      }
      const validPassword = await comparePassword(password, existingUser.password);
      
      if(validPassword) {        
        delete existingUser.password;
        const token = signToken(existingUser);
        return res.status(200).json({ message: 'Login successfull', user: existingUser, token });
      }

      return res.status(400).json({ message: 'Inccorect email or password' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}