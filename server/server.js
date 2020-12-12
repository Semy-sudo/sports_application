const fs = require('fs'); //파일에 접근
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session)

//var login = require('./routes/loginroutes');
//var map = require('./routes/maproutes');

const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data); //data를 js객체로 변환
const mysql = require('mysql');
//const { Router } = require('express');

const connection = mysql.createConnection(
    {host: conf.host, user: conf.user, password: conf.password, port: conf.port, database: conf.database}
);
connection.connect();

var router = express.Router();

const url = require('url');




app.get('/post', function (req, res) {
    res.send('GET request to the post');
    res.redirect('/post')
});



//session 관련
app.use(session({
    secret: 'adfasjflsjd',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}))


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
    done(null,id);
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

//로그아웃
app.post('/api/auth/logout', function(req,res){
    req.logout();
    res.redirect('/auth/login');
    // req.session.save(function(err){
    //     res.redirect('/auth/login');
    // });
});


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


app.get(`/api/auth/getExpert/:nickName`, function(req, res) {
  var params = req.params.nickName;
  var sql = `SELECT * FROM user WHERE id=${params}`;

  connection.query(sql, function(error, rows, field) {
    if(error) {
      console.log("error occured", error);

      res.send({
        "code": 400,
        "failed": "error occured",
      })
    } else {
      console.log("The solution is", rows);

      res.json(rows);
    }
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
  } else if(params === '배드민턴') {
    sql = "SELECT * FROM map WHERE FACI_NM LIKE '%배드민턴%' OR FCOB_NM LIKE '%배드민턴%'";    
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



// 홈 화면 클래스띄우기
app.get('/api/onedayclass', (req, res) => {
    connection.query(
        "SELECT * FROM board WHERE isDeleted = 0 && classkind = 1",
        (err, rows, fields) => {
            res.send(rows);
            console.log(rows);
        }
    );
    
});
app.get('/api/regularclass', (req, res) => {
  connection.query(
      "SELECT * FROM board WHERE isDeleted = 0 && classkind = 2",
      (err, rows, fields) => {
          res.send(rows);
          console.log(rows);
      }
  );
  
});

//마이페이지에서 expert와 
app.get('/api/contentsblock', (req, res) => {
    var userid = req.user;
    var expert = 'expert';
    let sql = 'SELECT * FROM user WHERE id =? AND type=?';
    connection.query(sql, [userid,expert], (err, rows, fields) => {
        console.log("/api/contentsblock",rows);
        res.send(rows);        
    });
});




//마이페이지 이름
app.get('/api/mypage', (req, res) => {
    var userid = req.user;
    let sql = 'SELECT * FROM user WHERE id = ?';
    connection.query(sql, [userid], (err, rows, fields) => {
        console.log("/api/mypage",rows);
        res.send(rows);        
    });
});


//내 클래스 내역
app.get('/api/myclass', (req, res) => {
    var userid = req.user;
    let sql = 'SELECT * FROM board WHERE nickName = ?';
    connection.query(sql, [userid], (err, rows, fields) => {
        console.log(rows);
        res.send(rows);        
    });
});

//클래스 디테일
app.get('/api/classviewdetail/:boardid', (req, res) => {
  let boardid = [req.params.boardid];
  let sql = `SELECT * FROM board WHERE boardid=${boardid}`;
  console.log("boardid",boardid);
  
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




//클래스 열기
app.post('/api/classopen', function(req, res){
  let sql = 'INSERT INTO board VALUES (null,?,?,?,?,?,?,null,?,?,?,?,?,NOW(),0,?)';
  let params = [
      req.user,
      req.body.boardTitle,
      req.body.baordpay,
      req.body.boardmin,
      req.body.boardmax,
      req.body.boardContents,
      req.body.startDate,
      req.body.finishDate,
      req.body.startTime,
      req.body.finishTime,
      req.body.FACI_NM,
      req.body.classkind
  ];

 
  connection.query(sql, params, (err, rows, fields) => {
      res.send(rows);
      console.log("row",rows);
  });
  res.redirect('/payment');
});



app.delete('/api/myclass/:boardid', (req, res) => {
    let sql = 'UPDATE board SET ISDELETED = 1 WHERE boardid = ?';
    let params = [req.params.boardid];
    console.log(params)
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    })
});




// 키워드 기반 클래스 목록
app.get('/api/class/:keyword', function(req, res) {
  var params = req.params.keyword;
  var sql = "SELECT * FROM board WHERE boardTitle LIKE '%" + params + "%' OR boardContents LIKE '%" + params + "%'";  

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

app.get('/api/class/classListByPlace/:keyword', function(req, res) {
  var params = req.params.keyword.split(" ");
  var sql = `SELECT * FROM board WHERE JSON_EXTRACT(mapData, '$.FMNG_CP_NM') = '${params[0]}' AND JSON_EXTRACT(mapData, '$.FMNG_CP_NM') = '${params[1]}'`;  
  
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

app.get('/api/class/classListByFilter/:keyword', function(req, res) {
  var params = req.params.keyword;
  var sql = '';

  if(params === '골프') {
    sql = "SELECT * FROM board WHERE JSON_EXTRACT(mapData, '$.FACI_NM') LIKE '%게이트볼%' OR JSON_EXTRACT(mapData, '$.FCOB_NM') LIKE '%게이트볼%'";
  } else if(params === '농구') {
    sql = "SELECT * FROM board WHERE JSON_EXTRACT(mapData, '$.FACI_NM') LIKE '%농구%' OR JSON_EXTRACT(mapData, '$.FCOB_NM') LIKE '%농구%'";
  } else if(params === '테니스') {
    sql = "SELECT * FROM board WHERE JSON_EXTRACT(mapData, '$.FACI_NM') LIKE '%테니스%' OR JSON_EXTRACT(mapData, '$.FCOB_NM') LIKE '%테니스%' OR JSON_EXTRACT(mapData, '$.FACI_NM') LIKE '%정구%' OR JSON_EXTRACT(mapData, '$.FCOB_NM') LIKE '%정구%'";
  } else if(params === '배구') {
    sql = "SELECT * FROM board WHERE JSON_EXTRACT(mapData, '$.FACI_NM') LIKE '%배구%' OR JSON_EXTRACT(mapData, '$.FCOB_NM') LIKE '%배구%'";   
  } else if(params === '배드민턴') {
    sql = "SELECT * FROM board WHERE JSON_EXTRACT(mapData, '$.FACI_NM') LIKE '%배드민턴%' OR JSON_EXTRACT(mapData, '$.FCOB_NM') LIKE '%배드민턴%'";   
  } else if(params === '축구') {
    sql = "SELECT * FROM board WHERE JSON_EXTRACT(mapData, '$.FACI_NM') LIKE '%축구%' OR JSON_EXTRACT(mapData, '$.FCOB_NM') LIKE '%축구%'";   
  } else if(params === '풋살') {
    sql = "SELECT * FROM board WHERE JSON_EXTRACT(mapData, '$.FACI_NM') LIKE '%풋살%' OR JSON_EXTRACT(mapData, '$.FCOB_NM') LIKE '%풋살%'";   
  } else if(params === '야구') {
    sql = "SELECT * FROM board WHERE JSON_EXTRACT(mapData, '$.FACI_NM') LIKE '%야구%' OR JSON_EXTRACT(mapData, '$.FCOB_NM') LIKE '%야구%'";   
  } else if(params === '사격') {
    sql = "SELECT * FROM board WHERE JSON_EXTRACT(mapData, '$.FACI_NM') LIKE '%사격%' OR JSON_EXTRACT(mapData, '$.FCOB_NM') LIKE '%사격%'";   
  } else if(params === '양궁') {
    sql = "SELECT * FROM board WHERE JSON_EXTRACT(mapData, '$.FACI_NM') LIKE '%양궁%' OR JSON_EXTRACT(mapData, '$.FCOB_NM') LIKE '%양궁%' OR JSON_EXTRACT(mapData, '$.FACI_NM') LIKE '%국궁%' OR JSON_EXTRACT(mapData, '$.FCOB_NM') LIKE '%국궁%'";
  } else if(params === '기타') {
    sql = "SELECT * FROM board WHERE JSON_EXTRACT(mapData, '$.FACI_NM') LIKE '%암벽%' OR JSON_EXTRACT(mapData, '$.FCOB_NM') LIKE '%암벽%' OR JSON_EXTRACT(mapData, '$.FACI_NM') LIKE '%빙상%' OR JSON_EXTRACT(mapData, '$.FCOB_NM') LIKE '%빙상%' OR JSON_EXTRACT(mapData, '$.FACI_NM') LIKE '%인라인%' OR JSON_EXTRACT(mapData, '$.FCOB_NM') LIKE '%인라인%'";
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

