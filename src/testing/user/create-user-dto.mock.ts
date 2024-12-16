import { Role } from '../../enums/role.enums';
import { CreateUserDTO } from '../../user/DTO/create-user.dto';

// Simulando o DTO
export const createUserDTO: CreateUserDTO = {
  birth: '2000-01-01',
  email: 'thipetherson@gmail.com',
  name: 'Thiago Petherson',
  password: 'Lost@4815162342',
  role: Role.Admin,
};
