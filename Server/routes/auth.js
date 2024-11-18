const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const mysqlDB = require("../database/mysql_db");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  res.status(200).json({ status: "success", data: "data" });
});

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, userName, email, phone, password, admin, createdAt, updatedDate } =
      req.body;
    const findUser = `SELECT * FROM users WHERE userName='${userName}'`;
    const result = await mysqlDB.promise().query(findUser);

    if (result[0].length > 0)
      return res.status(400).send({ errorMsg: "User name already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userQuery = `INSERT INTO users ( firstName, lastName, userName, email, phone, password, admin, createdAt, updatedDate ) 
       VALUES('${firstName}', '${lastName}', '${userName}', '${email}', '${phone}', '${hashedPassword}', '${admin}', '${createdAt}', '${updatedDate}')`;

    const newRegister = await mysqlDB.promise().query(userQuery);
    return res.status(200).send(newRegister);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const findlogin = `SELECT  * FROM users WHERE userName='${userName}'`;
    const user = await mysqlDB.promise().query(findlogin);
    if (user[0].length === 0) return res.status(400).send("User ID is wrong");

    const validPass = await bcrypt.compare(password, user[0][0].password);
    if (!validPass) return res.status(400).send("Invalid password");

    const token = jwt.sign({ name: userName }, process.env.TOKEN_SECTET);
    res.header("auth-token", token).send({ token: token });
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/userList", async function (req, res, next) {
  try {
    const userList = `SELECT * FROM users `;
    const result = await mysqlDB.promise().query(userList);
    if (result[0].length) {
      return res.status(200).json({ status: "succes", data: result });
    }
  } catch (error) {
    console.error(error.message);
  }
});

router.put("/update/:id", async function (req, res, next) {
  try {
    const { firstName, lastName, phone, password, updatedDate } = req.body;
    var id = req.params.id;

    const findlogin = `SELECT  * FROM users WHERE id = '${ id }'`;
    const user = await mysqlDB.promise().query(findlogin);
    if (user[0].length === 0) return res.status(400).send("User ID is wrong");

    const validPass = await bcrypt.compare(password, user[0][0].password);
    if (!validPass) return res.status(400).send("Invalid password");

    const sql = `Update users SET firstName = '${firstName}' , lastName = '${lastName}' , phone = '${phone}', updatedDate = '${updatedDate}' WHERE id = '${id}'  `;
    const result = await mysqlDB.promise().query(sql);
    return res.status(200).json({ status: "succes", data: id });
    
  } catch (error) {
    console.error(error.message);
  }
});

router.delete("/delete/:id", async function (req, res, next) {
  try {
    var id = req.params.id;
    const sql = ` DELETE FROM users WHERE id = '${id}' `;
    await mysqlDB.promise().query(sql);
    return res.status(200).json({ status: "succes", data: id });
  } catch (error) {
    console.error(error.message);
  }
});


router.post("/activityFeedUserRegistered", async function (req, res, next) {
  try {
    const articleList = `Select * from users where createdAt 
    between date_add(now(), interval -24 hour) and now() order by createdAt desc limit 5`;
    const result = await mysqlDB.promise().query(articleList);
    if (result[0].length) {
      return res.status(200).json({ status: "succes", data: result });
    }
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/activityFeedUserUpdated", async function (req, res, next) {
  try {
    const articleList = `select * from users where createdAt != updatedDate And 
    updatedDate between date_add(now(), interval -24 hour) and now()  order by updatedDate desc  limit 5`;
    const result = await mysqlDB.promise().query(articleList);
    if (result[0].length) {
      return res.status(200).json({ status: "succes", data: result, write: result });
    }
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
