// import * as core from "../../core";
// import $ from "properjs-hobo";
import ctaView from "../../views/cta";
import ScrollController from "properjs-scrollcontroller";


/**
 *
 * @public
 * @global
 * @class CTA
 * @param {Element} element The element to work with
 * @classdesc Handle CTA button layouts.
 *
 */
class CTA {
    constructor ( cta, data ) {
        this.cta = cta;
        this.parent = this.cta.closest( ".sqs-row" );
        this.text = this.parent.find( ".sqs-block-content > p" );
        this.data = data;

        this.init();
        this.bind();
    }


    bind () {
        this.scroller = new ScrollController();
        this.scroller.on( "scroll", () => {
            const bounds = this.parent[ 0 ].getBoundingClientRect();

            if ( bounds.bottom < 0 ) {
                this.parent.addClass( "is-cta-offscreen" );

            } else {
                this.parent.removeClass( "is-cta-offscreen" );
            }
        });
    }


    init () {
        this.parent[ 0 ].innerHTML = ctaView( this );
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default CTA;
