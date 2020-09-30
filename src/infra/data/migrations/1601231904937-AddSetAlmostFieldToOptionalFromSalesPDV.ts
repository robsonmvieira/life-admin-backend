import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSetAlmostFieldToOptionalFromSalesPDV1601231904937 implements MigrationInterface {
    name = 'AddSetAlmostFieldToOptionalFromSalesPDV1601231904937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales_PDV" ALTER COLUMN "collaborator_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales_PDV" ALTER COLUMN "sub_total" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales_PDV" ALTER COLUMN "descount" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales_PDV" ALTER COLUMN "total" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales_PDV" ALTER COLUMN "owner_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales_PDV" ALTER COLUMN "owner_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales_PDV" ALTER COLUMN "total" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales_PDV" ALTER COLUMN "descount" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales_PDV" ALTER COLUMN "sub_total" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales_PDV" ALTER COLUMN "collaborator_id" SET NOT NULL`);
    }

}
