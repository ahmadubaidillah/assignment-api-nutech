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
      token: {
        allowNull: false,
        type: DataTypes.STRING(100)
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
      foreignKey: 'userUid',
      as: 'user',
      targetKey: 'uid'
    })
  }

  return Sessions
}

export default Model
