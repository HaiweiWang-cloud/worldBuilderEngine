import Vector3D from "../utils/vector3D.js"
import Component from "../component.js"

export default class ConstantForce extends Component {
    constructor(gameObject, Fx, Fy, Fz) {
        super(gameObject)
        this.force = new Vector3D(Fx, Fy, Fz)
    }

    impulse(deltaTime, mass) {
        return this.force.scale(deltaTime / mass * 0.001)
    }
}