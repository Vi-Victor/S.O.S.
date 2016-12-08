//slider
function Bar() {
	this.drawClick = function(x, y, z) {
		this.click = makeRectangle(x, y, x + 2.5, y, x + 2.5, y + 2.5, x, y + 2.5, true);
		scene.add(this.click);
		raycasterObjects.push(this.click);
		this.click.position.setZ(z);
	}

	this.drawBar = function(x, y, z) {
		this.bar = makeRectangle(x, y, x + 10, y, x + 10, y + 2.5, x, y + 2.5, false);
		scene.add(this.bar);
		this.bar.position.setZ(z);

		this.drawClick(x, y, z);
	}
}

//2D modulator
function TwoD() {
	this.drawClick = function(x, y, z) {
		this.click = makeRectangle(x + 5, y - 5.5, x + 5.5, y - 5, x + 5,  y - 4.5, x + 4.5, y - 5, true);
		scene.add(this.click);
		raycasterObjects.push(this.click);
		this.click.position.setZ(z);

        this.clickLine = makeLine(x + 5, y - 10, x + 5, y);
		scene.add(this.clickLine);
		this.clickLine.position.setZ(z);

		this.clickLineTwo = makeLine(x, y - 5, x + 10, y - 5);
		scene.add(this.clickLineTwo);
		this.clickLineTwo.position.setZ(z);
	}

	this.drawSquareLines = function(x, y, z) {
		this.line = makeLine(x + 5, y - 10, x + 5, y);
		scene.add(this.line);
		this.line.position.setZ(z);

		this.lineTwo = makeLine(x, y - 5, x + 10, y - 5);
		scene.add(this.lineTwo);
		this.lineTwo.position.setZ(z);
	}

	this.drawSquare = function(x, y, z) {
		this.square = makeRectangle(x, y - 10, x, y, x + 10, y, x + 10, y - 10, false);
		scene.add(this.square);
		this.square.position.setZ(z);

		this.drawSquareLines(x, y, z);
		this.drawClick(x, y, z);
	}
}

//sequencer panel with 8 notes, and 7 pitch options for each note
function Seqq() {
	this.dotX = -1.5;
	this.dotY = -1.5;

	this.click = new Array(8);
	for (var i = 0; i < this.click.length; i++) {
		this.click[i] = new Array(7);
	}

	this.drawClick = function(x, y, z) {
		for (var i = 0; i < this.click.length; i++) {
			this.dotX += 2.5;
			for (var j = 0; j < this.click[i].length; j++) {
				this.click[i][j] = new DiamondButton();
				this.click[i][j].drawSquare(x + this.dotX, y + this.dotY, z);
				this.dotY -= 1.3;
			}
			this.dotY = -1.5
		}
	}

	this.drawDivider = function(x, y, z) {
		this.line = makeLine(x + 10, y, x + 10, y - 10);
		scene.add(this.line);
		this.line.position.setZ(z);
	}

	this.drawSquare = function(x, y, z) {
		this.square = makeRectangle(x, y - 10, x + 20, y - 10, x + 20, y, x, y, false);
		scene.add(this.square);
		this.square.position.setZ(z);

		this.drawDivider(x, y, z);
		this.drawClick(x, y, z);
	}
}

//button
function Button() {
	this.clickMaterial = new THREE.LineBasicMaterial({color: 0x000000});

	this.drawClick = function(x, y, z) {
		this.click = makeButtonRectangle(x, y, x + 2.5, y, x + 2.5, y + 2.5, x, y + 2.5);
		this.click = new THREE.Mesh(this.click, this.clickMaterial);
		scene.add(this.click);
		raycasterObjects.push(this.click);
		this.click.position.setZ(z)
	}

	this.drawSquare = function(x, y, z) {
		this.square = makeRectangle(x, y, x + 2.5, y, x + 2.5, y + 2.5, x, y + 2.5, false);
		scene.add(this.square);
		this.square.position.setZ(z);

		this.drawClick(x, y, z);
	}
}

//diamond shaped button
function DiamondButton() {
	this.clickMaterial = new THREE.LineBasicMaterial({color: 0x000000});

	this.drawClick = function(x, y, z) {
		this.click = makeButtonRectangle(x, y, x + 0.5, y + 0.5, x, y + 1, x - 0.5, y + 0.5);
		this.click = new THREE.Mesh(this.click, this.clickMaterial);
		scene.add(this.click);
		raycasterObjects.push(this.click);
		this.click.position.setZ(z);
	}

	this.drawSquare = function(x, y, z) {
		this.square = makeRectangle(x, y, x + 0.5, y + 0.5, x, y + 1, x - 0.5, y + 0.5, false);
		scene.add(this.square);
		this.square.position.setZ(z);

		this.drawClick(x, y, z);
	}
}

//makes line
function makeLine(x1, y1, x2, y2) {
	var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(x1, y1, 0));
    geometry.vertices.push(new THREE.Vector3(x2, y2, 0));
	var line = new THREE.Line(geometry, hollowMeshMaterial);
	return line;
}

//generates 4-sided shape geometry with material (optional fill)
function makeRectangle(x1, y1, x2, y2, x3, y3, x4, y4, fill) {
	var square = new THREE.Shape();
	square.moveTo(x1, y1);
	square.lineTo(x2, y2);
	square.lineTo(x3, y3);
	square.lineTo(x4, y4);
	square.lineTo(x1, y1);

	square = square.makeGeometry();

	if (fill) {
		square = new THREE.Mesh(square, fullMeshMaterial);
	} else {
		square = new THREE.EdgesGeometry(square);
		square = new THREE.LineSegments(square, hollowMeshMaterial);
	}

	return square;
}

//generates 4 sided shape geometry
function makeButtonRectangle(x1, y1, x2, y2, x3, y3, x4, y4) {
	var square = new THREE.Shape();
	square.moveTo(x1, y1);
	square.lineTo(x2, y2);
	square.lineTo(x3, y3);
	square.lineTo(x4, y4);
	square.lineTo(x1, y1);

	square = square.makeGeometry();
	return square;
}