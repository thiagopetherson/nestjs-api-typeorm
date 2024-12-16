import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userRepositoryMock } from '../testing/user/user-repository.mock'; // Importando o mock que criamos
import { userEntityList } from '../testing/user/user-entity-list.mock';
import { createUserDTO } from '../testing/user/create-user-dto.mock';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { updatePutUserDTO } from '../testing/user/update-put-user-dto.mock';
import { updatePatchUserDTO } from '../testing/user/update-patch-user-dto.mock';

// Criando um entidade (Criando uma lista para simular ter uma lista de dados no banco (como se fosse um factory))

// Usamos describe para agrupar vários testes
describe('UserService', () => {
  let userService: UserService; // Extraindo o UserService
  let userRepository: Repository<UserEntity>; // Extraindo o UserRepository

  // Usamos o beforeEach sempre antes de cada teste
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        userRepositoryMock, // Mock
      ],
    }).compile();

    // Retirando um módulo
    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('Validar a definição do UserService e UserRepository (ver se existem)', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  // Testando o UserService
  describe('Store', () => {
    it('Method store', async () => {
      // A função spyOn do Jest serve para espionar alguma coisa (abaixo, no caso, é o método exist do userrepository)
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false); // mockResolvedValueOnce diz que será só uma vez

      // Criando o usuário
      const result = await userService.store(createUserDTO);

      // Comparando a resposta com o resultado esperado (no caso abaixo, o primeiro registro)
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Index', () => {
    it('Method index', async () => {
      // Pegando os usuários
      const result = await userService.index();

      // Comparando a resposta com o resultado esperado (no caso abaixo, uma lista de registros)
      expect(result).toEqual(userEntityList);
    });
  });

  describe('Show', () => {
    it('Method show', async () => {
      // Pegando os usuários
      const result = await userService.show(1);

      // Comparando a resposta com o resultado esperado (no caso abaixo, o primeiro registro)
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    it('Method update', async () => {
      // Atualizando o usuário
      const result = await userService.update(1, updatePutUserDTO);

      // Comparando a resposta com o resultado esperado (no caso abaixo, o primeiro registro)
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('UpdatePartial', () => {
    it('Method updatePartial', async () => {
      // Atualizando um dado o usuário
      const result = await userService.updatePartial(1, updatePatchUserDTO);

      // Comparando a resposta com o resultado esperado (no caso abaixo, o primeiro registro)
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    it('Method delete', async () => {
      // Deletando um usuário
      const result = await userService.delete(1);

      // Comparando a resposta com o resultado esperado (no caso abaixo, o primeiro registro)
      expect(result).toEqual(true);
    });
  });
});
