import * as THREE from 'three'
import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Resources from './Utils/Resources'
import Outline from './Outline'
import UserInterface from './Utils/UserInterface'
import Raycaster from './Utils/Raycaster'
import Tooltip from './Utils/Tooltip'

const serialNumbersDictionary = {
    "31094":"GuardiaDiFinanza",
    "31293":"GuardiaCostiera",
    "31301":"GuardiaDiFinanza",
    "31303":"GuardiaCostiera",
    "31313":"GuardiaCostiera",
    "31329":"GuardiaCostiera",
    "31413":"AeronauticaMilitare",
    "31427":"AeronauticaMilitare",
    "31434":"AeronauticaMilitare",
    "31439":"AeronauticaMilitare"
}

const sources = [
    {
        "AeronauticaMilitare":
        {
            name: 'engineModel',
            type: 'gltfModel',
            path: 'models/AW139D-AeronauticaMilitare/AW139Dparts.gltf'
        }
    },
    {
        "GuardiaCostiera":
        {
            name: 'engineModel',
            type: 'gltfModel',
            path: 'models/AW139D-GuardiaCostiera/AW139Dparts.gltf'
        }
    },
    {
        "GuardiaDiFinanza":
        {
            name: 'engineModel',
            type: 'gltfModel',
            path: 'models/AW139D-GuardiaDiFinanza/AW139Dparts.gltf'
        }
    },
    {
        "default":
        {
            name: 'engineModel',
            type: 'gltfModel',
            path: 'models/AW139D/AW139Dparts.gltf'
        }
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
        this.operator = _parts

        
        let operatorName = serialNumbersDictionary[this.operator.serial]
        // console.log(operatorName)

        if (!operatorName) { 
            operatorName = "default"
        }

        const filteredSources = sources.filter(source => Object.keys(source)[0] === operatorName)
        
        // console.log(filteredSources)
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(Object.values(filteredSources[0]))
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.UserInterface = new UserInterface(this.operator.serial)

        if (this.operator.screen === 'detailed') {
            this.raycaster = new Raycaster()
            this.tooltip = new Tooltip()
            this.UserInterface.createStopAnimationButton()
        } else {
            this.UserInterface.createShowDetailsButton()
        }


        // console.log(this.tooltip)

        this.sizes.on('resize', () => {
            this.resize()
        })

        this.time.on('tick', () => {
            this.update()
        })
        
        this.UserInterface.on('changeAnimationState', () => {
            this.changeAnimationState()
        })
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
        // this.world.animateBlades()
        if (this.operator.screen === 'detailed') {
            this.world.rotateHelicopter()
        }
        this.renderer.update()
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