const express = require('express');
const path = require('path');
const trie = require('./jtrie.js').Trie;

const app = express()
const port = 3000



// trie.loadDict(path.join(__dirname + '/static/t1.json'))


app.get('', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/encrypt', (req, res) => {
    // console.log('Plain text: ' + req.query.text)
    var cipher = trie.encrypt(req.query.text)
    var cipherText = trie.encryptedText(cipher)
    // console.log(cipherText);
    res.send(cipherText)
})

app.listen(port, () => {
    console.log('app running on port: ' + port);
})
