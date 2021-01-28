# Classic Arcade Game Clone Project

##Table of Contents

- [Instructions](#instructions)
- [System Requirements](#system requirements)
- [References](#references)
- [Contributing](#Contributing)

##Instructions
### 1. Project Description
Make sure the functions you write are **object-oriented** - either class functions (like `Player` and `Enemy`) or class 
prototype functions such as `Enemy.prototype.checkCollisions`. Also make sure that the keyword `this` is used appropriately 
within your class and class prototype functions to refer to the object the function is called upon.

#### a. Project Instructions  
  * Player can not move off screen
  * Vehicles cross the screen
  * Vehicle-player collisions happen logically (not too early or too late)
  * Vehicle-player collision resets the game
  * Something happens when player wins
  
### 2. How To Run The Game
1. To start the game, simply open file, and run **index.html** in your favorite browser (see system requirements).

### 3. How To Play The Game
1. This arcade game is modeled after the game Frogger. The player will be represented by a little man. Enemies will be 
represented by bugs. The bugs move at random rates across the middle four lanes.  There will be six total lanes in the game. 
The bottom-most lane is a grass lane where the player starts, and the goal is to cross the middle four bug infested lanes 
and reach the upper-most water lane. When the player reaches the water lane, the player wins the game.

##System Requirements
This code relies heavily on ES6 syntax, and therefore the user must meet the following system requirements to run the 
program properly.
  * Chrome 58
  * Edge 14
  * Firefox 54
  * Safari 10
  * Opera 55


##References
  * [project grading rubric](https://review.udacity.com/#!/rubrics/15/view) 
  * [project guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true)
  * [a README style guide](https://guides.github.com/features/mastering-markdown/)
  * [on the canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage) 
  * [on the canvas - grid](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)
  * [on handling keyboard inputs](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
  * [on browser keycodes](http://www.javascripter.net/faq/keycodes.htm)
  * [on switch/case statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
  * [on ES6 system requirements](https://www.w3schools.com/js/js_es6.asp)
  * **See noobGuide.md** to read my stream of consciousness guide I wrote while completing this project.

##Contributing
This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.
# frogger
