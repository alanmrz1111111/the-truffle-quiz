import { getCurrentWindow } from "@tauri-apps/api/window";
import { Checkbox } from "./components/Checkbox";
import { changeMusicVolume, changeSFXVolume, getAudioDuration, playAudio, playLoopingAudio, registerAudioList } from "./core/audio";
import { closeCurrentPopup, popup } from "./core/popup";
import { MUSIC_VOLUME, SFX_VOLUME, state } from "./core/state";
import { transition } from "./core/transition";
import { audioList } from "./etc/audioList";
import { flyingImage } from "./etc/flyingImage";
import { mqmessages } from "./etc/marqueeMessages";
import { clearBombInterval, showQuestion } from "./etc/showQuestion";
import { seq1, seq2, seq3, seq4, seq5 } from "./etc/startSequences";
import { trackFPS } from "./etc/trackFPS";
import { createBoom, createObjectOnPos, forceReflow, qsaHTML, querySelectorHTML, random, showObjectWithBounce, wait } from "./utils";
import { openUrl } from "@tauri-apps/plugin-opener";

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual"
}

registerAudioList(audioList)
customElements.define("c-checkbox", Checkbox)

trackFPS()

const tauriWindow = getCurrentWindow()

export const buttons = {
    begin: querySelectorHTML(".beginbtn#main")
}

const checkboxes = qsaHTML(".checkbox")

document.addEventListener("contextmenu", (e) => e.preventDefault())

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.altKey) {
        onWrongAns()
    }

    if (e.altKey && e.key == "a") onCorrectAns()

    if (e.key == "q") {
        playAudio({ id: "woohoo" })
    }
})

document.addEventListener("keydown", (e) => {
    if (e.key == "Escape" && !state.inMainMenu) {
        onGiveUp()
    }

    if (e.key == "Tab" && !state.gameOver && !state.inMainMenu && !state.enableTab) {
        for (let i = 0; i < 3; i++) {
            onWrongAns()
        }
    }
})

document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement

    switch (target.dataset.openGame) {
        case "asktruffle":
            openUrl("https://onewithpneumonia.itch.io/ask-truffle")
            break;
    }
})

document.addEventListener("click", (e) => {
    if (state.ignoreInput) return

    const target = e.target as HTMLElement

    switch (target.dataset.correct) {
        case "true":
            onCorrectAns();
            break;

        case "false":
            onWrongAns()
            break;
    }
})

document.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement

    switch (target.dataset.btn) {
        case "play":
            onPlay()
            break;

        case "quit":
            confirmExitAction()
            break;

        case "tryagain":
            tryAgain()
            break;

        case "backtomenu":
            onGiveUp()
            break;

        case "more":
            onMoreGames()
            break;

        case "menus":
            showSecondaryMenuScreen()
            break;

        case "copyrightnotice":
            onCredits()
            break;

        case "clearls":
            localStorage.clear()

            const btn = querySelectorHTML("[data-btn='clearls']")
            btn.textContent = "CACHE CLEARED!"

            await wait(1000)

            window.location.reload()
            break;

        case "stats":
            onStats()
            break

        case "backtomainmenu":
            hideSecondaryMenuScreen()
            break;
    }
})

checkboxes.forEach(checkbox => {
    checkbox._checked = checkbox.getAttribute("checked") === "true";

    checkbox.addEventListener("click", () => {
        checkbox._checked = !checkbox._checked;
        checkbox.setAttribute("checked", `${checkbox._checked}`);

        const setting = checkbox.getAttribute("setting");

        switch (setting) {
            case "music":
                state.volume.music = checkbox._checked ? MUSIC_VOLUME : 0;
                changeMusicVolume(state.volume.music);
                break;

            case "sfx":
                state.volume.sfx = checkbox._checked ? SFX_VOLUME : 0;
                changeSFXVolume(state.volume.sfx);
                break;

            case "showfps":
                const fpsLabel = querySelectorHTML("#fpslabel");
                fpsLabel.style.opacity = checkbox._checked ? "1" : "0";
                break;
        }
    });
});
buttons.begin.addEventListener("click", beginStartSequence)

let mainMenuAudioObj: HTMLAudioElement | undefined;
let mainMenuAudioInt: number | undefined;

// @ts-ignore
let gameAudioObj: HTMLAudioElement | undefined;

type BGType = "normal" | "metal" | "gameover"

async function hideSecondaryMenuScreen() {
    const secondaryMenuPage = querySelectorHTML("#smenu")
    const buttonscol = querySelectorHTML(".smenucolumn")
    const menugrid = querySelectorHTML(".menugrid")
    const logo = querySelectorHTML(".logo")
    const qotdcont = querySelectorHTML(".qotdcont")

    setMainMenuVisibilityState(true)

    menugrid.classList.remove("fly")
    logo.classList.remove("fly")

    playAudio({ id: "clang01" })

    buttonscol.classList.add("retract")

    setTimeout(() => {
        qotdcont.style.opacity = "0"
    }, 10);

    await wait(300)

    setTimeout(() => {
        menugrid.style.opacity = "1"
        logo.style.opacity = "1"
    }, 10);

    setTimeout(() => {
        secondaryMenuPage.classList.remove("active")
    }, 700);
}

async function showSecondaryMenuScreen() {
    const secondaryMenuPage = querySelectorHTML("#smenu")
    const buttonscol = querySelectorHTML(".smenucolumn")
    const menu = querySelectorHTML(".menugrid")
    const logo = querySelectorHTML(".logo")
    const qotdcont = querySelectorHTML(".qotdcont")

    playAudio({ id: "clang01" })
    menuFly()

    await wait(300)

    logo.style.opacity = "0"
    menu.style.opacity = "0"

    buttonscol.classList.remove("retract")
    secondaryMenuPage.classList.add("active")

    setTimeout(() => {
        qotdcont.style.opacity = "1"
    }, 200);

    setMainMenuVisibilityState(false)
}

function onStats() {
    popup({
        header: {
            content: "STATS"
        },
        bodyContent: `
            <div class="statspage">
                <h1>DEATHS: ${localStorage.getItem("deathCount")}</h1>
            </div>
        `,
        buttons: [
            {
                text: "close",
                onClick() {
                    closeCurrentPopup()
                },
            }
        ],
    })
}

function onCredits() {
    const overlay = querySelectorHTML(".creditsoverlay")

    overlay.classList.add("active")

    function handleClick() {
        overlay.removeEventListener("click", handleClick)
        overlay.classList.remove("active")
    }

    overlay.addEventListener("click", handleClick)

    playAudio({ id: "clank" })
}

async function menuFly() {
    return new Promise<void>((resolve) => {
        const menu = querySelectorHTML(".menugrid")
        menu.classList.add("fly")

        const logo = querySelectorHTML(".logo")
        logo.classList.add("fly")

        setTimeout(() => {
            resolve()
        }, 800);
    })
}

export function setBackgroundType(type: BGType) {
    const bg = querySelectorHTML(".bg")

    bg.classList.remove("normal")
    bg.classList.remove("metal")
    bg.classList.remove("gameover")

    bg.classList.add("bg")

    document.body.classList.forEach(cls => {
        document.body.classList.remove(cls)
    })

    switch (type) {
        case "normal":
            bg.classList.add("normal")
            break;

        case "metal":
            bg.classList.add("metal")
            document.body.classList.add("metal")
            break;

        case "gameover":
            bg.classList.add("gameover")
            break
    }
}

function setMainMenuVisibilityState(visible: boolean) {
    const menugrid = querySelectorHTML(".menugrid")
    const logo = querySelectorHTML(".logo")
    const marquee = querySelectorHTML(".marquee")
    const copyrightbtn = querySelectorHTML(".copyrightbtn")

    if (!visible) {
        menugrid.style.display = "none"
        logo.style.display = "none"
        marquee.style.display = "none"
        copyrightbtn.style.display = "none"
    } else {
        menugrid.style.display = "grid"
        logo.style.display = "block"
        marquee.style.display = "block"
        copyrightbtn.style.display = "block"
    }
}

function setBouncyThingGenerationState(spawn: boolean) {
    state.spawnBouncyThings = spawn;

    if (!spawn) {
        const bouncyThings = qsaHTML("[data-flying-img]")
        bouncyThings.forEach(thing => thing.remove())
    }
}

function onMoreGames() {
    popup({
        header: {
            content: "MORE GAMES"
        },
        bodyContent: `
            <div class="moregamespage">
                <div class="row gamerow" style="margin-top: 15px; width: 100%; justify-content: start;">
                    <img src="/imgs/askTruffleCover.png" data-open-game="asktruffle" draggable="false" alt="Ask Truffle Thumbnail" class="gameimg">
                    <div class="column" style="width: 100%; align-items: start; gap: 1px;">
                        <h1 style="margin: 0;" class="gametitle" data-open-game="asktruffle">ASK TRUFFLE!</h1>
                        <p style="margin: 0; color: #ff3511; opacity: 0.8; font-weight: bolder;">WHY ASK CHATGPT OR DEEPSEEK WHEN YOU CAN ASK TRUFFLE?</p>
                    </div>
                </div>
            </div>
        `,
        buttons: [
            {
                text: "close",
                onClick() {
                    closeCurrentPopup()
                },
            }
        ]
    })
}

async function onGiveUp() {
    const gameoverscreen = querySelectorHTML(".gameoverscreen")
    const bg = querySelectorHTML(".bg")

    bg.classList.remove("gameover")
    gameoverscreen.classList.remove("active")

    localStorage.setItem("quizOnReload", "false")
    localStorage.setItem("menuOnReload", "true")

    await wait(350)

    window.location.reload()
}

async function tryAgain() {
    const gameoverscreen = querySelectorHTML(".gameoverscreen")
    const bg = querySelectorHTML(".bg")

    bg.classList.remove("gameover")
    gameoverscreen.classList.remove("active")

    localStorage.setItem("quizOnReload", "true")
    localStorage.setItem("menuOnReload", "false")

    await wait(350)

    window.location.reload()
}

function init() {
    setMainMenuVisibilityState(false)

    if (localStorage.getItem("quizOnReload") == "true") {
        const startPage = querySelectorHTML(".startpage")
        startPage.style.display = "none"

        reloadQuiz()
    }

    if (localStorage.getItem("menuOnReload") == "true") {
        showMainMenu()
        showLogo()

        setMainMenuVisibilityState(true)
    }

    const fpslabel = querySelectorHTML("#fpslabel")
    fpslabel.style.opacity = "0"
}

function showLogo() {
    const startBtn = querySelectorHTML(".beginbtn#main")
    startBtn.style.display = "none"

    const logo = querySelectorHTML(".logo")
    logo.classList.add("active", "finalplace")
}

function reloadQuiz() {
    const cont = querySelectorHTML(".container")
    cont.classList.remove("hidden")
    cont.classList.add("active")

    manageGameBGM()
    showQuestion(state.questionNumber)
    updateQuestionNumber()
    updateLivesLabel()
}

function confirmExitAction() {
    popup({
        header: {
            content: "WAIT!"
        },
        bodyContent: `
        <h3>
            are you sure you <p> want to quit?
        </h3>
    `,
        buttons: [
            {
                text: "yep",
                onClick() {
                    tauriWindow.close()
                },
            },
            {
                text: "nope",
                onClick() {
                    closeCurrentPopup()
                },
            }
        ]
    })
}

function updateQuestionNumber() {
    const qnumber = querySelectorHTML(".qnumber")

    qnumber.textContent = `${state.questionNumber}.`
}

/* function endDemo() {
    const overlay = querySelectorHTML(".demoendoverlay")

    overlay.classList.remove("hidden")

    playAudio({ id: "woohoo" })
} */

export function hideBackground() {
    const bg = querySelectorHTML(".bg")

    bg.style.display = "none"
}

export function showBackground() {
    const bg = querySelectorHTML(".bg")

    bg.style.display = "block"
}

export function cheaterPopup() {
    popup({
        header: {
            content: "CHEATER!"
        },
        bodyContent: `
            <h2>Dirty cheater.</h2>
        `,
        buttons: [
            {
                text: "TRY AGAIN",
                onClick() {
                    window.location.reload()
                },
            }
        ],
    })
}

export function onCorrectAns() {
    state.questionNumber++;

    updateQuestionNumber()
    showQuestion(state.questionNumber)
    playAudio({ id: "ding" })
    storeCorrectAnsCount()
}

export function onWrongAns() {
    state.lives--;

    storeWrongAnsCount()
    updateLivesLabel()
    setLivesLabelColor()
    loseLifeEffect()
    loseLifeSFX()
    // shakeScreen()

    if (state.lives <= 0 || state.danger == true) {
        gameOverSequence({ bomb: false })
        storeDeathCount()
    }
}

function storeDeathCount() {
    const prev = localStorage.getItem("deathCount") || "0"
    const newCount = parseInt(prev) + 1

    localStorage.setItem("deathCount", newCount.toString())
}

function storeCorrectAnsCount() {
    const prev = localStorage.getItem("correctAnsCount") || "0"
    const newCount = parseInt(prev) + 1

    localStorage.setItem("correctAnsCount", newCount.toString())
}

function storeWrongAnsCount() {
    const prev = localStorage.getItem("wrongAnsCount") || "0"
    const newCount = parseInt(prev) + 1

    localStorage.setItem("wrongAnsCount", newCount.toString())
}

function shakeScreen() {
    document.body.classList.add("shake")

    setTimeout(() => {
        document.body.classList.remove("shake")
    }, 100);
}

export async function gameOverSequence({ bomb }: { bomb?: boolean }) {
    if (state.gameOver) return
    state.gameOver = true

    const cont = querySelectorHTML(".container")
    const gameOverScreen = querySelectorHTML(".gameoverscreen")

    cont.classList.add("fly")

    clearBombInterval()
    playAudio({ id: "gameover" })
    pauseMusic()

    for (let i = 0; i < 3; i++) {
        createBoom({
            x: random(50, 90),
            y: random(30, 80),
            width: 300,
            height: 200,
            usePercentages: true
        })
    }

    if (bomb) {
        createBoom({
            x: 90,
            y: 15,
            width: 300,
            height: 200,
            usePercentages: true
        })
    }

    flyingImage({
        startPos: {
            x: 0,
            y: 50
        },
        endPos: {
            x: 120,
            y: 0
        },
        easing: "linear",
        image: "/imgs/truffle01.png",
        width: 72,
        height: 64,
        duration: 1,
        cssStyle: "opacity: 0.8;"
    })

    await wait(1000)

    setBackgroundType("gameover")
    gameOverScreen.classList.add("active")
    playAudio({ id: "clank" })

    await wait(500)
    showObjectWithBounce({
        el: querySelectorHTML("#gameoverbuttonsrow"),
        duration: 0.5,
        easing: "ease",
        display: "flex",
        useTransformTranslate: true
    })
}

function pauseMusic() {
    gameAudioObj?.pause()
}

function loseLifeSFX() {
    playAudio({ id: "loselife" })
}

function loseLifeEffect() {
    const lives = querySelectorHTML(".lives")
    const rect = lives.getBoundingClientRect()

    const prevLife = createObjectOnPos("h1", { x: rect.left, y: rect.top })

    prevLife.textContent = `${state.lives + 1}`

    prevLife.classList.add("lfeffect")

    // @ts-ignore
    prevLife.style.color = `darkred`

    lives.classList.add("shaking")

    prevLife.addEventListener("animationend", () => { prevLife.remove() })
}

function setLivesLabelColor() {
    const label = querySelectorHTML(".lives")
    const map = {
        3: "full",
        2: "half",
        1: "danger"
    }

    label.classList.forEach(cls => label.classList.remove(cls))
    label.classList.add("lives")

    // @ts-ignore
    label.classList.add(map[state.lives]);
}

async function beginStartSequence() {
    const startPage = querySelectorHTML(".startpage")
    startPage.style.pointerEvents = "none"

    playAudio({ id: "fart" })

    setMainMenuVisibilityState(true)

    buttons.begin.textContent = "uh oh.."
    buttons.begin.classList.add("dead")

    const rand = random(1, 6)

    switch (rand) {
        case 1:
            await seq1()
            break;

        case 2:
            await seq2()
            break;

        case 3:
            await seq3()
            break;

        case 4:
            await seq4()
            break;

        case 5:
            await seq5()
            break;
    }

    const logo = querySelectorHTML(".logo")
    logo.classList.add("active")

    playAudio({ id: "woosh01" })

    await wait(1500)

    logo.classList.add("finalplace")

    await wait(800)
    playAudio({ id: "clank" })

    showMainMenu()
}

export function updateLivesLabel() {
    const label = querySelectorHTML(".lives")

    label.textContent = `${state.lives}`
}

async function onPlay() {
    const menu = querySelectorHTML(".menugrid")
    const logo = querySelectorHTML(".logo")
    const marquee = querySelectorHTML(".marquee")
    const settingsPage = querySelectorHTML(".settingspage")

    settingsPage.style.pointerEvents = "none"

    updateLivesLabel()

    marquee.remove()
    menu.classList.add("fly")
    logo.classList.add("fly")

    menu.addEventListener("animationend", () => menu.remove())
    logo.addEventListener("animationend", () => logo.remove())

    state.inMainMenu = false;

    const gameCont = querySelectorHTML(".container")

    playAudio({ id: "startquiz" })
    playAudio({ id: "crazy01" })

    mainMenuAudioObj?.pause()

    manageGameBGM()
    clearInterval(mainMenuAudioInt)

    await wait(686)

    gameCont.classList.remove("hidden")

    showQuestion(state.questionNumber)

    const creditsBtn = querySelectorHTML(".copyrightbtn")

    creditsBtn.style.display = "none"
}

async function showMainMenu() {
    const menu = querySelectorHTML(".menugrid")
    const qbtns = qsaHTML(".qbutton")
    const startPage = querySelectorHTML(".startpage")

    console.log(qbtns)

    menu.classList.remove("hidden")

    startPage.style.pointerEvents = "none"

    qbtns.forEach(btn => {
        btn.classList.add("animate")
    })

    state.inMainMenu = true;

    littleBouncingThings()
    manageMenuBGM()

    await wait(1000)
    manageMarquee()
}

function setMarqueeMsg() {
    const marquee = querySelectorHTML(".marquee")
    const msg = mqmessages[random(0, mqmessages.length)]

    marquee.textContent = msg
}

function manageMarquee() {
    const marquee = querySelectorHTML(".marquee")
    marquee.style.animationPlayState = "running"
    marquee.style.opacity = "1"

    setMarqueeMsg()

    marquee.addEventListener("animationiteration", setMarqueeMsg)
}

async function manageGameBGM() {
    const duration = await getAudioDuration({ filePath: "/audio/bgm/game01.mp3" })

    const obj = playLoopingAudio({
        audioID: "gamebgm01",
        audioDuration: duration
    })

    gameAudioObj = obj!.audioObj;
}

async function manageMenuBGM() {
    if (!state.inMainMenu) return

    const duration = await getAudioDuration({ filePath: "/audio/bgm/menu01.mp3" })

    const obj = playLoopingAudio({
        audioID: "menubgm01",
        audioDuration: duration
    })

    mainMenuAudioObj = obj!.audioObj;
    mainMenuAudioInt = obj!.int;
}

async function littleBouncingThings() {
    if (state.inMainMenu == false || state.spawnBouncyThings == false) return

    const imgs = [
        "/imgs/truffle01.png",
        "/imgs/carrot01.png",
        "/imgs/pipsqueak01.png"
    ]

    let startYPos = random(10, 80)
    let endYPos = random(10, 80)
    let wd = 72
    let hg = 64

    const img = imgs[random(0, imgs.length)]

    if (img == "/imgs/carrot01.png") {
        hg = 90
    }

    await flyingImage({
        startPos: {
            x: 0,
            y: startYPos
        },
        endPos: {
            x: 120,
            y: endYPos
        },
        easing: "linear",
        image: img,
        width: wd,
        height: hg,
        duration: 1,
        cssStyle: "opacity: 0.1;",
        zIndex: -10,
        dataset: "bthing"
    })

    littleBouncingThings()
}

export function getGameBGMAudioObject() {
    return gameAudioObj;
}

/* manageGameBGM()
showQuestion(state.questionNumber)
updateQuestionNumber()
updateLivesLabel() */

init()