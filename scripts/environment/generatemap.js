//random int generator
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//map generation function
function makeMap() {
	makeRoom();
	makeWorld();
}

//creates 'room' around origin
function makeRoom() {
	var roomGeometry;
	var roomMaterial = new THREE.LineBasicMaterial({color: 0xffffff});
	var room;
	var length = 50;

	//room geometry
	var tempGeometry = new THREE.BoxGeometry(length, length, length);

	//from the interior looking forward
	//front top left
	tempGeometry.vertices[0].y = length / 1.3;
	tempGeometry.vertices[0].x = length / 1.4;
	//back top left
	tempGeometry.vertices[1].x = length / 2;

	//front bottom left
	tempGeometry.vertices[2].x = length / 1;
	//back bottom left
	tempGeometry.vertices[3].x = length / 2;

	//back top right
	tempGeometry.vertices[4].x = -length / 2;
	//front top right
	tempGeometry.vertices[5].x = -length / 1.3;
	tempGeometry.vertices[5].y = length / 1.2;

	//back bottom right
	tempGeometry.vertices[6].x = -length / 2;
	//front bottom right
	tempGeometry.vertices[7].x = -length / 0.95;

	tempGeometry.rotateY(180 * Math.PI / 180);

	//add room to scene
	roomGeometry = new THREE.EdgesGeometry(tempGeometry);
	room = new THREE.LineSegments(roomGeometry, roomMaterial);
	scene.add(room);
}

//spawns spheres of random sizes in random places
function makeWorld() {
	var starGeometry;
	var starMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
	var star;
	var size;
	var count;
	var x, y, z;

	count = getRandomInt(20, 40);

	for (var i = 0; i < count; i++) {
		//create sphere
		size = getRandomInt(15, 30);
		starGeometry = new THREE.SphereGeometry(size, 50, 50);
		star = new THREE.Mesh(starGeometry, starMaterial);
		scene.add(star);

		//move it to somewhere random
		x = getRandomInt(-2000, 2000);
		y = getRandomInt(-2000, 2000);
		z = getRandomInt(-2000, 2000);
		star.position.set(x, y, z);
	}
}