var express = require('express'), db  = require('./models');
var app = express();


app.post('/save', function(req, res){
    var req = req;
    if (req.is('json')){
        res.json({success:true});
    }
    res.json({success:false, message:"submission must be JSON"});
});


app.listen(3000);
console.log('Listening on port 3000');
