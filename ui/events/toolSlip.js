"use strict";

(function() {

let sampleSave;

ui.tool.slip = {
	mousedown: function(e, sample) {
		sampleSave = sample;
	},
	mouseup: function() {
		sampleSave = null;
	},
	mousemove: function(e, sample, mx) {
		if (sampleSave) {
			ui.samplesSlip(sampleSave, mx / ui.gridEm);
		}
	}
};

})();
