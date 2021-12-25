//Game vairables Here
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('musicsound.mp3');
let speed = 1;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{x: 13, y: 15}];
   food = {x: 6, y: 7};

// All Game Functin wil be start From here
function main(ctime){  //ctime is Curent Time 
   window.requestAnimationFrame(main);
//    console.log(ctime);
   if((ctime - lastPaintTime)/100 < 1/speed){
       return;
   }
   lastPaintTime = ctime;
   gameEngin();
 }
 function isCollide(snake){
       
    //if palyer Bump in to your self
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y ){
            return true;
        }
    }
    //if Player bump in to the wall
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
            return  true
        }  
        return false;
 }

      function gameEngin(){
          //.partf 1. updating the snake array & Food
        if(isCollide(snakeArr)){
            gameOverSound.play();
            musicSound.pause();
            inputDir ={x: 0, y: 0};
            // document.write("Game is Over Prees any key to play again");
            alert("Game is Over Prees any key to play again");
            snakeArr = [{x: 13, y:15}];
            musicSound.play();       // here we can Close and start the pal Music
            score = 0;
        }

        //if snake have Eaten The Food Increment the Score And Regenerate the food
        if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
            foodSound.play();
            score += 1;
            if(score>hiscoreval){
                hiscoreval = score;
                localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
                hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
            }
            scoreBox.innerHTML = "Score: " + score;
            snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
            let a = 2;
            let b = 16;
            food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        }

           //From here we will do  moving the Snake 

           for (let i = snakeArr.length - 2; i >= 0; i--) {
               snakeArr[i+1] = {...snakeArr[i]};     
           }

           snakeArr[0].x += inputDir.x
           snakeArr[0].y += inputDir.y
          // Par Two Here We Will Display  the snake Food
          //Display  the snake
          board.innerHTML = "";
          snakeArr.forEach((e,index)=>{
            snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart = e.x;

            if(index === 0){
                snakeElement.classList.add('head');
            }
            else{
                snakeElement.classList.add('snake');
            }
          
            board.appendChild(snakeElement);
          });
          //From here We Will Display  the snake
          foodElement = document.createElement('div');
          foodElement.style.gridRowStart = food.y;
          foodElement.style.gridColumnStart = food.x;
          foodElement.classList.add('food');
          board.appendChild(foodElement);
}

//All JavaScipt Main Logic Will be Start from Here
musicSound.play();          
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1}//Start The Game
    moveSound.play();
    //From Here we cn control snake with Bottum arrow key uo,down ,left,right
    switch (e.key) {
        case "ArrowUp":
               console.log("ArrowUp");
               inputDir.x = 0;
               inputDir.y = -1;
               break;

        case "ArrowDown":
               console.log("ArrowDown");
               inputDir.x = 0;
               inputDir.y = 1;
               break;

        case "ArrowLeft":
               console.log("ArrowLeft");
               inputDir.x = -1;
               inputDir.y = 0;
               break;

         case "ArrowRight":
               console.log("ArrowRight");
               inputDir.x = 1;
               inputDir.y = 0;
                break;
    
        default:
            break;
    }
})