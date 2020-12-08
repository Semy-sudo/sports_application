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

app.get('/api/map/mapList/:keyword', (req, res) => {
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

      var data = new Object();

      console.log(rows);
      res.send({
          "code": 200,
          "success": "Show Maplist successfully",
          "data": rows,
      })
    }
  });
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

app.listen(port, ()=> console.log(`Listening on port ${port}`));