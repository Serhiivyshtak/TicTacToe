export let $ = (selector) => {
    return document.querySelector(selector)
}

export let delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms);
    });
}