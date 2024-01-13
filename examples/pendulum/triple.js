import Camera from "../../modules/camera.js";
import GameObject from "../../modules/gameobject.js";
import FixedDistanceConstraint from "../../modules/physics/fixedDistanceConstraint.js";
import ConstantForce from "../../modules/physics/constantForce.js";
import RigidBody from "../../modules/physics/rigidBody.js";
import Vector3D from "../../modules/utils/vector3D.js";

window.addEventListener("load", function() {
    canvas2.width = 400
    canvas2.height = 400

    const substeps = 200

    const camera = new GameObject()
    const cameraComponent = new Camera(canvas2, camera)
    cameraComponent.size = 10
    cameraComponent.calculateDerived()

    const attachment = new GameObject()
    const attachmentBody = new RigidBody(attachment)
    attachmentBody.mass = 0.1

    const length = 2
    const length2 = 2
    const length3 = 1
    const initialAngle1 = Math.PI/2 - 1.5
    const initialAngle2 = Math.PI/2 - 1.5
    const initialAngle3 = Math.PI/2 - 1.5

    const mass1 = new GameObject()
    const mass1Body = new RigidBody(mass1)
    const mass2 = new GameObject()
    const mass2Body = new RigidBody(mass2)
    const mass3 = new GameObject()
    const mass3Body = new RigidBody(mass3)

    mass3Body.mass = 0.5
    mass2Body.mass = 1
    mass1Body.mass = 1.5
    mass1Body.damping = 5

    const constraint = new FixedDistanceConstraint(attachmentBody, mass1Body, length)
    const constraint2 = new FixedDistanceConstraint(mass1Body, mass2Body, length2)
    const constraint3 = new FixedDistanceConstraint(mass2Body, mass3Body, length3)

    mass1Body.constraints.push(constraint, constraint2)
    mass2Body.constraints.push(constraint2, constraint3)
    mass3Body.constraints.push(constraint3)

    mass1.translate(length * Math.cos(initialAngle1), length * Math.sin(initialAngle1), 0)
    mass2.translate(mass1.position.x, mass1.position.y, mass1.position.z)
    mass2.translate(length2 * Math.cos(initialAngle2), length2 * Math.sin(initialAngle2), 0)
    mass3.translate(mass2.position.x, mass2.position.y, mass2.position.z)
    mass3.translate(length3 * Math.cos(initialAngle3), length3 * Math.sin(initialAngle3), 0)

    let deltaTime = 0;
    let lastTime = 0;

    let energy = 0;

    const dynamicBodies = [mass1Body, mass2Body, mass3Body]

    function animate(timestamp) {
        deltaTime = timestamp - lastTime
        lastTime = timestamp
        
        for (var i=0; i < substeps; i++) {
            dynamicBodies.forEach((body) => {
                body.updateFree(deltaTime / substeps)
            })
            dynamicBodies.forEach((body) => {
                body.updateConstraints(deltaTime / substeps)
                
            })
        }

        energy = 0
        dynamicBodies.forEach((body) => {
            energy += 0.5*body.mass*Vector3D.dotProduct(body.velocity, body.velocity) - body.mass * body.gravity * 9.81 * body.gameObject.position.y
        })

        console.log(energy)
        canvas2.getContext("2d").clearRect(0,0,canvas2.width,canvas2.height)

        cameraComponent.drawBackground()
        cameraComponent.renderFrame([constraint, constraint2, constraint3, attachmentBody, mass1Body, mass2Body, mass3Body])
        
        requestAnimationFrame(animate)
    }

    animate(0)
})