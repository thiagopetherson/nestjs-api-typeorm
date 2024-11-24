import { FileService } from '../../file/file.service';

// Mock do FileService para ser utilizado nos testes
export const fileServiceMock = {
  provide: FileService, // Define que este mock substituirá a dependência do FileService nos testes
  useValue: {
    getDestinationPath: jest.fn(), // Mocka o método getDestinationPath
    upload: jest.fn().mockResolvedValue(''), // Mocka o método upload e define que ele retorna uma Promise resolvida com uma string vazia
  },
};
