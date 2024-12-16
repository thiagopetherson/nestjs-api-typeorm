import { AuthResetDTO } from '../../auth/DTO/auth-reset.dto';
import { resetToken } from './reset-token.mock';

export const authResetDTO: AuthResetDTO = {
  password: '654321',
  token: resetToken,
};
