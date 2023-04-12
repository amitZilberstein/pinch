import * as THREE from 'three';
import { TweenMax } from 'gsap';
import { navigate } from 'gatsby';
import { limitStringSize, lerp } from '../helpers';

const positions = [
	{
		x: 0.6,
		y: -0.5
	},
	{
		x: -0.6,
		y: 0.6
	},
	{
		x: 1.1,
		y: 0.35
	},
	{
		x: -0.7,
		y: -0.35
	},
	{
		x: 0.6,
		y: -0.6
	},
	{
		x: -0.6,
		y: -0.7
	},
	{
		x: -0.6,
		y: 0.6
	},
	{
		x: 0.6,
		y: 0.2
	}
]

class FeaturedCreatorsCanvas {
  constructor(data) {

		this.data = data;
		this.zInc = 0.5;
		this.containerEl = document.querySelector('.FeaturedCreators');

    this.bounds = {
			ww: window.innerWidth,
			wh: window.innerHeight
		};

		const { ww, wh } = this.bounds;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });

    this.renderer.setPixelRatio(1);
    this.renderer.setSize(ww, wh);
    this.renderer.setClearColor(0xffffff, 0);
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      ww / wh,
      0.1,
      -1
    );
		this.camera.lookAt(this.scene.position);
		this.camY = this.zInc * this.data.length + 0.75;
		this.camera.position.z = this.camY;

		// this.mainFog = new THREE.Fog(0x000000, 1, this.camY + 1);
		this.mainFog = new THREE.Fog(0x1f212b, 1, 5);
    this.scene.fog = this.mainFog;

		this.containerEl.appendChild(this.renderer.domElement);

		this.light = new THREE.PointLight(0xffffff, 1, 0);
		this.light.position.set(10, 10, 20);
		this.scene.add(this.light);

		this.mouseVector = new THREE.Vector3();
		this.mousePos = new THREE.Vector3();
		this.mouse = new THREE.Vector2();

		this.raycaster = new THREE.Raycaster();

		this.currentCreator = null;
		this.currentObject = null;

		this.materials = [];
		this.geometries = [];
		this.textures = [];
		this.meshs = [];

		this.velocity = 1;
		this.timeoutWheelId = null;

		this.createPlaneBaseGeometry();
		this.initPlanes();
		this.initCreatorBox();
		this.addGeneralEvents();
		this.startLoop(35);
	}

	createPlaneBaseGeometry() {
		const roundedRectShape = new THREE.Shape();
		function roundedRect(ctx, centerX, centerY, width, height, radius ) {
			const x = centerX - width * 0.5;
			const y =	centerY - height * 0.5;
			ctx.moveTo( x, y + radius );
			ctx.lineTo( x, y + height - radius );
			ctx.quadraticCurveTo( x, y + height, x + radius, y + height );
			ctx.lineTo( x + width - radius, y + height );
			ctx.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
			ctx.lineTo( x + width, y + radius );
			ctx.quadraticCurveTo( x + width, y, x + width - radius, y );
			ctx.lineTo( x + radius, y );
			ctx.quadraticCurveTo( x, y, x, y + radius );
		}
		roundedRect(roundedRectShape, 0, 0, 1, 1, 0.025);
		this.planeProfileGeometry = new THREE.ShapeBufferGeometry(roundedRectShape);
	}

	initPlanes() {
		const loader = new THREE.TextureLoader();
		let zPos = 0;
		this.data.map((creator, index) => {
			const posIndex = index - (Math.floor(index / 8) * 8);

			this.textures[index] = loader.load(creator.node.image.url);
			this.textures[index].anisotropy = this.renderer.capabilities.getMaxAnisotropy();
			// this.textures[index].wrapS = this.textures[index].wrapT = THREE.RepeatWrapping;
			// this.textures[index].repeat.set(0, 0);
			this.textures[index].offset.x = 0.5;
			this.textures[index].offset.y = 0.5;

			this.materials[index] = new THREE.MeshLambertMaterial({
				map: this.textures[index],
				transparent: true,
				opacity: 1
			});

			// this.geometries[index] = new THREE.PlaneGeometry(1, 1);
			this.geometries[index] = this.planeProfileGeometry.clone();
			this.meshs[index] = new THREE.Mesh(this.geometries[index], this.materials[index]);
			this.meshs[index].scale.set(0.75, 0.75 * 0.75, 1);
			this.meshs[index].position.set(positions[posIndex].x, positions[posIndex].y, zPos);
			this.meshs[index].baseRotation = {
				x: positions[posIndex].y * 1.5,
				y: -positions[posIndex].x * 1.5
			}
			this.meshs[index].hoverRotation = { x: 0, y: 0 };
			zPos += this.zInc;

			this.meshs[index].userData = {
				uid: creator.node._meta.uid,
				name: creator.node.name[0].text,
				description: creator.node.description[0].text
			}

			this.scene.add(this.meshs[index]);
		})
	}

	introAnimation() {
		for (let i = 0; i < this.meshs.length; i += 1) {
			TweenMax.to(
				this.meshs[i].position,
				2,
				{
					z: this.meshs[i].position.z + 0.5,
					ease: 'power2'
				},
			);
		}
	}

  addGeneralEvents() {
		window.addEventListener('mousemove', this.mouseMoveEvent);
		window.addEventListener("resize", this.resize);
	}

	addWheelAndClickEvent = () => {
		window.addEventListener('wheel', this.wheelEvent);
		window.addEventListener('mousedown', this.clickEvent);
	}

	destroy = () => {
		cancelAnimationFrame(this.rafId);

		// Destroy geometries, materials and textures
		this.geometries.map(g => g.dispose());
		this.materials.map(m => m.dispose());
		this.textures.map(t => t.dispose());

		this.destroyEvents();

		this.containerEl.removeChild(this.renderer.domElement);
	}

	destroyEvents = () => {
		window.removeEventListener('mousemove', this.mouseMoveEvent);
		window.removeEventListener("resize", this.resize);
		window.removeEventListener('wheel', this.wheelEvent);
		window.removeEventListener('mousedown', this.clickEvent);
	}

	mouseMoveEvent = e => {
		this.mousePosInCoords(e);
		TweenMax.to(
			this.creatorBoxDom,
			1,
			{
				x: e.clientX,
				y: e.clientY,
				ease: 'power2'
			}
		)
	}

	wheelEvent = e => {
		let delta = e.deltaY;
		if (delta > 200) delta = 200;
		if (delta < -200) delta = -200;
		this.velocity = delta;
		clearTimeout(this.timeoutWheelId);
		this.timeoutWheelId = setTimeout(() => {
			TweenMax.to(
				this,
				1,
				{ velocity: 1, ease: 'power2.easeOut' });
		}, 200)
	}

	clickEvent = e => {
		if (this.currentCreator === null) return;
		if (e.target && e.target.nodeName === 'A') return;
		window.removeEventListener('click', this.clickEvent);
		navigate(`/${this.currentCreator.uid}`);
	}

  render = () => {
		this.renderer.render(this.scene, this.camera);
		this.checkForIntersects();
	};

	startLoop = (fps) => {
    this.fpsInterval = 1000 / fps;
    this.then = Date.now();
    this.startTime = this.then;
    this.loop();
	}

	loop = () => {
		this.rafId = requestAnimationFrame(this.loop);
		this.now = Date.now();
		this.elapsed = this.now - this.then;
		if (this.elapsed > this.fpsInterval) {
			this.then = this.now - (this.elapsed % this.fpsInterval);
			this.progress();
			this.render();
		}
	}

  progress = () => {
		let newTargetZ = 0.0012 * this.velocity;
		if (newTargetZ > 2) newTargetZ = 2;
		else if (newTargetZ < -2) newTargetZ = -2;
		for (let i = 0; i < this.meshs.length; i += 1) {
			const mesh = this.meshs[i];
			let itemNewZ = mesh.position.z += newTargetZ;

			if (itemNewZ > this.camY)	{
				mesh.material.opacity = 0;
				itemNewZ = 0;
				TweenMax.to(mesh.material, 1,
					{ opacity: 1, ease: 'power2' },
				)
			}
			else if (itemNewZ < 0) {
				itemNewZ = this.camY;
			};

			mesh.position.z = itemNewZ;
			const rotationRatio = 1 - (itemNewZ / this.camY);
			mesh.rotation.x = mesh.baseRotation.x * rotationRatio + mesh.hoverRotation.x;
			mesh.rotation.y = mesh.baseRotation.y * rotationRatio + mesh.hoverRotation.y;
		}
	};

	// https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z
	mousePosInCoords = e => {
		const { ww, wh } = this.bounds;

		this.mouse.x = (e.clientX / ww) * 2 - 1;
		this.mouse.y = - (e.clientY / wh) * 2 + 1;

		this.mouseVector.set((e.clientX / ww) * 2 - 1, -(e.clientY / wh) * 2 + 1, 0.5);
		this.mouseVector.unproject(this.camera);
		this.mouseVector.sub(this.camera.position).normalize();
	}

	checkForIntersects = () => {
		this.raycaster.setFromCamera(this.mouse, this.camera);
		const intersects = this.raycaster.intersectObjects(this.scene.children);

		if (intersects.length > 0) {
			const mesh = intersects[0].object;
			const data = mesh.userData;
			// reset current object rotation if it exist and different from this interesect
			if (this.currentCreator && this.currentCreator.uid !== data.uid) {
				TweenMax.to(this.currentObject.hoverRotation, 0.75, { x: 0, y: 0, ease: 'power2.easeInOut'})
			}
			if (this.currentCreator === null || this.currentCreator.uid !== data.uid) {
				this.currentObject = mesh;
				this.currentCreator = data;
				this.changeCreatorBox(this.currentCreator);
				TweenMax.to(this.currentObject.hoverRotation, 0.75, { x: 0.15, y: -0.15, ease: 'power2.easeInOut'})
			}
			document.body.style.cursor = 'pointer';
		} else if (intersects.length === 0 && this.currentCreator !== null) {
			TweenMax.to(this.currentObject.hoverRotation, 0.75, { x: 0, y: 0, ease: 'power2.easeInOut'})
			this.currentObject = null;
			this.currentCreator = null;
			this.changeCreatorBox(null);
			document.body.style.cursor = 'inherit';
		}
	}

	changeCreatorBox = (currentCreator) => {
		this.creatorBoxDom.classList.add('hidden');
		clearTimeout(this.boxTimeoutId);
		this.boxTimeoutId = setTimeout(() => {
			this.creatorNameDom.innerText = currentCreator ? currentCreator.name : '';
			this.creatorDescDom.innerText = currentCreator ? limitStringSize(currentCreator.description, 70).replace(/(\r\n|\n|\r)/gm,' ') : '';
			this.creatorBoxDom.classList.remove('hidden');
		}, 500)
	}

  resize = () => {
		this.bounds.ww = window.innerWidth;
		this.bounds.wh = window.innerHeight;
		const { ww, wh } = this.bounds;
		this.camera.aspect = ww / wh;
    this.camera.updateProjectionMatrix();
		this.renderer.setSize(ww, wh);
		this.meshs.map(mesh => {
			mesh.scale.set(0.75, 0.75 * 0.75, 1);
		})
	};

	initCreatorBox = () => {
		this.creatorBoxDom = document.createElement('div');
		this.creatorBoxDom.classList.add('FeaturedCreators__Box');

		this.creatorNameDom = document.createElement('h3');
		this.creatorDescDom = document.createElement('div');
		this.creatorDescDom.classList.add('FeaturedCreators__BoxDesc')

		this.creatorBoxDom.appendChild(this.creatorNameDom);
		this.creatorBoxDom.appendChild(this.creatorDescDom);
		this.containerEl.appendChild(this.creatorBoxDom);
	}
}

export default FeaturedCreatorsCanvas;