import * as THREE from 'three'
import Presentation from "../Presentation"
import Environment from './Environment'
import Engine from './Engine.js'

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
            // this.presentation.outline.selectedObjects.push(this.engine.model)
            // this.engine.model.position.x = 0
            // this.engine.model.position.y = 2
            this.engine.model.position.x = 0.1
            // console.log(this.engine.model.children)
            this.engine.model.children.forEach(part => {
                //part.meterial = new THREE.MeshPhongMaterial()
                part.material.forEach(subpart => {
                    console.log(subpart.emissive)
                })
                // part.material.shininess = 0
            //     part.material.color.r = 0.2
            //     part.material.color.g = 0.2
            //     part.material.color.b = 0.3
            //     part.material.transparent = true


            //     part.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0,1,0))
            //     this.alertsArray.forEach(alertName => {
            //         if (part.name === alertName)
            //         {
            //             part.material.color.r = 0.4
            //             part.material.color.g = 0.0
            //             part.material.color.b = 0.0
            //         }
            //     })

            //     //this.updateVisibilityState()
            })
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