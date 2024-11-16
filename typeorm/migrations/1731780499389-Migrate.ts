import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1731780499389 implements MigrationInterface {

    // Rodando a migrate para criar os campos
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users', // Nome da tabela
            columns: [ // Colunas
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment', unsigned: true },
                { name: 'name', type: 'varchar', length: '63' },
                { name: 'email', type: 'varchar', length: '127', isUnique: true },
                { name: 'password', type: 'varchar', length: '127' },
                { name: 'birth', type: 'date', isNullable: true },
                { name: 'role', type: 'int', default: '1' },
                { name: 'createdAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP()' },
                { name: 'updatedAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP()' }
            ]
        }));

    }

    // Desfazer o que o comando acima fez
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
