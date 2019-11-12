import jwt from 'jsonwebtoken';;
import bcrypt from 'bcrypt';

export const passwordHasher = (password, salt = 10) => {
    return bcrypt.hash(password, salt);
}

export const signToken = userInfo => {
    return jwt.sign(userInfo, process.env.SECRET_KEY, { expiresIn: '24h' });
}

export const comparePassword = (password, comparedPassword) => {
    return bcrypt.compare(password, comparedPassword);
}

export const decodeToken = () => {
    return (req, res, next) => {
        const token = req.headers.token;

        if(!token){
            return res.status(404).json({ message: 'No token found' });
        }

        return jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
            if(err) {
                return res.status(500).json({ message: err.message });
            }
            
            req.body.email = data.email;
            req.body.verifiedPin = data.pin;
            next();
        });
    }
}
