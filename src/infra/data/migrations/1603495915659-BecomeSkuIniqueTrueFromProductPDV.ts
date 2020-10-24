import {MigrationInterface, QueryRunner} from "typeorm";

export class BecomeSkuIniqueTrueFromProductPDV1603495915659 implements MigrationInterface {
    name = 'BecomeSkuIniqueTrueFromProductPDV1603495915659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" ADD CONSTRAINT "UQ_ba0d3485178d00856f42927cfec" UNIQUE ("sku")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" DROP CONSTRAINT "UQ_ba0d3485178d00856f42927cfec"`);
    }

}
