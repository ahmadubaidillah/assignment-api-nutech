import { generateRandomString } from '../../../utils/helpers.js'

const Model = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(11)
      },
      uid: {
        allowNull: false,
        field: 'uid',
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true
      },
      userUid: {
        allowNull: false,
        field: 'user_uid',
        type: DataTypes.UUID,
        unique: true
      },
      invoiceNumber: {
        allowNull: false,
        field: 'invoice_number',
        type: DataTypes.STRING(20),
        defaultValue: 0
      },
      transactionType: {
        allowNull: false,
        field: 'transaction_type',
        type: DataTypes.ENUM,
        values: ['PAYMENT', 'TOPUP'],
        defaultValue: 'PAYMENT'
      },
      totalAmount: {
        allowNull: false,
        field: 'total_amount',
        type: DataTypes.INTEGER(11)
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      createdAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'updated_at',
        type: DataTypes.DATE
      },
      deleted: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.INTEGER(1)
      }
    },
    {
      tableName: 'transaction',
      timestamps: false,
      defaultScope: {
        where: {
          deleted: 0
        },
        attributes: { exclude: ['deleted', 'type'] }
      },
      scopes: {
        all: {
          attributes: { exclude: ['deleted'] }
        }
      },
      hooks: {
        beforeCreate: (transaction, options) => {
          const time = Math.floor(Date.now() / 1000)
          const code = generateRandomString(5, '101').toUpperCase()
          transaction.invoiceNumber = `INV-${time}-${code}`
        }
      }
    }
  )

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.Users, {
      foreignKey: 'userUid',
      as: 'user',
      targetKey: 'uid'
    })
  }

  return Transaction
}

export default Model
