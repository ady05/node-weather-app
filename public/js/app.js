


const form = document.querySelector('form')
const search = document.querySelector('input')
const msg1 =document.querySelector('#message1')
const msg2 =document.querySelector('#message2')

msg1.textContent = ''

form.addEventListener('submit',(e) =>{
    const location = search.value
    msg1.textContent='loading...'
    msg2.textContent=''
    fetch('/weather?address='+location).then((response) =>{
    response.json().then((data) => {
        if(data.error){
            msg1.textContent = data.error
        }
        else{
            msg1.textContent =data.address
            msg2.textContent=data.forecast
        }
    })
})
    
})