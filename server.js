var express = require('express');
var app = express();

var contacts = [{
    name: "houman"
}, {
    name: "samantha"
}];

app.get('/contacts', function(req, res){

    res.status(200).json(contacts);


});

app.listen(9001);
