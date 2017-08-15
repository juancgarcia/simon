# Project 1 Evaluation

## Deployment:
**3: Excelling**
> Did you successfully deploy your project to github pages? Is the app's functionality the same deployed as it is locally?

## Technical Requirements:
**3: Excelling**
> Did you deliver a project that met all the technical requirements? Given what the class has covered so far, did you build something that was reasonably complex?

## Code Quality:
**2: Performing**
> Did you follow code style guidance and best practices covered in class, such as spacing, modularity, and semantic naming? Did you comment your code?

## Creativity/Interface:
**3: Excelling**
> Is your user interface easy to use and understand? Does it make sense for the problem you're solving? Does your interface demonstrate creative design?


## Notes

Great job with this project! I personally appreciate your keyboard interface for the game. I think it's much faster and more intuitive than dragging and clicking a mouse/trackpad. The interface is simple and clean.

As you mentioned, the code can be DRYed up much more. I would also like to see more comments (particularly for unclear values like the keycode numbers) and less commented-out code, unless there is a good reason given for it to remain. Maybe as example of a function's usage, and not just broken/unused code that should be removed.

# Things you'd like specific feedback on:

`Mostly I'd like to know if there were ways to perform the tasks in a simpler, more streamlined way. I was able to get the functionality how I wanted it, but it seemed clunky and not very DRY`

This all comes down to being able to spot repeating patterns. The fact you recognized your code has DRYness issues is the first step. Next is isolating the common parts and abstracting the unique parts into variables.

For example, in your arrow key listeners, we can see only 4 lines differ. A lot of the functionality is identical.

```js
// Right Arrow
$('html').keydown(function (e) {
  if (e.which === 39) { // different
    e.preventDefault()
    if (turnReady) {
      effect.play()
      setTimeout(function() {
        effect.pause()
        effect.load()
      }, 150)
      userSequence.push('#green') // different
      green.css('opacity', '1') // different
      setTimeout(function () {
        green.css('opacity', '.5') // different
      }, 200)
      evaluate()
    }
  }
})

// Down Arrow
$('html').keydown(function (e) {
  if (e.which === 40) { // different
    e.preventDefault()
    if (turnReady) {
      effect.play()
      setTimeout(function() {
        effect.pause()
        effect.load()
      }, 150)
      userSequence.push('#yellow') // different
      yellow.css('opacity', '1') // different
      setTimeout(function () {
        yellow.css('opacity', '.5') // different
      }, 200)
      evaluate()
    }
  }
})
```

The different parts are the keycode number, selector string (i.e. `'#yellow'`), and jQuery element. What we need to do is find a way to swap out the different parts with variables. Something like this:

```js
// Right Arrow
$('html').keydown(function (e) {
  if (e.which === 39) { // different
    let selector = '#green'
    let $color = green

    // Beginning of common code
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
    // End of common code
  }
})

// Down Arrow
$('html').keydown(function (e) {
  if (e.which === 40) { // different
    let selector = '#yellow'
    let $color = yellow

    // Beginning of common code
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
    // End of common code
  }
})
```

Final step. We pull out that common code into a single function/method which is called by each keydown:

```js

function pressArrow(e, selector, $color){
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

// Up Arrow
$('html').keydown(function (e) {
  if (e.which === 38) {
    pressArrow(e, '#red', red)
  }
})

// Left Arrow
$('html').keydown(function (e) {
  if (e.which === 37) {
    pressArrow(e, '#blue', blue)
  }
})

// Right Arrow
$('html').keydown(function (e) {
  if (e.which === 39) {
    pressArrow(e, '#green', green)
  }
})

// Down Arrow
$('html').keydown(function (e) {
  if (e.which === 40) {
    pressArrow(e, '#yellow', yellow)
  }
})
```

`Also, I felt like I used a lot of global variables. Variables kept getting updated, and then used elsewhere in different functions, so I had to make sure the new values transferred over. Since we're told global variables are bad, how would I get around that?`

Global variables aren't bad per se, but they are to be used sparingly. One way to avoid "globals pollution" is to encapsulate your variables into an object literal.

```js
// example
var simonGame = {
  red: $('#red'),
  blue: $('#blue'),
  green: $('#green'),
  yellow: $('#yellow'),
  timer: $('#timer'),
  gameSequence: [],
  colorSequence: [ '#green', '#blue', '#red', '#yellow' ]
  userSequence: [],
  level: 2,
  turn: 0,
  counter: 0,
  gameReady: true,
  levelCount: 1,
  turnReady: false,
  timeX: 0,
  newGame: false,
  gameStart: true
}
```

In this way there's only one global variable, and all values are contained as properties.

We can continue this encapsulation, by converting our global functions into methods on this object:

```js

var simonGame = {
  red: $('#red'),
  // ... more properties ...
  gameSequence: [],
  colorSequence: [ '#green', '#blue', '#red', '#yellow' ]
  userSequence: [],
  level: 2,
  // ... more properties ...

  // methods
  randomColors: function () {
    // variables changed to reference `this` instead of globals
    for (i = 0; i < this.level; i++) {
      var number = Math.floor(Math.random() * 4)
      this.gameSequence.push(this.colorSequence[number])
    }
  },

  // more methods ...
}
```
