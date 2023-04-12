if (typeof window !== `undefined`) {
	// Set local storage is-touch
	if ("ontouchstart" in document.documentElement) {
		localStorage.setItem('is-touch', 'true');
		document.querySelector('html').classList.add('is-touch');
	} else {
		localStorage.setItem('is-touch', 'false');
	}

	// 100vh bug for phones
	window.onresize = function () {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}
	window.onresize();

	// Create event that's gonna be triggered when the next page is loaded on a link click
	window.nextPageLoadedEvent = new CustomEvent('nextPageLoadedEvent');
}