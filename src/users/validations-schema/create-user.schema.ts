import * as Joi from 'joi';
import { CreateUserDto } from '../dtos/create-user.dto';

export const CreateUserSchema = Joi.object<CreateUserDto>({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().min(4).max(50).email().required(),
  password: Joi.string().min(3).max(50).required(),
});
