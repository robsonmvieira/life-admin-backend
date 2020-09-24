import {MigrationInterface, QueryRunner} from "typeorm";

export class ADDSalesPDVModels1600986639066 implements MigrationInterface {
    name = 'ADDSalesPDVModels1600986639066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" RENAME COLUMN "name" TO "salesId"`);
        await queryRunner.query(`CREATE TABLE "sales_PDV" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "collaborator_id" character varying NOT NULL, "type_of_payment" character varying NOT NULL, "sub_total" character varying NOT NULL, "descount" integer NOT NULL DEFAULT 0, "total" character varying NOT NULL, "owner_id" character varying NOT NULL, CONSTRAINT "PK_5a9916ed6a350bf58d905d85d26" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" DROP COLUMN "salesId"`);
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" ADD "salesId" uuid`);
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" ADD CONSTRAINT "FK_7e8a5f344989eb6051f2337d323" FOREIGN KEY ("salesId") REFERENCES "sales_PDV"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" DROP CONSTRAINT "FK_7e8a5f344989eb6051f2337d323"`);
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" DROP COLUMN "salesId"`);
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" ADD "salesId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "sales_PDV"`);
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" RENAME COLUMN "salesId" TO "name"`);
    }

}
