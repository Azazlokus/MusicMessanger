"use strict";

DAWCore.Composition.epure = function( cmp ) {
	delete cmp.options;
	if ( cmp.loopA == null || cmp.loopB == null ) {
		delete cmp.loopA;
		delete cmp.loopB;
	}
	Object.values( cmp.drumrows ).forEach( row => {
		if ( row.toggle ) { delete row.toggle; }
	} );
	Object.values( cmp.tracks ).forEach( tr => {
		if ( !tr.name ) { delete tr.name; }
		if ( tr.toggle ) { delete tr.toggle; }
	} );
	Object.values( cmp.blocks ).forEach( blc => {
		if ( !blc.offset ) { delete blc.offset; }
		if ( !blc.selected ) { delete blc.selected; }
		if ( !blc.durationEdited ) { delete blc.durationEdited; }
	} );
	Object.values( cmp.keys ).forEach( keys => {
		Object.values( keys ).forEach( key => {
			if ( !key.offset ) { delete key.offset; }
			if ( !key.selected ) { delete key.selected; }
			if ( key.prev == null ) { delete key.prev; }
			if ( key.next == null ) { delete key.next; }
		} );
	} );
	return cmp;
};
