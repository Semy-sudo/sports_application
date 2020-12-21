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


var connection = require('./lib/connection.js');

//session 관련
app.use(session({
    secret: 'adfasjflsjd',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}))


var passport = require('./lib/passport')(app);

//로그인 처리
app.post('/api/auth/login', passport.authenticate('local', {
  successRedirect: '/auth',
  failureRedirect: '/auth/login'
}));

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
     
    // let sql = 'SELECT * FROM expert WHERE  QF_GRADE_NM = ? && QF_ITM_NM =? && AQ_DT';
    // let params = [
    //   req.body.certifiGrade,
    //   req.body.certifiName,
    //   req.body.certifiDate
    // ];
    // connection.query(sql, params , (err, rows, fields) => {
    
    //   res.send(rows);
    //   console.log(rows);
    // });

      res.send(rows);
      console.log(rows);
  });
});


app.get('/api/map/mapList/:keyword', function(req, res){
  console.log(req.params);
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
  console.log(req.params);
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
      console.log(rows);
    }
  });
});

app.get('/api/map/mapListByFilter/:keyword', function(req, res) {
  console.log(req.params);
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
      
      //console.log(rows);
    }
  })
});

app.get('/api/map/mapList/', (req, res) => {
  var sql = "SELECT * FROM map";

  connection.query(sql, function(error, results, field) {
    console.log(results);
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
    var expert = 'parent';
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

//parent 측 
app.get('/api/parentapplied', (req, res) => {
  //var userid;
  let sql = 'SELECT * FROM board WHERE boardid = ?';
  connection.query(sql, [2], (err, rows, fields) => {
      console.log("/api/parentapplied",rows);
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
app.get('/api/classviewdetail', (req, res) => {
  let sql = 'SELECT * FROM board WHERE boardid = ?';
  let boardid = [req.params.boardid];
  console.log("boardid",boardid);
  connection.query(sql, 134 , (err, rows, fields) => {
      console.log(rows);
      res.send(rows);        
  });
});




//클래스 열기
app.post('/api/classopen', function(req, res){
  var sql = "insert into board values (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), 0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  var params = [
    req.body.nickName,
    req.body.boardTitle,
    req.body.boardpay,
    req.body.boardmin,
    req.body.boardmax,
    req.body.boardContents,
    req.body.boardType,
    req.body.startDate,
    req.body.finishDate,
    req.body.startTime,
    req.body.finishTime,
    req.body.classkind,
    req.body.FACI_NM,                                        
    req.body.FACI_GB_CD,                                            
    req.body.FACI_GB_NM,                                            
    req.body.FCOB_CD,                                               
    req.body.FCOB_NM,                                              
    req.body.FTYPE_CD,                                              
    req.body.FTYPE_NM,                                             
    req.body.FMNG_TYPE_GB_CD,                                       
    req.body.FMNG_TYPE_GB_NM,                                     
    req.body.FMNG_CP_CD,                                            
    req.body.FMNG_CP_NM,                                           
    req.body.FMNG_CPB_CD,                                           
    req.body.FMNG_CPB_NM,                                          
    req.body.FMNG_DEPT_NM,                                         
    req.body.FMNG_USER_TEL,                                        
    req.body.ADDR_CP_CD,                                            
    req.body.ADDR_CP_NM,                                       
    req.body.ADDR_CPB_CD,                                           
    req.body.ADDR_CPB_NM,                                       
    req.body.ADDR_EMD_CD,                                       
    req.body.ADDR_EMD_NM,                                      
    req.body.ADDR_AMD_CD,                                      
    req.body.ADDR_AMD_NM,                                      
    req.body.FACI_ROAD_ADDR1,                                      
    req.body.FACI_POINT_X,                                   
    req.body.FACI_POINT_Y,                                     
    req.body.TOT_FACI_AREA,                                   
    req.body.STAND_CPT_PSN_CNT,                                  
    req.body.STAND_SEAT_CNT,                              
    req.body.FACI_HOMEPAGE,                                  
    req.body.NATION_YN,                                     
    req.body.FACI_STAT,
    req.body.DEL_YN,
  ];
  
  console.log("=====================================");
  console.log(req.body.mapData);
 
  connection.query(sql, params, function(error, rows, field) {
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



app.post('/api/payment/', (req, res) => {
  let sql = 'INSERT INTO payment VALUES (null,NOW(),?,?,?,?,?,?,?)';
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

