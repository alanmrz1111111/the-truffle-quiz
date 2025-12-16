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

    particles({
        pos: { x: slotRect.x + 15, y: slotRect.y + 15 },
        count: 4,
        size: { width: 8, height: 8 },
        color: "#ff8827ff",
        gravity: 0,
        velocity: { min: 1, max: 2 },
        duration: 500,
        usePercentages: false,
        cssLine: "z-index: 1;"
    });
}

export function destroyBomb(slotEl: HTMLElement) {
    if (!state.canUseCarrot) {
        playAudio({ id: "nope" })

        slotEl.classList.add("nope")

        setTimeout(() => {
            slotEl.classList.remove("nope")
        }, 300);
        return;
    }

    clearBombInterval()
    createBoom({
        x: 92,
        y: 12,
        usePercentages: true,
        width: 100,
        height: 100
    })

    const bombEl = querySelectorHTML(".bomb")

    bombEl.style.opacity = "0"

    playAudio({ id: "pop01" })
    playAudio({ id: "bigBoom" })

    slotEl.setAttribute("populated", "false")
    slotEl.classList.remove("active")
}