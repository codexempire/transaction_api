import { Router } from 'express';

import {userSignIn, userSignUp} from '../controller/user';
import { validateAuth } from '../middleware/user-validator';
const route = Router();

route.post('/auth/signup', validateAuth, userSignUp);
route.post('/auth/login', validateAuth, userSignIn);

export default route;
