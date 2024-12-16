import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../guards/auth.guard';
// import { accessToken } from '../testing/auth/auth-reset-dto.mock';
import { authForgetDTO } from '../testing/auth/auth-forget-dto.mock';
import { authLoginDTO } from '../testing/auth/auth-login-dto.mock';
import { authRegisterDTO } from '../testing/auth/auth-register-dto.mock';
import { authResetDTO } from '../testing/auth/auth-reset-dto.mock';
import { authServiceMock } from '../testing/auth/auth-service.mock';
import { fileServiceMock } from '../testing/file/file-service.mock';
// import { getPhoto } from '../testing/file/get-photo.mock';
import { guardMock } from '../testing/user/guard.mock';
import { userEntityList } from '../testing/user/user-entity-list.mock';
import { AuthController } from './auth.controller';
import { userServiceMock } from '../testing/user/user-service.mock';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock, userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('Validar a definição', () => {
    expect(authController).toBeDefined();
  });

  describe('Fluxo de autenticação', () => {
    /*
    it('login method', async () => {
      const result = await authController.login(authLoginDTO);
      expect(result).toEqual({ authLoginDTO });
    });
    */
    /*
    it('register method', async () => {
      const result = await authController.register(authRegisterDTO);
      expect(result).toEqual({ authRegisterDTO });
    });
    */
    it('forget method', async () => {
      const result = await authController.forget(authForgetDTO);
      expect(result).toEqual({ success: true });
    });
    /*
    it('reset method', async () => {
      const result = await authController.reset(authResetDTO);
      expect(result).toEqual({ authResetDTO });
    });
    */
  });

  describe('Rotas autenticadas', () => {
    it('me method', async () => {
      const result = await authController.me(userEntityList[0]);
      expect(result).toEqual(userEntityList[0]);
    });
    /*
    it('uploadPhoto method', async () => {
      const photo = await getPhoto();
      const result = await authController.uploadPhoto(userEntityList[0], photo);
      expect(result).toEqual(photo);
    });
    */
  });
});
