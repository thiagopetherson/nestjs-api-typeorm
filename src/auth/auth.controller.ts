import { BadRequestException, Body, Controller, FileTypeValidator, Headers, 
  MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, Req } from "@nestjs/common";
import { AuthLoginDTO } from "./DTO/auth-login.dto";
import { AuthRegisterDTO } from "./DTO/auth-register.dto";
import { AuthForgetDTO } from "./DTO/auth-forget.dto";
import { AuthResetDTO } from "./DTO/auth-reset.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "../guards/auth.guard";
import { User } from "../decorators/user.decorator";
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { UserService } from "../user/user.service";
import { FileService } from "../file/file.service";
import { UserEntity } from "../user/entity/user.entity";

@Controller('auth') // As url da nossa rota de autenticação estará dentro desse path ('auth')
export class AuthController {

  constructor ( private readonly userService: UserService, private readonly authService: AuthService, private readonly fileService: FileService) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email,password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password,token);
  }

  @UseGuards(AuthGuard) // Chamando e Usando o guard que criamos
  @Post('me')
  async me(@User() user: UserEntity) {
    return user;
  }

  // Usando o decorator @UseInterceptors, e o FileInterceptor do Express
  @UseInterceptors(FileInterceptor('file')) // O argumento é o nome do campo que vem com o arquivo da requisição
  @UseGuards(AuthGuard)
  @Post('file')
  async uploadFile(
    @User() user: UserEntity, 
    @UploadedFile(new ParseFilePipe({ validators: [ new FileTypeValidator({ fileType: 'image/png' }), new MaxFileSizeValidator({ maxSize: 1024 * 20 }) ] })) 
    file: Express.Multer.File) 
    {    

    const filename = `file-${user.id}.png`

    try {
      await this.fileService.uploadFile(file, filename);
    } catch (e) {
      throw new BadRequestException(e);
    }

    return file;
  }

  // Usando o decorator @UseInterceptors, e o FilesInterceptor do Express
  @UseInterceptors(FileFieldsInterceptor([{
    name: 'file1',
    maxCount: 1 // 1 arquivos no máximo
  },{
    name: 'file2',
    maxCount: 2 // 1 arquivos no máximo
  }]))
  @UseGuards(AuthGuard)
  @Post('files')
  async uploadFiles(@User() user, @UploadedFiles() files: { file1: Express.Multer.File, file2: Express.Multer.File[] }) {

    return files;
  }

}
