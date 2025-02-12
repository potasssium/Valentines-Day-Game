kaboom({
  width: 1280,
  height: 720,
  scale: 0.7,
  debug: true
})

let countInterval = null; // Timer reference
let timeLeft = 60;
let gameOver = false;
window.player1 = null;
window.player2 = null;


function declareWinner() {
    if (gameOver) return 
    gameOver = true 

    const winnerTextElement = document.getElementById("winner-text");
    if (!winnerTextElement) return;

    let result;
    if (window.player1.health > 0 && window.player2.health > 0) {
        result = "Time's up! It's a Tie!";
    } else if (window.player1.health > 0) {
        result = "Player 1 Wins!";
    } else {
        result = "Player 2 Wins!";
    }



    winnerTextElement.textContent = result;
    winnerTextElement.style.display = "block";

 
    clearInterval(countInterval);

  
    setTimeout(() => {
        winnerTextElement.style.display = "none";
        go("fight"); // Restart the game
    }, 3000);
}


function startTimer() {
    const counterElement = document.getElementById("counter");
    if (!counterElement) return;

    timeLeft = 60; // Reset Timer
    counterElement.textContent = timeLeft;
    gameOver = false; 

    if (countInterval) {
        clearInterval(countInterval); // Stop Previous Timer
    }

    countInterval = setInterval(() => {
        if (timeLeft === 0) {
            clearInterval(countInterval);
            declareWinner();
            return;
        }

        timeLeft--;
        counterElement.textContent = timeLeft;

        // Timer flashes red when time is low
        if (timeLeft <= 10) {
            counterElement.classList.add("danger");
        } else {
            counterElement.classList.remove("danger");
        }
    }, 1000);
}



loadSprite("background", "img/5.png")
loadSprite("mountain", "img/4.png")
loadSprite("trees", "img/3.png")
loadSprite("fullt", "img/2.png")
loadSprite("snow", "img/1.png")
loadSpriteAtlas("assets/oak_woods_tileset.png", {
  "ground-golden": {
      "x": 16,
      "y": 0,
      "width": 16,
      "height": 16,
  },
  "deep-ground": {
      "x": 16,
      "y": 32,
      "width": 16,
      "height": 30,
  },
  "ground-silver": {
      "x": 150,
      "y": 0,
      "width": 16,
      "height": 16
  }
})


loadSprite("idle-player1", "img/druid/Idle-1.png", {
  sliceX: 8, sliceY: 1, anims: { "idle": {from: 0, to: 7, speed: 5, loop: true}}
})
loadSprite("jump-player1", "img/druid/Jump-1.png.png", {
  sliceX: 8, sliceY: 1, anims: { "jump": { from: 0, to: 5, speed: 11, loop: false}}
})
loadSprite("attack-player1", "img/druid/Attack_1-1.png.png", {
  sliceX: 7, sliceY: 1, anims: { "attack": { from: 1, to: 5, speed: 10}}
})
loadSprite("run-player1", "img/druid/Run-1.png.png", {
  sliceX: 8, sliceY: 1, anims: { "run": { from: 0, to: 1, speed: 8}}
})
loadSprite("death-player1", "assets/death-player1.png", {
  sliceX: 8, sliceY: 1, anims: { "death": { from: 0, to: 5, speed: 10}}
})
loadSprite("shoot-player1", "img/druid/Charge_2-1.png.png", {
    sliceX: 6, sliceY: 1, anims: { "shoot": { from: 0, to: 4, speed: 4}}
})


loadSprite("idle-player2", "assets/idle-player2.png", {
  sliceX: 4, sliceY: 1, anims: { "idle": { from: 0, to: 3, speed: 8, loop: true}}
})
loadSprite("jump-player2", "assets/jump-player2.png", {
  sliceX: 2, sliceY: 1, anims: {"jump": { from: 0, to: 1, speed: 2, loop: true}}
})
loadSprite("attack-player2", "assets/attack-player2.png", {
  sliceX: 4, sliceY: 1, anims: { "attack": { from: 0, to: 3, speed: 18}}
})
loadSprite("run-player2", "assets/run-player2.png", {
  sliceX: 8, sliceY: 1, anims: { "run": { from: 0, to: 7, speed: 18}}
})
loadSprite("death-player2", "assets/death-player2.png", {
  sliceX: 7, sliceY: 1, anims: { "death": { from: 0, to: 6, speed: 10}}
})


scene("fight", () => {
  const background = add([
      sprite("background"),
      scale(4),
      pos(0, -220)
  ])

 add([
     sprite("mountain"),
     scale(4),
     pos(0, -210)
  ])

  add([
    sprite("trees"),
    fixed(),
    scale(4),
    pos(0, -230)
  ])
  add([
    sprite("snow"),
    fixed(),
    scale(8),
    pos(0, -1010),
    z(1),
  ])
  add([
    sprite("fullt"),
    fixed(),
    scale(4),
    pos(0, -240),

  ])

  let gameOver = false;
 

  const groundTiles = addLevel([
      "","","","","","","","","",
      "------#######-----------",
      "dddddddddddddddddddddddd",
      "dddddddddddddddddddddddd"
      ], {
      tileWidth: 16,
      tileHeight: 18,
      tiles: {
          "#": () => [
              sprite("snow"),
              area(),
              body({isStatic: true})
          ],
          "-": () => [
              sprite("snow"),
              area(),
              body({isStatic: true}),
          ],
          "d": () => [
              sprite("deep-ground"),
              area(),
              body({isStatic: true})
          ]
      }
  })
  
  groundTiles.use(scale(4))

 // const shop = background.add([
  //    sprite("shop"),
  //    pos(170, 15),
 // ])

 // shop.play("default")

 // left invisible wall
 add([
  rect(16, 720),
  area(),
  body({isStatic: true}),
  pos(-20,0)
 ])

 // right invisible wall
 add([
  rect(16, 720),
  area(),
  body({isStatic: true}),
  pos(1280,0)
 ])



  function makePlayer(posX, posY, width, height, scaleFactor, id) {
      return add([
          pos(posX, posY),
          z(3),
          scale(scaleFactor),
          area({shape: new Rect(vec2(0), width, height)}),
          anchor("center"),
          body({stickToPlatform: true}),
          {
              isCurrentlyJumping: false,
              health: 500,
              sprites: {
                  run: "run-" + id,
                  idle: "idle-" + id,
                  jump: "jump-" + id,
                  attack: "attack-" + id,
                  death: "death-" + id
              }
          }
      ])
  }

  setGravity(1200)

  const player1 = makePlayer(100, 200, 16, 123, 3, "player1")
  player1.use(sprite(player1.sprites.idle))
  player1.play("idle")

  function run(player, speed, flipPlayer) {
      if (player.health === 0) {
          return
      }
  
      if (player.curAnim() !== "run"
          && !player.isCurrentlyJumping) {
          player.use(sprite(player.sprites.run))
          player.play("run")
      }
      player.move(speed,0)
      player.flipX = flipPlayer
  }

  function resetPlayerToIdle(player) {
      player.use(sprite(player.sprites.idle))
      player.play("idle")
  }

  onKeyDown("d", () => {
      run(player1, 500, false)
  })
  onKeyRelease("d", () => {
      if (player1.health !== 0) {
          resetPlayerToIdle(player1)
          player1.flipX = false
      }
  })

  onKeyDown("a", () => {
      run(player1, -500, true)
  })
  onKeyRelease("a", () => {
      if (player1.health !== 0) {
          resetPlayerToIdle(player1)
          player1.flipX = true
      }
  })

  function makeJump(player) {
      if (player.health === 0) {
          return
      }
  
      if (player.isGrounded()) {
          const currentFlip = player.flipX
          player.jump()
          player.use(sprite(player.sprites.jump))
          player.flipX = currentFlip
          player.play("jump")
          player.isCurrentlyJumping = true
      }
  }

  function resetAfterJump(player) {
      if (player.isGrounded() && player.isCurrentlyJumping) {
          player.isCurrentlyJumping = false
          if (player.curAnim() !== "idle") {
              resetPlayerToIdle(player)
          }
      }
  }

  function shootProjectile(player, speed, damage, enemy) {
    const dir = player.flipX ? -1 : 1;
    const projectile = add([
        sprite("shoot-player1"),
        pos(player.pos.x + (dir * 50), player.pos.y -20),
        scale(2),
        area(),
        move(vec2(dir, 0), speed),
        "projectile"
    ])

    projectile.onCollide(enemy.id, () => {
        if (enemy.health > 0) {
            enemy.health -= damage
            tween(enemy.healthBar.width, enemy.health, 1, (val) => {
                enemy.healthBar.width = val;
            }, easings.easeOutSine)
        }

        if (enemy.health <= 0) {
            clearInterval(countInterval)
            declareWinner(winningText, player1, player2)
            gameOver = true
        }

        destroy(projectile)
    })

    wait(3, () => {
        destroy(projectile)
    })
}




  onKeyDown("w", () => {
      makeJump(player1)
  })

  player1.onUpdate(() => resetAfterJump(player1))

  function attack(player) {
      if (player.health === 0) {
          return
      }
    
  
      const currentFlip = player.flipX
      if (player.curAnim() !== "attack") {
          player.use(sprite(player.sprites.attack))
          player.flipX = currentFlip
          const slashX = player.pos.x + 30
          const slashXFlipped = player.pos.x - 350
          const slashY = player.pos.y - 200
          
          add([
              rect(300,300),
              area(),
              pos(currentFlip ? slashXFlipped: slashX, slashY),
              opacity(0),
              player.id + "attackHitbox"
          ])
  
          player.play("attack", {
              onEnd: () => {
                  resetPlayerToIdle(player)
                  player.flipX = currentFlip
              }
          }) 
      }
  }

  onKeyPress("space", () => {
      attack(player1, ["a", "d", "w"])
      if (player1.health === 0) return

    const currentFlip = player1.flipX

    // Play the attack animation first
    player1.use(sprite(player1.sprites.attack))
    player1.flipX = currentFlip
    player1.play("attack", {
        onEnd: () => {
            resetPlayerToIdle(player1)
            player1.flipX = currentFlip

            // Once attack animation ends, shoot the projectile
            shootProjectile(player1, 600, 50, player2)
        }
    })
})
  

  onKeyRelease("space", () => {
      destroyAll(player1.id + "attackHitbox")
  })

  const player2 = makePlayer(1000, 200, 16, 52, 4, "player2")
  player2.use(sprite(player2.sprites.idle))
  player2.play("idle")
  player2.flipX = true

  onKeyDown("right", () => {
      run(player2, 500, false)
  })
  onKeyRelease("right", () => {
      if (player2.health !== 0) {
          resetPlayerToIdle(player2)
          player2.flipX = false
      }
  })

  onKeyDown("left", () => {
      run(player2, -500, true)
  })
  onKeyRelease("left", () => {
      if (player2.health !== 0) {
          resetPlayerToIdle(player2)
          player2.flipX = true
      }
  })

  onKeyDown("up", () => {
      makeJump(player2)
  })

  player2.onUpdate(() => resetAfterJump(player2))

  onKeyPress("down", () => {
      attack(player2, ["left", "right", "up"])
  })

  onKeyRelease("down", () => {
      destroyAll(player2.id + "attackHitbox")
  })
  
  window.onload = () => {
    const counterElement = document.getElementById("counter")

    if (!counterElement) {
        console.error("Counter element not found")
        return
    }
}

startTimer()
  

  const winningText = add([
      text(""),
      area(),
      anchor("center"),
      pos(center())
  ])
  

  onKeyDown("enter", () => gameOver ? go("fight") : null)

  function declareWinner(winningText, player1, player2) {
      if (player1.health > 0 && player2.health > 0
          || player1.health === 0 && player2.health === 0) {
          winningText.text = "There are no draws here, technically, you lost :)"
      } else if (player1.health > 0 && player2.health === 0) {
          winningText.text = "You really thought winning would get you out of being my Valentine? dilusional"
          player2.use(sprite(player2.sprites.death))
          player2.play("death")
      } else {
          winningText.text = "You really thought you could beat me, huh? Guess you're my Valentine :)"
          player1.use(sprite(player1.sprites.death))
          player1.play("death")
      }
  }

  const player1HealthContainer = add([
      rect(500, 70),
      area(),
      outline(5),
      pos(90, 20),
      color(200,0,0)
     ])
     
  const player1HealthBar = player1HealthContainer.add([
      rect(498, 65),
      color(0,180,0),
      pos(498, 70 - 2.5),
      rotate(180)
  ])

  player1.onCollide(player2.id + "attackHitbox", () => {
      if (gameOver) {
          return
      }
      
      if (player1.health !== 0) {
          player1.health -= 50
          tween(player1HealthBar.width, player1.health, 1, (val) => {
              player1HealthBar.width = val
          }, easings.easeOutSine) 
      } 
      
      if (player1.health === 0) {
          clearInterval(countInterval)
          declareWinner(winningText, player1, player2)
          gameOver = true
      }
  })

  const player2HealthContainer = add([
      rect(500, 70),
      area(),
      outline(5),
      pos(690, 20),
      color(200,0,0)
  ])
     
  const player2HealthBar = player2HealthContainer.add([
      rect(498, 65),
      color(0,180,0),
      pos(2.5, 2.5),
  ])
  
  player2.onCollide(player1.id + "attackHitbox", () => {
      if (gameOver) {
          return
      }
      
      if (player2.health !== 0) {
          player2.health -= 50 
          tween(player2HealthBar.width, player2.health, 1, (val) => {
              player2HealthBar.width = val
          }, easings.easeOutSine) 
      } 
      
      if (player2.health === 0) {
          clearInterval(countInterval)
          declareWinner(winningText, player1, player2)
          gameOver = true
      }
    
  
  })
})




go("fight")