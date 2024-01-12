import Camera from "../../modules/camera.js";
import SpriteRenderer from "../../modules/spriteRenderer.js";
import GameObject from "../../modules/gameobject.js";
import TileMapRenderer from "../../modules/tileMapRenderer.js";
import Grid from "../../modules/grid.js"
import TileSpriteMap from "../../modules/utils/tileSpriteMap.js"
import InputHandler from "../../modules/input.js";
import SpriteAnimator from "../../modules/utils/spriteAnimator.js"

window.addEventListener("load", function() {
    canvas1.width = 400
    canvas1.height = 300

    const camera = new GameObject()
    const cameraComponent = new Camera(canvas1, camera)
    camera.translate(2.5, 2.5, 0)

    const player = new GameObject()
    const playerSprite = new SpriteRenderer(player)
    playerSprite.sprite = sampleSprite
    const playerAnimator = new SpriteAnimator(playerSprite, 260, 206, 6, 20)
    const input = new InputHandler()
    player.translate(2.5, 2.5, 0)
    
    const terrain = new GameObject()
    const terrainTileMap = new Grid(terrain, 1, 5, 5)
    const terrainSprites = new TileSpriteMap(tileAtlas, 64, 64, 5, 1)

    const featuresTileMap = new Grid(terrain, 1, 5, 5)

    terrainTileMap.map = 
    [
        0, 0, 1, 0, 0,
        0, 2, 1, 2, 0,
        0, 0, 1, 0, 0,
        1, 1, 1, 1, 1,
        2, 2, 0, 0, 0
    ]

    featuresTileMap.map = 
    [
        -1, -1, -1, -1, -1,
        -1, -1, -1, -1, 4,
        -1, -1, -1, -1, -1,
        -1, 4, -1, 3, -1,
        -1, -1, -1, -1, -1,
    ]

    const terrainRenderer = new TileMapRenderer(terrainTileMap, terrainSprites)
    const featuresRenderer = new TileMapRenderer(featuresTileMap, terrainSprites)
    
    let deltaTime = 0;
    let lastTime = 0;

    
    const verticalSpeed = 2
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

        camera.rotate(0.5 * 0.001 * deltaTime)
        if (moving) playerAnimator.update(deltaTime)

        canvas1.getContext("2d").clearRect(0,0,canvas1.width,canvas1.height)

        cameraComponent.drawBackground()
        cameraComponent.renderFrame([terrainRenderer, playerSprite, featuresRenderer])

        requestAnimationFrame(animate)
    }

    animate(0)
})