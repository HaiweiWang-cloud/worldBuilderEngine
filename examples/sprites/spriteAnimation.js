import Camera from "../../modules/camera.js";
import SpriteRenderer from "../../modules/spriteRenderer.js";
import GameObject from "../../modules/gameobject.js";
import SpriteAnimator from "../../modules/utils/spriteAnimator.js"

window.addEventListener("load", function() {
    canvas2.width = 400
    canvas2.height = 300

    const camera = new GameObject()
    const cameraComponent = new Camera(canvas2, camera)

    const sprite = new GameObject()
    const spriteComponent = new SpriteRenderer(sprite)
    spriteComponent.sprite = ghostSprite
    const spriteAnimator = new SpriteAnimator(spriteComponent, 261, 209, 6, 15)
    spriteComponent.flipX = 1

    const dog = new GameObject()
    const dogRenderer = new SpriteRenderer(dog)
    dogRenderer.sprite = dogSprite
    const dogAnimator = new SpriteAnimator(dogRenderer, 575, 523, 5, 12)
    dogAnimator.changeFrameY(5)
    dogRenderer.width = 1.5
    dogRenderer.height = 1.5
    dog.translate(0,1.75,0)

    let deltaTime = 0;
    let lastTime = 0;
    let time = 0;

    function animate(timestamp) {
        deltaTime = timestamp - lastTime
        lastTime = timestamp
        time += deltaTime

        spriteAnimator.update(deltaTime)
        dogAnimator.update(deltaTime)

        sprite.translate(2 * deltaTime * 0.001, 0, 0)
        sprite.position.y = 1.5* Math.sin(3 * 0.001 * time)
        if (sprite.position.x > (cameraComponent.width/2 + spriteComponent.width/2)) {
            sprite.position.x = -cameraComponent.width/2 - spriteComponent.width/2
        }

        canvas2.getContext("2d").clearRect(0,0,canvas2.width,canvas2.height)

        cameraComponent.drawBackground()
        cameraComponent.renderFrame([spriteComponent, dogRenderer])

        requestAnimationFrame(animate)
    }

    animate(0)
})