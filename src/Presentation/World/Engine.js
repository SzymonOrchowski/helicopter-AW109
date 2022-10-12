import * as THREE from 'three'
import Presentation from '../Presentation.js'

export default class Engine
{
    constructor()
    {
        this.presentation = new Presentation()
        this.scene = this.presentation.scene
        this.resources = this.presentation.resources
        this.time = this.presentation.time

        // Resource
        this.resource = this.resources.items.engineModel
        this.setModel()
    }

    setModel()
    {
        //console.log(this.resource.scene)
        //this.model = this.resource.scene.children[0]
        this.model = this.resource.scene

        // console.log(this.model)

        this.scene.add(this.model)

        this.model.traverse((child) =>
            {
                if(child instanceof THREE.Mesh)
                {
                    child.castShadow = true
                }
            })

        // this.model.forEach(part => {
        //     this.scene.add(part)
        // })

        // this.model.forEach(part => {
        //     part.traverse((child) =>
        //     {
        //         if(child instanceof THREE.Mesh)
        //         {
        //             child.castShadow = true
        //         }
        //     })
        // })
    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}