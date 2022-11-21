import GLSLShader from'../shader/GLSL/GLSLShader';
import Shader from'../shader/Shader';
import WebGLNode from'./WebGLNode';
import WebGLRenderer from'./WebGLRenderer';

export default class  WebGLShader extends WebGLNode {
    /** Create a WebGLShader from a Shader for a WebGLRenderingContext
     * @param {WebGLRenderer} renderer the context of the renderer
     * @param {Shader} shader  associated Shader
     */
    constructor(renderer, shader) {
        super(renderer, shader.id);
        if (shader instanceof GLSLShader) {
            this.location = renderer.gl.createShader(renderer.gl[shader.type]);
            renderer.gl.shaderSource(this.location, shader.source);
            renderer.gl.compileShader(this.location);
            const success = renderer.gl.getShaderParameter(this.location, renderer.gl.COMPILE_STATUS);
            if (!success) {
                const error = new Error(`Failed to create ${shader.type} :\n${renderer.gl.getShaderInfoLog(this.location)}\n\n${shader.source}`);
                renderer.removeChild(this);
                throw error;
            }
        }
    }
}