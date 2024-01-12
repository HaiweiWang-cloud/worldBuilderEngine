export default class TileMapRenderer {
    constructor(grid, tileMap) {
        this.grid = grid
        this.gameObject = this.grid.gameObject
        this.tileMap = tileMap
    }

    draw(ctx, x, y, scaleX, scaleY) {
        for (let r=0; r < this.grid.Ny; r++) {
            for (let c=0; c < this.grid.Nx; c++) {
                let tileValue = this.grid.getValue(c, r)
                let tileCoords = this.tileMap.getTileCoordinates(tileValue)
                ctx.drawImage(this.tileMap.image, tileCoords[0], tileCoords[1], this.tileMap.tileWidth, this.tileMap.tileHeight, x + c*this.grid.cellSize*scaleX, y + r*this.grid.cellSize*scaleY, this.grid.cellSize*scaleX, this.grid.cellSize*scaleY)
            }
        }
    }
}