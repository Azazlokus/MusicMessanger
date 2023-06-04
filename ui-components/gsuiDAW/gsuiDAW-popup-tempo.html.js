"use strict";

GSUI.setTemplate( "gsui-daw-popup-tempo", () => (
	GSUI.createElement( "div", { class: "gsuiDAW-popup-tempo" },
		GSUI.createElement( "fieldset", null,
			GSUI.createElement( "legend", null, "Временное разделение / BPM" ),
			GSUI.createElement( "div", { class: "gsuiPopup-row" },
				GSUI.createElement( "div", { class: "gsuiPopup-row-title" }, "Удары за меру" ),
				GSUI.createElement( "div", { class: "gsuiPopup-row-values" },
					GSUI.createElement( "input", { class: "gsuiPopup-inputText", name: "beatsPerMeasure", type: "number", min: 1, max: 16, } ),
				),
			),
			GSUI.createElement( "div", { class: "gsuiPopup-row" },
				GSUI.createElement( "div", { class: "gsuiPopup-row-title" }, "Шагов за удар" ),
				GSUI.createElement( "div", { class: "gsuiPopup-row-values" },
					GSUI.createElement( "input", { class: "gsuiPopup-inputText", name: "stepsPerBeat", type: "number", min: 1, max: 16, } ),
				),
			),
			GSUI.createElement( "div", { class: "gsuiPopup-row" },
				GSUI.createElement( "div", { class: "gsuiPopup-row-title" }, "BPM (удары в минуту)" ),
				GSUI.createElement( "div", { class: "gsuiPopup-row-values" },
					GSUI.createElement( "input", { class: "gsuiPopup-inputText", name: "bpm", type: "number", min: 1, max: 999.99, step: .01 } ),
					GSUI.createElement( "a", { class: "gsuiDAW-bpmTap gsuiIcon", "data-icon": "tint" } ),
				),
			),
		),
	)
) );
