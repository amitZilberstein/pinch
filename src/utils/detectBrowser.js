const detectBrowser = () => {
	if (typeof window === `undefined`) return null;

	let browserSignature = navigator.userAgent.toLowerCase();
	let browser = null;

	if (/edge/gi.test(browserSignature)) {
		browser = 'edge';
	} else if (/chrome/gi.test(browserSignature)) {
		browser = 'chrome';
	} else if (/safari/gi.test(browserSignature)) {
		browser = 'safari';
	} else if (/msie/gi.test(browserSignature) || "ActiveXObject" in window) {
		browser = 'ie';
	} else if (/mozilla/gi.test(browserSignature)) {
		browser = 'mozilla';
	} else if (/opera/gi.test(browserSignature)) {
		browser = 'opera';
	} else {
		browser = 'unknown';
	}

	return browser;
}

export default detectBrowser;