const decryptImgButton = document.getElementById('decrypt-img')
const decryptedMsg = document.getElementById('decrypted-msg')
const imgBase64 = document.getElementById('img-base64')
const fileInput = document.getElementById('files')

// Check for the File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    fileInput.addEventListener('change', handleFileSelect, false)
} else {
    alert('The File APIs are not fully supported in this browser.')
}
  
function handleFileSelect(evt) {
    let image = evt.target.files[0]
    let reader = new FileReader()

    reader.onload = ( () => {
        return (e) => {
            let binaryData = e.target.result

            let base64String = window.btoa(binaryData)

            imgBase64.value = base64String
        }
    })(image)

    // Read in the image file as a data URL.
    reader.readAsBinaryString(image)
}


decryptImgButton.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('https://stegoman-api.herokuapp.com/deshrencrypt', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ 
            img: imgBase64.value
        })
    })
    .then((res) => res.json())
    .then((data) => {

        if (data.error) {
            alert('Something went wrong')
        } else {
            decryptedMsg.value = data.msg
        }
    })
})