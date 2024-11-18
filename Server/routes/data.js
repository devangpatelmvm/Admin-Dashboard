const express = require('express');
const router = express.Router();
const mysqlDB = require("../database/mysql_db");
const verify = require("./varifyToken");
const jwt_decode =require("jwt-decode");

router.get('/', verify, async (req, res) => {
  res.status(200).json({ status: "success", data: 'data' });
});


router.get('/userinfo', verify, async (req, res) => {
  const token = req.header("auth-token");
  const decodedToken=jwt_decode(token, process.env.TOKEN_SECTET);
  const finddata = `SELECT firstName, lastName, userName, email, phone, password, admin FROM users WHERE userName='${decodedToken.name}'`;
  const userinfo = await mysqlDB.promise().query(finddata);
  res.status(200).json({ data: userinfo[0] });
});

module.exports = router
