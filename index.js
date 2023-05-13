const grid = document.querySelector('.grid');
const resultsDisplay = document.querySelector('.results');
let currentShooterIndex = 202;
let width = 15;
let direction = 1;
let invadersId;
let goingRight = true;
let aliensRemoved = [];
let results = 0;

for (let i = 0; i < 225; i++) {
  const square = document.createElement('div');
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'));

//DEFINE THE INVADERS
const alienInvaders = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39,40,
  41
];

// DRAW INVADERS
function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if(!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add('invader');
    }
  }
}

draw();
function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove('invader')
  }
}

//MAKE SHOOTER 
squares[currentShooterIndex].classList.add('shooter');

//MOVE SHOOTER 
function moveShooter(e) {
  squares[currentShooterIndex].classList.remove('shooter');
  switch(e.key) {
    case 'ArrowLeft':
      if (currentShooterIndex % width !== 0) currentShooterIndex -=1;
      break;
    case 'ArrowRight' :
      if (currentShooterIndex % width < width -1) currentShooterIndex +=1
      break;
  }
  squares[currentShooterIndex].classList.add('shooter');
}
document.addEventListener('keydown', moveShooter);

//MOVING INVADERS 
function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0;
  const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1;
  remove();

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width +1;
      direction = -1;
      goingRight = false;
    }
  }

  if(leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width -1;
      direction = 1;
      goingRight = true;
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
  }

  draw();

  if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
    resultsDisplay.innerHTML = 'ANNIHILATED';
    clearInterval(invadersId);
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if(alienInvaders[i] > (squares.length)) {
      resultsDisplay.innerHTML = 'GAME OVER';
      clearInterval(invadersId);
    }
  }
  if (aliensRemoved.length === alienInvaders.length) {
    resultsDisplay.innerHTML = 'YOU WIN';
    clearInterval(invadersId);
  }
}
invadersId = setInterval(moveInvaders, 150);

//SHOOT INVADERS 
function shoot(e) {
  let laserId;
  let currentLaserIndex = currentShooterIndex;

  if (currentLaserIndex < width){
    squares[currentLaserIndex].classList.remove('laser')
    clearInterval(laserId)
    return
  }

  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser');
    currentLaserIndex -= width;
    squares[currentLaserIndex].classList.add('laser');

    if (squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('laser');
      squares[currentLaserIndex].classList.remove('invader')
      squares[currentLaserIndex].classList.add('boom');

      setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300);
      clearInterval(laserId);

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
      aliensRemoved.push(alienRemoved);
      results++;
      resultsDisplay.innerHTML = results;
    

    }

  }
  switch(e.key) {
    case ' ':
      laserId = setInterval(moveLaser, 100);
  }
}

document.addEventListener('keydown', shoot);





// const canvas = document.querySelector('canvas')
// const canv = canvas.getContext('2d')

// canvas.width = 700;
// canvas.height = 700;

// // function game (){
// //     console.log('game')
// // }
// // setInterval (game, 1000/60)
// // create character
// class Player {
//     constructor(){
//         this.velocity = {
//             x:0,
//             y:0 
//         }

//         const image = new Image()
//         image.src = './img/idle.png'
//         image.onload = () => {
//         this.image = image
//         this.width = image.width * 0.35
//         this.height = image.height * 0.35
//                 this.position = {
//             x: canvas.width / 2 - this.width / 2,
//             y: canvas.height  - this.height - 20
//         }
//         } 
//     }
//     draw() {

//         canv.drawImage(
//             this.image, 
//             this.position.x, 
//             this.position.y, 
//             this.width, 
//             this.height
//             )
//     }
//     update(){
//        if (this.image) {
//         this.draw()
//         this.position.x += this.velocity.x
//        }
//     }
// } 

// class Particle {
//   constructor({position, velocity, radius, color}){
//       this.position = position
//       this.velocity = velocity

//       this.radius = radius
//       this .color = color
//       this.opacity = 1 
//   }


//   draw() {
//       c.save()
//       c.globalAlpha = this.opacity
//       c.beginPath()
//       c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
//       c.fillStyle = this.color
//       c.fill()
//       c.closePath()
//       c.restore()

//   }
//   update(){
//       this.draw()
//       this.position.x += this.velocity.x
//       this.position.y += this.velocity.y
//       this.opacity -= 0.01
//   }
// }



// // create projectiles
// class projectile {
//     constructor({position, velocity}){
//         this.position = position 
//         this.velocity = velocity

//         this.radius = 3
//     }
//     draw(){
//         canv.beginPath()
//         canv.arc(this.position.x, this.position.y, this.radius, 0, Math.PI *2)
//         canv.fillStyle = 'yellow'
//         canv.fill()
//         canv.closePath()
//     }
//     update() {
//         this.draw()
//         this.position.x += this.velocity.x
//         this.position.y += this.velocity.y
//     }
// }


// class Enemyprojectile {
//     constructor({position, velocity}){
//         this.position = position 
//         this.velocity = velocity

//         this.width = 3
//         this.height = 10
//     }
//     draw(){
//         canv.fillStyle = 'white'
//         canv.fillRect(this.position.x, this.position.y, this.width, this.height)
//     }
//     update() {
//         this.draw()
//         this.position.x += this.velocity.x
//         this.position.y += this.velocity.y
//     }
// }

// // create invader 

// class Invader {
//     constructor({position}){
//         this.velocity = {
//             x:0,
//             y:0
//         }

//         const image = new Image()
//         image.src = './img/Ship1.png'
//         image.onload = () => {

//         this.image = image
//         this.width = image.width * 1
//         this.height = image.height * .40
//                 this.position = {
//             x: position.x,
//             y: position.y
//         }
//         } 
//     }
//     draw() {

//         canv.drawImage(
//             this.image, 
//             this.position.x, 
//             this.position.y, 
//             this.width, 
//             this.height
//             )
//     }
//     update({velocity}){
//        if (this.image) {
//         this.draw()
//         this.position.x += velocity.x
//         this.position.y += velocity.y
//        }
//     }
//     shoot(Enemyprojectiles){
//         Enemyprojectiles.push(new Enemyprojectile({
//             position: {
//                 x: this.position.x +this.width / 2,
//                 y: this.position.y +this.height
//             },
//             velocity : {
//                 x: 0,
//                 y: 5
//             }
//         }))
//     }
// } 

//  class enemyGrid {
//   constructor(){
//     this.position = { 
//         x: 0,
//         y: 0
//     }
//     this.velocity = {
//         x: 3,
//         y: 0
//     }
//     this.invaders = []

//     const columns = Math.floor(Math.random() * 10 + 5)
//     const rows = Math.floor(Math.random() * 5 + 2)

//     this.width = columns * 30

//     for(let x = 0; x < columns; x++) {
//         for(let y = 0; y < rows; y++) {
//         this.invaders.push(new Invader({
//             position: {
//                 x: x * 30,
//                 y: y * 30
//             }
//         })
//         )
//     }
//    }
//   }
//  update() {
//     this.position.x += this.velocity.x
//     this.position.y += this.velocity.y
//     this.velocity.y = 0

//     if (this.position.x +this.width >= canvas.width || this.position.x <= 0){
//        this.velocity.x = -this.velocity.x 
//        this.velocity.y = 30
       
//     }
//   }
//  }

 
// let player = new Player()
// let enemyGrids = [new enemyGrid()]
// let projectiles = []
// let Enemyprojectiles = []
// let particles = []





// const keys = {
//         space: {
//         pressed: false
//     },
//     ArrowLeft:{
//         pressed:false
//     }, 
//     ArrowRight: {
//         pressed: false
//     }

// }

// let frames = 0
// let randomInterval = Math.floor(Math.random() * 500 + 500)
// let game = {
//   over: false,
//   active: true
// }
// let score = 0


// function animate(){
//     requestAnimationFrame(animate)
//     canv.fillStyle = 'black'
//     canv.fillRect(0, 0, canvas.width, canvas.height)
//     player.update()
//     Enemyprojectiles.forEach((Enemyprojectile) => {
//         Enemyprojectile.update()
//     })

//      projectiles.forEach((projectile) => {
//         projectile.update()
//     })

    

//     enemyGrids.forEach((enemyGrid) => {
//         enemyGrid.update()
    
//         if (frames % 100 === 0 && enemyGrid.invaders.length > 0) {
//             enemyGrid.invaders[Math.floor(Math.random() * enemyGrid.invaders.length)].shoot(
//               Enemyprojectiles)
//           }

//         enemyGrid.invaders.forEach((Invader, i) => {
//             Invader.update({velocity: enemyGrid.velocity})

//             projectiles.forEach((projectile, p) => {
//                if(projectile.position.y - projectile.radius <= Invader.position.y + Invader.height && 
//                 projectile.position.x + projectile.radius >= Invader.position.x && 
//                 projectile.position.x - projectile.radius <= Invader.position.x  + Invader.width &&
//                 projectile.position.y + projectile.radius >= Invader.position.y){
               
//                     setTimeout(() => {
//                         const invaderHit = enemyGrid.invaders.find((invaderH) => 
//                         invaderH === Invader
//                         )
//                         const projectileHit = projectiles.find((projectileH) => projectileH === projectile)
//                     if(invaderHit && projectileHit){  
//                     enemyGrid.invaders.splice(i, 1)
//                     projectiles.splice(p, 1)
//                     }
//                 }, 0)
//                } 
//             })
//         })
//     })
    

//     if (keys.ArrowLeft.pressed && player.position.x >= 0){
//         player.velocity.x = -5
//     }  else if (keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width) {
//         player.velocity.x = 5
//     } 
//     else{
//         player.velocity.x = 0
//     }


// }
// animate()




// addEventListener('keydown', ({key}) => {
//     switch (key){
//         case 'ArrowLeft' :
//             console.log('left')
//             keys.ArrowLeft.pressed = true
//             break
//         case 'ArrowRight' :
//                 console.log('right')
//                 keys.ArrowRight.pressed = true
//             break
//         case ' ' :
//                  console.log('space')
//                 projectiles.push(new projectile({
//                     position:{
//                         x: player.position.x + player.width / 2,
//                         y: player.position.y
//                     }, 
//                     velocity: {
//                         x:0,
//                         y:-15
//                     }  
//                 }))
//             break
//     }
// })

// addEventListener('keyup', ({key}) => {
//     switch (key){
//         case 'ArrowLeft' :
//             console.log('left')
//             keys.ArrowLeft.pressed = false
//             break
//         case 'ArrowRight' :
//                 console.log('right')
//                 keys.ArrowRight.pressed = false
//             break
//         case ' ' :
//                 console.log('space')
//                 keys.space.pressed = false;
//             break;
//     }
// })




// invaders explodig 

// create background 

// score 





