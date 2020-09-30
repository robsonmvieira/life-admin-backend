import {MigrationInterface, QueryRunner} from "typeorm";

export class AddItemSalesWithRelationships1601160993860 implements MigrationInterface {
    name = 'AddItemSalesWithRelationships1601160993860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "item_sales_PDV" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "product_quantity" integer NOT NULL, "total" integer NOT NULL, "product_pdv_id" character varying NOT NULL, "salesPDVId" uuid, CONSTRAINT "PK_619cc52400a17cf4ea2814596e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "item_sales_PDV" ADD CONSTRAINT "FK_090aed0fe8d10a5f8b3c80b8d0c" FOREIGN KEY ("salesPDVId") REFERENCES "sales_PDV"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_sales_PDV" DROP CONSTRAINT "FK_090aed0fe8d10a5f8b3c80b8d0c"`);
        await queryRunner.query(`DROP TABLE "item_sales_PDV"`);
    }

}
