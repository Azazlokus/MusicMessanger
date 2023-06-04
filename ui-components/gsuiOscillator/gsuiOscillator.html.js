"use strict";

GSUI.setTemplate( "gsui-oscillator", () => {
	return [
		GSUI.createElement( "div", { class: "gsuiOscillator-grip gsuiIcon", "data-icon": "grip-v" } ),
		GSUI.createElement( "div", { class: "gsuiOscillator-wave" },
			GSUI.createElement( "gsui-periodicwave" ),
			GSUI.createElement( "gsui-periodicwave" ),
		),
		GSUI.createElement( "button", { class: "gsuiOscillator-waveBtn gsuiOscillator-wavePrev gsuiIcon", "data-icon": "caret-left", title: "Предыдущий сигнал" } ),
		GSUI.createElement( "button", { class: "gsuiOscillator-waveBtn gsuiOscillator-waveNext gsuiIcon", "data-icon": "caret-right", title: "Следующий сигнал" } ),
		GSUI.createElement( "select", { class: "gsuiOscillator-waveSelect" },
			[ "sine", "triangle", "sawtooth", "square" ].map( w => (
				GSUI.createElement( "option", { class: "gsuiOscillator-waveOptNative", value: w }, w )
			) )
		),
		[
			[ "detune", "pitch", -24, 24, 1 ],
			[ "pan", "pan", -1, 1, .02 ],
			[ "gain", "gain", 0, 1, .01 ],
		].map( ( [ prop, title, min, max, step ] ) => (
			GSUI.createElement( "div", { class: `gsuiOscillator-prop gsuiOscillator-${ prop }`, title },
				GSUI.createElement( "div", { class: "gsuiOscillator-sliderWrap" },
					GSUI.createElement( "gsui-slider", { type: "circular", min, max, step, "mousemove-size": "800", "data-prop": prop } )
				),
				GSUI.createElement( "div", { class: "gsuiOscillator-sliderValue" } ),
			)
		) ),
		GSUI.createElement( "button", { class: "gsuiOscillator-remove gsuiIcon", "data-icon": "close", title: "Удалить осциллятор" } ),
	].flat( 1 );
} );
