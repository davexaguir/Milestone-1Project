const canvas = document.querySelector('canvas')
const canv = canvas.getContext('2d')

canvas.width = 700;
canvas.height = 700;

function game (){
    console.log('game')
}
setInterval (game, 1000/60)
// create character
class Player {
    constructor(){
        this.velocity = {
            x:0,
            y:0
        }

        const image = new Image()
        image.src = './img/idle.png'
        image.onload = () => {
        this.image = image
        this.width = image.width * 0.35
        this.height = image.height * 0.35
                this.position = {
            x: canvas.width / 2 - this.width / 2,
            y: canvas.height  - this.height - 20
        }
        } 
    }



    draw() {

        canv.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
            )
    }
    update(){
       if (this.image) {
        this.draw()
        this.position.x += this.velocity.x
       }
    }
} 

// create projectiles
class projectile {
    constructor({position, velocity}){
        this.position = position 
        this.velocity = velocity

        this.radius = 3
    }
    draw(){
        canv.beginPath()
        canv.arc(this.position.x, this.position.y, this.radius, 0, Math.PI *2)
        canv.fillStyle = 'yellow'
        canv.fill()
        canv.closePath()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

// create invader 

class Invader {
    constructor({position}){
        this.velocity = {
            x:0,
            y:0
        }

        const image = new Image()
        image.src = './img/Ship1.png'
        image.onload = () => {
         const scale = 1   
        this.image = image
        this.width = image.width * 1
        this.height = image.height * .40
                this.position = {
            x: position.x,
            y: position.y
        }
        } 
    }



    draw() {

        canv.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
            )
    }
    update({velocity}){
       if (this.image) {
        this.draw()
        this.position.x += velocity.x
        this.position.y += velocity.y
       }
    }
} 

 class enemyGrid {
  constructor(){
    this.position = { 
        x: 0,
        y: 0
    }
    this.velocity = {
        x: 3,
        y: 0
    }
    this.invaders = []

    this.width = 10 * 30

    for(let i = 0; i < 10; i++) {
        for(let y = 0; y < 8; y++) {
        this.invaders.push(new Invader({
            position: {
                x: i * 30,
                y: y * 30
            }
        })
        )
    }
   }
  }

 update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.velocity.y = 0

    if (this.position.x +this.width >= canvas.width || this.position.x <= 0){
       this.velocity.x = -this.velocity.x 
       this.velocity.y = 30
       
    }
  }
 }

const player = new Player()
const enemyGrids = [new enemyGrid()]
//projectile const
const projectiles = []




const keys = {
    ArrowLeft:{
        pressed:false
    }, 
    ArrowRight: {
        pressed: false
    }, 
    space: {
        pressed: false
    }
}

function animate(){
    requestAnimationFrame(animate)
    canv.fillStyle = 'black'
    canv.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    projectiles.forEach(projectile => {
        projectile.update()
    })

    enemyGrids.forEach(enemyGrid => {
        enemyGrid.update()
        enemyGrid.invaders.forEach((Invader) => {
            Invader.update({velocity: enemyGrid.velocity})
        })
    })

    if (keys.ArrowLeft.pressed && player.position.x >= 0){
        player.velocity.x = -5
    }  else if (keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 5
    } 
    else{
        player.velocity.x = 0
    }

}
animate()

// move character


addEventListener('keydown', ({key}) => {
    switch (key){
        case 'ArrowLeft' :
            console.log('left')
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowRight' :
                console.log('right')
                keys.ArrowRight.pressed = true
            break
        case ' ' :
                 console.log('space')
                projectiles.push(new projectile({
                    position:{
                        x: player.position.x + player.width / 2,
                        y: player.position.y
                    }, 
                    velocity: {
                        x:0,
                        y:-15
                    }  
                }))
            break
    }
})

addEventListener('keyup', ({key}) => {
    switch (key){
        case 'ArrowLeft' :
            console.log('left')
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight' :
                console.log('right')
                keys.ArrowRight.pressed = false
            break
        case ' ' :
                    console.log('space')
            break
    }
})


//shoot invaders 






//grid for invaders //   enemyMap = [
//         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//       ]


// invaders explodig 

// create background 

// score 
