const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const saltRounds = 10

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'registro', 
})

app.use(express.json())
app.use(cors())

app.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	db.query(
		'SELECT * FROM usuarios WHERE email=?',
		[email],
		(err, result) => {
      if (err) {
				res.send(err);
			}
      if(result.length == 1) {
        bcrypt.compare(password, result[0].password, 
        (error, result) => {
          if(result) {
            res.send({ msg: true });
          }
          else {
            res.send({ msg: 'senha incorreta'});
          } 
        })
      }
      else {
        res.send({msg: 'Usuário não cadastrado'})
      }
		}
	);
});

app.post("/register", (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const admin = req.body.admin

  console.log("ADMIN::: ", admin)

  db.query("SELECT * FROM usuarios WHERE email = ?", [email],
  (err, result) => {
    if(err) {
      res.send(err)
    }
    if(result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        console.log("HASH:", hash)
        db.query("INSERT INTO usuarios (email, password, admin) VALUES (?, ?, ?)", [email, hash, admin], 
        (err, response) => {
          if(err) {
            res.send(err)
          }
          res.send({msg: "Cadastrado com sucesso"})
        })
      })
    } else {
      res.send({msg: "Usuário já cadastrado"})
    }
  });
})

app.listen(3001, () => {
  console.log('Rodando em http://localhost:3001')
})