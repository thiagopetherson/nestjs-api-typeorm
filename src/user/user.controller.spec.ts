import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../guards/auth.guard'; // Guard responsável por autenticação
import { RoleGuard } from '../guards/role.guard'; // Guard responsável por controle de acesso baseado em roles
import { createUserDTO } from '../testing/user/create-user-dto.mock'; // Mock do DTO para criação de usuários
import { guardMock } from '../testing/user/guard.mock'; // Mock dos guards para testes
import { updatePatchUserDTO } from '../testing/user/update-patch-user-dto.mock'; // Mock do DTO para atualização parcial de usuários
import { updatePutUserDTO } from '../testing/user/update-put-user-dto.mock'; // Mock do DTO para atualização total de usuários
import { userEntityList } from '../testing/user/user-entity-list.mock'; // Mock de uma lista de entidades de usuário
import { userServiceMock } from '../testing/user/user-service.mock'; // Mock do serviço de usuários
import { UserController } from './user.controller'; // Controller que será testado
import { UserService } from './user.service'; // Serviço do usuário

describe('UserController', () => {
  let userController: UserController; // Instância do controller que será testada
  let userService: UserService; // Instância do serviço que será utilizada nos testes

  beforeEach(async () => {
    // Cria o módulo de teste
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController], // Define o UserController como alvo do teste
      providers: [userServiceMock], // Usa o mock do serviço de usuários
    })
      .overrideGuard(AuthGuard) // Sobrescreve o comportamento do AuthGuard
      .useValue(guardMock) // Usa o guardMock no lugar do AuthGuard
      .overrideGuard(RoleGuard) // Sobrescreve o comportamento do RoleGuard
      .useValue(guardMock) // Usa o guardMock no lugar do RoleGuard
      .compile(); // Compila o módulo de teste

    userController = module.get<UserController>(UserController); // Recupera a instância do controller
    userService = module.get<UserService>(UserService); // Recupera a instância do serviço
  });

  it('Validar a definição', () => {
    // Verifica se as instâncias do controller e do serviço foram criadas corretamente
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Teste da aplicação dos Guards neste controle', () => {
    it('Se os guards estão aplicados', () => {
      // Obtém os guards aplicados ao UserController
      const guards = Reflect.getMetadata('__guards__', UserController);

      // Verifica se os guards estão presentes e se são das instâncias corretas
      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Store', () => {
    it('store method', async () => {
      // Testa o método store, que cria um novo usuário
      const result = await userController.store(createUserDTO);

      // Verifica se o resultado corresponde ao primeiro item do mock da lista de usuários
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Index', () => {
    it('index method', async () => {
      // Testa o método index, que lista todos os usuários
      const result = await userController.index();

      // Verifica se o resultado corresponde à lista completa de usuários
      expect(result).toEqual(userEntityList);
    });

    it('show method', async () => {
      // Testa o método show, que exibe um único usuário por ID
      const result = await userController.show(1);

      // Verifica se o resultado corresponde ao primeiro item da lista de usuários
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    it('update method', async () => {
      // Testa o método update, que atualiza completamente um usuário por ID
      const result = await userController.update(updatePutUserDTO, 1);

      // Verifica se o resultado corresponde ao primeiro item da lista de usuários
      expect(result).toEqual(userEntityList[0]);
    });

    it('updatePartial method', async () => {
      // Testa o método updatePartial, que atualiza parcialmente um usuário por ID
      const result = await userController.updatePartial(updatePatchUserDTO, 1);

      // Verifica se o resultado corresponde ao primeiro item da lista de usuários
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    it('delete method', async () => {
      // Testa o método delete, que remove um usuário por ID
      const result = await userController.delete(1);

      // Verifica se o resultado indica sucesso
      expect(result).toEqual({ success: true });
    });
  });
});
