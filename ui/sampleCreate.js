"use strict";

ui.sampleCreate = function(uifile, trackId, xem) {
	let sample = new ui.Sample(uifile)
		.inTrack(trackId)
		.moveX(xem)
		.updateWidth();
	sample.xem = sample.xemMagnet;
	ui.samples.push(sample);
	return sample;
};
