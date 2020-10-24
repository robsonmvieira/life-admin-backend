import {MigrationInterface, QueryRunner} from "typeorm";

export class Client1603559072419 implements MigrationInterface {
    name = 'Client1603559072419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "data_of_birth" TIMESTAMP NOT NULL, "sexo" character varying NOT NULL, "phone" character varying NOT NULL, "CPF" character varying NOT NULL, "email" character varying NOT NULL, "position" character varying NOT NULL, "address" character varying NOT NULL, "neighborhood" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "weight" integer NOT NULL, "height" integer NOT NULL, "allergies" character varying NOT NULL, "last_sale" TIMESTAMP NOT NULL, "premium" boolean NOT NULL DEFAULT false, "triglicerideos" boolean NOT NULL DEFAULT false, "alergia" boolean NOT NULL DEFAULT false, "anemia" boolean NOT NULL DEFAULT false, "colesterol" boolean NOT NULL DEFAULT false, "dor_nas_pernas" boolean NOT NULL DEFAULT false, "pressao_baixa" boolean NOT NULL DEFAULT false, "artrose" boolean NOT NULL DEFAULT false, "sonolencia" boolean NOT NULL DEFAULT false, "dor_de_Cabeca" boolean NOT NULL DEFAULT false, "hipertensao" boolean NOT NULL DEFAULT false, "insonia" boolean NOT NULL DEFAULT false, "rinite" boolean NOT NULL DEFAULT false, "depressao" boolean NOT NULL DEFAULT false, "asma" boolean NOT NULL DEFAULT false, "indisposicao" boolean NOT NULL DEFAULT false, "gastrite" boolean NOT NULL DEFAULT false, "diabetes" boolean NOT NULL DEFAULT false, "osteoporose" boolean NOT NULL DEFAULT false, "cardiopatias" boolean NOT NULL DEFAULT false, "intestino_preso" boolean NOT NULL DEFAULT false, "ownerId" uuid, CONSTRAINT "UQ_84ecd7e6fba54db5b33dfb3817c" UNIQUE ("CPF"), CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sales_pdv" ADD "client_id" character varying`);
        await queryRunner.query(`ALTER TABLE "sales_pdv" ADD "clientId" uuid`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_17c0b2073ebd7875388fa98ab19" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales_pdv" ADD CONSTRAINT "FK_0cb5d95f9e1d25c2bc2523191ff" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales_pdv" DROP CONSTRAINT "FK_0cb5d95f9e1d25c2bc2523191ff"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_17c0b2073ebd7875388fa98ab19"`);
        await queryRunner.query(`ALTER TABLE "sales_pdv" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "sales_pdv" DROP COLUMN "client_id"`);
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
