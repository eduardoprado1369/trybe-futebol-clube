import { sign } from 'jsonwebtoken';
import ILogin from '../interfaces/Login';
import IUser from '../interfaces/User';

const secret = 'jwt_secret';
const generateToken = (user: ILogin | IUser) => sign(user, secret);

export default generateToken;
