"use strict";

GSUI.setTemplate( "gsui-patterns", () => (
	GSUI.createElement( "gsui-panels", { class: "gsuiPanels-y" },
		GSUI.getTemplate( "gsui-patterns-panel", {
			class: "Buffers",
			title: "Буферы",
			icon: "waveform",
			placeholder: "Перенесите файлы сюда (mp3, ogg, wav)",
		} ),
		GSUI.getTemplate( "gsui-patterns-panel", {
			class: "Slices",
			title: "Слайсы",
			icon: "slices",
			placeholder: "Нет слайсов",
			button: { action: "newSlices", title: "Создать новый паттерн-слайс", txt: "Создать" },
		} ),
		GSUI.getTemplate( "gsui-patterns-panel", {
			class: "Drums",
			title: "Ударные",
			icon: "drums",
			placeholder: "Нет ударных",
			button: { action: "newDrums", title: "Создать новый паттерн ударных", txt: "Создать" },
		} ),
		GSUI.getTemplate( "gsui-patterns-panel", {
			class: "Keys",
			title: "Клавишные",
			icon: "oscillator",
			placeholder: "Нет клавишных",
			button: { action: "newSynth", title: "Создать новый синтезатор", txt: "Создать" },
		} ),
	)
) );

GSUI.setTemplate( "gsui-patterns-panel", obj => (
	GSUI.createElement( "div", { class: `gsuiPatterns-panel gsuiPatterns-panel${ obj.class }` },
		GSUI.createElement( "div", { class: "gsuiPatterns-panel-menu" },
			GSUI.createElement( "i", { class: "gsuiPatterns-panel-icon gsuiIcon", "data-icon": obj.icon } ),
			GSUI.createElement( "span", { class: "gsuiPatterns-panel-title" }, obj.title ),
			obj.button && (
				GSUI.createElement( "button", { class: "gsuiPatterns-btnSolid", "data-action": obj.button.action, title: obj.button.title },
					GSUI.createElement( "i", { class: "gsuiPatterns-btnIcon gsuiIcon", "data-icon": "plus" } ),
					GSUI.createElement( "span", { class: "gsuiPatterns-btnText" }, obj.button.txt ),
				)
			),
		),
		GSUI.createElement( "div", { class: "gsuiPatterns-placeholderToCheck gsuiPatterns-panel-list" } ),
		GSUI.createElement( "div", { class: "gsuiPatterns-placeholder" },
			GSUI.createElement( "span", null, obj.placeholder ),
		),
	)
) );
