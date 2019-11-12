import { passwordHasher, signToken, comparePassword } from '../utils';
import models from '../db/models';

const { User } = models;
export default class UserController {
    static async signUp(req, res) {
        const { email, phoneNumber, pin, password } = req.body;
        try {
            const hashedPassword = await passwordHasher(password);
            const registeredUser = await User.findOne({ raw: true, where: { email } });
            if(registeredUser) {
               return res.status(409).json({ message: 'User already exists try signin or retrieving password if forgotten' }); 
            }
            const userData = { email, password: hashedPassword, phoneNumber, pin }
            const registerNewUser = await User.create(userData);
            delete registerNewUser.dataValues.password;
            const token = signToken(registerNewUser.dataValues);             
            return res.status(201).json({ message: 'Registration successfull', user: registerNewUser, token });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    static async signIn(req, res) {
        const { email, password } = req.body;
        try {
            const registeredUser = await User.findOne({ raw: true, where: { email } });
            if(!registeredUser) {
               return res.status(404).json({ message: 'User does not exist' }); 
            }
            const validPassword = await comparePassword(password, registeredUser.password);
            if(validPassword){
                delete registeredUser.password;
                const token = signToken(registeredUser);
                return res.status(200).json({ message: 'Login successfull', user: registeredUser, token });
            }        
            return res.status(400).json({ message: 'User does not exist' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
