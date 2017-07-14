var red = $('#red')
var blue = $('#blue')
var green = $('#green')
var yellow = $('#yellow')
var timer = $('#timer')

var gameSequence = []
var colorSequence = ['#green', '#blue', '#red', '#yellow' ]
var userSequence = []
var level = 2
var turn = 0
var counter = 0
var gameReady = true
var levelCount = 1
var userReady = true
var turnReady = false
var timeX = 0
var scoreCount = 0
var newGame = false
var gameStart = true
// var effect = $('#effect')


$('html').on('keydown', function(gameKey) {
  if (gameKey.which === 13) {
    if (gameStart) {
    gameStart = false
    $('#titlePage').css('display', 'none')
    $('.game').removeClass ('game')
  }
    else  {
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

  // $('html').on('keydown', function(key) {
  //   if (key.which === 13) {
  //     $('#instructions').css('display', 'none')
  //     $('.game').removeClass('game')
  //   }
  // })

}
}
})


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
    userSequence = []
    gameSequence = []
    turn = 0
    counter = 0
    level = 2
    levelCount = 1
    gameReady = true
    randomColors()
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
    userSequence = []
    gameSequence = []
    counter = 0
    turn = 0
    gameReady = true
    level++
    levelCount++
    randomColors()
    var scoreCount = Math.floor((level * 100) + ((timeX * 100) / 5))
    $('#score').text('Your Score: ' + scoreCount)
    $('#prompt').text('Level Complete! Press Enter to move on')
  }
}

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
    } else { setTimeout(function(){turnReady = true}, 1000) }
  }
}

randomColors()

// ARROW BUTTON ACTIONS
$('html').keydown(function (e) {
  if (e.which === 38) {
    e.preventDefault()
    if (turnReady) {
      effect.play()
      setTimeout(function() {
        effect.pause()
        effect.load()
      }, 150)
      userSequence.push('#red')
      red.css('opacity', '1')
      setTimeout(function () {
        red.css('opacity', '.5')
      }, 200)
      evaluate()
    }
  }
})

$('html').keydown(function (e) {
  if (e.which === 37) {
    e.preventDefault()
    if (turnReady) {
      effect.play()
      setTimeout(function() {
        effect.pause()
        effect.load()
      }, 150)
      userSequence.push('#blue')
      blue.css('opacity', '1')
      setTimeout(function () {
        blue.css('opacity', '.5')
      }, 200)
      evaluate()
    }
  }
})

$('html').keydown(function (e) {
  if (e.which === 39) {
    e.preventDefault()
    if (turnReady) {
      effect.play()
      setTimeout(function() {
        effect.pause()
        effect.load()
      }, 150)
      userSequence.push('#green')
      green.css('opacity', '1')
      setTimeout(function () {
        green.css('opacity', '.5')
      }, 200)
      evaluate()
    }
  }
})

$('html').keydown(function (e) {
  if (e.which === 40) {
    e.preventDefault()
    if (turnReady) {
      effect.play()
      setTimeout(function() {
        effect.pause()
        effect.load()
      }, 150)
      userSequence.push('#yellow')
      yellow.css('opacity', '1')
      setTimeout(function () {
        yellow.css('opacity', '.5')
      }, 200)
      evaluate()
    }
  }
})

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
