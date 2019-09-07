const express = require('express');
const path = require('path');
const hbs = require('hbs');
// const trie = require('./jtrie.js').Trie;

const app = express()
const port = 3000

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirPath))

// handlebar config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// trie.loadDict(path.join(__dirname + '/static/t1.json'))


app.get('', (req, res) => {
    res.render('index')
})

// app.get('/encrypt', (req, res) => {
//     // console.log('Plain text: ' + req.query.text)
//     var cipher = trie.encrypt(req.query.text)
//     var cipherText = trie.encryptedText(cipher)
//     // console.log(cipherText);
//     res.send(cipherText)
// })

app.listen(port, () => {
    console.log('app running on port: ' + port);
})
