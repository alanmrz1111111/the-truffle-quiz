import { playAudio } from "./core/audio";
import { particles } from "./core/particles";
import { closeCurrentPopup, popup } from "./core/popup";
import { state } from "./core/state";
import { clearBombInterval } from "./etc/showQuestion";
import { appendToCont, create, createBoom, date, qsaHTML, querySelectorHTML, randFloat, Vec2, wait } from "./utils";

type CarrotPowerupProps = {
    position: Vec2,
    usePercentages?: boolean
    slot: number
}

const carrotSlots = qsaHTML(".carrotslot")

carrotSlots.forEach(slot => {
    manageCarrotSlot(slot)

    slot.addEventListener("click", () => onCarrotSlot(slot))
})

function onCarrotSlot(slotEl: HTMLElement) {
    if (slotEl.getAttribute("populated") == "false") {
        playAudio({ id: "clank" })
        playAudio({ id: "nope" })
        slotEl.classList.add("nope")

        setTimeout(() => {
            slotEl.classList.remove("nope")
        }, 300);

        return
    }

    destroyBomb(slotEl)
}

function manageCarrotSlot(slotEl: HTMLElement) {
    slotEl.style.animationDuration = `${randFloat(0.8, 1.2)}s`
}

export async function getCarrot({ position, slot, usePercentages = false }: CarrotPowerupProps) {
    playAudio({ id: "pop01" })
    playAudio({ id: "crazy01" })

    const el = create("div")
    el.classList.add("carrot")

    el.style.top = `${position.y}px`
    el.style.left = `${position.x}px`

    if (usePercentages) {
        el.style.top = `${position.y}%`
        el.style.left = `${position.x}%`
    }

    appendToCont(el)

    await wait(1250)

    el.classList.add("active")
    playAudio({ id: "clank" })
    playAudio({ id: "screech" })

    await wait(600)

    el.style.top = `50%`
    el.style.left = `50%`
    el.classList.add("finalplace")

    el.addEventListener("animationend", el.remove)

    await wait(200)

    const slotEl = querySelectorHTML(`.carrotslot[data-cslot='${slot}']`)

    slotEl.setAttribute("populated", "true")

    slotEl.classList.add("active")

    const slotRect = slotEl.getBoundingClientRect()
    let color = "#ff8827ff"

    if (state.currentColorPalette == "allwhite") {
        color = "#ffffff62"
    } else if (state.currentColorPalette == "darkpurple") {
        color = "#37006bc0"
    }

    particles({
        pos: { x: slotRect.x + 15, y: slotRect.y + 15 },
        count: 4,
        size: { width: 8, height: 8 },
        color,
        gravity: 0,
        velocity: { min: 1, max: 2 },
        duration: 500,
        usePercentages: false,
        cssLine: "z-index: 1;"
    });
}

export async function destroyBomb(slotEl: HTMLElement) {
    if (!state.canUseCarrot) {
        playAudio({ id: "nope" })

        slotEl.classList.add("nope")

        setTimeout(() => {
            slotEl.classList.remove("nope")
        }, 300);
        return;
    }

    clearBombInterval()

    slotEl.setAttribute("populated", "false")
    slotEl.classList.remove("active")

    if (state.currentColorPalette == "allwhite") {
        slotEl.classList.add("allwhite")
    }

    const carrotEffect = create("div")
    const zap = create("div")
    const bombEl = querySelectorHTML(".bomb")
    const overlay = querySelectorHTML(".carrotattackoverlay")

    bombEl.classList.add("obliterated")

    overlay.classList.add("active")
    zap.classList.add("carrotzap")
    carrotEffect.classList.add("carrotEffect")

    document.body.append(carrotEffect)
    document.body.append(zap)

    playAudio({ id: "pop01" })

    await wait(700)

    zap.classList.add("active")
    bombEl.style.cssText += `
        animation: bombsuffer 0.3s ease infinite alternate;
        scale: 1;
    `

    carrotEffect.classList.add("insane")

    playAudio({ id: "zap" })

    document.body.classList.add("impact")

    setTimeout(() => {
        document.body.classList.remove("impact")
    }, 16);

    await wait(2000)

    bombEl.style.opacity = "0"
    bombEl.style.animation = "none"

    particles({
        pos: { x: 90, y: 13 },
        count: 15,
        size: { width: 8, height: 8 },
        color: "#b626d3ff",
        gravity: 1,
        velocity: { min: 2, max: 2 },
        duration: 2000,
        usePercentages: true,
        cssLine: "z-index: 1;"
    });

    carrotEffect.classList.remove("insane")
    carrotEffect.classList.add("cgone")
    overlay.classList.remove("active")

    carrotEffect.addEventListener("animationend", carrotEffect.remove)
    zap.remove()

    bombEl.classList.remove("obliterated")

    createBoom({
        x: 92,
        y: 12,
        usePercentages: true,
        width: 100,
        height: 100
    })

    playAudio({ id: "bigBoom" })
}

export function setCarrotPowerupColor(color: "normal" | "allwhite" | "darkpurple") {
    carrotSlots.forEach(slot => {
        if (color == "allwhite") {
            if (slot.getAttribute("populated") == "true") {
                slot.classList.add("allwhitepop");
                slot.style.filter = "drop-shadow(0 0 20px #ffffff57)"
            } else {
                slot.classList.add("allwhite");
                slot.style.filter = "brightness(0) invert(1) drop-shadow(0 0 20px #ffffff57)"
            }
        } else if (color == "normal") {
            slot.classList.remove("allwhitepop")
            slot.classList.remove("allwhite")
            slot.style.filter = "drop-shadow(0 0 20px #ff7b469c)"

            /* const row = querySelectorHTML(".bottomrightrow")
            row.style.filter = "none" */
        } else if (color == "darkpurple") {
            slot.style.filter = "hue-rotate(300deg) saturate(5) brightness(0.5) drop-shadow(0 0 20px #8022a5ff)"
        }
    })
}