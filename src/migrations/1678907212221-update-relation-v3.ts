import { MigrationInterface, QueryRunner } from "typeorm";

export class updateRelationV31678907212221 implements MigrationInterface {
    name = 'updateRelationV31678907212221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user_task\` DROP FOREIGN KEY \`FK_8c3de90b3f84f555158abb989b1\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_task\` DROP FOREIGN KEY \`FK_46d6ee5a89290d66abf7b0622a1\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_task\` CHANGE \`user_id\` \`user_id\` bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_task\` CHANGE \`task_id\` \`task_id\` bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_9eecdb5b1ed8c7c2a1b392c28d4\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`tasks\` CHANGE \`project_id\` \`project_id\` bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_22b2bcb031a944b0859d5afd0b2\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`project_id\` \`project_id\` bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_task\`
            ADD CONSTRAINT \`FK_8c3de90b3f84f555158abb989b1\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_task\`
            ADD CONSTRAINT \`FK_46d6ee5a89290d66abf7b0622a1\` FOREIGN KEY (\`task_id\`) REFERENCES \`tasks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD CONSTRAINT \`FK_9eecdb5b1ed8c7c2a1b392c28d4\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_9eecdb5b1ed8c7c2a1b392c28d4\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_task\` DROP FOREIGN KEY \`FK_46d6ee5a89290d66abf7b0622a1\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_task\` DROP FOREIGN KEY \`FK_8c3de90b3f84f555158abb989b1\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`project_id\` \`project_id\` bigint NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD CONSTRAINT \`FK_22b2bcb031a944b0859d5afd0b2\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`tasks\` CHANGE \`project_id\` \`project_id\` bigint NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD CONSTRAINT \`FK_9eecdb5b1ed8c7c2a1b392c28d4\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_task\` CHANGE \`task_id\` \`task_id\` bigint NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_task\` CHANGE \`user_id\` \`user_id\` bigint NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_task\`
            ADD CONSTRAINT \`FK_46d6ee5a89290d66abf7b0622a1\` FOREIGN KEY (\`task_id\`) REFERENCES \`tasks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user_task\`
            ADD CONSTRAINT \`FK_8c3de90b3f84f555158abb989b1\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
