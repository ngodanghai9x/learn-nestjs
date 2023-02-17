import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1676623871903 implements MigrationInterface {
    name = 'Init1676623871903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`employees\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee_to_companies\` (\`employeeToCompanyId\` int NOT NULL AUTO_INCREMENT, \`employeeId\` int NOT NULL, \`companyId\` int NOT NULL, \`order\` int NOT NULL, PRIMARY KEY (\`employeeToCompanyId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`companies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`website\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role_name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`full_name\` varchar(255) NOT NULL, \`role_id\` int NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, \`birthday\` date NULL, \`bank_number\` varchar(255) NULL, \`decimal\` decimal NULL, \`anti_phishing_code\` varchar(255) NULL, \`user_status\` varchar(255) NOT NULL DEFAULT '', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`more_detail\` varchar(255) NULL, \`user_id\` int NOT NULL, UNIQUE INDEX \`REL_ef1a1915f99bcf7a87049f7449\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`employee_to_companies\` ADD CONSTRAINT \`FK_e755744bf6c814ad7686aed2394\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employees\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee_to_companies\` ADD CONSTRAINT \`FK_9347f53698172b971f903ebcc04\` FOREIGN KEY (\`companyId\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_details\` ADD CONSTRAINT \`FK_ef1a1915f99bcf7a87049f74494\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_details\` DROP FOREIGN KEY \`FK_ef1a1915f99bcf7a87049f74494\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``);
        await queryRunner.query(`ALTER TABLE \`employee_to_companies\` DROP FOREIGN KEY \`FK_9347f53698172b971f903ebcc04\``);
        await queryRunner.query(`ALTER TABLE \`employee_to_companies\` DROP FOREIGN KEY \`FK_e755744bf6c814ad7686aed2394\``);
        await queryRunner.query(`DROP INDEX \`REL_ef1a1915f99bcf7a87049f7449\` ON \`user_details\``);
        await queryRunner.query(`DROP TABLE \`user_details\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`companies\``);
        await queryRunner.query(`DROP TABLE \`employee_to_companies\``);
        await queryRunner.query(`DROP TABLE \`employees\``);
    }

}
