import { MigrationInterface, QueryRunner } from "typeorm";

export class updateProjectV21678940490230 implements MigrationInterface {
    name = 'updateProjectV21678940490230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_22b2bcb031a944b0859d5afd0b2\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`project_id\` \`project_id\` bigint NULL
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
            ALTER TABLE \`users\` CHANGE \`project_id\` \`project_id\` bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD CONSTRAINT \`FK_22b2bcb031a944b0859d5afd0b2\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
