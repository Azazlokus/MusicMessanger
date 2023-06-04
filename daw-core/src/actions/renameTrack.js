"use strict";

DAWCore.actions.renameTrack = ( id, newName, get ) => {
	const oldName = get.track( id ).name,
		name = DAWCore.utils.trim2( newName );

	if ( name !== oldName ) {
		return [
			{ tracks: { [ id ]: { name } } },
			[ "tracks", "renameTrack", oldName, name ],
		];
	}
};
