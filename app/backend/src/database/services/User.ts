import { compareSync } from 'bcryptjs';
// import { RowDataPacket } from 'mysql2/promise';
import Users from '../models/User';
import generateToken from '../middlewares/generateToken';
import ILogin from '../interfaces/Login';
// import IUser from '../interfaces/User';
const errorMessage = 'Incorrect email or password';
export default class UserService {
  static async findUser(user: ILogin) {
    const { email, password } = user;
    const login = await Users.findOne({ where: { email } });
    if (!login) return { message: errorMessage };
    const isPasswordCorrect = compareSync(password, login?.getDataValue('password'));
    const token = generateToken(user);
    if (isPasswordCorrect) return token;
    return { message: errorMessage };
  }

  static async findUserRole(user: ILogin) {
    const { email, password } = user;
    const login = await Users.findOne({ where: { email } });
    const isPasswordCorrect = compareSync(password, login?.getDataValue('password'));
    const role = login?.getDataValue('role');
    if (isPasswordCorrect) return role;
    return { message: 'Incorrect email or password' };
  }
}
