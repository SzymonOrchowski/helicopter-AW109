import * as THREE from "three";
import { RenderPass, EffectComposer, OutlinePass } from "three-outlinepass"


import Presentation from './Presentation'

export default class Outline
{
    constructor()
    {
        this.presentation = new Presentation()
        this.scene = this.presentation.scene
        this.renderer = this.presentation.renderer.instance
        this.camera = this.presentation.camera.instance

        this.compose = new EffectComposer(this.renderer);
        this.selectedObjects = []
        this.renderPass = new RenderPass(this.scene, this.camera);
        this.outlinePass = new OutlinePass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            this.scene,
            this.camera,
            this.selectedObjects
          );
        
        this.compose.addPass(this.renderPass)
        this.compose.addPass(this.outlinePass)

        let params = {
            edgeStrength: 5,
            edgeGlow: 0.4,
            edgeThickness: 5.0,
            pulsePeriod: 1,
            usePatternTexture: false
        };
        
        this.outlinePass.edgeStrength = params.edgeStrength;
        this.outlinePass.edgeGlow = params.edgeGlow;
        this.outlinePass.visibleEdgeColor.set(0xffffff);
        this.outlinePass.hiddenEdgeColor.set(0xffffff);

    }

    update()
    {
        this.compose.render()
    }
}