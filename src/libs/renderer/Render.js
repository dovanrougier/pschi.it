import Buffer from '../core/Buffer';
import Node from '../core/Node';
import Material from './Material';

export default class Render extends Node {
    /** Create a Renderable Node for a Renderer
     */
    constructor() {
        super();
        this.primitive = null;
        this.material = null;
        this.vertexBuffer = null;
        this.parameters = {};
        this.index = null;
        this.count = 0;
        this.offset = 0;
    }

    get renderable() {
        return this.material && this.material.culling != Material.culling.hidden 
            && (this.count > 0 || this.vertexBuffer?.count > 0);
    }

    setParameter(name, value) {
        this.parameters[name] = value;
    }

    static primitive = {
        points: 'POINTS',
        triangles: 'TRIANGLES',
        triangleFan: 'TRIANGLE_FAN',
        triangleStrip: 'TRIANGLE_STRIP',
        lines: 'LINES',
        lineLoop: 'LINE_FAN',
        lineStrip: 'LINE_STRIP',
    };
}