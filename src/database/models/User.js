module.exports = (sequelize, DataTypes) => {
  let alias = "User";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  };
  let config = {
    timestamps: false,
    tableName: "users",
  };
  const User = sequelize.define(alias, cols, config);
  User.associate = (models) => {
    User.hasMany(models.Url, {
      foreignKey: "user_id",
      as: "url",
    });
  };
  return User;
};
