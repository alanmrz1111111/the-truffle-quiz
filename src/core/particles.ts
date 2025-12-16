import { QualityLevel } from "../etc/qualityLevel";
import { create, randFloat, random, Size, Vec2 } from "../utils"
import { state } from "./state";

type ParticleOptions = {
    pos: Vec2,
    count: number,
    size: Size,
    color?: string,
    velocity?: { min: number, max: number }
    gravity?: number
    duration?: number,
    usePercentages?: boolean,
    cssLine?: string
};

export function particles({
    count,
    pos,
    size,
    color = "#fff",
    velocity = { min: 1, max: 4 },
    gravity = 0.1,
    duration = 1000,
    usePercentages = false,
    cssLine = "",
}: ParticleOptions) {
    if (state.quality == QualityLevel.LOW) return

    const cont = create("div");
    cont.classList.add("particlecontainer");
    cont.style.position = "absolute";
    cont.style.cssText += cssLine

    if (usePercentages) {
        cont.style.top = `${pos.y}%`;
        cont.style.left = `${pos.x}%`;
    } else {
        cont.style.top = `${pos.y}px`;
        cont.style.left = `${pos.x}px`;
    }

    document.body.append(cont);

    let alive = count;

    for (let i = 0; i < count; i++) {
        const particleEl = create("div");

        particleEl.classList.add("particle");

        particleEl.style.width = `${size.width}px`;
        particleEl.style.height = `${size.height}px`;
        particleEl.style.background = color;

        particleEl.style.opacity = `${randFloat(0.6, 1)}`;

        cont.append(particleEl);

        const angle = randFloat(0, 2 * Math.PI);
        const speed = randFloat(velocity.min, velocity.max);
        let vx = Math.cos(angle) * speed;
        let vy = Math.sin(angle) * speed;

        let x = 0
        let y = 0;
        let life = duration;

        function update() {
            if (life <= 0) {
                particleEl.style.opacity = "0"

                setTimeout(() => {
                    particleEl.remove();

                    alive--;
                    if (alive === 0) cont.remove();
                    return;
                }, 150);
            }

            x += vx;
            y += vy;
            vy += gravity;
            particleEl.style.transform = `translate(${x}px, ${y}px) scale(${randFloat(0.8, 1.5)})`;
            life -= 16;

            requestAnimationFrame(update);
        }
        update();
    }
}