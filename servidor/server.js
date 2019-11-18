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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


app.listen('8080', function() {
  console.log('servidor en el puerto 8080');
});
//======================================

//========rutas y respuestas=============
//todos los productos
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

//producto por id
app.get("/product/:id",function(req, res){
  api.getProductById(req.params.id)
    .then((response)=>{
      console.log("response 200 get product by id");
      res.status(200).send(response);
    })
    .catch(error =>{
      console.log("response 500 get product by id");
      res.status(500).json({error: error});
    });
});
//=========================================