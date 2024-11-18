const express = require("express");
const app = express();
const mysqlDB = require("./database/mysql_db");
var cors = require("cors");
const user = require("./routes/auth");
const article = require("./routes/articleAuth");
const map = require("./routes/map");
const fs = require("fs");

mysqlDB.connect((err) => {
  if (err) console.log(err);
  else console.log("MySQL Connected...");
});
app.use(cors());
app.use(express.json());
app.use("/sentFiles/", express.static("sentFiles/"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, auth-token"
  );
  next();
});

app.use("/", require("./routes/data"));
app.use("/register", user);
app.use("/login", user);
app.use("/userList", user);
app.use("/update", user);
app.use("/delete", user);
app.use("/activityFeedUserRegistered", user);
app.use("/activityFeedUserUpdated", user);

// Article
app.use("/newarticle", article);
app.use("/articleList", article);
app.use("/viewArticle", article);
app.use("/deleteArticle", article);
app.use("/updateArticle", article);
app.use("/userarticleData", article);
app.use("/activityFeedArticleCreated", article);
app.use("/activityFeedArticleUpdated", article);

// map
app.use("/newMap", map);
app.use("/mapList", map);
app.use("/mapview", map);
app.use("/deleteMap", map);

app.listen(5000, () => {
  console.log("Server is up on port 5000");
});
