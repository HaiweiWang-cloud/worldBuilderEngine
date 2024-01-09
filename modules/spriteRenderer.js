import Artist from "./artist.js"

export default class SpriteRenderer extends Component{
    constructor(gameObject) {
        super(gameObject)

        this.sprite = null // a DOM Image object
        this.cropX = 0
        this.cropY = 0

        this.height = 1 // in game units
        this.setCropDimensions(1,1)

        this.color = "ffffff"
        this.flipX = false
        this.flipY = false
    }

    draw(ctx, cameraRotation, cameraSize) {

    }

    setCropDimensions(cropWidth, cropHeight) {
        this.cropWidth = cropWidth // in pxs of the sprite image
        this.cropHeight = cropHeight
        this.width = this.cropWidth / this.cropHeight * this.height // preserve aspect of the cropped sprite by default
    }
}