import { Role } from '../../enums/role.enums';
import { UserEntity } from '../../user/entity/user.entity';

// Criando um entidade (Criando uma lista para simular ter uma lista de dados no banco (como se fosse um factory do laravel))
export const userEntityList: UserEntity[] = [
  {
    id: 1,
    birth: new Date('2000-01-01'),
    email: 'thipetherson@gmail.com',
    name: 'Thiago Petherson',
    password: '$2b$10$baUpnE.jgHieEgqDR/8c2ejkh3y55LV2LpQNfswJwhqW3NR7BFU1K',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    birth: new Date('2000-01-01'),
    email: 'vanessa@gmail.com',
    name: 'Vanessa Alonso',
    password: '$2b$10$baUpnE.jgHieEgqDR/8c2ejkh3y55LV2LpQNfswJwhqW3NR7BFU1K',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    birth: new Date('2000-01-01'),
    email: 'caio@gmail.com',
    name: 'Caio Ricardo',
    password: '$2b$10$baUpnE.jgHieEgqDR/8c2ejkh3y55LV2LpQNfswJwhqW3NR7BFU1K',
    role: Role.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
