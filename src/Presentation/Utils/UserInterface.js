import EventEmitter from "./EventEmitter";

export default class UserInterface extends EventEmitter
{
    constructor()
    {
        super()
        
        this.createOptions()
        // this.createGitHubLink()
    }

    createOptions()
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

        //Groups selector
        const groupsVisibility = document.createElement('div')
        groupsVisibility.setAttribute('id', 'groupsVisibility_container')
        const groupsVisibilityTitle = document.createElement('h3')
        groupsVisibilityTitle.innerHTML = "Show/Hide"
        groupsVisibility.appendChild(groupsVisibilityTitle)
        
        // Rig selector
        const group1 = document.createElement('div')
        const group1Input = document.createElement('input')
        group1Input.setAttribute('type', 'checkbox')
        group1Input.setAttribute('id', 'rig-selector')
        group1Input.setAttribute('name', 'rig-selector')
        group1Input.checked = true
        group1Input.onclick = () => { this.trigger('rig-selector-visibility-state-change')}
        group1.appendChild(group1Input)
        const group1Label = document.createElement('label')
        group1Label.setAttribute("for", 'rig-selector')
        group1Label.innerHTML = "Rig"
        group1.appendChild(group1Label)
        
        groupsVisibility.appendChild(group1)

        // Engine selector
        const group2 = document.createElement('div')
        const group2Input = document.createElement('input')
        group2Input.setAttribute('type', 'checkbox')
        group2Input.setAttribute('id', 'engine-selector')
        group2Input.setAttribute('name', 'engine-selector')
        group2Input.checked = true
        group2Input.onclick = () => { this.trigger('engine-selector-visibility-state-change')}
        group2.appendChild(group2Input)
        const group2Label = document.createElement('label')
        group2Label.setAttribute("for", 'engine-selector')
        group2Label.innerHTML = "Engine"
        group2.appendChild(group2Label)
        
        groupsVisibility.appendChild(group2)

        // Cooling selector

        const group3 = document.createElement('div')
        const group3Input = document.createElement('input')
        group3Input.setAttribute('type', 'checkbox')
        group3Input.setAttribute('id', 'cooling-selector')
        group3Input.setAttribute('name', 'cooling-selector')
        group3Input.checked = true
        group3Input.onclick = () => { this.trigger('cooling-selector-visibility-state-change')}
        group3.appendChild(group3Input)
        const group3Label = document.createElement('label')
        group3Label.setAttribute("for", 'cooling-selector')
        group3Label.innerHTML = "Cooling"
        group3.appendChild(group3Label)
        
        groupsVisibility.appendChild(group3)

        //

        document.body.appendChild(groupsVisibility)
    }

    createGitHubLink()
    {
        const gitHubButton = document.createElement('button')
        gitHubButton.setAttribute('id', 'gitHub-button')
        gitHubButton.onclick = () => {window.open('https://github.com/SzymonOrchowski/three.js-charts-presentation')}
        gitHubButton.innerHTML = '<img src="img/GithubIcon.png" id="gitHub-img"></img>'
        document.body.appendChild(gitHubButton)
    }
}