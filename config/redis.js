'use strict';
var redis = require('redis');
var client = redis.createClient(6379);

function setRedis(key, data){
    console.log("guardando en redis");
    client.setex(key,3600,JSON.stringify(data));
    data.forEach(elemento => {
        //console.log(elemento);
        client.setex(elemento.id,3600,JSON.stringify(elemento));
    });
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