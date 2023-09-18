"use strict"; // para que no se pueda usar variables no definidas

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Unknown_person",
      },
      validatedUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "validated_user",
        comment: "this field indicates whether the user has been validated.",
      },
    },
    {
      timestamps: true,
    }
  );

  return User;
};
