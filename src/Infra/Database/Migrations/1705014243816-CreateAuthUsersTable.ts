import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1705014243816 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "auth_users",
        columns: [
          {
            name: "_id",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "first_name",
            type: "varchar(100)",
            isNullable: true,
          },
          {
            name: "last_name",
            type: "varchar(100)",
            isNullable: true,
          },
          {
            name: "dealership_name",
            type: "varchar(100)",
            isNullable: true,
          },
          {
            name: "email",
            type: "varchar(100)",
            isNullable: true,
          },
          {
            name: "user_id",
            type: "text",
            isNullable: true,
          },
          {
            name: "active",
            type: "bool",
            isNullable: false,
          },
          {
            name: "type",
            type: "varchar(100)",
            isNullable: false,
          },
          {
            name: "password",
            type: "text",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "TIMESTAMPTZ",
            default: "NOW()",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "TIMESTAMPTZ",
            isNullable: true,
          },
          {
            name: "deleted_at",
            type: "TIMESTAMPTZ",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
