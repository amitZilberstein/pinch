class DetectSectionName {
	constructor() {
		if (typeof window === `undefined`) return;

		this.rafId = null;
		this.currentSectionName = null;

		this.init();
	}

	init = () => {
		this.elms = [...document.querySelectorAll('[data-section-name')];

		this.loop();
	}

	loop = () => {
		this.rafId = requestAnimationFrame(this.loop);
		const limit = window.innerWidth * 0.06979163333;
		this.elms.map(elm => {
			const rect = elm.getBoundingClientRect();
			const name = elm.getAttribute('data-section-name');
			if (rect.top <= limit && this.currentSectionName !== name) {
				this.currentSectionName = name;
				document.body.classList.add(`on-section-${name}`);
			} else if (this.currentSectionName === name && rect.top > limit) {
				this.currentSectionName = null;
				document.body.classList.remove(`on-section-${name}`);
			}
		});
	}

	destroy = () => {
		cancelAnimationFrame(this.rafId);
		document.body.classList.remove(`on-section-${this.currentSectionName}`);
	}
}

export default DetectSectionName;