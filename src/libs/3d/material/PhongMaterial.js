import Material from '../../renderer/Material';

export default class PhongMaterial extends Material {
    constructor() {
        super();
        this.shininess = 32;
    }
    static shininessName = "materialShininess";
}