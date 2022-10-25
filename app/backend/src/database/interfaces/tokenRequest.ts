import { Request } from 'express';

export default interface ITokenValidationRequest extends Request {
  req?: {
    userRole: string;
  }
}
