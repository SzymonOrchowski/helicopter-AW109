import * as THREE from 'three'

export default class Tooltip
{
    constructor()
    {
        const pointer = new THREE.Vector2();

        this.tooltipPositionX = 100
        this.tooltipPositionY = 100

        this.createTooltip()

        window.addEventListener('mousemove', (event) => {
            event.preventDefault()

            pointer.x = event.clientX
            pointer.y = event.clientY

            this.tooltipPositionX = pointer.x + 15
            this.tooltipPositionY = pointer.y + 15

            this.tooltip.setAttribute('style', `left:${this.tooltipPositionX}px;top:${this.tooltipPositionY}px`)
        })
    }

    createTooltip() {
        this.tooltip = document.createElement("div")
        this.tooltip.setAttribute('id', "tooltip-container")
        this.tooltip.setAttribute('class', "tooltip-hidden")     
        document.body.appendChild(this.tooltip)
    }

}