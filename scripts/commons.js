class Vector {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	set(x, y) {
		this.x = x;
		this.y = y;
	}
}

function isRectRectCollidedExpert(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
	if (r1x + r1w >= r2x &&
		r1x <= r2x + r2w &&
		r1y + r1h >= r2y &&
		r1y <= r2y + r2h) {
		return true;
	}

	return false;
}

function isRectRectCollided(r1, r2) {
	return isRectRectCollidedExpert(
		r1.position.x, r1.position.y, r1.size.x, r1.size.y, 
		r2.position.x, r2.position.y, r2.size.x, r2.size.y
	);
}
