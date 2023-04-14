"use strict";

ui.File = function(file) {
	let that = this;

	this.file = file;
	this.fullname = file.name;
	this.name = file.name.replace(/\.[^.]+$/, "");
	this.isLoaded =
	this.isLoading = false;
	this.jqFile = $("<a class='sample to-load' draggable='true'>");
	this.jqName = $("<span class='text-overflow'>")
		.appendTo(this.jqFile)
		.text(this.name);
	this.jqToLoad = $( "<i class='to-load fa fa-fw fa-download'>" ).prependTo(this.jqName);
	this.jqFile.on( {
		contextmenu: false,
		dragstart: this.dragstart.bind(this),
		mousedown: function(e) {
			if (e.button !== 0) {
				ui.stopFile();
			}
		},
		click: function() {
			if (that.isLoaded) {
				ui.playFile(that);
			} else if (!that.isLoading) {
				that.loaded();
			}
		}
	});
};
