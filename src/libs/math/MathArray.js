export default class MathArray extends Float32Array {
    constructor(length) {
        super(length);
    }

    /** Return whether or not a Matrix4 array is equals the current Matrix4
     * @param {MathArray} mathArray the matrix to compare
     * @return {Boolean} true if matrices are equals
    */
    equals(mathArray) {
        return mathArray.every((e, i) => e == this[i]);
    }

    clone() {
        return new this.constructor(this);
    }

    concat(data) {
        const result = new MathArray(this.length + data.length);

        result.set(this);
        result.set(data, this.length);

        return result;
    }

    toint8(){
        return new Int8Array(this);
    }

    toint16(){
        return new Int16Array(this);
    }

    toint32(){
        return new Int32Array(this);
    }

    toUint8(){
        return new Uint8Array(this);
    }

    toUint16(){
        return new Uint16Array(this);
    }

    toUint32(){
        return new Uint32Array(this);
    }

    toUint8Clamped(){
        return new Uint8ClampedArray(this);
    }

    static clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    /** Convert radians to degrees
     * @param {Number} radian Angle in radians
     * @return {Number} angle in degrees
    */
    static toDegree(radian) {
        return radian * 180 / Math.PI;
    }

    /** Convert degrees to radians
     * @param {Number} degree Angle in degrees
     * @return {Number} angle in radians
    */
    static toRadian(degree) {
        return Math.PI * (degree) / 180.0;
    }
}