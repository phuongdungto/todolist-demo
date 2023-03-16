import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUserTask1678955594904 implements MigrationInterface {
    name = 'updateUserTask1678955594904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user_task\` DROP COLUMN \`deleted_at\`
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user_task\`
            ADD \`deleted_at\` datetime(6) NULL
        `);
    }

}
