# SOS

This README is mostly for me, but you can look if you wannaaaaaaaaaa

ABSTRACT
========

### atmosphere & aesthetic
	-Dark
	-Isolation
	-Lonely
	-Minimalistic
	-Wireframe ships
	-Space-like minimal environment
	-Solid white celestial bodies
	-Music takes up huge space, airy and empty

### experience
	-First person
	-Relatively slow movement speed
	-Can visually explore ship
	-Can interact with ship modules
	-Intricate ambient electro soundscape - celestial bodies produce sound
	-Celestial bodies pulse in size to sequenced music
	-Particles in space background

### gameplay
	-Ship modules modify sound synthesis (LFO, filters, envelopes, effects, waveforms, phase)
	-Can go inside black celestial body and all colors become inversed (or something), exploring different worlds
	-Explore to find new areas, sounds, and visuals
	-Find more ship modules through exploration
	-To-be-found ship modules make unique sound that helps player find them in space?

TIMELINE
========

	PHASE 1 - ui
		-interactive user interface

	PHASE 2 - ship
		-dual camera controls
		-ship steering
		-ship physics and movement
		
	Phase 3 - environment
		-polish (particles, effects)
		-anomalies

	PHASE 4 - story + gameplay
		-progression system
		-unlockable modules
		-narrative elements

MECHANICS
=========

### controls
	-Mouse to look around and steer ship (further mouse is from screen center, faster ship steers)
	-Alt toggle allows looking around without steering ship
	-Left click to interact with simple modules inside ship
	-Left click hold/drag to interact with more elaborate ship modules
	-W to increase thrust, applied in direction of camera facing when steering (and S to lower thrust, just for convenience)

### user interface
	-Simple 'slider' to show thrust, everything else is audio module related
	-Modules for the following elements, each one with its various parameters:

		Base (applied to each synth individually, every synth having its own base parts)
		-Synths (synthesizer picker/4)
		-Sequencer (scale type, 8 quarter notes per page, 4 pages)
		-Envelope (attack, sustain, release)
		-Oscillator (type(4), count, spread)

		Effects
		-Lowpass / Highpass / Band filter(s) (frequency, Q, LFO speed, LFO amplitude)
		-Phase (frequency, base frequency, wetness)
		-Vibrato (frequency, depth(wetness))
		-Distortion (distortion(amount), wetness)
		-Chorus (frequency, depth, delay time, wetness)
		-Delay (delay time, feedback, wetness)
		-Reverb (decay, size, wetness)
		
		Chain
		Synth > Envelope > Oscillator > Filters (band > low > pass) > Phase > Vibrato > Distortion > Chorus > Delay > Reverb > Master

OBJECTS
=======

### ship
	-Class that constructs entire ship (with methods for unlockable modules)
	-Ship front is shaped like an opening trapezoid
	-Its movement is updated every render call if player input
	-Ship is not fast, but also not annoyingly slow
	-Ship can can roll and steer in any direction
	-Ship physics are as follows:
		-Thrust ('currentVector') is applied in direction of camera facing vector when player sets 'thrust' to anything higher than 0
		-At a low 'thrust', the ship will continuously accelerate at a slow speed. At a high 'thrust', the ship will continuously accelerate at a faster speed (until reaching a hard limit)
		-'actualVector' is vector used to translate the ship movement, and is calculated by easing 'actualVector' into 'currentVector'
		-This speed of the easing takes more or less time, depending on the velocity tied to 'actualVector', and the amount of 'thrust' applied by the player
		-If 'thrust' is 0, then the ship will continue on its 'actualVector' freely, and the player can steer the ship without any applicatin of 'currentVector', essentially allowing the ship to drift through space
		-To stop the ship, the player must hold 'space', which overrides all thrust and slowly eases currentVector's velocity to 0

### space
	-Black (can be other colors in different worlds)
	-Vast, empty, no fog

### celestial bodies
	-Spheres, solid color (usually opposite color of space)
	-Have collision, ship can't go through them
	-Map is procedurally generated

### particles
	-Small dot particles spawn around ship and float
	-When ship moves, particles are left behind, giving sense of movement

### anomalies
	-Hard to find celestial objects
	-Can transport you to other 'realms'
	-No collision

RESOURCES
=========

### libraries / frameworks / other people's code
	-Three.js
	-Code inspiration from three.js' first person platformer example's code for camera control in first person mode (original: PointerLockControls.js, current: firstpersoncontrols.js)
	-Code inspiration from three.js' webgl_geometry_terrain example's code for camera / ship control in ship steering mode (original: FirstPersonControls.js, current: shipcontrols.js)
	-Tone.js for audio synthesis and interactive audio manipulation