import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDonatorTable1727640948587 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar tabela donator primeiro
    await queryRunner.query(`
            CREATE TABLE public.donator (
                id SERIAL PRIMARY KEY,
                user_id INT,
                donator_details_id INT,
                first_name VARCHAR NOT NULL,
                last_name VARCHAR NOT NULL,
                birth_date DATE NOT NULL,
                cpf VARCHAR NOT NULL,
                rg VARCHAR NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP
            );
        `);

    // Criar tabela donator_details
    await queryRunner.query(`
            CREATE TABLE public.donator_details (
                id SERIAL PRIMARY KEY,
                orientation VARCHAR,
                gender VARCHAR,
                weight_kilo NUMERIC,
                has_allergy BOOLEAN,
                allergy_description VARCHAR,
                has_active_sex_life BOOLEAN,
                has_casual_active_sex_life BOOLEAN,
                has_tattoo BOOLEAN,
                tattoo_quantity INT,
                used_drugs BOOLEAN,
                drug_description VARCHAR,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP
            );
        `);

    // Adicionar as constraints de chave estrangeira
    await queryRunner.query(`
            ALTER TABLE public.donator
            ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.user(id) ON DELETE CASCADE;
        `);

    await queryRunner.query(`
            ALTER TABLE public.donator
            ADD CONSTRAINT fk_donator_details FOREIGN KEY (donator_details_id) REFERENCES public.donator_details(id) ON DELETE SET NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover as constraints primeiro
    await queryRunner.query(`
            ALTER TABLE public.donator
            DROP CONSTRAINT fk_donator_details;
        `);

    await queryRunner.query(`
            ALTER TABLE public.donator
            DROP CONSTRAINT fk_user;
        `);

    // Remover tabela donator_details
    await queryRunner.query(`
            DROP TABLE IF EXISTS public.donator_details;
        `);

    // Remover tabela donator
    await queryRunner.query(`
            DROP TABLE IF EXISTS public.donator;
        `);
  }
}
