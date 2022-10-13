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

        this.resources.on('ready', () =>
        {
            this.engine = new Engine()

            this.engine.model.children.forEach(section => {
                section.children.forEach(part => {
                    part.material = part.material.clone()
                })
            })

            // this.engine.model.children.forEach(section => {
            //     console.log(section.children.map(part => {return part.material.uuid}))
            // })


            // this.engine.model.children.forEach(section => {
            //     this.presentation.outline.selectedObjects.push(section)
            // })
            // console.log(this.presentation.outline.selectedObjects)

            this.engine.model.position.y = -0.15
            this.engine.model.rotation.y = 120 * 180 / Math.PI
            this.engine.model.scale.set(0.008, 0.008, 0.008)
        })

    }

    update()
    {
        if(this.engine)
        {
            // this.engine.model.rotation.y += 0.01
            // console.log(this.engine.model.children[3])
            // this.engine.model.children[2].rotation.y+=0.05
            // this.engine.model.children[3].rotation.z+=0.1
        }
    }

    animateBlades()
    {
        if(this.engine)
        {
            this.engine.model.children[2].rotation.y += 0.05
            this.engine.model.children[3].rotation.z += 0.1
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
