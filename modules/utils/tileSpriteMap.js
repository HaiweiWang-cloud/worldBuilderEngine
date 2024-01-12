export default class TileSpriteMap {
    constructor(image, tileWidth, tileHeight, Nx, Ny) {
        this.image = image
        this.Nx = Nx
        this.Ny = Ny
        this.tileWidth = tileWidth
        this.tileHeight = tileHeight
    }

    getTileCoordinates(value) {
        return [(value % this.Nx) * this.tileWidth, Math.floor(value / this.Nx) * this.tileHeight]
    }
}