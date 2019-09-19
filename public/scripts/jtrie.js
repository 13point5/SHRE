const fs = require('fs');
const path = require('path');

class Trie {

    constructor() {
        this.trie = {}
    }

    addWord(word) {
        var tmp2 = this.trie
        var tmp = tmp2

        var first_char = word[0]
        var word_len = word.length
        var curr_char

        if (tmp[first_char] === undefined)
            tmp[first_char] = {'end': false}

        if (word_len === 1)
            tmp[first_char]['end'] = true
        else {
            tmp = tmp[first_char]

            for (var idx = 1; idx < word.length; idx++) {
                curr_char = word[idx]

                if (tmp[curr_char] === undefined)
                    tmp[curr_char] = {'end': false}

                if (idx == word_len - 1)
                    tmp[curr_char]['end'] = true

                tmp = tmp[curr_char]
            }
        }

        this.trie = tmp2
    }

    longestPrefix(word) {
        var first_char = word[0]
        var word_len = word.length

        if (this.trie[first_char] === undefined) {
            return {
                'found': false
            }
        }

        var tmp = this.trie[first_char]
        var prefix = first_char
        var curr_char = first_char
        var idx = 0

        for (idx = 1; idx < word_len; idx++) {
            curr_char = word[idx]

            if (tmp[curr_char]) {
                tmp = tmp[curr_char]
                prefix = prefix.concat(curr_char)
            } else {
                break
            }
        }

        return {
            'found': true,
            prefix,
            tmp,
            idx
        }
    }

    getNextChars(tmp) {
        var next_choices = Object.keys(tmp)
        next_choices = next_choices.filter((item) => item !== 'end')
        return next_choices
    }

    getRandom(arr) {
        if (arr === undefined) {
            return undefined
        }
        return arr[Math.floor(Math.random() * arr.length)]
    }

    completeWord(prefix, tmp, idx) {
        var next_choices = this.getNextChars(tmp)
        var next_char, word

        word = prefix
        while (tmp['end'] === false) {
            next_char = this.getRandom(next_choices)
            if (next_char === undefined) {
                break
            }
            word = word.concat(next_char)
            next_choices = this.getNextChars(tmp[next_char])
            tmp = tmp[next_char]
        }

        return {
            word,
            idx
        }
    }

    encrypt(msg) {
        var cipher = []
        var msg_len = msg.length
        var prefix_res, word_res, prefix, tmp, idx, word

        while (msg_len > 0) {

            prefix_res = this.longestPrefix(msg)
            prefix = prefix_res['prefix']
            tmp = prefix_res['tmp']
            idx = prefix_res['idx']

            word_res = this.completeWord(prefix, tmp, idx)
            word = word_res['word']
            idx = word_res['idx']

            if (idx === 0) {
                idx = 1
            }

            cipher.push([word, idx])
            msg = msg.slice(idx, )
            msg_len -= prefix.length
        }

        return cipher
    }

    encryptedText(cipher) {
        let cipherText = ''
        for (var i = 0; i < cipher.length; i++) {
            cipherText += cipher[i][0] + ' '
        }
        return cipherText
    }

    loadDict(filePath) {
        var array = fs.readFileSync(filePath).toString().split("\n")
        for (var i = 0; i < array.length; i++) {
            if (array[i]) {
                    this.addWord(array[i])
            }
        }
    }

    loadTrie(filePath) {
        this.trie = JSON.parse(fs.readFileSync(filePath).toString())
    }

    saveTo(filePath) {
        fs.writeFileSync(filePath, JSON.stringify(this.trie))
    }

    pprint() {
        console.log(this.trie)
    }
}


let trie = new Trie()
// // trie.loadDict('../dictionaries/google-10000-english-usa-no-swears-medium.txt')
// // trie.pprint()
// // trie.saveTo('t1.json')
//
const dataPath = path.join(__dirname, '../data/t1.json')
trie.loadTrie(dataPath)
// // trie.pprint()
//
// var cipher = trie.encrypt('tyukyjthrfg')
// console.log(cipher);

module.exports = {
    Trie: trie
}
