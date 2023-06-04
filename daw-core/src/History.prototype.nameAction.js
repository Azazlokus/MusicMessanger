"use strict";

DAWCore.History.prototype.nameAction = function( act, msg ) {
	const [ part, actionName, ...args ] = msg || [],
		fn = DAWCore.History.actionsToText[ part ]?.[ actionName ],
		[ i, t ] = fn ? fn( ...args ) : [ "close", "undefined" ];

	if ( !fn ) {
		console.error( `DAWCore: description 404 for "${ part }.${ actionName }"` );
	}
	return { i, t };
};

DAWCore.History.actionsToText = {
	cmp: {
		renameComposition: ( old, neww ) => [ "pen", `Изменить название композиции с "${ old || "untitled" }" на "${ neww }"` ],
		changeTempo: ( bpm, bPM, sPB ) => [ "clock", `Новый темп ${ bpm } (${ bPM }/${ sPB })` ],
		changeLoop: ( a, b ) => [ "loop", `Изменить loop ${ a } -> ${ b }` ],
		removeLoop: () => [ "loop", "Удалить loop" ],
	},
	tracks: {
		renameTrack: ( old, neww ) => [ "pen", `Изменено название "${ old }" -> "${ neww }"` ],
		toggleTrack: ( tr, b ) => [ b ? "unmute" : "mute", `${ b ? "unmute" : "mute" } track "${ tr }"` ],
		toggleSoloTrack: ( tr, b ) => [ b ? "unmute" : "mute", `${ b ? "unmute all tracks" : `mute all tracks except "${ tr }"` }` ],
	},
	blocks: {
		addBlock: pat => [ "plus", `добавлен новый ${ pat } block` ],
		moveBlocks: len => [ "arrows", `move ${ DAWCore.utils.plural( len, "block" ) }` ],
		selectBlocks: len => [ "mouse", `выбран ${ DAWCore.utils.plural( len, "block" ) }` ],
		removeBlocks: len => [ "erase", `удален ${ DAWCore.utils.plural( len, "block" ) }` ],
		cropEndBlocks: len => [ "crop", `crop-end ${ DAWCore.utils.plural( len, "block" ) }` ],
		cropStartBlocks: len => [ "crop", `crop-start ${ DAWCore.utils.plural( len, "block" ) }` ],
		unselectBlock: () => [ "mouse", `unselect ${ DAWCore.utils.plural( 1, "block" ) }` ],
		unselectAllBlocks: len => [ "mouse", `unselect ${ DAWCore.utils.plural( len, "block" ) }` ],
		duplicateSelectedBlocks: len => [ "plus", `копирован ${ DAWCore.utils.plural( len, "block" ) }` ],
	},
	synth: {
		addOscillator: syn => [ "осциллятор", `${ syn }: добавлен osc` ],
		removeOscillator: syn => [ "осциллятор", `${ syn }: удален osc` ],
		reorderOscillator: syn => [ "сортировка", `${ syn }: изменен порядок oscs` ],
		changeOscillator: ( syn, prop, val ) => [ "осциллятор", `${ syn }: изменен osc ${ prop } -> ${ val }` ],
		toggleEnv: ( syn, b ) => [ "osc-sine", `${ syn }: ${ b ? "enable" : "disable" } envelope` ],
		changeEnv: ( syn, prop, val ) => [ "osc-sine", `${ syn }: envelope ${ prop } = ${ val }` ],
		toggleLFO: ( syn, b ) => [ "osc-sine", `${ syn }: ${ b ? "enable" : "disable" } LFO` ],
		changeLFO: ( syn, prop, val ) => [ "osc-sine", `${ syn }: LFO ${ prop } = ${ val }` ],
	},
	synths: {
		addSynth: syn => [ "осциллятор", `добавить новый synth "${ syn }"` ],
		renameSynth: ( old, neww ) => [ "pen", `изменен название synth "${ old }" -> "${ neww }"` ],
		removeSynth: syn => [ "minus", `удален synth "${ syn }"` ],
		redirectSynth: ( syn, chanDest ) => [ "redirect", `перенаправлен synth "${ syn }" в канал "${ chanDest }"` ],
	},
	channels: {
		addChannel: chan => [ "plus", `микшер: новый канал "${ chan }"`, ],
		removeChannel: chan => [ "minus", `микшер: удален "${ chan }"`, ],
		reorderChannel: chan => [ "sort", `микшер: изменен порядок "${ chan }"`, ],
		renameChannel: ( old, neww ) => [ "pen", `микшер: изменен название "${ old }" -> "${ neww }"` ],
		toggleChannel: ( chan, b ) => [ b ? "unmute" : "mute", `микшер: ${ b ? "unmute" : "mute" } "${ chan }"`, ],
		changeChannel: ( chan, prop, val ) => [ "mixer", `микшер: "${ chan }" ${ prop }: ${ val }`, ],
		redirectChannel: ( chan, chanDest ) => [ "redirect", `микшер: перенаправлен "${ chan }" в "${ chanDest }"`, ],
	},
	patterns: {
		dropBuffers: ( nb ) => [ "file-buffer", `drop ${ DAWCore.utils.plural( nb, "new buffer" ) }` ],
		changePatternBufferInfo: ( pat ) => [ "pen", `изменено описание "${ pat }"` ],
		addPattern: ( type, pat ) => [ "plus", `добавлен новый ${ type } "${ pat }"` ],
		addPatternKeys: ( pat, syn ) => [ "plus", `add new keys "${ pat }" of synth "${ syn }"` ],
		renamePattern: ( type, old, neww ) => [ "pen", `изменен название ${ type } "${ old }" -> "${ neww }"` ],
		removePattern: ( type, pat ) => [ "minus", `удален ${ type } "${ pat }"` ],
		reorderPattern: ( type, pat ) => [ "sort", `изменен порядок ${ type } "${ pat }"` ],
		clonePattern: ( type, pat, patSrc ) => [ "clone", `clone ${ type } "${ patSrc }" to "${ pat }"` ],
		redirectPatternBuffer: ( pat, chanDest ) => [ "redirect", `перенаправлен буфер "${ pat }" в канал "${ chanDest }"` ],
		redirectPatternKeys: ( pat, syn ) => [ "redirect", `перенаправлены клавишные "${ pat }" в synth "${ syn }"` ],
		redirectPatternSlices: ( pat, src ) => [ "redirect", `перенаправлены слайсы "${ pat }" в буфер "${ src }"` ],
	},
	effects: {
		addEffect: ( dest, type ) => [ "effects", `fx: новый ${ type } на ${ dest }`, ],
		toggleEffect: ( dest, type, b ) => [ b ? "unmute" : "mute", `fx: ${ b ? "unmute" : "mute" } ${ type } of ${ dest }`, ],
		removeEffect: ( dest, type ) => [ "minus", `fx: удален ${ type } of ${ dest }`, ],
		changeEffect: ( dest, type, prop ) => [ "effects", `fx: изменен ${ type }'s ${ prop } ${ dest }` ],
	},
	drumrows: {
		addDrumrow: row => [ "drums", `drumrows: новый "${ row }"` ],
		removeDrumrow: row => [ "drums", `drumrows: удален "${ row }"` ],
		reorderDrumrow: row => [ "drums", `drumrows: изменен порядок "${ row }"` ],
		changeDrumrow: ( row, prop, val ) => [ "drums", `drumrows: "${ row }" ${ prop }: ${ val }` ],
		changeDrumrowPattern: ( row, newPat ) => [ "drums", `drumrows: "${ row }" -> "${ newPat }"` ],
		toggleDrumrow: ( row, b ) => [ "drums", `drumrows: ${ b ? "unmute" : "mute" } "${ row }"` ],
		toggleSoloDrumrow: ( row, b ) => [ "drums", `drumrows: ${ b ? "unmute all" : `mute all except "${ row }"` }` ],
	},
	slices: {
		cropSlices: sli => [ "slices", `crop "${ sli }"` ],
		changeSlices: sli => [ "slices", `изменены слайсы "${ sli }"` ],
		changeSlicesDuration: ( sli, dur ) => [ "slices", `"${ sli }" длительность: ${ dur }beat` ],
	},
	drums: {
		addDrums: ( pat, row, nb ) => [ "drums", `drums: добавлен ${ nb } "${ row }" в "${ pat }"` ],
		removeDrums: ( pat, row, nb ) => [ "drums", `drums: удален ${ nb } "${ row }" из "${ pat }"` ],
		changeDrumsProps: ( pat, row, prop, nb ) => [ "drums", `drums: set ${ prop } в ${ nb } "${ row }" в "${ pat }"` ],
	},
	keys: {
		addKey: pat => [ "keys", `add a new key in "${ pat }"` ],
		moveKeys: ( pat, len ) => [ "arrows", `keys: move ${ DAWCore.utils.plural( len, "key" ) } in "${ pat }"` ],
		removeKeys: ( pat, len ) => [ "erase", `keys: удален ${ DAWCore.utils.plural( len, "key" ) } из "${ pat }"` ],
		selectKeys: ( pat, len ) => [ "mouse", `keys: выбран ${ DAWCore.utils.plural( len, "key" ) } в "${ pat }"` ],
		cropEndKeys: ( pat, len ) => [ "crop", `keys: crop ${ DAWCore.utils.plural( len, "key" ) } в "${ pat }"` ],
		redirectKey: ( pat, b ) => [ "glissando", `${ b ? "добавлен" : "удален" } glissando в "${ pat }"` ],
		unselectKey: pat => [ "mouse", `keys: unselect ${ DAWCore.utils.plural( 1, "key" ) } в "${ pat }"` ],
		unselectAllKeys: ( pat, len ) => [ "mouse", `unselect ${ DAWCore.utils.plural( len, "key" ) } в "${ pat }"` ],
		changeKeysProps: ( pat, prop, len ) => [ "keys", `keys: изменен ${ DAWCore.utils.plural( len, "key", "'s" ) } ${ prop } в "${ pat }"` ],
		cloneSelectedKeys: ( pat, len ) => [ "keys", `копия ${ DAWCore.utils.plural( len, "key" ) } в "${ pat }"` ],
	},
};
