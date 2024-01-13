import Camera from "../../modules/camera.js";
import GameObject from "../../modules/gameobject.js";
import FixedDistanceConstraint from "../../modules/physics/fixedDistanceConstraint.js";
import ConstantForce from "../../modules/physics/constantForce.js";
import RigidBody from "../../modules/physics/rigidBody.js";

window.addEventListener("load", function() {
    canvas1.width = 400
    canvas1.height = 400

    const substeps = 1
    const length = 3
    const length2 = 3
    const initialAngle1 = Math.PI/2 - 0
    const initialAngle2 = Math.PI/2 - 1.5

    const camera = new GameObject()
    const cameraComponent = new Camera(canvas1, camera)
    cameraComponent.size = 20
    cameraComponent.calculateDerived()

    const attachment = new GameObject()
    const attachmentBody = new RigidBody(attachment)

    const mass1 = new GameObject()
    const mass1Body = new RigidBody(mass1)
    const mass2 = new GameObject()
    const mass2Body = new RigidBody(mass2)

    mass2Body.mass = 2
    mass1Body.mass = 2

    const constraint = new FixedDistanceConstraint(attachmentBody, mass1Body, length)
    const constraint2 = new FixedDistanceConstraint(mass1Body, mass2Body, length2)
    mass1Body.constraints.push(constraint, constraint2)
    
    mass2Body.constraints.push(constraint2)
    
    mass1.translate(length * Math.cos(initialAngle1), length * Math.sin(initialAngle1), 0)
    mass2.translate(mass1.position.x, mass1.position.y, mass1.position.z)
    mass2.translate(length2 * Math.cos(initialAngle2), length2 * Math.sin(initialAngle2), 0)

    let deltaTime = 0;
    let lastTime = 0;

    function animate(timestamp) {
        deltaTime = timestamp - lastTime
        lastTime = timestamp
        
        for (var i=0; i < substeps; i++) {
            mass1Body.updateFree(deltaTime / substeps)
            mass2Body.updateFree(deltaTime / substeps)
            mass1Body.updateConstraints(deltaTime / substeps)
            mass2Body.updateConstraints(deltaTime / substeps)
        }
        
        canvas1.getContext("2d").clearRect(0,0,canvas1.width,canvas1.height)

        cameraComponent.drawBackground()
        cameraComponent.renderFrame([constraint, constraint2, attachmentBody, mass1Body, mass2Body])
        
        
        
        requestAnimationFrame(animate)
    }

    animate(0)
})