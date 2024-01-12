import Camera from "../../modules/camera.js";
import SpriteRenderer from "../../modules/spriteRenderer.js";
import GameObject from "../../modules/gameobject.js";
import InputHandler from "../../modules/input.js";
import SpriteAnimator from "../../modules/utils/spriteAnimator.js"

window.addEventListener("load", function() {
    canvas1.width = 400
    canvas1.height = 300

    const camera = new GameObject()
    const cameraComponent = new Camera(canvas1, camera)

    const player = new GameObject()
    const playerSprite = new SpriteRenderer(player)
    playerSprite.sprite = sampleSprite
    const playerAnimator = new SpriteAnimator(playerSprite, 260, 206, 6, 20)
    const input = new InputHandler()

    let deltaTime = 0;
    let lastTime = 0;

    const verticalSpeed = 1
    const horizontalSpeed = 2

    function animate(timestamp) {
        deltaTime = timestamp - lastTime
        lastTime = timestamp

        let up = input.heldKeys.has("w")
        let down = input.heldKeys.has("s")
        let left = input.heldKeys.has("a")
        let right = input.heldKeys.has("d")
        let moving = up || down || left || right
        
        if (up) {
            player.translate(0, -verticalSpeed  * deltaTime *0.001, 0)
        } 
        
        if (down) {
            player.translate(0, verticalSpeed  * deltaTime *0.001, 0)
        }

        if (left) {
            player.translate(-horizontalSpeed  * deltaTime *0.001, 0, 0)
            playerSprite.flipX = 1
        }

        if (right) {
            player.translate(horizontalSpeed  * deltaTime *0.001, 0, 0)
            playerSprite.flipX = 0
            
        }

        if (moving) playerAnimator.update(deltaTime)

        if (player.position.x < -cameraComponent.size * cameraComponent.aspectRatio / 2 + playerSprite.width / 2) {
            player.position.x = -cameraComponent.size * cameraComponent.aspectRatio / 2 + playerSprite.width / 2
        } else if (player.position.x > cameraComponent.size * cameraComponent.aspectRatio / 2 - playerSprite.width / 2) {
            player.position.x = cameraComponent.size * cameraComponent.aspectRatio / 2 - playerSprite.width / 2
        }

        if (player.position.y > cameraComponent.size/2 - playerSprite.height/2) {
            player.position.y = cameraComponent.size/2 - playerSprite.height/2
        } else if (player.position.y < -cameraComponent.size/2 + playerSprite.height/2) {
            player.position.y = -cameraComponent.size/2 + playerSprite.height/2
        }
        
        canvas1.getContext("2d").clearRect(0,0,canvas1.width,canvas1.height)

        cameraComponent.drawBackground()
        cameraComponent.renderFrame([playerSprite])

        requestAnimationFrame(animate)
    }

    animate(0)
})