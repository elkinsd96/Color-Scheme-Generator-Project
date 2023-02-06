let mode = "dark"
const bodyEl = document.body
const colorSchemeContainerEl = document.getElementById("color-scheme-container")
const modeBtnEl = document.getElementById("mode-btn")
const colorSchemeEl = document.getElementById("color-scheme-menu")
const colorSchemeBtnEl = document.getElementById("color-scheme-btn")
const colorSelectorEl = document.getElementById("color-selector")
const colorsEl = document.getElementById("colors")
const footerEl = document.getElementById("footer")
const copyStatusEl = document.getElementById("copy-status")
const colorEl = document.getElementById("color")

function copyToClipBoard() {
    for (let p of document.querySelectorAll('p')) {
        p.addEventListener('click', async () => {
            await navigator.clipboard.writeText(p.dataset.hex)
            copyStatusEl.classList.remove("hidden")
            setTimeout(() => {
                copyStatusEl.classList.add("hidden");
            }, 2000)
        })
    }
}

function getColorScheme() {
    let hexValue = colorSelectorEl.value.slice(1)
    let modeValue = colorSchemeEl.value.toLowerCase()
    colorsEl.innerHTML = ""
    footerEl.innerHTML = ""
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexValue}&format=json&mode=${modeValue}&count=5`)
        .then(resp => resp.json())
        .then(data => {
            data.colors.forEach((color) => {
                colorsEl.innerHTML += `
                <div class="color" id="color" style="background-color:${color.hex.value}"></div>
                `
                footerEl.innerHTML += `
                <div class="hex" id="hex">
                    <p data-hex="${color.hex.value}">${color.hex.value}</p>
                </div>  
                `
            })
            copyToClipBoard()
        })
}

colorSchemeBtnEl.addEventListener("click", function(e){
   render()
})

modeBtnEl.addEventListener("click", function(e){
   toggleMode()
})

function toggleMode() {
    if(mode === "dark") {
        modeBtnEl.innerHTML = `<i class="fa-solid fa-moon"></i>`
        bodyEl.classList.add("body-light-mode")
        bodyEl.classList.remove("body-dark-mode")
        modeBtnEl.style.color = "#1F2937"
        modeBtnEl.classList.add("light-mode")
        modeBtnEl.classList.remove("dark-mode")
        colorSchemeContainerEl.classList.add("light-mode")
        colorSchemeContainerEl.classList.remove("dark-mode")
        colorSchemeEl.classList.add("light-mode")
        colorSchemeEl.classList.remove("dark-mode")
        colorSchemeBtnEl.classList.add("btn-light-mode")
        colorSchemeBtnEl.classList.remove("btn-dark-mode")
        copyStatusEl.classList.add("copy-light-mode")
        copyStatusEl.classList.remove("copy-dark-mode")
        mode = "light"
    } else {
        modeBtnEl.innerHTML = `<i class="fa-solid fa-sun"></i>`
        bodyEl.classList.add("body-dark-mode")
        bodyEl.classList.remove("body-light-mode")
        modeBtnEl.style.color = "white"
        modeBtnEl.classList.add("dark-mode")
        modeBtnEl.classList.remove("light-mode")
        colorSchemeContainerEl.classList.add("dark-mode")
        colorSchemeContainerEl.classList.remove("light-mode")
        colorSchemeEl.classList.add("dark-mode")
        colorSchemeEl.classList.remove("light-mode")
        colorSchemeBtnEl.classList.add("btn-dark-mode")
        colorSchemeBtnEl.classList.remove("btn-light-mode")
        copyStatusEl.classList.add("copy-dark-mode")
        copyStatusEl.classList.remove("copy-light-mode")
        mode = "dark"
    }
}

function render() {
    getColorScheme()
}

render()