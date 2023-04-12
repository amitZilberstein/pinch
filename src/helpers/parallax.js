class Parallax {
	constructor() {
		this.rafId = null;
		this.init();
	}

	init = () => {
		this.els = [...document.querySelectorAll('[data-parallax]')];
		this.speeds = this.els.map(el => el.getAttribute('data-parallax'));
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

	loop = () => {
		const rects = [];

		// reflows loop : read and cache
		for (let i = 0; i < this.els.length; i += 1) {
			rects[i] = this.els[i].getBoundingClientRect();
		}

		// repaint loop : write
		for (let i = 0; i < this.els.length; i += 1) {
			if (rects[i].y + rects[i].height > 0 && rects[i].y < window.innerHeight) {
				this.els[i].style.transform = `translate3d(0, ${rects[i].y * this.speeds[i]}px, 0)`
			}
		}

		this.ticking = false;
	}

	destroy = () => {
		this.els = null;
		this.speeds = null;
		cancelAnimationFrame(this.rafId);
		window.removeEventListener('scroll', this.onScroll);
	}

}

export default Parallax;