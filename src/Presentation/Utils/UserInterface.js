import EventEmitter from "./EventEmitter";

import Presentation from "../Presentation"

export default class UserInterface extends EventEmitter
{
    constructor(serial)
    {
        super()
        this.createShowDetailsButton(serial)
    }

    createShowDetailsButton(serial)
    {
        const detailedScreenLink = document.createElement('button')
        detailedScreenLink.setAttribute('id', 'showDetails-button')
        detailedScreenLink.onclick = () => {window.location.replace(`http://ec2-34-244-143-219.eu-west-1.compute.amazonaws.com:8080/dashboards/#96054cad-6e19-2b84-5c3f-b0c5ef803ae1?viewstate={%22selected_unit%22:%22${serial}%22}`)}
        detailedScreenLink.innerHTML = 'Show Details'
        document.body.appendChild(detailedScreenLink)
    }
}