window.onload = function () {
    let countInterval = null; // Timer reference
    let timeLeft = 60;
    let gameOver = false;
    window.player1 = null;
    window.player2 = null;
  
    // Get the start button and screen
    const startScreen = document.getElementById("start-screen");
    const startButton = document.getElementById("start-button");
    const counterContainer = document.getElementById("counter-container");
  
    function startTimer() {
      const counterElement = document.getElementById("counter");
      if (!counterElement) return;
  
      // Clear any existing interval
      if (countInterval) clearInterval(countInterval);
  
      timeLeft = 60;
      counterElement.textContent = timeLeft;
      gameOver = false;
  
      countInterval = setInterval(() => {
        if (timeLeft <= 0) {
          clearInterval(countInterval);
          declareWinner();
          return;
        }
        timeLeft--;
        counterElement.textContent = timeLeft;
  
        if (timeLeft <= 10) {
          counterElement.classList.add("danger");
        } else {
          counterElement.classList.remove("danger");
        }
      }, 1000);
    }
  
    if (counterContainer) {
      counterContainer.style.display = "none";
    }
  
    if (!startScreen || !startButton) {
      console.error("Start screen or button not found");
      return;
    }
  
    console.log("Start button found!");
  
    // Initialize Kaboom BEFORE calling `loadSprite()`
    kaboom({
      width: 1280,
      height: 720,
      scale: 0.7,
      debug: true,
    });
  
    function initGame() {
      console.log("Game initialized!");
      startScreen.style.display = "none";
      go("valentine-start");
    }
  
    function loadGameAssets() {
      // Load your assets
      loadSprite("pixel-heart", "img/1.png");
      loadSprite("yes-button", "assets/sign.png");
      loadSprite("no-button", "assets/sign.png");
      loadSprite("floating-heart", "img/1.png");
      loadSprite("snowflake", "img/snowflake.png");
  
      loadSprite("idle-player1", "img/druid/Idle-1.png", {
        sliceX: 8,
        sliceY: 1,
        anims: { idle: { from: 0, to: 7, speed: 5, loop: true } },
      });
      loadSprite("jump-player1", "img/druid/Jump-1.png.png", {
        sliceX: 8,
        sliceY: 1,
        anims: { jump: { from: 0, to: 5, speed: 11, loop: false } },
      });
      loadSprite("attack-player1", "img/druid/Attack_1-1.png.png", {
        sliceX: 7,
        sliceY: 1,
        anims: { attack: { from: 1, to: 5, speed: 10 } },
      });
      loadSprite("run-player1", "img/druid/Run-1.png.png", {
        sliceX: 8,
        sliceY: 1,
        anims: { run: { from: 0, to: 1, speed: 8 } },
      });
      loadSprite("death-player1", "assets/death-player1.png", {
        sliceX: 8,
        sliceY: 1,
        anims: { death: { from: 0, to: 5, speed: 10 } },
      });
      loadSprite("shoot-player1", "img/druid/Charge_2-1.png.png", {
        sliceX: 6,
        sliceY: 1,
        anims: { shoot: { from: 0, to: 4, speed: 4 } },
      });
  
      loadSprite("idle-player2", "assets/idle-player2.png", {
        sliceX: 8,
        sliceY: 1,
        anims: { idle: { from: 0, to: 7, speed: 7, loop: true } },
      });
      loadSprite("jump-player2", "assets/jump-player2.png", {
        sliceX: 2,
        sliceY: 1,
        anims: { jump: { from: 0, to: 1, speed: 2, loop: true } },
      });
      loadSprite("attack-player2", "assets/attack-player2.png", {
        sliceX: 4,
        sliceY: 1,
        anims: { attack: { from: 0, to: 3, speed: 18 } },
      });
      loadSprite("run-player2", "assets/run-player2.png", {
        sliceX: 8,
        sliceY: 1,
        anims: { run: { from: 0, to: 7, speed: 18 } },
      });
      loadSprite("death-player2", "assets/death-player2.png", {
        sliceX: 7,
        sliceY: 1,
        anims: { death: { from: 0, to: 6, speed: 10 } },
      });
  
      loadSprite("background", "img/5.png");
      loadSprite("mountain", "img/4.png");
      loadSprite("trees", "img/3.png");
      loadSprite("fullt", "img/2.png");
      loadSprite("snow", "img/1.png");
  
      loadSpriteAtlas("assets/oak_woods_tileset.png", {
        "ground-golden": { x: 16, y: 0, width: 16, height: 16 },
        "deep-ground": { x: 16, y: 32, width: 16, height: 30 },
        "ground-silver": { x: 150, y: 0, width: 16, height: 16 },
      });
    }
  
    loadGameAssets();
    console.log("Kaboom initialized!");
  
    startButton.addEventListener("click", () => {
      console.log("Start button clicked!");
      initGame();
    });


    scene("valentine-start", () => {
        console.log("valentine scene started");
        const messages = [
          "Hey there...",
          "I made something special for you",
          "Will you be my player 2?",
        ];
        let currentMessage = 0;
        let currentChar = 0;
        let textObj = null;
        let isTyping = true;
      
        function typeText() {
          if (!textObj) {
            textObj = add([
              text("", { size: 40, font: "sink" }),
              pos(center()),
              anchor("center"),
              color(255, 192, 203),
            ]);
          }
          if (currentChar < messages[currentMessage].length) {
            textObj.text = messages[currentMessage].slice(0, currentChar + 1);
            currentChar++;
            wait(0.05, typeText);
          } else {
            isTyping = false;
            if (currentMessage === messages.length - 1) {
              showChoiceButtons();
            }
          }
        }

    // Add floating hearts
    for (let i = 0; i < 20; i++) {
        add([
            sprite("floating-heart"),
            pos(rand(0, width()), rand(0, height())),
            scale(2),
            "floating-heart",
            {
                speed: rand(50, 150),
                amplitude: rand(50, 150),
                offset: rand(0, Math.PI * 2)
            }
        ])
    }

    onUpdate("floating-heart", (heart) => {
        heart.pos.y += Math.sin(time() + heart.offset) * 0.5
        heart.pos.x += Math.sin(time() + heart.offset) * 0.3
        
        if (heart.pos.y > height()) heart.pos.y = 0
        if (heart.pos.x > width()) heart.pos.x = 0
    })

    const showChoiceButtons = () => {
        add([
            sprite("yes-button"),
            pos(width() / 2 - 100, height() / 2 + 100),
            area(),
            scale(2),
            "yes-btn"
        ]).onClick(() => {
            go("accept-scene")
        })

        add([
            sprite("no-button"),
            pos(width() / 2 + 100, height() / 2 + 100),
            area(),
            scale(2),
            "no-btn"
        ]).onClick(() => {
            go("reject-scene")
        })
    }

    typeText()

    onClick(() => {
        if (!isTyping && currentMessage < messages.length - 1) {
            currentMessage++
            currentChar = 0
            isTyping = true
            textObj.destroy()
            textObj = null
            typeText()
        }
    })
})

// Accept Scene
scene("accept-scene", () => {
    const message = "You've made me the happiest developer alive! ❤️"
    
    add([
        text(message, { size: 32, font: "sink" }),
        pos(center()),
        anchor("center"),
        color(255, 192, 203)
    ])

    wait(3, () => {
        const transition = add([
            rect(width(), height()),
            color(0, 0, 0),
            opacity(0),
            fixed()
        ])

        tween(
            transition.opacity,
            1,
            1,
            (val) => transition.opacity = val,
            easings.easeInOutQuad,
            () => go("fight")
        )
    })
})

scene("fight", () => {
    console.log("⚔️ Fight scene loaded!");

    // Create players for this scene
    window.player1 = makePlayer(100, 200, 16, 123, 3, "player1");
    window.player1.use(sprite(window.player1.sprites.idle));
    window.player1.play("idle");

    window.player2 = makePlayer(1000, 200, 16, 52, 4, "player2");
    window.player2.use(sprite(window.player2.sprites.idle));
    window.player2.play("idle");
    window.player2.flipX = true;

    // Start the timer and show the counter container
    startTimer();
    if (counterContainer) counterContainer.style.display = "block";

    // Create background layers, ground, and invisible walls
    const background = add([sprite("background"), scale(4), pos(0, -220)]);
    add([sprite("mountain"), scale(4), pos(0, -210)]);
    add([sprite("trees"), fixed(), scale(4), pos(0, -230)]);
    add([sprite("snow"), fixed(), scale(8), pos(0, -1010), z(1)]);
    add([sprite("fullt"), fixed(), scale(4), pos(0, -240)]);
    add([sprite("f"), fixed(), scale(4), pos(0, -240)]);

    const groundTiles = addLevel(
      [
        "", "", "", "", "", "", "", "", "",
        "------#######-----------",
        "dddddddddddddddddddddddd",
        "dddddddddddddddddddddddd",
      ],
      {
        tileWidth: 16,
        tileHeight: 18,
        tiles: {
          "#": () => [sprite("snow"), area(), body({ isStatic: true })],
          "-": () => [sprite("snow"), area(), body({ isStatic: true })],
          d: () => [sprite("deep-ground"), area(), body({ isStatic: true })],
        },
      }
    );
    groundTiles.use(scale(4));

    add([rect(16, 720), area(), body({ isStatic: true }), pos(-20, 0)]);
    add([rect(16, 720), area(), body({ isStatic: true }), pos(1280, 0)]);

    // ----------------- Player Input Handlers -----------------
    // Handlers are added here in the fight scene so they control the active players

    // Player 1 Movement
    onKeyDown("d", () => {
      run(window.player1, 500, false);
    });
    onKeyRelease("d", () => {
      if (window.player1.health !== 0) {
        resetPlayerToIdle(window.player1);
        window.player1.flipX = false;
      }
    });
    onKeyDown("a", () => {
      run(window.player1, -500, true);
    });
    onKeyRelease("a", () => {
      if (window.player1.health !== 0) {
        resetPlayerToIdle(window.player1);
        window.player1.flipX = true;
      }
    });
    onKeyDown("w", () => {
      makeJump(window.player1);
    });
    window.player1.onUpdate(() => resetAfterJump(window.player1));

    // Player 2 Movement
    onKeyDown("right", () => {
      run(window.player2, 500, false);
    });
    onKeyRelease("right", () => {
      if (window.player2.health !== 0) {
        resetPlayerToIdle(window.player2);
        window.player2.flipX = false;
      }
    });
    onKeyDown("left", () => {
      run(window.player2, -500, true);
    });
    onKeyRelease("left", () => {
      if (window.player2.health !== 0) {
        resetPlayerToIdle(window.player2);
        window.player2.flipX = true;
      }
    });
    onKeyDown("up", () => {
      makeJump(window.player2);
    });
    window.player2.onUpdate(() => resetAfterJump(window.player2));

    // Player 1 Attack
    onKeyPress("space", () => {
      attack(window.player1);
      if (window.player1.health === 0) return;
      const currentFlip = window.player1.flipX;
      window.player1.use(sprite(window.player1.sprites.attack));
      window.player1.flipX = currentFlip;
      window.player1.play("attack", {
        onEnd: () => {
          resetPlayerToIdle(window.player1);
          window.player1.flipX = currentFlip;
          // Shoot projectile after attack animation
          shootProjectile(window.player1, 600, 50, window.player2);
        },
      });
    });
    onKeyRelease("space", () => {
      destroyAll(window.player1.id + "attackHitbox");
    });

    // Player 2 Attack
    onKeyPress("down", () => {
      attack(window.player2);
    });
    onKeyRelease("down", () => {
      destroyAll(window.player2.id + "attackHitbox");
    });

    // ----------------- Health Bars and Collisions -----------------
    const player1HealthContainer = add([
      rect(500, 70),
      area(),
      outline(5),
      pos(90, 20),
      color(200, 0, 0),
    ]);
    const player1HealthBar = player1HealthContainer.add([
      rect(498, 65),
      color(0, 180, 0),
      pos(498, 70 - 2.5),
      rotate(180),
    ]);

    const player2HealthContainer = add([
      rect(500, 70),
      area(),
      outline(5),
      pos(690, 20),
      color(200, 0, 0),
    ]);
    const player2HealthBar = player2HealthContainer.add([
      rect(498, 65),
      color(0, 180, 0),
      pos(2.5, 2.5),
    ]);

    // Store health bars in the player objects
    window.player1.healthBar = player1HealthBar;
    window.player2.healthBar = player2HealthBar;

    // Collision handlers for attacks
    window.player1.onCollide(window.player2.id + "attackHitbox", () => {
      if (gameOver) return;
      if (window.player1.health !== 0) {
        window.player1.health -= 50;
        tween(
          player1HealthBar.width,
          window.player1.health,
          1,
          (val) => {
            player1HealthBar.width = val;
          },
          easings.easeOutSine
        );
      }
      if (window.player1.health === 0) {
        clearInterval(countInterval);
        declareWinner();
        gameOver = true;
      }
    });

    window.player2.onCollide(window.player1.id + "attackHitbox", () => {
      if (gameOver) return;
      if (window.player2.health !== 0) {
        window.player2.health -= 50;
        tween(
          player2HealthBar.width,
          window.player2.health,
          1,
          (val) => {
            player2HealthBar.width = val;
          },
          easings.easeOutSine
        );
      }
      if (window.player2.health === 0) {
        clearInterval(countInterval);
        declareWinner();
        gameOver = true;
      }
    });

    // Transition overlay to fade in the fight scene
    const transition = add([
      rect(width(), height()),
      color(0, 0, 0),
      opacity(1),
      fixed(),
      z(100),
    ]);
    tween(
      transition.opacity,
      0,
      1.5,
      (val) => {
        transition.opacity = val;
        if (val === 0) destroy(transition);
      },
      easings.easeInOutQuad
    );
  });

  scene("reject-scene", () => {
    console.log("reject scene loaded");
    if (counterContainer) counterContainer.style.display = "none";
    const messages = [
      "Oh... you think you have a choice?",
      "That's cute...",
      "Let's settle this the old fashioned way...",
      "Beat me in combat or become my valentine!",
    ];
    let currentMessage = 0;
    let currentChar = 0;
    let textObj = null;
    let isTyping = true;

    function typeText() {
      if (!textObj) {
        textObj = add([
          text("", { size: 40, font: "sink" }),
          pos(center()),
          anchor("center"),
          color(255, 0, 0),
        ]);
      }
      if (currentChar < messages[currentMessage].length) {
        textObj.text = messages[currentMessage].slice(0, currentChar + 1);
        currentChar++;
        wait(0.05, typeText);
      } else {
        isTyping = false;
        if (currentMessage === messages.length - 1) {
          wait(2, () => go("fight"));
        }
      }
    }
    typeText();
    onClick(() => {
      if (!isTyping && currentMessage < messages.length - 1) {
        currentMessage++;
        currentChar = 0;
        isTyping = true;
        textObj.destroy();
        textObj = null;
        typeText();
      }
    });
  });

  // ----------------------- Helper Functions -----------------------

  function declareWinner() {
    if (gameOver) return;
    gameOver = true;
  
    let result;
    if (window.player1.health > 0 && window.player2.health > 0) {
      result = "⏳ Time's up! It's a Tie!";
    } else if (window.player1.health > 0) {
      result = "🎉 Player 1 Wins!";
    } else {
      result = "🔥 Player 2 Wins!";
    }
  
    // Create a kaboom text object to show the winner message
    const winnerTextObj = add([
      text(result, { size: 48, font: "sink" }),
      pos(center()),
      anchor("center"),
      z(100),
      color(255, 255, 255),
    ]);
  
    if (countInterval) clearInterval(countInterval);
    if (counterContainer) counterContainer.style.display = "none";
  
    // After 3 seconds, remove the winner message and restart the fight scene
    // Bind a key press to restart manually
    onKeyPress("enter", () => {
        // Clear these objects before restarting, if needed
        destroy(winnerTextObj);
        destroy(restartPrompt);
        go("fight");
      });
    }

  function makePlayer(posX, posY, width, height, scaleFactor, id) {
    console.log(`Creating player ${id} at (${posX}, ${posY})`);
    return add([
      pos(posX, posY),
      z(3),
      scale(scaleFactor),
      area({ shape: new Rect(vec2(0), width, height) }),
      anchor("center"),
      body({ stickToPlatform: true }),
      {
        isCurrentlyJumping: false,
        health: 500,
        sprites: {
          run: "run-" + id,
          idle: "idle-" + id,
          jump: "jump-" + id,
          attack: "attack-" + id,
          death: "death-" + id,
        },
      },
    ]);
  }

  setGravity(1200);

  // Movement and Combat Helper Functions
  function run(player, speed, flipPlayer) {
    if (player.health === 0) return;
    if (player.curAnim() !== "run" && !player.isCurrentlyJumping) {
      player.use(sprite(player.sprites.run));
      player.play("run");
    }
    player.move(speed, 0);
    player.flipX = flipPlayer;
  }

  function resetPlayerToIdle(player) {
    player.use(sprite(player.sprites.idle));
    player.play("idle");
  }

  function makeJump(player) {
    if (player.health === 0) return;
    if (player.isGrounded()) {
      const currentFlip = player.flipX;
      player.jump();
      player.use(sprite(player.sprites.jump));
      player.flipX = currentFlip;
      player.play("jump");
      player.isCurrentlyJumping = true;
    }
  }

  function resetAfterJump(player) {
    if (player.isGrounded() && player.isCurrentlyJumping) {
      player.isCurrentlyJumping = false;
      if (player.curAnim() !== "idle") resetPlayerToIdle(player);
    }
  }

  function shootProjectile(player, speed, damage, enemy) {
    const dir = player.flipX ? -1 : 1;
    const projectile = add([
      sprite("shoot-player1"),
      pos(player.pos.x + dir * 50, player.pos.y - 20),
      scale(2),
      area(),
      move(vec2(dir, 0), speed),
      "projectile",
    ]);

    projectile.onCollide(enemy.id, () => {
      if (enemy.health > 0) {
        enemy.health -= damage;
        tween(
          enemy.healthBar.width,
          enemy.health,
          1,
          (val) => {
            enemy.healthBar.width = val;
          },
          easings.easeOutSine
        );
      }
      if (enemy.health <= 0) {
        clearInterval(countInterval);
        declareWinner();
        gameOver = true;
      }
      destroy(projectile);
    });

    wait(3, () => {
      destroy(projectile);
    });
  }

  function attack(player) {
    if (player.health === 0) return;
    const currentFlip = player.flipX;
    if (player.curAnim() !== "attack") {
      player.use(sprite(player.sprites.attack));
      player.flipX = currentFlip;
      const slashX = player.pos.x + 30;
      const slashXFlipped = player.pos.x - 350;
      const slashY = player.pos.y - 200;
      add([
        rect(300, 300),
        area(),
        pos(currentFlip ? slashXFlipped : slashX, slashY),
        opacity(0),
        player.id + "attackHitbox",
      ]);
      player.play("attack", {
        onEnd: () => {
          resetPlayerToIdle(player);
          player.flipX = currentFlip;
        },
      });
    }
  }
};