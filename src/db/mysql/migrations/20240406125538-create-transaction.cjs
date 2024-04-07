"use strict";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("transaction", {
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
    invoiceNumber: {
      allowNull: false,
      field: "invoice_number",
      type: Sequelize.STRING(20),
      defaultValue: 0,
    },
    transactionType: {
      allowNull: false,
      field: "transaction_type",
      type: Sequelize.ENUM,
      values: ["PAYMENT", "TOPUP"],
      defaultValue: "PAYMENT",
    },
    totalAmount: {
      allowNull: false,
      field: "total_amount",
      type: Sequelize.INTEGER(11),
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
  await queryInterface.dropTable("transaction");
}
