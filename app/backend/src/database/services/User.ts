import { compareSync } from 'bcryptjs';
// import { RowDataPacket } from 'mysql2/promise';
import Users from '../models/User';
import generateToken from '../middlewares/generateToken';
import ILogin from '../interfaces/Login';
// import IUser from '../interfaces/User';
export default class UserService {
  static async findUser(user: ILogin) {
    const { email, password } = user;
    const login = await Users.findOne({ where: { email, password } });
    // console.log(compareSync(password, login.dataValues));
    const token = generateToken(user);
    if (login) return token;
    return { message: 'Incorrect email or password' };
  }
}
