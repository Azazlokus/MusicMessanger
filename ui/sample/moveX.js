"use strict";

ui.Sample.prototype.moveX = function(xem) {
	let xemMagnetPrev = this.xemMagnet;

	let prec = 1 / 4;
	let rest = xem % prec;
	this.xemMagnet = xem - rest;
	if (rest > prec / 2) {
		this.xemMagnet += prec;
	}

	this.xem = xem;
	this.jqSample.css("left", this.xemMagnet + "em");
	this.wsample.when = this.xemMagnet;
	return this;
};
