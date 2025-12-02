import { querySelectorHTML } from "../utils"

export function trackDebugData() {
    requestAnimationFrame(trackDebugData)

    const elcountlabel = querySelectorHTML("#elcount")
    const memusagelabel = querySelectorHTML("#memlabel")
    const heapSizeLabel = querySelectorHTML("#heapsizelabel")

    elcountlabel.textContent = `${document.querySelectorAll("*").length}`
    // @ts-ignore
    memusagelabel.textContent = `${(performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`

    // @ts-ignore
    heapSizeLabel.textContent = `${(performance.memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`
}