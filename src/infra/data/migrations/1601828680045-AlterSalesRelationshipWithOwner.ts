import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterSalesRelationshipWithOwner1601828680045 implements MigrationInterface {
    name = 'AlterSalesRelationshipWithOwner1601828680045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales_pdv" DROP CONSTRAINT "FK_4d44ebcd51caaeaefda2cbbf8c2"`);
        await queryRunner.query(`ALTER TABLE "sales_pdv" DROP CONSTRAINT "REL_4d44ebcd51caaeaefda2cbbf8c"`);
        await queryRunner.query(`ALTER TABLE "sales_pdv" ADD CONSTRAINT "FK_4d44ebcd51caaeaefda2cbbf8c2" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales_pdv" DROP CONSTRAINT "FK_4d44ebcd51caaeaefda2cbbf8c2"`);
        await queryRunner.query(`ALTER TABLE "sales_pdv" ADD CONSTRAINT "REL_4d44ebcd51caaeaefda2cbbf8c" UNIQUE ("ownerId")`);
        await queryRunner.query(`ALTER TABLE "sales_pdv" ADD CONSTRAINT "FK_4d44ebcd51caaeaefda2cbbf8c2" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
