const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const DBconnect = require("./config/dbconnect");
const { notfound, errorHandler } = require("./middleware/error");
const roleRoute = require("./routes/rolerouter");
const userRoute = require("./routes/userrouter");
const communityRoute = require("./routes/communityrouter");

const app = express();

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 🚩 Shutting down...");
  console.log(err.stack);
  process.exit(1);
});

dotenv.config({ path: __dirname + "/config.env" });

const PORT = process.env.PORT || 5002;

DBconnect();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Api is working ");
});

/*************Api's**************/

app.use("/api/v1/role", roleRoute);
// app.use("/api/v1/auth", userRoute);
// app.use("/api/v1/community", communityRoute);

app.use(notfound);
app.use(errorHandler);

/*************Api's**************/

/*************SERVER**************/

const server = app.listen(PORT, console.log(`SERVER IS RUNNING ON ${PORT}`));

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 🚩 Shutting down...");
  server.close(() => {
    process.exit(1); // 1 - for uncaught exception
  });
});
