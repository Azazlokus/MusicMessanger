"use strict";

ui.gridZoom = 1;

ui.setGridZoom = function(zm, xpx, ypx) {
	zm = Math.min(Math.max(1, zm), 8);
	let zmMul = zm / ui.gridZoom;
	ui.gridZoom = zm;
	ui.gridEm *= zmMul;
	ui.jqGridEm.css("fontSize", zm + "em");
	ui.jqGrid.attr("data-sample-size",
		ui.gridEm < 40 ? "small" :
		ui.gridEm < 80 ? "medium" : "big");
	ui.setGridTop(ypx - (-ui.gridTop + ypx) * zmMul);
	ui.setTrackLinesLeft(xpx - (-ui.trackLinesLeft + xpx) * zmMul);
	ui.updateTimeline();
	ui.updateTrackLinesBg();
};
