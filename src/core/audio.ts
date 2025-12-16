export type AudioObject = {
    src: string,
    volume: number,
    id: string,
    bus: "music" | "sfx"
}

export type SimpleAudioObject = {
    src: string,
    volume: number
}

type PlayAudioArgs = {
    id: string,
    getObject?: boolean
}

let list: AudioObject[] | null = null;
const audioElList: HTMLAudioElement[] = [];

export function registerAudioList(customList: AudioObject[]) {
    list = customList;
}

export function playAudio(args: PlayAudioArgs) {
    if (list == null) return

    if (args.getObject == undefined) args.getObject = false

    const obj = list.find(aobj => aobj.id == args.id);

    if (!obj) {
        console.error("no audio with ID " + args.id)
        return
    }

    const audio = new Audio(obj.src)
    audio.volume = obj.volume

    audio.play()

    audioElList.push(audio)

    if (args.getObject) return audio;
}

export function playLoopingAudio({ audioID, audioDuration, intervalCb }: { audioID: string, audioDuration: number, intervalCb?: (audioObj: HTMLAudioElement) => void }) {
    if (!list) return

    const obj = list.find(aobj => aobj.id == audioID);

    if (!obj) return

    let audioObj = playAudio({ id: obj.id, getObject: true })

    const int = setInterval(() => {
        audioObj = playAudio({ id: obj.id, getObject: true })
        document.dispatchEvent(audioIterationEvent)
        intervalCb?.(audioObj!)

        console.log("Audio iteration for audio with ID " + audioID + " finished")
    }, audioDuration);

    audioElList.push(audioObj!)

    const audioIterationEvent = new CustomEvent("audioiteration", {
        detail: {
            obj: audioObj,
            id: obj.id
        }
    })

    return { int, audioObj };
}

export async function getAudioDuration({ filePath }: { filePath: string }) {
    const res = await fetch(filePath)
    if (!res.ok) throw new Error("HTTP " + res.status)

    const data = await res.arrayBuffer()
    const audioCtx = new AudioContext()
    const audioBuffer = await audioCtx.decodeAudioData(data)

    return parseInt((audioBuffer.duration * 1000).toFixed(1))
}

export function playAudioSimple(args: SimpleAudioObject) {
    const audio = new Audio(args.src)

    audio.volume = args.volume
    audio.play()

    audioElList.push(audio)
}

export function changeSFXVolume(volume: number) {
    if (!list) return

    for (const audio of list) {
        if (audio.bus == "music") continue;

        audio.volume = volume;
    }
}

export function changeMusicVolume(volume: number) {
    if (!list) return

    for (const audio of list) {
        if (audio.bus == "sfx") continue;

        audio.volume = volume;

        if (audio.volume < 0) audio.volume = 0;

        audioElList.forEach(audioEl => {
            audioEl.volume = audio.volume;
        })
    }
}

export function playRandomAudio(audioIDs: string[]) {
    const randomIndex = Math.floor(Math.random() * audioIDs.length);
    const selectedAudioID = audioIDs[randomIndex];

    playAudio({ id: selectedAudioID });
}