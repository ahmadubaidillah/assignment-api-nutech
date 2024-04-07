import { hashPassword } from '../../../utils/helpers.js'

const Model = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
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
      firstName: {
        allowNull: false,
        field: 'first_name',
        type: DataTypes.STRING(16)
      },
      lastName: {
        allowNull: false,
        field: 'last_name',
        type: DataTypes.STRING(16)
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
        set (value) {
          this.setDataValue('password', hashPassword(value))
        }
      },
      profileImage: {
        allowNull: true,
        field: 'profile_image',
        type: DataTypes.STRING(255)
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
      tableName: 'users',
      timestamps: false,
      defaultScope: {
        where: {
          deleted: 0
        },
        attributes: { exclude: ['deleted', 'type', 'password'] }
      },
      scopes: {
        all: {
          attributes: { exclude: ['deleted'] }
        },
        withPassword: {
          attributes: { include: ['password'] }
        }
      }
    }
  )

  Users.associate = function (models) {
    Users.hasMany(models.Sessions, {
      foreignKey: 'userUid',
      as: 'sessions',
      sourceKey: 'uid'
    })
    Users.hasOne(models.Balance, {
      foreignKey: 'userUid',
      as: 'balance',
      sourceKey: 'uid'
    })
    Users.hasMany(models.Transaction, {
      foreignKey: 'userUid',
      as: 'service',
      sourceKey: 'uid'
    })
  }

  return Users
}

export default Model
