import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAuthTable1705014445499 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "auth",
            columns: [
              {
                name: "_id",
                type: "uuid",
                isPrimary: true,
                isNullable: false,
              },
              {
                name: "auth_user_id",
                type: "uuid",
                isNullable: false,
              },
              {
                name: "token",
                type: "text",
                isNullable: false,
              },
              {
                name: "active",
                type: "bool",
                isNullable: false,
              },
              {
                name: "login_token",
                type: "text",
                isNullable: false,
              },
              {
                name: "exp_time",
                type: "timestamptz",
                isNullable: false,
              },
              {
                name: "created_at",
                type: "TIMESTAMPTZ",
                default: "NOW()",
                isNullable: false,
              },
              {
                name: "deleted_at",
                type: "TIMESTAMPTZ",
                isNullable: true,
              },
            ],
            foreignKeys:[
                {
                  columnNames:['auth_user_id'],
                  referencedColumnNames:['_id'],
                  referencedTableName:'auth_users'
                }
              ]
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('auth')
      }

}
