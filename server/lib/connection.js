var mysql = require('mysql');

var connection = mysql.createConnection({
    host:"management.cv2ax7owoxd1.ap-northeast-2.rds.amazonaws.com",
    user:"user",
    password:"qwe123!!",
    port:"3306",
    database:"management"
});

connection.connect();

module.exports = connection; //외부로 꺼내 사용할 수 있다

//