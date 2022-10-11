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

            this.engine.model.children[0].children.forEach(part => {
                if (part.material.name==="paint") {
                    part.material.color.r = 1
                    part.material.color.g = 1
                    part.material.color.b = 1

                    part.material.map = this.resources.items.colorMapTexture

                    this.resources.items.colorMapTexture.offset = new Vector2(0.5,0.5)

                    console.log(this.resources.items.colorMapTexture.offset)
                }
            })

            this.engine.model.position.y = -0.12
            // this.engine.model.rotation.x = 40 * 180 / Math.PI
            this.engine.model.rotation.y = 120 * 180 / Math.PI

            this.engine.model.scale.set(0.007, 0.007, 0.007)
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

// Tee_Joint
// Pipe
// MountRR
// EngineFront
// FrontCompressor
// Elbow_Joint002
// MountRL
// Elbow_Joint003
// Elbow_Joint004
// HeatExtractor
// EngineBack001
// Front_Bar
// BarL
// Engine
// OutputBack
// Elbow_Joint007
// MountFR
// Elbow_Joint005
// CoolerBack
// BarR
// EngineBack
// Elbow_Joint008
// Electronics
// Elbow_Joint006
// Elbow_Joint001
// CoolerFront
// Rear_Bar
// MountFL