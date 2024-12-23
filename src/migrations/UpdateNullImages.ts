import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNullImages1703330436000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Update any null images to empty array
        await queryRunner.query(`
            UPDATE vehicles 
            SET images = '{}' 
            WHERE images IS NULL
        `);
        
        // Then alter the column to not allow nulls with default empty array
        await queryRunner.query(`
            ALTER TABLE vehicles 
            ALTER COLUMN images SET DEFAULT '{}',
            ALTER COLUMN images SET NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE vehicles 
            ALTER COLUMN images DROP DEFAULT,
            ALTER COLUMN images DROP NOT NULL
        `);
    }
} 