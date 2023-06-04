"use strict";

GSUI.setTemplate( "gsui-daw-popup-open", () => (
	GSUI.createElement( "div", { class: "gsuiDAW-popup-open" },
		GSUI.createElement( "fieldset", null,
			GSUI.createElement( "legend", null, "Открыть существующую композицию" ),
			GSUI.createElement( "div", { class: "gsuiPopup-row" },
				GSUI.createElement( "div", { class: "gsuiPopup-row-title" }, "С помощью URL" ),
				GSUI.createElement( "div", { class: "gsuiPopup-row-values" },
					GSUI.createElement( "input", { class: "gsuiPopup-inputText", name: "url", type: "url", placeholder: "https://" } ),
				),
			),
			GSUI.createElement( "div", { class: "gsuiPopup-row" },
				GSUI.createElement( "div", { class: "gsuiPopup-row-title" },
					"С устройства",
				),
				GSUI.createElement( "div", { class: "gsuiPopup-row-values" },
					GSUI.createElement( "input", { name: "file", type: "file" } ),
				),
			),
		),
	)
) );
