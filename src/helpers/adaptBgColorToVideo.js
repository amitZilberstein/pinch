import detectBrowser from '../utils/detectBrowser';
import detectOs from '../utils/detectOs';

export const adaptBgColorToVideo = () => {

	const browser = detectBrowser();
	const os = detectOs();
	if (os === 'mac' || os === 'ios') {
		if (browser === 'chrome' || browser === 'safari') return;
	}

	const imageEl = document.querySelector('.ColorWitnessImage');

	const canvasEl = document.createElement("canvas");
	canvasEl.width = 8;
	canvasEl.height = 8;

	const ctx = canvasEl.getContext("2d");
	ctx.drawImage(imageEl, 0, 0, 1, 1);

	const p = ctx.getImageData(0, 0, 1, 1).data;

	document.body.style.backgroundColor = "rgb(" + p[0] + "," + p[1] + "," + p[2] + ")";

}