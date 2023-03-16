class Player {
	constructor() {
		this.size = new Vector(0.2, 0.4);
		this.position = new Vector(
			globals.viewport.x * 0.25, 
			globals.viewport.y * 0.66 - this.size.y
		);

		this.ground = null;

		this.velocity = new Vector(0, 0);

		this.jumpState = false;
		this.jumpHeight = 1;
		this.grounded = true;

		this.showLeg = 0;
		this.LEFT_LEG = 2;
		this.RIGHT_LEG = 1;
		this.showLeg = this.LEFT_LEG | this.RIGHT_LEG;

		this.legTimeSpan = 0.21;
		this.legTimer = 0;
	}

	restart() {
		this.showLeg = this.LEFT_LEG | this.RIGHT_LEG;
	}

	on(event) {
		if (event.type === 'jump' && this.grounded) {
			this.jumpState = true;
			this.grounded = false;
		}
	}

	update(dt) {
		this.legTimer += dt;
		if (this.legTimer > this.legTimeSpan) {
            this.legTimer = 0;
            this.showLeg = this.showLeg == this.LEFT_LEG ? this.RIGHT_LEG : this.LEFT_LEG;
        }

		this.velocity.y += globals.gravity * dt * dt;

		// Check jumping
		if (this.jumpState) {
			this.jumpState = false;
			this.velocity.y = Math.sqrt(this.jumpHeight * 2 * globals.gravity) * -dt;
		}
		
		if (globals.state === State.GAMEPLAY) {
			this.position.y += this.velocity.y;
		}

		// Stop moving down to the ground
		if (this.position.y + this.size.y > this.ground.position.y) {
			this.position.y = this.ground.position.y - this.size.y;
			this.grounded = true;
		}
	}

	render(ctx) {
		const leg = 0.05;

		// Core
		ctx.beginPath();
		ctx.fillStyle = '#333';
		ctx.rect(
			this.position.x * globals.inverseWorldScale, 
			this.position.y * globals.inverseWorldScale, 
			this.size.x * globals.inverseWorldScale, 
			(this.size.y - leg) * globals.inverseWorldScale
		);
		ctx.fill();

		// Head
		ctx.beginPath();
		ctx.fillStyle = '#333';
		ctx.lineTo((this.position.x + 0.0) * globals.inverseWorldScale, (this.position.y - 0.0) * globals.inverseWorldScale);
		ctx.lineTo((this.position.x + 0.2) * globals.inverseWorldScale, (this.position.y - 0.15) * globals.inverseWorldScale);
		ctx.lineTo((this.position.x + 0.34) * globals.inverseWorldScale, (this.position.y + 0.05) * globals.inverseWorldScale);
		ctx.lineTo((this.position.x + 0.2) * globals.inverseWorldScale, (this.position.y + 0.15) * globals.inverseWorldScale);
		ctx.fill();

		// Tail
		ctx.beginPath();
		ctx.fillStyle = '#333';
		ctx.moveTo(this.position.x * globals.inverseWorldScale,  (this.position.y + 0.2) * globals.inverseWorldScale);
		ctx.lineTo(this.position.x * globals.inverseWorldScale, (this.position.y + 0.4 - leg) * globals.inverseWorldScale);
		ctx.lineTo((this.position.x - 0.2 + leg) * globals.inverseWorldScale, (this.position.y + 0.4 - leg) * globals.inverseWorldScale);
		ctx.fill();

		// Leg
		if (this.showLeg & this.LEFT_LEG || !this.grounded) {
			ctx.beginPath();
			ctx.fillStyle = '#333';
			ctx.rect(
				(this.position.x) * globals.inverseWorldScale, 
				(this.position.y + this.size.y - leg) * globals.inverseWorldScale, 
				(leg) * globals.inverseWorldScale,
				(leg) * globals.inverseWorldScale
			);
			ctx.fill();
		}

		if (this.showLeg & this.RIGHT_LEG || !this.grounded) {
			ctx.beginPath();
			ctx.fillStyle = '#333';
			ctx.rect(
				(this.position.x + this.size.x - leg) * globals.inverseWorldScale, 
				(this.position.y + this.size.y - leg) * globals.inverseWorldScale, 
				(leg) * globals.inverseWorldScale,
				(leg) * globals.inverseWorldScale
			);
			ctx.fill();
		}

		ctx.beginPath();
		ctx.fillStyle = '#e37';
		ctx.rect((this.position.x + 0.08) * globals.inverseWorldScale, (this.position.y + 0.05) * globals.inverseWorldScale, 0.05 * globals.inverseWorldScale, 0.05 * globals.inverseWorldScale);
		ctx.fill();
	}
}


