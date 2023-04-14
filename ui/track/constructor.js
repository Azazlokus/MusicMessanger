"use strict";

ui.Track = function(grid, obj) {
	obj = obj || {}

	this.grid = grid;
	this.id = ui.tracks.length;
	this.jqColNamesTrack = $("<div class='track'>").appendTo(ui.jqTrackNames);
	this.jqColLinesTrack = $("<div class='track'>").appendTo(ui.jqTrackLines);

	this
		.initToggle()
		.initEditName()
		.toggle(obj.toggle !== false)
		.editName(obj.name || "")
	;
};
