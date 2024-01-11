export default class InputHandler {
    constructor() {
        this.keyDown = ""
        this.keyUp = ""
        this.heldKeys = new Set()

        window.addEventListener("keydown", (e) => {
            this.keyDown = e.key
            this.heldKeys.add(e.key)
        })

        window.addEventListener("keyup", (e) => {
            this.keyUp = e.key
            this.heldKeys.delete(e.key)
        })        
    }
}