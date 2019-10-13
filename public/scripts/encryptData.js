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
    pacman.className = "pacman-show"
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
                    encryptedTextField.innerHTML = 'Error'
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
        // show pacman
        showPacman(nacman)

        fetch('/t2i?text=' + encText).then((response) => {
            response.json().then((data) => {
                // hide pacman
                hidePacman(nacman)

                if(data.error || !data.img)
                    alert("Something went wrong")
                else {
                    console.log('Button clicked')
                    console.log(data)
                    normalImgLink.href = 'data:image/bmp;base64,' + data.img
                    normalImgLink.click()
                }
            })
        })
        
    }
})


shreImgBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const encText = encryptedTextField.innerHTML
    if (encText == 'Error' || encText == '' || !cipherData) {
        alert('SHREncrypted text not found')
    } else {
        console.log(cipherData)
        // show pacman
        showPacman(sacman)

        fetch('/shrencrypt?text=' + cipherData.cipherText + '&msg=' + cipherData.wordLens).then((response) => {
            response.json().then((data) => {
                // hide pacman
                hidePacman(sacman)
                console.log(data)
                if(data.error || !data.img)
                    alert("Something went wrong")
                else {
                    console.log('Button clicked')
                    console.log(data)
                    shreImgLink.href = 'data:image/bmp;base64,' + data.img
                    shreImgLink.click()
                }
            })
        })
        
    }
})