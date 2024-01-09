import Camera from "../../modules/camera.js";
import Artist from "../../modules/artist.js";
import GameObject from "../../modules/gameobject.js";

window.addEventListener("load", function() {
    canvas1.width = 400
    canvas1.height = 300

    const camera = new GameObject()
    const cameraComponent = new Camera(canvas1, camera)
    const artist = new GameObject()
    const artistComponent = new Artist(artist)
    const artistC = new GameObject()
    const artistCComponent = new Artist(artistC)

    const camera2 = new GameObject()
    const cameraComponent2 = new Camera(canvas1, camera2)

    cameraComponent.size = 3
    cameraComponent.viewHeight= 0.5

    cameraComponent2.size = 6
    cameraComponent2.viewHeight = 0.5
    cameraComponent2.viewY = 0.5

    cameraComponent2.backgroundColor = "#0000ff"
    cameraComponent2.calculateDerived()
    cameraComponent.calculateDerived()

    artist.translate(2, 0, 0)


    function animate() {

        canvas1.getContext("2d").clearRect(0,0,canvas1.width, canvas1.height)
        artist.translate(0, 0.0025, 0)
        cameraComponent.drawBackground()
        cameraComponent2.drawBackground()

        cameraComponent.renderFrame([artistCComponent, artistComponent])
        cameraComponent2.renderFrame([artistCComponent, artistComponent])
        
        requestAnimationFrame(animate)
    }

    animate()

})

