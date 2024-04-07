const Model = (sequelize, DataTypes) => {
  const Services = sequelize.define(
    'Services',
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
      serviceCode: {
        allowNull: false,
        field: 'service_code',
        type: DataTypes.STRING(16)
      },
      serviceName: {
        allowNull: false,
        field: 'service_name',
        type: DataTypes.STRING(16)
      },
      serviceIcon: {
        allowNull: false,
        field: 'banner_icon',
        type: DataTypes.TEXT
      },
      serviceTarif: {
        allowNull: false,
        field: 'service_tarif',
        type: DataTypes.STRING(16)
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
      tableName: 'services',
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

  Services.associate = function (models) {}

  return Services
}

export default Model
