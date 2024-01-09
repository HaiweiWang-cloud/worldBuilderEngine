export default class Vector3D {
    constructor(vx, vy, vz) {
        this.x = vx;
        this.y = vy;
        this.z = vz;
    }

    length() {
        Math.sqrt(Vector3D.dotProduct(this, this))
    }

    scale(alpha) {
        return new Vector3D(this.x * alpha, this.y * alpha, this.z * alpha)
    }

    add(vector) {
        return new Vector3D(this.x+vector.x, this.y+vector.y, this.z+vector.z)
    }

    subtract(vector) {
        return new Vector3D(this.x-vector.x, this.y-vector.y, this.z-vector.z)
    }

    project(vector) {
        return vector.scale(Vector3D.dotProduct(this, vector) / Vector3D.dotProduct(vector, vector))
    }

    rotateZ(angle) {
        return new Vector3D(this.x * Math.cos(angle) + this.y * Math.sin(angle), this.y * Math.cos(angle) - this.x * Math.sin(angle), this.z)
    }

    static dotProduct(vector1, vector2) {
        return (vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z)
    }

    static crossProduct(vector1, vector2) {
        return new Vector3D(vector1.y * vector2.z - vector1.z * vector2.y, vector1.z * vector2.x - vector1.x * vector2.z, vector1.x * vector2.y - vector1.y * vector2.x)
    }
}