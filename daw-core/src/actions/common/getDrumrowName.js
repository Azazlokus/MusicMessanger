"use strict";

DAWCore.actions.common.getDrumrowName = ( rowId, get ) => {
	return get.pattern( get.drumrow( rowId ).pattern ).name;
};
