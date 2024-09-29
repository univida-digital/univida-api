import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmailValidationTable1727642250892
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar o esquema notification se não existir
    await queryRunner.query(`
            CREATE SCHEMA IF NOT EXISTS notification;
        `);

    // Criar tabela email_validation
    await queryRunner.query(`
            CREATE TABLE notification.email_validation (
                id SERIAL PRIMARY KEY,
                user_id INT,
                validation_code INT NOT NULL,
                is_validated BOOLEAN DEFAULT false,
                expiration_date TIMESTAMP NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP,
                CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.user(id) ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover a tabela email_validation
    await queryRunner.query(`
            DROP TABLE IF EXISTS notification.email_validation;
        `);

    // Remover o esquema notification se estiver vazio
    await queryRunner.query(`
            DROP SCHEMA IF EXISTS notification;
        `);
  }
}
