import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateClientTable1603562592140 implements MigrationInterface {
    name = 'UpdateClientTable1603562592140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "others" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "others"`);
    }

}
