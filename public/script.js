let firstNameValue = false
let lastNamevalue = false
let emailValue = false
let passValue = false
let secondPassValue = false
let nextAllowed = false

var tx = document.getElementsByTagName('textarea');

for (var i = 0; i < tx.length; i++) {

tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;');

tx[i].addEventListener("input", OnInput, false);

}

function OnInput() {

this.style.height = 'auto';

this.style.height = (this.scrollHeight) + 'px';//////console.log(this.scrollHeight);

}

function openTopic(div){
    console.log()
    div.classList.toggle('active')
    div.parentNode.querySelector('.second-block')?.classList.toggle('active')
}

function openMoreMenu(span){
    span.classList.toggle('active')
    span.parentNode.parentNode.querySelector('.more-menu').classList.toggle('active')
}

function blureMenu(){
    document.querySelector('.blure')?.classList.toggle('active')
    document.querySelector('.sign-in')?.classList.remove('active')
    document.querySelector('.sign-up')?.classList.remove('active')
    document.querySelector('.report-menu')?.classList.remove('active')
}

function reportMenu(report){
    blureMenu()
    document.querySelector('.report-menu')?.classList.toggle('active')
}

function closeReportMenu(close){
    close.closest('.report-menu').classList.remove('active')
    blureMenu()
}

function showPassword(btnShow){
    const passInp = btnShow.parentNode.querySelector('.pass').type 
    btnShow.classList.toggle('active')
    if (passInp === 'password'){
        btnShow.parentNode.querySelector('.pass').type = 'text'
    } else if (passInp === 'text'){
        btnShow.parentNode.querySelector('.pass').type = 'password'
    }
}

function fucusOut(input){
    if (input.value.length === 0){
        input.style = "border-color: #a81e1e;"
    } else {
        input.style = ""
    }

    if (input.name == 'firstName'){
        if (input.value.length != 0){
            firstNameValue = true
        } else{
            firstNameValue = false
        }
    }

    if (input.name == 'password'){
        if (input.value.length >= 8){
            input.parentNode.style = ""
            passValue = true
        } else{
            input.parentNode.style = "border-color: #a81e1e;"
            passValue = false
        }
    }

    if (input.name == 'lastName'){
        if (input.value.length != 0){
            lastNamevalue = true
        } else{
            lastNamevalue = false
        }
    }

    if ((input.name == 'email')){
        if (input.value.length != 0){
            if (input.value.indexOf('@') > -1){
                input.style = ""
                emailValue = true
            } else{
                input.style = "border-color: #a81e1e;"
                emailValue = false
            }
        }
    }

    btnToNextPage()
    acceptSugnUp()
}

function fucusOutPass(input){
    if (input.closest('.second-page').querySelector('.first').value == input.value){
        input.parentNode.style = "";
        secondPassValue = true
    } else {
        input.parentNode.style = "border-color: #a81e1e;"
        secondPassValue = false
    }
    acceptSugnUp()
}

function btnToNextPage(){
    if (firstNameValue && lastNamevalue && emailValue){
        nextAllowed = true
        document.querySelector('.next').style = ""
    } else {
        nextAllowed = false
        document.querySelector('.next').style = "color: rgba(217, 217, 217, .6);"
    }
    
}

function nextPageScroll(next){
    if (nextAllowed) {
        next.closest('.flex-block').classList.toggle('active')
    }
}

function acceptSugnUp(){
    if (nextAllowed && passValue && secondPassValue){
        document.querySelector('.accept').disabled = false;
        document.querySelector('.accept').style = ""
    } else {
        document.querySelector('.accept').disabled = true;
        document.querySelector('.accept').style = "color: rgba(217, 217, 217, .6);"
    }
}

function backPageScroll(btn){
    btn.closest('.flex-block').classList.remove('active')
}