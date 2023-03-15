class Obstacle {
	constructor(velocity) {
		this.size = new Vector(
			Math.random() * 0.1 + 0.1, 
			Math.random() * 0.2 + 0.2
		);
		this.position = new Vector(
			(Math.random() * 0.8) + globals.viewport.x,
			globals.viewport.y / 3 * 2 - this.size.y,
		);

		this.velocity = new Vector(velocity, 0);

		this.passedPlayer = false;
	}

	on(event) {
	}

	update(dt, player, index) {
		this.position.x += this.velocity.x * dt;

		if (isRectRectCollided(player, this)) {
			globals.state = State.GAMEOVER;
			globals.timeScale = 0;
		}

		if (this.position.x < player.position.x && !this.passedPlayer) {
			this.passedPlayer = true;
			globals.score++;

			if (globals.score % 10 === 0) {
				globals.level++;
			}
		}

		if (this.position.x + this.size.x < 0) {
			return index;
		}

		return -1;
	}

	render(ctx) {
		ctx.beginPath();
		ctx.fillStyle = '#333';
		ctx.rect(
			this.position.x * globals.inverseWorldScale, 
			this.position.y * globals.inverseWorldScale, 
			this.size.x * globals.inverseWorldScale, 
			this.size.y * globals.inverseWorldScale
		);
		ctx.fill();
	}
}

class ObstacleSystem {
	constructor() {
		this.obstacles = [];
		this.player = null;
		this.ground = null;

		this.spawnPerMinute = 40;
		this.spawnTimeSpan = 60 / this.spawnPerMinute;
		this.spawnTimer = 0;
	}

	update(dt) {
		this.spawnTimer += dt;
		if (this.spawnTimer > this.spawnTimeSpan) {
            this.spawnTimer = 0;

			if (globals.state === State.GAMEPLAY) {
				const velocity = (4 + (globals.level * 0.1)) * -1;
				this.obstacles.push(new Obstacle(velocity));

				// if (Math.random() > 0.7) {
				// 	this.obstacles.push(new Obstacle(velocity));
				// }
			}
		}

		for (let i = 0; i < this.obstacles.length; ++i) {
			const index = this.obstacles[i].update(dt, this.player, i);

			if (index > -1) {
				this.obstacles.splice(index, 1);
			}
		}
	}

	render (ctx) {
		for (let i = 0; i < this.obstacles.length; ++i) {
			this.obstacles[i].render(ctx);
		}
	}

	restart() {
		this.obstacles = [];
	}
}
