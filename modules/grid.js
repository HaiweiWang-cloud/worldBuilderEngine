import Map from "./utils/map.js"

export default class Grid extends Map {
    constructor(gameObject, cellSize, Nx, Ny) {
        super(Nx, Ny)
        this.gameObject = gameObject
        this.cellSize = cellSize
    }
}