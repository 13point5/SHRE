const encryptForm = document.querySelector('#encrypt-form')
const plainTextField = document.querySelector('#plain-text')
const encryptedTextField = document.querySelector('#encrypted-text')
const downloadImgBtn = document.querySelector('#download-img-btn')


encryptForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const plainText = plainTextField.value

    if (! /^[a-z]+$/.test(plainText)) {
        alert("Input text can only contain lower case alphabets")
    } else {

        fetch('/encrypt?text=' + plainText).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    encryptedTextField.innerHTML = 'Error'
                } else {
                    encryptedTextField.innerHTML = data.cipherText
                }
            })
        })

    }
})


downloadImgBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const encText = encryptedTextField.innerHTML
    if (encText == 'Error' || encText == '') {
        alert('SHREncrypted text not found')
    } else {
        
        fetch('/t2i?text=' + encText).then((response) => {
            response.json().then((data) => {
                if(data.error || !data.img)
                    alert("Something went wrong")
                else {
                    console.log('Button clicked')
                    console.log(data)
                }
            })
        })
    }
})