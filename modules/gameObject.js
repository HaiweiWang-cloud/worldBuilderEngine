import Vector3D from "./utils/vector3D.js"

export default class GameObject {
    constructor() {
        this.position = new Vector3D(0, 0, 0)
        this.rotation = 0 // rotation about out-of-plane axis only in 2D games
        this.scale = new Vector3D(1, 1, 1)
        this.static = false
        this.tag = "none"
    }

    translate(dx, dy, dz) {
        this.position = this.position.add(new Vector3D(dx, dy, dz))
    }

    rotate(angle) {
        this.rotation += angle
    }

    increaseScale(dx, dy, dz) {
        this.scale = this.scale.add(new Vector3D(dx, dy, dz))
    }
}