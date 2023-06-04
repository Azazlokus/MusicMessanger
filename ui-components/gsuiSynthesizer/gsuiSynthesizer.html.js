"use strict";

GSUI.setTemplate( "gsui-synthesizer", () => {
	return [
		GSUI.createElement( "div", { class: "gsuiSynthesizer-env" }, GSUI.createElement( "gsui-envelope" ) ),
		GSUI.createElement( "div", { class: "gsuiSynthesizer-lfo" }, GSUI.createElement( "gsui-lfo" ) ),
		GSUI.createElement( "div", { class: "gsuiSynthesizer-head gsuiSynthesizer-headOscs" },
			GSUI.createElement( "span", { class: "gsuiSynthesizer-headTitle" }, "Осцилляторы" ),
			GSUI.createElement( "span", { class: "gsuiSynthesizer-label gsuiSynthesizer-labelPitch" }, "pitch" ),
			GSUI.createElement( "span", { class: "gsuiSynthesizer-label gsuiSynthesizer-labelPan" }, "pan" ),
			GSUI.createElement( "span", { class: "gsuiSynthesizer-label gsuiSynthesizer-labelGain" }, "gain" ),
		),
		GSUI.createElement( "div", { class: "gsuiSynthesizer-oscList" },
			GSUI.createElement( "button", { class: "gsuiSynthesizer-newOsc" },
				GSUI.createElement( "i", { class: "gsuiIcon", "data-icon": "plus" } ),
			),
		),
	];
} );
