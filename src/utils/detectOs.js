const detectOs = () => {
	if (typeof window === `undefined`) return null;

	let browserSignature = navigator.userAgent.toLowerCase();
	let os = null;

	if (/ipad|iphone|ipod/gi.test(browserSignature) && !window["MSStream"]) {
		os = 'ios';
	} else if (/android/gi.test(browserSignature)) {
		os = 'android';
	} else if (/mac/gi.test(browserSignature)) {
		os = 'mac';
	} else if (/windows phone/gi.test(browserSignature)) {
		os = 'windows';
	} else if (/windows/gi.test(browserSignature)) {
		os = 'windows';
	} else {
		os = 'unknown';
	}

	return os;
}

export default detectOs;