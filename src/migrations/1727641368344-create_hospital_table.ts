import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateHospitalTable1727641368344 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar tabela hospital
    await queryRunner.query(`
            CREATE TABLE public.hospital (
                id SERIAL PRIMARY KEY,
                user_id INT,
                name VARCHAR NOT NULL,
                cnpj VARCHAR NOT NULL,
                hospital_type VARCHAR NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP,
                CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.user(id) ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover tabela hospital
    await queryRunner.query(`
            DROP TABLE IF EXISTS public.hospital;
        `);
  }
}
