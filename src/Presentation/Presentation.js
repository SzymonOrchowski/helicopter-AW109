import * as THREE from 'three'
import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Resources from './Utils/Resources'
import Outline from './Outline'
import UserInterface from './Utils/UserInterface'

// const sources = [
//     {
//         name: 'engineModel',
//         type: 'fbxModel',
//         path: 'models/EngineDemo.fbx'
//     }
// ]

// const sources = [
//         {
//             name: 'engineModel',
//             type: 'fbxModel',
//             path: 'models/AgustaDaVinci.FBX'
//         }
//     ]

// const sources = [
//     {
//         name: 'engineModel',
//         type: 'fbxModel',
//         path: 'models/AW139D.FBX'
//     }
// ]

const sources = [
    {
        name: 'engineModel',
        type: 'gltfModel',
        path: 'models/AW139D.gltf'
    }
]

let instance = null

export default class Presentation
{
    constructor(_canvas, _parts)
    {
        if(instance)
        {
            return instance
        }
        instance = this

        this.canvas = _canvas
        this.parts = _parts

        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        // this.outline = new Outline()
        // this.userInterface = new UserInterface()

        this.sizes.on('resize', () => {
            this.resize()
        })

        this.time.on('tick', () => {
            this.update()
        })

        // this.userInterface.on('changeAnimationState', () => {
        //     this.changeAnimationState()
        // })

        // this.userInterface.on('rig-selector-visibility-state-change', () => {
        //     this.changeVisibility("rig")
        // })

        // this.userInterface.on('engine-selector-visibility-state-change', () => {
        //     this.changeVisibility("engine")
        // })

        // this.userInterface.on('cooling-selector-visibility-state-change', () => {
        //     this.changeVisibility("cooling")
        // })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
        // this.outline.update()
    }

    changeAnimationState()
    {
        if(this.world.animationSpeed > 0)
        {
            document.getElementById('animationState-button').innerHTML = 'Run the animation'
            this.world.animationSpeed = 0   
        }
        else
        {
            document.getElementById('animationState-button').innerHTML = 'Stop the animation'
            this.world.animationSpeed = 0.004
        }
    }

    changeVisibility(groupName)
    {
        if(this.world.visibilityGroupsArray.includes(groupName)){
            const index = this.world.visibilityGroupsArray.indexOf(groupName)
            this.world.visibilityGroupsArray.splice(index, 1)
            this.world.updateVisibilityState()
        } else {
            this.world.visibilityGroupsArray.push(groupName)
            this.world.updateVisibilityState()
        }
    }
}