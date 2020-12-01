const fs = require('fs');//파일에 접근
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var login = require('./routes/loginroutes');
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);//data를 js객체로 변환
const mysql = require('mysql');
//const { Router } = require('express');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();



var router = express.Router();

router.get('/',function(req,res){
  res.json({message:'welcom to our upload module apis'});
});

router.post('/register', login.register);
router.post('/login', login.login)
app.use('/api/auth', router);




app.listen(port, ()=> console.log(`Listening on port ${port}`));