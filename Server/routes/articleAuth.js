const express = require("express");
const router = express.Router();

const mysqlDB = require("../database/mysql_db");

router.post("/newarticle", async (req, res) => {
  try {
    let { data, createdBy, createdAt, updatedDate } = req.body;
    const findUser = `SELECT * FROM article WHERE data = '${data}' `;
    const result = await mysqlDB.promise().query(findUser);
    if (result[0].length) {
      return res.status(409).send({ errorMsg: " Article already exists" });
    }

    const userQuery = ` INSERT INTO  article ( data, createdBy, createdAt, updatedDate ) 
      VALUES('${data}' , '${createdBy}', '${createdAt}', '${updatedDate}' ) `;

    const newData = await mysqlDB.promise().query(userQuery);
    res.json(newData);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/articleList", async function (req, res, next) {
  try {
    const articleList = `SELECT * FROM article`;
    const result = await mysqlDB.promise().query(articleList);
    if (result[0].length) {
      return res.status(200).json({ status: "succes", data: result });
    }
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/viewArticle/:id", async function (req, res, next) {
  try {
    var id = req.params.id;
    const sql = ` SELECT * FROM article WHERE id = '${id}'  `;
    const result = await mysqlDB.promise().query(sql);
    return res.status(200).json({ status: "succes", data: result[0] });
  } catch (error) {
    console.error(error.message);
  }
});

router.put("/updateArticle/:id", async function (req, res, next) {
  try {
    const { data, createdBy, updatedDate } = req.body;
    var id = req.params.id;
    const sql = `Update article SET data = '${data}' , createdBy = '${createdBy}' , updatedDate = '${updatedDate}'  WHERE id = '${id}'  `;
    await mysqlDB.promise().query(sql);

    return res.status(200).json({ status: "succes", data: id });
  } catch (error) {
    console.error(error.message);
  }
});

router.delete("/deleteArticle/:id", async function (req, res, next) {
  try {
    var id = req.params.id;
    const sql = ` DELETE FROM article WHERE id = '${id}' `;
    await mysqlDB.promise().query(sql);
    return res.status(200).json({ status: "succes", data: id });
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/userarticleData", async function (req, res, next) {
  try {
    const articleList = `SELECT * FROM users INNER JOIN article ON users.userName = article.createdBy`;
    const result = await mysqlDB.promise().query(articleList);
    if (result[0].length) {
      return res.status(200).json({ status: "succes", data: result[0] });
    }
  } catch (error) {
    console.error(error.message);
  }
});


router.post("/activityFeedArticleCreated", async function (req, res, next) {
  try {
    const articleList = `Select * from article where createdAt 
    between date_add(now(), interval -24 hour) and now() order by createdAt desc limit 5`;
    
    const result = await mysqlDB.promise().query(articleList);
    if (result[0].length) {
      return res.status(200).json({ status: "succes", data: result });
    }
  } catch (error) {
    console.error(error.message);
  }
});


router.post("/activityFeedArticleUpdated", async function (req, res, next) {
  try {
    const articleList = ` select DISTINCT * from article where createdAt != updatedDate And 
    updatedDate between date_add(now(), interval -24 hour) and now()  order by createdAt desc limit 5`;
    const result = await mysqlDB.promise().query(articleList);
    if (result[0].length) {
      return res.status(200).json({ status: "succes", data: result });
    }
  } catch (error) {
    console.error(error.message);
  }
});




module.exports = router;
