export default class SpriteAnimator {
    constructor(sprite, frameWidth, frameHeight, framesInCycle, frameRate) {
        this.sprite = sprite

        this.frameX = 0
        this.frameY = 0

        this.spriteWidth = frameWidth
        this.spriteHeight = frameHeight

        this.maxFrames = framesInCycle
        this.changeFrameRate(frameRate)
        this.frameTimer = 0

        this.sprite.setCropDimensions(this.spriteWidth, this.spriteHeight)
    }

    changeFrameRate(newFrameRate) {
        this.updateInterval = 1000 / newFrameRate
    }

    changeFrameY(newFrameY) {
        this.sprite.cropY = this.frameY * this.spriteHeight
    }

    update(deltaTime) {
        if (this.frameTimer > this.updateInterval) {
            if (this.frameX < this.maxFrames-1) {
                this.frameX++
            } else {
                this.frameX = 0
            }
            this.sprite.cropX = this.frameX * this.spriteWidth
            this.frameTimer = 0
        } else {
            this.frameTimer += deltaTime
        }
    }
}