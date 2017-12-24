// globals 
var docHeight = document.body.clientHeight;
var touchArea = document.getElementById("toucharea");
var sounds = {
  music: {
    sound: new Howl({
      src: ['sounds/DeanMartin-LetItSnow.ogg']
    })
  },
  bells: {
    sound: new Howl({
      src: ['sounds/SleighBells1.mp3']
    })
  }
};
// add event listeners for snow, start santa animation, and play music on load
window.onload = load;

function load() {
  var santa = document.createElement("span");
  var info = document.getElementById("info");
  touchArea.addEventListener("touchstart", touchSnow);
  touchArea.addEventListener("touchmove", touchSnow);
  touchArea.addEventListener("mousedown", function() {
    touchArea.addEventListener("mousemove", mouseSnow);
  });         
  touchArea.addEventListener("mouseup", endMouseSnow);
  info.classList.remove("loading");
  info.innerHTML = "Turn sound on and touch the screen or click your mouse.";
  santa.className += "santa";
  setInterval(function(){
    touchArea.appendChild(santa); 
      sounds.bells.sound.play();
    setTimeout(function(){
      santa.remove();
    },9500)
  },25000 + randomSpawn())
  sounds.music.sound.play();
}

function mouseSnow(e){
  e.preventDefault();
  snow(e);
}

function touchSnow(e) {
  e.preventDefault();
  var touch = e.changedTouches[0];
  snow(touch);
}

function snow(e) {
  var posX = e.clientX - 25;
  var posY = e.clientY - 25;
  var span = document.createElement("span");
  var size = randomSize();
  var snowflake = randomSnowflake();

  span.style.background = "url(images/snowflake-" + snowflake + ".svg) no-repeat";
  span.style.height = size + "px";
  span.style.width = size + "px";
  span.style.left = posX + "px";
  span.style.top = posY + "px";
  
  touchArea.appendChild(span);

  setTimeout(function(){
    span.style.transform = "rotate(" + rotationSpeed() + "deg)"
    span.style.top = fallDistance() + 'px';
  },0)
 
  setTimeout(function() {
    span.remove();
  },20000);
}

function endMouseSnow(e) {
  e.preventDefault();
  touchArea.removeEventListener("mousemove", mouseSnow);
}

function randomSpawn() {
  return Math.floor(Math.random() * (10001)) + 0;
}
  
function randomSize() {
  return Math.floor(Math.random() * (91)) + 10;
}

function randomSnowflake() {
  return Math.floor(Math.random() * (20)) + 0;
}

function fallDistance() {
  return Math.floor(Math.random() * 1000) + docHeight;
}

function rotationSpeed() {
  return Math.floor(Math.random() * (721)) + -360;
}