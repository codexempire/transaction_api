import { Router } from 'express';

import { UserController, TransactionController } from '../controller';
import Validator from '../middleware';
import { decodeToken } from '../utils'

const { signUp, signIn } = UserController;
const { sendMoney } = TransactionController;
const validator = Validator();
const tokenDecoder = decodeToken();
const route = Router();

route.post('/signup', validator, signUp);
route.post('/signin', validator, signIn);
route.patch('/send_money', tokenDecoder, validator, sendMoney);

export default route;
