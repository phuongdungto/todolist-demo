import { MigrationInterface, QueryRunner } from "typeorm";

export class updateRelationV21678885295463 implements MigrationInterface {
    name = 'updateRelationV21678885295463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`product_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD \`leader\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\` DROP COLUMN \`leader_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD \`leader_id\` bigint NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`role\` \`role\` varchar(255) NOT NULL DEFAULT 'member'
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD CONSTRAINT \`FK_cb5ae1474bff68b3e0a68f56869\` FOREIGN KEY (\`leader_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_cb5ae1474bff68b3e0a68f56869\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`role\` \`role\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\` DROP COLUMN \`leader_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD \`leader_id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\` DROP COLUMN \`leader\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`product_id\` int NOT NULL
        `);
    }

}
