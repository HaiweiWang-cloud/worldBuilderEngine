import Camera from "../../modules/camera.js";
import Artist from "../../modules/artist.js";
import GameObject from "../../modules/gameobject.js";

window.addEventListener("load", function() {
    canvas2.width = 400
    canvas2.height = 300
    const ctx = canvas2.getContext("2d")

    const artist = new GameObject()
    const artistComponent = new Artist(artist)
    artist.translate(-1, 0, 0)

    const artist2 = new GameObject()
    const artistComponent2 = new Artist(artist2)
    artist2.translate(1, 0, 0)

    const camera = new GameObject()
    const cameraComponent = new Camera(canvas2, camera)
    cameraComponent.setViewDimensions(0.5, 0.5)
    
    const cameraShakeHorizontal = new GameObject()
    const cameraShakeHorizontalComponent = new Camera(canvas2, cameraShakeHorizontal)
    cameraShakeHorizontalComponent.setViewDimensions(0.5, 0.5)
    cameraShakeHorizontalComponent.setViewOffset(0.5, 0)

    const cameraShakeVertical = new GameObject()
    const cameraShakeVerticalComponent = new Camera(canvas2, cameraShakeVertical)
    cameraShakeVerticalComponent.setViewDimensions(0.5, 0.5)
    cameraShakeVerticalComponent.setViewOffset(0, 0.5)

    const cameraRotate = new GameObject()
    const cameraRotateComponent = new Camera(canvas2, cameraRotate)
    cameraRotateComponent.setViewDimensions(0.5, 0.5)
    cameraRotateComponent.setViewOffset(0.5, 0.5)

    const toggleInterval = 60;
    let deltaTime = 0;
    let lastTime = 0;
    let toggleTimer = 0;

    const artists = [artistComponent, artistComponent2]

    let toggled = true;

    function animate(timestamp) {
        deltaTime = timestamp - lastTime
        lastTime = timestamp

        if (toggleTimer > toggleInterval) {
            if (toggled) {
                toggled = false
                cameraShakeHorizontal.translate(0.3, 0, 0)
                cameraShakeVertical.translate(0, 0.3, 0)
                cameraRotate.rotate(-0.1)
            } else {
                toggled = true
                cameraShakeHorizontal.translate(-0.3, 0, 0)
                cameraShakeVertical.translate(0, -0.3, 0)
                cameraRotate.rotate(0.1)
            }
            toggleTimer = 0;
        } else {
            toggleTimer += deltaTime
        }

        ctx.clearRect(0,0,canvas1.width,canvas1.height)

        cameraComponent.drawBackground()
        cameraComponent.renderFrame(artists)

        cameraShakeHorizontalComponent.drawBackground()
        cameraShakeHorizontalComponent.renderFrame(artists)
        
        cameraShakeVerticalComponent.drawBackground()
        cameraShakeVerticalComponent.renderFrame(artists)
        
        cameraRotateComponent.drawBackground()
        cameraRotateComponent.renderFrame(artists)

        requestAnimationFrame(animate)
}

    animate(0)
})