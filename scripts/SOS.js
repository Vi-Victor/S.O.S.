//sets up initialization of other classes, and runs animation loop

//main scene variables
var camera, scene, renderer, controls;

//mouse variables
var vX = 0;
var vY = 0;
var clicking = false;

//raycaster used for picking UI objects
var raycaster = new THREE.Raycaster();
var raycasterObjects = [];

//audio variables
var bpm;
var loopLength;
var key;

//interface variables
var interface;
var fullMeshMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
var hollowMeshMaterial = new THREE.LineBasicMaterial({color: 0xffffff});
var ready = false;

//run loops
init();
run();

//scene initialization
function init() {
	
	//create scene
	scene = new THREE.Scene();

	//setup controls, camera, and tie camera to FPS controls
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
	controls = new THREE.FirstPersonControls(camera);
	scene.add(controls.getObject());

	//make map
	makeMap();

	//interface setup
	interface = new Interface();
	interface.drawInterface();
	interface.init();

	interface.firstSynth.click.on = true;
	interface.firstSynth.click.material.color.set(0xffffff);
	interface.secondSynth.click.on = false;
	interface.thirdSynth.click.on = false;
	interface.fourthSynth.click.on = false;

	//setup audio transport
	key = true;
	bpm = 100;
	loopLength = "1:0:0";
	loopUpdate = "0:0:0";

	Tone.Transport.bpm.value = bpm;
	Tone.Transport.loop = true;
	Tone.Transport.loopStart = "0:0:0";
	Tone.Transport.loopEnd = loopLength;
	Tone.Transport.start("+1", "0:0:0");

	//renderer settings
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x000000);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize( window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	window.addEventListener('resize', onWindowResize, false);
}

//schedules sequencer update
Tone.Transport.schedule(function(time){
		interface.updateSequencers();
}, loopUpdate);

//on resize, reset camera / display size
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

//updates the picking ray with the camera as origin and center of screen as destination
//and calculates if objects in select list are intersecting with the picking ray, and sets .touching to true
function collisionDetect() {
	raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
	var intersects = raycaster.intersectObjects(raycasterObjects);

	for (var i = 0; i < intersects.length; i++) intersects[i].object.touching = true;
}

//checks for user interaction using raycaster intersection (if interacting, modify respective UI element using mouse input)
//and updates synth attributes
function updateUI() {
	if (clicking) {
		collisionDetect();

		//volume bar
		if (interface.volume.click.touching) {
			interface.volume.click.position.setX(interface.volume.click.position.x -= (vY / 50));
			if (interface.volume.click.position.x > 7.5) interface.volume.click.position.setX(7.5);
			if (interface.volume.click.position.x < 0) interface.volume.click.position.setX(0);
		}

		//lowpass filter 2D
		if (interface.lowPassFilter.click.touching) {
			interface.lowPassFilter.click.position.setX(interface.lowPassFilter.click.position.x += (vX / 50));
			interface.lowPassFilter.click.position.setY(interface.lowPassFilter.click.position.y -= (vY / 50));
			interface.lowPassFilter.clickLine.position.setX(interface.lowPassFilter.click.position.x);
			interface.lowPassFilter.clickLineTwo.position.setY(interface.lowPassFilter.click.position.y);
			if (interface.lowPassFilter.click.position.x > 5) interface.lowPassFilter.click.position.setX(5);
			if (interface.lowPassFilter.click.position.x < -5) interface.lowPassFilter.click.position.setX(-5);
			if (interface.lowPassFilter.click.position.y > 5) interface.lowPassFilter.click.position.setY(5);
			if (interface.lowPassFilter.click.position.y < -5) interface.lowPassFilter.click.position.setY(-5);
		}

		//buttons
		if (ready) {
			//sequence players
			if (interface.playFirstSequence.click.touching) {
				if (interface.playFirstSequence.click.on) {
					interface.playFirstSequence.click.material.color.set(0x000000);
					interface.playFirstSequence.click.on = false;
				} else {
					interface.playFirstSequence.click.material.color.set(0xffffff);
					interface.playFirstSequence.click.on = true;
				}
			}

			if (interface.playSecondSequence.click.touching) {
				if (interface.playSecondSequence.click.on) {
					interface.playSecondSequence.click.material.color.set(0x000000);
					interface.playSecondSequence.click.on = false;
				} else {
					interface.playSecondSequence.click.material.color.set(0xffffff);
					interface.playSecondSequence.click.on = true;
				}
			}

			if (interface.playThirdSequence.click.touching) {
				if (interface.playThirdSequence.click.on) {
					interface.playThirdSequence.click.material.color.set(0x000000);
					interface.playThirdSequence.click.on = false;
				} else {
					interface.playThirdSequence.click.material.color.set(0xffffff);
					interface.playThirdSequence.click.on = true;
				}
			}

			if (interface.playFourthSequence.click.touching) {
				if (interface.playFourthSequence.click.on) {
					interface.playFourthSequence.click.material.color.set(0x000000);
					interface.playFourthSequence.click.on = false;
				} else {
					interface.playFourthSequence.click.material.color.set(0xffffff);
					interface.playFourthSequence.click.on = true;
				}
			}

			//synth number
			if (interface.firstSynth.click.touching) {
				if (interface.firstSynth.click.on == false) {
					interface.firstSynth.click.material.color.set(0xffffff);
					interface.firstSynth.click.on = true;

					interface.secondSynth.click.material.color.set(0x000000);
					interface.secondSynth.click.on = false;
					interface.thirdSynth.click.material.color.set(0x000000);
					interface.thirdSynth.click.on = false;
					interface.fourthSynth.click.material.color.set(0x000000);
					interface.fourthSynth.click.on = false;
				}
			}

			if (interface.secondSynth.click.touching) {
				if (interface.secondSynth.click.on == false) {
					interface.secondSynth.click.material.color.set(0xffffff);
					interface.secondSynth.click.on = true;

					interface.firstSynth.click.material.color.set(0x000000);
					interface.firstSynth.click.on = false;
					interface.thirdSynth.click.material.color.set(0x000000);
					interface.thirdSynth.click.on = false;
					interface.fourthSynth.click.material.color.set(0x000000);
					interface.fourthSynth.click.on = false;
				}
			}

			if (interface.thirdSynth.click.touching) {
				if (interface.thirdSynth.click.on == false) {
					interface.thirdSynth.click.material.color.set(0xffffff);
					interface.thirdSynth.click.on = true;

					interface.firstSynth.click.material.color.set(0x000000);
					interface.firstSynth.click.on = false;
					interface.secondSynth.click.material.color.set(0x000000);
					interface.secondSynth.click.on = false;
					interface.fourthSynth.click.material.color.set(0x000000);
					interface.fourthSynth.click.on = false;
				}
			}

			if (interface.fourthSynth.click.touching) {
				if (interface.fourthSynth.click.on == false) {
					interface.fourthSynth.click.material.color.set(0xffffff);
					interface.fourthSynth.click.on = true;

					interface.firstSynth.click.material.color.set(0x000000);
					interface.firstSynth.click.on = false;
					interface.thirdSynth.click.material.color.set(0x000000);
					interface.thirdSynth.click.on = false;
					interface.secondSynth.click.material.color.set(0x000000);
					interface.secondSynth.click.on = false;
				}
			}

			//sequencer notes
			for (var i = 0; i < interface.sequencer.click.length; i++) {
				for (var j = 0; j < interface.sequencer.click[i].length; j++) {
					if (interface.sequencer.click[i][j].click.touching) {

						for (var k = 0; k < interface.sequencer.click[i].length; k++) {
							if (interface.sequencer.click[i][k].click.touching == false) {
								interface.sequencer.click[i][k].click.material.color.set(0x000000);
								interface.sequencer.click[i][k].click.on = false;
							}
						}
						if (interface.sequencer.click[i][j].click.on) {
							interface.sequencer.click[i][j].click.material.color.set(0x000000);
							interface.sequencer.click[i][j].click.on = false;
						} else {
							interface.sequencer.click[i][j].click.material.color.set(0xffffff);
							interface.sequencer.click[i][j].click.on = true;
						}
					}
				}
			}
			ready = false;
		}

	} else {
		for (var i = 0; i < raycasterObjects.length; i++) raycasterObjects[i].touching = false;
		ready = true;
	}

	interface.updateSynths();
}

//animate loop
function run() {
	requestAnimationFrame(run);
	updateUI();
	renderer.render(scene, camera);
}