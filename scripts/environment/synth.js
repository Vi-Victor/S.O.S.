//Synthesizer class encompassing all synth building blocks and effects
function Synth() {

	//all elements are ordered from bottom to top, as each must connect to an already declared element

	//reverb
	this.reverbSize = 1;
	this.reverbDampening = 1000;
	this.reverbWetness = 0;

	this.reverb = new Tone.Freeverb(this.reverbSize, this.reverbDampening).toMaster();

	//delay
	this.delayDelayTime = 0.1;
	this.delayFeedback = 0.8;
	this.delayWetness = 0;

	this.delay = new Tone.PingPongDelay (this.delayDelayTime, this.delayFeedback).connect(this.reverb);

	//chorus
	this.chorusFrequency = 1.5;
	this.chorusDelayTime = 3.5;
	this.chorusDepth = 0.7;
	this.chorusWetness = 0;

	this.chorus = new Tone.Chorus(this.chorusFrequency, this.chorusDelayTime, this.chorusDepth).connect(this.delay);

	//distortion
	this.distortionAmount = 1;
	this.distortionWetness = 0;

	this.distortion = new Tone.Distortion(this.distortionAmount).connect(this.chorus);

	//vibrato
	this.vibratoFrequency = 5;
	this.vibratoDepth = 0.07;

	this.vibrato = new Tone.Vibrato(this.vibratoFrequency, this.vibratoDepth).connect(this.distortion);

	//phaser
	this.phaserFrequency = 0.5;
	this.phaserBaseFrequency = 950;
	this.phaserQ = 0;

	this.phaser = new Tone.Phaser(this.phaserFrequency, 3, this.phaserBaseFrequency).connect(this.vibrato);

	//highpass + LFO
	this.highpassLFOFrequency = 0;
	this.highpassLFOAmplitude = 1;
	this.highpassFrequency = 0;
	this.highpassQ = 0;

	this.highPass = new Tone.Filter(this.highpassFrequency, "highpass", -12).connect(this.phaser);
	this.highpassLFO = new Tone.LFO(this.highpassLFOFrequency, 200, 800).connect(this.highPass.frequency).start();

	//lowpass + LFO
	this.lowpassLFOFrequency = 0;
	this.lowpassLFOAmplitude = 1;
	this.lowpassFrequency = 24000;
	this.lowpassQ = 0;

	this.lowPass = new Tone.Filter(this.lowpassFrequency, "lowpass", -12).connect(this.highPass);
	this.lowpassLFO = new Tone.LFO(this.lowpassLFOFrequency, 200, 800).connect(this.lowPass.frequency).start();

	//bandpass + LFO
	this.bandpassLFOFrequency = 0;
	this.bandpassLFOAmplitude = 1;
	this.bandpassFrequency = 0;
	this.bandpassQ = 0;

	this.bandPass = new Tone.Filter(this.bandpassFrequency, "bandpass", -12).connect(this.lowPass);
	this.bandpassLFO = new Tone.LFO(this.bandpassLFOFrequency, 200, 800).connect(this.bandPass.frequency).start();

	//synth

	//envelope
	this.envAttack = 0.1;
	this.envDecay = 0.2;
	this.envSustain = 1.0;
	this.envRelease = 0.8;

	//oscillator
	this.oscType = "sawtooth";
	this.oscCount = 3;
	this.oscSpread = 20;

	//octave
	this.synthOctave = "4";

	//volume
	this.synthVolume = -20;

	this.synth = new Tone.Synth().connect(this.bandPass);

	//updates elements with new values
	this.updateSynth = function() {

		//synth
		this.synth.volume.value = this.synthVolume;

		//envelope
		this.synth.envelope.set({
			"attack": this.envAttack,
			"decay": this.envDecay,
			"sustain": this.envSustain,
			"release": this.envRelease
		});

		//oscilator
		this.synth.oscillator.set({
			"type": this.oscType,
			"count": this.oscCount,
			"spread": this.oscSpread
		});

		//lowpass
		this.lowpassLFO.set({
			"frequency": this.lowpassLFOFrequency + "n",
			"amplitude": this.lowpassLFOAmplitude
		});

		this.lowPass.set({
			"frequency": this.lowpassFrequency,
			"Q": this.lowpassQ
		});

		//bandpass
		this.bandpassLFO.set({
			"frequency": this.bandpassLFOFrequency + "n",
			"amplitude": this.bandpassLFOAmplitude
		});

		this.bandPass.set({
			"frequency": this.bandpassFrequency,
			"Q": this.bandpassQ
		});

		//highpass
		this.highpassLFO.set({
			"frequency": this.highpassLFOFrequency + "n",
			"amplitude": this.highpassLFOAmplitude
		});

		this.highPass.set({
			"frequency": this.highpassFrequency,
			"Q": this.highpassQ
		});

		//phaser
		this.phaser.set({
			"frequency": this.phaserFrequency,
			"baseFrequency" : this.phaserBaseFrequency,
			"Q": this.phaserQ
		});

		//vibrato
		this.vibrato.set({
			"frequency": this.vibratoFrequency,
			"depth": this.vibratoDepth
		});

		//distortion
		this.distortion.set({
			"distortion": this.distortionAmount
		});
		this.distortion.wet.value = this.distortionWetness;

		//chorus
		this.chorus.set({
			"frequency": this.chorusFrequency,
			"delayTime": this.chorusDelayTime,
			"depth": this.chorusDepth
		});
		this.chorus.wet.value = this.chorusWetness;

		//delay
		this.delay.set({
			"delayTime": this.delayDelayTime,
			"feedback": this.delayFeedback
		});
		this.delay.wet.value = this.delayWetness;

		//reverb
		this.reverb.set({
			"roomSize": this.reverbSize,
			"dampening": this.reverbDampening
		});
		this.reverb.wet.value = this.reverbWetness;
	}
}