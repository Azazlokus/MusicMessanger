"use strict";

ui.Track.prototype.initEditName = function() {
	let that = this;

	this.jqName =
	$("<span class='name text-overflow'>")
		.appendTo(this.jqColNamesTrack)
		.dblclick(this.editName.bind(this, true))
	;

	this.jqNameInput =
	$("<input type='text'/>")
		.appendTo(this.jqColNamesTrack)
		.blur(function() {
			that.editName(this.value)
				.editName(false);
		})
		.keydown(function(e) {
			if (e.keyCode === 13 || e.keyCode === 27) {
				that.editName(e.keyCode === 13 ? this.value : that.name)
					.editName(false);
			}
			e.stopPropagation();
		})
	;
	return this;
};

ui.Track.prototype.editName = function(name) {
	let
		input = this.jqNameInput[0],
		trackId = "Track " + (this.id + 1)
	;

	if (typeof name === "string") {
		name = name
			.replace(/^\s+|\s+$/, "")
			.replace(/\s+/g, " ")
		;
		name = name === trackId ? "" : name;
		this.jqName
			.toggleClass("empty", name === "")
			.text(name || trackId)
		;
		this.name = name;

	} else if (name) {
		this.jqColNamesTrack.addClass("editing");
		input.value = this.name || trackId;
		input.focus();
		input.select();
	} else {
		input.blur();
		this.jqColNamesTrack.removeClass("editing");
	}
	return this;
};
