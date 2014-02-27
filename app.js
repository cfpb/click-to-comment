var express = require('express'), db  = require('./models');
var app = express();

app.use(express.json());
app.use("/", express.static(__dirname + '/'));

app.post('/save', function(req, res){
    var req = req;
    if (req.is('json')){
        var submissions = req.body;
        if (Array.isArray(submissions)){ 
            for (var i = 0; i < submissions.length; i++) {
                    var submission = submissions[i]
                    console.log([submission.x,submission.y,submission.text]);
            }
            res.json({success:true});
        } else {
            res.json({success:false, message:"submission must be an array"});
        }

    }
    res.json({success:false, message:"submission must be JSON"});
});


app.listen(3000);
console.log('Listening on port 3000');
