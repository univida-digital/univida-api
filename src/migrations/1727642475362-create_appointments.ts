import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAppointments1727642475362 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar o esquema appointments se não existir
    await queryRunner.query(`
            CREATE SCHEMA IF NOT EXISTS appointments;
        `);

    // Criar tabela appointments_status
    await queryRunner.query(`
            CREATE TABLE appointments.appointments_status (
                id SERIAL PRIMARY KEY,
                status VARCHAR NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

    // Inserir valores do ENUM na tabela appointments_status
    await queryRunner.query(`
            INSERT INTO appointments.appointments_status (status) VALUES
            ('CONFIRMED'),
            ('CANCELLED'),
            ('EXPIRED'),
            ('REJECTED'),
            ('COMPLETED');
        `);

    // Criar tabela appointments
    await queryRunner.query(`
            CREATE TABLE appointments.appointments (
                id SERIAL PRIMARY KEY,
                donator_id INT,
                hospital_id INT,
                status_id INT,
                scheduled_date VARCHAR NOT NULL,
                scheduled_time VARCHAR NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_donator FOREIGN KEY (donator_id) REFERENCES public.donator(id) ON DELETE CASCADE,
                CONSTRAINT fk_hospital FOREIGN KEY (hospital_id) REFERENCES public.hospital(id) ON DELETE CASCADE,
                CONSTRAINT fk_status FOREIGN KEY (status_id) REFERENCES appointments.appointments_status(id) ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover a tabela appointments
    await queryRunner.query(`
            DROP TABLE IF EXISTS appointments.appointments;
        `);

    // Remover a tabela appointments_status
    await queryRunner.query(`
            DROP TABLE IF EXISTS appointments.appointments_status;
        `);

    // Remover o esquema appointments se estiver vazio
    await queryRunner.query(`
            DROP SCHEMA IF EXISTS appointments;
        `);
  }
}
