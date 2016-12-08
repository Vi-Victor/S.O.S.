//Sequencer class that holds synthesizer and triggers synth notes accordingly
function Sequencer() {

	//note triggers
	this.noteTriggers = new Array(32);

	//note pitches
	this.notePitches = new Array(32);

	//synth
	this.synther = new Synth();

	//initialization
	this.init = function() {
		//populate note triggers with false booleans as default
		for (var i = 0; i < this.noteTriggers.length; i++) {
			this.noteTriggers[i] = false;
		}

		//populate note pitches with default note
		for (var i = 0; i < this.notePitches.length; i++) {
			this.notePitches[i] = "C";
		}
	}

	//plays sequence
	this.playSequence = function() {

		//notes for transport note timing
		var note= 0;
		var bar = 0;
		var line = 0;

		//sets to play all active notes in current pitch
		for (var i = 0; i < this.noteTriggers.length; i++) {

		//sets time for note call on transport
			if (i > 0) {
				note += 2;
				if (note == 4) {
					bar++;
					note = 0;
					if (bar == 4) {
						line++;
						bar = 0;
					}
				}
			}

			//sets note to play on determined time
			if(this.noteTriggers[i]) this.playNote(this.notePitches[i] + this.synther.synthOctave, line + ":" + bar + ":" + note);
		}
	}
	
	//sets a note of a given pitch to play at a given time in the transport
	this.playNote = function(notePitch, noteTime) {
		Tone.Transport.scheduleOnce(function(){
			this.synther.updateSynth();
			this.synther.synth.triggerAttackRelease(notePitch, "8n");
		}.bind(this), noteTime);
	}
}