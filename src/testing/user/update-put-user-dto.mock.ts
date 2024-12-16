import { UpdatePutUserDTO } from '../../user/DTO/update-put-user.dto';
import { Role } from '../../enums/role.enums';

// Simulando o DTO
export const updatePutUserDTO: UpdatePutUserDTO = {
  birth: '2000-01-01',
  email: 'thipetherson@gmail.com',
  name: 'Thiago Petherson',
  password: 'Lost@4815162342',
  role: Role.Admin,
};
