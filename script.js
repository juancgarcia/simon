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

function nextLevel() {
  var addColor = Math.floor(Math.random() * 4)
  gameSequence.push(colorSequence[addColor])
  counter = 0
  for (i = 0; i < gameSequence.length; i++) {
    var number = Math.floor(Math.random() * gameSequence.length)
    var thisColor = gameSequence[number]
    gameSequence.push(thisColor)
    gameSequence.shift()
  }
}


randomColors()
var counter = 0
function startGame() {
    var thisSquare = gameSequence[counter]
    var lastSquare = gameSequence[counter-1]
    console.log(gameSequence[counter])
    // $(lastSquare).css('opacity', '.5')
    setTimeout(function(){
    $(thisSquare).css('opacity', '1')}, 200)
    setTimeout(function(){
      $(thisSquare).css('opacity', '.5')}, 1000)
    counter++
    if (counter < gameSequence.length) {
      setTimeout(startGame, 1000)
    }

}


$('html').keydown(function(e) {
  if(e.which === 38) {
    userSequence.push('#red')
    red.css('opacity', '1')
    setTimeout(function() {
      red.css('opacity', '.5')}, 200)
    if (userSequence.length === gameSequence.length) {
      endLevel()
    }
  }
})


$('html').keydown(function(e) {
  if(e.which === 37) {
    userSequence.push('#blue')
    blue.css('opacity', '1')
    setTimeout(function() {
      blue.css('opacity', '.5')}, 200)
      if (userSequence.length === gameSequence.length) {
        endLevel()
      }

  }
})

$('html').keydown(function(e) {
  if(e.which === 39) {
    userSequence.push('#green')
    green.css('opacity', '1')
    setTimeout(function() {
      green.css('opacity', '.5')}, 200)
      if (userSequence.length === gameSequence.length) {
        endLevel()
      }

  }
})

$('html').keydown(function(e) {
  if(e.which === 40) {
    userSequence.push('#yellow')
    yellow.css('opacity', '1')
    setTimeout(function() {
      yellow.css('opacity', '.5')}, 200)
      if (userSequence.length === gameSequence.length) {
        endLevel()
      }

  }
})



endLevel()

function endLevel() {
  if (JSON.stringify(userSequence) === JSON.stringify(gameSequence)) {
    console.log('You Win')
    userSequence = []
    nextLevel()
  }
}
