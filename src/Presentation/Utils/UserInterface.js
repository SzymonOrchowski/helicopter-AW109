import EventEmitter from "./EventEmitter";

import Presentation from "../Presentation"

export default class UserInterface extends EventEmitter
{
    constructor(serial)
    {
        super()
    }

    createShowDetailsButton(serial)
    {
        const detailedScreenLink = document.createElement('button')
        detailedScreenLink.setAttribute('id', 'showDetails-button')
        detailedScreenLink.onclick = () => {window.open(`http://ec2-34-244-143-219.eu-west-1.compute.amazonaws.com:8080/dashboards/#96054cad-6e19-2b84-5c3f-b0c5ef803ae1?viewstate={%22selected_unit%22:%22${serial}%22}`, "_top")}
        detailedScreenLink.innerHTML = 'Show Details'
        document.body.appendChild(detailedScreenLink)
    }

    createStopAnimationButton()
    {
        const optionsContainer = document.createElement("div")
        optionsContainer.setAttribute('id', 'options-container')

        const changeAnimationState = document.createElement("BUTTON")
        changeAnimationState.innerHTML = 'Stop the animation.'
        changeAnimationState.setAttribute('id', 'animationState-button')
        changeAnimationState.setAttribute('class', 'options-button')
        changeAnimationState.onclick = () => { this.trigger('changeAnimationState')}
        optionsContainer.appendChild(changeAnimationState)

        document.body.appendChild(optionsContainer)
    }
}