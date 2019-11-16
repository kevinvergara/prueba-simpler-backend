const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const api = require('../controllers/consultaapi');

// ======configurando server============
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.listen('8080', function() {
  console.log('servidor en el puerto 8080');
});
//======================================

//========rutas y respuestas=============

app.get("/all-products",function(req, res){
  api.getProducts()
    .then((response)=>{
      console.log("response 200 all products");
      res.status(200).send(response);
    })
    .catch(error =>{
      console.log("response 500 all products");
      res.status(500).json({error: error});
    });
});
//=========================================