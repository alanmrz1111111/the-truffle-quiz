import { querySelectorHTML } from "../utils";

export async function transition({ type }: { type: "in" | "out" }) {
    return new Promise<void>(resolve => {
        const overlay = querySelectorHTML(".transitionoverlay")

        function handleTransitionEnd() {
            overlay.removeEventListener("transitionend", handleTransitionEnd)
            overlay.classList.remove("in")
            overlay.classList.remove("out")

            resolve()
        }

        if (!overlay) return

        overlay.classList.forEach(cls => overlay.classList.remove(cls))
        overlay.classList.add("transitionoverlay")

        overlay.classList.add(type)

        overlay.addEventListener("transitionend", handleTransitionEnd)
    })
}