let weightslider=document.getElementById("myweight");
let outputweight=document.getElementById("inputweight");
let heightslider=document.getElementById("myheight");
let outputheight=document.getElementById("inputheight");

outputweight.innerHTML = weightslider.value;
outputheight.innerHTML = heightslider.value;

weightslider.oninput = function() {
    outputweight.innerHTML = this.value;
}

heightslider.oninput = function() {
    outputheight.innerHTML = this.value;
}

function cal_bmi(){
    let weight = 

}