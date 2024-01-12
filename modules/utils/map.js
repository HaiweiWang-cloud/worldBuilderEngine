export default class Map {
    constructor(Nx, Ny) {
        this.Nx = Nx
        this.Ny = Ny

        this.map = []
        this.generateNullMap()
    }

    getValue(c, r) {
        return this.map[r * this.Nx + c]
    }

    setValue(value, c, r) {
        this.map[r * this.Nx + c] = value
    }
    
    generateNullMap() {
        for (let r=0; r < this.Ny; r++) {
            for (let c=0; c < this.Nx; c++) {
                this.map.push(-1)
            }
        }
    }
}