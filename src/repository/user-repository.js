import Repository from './default-repository';
import UserModel from '../models/user-model';

class UserRepository extends Repository {
    constructor() {
        super(UserModel);
    }
}

export default new UserRepository();