const encryptForm = document.getElementById('encrypt-form')
const plainTextField = document.getElementById('plain-text')
const encryptedTextField = document.getElementById('encrypted-text')

const normalImgBtn = document.getElementById('normal-img-btn')
const shreImgBtn = document.getElementById('shre-img-btn')

const normalImgLink = document.getElementById('normal-img-link')
const shreImgLink = document.getElementById('shre-img-link')

const nacman = document.getElementById("nacman")
const sacman = document.getElementById("sacman")


let cipherData


showPacman = (pacman) => {
    pacman.className = pacman.className.replace("pacman", "pacman-show")
}


hidePacman = (pacman) => {
    pacman.className = pacman.className.replace("pacman-show", "pacman")
}


encryptForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let plainText = plainTextField.value

    if (! /^[a-z]+$/.test(plainText)) {
        alert("Input text can only contain lower case alphabets")
    } else {

        fetch('/encrypt?text=' + plainText).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    alert('Something went wrong')
                } else {
                    cipherData = data.cipherData
                    encryptedTextField.innerHTML = data.cipherData.cipherText
                }
            })
        })

    }
})


normalImgBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const encText = encryptedTextField.innerHTML
    if (encText == 'Error' || encText == '') {
        alert('SHREncrypted text not found')
    } else {

        showPacman(nacman)

        fetch('https://stegoman-api.herokuapp.com/text2img', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ text: encText })
        })
        .then((res) => res.json())
        .then((data) => {

            hidePacman(nacman)

            if (data.error) {
                alert('Something went wrong')
            } else {
                normalImgLink.href = 'data:image/bmp;base64,' + data.img
                normalImgLink.click()
            }
        })

        
        
    }
})


shreImgBtn.addEventListener('click', (e) => {
    e.preventDefault()

    let encText = encryptedTextField.innerHTML
    let text = cipherData.cipherText
    let msg = cipherData.wordLens.split(',')

    if (encText == 'Error' || encText == '' || !cipherData) {
        alert('SHREncrypted text not found')
    } else {
        console.log(cipherData)

        showPacman(sacman)

        fetch('https://stegoman-api.herokuapp.com/shrencrypt', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ 
                text,
                msg
            })
        })
        .then((res) => res.json())
        .then((data) => {

            hidePacman(sacman)

            if (data.error) {
                alert('Something went wrong')
            } else {
                shreImgLink.href = 'data:image/bmp;base64,' + data.img
                shreImgLink.click()
            }
        })
        
    }
})