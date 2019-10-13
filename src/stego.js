const request = require('request')

const text2img = (text, callback) => {

    request.post({
        headers: {'content-type' : 'application/json'},
        url: 'https://stegoman-api.herokuapp.com/text2img',
        json: true,
        body: {
            text
        }
    }, (error, response) => {
        if(error)
            callback(error, undefined)
        else
            callback(undefined, response)
    })
}


const shrencrypt = (text, msg, callback) => {

    let msg_list = msg.split(",")
    console.log({
        text: text,
        msg: msg_list
    })

    request.post({
        headers: {'content-type' : 'application/json'},
        url: 'https://stegoman-api.herokuapp.com/shrencrypt',
        json: true,
        body: {
            text: text,
            msg: msg_list
        }
    }, (error, response) => {
        if(error)
            callback(error, undefined)
        else
            callback(undefined, response)
    })
}

const deShrencrypt = (img, callback) => {
    request.post({
        headers: {'content-type' : 'application/json'},
        url: 'https://stegoman-api.herokuapp.com/deshrencrypt',
        json: true,
        body: {
            img
        }
    }, (error, response) => {
        if(error)
            callback(error, undefined)
        else
            callback(undefined, response)
    })
}

module.exports = { 
    text2img,
    shrencrypt,
    deShrencrypt
}