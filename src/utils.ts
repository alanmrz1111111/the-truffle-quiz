export function querySelectorHTML(selector: string) {
    return document.querySelector(selector) as HTMLElement
}

type PoopyHTMLElement = "div" | "img" | "button" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
export type Easing = "ease-in-out" | "ease-in" | "ease-out" | "ease" | "linear"
export type Vec2 = {
    x: number,
    y: number
}

export function create(selector: PoopyHTMLElement) {
    return document.createElement(selector);
}

export function qsaHTML(selector: string) {
    return document.querySelectorAll(selector) as NodeListOf<HTMLElement>
}

export function append(el: Element | HTMLElement | Node | string) {
    document.body.append(el)
}

export async function wait(delay: number) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

export function createObjectOnPos(selector: PoopyHTMLElement, pos: Vec2, usePercentages?: boolean) {
    const el = create(selector)

    if (usePercentages == undefined) usePercentages = false

    el.style.position = "absolute"
    if (!usePercentages) {
        el.style.top = `${pos.y}px`
        el.style.left = `${pos.x}px`
    } else {
        el.style.top = `${pos.y}%`
        el.style.left = `${pos.x}%`
    }

    append(el);

    return el;
}

type CreateObjOnPosBArgs = {
    selector: PoopyHTMLElement,
    pos: Vec2,
    usePercentages?: boolean,
    translate?: boolean,
}

export function createObjectOnPosB(args: CreateObjOnPosBArgs) {
    const el = create(args.selector)

    if (args.usePercentages == undefined) args.usePercentages = false
    if (args.translate == undefined) args.translate = false

    el.style.position = "absolute"
    if (!args.usePercentages) {
        el.style.top = `${args.pos.y}px`
        el.style.left = `${args.pos.x}px`
    } else {
        el.style.top = `${args.pos.y}%`
        el.style.left = `${args.pos.x}%`
    }

    if (args.translate) {
        el.style.translate = "-50% -50%"
    }

    append(el);

    return el;
}

export function changeImageSrc(image: HTMLImageElement, newSrc: string) {
    image.src = newSrc
    return image
}

export function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function randFloat(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

type ShowObjectWithBounceArgs = {
    el: HTMLElement,
    duration: number,
    easing: Easing,
    display: "block" | "flex" | "grid",
    useTransformTranslate?: boolean
}

/**
 * poop
 * @param el HTMLElement
 * @param duration in seconds
 * @param easing easing
 */
export function showObjectWithBounce(args: ShowObjectWithBounceArgs) {
    if (args.useTransformTranslate == false) {
        args.el.style.scale = "0"
    } else {
        args.el.style.transform = "translate(-50%, -50%) scale(0)"
    }

    args.el.style.display = args.display

    if (args.useTransformTranslate == false) {
        args.el.style.animation = `scalebounce ${args.duration}s ${args.easing} forwards`
    } else {
        args.el.style.animation = `scalebouncetr ${args.duration}s ${args.easing} forwards`
    }
}

export function createBoom({ x, y, width, height, usePercentages }: { x: number, y: number, width: number, height: number, usePercentages: boolean }) {
    const boom = createObjectOnPosB({
        selector: "img",
        pos: { x, y },
        translate: true,
        usePercentages
    }) as HTMLImageElement

    boom.src = "/imgs/boom.png"
    setImgDimensions(width, height, boom)

    boom.style.animation = "boom 0.4s linear forwards"
    boom.draggable = false

    boom.addEventListener("animationend", () => boom.remove())

    return boom;
}

export function setImgDimensions(width: number, height: number, img: HTMLImageElement) {
    img.width = width
    img.height = height

    return img;
}

export function date() {
    return new Date()
}

export function forceReflow() {
    document.body.getBoundingClientRect()
}

export function setQuestionAreaPointerEventState(state: "all" | "none") {
    const questionarea = querySelectorHTML(".questionarea")

    questionarea.style.pointerEvents = state;
}

export function aabb(rect1: DOMRect, rect2: DOMRect, margin?: number) {
    if (margin == undefined) margin = 0;

    return rect1.x < rect2.x + rect2.width - margin &&
           rect1.x + rect1.width > rect2.x + margin &&
           rect1.y < rect2.y + rect2.height - margin &&
           rect1.y + rect1.height > rect2.y + margin;
}

export function setCursorVisibilityState(state: "visible" | "hidden") {
    if (state == "visible") {
        document.body.style.cursor = "url('/imgs/cursor.png'), auto";
    } else if (state == "hidden") {
        document.body.style.cursor = "none"
    }
}