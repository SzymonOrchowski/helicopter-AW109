import * as THREE from 'three'
import Presentation from "../Presentation"
import Environment from './Environment'
import Engine from './Engine.js'
import { Vector2 } from 'three'

export default class World
{
    constructor()
    {
        this.presentation = new Presentation()
        this.scene = this.presentation.scene
        this.resources = this.presentation.resources

        this.environment = new Environment()

        this.animationSpeed = 0
        this.alertsArray = this.presentation.parts

        // const axesHelper = new THREE.AxesHelper()
        // this.scene.add(axesHelper)

        //this.visibilityGroupsArray = ["rig", "engine", "cooling"]
        //this.rigPartsArray = ["BarL", "BarR", "Front_Bar", "MountFL", "MountRL", "MountRR", "MountFR", "Rear_Bar"]
        //this.enginePartsArray = ["Electronics", "Engine", "EngineBack", "EngineBack001", "EngineFront", "OutputBack"]
        //this.coolingPartsArray = ["CoolerBack", "CoolerFront", "Elbow_Joint001", "Elbow_Joint002", "Elbow_Joint003", "Elbow_Joint004", "Elbow_Joint005", "Elbow_Joint006", "Elbow_Joint007", "Elbow_Joint008", "FrontCompressor", "HeatExtractor", "Pipe", "Tee_Joint"]

        this.resources.on('ready', () =>
        {
            this.engine = new Engine()

            this.engine.model.position.y = -0.15
            this.engine.model.rotation.y = 120 * 180 / Math.PI
            this.engine.model.scale.set(0.008, 0.008, 0.008)

            // console.log(this.engine.model.children)
            //this.engine.model.children[0].visible = false
            //this.engine.model.children[1].visible = false
            //this.engine.model.children[2].visible = false
            //this.engine.model.children[3].visible = false
            //this.engine.model.children[4].visible = false
            //this.engine.model.children[5].visible = false

        })

    }

    update()
    {
        if(this.engine)
        {
            this.engine.model.rotation.y += this.animationSpeed
        }
    }

    updateVisibilityState()
    {
        if(this.engine)
        {
            this.engine.model.children.forEach(part => {
                part.material.opacity = 0.1

                if (this.visibilityGroupsArray.includes("rig")) {
                    if(this.rigPartsArray.includes(part.name)){
                        part.material.opacity = 1
                    }
                }
                if (this.visibilityGroupsArray.includes("engine")) {
                    if(this.enginePartsArray.includes(part.name)){
                        part.material.opacity = 1
                    }
                }
                if (this.visibilityGroupsArray.includes("cooling")) {
                    if(this.coolingPartsArray.includes(part.name)){
                        part.material.opacity = 1
                    }
                }
            })
        }
    }
}
