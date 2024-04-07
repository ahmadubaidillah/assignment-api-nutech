const Model = (sequelize, DataTypes) => {
  const Balance = sequelize.define(
    'Balance',
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
      balance: {
        allowNull: false,
        type: DataTypes.DOUBLE,
        defaultValue: 0
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
      tableName: 'balance',
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
      }
    }
  )

  Balance.associate = function (models) {
    Balance.belongsTo(models.Users, {
      foreignKey: 'userUid',
      as: 'user',
      targetKey: 'uid'
    })
  }

  return Balance
}

export default Model
