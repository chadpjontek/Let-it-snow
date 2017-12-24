// globals 
var docHeight = document.body.clientHeight;
var docWidth = document.body.clientWidth;
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
// add event listeners for snow, start xmas animations, and play music on load
window.onload = load;

function load() {
  touchArea.addEventListener("touchstart", touchSnow);
  touchArea.addEventListener("touchmove", touchSnow);
  touchArea.addEventListener("mousedown", function() {
    touchArea.addEventListener("mousemove", mouseSnow);
  });         
  touchArea.addEventListener("mouseup", endMouseSnow);

  // santa spawn
  setInterval(function(){
    spawnSanta();
  },20000 + randomSpawn())
  // gift spawn
  setInterval(function(){
    for(var i = 0; i < 6; i++){
      spawnGifts(i);
    }
  },15000 + randomSpawn())
  // xmas spawn
  setInterval(function(){
    for(var i = 0; i < 6; i++){
      spawnXmas(i);
    }
  }, 15000)

  sounds.music.sound.play();
}

function spawnSanta (){
  var santa = document.createElement("span");
  santa.className += "santa";
  touchArea.appendChild(santa); 
  sounds.bells.sound.play();
  setTimeout(function(){
    santa.remove();
  },9500)
}

function spawnGifts (i){
  var gift = document.createElement("span");

  gift.style.background = "url(images/" + i + "-gift.svg) no-repeat";
  gift.style.height = randomXmasSize() + "px";
  gift.style.width = randomXmasSize() + "px";
  gift.style.left = (docWidth * .015) + (i * docWidth * .167) + "px";
  gift.style.top = docHeight - docHeight * .15 + "px";
  gift.className += "gift";
  
  touchArea.appendChild(gift);

  setTimeout(function() {
    gift.remove();
  },10000);
}

function spawnXmas (i){
  var xmas = document.createElement("span");
  var rand = Math.floor(Math.random() * (14)) + 0;
  switch (rand) {
    case 0: xmas.style.background = "url(images/0-snowman.svg) no-repeat";
    break;
    case 1: xmas.style.background = "url(images/1-snowman.svg) no-repeat";
    break;
    case 2: xmas.style.background = "url(images/angel.svg) no-repeat";
    break;
    case 3: xmas.style.background = "url(images/bell.svg) no-repeat";
    break;
    case 4: xmas.style.background = "url(images/christmas-tree.svg) no-repeat";
    break;
    case 5: xmas.style.background = "url(images/drum.svg) no-repeat";
    break;
    case 6: xmas.style.background = "url(images/wreath.svg) no-repeat";
    break;
    case 7: xmas.style.background = "url(images/elf.svg) no-repeat";
    break;
    case 8: xmas.style.background = "url(images/gingerbread-man.svg) no-repeat";
    break;
    case 9: xmas.style.background = "url(images/mistletoe.svg) no-repeat";
    break;
    case 10: xmas.style.background = "url(images/sled.svg) no-repeat";
    break;
    case 11: xmas.style.background = "url(images/sock.svg) no-repeat";
    break;
    case 12: xmas.style.background = "url(images/toy-train.svg) no-repeat";
    break;
    case 13: xmas.style.background = "url(images/trumpet.svg) no-repeat";
    break;
  }
  xmas.style.height = randomXmasSize() + "px";
  xmas.style.width = randomXmasSize() + "px";
  xmas.style.left = (docWidth * .015) + (i * docWidth * .167) + "px";
  xmas.style.top = docHeight - docHeight * randomY() + "px";
  xmas.className += "xmas";
  
  touchArea.appendChild(xmas);
  
  setTimeout(function() {
    xmas.remove();
  },10000);

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

function randomY() {
  return 0.25 + 0.01 * (Math.floor(Math.random() * (56)) + 0);
}

function randomXmasSize() {
  return Math.floor(Math.random() * (101)) + 50;
}
function randomSpawn() {
  return Math.floor(Math.random() * (20001)) + 0;
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