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

            raycaster.setFromCamera( pointer, this.camera );

            const sections = this.scene.children[3].children

            const intersects = raycaster.intersectObjects( this.scene.children[3].children);

            intersects.sort((a,b) => {
                if (a.distance < b.distance) return -1
                if (a.distance > b.distance) return 1
                return 0
            })

            document.getElementById('tooltip-container').innerHTML = ''
            document.getElementById('tooltip-container').className = "tooltip-hidden"

            sections.forEach(section => {
                section.children.forEach(part => {
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
            })

            if (intersects.length > 0) {

                const tooltip = document.getElementById('tooltip-container')

                let sectionName = intersects[0].object.parent.name

                sectionName = sectionName.split('_').map((name) => {return name[0].toUpperCase() + name.slice(1)}).join('')
               
                if (intersects[0].object.parent.name != 'Body') {
                    tooltip.innerHTML = `<h3>${sectionName}</h3>`
                    tooltip.className = "tooltip-visible"

                    intersects[0].object.parent.children.forEach(mesh => {
                            mesh.material.color.r=1
                            mesh.material.color.g=0
                            mesh.material.color.b=0
                            })
                }
            } 
            
            this.trigger('raycaster')
        })

        window.addEventListener('mousedown', (event) => {
            event.preventDefault()

            pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            raycaster.setFromCamera( pointer, this.camera );

            const sections = this.scene.children[3].children

            const intersects = raycaster.intersectObjects( this.scene.children[3].children);

            intersects.sort((a,b) => {
                if (a.distance < b.distance) return -1
                if (a.distance > b.distance) return 1
                return 0
            })

            if (intersects.length > 0) {
                if (intersects[0].object.parent.name != 'Body') {
                    document.getElementById('landing-gear-info').className = "invisible"
                    document.getElementById('main-rotor-info').className = "invisible"
                    document.getElementById('tail-rotor-info').className = "invisible"
                    document.getElementById('nose-info').className = "invisible"
                    document.getElementById('upper-deck-info').className = "invisible"
                }

                if(intersects[0].object.parent.name==='LandingGear') {
                    document.getElementById('landing-gear-info').className = "visible"
                } 
                if(intersects[0].object.parent.name==='Main_rotor') {
                    document.getElementById('main-rotor-info').className = "visible"
                } 
                if(intersects[0].object.parent.name==='Tail_Rotor') {
                    document.getElementById('tail-rotor-info').className = "visible"
                } 
                if(intersects[0].object.parent.name==='Nose') {
                    document.getElementById('nose-info').className = "visible"
                } 
                if(intersects[0].object.parent.name==='UpperDeck') {
                    document.getElementById('upper-deck-info').className = "visible"
                } 
            } 
        })

        let touchedComponent
        let timeOut

        window.addEventListener('touchstart', (event) => {
            event.preventDefault()

            pointer.x = ( event.touches[0].clientX / window.innerWidth ) * 2 - 1;
			pointer.y = - ( event.touches[0].clientY / window.innerHeight ) * 2 + 1;

            raycaster.setFromCamera( pointer, this.camera );

            const sections = this.scene.children[3].children

            const intersects = raycaster.intersectObjects( this.scene.children[3].children);

            intersects.sort((a,b) => {
                if (a.distance < b.distance) return -1
                if (a.distance > b.distance) return 1
                return 0
            })

            document.getElementById('tooltip-container').innerHTML = ''
            document.getElementById('tooltip-container').className = "tooltip-hidden"

            sections.forEach(section => {
                section.children.forEach(part => {
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
            })

            if (intersects.length > 0) {

                const tooltip = document.getElementById('tooltip-container')

                let sectionName = intersects[0].object.parent.name

                sectionName = sectionName.split('_').map((name) => {return name[0].toUpperCase() + name.slice(1)}).join('')
               
                if (intersects[0].object.parent.name != 'Body') {
                    tooltip.innerHTML = `<h3>${sectionName}</h3>`
                    tooltip.className = "tooltip-visible"

                    intersects[0].object.parent.children.forEach(mesh => {
                            mesh.material.color.r=1
                            mesh.material.color.g=0
                            mesh.material.color.b=0
                            })
                }
            }

            timeOut = setTimeout(()=>{
                touchedComponent=intersects[0].object.parent.name
            },1000)
        })

        window.addEventListener('touchend', (event) => {
            if (touchedComponent) {
                event.preventDefault()

                pointer.x = ( event.touches[0].clientX / window.innerWidth ) * 2 - 1;
                pointer.y = - ( event.touches[0].clientY / window.innerHeight ) * 2 + 1;
    
                raycaster.setFromCamera( pointer, this.camera );
    
                const sections = this.scene.children[3].children
    
                const intersects = raycaster.intersectObjects( this.scene.children[3].children);
    
                intersects.sort((a,b) => {
                    if (a.distance < b.distance) return -1
                    if (a.distance > b.distance) return 1
                    return 0
                })
    
                if (intersects.length > 0) {
                    if (intersects[0].object.parent.name != 'Body') {
                        document.getElementById('landing-gear-info').className = "invisible"
                        document.getElementById('main-rotor-info').className = "invisible"
                        document.getElementById('tail-rotor-info').className = "invisible"
                        document.getElementById('nose-info').className = "invisible"
                        document.getElementById('upper-deck-info').className = "invisible"
                    }
    
                    if(intersects[0].object.parent.name==='LandingGear') {
                        document.getElementById('landing-gear-info').className = "visible"
                    } 
                    if(intersects[0].object.parent.name==='Main_rotor') {
                        document.getElementById('main-rotor-info').className = "visible"
                    } 
                    if(intersects[0].object.parent.name==='Tail_Rotor') {
                        document.getElementById('tail-rotor-info').className = "visible"
                    } 
                    if(intersects[0].object.parent.name==='Nose') {
                        document.getElementById('nose-info').className = "visible"
                    } 
                    if(intersects[0].object.parent.name==='UpperDeck') {
                        document.getElementById('upper-deck-info').className = "visible"
                    } 
                } 
            } else {
                clearTimeout(timeOut)
            }
        })
    }
}