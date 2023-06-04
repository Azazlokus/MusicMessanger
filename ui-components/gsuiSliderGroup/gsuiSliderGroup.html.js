"use strict";

GSUI.setTemplate( "gsui-slidergroup", () => {
	return (
		GSUI.createElement( "div", { class: "gsuiSliderGroup-slidersWrap" },
			GSUI.createElement( "div", { class: "gsuiSliderGroup-sliders" },
				GSUI.createElement( "gsui-beatlines", { coloredbeats: "" } ),
				GSUI.createElement( "div", { class: "gsuiSliderGroup-currentTime" } ),
				GSUI.createElement( "div", { class: "gsuiSliderGroup-defaultValue" } ),
				GSUI.createElement( "div", { class: "gsuiSliderGroup-loop gsuiSliderGroup-loopA" } ),
				GSUI.createElement( "div", { class: "gsuiSliderGroup-loop gsuiSliderGroup-loopB" } ),
			),
		)
	);
} );

GSUI.setTemplate( "gsui-slidergroup-slider", () => {
	return (
		GSUI.createElement( "div", { class: "gsuiSliderGroup-slider" },
			GSUI.createElement( "div", { class: "gsuiSliderGroup-sliderInner" } ),
		)
	);
} );
