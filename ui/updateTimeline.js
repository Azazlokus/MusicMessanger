"use strict";

(function() {

let
	jqFirstNum,
	nbNums = 0
;

function createNb(nb) {
	if (nb > nbNums) {
		let
			html = "",
			i = nbNums
		;
		nbNums = nb;
		while (i++ < nb) {
			html += "<div><span></span></div>";
		}
		ui.jqTimeline.append(html);
		jqFirstNum = jqFirstNum || ui.jqTimeline.children().eq(0);
	}
}

ui.updateTimeline = function() {
	let
		leftEm = ui.trackLinesLeft / ui.gridEm,
		widthEm = ui.trackLinesWidth / ui.gridEm
	;
	createNb(Math.ceil(-leftEm + widthEm));
	if (jqFirstNum) {
		jqFirstNum.css("marginLeft", leftEm + "em");
	}
};

})();
