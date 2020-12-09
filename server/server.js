const fs = require('fs'); //파일에 접근
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session)

//var login = require('./routes/loginroutes');
//var map = require('./routes/maproutes');

const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data); //data를 js객체로 변환
const mysql = require('mysql');
//const { Router } = require('express');

const connection = mysql.createConnection(
    {host: conf.host, user: conf.user, password: conf.password, port: conf.port, database: conf.database}
);
connection.connect();

var router = express.Router();


app.get('/post', function (req, res) {
    res.send('GET request to the post');
    res.redirect('/post')
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//session 관련
app.use(session({
    secret: 'adfasjflsjd',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}))

var authData = {
    id:'syi9595',
    passwd:'eja9595'
};

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    console.log('serializeUser',user);
    done(null,user.id);
});

passport.deserializeUser(function(id, done){
    console.log('deserializeUser',id);
    done(null,authData);
});

passport.use(new LocalStrategy(
    {
        usernameField:'id',
        passwordField:'passwd'
    },
    function (username,password,done){
        console.log('LocalStrategy', username, password);
        let sql = 'SELECT * FROM user WHERE id = ?';
        connection.query(sql, [username], function(err, results){
            if(err)
                return done(err);
            if(!results[0])
                return done('please check your id.');

            var user = results[0];
            if(user.passwd === password){
                return done(null,user)
            }else{
                return done('please check your passwd');
            }
        });
      



        }
));




app.post('/api/auth/login',
    passport.authenticate('local',{
        successRedirect: '/auth',
        failureRedirect: '/auth/login'
    })
);




//회원가입
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



// 게시판띄우기
app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM board WHERE isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.post('/api/customer', (req, res) => {
    let sql = 'INSERT INTO board VALUES (null,?,?,?,?,?,now(),0,1)';
    let nickName = req.body.nickName;
    let boardType = req.body.boardType;
    let boardLimit = req.body.boardLimit;
    let boardTitle = req.body.boardTitle;
    let boardContents = req.body.boardContents;
    console.log(req.body);
    console.log(nickName);
    console.log(boardType);
    let params = [nickName, boardType, boardLimit, boardTitle, boardContents];
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(rows);
    });
    
    return res.status(200).json({
        success:true
    });
});

// app.delete('/api/customers/:boardid', (req, res) => {
//     let sql = 'UPDATE board SET ISDELETED = 1 WHERE boardid = ?';
//     let params = [req.params.boardid];
//     console.log(params)
//     connection.query(sql, params, (err, rows, fields) => {
//         res.send(rows);
//     })
// });

app.get('/register',(req,res) => {
    res.send('hi')
})

app.listen(port, () => console.log(`Listening on port ${port}`));