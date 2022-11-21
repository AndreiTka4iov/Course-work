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

function closeSigIn(close){
    close.parentNode.parentNode.classList.remove('active')
    blureMenu()
}

function openSignIn(){
    blureMenu()
    document.querySelector('.sign-in')?.classList.toggle('active')
}

function openSignUp(){
    blureMenu()
    document.querySelector('.sign-up')?.classList.toggle('active')
}

function closeSigUp(close){
    close.parentNode.parentNode.classList.remove('active')
    blureMenu()
}