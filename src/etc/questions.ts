import { playAudio, playRandomAudio } from "../core/audio";
import { state } from "../core/state";
import { getGameBGMAudioObject, hideBackground, onCorrectAns, onWrongAns, showBackground } from "../main";
import { aabb, append, create, createBoom, createObjectOnPosB, q75makeCopyrightBtnVisible, qsaHTML, querySelectorHTML, randFloat, random, setCursorVisibilityState, setImgDimensions, setQuestionAreaPointerEventState, showObjectWithBounce, wait } from "../utils";
import { Question } from "./showQuestion";

export const questions: Question[] = [
    {
        content: `<h1 style="font-size: 50px;">WHAT'S THE BEST <p> DAY OF THE YEAR?</h1>`,
        answers: [
            {
                text: "CATURDAY",
                correct: false,
                fontSize: 50
            },
            {
                text: "GREEN DAY",
                correct: true,
                fontSize: 50
            },
            {
                text: "CHRISTMAS",
                correct: false,
                fontSize: 50
            },
            {
                text: "APRIL 17TH",
                correct: false,
                fontSize: 50
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;">how do you <p> create cardboard?</h1>`,
        answers: [
            {
                text: "you don't!",
                correct: false,
                fontSize: 50
            },
            {
                text: "use 3 tablespoons of vinegar",
                correct: false,
                fontSize: 30
            },
            {
                text: "CHEMISTRY!!!",
                correct: false,
                fontSize: 40
            },
            {
                text: "use your boarding card",
                correct: true,
                fontSize: 35
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;">how do you trap a cat?</h1>`,
        answers: [
            {
                text: "CATNAP HIM",
                correct: true,
                fontSize: 45
            },
            {
                text: "that's animal abuse!",
                correct: false,
                fontSize: 30
            },
            {
                text: "Shoot him",
                correct: false,
                fontSize: 45
            },
            {
                text: "place him in a large box",
                correct: false,
                fontSize: 35
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 70px;">HI HERBERT!</h1>`,
        colorPalette: "darkpurple",
        questionEl: querySelectorHTML("#q3"),
        moveText: {
            delay: 1000,
            duration: 0.3,
            easing: "linear"
        },
        onQuestion() {
            let input = ""
            const img = querySelectorHTML(".q3herbert")
            const label = querySelectorHTML(".q3label")

            async function key(e: KeyboardEvent) {
                let ignore = false
                const targetWord = ["h", "e", "l", "l", "o"]

                if (input.length >= 5 && input != "hello") {
                    onWrongAns()
                    input = ""
                    label.textContent = ""
                    ignore = true
                }

                if (targetWord.find(l => l == e.key.toLowerCase()) != undefined) {
                    if (ignore) return

                    input += e.key.toLowerCase()
                    label.textContent = input;
                }

                if (input == "hello") {
                    await wait(200)
                    img.style.backgroundImage = `url("/imgs/q4/herbertB.png")`
                    playAudio({ id: "woosh01" })

                    await wait(750)
                    onCorrectAns()

                    document.removeEventListener("keydown", key)
                }
            }

            document.addEventListener("keydown", key)
        },
    },
    {
        content: `<h1 style="font-size: 70px;">WHO'S YOSHI?</h1>`,
        answers: [
            {
                text: "METH COOK",
                correct: false,
                fontSize: 45
            },
            {
                text: "THE GUY WITH A DIRTY ARSE",
                correct: false,
                fontSize: 35
            },
            {
                text: "green cutie <3",
                correct: false,
                fontSize: 40
            },
            {
                text: "MARIO'S BITCH",
                correct: true,
                fontSize: 40
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;">WHAT HAPPENS IF <p> YOU TAKE TYLENOL?</h1>`,
        answers: [
            {
                text: "YOU GET AUTISM",
                correct: true,
                fontSize: 40
            },
            {
                text: "YOUR PENIS ENLARGES",
                correct: false,
                fontSize: 35
            },
            {
                text: "YOU START PEEING MILK",
                correct: false,
                fontSize: 35
            },
            {
                text: "EGGS BECOME 56.6% CHEAPER",
                correct: false,
                fontSize: 35
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;">WHICH OF THE <p> FOLLOWING IS A REPTILE?</h1>`,
        answers: [
            {
                text: "TESTUDINES",
                correct: false,
                fontSize: 45
            },
            {
                text: "Uroplatus fimbriatus",
                correct: false,
                fontSize: 35
            },
            {
                text: "MARK ZUCKERBERG",
                correct: true,
                fontSize: 35
            },
            {
                text: "Crocodylidae",
                correct: false,
                fontSize: 45
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;">How do you <p> create INFINITY?</h1>`,
        answers: [
            {
                text: "67 + 41",
                correct: false,
                fontSize: 60
            },
            {
                text: "THERE IS NO SUCH THING AS 'INFINITY'",
                correct: false,
                fontSize: 25
            },
            {
                text: "FOB + PLOB",
                correct: false,
                fontSize: 50
            },
            {
                text: "Math.pow(2, Infinity)",
                correct: false,
                fontSize: 40
            },
        ],
        onQuestion() {
            const qring = querySelectorHTML(".qring")
            const qnumber = querySelectorHTML(".qnumber")

            async function flip8() {
                qnumber.classList.add("flipped")
                qnumber.textContent = "8"
                qring.removeEventListener("click", flip8)

                playAudio({ id: "woosh01" })

                await wait(1000)
                onCorrectAns()

                qnumber.classList.remove("flipped")
            }

            qring.addEventListener("click", flip8)
        },
    },
    {
        content: `<h1 style="font-size: 55px;">CLICK THE PIG EYE.</h1>`,
        questionEl: querySelectorHTML("#q9"),
        moveText: {
            duration: 0.5,
            delay: 1000,
            easing: "linear"
        },
        onQuestion() {
            showObjectWithBounce({
                el: querySelectorHTML("#q9"),
                easing: "ease",
                duration: 0.5,
                display: "flex",
                useTransformTranslate: false
            })
        },
        oneChance: true
    },
    {
        content: `<h1 style="font-size: 100px;">I.F.T!</h1>`,
        answers: [
            {
                text: "I FUCKED TED!",
                correct: true,
                fontSize: 45
            },
            {
                text: "Italians For Trump!",
                correct: false,
                fontSize: 38
            },
            {
                text: "i feast on tea!",
                correct: false,
                fontSize: 40
            },
            {
                text: "I Fainted Teasingly",
                correct: false,
                fontSize: 40
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 70px;"></h1>`,
        questionEl: querySelectorHTML("#q11"),
        questionElDisplay: "flex",
        colorPalette: "allwhite",
        onQuestion() {
            const lswitch = createObjectOnPosB({
                selector: "img",
                pos: { x: 9, y: 50 },
                usePercentages: true,
                translate: true
            }) as HTMLImageElement

            const bg = querySelectorHTML("#q11")
            let clicked = false

            lswitch.src = "/imgs/q11/lightswitch.png"
            lswitch.draggable = false
            setImgDimensions(80, 80, lswitch)

            lswitch.classList.add("lswitch")

            lswitch.addEventListener("click", async () => {
                if (clicked) return
                clicked = true

                lswitch.classList.add("active")
                bg.classList.add("q11bg")

                playAudio({ id: "clickandgasp" })

                await wait(1000)
                onCorrectAns()

                lswitch.remove()
            })
        },
    },
    {
        content: `<h1 style="font-size: 70px;">NORWAY</h1>`,
        answers: [
            {
                text: "ERLING HAALAND!",
                correct: false,
                fontSize: 40
            },
            {
                text: "LEFSE!",
                correct: false,
                fontSize: 60
            },
            {
                text: "yes way",
                correct: true,
                fontSize: 60
            },
            {
                text: "RAKFISK!",
                correct: false,
                fontSize: 60
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 60px;" id="qtxt">WATCH OUT!</h1>`,
        moveText: {
            duration: 0.5,
            delay: 1000,
            easing: "linear"
        },
        async onQuestion() {
            const catchables = ["pipsqueak", "truffle", "carrot"]
            const imgs = {
                pipsqueak: "/imgs/pipsqueak01.png",
                truffle: "/imgs/truffle01.png",
                carrot: "/imgs/carrot01.png"
            }

            await wait(1000)

            async function question() {
                await wait(500)

                let toCatch = catchables[random(0, catchables.length)]

                const img = create("img") as HTMLImageElement

                img.classList.add("flyingimage", toCatch)

                // @ts-ignore
                img.src = imgs[toCatch]
                img.draggable = false;

                append(img)

                img.addEventListener("animationend", () => {
                    if (state.gameOver) return;

                    onWrongAns()
                    question()
                })

                img.addEventListener("click", () => {
                    onCorrectAns()
                    img.remove()

                    state.ignoreInput = true;
                })
            }

            question()
        },
    },
    {
        content: `<h1 style="font-size: 50px;">WHICH OF THE FOLLOWING <p> IS NOT A FILE FORMAT?</h1>`,
        bomb: {
            duration: 10
        },
        answers: [
            {
                text: ".TXT",
                correct: false,
                fontSize: 60
            },
            {
                text: ".ZIP",
                correct: false,
                fontSize: 60
            },
            {
                text: ".CPP",
                correct: false,
                fontSize: 60
            },
            {
                text: "MP5",
                correct: true,
                fontSize: 60
            },
        ],
        async onQuestion() {
            await wait(500)
            state.ignoreInput = false;
        },
    },
    {
        content: `<h1 style="font-size: 50px;">WHATS THE NAME OF <p> TRUFFLE'S UNCLE?</h1>`,
        answers: [
            {
                text: "FONGY",
                correct: false,
                fontSize: 60
            },
            {
                text: "ROCO",
                correct: true,
                fontSize: 60
            },
            {
                text: "STRIMPUS",
                correct: false,
                fontSize: 60
            },
            {
                text: "TRUFFLUM PESSTRINUS XVI",
                correct: false,
                fontSize: 35
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;">CLICK THE <p> CORRECT SPELLING.</h1>`,
        answers: [
            {
                text: "AN ALLAN ADVENTURE",
                correct: false,
                fontSize: 40
            },
            {
                text: "ANAL LLAN ADVENTURE",
                correct: false,
                fontSize: 40
            },
            {
                text: "A ALLAN ADVENTURE",
                correct: true,
                fontSize: 40
            },
            {
                text: "NONE OF THEM ARE CORRECT!",
                correct: false,
                fontSize: 35
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;">WHO'S TUCO SALAMANCA?</h1>`,
        answers: [
            {
                text: "RESPECTABLE BIPARTISAN",
                correct: false,
                fontSize: 40
            },
            {
                text: "EVERYBODY WHO KNEW HIM IS DEAD",
                correct: false,
                fontSize: 30
            },
            {
                text: "A PRETTY COOL GUY",
                correct: false,
                fontSize: 40
            },
            {
                text: "AN INSANE, DEGENERATE PIECE OF FILTH",
                correct: true,
                fontSize: 26
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 70px;">PICK TOOTH.</h1>`,
        bomb: {
            duration: 10
        },
        questionEl: querySelectorHTML("#q18"),
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;">HELP HERBERT AVOID WOMEN!</h1>`,
        moveText: {
            delay: 1000,
            duration: 0.5,
            easing: "linear"
        },
        colorPalette: "darkpurple",
        questionEl: querySelectorHTML("#q19"),
        onQuestion() {
            const herbert = document.querySelector(".q19herbert") as HTMLElement
            const rect = herbert.getBoundingClientRect()

            const pos = { x: rect.left, y: rect.top }
            const keyMap = {
                shift: false,
                down: false,
                up: false,
                ctrl: false
            }
            let speed = 3
            let canLoseLife = true
            let timer = 10;

            function keydown(e: KeyboardEvent) {
                if (e.key === "Shift") keyMap.shift = true
                else if (e.key === "ArrowDown") keyMap.down = true
                else if (e.key === "ArrowUp") keyMap.up = true
                else if (e.ctrlKey) keyMap.ctrl = true
            }

            function keyup(e: KeyboardEvent) {
                if (e.key === "Shift") keyMap.shift = false
                else if (e.key === "ArrowDown") keyMap.down = false
                else if (e.key === "ArrowUp") keyMap.up = false
                else if (e.ctrlKey) keyMap.ctrl = false
            }

            document.addEventListener("keydown", keydown)
            document.addEventListener("keyup", keyup)

            const int1 = setInterval(() => {
                timer -= 1;

                if (timer <= 0) {
                    onCorrectAns()

                    clearInterval(int1)
                    clearInterval(int2)
                    clearInterval(int3)
                    clearInterval(int4)

                    const girls = document.querySelectorAll(".q19girl")

                    girls.forEach(girl => girl.remove())
                }
            }, 1000);

            const int2 = setInterval(() => {
                if (state.gameOver) {
                    const girls = document.querySelectorAll(".q19girl")

                    girls.forEach(girl => girl.remove())
                }

                if (keyMap.shift) herbert.classList.add("crouching")
                else herbert.classList.remove("crouching")

                speed = keyMap.ctrl ? 5 : 3

                if (keyMap.down) pos.y += speed
                if (keyMap.up) pos.y -= speed

                herbert.style.top = `${pos.y}px`
            }, 10)

            const int3 = setInterval(() => {
                if (state.gameOver) return;

                const number = random(1, 4)
                const girl = create("div")

                girl.classList.add("q19girl")
                girl.style.backgroundImage = `url('/imgs/q19/girl0${number}.png')`
                girl.style.top = `${random(15, 80)}%`
                girl.style.left = `${random(50, 80)}%`

                append(girl)

                girl.addEventListener("animationend", girl.remove)
            }, 1500)

            const int4 = setInterval(() => {
                const herbertRect = herbert.getBoundingClientRect()
                const girls = document.querySelectorAll(".q19girl")

                girls.forEach(girl => {
                    const girlRect = girl.getBoundingClientRect()
                    const margin = 20

                    if (aabb(herbertRect, girlRect, margin) && canLoseLife) {
                        canLoseLife = false

                        herbert.classList.add("hit")
                        setTimeout(() => herbert.classList.remove("hit"), 300)

                        onWrongAns()

                        setTimeout(() => {
                            canLoseLife = true
                        }, 1000)
                    }
                })
            }, 50)
        },
    },
    {
        content: `<h1 style="font-size: 50px;">WHAT'S THE NAME OF <p> THE SONG PLAYING RIGHT NOW?</h1>`,
        answers: [
            {
                text: "The Truffle Quiz Complete OST (69 tracks)",
                correct: false,
                fontSize: 25
            },
            {
                text: "THE 67 SONG REMIX",
                correct: false,
                fontSize: 40
            },
            {
                text: "GET IT TOGETHER - THE GO TEAM",
                correct: false,
                fontSize: 35
            },
            {
                text: "WHAT SONG?",
                correct: true,
                fontSize: 50
            },
        ],
        onQuestion() {
            getGameBGMAudioObject()?.pause()
        },
    },
    {
        content: `<h1 style="font-size: 50px;">HOW MANY <p> NIBBLES IN A BITE?</h1>`,
        answers: [
            {
                text: "TWO",
                correct: true,
                fontSize: 55
            },
            {
                text: "FOUR",
                correct: false,
                fontSize: 55
            },
            {
                text: "ONE",
                correct: false,
                fontSize: 55
            },
            {
                text: "SIX",
                correct: false,
                fontSize: 50
            },
        ],
        onQuestion() {
            getGameBGMAudioObject()?.play()
        },
    },
    {
        content: `<h1 style="font-size: 60px;">AVOID THE ROCKS!</h1>`,
        moveText: {
            delay: 1000,
            duration: 0.5,
            easing: "linear"
        },
        questionEl: querySelectorHTML("#q22"),
        colorPalette: "allwhite",
        onQuestion() {
            let canLoseLife = true
            let timer = 10;

            async function handleLoseLife() {
                if (!canLoseLife) return;

                onWrongAns()

                canLoseLife = false

                await wait(1000)
                canLoseLife = true
            }

            const int1 = setInterval(() => {
                timer -= 1;

                if (timer <= 0) {
                    onCorrectAns()
                    const rocks = qsaHTML(".q22rock")
                    rocks.forEach(rock => rock.remove())

                    clearInterval(int1)
                    clearInterval(int2)
                }
            }, 1000);

            const int2 = setInterval(() => {
                if (state.gameOver) {
                    const rocks = qsaHTML(".q22rock")
                    rocks.forEach(rock => rock.remove())

                    return;
                }

                const rock = create("img") as HTMLImageElement

                let willScale = false;

                if (random(1, 3) == 2) willScale = true;

                rock.src = "/imgs/q22/rock.gif"

                rock.classList.add("q22rock")
                rock.style.top = `${random(5, 90)}%`

                if (willScale) {
                    rock.style.scale = `${randFloat(1.3, 2.2)}`
                }

                append(rock)

                rock.addEventListener("animationend", rock.remove)

                rock.addEventListener("mouseover", handleLoseLife)
            }, 350);
        },
    },
    {
        content: `<h1 style="font-size: 50px;">WHAT DOES PAINT <p> THINNER TASTE LIKE?</h1>`,
        answers: [
            {
                text: "CHEMICALS",
                correct: false,
                fontSize: 50
            },
            {
                text: "A VERY OLD HORSESHOE",
                correct: false,
                fontSize: 40
            },
            {
                text: "PEACHES AND CREAM",
                correct: true,
                fontSize: 40
            },
            {
                text: "PISS",
                correct: false,
                fontSize: 60
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;">WHO CREATED THIS GAME?</h1>`,
        answers: [
            {
                text: "A BUNCH OF HIGHLY INTELLIGENT SADISTIC ALIENS",
                correct: true,
                fontSize: 25
            },
            {
                text: "A 3 YEAR OLD",
                correct: false,
                fontSize: 45
            },
            {
                text: "THE GOVERNMENT",
                correct: false,
                fontSize: 35
            },
            {
                text: "AN ASSHOLE WITH NO FRIENDS",
                correct: false,
                fontSize: 35
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 100px;">YTMND.</h1>`,
        answers: [
            {
                text: "WHAT?",
                correct: false,
                fontSize: 60
            },
            {
                text: "YOU'RE THE MAN NOW DOG!",
                correct: true,
                fontSize: 40
            },
            {
                text: "YOUTUBE MONDAYS, NO DUCKING!",
                correct: false,
                fontSize: 35
            },
            {
                text: "PUNCH THE KEYS FOR GOD'S SAKE!",
                correct: false,
                fontSize: 35
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;">WHAT HAPPENS WHEN YOU <p> DRINK CORONA BEER?</h1>`,
        answers: [
            {
                text: "YOU GET DRUNK",
                correct: false,
                fontSize: 40
            },
            {
                text: "YOUR LIVER HARDENS",
                correct: false,
                fontSize: 40
            },
            {
                text: "YOUR BRAIN BECOMES 6.46% SMALLER",
                correct: false,
                fontSize: 30
            },
            {
                text: "YOU GET CORONAVIRUS",
                correct: true,
                fontSize: 35
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;"></h1>`,
        bomb: {
            duration: 5
        },
        oneChance: true,
        questionEl: querySelectorHTML("#q27"),
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 70px;">SYNAPSE!</h1>`,
        bomb: {
            duration: 7
        },
        moveText: {
            duration: 0.5,
            delay: 500,
            easing: "linear"
        },
        questionEl: querySelectorHTML("#q28"),
        colorPalette: "allwhite",
        onQuestion() {
            const neuron = querySelectorHTML(".q28neurons") as HTMLImageElement
            let clicks = 0;
            let ignoreClicks = false;

            async function handleClick() {
                if (ignoreClicks) return

                clicks++;

                if (clicks >= 20) {
                    ignoreClicks = true
                    neuron.src = "/imgs/q28/active.gif"

                    playAudio({ id: "shock" })

                    await wait(1000)
                    onCorrectAns()
                }
            }

            neuron.addEventListener("click", handleClick)
        },
    },
    {
        content: `<h1 style="font-size: 50px;">WHAT ARE PIGS AFRAID OF?</h1>`,
        answers: [
            {
                text: "TOM CRUISE",
                correct: false,
                fontSize: 50
            },
            {
                text: "CHICKENS",
                correct: false,
                fontSize: 50
            },
            {
                text: "DAVID CAMERONS TINY SCROTUM",
                correct: true,
                fontSize: 35
            },
            {
                text: "MEXICANS",
                correct: false,
                fontSize: 60
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;">IS THIS THE LAST QUESTION?</h1>`,
        answers: [
            {
                text: "IF YOU'RE PLAYING THE DEMO, YEA!",
                correct: false,
                fontSize: 33
            },
            {
                text: "NOPE.",
                correct: true,
                fontSize: 65
            },
            {
                text: "36 MILLION MORE QUESTIONS TO GO",
                correct: false,
                fontSize: 30
            },
            {
                text: "NO ONE KNOWS",
                correct: false,
                fontSize: 45
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 45px;">WHAT WAS HERBERT'S FIRST <p> APPEARANCE IN THIS GAME?</h1>`,
        answers: [
            {
                text: "QUESTION SIX",
                correct: false,
                fontSize: 40
            },
            {
                text: "QUESTION NINE",
                correct: false,
                fontSize: 40
            },
            {
                text: "QUESTION FOUR",
                correct: true,
                fontSize: 40
            },
            {
                text: "QUESTION NINETEEN",
                correct: false,
                fontSize: 38
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 80px;"></h1>`,
        questionEl: querySelectorHTML("#q32"),
        onQuestion() {
            const bg = querySelectorHTML(".q32bg")
            let clicks = 0;
            let ignore = false

            async function handleClick() {
                if (ignore) return

                clicks++;

                if (clicks >= 10) {
                    ignore = true

                    playAudio({ id: "collapse" })

                    const text = create("h1")

                    text.style.fontSize = "100px";

                    text.textContent = "HUH."
                    text.classList.add("gradienttext")

                    bg.classList.add("active")

                    append(text)

                    await wait(2000)

                    text.remove()
                    onCorrectAns()
                }
            }

            bg.addEventListener("click", handleClick)
        },
    },
    {
        content: `<h1 style="font-size: 45px;">SOMETHING IS MISSING...</h1>`,
        answers: [
            {
                text: "YOU'RE GOING INSANE",
                correct: false,
                fontSize: 40
            },
            {
                text: "YOUR BRAIN",
                correct: false,
                fontSize: 50
            },
            {
                text: "YOUR VIRGINITY",
                correct: false,
                fontSize: 40
            },
            {
                text: "*squirts* oops :3",
                correct: false,
                fontSize: 40
            },
        ],
        onQuestion() {
            const something = createObjectOnPosB({
                pos: { x: 70, y: 83 },
                usePercentages: true,
                selector: "h1"
            })

            something.textContent = "SOMETHING"
            something.classList.add("something")

            something.addEventListener("click", async () => {
                something.textContent = "OH HELLO!"
                something.style.opacity = "1"
                something.style.color = "chartreuse"

                await wait(500)

                onCorrectAns()
                something.remove()
            })
        },
    },
    {
        content: `<h1 style="font-size: 45px;">WHEN IS THE LABUBU <p> MOVIE COMING OUT?</h1>`,
        answers: [
            {
                text: "DECEMBER 16TH, 2029",
                correct: false,
                fontSize: 40
            },
            {
                text: "LABUBUPTEMBER 4TH, 2026",
                correct: false,
                fontSize: 40
            },
            {
                text: "MUSTARD 67TH, 2067",
                correct: false,
                fontSize: 40
            },
            {
                text: "WE ALL DIED ON 2020 AND THIS IS HELL",
                correct: true,
                fontSize: 30
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 45px;"></h1>`,
        colorPalette: "allwhite",
        oneChance: true,
        questionEl: querySelectorHTML("#q35"),
        onQuestion() {
            const icon = querySelectorHTML(".q35icon");
            const iconRect = icon.getBoundingClientRect();
            const spikes = qsaHTML(".spikes")

            let pos = { x: iconRect.left, y: iconRect.top };
            let vel = { x: 0, y: 0 };

            const moveSpeed = 6;
            const jumpVelocity = -13;
            const gravity = 0.5;

            let isJumping = false;
            let rafId: number;
            let ignoreDamage = false;

            function getSmallerHitbox(rect: DOMRect, a = 10) {
                return {
                    left: rect.left + a,
                    right: rect.right - a,
                    top: rect.top + a,
                    bottom: rect.bottom - a
                };
            }

            function spikeCollision(icon: DOMRect, spike: DOMRect) {
                return !(
                    icon.right < spike.left + 20 ||
                    icon.left > spike.right - 20 ||
                    icon.bottom < spike.top ||
                    icon.top > spike.bottom
                );
            }

            function checkSpikeCollision() {
                if (ignoreDamage) return

                const iconRectSm = getSmallerHitbox(icon.getBoundingClientRect(), 20) as DOMRect;

                for (let spike of spikes) {
                    const spikeRect = spike.getBoundingClientRect();

                    if (spikeCollision(iconRectSm, spikeRect)) {
                        onWrongAns()

                        ignoreDamage = true
                        break;
                    }
                }
            }

            function gameLoop() {
                pos.x += moveSpeed;

                vel.y += gravity;

                pos.y += vel.y;

                const floorY = iconRect.top;
                if (pos.y >= floorY) {
                    pos.y = floorY;
                    vel.y = 0;
                    isJumping = false;
                }

                icon.style.left = `${pos.x}px`;
                icon.style.top = `${pos.y}px`;

                rafId = requestAnimationFrame(gameLoop);

                checkSpikeCollision()

                if (pos.x > 850) {
                    onCorrectAns()
                    cancelAnimationFrame(rafId)
                }
            }

            rafId = requestAnimationFrame(gameLoop);

            document.addEventListener("click", () => {
                if (!isJumping) {
                    vel.y = jumpVelocity;
                    isJumping = true;

                    icon.classList.add("jumping")
                }
            });
        },
    },
    {
        content: `<h1 style="font-size: 45px;">WHICH CHEESE IS <p> FOND OF THE EUROPEAN UNION?</h1>`,
        answers: [
            {
                text: "PARMIGIANO REGGIANO",
                correct: false,
                fontSize: 40
            },
            {
                text: "FONDEU",
                correct: true,
                fontSize: 60
            },
            {
                text: "RICOTTA",
                correct: false,
                fontSize: 60
            },
            {
                text: "PROVOLONE",
                correct: false,
                fontSize: 50
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 45px;">WHAT IS THE NAME <p> OF THIS GAME'S MASCOT?</h1>`,
        answers: [
            {
                text: "HERBERT",
                correct: false,
                fontSize: 60
            },
            {
                text: "FOB",
                correct: false,
                fontSize: 60
            },
            {
                text: "CARROT",
                correct: false,
                fontSize: 60
            },
            {
                text: "TRUFFLE",
                correct: true,
                fontSize: 60
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 45px;">WHAT IS THE UNIX <p> TIMESTAMP FOR 9/11?</h1>`,
        answers: [
            {
                text: `1203520999`,
                correct: false,
                fontSize: 60
            },
            {
                text: "1025113560",
                correct: false,
                fontSize: 60
            },
            {
                text: "1000210380",
                correct: true,
                fontSize: 60
            },
            {
                text: "998859300",
                correct: false,
                fontSize: 60
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;">CLICK THE MIKU NUMBER.</h1>`,
        bomb: {
            duration: 10,
        },
        moveText: {
            delay: 1000,
            duration: 0.6,
            easing: "linear"
        },
        onQuestion() {
            const qring = querySelectorHTML(".qring")
            const row = querySelectorHTML(".row.q39")

            qring.classList.add("miku")
            qring.style.filter = ""

            showObjectWithBounce({
                el: querySelectorHTML(".row.q39"),
                easing: "ease",
                duration: 0.5,
                display: "flex"
            })

            function handleClick() {
                onCorrectAns()

                playAudio({ id: "miku" })

                qring.removeEventListener("click", handleClick)
                qring.classList.remove("miku")
                row.remove()
            }

            qring.addEventListener("click", handleClick)
        },
    },
    {
        content: `<h1 style="font-size: 45px; font-family: 'wingdings';">WHERE DO YOU <p> COOK PANCAKES?</h1>`,
        answers: [
            {
                text: `IN THE OVEN`,
                correct: false,
                fontSize: 45
            },
            {
                text: "LONDON",
                correct: false,
                fontSize: 50
            },
            {
                text: "IN A PAN",
                correct: true,
                fontSize: 40
            },
            {
                text: "CAMBODIA",
                correct: false,
                fontSize: 45
            },
        ],
        onQuestion() {
            const qbuttons = qsaHTML(".qbutton")

            qbuttons.forEach(btn => btn.style.fontFamily = "wingdings")
        },
    },
    {
        content: `<h1 style="font-size: 60px;"></h1>`,
        questionEl: querySelectorHTML("#q41"),
        colorPalette: "darkpurple",
        async onQuestion() {
            const qbuttons = qsaHTML(".qbutton")
            const herbert = querySelectorHTML(".q41herbert")
            const herbertRect = herbert.getBoundingClientRect()
            const label = querySelectorHTML(".q41text")
            const objs: HTMLElement[] = []

            const foodImgs = ["carrot.png", "cookie.png", "pizza.png"]
            const hazardImgs = ["clock.png", "bottle.png", "rock.png"]

            let mouthOpen = false;
            let rafId: number;
            let goal = 15
            let foodEaten = 0;
            let canLoseLife = true

            let int1: number;

            label.textContent = `${foodEaten}/${goal}`

            qbuttons.forEach(btn => btn.style.fontFamily = "gamefont")

            document.addEventListener("click", onClick)

            function onClick() {
                mouthOpen = !mouthOpen

                herbert.classList.toggle("mouthopen", mouthOpen)

                if (mouthOpen) {
                    playAudio({ id: "herbertopenmouth" })
                } else {
                    playAudio({ id: "herbertclosemouth" })
                }
            }

            function createFood() {
                let isHazard = random(1, 3) == 2;

                const el = create("div")
                const img = foodImgs[random(0, foodImgs.length)]
                const hazardImg = hazardImgs[random(0, hazardImgs.length)]

                el.classList.add("food")

                if (isHazard) {
                    el.classList.add("hazard")

                    el.style.backgroundImage = `url('/imgs/q41/${hazardImg}')`

                    if (hazardImg == "bottle.png") {
                        el.style.height = "90px"
                    }
                }

                if (!isHazard) {
                    el.style.backgroundImage = `url('/imgs/q41/${img}')`

                    if (img == "carrot.png") {
                        el.style.height = "90px"
                    }
                }

                append(el)

                objs.push(el)

                el.addEventListener("animationend", () => {
                    const index = objs.indexOf(el)
                    objs.splice(index, 1)

                    el.remove()

                    if (!isHazard && canLoseLife) {
                        onWrongAns()

                        canLoseLife = false

                        setTimeout(() => {
                            canLoseLife = true
                        }, 1000);
                    }
                })
            }

            await wait(500)

            createFood()

            int1 = setInterval(() => {
                createFood()
            }, 250);

            function update() {
                if (state.gameOver) {
                    objs.forEach(obj => obj.remove())
                    clearInterval(int1)
                    document.removeEventListener("click", onClick)

                    return;
                }

                rafId = requestAnimationFrame(update)

                for (let i = 0; i < objs.length; i++) {
                    const obj = objs[i]
                    const rect = obj.getBoundingClientRect()

                    if (
                        mouthOpen &&
                        rect.left <= herbertRect.right &&
                        rect.left >= herbertRect.right - 60 &&
                        rect.top < herbertRect.bottom
                    ) {
                        objs.splice(i, 1)

                        if (obj.classList.contains("hazard")) {
                            onWrongAns()
                            obj.remove()

                            playAudio({ id: "ow" })

                            herbert.classList.remove("mouthopen")

                            mouthOpen = false;

                            continue;
                        }

                        obj.remove()

                        playAudio({ id: "munch" })

                        foodEaten++;

                        if (foodEaten >= goal) {
                            onCorrectAns()

                            clearInterval(int1)
                            objs.forEach(obj => obj.remove())

                            cancelAnimationFrame(rafId)
                            document.removeEventListener("click", onClick)

                            state.ignoreInput = true

                            setTimeout(() => {
                                state.ignoreInput = false
                            }, 250);
                        }

                        label.textContent = `${foodEaten}/${goal}`
                    }
                }
            }

            update()
        },
    },
    {
        content: `<h1 style="font-size: 70px;">
                    <span style="font-size: 45px;">WHAT'S MISSING HERE?</span> <p>
                    <span class="purpletext">LA, LE, LI. LO, LU</span>
                  </h1>`,
        bomb: {
            duration: 10
        },
        answers: [
            {
                text: `NOTHING`,
                correct: false,
                fontSize: 60
            },
            {
                text: "H",
                correct: false,
                fontSize: 60
            },
            {
                text: "A COMMA",
                correct: true,
                fontSize: 60
            },
            {
                text: "YOUR QUIZ SUCKS",
                correct: false,
                fontSize: 40
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 55px;">WHAT DISEASE <p> DOES MARIO HAVE?</h1>`,
        answers: [
            {
                text: "ARTHRITIS",
                correct: false,
                fontSize: 55
            },
            {
                text: "CRYPTOCOCCOSIS",
                correct: true,
                fontSize: 40
            },
            {
                text: "CANCER",
                correct: false,
                fontSize: 60
            },
            {
                text: "DIABETES",
                correct: false,
                fontSize: 60
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 55px;">FIND THE TRUFFLES!</h1>`,
        questionEl: querySelectorHTML("#q44"),
        colorPalette: "allwhite",
        moveText: {
            duration: 0.5,
            delay: 1000,
            easing: "linear"
        },
        onQuestion() {
            const questionarea = querySelectorHTML(".questionarea")
            const truffles = [
                {
                    pos: { x: 80, y: 10 },
                },
                {
                    pos: { x: 15, y: 65 },
                },
                {
                    pos: { x: 80, y: 80 },
                }
            ]

            const els: HTMLElement[] = []

            let count = 0;
            let goal = 3;

            truffles.forEach(truffle => {
                const obj = createObjectOnPosB({
                    pos: truffle.pos,
                    usePercentages: true,
                    selector: "div"
                })

                obj.classList.add("q44truffle")

                obj.addEventListener("click", () => {
                    if (obj.getAttribute("collected") == "true") return

                    obj.classList.add("active")
                    obj.setAttribute("collected", "true")
                    count++;

                    playAudio({ id: "clank" })

                    if (count >= goal) {
                        playAudio({ id: "crazy02" })

                        els.forEach(el => {
                            el.classList.add("tocenter")
                        })

                        setTimeout(() => {
                            onCorrectAns()
                            els.forEach(el => el.remove())
                        }, 5000);
                    }
                })

                els.push(obj)
            })

            questionarea.style.pointerEvents = "none"
        },
    },
    {
        content: `<h1 style="font-size: 45px;">WHAT DO YOU CALL A <p> HORSE WHO SPEWS WATER?</h1>`,
        answers: [
            {
                text: "JONATHAN",
                correct: false,
                fontSize: 55
            },
            {
                text: "A FUGLEMESSE!",
                correct: false,
                fontSize: 43
            },
            {
                text: "A SEAHORSE",
                correct: false,
                fontSize: 50
            },
            {
                text: "A HOSE",
                correct: true,
                fontSize: 60
            },
        ],
        onQuestion() {
            querySelectorHTML(".questionarea").style.pointerEvents = "all"
        },
    },
    {
        content: `<h1 style="font-size: 50px;">WHAT IS TRUFFLE'S <p> FAVORITE FOOD?</h1>`,
        answers: [
            {
                text: "CAT FOOD",
                correct: false,
                fontSize: 60
            },
            {
                text: "PANCAKES",
                correct: false,
                fontSize: 60
            },
            {
                text: "FRIED RATTLESNAKE",
                correct: true,
                fontSize: 40
            },
            {
                text: "FAIRY BREAD",
                correct: false,
                fontSize: 50
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;"></h1>`,
        colorPalette: "allwhite",
        questionEl: querySelectorHTML("#q47"),
        onQuestion() {
            const car = create("div");
            const endpoint = querySelectorHTML(".q47endpoint");
            append(car);

            car.classList.add("q47car")

            hideBackground()

            playAudio({ id: "wind" })

            document.body.style.background = "white"

            const initialCarRect = car.getBoundingClientRect();
            const pos = { x: initialCarRect.left, y: initialCarRect.top };
            const keys = { up: false, down: false, left: false, right: false };
            const obstacles = [
                {
                    pos: { x: 0, y: 60 },
                    size: { w: 250, h: 450 }
                },
                {
                    pos: { x: 0, y: -15 },
                    size: { w: 350, h: 300 }
                },
                {
                    pos: { x: 41.2, y: -10 },
                    size: { w: 200, h: 530 }
                },
                {
                    pos: { x: 29.4, y: 90 },
                    size: { w: 800, h: 450 }
                },
                {
                    pos: { x: 80, y: 58 },
                    size: { w: 800, h: 100 }
                },
                {
                    pos: { x: 102, y: 0 },
                    size: { w: 100, h: 800 }
                },
                {
                    pos: { x: 64.7, y: 30 },
                    size: { w: 215, h: 95 }
                },
                {
                    pos: { x: 80, y: -13 },
                    size: { w: 200, h: 200 }
                },
                {
                    pos: { x: 0, y: -10 },
                    size: { w: 900, h: 20 }
                },
            ]

            const obstacleEls: HTMLElement[] = []

            let rafId: number
            let canLoseLife = true

            let velX = 0;
            let velY = 0;

            const accel = 0.3;
            const maxSpeed = 8;
            const friction = 0.01;

            function onKeyPress(e: KeyboardEvent) {
                if (e.key === "ArrowUp") keys.up = true;
                if (e.key === "ArrowDown") keys.down = true;
                if (e.key === "ArrowLeft") keys.left = true;
                if (e.key === "ArrowRight") keys.right = true;
            }

            function onKeyUp(e: KeyboardEvent) {
                if (e.key === "ArrowUp") keys.up = false;
                if (e.key === "ArrowDown") keys.down = false;
                if (e.key === "ArrowLeft") keys.left = false;
                if (e.key === "ArrowRight") keys.right = false;
            }

            document.addEventListener("keydown", onKeyPress);
            document.addEventListener("keyup", onKeyUp);

            obstacles.forEach(obs => {
                const obstacleEl = create("div")

                obstacleEl.classList.add("q47obs")

                obstacleEl.style.left = `${obs.pos.x}%`
                obstacleEl.style.top = `${obs.pos.y}%`

                obstacleEl.style.width = `${obs.size.w}px`
                obstacleEl.style.height = `${obs.size.h}px`

                append(obstacleEl)

                obstacleEls.push(obstacleEl)
            })

            function update() {
                if (state.gameOver) {
                    obstacleEls.forEach(obs => obs.remove())
                    car.remove()

                    showBackground()

                    document.body.style.background = "radial-gradient(ellipse, #ffc18e, #ffbc8f)"

                    cancelAnimationFrame(rafId)
                    return;
                }

                rafId = requestAnimationFrame(update);

                if (keys.up) velY -= accel;
                if (keys.down) velY += accel;
                if (keys.left) velX -= accel;
                if (keys.right) velX += accel;

                if (!keys.up && !keys.down) {
                    velY *= (1 - friction);
                }
                if (!keys.left && !keys.right) {
                    velX *= (1 - friction);
                }

                if (keys.left) {
                    car.style.rotate = "180deg"
                } else if (keys.right) {
                    car.style.rotate = "0deg"
                }

                velX = Math.max(-maxSpeed, Math.min(maxSpeed, velX));
                velY = Math.max(-maxSpeed, Math.min(maxSpeed, velY));

                pos.x += velX;
                pos.y += velY;

                car.style.left = `${pos.x}px`;
                car.style.top = `${pos.y}px`;

                if (pos.x + car.offsetWidth > endpoint.getBoundingClientRect().left &&
                    pos.x < endpoint.getBoundingClientRect().right &&
                    pos.y + car.offsetHeight > endpoint.getBoundingClientRect().top &&
                    pos.y < endpoint.getBoundingClientRect().bottom) {
                    onCorrectAns()
                    cancelAnimationFrame(rafId)
                    document.removeEventListener("keydown", onKeyPress);
                    document.removeEventListener("keyup", onKeyUp);

                    qsaHTML(".q47obs").forEach(obs => obs.remove())
                    car.remove()

                    showBackground()

                    document.body.style.background = "radial-gradient(ellipse, #ffc18e, #ffbc8f)"
                }

                obstacleEls.forEach(obstacle => {
                    if (!canLoseLife) return;

                    const obsRect = obstacle.getBoundingClientRect();
                    const playerRect = car.getBoundingClientRect();

                    const margin = 13;
                    const isColliding =
                        playerRect.x < obsRect.x + obsRect.width - margin &&
                        playerRect.x + playerRect.width > obsRect.x + margin &&
                        playerRect.y < obsRect.y + obsRect.height - margin &&
                        playerRect.y + playerRect.height > obsRect.y + margin;

                    if (isColliding) {
                        canLoseLife = false;
                        onWrongAns();

                        pos.y = initialCarRect.top;
                        pos.x = initialCarRect.left;

                        velX = 0
                        velY = 0

                        setTimeout(() => {
                            canLoseLife = true;
                        }, 200);
                    }
                })
            }

            update();
        }
    },
    {
        content: `<h1 style="font-size: 50px;">DID YOU ENJOY QUESTION 47?</h1>`,
        answers: [
            {
                text: "I LOVED IT!",
                correct: false,
                fontSize: 50
            },
            {
                text: "IT WAS OKAY",
                correct: false,
                fontSize: 45
            },
            {
                text: "MY NIPPLES ARE HARD",
                correct: true,
                fontSize: 40
            },
            {
                text: "I WOULD RATHER EAT GLASS BEFORE PLAYING THAT AGAIN",
                correct: false,
                fontSize: 25
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 60px;">JE NE SAIS QUOI?</h1>`,
        answers: [
            {
                text: "BAGUETTE",
                correct: false,
                fontSize: 55
            },
            {
                text: "I DON'T KNOW",
                correct: true,
                fontSize: 45
            },
            {
                text: "TES CHEVEUX SONT DÉLICIEUX",
                correct: false,
                fontSize: 35
            },
            {
                text: "OUI!",
                correct: false,
                fontSize: 60
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 45px;">CONGRATULATIONS, YOU MADE <p> IT TO THE HALFWAY MARK!</h1>`,
        answers: [
            {
                text: "YAY!",
                correct: false,
                fontSize: 55
            },
            {
                text: "THIS QUIZ SUCKS",
                correct: false,
                fontSize: 40
            },
            {
                text: "FRANCE",
                correct: false,
                fontSize: 60
            },
            {
                text: "OK.",
                correct: true,
                fontSize: 60
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;">SELL YOUR TESTICLES TO...</h1>`,
        answers: [
            {
                text: "NORWEGIANS",
                correct: true,
                fontSize: 50
            },
            {
                text: "AUSTRALIANS",
                correct: false,
                fontSize: 45
            },
            {
                text: "DR. PLEEGLEPOO",
                correct: false,
                fontSize: 40
            },
            {
                text: "THE REPUBLICAN PARTY",
                correct: false,
                fontSize: 35
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;">WHAT DOES 'LOL' STAND FOR?</h1>`,
        answers: [
            {
                text: "LAUGHING OUT LOUD",
                correct: false,
                fontSize: 40
            },
            {
                text: "LONG ONION LIVER",
                correct: false,
                fontSize: 40
            },
            {
                text: "LI'L OLIVIA LONGBOTTOM",
                correct: false,
                fontSize: 40
            },
            {
                text: "LOTS OF LOVE",
                correct: true,
                fontSize: 45
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;">I AM 53 YEARS OLD, <p> IN WHAT YEAR WAS I BORN?</h1>`,
        bomb: {
            duration: 10
        },
        oneChance: true,
        answers: [
            {
                text: "1970",
                correct: false,
                fontSize: 80
            },
            {
                text: "1969",
                correct: false,
                fontSize: 80
            },
            {
                text: "1972",
                correct: true,
                fontSize: 80
            },
            {
                text: "1973",
                correct: false,
                fontSize: 80
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;">WHAT IS THE 27TH <p> LETTER OF THE ALPHABET?</h1>`,
        answers: [
            {
                text: "WHAT ARE YOU TALKING ABOUT",
                correct: false,
                fontSize: 40
            },
            {
                text: "AMPERSAND",
                correct: true,
                fontSize: 45
            },
            {
                text: "THERE ISN'T A 27TH LETTER",
                correct: false,
                fontSize: 40
            },
            {
                text: "SHUT UP YOU STUPID IDIOT",
                correct: false,
                fontSize: 40
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;"></h1>`,
        bomb: {
            duration: 7
        },
        questionEl: querySelectorHTML("#q55"),
        onQuestion() {
            const text = querySelectorHTML(".q55text")
            const obj = querySelectorHTML(".q55obj")
            const inputLabel = querySelectorHTML(".q55input")

            const objects = ["fish", "herbert", "duck", "egg", "eye"]

            let selectedObj: string;
            let canType = false;
            let inputString = ""

            async function input(e: KeyboardEvent) {
                if (e.shiftKey || e.ctrlKey || e.altKey || !canType) return

                if (e.key === "Backspace") {
                    inputString = inputString.slice(0, -1)
                } else {
                    inputString += e.key.toUpperCase()
                }

                inputLabel.textContent = inputString

                if (inputString.endsWith(selectedObj.toUpperCase())) {
                    await wait(250)

                    onCorrectAns()
                    document.removeEventListener("keydown", input)
                }
            }

            function onIntEnd() {
                const randomObj = objects[random(0, objects.length)]
                text.remove()

                playAudio({ id: "woosh02" })

                obj.classList.add(randomObj)

                selectedObj = randomObj

                showObjectWithBounce({
                    el: obj,
                    duration: 0.5,
                    easing: "ease",
                    display: "block"
                })

                canType = true

                document.addEventListener("keydown", input)
            }

            const int = setInterval(() => {
                text.textContent += "."

                if (text.textContent!.length == 3) {
                    clearInterval(int)

                    setTimeout(() => {
                        onIntEnd()
                    }, 500);
                }
            }, 500);
        },
    },
    {
        content: `<h1 style="font-size: 50px;">WHAT COLOR IS A MIRROR?</h1>`,
        bomb: {
            duration: 10
        },
        answers: [
            {
                text: "BLUE",
                correct: false,
                fontSize: 60
            },
            {
                text: "RED",
                correct: false,
                fontSize: 60
            },
            {
                text: "GREEN",
                correct: true,
                fontSize: 60
            },
            {
                text: "PURPLE",
                correct: false,
                fontSize: 60
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;">TWO DYSLEXICS <p> WALK INTO A BRA...</h1>`,
        answers: [
            {
                text: "THEY START GROPING EACH OTHER.",
                correct: false,
                fontSize: 30
            },
            {
                text: "*slaps my gassy belly* HAHAHA! WHAT A FUNNY JOKE.",
                correct: false,
                fontSize: 25
            },
            {
                text: "OKAY..?",
                correct: false,
                fontSize: 60
            },
            {
                text: "THEY LICK EACH OTHER'S NIPPLES.",
                correct: true,
                fontSize: 35
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;"></h1>`,
        questionEl: querySelectorHTML("#q58"),
        colorPalette: "darkpurple",
        onQuestion() {
            const herbert = querySelectorHTML(".q58herbert")
            const crosshair = querySelectorHTML(".q58crosshair")
            const questionarea = querySelectorHTML(".questionarea")
            const counter = querySelectorHTML(".q58text")

            const demonEls: HTMLElement[] = []
            const collisionBoxes: HTMLElement[] = []

            questionarea.style.pointerEvents = "none"

            playAudio({ id: "guncock" })

            let rafId: number
            let gameStarted = false
            let int1: number
            let goal = 12
            let demonsShot = 0;

            counter.textContent = `${demonsShot}/${goal}`

            document.addEventListener("mousemove", updateCrosshair)

            document.addEventListener("click", shoot)

            function shoot(e: MouseEvent) {
                if (!gameStarted) return;

                playAudio({ id: "shotgun" })

                const boom = createBoom({
                    x: e.clientX,
                    y: e.clientY,
                    width: 64,
                    height: 64,
                    usePercentages: false
                })

                boom.style.cursor = "none"
                boom.style.opacity = "0.5"
                boom.style.pointerEvents = "none"

                const collBox = create("div")
                collBox.classList.add("q58collbox")

                collBox.style.left = `${e.clientX - 10}px`
                collBox.style.top = `${e.clientY - 10}px`

                append(collBox)
                collisionBoxes.push(collBox)

                setTimeout(() => {
                    collBox.remove()
                    collisionBoxes.splice(collisionBoxes.indexOf(collBox), 1)
                }, 150);
            }

            function updateCrosshair(e: MouseEvent) {
                crosshair.style.left = `${e.clientX}px`
                crosshair.style.top = `${e.clientY}px`
            }

            function update() {
                if (state.gameOver) {
                    cancelAnimationFrame(rafId)
                    demonEls.forEach(demon => demon.remove())
                }

                rafId = requestAnimationFrame(update);

                const demonsToRemove: HTMLElement[] = [];

                for (let i = demonEls.length - 1; i >= 0; i--) {
                    const demonEl = demonEls[i];
                    const demonRect = demonEl.getBoundingClientRect();

                    for (let j = 0; j < collisionBoxes.length; j++) {
                        const collBox = collisionBoxes[j];
                        const collRect = collBox.getBoundingClientRect();

                        if (aabb(demonRect, collRect, 0) && !demonEl.classList.contains("hit")) {
                            playRandomAudio(["squish01", "squish02"]);
                            updateCount();
                            demonEl.classList.add("hit");
                            demonsToRemove.push(demonEl);
                            break;
                        }
                    }
                }

                demonsToRemove.forEach(demon => {
                    setTimeout(() => {
                        const index = demonEls.indexOf(demon);
                        if (index !== -1) demonEls.splice(index, 1);
                        demon.remove();
                    }, 300);
                });
            }

            function updateCount() {
                demonsShot++;
                counter.textContent = `${demonsShot}/${goal}`

                if (demonsShot >= goal) {
                    gameStarted = false

                    onCorrectAns()
                    cancelAnimationFrame(rafId)

                    collisionBoxes.forEach(box => box.remove())
                    demonEls.forEach(demon => demon.remove())

                    document.removeEventListener("mousemove", updateCrosshair)
                    document.removeEventListener("click", shoot)

                    crosshair.remove()

                    clearInterval(int1)
                }
            }

            update()

            int1 = setInterval(() => {
                if (!gameStarted) return

                const demonEl = create("div")
                const appearFromRight = random(1, 3) == 2

                demonEl.classList.add("q58demon")

                demonEl.style.left = appearFromRight ? "100%" : "0%"
                demonEl.style.top = `${random(10, 80)}%`

                demonEl.style.animationDuration = `${randFloat(1.3, 1.7)}s`

                if (appearFromRight) {
                    demonEl.style.animationName = "q58demonmoveleft"
                    demonEl.style.scale = "1 1"
                }

                append(demonEl)

                demonEls.push(demonEl)

                demonEl.addEventListener("animationend", () => {
                    const index = demonEls.indexOf(demonEl)
                    demonEls.splice(index, 1)
                    demonEl.remove()

                    onWrongAns()
                })
            }, 500);

            function addCrosshair() {
                crosshair.classList.add("active")
                gameStarted = true
            }

            herbert.addEventListener("animationend", addCrosshair)
        },
    },
    {
        content: `<h1 style="font-size: 70px;">HEY MEN..</h1>`,
        answers: [
            {
                text: "OH HELLO THERE.",
                correct: false,
                fontSize: 40
            },
            {
                text: "WE ARE CHARLIE KIRK",
                correct: false,
                fontSize: 40
            },
            {
                text: "AND THEY ARE PIGS #LOL",
                correct: true,
                fontSize: 35
            },
            {
                text: "HERBERT THE DEMON SLAYER",
                correct: false,
                fontSize: 35
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 45px;">WHICH ELEMENTS STYLIZE <p> THE BREAKING BAD LOGO?</h1>`,
        bomb: {
            duration: 10
        },
        answers: [
            {
                text: "BARIUM AND BORON",
                correct: false,
                fontSize: 35
            },
            {
                text: "BISMUTH AND BROMINE",
                correct: false,
                fontSize: 35
            },
            {
                text: "BROMINE AND BARIUM",
                correct: true,
                fontSize: 35
            },
            {
                text: "BORON AND BERYLLIUM",
                correct: false,
                fontSize: 35
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 80px;">DEJA VU?</h1>`,
        answers: [
            {
                text: "I FUCKED TED!",
                correct: false,
                fontSize: 45
            },
            {
                text: "GREEN DAY",
                correct: true,
                fontSize: 50
            },
            {
                text: "A ALLAN ADVENTURE",
                correct: false,
                fontSize: 40
            },
            {
                text: "*squirts* oops :3*",
                correct: false,
                fontSize: 40
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 80px;"></h1>`,
        questionEl: querySelectorHTML("#q62"),
        onQuestion() {
            state.enableTab = true

            const btn = querySelectorHTML("#q62btn")

            setQuestionAreaPointerEventState("none")

            btn.addEventListener("mouseover", () => {
                btn.style.left = `${random(15, 90)}%`
                btn.style.top = `${random(15, 90)}%`
            })

            btn.addEventListener("click", () => {
                onCorrectAns()
                btn.remove()

                state.enableTab = false
            })
        },
    },
    {
        content: `<h1 style="font-size: 50px;">WHAT ARE MCDONALDS <p> BURGERS MADE OF?</h1>`,
        answers: [
            {
                text: "COW TUMORS",
                correct: false,
                fontSize: 45
            },
            {
                text: "100% USDA-inspected beef patties",
                correct: false,
                fontSize: 30
            },
            {
                text: "ROTTEN COW LYMPH NODES",
                correct: true,
                fontSize: 35
            },
            {
                text: "TASTELESS DARK FILTH",
                correct: false,
                fontSize: 40
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 70px;"></h1>`,
        questionEl: querySelectorHTML("#q64"),
        bomb: {
            duration: 13
        },
        onQuestion() {
            const player = querySelectorHTML(".q64cone")
            const mailman = querySelectorHTML(".q64mailman")
            const counter = querySelectorHTML("#q64counter")

            setCursorVisibilityState("hidden")

            const initialPlayerRect = player.getBoundingClientRect()
            const playerPos = { x: initialPlayerRect.left, y: initialPlayerRect.top }
            const keys = {
                left: false,
                right: false,
                up: false,
                down: false,
                w: false,
            }

            const letters: HTMLElement[] = []

            let rafId: number;
            let int: number;

            let velX = 0;
            let velY = 0;
            let goal = 10
            let cardsOnScreen = 0;
            let carryingLetter = false;
            let collected = 0;

            const accel = 2;
            const friction = 0.05
            const maxSpeed = 8

            function updateCounter() {
                counter.textContent = `${collected}/${goal}`
            }

            function keydown(e: KeyboardEvent) {
                if (e.key == "ArrowLeft") {
                    keys.left = true
                } else if (e.key == "ArrowRight") {
                    keys.right = true
                } else if (e.key == "ArrowUp") {
                    keys.up = true
                } else if (e.key == "ArrowDown") {
                    keys.down = true
                } else if (e.key == "w") {
                    keys.w = true
                }
            }

            function keyup(e: KeyboardEvent) {
                if (e.key == "ArrowLeft") {
                    keys.left = false
                } else if (e.key == "ArrowRight") {
                    keys.right = false
                } else if (e.key == "ArrowUp") {
                    keys.up = false
                } else if (e.key == "ArrowDown") {
                    keys.down = false
                } else if (e.key == "w") {
                    keys.w = false
                }
            }

            document.addEventListener("keydown", keydown)
            document.addEventListener("keyup", keyup)

            function update() {
                rafId = requestAnimationFrame(update)

                if (keys.left) velX -= accel;
                if (keys.right) velX += accel;
                if (keys.up) velY -= accel
                if (keys.down) velY += accel

                if (!keys.left && !keys.right) {
                    velX *= (1 - friction);
                }

                if (!keys.up && !keys.left) {
                    velY *= (1 - friction);
                }

                if (keys.left) {
                    player.style.scale = "-1 1"
                } else if (keys.right) {
                    player.style.scale = "1 1"
                }

                velX = Math.max(-maxSpeed, Math.min(maxSpeed, velX));
                velY = Math.max(-maxSpeed, Math.min(maxSpeed, velY));

                playerPos.x += velX;
                playerPos.y += velY;

                player.style.left = `${playerPos.x}px`
                player.style.top = `${playerPos.y}px`

                checkPlayerToLetterCollision()
                checkPlayerToMailmanCollision()
            }

            function checkPlayerToMailmanCollision() {
                const playerRect = player.getBoundingClientRect()
                const mailmanRect = mailman.getBoundingClientRect()
                const margin = 12

                if (aabb(playerRect, mailmanRect, margin) && carryingLetter) {
                    carryingLetter = false;

                    onLetterEndCarry()

                    mailman.style.backgroundImage = "url('/imgs/q64/mailman_happy.png')"

                    const letterClass = player.querySelector(".q64letter")?.id;
                    player.querySelector(".q64letter")?.remove()

                    if (letterClass == "red") {
                        mailman.style.backgroundImage = "url('/imgs/q64/mailman.png')"
                    }

                    if (letterClass != "red") {
                        playRandomAudio(["pop01", "pop02"])
                    }

                    let bonus = 0;

                    if (letterClass == "normal") {
                        bonus = 1;
                    } else if (letterClass == "red") {
                        onRedLetter()
                    } else if (letterClass == "green") {
                        bonus = 3;
                    } else if (letterClass == "blue") {
                        bonus = 2;
                    }

                    collected += bonus;

                    if (collected >= goal) {
                        cleanup()
                    }

                    const eff = createObjectOnPosB({
                        pos: { x: mailmanRect.x, y: mailmanRect.y },
                        usePercentages: false,
                        selector: "div",
                    })

                    eff.classList.add("q64effect")
                    eff.textContent = `+${bonus}`

                    eff.classList.add(letterClass!)

                    eff.addEventListener("animationend", eff.remove)

                    if (bonus == 0) {
                        eff.textContent = `-1`
                    }

                    updateCounter()
                }
            }

            function cleanup() {
                document.removeEventListener("keydown", keydown)
                document.removeEventListener("keyup", keyup)

                const letters = qsaHTML(".q64letter")
                letters.forEach(letter => letter.remove())

                cancelAnimationFrame(rafId)
                onCorrectAns()

                clearInterval(int)
            }

            function onRedLetter() {
                if (collected < 1) {
                    playAudio({ id: "fart" })
                    return
                }

                collected--;
                playAudio({ id: "ow" })

                mailman.classList.add("damage")

                setTimeout(() => {
                    mailman.classList.remove("damage")
                }, 500);
            }

            function checkPlayerToLetterCollision() {
                letters.forEach(letter => {
                    const letterRect = letter.getBoundingClientRect()
                    const playerRect = player.getBoundingClientRect()
                    const margin = 5

                    if (aabb(playerRect, letterRect, margin) && keys.w && !carryingLetter) {
                        player.appendChild(letter)

                        letters.splice(letters.indexOf(letter), 1)

                        carryingLetter = true;
                        cardsOnScreen--;

                        playRandomAudio([
                            "paper01", "paper02"
                        ])

                        onLetterStartCarry()
                    }
                })
            }

            function onLetterStartCarry() {
                mailman.classList.add("pulse")
            }

            function onLetterEndCarry() {
                mailman.classList.remove("pulse")
            }

            int = setInterval(() => {
                if (cardsOnScreen >= goal) {
                    clearInterval(int)
                };

                cardsOnScreen++;

                const el = create("div")
                const cont = querySelectorHTML(".container")
                el.classList.add("q64letter")

                const variants = ["normal", "normal", "normal", "red", "red", "green", "blue", "blue"]
                const selectedVariant = variants[random(0, variants.length)]

                el.classList.add(selectedVariant)
                el.id = selectedVariant

                el.style.left = `${random(20, 70)}%`
                el.style.top = `${random(20, 90)}%`

                cont.append(el)

                letters.push(el)
            }, 500);

            update()
        },
    },
    {
        content: `<h1 style="font-size: 50px;">WHERE CAN YOU <p> COOK UP 3D MODELS?</h1>`,
        answers: [
            {
                text: "ON A BLENDER",
                correct: true,
                fontSize: 40
            },
            {
                text: "ON YOUR COMPUTER",
                correct: false,
                fontSize: 40
            },
            {
                text: "IN YOUR ROOM",
                correct: false,
                fontSize: 40
            },
            {
                text: "ON THE BATHROOM",
                correct: false,
                fontSize: 40
            },
        ],
        onQuestion() {
            setCursorVisibilityState("visible")
        },
    },
    {
        content: `<h1 style="font-size: 50px;"></h1>`,
        questionEl: querySelectorHTML("#q66"),
        onQuestion() {
            getGameBGMAudioObject()?.pause()

            const cursor = querySelectorHTML(".q66cursor")
            const inputLabel = querySelectorHTML(".q66inputlabel")
            const livesLabel = querySelectorHTML("#q66liveslabel")

            let input = ""
            livesLabel.textContent = `${state.lives}`

            setInterval(() => {
                if (cursor.style.opacity == "1") {
                    cursor.style.opacity = "0"
                } else {
                    cursor.style.opacity = "1"
                }
            }, 500);

            function onInput(e: KeyboardEvent) {
                if (e.ctrlKey || e.altKey || e.shiftKey) return;

                if (e.key == "Enter") {
                    if (input == "1") {
                        onCorrectAns()

                        document.removeEventListener("keydown", onInput)

                    } else {
                        onWrongAns()
                        livesLabel.textContent = `${state.lives}`
                        input = ""

                        inputLabel.textContent = input;

                        return;
                    }
                }

                if (e.key == "Backspace") {
                    input = input.slice(0, -1)
                } else {
                    input += e.key;
                }

                inputLabel.textContent = input;
            }

            document.addEventListener("keydown", onInput)
        },
    },
    {
        content: `<h1 style="font-size: 50px;">WHAT IS THE VALUE <p> OF GRAVITY ON EARTH?</h1>`,
        bomb: {
            duration: 10
        },
        answers: [
            {
                text: "9.90",
                correct: false,
                fontSize: 70
            },
            {
                text: "9.83",
                correct: false,
                fontSize: 70
            },
            {
                text: "9.81",
                correct: false,
                fontSize: 70
            },
            {
                text: "9.80",
                correct: true,
                fontSize: 70
            },
        ],
        onQuestion() {
            getGameBGMAudioObject()?.play()
        },
    },
    {
        content: `<h1 style="font-size: 35px;">WE DON'T TALK ENOUGH ABOUT HOW <p> STRESSFUL HALLOWEEN COSTUMES <p> ARE FOR THE ADHD COMMUNITY.</h1>`,
        answers: [
            {
                text: "THAT'S TRUE.",
                correct: false,
                fontSize: 45
            },
            {
                text: "OMG YOU PEOPLE CAN'T DO ANYTHING.",
                correct: true,
                fontSize: 30
            },
            {
                text: "QUIT YAPPING",
                correct: false,
                fontSize: 45
            },
            {
                text: "HALLOWEEN IS SATANIC",
                correct: false,
                fontSize: 40
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;">WHICH OF THE FOLLOWING <p> GLIDES OVER ALL?</h1>`,
        answers: [
            {
                text: "TOM CRUISE",
                correct: false,
                fontSize: 50
            },
            {
                text: "JOE BIDEN",
                correct: false,
                fontSize: 50
            },
            {
                text: "HANK SCHRADER",
                correct: true,
                fontSize: 40
            },
            {
                text: "PLANES",
                correct: false,
                fontSize: 60
            },
        ],
        onQuestion() { },
    },
    {
        content: `<h1 style="font-size: 50px;">WHAT DOES 'PPAP' STAND FOR?</h1>`,
        answers: [
            {
                text: "PEN PINEAPPLE APPLE PEN",
                correct: true,
                fontSize: 40
            },
            {
                text: "PRODUCTION PART APPROVAL PROCESS",
                correct: false,
                fontSize: 35
            },
            {
                text: "PENIS PORRIDGE AWAKE PIZZA",
                correct: false,
                fontSize: 38
            },
            {
                text: "PLANES PLANNING A PEEWEE",
                correct: false,
                fontSize: 35
            },
        ],
        onQuestion() { }
    },
    {
        content: `<h1 style="font-size: 50px;">WHAT IS THE HIGHEST <p> RATED SHOW ON IMDB?</h1>`,
        answers: [
            {
                text: "BETTER CALL SAUL",
                correct: false,
                fontSize: 40
            },
            {
                text: "THE SOPRANOS",
                correct: false,
                fontSize: 45
            },
            {
                text: "DEXTER",
                correct: false,
                fontSize: 60
            },
            {
                text: "BREAKING BAD",
                correct: true,
                fontSize: 45
            },
        ],
        onQuestion() { }
    },
    {
        content: `<h1 style="font-size: 60px;">ORDER ALPHABETICALLY.</h1>`,
        moveText: {
            duration: 0.5,
            delay: 1000,
            easing: "linear"
        },
        bomb: {
            duration: 10
        },
        onQuestion() {
            const numEls = qsaHTML(".q72num")
            const nums: string[] = []

            showObjectWithBounce({
                duration: 0.5,
                easing: "ease",
                el: querySelectorHTML("#q72"),
                display: "flex",
                useTransformTranslate: false
            })

            function onNumClick(e: MouseEvent) {
                const target = e.target as HTMLElement

                if (target.dataset.q72Num) {
                    nums.push(target.dataset.q72Num)
                    setNumPosition(target, target.dataset.q72Num)

                    playRandomAudio(["clank", "clang01"])
                }
            }

            function setNumPosition(el: HTMLElement, num: string) {
                el.classList.add("grayscale")

                const posEl = create("h2")

                posEl.classList.add("q72numpos")

                let ordinal: string = "st";
                const index = nums.indexOf(num)

                switch (index) {
                    case 0:
                        ordinal = "st"
                        break;

                    case 1:
                        ordinal = "nd"
                        break;

                    case 2:
                        ordinal = "rd"
                        break;

                    default:
                        ordinal = "th"
                        break;
                }

                posEl.textContent = `${index + 1}${ordinal}`

                el.appendChild(posEl)

                const correct =
                    nums.indexOf("four") == 0 &&
                    nums.indexOf("one") == 1 &&
                    nums.indexOf("three") == 2 &&
                    nums.indexOf("two") == 3

                if (correct) {
                    setTimeout(() => {
                        onCorrectAns()

                        const questionEl = querySelectorHTML("#q72")

                        questionEl.remove()
                    }, 150);
                } else if (!correct && nums.length >= 4) {
                    setTimeout(() => {
                        onWrongAns()

                        numEls.forEach(el => {
                            el.classList.remove("grayscale")
                            el.querySelector(".q72numpos")?.remove()
                            nums.length = 0
                        })
                    }, 150);
                }
            }

            numEls.forEach(el => {
                el.addEventListener("click", onNumClick)
            })
        }
    },
    {
        content: `<h1 style="font-size: 70px;">WHY, JUST WHY!!!</h1>`,
        bomb: {
            duration: 5
        },
        answers: [
            {
                text: "RIP BOZO",
                correct: false,
                fontSize: 55
            },
            {
                text: "I DON'T KNOW",
                correct: false,
                fontSize: 45
            },
            {
                text: "OMFG!!1",
                correct: false,
                fontSize: 55
            },
            {
                text: "PORTUGAL",
                correct: false,
                fontSize: 50
            },
        ],
        onQuestion() {
            let int: number

            const bg = querySelectorHTML(".bg")

            bg.style.animationDuration = "10s"

            int = setInterval(() => {
                if (state.gameOver) {
                    clearInterval(int)
                    return
                }

                const el = create("div")

                el.classList.add("q73rock")
                el.style.scale = `${randFloat(1.0, 3.5)}`

                el.style.left = `${random(0, 100)}%`

                append(el)

                el.addEventListener("animationend", el.remove)

                playRandomAudio([
                    "clank", "clang01", "collapse", "shotgun", "loselife",
                    "glass"
                ])
            }, 150);

            function handleInput(e: KeyboardEvent) {
                if (e.key.toLowerCase() == "y") {
                    onCorrectAns()
                    clearInterval(int);

                    qsaHTML(".q73rock").forEach(rock => rock.remove())

                    document.removeEventListener("keydown", handleInput)
                }
            }

            document.addEventListener("keydown", handleInput)
        }
    },
    {
        content: `<h1 style="font-size: 50px;">SOMETHING FEELS <p> OUT OF PLACE...</h1>`,
        answers: [
            {
                text: "HMMMM...",
                correct: false,
                fontSize: 60
            },
            {
                text: "FINLAND",
                correct: false,
                fontSize: 55
            },
            {
                text: "LEPROSY",
                correct: false,
                fontSize: 60
            },
            {
                text: "DIGESTIVES",
                correct: true,
                fontSize: 50
            },
        ],
        onQuestion() {
            const bg = querySelectorHTML(".bg")

            bg.style.animationDuration = "70s"

            const copyrightbtn = querySelectorHTML(".copyrightbtn")

            copyrightbtn.style.display = "block"
            copyrightbtn.style.zIndex = "9999"

            copyrightbtn.dataset.btn = ""
            copyrightbtn.dataset.correct = "true"
        }
    },
    {
        content: `<h1 style="font-size: 70px;"></h1>`,
        questionEl: querySelectorHTML("#q75"),
        oneChance: true,
        colorPalette: "allwhite",
        async onQuestion() {
            q75makeCopyrightBtnVisible()

            await wait(800)

            const attacks = ["herbert", "ufo", "pooboo"]
            const cont = querySelectorHTML("#q75")
            const earth = querySelectorHTML(".q75earth")

            let chosenAttack = "";
            let attackCount = 0;

            function getRandomAttack() {
                chosenAttack = attacks[random(0, attacks.length)];

                attackCount++;

                if (attackCount >= 4) {
                    onCorrectAns()
                    return;
                }

                manageAttack()
            }

            getRandomAttack()

            function manageAttack() {
                switch (chosenAttack) {
                    case "herbert":
                        herbertAttack()
                        break;

                    case "ufo":
                        ufoAttack()
                        break;

                    case "pooboo":
                        poobooAttack()
                        break;
                }
            }

            function poobooAttack() {
                const pooboo = create("div")
                let dead = false
                let clicked = false

                pooboo.classList.add("q75pooboo", "gliding")

                cont.appendChild(pooboo)

                pooboo.addEventListener("animationend", () => {
                    pooboo.classList.add("stationary")

                    playAudio({ id: "munch" })

                    earth.classList.add("gone")

                    setTimeout(() => {
                        onWrongAns()
                    }, 700);
                })

                pooboo.addEventListener("click", () => {
                    if (dead || clicked) return
                    dead = true
                    clicked = true

                    const rect = pooboo.getBoundingClientRect()
                    pooboo.classList.remove("gliding")

                    pooboo.style.left = `${rect.x}px`
                    pooboo.style.top = `${rect.y}px`

                    pooboo.classList.add("dead")

                    playAudio({ id: "screechFadeOut" })

                    setTimeout(() => {
                        pooboo.remove()
                    }, 300);

                    setTimeout(() => {
                        attacks.splice(attacks.indexOf(chosenAttack), 1)

                        getRandomAttack()
                    }, 1000);
                })
            }

            async function ufoAttack() {
                const ufo = create("div")
                let dead = false
                let clicked = false;

                ufo.classList.add("q75ufo", "flying")

                ufo.addEventListener("click", () => {
                    if (clicked) return
                    clicked = true

                    const rect = ufo.getBoundingClientRect()

                    ufo.classList.remove("flying")

                    ufo.style.left = `${rect.x}px`
                    ufo.style.top = `${rect.y}px`

                    ufo.classList.add("dead")

                    dead = true

                    playAudio({ id: "fart" })

                    setTimeout(() => {
                        attacks.splice(attacks.indexOf(chosenAttack), 1)

                        getRandomAttack()
                    }, 1000);
                })

                cont.appendChild(ufo)

                await wait(910)

                if (dead) return

                const ufoRect = ufo.getBoundingClientRect()
                const bomb = createObjectOnPosB({
                    pos: { x: ufoRect.x, y: ufoRect.y },
                    selector: "div",
                    usePercentages: false
                })

                bomb.classList.add("q75bomb")

                playAudio({ id: "pop01" })

                bomb.addEventListener("animationend", () => {
                    const bombRect = bomb.getBoundingClientRect()

                    createBoom({
                        x: bombRect.x + 30,
                        y: bombRect.y + 30,
                        width: 200,
                        height: 200,
                        usePercentages: false
                    })

                    bomb.classList.add("boom")
                    earth.classList.add("gone")

                    playAudio({ id: "bigBoom" })

                    setTimeout(() => {
                        onWrongAns()
                    }, 700);
                })
            }

            function herbertAttack() {
                const herbert = create("div")

                let dead = false;
                let clicked = false;

                herbert.classList.add("q75herbert", "gliding")

                cont.append(herbert)

                const sfx = playAudio({ id: "herbertOpenMouthAngry", getObject: true })

                herbert.addEventListener("click", () => {
                    if (clicked) return
                    clicked = true

                    const rect = herbert.getBoundingClientRect()

                    herbert.classList.remove("gliding")

                    herbert.style.left = `${rect.x}px`
                    herbert.style.top = `${rect.y}px`

                    herbert.classList.add("dead")

                    sfx?.pause()

                    playAudio({ id: "fart" })
                    playAudio({ id: "herbertDie" })

                    dead = true

                    setTimeout(() => {
                        attacks.splice(attacks.indexOf(chosenAttack), 1)

                        getRandomAttack()
                    }, 1000);
                })

                herbert.addEventListener("animationend", () => {
                    if (dead) return

                    playAudio({ id: "munch" })

                    earth.classList.add("gone")

                    herbert.classList.add("mouthclosed")

                    setTimeout(() => {
                        onWrongAns()
                    }, 500);
                })
            }
        }
    },
    {
        content: `<h1 style="font-size: 50px;">WHAT FOOD <p> MAKES YOU SCREAM?</h1>`,
        answers: [
            {
                text: "CHICKEN FINGERS",
                correct: false,
                fontSize: 40
            },
            {
                text: "ICE CREAM",
                correct: true,
                fontSize: 50
            },
            {
                text: "FRIED RATTLESNAKE",
                correct: false,
                fontSize: 40
            },
            {
                text: "SWISS CHEESE",
                correct: false,
                fontSize: 40
            },
        ],
        onQuestion() { }
    },
    {
        content: `<h1 style="font-size: 100px;">66 + 3 = ?</h1>`,
        answers: [
            {
                text: "?",
                correct: true,
                fontSize: 70
            },
            {
                text: "LOL 69!",
                correct: false,
                fontSize: 60
            },
            {
                text: "42069",
                correct: false,
                fontSize: 60
            },
            {
                text: "HOLD ON. LEMME ASK CHATGPT.",
                correct: false,
                fontSize: 35
            },
        ],
        onQuestion() { }
    },
    {
        content: `<h1 style="font-size: 50px;">WHAT DID YOU <p> DO LAST CHRISTMAS?</h1>`,
        answers: [
            {
                text: "I PISSED ON MY COUSIN'S PRESENT",
                correct: false,
                fontSize: 35
            },
            {
                text: "I KILLED 4 ELDERLY MEN",
                correct: false,
                fontSize: 40
            },
            {
                text: "NOTHING. I'M A FAILURE WITH NO FRIENDS.",
                correct: false,
                fontSize: 25
            },
            {
                text: "UH, I GAVE YOU MY HEART?",
                correct: true,
                fontSize: 35
            },
        ],
        onQuestion() { }
    },
    {
        content: `<h1 style="font-size: 50px;"></h1>`,
        onQuestion() { }
    }
]