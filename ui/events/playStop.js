"use strict";

ui.jqStop.click(function() {
	ui.stopFile();
	ui.stopComposition();
});

ui.jqPlay.click(function( b ) {
	ui.playComposition(wa.pausedOffset);
});
