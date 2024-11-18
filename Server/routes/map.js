const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const mysqlDB = require("../database/mysql_db");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "sentFiles");
  },
  filename: (req, file, callBack) => {
    let datetime = new Date();
    const suffix =
      datetime.toISOString().slice(0, 19).replace(/:/g, "") +
      file.originalname.replace(/\ /g, "");
    callBack(null, "chatbot" + suffix);
  },
});

const upload = multer({ storage: storage });

router.post("/newMap", upload.array("profile", 5), async (req, res, next) => {
  try {
    const { about, address1, address2, data } = req.body;
    const findMap = `SELECT * FROM map WHERE data ='${data}' `;
    const result = await mysqlDB.promise().query(findMap);
    if (result[0].length) {
      return res.status(409).send({ errorMsg: "map already exists" });
    }
    let file = [];
    console.log(req.files);
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        file.push(req.files[i].path);
      }
    }

    const userQuery = `INSERT INTO map (about, file, address1, address2, data) 
          VALUES('${about}', '${file}','${address1}', '${address2}', '${data}')`;

    const newMap = await mysqlDB.promise().query(userQuery);
    res.json(newMap);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/mapList", async function (req, res, next) {
  try {
    const mapList = `SELECT * FROM map`;
    const result = await mysqlDB.promise().query(mapList);
    if (result[0].length) {
      return res.status(200).json({ status: "succes", data: result });
    }
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/mapview/:id", async function (req, res, next) {
  try {
    var id = req.params.id;
    const sql = ` SELECT * FROM map WHERE id = '${id}'  `;
    const result = await mysqlDB.promise().query(sql);
    return res.status(200).json({ data: result[0] });
  } catch (error) {
    console.error(error.message);
  }
});

router.put("/updatedMap/:id", async function (req, res, next) {
  try {
    const { about, address1, address2, data } = req.body;
    var id = req.params.id;
    const sql = `Update map SET about = '${about}' , address1 = '${address1}' , address2 = '${address2}', data = '${data}'  WHERE id = '${id}'  `;
    await mysqlDB.promise().query(sql);
    return res.status(200).json({ status: "succes", data: id });
  } catch (error) {
    console.error(error.message);
  }
});

router.delete("/deleteMap/:id", async function (req, res, next) {
  try {
    var id = req.params.id;
    const sql1 = `SELECT * FROM map WHERE id='${id}'`;
    const result = await mysqlDB.promise().query(sql1);
    console.log(result);
    const sql = ` DELETE FROM map WHERE id = '${id}' `;
    await mysqlDB.promise().query(sql);

    console.log(result[0][0]);
    const fileurl = result[0][0].file;
    console.log(fileurl);
    fs.unlink("sentFiles/" + fileurl.substring(9), (err) => {
      if (err) {
        console.log("err occured while deleting the file", err);
      } else {
        console.log("deleted successfully");
      }
    });

    return res.status(200).json({ status: "succes", data: id });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
