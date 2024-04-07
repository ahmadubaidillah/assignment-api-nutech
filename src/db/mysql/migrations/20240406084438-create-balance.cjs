"use strict";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("balance", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(11),
    },
    uid: {
      allowNull: false,
      field: "uid",
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    userUid: {
      allowNull: false,
      field: "user_uid",
      type: Sequelize.UUID,
      references: {
        model: "users",
        key: "uid",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    balance: {
      allowNull: false,
      type: Sequelize.DOUBLE,
      defaultValue: 0,
    },
    createdAt: {
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      field: "created_at",
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
      field: "updated_at",
      type: Sequelize.DATE,
    },
    deleted: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER(1),
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("balance");
}
