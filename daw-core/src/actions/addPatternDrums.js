"use strict";

DAWCore.actions.addPatternDrums = get => {
	const pats = get.patterns(),
		drumsId = DAWCore.actions.common.getNextIdOf( get.drums() ),
		patId = DAWCore.actions.common.getNextIdOf( pats ),
		patName = DAWCore.actions.common.createUniqueName( "patterns", "drums", get ),
		order = Object.values( pats ).reduce( ( max, pat ) => {
			return pat.type !== "drums"
				? max
				: Math.max( max, pat.order );
		}, -1 ) + 1,
		obj = {
			drums: { [ drumsId ]: {} },
			patterns: { [ patId ]: {
				order,
				type: "drums",
				name: patName,
				drums: drumsId,
				duration: get.beatsPerMeasure(),
			} },
			patternDrumsOpened: patId,
		};

	return [
		obj,
		[ "patterns", "addPattern", "drums", patName ],
	];
};
