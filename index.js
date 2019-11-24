import Express from 'express';
import ExpressGraphQL from 'express-graphql';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import './mongoose';

import userRoutes from './src/routes/users';
import accountRoutes from './src/routes/accounts';


const app = Express();

const definition = {
  info: {
    title: 'Transaction API (TRANsact)',
    description: 'Banking Transaction API',
    version: '1.0.0',
    contact:{
      name: 'Princewill Michael'
    },
    servers: ['http://localhost:5050']
  }
}

// swagger options for auto documentation
const swaggerOptions = {
  definition,
  // where to find apis
  apis: ['./index.js', './src/routes/*.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/api/v1', userRoutes);
app.use('/api/v1', accountRoutes);

/**
 * @swagger
 * /:
 *   get:
 *     description: Returns a greeting
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: A welcoming comment to the patform
 *         schema:
 *           type: string
 */
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Welcome to TRANsact' });
});

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`App running on :${port}`))
