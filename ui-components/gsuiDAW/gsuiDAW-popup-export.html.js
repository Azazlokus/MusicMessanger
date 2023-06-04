"use strict";

GSUI.setTemplate( "gsui-daw-popup-export", () => (
	GSUI.createElement( "div", { class: "gsuiDAW-popup-export" },
		GSUI.createElement( "fieldset", null,
			GSUI.createElement( "legend", null, "Экспорт композиции" ),
			GSUI.createElement( "div", { class: "gsuiDAW-popup-export-wrap" },
				GSUI.createElement( "a", { href: true, class: "gsuiDAW-popup-export-btn", "data-status": 0 },
					GSUI.createElement( "span", { class: "gsuiDAW-popup-export-btn0" },
						GSUI.createElement( "span", null, "Экспорт" ),
						GSUI.createElement( "i", { class: "gsuiIcon", "data-icon": "render" } ),
					),
					GSUI.createElement( "span", { class: "gsuiDAW-popup-export-btn1" },
						GSUI.createElement( "span", null, "Экспорт..." ),
						GSUI.createElement( "i", { class: "gsuiIcon", "data-spin": "on" } ),
					),
					GSUI.createElement( "span", { class: "gsuiDAW-popup-export-btn2" },
						GSUI.createElement( "span", null, "Загрузить WAV файл" ),
						GSUI.createElement( "i", { class: "gsuiIcon", "data-icon": "export" } ),
					),
				),
				GSUI.createElement( "progress", { class: "gsuiDAW-popup-export-progress", value: "", max: 1 } ),
			),
		),
	)
) );
