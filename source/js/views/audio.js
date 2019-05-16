export default ( /*instance*/ ) => {
    const svgPlayIcon = require( `../../../blocks/svg-play.block` );
    const svgPauseIcon = require( `../../../blocks/svg-pause.block` );
    const svgSkipBackwardIcon = require( `../../../blocks/svg-skipbackward.block` );
    const svgSkipForwardIcon = require( `../../../blocks/svg-skipforward.block` );

    return `
        <div class="_audio__station">
            <div class="_audio__controls _audio__controls--onboard js-audio-pp">
                <div class="_audio__pp">
                    ${svgPlayIcon}
                    ${svgPauseIcon}
                </div>
                <div class="_audio__state js-audio-state h6">
                    <span>Listen</span>
                    <span>Playing</span>
                </div>
            </div>
            <div class="_audio__ellapsed h6">
                <span class="js-audio-status">0:00</span>
            </div>
        </div>
        <div class="_audio__global">
            <div class="_audio__controls _audio__controls--utility">
                <div class="_audio__skip js-audio-skipbackward">
                    ${svgSkipBackwardIcon}
                </div>
                <div class="_audio__pp js-audio-pp">
                    ${svgPlayIcon}
                    ${svgPauseIcon}
                </div>
                <div class="_audio__skip js-audio-skipforward">
                    ${svgSkipForwardIcon}
                </div>
            </div>
            <div class="_audio__controls _audio__controls--onboard js-audio-pp">
                <div class="_audio__pp">
                    ${svgPlayIcon}
                    ${svgPauseIcon}
                </div>
                <div class="_audio__state js-audio-state h6">
                    <span>Listen</span>
                    <span>Playing</span>
                </div>
            </div>
            <div class="_audio__ellapsed h6">
                <span class="js-audio-status">0:00</span>
            </div>
        </div>
        <audio class="_audio__node js-audio-node"></audio>
    `;
};
