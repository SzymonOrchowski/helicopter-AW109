import './style.css'
import Presentation from './Presentation/Presentation'

const parts = []
if(document.URL.includes("?")) {
    const obj = {}

    document.URL.split("?")[1].split("&")[1].split("=").forEach(part => {

        document.URL.split("?")[1].split("&").forEach((param => {
            obj[param.split("=")[0]] = param.split("=")[1]
        }))

    })
    parts.push(obj)
}

// https://aw109-model-visualisation.netlify.app?serial=31094
// ?serial=31094&screen=simple

const presentation = new Presentation(document.querySelector('canvas.webgl'), parts[0])
