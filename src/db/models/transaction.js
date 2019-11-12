'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    senderEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recieverEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    otp: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    isSuccess: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Transaction;
};