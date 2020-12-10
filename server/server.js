const fs = require('fs');//파일에 접근
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//로그인
app.post('/api/auth/login', (req, res) => {
  let id = req.body.id;
  let passwd = req.body.passwd;
  connection.query('SELECT * FROM customer WHERE id = ?', [id],
  function( error, results, fields) {
      if (error) {
          // console.log("error ocurred", error);
          res.send({
              "code": 400,
              "failed": "error ocurred"
          })
      } else {
          // console.log('The solution is: ', results);
          if(results.length > 0) {
              if(results[0].passwd == passwd) {
                  res.send({
                      "code": 200,
                      "success": "login sucessfull"
                  });
                  res.redirect('/');
              } else {
                  res.send({
                      "code": 204,
                      "success": "id and password does not match"
                  });
              }
          } else {
              res.send({
                  "code":204,
                  "success": "id does not exists"
              });
          }
      }    
  }) 
})

app.post('/api/auth/register', function(req, res){
  let sql = 'INSERT INTO user VALUES (null,?,?,?,?,?,?,?)';
  let params = [
      req.body.type,
      req.body.id,
      req.body.passwd,
      req.body.email,
      req.body.certifiGrade,
      req.body.certifiName,
      req.body.certifiDate
  ];

  connection.query(sql, params, (err, rows, fields) => {
      res.send(rows);
      console.log(rows);
  });
});

app.get('/api/map/mapList/:keyword', function(req, res){
  var params = req.params.keyword;
  var sql = "SELECT * FROM map WHERE FACI_NM LIKE '%" + params + "%' OR FCOB_NM LIKE '%" + params + "%'";

  connection.query(sql ,function(error, rows, field) {
    if(error) {
        console.log("error occured", error);

        res.send({
            "code": 400,
            "failed": "error occurred",
        })
    } else {
      console.log("The solution is: ", rows);

      res.json(rows)
    }
  });
});

app.get('/api/map/mapListByPlace/:keyword', function(req, res){
  var params = req.params.keyword.split(" ");
  var sql = "SELECT * FROM map WHERE FMNG_CP_NM = '" + params[0] + "' AND FMNG_CPB_NM = '" + params[1] + "'";

  connection.query(sql ,function(error, rows, field) {
    if(error) {
        console.log("error occured", error);

        res.send({
            "code": 400,
            "failed": "error occurred",
        })
    } else {
      res.json(rows)
    }
  });
});

app.get('/api/map/mapListByFilter/:keyword', function(req, res) {
  var params = req.params.keyword;
  var sql = '';

  if(params === '골프') {
    sql = "SELECT * FROM map WHERE FACI_NM LIKE '%게이트볼%' OR FCOB_NM LIKE '%게이트볼%'";
  } else if(params === '농구') {
    sql = "SELECT * FROM map WHERE FACI_NM LIKE '%농구%' OR FCOB_NM LIKE '%농구%'";
  } else if(params === '테니스') {
    sql = "SELECT * FROM map WHERE FACI_NM LIKE '%테니스%' OR FCOB_NM LIKE '%테니스%' OR FACI_NM LIKE '%테니스%' OR FCOB_NM LIKE '%테니스%'";  
  } else if(params === '배구') {
    sql = "SELECT * FROM map WHERE FACI_NM LIKE '%배구%' OR FCOB_NM LIKE '%배구%'";    
  } else if(params === '축구') {
    sql = "SELECT * FROM map WHERE FACI_NM LIKE '%축구%' OR FCOB_NM LIKE '%축구%'";  
  } else if(params === '풋살') {
    sql = "SELECT * FROM map WHERE FACI_NM LIKE '%풋살%' OR FCOB_NM LIKE '%풋살%'";  
  } else if(params === '야구') {
    sql = "SELECT * FROM map WHERE FACI_NM LIKE '%야구%' OR FCOB_NM LIKE '%야구%'";  
  } else if(params === '사격') {
    sql = "SELECT * FROM map WHERE FACI_NM LIKE '%사격%' OR FCOB_NM LIKE '%사격%'";  
  } else if(params === '양궁') {
    sql = "SELECT * FROM map WHERE FACI_NM LIKE '%양궁%' OR FCOB_NM LIKE '%양궁%' OR FACI_NM LIKE '%국궁%' OR FCOB_NM LIKE '%국궁%'";  
  } else if(params === '기타') {
    sql = "SELECT * FROM map WHERE FACI_NM LIKE '%암벽%' OR FCOB_NM LIKE '%암벽%' OR FACI_NM LIKE '%수영%' OR FCOB_NM LIKE '%수영%' OR FACI_NM LIKE '%인라인%' OR FCOB_NM LIKE '%인라인%'";  
  }

  connection.query(sql, function(error, rows, field) {
    if(error) {
      console.log("error occured", error);

        res.send({
            "code": 400,
            "failed": "error occurred",
        })
    } else {
      res.json(rows)
      
      console.log(rows);
    }
  })
});

app.get('/api/map/mapList/', (req, res) => {
  var sql = "SELECT * FROM map";

  connection.query(sql, function(error, results, field) {
    if(error) {
      console.log("error occured", error);

      res.send({
          "code": 400,
          "failed": "error occurred",
      })
    } else {
      console.log("The solution is: ", results);

      res.send({
          "code": 200,
          "success": "Show Maplist successfully",
      })
    }
  });
});

app.post('/api/payment/', (req, res) => {
  let sql = 'INSERT INTO user VALUES (null,?,?,?,?,?,?,?)';
  let params = [
      req.body.paymentPlace,
      req.body.paymentThing,
      req.body.paymentMoney,
      req.body.userName,
      req.body.userTel,
      req.body.paymentContents,
      req.body.userId
  ];

  connection.query(sql, params, (err, rows, fields) => {
      res.send(rows);
      console.log(rows);
  });
});

app.listen(port, ()=> console.log(`Listening on port ${port}`));