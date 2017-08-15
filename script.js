// Repeating strings in multiple places can introduce the opportunity for errors
// Here I've set the string id selectors to their own variables.
var redSelector = '#red'
var blueSelector = '#blue'
var greenSelector = '#green'
var yellowSelector = '#yellow'
// Here I've replaced the string id selectors with the newly defined variables.
var red = $(redSelector)
var blue = $(blueSelector)
var green = $(greenSelector)
var yellow = $(yellowSelector)
var timer = $('#timer')

var gameSequence = []
// Here I've replaced the string id selectors with the newly defined variables.
var colorSequence = [ greenSelector, blueSelector, redSelector, yellowSelector ]
var userSequence = []
var level = 2
var turn = 0
var counter = 0
var gameReady = true
var levelCount = 1
// variable never used
// var userReady = true
var turnReady = false
var timeX = 0
// variable never used
// var scoreCount = 0
var newGame = false
var gameStart = true


$('html').on('keydown', function(gameKey) {
  if (gameKey.which === 13) {
    if (gameStart) {
      gameStart = false
      $('#titlePage').css('display', 'none')
      $('.game').removeClass ('game')
    } else {
      if (gameKey.which === 13) {
        if (level === 2 || newGame) {
          time = setInterval(function () { timeFormula() }, 1000)
        }
        if (gameReady) {
          $('#score').text('')
          gameReady = false
          startGame()
        }
      }
  // Commented out code should be left out of master unless there are details
  // added describing why it should remain.

  // $('html').on('keydown', function(key) {
  //   if (key.which === 13) {
  //     $('#instructions').css('display', 'none')
  //     $('.game').removeClass('game')
  //   }
  // })
    }
  }
})

// Reset game data
function resetGame () {
  userSequence = []
  gameSequence = []
  randomColors()
  turn = 0
  counter = 0
  gameReady = true
}

// Randomizes game sequence, the length of which is determined by level
function randomColors () {
  for (i = 0; i < level; i++) {
    var number = Math.floor(Math.random() * 4)
    gameSequence.push(colorSequence[number])
  }
}
// Timer

function timeFormula () {
  var seconds = timeX % 60
  if (seconds < 10) {
    var seconds = '0' + seconds
  } else { seconds = seconds }
  var minutes = parseInt(timeX / 60)
  if (minutes < 10) {
    var minutes = '0' + minutes
  } else { minutes = minutes }
  timer.text('TIMER:' + minutes + ':' + seconds)
  timeX++
}

// Upon each keypress, evaluates if the key was correct according to the turn(order of array)
function evaluate () {
  if (userSequence[turn] === gameSequence[turn]) {
    turn++
    if (userSequence.length === gameSequence.length) {
      endLevel()
    }
  } else {
    $('#prompt').text('Wrong Input. Press Enter to play again')
    var scoreCount = Math.floor((level * 100) + ((timeX * 100) / 5))
    $('#score').text('Your Score: ' + scoreCount)
    level = 2
    levelCount = 1
    // DRYing code be moving common code into a function
    resetGame()
    clearInterval(time)
    timeX = 0
    timer.text('TIMER:00:00')
    var newGame = true
  }
}

// Upon completion, resets to original conditions but adds a level
function endLevel () {
  if (JSON.stringify(userSequence) === JSON.stringify(gameSequence)) {
    console.log('You Win')
    level++
    levelCount++
    // DRYing code be moving common code into a function
    resetGame()
    var scoreCount = Math.floor((level * 100) + ((timeX * 100) / 5))
    $('#score').text('Your Score: ' + scoreCount)
    $('#prompt').text('Level Complete! Press Enter to move on')
  }
}


// There are some similarities between your startGame() function and the new
// pressArrow() function. Can you see how parts of these functions can be
// abstracted out to DRY up the code?

// lights up colors blocks according to random color array
function startGame () {
  if (!gameReady) {
    turnReady = false
    $('#prompt').text('')
    $('#level').text(`Level : ${levelCount}`)
    var thisSquare = gameSequence[counter]
    console.log(gameSequence[counter])

    effect.play()
    setTimeout(function() {
      effect.pause()
      effect.load()
    }, 500)
  //   effect.load()

    setTimeout(function () {
      $(thisSquare).css('opacity', '1')
    }, 200)

    setTimeout(function () {
      $(thisSquare).css('opacity', '.5')
    }, 1000)

    counter++
    if (counter < gameSequence.length) {
      setTimeout(startGame, 1000)
    } else {
      setTimeout(function () {
        turnReady = true
      }, 1000)
    }
  }
}

randomColors()

// ARROW BUTTON ACTIONS

function pressArrow(e, selector) {
  $color = $(selector)
  e.preventDefault()
  if (turnReady) {
    effect.play()
    setTimeout(function() {
      effect.pause()
      effect.load()
    }, 150)
    userSequence.push(selector)
    $color.css('opacity', '1')
    setTimeout(function () {
      $color.css('opacity', '.5')
    }, 200)
    evaluate()
  }
}

// Combined all arrow key listeners into one if else block
$('html').keydown(function (e) {
  if (e.which === 38) {
    // Up Arrow
    pressArrow(e, redSelector)
  } else if (e.which === 37) {
    // Left Arrow
    pressArrow(e, blueSelector)
  } else if (e.which === 39) {
    // Right Arrow
    pressArrow(e, greenSelector)
  } else if (e.which === 40) {
    // Down Arrow
    pressArrow(e, yellowSelector)
  }
})

// Commented out code should be left out of master unless there are details
// added describing why it should remain.

// $('html').keydown(function (e) {
// if (gameStart === false) {
//   if (e.which === 13) {
//     if (level === 2 || newGame) {
//       time = setInterval(function () { timeFormula() }, 1000)
//     }
//     if (gameReady) {
//       $('#score').text('')
//       gameReady = false
//       startGame()
//     }
//   }
// }
// })
