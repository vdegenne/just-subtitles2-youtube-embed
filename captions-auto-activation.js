;(async function () {
  let ttl = 60
  let ccButton, video

  while (ttl > 0) {
    ccButton = document.querySelector('[aria-keyshortcuts="c"]')
    video = document.querySelector('video')
    if (ccButton && video.readyState === 4) {
      ccButton.click()
      break;
    }
    await new Promise(r => setTimeout(r, 500))
    ttl -= 0.5;
  }
})()