"use strict";

function UIloading() {
	return new Promise( resolve => {
		const el = document.querySelector( "#loading" );
		el.classList.add( "loaded" );
			setTimeout( resolve, 100 );
	} );
}

function UIloaded() {
	const el = document.querySelector( "#loading" );

	el.classList.add( "started" );
	setTimeout( () => el.remove(), 800 );
}
