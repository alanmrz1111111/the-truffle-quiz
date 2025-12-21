import list from "../json/achievementList.json" with { type: "json" }
import { create, querySelectorHTML, wait } from "../utils"
import { playAudio } from "./audio"

type UnlockAchievementArgs = {
    id: string,
    effects?: boolean
}

type Achievement = {
    title: string
}

export const unlockedAchievements: Achievement[] = []

export function unlockAchievement({ id, effects = true }: UnlockAchievementArgs) {
    const obj = Object.entries(list.achievements).find(ach => ach[0] == id)

    if (!obj) throw new Error("no achievement with id " + id)

    // obj[0] = json key (i.e: 'ach_01', 'ach_08')
    // obj[1] = object, { title: str, description: str }

    // @ts-ignore
    let canStore = storeAchievement(obj)

    if (effects && canStore) unlockAchievementEffects({ title: obj[1].title, imgSrc: obj[1].image });
}

function storeAchievement(obj: [string, { title: string, imgSrc: string }]) {
    const prevAchList = JSON.parse(localStorage.getItem("unlockedAchievements") || "[]") as Achievement[]

    if (prevAchList.some(a => a.title === obj[1].title)) {
        console.warn("achievement w/ title " + obj[1].title + " has already been unlocked.");
        return false
    }

    prevAchList.push({ title: obj[1].title })

    localStorage.setItem("unlockedAchievements", `${JSON.stringify(prevAchList)}`);

    console.log(prevAchList)
    return true
}

async function unlockAchievementEffects({ title, imgSrc }: { title: string, imgSrc: string }) {
    const el = create("div")
    const cont = querySelectorHTML(".achievementcont")

    console.log("ACHIEVEMENT UNLOCKED: ", title)

    if (!cont) throw new Error("idiot");

    cont.style.zIndex = "9999"

    const img = create("div")
    const col = create("div")

    col.classList.add("achcolumn")
    img.classList.add("achievementimg")

    img.style.backgroundImage = `url('${imgSrc}')`

    playAudio({ id: "woohoo" })

    el.classList.add("achievement")
    col.innerHTML = `
        <h1>${title}</h1>
        <span>ACHIEVEMENT UNLOCKED!</span>
    `

    el.addEventListener("click", async () => {
        el.classList.remove("active")
        el.classList.add("achgone")
        playAudio({ id: "glass" })

        await wait(1100)

        cont.style.zIndex = "-9999"
    })

    cont.appendChild(el)
    el.append(img)
    el.append(col)

    await wait(10)

    el.classList.add("active")

    await wait(3500)

    el.classList.remove("active")
    el.classList.add("achgone")

    el.addEventListener("animationend", el.remove)

    await wait(1100)

    cont.style.zIndex = "-9999"
}