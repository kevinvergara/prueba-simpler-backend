'use strict';
const redis = require("./redis");
const axios = require('axios');
const datos_parametros = require('../assets/productos');

const api = "https://simple.ripley.cl/api/v2/products";

const error_arreglo = [
    4,3,2,7,54,24,75,53,87,85
];

async function getProducts() {
    return new Promise(async (resolve, reject)=>{
        let numero_random = 0;
        do {
            numero_random = getRandomInt(1,100);
            console.log(numero_random);
            if(!error_arreglo.includes(numero_random)){
                console.log("numero correcto");
                var redis_data = await redis.getRedis("data-all");
        
                if(redis_data != null){
                    console.log("consulta redis");
                    resolve(redis_data);
                }else{
                    console.log("consulta api");
                    axios.get(api + '?partNumbers=' + datos_parametros.productos + '&format=json')
                        .then(function (response) {
                            //console.log(response);
                            redis.setRedis("data-all",response.data);
                            resolve(response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                            reject(error);
                        })
                }
            }else{
                console.log("falló a proposito");
            }
        } while (error_arreglo.includes(numero_random));
    });
}


async function getProductById(id) {
    return new Promise(async (resolve, reject)=>{
        let numero_random = 0;
        do {
            numero_random = getRandomInt(1,100);
            console.log(numero_random);
            if(!error_arreglo.includes(numero_random)){
                console.log("numero correcto");
                var redis_data = await redis.getRedis(id);
                
                if(redis_data != null){
                    console.log("consulta redis");
                    resolve(redis_data);
                }else{
                    console.log("consulta api");
                    axios.get(api + '/by-id/'+id)
                        .then(function (response) {
                            redis.setRedis(id,response.data);
                            resolve(response.data);
                        })
                        .catch(function (error) {
                            console.log("error consulta api byid");
                            console.log(error);
                            reject(error);
                        })
                }
            }else{
                console.log("falló a proposito");
            }
        } while (error_arreglo.includes(numero_random));
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    getProducts,
    getProductById
};