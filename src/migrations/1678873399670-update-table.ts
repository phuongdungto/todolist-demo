import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTable1678873399670 implements MigrationInterface {
    name = 'updateTable1678873399670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user_task\`
            ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_task\`
            ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_task\`
            ADD \`deleted_at\` datetime(6) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
        `);
        await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
        `);
        await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`deleted_at\` datetime(6) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD \`deleted_at\` datetime(6) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`deleted_at\` datetime(6) NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`deleted_at\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`updated_at\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`created_at\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\` DROP COLUMN \`deleted_at\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\` DROP COLUMN \`updated_at\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\` DROP COLUMN \`created_at\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`deleted_at\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`updated_at\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`created_at\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_task\` DROP COLUMN \`deleted_at\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_task\` DROP COLUMN \`updated_at\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_task\` DROP COLUMN \`created_at\`
        `);
    }

}
