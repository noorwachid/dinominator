class Obstacle {
	constructor(velocity) {
		this.alive = true;

		this.size = new Vector(
			Math.random() * 0.1 + 0.1, 
			Math.random() * 0.2 + 0.2
		);
		this.position = new Vector(
			(Math.random() * 4) + globals.viewport.x,
			globals.viewport.y / 3 * 2 - this.size.y,
		);

		const leftBranchWidth = Math.random() * 0.05 + 0.04;
		this.leftBranch = {
			x: -leftBranchWidth,
			y: Math.random() * this.size.y + 0.1,
			w: leftBranchWidth,
			h: Math.random() * 0.1 + 0.08,
		};

		this.rightBranch = {
			x: this.size.x,
			y: Math.random() * this.size.y + 0.1,
			w: Math.random() * 0.05 + 0.04,
			h: Math.random() * 0.1 + 0.08,
		};

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

		ctx.beginPath();
		ctx.fillStyle = '#333';
		ctx.rect(
			(this.position.x + this.leftBranch.x) * globals.inverseWorldScale, 
			(this.position.y + this.leftBranch.y) * globals.inverseWorldScale, 
			this.leftBranch.w * globals.inverseWorldScale, 
			this.leftBranch.h * globals.inverseWorldScale
		);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = '#333';
		ctx.rect(
			(this.position.x + this.rightBranch.x) * globals.inverseWorldScale, 
			(this.position.y + this.rightBranch.y) * globals.inverseWorldScale, 
			this.rightBranch.w * globals.inverseWorldScale, 
			this.rightBranch.h * globals.inverseWorldScale
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

				if (Math.random() > 0.7) {
					this.obstacles.push(new Obstacle(velocity));
				}
			}
		}

		let dirty = false;

		for (let i = 0; i < this.obstacles.length; ++i) {
			const index = this.obstacles[i].update(dt, this.player, i);

			if (index > -1) {
				dirty = true;
				this.obstacles[index].alive = false;
			}
		}

		if (dirty) {
			this.obstacles = this.obstacles.filter(obstacle => obstacle.alive);
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
