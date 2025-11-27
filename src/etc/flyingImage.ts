export type FlyingImageProps = {
    startPos: Coordinates,
    endPos: Coordinates,
    image: string,
    duration?: number,
    width?: number,
    height?: number,
    easing?: Easing,
    zIndex?: number,
    cssStyle?: string,
    onClick?: () => void,
    dataset?: string
}

export type Coordinates = {
    x: number,
    y: number
}

type Easing = "ease-in-out" | "ease-in" | "ease-out" | "ease" | "linear"

/**
 * Coordinates are in percentages, animDuration in seconds, width & height in px.
 */
export async function flyingImage({
    startPos,
    endPos,
    duration = 3,
    image,
    width = 100,
    height = 100,
    easing = "ease",
    zIndex = 1999,
    cssStyle = "",
    onClick = () => {},
    dataset = ""
}: FlyingImageProps): Promise<void> {
    return new Promise<void>((resolve) => {
        const element = document.createElement("img")

        element.src = image
        element.draggable = false
        element.style.cssText = `
            position: fixed;
            top: ${startPos.y}%;
            left: ${startPos.x}%;
            transform: translate(-50%, -50%);
            width: ${width}px;
            height: ${height}px;
            z-index: ${zIndex};
            transition:
                top ${duration}s ${easing},
                left ${duration}s ${easing},
                rotate ${duration}s ${easing};
            ${cssStyle}
            `

        document.body.append(element)

        // force reflow
        element.getBoundingClientRect()

        requestAnimationFrame(() => {
            element.style.top = `${endPos.y}%`
            element.style.left = `${endPos.x}%`
            element.style.rotate = "360deg"
        })

        element.addEventListener("click", onClick)
        element.dataset.flyingImg = ""
        element.dataset.fiCustom = dataset
        
        setTimeout(() => {
            element.remove()
            resolve()
        }, duration * 1000 + 100)
    })
}

export async function flyingImages(images: FlyingImageProps[]) {
    await Promise.all(images.map((props) => flyingImage(props)))
}

/* type FlyingImageBArgs = {
    startPos: Vec2,
    endPos: Vec2,
    image: string,
    duration: number,

}

export function flyingImageB(args: FlyingImageBArgs) {

} */