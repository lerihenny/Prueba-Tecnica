
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import CryptoJS from 'crypto-js';
//require('dotenv').config();

// Clave secreta
const secretKey = "abcdefghijklmnopqrstuvwxyz";

let query = '';
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

//CONEXION BD
const conex = mysql.createConnection({
    host: 'localhost',
    database: 'prueba_tecnica',
    user: 'root',
    password: ''
})
conex.connect(function(error){
    if(error){
        throw error;
    }else{
      console.log('Conexion exitosa')
    }
})
//CONEXION BD

app.use(cors({
    origin: '*'
}));

app.use(express.json())

app.post('/login', cors(), (req, res) => {
  const data = req.body
  const encryptedPassword = encryptPassword(data.pass);
  query = `SELECT * FROM usuarios WHERE correo='${data.email}'`;
  conex.query(query, function(error, results, fields){
    if(error){
      throw error;
    }
    if(decryptPassword(results[0].contrasena) === decryptPassword(encryptedPassword)){
      res.send(results)
    }else{
      res.send(false)
    }

  })
})

app.post('/signup', cors(), (req, res) => {
  const data = req.body
  const encryptedPassword = encryptPassword(data.pass);
  query = `INSERT INTO usuarios (nombre, correo, contrasena) VALUES ('${data.name}', '${data.email}', '${encryptedPassword}')`
  conex.query(query, function(error, result){
    if(error){
      res.send(error);
    }else{
      res.send(result)
    }
  })
})

app.post('/registrarVinos', cors(), (req, res) => {
  const data = req.body
  let query1 = `SELECT * FROM vinos WHERE nombre = '${data.nombre}' AND year = '${data.year}'`
  conex.query(query1, function(error, result){
    if(error){
      res.send(error);
    }else{
      if(result.length === 0){
        query = `INSERT INTO vinos (nombre, tipo, variedad, year, color, temperatura, graduacion, ph, observaciones) VALUES ('${data.nombre}', '${data.tipo}', '${data.variedad}', '${data.year}', '${data.color}', '${data.temp}', '${data.graduacion}', '${data.ph}', '${data.observaciones}')`
        conex.query(query, function(error, result){
          if(error){
            res.send(error);
          }else{
            res.send(result)
          }
        })
      }else{
        res.send(false)
      }
    }
  })

})

app.get('/vinos', cors(), (req, res) => {
  let array = []
  query = `SELECT * FROM vinos`;
  conex.query(query, function(error, results, fields){
    if(error){
      throw error;
    }
    Promise.all(results.map((res) => getDatos(res.id)))
    .then((results) => {
      if(results !== null){
        array.push(...results);
        res.send(array);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    }); 
  })
})

app.get('/tipos', cors(), (req, res) => {
  query = `SELECT * FROM tipos`;
  conex.query(query, function(error, results, fields){
    if(error)
      throw error;
    res.send(results)
  })
})

app.get('/variedad', cors(), (req, res) => {
  query = `SELECT * FROM variedad`;
  conex.query(query, function(error, results, fields){
    if(error)
      throw error;
    res.send(results)
  })
})

app.post('/eliminarVino', cors(), (req, res) => {
  const data = req.body
  query = `DELETE FROM vinos WHERE id = ${data.id}`
  conex.query(query, function(error, result){
    if(error){
      res.send(error);
    }else{
      res.send(result)
    }
  })
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor escucha en el puerto ${port}`)
})


//FUNCIONES

//encriptar una contraseña
function encryptPassword(password) {
  const ciphertext = CryptoJS.AES.encrypt(password, secretKey).toString();
  return ciphertext;
}

//desencriptar una contraseña
function decryptPassword(ciphertext){
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

// Promesa para obtener los datos de una consulta
function getDatos(id) {
  return new Promise((resolve, reject) => {
    const query1 = `SELECT tipos.descripcion as tipoDes, variedad.descripcion as variedadDes , vinos.*
                    FROM vinos 
                    INNER JOIN tipos 
                    INNER JOIN variedad 
                    ON vinos.tipo = tipos.id AND vinos.variedad = variedad.id
                    WHERE vinos.id='${id}'`;

    conex.query(query1, function(error, data, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(data[0]);
      }
    });
  });
}



