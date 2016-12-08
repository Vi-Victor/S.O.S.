//class for first persn mouse-camera movement
THREE.FirstPersonControls = function (camera) {

	var scope = this;

	camera.rotation.set(0, 0, 0);
	//camera.position.set(0, -20, 0);

	var pitchObject = new THREE.Object3D();
	pitchObject.position.y = -20;
	pitchObject.add(camera);

	var yawObject = new THREE.Object3D();
	yawObject.position.y = 10;
	yawObject.add(pitchObject);

	var PI_2 = Math.PI / 2;
	
	var onMouseMove = function (event) {

		if (scope.enabled === false) return;

		vX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		vY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		if (clicking == false) {
			yawObject.rotation.y -= vX * 0.002;
			pitchObject.rotation.x -= vY * 0.002;

			pitchObject.rotation.x = Math.max(- PI_2, Math.min(PI_2, pitchObject.rotation.x));
		}
	}

	this.dispose = function() {
		document.removeEventListener('mousemove', onMouseMove, false);
	}

	document.addEventListener('mousemove', onMouseMove, false);

	this.enabled = false;
	this.getObject = function() {
		return yawObject;
	}

	this.getDirection = function() {

		// assumes the camera itself is not rotated
		var direction = new THREE.Vector3(0, 0, -1);
		var rotation = new THREE.Euler(0, 0, 0, "YXZ");

		return function(v) {

			rotation.set(pitchObject.rotation.x, yawObject.rotation.y, 0);
			v.copy(direction).applyEuler(rotation);
			return v;
		}
	}
}

//mouse button controls
document.onmousedown = function() {
	clicking = true;
}

document.onmouseup = function() {
	clicking = false;
}

//range mapping function
function map(value, istart, istop, ostart, ostop) {
	return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}