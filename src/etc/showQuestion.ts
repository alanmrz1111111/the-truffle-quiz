import { state } from "../core/state"
import { gameOverSequence, updateLivesLabel } from "../main"
import { create, Easing, qsaHTML, querySelectorHTML, random, showObjectWithBounce, wait } from "../utils"
import { questions } from "./questions"

export type Answer = {
    text: string,
    correct: boolean,
    fontSize: number
}

type ColorPalette = "allwhite" | "normal" | "darkpurple"

type MoveTextOpts = {
    duration: number,
    easing: Easing,
    delay: number
}

type BombOptions = {
    duration: number,
    delay?: number
    pos?: "top-right" | "bottom-right"
}

export type Question = {
    content: string,
    answers?: Answer[],
    questionEl?: HTMLElement,
    questionElDisplay?: "flex" | "block" | "grid"
    onQuestion: () => void,
    moveText?: MoveTextOpts,
    colorPalette?: ColorPalette,
    bomb?: BombOptions,
    oneChance?: boolean,
    hideQuestionRing?: boolean
}

export function setColorPalette(palette: ColorPalette) {
    if (state.finale) return

    const qring = querySelectorHTML(".qring")
    const qtext = querySelectorHTML(".questionarea > h1")
    const bottomrow = querySelectorHTML(".bottomrow")
    const carrotRow = querySelectorHTML(".bottomrightrow")

    switch (palette) {
        case "allwhite":
            qring.style.filter = "brightness(0) invert(1)"
            qtext.style.filter = "brightness(0) invert(1)";
            bottomrow.style.filter = "brightness(0) invert(1)";
            if (carrotRow) carrotRow.style.filter = "brightness(0) invert(1)"
            break;

        case "normal":
            qring.style.filter = "none"
            qtext.style.filter = "none";
            bottomrow.style.filter = "none";
            if (carrotRow) carrotRow.style.filter = "none"
            break;

        case "darkpurple":
            qring.style.filter = "hue-rotate(300deg) saturate(5) brightness(0.5)"
            qtext.style.filter = "hue-rotate(300deg) saturate(5) brightness(0.5)";
            bottomrow.style.filter = "hue-rotate(300deg) saturate(5) brightness(0.5)";
            if (carrotRow) carrotRow.style.filter = "hue-rotate(300deg) saturate(5) brightness(0.5)"
            break;
    }
}

export function clearBombInterval() {
    if (state.currentBombInterval == 0) return

    clearInterval(state.currentBombInterval);
}

async function manageBomb(bombOpts: BombOptions) {
    if (bombOpts.delay) await wait(bombOpts.delay)

    const bombEl = querySelectorHTML(".bomb")
    const bombText = querySelectorHTML(".bombtext")

    bombEl.style.opacity = "1"
    bombText.textContent = `${bombOpts.duration}`

    state.currentBombTimer = bombOpts.duration;

    clearBombInterval()
    showObjectWithBounce({
        el: bombEl,
        easing: "ease",
        duration: 0.5,
        display: "flex",
        useTransformTranslate: false
    })

    state.currentBombInterval = setInterval(() => {
        state.currentBombTimer -= 1;
        bombText.textContent = `${state.currentBombTimer}`

        if (state.currentBombTimer <= 0) {
            // game over
            clearInterval(state.currentBombInterval);

            if (state.gameOver == true) return;

            gameOverSequence({ bomb: true })
        }
    }, 1000);
}

function oneChanceQuestion() {
    const livesNumberLabel = querySelectorHTML(".lives")
    livesNumberLabel.style.display = "none"

    const livesLabel = querySelectorHTML(".liveslabel")
    livesLabel.textContent = "ONE CHANCE!"
    livesLabel.classList.add("onechance")

    state.danger = true;
}

function oneChanceQuestionCleanup() {
    const livesNumberLabel = querySelectorHTML(".lives")
    livesNumberLabel.style.display = "block"

    const livesLabel = querySelectorHTML(".liveslabel")
    livesLabel.textContent = "LIVES:"
    livesLabel.classList.remove("onechance")

    state.danger = false;
    updateLivesLabel()
}

export async function showQuestion(questionNumber: number) {
    const qst = questions[questionNumber - 1]
    const prevQst = questions[questionNumber - 2]

    if (prevQst) {
        if (prevQst.questionEl) {
            prevQst.questionEl.style.display = "none"
        }
    }

    if (prevQst && prevQst.bomb) {
        clearBombInterval()
    }

    if (prevQst && prevQst.hideQuestionRing) {
        const qring = querySelectorHTML(".qring")
        qring.style.display = "flex"
    }

    const questionText = create("h1")
    const questionArea = querySelectorHTML(".questionarea")
    const btns = qsaHTML(".qbutton.game")

    const existingQText = questionArea.querySelector("h1")

    if (existingQText) existingQText.remove()

    questionArea.append(questionText)

    if (prevQst) {
        if (prevQst.colorPalette != "normal") setColorPalette("normal")
    }

    if (qst.bomb) {
        manageBomb(qst.bomb)
        state.canUseCarrot = true
    } else {
        querySelectorHTML(".bomb").style.opacity = "0"
        querySelectorHTML(".bomb").style.display = "none"
        state.canUseCarrot = false
    }

    if (qst.oneChance) {
        oneChanceQuestion()
    } else oneChanceQuestionCleanup()

    questionText.innerHTML = qst.content;

    if (qst.questionEl) {
        qst.questionEl.style.display = qst.questionElDisplay || "block"
    }

    if (qst.hideQuestionRing) {
        const qring = querySelectorHTML(".qring")
        qring.style.display = "none"
    }

    btns.forEach((btn, i) => {
        if (qst.answers) {
            btn.style.display = "grid"

            btn.textContent = qst.answers[i].text
            btn.style.fontSize = `${qst.answers[i].fontSize}px`;
            btn.dataset.correct = `${qst.answers[i].correct}`

            /* i dont know why it sometimes does the slide appear anim. so just keep this */
            btn.classList.remove("animate")
        } else {
            btn.style.display = "none"
        }
    })

    qst.onQuestion()

    if (qst.colorPalette) setColorPalette(qst.colorPalette)

    if (qst.moveText) {
        if (qst.moveText.delay) await wait(qst.moveText.delay);

        questionText.style.animation = `qtextmoveup ${qst.moveText.duration}s ${qst.moveText.easing} forwards`
    }
}