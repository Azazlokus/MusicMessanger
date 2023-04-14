"use strict";

(function() {

walContext.Buffer = function(wCtx, file, fn) {
	let
		that = this,
		reader = new FileReader()
	;

	this.wCtx = wCtx;
	this.isReady = false;

	function decode(fileBuffer) {
		that.wCtx.ctx.decodeAudioData(fileBuffer, function(buffer) {
			that.buffer = buffer;
			that.isReady = true;
			if (fn) {
				fn(that);
			}
		});
	}

	// Если файл ожидает чтения.
	if (file.name) {
		reader.addEventListener("loadend", function() {
			decode(reader.result);
		});
		reader.readAsArrayBuffer(file);

	// Если файл уже в буфере файлов.
	} else {
		decode(file);
	}
};

walContext.Buffer.prototype = {
	createSample: function() {
		let wSample = new walContext.Sample(this.wCtx, this);
		return wSample;
	},
	getPeaks: function(channelId, nbPeaks, timeA, timeB) {
		timeA = timeA || 0;
		timeB = timeB || this.buffer.duration;
		
		let
			a, b, max,
			x = 0,
			peaks = new Array(nbPeaks),
			buf = this.buffer.getChannelData(channelId),
			bufRangeSize = (timeB - timeA) * this.buffer.sampleRate,
			bufTimeA = timeA * this.buffer.sampleRate,
			sampleSize = bufRangeSize / nbPeaks,
			peaksIncr = sampleSize / 10
		;

		for ( ; x < nbPeaks; ++x) {
			a = bufTimeA + x * sampleSize;
			b = a + sampleSize;
			max = 0;
			for ( ; a < b; a += peaksIncr) {
				max = Math.max(max, Math.abs(buf[~~a]));
			}
			peaks[x] = max;
		}
		return peaks;
	}
};

})();