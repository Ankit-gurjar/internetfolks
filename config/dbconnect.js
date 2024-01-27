const mongoose = require("mongoose");
const express = require("express");

const DBconnect = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.MOGO_URI.replace("<password>", process.env.MOGO_PASS)
    );
    console.log(`MONGODB CONNECTED : ${connect.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

module.exports = DBconnect;
