import { copyContentSvg } from './copy_content_svg'
import { copyAllLines, copyLastLine } from './util';

function getElementFromSelector(selector: string, timeoutMs = 5000): Promise<HTMLElement> {
  return new Promise(async (resolve, reject) => {
    let theElement, resolved = false
    setTimeout(() => { reject(); resolved = true }, timeoutMs)
    while (!resolved && !(theElement = document.querySelector(selector))) {
      await new Promise(r => setTimeout(r, 250))
    }
    resolve(theElement as HTMLElement)
  })
}

try {

  const rightControls = document.body.querySelector('.ytp-right-controls')
  const button = document.createElement('button')
  button.classList.add('ytp-button')
  button.innerHTML = copyContentSvg
  let pressed = false
  let longPressTimeout: NodeJS.Timeout|undefined = undefined
  function clearLongPressTimeout () { clearTimeout(longPressTimeout); longPressTimeout = undefined }
  button.addEventListener('pointerdown', () => {
    pressed = true
    longPressTimeout = setTimeout(() => {
      if (pressed) {
        copyAllLines()
        pressed = false
        clearLongPressTimeout()
      }
    }, 1000)
  })
  button.addEventListener('pointerup', () => {
    if (longPressTimeout) {
      // timeout didn't fire, it's a common click
      clearLongPressTimeout()
      copyLastLine()
    }
    pressed = false
  })
  button.addEventListener('mouseleave', () => {
    // cancel everything
    pressed = false
    clearLongPressTimeout()
  })
  rightControls?.prepend(button)

} catch (e) { /* ignore */ }

(async () => {
  try {
    const moreVideosCloseButton = await getElementFromSelector('[aria-label="Hide more videos"]', 1000000)
    moreVideosCloseButton.click()
    const moreVideos = await getElementFromSelector('.ytp-pause-overlay', 10000000)
    moreVideos.remove()
  } catch (e) {}
})()
