import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUser1678881500354 implements MigrationInterface {
    name = 'updateUser1678881500354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`fullname\` varchar(255) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`fullname\`
        `);
    }

}
