const btnLink = document.querySelector('#back');
btnLink.addEventListener("click",()=>{
    location.replace("index.html")
});

function shuffle() {
    const img = document.querySelector('#battlefield');
    let random = Math.floor(Math.random()*6) + 1;
    img.setAttribute("src",`assets/${random}.png`);
};

function anim(){
    setTimeout(shuffle,500);
    const img = document.querySelector('#battlefield');
    img.setAttribute("src",`assets/dice-rol.gif`);
}

