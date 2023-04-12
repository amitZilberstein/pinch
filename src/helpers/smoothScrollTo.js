const smoothScrollTo = targetEl => {
	const targetTop = targetEl.offsetTop - (window.innerHeight * 0.5) + (targetEl.offsetHeight * 0.5);

	// ie and edge fix
	if (window.document.documentMode || /Edge/.test(navigator.userAgent)) {
		window.scroll(0, targetTop);
		return;
	}

	window.scroll({
		top: targetTop,
		left: 0,
		behavior: 'smooth'
	});
}

export default smoothScrollTo;