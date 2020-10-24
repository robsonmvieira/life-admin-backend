import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOwnerIdFieldToClient1603564754296 implements MigrationInterface {
    name = 'AddOwnerIdFieldToClient1603564754296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "owner_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "owner_id"`);
    }

}
