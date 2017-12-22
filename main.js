var docHeight = document.body.clientHeight;
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
  span.style.background = "url(svgs/snowflake-" + snowflake + ".svg) no-repeat";
  span.style.height = size + "px";
  span.style.width = size + "px";
  span.style.left = posX + "px";
  span.style.top = posY + "px";
  
  touchArea.appendChild(span);

  setTimeout(function(){
    span.style.transform = "rotate(" + rotationSpeed() + "deg)"
    span.style.top = fallDistance() - posY + 'px';
  },0)
 
  setTimeout(function() {
    span.remove();
  },20000);
}