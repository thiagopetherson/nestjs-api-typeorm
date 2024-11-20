import { Test, TestingModule } from '@nestjs/testing';
import { accessToken } from '../testing/auth/access-token.mock';
import { authRegisterDTO } from '../testing/auth/auth-register-dto.mock';
import { jwtPayload } from '../testing/auth/jwt-payload.mock';
import { jwtServiceMock } from '../testing/auth/jwt-service.mock';
import { mailerServiceMock } from '../testing/auth/mailer-service.mock';
import { resetToken } from '../testing/auth/reset-token.mock';
import { userEntityList } from '../testing/user/user-entity-list.mock';
import { userRepositoryMock } from '../testing/user/user-repository.mock';
import { userServiceMock } from '../testing/user/user-service.mock';
import { AuthService } from './auth.service';

describe('AuthService', () => {

  let authService: AuthService; // Extraindo o AuthService

  // Usamos o beforeEach sempre antes de cada teste
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        jwtServiceMock,
        userServiceMock,
        mailerServiceMock,
      ],
    }).compile();

    // Retirando um módulo
    authService = module.get<AuthService>(AuthService);
  });

  it('Validar a definição', () => {
    expect(authService).toBeDefined();
  });

  describe('Token', () => {

    // Teste de criação do token
    it('createToken method', () => {
      const result = authService.createToken(userEntityList[0]);

      expect(result).toEqual({ accessToken });
    });

    // Teste de verificar o token
    it('checkToken method', () => {
      const result = authService.checkToken(accessToken);

      expect(result).toEqual(jwtPayload);
    });

    // Teste de validar o token
    it('isValidToken method', () => {
      const result = authService.isValidToken(accessToken);

      expect(result).toEqual(true);
    });
  });

  describe('Autenticação', () => {

    // Teste do login
    it('login method', async () => {
      const result = await authService.login('thipetherson@gmail.com', 'Lost@4815162342');

      expect(result).toEqual({ accessToken });
    });

    // Teste do forget
    it('forget method', async () => {
      const result = await authService.forget('thipetherson@gmail.com');

      expect(result).toEqual({ success: true });
    });

    // Teste de reset
    it('reset method', async () => {
      const result = await authService.reset('Lost@4815162342', resetToken);

      expect(result).toEqual({ accessToken });
    });

    // Teste de register
    it('register method', async () => {
      const result = await authService.register(authRegisterDTO);

      expect(result).toEqual({ accessToken });
    });
  });
});