class isInView {
	constructor() {
		this.rafId = null;
		this.pageLoadedIntervalId = null;
		this.ticking = false;
		this.init();
	}

	init = () => {
		this.els = [...document.querySelectorAll('[data-is-inview]')];
		if (this.els.length > 0) {
			window.addEventListener('scroll', this.onScroll);
		}
		this.requestTick();
	}

	onScroll = () => {
		this.requestTick();
	}

	requestTick = () => {
		if (!this.ticking) {
			this.rafId = requestAnimationFrame(this.loop)
		}
		this.ticking = true;
	}

	// Workaround to trigger request ticks multiple times after a page is loaded
	pageLoadedTick = () => {
		let c = 0;
		this.pageLoadedIntervalId = setInterval(() => {
			if (c >= 5) clearInterval(this.pageLoadedIntervalId);
			this.requestTick();
			c += 1;
		}, 500)
	}

	loop = () => {
		const yPos = [];

		// reflows loop : read and cache
		for (let i = 0; i < this.els.length; i += 1) {
			yPos[i] = this.els[i].getBoundingClientRect().y;
		}

		// repaint loop : write
		for (let i = 0; i < this.els.length; i += 1) {
			if (yPos[i] < window.innerHeight) {
				this.els[i].classList.add('is-inview')
				this.els.splice(i, 1);
				yPos.splice(i, 1);
			};
		}

		if (this.els.length === 0) this.destroy();

		this.ticking = false;
	}

	destroy = () => {
		this.els = null;
		cancelAnimationFrame(this.rafId);
		window.removeEventListener('scroll', this.onScroll);
		clearInterval(this.pageLoadedIntervalId);
	}

}

export default isInView;