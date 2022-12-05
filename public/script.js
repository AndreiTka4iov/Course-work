let firstNameValue = false
let lastNamevalue = false
let emailValue = false
let passValue = false
let secondPassValue = false
let nextAllowed = false

var xhr = new XMLHttpRequest();
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
    const secondBlock =div.parentNode.querySelector('.second-block'),
        countBtn = 32 * secondBlock?.querySelectorAll('.btn-click').length +'px;'
    div.classList.toggle('active')
    if (secondBlock.style.cssText != ''){
        secondBlock.style.cssText = ''
    }else{
        secondBlock.style.cssText = 'height:'+countBtn
    }   
}

function openMoreMenu(span){
    blureMenuTransparency()
    span.classList.toggle('active')
    span.parentNode.parentNode.querySelector('.more-menu').classList.toggle('active')
}

function blureMenu(){
    document.querySelector('.blure')?.classList.toggle('active')
    document.querySelector('.report-menu')?.classList.remove('active')
    document.querySelector('.confirmation-del')?.classList.remove('active')
    document.querySelector('.topics-menu')?.classList.remove('active')
}

function blureMenuTransparency(){
    document.querySelector('.blure-transparency')?.classList.toggle('active')
    document.querySelector('.drop-down-menu.active')?.classList.remove('active')
    document.querySelector('.more-menu.active')?.classList.remove('active')
    document.querySelector('.more.active')?.classList.remove('active')
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

function openDropDoownUser(dropDown){
    blureMenuTransparency()
    dropDown.parentNode.querySelector('.drop-down-menu')?.classList.toggle('active')
}

function deleteThis(btn) {
    const body = 'idCom=' + btn.id
    xhr.open("POST", '/forum/item/delete', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);

    btn.closest('.answer-user').remove()
}

function deleteComent(btn) {
    const body = 'idCom=' + btn.id
    xhr.open("POST", '/news/item/delete', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);

    btn.closest('.answer-user').remove()
}

function ratingEdite(btn) {
    const body = 'value=' + btn.id +
                '&idPost=' + btn.className
    xhr.open("POST", '/forum/item/rating', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);

    if (btn.id == 1){
       let rating = Number(btn.closest('.rating-block').querySelector('.rating-text').innerHTML)
       rating += 1
       btn.closest('.rating-block').querySelector('.rating-text').innerHTML = rating
    } else if (btn.id == -1) {
        let rating = Number(btn.closest('.rating-block').querySelector('.rating-text').innerHTML)
        rating -= 1
        btn.closest('.rating-block').querySelector('.rating-text').innerHTML = rating   
    }
}

function openTopicMenu() {
    document.querySelector('.topics-menu').classList.add('active')
    document.querySelector('.blure').classList.add('active')
}

function homeSearch(inp){
    inp.closest('.input-home-screen')?.querySelector('.result-search-home').classList.add('show')
    const selectValue = inp.closest('.input-home-screen')?.querySelector('select').value
    const inputValue = inp.value
    const body = 'searchFrom=' + selectValue +'&input=' + inputValue

    xhr.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
            resultHomeSearch(this.responseText)
        }
    }
    xhr.open("GET", '/search?'+body, true)
    xhr.send()
}

function resultHomeSearch(data) {
    const redultReq = JSON.parse(data)
    const parentBlock = document.querySelector('.result-search-home')
    const selectValue = document.querySelector('.input-home-screen')?.querySelector('select').value

    while (parentBlock.firstChild) {
        parentBlock.removeChild(parentBlock.lastChild);
    }
    
    for (var i=0; i<redultReq.length; i++){

        let a = document.createElement('a')

        a.innerHTML = redultReq[i].title
        if (selectValue == 1) {
            a.href = '/news/item?id_post=' + redultReq[i].id + '&id_user=' + redultReq[i].id_user
        } else if (selectValue == 2){
            a.href = '/forum/item?id=' + redultReq[i].id + '&id_user=' + redultReq[i].id_user
        }
        
        parentBlock.appendChild(a)
    }
}

function homeLeave(inp){
    const parentBlock = document.querySelector('.result-search-home')
    setTimeout(() => 
    inp.closest('.input-home-screen')?.querySelector('.result-search-home').classList.remove('show')
    , 100);         
}