import { create, querySelectorHTML } from "../utils"
import { playAudioSimple } from "./audio"
import { state } from "./state"

type PopupHeader = {
    content: string,
    classList?: string[]
}

type PopupButtons = {
    text: string,
    onClick: () => void
}

type Popup = {
    header: PopupHeader,
    bodyContent: string,
    buttons: PopupButtons[],
    darkMode?: boolean
}

export function closeCurrentPopup() {
    const popup = querySelectorHTML(".popup")
    const overlay = querySelectorHTML(".popupoverlay")

    popup.classList.add("closing")

    popup.addEventListener("animationend", () => popup.remove())

    overlay.style.opacity = "0"

    setTimeout(() => {
        overlay.remove()
    }, 300);
}

export function popup(obj: Popup) {
    const el = create("div")
    const overlay = create("div")
    const header = create("h1")
    const body = create("div")
    const buttonsrow = create("div")

    overlay.classList.add("popupoverlay", "active")
    el.classList.add("popup")
    header.innerHTML = obj.header.content
    body.innerHTML = obj.bodyContent
    
    if (obj.darkMode) {
        el.classList.add("darkmode")
    }

    buttonsrow.classList.add("row")

    obj.buttons.forEach(btn => {
        const btnEl = create("button")

        btnEl.classList.add("popupbutton")
        btnEl.textContent = btn.text

        buttonsrow.append(btnEl)

        btnEl.addEventListener("click", btn.onClick)
    })

    document.body.append(overlay)
    document.body.append(el)

    el.append(header)
    el.append(body)
    el.append(buttonsrow)

    playAudioSimple({ src: "/audio/woosh1.mp3", volume: state.volume.sfx })
}