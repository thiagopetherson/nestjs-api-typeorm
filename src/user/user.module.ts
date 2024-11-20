import { Module, NestModule, MiddlewareConsumer, RequestMethod, forwardRef } from "@nestjs/common"
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserIdCheckMiddleware } from "../middlewares/user-id-check.middleware";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";

@Module({
  imports: [
    forwardRef(() => AuthModule), 
    TypeOrmModule.forFeature([UserEntity])
  ], // Outros módulos que queremos importar
  controllers: [UserController], // Controllers que importaremos
  providers: [UserService], // Classes que podem prover um serviço, que podem ser injetadas
  exports: [UserService] // Recursos que temos aqui e vamos querer exportar caso algum outro módulo importe esser aqui
})

export class UserModule implements NestModule {

  // Implementamos isso por implementar o middleware
  configure(consumer: MiddlewareConsumer) {

    // Esse apply consegue aplicar um middleware no nosso módulo
    // O RequestMethod é um enum que serve para pegar o enum dos métodos
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL
    });
  }
}