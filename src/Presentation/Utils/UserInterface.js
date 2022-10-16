import EventEmitter from "./EventEmitter";

export default class UserInterface extends EventEmitter
{
    constructor()
    {
        super()

        this.createShowDetailsButton()
    }

    createShowDetailsButton()
    {
        const detailedScreenLink = document.createElement('button')
        detailedScreenLink.setAttribute('id', 'showDetails-button')
        detailedScreenLink.onclick = () => {window.open('https://github.com/SzymonOrchowski/three.js-charts-presentation')}
        detailedScreenLink.innerHTML = 'Show Details'
        document.body.appendChild(detailedScreenLink)
    }
}