import * as core from "../../core";
// import router from "../../router";
import ScrollController from "properjs-scrollcontroller";



/**
 *
 * @public
 * @global
 * @class Cover
 * @param {Element} element The element to work with
 * @classdesc Handle product blocks for issue module.
 *
 */
class Cover {
    constructor ( element, data ) {
        this.element = element;
        this.data = data;
        this.cta = this.element.find( ".js-cover-cta" );
        this.header = core.dom.body.find( ".js-header" );
        this.style = this.element.find( ".js-colorway-style" );
        this.image = this.element.find( ".js-lazy-cover-image" );
        this.init();
        this.bind();
    }


    init () {
        core.dom.html.addClass( "is-coverpage" );
        core.util.loadImages( this.image, core.util.noop ).on( "done", () => {
            this.element.addClass( "is-loaded" );
        });
    }


    bind () {
        this.cta.on( "mouseenter", () => {
            this.element.addClass( "is-focus" );

        }).on( "mouseleave", () => {
            this.element.removeClass( "is-focus" );
        });

        this.scroller = new ScrollController();
        this.scroller.on( "scroll", () => {
            this.scrollHandler();
        });

        this.scrollHandler();
    }


    scrollHandler () {
        const coverBounds = this.element[ 0 ].getBoundingClientRect();
        const headerBounds = this.header[ 0 ].getBoundingClientRect();

        if ( core.util.rectsCollide( coverBounds, headerBounds ) ) {
            core.dom.html.addClass( `is-coverpage--collider is-coverpage--${this.data.id}` );

        } else {
            core.dom.html.removeClass( `is-coverpage--collider is-coverpage--${this.data.id}` );
        }
    }


    destroy () {
        this.style.remove();
        this.scroller.destroy();
        core.dom.html.removeClass( `is-coverpage is-coverpage--collider is-coverpage--${this.data.id}` );
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Cover;
