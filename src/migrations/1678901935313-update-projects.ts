import { MigrationInterface, QueryRunner } from "typeorm";

export class updateProjects1678901935313 implements MigrationInterface {
    name = 'updateProjects1678901935313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`projects\` DROP COLUMN \`leader\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_cb5ae1474bff68b3e0a68f56869\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\` CHANGE \`leader_id\` \`leader_id\` bigint NOT NULL
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
            ALTER TABLE \`projects\` CHANGE \`leader_id\` \`leader_id\` bigint NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD CONSTRAINT \`FK_cb5ae1474bff68b3e0a68f56869\` FOREIGN KEY (\`leader_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD \`leader\` varchar(255) NOT NULL
        `);
    }

}
