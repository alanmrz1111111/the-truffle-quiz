// import { getCurrentWindow } from "@tauri-apps/api/window";
import { changeMusicVolume, changeSFXVolume, getAudioDuration, playAudio, playLoopingAudio, registerAudioList } from "./core/audio";
import { setQualityLevel } from "./core/graphics";
import { closeCurrentPopup, popup } from "./core/popup";
import { MUSIC_VOLUME, SFX_VOLUME, state } from "./core/state";
import { transition } from "./core/transition";
import { audioList } from "./etc/audioList";
import { flyingImage } from "./etc/flyingImage";
import { mqmessages } from "./etc/marqueeMessages";
import { QualityLevel } from "./etc/qualityLevel";
import { clearBombInterval, showQuestion } from "./etc/showQuestion";
import { spookyLines } from "./etc/spookyLines";
import { seq1, seq2, seq3, seq4, seq5 } from "./etc/startSequences";
import { trackFPS } from "./etc/trackFPS";
import { createBoom, createObjectOnPos, qsaHTML, querySelectorHTML, random, showObjectWithBounce, wait } from "./utils";
import { openUrl } from "@tauri-apps/plugin-opener";
import { window } from "@tauri-apps/api"
import { getCarrot } from "./powerups";

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual"
}

registerAudioList(audioList)
// customElements.define("c-checkbox", Checkbox)

trackFPS()

const tauriWindow = window.getCurrentWindow()
tauriWindow.setMaximizable(false)

export const mousePos = { x: 0, y: 0 }

let qringAnimInProgress = false

export const buttons = {
    begin: querySelectorHTML(".beginbtn#main")
}

// const checkboxes = qsaHTML(".checkbox")
const toggleBtns = qsaHTML("[data-btn-bh='toggle']")
const settingBtns = qsaHTML(".settingbutton")

document.addEventListener("contextmenu", (e) => e.preventDefault())

document.addEventListener("keydown", (e) => {
    if (!state.inMainMenu) return

    if (e.key == "Escape") confirmExitAction()

    if (e.key == "p") onPlay()
})

document.addEventListener("mousemove", (e) => {
    mousePos.x = e.pageX
    mousePos.y = e.pageY
})

document.addEventListener("keydown", (e) => {
    if (!state.devMode) return

    if (e.ctrlKey && e.altKey) {
        onWrongAns()
    }

    if (e.ctrlKey && e.key == "o") getCarrot({ position: { x: 50, y: 50 }, slot: 2, usePercentages: true })

    if (e.ctrlKey && e.key == "a") onCorrectAns()

    if (e.key == "q") {
        playAudio({ id: "woohoo" })
    }

    if (e.ctrlKey && e.key == "b") {
        createBoom({
            x: mousePos.x,
            y: mousePos.y,
            width: 300,
            height: 200,
            usePercentages: false
        })
    }

    if (e.ctrlKey && e.key == "w") {
        localStorage.removeItem("unlockedAchievements")
        popup({
            header: { content: "DONE" },
            bodyContent: `unlockedachievemnts ls key deleted`,
            buttons: [
                { text: "OK", onClick() {
                    closeCurrentPopup()
                }, }
            ]
        })
    } 

    if (e.ctrlKey && e.key == "k") setQualityLevel(0)

    if (e.ctrlKey && e.key == "7") {
        state.questionNumber = 89
        showQuestion(state.questionNumber)
    }

    // if (e.key == "p") getCarrot({ position: { x: 160, y: 160 }, slot: 1 })
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
            if (state.questionNumber == 100) {
                theEnd()
                return;
            }

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
            onCacheClear()
            break;

        case "stats":
            onStats()
            break

        case "backtomainmenu":
            hideSecondaryMenuScreen()
            break;

        case "settings":
            onSettings()
            break;

        case "backtosecmenufromsettings":
            exitSettings()
            break;

        case "about":
            onAbout()
            break
    }
})

settingBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        playAudio({ id: "menuclick" })
    })
})

toggleBtns.forEach(btn => {
    btn.active = true;
    if (btn.dataset.setting == "quality") {
        btn.textContent = "HIGH";
    } else {
        btn.textContent = "ON";
    }

    btn.addEventListener("click", () => {
        btn.active = !btn.active;
        if (btn.dataset.setting == "quality") {
            btn.textContent = btn.active ? "HIGH" : "LOW";
        } else {
            btn.textContent = btn.active ? "on" : "off";
        }

        switch (btn.dataset.setting) {
            case "music":
                if (btn.active == true) {
                    changeMusicVolume(MUSIC_VOLUME)
                } else {
                    changeMusicVolume(0)
                }
                break;

            case "sfx":
                if (btn.active == true) {
                    changeSFXVolume(SFX_VOLUME)
                } else {
                    changeSFXVolume(0)
                }
                break;

            case "quality":
                if (btn.active == false) {
                    setQualityLevel(QualityLevel.LOW)
                } else {
                    setQualityLevel(QualityLevel.HIGH)
                }
                break;
        }
    });
});

buttons.begin.addEventListener("click", beginStartSequence)

let mainMenuAudioObj: HTMLAudioElement | undefined;
let mainMenuAudioInt: number | undefined;

// @ts-ignore
let gameAudioObj: HTMLAudioElement | undefined;
let gameAudioInt: number | undefined

// @ts-ignore
let finaleAudioObj: HTMLAudioElement | undefined;

type BGType = "normal" | "metal" | "gameover"

function setFinalStatLabelValue() {
    const gameOverCountLabel = querySelectorHTML("[data-finalstat='gameovers']");
    const wrongAnsCountLabel = querySelectorHTML("[data-finalstat='wronganswers']")

    gameOverCountLabel.textContent = `${localStorage.getItem("deathCount") || 0}`
    wrongAnsCountLabel.textContent = `${localStorage.getItem("wrongAnsCount") || 0}`
}

async function theEnd() {
    playAudio({ id: "wetfart" })
    playAudio({ id: "woohoo" })
    playAudio({ id: "startquiz" })

    state.winner = true

    playAudio({ id: "endingBgm" })

    const overlay = querySelectorHTML(".endOverlay")
    const truffle = querySelectorHTML(".endtruffle")
    const winnertext = querySelectorHTML(".winnertext")
    const qring = querySelectorHTML(".qring")
    const statspage = querySelectorHTML(".finalstats")
    const endtransition = querySelectorHTML(".endtransitionoverlay")
    const cont = querySelectorHTML(".container")
    const thanksForPlayingText = querySelectorHTML(".thanksforplaying")
    const endingCarrot = querySelectorHTML(".endingcarrot")

    overlay.classList.add("active")
    qring.classList.add("fly")

    setFinalStatLabelValue()
    document.body.classList.add("ending")

    // 10000
    await wait(10000)
    truffle.classList.add("gone")
    winnertext.classList.add("gone")

    await wait(500)
    statspage.classList.add("active")

    // 10000
    await wait(10000)
    statspage.classList.remove("active")

    thanksForPlayingText.classList.add("active")
    endingCarrot.classList.add("active")

    await wait(10000)
    endtransition.classList.add("active")
    cont.remove()

    await wait(450)
    overlay.remove()

    await wait(1000)
    endtransition.classList.remove("active")
    postCreditsScene()
}

async function postCreditsScene() {
    const ambienceAudioObj = playAudio({ id: "ambience01", getObject: true })!
    const herbert = querySelectorHTML(".pcsherbert")
    const endoverlay = querySelectorHTML(".endtransitionoverlay")
    const scene = querySelectorHTML(".postcreditsscene")

    scene.classList.add("active")

    function setHerbertTalkingState(talking: boolean) {
        if (talking) {
            herbert.classList.add("talking")
        } else {
            herbert.classList.remove("talking")
        }
    }

    await wait(2000)

    playAudio({ id: "herbertLine01" })
    setHerbertTalkingState(true)

    await wait(1000)
    setHerbertTalkingState(false)

    await wait(250)
    setHerbertTalkingState(true)

    await wait(400)
    setHerbertTalkingState(false)

    await wait(500)
    setHerbertTalkingState(true)

    await wait(2200)
    setHerbertTalkingState(false)

    await wait(600)
    setHerbertTalkingState(true)

    await wait(1200)
    setHerbertTalkingState(false)

    const girl = querySelectorHTML(".pcsgirl")
    girl.classList.add("active")

    await wait(1000)
    herbert.classList.add("scared")

    await wait(2000)
    ambienceAudioObj.pause()

    endoverlay.classList.add("active")

    setTimeout(() => {
        localStorage.setItem("shouldRestartWithFadeOut", "true")
        localStorage.setItem("quizOnReload", "false")
        localStorage.setItem("menuOnReload", "false")
        localStorage.setItem("completed", "true")

        location.reload()
    }, 450);
}

// theEnd()

function onCacheClear() {
    popup({
        header: {
            content: "WAIT!"
        },
        bodyContent: `
            <div class="cacheclearedpage">
                ARE YOU ABSOLUTELY SURE YOU WANT TO CLEAR THE GAME'S CACHE?
                THIS CANNOT BE UNDONE.
            </div>
        `,
        buttons: [
            {
                text: "YES!",
                onClick() {
                    localStorage.clear()
                    closeCurrentPopup()
                    cacheClearedPopup()
                },
            },
            {
                text: "NOPE.",
                onClick() {
                    closeCurrentPopup()
                },
            },
        ],
        darkMode: true
    })
}

function cacheClearedPopup() {
    popup({
        header: {
            content: "SUCCESS!"
        },
        bodyContent: `
            <div class="cacheclearedpage02">
                CACHE CLEARED.
            </div>
        `,
        buttons: [
            {
                text: "RESTART",
                onClick() {
                    location.reload()
                },
            },
        ],
        darkMode: true
    })
}

function onAbout() {
    popup({
        header: {
            content: "ABOUT"
        },
        bodyContent: `
            <div class="aboutpage">
                <div class="row" style="gap: 15px">
                    GAME VERSION: <span class="aboutstat">1.0.1</span>
                </div>
                <div class="row" style="gap: 15px">
                    TAURI VERSION: <span class="aboutstat">2.5.1</span>
                </div>

                <span style="opacity: 0.1; text-transform: capitalize;">${spookyLines[random(0, spookyLines.length)]}</span>
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
        darkMode: true
    })
}

async function exitSettings() {
    await transition({ type: "in" })

    const menu = querySelectorHTML("#smenu")
    const page = querySelectorHTML(".settingspage")

    menu.style.display = "block"
    setBouncyThingGenerationState(true)
    // mainMenuAudioObj?.play()

    setBackgroundType("normal")

    page.classList.remove("active")

    state.inMainMenu = true

    manageMenuBGM()

    await wait(200)

    await transition({ type: "out" })
}

async function onSettings() {
    await transition({ type: "in" })

    const menu = querySelectorHTML("#smenu")
    const page = querySelectorHTML(".settingspage")

    state.inMainMenu = false;

    menu.style.display = "none"
    setBouncyThingGenerationState(false)
    mainMenuAudioObj?.pause()

    clearInterval(mainMenuAudioInt)

    setBackgroundType("metal")

    page.classList.add("active")

    await wait(200)

    await transition({ type: "out" })
}

async function hideSecondaryMenuScreen() {
    const secondaryMenuPage = querySelectorHTML("#smenu")
    const buttonscol = querySelectorHTML(".smenucolumn")
    const menugrid = querySelectorHTML(".menugrid")
    const logo = querySelectorHTML(".logo")
    const qotdcont = querySelectorHTML(".qotdcont")

    playAudio({ id: "glass" })
    setMainMenuVisibilityState(true)

    menugrid.classList.remove("fly")
    logo.classList.remove("fly")

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

    playAudio({ id: "glass" })
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
                <h1>DEATHS: <span class="stat">${localStorage.getItem("deathCount") || 0}</span></h1>
                <h1>ANSWERS: <span class="stat">${localStorage.getItem("correctAnsCount") || 0} / ${localStorage.getItem("wrongAnsCount") || 0}</span></h1>
            </div>
        `,
        buttons: [
            {
                text: "CLOSE",
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
        let shouldRemove = cls != "lowgraphics"

        if (shouldRemove) document.body.classList.remove(cls)
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

export function setMainMenuVisibilityState(visible: boolean) {
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

    location.reload()
}

async function tryAgain() {
    const gameoverscreen = querySelectorHTML(".gameoverscreen")
    const bg = querySelectorHTML(".bg")

    if (!state.finale) bg.classList.remove("gameover")
    gameoverscreen.classList.remove("active")

    localStorage.setItem("quizOnReload", "true")
    localStorage.setItem("menuOnReload", "false")

    await wait(350)

    location.reload()
}

function init() {
    setMainMenuVisibilityState(false)

    if (localStorage.getItem("completed") == "true") {
        const logo = querySelectorHTML(".logo")
        logo.classList.add("herbert")
    }

    if (localStorage.getItem("shouldRestartWithFadeOut") == "true") {
        localStorage.removeItem("shouldRestartWithFadeOut")

        const overlay = querySelectorHTML(".endtransitionoverlay")
        overlay.style.transition = "none"
        overlay.classList.add("active")

        setTimeout(() => {
            overlay.style.transition = "all 0.4s ease"
            overlay.classList.remove("active")
        }, 500);
    }

    if (localStorage.getItem("quizOnReload") == "true") {
        const startPage = querySelectorHTML(".startpage")
        startPage.style.display = "none"

        reloadQuiz()
        if (!state.devMode) playAudio({ id: "woohoo" })
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
                    location.reload()
                },
            }
        ],
    })
}

export function onCorrectAns() {
    state.questionNumber++;

    if (!state.finale) {
        updateQuestionNumber()
        showQuestion(state.questionNumber)
    }

    if (state.finale && state.questionNumber == 100) {
        finalCorrectAns()
    }

    if (state.finale && state.questionNumber >= 91) {
        qringOnCorrectAnswer()

        setTimeout(() => {
            showQuestion(state.questionNumber)
        }, 300);
    } else {
        playAudio({ id: "ding" })
    }

    incrementLocalStorageValue("correctAnsCount")
}

async function finalCorrectAns() {
    if (state.winner) return

    playAudio({ id: "fart" })
    finaleAudioObj?.pause()

    querySelectorHTML(".bg").style.animationDuration = "30s"

    await wait(2500)

    playAudio({ id: "bagpipe" })
}

function qringOnCorrectAnswer() {
    if (qringAnimInProgress) return;
    qringAnimInProgress = true

    const qring = querySelectorHTML(".qring")
    const overlay = querySelectorHTML(".qringfinaleoverlay")

    let hasPlayedAudio = false
    let hasPlayedClankAnim = false

    qring.classList.remove("onCorrectAns", "clank")
    void qring.offsetWidth;

    overlay.classList.add("active")
    qring.classList.add("onCorrectAns")

    playAudio({ id: "finaleDing" })

    document.body.style.pointerEvents = "none"

    function cleanup() {
        qring.classList.remove("onCorrectAns", "clank")
        overlay.classList.remove("active")

        document.body.style.pointerEvents = "all";
        qring.style.zIndex = "9999"

        qringAnimInProgress = false
    }

    function onTransitionEnd(e: TransitionEvent) {
        if (e.target !== qring) return
        setTimeout(() => {
            cleanup()
        }, 500);

        updateQuestionNumber()
        qring.style.zIndex = "9999"

        if (!hasPlayedClankAnim) qring.classList.add("clank")
        hasPlayedClankAnim = true

        if (!hasPlayedAudio) playAudio({ id: "clank" })
        hasPlayedAudio = true

        qring.removeEventListener("transitionend", onTransitionEnd)
    }

    qring.addEventListener("transitionend", onTransitionEnd)
}

export function onWrongAns() {
    state.lives--;

    incrementLocalStorageValue("wrongAnsCount")
    updateLivesLabel()
    setLivesLabelColor()
    loseLifeEffect()
    playAudio({ id: "loselife" })

    if (state.lives <= 0 || state.danger == true) {
        gameOverSequence({ bomb: false })
        incrementLocalStorageValue("deathCount")
    }
}

function incrementLocalStorageValue(key: string) {
    const prev = localStorage.getItem(key) || "0"
    const newCount = parseInt(prev) + 1

    localStorage.setItem(key, newCount.toString())
}

/* function storeDeathCount() {
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
} */

export async function gameOverSequence({ bomb }: { bomb?: boolean }) {
    if (state.gameOver) return
    state.gameOver = true

    const cont = querySelectorHTML(".container")
    const gameOverScreen = querySelectorHTML(".gameoverscreen")

    if (!state.finale) {
        cont.classList.add("fly")
    } else cont.classList.add("finalefly")

    clearBombInterval()

    if (!state.finale) {
        playAudio({ id: "gameover" })
    } else {
        playAudio({ id: "bigBoom" })
        playAudio({ id: "shotgun" })
        playAudio({ id: "fart" })

        setTimeout(() => {
            playAudio({ id: "herbertOpenMouthAngry" })
        }, 1000);
    }

    pauseMusic()
    pauseFinaleMusic()

    let effectCount = 3;
    let boomVariant = "normal"

    if (state.finale) boomVariant = "finale"

    if (state.quality == QualityLevel.LOW) effectCount = 1

    for (let i = 0; i < effectCount; i++) {
        let x = 50
        let y = 50

        if (i == 1) {
            x = 25
            y = 25
        } else if (i == 2) {
            x = 75
            y = 75
        }

        createBoom({
            x,
            y,
            width: 600,
            height: 400,
            usePercentages: true,
            variant: boomVariant
        })
    }

    if (bomb) {
        createBoom({
            x: 90,
            y: 15,
            width: 300,
            height: 200,
            usePercentages: true,
            variant: boomVariant
        })
    }

    let flyingImageUrl = "/imgs/truffle01.png"

    if (state.finale) flyingImageUrl = "/imgs/q95/player.gif"

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
        image: flyingImageUrl,
        width: 72,
        height: 64,
        duration: 1,
        cssStyle: "opacity: 0.8;"
    })

    await wait(1000)

    querySelectorHTML(".bg").classList.add("gameover")
    gameOverScreen.classList.add("active")
    playAudio({ id: "clank" })

    setTimeout(() => {
        querySelectorHTML(".bg").classList.remove("finale")
    }, 100);

    await wait(500)
    showObjectWithBounce({
        el: querySelectorHTML("#gameoverbuttonsrow"),
        duration: 0.5,
        easing: "ease",
        display: "flex",
        useTransformTranslate: true
    })
}

function pauseFinaleMusic() {
    removeTrackFromActiveTracksList("finalebgm")
    finaleAudioObj?.pause()
}

function pauseMusic() {
    removeTrackFromActiveTracksList("gamebgm")
    gameAudioObj?.pause()
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

    const rand = random(1, 5)

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

    await wait(1000)
    checkIfMenuBGMOverlapsWithGameBGM()
}

function checkIfMenuBGMOverlapsWithGameBGM() {
    if (state.tracksPlaying.includes("menubgm")) {
        mainMenuAudioObj?.pause()
    }
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

function setHellColorPalette() {
    const bg = querySelectorHTML(".bg")
    const qring = querySelectorHTML(".qring")
    const qbtns = qsaHTML(".qbutton")
    const liveslabel = querySelectorHTML(".liveslabel")
    const lives = querySelectorHTML(".lives")
    const questionarea = querySelectorHTML(".questionarea")
    const bomb = querySelectorHTML(".bomb")

    document.body.classList.add("finale")

    qring.classList.add("finale")
    bg.classList.add("finale")
    liveslabel.classList.add("finale")
    lives.classList.add("finale")
    questionarea.classList.add("finale")
    bomb.classList.add("finale")

    qbtns.forEach(btn => {
        btn.classList.add("finale")
    })
}

export async function manageGameFinale() {
    const overlay = querySelectorHTML(".finalphaseintroductionoverlay")
    const bottomrightrow = querySelectorHTML(".bottomrightrow")

    if (bottomrightrow) bottomrightrow.remove()

    // @ts-ignore
    document.body.style = ""

    const bg = querySelectorHTML(".bg")
    bg.style.animationDuration = "10s"

    state.finale = true

    gameAudioObj?.pause()
    clearInterval(gameAudioInt)

    overlay.classList.add("active")
    playAudio({ id: "slam" })

    getGameBGMAudioObject()?.pause()

    // 2000
    await wait(2000)

    const truffle = querySelectorHTML(".truffle")

    playAudio({ id: "screech" })

    truffle.classList.add("active")

    // 2000
    await wait(2000)

    truffle.classList.add("prepare")

    playAudio({ id: "shotgun" })
    playAudio({ id: "boom01" })
    playAudio({ id: "bigBoom" })

    createBoom({
        x: 50,
        y: 50,
        width: 600,
        height: 600,
        usePercentages: true,
        cssLine: "z-index: 9999; cursor: none;"
    })

    manageFinaleBGM()
    setHellColorPalette()

    await wait(600)

    overlay.classList.add("drop")
}

async function manageGameBGM() {
    const duration = await getAudioDuration({ filePath: "/audio/bgm/game01.mp3" })

    addTrackToActiveTracksList("gamebgm")

    const obj = playLoopingAudio({
        audioID: "gamebgm01",
        audioDuration: duration,
        intervalCb(newAudioObj) {
            gameAudioObj = newAudioObj
        },
    })

    gameAudioObj = obj!.audioObj;
    gameAudioInt = obj!.int
}

export async function manageFinaleBGM() {
    const duration = 338000

    addTrackToActiveTracksList("finalebgm")

    const obj = playLoopingAudio({
        audioID: "finalebgm",
        audioDuration: duration,
        intervalCb(newAudioObj) {
            finaleAudioObj = newAudioObj
        },
    })

    finaleAudioObj = obj!.audioObj;
}

async function manageMenuBGM() {
    if (!state.inMainMenu) return

    const duration = await getAudioDuration({ filePath: "/audio/bgm/menu01.mp3" })

    addTrackToActiveTracksList("menubgm")

    const obj = playLoopingAudio({
        audioID: "menubgm01",
        audioDuration: duration,
        intervalCb(newAudioObj) {
            mainMenuAudioObj = newAudioObj;
        },
    })

    mainMenuAudioObj = obj!.audioObj;
    mainMenuAudioInt = obj!.int;
}

function removeTrackFromActiveTracksList(trackID: string) {
    state.tracksPlaying.splice(state.tracksPlaying.indexOf(trackID), 1)

    console.log("removed track. list:", state.tracksPlaying)
}

function addTrackToActiveTracksList(trackID: string) {
    state.tracksPlaying.splice(state.tracksPlaying.indexOf(trackID), 1)
    state.tracksPlaying.push(trackID)

    console.log("added new track. list:", state.tracksPlaying)
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