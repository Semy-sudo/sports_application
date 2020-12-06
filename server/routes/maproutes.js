exports.map = function (req, res) {
    
    var map = {
        // map 변수 추가
    };
    
    connection.query('SELECT * FROM map WHERE ' , users, function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code" : 400,
                "failed": "error ocurred"
            })
        } else {
            console.log('The solution is: ', results);
            res.send({
                "code": 200,
                "success": "Show map data sucessfully"
            });
        }
    });    
};

exports.mapList = function(req, res) {
    connection.query('SELECT * FROM map WHERE', function(error, results, field) {
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
    })
}