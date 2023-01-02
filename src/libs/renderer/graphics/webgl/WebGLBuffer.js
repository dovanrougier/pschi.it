
import Buffer from '../../../core/Buffer';
import WebGLNode from './WebGLNode';
import WebGLRenderer from './WebGLRenderer';

export default class WebGLBuffer extends WebGLNode {
    /** Create a WebGLBuffer from a Buffer for a WebGLRenderingContext
     * @param {WebGLRenderer} renderer the context of the renderer
     * @param {Buffer} buffer  Buffer
     * @param {Number} webGLTarget  WebGL target
     */
    constructor(renderer, buffer, webGLTarget) {
        super(renderer, buffer.id);
        this.target = webGLTarget;
        this.location = renderer.gl.createBuffer();
        this.usage = buffer.usage === Buffer.usage.dynamic ? renderer.gl.DYNAMIC_DRAW
            : buffer.usage === Buffer.usage.stream ? renderer.gl.STREAM_DRAW
                : renderer.gl.STATIC_DRAW;

        if (webGLTarget === renderer.gl.ELEMENT_ARRAY_BUFFER) {
            this.update = (buffer) => {
                renderer.elementArrayBuffer = this;
                renderer.gl.bufferData(this.target, buffer.data, this.usage);
            };
        } else {
            this.update = (buffer) => {
                renderer.arrayBuffer = this;
                const data = buffer.data;
                renderer.gl.bufferData(this.target, data, this.usage);
            };
        }
    }

    /** Return whether or not this WebGLBuffer has been created from the Buffer
     * @param {Buffer} buffer  Buffer to compare
     */
    is(buffer) {
        return this.name == buffer.id;
    }

    /** Get the Buffer's WebGLBuffer from a WebGLRenderingContext
     * @param {WebGLRenderer} renderer the rendering context
     * @param {Buffer} buffer the Buffer
     * @param {Number} webGLTarget  WebGL target
     * @returns {WebGLBuffer} the WebGLBuffer
     */
    static from(renderer, buffer, webGLTarget) {
        var mainBuffer = buffer.mainBuffer;
        if(!renderer.nodes[mainBuffer.id]){
            mainBuffer.updated = true;
        }
        const result = renderer.nodes[mainBuffer.id] || new WebGLBuffer(renderer, mainBuffer, webGLTarget);

        if (mainBuffer.updated) {
            result.update(mainBuffer);
            mainBuffer.updated = false;
        };

        return result;
    }
}