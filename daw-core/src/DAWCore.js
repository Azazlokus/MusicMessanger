"use strict";

class DAWCore {
	constructor() {
		this.cb = {};
		this.env = Object.seal( {
			def_bpm: 120,
			def_appGain: 1,
			def_nbTracks: 21,
			def_stepsPerBeat: 4,
			def_beatsPerMeasure: 4,
			sampleRate: 48000,
			analyserFFTsize: 8192,
			analyserEnable: true,
			clockSteps: false,
		} );
		this.cmps = {
			local: new Map(),
			cloud: new Map(),
		};
		this.ctx = null;
		this._wadrumrows = new gswaDrumrows();
		this.history = new DAWCore.History( this );
		this.buffers = new DAWCore.Buffers( this );
		this.buffersSlices = new DAWCore.BuffersSlices( this );
		this.destination = new DAWCore.Destination( this );
		this.composition = new DAWCore.Composition( this );
		this.keys = new DAWCore.Keys( this );
		this.drums = new DAWCore.Drums( this );
		this.slices = new DAWCore.Slices( this );
		this._loop = this._loop.bind( this );
		this._loopMs = 1;
		this._focused = this.composition;
		this._focusedStr = "composition";
		this._focusedSwitch = "keys";
		this.get = {
			saveMode: () => this.composition.cmp.options.saveMode,
			currentTime: () => this.composition.currentTime,
			compositions: saveMode => this.cmps[ saveMode ],
			composition: ( saveMode, id ) => this.cmps[ saveMode ].get( id ),
			opened: t => this.composition.cmp[ DAWCore.actions.common.patternOpenedByType[ t ] ],
			// .................................................................
			ctx: () => this.ctx,
			audioDestination: () => this.destination.getDestination(),
			audioBuffer: id => this.buffers.getBuffer( this.composition.cmp.buffers[ id ] ).buffer,
			audioSlices: id => this.buffersSlices.getBuffer( id ),
			audioChanIn: id => this.composition._wamixer.getChanInput( id ),
			audioChanOut: id => this.composition._wamixer.getChanOutput( id ),
			audioEffect: id => this.composition._waeffects.getFx( id ),
			audioSynth: id => this.composition._synths.get( id ),
			// .................................................................
			cmp: () => this.composition.cmp,
			id: () => this.composition.cmp.id,
			bpm: () => this.composition.cmp.bpm,
			bps: () => this.composition.cmp.bpm / 60,
			name: () => this.composition.cmp.name,
			loopA: () => this.composition.cmp.loopA,
			loopB: () => this.composition.cmp.loopB,
			duration: () => this.composition.cmp.duration,
			beatsPerMeasure: () => this.composition.cmp.beatsPerMeasure,
			stepsPerBeat: () => this.composition.cmp.stepsPerBeat,
			// .................................................................
			block: id => this.composition.cmp.blocks[ id ],
			blocks: () => this.composition.cmp.blocks,
			buffer: id => this.composition.cmp.buffers[ id ],
			buffers: () => this.composition.cmp.buffers,
			channel: id => this.composition.cmp.channels[ id ],
			channels: () => this.composition.cmp.channels,
			slices: id => id ? this.composition.cmp.slices[ id ] : this.composition.cmp.slices, // 1.
			drumrow: id => this.composition.cmp.drumrows[ id ],
			drumrows: () => this.composition.cmp.drumrows,
			drums: id => id ? this.composition.cmp.drums[ id ] : this.composition.cmp.drums, // 1.
			effect: id => this.composition.cmp.effects[ id ],
			effects: () => this.composition.cmp.effects,
			keys: id => id ? this.composition.cmp.keys[ id ] : this.composition.cmp.keys, // 1.
			pattern: id => this.composition.cmp.patterns[ id ],
			patterns: () => this.composition.cmp.patterns,
			synth: id => this.composition.cmp.synths[ id ],
			synths: () => this.composition.cmp.synths,
			track: id => this.composition.cmp.tracks[ id ],
			tracks: () => this.composition.cmp.tracks,
			// .................................................................
			patternDuration: id => {
				const pat = this.get.pattern( id );

				return pat.type !== "slices"
					? pat.duration
					: pat.source
						? this.get.pattern( pat.source ).duration
						: this.get.beatsPerMeasure();
			},
		};

		this._wadrumrows.getAudioBuffer = this.get.audioBuffer;
		this._wadrumrows.getChannelInput = this.get.audioChanIn;
		this._wadrumrows.onstartdrum = rowId => this._call( "onstartdrum", rowId );
		this._wadrumrows.onstartdrumcut = rowId => this._call( "onstopdrumrow", rowId );
		this.setLoopRate( 60 );
		this.resetAudioContext();
		this.destination.setGain( this.env.def_appGain );
	}

	setCtx( ctx ) {
		this.ctx = ctx;
		this.drums._waDrums.setContext( ctx );
		this.slices.setContext( ctx );
		this.keys._waKeys.setContext( ctx );
		this._wadrumrows.setContext( ctx );
		this.destination.setCtx( ctx );
		this.composition.setCtx( ctx );
	}
	resetAudioContext() {
		this.stop();
		this.setCtx( new AudioContext( { sampleRate: this.env.sampleRate } ) );
	}
	envChange( obj ) {
		Object.assign( this.env, obj );
		if ( "clockSteps" in obj ) {
			this._clockUpdate();
		}
	}
	callAction( action, ...args ) {
		const fn = DAWCore.actions[ action ];

		if ( !fn ) {
			console.error( `DAWCore: undefined action "${ action }"` );
		} else {
			const ret = DAWCore.utils.deepFreeze( fn( ...args, this.get ) );

			if ( Array.isArray( ret ) ) {
				this.history.stackChange( ...ret );
			} else if ( ret ) {
				const undo = DAWCore.utils.composeUndo( this.get.cmp(), ret );

				this.composition.change( ret, undo );
			}
		}
	}
	compositionNeedSave() {
		return !this.composition._saved;
	}

	// ..........................................................................
	getFocusedObject() {
		return this._focused;
	}
	getFocusedName() {
		return this._focusedStr;
	}
	getFocusedDuration() {
		return this._focusedStr === "composition"
			? this.get.duration()
			: this.get.patternDuration( this.get.opened( this._focusedStr ) );
	}
	focusSwitch() {
		this.focusOn( this._focusedStr === "composition" ? this._focusedSwitch : "composition", "-f" );
	}
	focusOn( win, f ) {
		switch ( win ) {
			case "keys":
			case "drums":
			case "slices":
				if ( this.get.opened( win ) !== null ) {
					if ( this._focused !== this[ win ] ) {
						this.#focusOn( win, f );
					}
					return;
				}
			case "composition":
				if ( this._focused !== this.composition ) {
					this.#focusOn( "composition", f );
				}
		}
	}
	#focusOn( focusedStr, force ) {
		if ( force === "-f" || !this.isPlaying() ) {
			this.pause();
			this._focused = this[ focusedStr ];
			this._focusedStr = focusedStr;
			if ( focusedStr !== "composition" ) {
				this._focusedSwitch = focusedStr;
			}
			this._call( "focusOn", focusedStr );
			this._clockUpdate();
		}
	}

	// ..........................................................................
	isPlaying() {
		return this.composition.playing || this.keys.playing || this.drums.playing 
		|| this.slices.playing;
	}
	togglePlay() {
		this.isPlaying() ? this.pause() : this.play();
	}
	play() {
		this._focused.play();
		this._call( "play", this._focusedStr );
	}
	pause() {
		this._focused.pause();
		this._call( "pause", this._focusedStr );
		this._clockUpdate();
	}
	stop() {
		this._focused.stop();
		this._call( "stop", this._focusedStr );
		this._call( "currentTime", this._focused.getCurrentTime(), this._focusedStr );
		this._clockUpdate();
	}
	setSampleRate( sr ) {
		if ( sr !== this.env.sampleRate ) {
			this.env.sampleRate = sr;
			this.resetAudioContext();
		}
	}
	setLoopRate( fps ) {
		this._loopMs = 1000 / fps | 0;
	}

	// ..........................................................................
	_startLoop() {
		this._clockUpdate();
		this._loop();
	}
	_stopLoop() {
		clearTimeout( this._frameId );
		cancelAnimationFrame( this._frameId );
	}
	_loop() {
		const anData = this.destination.analyserFillData();

		if ( anData ) {
			this.composition.updateChanAudioData();
			this._call( "analyserFilled", anData );
		}
		if ( this.isPlaying() ) {
			const beat = this._focused.getCurrentTime();

			this._call( "currentTime", beat, this._focusedStr );
			this._clockUpdate();
		}
		this._frameId = this._loopMs < 20
			? requestAnimationFrame( this._loop )
			: setTimeout( this._loop, this._loopMs );
	}
	_clockUpdate() {
		this._call( "clockUpdate", this._focused.getCurrentTime() );
	}
	_call( cbName, ...args ) {
		const fn = this.cb[ cbName ];

		return fn && fn( ...args );
	}
}

DAWCore.json = { effects: {} };
DAWCore.utils = {};
DAWCore.actions = { common: {} };
DAWCore.controllers = {};
DAWCore.controllersFx = {};

/*
1. The getter 'keys', 'drums' and 'slices' can't use their singular form like the others getters
   because 'key' and 'drum' are referring to the objects contained in ONE 'keys' or 'drums'.
   So `keys[0]` is a 'keys' not a 'key', a 'key' would be `keys[0][0]`.
*/
