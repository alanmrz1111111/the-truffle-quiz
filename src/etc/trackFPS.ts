let createdFpsLabel = false;
let lft = performance.now();
let frames = 0;
let fpsLabel: HTMLElement;

export function trackFPS() {
    const now = performance.now();
    frames++;

    if (!createdFpsLabel) {
        fpsLabel = document.createElement("h3");
        fpsLabel.style.position = "fixed";
        fpsLabel.style.color = "red";
        fpsLabel.style.top = "0";
        fpsLabel.style.left = "0";
        fpsLabel.style.zIndex = "2000";
        fpsLabel.style.margin = "5px";
        fpsLabel.id = "fpslabel"
        document.body.append(fpsLabel);
        createdFpsLabel = true;
    }

    if (now - lft >= 1000) {
        const fps = (frames * 1000) / (now - lft)

        fpsLabel.textContent = "FPS: " + fps.toFixed(2);
        frames = 0;
        lft = now;
    }

    requestAnimationFrame(trackFPS);
}