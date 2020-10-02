import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNameToProductsTableUpdate1601208839049 implements MigrationInterface {
    name = 'AddNameToProductsTableUpdate1601208839049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" DROP COLUMN "name"`);
    }

}
