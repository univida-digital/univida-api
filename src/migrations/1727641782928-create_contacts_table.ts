import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateContactsTable1727641782928 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar tabela contact
    await queryRunner.query(`
            CREATE TABLE public.contact (
                id SERIAL PRIMARY KEY,
                contact VARCHAR NOT NULL,
                emergency_contact VARCHAR,
                emergency_contact_name VARCHAR,
                donator_id INT,
                hospital_id INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP,
                CONSTRAINT fk_donator FOREIGN KEY (donator_id) REFERENCES public.donator(id) ON DELETE CASCADE,
                CONSTRAINT fk_hospital FOREIGN KEY (hospital_id) REFERENCES public.hospital(id) ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover a tabela contact
    await queryRunner.query(`
            DROP TABLE IF EXISTS public.contact;
        `);
  }
}
