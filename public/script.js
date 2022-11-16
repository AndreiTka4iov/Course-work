var tx = document.getElementsByTagName('textarea');//РАСТЯГИВАЕМ_textarea

for (var i = 0; i < tx.length; i++) {

tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');

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