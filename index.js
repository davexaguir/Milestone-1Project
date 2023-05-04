const canvas = document.querySelector('canvas')
const canv = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

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
        this.image.style.transform = 'rotate(90deg)'
        this.width = image.width * 0.50
        this.height = image.height * 0.50
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

const player = new Player()
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
    canv.fillRect(0, 0, canvas.width, canvas.height)
    player.update()

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

// create projectiles

//create invaders 

//grid for invaders 

//allow invaders to shoot back 

// invaders explodig 

// create background 

// score 
