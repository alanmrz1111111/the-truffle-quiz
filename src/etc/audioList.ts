import { AudioObject } from "../core/audio";
import { state } from "../core/state";

export const audioList: AudioObject[] = [
    {
        src: "/audio/fart01.mp3",
        volume: state.volume.sfx,
        id: "fart",
        bus: "sfx"
    },
    {
        src: "/audio/boom01.mp3",
        volume: state.volume.sfx,
        id: "boom01",
        bus: "sfx"
    },
    {
        src: "/audio/woosh1.mp3",
        volume: state.volume.sfx,
        id: "woosh01",
        bus: "sfx"
    },
    {
        src: "/audio/woosh2.mp3",
        volume: state.volume.sfx,
        id: "woosh02",
        bus: "sfx"
    },
    {
        src: "/audio/crazy1.mp3",
        volume: state.volume.sfx,
        id: "crazy01",
        bus: "sfx"
    },
    {
        src: "/audio/quack.mp3",
        volume: state.volume.sfx,
        id: "quack01",
        bus: "sfx"
    },
    {
        src: "/audio/crazy02.mp3",
        volume: state.volume.sfx,
        id: "crazy02",
        bus: "sfx"
    },
    {
        src: "/audio/clank.mp3",
        volume: state.volume.sfx,
        id: "clank",
        bus: "sfx"
    },
    {
        src: "/audio/bgm/menu01.mp3",
        volume: state.volume.music,
        id: "menubgm01",
        bus: "music"
    },
    {
        src: "/audio/startquiz.mp3",
        volume: state.volume.sfx,
        id: "startquiz",
        bus: "sfx"
    },
    {
        src: "/audio/ding.mp3",
        volume: state.volume.sfx,
        id: "ding",
        bus: "sfx"
    },
    {
        src: "/audio/bgm/game01.mp3",
        volume: state.volume.music,
        id: "gamebgm01",
        bus: "music"
    },
    {
        src: "/audio/clang01.mp3",
        volume: state.volume.sfx,
        id: "clang01",
        bus: "sfx"
    },
    {
        src: "/audio/loselife.mp3",
        volume: state.volume.sfx,
        id: "loselife",
        bus: "sfx"
    },
    {
        src: "/audio/gameover.mp3",
        volume: state.volume.sfx,
        id: "gameover",
        bus: "sfx"
    },
    {
        src: "/audio/clickAndGasp.mp3",
        volume: state.volume.sfx,
        id: "clickandgasp",
        bus: "sfx"
    },
    {
        src: "/audio/shock.mp3",
        volume: state.volume.sfx,
        id: "shock",
        bus: "sfx"
    },
    {
        src: "/audio/happyfart.mp3",
        volume: state.volume.sfx,
        id: "woohoo",
        bus: "sfx"
    },
    {
        src: "/audio/bgm/settings01.mp3",
        volume: state.volume.music,
        id: "settingsbgm",
        bus: "music"
    },
    {
        src: "/audio/menuclick.mp3",
        volume: state.volume.sfx,
        id: "menuclick",
        bus: "sfx"
    },
    {
        src: "/audio/miku.mp3",
        volume: state.volume.sfx,
        id: "miku",
        bus: "sfx"
    },
    {
        src: "/audio/collapse.mp3",
        volume: state.volume.sfx,
        id: "collapse",
        bus: "sfx"
    },
    {
        src: "/audio/munch.mp3",
        volume: state.volume.sfx,
        id: "munch",
        bus: "sfx"
    },
    {
        src: "/audio/damage.mp3",
        volume: state.volume.sfx,
        id: "ow",
        bus: "sfx"
    },
    {
        src: "/audio/herbertOpenMouth.mp3",
        volume: state.volume.sfx,
        id: "herbertopenmouth",
        bus: "sfx"
    },
    {
        src: "/audio/herbertCloseMouth.mp3",
        volume: state.volume.sfx,
        id: "herbertclosemouth",
        bus: "sfx"
    },
    {
        src: "/audio/glass.mp3",
        volume: state.volume.sfx,
        id: "glass",
        bus: "sfx"
    },
    {
        src: "/audio/wind.mp3",
        volume: state.volume.sfx,
        id: "wind",
        bus: "sfx"
    },
    {
        src: "/audio/shotgun.mp3",
        volume: state.volume.sfx - 0.1,
        id: "shotgun",
        bus: "sfx"
    },
    {
        src: "/audio/squish01.mp3",
        volume: state.volume.sfx,
        id: "squish01",
        bus: "sfx"
    },
    {
        src: "/audio/squish02.mp3",
        volume: state.volume.sfx,
        id: "squish02",
        bus: "sfx"
    },
    {
        src: "/audio/guncock.mp3",
        volume: state.volume.sfx,
        id: "guncock",
        bus: "sfx"
    },
    {
        src: "/audio/paper.mp3",
        volume: state.volume.sfx,
        id: "paper01",
        bus: "sfx"
    },
    {
        src: "/audio/paper02.mp3",
        volume: state.volume.sfx,
        id: "paper02",
        bus: "sfx"
    },
    {
        src: "/audio/pops/pop01.mp3",
        volume: state.volume.sfx,
        id: "pop01",
        bus: "sfx"
    },
    {
        src: "/audio/pops/pop02.mp3",
        volume: state.volume.sfx,
        id: "pop02",
        bus: "sfx"
    },
    {
        src: "/audio/herbert/openMouth_angry.mp3",
        volume: state.volume.sfx,
        id: "herbertOpenMouthAngry",
        bus: "sfx"
    },
    {
        src: "/audio/herbert/die.mp3",
        volume: state.volume.sfx,
        id: "herbertDie",
        bus: "sfx"
    },
    {
        src: "/audio/bigBoom.mp3",
        volume: state.volume.sfx,
        id: "bigBoom",
        bus: "sfx"
    },
    {
        src: "/audio/screech.mp3",
        volume: state.volume.sfx,
        id: "screech",
        bus: "sfx"
    },
    {
        src: "/audio/screechFadeOut.mp3",
        volume: state.volume.sfx,
        id: "screechFadeOut",
        bus: "sfx"
    },
    {
        src: "/audio/blow.mp3",
        volume: state.volume.sfx,
        id: "blow",
        bus: "sfx"
    },
    {
        src: "/audio/ding2.mp3",
        volume: state.volume.sfx,
        id: "ding2",
        bus: "sfx"
    },
    {
        src: "/audio/ahh.mp3",
        volume: state.volume.sfx,
        id: "ahh",
        bus: "sfx"
    },
    {
        src: "/audio/slam.mp3",
        volume: state.volume.sfx,
        id: "slam",
        bus: "sfx"
    },
    {
        src: "/audio/sirens.mp3",
        volume: state.volume.sfx,
        id: "sirens",
        bus: "sfx"
    },
    {
        src: "/audio/bgm/finale01.mp3",
        volume: state.volume.music,
        id: "finalebgm",
        bus: "music"
    },
    {
        src: "/audio/ding3.mp3",
        volume: state.volume.sfx,
        id: "finaleDing",
        bus: "sfx"
    },
    {
        src: "/audio/herbert/extremeAnger.mp3",
        volume: state.volume.sfx,
        id: "loudGroan",
        bus: "sfx"
    },
    {
        src: "/audio/carrot/teehee.mp3",
        volume: state.volume.sfx,
        id: "teehee",
        bus: "sfx"
    },
    {
        src: "/audio/crazy03.mp3",
        volume: state.volume.sfx,
        id: "crazy03",
        bus: "sfx"
    },
    {
        src: "/audio/bagpipe.ogg",
        volume: state.volume.sfx,
        id: "bagpipe",
        bus: "sfx"
    },
    {
        src: "/audio/wetfart.mp3",
        volume: state.volume.sfx,
        id: "wetfart",
        bus: "sfx"
    },
    {
        src: "/audio/bgm/endingBgm.mp3",
        volume: state.volume.music,
        id: "endingBgm",
        bus: "music"
    },
    {
        src: "/audio/ambience.mp3",
        volume: state.volume.sfx,
        id: "ambience01",
        bus: "sfx"
    },
    {
        src: "/audio/herbert/line01.mp3",
        volume: state.volume.sfx + 0.2,
        id: "herbertLine01",
        bus: "sfx"
    },
]