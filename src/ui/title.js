"use strict";

function UItitle( cmpName ) {
	const name = cmpName || "KITTY";

	document.title = DAW.compositionNeedSave() ? `*${ name }` : name;
}
