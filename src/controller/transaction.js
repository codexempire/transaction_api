import { User, Transaction } from '../db/models';

export default class UserController {
    static async sendMoney(req, res) {
        const { otp } = req.query;
        const { recieverEmail, amount, pin, verifiedPin, email } = req.body;
        if (otp) {
            try {
                const transaction = await Transaction.update({ isSuccess: true }, { where: { otp, senderEmail: email }, returning: true });
                delete transaction[1][0].otp;          
                return res.status(201).json({ message: 'Transaction made confirm OTP', transactionDetails: transaction[1][0] });
            } catch (error) {
                return res.status(500).json({ message: error.message });
            }
        }
        try {
            if(pin !== verifiedPin) {
                return res.status(400).json({ message: 'PIN not valid' });
            }
            const sender = await User.findOne({ raw: true, where: { email } });            
            if(!sender) {
               return res.status(409).json({ message: 'User does not exist' }); 
            }
            const reciever = await User.findOne({ raw: true, where: { email: recieverEmail } });
            if(!reciever) {
                return res.status(400).json({ message: 'Reciever does not exist'})
            }
            const OTP = Math.floor(100000 + Math.random() * 900000);
            const transctionAudit = { senderEmail: email, recieverEmail, amount, otp: OTP }
            const transaction = await Transaction.create(transctionAudit);
            delete transaction.dataValues.otp;          
            return res.status(201).json({ message: 'Transaction made confirm OTP', transactionDetails: transaction, OTP });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
