import { Router } from 'express';

import UserController from '../controller/users';
import Validator from '../middleware';

const { signUp, signIn } = UserController;
const validator = Validator();
const route = Router();

/**
 * @swagger
 *
 * /signup:
 *   post:
 *     description: Register onto the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Email to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
route.post('/signup', validator, signUp);

/**
 * @swagger
 *
 * /signin:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: emaila
 *         description: Eamil to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
route.post('/signin', validator, signIn);

export default route;