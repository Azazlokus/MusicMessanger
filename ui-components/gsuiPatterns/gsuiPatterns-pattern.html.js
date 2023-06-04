"use strict";

GSUI.setTemplate( "gsui-patterns-pattern", () => (
	GSUI.createElement( "div", { class: "gsuiPatterns-pattern", draggable: "true" },
		GSUI.createElement( "div", { class: "gsuiPatterns-pattern-grip gsuiIcon", "data-icon": "grip-v" } ),
		GSUI.createElement( "div", { class: "gsuiPatterns-pattern-head" },
			GSUI.createElement( "div", { class: "gsuiPatterns-pattern-info" },
				GSUI.createElement( "button", { class: "gsuiPatterns-pattern-btn gsuiPatterns-pattern-btnInfo gsuiIcon", "data-action": "editInfo", "data-icon": "buf-undefined", title: "Редактировать информацию" } ),
				GSUI.createElement( "div", { class: "gsuiPatterns-pattern-name" } ),
				GSUI.createElement( "i", { class: "gsuiPatterns-destArrow gsuiIcon", "data-icon": "arrow-right" } ),
				GSUI.createElement( "button", { class: "gsuiPatterns-btnSolid gsuiPatterns-pattern-dest", "data-action": "redirect", title: "Переместить паттерн" },
					GSUI.createElement( "i", { class: "gsuiPatterns-btnIcon gsuiIcon", "data-icon": "mixer" } ),
					GSUI.createElement( "span", { class: "gsuiPatterns-btnText" } ),
				),
			),
			GSUI.createElement( "button", { class: "gsuiPatterns-pattern-btn gsuiIcon", "data-action": "clone", "data-icon": "clone", title: "Копировать паттерн" } ),
			GSUI.createElement( "button", { class: "gsuiPatterns-pattern-btn gsuiIcon", "data-action": "remove", "data-icon": "close", title: "Удалить паттерн" } ),
		),
		GSUI.createElement( "div", { class: "gsuiPatterns-pattern-content" } ),
		GSUI.createElement( "div", { class: "gsuiPatterns-pattern-placeholder" },
			GSUI.createElement( "i", { class: "gsuiPatterns-pattern-placeholderIcon gsuiIcon", "data-icon": "file-corrupt" } ),
			GSUI.createElement( "span", { class: "gsuiPatterns-pattern-placeholderText" }, "missing data" ),
		),
	)
) );
