import { Test, TestingModule } from '@nestjs/testing';
import { getPhoto } from '../testing/file/get-photo.mock';
import { FileService } from './file.service';

describe('FileService', () => {
  // Instância do FileService que será utilizada nos testes
  let fileService: FileService;

  // Configurações que serão executadas antes de cada teste
  beforeEach(async () => {
    // Cria um módulo de teste e registra o FileService como provider
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService], // Define o FileService como dependência
    }).compile();

    // Recupera a instância do FileService para uso nos testes
    fileService = module.get<FileService>(FileService);
  });

  // Valida se o FileService foi definido corretamente
  it('Validar a definição', () => {
    expect(fileService).toBeDefined(); // Verifica se a instância não é indefinida
  });

  // Conjunto de testes específicos do FileService
  describe('Teste do File Service', () => {
    // Teste para o método upload
    it('upload method', async () => {
      const photo = await getPhoto(); // Obtém uma foto simulada para o teste
      const filename = 'photo-test.png'; // Define o nome do arquivo para o teste
      fileService.uploadFile(photo, filename); // Chama o método upload do FileService
    });
  });
});
