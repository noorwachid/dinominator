class HUDSystem {
	constructor() {
		this.wiggle = 0;
	}

	update(dt, et) {
		if (globals.state === State.STARTSCREEN) {
			this.wiggle = Math.sin(et * Math.PI);
		}
	}

	render(ctx) {
		if (globals.state === State.STARTSCREEN) {
			ctx.font = '24px monospace';
			ctx.fillStyle = '#333';
			const text = 'PRESS SPACE TO JUMP';
			ctx.fillText(text, innerWidth / 2 - ctx.measureText(text).width / 2, innerHeight / 6 + (this.wiggle * 10));
		} else {
			ctx.font = '32px monospace';
			ctx.fillStyle = '#333';
			const text = String(globals.score).padStart(5, '0');
			ctx.fillText(text, innerWidth / 2 - ctx.measureText(text).width / 2, innerHeight / 6);
		}

		if (globals.state === State.GAMEOVER) {
			ctx.font = '32px monospace';
			ctx.fillStyle = '#333';
			const text = 'GAMEOVER';
			ctx.fillText(text, innerWidth / 2 - ctx.measureText(text).width / 2, innerHeight / 6 + 32);
		}
	}
}
