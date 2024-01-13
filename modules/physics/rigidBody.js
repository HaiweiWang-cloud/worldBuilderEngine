import Artist from "../artist.js"
import Vector3D from "../utils/vector3D.js"

export default class RigidBody extends Artist {
    constructor(gameObject) {
        super(gameObject)
        this.mass = 1
        this.velocity = new Vector3D(0,0,0)
        this.initialPosition = new Vector3D(this.gameObject.position.x, this.gameObject.position.y, this.gameObject.position.z)
        
        this.damping = 0
        this.gravity = 1
        this.forces = []
        this.constraints = []
    }

    updateFree(deltaTime) {
        /* Update velocity using forces */
        this.forces.forEach((force) => {
            this.velocity = this.velocity.add(force.impulse(deltaTime, this.mass))
        })

        this.velocity.y += this.gravity * 9.81* deltaTime * 0.001
        this.velocity = this.velocity.subtract(this.velocity.scale(this.damping * deltaTime * 0.001))
        /* Store initial position for later computation after constraints */
        this.initialPosition.x = this.gameObject.position.x
        this.initialPosition.y = this.gameObject.position.y
        this.initialPosition.z = this.gameObject.position.z
        /* Update position using velocity */
        
        this.gameObject.position = this.gameObject.position.add(this.velocity.scale(deltaTime * 0.001))
    }

    updateConstraints(deltaTime) {
        /* Update position using constraints */
        let totalCorrection = new Vector3D(0, 0, 0)
        this.constraints.forEach((constraint) => {
            totalCorrection = totalCorrection.add(constraint.getPositionCorrection(this, deltaTime))
        })
        this.gameObject.position = this.gameObject.position.add(totalCorrection)
        if (deltaTime > 0) {
            this.velocity = this.gameObject.position.subtract(this.initialPosition).scale(1 / deltaTime * 1000)
        } 
        
    }

    draw(ctx, x, y, scaleX, scaleY) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(x, y, this.width/2 * this.mass * scaleX, 0, 2 * 3.15)
        ctx.fill()
        ctx.fillStyle = "blue"
        ctx.fillRect(x-2.5, y-2.5, 5, 5)
    } 
}