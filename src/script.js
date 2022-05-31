import './style.css'
import Presentation from './Presentation/Presentation'

const parts = []
if(document.URL.includes("?")) {
    document.URL.split("?")[1].split("=")[1].split(",").forEach(part => {
        parts.push(part)
    })
}

const presentation = new Presentation(document.querySelector('canvas.webgl'), parts)
