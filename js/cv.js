'use strict'

function fillData(data) {
    Array.from(document.getElementsByTagName('*')).forEach(element => {
        if (data[element.id]) {
            element.innerHTML = data[element.id];
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    makeResizableDiv('.personal-data');
    makeDraggableDiv('button.locale');

    let localeButton = document.querySelector("button.locale");
    localeButton.addEventListener("click", (e) => {
        if (!states.some(element => element)) {
            config.locale = config.locales[(config.locales.indexOf(config.locale) + 1) % config.locales.length];
            switch (config.locale) {
                case "esES":
                    localeButton.querySelector("img").src = "./resources/spain.png";
                    break;
                case "enUS":
                    localeButton.querySelector("img").src = "./resources/united-kingdom.png";
                    break;
                case "chCH":
                    localeButton.querySelector("img").src = "./resources/china.png";
                    break;
            }
            fillData(data[config.locale]);
        }
        states = new Array(states.length);
    });

    fillData(data[config.locale]);
});