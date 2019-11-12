import Joi from 'joi';

const email = Joi.string().email({ minDomainAtoms: 2 }).required();

const recieverEmail = Joi.string().email({ minDomainAtoms: 2 });

const phoneNumber = Joi.number().required();

const password = Joi.string().min(8).max(16).alphanum().required();

const pin = Joi.number().required();

const verifiedPin = Joi.number();

const token = Joi.string().required();

const amount = Joi.number();

const otp = Joi.number();

const signUp = {
    body: {
        email, password, pin, phoneNumber
    }
}

const signIn = {
    body: {
        email, password
    }
}


const transaction = {
    query: {
        otp
    },
    body: {
        recieverEmail, pin: verifiedPin, amount, email, verifiedPin
    },
    header: {
        token
    }
}

export default [
    {
        route: '/signup',
        method: 'post',
        schema: signUp
    },
    {
        route: '/signin',
        method: 'post',
        schema: signIn
    },
    {
        route: '/send_money',
        method: 'patch',
        schema: transaction
    },
];