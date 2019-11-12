import Joi from 'joi';
import Schema from './schema';

export default () => {
    return  (req, res, next) => {
        const appMethod = req.method.toLowerCase();
        const appRoute = req.route.path;
    
        const schemaToUse = Schema.find(({ route, method }) => route === appRoute && method === appMethod);
        if(!schemaToUse) {
            return next();
        }
        
        const { schema } = schemaToUse;
        let toValidate = {};
        ['params', 'body', 'token', 'query'].forEach(key => {
            if(schema[key]) {
                toValidate[key] = req[key];
            }
        });
    
        return Joi.validate(toValidate, schema, (err, data) => {
            if (err) {
                const message = (err.details
                ? err.details[0].message.replace(/['"]/g, '')
                : err.message);
                return res.status(400).json({ message })
            } else {
                req.body = data.body;
                req.params = data.params;
                req.token = data.token;
                req.query = data.query;
                next();
            }
        });
    }
}
