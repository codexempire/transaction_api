import { Router } from 'express';

import {userSignIn, userSignUp} from '../controller/user';
const route = Router();

route.post('/auth/signup', userSignUp);
route.post('/auth/login', userSignIn);

export default route;
