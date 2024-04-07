const Model = (sequelize, DataTypes) => {
  const Sessions = sequelize.define(
    'Sessions',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(11)
      },
      userId: {
        allowNull: false,
        field: 'user_id',
        type: DataTypes.INTEGER(11),
        unique: true
      },
      token: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      valid: {
        allowNull: false,
        type: DataTypes.INTEGER(1),
        defaultValue: 1
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
      tableName: 'sessions',
      timestamps: false,
      defaultScope: {
        where: {
          deleted: 0
        },
        attributes: { exclude: ['deleted'] }
      },
      scopes: {
        all: {
          attributes: { exclude: ['deleted'] }
        }
      }
    }
  )

  Sessions.associate = function (models) {
    Sessions.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
      targetKey: 'id'
    })
  }

  return Sessions
}

export default Model
