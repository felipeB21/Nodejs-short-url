module.exports = (sequelize, DataTypes) => {
  let alias = "Url";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    short_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  };
  let config = {
    timestamps: false,
    tableName: "url",
  };
  const Url = sequelize.define(alias, cols, config);
  Url.associate = (models) => {
    Url.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "url",
    });
  };
  return Url;
};
