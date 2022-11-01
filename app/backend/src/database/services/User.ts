import { compareSync } from 'bcryptjs';
import Users from '../models/User';
import generateToken from '../middlewares/generateToken';
import ILogin from '../interfaces/Login';

const errorMessage = 'Incorrect email or password';
export default class UserService {
  static async findUser(user: ILogin) {
    const { email, password } = user;
    const login = await Users.findOne({ where: { email } });
    if (!login) return { message: errorMessage };
    const isPasswordCorrect = compareSync(password, login.password);
    const role = login.getDataValue('role');
    const fullUser = {
      ...user, role,
    };
    const token = generateToken(fullUser);
    if (isPasswordCorrect) return token;
    return { message: errorMessage };
  }
}
