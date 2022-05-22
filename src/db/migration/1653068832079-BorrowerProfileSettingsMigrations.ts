import { MigrationInterface, QueryRunner } from "typeorm";

export class BorrowerProfileSettingsMigrations1653068832079 implements MigrationInterface {
  name = 'BorrowerProfileSettingsMigrations1653068832079'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "borrower_profile_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "auto_save" boolean NOT NULL, "borrower_id" character varying NOT NULL, "created_at" TIMESTAMP(6) NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_e60e21c1312e114f4d29b22169f" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "borrower_profile_settings"`);
  }

}
