import { create, querySelectorHTML } from "../utils"
import { playRandomAudio } from "./audio"

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
    playRandomAudio([
        "glass", "glass", "shotgun", "shotgun", "squish02", "squish01"
    ])
    // playAudioSimple({ src: "/audio/glass.mp3", volume: state.volume.sfx })

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
    buttonsrow.style.gap = "15px"

    obj.buttons.forEach(btn => {
        const btnEl = create("button")

        btnEl.classList.add("popupbutton")
        btnEl.textContent = btn.text

        buttonsrow.append(btnEl)

        btnEl.addEventListener("click", btn.onClick)

        if (obj.darkMode) {
            btnEl.classList.add("darkmode")
        }
    })

    document.body.append(overlay)
    document.body.append(el)

    el.append(header)
    el.append(body)
    el.append(buttonsrow)

    playRandomAudio([
        "woosh01", "pop02", "clang01"
    ])

    // playAudioSimple({ src: "/audio/woosh1.mp3", volume: state.volume.sfx })
}