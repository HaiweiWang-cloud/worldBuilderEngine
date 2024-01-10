import Component from "./component.js"

export default class Camera extends Component {
    constructor(canvas, gameObject) {
        super(gameObject)

        this.targetCanvas = canvas
        this.targetCtx = canvas.getContext("2d")
        
        this.backgroundColor = "#314d79"

        this.viewWidth = 1 // fraction of canvas dimensions
        this.viewHeight = 1 
        this.viewX = 0
        this.viewY = 0
        this.size = 5 // set the height of the camera to 5 length units by default

        this.flipX = 0
        this.flipY = 0

        this.calculateDerived()
    }

    drawBackground() {
        this.targetCtx.fillStyle = this.backgroundColor
        this.targetCtx.fillRect(this.offsetX, this.offsetY, this.targetCanvas.width * this.viewWidth, this.targetCanvas.height * this.viewHeight)
    }

    renderFrame(artists) {
        this.targetCtx.save()
        this.setClip()
        artists.forEach((artist) => {
            this.renderArtist(artist)
        })
        this.targetCtx.restore()
    }

    renderArtist(artist) {
        let rotCameraPosition = this.gameObject.position.rotateZ(this.gameObject.rotation)
        let rotObjectPosition = artist.gameObject.position.rotateZ(this.gameObject.rotation)
        let x = (rotObjectPosition.x * (1 - this.flipX * 2)+ this.width/2 - rotCameraPosition.x) * this.lengthToPxFactor + this.offsetX
        let y = (rotObjectPosition.y * (1 - this.flipY * 2) + this.height/2 - rotCameraPosition.y) * this.lengthToPxFactor + this.offsetY
        
        this.targetCtx.save()
        
        this.targetCtx.translate(x, y)
        this.targetCtx.rotate(artist.gameObject.rotation-this.gameObject.rotation)
        this.targetCtx.scale((1 - artist.flipX * 2) * (1- this.flipX * 2), (1 - artist.flipY* 2) * (1 - this.flipY * 2))
        this.targetCtx.translate(-x, -y)
        
        artist.draw(this.targetCtx, x, y, artist.gameObject.scale.x * this.lengthToPxFactor, artist.gameObject.scale.y * this.lengthToPxFactor)
        
        this.targetCtx.restore()
    }

    calculateDerived() {
        this.aspectRatio = this.targetCanvas.width * this.viewWidth / (this.targetCanvas.height * this.viewHeight)
        this.height = this.size
        this.width = this.size * this.aspectRatio
        this.lengthToPxFactor = this.viewHeight * this.targetCanvas.height / this.size
        this.offsetX = this.viewX * this.targetCanvas.width
        this.offsetY = this.viewY * this.targetCanvas.height
    }

    setViewDimensions(newViewWidth, newViewHeight) {
        this.viewHeight = newViewHeight
        this.viewWidth = newViewWidth
        this.calculateDerived()
    }

    setViewOffset(newViewX, newViewY) {
        this.viewX = newViewX
        this.viewY = newViewY
        this.calculateDerived()
    }

    setClip() {
        let region = new Path2D()
        region.rect(this.offsetX, this.offsetY, this.viewWidth * this.targetCanvas.width, this.viewHeight * this.targetCanvas.height)
        this.targetCtx.clip(region)
    }
}