"use strict";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("services", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(11),
    },
    serviceCode: {
      allowNull: false,
      field: "service_code",
      type: Sequelize.TEXT,
    },
    serviceName: {
      allowNull: false,
      field: "service_name",
      type: Sequelize.TEXT,
    },
    serviceIcon: {
      allowNull: false,
      field: "banner_icon",
      type: Sequelize.TEXT,
    },
    serviceTarif: {
      allowNull: false,
      field: "service_tarif",
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
  await queryInterface.dropTable("services");
}
