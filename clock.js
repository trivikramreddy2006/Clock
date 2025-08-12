function updateclock(){
    const now=new Date();
    let hours=now.getHours();
    let minutes=now.getMinutes().toString().padStart(2,'0');
    let seconds=now.getSeconds().toString().padStart(2,'0');
    let ampm=hours>=12?"PM":"AM";
    hours=hours%12;
    hours = String(hours).padStart(2, '0');
    document.getElementById("clock").textContent=`${hours}:${minutes}:${seconds} ${ampm}`;
    let day=String(now.getDate()).padStart(2,'0');
    let month=String(now.getMonth()+1).padStart(2,'0');
    let year=now.getFullYear();
    document.getElementById("date").textContent=`${day}/${month}/${year}`;
}
setInterval(updateclock,1000);
updateclock();

let stopwatchinterval;
let elapsedtime=0;
let running=false;

const stopwatchdisplay=document.getElementById("stopwatch-display");
const start=document.getElementById("startstopwatch");
const stop=document.getElementById("stop");
const reset=document.getElementById("reset");
const lap=document.getElementById("lap");
const laplist=document.getElementById("laps");

function formattime(ms){
    const totalseconds=Math.floor(ms/1000);
    const minutes=String(Math.floor((totalseconds%3600)/60)).padStart(2,'0');
    const hours = String(Math.floor(totalseconds / 3600)).padStart(2, '0');
    const seconds=String(totalseconds%60).padStart(2,'0');
    return `${hours}:${minutes}:${seconds}`;
}

function startstopwatch(){
    if(!running){
        running=true;
        const starttime=Date.now()-elapsedtime;
        stopwatchinterval=setInterval(()=>{
            elapsedtime=Date.now()-starttime;
            stopwatchdisplay.textContent=formattime(elapsedtime);
        },100);
    }
}
function stopStopwatch() {
    running = false;
    clearInterval(stopwatchinterval);
}
function resetStopwatch() {
    running = false;
    clearInterval(stopwatchinterval);
    elapsedtime = 0;
    stopwatchdisplay.textContent = "00:00:00";
    //make the content of lapslist empty after clicking reset

    laplist.innerHTML = "";
}
function addLap() {
    if (running) {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = formattime(elapsedtime);
        laplist.appendChild(li);
    }
}
start.addEventListener("click", startstopwatch);
stop.addEventListener("click", stopStopwatch);
reset.addEventListener("click", resetStopwatch);
lap.addEventListener("click", addLap);
const colorchange = document.getElementById("colorzone");

colorchange.addEventListener("mouseenter", function() {
    colorchange.style.backgroundColor = "red";
});

colorchange.addEventListener("mouseleave", function() {
    colorchange.style.backgroundColor = "aqua";
});