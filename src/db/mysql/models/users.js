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
      firstName: {
        allowNull: false,
        field: 'first_name',
        type: DataTypes.TEXT
      },
      lastName: {
        allowNull: false,
        field: 'last_name',
        type: DataTypes.TEXT
      },
      email: {
        allowNull: false,
        type: DataTypes.TEXT,
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.TEXT,
        set (value) {
          this.setDataValue('password', hashPassword(value))
        }
      },
      profileImage: {
        allowNull: true,
        field: 'profile_image',
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
      foreignKey: 'userId',
      as: 'sessions',
      sourceKey: 'id'
    })
    Users.hasOne(models.Balance, {
      foreignKey: 'userId',
      as: 'balance',
      sourceKey: 'id'
    })
    Users.hasMany(models.Transaction, {
      foreignKey: 'userId',
      as: 'service',
      sourceKey: 'id'
    })
  }

  return Users
}

export default Model
