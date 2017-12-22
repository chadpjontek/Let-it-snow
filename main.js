
function randomSize() {
  return Math.floor(Math.random() * (91)) + 10;
}
function randomSnowflake() {
  return Math.floor(Math.random() * (20)) + 0;
}
function fallDistance() {
  return Math.floor(Math.random() * 1000) + 500;
}
function rotationSpeed() {
  return Math.floor(Math.random() * (721)) + -360;
}
var touchArea = document.getElementById("toucharea");

touchArea.addEventListener("touchstart", function (e) {
  snow(e);
});

touchArea.addEventListener("touchmove", function (e) {
  snow(e);
});

function snow(e) {
  e.preventDefault();

  var touch = e.changedTouches[0];
  var posX = touch.clientX - 25;
  var posY = touch.clientY - 25;

  var span = document.createElement("span");
  var size = randomSize();
  var snowflake = randomSnowflake();
  span.style.background = "url(/svgs/snowflake-" +   + ") no-repeat";
  span.style.height = size + "px";
  span.style.width = size + "px";
  span.style.left = posX + "px";
  span.style.top = posY + "px";
  
  touchArea.appendChild(span);

  setTimeout(function(){
    span.style.transform = "rotate(" + rotationSpeed() + "deg)"
    span.style.top = fallDistance() + posY + 'px';
  },0)
 
  setTimeout(function() {
    span.remove();
  },10000);
}
