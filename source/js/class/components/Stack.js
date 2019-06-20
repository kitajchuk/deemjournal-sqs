import * as core from "../../core";

/**
 *
 * @public
 * @global
 * @class Stack
 * @param {Element} element The element to work with
 * @classdesc Handle stack animations.
 *
 */
class Stack {
    constructor ( element ) {
        this.element = element;

        if ( this.element.length ) {
            this.bind();
        }
    }


    doScroll () {
        const bounds = this.element[ 0 ].getBoundingClientRect();
        const windowHalf = window.innerHeight / 2;

        if ( bounds.y <= windowHalf ) {
            this.element.addClass( "is-stack-active" );
            core.dom.html.addClass( `is-stack is-stack--${this.element[ 0 ].id}` );

        } else {
            this.element.removeClass( "is-stack-active" );
            core.dom.html.removeClass( `is-stack is-stack--${this.element[ 0 ].id}` );
        }
    }


    bind () {
        this.__appScroll = this.doScroll.bind( this );

        core.emitter.on( "app--scroll", this.__appScroll );
    }


    destroy () {
        core.emitter.off( "app--scroll", this.__appScroll );
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Stack;
