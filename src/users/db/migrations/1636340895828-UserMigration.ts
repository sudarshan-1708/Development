import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1636340895828 implements MigrationInterface {
    name = 'UserMigration1636340895828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "emailId" varchar NOT NULL, "phoneNumber" integer NOT NULL, "city" varchar NOT NULL, "state" varchar NOT NULL, "country" varchar NOT NULL, "password" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
