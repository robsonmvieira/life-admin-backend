import {  MigrationInterface, QueryRunner } from 'typeorm'

export class AddCollaborators1599940124433 implements MigrationInterface {
  name = 'AddCollaborators1599940124433'

  public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "collaborators" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "password" character varying NOT NULL, "email" character varying NOT NULL, "cpf" character varying NOT NULL, "position" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "company_id" character varying NOT NULL, "userId" uuid, CONSTRAINT "UQ_b210f505222bd59004a77165857" UNIQUE ("email"), CONSTRAINT "PK_f579a5df9d66287f400806ad875" PRIMARY KEY ("id"))')
        await queryRunner.query('CREATE TABLE "collaborators_permissions_permissions" ("collaboratorsId" uuid NOT NULL, "permissionsId" uuid NOT NULL, CONSTRAINT "PK_5909c77bf4a21c4369664b563e1" PRIMARY KEY ("collaboratorsId", "permissionsId"))')
        await queryRunner.query('CREATE INDEX "IDX_794460ea92273ea774f777411b" ON "collaborators_permissions_permissions" ("collaboratorsId") ')
        await queryRunner.query('CREATE INDEX "IDX_a55ec2983365647d041bb3b408" ON "collaborators_permissions_permissions" ("permissionsId") ')
        await queryRunner.query('CREATE TABLE "collaborators_roles_roles" ("collaboratorsId" uuid NOT NULL, "rolesId" uuid NOT NULL, CONSTRAINT "PK_5041a4bb151ea4d18c6523b7d2a" PRIMARY KEY ("collaboratorsId", "rolesId"))')
        await queryRunner.query('CREATE INDEX "IDX_e9731d44f4f7fafed1ad6c84b4" ON "collaborators_roles_roles" ("collaboratorsId") ')
        await queryRunner.query('CREATE INDEX "IDX_efed00fbd331dc067d9c463df2" ON "collaborators_roles_roles" ("rolesId") ')
        await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "isAdmin" SET DEFAULT true')
        await queryRunner.query('ALTER TABLE "collaborators" ADD CONSTRAINT "FK_e5b82c5ada6a6557ec22f219b30" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
        await queryRunner.query('ALTER TABLE "collaborators_permissions_permissions" ADD CONSTRAINT "FK_794460ea92273ea774f777411b7" FOREIGN KEY ("collaboratorsId") REFERENCES "collaborators"("id") ON DELETE CASCADE ON UPDATE NO ACTION')
        await queryRunner.query('ALTER TABLE "collaborators_permissions_permissions" ADD CONSTRAINT "FK_a55ec2983365647d041bb3b4082" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION')
        await queryRunner.query('ALTER TABLE "collaborators_roles_roles" ADD CONSTRAINT "FK_e9731d44f4f7fafed1ad6c84b40" FOREIGN KEY ("collaboratorsId") REFERENCES "collaborators"("id") ON DELETE CASCADE ON UPDATE NO ACTION')
        await queryRunner.query('ALTER TABLE "collaborators_roles_roles" ADD CONSTRAINT "FK_efed00fbd331dc067d9c463df2d" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION')
    }

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "collaborators_roles_roles" DROP CONSTRAINT "FK_efed00fbd331dc067d9c463df2d"')
        await queryRunner.query('ALTER TABLE "collaborators_roles_roles" DROP CONSTRAINT "FK_e9731d44f4f7fafed1ad6c84b40"')
        await queryRunner.query('ALTER TABLE "collaborators_permissions_permissions" DROP CONSTRAINT "FK_a55ec2983365647d041bb3b4082"')
        await queryRunner.query('ALTER TABLE "collaborators_permissions_permissions" DROP CONSTRAINT "FK_794460ea92273ea774f777411b7"')
        await queryRunner.query('ALTER TABLE "collaborators" DROP CONSTRAINT "FK_e5b82c5ada6a6557ec22f219b30"')
        await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "isAdmin" SET DEFAULT false')
        await queryRunner.query('DROP INDEX "IDX_efed00fbd331dc067d9c463df2"')
        await queryRunner.query('DROP INDEX "IDX_e9731d44f4f7fafed1ad6c84b4"')
        await queryRunner.query('DROP TABLE "collaborators_roles_roles"')
        await queryRunner.query('DROP INDEX "IDX_a55ec2983365647d041bb3b408"')
        await queryRunner.query('DROP INDEX "IDX_794460ea92273ea774f777411b"')
        await queryRunner.query('DROP TABLE "collaborators_permissions_permissions"')
        await queryRunner.query('DROP TABLE "collaborators"')
    }
}
