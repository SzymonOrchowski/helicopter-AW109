import * as THREE from 'three'
import EventEmitter from "./EventEmitter"

import Presentation from "../Presentation"
import { Group } from 'three'

export default class Raycaster extends EventEmitter
{
    constructor()
    {
        super()

        this.presentation = new Presentation()
        this.camera = this.presentation.camera.instance
        this.scene = this.presentation.scene

        const pointer = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();

        window.addEventListener('mousemove', (event) => {
            event.preventDefault()

            pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            //const mouse3D = new THREE.Vector3( (event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerheight) * 2 - 1, 0.5 )

            raycaster.setFromCamera( pointer, this.camera );

            const sections = this.scene.children[3].children

            const intersects = raycaster.intersectObjects( this.scene.children[3].children);

            intersects.sort((a,b) => {
                if (a.distance < b.distance) return -1
                if (a.distance > b.distance) return 1
                return 0
            })

            sections.forEach(section => {
                // section.visible = false
                section.children.forEach(part => {
                    // console.log()
                    // console.log(part.material.name)
                    if (part.material.name==='glass') {
                        part.material.color.r=0
                        part.material.color.g=0
                        part.material.color.b=0
                    }
                    if (part.material.name==='black') {
                        part.material.color.r=0.01960800029337406
                        part.material.color.g=0.01960800029337406
                        part.material.color.b=0.01960800029337406
                    }
                    if (part.material.name==='paint') {
                        part.material.color.r=1
                        part.material.color.g=1
                        part.material.color.b=1
                    }
                    if (part.material.name==='metall_brush') {
                        part.material.color.r=0
                        part.material.color.g=0
                        part.material.color.b=0
                    }
                    if (part.material.name==='interior') {
                        part.material.color.r=0.9647060036659241
                        part.material.color.g=0.9098039865493774
                        part.material.color.b=0.8633099794387817
                    }
                    if (part.material.name==='chrom') {
                        part.material.color.r=0
                        part.material.color.g=0
                        part.material.color.b=0
                    }
                })
                // section.material.color.r=1
                // section.material.color.g=1
                // section.material.color.b=1
            })

            // sections[0].children.forEach(part => {
            //     if (part.material.name === 'paint') {
            //         part.material.color.r=0
            //         part.material.color.g=0
            //         part.material.color.b=0
            //     }
            // })

            if (intersects.length > 0) {
                console.log(intersects[0].object.parent.name)
                intersects[0].object.parent.children.forEach(mesh => {
                           mesh.material.color.r=1
                           mesh.material.color.g=0
                           mesh.material.color.b=0
                        })
            } 
            
            this.trigger('raycaster')
        })
    }
}