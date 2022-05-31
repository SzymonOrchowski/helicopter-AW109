import * as THREE from 'three'
import Presentation from '../Presentation'

export default class Environment
{
    constructor()
    {
        this.presentation = new Presentation
        this.scene = this.presentation.scene

        this.setSunLight()
    }

    setSunLight()
    {
        // Light 1
        this.sunLight = new THREE.DirectionalLight('#ffffff', 0.7)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(-3.5, 2, 2)
        this.scene.add(this.sunLight)

        // Light 2
        this.ambientLight = new THREE.AmbientLight('#ffffff', 0.1)
        this.scene.add(this.ambientLight)
    }
}