import { signToken, comparePassword } from '../utils';
import UserRepository from '../repository/user-repository';

/**
 * This route enables users to sign up on the platform.
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Promise<Response>}
 */
export const userSignUp = async (req, res) => {
    try {
        const {email, password} = req.body;

        const emailExists = await UserRepository.findOne({email})

        if(emailExists)
            return res.status(409).json({ error: "Email already exists" });
            
        const user = await UserRepository.create({email, password});

        user.toJSON();

        return res.status(201).json({
            data: {user, token: signToken(user)}
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * This controller enables users to be able to log into their accounts.
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Promise<Response>}
 */
export const userSignIn = async (req, res) => {
    try {
        const {email} = req.body;
        const registeredUser = await UserRepository.findOne({email});

        if(!registeredUser)
            return res.status(404).json({ error: 'Invalid login credentials' });

        const validPassword = await comparePassword(password, registeredUser.password);
        
        if(!validPassword)
            return res.status(422).json({ error: 'Invalid login credentials' });

        registeredUser.toJSON();

        return res.status(200).json({
            data: { user: registeredUser, token: signToken(registeredUser) }
        });
    } catch (error) {
        throw new Error(error.message);
    }
}
