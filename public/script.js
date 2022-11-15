function openTopic(div){
    console.log()
    div.classList.toggle('active')
    div.parentNode.querySelector('.second-block')?.classList.toggle('active')
}