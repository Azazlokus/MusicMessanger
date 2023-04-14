"use strict";

(function() {

let
	animId,
	emptyArr = [],
	canvas = ui.jqVisualCanvas[0],
	ctxCanvas = canvas.getContext("2d")
;

function frame() {
	let data = emptyArr;
	if (wa.wctx.nbPlaying) {
		data = wa.analyserArray;
		wa.analyser.getByteTimeDomainData(data);
	}
	wa.oscilloscope(canvas, ctxCanvas, data);
	animId = requestAnimationFrame(frame);
}

ui.analyserEnabled = false;
ui.analyserToggle = function(b) {
	if (typeof b !== "boolean") {
		b = !ui.analyserEnabled;
	}
	ui.analyserEnabled = b;
	if (b) {
		animId = requestAnimationFrame(frame);
	} else {
		ctxCanvas.clearRect(0, 0, canvas.width, canvas.height);
		cancelAnimationFrame(animId);
	}
};

})();
