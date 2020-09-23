import {MigrationInterface, QueryRunner} from "typeorm";

export class New1600886472354 implements MigrationInterface {
    name = 'New1600886472354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "owners" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "password" character varying NOT NULL, "email" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_df4ef717018c5dc7bd3f4ab0de5" UNIQUE ("email"), CONSTRAINT "PK_42838282f2e6b216301a70b02d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_sale" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "sku" character varying NOT NULL, "owner_id" character varying NOT NULL, "quantity" integer NOT NULL DEFAULT 0, "volume_points" numeric(5,2) NOT NULL DEFAULT 0, "price_suggest" numeric(5,2) NOT NULL DEFAULT 0, "from_zero_to_four_hundred_ninety_nine" numeric(5,2) NOT NULL DEFAULT 0, "from_five_hundred_to_nine_hundred_ninety_nine" numeric(5,2) NOT NULL DEFAULT 0, "from_one_thousand_to_three_thousand_nine_hundred_ninety_nine" numeric(5,2) NOT NULL DEFAULT 0, "more_than_four_thousand" numeric(5,2) NOT NULL DEFAULT 0, "cost_per_pv" numeric(5,2) NOT NULL DEFAULT 0, "category_id" character varying NOT NULL, "ownerId" uuid, "categoryId" uuid, CONSTRAINT "UQ_ed11b822bf2082544535c813e24" UNIQUE ("sku"), CONSTRAINT "PK_d5b7b959699a980c0dca43fcef8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collaborators" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "password" character varying NOT NULL, "email" character varying NOT NULL, "cpf" character varying NOT NULL, "position" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "owner_id" character varying NOT NULL, "owners_id" uuid, CONSTRAINT "UQ_b210f505222bd59004a77165857" UNIQUE ("email"), CONSTRAINT "PK_f579a5df9d66287f400806ad875" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "owners_permissions_permissions" ("ownersId" uuid NOT NULL, "permissionsId" uuid NOT NULL, CONSTRAINT "PK_ad52773bff0a90c00880cd5fe73" PRIMARY KEY ("ownersId", "permissionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_71c02eac75b1386122c9f685f9" ON "owners_permissions_permissions" ("ownersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_11e9da78ee5f6a75f3e38c4d2d" ON "owners_permissions_permissions" ("permissionsId") `);
        await queryRunner.query(`CREATE TABLE "owners_roles_roles" ("ownersId" uuid NOT NULL, "rolesId" uuid NOT NULL, CONSTRAINT "PK_fb40f2942c08520fecffa3fd21c" PRIMARY KEY ("ownersId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_739ff36541b83a8a9237e35fa2" ON "owners_roles_roles" ("ownersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d8066aceb121c3b892e019b014" ON "owners_roles_roles" ("rolesId") `);
        await queryRunner.query(`CREATE TABLE "collaborators_permissions_permissions" ("collaboratorsId" uuid NOT NULL, "permissionsId" uuid NOT NULL, CONSTRAINT "PK_5909c77bf4a21c4369664b563e1" PRIMARY KEY ("collaboratorsId", "permissionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_794460ea92273ea774f777411b" ON "collaborators_permissions_permissions" ("collaboratorsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a55ec2983365647d041bb3b408" ON "collaborators_permissions_permissions" ("permissionsId") `);
        await queryRunner.query(`CREATE TABLE "collaborators_roles_roles" ("collaboratorsId" uuid NOT NULL, "rolesId" uuid NOT NULL, CONSTRAINT "PK_5041a4bb151ea4d18c6523b7d2a" PRIMARY KEY ("collaboratorsId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e9731d44f4f7fafed1ad6c84b4" ON "collaborators_roles_roles" ("collaboratorsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_efed00fbd331dc067d9c463df2" ON "collaborators_roles_roles" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "products_sale" ADD CONSTRAINT "FK_ec05faf7d58a1e09b57973e1e6c" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_sale" ADD CONSTRAINT "FK_c01839aead3b2aaa0c4e6879a22" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collaborators" ADD CONSTRAINT "FK_d12b775247493ec062e926c7ab2" FOREIGN KEY ("owners_id") REFERENCES "owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "owners_permissions_permissions" ADD CONSTRAINT "FK_71c02eac75b1386122c9f685f92" FOREIGN KEY ("ownersId") REFERENCES "owners"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "owners_permissions_permissions" ADD CONSTRAINT "FK_11e9da78ee5f6a75f3e38c4d2d5" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "owners_roles_roles" ADD CONSTRAINT "FK_739ff36541b83a8a9237e35fa22" FOREIGN KEY ("ownersId") REFERENCES "owners"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "owners_roles_roles" ADD CONSTRAINT "FK_d8066aceb121c3b892e019b0143" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collaborators_permissions_permissions" ADD CONSTRAINT "FK_794460ea92273ea774f777411b7" FOREIGN KEY ("collaboratorsId") REFERENCES "collaborators"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collaborators_permissions_permissions" ADD CONSTRAINT "FK_a55ec2983365647d041bb3b4082" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collaborators_roles_roles" ADD CONSTRAINT "FK_e9731d44f4f7fafed1ad6c84b40" FOREIGN KEY ("collaboratorsId") REFERENCES "collaborators"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collaborators_roles_roles" ADD CONSTRAINT "FK_efed00fbd331dc067d9c463df2d" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collaborators_roles_roles" DROP CONSTRAINT "FK_efed00fbd331dc067d9c463df2d"`);
        await queryRunner.query(`ALTER TABLE "collaborators_roles_roles" DROP CONSTRAINT "FK_e9731d44f4f7fafed1ad6c84b40"`);
        await queryRunner.query(`ALTER TABLE "collaborators_permissions_permissions" DROP CONSTRAINT "FK_a55ec2983365647d041bb3b4082"`);
        await queryRunner.query(`ALTER TABLE "collaborators_permissions_permissions" DROP CONSTRAINT "FK_794460ea92273ea774f777411b7"`);
        await queryRunner.query(`ALTER TABLE "owners_roles_roles" DROP CONSTRAINT "FK_d8066aceb121c3b892e019b0143"`);
        await queryRunner.query(`ALTER TABLE "owners_roles_roles" DROP CONSTRAINT "FK_739ff36541b83a8a9237e35fa22"`);
        await queryRunner.query(`ALTER TABLE "owners_permissions_permissions" DROP CONSTRAINT "FK_11e9da78ee5f6a75f3e38c4d2d5"`);
        await queryRunner.query(`ALTER TABLE "owners_permissions_permissions" DROP CONSTRAINT "FK_71c02eac75b1386122c9f685f92"`);
        await queryRunner.query(`ALTER TABLE "collaborators" DROP CONSTRAINT "FK_d12b775247493ec062e926c7ab2"`);
        await queryRunner.query(`ALTER TABLE "products_sale" DROP CONSTRAINT "FK_c01839aead3b2aaa0c4e6879a22"`);
        await queryRunner.query(`ALTER TABLE "products_sale" DROP CONSTRAINT "FK_ec05faf7d58a1e09b57973e1e6c"`);
        await queryRunner.query(`DROP INDEX "IDX_efed00fbd331dc067d9c463df2"`);
        await queryRunner.query(`DROP INDEX "IDX_e9731d44f4f7fafed1ad6c84b4"`);
        await queryRunner.query(`DROP TABLE "collaborators_roles_roles"`);
        await queryRunner.query(`DROP INDEX "IDX_a55ec2983365647d041bb3b408"`);
        await queryRunner.query(`DROP INDEX "IDX_794460ea92273ea774f777411b"`);
        await queryRunner.query(`DROP TABLE "collaborators_permissions_permissions"`);
        await queryRunner.query(`DROP INDEX "IDX_d8066aceb121c3b892e019b014"`);
        await queryRunner.query(`DROP INDEX "IDX_739ff36541b83a8a9237e35fa2"`);
        await queryRunner.query(`DROP TABLE "owners_roles_roles"`);
        await queryRunner.query(`DROP INDEX "IDX_11e9da78ee5f6a75f3e38c4d2d"`);
        await queryRunner.query(`DROP INDEX "IDX_71c02eac75b1386122c9f685f9"`);
        await queryRunner.query(`DROP TABLE "owners_permissions_permissions"`);
        await queryRunner.query(`DROP TABLE "collaborators"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "products_sale"`);
        await queryRunner.query(`DROP TABLE "owners"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
    }

}
