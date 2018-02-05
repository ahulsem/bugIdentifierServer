var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/classify', function(req, res, next){
    var species, genus, antInfo, imageLink;
    species = "aberrans";
    genus = "amblyopone";
    // Add call to api server to get image for species
    // imageLink = 
    antInfo = "https://www.antweb.org/description.do?genus=" + genus + "&species=" + species;
    res.send(antInfo);
});

module.exports = router;