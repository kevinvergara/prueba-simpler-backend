'use strict';
var redis = require('redis');
var client = redis.createClient();

function setRedis(key, data){
    console.log("guardando en redis");
    client.setex(key,60,JSON.stringify(data));
    try{
        data.forEach(elemento => {
            //console.log(elemento);
            client.setex(elemento.uniqueID,60,JSON.stringify(elemento));
        });
    }catch(error){
        console.log("error al guardar el array de elementos");
    }
}

function getRedis(key){
    return new Promise((resolve, reject)=>{
        client.get(key, function (error, result) {
            if (error) {
                console.log("error en redis: ");
                console.log(error);
                reject({error: error});
            }
            resolve(result);
        });
    });
}

module.exports = {
    setRedis,
    getRedis
};