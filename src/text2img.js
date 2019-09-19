const request = require('request')

const text2img = (text, callback) => {
    const apiURl = 'https://stegoman-api.herokuapp.com/text2img'
    const ptext = text
    request.post({
        headers: {'content-type' : 'application/json'},
        url: apiURl,
        json: true,
        body: {
            text: ptext
        }
    }, (error, response) => {
        if(error)
            callback(error, undefined)
        else
            callback(undefined, response)
    })
}

module.exports = text2img