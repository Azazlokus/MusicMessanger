"use strict";

GSUI.setTemplate( "gsui-track", () => [
	GSUI.createElement( "button", { class: "gsuiTrack-toggle gsuiIcon", "data-action": "toggle", "data-icon": "toggle", title: "Переключить on/off track" } ),
	GSUI.createElement( "div", { class: "gsuiTrack-nameWrap" },
		GSUI.createElement( "input", { class: "gsuiTrack-name", "data-action": "rename", type: "text", disabled: "", spellcheck: "false" } ),
	),
] );

GSUI.setTemplate( "gsui-track-row", () => (
	GSUI.createElement( "div", { class: "gsuiTrack-row gsui-row gsui-mute" },
		GSUI.createElement( "div" ),
	)
) );
