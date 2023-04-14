"use strict";

(function() {

function rmChild(el) {
	let save, n = el.firstChild;
	while (n !== null) {
		rmChild(save = n);
		n = n.nextSibling;
		if (save.nodeType !== 1 && /^\s*$/.test(save.textContent)) {
			el.removeChild(save);
		}
	}
}

rmChild(document.body);

})();
