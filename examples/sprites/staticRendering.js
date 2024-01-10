import Camera from "../../modules/camera.js";
import SpriteRenderer from "../../modules/spriteRenderer.js";
import GameObject from "../../modules/gameobject.js";

window.addEventListener("load", function() {
    canvas1.width = 400
    canvas1.height = 300

    const camera = new GameObject()
    const cameraComponent = new Camera(canvas1, camera)

    cameraComponent.drawBackground()

    const sprite = new GameObject()
    const spriteComponent = new SpriteRenderer(sprite)

    spriteComponent.sprite = sampleSprite
    spriteComponent.setCropDimensions(261, 209)

    cameraComponent.renderFrame([spriteComponent])
})