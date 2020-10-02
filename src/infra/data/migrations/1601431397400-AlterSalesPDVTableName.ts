import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterSalesPDVTableName1601431397400 implements MigrationInterface {
    name = 'AlterSalesPDVTableName1601431397400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_sales_PDV" DROP CONSTRAINT "FK_090aed0fe8d10a5f8b3c80b8d0c"`);
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" DROP CONSTRAINT "FK_7e8a5f344989eb6051f2337d323"`);
        await queryRunner.query(`CREATE TABLE "sales_pdv" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "collaborator_id" character varying, "type_of_payment" character varying NOT NULL, "sub_total" character varying, "descount" integer DEFAULT 0, "total" character varying, "owner_id" character varying, "ownerId" uuid, "collaboratorId" uuid, CONSTRAINT "REL_4d44ebcd51caaeaefda2cbbf8c" UNIQUE ("ownerId"), CONSTRAINT "REL_557e9fa3a5d618dc4319181a23" UNIQUE ("collaboratorId"), CONSTRAINT "PK_a4cceb902a68061a5e355eddc11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "item_sales_PDV" ADD CONSTRAINT "FK_090aed0fe8d10a5f8b3c80b8d0c" FOREIGN KEY ("salesPDVId") REFERENCES "sales_pdv"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales_pdv" ADD CONSTRAINT "FK_4d44ebcd51caaeaefda2cbbf8c2" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales_pdv" ADD CONSTRAINT "FK_557e9fa3a5d618dc4319181a231" FOREIGN KEY ("collaboratorId") REFERENCES "collaborators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" ADD CONSTRAINT "FK_7e8a5f344989eb6051f2337d323" FOREIGN KEY ("salesId") REFERENCES "sales_pdv"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" DROP CONSTRAINT "FK_7e8a5f344989eb6051f2337d323"`);
        await queryRunner.query(`ALTER TABLE "sales_pdv" DROP CONSTRAINT "FK_557e9fa3a5d618dc4319181a231"`);
        await queryRunner.query(`ALTER TABLE "sales_pdv" DROP CONSTRAINT "FK_4d44ebcd51caaeaefda2cbbf8c2"`);
        await queryRunner.query(`ALTER TABLE "item_sales_PDV" DROP CONSTRAINT "FK_090aed0fe8d10a5f8b3c80b8d0c"`);
        await queryRunner.query(`DROP TABLE "sales_pdv"`);
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" ADD CONSTRAINT "FK_7e8a5f344989eb6051f2337d323" FOREIGN KEY ("salesId") REFERENCES "sales_PDV"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_sales_PDV" ADD CONSTRAINT "FK_090aed0fe8d10a5f8b3c80b8d0c" FOREIGN KEY ("salesPDVId") REFERENCES "sales_PDV"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
