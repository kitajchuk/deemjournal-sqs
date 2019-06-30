import * as core from "../../core";
import { TweenLite, Power3 } from "gsap/TweenMax";



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
        this.fixer = this.element.find( ".js-stack-fixer" );
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
        }

        if ( this.fixer.length && core.util.isElementVisible( this.element[ 0 ] ) ) {
            this.tweenFixer( bounds );

        } else {
            this.tweenFixer({
                y: window.innerHeight
            });
        }
    }


    tweenFixer ( bounds ) {
        if ( this.tween ) {
            this.tween.kill();
        }

        const speed = 1.25;
        const duration = (50 / 1000); // ms to sec
        const position = (bounds.y - window.innerHeight) * speed;

        // console.log( position );

        this.tween = new TweenLite.to( this.fixer[ 0 ], duration, {
            y: Math.max( -window.innerHeight, position ),
            ease: Power3.ease
        });
    }


    bind () {
        this.__appScroll = this.doScroll.bind( this );

        // Async this so we don't get hiccups on page transitions...
        setTimeout(() => {
            core.emitter.on( "app--scroll", this.__appScroll );

        }, 1000 );
    }


    destroy () {
        if ( this.tween ) {
            this.tween.kill();
        }

        core.emitter.off( "app--scroll", this.__appScroll );
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Stack;
