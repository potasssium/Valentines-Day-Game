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
          
          // Freeze the timer and change its appearance
          counterElement.textContent = "0"; // Freeze at 0
          counterElement.style.backgroundColor = "black"; // Solid background color
          counterElement.style.color = "white"; // Contrast text color
          // You can add any additional styling here, such as border or font size changes
          
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
      background: [0,0,0]
    });
  
    function initGame() {
      console.log("Game initialized!");
      startScreen.style.display = "none";
      go("valentine-start");
    }
  
    function loadGameAssets() {
      // Load your assets
      loadSprite("pixel-heart", "img/1.png");
      loadSprite("yes-button", "img/yes.png");
      loadSprite("no-button", "img/no.png");
      loadSprite("floating-heart", "img/yespress/heart.png");
      loadSprite("snowflake", "img/snowflake.png");
      loadSprite("new-background", "img/newback.jpg");
      loadSprite("background2", "img/A_black_image.jpg");
      loadSprite("moon", "img/yespress/2.png")
      loadSprite("cloud1", "img/yespress/3.png")
      loadSprite("cloud2", "img/yespress/4.png")

      loadSprite("falling-star", "img/yespress/fallingstar.png", {
        sliceX: 9,
        sliceY: 1,
        anims: { star: { from: 0, to: 8, speed: 5, loop: false } },
      })
  
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
      loadSprite("death-player1", "img/druid/Dead-1.png.png", {
        sliceX: 8,
        sliceY: 1,
        anims: { death: { from: 0, to: 5, speed: 10 } },
      });
      loadSprite("shoot-player1", "img/druid/Charge_2-1.png.png", {
        sliceX: 6,
        sliceY: 1,
        anims: { shoot: { from: 0, to: 4, speed: 4 } },
      });
  
      loadSprite("idle-player2", "img/witch/idle_1.png", {
        sliceX: 8,
        sliceY: 1,
        anims: { idle: { from: 0, to: 7, speed: 4, loop: true } },
      });
      loadSprite("jump-player2", "img/witch/jump_1.png", {
        sliceX: 10,
        sliceY: 1,
        anims: { jump: { from: 0, to: 9, speed: 2, loop: true } },
      });
      loadSprite("attack-player2", "img/witch/attack1.png", {
        sliceX: 10,
        sliceY: 1,
        anims: { attack: { from: 0, to: 9, speed: 9 } },
      });
      loadSprite("run-player2", "img/witch/run.png", {
        sliceX: 8,
        sliceY: 1,
        anims: { run: { from: 0, to: 7, speed: 18 } },
      });
      loadSprite("death-player2", "img/witch/dead.png", {
        sliceX: 7,
        sliceY: 1,
        anims: { death: { from: 0, to: 6, speed: 10 } },
      });
  
      loadSprite("background", "img/5.png");
      loadSprite("mountain", "img/4.png");
      loadSprite("trees", "img/3.png");
      loadSprite("fullt", "img/2.png");
      loadSprite("snow", "img/1.png");
      loadSprite("large-spruce", "img/trees/Triangle Spruce Tree.png", {
        sliceX: 27,
        sliceY: 1,
        anims: { sprucel: { from: 0, to: 26, speed: 6}}
      })
      loadSprite("small-spruce", "img/trees/Tiny Spruce Tree.png", {
        sliceX: 31,
        sliceY: 1,
        anims: { spruces: { from: 0, to: 30, speed: 5}}
      })


  
     
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
          "Hi gorgeous",
          "I made something a little silly",
          "Will you be my Valentine?",
        ];
        

       // const blackCover = add([sprite("background2"), scale(12), pos(0, -220)]);
        //const newBG = add([sprite("background2"), scale(4), pos(0, -210)]);
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
            wait(0.08, typeText);
          } else {
            isTyping = false;
            if (currentMessage === messages.length - 1) {
              showChoiceButtons();
            }
          }
        }

        function typeOutText(obj, message, speed = 0.05, onComplete) {
          let i = 0;
          function typeNextChar() {
            if (i < message.length) {
              obj.text = message.slice(0, i + 1);
              i++;
              wait(speed, typeNextChar);
            } else {
              if (onComplete) onComplete();
            }
          }
          typeNextChar();
        }

    // Add floating hearts
    for (let i = 0; i < 20; i++) {
        add([
            sprite("floating-heart"),
            pos(rand(0, width()), rand(0, height())),
            scale(rand(0.01, 0.03)),
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
      const yesButton = add([
        rect(150, 50, { radius: 10 }),
        pos(width() / 2 - 100, height() / 2 + 100),
        color(255, 255, 255),
        area(),
        anchor("center"),
        color(rgb(148, 148, 148)),
        "yes-btn",
      ]);
      
      // Add text on top of the rectangle:
      const yesText = add([
        text("Yes", { size: 24, font: "sink" }),
        pos(yesButton.pos),       // Position it exactly at the center of the button
        anchor("center"),
      ]);
      
      // Make it interactive:
      yesButton.onClick(() => {
        console.log("Yes button clicked!");
        console.log("Camera moving up...");
        
        const startY = camPos().y;
        const targetY = startY - 900;
        let tweenFinished = false;
      
        // Add the sprite ("moon") at the top with an initial opacity of 0.
        let topSprites = [];
        const moonImage = add([
          sprite("moon"),
          pos(580, 480),
          fixed(),        // Keeps the image in the viewport
          anchor("center"),
          scale(3),
          opacity(0),     // Start fully transparent
          z(2),
        ]);
       
        const cloudImage = add([
          sprite("cloud1"),
          pos(200, 600),  // Adjust x and y as desired
          anchor("center"),
          fixed(),
          scale(4),
          opacity(0),
          z(1)
        ]);

        const animatedSprite = add([
          sprite("falling-star"),
          pos(300, 700),        // Change x, y to place it where you need
          anchor("center"),     // Optionally center its origin
          scale(5),             // Adjust scale as needed
          fixed(),
          z(3),
          opacity(0)              // Remove this if you want it to scroll with the camera
        ]);

        // Scale the star to a desired size (here, we use half the canvas width for example)
       
      
        tween(
          startY,
          targetY,
          4,
          (v) => {
            camPos(camPos().x, v);
            console.log("cameray:", v);
            
            // Compute a linear fraction (0 at startY and 1 at targetY)
            let fraction = (startY - v) / (startY - targetY);
            // Apply a quadratic ease-in to that fraction
            let easedFraction = Math.pow(fraction, 2);
            moonImage.opacity = easedFraction;
            cloudImage.opacity = easedFraction;
            animatedSprite.play("star");

            topSprites.push(animatedSprite);

            
            // When we're close enough to the target, finalize the tween
            if (!tweenFinished && Math.abs(v - targetY) < 1) {
              tweenFinished = true;
              console.log("Tween complete, adding text...");
              const topText = add([
                text("", { size: 40, font: "sink" }),
                pos(100, 430),
                fixed(),
                z(200),
                color(255, 255, 255)
              ]);
            
              // Use the helper to type out the message.
              typeOutText(topText, "I knew you would say yes :)", 0.08, () => {

              const secondText = add([
                text("", { size: 40, font: "sink" }),
                pos(100, 480), // Adjust Y position as needed (e.g., 150 instead of 100)
                fixed(),
                z(200),
                color(255, 255, 255)
              ]);
              typeOutText(secondText, "I hope you enjoyed it a little, I should've totally made it weirder.", 0.08, () => {

                const thirdText = add([
                  text("", { size: 40, font: "sink" }),
                  pos(100, 530), // Adjust Y position as needed (e.g., 150 instead of 100)
                  fixed(),
                  z(200),
                  color(255, 255, 255)
                ]);
                typeOutText(thirdText, "But thank you for putting up with me,", 0.08, () => {
                  const fourthText = add([
                    text("", { size: 40, font: "sink" }),
                    pos(100, 600), // Adjust Y position as needed (e.g., 150 instead of 100)
                    fixed(),
                    z(200),
                    color(255, 255, 255)
                  ]);
                  typeOutText(fourthText, "You deserve the world.", 0.09)
            
                });
              });
            });
          
            }
         
          },
          easings.easeInOutQuad
        )
        });
      
      
      // Optionally, change color on hover:
      yesButton.onHover(() => {
        yesButton.color = rgb(255, 0, 0); // Update the existing color property
      });
      yesButton.onHoverEnd(() => {
        yesButton.color = rgb(148, 148, 148);
      });
    
    const noButton = add([
      rect(150, 50, { radius: 10 }),
      pos(width() / 2 + 100, height() / 2 + 100),
      color(rgb(148, 148, 148)),
      area(),
      anchor("center"),
      "no-btn",
    ]);
    
    const noText = add([
      text("No", { size: 24, font: "sink" }),
      pos(noButton.pos),
      anchor("center"),
    ]);
    
    noButton.onClick(() => {
      console.log("No button clicked!");
      go("reject-scene");
    });
    
    noButton.onHover(() => {
      noButton.color = rgb(255, 0, 0);
    });
    noButton.onHoverEnd(() => {
      noButton.color = rgb(148, 148, 148);
    });
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
    })
// Accept Scene


scene("fight", () => {
    console.log("Fight scene loaded");

    // Create players for this scene
    window.player1 = makePlayer(125, 200, 16, 123, 3, "player1");
    window.player1.use(sprite(window.player1.sprites.idle));
    window.player1.play("idle");

    window.player2 = makePlayer(1100, 200, 16, 123, 2.8, "player2");
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
    add([sprite("snowflake"), fixed(), scale(-10), pos(0, -240)]);

    const animatedBGs = [
      { name: "large-spruce", anim: "sprucel", pos: vec2(960, 150), scale: 6 },
      { name: "small-spruce", anim: "spruces", pos: vec2(210, 340), scale: 4 },
      // You can add as many as you want here...
    ];
    
    animatedBGs.forEach((bg) => {
      const bgSprite = add([
        sprite(bg.name),
        pos(bg.pos),
        scale(bg.scale),
        fixed(), // if you want it to be part of the background
        z(2),    // control layering via z-index
      ]);
      bgSprite.play(bg.anim); // start the animation for the sprite
    });

    for (let i = 0; i < 100; i++) {
      add([
          sprite("snowflake"),
          pos(rand(0, width()), rand(-100, 0)),
          scale(rand(0.01, 0.03)), // very small snowflakes
          "snowflake",
          { fallSpeed: rand(20, 50) } // random fall speed for each snowflake
      ]);
  }
  
  onUpdate("snowflake", (flake) => {
      flake.move(0, flake.fallSpeed); // snowflake falls at its own speed
      if (flake.pos.y > height()) {
          flake.pos.y = rand(-100, -10); // reset to a random position above the screen
          flake.pos.x = rand(0, width());
          flake.fallSpeed = rand(20, 50); // reassign a new random fall speed
      }
  });

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
          d: () => [sprite("snow"), area(), body({ isStatic: true })],
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
          // Launch the projectile: (player, speed, damage, enemy, projectileSprite, maxDistance)
          shootProjectile(window.player1, 600, 50, window.player2, "shoot-player1", 500);
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
    const player1HealthUI = createHealthBarUI( 50, 50, 1000, 500);
    const player2HealthUI = createHealthBarUI(width() - HEALTH_BAR_WIDTH - 50, 50, 500, 500);
    window.player1.healthUI = player1HealthUI;
    window.player2.healthUI = player2HealthUI;

    // Store health bars in the player objects for collision handlers
    window.player1.healthUI = player1HealthUI;
    window.player2.healthUI = player2HealthUI;


    if (window.player1 && window.player2) {
      window.player1.onCollide(window.player2.id + "attackHitbox", () => {
        if (gameOver) return;
        if (window.player1.health !== 0) {
          window.player1.health -= 50;
          updateHealthBarUI(window.player1.healthUI, window.player1.health);
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
          updateHealthBarUI(window.player2.healthUI, window.player2.health);
        }
        if (window.player2.health === 0) {
          clearInterval(countInterval);
          declareWinner();
          gameOver = true;
        }
      });
    }
    // Collision handlers for attacks
    

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
  // Collision handlers for attacks



  scene("reject-scene", () => {
    console.log("reject scene loaded");
    if (counterContainer) counterContainer.style.display = "none";
    const messages = [
      "Oh... you think you have a choice?",
      "That's cute...",
      "Let's settle this the old fashioned way",
      "Beat me in combat or become my Valentine!",
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

  const HEALTH_BAR_WIDTH = 450;
  const HEALTH_BAR_HEIGHT = 30;

  function createHealthBarUI(x, y, initialHealth, maxHealth) {
    const container = add([
      rect(HEALTH_BAR_WIDTH, HEALTH_BAR_HEIGHT),
      pos(x, y),
      color(50, 50, 50), // dark gray background
      outline(4, rgb(255, 255, 255)), // white border
      anchor("topleft"),
    ]);
    const bar = add([
      rect(HEALTH_BAR_WIDTH - 4, HEALTH_BAR_HEIGHT - 4),
      pos(x + 2, y + 2),
      color(0, 255, 0),
      anchor("topleft"),
    ]);
    return { container, bar, maxHealth, currentHealth: initialHealth };
  }

  function updateHealthBarUI(healthUI, newHealth) {
    healthUI.currentHealth = newHealth;
    const newWidth = (HEALTH_BAR_WIDTH - 4) * (newHealth / healthUI.maxHealth);
    tween(healthUI.bar.width, newWidth, 0.5, (val) => {
      healthUI.bar.width = val;
    });
  }

  function declareWinner() {
    if (gameOver) return;
    gameOver = true;

    let result;
    if (window.player1.health > 0 && window.player2.health > 0) {
      result = "There are no ties here, this means you lose.";
    } else if (window.player1.health > 0) {
      result = "You really thought beating me would get you out of this? Delusional.";
    } else {
      result = "You thought you could beat me, huh? Now you're my Valentine :).";
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

    onKeyPress("enter", () => {
      destroy(winnerTextObj);
      go("fight");
    });
  }
    
  
    // Create a kaboom text object to show the winner message

    

    function makePlayer(posX, posY, width, height, scaleFactor, id) {
      console.log(`Creating player ${id} at (${posX}, ${posY})`);
      return add([
        pos(posX, posY),
        z(3),
        scale(scaleFactor),
        area({ shape: new Rect(vec2(0), width, height) }),
        anchor("center"),
        body({ stickToPlatform: true }),
        id, // <-- add the id as a tag so that onCollide can detect it
        {
          id: id, // also store it in the object for reference
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

  function shootProjectile(player, speed, damage, enemy, projectileSprite, maxDistance) {
    const dir = player.flipX ? -1 : 1;
    const startPos = vec2(player.pos.x + dir * 50, player.pos.y - 20);
    
    const projectile = add([
      sprite(projectileSprite),
      pos(startPos),
      scale(2),
      area(),
      move(vec2(dir, 0), speed),
      "projectile",
      { startPos }
    ]);
  
    // Optionally play an animation on the projectile if defined
    if (projectile.play) {
      try {
        projectile.play("shoot");
      } catch (e) {
        // If no "shoot" animation, ignore the error.
      }
    }
  
    // Check if the projectile has traveled too far and destroy it if so.
    projectile.onUpdate(() => {
      if (Math.abs(projectile.pos.x - projectile.startPos.x) >= maxDistance) {
        destroy(projectile);
      }
    });
  
    projectile.onCollide(enemy.id, () => {
      if (enemy.health > 0) {
        enemy.health -= damage;
        tween(
          enemy.healthBar.width,
          enemy.health,
          1,
          (val) => { enemy.healthBar.width = val; },
          easings.easeOutSine
        );
        try {
          enemy.play("hurt");
        } catch (e) {}
      }
      
      if (enemy.health <= 0) {
        clearInterval(countInterval);
        declareWinner();
        gameOver = true;
      }
      
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