"use strict";

ui.toggleTracks = function(track) {
	let
		tr, i = 0,
		b = track.isOn && ui.nbTracksOn === 1
	;
	while (tr = ui.tracks[i++]) {
		tr.toggle(b);
	}
	track.toggle(true);
};
