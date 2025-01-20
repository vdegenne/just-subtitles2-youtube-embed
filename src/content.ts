import {getElement} from 'html-vision';
import {copyContentSvg} from './copy_content_svg.js';
import {copyAllLines, copyLastLine} from './util.js';

try {
	const rightControls = document.body.querySelector('.ytp-right-controls');
	const button = document.createElement('button');
	button.classList.add('ytp-button');
	button.innerHTML = copyContentSvg;
	let pressed = false;
	let longPressTimeout: number | undefined = undefined;
	function clearLongPressTimeout() {
		clearTimeout(longPressTimeout);
		longPressTimeout = undefined;
	}
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
	rightControls?.prepend(button);
} catch (e) {
	/* ignore */
}

(async () => {
	try {
		const moreVideosCloseButton = await getElement(
			'[aria-label="Hide more videos"]',
			10_000,
		);
		moreVideosCloseButton.click();
		const moreVideos = await getElement('.ytp-pause-overlay', 10_000);
		moreVideos.remove();
	} catch (e) {}
})();
