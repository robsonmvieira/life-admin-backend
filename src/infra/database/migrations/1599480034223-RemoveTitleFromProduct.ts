import { MigrationInterface, QueryRunner } from 'typeorm'

export class RemoveTitleFromProduct1599480034223 implements MigrationInterface {
  name = 'RemoveTitleFromProduct1599480034223'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "products_sale" DROP CONSTRAINT "UQ_3e42803d8a4e2c891f652ddd5a2"'
    )
    await queryRunner.query('ALTER TABLE "products_sale" DROP COLUMN "title"')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "products_sale" ADD "title" character varying NOT NULL'
    )
    await queryRunner.query(
      'ALTER TABLE "products_sale" ADD CONSTRAINT "UQ_3e42803d8a4e2c891f652ddd5a2" UNIQUE ("title")'
    )
  }
}
