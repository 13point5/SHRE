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

module.exports = { 
    text2img,
    shrencrypt
}