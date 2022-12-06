import GraphicsNode from './GraphicsNode';

export default class Material extends GraphicsNode {
    /** Create a new Material
    */
    constructor(){
        super();

        this.culling = Material.culling.back;
        this.depth = Material.depth.less;
        this.fog = true;
        this.compiled = false;
    }

    get texture() {
        return this.parameters[Material.textureName];
    }

    set texture(v) {
        this.setParameter(Material.textureName, v);
    }

    setParameter(name, value) {
        this.parameters[name] = value;
    }

    setScene(scene){
    }

    static textureName = 'texture';

    static culling = {
        front: 'front',
        back: 'back',
        doubleside: 'doubleside'
    }

    static depth = {
        never: '',
        always:'',
        equal:'',
        notEqual:'',
        less: '',
        lessEqual:'',
        greater: '',
        greaterEqual:'',
    }
}