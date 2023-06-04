"use strict";

function UIslicerInit() {
	const win = UIwindows.window( "slicer" );

	UIslicer.setDAWCore( DAW );
	UIslicer.rootElement.onfocus = () => DAW.focusOn( "slices" );
	DOM.slicesName.onclick = UIslicesNameClick;
	win.onfocusin = UIslicerWindowFocusin;
	win.contentAppend( UIslicer.rootElement );
}

function UIslicerWindowFocusin( e ) {
	if ( !UIslicer.rootElement.contains( e.target ) ) {
		UIslicer.rootElement.focus();
	}
}

function UIslicesNameClick() {
	const id = DAW.get.opened( "slices" ),
		name = DOM.slicesName.textContent;

	if ( id ) {
		GSUI.popup.prompt( "Изменить название паттерна", "", name, "Изменить" )
			.then( name => DAW.callAction( "renamePattern", id, name ) );
	}
}
