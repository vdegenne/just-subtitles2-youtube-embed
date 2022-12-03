const copyContentSvg = `<svg class="ytp-subtitles-button-icon" height="100%" viewBox="0 0 24 24" width="100%" fill="#FFFFFF"><path id="Layer" fill-rule="evenodd" class="s1" d="m14.6 5.8h-8.2v9.6h-1.4v-9.6c0-0.7 0.6-1.3 1.4-1.3h8.2zm-6.9 3.3c0-1.1 0.9-2 2-2h6.3c1.1 0 2 0.9 2 2v8.4c0 1.1-0.9 2-2 2h-6.3c-1.1 0-2-0.9-2-2zm1.4 8.9h7.5v-9.6h-7.5z"/></svg>`;

function copyToClipboard(e){if(navigator.clipboard)return navigator.clipboard.writeText(e).catch(function(e){throw void 0!==e?e:new DOMException("The request is not allowed","NotAllowedError")});var o=document.createElement("span");o.textContent=e,o.style.whiteSpace="pre",document.body.appendChild(o);var t=window.getSelection(),r=window.document.createRange();t.removeAllRanges(),r.selectNode(o),t.addRange(r);var n=!1;try{n=window.document.execCommand("copy");}catch(e){console.log("error",e);}return t.removeAllRanges(),window.document.body.removeChild(o),n?Promise.resolve():Promise.reject(new DOMException("The request is not allowed","NotAllowedError"))}

function copyLastLine() {
    const captionLines = [...document.body.querySelectorAll('.caption-visual-line')];
    if (captionLines.length > 0) {
        copyToClipboard(captionLines.pop().textContent.trim());
    }
}
function copyAllLines() {
    const captionLines = [...document.body.querySelectorAll('.caption-visual-line')];
    if (captionLines.length > 0) {
        copyToClipboard(captionLines.map(l => l.textContent.trim()).join('\n'));
    }
}

function getElementFromSelector(selector, timeoutMs = 5000) {
    return new Promise(async (resolve, reject) => {
        let theElement, resolved = false;
        setTimeout(() => { reject(); resolved = true; }, timeoutMs);
        while (!resolved && !(theElement = document.querySelector(selector))) {
            await new Promise(r => setTimeout(r, 250));
        }
        resolve(theElement);
    });
}
try {
    const rightControls = document.body.querySelector('.ytp-right-controls');
    const button = document.createElement('button');
    button.classList.add('ytp-button');
    button.innerHTML = copyContentSvg;
    let pressed = false;
    let longPressTimeout = undefined;
    function clearLongPressTimeout() { clearTimeout(longPressTimeout); longPressTimeout = undefined; }
    button.addEventListener('pointerdown', () => {
        pressed = true;
        longPressTimeout = setTimeout(() => {
            if (pressed) {
                copyAllLines();
                pressed = false;
                clearLongPressTimeout();
            }
        }, 1000);
    });
    button.addEventListener('pointerup', () => {
        if (longPressTimeout) {
            // timeout didn't fire, it's a common click
            clearLongPressTimeout();
            copyLastLine();
        }
        pressed = false;
    });
    button.addEventListener('mouseleave', () => {
        // cancel everything
        pressed = false;
        clearLongPressTimeout();
    });
    rightControls === null || rightControls === void 0 ? void 0 : rightControls.prepend(button);
}
catch (e) { /* ignore */ }
(async () => {
    try {
        const moreVideosCloseButton = await getElementFromSelector('[aria-label="Hide more videos"]', 1000000);
        moreVideosCloseButton.click();
        const moreVideos = await getElementFromSelector('.ytp-pause-overlay', 10000000);
        moreVideos.remove();
    }
    catch (e) { }
})();
