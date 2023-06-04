#!/bin/bash

writeHeader() {
	echo '<!DOCTYPE html>'
	echo '<html lang="en">'
	echo '<head>'
	echo '<title>KITTY</title>'
}
writeBody() {
	echo '</head>'
	echo '<body>'
	echo '<noscript id="noscript">Нужен JavaScript для запуска</noscript>'
}
writeEnd() {
	echo '</body>'
	echo '</html>'
}
writeCSS() {
	printf '<link rel="stylesheet" href="%s"/>\n' "${CSSfiles[@]}"
}
writeJS() {
	printf '<script src="%s"></script>\n' "${JSfiles[@]}"
}
writeCSScompress() {
	echo -n '' > allCSS.css
	cat "${CSSfiles[@]}" >> allCSS.css
	echo '<style>'
	csso allCSS.css
	echo '</style>'
	rm allCSS.css
}
writeJScompress() {
	echo '"use strict";' > allJS.js
	cat "${JSfilesProd[@]}" >> allJS.js
	cat "${JSfiles[@]}" >> allJS.js
	echo '<script>'
	terser allJS.js --compress --mangle --toplevel
	echo '</script>'
	rm allJS.js
}

declare -a CSSfiles=(
	"ui-components/gsui.css"
	"ui-components/gsuiIcon/gsuiIcon.css"
	"ui-components/gsuiDAW/gsuiDAW.colors.default.css"
	"ui-components/gsuiDAW/gsuiDAW.css"
	"ui-components/gsuiDAW/gsuiDAW-btn.css"
	"ui-components/gsuiDAW/gsuiDAW-cmp.css"
	"ui-components/gsuiDAW/gsuiDAW-dropdown.css"
	"ui-components/gsuiDAW/gsuiDAW-area-user.css"
	"ui-components/gsuiDAW/gsuiDAW-area-save.css"
	"ui-components/gsuiDAW/gsuiDAW-area-ctrl.css"
	"ui-components/gsuiDAW/gsuiDAW-area-time.css"
	"ui-components/gsuiDAW/gsuiDAW-area-hist.css"
	"ui-components/gsuiDAW/gsuiDAW-area-wins.css"
	"ui-components/gsuiDAW/gsuiDAW-area-help.css"
	"ui-components/gsuiDAW/gsuiDAW-area-vers.css"
	#"ui-components/gsuiDAW/gsuiDAW-popup-auth.css"
	"ui-components/gsuiDAW/gsuiDAW-popup-open.css"
	"ui-components/gsuiDAW/gsuiDAW-popup-about.css"
	"ui-components/gsuiDAW/gsuiDAW-popup-tempo.css"
	"ui-components/gsuiDAW/gsuiDAW-popup-export.css"
	"ui-components/gsuiDAW/gsuiDAW-popup-cookies.css"
	"ui-components/gsuiDAW/gsuiDAW-popup-settings.css"
	"ui-components/gsuiDAW/gsuiDAW-popup-shortcuts.css"
	"ui-components/gsuiSpectrum/gsuiSpectrum.css"
	"ui-components/gsuiDragshield/gsuiDragshield.css"
	"ui-components/gsuiEnvelopeGraph/gsuiEnvelopeGraph.css"
	"ui-components/gsuiEnvelope/gsuiEnvelope.colors.default.css"
	"ui-components/gsuiEnvelope/gsuiEnvelope.css"
	"ui-components/gsuiLFO/gsuiLFO.colors.default.css"
	"ui-components/gsuiLFO/gsuiLFO.css"
	"ui-components/gsuiDrumrows/gsuiDrumrows.colors.default.css"
	"ui-components/gsuiDrumrows/gsuiDrumrows.css"
	"ui-components/gsuiDrums/gsuiDrums.colors.default.css"
	"ui-components/gsuiDrums/gsuiDrums.css"
	"ui-components/gsuiClock/gsuiClock.colors.default.css"
	"ui-components/gsuiClock/gsuiClock.css"
	"ui-components/gsuiChannel/gsuiChannel.colors.default.css"
	"ui-components/gsuiChannel/gsuiChannel.css"
	"ui-components/gsuiChannels/gsuiChannels.colors.default.css"
	"ui-components/gsuiChannels/gsuiChannels.css"
	"ui-components/gsuiCurves/gsuiCurves.css"
	"ui-components/gsuiEffects/gsuiEffects.css"
	"ui-components/gsuiFxFilter/gsuiFxFilter.colors.default.css"
	"ui-components/gsuiFxFilter/gsuiFxFilter.css"
	"ui-components/gsuiReorder/gsuiReorder.css"
	"ui-components/gsuiDragline/gsuiDragline.css"
	"ui-components/gsuiBeatlines/gsuiBeatlines.css"
	"ui-components/gsuiBlocksManager/gsuiBlocksManager.css"
	"ui-components/gsuiPatternroll/gsuiPatternroll.css"
	"ui-components/gsuiPianoroll/gsuiPianoroll.css"
	"ui-components/gsuiPianoroll/gsuiPianoroll-block.css"
	"ui-components/gsuiKeys/gsuiKeys.colors.default.css"
	"ui-components/gsuiKeys/gsuiKeys.css"
	"ui-components/gsuiOscillator/gsuiOscillator.colors.default.css"
	"ui-components/gsuiOscillator/gsuiOscillator.css"
	"ui-components/gsuiPeriodicWave/gsuiPeriodicWave.css"
	"ui-components/gsuiSynthesizer/gsuiSynthesizer.colors.default.css"
	"ui-components/gsuiSynthesizer/gsuiSynthesizer.css"
	"ui-components/gsuiDotline/gsuiDotline.css"
	"ui-components/gsuiPanels/gsuiPanels.colors.default.css"
	"ui-components/gsuiPanels/gsuiPanels.css"
	"ui-components/gsuiPopup/gsuiPopup.colors.default.css"
	"ui-components/gsuiPopup/gsuiPopup.css"
	"ui-components/gsuiSlicer/gsuiSlicer.colors.default.css"
	"ui-components/gsuiSlicer/gsuiSlicer.css"
	"ui-components/gsuiSlider/gsuiSlider.css"
	"ui-components/gsuiSliderGroup/gsuiSliderGroup.colors.default.css"
	"ui-components/gsuiSliderGroup/gsuiSliderGroup.css"
	"ui-components/gsuiTimeline/gsuiTimeline.colors.default.css"
	"ui-components/gsuiTimeline/gsuiTimeline.css"
	"ui-components/gsuiTimewindow/gsuiTimewindow.colors.default.css"
	"ui-components/gsuiTimewindow/gsuiTimewindow.css"
	"ui-components/gsuiPatterns/gsuiPatterns.colors.default.css"
	"ui-components/gsuiPatterns/gsuiPatterns.css"
	"ui-components/gsuiPatterns/gsuiPatterns-synth.css"
	"ui-components/gsuiPatterns/gsuiPatterns-pattern.css"
	"ui-components/gsuiTrack/gsuiTrack.colors.default.css"
	"ui-components/gsuiTrack/gsuiTrack.css"
	"ui-components/gsuiWindows/gsuiWindow.colors.default.css"
	"ui-components/gsuiWindows/gsuiWindows.css"
	"ui-components/gsuiWindows/gsuiWindow.css"

	"assets/fonts/fonts.css"

	"src/css/reset.css"
	"src/css/loading.css"
	"src/css/popup.css"
	"src/css/window.css"
	"src/css/windows.css"
)

declare -a JSfilesProd=(
	"src/initServiceWorker.js"
)

declare -a JSfiles=(
	"src/checkBrowser.js"

	"api-client/gsapiClient.js"

	"daw-core/src/DAWCore.js"
	"daw-core/src/Buffers.js"
	"daw-core/src/BuffersSlices.js"
	"daw-core/src/LocalStorage.js"
	"daw-core/src/Destination.js"
	"daw-core/src/History.js"
	"daw-core/src/History.prototype.nameAction.js"
	"daw-core/src/Keys.js"
	"daw-core/src/Drums.js"
	"daw-core/src/Slices.js"
	"daw-core/src/Composition.js"
	"daw-core/src/Composition.epure.js"
	"daw-core/src/Composition.format.js"
	"daw-core/src/Composition.prototype.change.js"

	"daw-core/src/utils/addIfNotEmpty.js"
	"daw-core/src/utils/castToNumber.js"
	"daw-core/src/utils/composeUndo.js"
	"daw-core/src/utils/createUpdateDelete.js"
	"daw-core/src/utils/deepAssign.js"
	"daw-core/src/utils/deepCopy.js"
	"daw-core/src/utils/deepFreeze.js"
	"daw-core/src/utils/diffAssign.js"
	"daw-core/src/utils/isEmpty.js"
	"daw-core/src/utils/isntEmpty.js"
	"daw-core/src/utils/isObject.js"
	"daw-core/src/utils/jsonCopy.js"
	"daw-core/src/utils/mapCallbacks.js"
	"daw-core/src/utils/noop.js"
	"daw-core/src/utils/panningMerge.js"
	"daw-core/src/utils/panningMergeLR.js"
	"daw-core/src/utils/panningSplitLR.js"
	"daw-core/src/utils/plural.js"
	"daw-core/src/utils/trim2.js"
	"daw-core/src/utils/uniqueName.js"
	"daw-core/src/utils/uuid.js"

	"daw-core/src/json/composition.js"
	"daw-core/src/json/block.js"
	"daw-core/src/json/channel.js"
	"daw-core/src/json/channelMain.js"
	"daw-core/src/json/channels.js"
	"daw-core/src/json/drum.js"
	"daw-core/src/json/drumcut.js"
	"daw-core/src/json/drumrow.js"
	"daw-core/src/json/effects.filter.js"
	"daw-core/src/json/env.js"
	"daw-core/src/json/key.js"
	"daw-core/src/json/lfo.js"
	"daw-core/src/json/oscillator.js"
	"daw-core/src/json/synth.js"
	"daw-core/src/json/track.js"

	"daw-core/src/controllers/blocks.js"
	"daw-core/src/controllers/drumrows.js"
	"daw-core/src/controllers/drums.js"
	"daw-core/src/controllers/effects.js"
	"daw-core/src/controllers/keys.js"
	"daw-core/src/controllers/mixer.js"
	"daw-core/src/controllers/synth.js"
	"daw-core/src/controllers/tracks.js"
	"daw-core/src/controllers/slicer.js"
	"daw-core/src/controllersFx/filter.js"

	"daw-core/src/actions/common/patternOpenedByType.js"
	"daw-core/src/actions/common/calcNewDuration.js"
	"daw-core/src/actions/common/calcNewKeysDuration.js"
	"daw-core/src/actions/common/createUniqueName.js"
	"daw-core/src/actions/common/getDrumrowName.js"
	"daw-core/src/actions/common/getNextIdOf.js"
	"daw-core/src/actions/common/getNextOrderOf.js"
	"daw-core/src/actions/common/toggleSolo.js"
	"daw-core/src/actions/common/updatePatternDuration.js"

	"daw-core/src/actions/addBlock.js"
	"daw-core/src/actions/addChannel.js"
	"daw-core/src/actions/addDrumcuts.js"
	"daw-core/src/actions/addDrumrow.js"
	"daw-core/src/actions/addDrums.js"
	"daw-core/src/actions/addEffect.js"
	"daw-core/src/actions/addKey.js"
	"daw-core/src/actions/addOscillator.js"
	"daw-core/src/actions/addPatternDrums.js"
	"daw-core/src/actions/addPatternKeys.js"
	"daw-core/src/actions/addPatternSlices.js"
	"daw-core/src/actions/addSynth.js"
	"daw-core/src/actions/changeChannel.js"
	"daw-core/src/actions/changeDrumrow.js"
	"daw-core/src/actions/changeDrumrowPattern.js"
	"daw-core/src/actions/changeDrumsProps.js"
	"daw-core/src/actions/changeEffect.js"
	"daw-core/src/actions/changeEnv.js"
	"daw-core/src/actions/changeKeysProps.js"
	"daw-core/src/actions/changeLFO.js"
	"daw-core/src/actions/changeLoop.js"
	"daw-core/src/actions/changeOscillator.js"
	"daw-core/src/actions/changePatternBufferInfo.js"
	"daw-core/src/actions/changePatternSlices.js"
	"daw-core/src/actions/changeTempo.js"
	"daw-core/src/actions/clonePattern.js"
	"daw-core/src/actions/cloneSelectedKeys.js"
	"daw-core/src/actions/closePattern.js"
	"daw-core/src/actions/cropEndBlocks.js"
	"daw-core/src/actions/cropEndKeys.js"
	"daw-core/src/actions/cropStartBlocks.js"
	"daw-core/src/actions/dropBuffers.js"
	"daw-core/src/actions/duplicateSelectedBlocks.js"
	"daw-core/src/actions/moveBlocks.js"
	"daw-core/src/actions/moveKeys.js"
	"daw-core/src/actions/openPattern.js"
	"daw-core/src/actions/openSynth.js"
	"daw-core/src/actions/redirectChannel.js"
	"daw-core/src/actions/redirectKey.js"
	"daw-core/src/actions/redirectPatternBuffer.js"
	"daw-core/src/actions/redirectPatternKeys.js"
	"daw-core/src/actions/redirectPatternSlices.js"
	"daw-core/src/actions/redirectSynth.js"
	"daw-core/src/actions/removeBlocks.js"
	"daw-core/src/actions/removeChannel.js"
	"daw-core/src/actions/removeDrumcuts.js"
	"daw-core/src/actions/removeDrumrow.js"
	"daw-core/src/actions/removeDrums.js"
	"daw-core/src/actions/removeEffect.js"
	"daw-core/src/actions/removeKeys.js"
	"daw-core/src/actions/removeOscillator.js"
	"daw-core/src/actions/removePattern.js"
	"daw-core/src/actions/removeSynth.js"
	"daw-core/src/actions/renameChannel.js"
	"daw-core/src/actions/renameComposition.js"
	"daw-core/src/actions/renamePattern.js"
	"daw-core/src/actions/renameSynth.js"
	"daw-core/src/actions/renameTrack.js"
	"daw-core/src/actions/reorderChannel.js"
	"daw-core/src/actions/reorderDrumrow.js"
	"daw-core/src/actions/reorderOscillator.js"
	"daw-core/src/actions/reorderPattern.js"
	"daw-core/src/actions/selectBlocks.js"
	"daw-core/src/actions/selectKeys.js"
	"daw-core/src/actions/toggleChannel.js"
	"daw-core/src/actions/toggleDrumrow.js"
	"daw-core/src/actions/toggleEffect.js"
	"daw-core/src/actions/toggleEnv.js"
	"daw-core/src/actions/toggleLFO.js"
	"daw-core/src/actions/toggleSoloDrumrow.js"
	"daw-core/src/actions/toggleSoloTrack.js"
	"daw-core/src/actions/toggleTrack.js"
	"daw-core/src/actions/unselectAllBlocks.js"
	"daw-core/src/actions/unselectAllKeys.js"
	"daw-core/src/actions/unselectBlock.js"
	"daw-core/src/actions/unselectKey.js"

	"daw-core/src/prototype/abortWAVExport.js"
	"daw-core/src/prototype/addComposition.js"
	"daw-core/src/prototype/addCompositionByBlob.js"
	"daw-core/src/prototype/addCompositionByJSON.js"
	"daw-core/src/prototype/addCompositionByURL.js"
	"daw-core/src/prototype/addCompositionsFromLocalStorage.js"
	"daw-core/src/prototype/addNewComposition.js"
	"daw-core/src/prototype/closeComposition.js"
	"daw-core/src/prototype/deleteComposition.js"
	"daw-core/src/prototype/dropAudioFiles.js"
	"daw-core/src/prototype/exportCompositionToJSON.js"
	"daw-core/src/prototype/exportCompositionToWAV.js"
	"daw-core/src/prototype/liveChangeChannel.js"
	"daw-core/src/prototype/liveChangeEffect.js"
	"daw-core/src/prototype/liveChangeSynth.js"
	"daw-core/src/prototype/newComposition.js"
	"daw-core/src/prototype/openComposition.js"
	"daw-core/src/prototype/saveComposition.js"

	"components/gsDrums/gsDrums.js"
	"components/gsEffects/gsEffects.js"
	"components/gsMixer/gsMixer.js"
	"components/gsPatternroll/gsPatternroll.js"
	"components/gsPatterns/gsPatterns.js"
	"components/gsPianoroll/gsPianoroll.js"
	"components/gsSynth/gsSynth.js"
	"components/gsSlicer/gsSlicer.js"

	"wa-components/gswaLFO/gswaLFO.js"
	"wa-components/gswaEnvelope/gswaEnvelope.js"
	"wa-components/gswaMixer/gswaMixer.js"
	"wa-components/gswaSynth/gswaSynth.js"
	"wa-components/gswaKeysScheduler/gswaKeysScheduler.js"
	"wa-components/gswaDrumsScheduler/gswaDrumsScheduler.js"
	"wa-components/gswaSlicer/gswaSlicer.js"
	"wa-components/gswaBPMTap/gswaBPMTap.js"
	"wa-components/gswaEffects/gswaEffects.js"
	"wa-components/gswaFxFilter/gswaFxFilter.js"
	"wa-components/gswaDrumrows/gswaDrumrows.js"
	"wa-components/gswaScheduler/gswaScheduler.js"
	"wa-components/gswaEncodeWAV/gswaEncodeWAV.js"
	"wa-components/gswaStereoPanner/gswaStereoPanner.js"
	"wa-components/gswaPeriodicWaves/gswaPeriodicWaves.js"
	"wa-components/gswaPeriodicWaves/gswaPeriodicWaves.list.js"

	"ui-components/gsui.js"
	"ui-components/gsuiDAW/gsuiDAW.html.js"
	#"ui-components/gsuiDAW/gsuiDAW-popup-auth.html.js"
	"ui-components/gsuiDAW/gsuiDAW-popup-open.html.js"
	"ui-components/gsuiDAW/gsuiDAW-popup-about.html.js"
	"ui-components/gsuiDAW/gsuiDAW-popup-tempo.html.js"
	"ui-components/gsuiDAW/gsuiDAW-popup-export.html.js"
	"ui-components/gsuiDAW/gsuiDAW-popup-cookies.html.js"
	"ui-components/gsuiDAW/gsuiDAW-popup-settings.html.js"
	"ui-components/gsuiDAW/gsuiDAW-popup-shortcuts.html.js"
	"ui-components/gsuiDAW/gsuiDAW.js"
	"ui-components/gsuiDragshield/gsuiDragshield.js"
	"ui-components/gsuiEnvelopeGraph/gsuiEnvelopeGraph.js"
	"ui-components/gsuiEnvelope/gsuiEnvelope.html.js"
	"ui-components/gsuiEnvelope/gsuiEnvelope.js"
	"ui-components/gsuiLFO/gsuiLFO.html.js"
	"ui-components/gsuiLFO/gsuiLFO.js"
	"ui-components/gsuiClock/gsuiClock.html.js"
	"ui-components/gsuiClock/gsuiClock.js"
	"ui-components/gsuiChannel/gsuiChannel.html.js"
	"ui-components/gsuiChannel/gsuiChannel.js"
	"ui-components/gsuiChannels/gsuiChannels.html.js"
	"ui-components/gsuiChannels/gsuiChannels.js"
	"ui-components/gsuiCurves/gsuiCurves.html.js"
	"ui-components/gsuiCurves/gsuiCurves.js"
	"ui-components/gsuiEffects/gsuiEffects.html.js"
	"ui-components/gsuiEffects/gsuiEffects.js"
	"ui-components/gsuiFxFilter/gsuiFxFilter.html.js"
	"ui-components/gsuiFxFilter/gsuiFxFilter.js"
	"ui-components/gsuiReorder/gsuiReorder.js"
	"ui-components/gsuiReorder/gsuiReorder.listReorder.js"
	"ui-components/gsuiReorder/gsuiReorder.listComputeOrderChange.js"
	"ui-components/gsuiDragline/gsuiDragline.html.js"
	"ui-components/gsuiDragline/gsuiDragline.js"
	"ui-components/gsuiBeatlines/gsuiBeatlines.js"
	"ui-components/gsuiBlocksManager/gsuiBlocksManager.js"
	"ui-components/gsuiPatternroll/gsuiPatternroll.html.js"
	"ui-components/gsuiPatternroll/gsuiPatternroll.js"
	"ui-components/gsuiPianoroll/gsuiPianoroll.html.js"
	"ui-components/gsuiPianoroll/gsuiPianoroll.js"
	"ui-components/gsuiDrumrows/gsuiDrumrows.html.js"
	"ui-components/gsuiDrumrows/gsuiDrumrows.js"
	"ui-components/gsuiDrums/gsuiDrums.html.js"
	"ui-components/gsuiDrums/gsuiDrums.js"
	"ui-components/gsuiKeys/gsuiKeys.html.js"
	"ui-components/gsuiKeys/gsuiKeys.js"
	"ui-components/gsuiOscillator/gsuiOscillator.html.js"
	"ui-components/gsuiOscillator/gsuiOscillator.js"
	"ui-components/gsuiPeriodicWave/gsuiPeriodicWave.js"
	"ui-components/gsuiSynthesizer/gsuiSynthesizer.html.js"
	"ui-components/gsuiSynthesizer/gsuiSynthesizer.js"
	"ui-components/gsuiDotline/gsuiDotline.js"
	"ui-components/gsuiPanels/gsuiPanels.js"
	"ui-components/gsuiPopup/gsuiPopup.html.js"
	"ui-components/gsuiPopup/gsuiPopup.js"
	"ui-components/gsuiSlicer/gsuiSlicer.html.js"
	"ui-components/gsuiSlicer/gsuiSlicer.js"
	"ui-components/gsuiSlider/gsuiSlider.html.js"
	"ui-components/gsuiSlider/gsuiSlider.js"
	"ui-components/gsuiSliderGroup/gsuiSliderGroup.html.js"
	"ui-components/gsuiSliderGroup/gsuiSliderGroup.js"
	"ui-components/gsuiTimeline/gsuiTimeline.html.js"
	"ui-components/gsuiTimeline/gsuiTimeline.js"
	"ui-components/gsuiTimewindow/gsuiTimewindow.html.js"
	"ui-components/gsuiTimewindow/gsuiTimewindow.js"
	"ui-components/gsuiPatterns/gsuiPatterns-infoPopup.html.js"
	"ui-components/gsuiPatterns/gsuiPatterns-pattern.html.js"
	"ui-components/gsuiPatterns/gsuiPatterns-synth.html.js"
	"ui-components/gsuiPatterns/gsuiPatterns.html.js"
	"ui-components/gsuiPatterns/gsuiPatterns.js"
	"ui-components/gsuiTrack/gsuiTrack.html.js"
	"ui-components/gsuiTrack/gsuiTrack.js"
	"ui-components/gsuiTracklist/gsuiTracklist.js"
	"ui-components/gsuiAnalyser/gsuiAnalyser.js"
	"ui-components/gsuiSpectrum/gsuiSpectrum.js"
	"ui-components/gsuiSVGDefs/gsuiSVGDefs.js"
	"ui-components/gsuiWaveform/gsuiWaveform.js"
	"ui-components/gsuiWaveform/gsuiWaveform.draw.js"
	"ui-components/gsuiWaveforms/gsuiWaveforms.js"
	"ui-components/gsuiKeysforms/gsuiKeysforms.js"
	"ui-components/gsuiDrumsforms/gsuiDrumsforms.js"
	"ui-components/gsuiSlicesforms/gsuiSlicesforms.js"
	"ui-components/gsuiWindows/gsuiWindows.js"
	"ui-components/gsuiWindows/gsuiWindow.html.js"
	"ui-components/gsuiWindows/gsuiWindow.js"

	"src/html/windows/blocks.html.js"
	"src/html/windows/drums.html.js"
	"src/html/windows/effects.html.js"
	"src/html/windows/mixer.html.js"
	"src/html/windows/patternroll.html.js"
	"src/html/windows/pianoroll.html.js"
	"src/html/windows/slicer.html.js"
	"src/html/windows/synth.html.js"
	"src/html/popups/selectChan.html.js"

	"src/ui/loading.js"
	"src/ui/auth.js"
	"src/ui/drop.js"
	"src/ui/drums.js"
	"src/ui/title.js"
	"src/ui/synth.js"
	"src/ui/mixer.js"
	"src/ui/slicer.js"
	"src/ui/effects.js"
	"src/ui/windows.js"
	"src/ui/patterns.js"
	"src/ui/controls.js"
	"src/ui/keyboard.js"
	"src/ui/pianoroll.js"
	"src/ui/patternroll.js"
	"src/ui/compositions.js"
	"src/ui/compositionChanged.js"
	"src/run.js"
)

buildDev() {
	filename='index.html'
	echo "Build $filename"
	writeHeader > $filename
	writeCSS >> $filename
	writeBody >> $filename
	cat src/html/loading.html >> $filename
	echo '<script>function lg( a ) { return console.log.apply( console, arguments ), a; }</script>' >> $filename
	writeJS >> $filename
	writeEnd >> $filename
}

buildProd() {
	filename='index-prod.html'
	echo "Build $filename"
	writeHeader > $filename
	writeCSScompress >> $filename
	writeBody >> $filename
	cat src/html/loading.html >> $filename
	writeJScompress >> $filename
	writeEnd >> $filename
}

lint() {
	stylelint "${CSSfiles[@]}"
	echo '"use strict";' > __lintMain.js
	cat "${JSfilesProd[@]}" | grep -v '"use strict";' >> __lintMain.js
	cat "${JSfiles[@]}" | grep -v '"use strict";' >> __lintMain.js
	eslint __lintMain.js && rm __lintMain.js
}

count() {
	find ../daw/src/          -name '*.js'                        -exec wc -l {} \; | cut -d' ' -f1 | awk '{s+=$1} END {printf "* daw              %4.0f JS lines\n", s}'
	find ../daw/src/          -name '*.css'                       -exec wc -l {} \; | cut -d' ' -f1 | awk '{s+=$1} END {printf "                   %4.0f CSS lines\n", s}'
	find ../daw/src/          -name '*.js' -not -name '*.html.js' -exec wc -l {} \; | cut -d' ' -f1 | awk '{s+=$1} END {printf "                   %4.0f HTML lines\n\n", s}'
	find ../daw-core/         -name '*.js'                        -exec wc -l {} \; | cut -d' ' -f1 | awk '{s+=$1} END {printf "* daw-core         %4.0f JS lines\n\n", s}'
	find ../components/    -name '*.js'                        -exec wc -l {} \; | cut -d' ' -f1 | awk '{s+=$1} END {printf "* component     %4.0f JS lines\n\n", s}'
	find ../wa-components/ -name '*.js'                        -exec wc -l {} \; | cut -d' ' -f1 | awk '{s+=$1} END {printf "* wa-components %4.0f JS lines\n\n", s}'
	find ../ui-components/ -name '*.js' -not -name '*.html.js' -exec wc -l {} \; | cut -d' ' -f1 | awk '{s+=$1} END {printf "* ui-components %4.0f JS lines\n", s}'
	find ../ui-components/ -name '*.css'                       -exec wc -l {} \; | cut -d' ' -f1 | awk '{s+=$1} END {printf "                   %4.0f CSS lines\n", s}'
	find ../ui-components/ -name '*.html.js'                   -exec wc -l {} \; | cut -d' ' -f1 | awk '{s+=$1} END {printf "                   %4.0f HTML lines\n", s}'
}

if [ $# = 0 ]; then
	buildDev
elif [ $1 = "dep" ]; then
	updateDep
elif [ $1 = "dev" ]; then
	buildDev
elif [ $1 = "prod" ]; then
	buildProd
elif [ $1 = "lint" ]; then
	lint
elif [ $1 = "count" ]; then
	count
fi
