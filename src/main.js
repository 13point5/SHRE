const express = require('express');
const path = require('path');
const hbs = require('hbs');
const trie = require('../public/scripts/jtrie.js').Trie;

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


app.get('', (req, res) => {
    res.render('index')
})

app.get('/decrypt', (req, res) => {
    res.render('decryption')
})

app.get('/docs', (req, res) => {
    res.render('docs')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/encrypt', (req, res) => {
    let cipher = trie.encrypt(req.query.text)
    let cipherText = trie.encryptedText(cipher)
    res.send({ cipherText })
})

app.listen(port, () => {
    console.log('app running on port: ' + port);
})
