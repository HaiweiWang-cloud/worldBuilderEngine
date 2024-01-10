import Artist from "./artist.js"

export default class SpriteRenderer extends Artist {
    constructor(gameObject) {
        super(gameObject)

        this.sprite = null // a DOM Image object
        this.cropX = 0
        this.cropY = 0

        this.height = 1 // in game units
        this.setCropDimensions(1,1)

    }

    draw(ctx, x, y, scaleX, scaleY) {
        ctx.fillStyle = "blue"
        ctx.drawImage(this.sprite, this.cropX, this.cropY, this.cropWidth, this.cropHeight, x-this.width*scaleX/2, y-this.height*scaleY/2, this.width * scaleX, this.height*scaleY)
        ctx.fillRect(x-2.5, y-2.5, 5, 5)
    }

    setCropDimensions(cropWidth, cropHeight) {
        this.cropWidth = cropWidth // in pxs of the sprite image
        this.cropHeight = cropHeight
        this.width = this.cropWidth / this.cropHeight * this.height // preserve aspect of the cropped sprite by default
    }
}