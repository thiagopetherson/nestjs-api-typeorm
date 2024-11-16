import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module'; // Importando o módulo
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';

@Module({
  imports: [   
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60, // Em sessenta segundos
          limit: 20, // Vamos querer que a aplicação receba no máximo 20 requisições
        },
      ],
    }),
    forwardRef(() => UserModule), 
    forwardRef(() => AuthModule),
    MailerModule.forRoot({ // Essa é a configuração do email 
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'jackeline.medhurst@ethereal.email',
            pass: 'Jre6hNV6YcHjcnKbrW'
        }
      },
      defaults: {
        from: '"Thiago" <jackeline.medhurst@ethereal.email>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        }
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNANE || 'root',
      password: process.env.DB_PASSWORD || '505987',
      database: process.env.DB_DATABASE || 'hcode_nest',
      entities: [UserEntity],
      synchronize: process.env.ENVIRONMENT === 'development', // Temos que ter cuidado com isso, pois apaga os dados no banco (em produção, provavelmente não usaria isso)
    })
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
