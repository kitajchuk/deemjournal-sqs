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
        this.wrapper = this.element.find( ".js-stack-wrap" );
        this.data = this.element.data();

        if ( this.element.length ) {
            this.bind();
        }
    }


    doScroll () {
        const bounds = this.element[ 0 ].getBoundingClientRect();
        const windowThird = window.innerHeight / 3;
        const windowCheck = window.innerHeight - windowThird;

        if ( bounds.y <= windowCheck ) {
            this.element.addClass( "is-stack-active" );
            core.dom.html.addClass( `is-stack is-stack--${this.data.id}` );
            this.wrapper.addClass( "is-active" );

        } else {
            this.element.removeClass( "is-stack-active" );
            core.dom.html.removeClass( `is-stack is-stack--${this.data.id}` );
            this.wrapper.removeClass( "is-active" );
        }
    }


    bind () {
        this.__appScroll = this.doScroll.bind( this );

        // Async this so we don't get hiccups on page transitions...
        setTimeout(() => {
            core.emitter.on( "app--scroll", this.__appScroll );

        }, 1000 );
    }


    destroy () {
        core.emitter.off( "app--scroll", this.__appScroll );
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Stack;
