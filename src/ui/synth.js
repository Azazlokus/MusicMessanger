"use strict";

function UIsynthInit() {
	UIsynth.setDAWCore( DAW );
	UIsynth.setWaveList( Array.from( gswaPeriodicWaves.list.keys() ) );
	DOM.synthName.onclick = () => {
		const id = DAW.get.opened( "synth" ),
			name = DOM.synthName.textContent;

		GSUI.popup.prompt( "Изменить название синтезатора", "", name, "Изменить" )
			.then( name => DAW.callAction( "renameSynth", id, name ) );
	};
	UIwindows.window( "synth" ).contentAppend( UIsynth.rootElement );
}

function UIsynthChange( obj ) {
	if ( "name" in obj ) {
		DOM.synthName.textContent = obj.name;
	}
	if ( "dest" in obj ) {
		DOM.synthChannelBtnText.textContent = DAW.get.channel( obj.dest ).name;
	}
}
