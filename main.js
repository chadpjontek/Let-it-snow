const docHeight = document.body.clientHeight;

const sounds = {
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

function load() {
  sounds.music.sound.play();
  var element = document.getElementById("info");
  element.classList.remove("loading");
  element.innerHTML = "Turn sound on and touch the screen or click your mouse.";
}
window.onload = load;
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
var touchArea = document.getElementById("toucharea");
var santa = document.createElement("span");
santa.className += "santa";
setInterval(function(){
  touchArea.appendChild(santa); 
    sounds.bells.sound.play();
  setTimeout(function(){
    santa.remove();
  },9500)
},30000)

touchArea.addEventListener("touchstart", touchSnow);

touchArea.addEventListener("touchmove", touchSnow);

touchArea.addEventListener("mousedown", function() {
  touchArea.addEventListener("mousemove", mouseSnow);
});         

touchArea.addEventListener("mouseup", endMouseSnow);

function endMouseSnow(e) {
  e.preventDefault();
  touchArea.removeEventListener("mousemove", mouseSnow);
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