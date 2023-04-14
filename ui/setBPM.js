"use strict";

ui.setBPM = function(bpm) {
	ui.BPM = bpm = Math.max(20, Math.min(bpm, 999));
	ui.BPMem = ui.BPM / 60;
	let
		bInt = ~~bpm,
		bCent = Math.min(Math.round((bpm - bInt) * 100), 99)
	;
	ui.jqBpmInt.text(bInt < 100 ? "0" + bInt : bInt);
	ui.jqBpmDec.text(bCent < 10 ? "0" + bCent : bCent);
	$.each(ui.samples, function() {
		this.updateWidth();
	});
};
