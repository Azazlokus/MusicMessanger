"use strict";

(function() {

let
	mousemoving = false,
	fn,
	fns = {
		files: function(e) {
			let w = e.pageX;
			ui.setFilesWidth(w < 35 ? 0 : w);
		},
		trackNames: function(e) {
			let w = e.pageX - ui.jqGrid.offset().left;
			ui.setTrackNamesWidth(w < 35 ? 0 : w);
		}
	}
;

$(".extend").mousedown(function(e) {
	if (e.button === 0) {
		mousemoving = true;
		ui.jqBody.addClass("cursor-ewResize");
		fn = fns[this.dataset.mousemoveFn];
	}
});

ui.jqBody
	.mouseup(function(e) {
		if (e.button === 0 && mousemoving) {
			mousemoving = false;
			ui.jqBody.removeClass("cursor-ewResize");
		}
	})
	.mousemove(function(e) {
		if (mousemoving) {
			fn(e);
		}
	})
;

})();
