//Interface class handling interface generation, positioning, and user input for sequencing and synth modification
function Interface() {

	this.zDistance = -25;

	//sequencers
	this.seqs = new Array(4);

	//UI elements
	this.volume = new Bar();
	this.lowPassFilter = new TwoD();

	this.sequencer = new Seqq();
	this.playFirstSequence = new Button();
	this.playSecondSequence = new Button();
	this.playThirdSequence = new Button();
	this.playFourthSequence = new Button();
	this.firstSynth = new Button();
	this.secondSynth = new Button();
	this.thirdSynth = new Button();
	this.fourthSynth = new Button();

	//initialization
	this.init = function() {
		for (var i = 0; i < this.seqs.length; i++) {
			this.seqs[i] = new Sequencer();
			this.seqs[i].init();
		}
	}

	//draw UI
	this.drawInterface = function() {
		this.volume.drawBar(0, -15, this.zDistance);
		this.lowPassFilter.drawSquare(0, 0, this.zDistance);

		this.sequencer.drawSquare(-22.5, 0, this.zDistance);
		this.playFirstSequence.drawSquare(-12.5, -15, this.zDistance);
		this.playSecondSequence.drawSquare(-10, -15, this.zDistance);
		this.playThirdSequence.drawSquare(-7.5, -15, this.zDistance);
		this.playFourthSequence.drawSquare(-5, -15, this.zDistance);
		this.firstSynth.drawSquare(-27.5, -2.5, this.zDistance);
		this.secondSynth.drawSquare(-27.5, -5, this.zDistance);
		this.thirdSynth.drawSquare(-27.5, -7.5, this.zDistance);
		this.fourthSynth.drawSquare(-27.5, -10, this.zDistance);
	}

	//map the synths in the sequencers to the UI setup
	this.updateSynths = function() {
		this.seqs[0].synther.synthVolume = map(this.volume.click.position.x, 0, 7.5, -60, 0);

		this.seqs[0].synther.lowpassQ = map(this.lowPassFilter.click.position.x, -5, 5, -1, 10);
		this.seqs[0].synther.lowpassFrequency = map(this.lowPassFilter.click.position.y, -5, 5, 100, 6000);

		//custom adjustments
		this.seqs[0].synther.reverbWetness = 0.6;
		this.seqs[0].synther.reverbSize = 0.96;

		this.seqs[1].synther.synthOctave = 3;
		this.seqs[1].synther.reverbWetness = 0.01;
		this.seqs[0].synther.reverbSize = 0.98;
		this.seqs[1].synther.envAttack = 0.01;
		this.seqs[1].synther.distortionWetness = 0.2;
		this.seqs[1].synther.chorusWetness = 0.8;
		this.seqs[1].synther.oscType = "sine";

		this.seqs[2].synther.synthOctave = 5;
		this.seqs[2].synther.reverbWetness = 0.2;
		this.seqs[0].synther.reverbSize = 0.98;
		this.seqs[2].synther.distortionWetness = 0.4;
		this.seqs[2].synther.phaserQ = 0.9;
		this.seqs[2].synther.synthVolume = -40;
		this.seqs[2].synther.oscType = "square";
		this.seqs[2].synther.envRelease = 2;

		this.seqs[3].synther.delayWetness = 0.3;
		this.seqs[3].synther.reverbWetness = 0.2;
		this.seqs[3].synther.synthOctave = 1;
		this.seqs[3].synther.synthVolume = -15;
	}

	//updates sequencers' sequences
	this.updateSequencers = function() {

		for (var i = 0; i < this.seqs.length; i++) {
			for (var j = 0; j < 8; j++) {
				var random_boolean = Math.random() >= 0.5;
				this.seqs[i].noteTriggers[j] = random_boolean;
			}
		}

		this.seqs[0].notePitches[0] = "F#";
		this.seqs[0].notePitches[1] = "A";
		this.seqs[0].notePitches[2] = "C#";
		this.seqs[0].notePitches[3] = "F#";
		this.seqs[0].notePitches[4] = "F#";
		this.seqs[0].notePitches[5] = "A";
		this.seqs[0].notePitches[6] = "C#";
		this.seqs[0].notePitches[7] = "F#";

		this.seqs[1].notePitches[0] = "F#";
		this.seqs[1].notePitches[1] = "F#";
		this.seqs[1].notePitches[2] = "F#";
		this.seqs[1].notePitches[3] = "F#";
		this.seqs[1].notePitches[4] = "F#";
		this.seqs[1].notePitches[5] = "F#";
		this.seqs[1].notePitches[6] = "F#";
		this.seqs[1].notePitches[7] = "F#";

		this.seqs[2].notePitches[0] = "F#";
		this.seqs[2].notePitches[1] = "A";
		this.seqs[2].notePitches[2] = "C#";
		this.seqs[2].notePitches[3] = "F#";
		this.seqs[2].notePitches[4] = "F#";
		this.seqs[2].notePitches[5] = "A";
		this.seqs[2].notePitches[6] = "C#";
		this.seqs[2].notePitches[7] = "F#";

		this.seqs[3].notePitches[0] = "F#";
		this.seqs[3].notePitches[1] = "F#";
		this.seqs[3].notePitches[2] = "F#";
		this.seqs[3].notePitches[3] = "F#";
		this.seqs[3].notePitches[4] = "F#";
		this.seqs[3].notePitches[5] = "F#";
		this.seqs[3].notePitches[6] = "F#";
		this.seqs[3].notePitches[7] = "F#";

		if (this.playFirstSequence.click.on) this.seqs[0].playSequence();
		if (this.playSecondSequence.click.on) this.seqs[1].playSequence();
		if (this.playThirdSequence.click.on) this.seqs[2].playSequence();
		if (this.playFourthSequence.click.on) this.seqs[3].playSequence();
	}
}