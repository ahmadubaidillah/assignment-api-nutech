"use strict";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(11),
    },
    firstName: {
      allowNull: false,
      field: "first_name",
      type: Sequelize.TEXT,
    },
    lastName: {
      allowNull: false,
      field: "last_name",
      type: Sequelize.TEXT,
    },
    email: {
      allowNull: false,
      type: Sequelize.TEXT,
      unique: true,
    },
    password: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    profileImage: {
      allowNull: true,
      field: "profile_image",
      type: Sequelize.TEXT,
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
  await queryInterface.dropTable("users");
}
