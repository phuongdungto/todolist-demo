import { MigrationInterface, QueryRunner } from "typeorm";

export class updateRelation1678883602238 implements MigrationInterface {
    name = 'updateRelation1678883602238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_bd55b203eb9f92b0c8390380010\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\` CHANGE \`user_id\` \`leader_id\` bigint NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`status\` int NOT NULL DEFAULT '1'
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`role\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`product_id\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`project_id\` bigint NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\` DROP COLUMN \`leader_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD \`leader_id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD CONSTRAINT \`FK_22b2bcb031a944b0859d5afd0b2\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_22b2bcb031a944b0859d5afd0b2\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\` DROP COLUMN \`leader_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD \`leader_id\` bigint NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`project_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`product_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`role\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`status\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\` CHANGE \`leader_id\` \`user_id\` bigint NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD CONSTRAINT \`FK_bd55b203eb9f92b0c8390380010\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
