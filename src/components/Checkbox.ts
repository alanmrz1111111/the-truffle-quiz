export class Checkbox extends HTMLElement {
    constructor() {
        super()

        this.innerHTML = `
            <div class="checkbox" checkbox="true"></div>
        `

        const el = this.querySelector(".checkbox")!
        const setting = this.getAttribute("setting")

        if (!setting) return;

        el.setAttribute("checked", "false")
        el.setAttribute("setting", setting)

        if (this.getAttribute("checked") == "true") {
            el.setAttribute("checked", "true")
        }

        this.addEventListener("click", () => {
            if (el.getAttribute("checked") == "true") {
                el.setAttribute("checked", "false")
            } else {
                el.setAttribute("checked", "true")
            }
        })
    }

    checked() {
        let checkedString = this.querySelector(".checkbox")!.getAttribute("checked");
        let checked = false

        if (checkedString == "true") {
            checked = true
        } else {
            checked = false
        }

        return checked
    }
}