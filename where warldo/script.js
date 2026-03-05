let seconds = 0;
let timer = null;



function startGame(level){
    localStorage.setItem("level", level);
    window.location.href = "game.html";
}

function goHome(){
    window.location.href = "index.html";
}

function goLeaderboard(){
    window.location.href = "leaderboard.html";
}



function loadGame(){

    const level = localStorage.getItem("level");

    if(!level){
        window.location.href = "index.html";
        return;
    }

    const img = document.getElementById("gameImage");
    const timerEl = document.getElementById("timer");

    const waldoZones = {
        easy:   { x: 73, y: 62, radius: 4 },
        medium: { x: 41, y: 53, radius: 3 },
        hard:   { x: 52, y: 48, radius: 2.5 }
    };

    const waldo = waldoZones[level];


    img.src = level + ".png";

    img.onload = function(){

        seconds = 0;
        timerEl.innerText = "0s";

        clearInterval(timer);
        timer = setInterval(()=>{
            seconds++;
            timerEl.innerText = seconds + "s";
        },1000);

        img.onclick = function(e){

            const rect = img.getBoundingClientRect();

            const clickX = ((e.clientX - rect.left) / rect.width) * 100;
            const clickY = ((e.clientY - rect.top) / rect.height) * 100;

            const distance = Math.sqrt(
                Math.pow(clickX - waldo.x,2) +
                Math.pow(clickY - waldo.y,2)
            );

            if(distance < waldo.radius){
                clearInterval(timer);

                const name = prompt("Įvesk savo vardą:");

                if(name){
                    saveScore(name, seconds, level);
                }

                alert("🎉 Radai Waldo per " + seconds + " sekundžių!");
                goLeaderboard();
            } else {
                alert("❌ Ne čia!");
            }
        };
    };

    img.onerror = function(){
        alert("Nepavyko užkrauti paveikslo: " + level + ".png");
    };
}


