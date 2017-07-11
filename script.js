var red = $('#red')
var blue = $('#blue')
var green = $('#green')
var yellow = $('#yellow')



var gameSequence = []
var colorSequence = ['#green', '#blue', '#red', '#yellow' ]
var userSequence = []
var level = 4
var turn = 0
var counter = 0
var gameReady = true
var levelCount = 1
var userReady = true


//Randomizes game sequence, the length of which is determined by level
function randomColors() {
  for (i = 0; i < level ; i++){
    var number = Math.floor(Math.random() * 4)
    gameSequence.push(colorSequence[number])
  }
}

//Upon each keypress, evaluates if the key was correct according to the turn(order of array)
function evaluate() {
  if (userSequence[turn] === gameSequence[turn]) {
    turn++
    if (userSequence.length === gameSequence.length) {
      endLevel()
    }
  }
  else {
    $('#prompt').text('Wrong Input. Press Enter to play again')
    userSequence = []
    gameSequence = []
    turn = 0
    counter = 0
    level = 4
    levelCount = 1
    gameReady = true
    randomColors()
  }
}

//Upon completion, resets to original conditions but adds a level
function endLevel() {
  if (JSON.stringify(userSequence) === JSON.stringify(gameSequence)) {
    console.log('You Win')
    userSequence = []
    gameSequence = []
    counter = 0
    turn = 0
    gameReady = true
    level ++
    levelCount ++
    randomColors()
    $('#prompt').text('Level Complete! Press Enter to move on')
  }
}

//lights up colors blocks according to random collor array
function startGame() {
    $('#prompt').text('')
    $('#level').text(`Level : ${levelCount}`)
    var thisSquare = gameSequence[counter]
    console.log(gameSequence[counter])
    setTimeout(function(){
      $(thisSquare).css('opacity', '1')}, 200)
    setTimeout(function(){
      $(thisSquare).css('opacity', '.5')}, 1000)
    counter++
    if (counter < gameSequence.length) {
      setTimeout(startGame, 1000)
    }

}


randomColors()



$('html').keydown(function(e) {
  if(e.which === 38) {
    userSequence.push('#red')
    red.css('opacity', '1')
    setTimeout(function() {
      red.css('opacity', '.5')}, 200)
      evaluate()
  }
})

// ARROW BUTTON ACTIONS
$('html').keydown(function(e) {
  if(e.which === 37) {
    userSequence.push('#blue')
    blue.css('opacity', '1')
    setTimeout(function() {
      blue.css('opacity', '.5')}, 200)
      evaluate()
  }
})

$('html').keydown(function(e) {
  if(e.which === 39) {
    userSequence.push('#green')
    green.css('opacity', '1')
    setTimeout(function() {
      green.css('opacity', '.5')}, 200)
      evaluate()
  }
})

$('html').keydown(function(e) {
  if(e.which === 40) {
    userSequence.push('#yellow')
    yellow.css('opacity', '1')
    setTimeout(function() {
      yellow.css('opacity', '.5')}, 200)
      evaluate()

  }
})

$('html').keydown(function(e) {
  if (e.which === 13) {
    gameReady = false
    startGame()
  }
})
