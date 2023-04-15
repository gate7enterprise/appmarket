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

let idusuario = ''

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
				return res.send(err);
			}
      if(result.length != 0) {
        idusuario = result[0].idusuarios
        const admin = result[0].admin;

        console.log('RESULT USUÁRIO:', result[0].idusuarios);
        bcrypt.compare(password, result[0].password, 
          (error, result) => {
          if(result) {
            resposta.msg = true
            resposta.idusuario = idusuario
            resposta.admin = admin
          }
          else {
            resposta.msg = 'senha incorreta';
          } 
          return res.send(resposta)
        })
      }
      else {
        resposta.msg = 'Usuário não cadastrado';
        return res.send(resposta)
      }
      
		}
	);
});

app.post('/profile', (req, res) => {
  const nome = req.body.nome
  const nascimento = req.body.nascimento
  const sexo = req.body.sexo
  const endereco = req.body.endereco

	db.query(`UPDATE profiles SET nome=?, nascimento=?, sexo=?, endereco=? WHERE idusuario=?;`, [nome, nascimento, sexo, endereco, idusuario], (err, result) => {
		if (err) {
			return res.send(err.code);
		}
		else {
			return res.send({ msg: 'Profile foi Salvo' });
		}
	});
});

app.get(`/profile`, (req, res) => {
  db.query('SELECT * FROM profiles WHERE idusuario = ?', [idusuario], 
  (err, result) => {
    if(err) {
      return res.send(err)
    }
    console.log("GET RESULT::", result)
    res.send(result)
  })
})

app.post("/register", (req, res) => {
  const admin = req.body.admin 
  const email = req.body.email
  const password = req.body.password

  
  db.query("SELECT * FROM usuarios WHERE email = ?", [email],
  (err, result) => {

    message = new Object

    if(err) {
      return res.send(err.code)
    }
    if(result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query("INSERT INTO usuarios (email, password, admin) VALUES (?, ?, ?)", [email, hash, admin], 
        (err, response) => {
          if(err) {
            return res.send("erro ao inserir no banco")
          }
          message.msg = "Cadastrado com sucesso"
          alert(message.msg)
        })
        db.query('SELECT * from usuarios WHERE email=?', [email],
					(err, resp) => {
						if (err) {
							return res.send("erro");
						} 
            else {
              const novoIdusuario = resp[0].idusuarios
              db.query(
								`INSERT INTO profiles VALUES(default, null, ?, null, null, null);`, [novoIdusuario],
								(err, res) => {
									if (err) {
										return res.send('erro');
									} else {
										message.msg = 'Realizada adição de clean Profile';
										return res.send(message);
									}
								}
							);
						}
					}
				);
      })
    } else {
      message.msg =  "Usuário já cadastrado"
      return res.send(message)
    }

  });
})

app.listen(3001, () => {
  console.log('Rodando em http://localhost:3001')
})