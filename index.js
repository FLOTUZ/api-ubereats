const express = require("express");

const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const bodyParser = require("body-parser");

const mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "198.199.83.125",
  user: "emmanuel",
  password: "papaya papaya",
  database: "my_eats",
});

//Para aceptar origenes cruzados
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // If needed
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/actualizarUsuario", (req, res) => {
  const { id, nombre, telefono, email, password } = req.body;
  let query = `UPDATE usuarios
    SET usuario = '${email}',
        contrasenia = '${password}',
        nombre = '${nombre}',
        telefono = '${telefono}'
    WHERE id LIKE '${id}'`;
  pool.query(query, (error, results, fields) => {
    if (error) {
      res.status(500).json({ code: 500, msg: error.message, output: error });
    }else{
        res
      .status(200)
      .json({ code: 200, msg: "Success", output: results });
    }
  });
});

app.post("/altaUsuario", (req, res) => {
  const { nombre, telefono, email, password } = req.body;
  let query = `insert into usuarios (usuario, contrasenia, nombre, telefono)
  values ('${email}', '${password}','${nombre}','${telefono}')`;
  pool.query(query, (error, results, fields) => {
    if (error) {
      res.status(500).json({ code: 500, msg: error.message, output: error });
    }else{
        res
      .status(200)
      .json({ code: 200, msg: "Success", output: results });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en  http://localhost:${port}`);
});
