const express = require('express')
const path = require('path')
const hbs = require('hbs')
const trie = require('../public/scripts/jtrie.js')


const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


const app = express()
const port = process.env.PORT || 3003

// general config
app.use(express.static(publicDirPath))
app.use(express.json())


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

app.get('/encrypt', (req, res) => {
    let cipher = trie.encrypt(req.query.text)
    let cipherData = trie.encryptedText(cipher)
    res.send({ cipherData })
})

app.listen(port, () => {
    console.log('app running on port: ' + port)
})
