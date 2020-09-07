import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableProduct1599479684371 implements MigrationInterface {
    name = 'alterTableProduct1599479684371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_sale" DROP COLUMN "volume_points"`);
        await queryRunner.query(`ALTER TABLE "products_sale" ADD "volume_points" numeric(5,2) NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "products_sale" DROP COLUMN "price_suggest"`);
        await queryRunner.query(`ALTER TABLE "products_sale" ADD "price_suggest" numeric(5,2) NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "products_sale" DROP COLUMN "from_zero_to_four_hundred_ninety_nine"`);
        await queryRunner.query(`ALTER TABLE "products_sale" ADD "from_zero_to_four_hundred_ninety_nine" numeric(5,2) NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "products_sale" DROP COLUMN "from_five_hundred_to_nine_hundred_ninety_nine"`);
        await queryRunner.query(`ALTER TABLE "products_sale" ADD "from_five_hundred_to_nine_hundred_ninety_nine" numeric(5,2) NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "products_sale" DROP COLUMN "from_one_thousand_to_three_thousand_nine_hundred_ninety_nine"`);
        await queryRunner.query(`ALTER TABLE "products_sale" ADD "from_one_thousand_to_three_thousand_nine_hundred_ninety_nine" numeric(5,2) NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "products_sale" DROP COLUMN "more_than_four_thousand"`);
        await queryRunner.query(`ALTER TABLE "products_sale" ADD "more_than_four_thousand" numeric(5,2) NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "products_sale" DROP COLUMN "cost_per_pv"`);
        await queryRunner.query(`ALTER TABLE "products_sale" ADD "cost_per_pv" numeric(5,2) NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_sale" DROP COLUMN "cost_per_pv"`);
        await queryRunner.query(`ALTER TABLE "products_sale" ADD "cost_per_pv" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products_sale" DROP COLUMN "more_than_four_thousand"`);
        await queryRunner.query(`ALTER TABLE "products_sale" ADD "more_than_four_thousand" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products_sale" DROP COLUMN "from_one_thousand_to_three_thousand_nine_hundred_ninety_nine"`);
        await queryRunner.query(`ALTER TABLE "products_sale" ADD "from_one_thousand_to_three_thousand_nine_hundred_ninety_nine" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products_sale" DROP COLUMN "from_five_hundred_to_nine_hundred_ninety_nine"`);
        await queryRunner.query(`ALTER TABLE "products_sale" ADD "from_five_hundred_to_nine_hundred_ninety_nine" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products_sale" DROP COLUMN "from_zero_to_four_hundred_ninety_nine"`);
        await queryRunner.query(`ALTER TABLE "products_sale" ADD "from_zero_to_four_hundred_ninety_nine" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products_sale" DROP COLUMN "price_suggest"`);
        await queryRunner.query(`ALTER TABLE "products_sale" ADD "price_suggest" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products_sale" DROP COLUMN "volume_points"`);
        await queryRunner.query(`ALTER TABLE "products_sale" ADD "volume_points" integer NOT NULL`);
    }

}
