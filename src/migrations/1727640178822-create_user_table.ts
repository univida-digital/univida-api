import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1687640178824 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE public.user (
                id SERIAL PRIMARY KEY,
                email VARCHAR NOT NULL UNIQUE,
                type VARCHAR NOT NULL,
                password VARCHAR NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS public.user;
        `);
  }
}
