"use strict";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("sessions", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(11),
    },
    userId: {
      allowNull: false,
      field: "user_id",
      type: Sequelize.INTEGER(11),
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    token: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    valid: {
      allowNull: false,
      type: Sequelize.INTEGER(1),
      defaultValue: 1,
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
  await queryInterface.dropTable("sessions");
}
