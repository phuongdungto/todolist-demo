import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTypeEnum1678979262412 implements MigrationInterface {
    name = 'updateTypeEnum1678979262412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`status\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`status\` enum ('0', '1', '2') NOT NULL DEFAULT '1'
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`role\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`role\` enum ('admin', 'member', 'manager') NOT NULL DEFAULT 'member'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`role\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`role\` varchar(255) NOT NULL DEFAULT 'member'
        `);
        await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`status\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`status\` int NOT NULL DEFAULT '1'
        `);
    }

}
