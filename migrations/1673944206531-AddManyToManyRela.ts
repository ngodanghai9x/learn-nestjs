import { MigrationInterface, QueryRunner } from "typeorm";

export class AddManyToManyRela1673944206531 implements MigrationInterface {
    name = 'AddManyToManyRela1673944206531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employees" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_to_companies" ("employeeToCompanyId" SERIAL NOT NULL, "employeeId" integer NOT NULL, "companyId" integer NOT NULL, "order" integer NOT NULL, CONSTRAINT "PK_56114d65eb93ed7e00fc5ccac90" PRIMARY KEY ("employeeToCompanyId"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" SERIAL NOT NULL, "website" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee_to_companies" ADD CONSTRAINT "FK_e755744bf6c814ad7686aed2394" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_to_companies" ADD CONSTRAINT "FK_9347f53698172b971f903ebcc04" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_to_companies" DROP CONSTRAINT "FK_9347f53698172b971f903ebcc04"`);
        await queryRunner.query(`ALTER TABLE "employee_to_companies" DROP CONSTRAINT "FK_e755744bf6c814ad7686aed2394"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "employee_to_companies"`);
        await queryRunner.query(`DROP TABLE "employees"`);
    }

}
