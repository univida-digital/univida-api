import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAddressTable1727641586925 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar tabela address
    await queryRunner.query(`
            CREATE TABLE public.address (
                id SERIAL PRIMARY KEY,
                street VARCHAR NOT NULL,
                zip VARCHAR NOT NULL,
                number INT NOT NULL,
                neighborhood VARCHAR NOT NULL,
                state VARCHAR NOT NULL,
                donator_id INT,
                hospital_id INT,
                lat VARCHAR,
                lng VARCHAR,
                city VARCHAR NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP,
                CONSTRAINT fk_donator FOREIGN KEY (donator_id) REFERENCES public.donator(id) ON DELETE CASCADE,
                CONSTRAINT fk_hospital FOREIGN KEY (hospital_id) REFERENCES public.hospital(id) ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover a tabela address
    await queryRunner.query(`
            DROP TABLE IF EXISTS public.address;
        `);
  }
}
