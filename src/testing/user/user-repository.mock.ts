import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "../../user/entity/user.entity"; // Se tentar ao caminho que precisa ser mudado quando usa Jest
import { userEntityList } from "./user-entity-list.mock";

export const userRepositoryMock = {
  provide: getRepositoryToken(UserEntity),  // No segundo parâmetro, estamos MOCKANDO a entidade (a função se passará pela UserReposity real)
  useValue: { // As funções que usaremos do repositório MOCKADO acima (Emulando os métodos do repository)
    exist: jest.fn().mockResolvedValue(true), // Passando um booleano, que é o retorno do método exist
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(userEntityList[0]), // Retorna o primeiro item do banco de dados fake
    find: jest.fn().mockResolvedValue(userEntityList), // Passamos a lista inteira
    findOneBy: jest.fn().mockResolvedValue(userEntityList[0]), // Retorna o primeiro item do banco de dados fake
    update: jest.fn(),
    delete: jest.fn()
  }
}