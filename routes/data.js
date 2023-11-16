const express = require('express');
const router = express.Router();
const pool = require('../mariadb/pool');

router.get('/getProducts', async (req, res, next) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * from practice.products;');
    console.log(rows);
    res.json(rows).status(200);
  } catch (error) {
    next(error);
  }
});

router.post('/addProduct', async (req, res, next) => {
  let conn;
  const { name, price } = req.body;
  try {
    conn = await pool.getConnection();
    await conn.query(`call practice.InsertProduct('${name}', ${price});`);
    const result = await conn.query(
      `SELECT *, "added" as status FROM practice.products where name = "${name}" order by id desc limit 1;`
    );
    res.json(result).status(200);
  } catch (error) {
    next(error);
  }
});

router.delete('/deleteProduct', async (req, res, next) => {
  let conn;
  const { name } = req.body;
  try {
    conn = await pool.getConnection();
    await conn.query(`DELETE FROM practice.products where name = "${name}";`);
    const result = await conn.query(`SELECT "${name} was deleted" as status;`);
    res.json(result).status(200);
  } catch (error) {
    next(error);
  }
});

router.patch('/updateProduct', async (req, res, next) => {
  let conn;
  const { newName, oldName } = req.body;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `UPDATE practice.products SET name = "${newName}" where name = "${oldName}";`
    );
    const result = await conn.query(
      `SELECT * FROM practice.products where name = "${newName}";`
    );
    res.json(result).status(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
