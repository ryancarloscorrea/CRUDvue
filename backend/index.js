const express = require('express');
const mysql = require('mysql');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.listen(8080);


///Criando conexão com o banco
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ryancarlos',
    database: 'testeestagio'
});

///Conectando com o banco
db.connect(err => {
    if (err) throw err;
    console.log('mysql connected');
})


/// RETORNA UM USUARIO
app.get('/user/:id', (req, res) => {
    let sql = `SELECT * FROM usuario WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) return res.send(err);
        return res.json({ data: result });
    });
});

/// LISTA TODOS OS USUARIOS
app.get('/', (req, res) => {
    let sql = 'SELECT * FROM usuario';
    db.query(sql, (err, result) => {
        if (err)
            return res.send(err);
        //console.log(result);
        else {
            return res.json({ data: result });
        }
    });

});

/// ADICIONA UM USUARIO
app.post('/adduser', (req, res) => {
    let { id, nome, datanasc, email, rua, numero, bairro } = req.body;
    let sql = `INSERT INTO testeestagio.usuario VALUES (${id},'${nome}', '${datanasc}','${email}', '${rua}', ${numero}, '${bairro}')`;
    db.query(sql, (err, result) => {
        if (err) console.log(err);
        else res.send('Usuario adicionado');
    })
})

/// DELETA UM USUARIO
app.delete('/delete/:id', (req, res) => {
        let sql = `DELETE FROM usuario WHERE id=${req.params.id}`;
        db.query(sql, (err, result) => {
            if (err) console.log(err);
            else res.send('Usuario excluido');
        })
    })
    /// Atualiza dados de um usuário
app.put('/update/:id', async(req, res) => {
    const response = await axios.get(`http://localhost:8080/user/${req.params.id}`);
    let { id, nome, email, datanasc, rua, numero, bairro } = req.body;

    let sql = `UPDATE usuario SET nome = '${nome}', email = '${email}', datanasc = '${datanasc}',
               rua = '${rua}', numero = ${numero}, bairro = '${bairro}' 
                WHERE id = ${id}`

    db.query(sql, (err, result) => {
        if (err) console.log(err);
        else return res.json(result);
    });
});