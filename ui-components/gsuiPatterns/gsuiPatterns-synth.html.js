"use strict";

GSUI.setTemplate( "gsui-patterns-synth", () => (
	GSUI.createElement( "div", { class: "gsuiPatterns-synth" },
		GSUI.createElement( "div", { class: "gsuiPatterns-synth-head" },
			GSUI.createElement( "button", { class: "gsuiPatterns-synth-btn gsuiPatterns-synth-expand gsuiIcon", "data-action": "expand", "data-icon": "caret-right" } ),
			GSUI.createElement( "div", { class: "gsuiPatterns-synth-info" },
				GSUI.createElement( "div", { class: "gsuiPatterns-synth-name" } ),
				GSUI.createElement( "i", { class: "gsuiPatterns-destArrow gsuiIcon", "data-icon": "arrow-right" } ),
				GSUI.createElement( "button", { class: "gsuiPatterns-btnSolid gsuiPatterns-synth-dest", "data-action": "redirect", title: "Переместить синтезатор" },
					GSUI.createElement( "i", { class: "gsuiPatterns-btnIcon gsuiIcon", "data-icon": "mixer" } ),
					GSUI.createElement( "span", { class: "gsuiPatterns-btnText" } ),
				),
			),
			GSUI.createElement( "button", { class: "gsuiPatterns-synth-btn gsuiIcon", "data-action": "newPattern", "data-icon": "plus", title: "Создать новый паттерн" } ),
			GSUI.createElement( "button", { class: "gsuiPatterns-synth-btn gsuiIcon", "data-action": "delete", "data-icon": "close", title: "Удалить синтезатор и его паттерны" } ),
		),
		GSUI.createElement( "div", { class: "gsuiPatterns-placeholderToCheck gsuiPatterns-synth-patterns" },
			GSUI.createElement( "div", { class: "gsuiPatterns-placeholder" },
				GSUI.createElement( "span", null, "this synthesizer has no related pattern" ),
			),
		),
	)
) );
