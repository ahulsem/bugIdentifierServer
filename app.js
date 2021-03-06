var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
//var http = require('http');
//var url = require('url');
var fileName = 'CharlieBrown.png';
var response = 'Info on Charlie Brown';

var classify = require('./routes/classify');

var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/classify', classify);

app.get('/', function(req, res){
    console.log(req.method);
    res.sendFile(path.join(__dirname, 'index.html'));
});

/*
app.get('/classify', function(req, res){
    console.log("classify image..." + fileName);
    res.send(response);
    
});
*/

app.post('/uploads', function(req, res){
    console.log(req.method);

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
    res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

});

var server = app.listen(port, function(){
  console.log('Server listening on port 8080');
});