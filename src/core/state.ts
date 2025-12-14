import { QualityLevel } from "../etc/qualityLevel"
import { questions } from "../etc/questions"

export const MUSIC_VOLUME = 0.15
export const SFX_VOLUME = 0.2

export const state = {
    volume: {
        sfx: SFX_VOLUME,
        music: MUSIC_VOLUME
    },
    inMainMenu: false, 
    questionNumber: 86,
    currentBombTimer: 0,
    currentBombInterval: 0,
    lives: 3,
    gameOver: false,
    danger: false,
    ignoreInput: false,
    spawnBouncyThings: true,
    enableTab: false,
    devMode: true,
    finale: false,
    canUseCarrot: false,
    winner: false,
    quality: QualityLevel.HIGH
}