const canvas = document.querySelector('#canvas');
console.log(canvas);

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

canvas.style.position = 'fixed';

//getting drawing context (2d or 3d)
const drawer = canvas.getContext("2d");

var i = 0;
setInterval(()=>{

    //clearing the canvas

    if(i<canvas.width-50 && i<canvas.height-100){
    drawer.clearRect(0,0,canvas.width,canvas.height)
    drawer.fillRect(canvas.width/2-35 ,canvas.height/2-35,50,50);
    drawer.fillRect(canvas.width-100 - i,0 + i,50,50);
    drawer.fillStyle = "green";
    
    drawer.fillRect(0+i,canvas.height-100-i,50,50);
    drawer.fillRect(canvas.width-100-i,canvas.height-100-i,50,50);
    drawer.fillRect(0+i,0+i,50,50);
    i++;
    }
},10)
var j = 0;
window.addEventListener("keydown",(e)=>{
    switch(e.key){
    case ' ':
        i-=100;
        break; 
    }

})
