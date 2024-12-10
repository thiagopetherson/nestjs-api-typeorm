import { CanActivate } from '@nestjs/common';

// Mock de um guard que implementa a interface CanActivate
// Este mock é utilizado em testes para simular o comportamento de um guard
export const guardMock: CanActivate = {
  // A função `canActivate` é mockada utilizando o Jest para retornar `true` por padrão
  // Isso significa que o acesso será sempre permitido durante os testes
  canActivate: jest.fn(() => true),
};
