import * as core from "../../core";
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
    constructor ( cta ) {
        this.cta = cta;
        this.parent = this.cta.closest( ".sqs-row" );
        this.text = this.parent.find( ".sqs-block-content > p" );
        this.dropout = core.dom.body.find( ".js-summary-v2" );

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

            if ( this.dropout.length ) {
                const collider = this.dropout[ 0 ].getBoundingClientRect();
                const ctaBounds = this.cta[ 0 ].getBoundingClientRect();

                if ( collider.y < ctaBounds.y ) {
                    this.parent.addClass( "is-cta-collider" );

                } else {
                    this.parent.removeClass( "is-cta-collider" );
                }
            }
        });
    }


    init () {
        this.parent[ 0 ].innerHTML = ctaView( this );
        this.cta = this.parent.find( ".js-cta" );
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default CTA;
