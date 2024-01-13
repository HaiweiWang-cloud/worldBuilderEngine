import Artist from "../artist.js"
import Vector3D from "../utils/vector3D.js"

export default class FixedDistanceConstraint extends Artist{
    /* Concept from Matthias Muller */
    constructor(body1, body2, distance) {
        super(body1.gameObject)
        
        this.body1 = body1
        this.body2 = body2
        
        /* Inverse masses */
        this.w1 = 1 / this.body1.mass
        this.w2 = 1 / this.body2.mass
        
        this.displacement = new Vector3D(0,0,0)
        this.distance = 0
        this.fixedDistance = distance
    }

    computeDisplacement() {
        this.displacement = this.body2.gameObject.position.subtract(this.body1.gameObject.position)
        this.distance = Math.sqrt(this.displacement.x *  this.displacement.x+ this.displacement.y * this.displacement.y + this.displacement.z * this.displacement.z)
        
        if (this.displacement.y >= 0) {
            var angle = Math.acos(this.displacement.x / this.distance)
        } else {
            var angle = Math.acos(-this.displacement.x / this.distance) + Math.PI
        }

        this.body1.gameObject.rotation = angle
    }

    draw(ctx, x, y, scaleX, scaleY) {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + this.distance*scaleX, y)
        ctx.stroke()
    }

    getPositionCorrection(rigidBody, deltaTime) {
        /* rigidBody is a reference to one of the objects body1 or body2 */
        this.computeDisplacement()
        
        if (rigidBody === this.body1) {
            return this.displacement.scale(this.w1 / (this.w2 + this.w1) * (1 - this.fixedDistance / this.distance))
        } else if (rigidBody === this.body2) {
            return this.displacement.scale(-this.w2 / (this.w2 + this.w1) * (1 - this.fixedDistance / this.distance))
        }
    }
}