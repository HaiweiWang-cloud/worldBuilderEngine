import Component from "./component.js"
import Vector3D from "./utils/vector3D.js"

export default class Artist extends Component{
    constructor(gameObject) {
        super(gameObject)

        this.width = 1
        this.height = 1

        this.flipX = false
        this.flipY = false
    }

    draw(ctx, x, y, scaleX, scaleY) {
        let cornerX = x-this.width*scaleX/2
        let cornerY = y-this.height*scaleY/2
        ctx.fillStyle = "green"
        ctx.fillRect(cornerX, cornerY, this.width*scaleX, this.height*scaleY)
        ctx.fillStyle = "blue"
        ctx.fillRect(x-2.5, y-2.5, 5, 5)
    }

}