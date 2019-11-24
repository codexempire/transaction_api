import { Router } from 'express';

import AccountController from '../controller/accounts';
import Validator from '../middleware';
import { decodeToken } from '../utils';
const { sendMoney, openAccount, getAccountEmail, transactionLog, editAccountDetails } = AccountController;
const validator = Validator();
const tokenDecoder = decodeToken();
const route = Router();

/**
 * @swagger
 *
 * /send_money:
 *   post:
 *     description: Transfer of Funds from an account to another
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Email of the reciever of the funds.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: amount
 *         description: Amount to be Transfered to user.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: pin
 *         description: User's pin.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: otp
 *         description: Transaction OTP.
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: sendMoney
 */
route.patch('/send_money', validator, sendMoney);

export default route;