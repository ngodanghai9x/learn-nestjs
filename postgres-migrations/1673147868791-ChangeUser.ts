import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUser1673147868791 implements MigrationInterface {
    name = 'ChangeUser1673147868791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "locked_money"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "decimal" numeric`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "money"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "money" money`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_status" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "money"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "money" integer`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "decimal"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "locked_money" integer`);
    }

}
