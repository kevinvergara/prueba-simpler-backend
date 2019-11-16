'use strict';
const redis = require("../config/redis");
const axios = require('axios');

const api = "https://jsonplaceholder.typicode.com/";

async function getProducts() {
    return new Promise(async (resolve, reject)=>{
        var redis_data = await redis.getRedis("data-all");
        
        if(redis_data != null){
            console.log("consulta redis");
            resolve(redis_data);
        }else{
            console.log("consulta api");
            axios.get(api + 'posts')
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
    });
}


async function getProductById(id) {
    return new Promise(async (resolve, reject)=>{
        var redis_data = await redis.getRedis(id);
        
        if(redis_data != null){
            console.log("consulta redis");
            resolve(redis_data);
        }else{
            console.log("consulta api");
            axios.get(api + 'posts/'+id)
                .then(function (response) {
                    //console.log(response);
                    redis.setRedis(id,response.data);
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                })
        }
    });
}

module.exports = {
    getProducts,
    getProductById
};