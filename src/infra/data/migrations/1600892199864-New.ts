import {MigrationInterface, QueryRunner} from "typeorm";

export class New1600892199864 implements MigrationInterface {
    name = 'New1600892199864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products_pdv_sale" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "sku" character varying NOT NULL, "owner_id" character varying NOT NULL, "quantity" integer NOT NULL DEFAULT 0, "volume_points" numeric(5,2) NOT NULL DEFAULT 0, "price_suggest" numeric(5,2) NOT NULL DEFAULT 0, "from_zero_to_four_hundred_ninety_nine" numeric(5,2) NOT NULL DEFAULT 0, "from_five_hundred_to_nine_hundred_ninety_nine" numeric(5,2) NOT NULL DEFAULT 0, "from_one_thousand_to_three_thousand_nine_hundred_ninety_nine" numeric(5,2) NOT NULL DEFAULT 0, "more_than_four_thousand" numeric(5,2) NOT NULL DEFAULT 0, "cost_per_pv" numeric(5,2) NOT NULL DEFAULT 0, "category_id" character varying NOT NULL, "ownerId" uuid, "categoryId" uuid, CONSTRAINT "UQ_ba0d3485178d00856f42927cfec" UNIQUE ("sku"), CONSTRAINT "PK_5a3d8d439dad4689b3b90c4ad47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" ADD CONSTRAINT "FK_c1b263d436a2c9cf4f506d00c0c" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" ADD CONSTRAINT "FK_be26858c2ca2ec4a3c115a62365" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" DROP CONSTRAINT "FK_be26858c2ca2ec4a3c115a62365"`);
        await queryRunner.query(`ALTER TABLE "products_pdv_sale" DROP CONSTRAINT "FK_c1b263d436a2c9cf4f506d00c0c"`);
        await queryRunner.query(`DROP TABLE "products_pdv_sale"`);
    }

}
