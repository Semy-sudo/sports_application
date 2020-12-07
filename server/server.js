const fs = require('fs'); //파일에 접근
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var login = require('./routes/loginroutes');
var map = require('./routes/maproutes');
const path = require("path");
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data); //data를 js객체로 변환
const mysql = require('mysql');
//const { Router } = require('express');

const connection = mysql.createConnection(
    {host: conf.host, user: conf.user, password: conf.password, port: conf.port, database: conf.database}
);
connection.connect();

var router = express.Router();

router.get('/', function (req, res) {
    res.json({message: 'welcom to our upload module apis'});
});

// router.post('/register', login.register); router.post('/login', login.login)
// app.use('/api/auth', router); 

app.get('/post', function (req, res) {
    res.send('GET request to the post');
    res.redirect('/post')
});

// app.get('/api/auth/check', (req, res) => {
//         if(type === 'parent'){
//             res.redirect('/map');
//         }else if(type === 'expert'){
//             res.redirect('/post');
//         }else{
//             res.resdirect('/mypage');
//         }
// });

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
                    // let type = results[0].type;
                    // app.get('/api/auth/check', (req, res) => {
                    //     if(type === 'parent'){
                    //         res.redirect('/map');
                    //     }else{
                    //         res.redirect('/post');
                    //     }
                    // });
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


//회원가입

app.post('/api/auth/register', (req, res) => {
    let sql = 'INSERT INTO customer VALUES (null,?,?,?,?,?,?,?)';
    let customerid = req.body.customerid;
    let type = req.body.type;
    let id = req.body.id;
    let passwd = req.body.passwd;
    let email = req.body.email;
    console.log(email)
    let addressBasic = req.body.addressBasic;
    let addressDetail = req.body.addressDetail;
    let certifiNumber = req.body.certifiNumber;
    let params = [
        type,
        id,
        passwd,
        email,
        addressBasic,
        addressDetail,
        certifiNumber
    ];
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(rows);
    });

    // app.get('/api/auth/check', (req, res) => {
    //     if(type === 'parent'){
    //         res.redirect('/map');
    //     }else if(type === 'expert'){
    //         res.redirect('/post');
    //     }else{
    //         res.resdirect('/mypage');
    //     }
    // });

});


// 게시판
app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM board WHERE isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.post('/api/customers', (req, res) => {
    let sql = 'INSERT INTO board VALUES (null,?,?,?,?,?,now(),0)';
    let boardid = req.body.boardid;
    let boardType = req.body.boardType;
    let boardLimit = req.body.boardLimit;
    let boardTitle = req.body.boardTitle;
    let boardContents = req.body.boardContents;
    console.log("boardid", boardid);
    let params = [boardid, boardType, boardLimit, boardTitle, boardContents];
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(rows);
    });
    
    return res.status(200).json({
        success:true
    })
});

app.delete('/api/customers/:boardid', (req, res) => {
    let sql = 'UPDATE board SET ISDELETED = 1 WHERE boardid = ?';
    let params = [req.params.boardid];
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    })
});

app.get('/register',(req,res) => {
    res.send('hi')
})

app.listen(port, () => console.log(`Listening on port ${port}`));