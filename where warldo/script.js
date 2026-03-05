let seconds = 0
let timer = null

const waldoZones = {
easy:{x:73,y:55},
medium:{x:78,y:72},
hard:{x:86,y:60}
}

function startGame(level){
localStorage.setItem("level",level)
window.location="game.html"
}

function goHome(){
window.location="index.html"
}

function goLeaderboard(){
window.location="leaderboard.html"
}

function loadGame(){

const level=localStorage.getItem("level")

const img=document.getElementById("gameImage")
const hitbox=document.getElementById("waldoHitbox")
const timerEl=document.getElementById("timer")

img.src=level+".png"

const waldo=waldoZones[level]

hitbox.style.left=waldo.x+"%"
hitbox.style.top=waldo.y+"%"

seconds=0

clearInterval(timer)

timer=setInterval(()=>{
seconds++
timerEl.innerText=seconds+"s"
},1000)

hitbox.onclick=function(){

clearInterval(timer)

const name=prompt("Enter your name")

if(name){
saveScore(name,seconds,level)
}

alert("You found Waldo in "+seconds+" seconds!")

window.location="leaderboard.html"

}

}

function saveScore(name,time,level){

let scores=JSON.parse(localStorage.getItem("scores"))||[]

scores.push({name,time,level})

scores.sort((a,b)=>a.time-b.time)

localStorage.setItem("scores",JSON.stringify(scores))

}