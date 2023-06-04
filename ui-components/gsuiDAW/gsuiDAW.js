"use strict";

class gsuiDAW extends HTMLElement {
	onSubmitLogin = GSUI.noop
	onSubmitOpen = GSUI.noop
	onExportJSON = GSUI.noop
	#cmps = {
		local: new Map(),
		cloud: new Map(),
	}
	#cmpId = null
	#cmpSaveMode = "local"
	#currentActionInd = -1
	#actions = null
	#dispatch = GSUI.dispatchEvent.bind( null, this, "gsuiDAW" )
	#children = GSUI.getTemplate( "gsui-daw" )
	#timeSelecting = false
	#elements = GSUI.findElements( this.#children, {
		head: ".gsuiDAW-head",
		bpm: ".gsuiDAW-tempo-bpm",
		bPM: ".gsuiDAW-tempo-beatsPerMeasure",
		sPB: ".gsuiDAW-tempo-stepsPerBeat",
		cmpName: ".gsuiDAW-currCmp-name",
		cmpSave: ".gsuiDAW-currCmp-saveBtn",
		cmpIcon: ".gsuiDAW-currCmp-localIcon",
		cmpDuration: ".gsuiDAW-currCmp-dur",
		play: "[data-action='play']",
		vers: ".gsuiDAW-version-num",
		clock: "gsui-clock",
		spectrum: "gsui-spectrum",
		volume: ".gsuiDAW-volume gsui-slider",
		currentTime: ".gsuiDAW-areaTime gsui-slider",
		userAvatar: "[data-action='profile']",
		login: "[data-action='login']",
		logout: "[data-action='logout']",
		cmpsLocalList: ".gsuiDAW-dropdown-list[data-list='local']",
		cmpsCloudList: ".gsuiDAW-dropdown-list[data-list='cloud']",
		historyList: ".gsuiDAW-history .gsuiDAW-dropdown-list",
		winBtns: {
			blocks: "[data-win='blocks']",
			mixer: "[data-win='mixer']",
			main: "[data-win='main']",
			synth: "[data-win='synth']",
			drums: "[data-win='drums']",
			piano: "[data-win='piano']",
			slicer: "[data-win='slicer']",
			effects: "[data-win='effects']",
		},
	} )
	#popups = {
		/*auth: GSUI.findElements( GSUI.getTemplate( "gsui-daw-popup-auth" ), {
			root: ".gsuiDAW-popup-auth",
			error: ".gsuiDAW-popup-auth-error",
		} ), */
		open: GSUI.findElements( GSUI.getTemplate( "gsui-daw-popup-open" ), {
			root: ".gsuiDAW-popup-open",
			inputOpenURL: "[name='url']",
			inputOpenFile: "[name='file']",
		} ),
		tempo: GSUI.findElements( GSUI.getTemplate( "gsui-daw-popup-tempo" ), {
			root: ".gsuiDAW-popup-tempo",
			beatsPerMeasure: "[name='beatsPerMeasure']",
			stepsPerBeat: "[name='stepsPerBeat']",
			bpm: "[name='bpm']",
			bpmTap: ".gsuiDAW-bpmTap",
		} ),
		about: GSUI.findElements( GSUI.getTemplate( "gsui-daw-popup-about" ), {
			root: ".gsuiDAW-popup-about",
			version: ".gsuiDAW-popup-about-versionNum",
			versionIcon: ".gsuiDAW-popup-about-head .gsuiIcon",
			versionCheck: ".gsuiDAW-popup-about-versionCheck",
		} ), 
		export: GSUI.findElements( GSUI.getTemplate( "gsui-daw-popup-export" ), {
			root: ".gsuiDAW-popup-export",
			button: ".gsuiDAW-popup-export-btn",
			progress: ".gsuiDAW-popup-export-progress",
		} ),
		//shortcuts: GSUI.getTemplate( "gsui-daw-popup-shortcuts" ),
		//cookies: GSUI.getTemplate( "gsui-daw-popup-cookies" ),
		settings: GSUI.findElements( GSUI.getTemplate( "gsui-daw-popup-settings" ), {
			root: ".gsuiDAW-popup-settings",
			sampleRate: "[name='sampleRate']",
			uiRateRadio: {
				auto: "[name='uiRate'][value='auto']",
				manual: "[name='uiRate'][value='manual']",
			},
			uiRateManualFPS: "[name='uiRate'][value='manual'] + .gsuiDAW-uiRateFps",
			uiRateManualRange: "[name='uiRateFPS']",
			windowsLowGraphics: "[name='windowsLowGraphics']",
			timelineNumbering: "[name='timelineNumbering']",
		} ),
	}

	constructor() {
		super();
		this.clock = this.#elements.clock;
		this.spectrum = this.#elements.spectrum;
		Object.seal( this );

		this.clock.onchangeDisplay = display => this.#dispatch( "changeDisplayClock", display );
		this.spectrum.setResolution( 140 );
		this.#actions = this.#elements.historyList.getElementsByClassName( "gsuiDAW-history-action" );
		this.#elements.head.onclick = this.#onclickHead.bind( this );
		this.#elements.cmpsCloudList.ondragstart = gsuiDAW.#ondragstartCmp.bind( null, "cloud" );
		this.#elements.cmpsLocalList.ondragstart = gsuiDAW.#ondragstartCmp.bind( null, "local" );
		this.#elements.cmpsCloudList.ondragover =
		this.#elements.cmpsLocalList.ondragover = e => e.preventDefault();
		this.#elements.cmpsCloudList.ondrop =
		this.#elements.cmpsLocalList.ondrop = this.#ondropCmp.bind( this );
		this.#popups.tempo.bpmTap.onclick = () => this.#popups.tempo.bpm.value = gswaBPMTap.tap();
		this.#popups.settings.uiRateManualRange.onmousedown = () => this.#popups.settings.uiRateRadio.manual.checked = true;
		this.#popups.settings.uiRateManualRange.oninput = e => {
			this.#popups.settings.uiRateManualFPS.textContent =
				e.target.value.padStart( 2, "0" );
		};
		this.#popups.export.button.onclick = e => {
			const d = e.currentTarget.dataset;

			if ( d.status !== "2" ) {
				e.preventDefault();
			}
			if ( d.status === "0" ) {
				d.status = "1";
				this.#dispatch( "export" );
			}
		};
		GSUI.listenEvents( this.#elements.volume, {
			gsuiSlider: {
				input: d => this.#dispatch( "volume", d.args[ 0 ] ),
				inputStart: GSUI.noop,
				inputEnd: GSUI.noop,
				change: GSUI.noop,
			},
		} );
		GSUI.listenEvents( this.#elements.currentTime, {
			gsuiSlider: {
				inputStart: d => {
					this.#timeSelecting = true;
					this.#elements.clock.setTime( d.args[ 0 ] );
				},
				inputEnd: d => {
					this.#timeSelecting = false;
				},
				input: d => {
					this.#elements.clock.setTime( d.args[ 0 ] );
					this.#dispatch( "currentTimeLive", d.args[ 0 ] );
				},
				change: d => {
					this.#dispatch( "currentTime", d.args[ 0 ] );
				},
			},
		} );
	}

	// .........................................................................
	connectedCallback() {
		if ( this.#children ) {
			this.append( ...this.#children );
			this.#children = null;
			GSUI.recallAttributes( this, {
				saved: true,
				uirate: "auto",
				timelinenumbering: 0,
				bpm: 60,
				name: "",
				duration: 10,
				timedivision: "1/1",
				currenttime: 0,
				maxtime: 1,
				volume: 1,
				version: "0.0.0",
			} );
		}
	}
	static get observedAttributes() {
		return [
			"bpm",
			"currentcomposition",
			"currenttime",
			"duration",
			"errauth",
			"exporting",
			"logging",
			"maxtime",
			"name",
			"playing",
			"saving",
			"timedivision",
			"timelinenumbering",
			"useravatar",
			"username",
			"version",
			"volume",
		];
	}
	attributeChangedCallback( prop, prev, val ) {
		if ( !this.#children && prev !== val ) {
			switch ( prop ) {
				case "currentcomposition":
					val
						? this.#loadComposition( ...val.split( ":" ) )
						: this.#unloadComposition();
					break;
				case "errauth":
					this.#popups.auth.error.textContent = val;
					break;
				case "exporting":
					this.#popups.export.progress.value = val;
					break;
				case "logging":
					this.#elements.login.dataset.spin =
					this.#elements.logout.dataset.spin = val !== null ? "on" : "";
					break;
				case "name":
					this.#elements.cmpName.textContent = val;
					break;
				case "playing":
					this.#elements.play.dataset.icon = val !== null ? "pause" : "play";
					break;
				case "saving":
					this.#cmps[ this.#cmpSaveMode ].get( this.#cmpId ).save.dataset.spin =
					this.#elements.cmpSave.dataset.spin = val !== null ? "on" : "";
					break;
				case "duration":
					this.#updateDuration();
					break;
				case "timelinenumbering":
					gsuiClock.numbering( val );
					break;
				case "bpm":
					GSUI.setAttribute( this.#elements.clock, "bpm", val );
					this.#elements.bpm.textContent = val;
					this.#updateDuration();
					break;
				case "timedivision":
					GSUI.setAttribute( this.#elements.clock, "timedivision", val );
					this.#elements.bPM.textContent = val.split( "/" )[ 0 ];
					this.#elements.sPB.textContent = val.split( "/" )[ 1 ];
					break;
				case "volume":
					this.#elements.volume.setValue( val );
					break;
				case "currenttime":
					if ( !this.#timeSelecting ) {
						this.#elements.clock.setTime( val );
						this.#elements.currentTime.setValue( val );
					}
					break;
				case "maxtime":
					GSUI.setAttribute( this.#elements.currentTime, "max", val );
					break;
				case "useravatar":
					this.#elements.userAvatar.style.backgroundImage = val ? `url("${ val }")` : "";
					break;
			}
		}
	}

	// .........................................................................
	updateSpectrum( data ) {
		this.#elements.spectrum.draw( data );
	}
	#unloadComposition() {
		this.#cmpId = null;
		this.#cmpSaveMode = "local";
		this.querySelector( ".gsuiDAW-cmp-loaded" )?.classList?.remove( "gsuiDAW-cmp-loaded" );
	}
	#loadComposition( saveMode, id ) {
		const html = this.#cmps[ saveMode ].get( id );

		this.#unloadComposition();
		if ( html ) {
			this.#cmpId = id;
			this.#cmpSaveMode = saveMode;
			html.root.classList.add( "gsuiDAW-cmp-loaded" );
			html.root.parentNode.prepend( html.root );
			html.root.parentNode.scrollTop = 0;
			GSUI.setAttribute( this.#elements.cmpIcon, "data-icon", saveMode === "local" ? "local" : "cloud" );
			GSUI.setAttribute( this.#elements.cmpSave, "data-icon", saveMode === "local" ? "save" : "upload" );
		}
	}
	#updateDuration() {
		const dur = +this.getAttribute( "duration" ),
			[ min, sec ] = gsuiClock.parseBeatsToSeconds( dur, +this.getAttribute( "bpm" ) );

		this.#elements.cmpDuration.textContent = `${ min }:${ sec }`;
		GSUI.setAttribute( this.#elements.currentTime, "max", dur );
	}

	// .........................................................................
	showOpenPopup() {
		this.#popups.open.inputOpenFile.value =
		this.#popups.open.inputOpenURL.value = "";
		GSUI.popup.custom( {
			title: "Открыть",
			element: this.#popups.open.root,
			submit: obj => this.onSubmitOpen( obj.url, obj.file ),
		} );
	}
	clearCompositions() {
		this.#cmps.local.forEach( html => html.root.remove() );
		this.#cmps.cloud.forEach( html => html.root.remove() );
	}
	addComposition( cmp ) {
		if ( this.#cmps.local.has( cmp.id ) || this.#cmps.cloud.has( cmp.id ) ) {
			this.updateComposition( cmp );
		} else {
			const saveMode = cmp.options.saveMode,
				root = GSUI.getTemplate( "gsui-daw-cmp", { id: cmp.id, saveMode } ),
				html = GSUI.findElements( root, {
					root: ".gsuiDAW-cmp",
					bpm: ".gsuiDAW-cmp-bpm",
					name: ".gsuiDAW-cmp-name",
					save: "[data-action='cmp-save']",
					duration: ".gsuiDAW-cmp-duration",
				} );

			this.#cmps[ saveMode ].set( cmp.id, html );
			this.updateComposition( cmp );
			( saveMode === "local"
				? this.#elements.cmpsLocalList
				: this.#elements.cmpsCloudList ).append( root );
			if ( `${ saveMode }:${ cmp.id }` === this.getAttribute( "currentcomposition" ) ) {
				this.#loadComposition( saveMode, cmp.id );
			}
		}
	}
	updateComposition( cmp ) {
		const html = this.#cmps[ cmp.options.saveMode ].get( cmp.id ),
			[ min, sec ] = gsuiClock.parseBeatsToSeconds( cmp.duration, cmp.bpm );

		html.bpm.textContent = cmp.bpm;
		html.name.textContent = cmp.name;
		html.duration.textContent = `${ min }:${ sec }`;
	}
	deleteComposition( cmp ) {
		const cmps = this.#cmps[ cmp.options.saveMode ],
			html = cmps.get( cmp.id );

		if ( html ) {
			html.root.remove();
			cmps.delete( cmp.id );
		}
	}
	readyToDownload( url, name ) {
		GSUI.setAttribute( this.#popups.export.button, "href", url );
		GSUI.setAttribute( this.#popups.export.button, "download", name );
		GSUI.setAttribute( this.#popups.export.button, "data-status", 2 );
	}
	static #ondragstartCmp( saveMode, e ) {
		const elCmp = e.target.closest( ".gsuiDAW-cmp" );

		e.dataTransfer.setData( "text/plain", `${ saveMode }:${ elCmp.dataset.id }` );
	}
	#ondropCmp( e ) {
		const [ saveMode, id ] = e.dataTransfer.getData( "text/plain" ).split( ":" );

		if ( saveMode !== e.currentTarget.dataset.list ) {
			this.#dispatch( "switchCompositionLocation", saveMode, id );
		}
	}

	// .........................................................................
	toggleWindow( win, b ) {
		GSUI.setAttribute( this.#elements.winBtns[ win ], "data-open", b );
	}
	clearHistory() {
		Array.from( this.#actions ).forEach( a => a.remove() );
		this.#currentActionInd = -1;
	}
	stackAction( icon, desc ) {
		Array.from( this.#actions ).forEach( a => "undone" in a.dataset && a.remove() );
		this.#elements.historyList.append( GSUI.getTemplate( "gsui-daw-history-action", { icon, desc, index: this.#actions.length } ) );
		this.#elements.historyList.scroll( 0, Number.MAX_SAFE_INTEGER );
		this.#currentActionInd = this.#actions.length - 1;
	}
	undo() {
		if ( this.#currentActionInd >= 0 ) {
			GSUI.setAttribute( this.#actions[ this.#currentActionInd-- ], "data-undone", true );
		}
	}
	redo() {
		if ( this.#currentActionInd < this.#actions.length - 1 ) {
			GSUI.setAttribute( this.#actions[ ++this.#currentActionInd ], "data-undone", false );
		}
	}

	// .........................................................................
	#onclickHead( e ) {
		const dt = e.target.dataset;

		switch ( dt.action ) {
			case "logout":
			case "localNewCmp":
			case "cloudNewCmp":
			case "focusSwitch":
			case "play":
			case "stop":
			case "reset":
			case "undo":
			case "redo":
				this.#dispatch( dt.action );
				break;
			case "cmp-save":
				this.#dispatch( "save" );
				break;
			case "cmp-open":
				e.preventDefault();
				this.#dispatch( "open",
					this.#elements.cmpsLocalList.contains( e.target.parentNode ) ? "local" : "cloud",
					e.target.parentNode.dataset.id );
				break;
			case "cmp-json": {
				const json = this.onExportJSON(
						this.#elements.cmpsLocalList.contains( e.target.parentNode ) ? "local" : "cloud",
						e.target.parentNode.dataset.id );

				if ( json ) {
					GSUI.setAttribute( e.target, "href", json.url );
					GSUI.setAttribute( e.target, "download", json.name );
				} else {
					e.preventDefault();
				}
			} break;
			case "cmp-delete":
				this.#dispatch( "delete",
					this.#elements.cmpsLocalList.contains( e.target.parentNode ) ? "local" : "cloud",
					e.target.parentNode.dataset.id );
				break;
			case "cmp-rename":
				GSUI.popup.prompt( "Название композиции", "", this.getAttribute( "name" ), "Изменить" )
					.then( n => n && n !== this.getAttribute( "name" ) && this.#dispatch( "rename", n ) );
				break;
			case "login":
				GSUI.popup.custom( {
					ok: "Sign in",
					title: "Аутентификация",
					element: this.#popups.auth.root,
					submit: obj => this.onSubmitLogin( obj.email, obj.password ),
				} ).then( () => {
					this.#popups.auth.root.querySelectorAll( "input" ).forEach( inp => inp.value = "" );
				} );
				break;
			case "localOpenCmp":
				this.showOpenPopup();
				break;
			case "window":
				this.#dispatch( dt.open === undefined ? "openWindow" : "closeWindow", dt.win );
				break;
			case "historyAction":
				if ( dt.index - this.#currentActionInd ) {
					this.#dispatch( "redoN", dt.index - this.#currentActionInd );
				}
				break;
			 case "cookies":
				GSUI.popup.custom( { title: "Куки", element: this.#popups.cookies } )
					.then( arg => arg !== undefined && this.#dispatch( "oki-cookies" ) );
				break;
			/* case "about":
				GSUI.popup.custom( { title: "About", element: this.#popups.about.root } );
				break; */
			case "export":
				GSUI.setAttribute( this, "exporting", 0 );
				GSUI.setAttribute( this.#popups.export.button, "href", "" );
				GSUI.setAttribute( this.#popups.export.button, "download", "" );
				GSUI.setAttribute( this.#popups.export.button, "data-status", 0 );
				GSUI.popup.custom( { title: "Экспорт", element: this.#popups.export.root } )
					.then( () => this.#dispatch( "abortExport" ) );
				break;
			case "shortcuts":
				GSUI.popup.custom( { title: "Шорткаты", element: this.#popups.shortcuts } );
				break;
			case "tempo":
				this.#popups.tempo.beatsPerMeasure.value = +this.getAttribute( "timedivision" ).split( "/" )[ 0 ];
				this.#popups.tempo.stepsPerBeat.value = +this.getAttribute( "timedivision" ).split( "/" )[ 1 ];
				this.#popups.tempo.bpm.value = +this.getAttribute( "bpm" );
				GSUI.popup.custom( { title: "Темп", element: this.#popups.tempo.root } )
					.then( data => {
						if ( data ) {
							const newTimediv = `${ data.beatsPerMeasure }/${ data.stepsPerBeat }`;

							if (
								newTimediv !== this.getAttribute( "timedivision" ) ||
								data.bpm !== +this.getAttribute( "bpm" )
							) {
								this.#dispatch( "tempo", data );
							}
						}
					} );
				break;
			case "settings":
				this.#popups.settings.sampleRate.value = +this.getAttribute( "samplerate" );
				this.#popups.settings.timelineNumbering.value = +this.getAttribute( "timelinenumbering" );
				this.#popups.settings.windowsLowGraphics.checked = this.getAttribute( "windowslowgraphics" ) === "";
				this.#popups.settings.uiRateRadio[ this.getAttribute( "uirate" ) === "auto" ? "auto" : "manual" ].checked = true;
				if ( this.getAttribute( "uirate" ) !== "auto" ) {
					this.#popups.settings.uiRateManualFPS.textContent = this.getAttribute( "uirate" ).padStart( 2, "0" );
					this.#popups.settings.uiRateManualRange.value = this.getAttribute( "uirate" );
				}
				GSUI.popup.custom( { title: "Настройки", element: this.#popups.settings.root } )
					.then( data => {
						if ( data ) {
							if ( data.uiRate === "manual" ) {
								data.uiRate = data.uiRateFPS;
							}
							delete data.uiRateFPS;
							if (
								data.uiRate != this.getAttribute( "uirate" ) || // 1.
								data.sampleRate !== +this.getAttribute( "samplerate" ) ||
								data.timelineNumbering !== +this.getAttribute( "timelinenumbering" ) ||
								data.windowsLowGraphics !== ( this.getAttribute( "windowslowgraphics" ) === "" )
							) {
								this.#dispatch( "settings", data );
							}
						}
					} );
				break;
			case "cmps":
			case "help":
			case "undoMore":
			case "changelog":
				break;
			default:
				dt.action && lg( "untracked action:", dt.action );
				break;
		}
	}
}

Object.seal( gsuiDAW );
customElements.define( "gsui-daw", gsuiDAW );
