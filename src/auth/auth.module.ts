import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
import { FileModule } from "src/file/file.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entity/user.entity";

@Module({
  imports: [    
    JwtModule.register({
      secret: String(process.env.JWT_SECRET) // Definimos esse hash de 32 digitos aleatoriamente (peguei em um site)
    }),
    forwardRef(() => UserModule), // Importando o Módulo de user, pois então podemos usar services de user (tem métodos lá que servem para usar nesse controler aqui)
    FileModule,
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [AuthController], // Registrando o controller
  providers: [AuthService], // Adicionando o service
  exports: [AuthService] // Exportando para terem acesso.
})

export class AuthModule {

}