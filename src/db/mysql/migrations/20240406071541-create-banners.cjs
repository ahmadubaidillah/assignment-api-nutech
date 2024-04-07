"use strict";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("banners", {
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
    bannerName: {
      allowNull: false,
      field: "banner_name",
      type: Sequelize.STRING(16),
    },
    bannerImage: {
      allowNull: false,
      field: "banner_image",
      type: Sequelize.TEXT,
    },
    description: {
      allowNull: false,
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
  await queryInterface.dropTable("banners");
}
