import { QualityLevel } from "../etc/qualityLevel";
import { state } from "./state";

export function setQualityLevel(level: QualityLevel) {
    if (level == 1) {
        state.quality = QualityLevel.HIGH
    } else if (level == 0) {
        state.quality = QualityLevel.LOW
    }

    console.log(state.quality)
    
    switch (level) {
        case QualityLevel.HIGH:
            setHighGraphics()
            break;

        case QualityLevel.LOW:
            setLowGraphics()
            break;
    }
}

function setLowGraphics() {
    document.body.classList.add("lowgraphics")
    state.spawnBouncyThings = false;
}

function setHighGraphics() {
    document.body.classList.remove("lowgraphics")
    state.spawnBouncyThings = true;
}