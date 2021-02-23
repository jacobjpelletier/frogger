## Step-wise Guide for Lost Souls
####One noob's stream of consciousness while completing this project that might help other noobs:
#####1.Read about html canvas
  * Because I do not recall hearing of html canvas before just now:
  * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
  * https://www.w3schools.com/graphics/canvas_intro.asp
  
#####2.OK, so one place to start might be just getting the engine to paint on the canvas. 
  * At this stage in the game, I just want something to appear on the screen. If I can get a static background to show then
    I'll get the confidence to work on these bugs and the player.
  * Open starter html code in browser. Nothing happens in browser. Look at console. Yup, holy error messages!
  * Proceed to comment out everything all the JS files flagging errors, as well as any references to players or enemies
    because I am avoiding those tasks right now (see .js comments).
  * Still no canvas, so I added a border in CSS. maybe I'll see it now? **Nope**. I see a border but no canvas.  
  * So now I'm asking myself **why** is this dang canvas still not showing itself? After looking around awhile, you will see 
  that the engine appends the canvas to the document's body, but I can't see anything on browser. I remember from 
  the matching game how I would generally appendChild to IDs or Classes, so I gave that a go.
  I decided to add an element ID named "canvas" to body and appendChild there. **Tricky Engine! This did the trick!** 
    * e.g. `doc.getElementById("canvas").appendChild(canvas)`
  * ***Voila!*** I see tiles and an ugly border! 
  * I am not interested in the border now, so I comment that out.
  * I see you canvas. But why is there two rows of grass? I think the sprites only take up one box, so my player sprite really only needs one 
  safe row of grass, so I'll turn the other row of grass into a row of stone for enemies.
#####3. Time to make some enemies!
  * I'm going to tackle the enemy code now, since some of it is already written and it should be less complex than the 
  player code. i also might need the enemy sprites running before I can figure out what to do with enemy-player collisions?
  *  I see the way the starter code has Enemy object started, but I'm going to try to code prototypical inheritance 
  functionality using "class" constructor rather than a constructor function and then adding methods to the protoype.
     https://classroom.udacity.com/nanodegrees/nd001/parts/5b433748-71ae-488f-8eba-f102160cd17b/modules/5109fc0f-a22d-4b40-9611-3fefb15bca61/lessons/3925704a-be38-4b70-8c8b-a4a812b6a309/concepts/a9105c4c-2ffb-4865-b24e-de09f570eb37
  *  The starter code has included one variable that would apply to each instance of Enemy, code to create the sprite: 
     * e.g. `this.sprite = 'images/enemy-bug.png';`
  * Each instance of Enemy will also need a starting point.
    * oh man what do I do here? The engine that populates the canvas also populates everything else together like a flip-book
    apparently, so I just have to figure out how to coordinate locations of my enemy elements and my now visible canvas background
    * from the mzd guide on canvases, I know that I am dealing with a total [length and a height](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage),
     of a canvas and that within this coordinate space, position is determined by (x,y) coordinates, aka [the grid](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes).
    * I think now would be a good time to determine the total height and width of my canvas.
       * for **total width**, I see that the file size of stone-block.png is 101px, so total width of the canvas is 101*5 
       (for 5 tiles wide) = **505px.**
       * for **total height**, it is a little more complicated. in the browser I only see the tops of the tile so it is not the
       full 171px listed. I don't know anyway else to obtain the height of just the tops so I zoom in and count the pixels 
       like a real noob. I get 84px for height of a tile top. 84*6(for 6 tiles high) = **504px**.
       * I put this in the engine for total height and width of canvas, because I don't want to be dealing with any extra 
       invisible space.
       * unfortunately, when I look at the refreshed browser now, I cut the bottom of the grass because I forgot to account 
       for this in my height calculation. rather than recount tiny squares I just adjusted the height to 600px and it looks fine now.
    * OK. x should be easy right. I will define `this.x = 0` and that should mean the most left hand position of the canvas box.
    * But y? this is a little more tricky. each bug needs to find there way to one of each of the four stone lanes. I think 
    I need to figure them for the middle of the lanes as well. Each of the stone lanes are equal in height (**84px**). 
    [(0,0)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes) is the top left hand corner.
    I am thinking the first bug would start at [0,84], the second at [0,168], the third at [0,254], the fourth at [0,336]. 
    Therefore I am going to try to position each y at lane(1,2,3 or 4) multiplied by 84, and then add 42 (84/2) so that the 
    image is centered on each tile, so actually [0,126], [0,210], [0,296], and [0,378].      
  * Each instance of Enemy will also need a speed at which to travel.
    * I am just going to make the standard speed 100 and multiply the speed of each instance by a random number between 0 and 10.
      * e.g. `(100*(Math.random()*10))`
  * Each function added to the prototype will be instead added as methods from inside the class definition.
    * `update()` is coded as outlined, updating this.x with dt
    * `render()` is used as provided
  * I think that is all they will need? I hope?
  * so I uncommented enemy relevant code from step 2, and went to see what the browser would show. Whiiich was nothing. 
  console stating "Uncaught ReferenceError: allEnemies is not defined", and I now realize I need to initiate Enemy objects
  using the language defined in engine.js.
    * so where the starter code states "// Now instantiate your objects.", I created an array with 4 new Enemies with
    `let allEnemies = [new Enemy(1), new Enemy(2), new Enemy(3), new Enemy(4)];`
  * running this in the browser I see that all the bugs run across the screen ONCE (**uh oh, problem**), and that the 
  bugs are shifted down one lane too far (**uh oh, problem**).
    * to fix the bug location problem, I subtract 84 to each y initiated.
    * I also adjusted the speed because it seems 100 is too slow, and at the same time some bugs went way too fast. I increased 
    the speed to 200 and decreased the Math.random() multiplier to 2.5
    * to fix the problem of the bugs running away from me, I created an if statement that checks this.x, and if the x coordinate 
    is greater than the total width of the canvas, then the bug's x coordinate is updates to 0.
    e.g. `        if (this.x > 504) {
                      this.x = 0;
                  }`
  * OK. Now I have a background AND a bug highway.
  * I think at this point I am going to work on the player sprite, and keep collisions in mind when I do. 
#####4.   
  * The first thing I can do is create the player's sprite, using this.sprite.
  * Next, I will work to just get the sprite to show up on the canvas. I will do what the starter code suggests
  and create an update and render method. I'll start with the render method and initialize the object where
  I initialized the enemies (I didn't forget initialization this time!). I'll then do the update method since
  that method will work with the input method I create. 
    * note: I didn't make player with any parameters, because I can't think of what data the player class might need to 
    construct a new instance of player at this time. e.g. to initiate: `let player = new Player();`
  * OK so I uncommented the player related code in the engine, and nothing shows up. I realize I forgot to add this.x 
  this.y to the constructor, so I made x and y both 250 and hopefully the player sprite will appear in the middle
  of the canvas. Nope. All is quiet on the console front. . . wishing I had some errors. . .hmmmm. . .           
  * I more or less followed the same logic with the player as with the enemy, so I see nothing really that wrong with the player 
  class. I reload the html in a new tab and now I see the boy staring at me, unbothered by the passing bugs. This happens 
  sometimes when I leave the browser running this game too long I guess.
  * I changed this.x to 202 and this.y to 380 to put my little dude safely in the grass.
  * At this point I uncomment out the starter code's event listener found on app.js
  * So the event listener for player movement has this method called handleInput, which I googled and is not a thing so
  this is a method I must define in player to handle the input. I found [this](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) 
  which I will probably use while trying to figure out how to write this method.
  * First I know I'll need a movement speed for the sprite, so ill make that 100 for now. . . .Nah I don't need a speed I just 
  have to update the x and y by a certain amount per key stroke.
  * In the console I see that with my code now, I can redefine player.y and move my sprite around. I also am still having 
  an issue of the top of the rocks being 0,0, while the top of the water is 0, negative number. It's not breaking the code or anything,
  so I'll keep rolling knowing the canvas measurements because I am super far behind in this course. 
  * [From this site](http://www.javascripter.net/faq/keycodes.htm) I see that the reason the eventHandler uses "37", "38",
  "39", and "40", is because these are the keyCode values prescribed by the browsers, and I just need to pass these into 
  the handleInput method. 
  * I see [on the mozilla guide to KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) 
  that there is switch and case keywords that are needed to make their method work. I've got to look that up . . .
  * Ok yeah, so it is pretty [straight forward](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
  * So my the player sprite moves now, but sometimes he moves too far. Im going to try to fix this with some `if`s.
  * I got carried away and ended up coding the handleInput to do all the work and I forgot about update.
  
     
       handleInput(direction) {
          switch(direction) {
              case 'up':
                  if (player.y >= 44){
                      player.y -= tileHeight;
                      break;
                  }
                  else {
                      player.y -= 0
                  }
              case 'down':
                  if (player.y <= 296) {
                      player.y += tileHeight;
                      break;
                  }
                  else {
                      player.y += 0
                  }
              case 'left':
                  if (player.x >= 15) {
                      player.x -= tileWidth;
                      break;
                  }
                  else {
                      player.x -= 0
                  }
              case 'right':
                  if (player.x <= 318) {
                      player.x += tileWidth;
                      break;
                  }
                  else {
                      player.x += 0
                  }
          }
      }
      
  * this is what I did and it was a mistake. Not only does the update method need something to do, but I am thinking I 
  probably shouldnt be accessing and changing this.x or this.y. I think I will have handleInput filter the user inputs 
  which will edit another variable with will proxy for x and y. Also, for some reason when I move left or up at the limits
  the player sprite jumps back, so I'll see what I can do about that.
  
  
      if (player.y === -40) {
      
          gameWon = true;
      }
      
  * I was trying the code above with the handleInput above, and then realized that I should have used this.y 
  rather than player.y for example in the handleInput function. Oops! This is probably why even though player.y === -40, 
  gameWon would remain false.
  * getters and setters would be really ideal but I'm going to keep rolling through because I want to end this course on time
  and that is not a requirement, so I ended up with this:
  
  
      handleInput(direction) {
          switch (direction) {
              case 'left':
                  if (this.x > 0) {
                      this.update(-tileWidth,0);
                      break;
                  }
                  if (this.x === 0) {
                      break;
                  }
              case 'right':
                  if (this.x < 404) {
                      this.update(tileWidth,0);
                      break;
                  }
                  if (this.x === 404) {
                      break;
                  }
              case 'up':
                  if (this.y > 0) {
                      this.update(0, -tileHeight);
                      break;
                  }
              case 'down':
                  if (this.y < 318) {
                      this.update(0,tileHeight);
                      break;
                  }
                  break;
              default:
                  break;
          }
      }
  
      update(xValue,yValue) {
          this.x = this.x+xValue;
          this.y = this.y+yValue;
      }};
  
  * So I have the update and handleInput methods done, and I fixed the annoying bounce back when you hit the sides. Now
  I need to work on collisions :O. I don't think it will be too awful though, I think the update method of player will be
  used to check for collisions, e.g. check new player x and y and compare to x and y of each new enemy instance. I think
  I will need to take into account sizes and shapes of sprites, but ill start off with just a basic concept again.
  * for basic collision code I wrote this:
  
          //collision condition
          for (const enemy of allEnemies){
              if (enemy.x === this.x && enemy.y === this.y) {
                  alert("collision")
              }
          }
   
    * and I added `this.collision = false`; to the player constructor.        
  * that didnt work. so I wrote this to see what is going on:
  
          //collision condition
          for (const enemy of allEnemies){
              const enemyX = Math.round(enemy.x);
              const enemyY = Math.round(enemy.y);
              const playerX = Math.round(player.x);
              const playerY = Math.round(player.y);
              console.log(`eX: ${enemyX}, eY: ${enemyY} ; px: ${playerX}, pY: ${playerY}`)
              }
          }
    * the output is this:
    
    
            eX: 91, eY: 42 ; px: 101, pY: 212
            eX: 405, eY: 126 ; px: 101, pY: 212
            eX: 91, eY: 210 ; px: 101, pY: 212
            eX: 91, eY: 294 ; px: 101, pY: 212
    
  * So i think I need to probably create a range as like a buffer zone around the 
  exact points of each sprite, because even if i TRY to hit a bug I will technically miss
  by the definition of my collision logic.    
  
  
          //collision condition
          for (const enemy of allEnemies){
              const enemyX = Math.round(enemy.x);
              const enemyY = Math.round(enemy.y);
              const playerX = Math.round(player.x);
              const playerY = Math.round(player.y);
              const differenceX = Math.abs(playerX - enemyX);
              const differenceY = Math.abs(playerY - enemyY);
              if (differenceX < 101 && differenceY < 84) {
                  console.log("hit")
              }
          }
          
  * So this kinda works but it doesn't do quite what I want. Also im noticing that collisions only work if the
  player runs into the enemies, but will not register if the player is still and a bug collides with the player. I will see
  if adding collision logic to the enemy class. And then I realized I need to keep update(dt) the way it is for the engine file.
  * Ok so I think it's all done, sorry if you're reading this if there wasn't much narration
  over the collision part but I felt like I had to focus a lot on this code because I just wasn't working for awhile. Ultimately
  I ended up with this:
  
  
      handleInput(direction) {
          switch (direction) {
              case 'left':
                  if (this.x > 0) {
                      this.x -= tileWidth;
                      this.update();
                      break;
                  }
                  if (this.x === 0) {
                      this.update();
                      break;
                  }
              case 'right':
                  if (this.x < 404) {
                      this.x += tileWidth;
                      this.update();
                      break;
                  }
                  if (this.x === 404) {
                      this.update();
                      break;
                  }
              case 'up':
                  if (this.y > 0) {
                      this.y -= tileHeight;
                      this.update();
                      // win condition
                      if (this.y < 0) {
                          alert("Nice Job! Resetting. . .")
                          setTimeout(() => {
                              this.reset();}, 100);
                      }
                      break;
                  }
              case 'down':
                  if (this.y < 318) {
                      this.y += tileHeight;
                      this.update();
                      break;
                  }
                  this.update();
                  break;
              default:
                  break;
          }
      }


      . . .
      
        
      update(dt) {
          for (const enemy of allEnemies){
              const enemyX = Math.round(enemy.x);
              const enemyY = Math.round(enemy.y);
              const playerX = Math.round(player.x);
              const playerY = Math.round(player.y);
              const differenceX = Math.abs(playerX - enemyX);
              const differenceY = Math.abs(playerY - enemyY);
              if (differenceX < 51 && differenceY < 42) {
                  alert("You got hit! Restarting. . .")
                  setTimeout(() => {
                      this.reset();}, 5);
              }
          }
      }
               