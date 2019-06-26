import * as core from "../../core";



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
            core.dom.html.removeClass( "is-site-intro" );
        });
    }


    bind () {
        this.__appScroll = this.doScroll.bind( this );
        this.__appResize = this.doScroll.bind( this );

        core.emitter.on( "app--scroll", this.__appScroll );
        core.emitter.on( "app--resize", this.__appResize );

        this.doScroll();
    }


    doScroll () {
        const coverBounds = this.element[ 0 ].getBoundingClientRect();
        const headerBounds = this.header[ 0 ].getBoundingClientRect();

        if ( core.util.rectsCollide( coverBounds, headerBounds ) && (window.innerWidth > core.config.mobileMediaHack) ) {
            core.dom.html.addClass( `is-coverpage--collider is-coverpage--${this.data.id}` );

        } else {
            core.dom.html.removeClass( `is-coverpage--collider is-coverpage--${this.data.id}` );
        }
    }


    destroy () {
        core.emitter.off( "app--scroll", this.__appScroll );
        core.emitter.off( "app--resize", this.__appResize );
        this.style.remove();
        core.dom.html.removeClass( `is-coverpage is-coverpage--collider is-coverpage--${this.data.id}` );
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Cover;
