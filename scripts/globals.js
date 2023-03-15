// NOTE: 1 unit is equal to 100 pixels

const globals = {}

globals.worldScale = 0.01;
globals.inverseWorldScale = 100;
globals.viewport = new Vector(innerWidth * globals.worldScale, innerHeight * globals.worldScale);
globals.gravity = 12.8;

globals.score = 0;

const State = {
	STARTSCREEN: 0,
	GAMEPLAY: 1,
	GAMEOVER: 2,
};

globals.state = State.STARTSCREEN;
globals.timeScale = 0;

globals.level = 0;
