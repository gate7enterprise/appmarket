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
});

const idusuario = ''

app.use(express.json())
app.use(cors())

app.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
  const resposta = new Object
  
	db.query(
		'SELECT * FROM usuarios WHERE email=?',
		[email],
		(err, result) => {
      if (err) {
				res.send(err);
			}
      if(result.length != 0) {
        const idusuario = result[0].idusuarios
        console.log('RESULT USUÁRIO:', result[0].idusuarios);
        bcrypt.compare(password, result[0].password, 
          (error, result) => {
          if(result) {
            resposta.msg = true
            resposta.idusuario = idusuario;
          }
          else {
            resposta.msg = 'senha incorreta';
          } 
          res.send(resposta)
        })
      }
      else {
        resposta.msg = 'Usuário não cadastrado';
        res.send(resposta)
      }
      
		}
	);
});

app.post('/profile', (req, res) => {
  const nome = req.body.nome
  const nascimento = req.body.nascimento
  const sexo = req.body.sexo
  const endereco = req.body.endereco

	db.query(`UPDATE profiles SET nome=?, nascimento=?, sexo=?, endereco=? WHERE (idusuario=?);`, [nome, nascimento, sexo, endereco, idusuario], (err, result) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send({ msg: 'Profile foi Salvo' });
      console.log(result)
		}
	});
});

app.post("/register", (req, res) => {
  const admin = req.body.admin 
  const email = req.body.email
  const password = req.body.password

  console.log("Admin recebido:", admin)

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
        db.query(`INSERT INTO profiles VALUES(default, null, ?, null, null, null);`, [idusuario],
        (err, resp) => {
          if(err) {
            resp.send(err)
          } else {
            resp.send({msg: "Realizada adição de clean Profile"})
          }
        }
				);
      })
    } else {
      res.send({msg: "Usuário já cadastrado"})
    }
  });
})

app.listen(3001, () => {
  console.log('Rodando em http://localhost:3001')
})