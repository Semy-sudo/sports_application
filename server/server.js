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

// /post 클라이언트측에 json정보 보내줌
app.get('/api/customers',(req,res)=>{
  connection.query(
    "SELECT * FROM board WHERE isDeleted = 0",
    (err, rows, fields) => {
      res.send(rows);
    }
  ); 
});

app.post('/api/customers',(req,res) => {
  let sql = 'INSERT INTO board VALUES (null,?,?,?,?,?,now(),0)';
  let boardid = req.body.boardid;
  let boardType = req.body.boardType;
  let boardLimit = req.body.boardLimit;
  let boardTitle = req.body.boardTitle;
  let boardContents = req.body.boardContents;
  console.log("boardid",boardid);
  let params = [boardid,boardType,boardLimit,boardTitle,boardContents];
  connection.query(sql,params,
    (err,rows,fields)=>{
      res.send(rows);
      console.log(rows);
    }
  );
});

app.delete('/api/customers/:boardid',(req,res)=>{
  let sql = 'UPDATE board SET ISDELETED = 1 WHERE boardid = ?';
  let params = [req.params.boardid];
  connection.query(sql,params,
      (err,rows,fields)=>{
        res.send(rows);
      }
    )
});


app.listen(port, ()=> console.log(`Listening on port ${port}`));