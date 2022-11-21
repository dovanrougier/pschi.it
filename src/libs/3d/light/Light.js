import Node3d from'../Node3d';

export default class  Light extends Node3d {
    constructor(color) {
        super();
        this.color = color;
    }
    static lightColorName = 'lightColor';
}