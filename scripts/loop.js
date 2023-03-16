class Loop {
	constructor() {
		const canvas = document.getElementById('primary-viewport');
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		this.ctx = canvas.getContext('2d');

		this.initialize();

		addEventListener('keydown', (event) => this.on(event));
		addEventListener('keyup', (event) => this.on(event));
		addEventListener('click', (event) => this.on(event));
		addEventListener('touchstart', (event) => this.on(event));

		let previousTime = 0;
		const callback = (elapsedTime) => {
			this.update((elapsedTime - previousTime) * 0.001 * globals.timeScale, elapsedTime * 0.001);

			this.ctx.clearRect(0, 0, canvas.width, canvas.height);
			this.ctx.beginPath();
			this.ctx.fillStyle = '#eee';
			this.ctx.rect(0, 0, canvas.width, canvas.height);
			this.ctx.fill();
			this.render(this.ctx);

			previousTime = elapsedTime;
			requestAnimationFrame(callback);
		};

		this.id = requestAnimationFrame(callback);
	}

	initialize() {
		this.ground = new Ground();

		this.player = new Player();
		this.player.ground = this.ground;

		this.hudSystem = new HUDSystem();

		this.obstacleSystem = new ObstacleSystem();
		this.obstacleSystem.player = this.player;
		this.obstacleSystem.ground = this.ground;
	}

	on(event) {
		if (event.type === 'keydown' && !event.repeat) {
			this.restart();

			if (event.key === ' ' || event.key === 'ArrowUp') {
				this.player.on({ type: 'jump' });
			}
		}

		if (event.type === 'click' || event.type === 'touchstart') {
			if (event.clientY > innerHeight / 3 * 2) {
				this.restart();

				this.player.on({ type: 'jump' });
			}
		}
	}

	restart() {
		if (globals.state === State.STARTSCREEN || globals.state === State.GAMEOVER) {
			globals.state = State.GAMEPLAY;
			globals.timeScale = 1;
			globals.score = 0;
			globals.level = 0;

			this.player.restart();

			this.obstacleSystem.restart();
		}
	}

	update(dt, et) {
		this.player.update(dt);

		this.obstacleSystem.update(dt);

		this.hudSystem.update(dt, et);
	}

	render(ctx) {
		this.ground.render(ctx);

		this.player.render(ctx);

		this.obstacleSystem.render(ctx);

		this.hudSystem.render(ctx);
	}
}

const loop = new Loop();
