import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdatePutUserDTO } from './DTO/update-put-user.dto';
import { UpdatePatchUserDTO } from './DTO/update-patch-user.dto';
import * as bcrypt from 'bcrypt'; // importamos a biblioteca assim pq ela não foi escrita em JS
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  // Construtor (ali estamos tipando)
  constructor(
    @InjectRepository(UserEntity) // Precisamos usar esse decorator para usar o repository (injetar a entidade no repository)
    private userRepository: Repository<UserEntity>,
  ) {}

  // Métodos
  async store(data: CreateUserDTO) {
    // Verificando se existe esse email cadastrado
    if (await this.userRepository.exist({ where: { email: data.email } })) {
      throw new BadRequestException('Esse email já está sendo usado.');
    }

    const salt = await bcrypt.genSalt();

    // O segundo parâmetro é a força do HASH (como sugestão, colocamos ali pra própria lib decidir. Mas poderiamos passar um valor ali, como 10 por exemplo)
    data.password = await bcrypt.hash(data.password, salt); // Estamos criando um hash da senha recebida como string

    // Pegando a instância do usuário
    const user = this.userRepository.create(data);

    // Salvando no banco
    return await this.userRepository.save(user);
  }

  async index() {
    return await this.userRepository.find(); // find retorna todos os dados
  }

  async show(id: number) {
    // Tipamos pra dizer que o id é do tipo number

    // Verificando se o usuário existe
    this.exists(id);

    // O findOneBy() funcionaria também. Então não precisaríamos do where
    return await this.userRepository.findOneBy({
      id,
    });
  }

  async update(
    id: number,
    { email, name, password, birth, role }: UpdatePutUserDTO,
  ) {
    // Verificando se o usuário existe
    this.exists(id);

    const salt = await bcrypt.genSalt();

    // O segundo parâmetro é a força do HASH (como sugestão, colocamos ali pra própria lib decidir. Mas poderiamos passar um valor ali, como 10 por exemplo)
    password = await bcrypt.hash(password, salt); // Estamos criando um hash da senha recebida como string

    // Abaixo, aquela condicional no birth é para o caso de vir null e também para converter a string date para o formato (que é o esperado pelo Prisma)
    await this.userRepository.update(id, {
      email,
      name,
      password,
      birth: birth ? new Date(birth) : null,
      role,
    });

    return this.show(id);
  }

  async updatePartial(
    id: number,
    { email, name, password, birth, role }: UpdatePatchUserDTO,
  ) {
    // Verificando se o usuário existe
    this.exists(id);

    const data: any = {};

    // Se existir o campo 'birth' então vamos convertê-lo
    if (birth) {
      data.birth = new Date(birth);
    }

    if (email) {
      data.email = email;
    }

    if (name) {
      data.name = name;
    }

    if (password) {
      const salt = await bcrypt.genSalt();

      // O segundo parâmetro é a força do HASH (como sugestão, colocamos ali pra própria lib decidir. Mas poderiamos passar um valor ali, como 10 por exemplo)
      password = await bcrypt.hash(password, salt); // Estamos criando um hash da senha recebida como string

      data.password = password;
    }

    if (role) {
      data.role = role;
    }

    await this.userRepository.update(id, data);

    return this.show(id);
  }

  async delete(id: number) {
    // Verificando se o usuário existe
    this.exists(id);

    await this.userRepository.delete(id);

    return true;
  }

  async exists(id: number) {
    // Verifica se o usuário existe. Se não, chamará uma exception
    if (!(await this.userRepository.exist({ where: { id } }))) {
      throw new NotFoundException(`O usuário ${id} não existe.`);
    }
  }
}
