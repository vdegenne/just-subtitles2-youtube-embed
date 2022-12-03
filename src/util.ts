import copyToClipboard from '@vdegenne/clipboard-copy';

export function copyLastLine () {
  const captionLines = [...document.body.querySelectorAll('.caption-visual-line')]
  if (captionLines.length > 0) {
    copyToClipboard(captionLines.pop()!.textContent!.trim())
  }
}
export function copyAllLines () {
  const captionLines = [...document.body.querySelectorAll('.caption-visual-line')]
  if (captionLines.length > 0) {
    copyToClipboard(captionLines.map(l => l.textContent!.trim()).join('\n'))
  }
}