import { playAudio } from "../core/audio"
import { append, create, createBoom, createObjectOnPos, querySelectorHTML, random, wait } from "../utils"
import { flyingImage } from "./flyingImage"

export async function seq1() {
    return new Promise<void>(async (resolve) => {
        await wait(500)

        const alien = querySelectorHTML(".alien")

        alien.classList.add("active")

        await wait(random(1500, 2000))

        playAudio({ id: "boom01" })

        const alienPos = alien.getBoundingClientRect();

        alien.remove()

        const boomEffect = createObjectOnPos("img", alienPos) as HTMLImageElement

        boomEffect.src = "/imgs/boom02.png"
        boomEffect.classList.add("alienboom")
        boomEffect.draggable = false;

        await wait(1000)

        boomEffect.remove()
        resolve()
    })
}

export async function seq2() {
    return new Promise<void>(async (resolve) => {
        await wait(500)

        playAudio({ id: "woosh02" })

        await flyingImage({
            startPos: {
                x: 0,
                y: 70
            },
            endPos: {
                x: 120,
                y: 70
            },
            easing: "linear",
            image: "/imgs/truffle01.png",
            width: 72,
            height: 64,
            duration: 1
        })

        playAudio({ id: "crazy01" })

        await flyingImage({
            startPos: {
                x: 0,
                y: 20
            },
            endPos: {
                x: 120,
                y: 20
            },
            easing: "linear",
            image: "/imgs/pipsqueak01.png",
            width: 72,
            height: 64,
            duration: 1
        })

        resolve()
    })
}

export async function seq3() {
    return new Promise<void>(async (resolve) => {
        await wait(500)

        playAudio({ id: "crazy02" })

        await flyingImage({
            startPos: {
                x: 0,
                y: 50
            },
            endPos: {
                x: 120,
                y: 50
            },
            easing: "linear",
            image: "/imgs/carrot01.png",
            width: 72,
            height: 90,
            duration: 1
        })

        resolve()
    })
}

export async function seq4() {
    return new Promise<void>(async (resolve) => {
        await wait(500)

        playAudio({ id: "woosh02" })

        await flyingImage({
            startPos: {
                x: 0,
                y: 70
            },
            endPos: {
                x: 120,
                y: 70
            },
            easing: "linear",
            image: "/imgs/truffle01.png",
            width: 72,
            height: 64,
            duration: 1
        })

        playAudio({ id: "crazy01" })

        await flyingImage({
            startPos: {
                x: 0,
                y: 20
            },
            endPos: {
                x: 120,
                y: 20
            },
            easing: "linear",
            image: "/imgs/pipsqueak01.png",
            width: 72,
            height: 64,
            duration: 1
        })

        playAudio({ id: "crazy02" })

        await flyingImage({
            startPos: {
                x: 0,
                y: 50
            },
            endPos: {
                x: 120,
                y: 50
            },
            easing: "linear",
            image: "/imgs/carrot01.png",
            width: 72,
            height: 90,
            duration: 1
        })

        resolve()
    })
}

export async function seq5() {
    return new Promise<void>(async (resolve) => {
        await wait(500)

        const fob = create("img") as HTMLImageElement
        const plob = create("img") as HTMLImageElement

        fob.src = "/imgs/fob01.png"
        fob.classList.add("fob")

        plob.src = "/imgs/plob01.png"
        plob.classList.add("plob")

        setTimeout(() => {
            fob.classList.add("active")
            plob.classList.add("active")
        }, 10);

        append(fob)
        append(plob)

        await wait(1410)

        fob.style.animationPlayState = "paused"
        plob.style.animationPlayState = "paused"

        const pos = fob.getBoundingClientRect()

        fob.style.opacity = "0"
        plob.style.opacity = "0"

        fob.style.scale = "0"
        plob.style.scale = "0"

        setTimeout(() => {
            fob.remove()
            plob.remove()
        }, 300);

        createBoom({
            x: pos.x + 100,
            y: pos.y + 50,
            width: 150,
            height: 150,
            usePercentages: false
        })

        playAudio({ id: "boom01" })

        await wait(500)

        resolve()
    })
}