import Joi from 'joi'

export const validateAuth = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.empty': 'Email cannot be empty.',
            'string.base': 'Email must be a string.',
            'string.email': 'Email must be valid.',
            'any.required': 'Email is required.',
        }),
        password: Joi.string().min(8).max(30).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/).required().messages({
            'any.required': 'Password is required.',
            'string.base': 'Password must be a string.',
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password must have a minimum of 8 characters.',
            'string.max': 'Password must not be more than 30 characters.',
            'string.pattern.base': 'Pasword must contain an Uppercase, lowercase, a symbol  and a number.'
        })
    });

    const { error } = schema.validate(req.body);

    if(error)
        return res.status(422).json({ error: error.details[0].message })

    return next();
}