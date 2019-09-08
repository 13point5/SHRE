const encryptForm = document.querySelector('#encrypt-form')
const plainTextField = document.querySelector('#plain-text')
const encryptedTextField = document.querySelector('#encrypted-text')



encryptForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const plainText = plainTextField.value

    fetch('/encrypt?text=' + plainText).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                encryptedTextField.textContent = 'Error'
            } else {
                encryptedTextField.textContent = data.cipherText
            }
        })
    })
})
