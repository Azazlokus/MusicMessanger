"use strict";

DAWCore.prototype.dropAudioFiles = function( files ) {
	const order = this.buffers.getSize();

	this.buffers.loadFiles( files ).then( ( { newBuffers, knownBuffers, failedBuffers } ) => {
		if ( newBuffers.length || knownBuffers.length ) {
			const cmpBuffers = this.get.buffers(),
				bufNextId = +DAWCore.actions.common.getNextIdOf( cmpBuffers ),
				patNextId = +DAWCore.actions.common.getNextIdOf( this.get.patterns() ),
				buffersLoaded = {};

			if ( newBuffers.length ) {
				const obj = {};

				obj.buffers = {};
				obj.patterns = {};
				newBuffers.forEach( ( buf, i ) => {
					const dotind = buf.name.lastIndexOf( "." ),
						patname = dotind > -1 ? buf.name.substr( 0, dotind ) : buf.name,
						bufId = bufNextId + i;

					obj.buffers[ bufId ] = {
						MIME: buf.MIME,
						duration: buf.duration,
						hash: buf.hash,
					};
					obj.patterns[ patNextId + i ] = {
						type: "buffer",
						dest: "main",
						buffer: `${ bufId }`,
						duration: Math.ceil( buf.duration * this.get.bps() ),
						name: patname,
						order: order + i,
					};
					buffersLoaded[ bufId ] = this.buffers.getBuffer( buf );
				} );
				this.callAction( "dropBuffers", obj );
			}
			if ( knownBuffers.length ) {
				const bufmap = Object.entries( cmpBuffers )
						.reduce( ( map, [ idBuf, buf ] ) => {
							map.set( buf.hash, idBuf );
							return map;
						}, new Map() );

				knownBuffers.forEach( buf => {
					const idBuf = bufmap.get( buf.hash );

					buffersLoaded[ idBuf ] = this.buffers.getBuffer( buf );
				} );
				this.buffersSlices.buffersLoaded( buffersLoaded );
			}
			this._call( "buffersLoaded", buffersLoaded );
		}
		if ( failedBuffers.length > 0 ) {
			console.log( "failedBuffers", failedBuffers );
			// show a popup
		}
	} );
};
