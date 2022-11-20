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

function blureMenu(blure){
    blure.classList.toggle('active')
}

function reportMenu(report){
    document.querySelector('.report-menu')?.classList.toggle('active')
    blureMenu(document.querySelector('.blure'))
    openMoreMenu()
}