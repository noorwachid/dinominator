class Ground {
	constructor() {
		this.size = new Vector(globals.viewport.x, globals.viewport.y / 3);
		this.position = new Vector(0, globals.viewport.y / 3 * 2);
	}
	render(ctx) {
		ctx.beginPath();
		ctx.fillStyle = '#333';
		ctx.rect(this.position.x * globals.inverseWorldScale, this.position.y * globals.inverseWorldScale, this.size.x * globals.inverseWorldScale, this.size.y * globals.inverseWorldScale);
		ctx.fill();
	}
}
