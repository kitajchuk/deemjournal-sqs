import * as core from "../../core";
// import $ from "properjs-hobo";
import audioView from "../../views/audio";
import ScrollController from "properjs-scrollcontroller";


/**
 *
 * @public
 * @global
 * @class Audio
 * @param {Element} element The element to work with
 * @classdesc Handle annotated text nodes.
 *
 */
class Audio {
    constructor ( element, data ) {
        this.element = element;
        this.data = data;
        this.isPlaying = false;

        this.init();
        this.bind();
    }


    init () {
        this.element[ 0 ].innerHTML = audioView( this );
        this.audioStatus = this.element.find( ".js-audio-status" );
        this.audioPlayback = this.element.find( ".js-audio-pp" );
        this.audioSkipBackward = this.element.find( ".js-audio-skipbackward" );
        this.audioSkipForward = this.element.find( ".js-audio-skipforward" );
        this.audioNode = this.element.find( ".js-audio-node" );
        this.audioNode[ 0 ].src = this.data.blockJson.audioAssetUrl;
        this.audioStatus[ 0 ].innerHTML = core.util.formatTime( this.data.blockJson.audioAssetDuration );

        console.log( this );
    }


    bind () {
        this.scroller = new ScrollController();
        this.scroller.on( "scroll", () => {
            if ( core.util.isElementVisible( this.element[ 0 ] ) ) {
                this.element.removeClass( "is-audio-offscreen" );

            } else {
                this.element.addClass( "is-audio-offscreen" );
            }
        });

        this.audioPlayback.on( "click", () => {
            this.togglePP();
        });

        this.audioNode.on( "ended", () => {
            this.pause();
            this.audioNode[ 0 ].currentTime = 0;
            this.audioStatus[ 0 ].innerHTML = core.util.formatTime( this.data.blockJson.audioAssetDuration );
        });

        this.audioNode.on( "timeupdate", () => {
            this.audioStatus[ 0 ].innerHTML = core.util.formatTime( this.audioNode[ 0 ].currentTime * 1000 );
        });

        this.audioSkipForward.on( "click", () => {
            this.audioNode[ 0 ].pause();
            this.audioNode[ 0 ].currentTime = (this.audioNode[ 0 ].currentTime + 15);
            this.audioNode[ 0 ].play();
        });

        this.audioSkipBackward.on( "click", () => {
            this.audioNode[ 0 ].pause();
            this.audioNode[ 0 ].currentTime = (this.audioNode[ 0 ].currentTime - 15) || 0;
            this.audioNode[ 0 ].play();
        });
    }


    play () {
        this.isPlaying = true;
        this.element.addClass( "is-audio-playing" );
        this.audioNode[ 0 ].play();
    }


    pause () {
        this.isPlaying = false;
        this.element.removeClass( "is-audio-playing" );
        this.audioNode[ 0 ].pause();
    }


    togglePP () {
        if ( this.isPlaying ) {
            this.pause();

        } else {
            this.play();
        }
    }


    destroy () {
        if ( this.scroller ) {
            this.scroller.destroy();
        }
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Audio;
