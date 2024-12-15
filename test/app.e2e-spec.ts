import { Test, TestingModule } from '@nestjs/testing'; // Importação de módulos para testes no NestJS.
import { INestApplication } from '@nestjs/common'; // Interface para representar uma aplicação NestJS.
import * as request from 'supertest'; // Biblioteca para realizar requisições HTTP simuladas.
import { AppModule } from './../src/app.module'; // Importação do módulo principal da aplicação.
import { authRegisterDTO } from '../src/testing/auth/auth-register-dto.mock'; // Mock de dados para registro de usuário.
import { Role } from '../src/enums/role.enums'; // Enum para representar os diferentes papéis de usuário.
import dataSource from '../typeorm/data-source'; // Fonte de dados do TypeORM.

describe('AppController (e2e)', () => {
  let app: INestApplication; // Instância da aplicação NestJS.
  let accessToken: string; // Token de autenticação para requisições protegidas.
  let userId: number; // ID do usuário, usado para manipulação direta no banco de dados.

  // Configuração inicial do módulo e aplicação antes de cada teste
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Fechar a aplicação após cada teste
  afterEach(() => {
    app.close();
  });

  // Teste básico para verificar o endpoint root
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // Teste para registrar um novo usuário
  it('Registrar um novo usuário', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(authRegisterDTO);

    // Valida se o usuário foi registrado com sucesso e se um token de acesso foi retornado.
    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');
  });

  // Teste para realizar login com o novo usuário
  it('Tentar fazer login com o novo usuário', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: authRegisterDTO.email,
        password: authRegisterDTO.password,
      });

    // Verifica o sucesso do login e captura o token de acesso.
    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');

    accessToken = response.body.accessToken;
  });

  // Teste para obter os dados do usuário logado
  it('Obter os dados do usuário logado', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `bearer ${accessToken}`)
      .send();

    // Valida os dados retornados do usuário autenticado.
    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.id).toEqual('number');
    expect(response.body.role).toEqual(Role.User);
  });

  // Teste para registrar um usuário com o papel de administrador
  it('Registrar um novo usuário como administrador', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        ...authRegisterDTO,
        role: Role.Admin,
        email: 'henrique@hcode.com.br',
      });

    // Confirma o registro e captura o token de acesso do novo usuário.
    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');

    accessToken = response.body.accessToken;
  });

  // Teste para validar se o papel do novo usuário ainda é User
  it('Validar de a função do novo usuário ainda é User', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `bearer ${accessToken}`)
      .send();

    // Confirma os detalhes do usuário e armazena o ID para uso posterior.
    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.id).toEqual('number');
    expect(response.body.role).toEqual(Role.User);

    userId = response.body.id;
  });

  // Teste para verificar se um usuário comum não pode listar todos os usuários
  it('Tentar ver a lista de todos os usuários', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `bearer ${accessToken}`)
      .send();

    // Valida o erro de permissão.
    expect(response.statusCode).toEqual(403);
    expect(response.body.error).toEqual('Forbidden');
  });

  // Teste para alterar manualmente o papel do usuário no banco de dados
  it('Alterando manualmente o usuário para a função administrador', async () => {
    const ds = await dataSource.initialize(); // Inicializa a conexão com o banco de dados.
    const queryRunner = ds.createQueryRunner();

    // Atualiza o papel do usuário diretamente no banco.
    await queryRunner.query(`
      UPDATE users SET role = ${Role.Admin} WHERE id = ${userId};
    `);

    // Verifica se a atualização foi realizada com sucesso.
    const rows = await queryRunner.query(`
      SELECT * FROM users WHERE id = ${userId};
    `);

    dataSource.destroy();

    expect(rows.length).toEqual(1);
    expect(rows[0].role).toEqual(Role.Admin);
  });

  // Teste para listar todos os usuários com o acesso de administrador
  it('Tentar ver a lista de todos os usuários, agora com acesso', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `bearer ${accessToken}`)
      .send();

    // Confirma que a lista de usuários foi retornada.
    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(2);
  });
});
