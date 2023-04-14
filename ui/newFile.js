"use strict";

ui.newFile = function(obj) {
	let uifile = new ui.File(obj);
	ui.files.push(uifile);
	ui.jqFilelist.append(uifile.jqFile);
};
