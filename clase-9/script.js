
var form = document.getElementsByClassName('subscription-form')[0]

function btnForm(event){
    
    event.preventDefault()

    var formData = new FormData(form);
    var data = Object.fromEntries(formData.entries())

    console.log('Datos del formulario:', data)
}

form.addEventListener('submit', btnForm)

