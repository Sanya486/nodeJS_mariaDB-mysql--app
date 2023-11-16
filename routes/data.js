const express = require('express');
const router = express.Router();
const pool = require('../mariadb/pool');

router.get('/getProducts', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * from practice.products');
    console.log(rows);
    res.json(rows).status(200);
  } catch (error) {
    console.log(error);
  }
});

router.post('/addProduct', async (req, res) => {
  let conn;
  const { name, price } = req.body;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `INSERT INTO practice.products(name, price) VALUES('${name}', ${price});`
    );
    const result = await conn.query('SELECT * FROM practice.products');
    res.json(result).status(200);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/deleteProduct', async (req, res) => {
  let conn;
  const { name } = req.body;
  try {
    conn = await pool.getConnection();
    await conn.query(`DELETE FROM practice.products where name = "${name}";`);
    const result = await conn.query('SELECT * FROM practice.products');
    res.json(result).status(200);
  } catch (error) {
    console.log(error);
  }
});

router.patch('/updateProduct', async (req, res) => {
  let conn;
  const { newName, oldName } = req.body;
  try {
    conn = await pool.getConnection();
    await conn.query(`UPDATE practice.products SET name = "${newName}" where name = "${oldName}"`);
    const result = await conn.query('SELECT * FROM practice.products');
    res.json(result).status(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
