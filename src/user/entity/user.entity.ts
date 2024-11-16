import { Role } from "src/enums/role.enums";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

// Toda entidade precisa ter esse decorator (e cada campo da entidade também precisa de um decorator)
@Entity({
  name: 'users', // Dizendo qual é o nome da tabela no banco na qual essa entidade está relacionada
}) 
export class UserEntity {

  // Esse primeiro é chave primária
  @PrimaryGeneratedColumn({
    unsigned: true
  })
  id: number;

  @Column({
    length: 63 // tamanho do campo
  })
  name: string;

  @Column({
    length: 127,
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'date',
    nullable: true
  })
  birth: Date;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({
    default: Role.User
  })
  role: number;
}