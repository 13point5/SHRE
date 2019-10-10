const fs = require('fs')
const path = require('path')

class Trie {

    constructor() {
        this.trie = {}
    }

    addWord(word) {
        let tmp2 = this.trie
        let tmp = tmp2

        let first_char = word[0]
        let word_len = word.length
        let curr_char

        if (tmp[first_char] === undefined)
            tmp[first_char] = {'end': false}

        if (word_len === 1)
            tmp[first_char]['end'] = true
        else {
            tmp = tmp[first_char]

            for (let idx = 1; idx < word.length; idx++) {
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
        let first_char = word[0]
        let word_len = word.length

        if (this.trie[first_char] === undefined) {
            return {
                'found': false
            }
        }

        let tmp = this.trie[first_char]
        let prefix = first_char
        let curr_char = first_char
        let idx = 0

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
        let next_choices = Object.keys(tmp)
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
        let next_choices = this.getNextChars(tmp)
        let next_char, word

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
        let cipher = []
        let msg_len = msg.length
        let prefix_res, word_res, prefix, tmp, idx, word

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
        for (let i = 0; i < cipher.length; i++) {
            cipherText += cipher[i][0] + ' '
        }
        return cipherText
    }

    loadDict(filePath) {
        let array = fs.readFileSync(filePath).toString().split("\n")
        for (let i = 0; i < array.length; i++) {
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
let dataPath = path.join(__dirname, '../data/t1.json')

trie.loadTrie(dataPath)

module.exports = {
    Trie: trie
}
