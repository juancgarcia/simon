var red = $('#red')
var blue = $('#blue')
var green = $('#green')
var yellow = $('#yellow')



var gameSequence = []
var colorSequence = ['#green', '#blue', '#red', '#yellow' ]
var userSequence = []

function randomColors() {

  for (i = 0; i < colorSequence.length; i++){
    var number = Math.floor(Math.random() * 4)
    gameSequence.push(colorSequence[number])
  }
}

randomColors()
var i = 0
function startGame() {
    var thisSquare = gameSequence[i]
    var lastSquare = gameSequence[i-1]
    console.log(gameSequence[i])
    $(lastSquare).css('opacity', '.5')
    setTimeout(function(){
    $(thisSquare).css('opacity', '1')}, 200)
    i++
    if (i < gameSequence.length) {
      setTimeout(startGame, 1000)
    }
}

$('html').keydown(function(e) {
  if(e.which === 38) {
    userSequence.push('#red')
    red.css('opacity', '1')
    setTimeout(function() {
      red.css('opacity', '.7')}, 200)

  }
})

$('html').keydown(function(e) {
  if(e.which === 37) {
    userSequence.push('#blue')
    blue.css('opacity', '1')
    setTimeout(function() {
      blue.css('opacity', '.7')}, 200)

  }
})

$('html').keydown(function(e) {
  if(e.which === 39) {
    userSequence.push('#green')
    green.css('opacity', '1')
    setTimeout(function() {
      green.css('opacity', '.7')}, 200)

  }
})

$('html').keydown(function(e) {
  if(e.which === 40) {
    userSequence.push('#yellow')
    yellow.css('opacity', '1')
    setTimeout(function() {
      yellow.css('opacity', '.7')}, 200)

  }
})

function endLevel() {
  if (JSON.stringify(userSequence) === JSON.stringify(gameSequence)) {
    console.log('You Win')
    userSequence = ''
  }
}
