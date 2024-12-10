import { UserService } from '../../user/user.service';
import { userEntityList } from './user-entity-list.mock';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    show: jest.fn().mockResolvedValue(userEntityList[0]), // Método do service
    store: jest.fn().mockResolvedValue(userEntityList[0]), // Método do service
    index: jest.fn().mockResolvedValue(userEntityList), // Método do service
    update: jest.fn().mockResolvedValue(userEntityList[0]), // Método do service
    updatePartial: jest.fn().mockResolvedValue(userEntityList[0]), // Métodos do service
    delete: jest.fn().mockResolvedValue(true), // Método do service
    exists: jest.fn().mockResolvedValue(true), // Método do service
  },
};