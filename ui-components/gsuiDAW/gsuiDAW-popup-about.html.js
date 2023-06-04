"use strict";

GSUI.setTemplate( "gsui-daw-popup-about", () => (
	GSUI.createElement( "div", { class: "gsuiDAW-popup-about" },
		GSUI.createElement( "div", { class: "gsuiDAW-popup-about-head" },
			GSUI.createElement( "span", { class: "gsuiDAW-popup-about-versionNum" } ),
			GSUI.createElement( "i", { class: "gsuiIcon" } ),
			GSUI.createElement( "button", { class: "gsuiDAW-popup-about-versionCheck", type: "button" }, "check the version" ),
		),
		GSUI.createElement( "div", null,
			"GridSound is a ",
			GSUI.createElement( "b", null, "work-in-progress" ),
			" free browser-based digital audio workstation following the ",
			GSUI.createElement( "a", { target: "_blank", rel: "noopener", href: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API" }, "Web Audio API" ),
			".",
		),
	)
) );
