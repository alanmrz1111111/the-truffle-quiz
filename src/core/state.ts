import { QualityLevel } from "../etc/qualityLevel"

export const MUSIC_VOLUME = 0.15
export const SFX_VOLUME = 0.2

type StateObject = {
    volume: {
        sfx: number,
        music: number
    },
    inMainMenu: boolean,
    questionNumber: number,
    currentBombTimer: number,
    currentBombInterval: number,
    lives: number,
    gameOver: boolean,
    danger: boolean,
    ignoreInput: boolean,
    spawnBouncyThings: boolean,
    enableTab: boolean,
    finale: boolean,
    devMode: boolean
    canUseCarrot: boolean,
    winner: boolean,
    quality: QualityLevel
    tracksPlaying: string[]
}

export const state: StateObject = {
    volume: {
        sfx: SFX_VOLUME,
        music: MUSIC_VOLUME
    },
    inMainMenu: false, 
    questionNumber: 89,
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
    quality: QualityLevel.HIGH,
    tracksPlaying: []
}