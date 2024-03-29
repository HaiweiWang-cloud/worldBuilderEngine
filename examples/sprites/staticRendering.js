import Camera from "../../modules/camera.js";
import SpriteRenderer from "../../modules/spriteRenderer.js";
import GameObject from "../../modules/gameobject.js";

window.addEventListener("load", function() {
    canvas1.width = 400
    canvas1.height = 300

    const camera = new GameObject()
    const cameraComponent = new Camera(canvas1, camera)

    const sprite = new GameObject()
    const spriteComponent = new SpriteRenderer(sprite)
    spriteComponent.sprite = sampleSprite
    spriteComponent.setCropDimensions(300, 195)
    spriteComponent.flipX = 1
    sprite.translate(0,2,0)
    cameraComponent.flipX = 0
    cameraComponent.flipY = 0

    const wheel = new GameObject()
    const wheelSpriteComponent = new SpriteRenderer(wheel)
    wheelSpriteComponent.sprite = wheelSampleSprite
    wheelSpriteComponent.setCropDimensions(213, 212)
    wheel.translate(0,1,0)
    
    let deltaTime = 0;
    let lastTime = 0;
    let flipTimer = 0;
    let timer = 0

    function animate(timestamp) {
        timer += deltaTime
        deltaTime = timestamp - lastTime
        lastTime = timestamp

        if (flipTimer > 2000) {
            cameraComponent.flipY += 1
            cameraComponent.flipY = cameraComponent.flipY % 2
            flipTimer = 0
        } else {
            flipTimer += deltaTime
        }
        
        wheel.rotate(-6 * 0.001 * deltaTime)
        sprite.translate(-2 * deltaTime * 0.001, 0, 0)
        sprite.rotate(0*-1 * 0.001 * deltaTime)
        camera.rotate(0*2 * 0.001 * deltaTime)
        if (sprite.position.x < -(cameraComponent.width/2 + spriteComponent.width/2)) {
            sprite.position.x = cameraComponent.width/2 + spriteComponent.width/2
        }

        canvas1.getContext("2d").clearRect(0,0,canvas1.width,canvas1.height)

        cameraComponent.drawBackground()
        cameraComponent.renderFrame([spriteComponent, wheelSpriteComponent])

        requestAnimationFrame(animate)
    }

    animate(0)
})