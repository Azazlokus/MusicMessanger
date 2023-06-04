"use strict";

function UIwindowsInit() {
	UIwindowsAppendContent( UIwindows );
	UIwindows.onopen = win => UIdaw.toggleWindow( win.dataset.id, true );
	UIwindows.onclose = win => {
		UIdaw.toggleWindow( win.dataset.id, false );
		switch ( win.dataset.id ) {
			case "piano": DAW.callAction( "closePattern", "keys" ); break;
			case "drums": DAW.callAction( "closePattern", "drums" ); break;
			case "slicer": DAW.callAction( "closePattern", "slices" ); break;
		}
	};
	UIwindowsSetPos( "blocks",   20,  20, 180, 380, 320, 780, "folder-tree", "blocks" );
	UIwindowsSetPos( "mixer",   360,  20, 266, 200, 400, 300, "mixer",       "mixer" );
	UIwindowsSetPos( "main",    780,  20, 380, 180, 600, 360, "music",       "composition" );
	UIwindowsSetPos( "synth",   360, 340, 340, 220, 400, 460, "oscillator",  "synth" );
	UIwindowsSetPos( "piano",   780, 400, 380, 180, 600, 400, "keys",        "pianoroll" );
	UIwindowsSetPos( "drums",   410, 450, 380, 180, 900, 400, "drums",       "drums" );
	UIwindowsSetPos( "slicer",  500, 140, 306, 250, 420, 360, "slices",      "slicer" );
	UIwindowsSetPos( "effects", 480, 120, 230, 180, 420, 360, "effects",     "effects" );
}

function UIwindowsSetPos( winId, x, y, wmin, hmin, w, h, icon, title ) {
	const win = UIwindows.window( winId );

	win.setSize( w, h );
	win.setMinSize( wmin, hmin );
	win.setTitle( title );
	win.setPosition( x, y );
	win.setTitleIcon( icon );
}

function UIwindowsAppendContent( UIwindows ) {
	document.querySelectorAll( "div[data-window]" ).forEach( winCnt => {
		const win = UIwindows.createWindow( winCnt.dataset.window ),
			elWinCnt = win.querySelector( ".gsuiWindow-content" ),
			children = Array.from( winCnt.children );

		winCnt.remove();
		winCnt.classList.forEach( c => elWinCnt.classList.add( c ) );
		if ( children.length ) {
			const child0 = children[ 0 ];

			if ( child0.classList.contains( "windowMenu" ) ) {
				children.shift();
				win.headAppend( ...child0.children );
			}
			win.contentAppend( ...children );
		}
	} );
}
