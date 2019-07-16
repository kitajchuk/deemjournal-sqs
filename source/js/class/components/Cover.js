import * as core from "../../core";
import { TweenLite, Power3 } from "gsap/TweenMax";



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
        this.fixer = this.element.find( ".js-cover-fixer" );
        this.hover = this.element.find( ".js-cover-hover" );
        this.parent = this.element.parent();
        this.mission = this.parent.find( ".js-cover + .sqs-layout .sqs-block-html" );
        this.summary = this.parent.find( ".js-cover + .sqs-layout + .sqs-layout .sqs-block-summary-v2" );
        this.tween = {};
        this.mobileMediaHack = 812;
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
        const windowThird = window.innerHeight / 3;
        const windowCheck = window.innerHeight - windowThird;

        if ( core.util.rectsCollide( coverBounds, headerBounds ) && (window.innerWidth > this.mobileMediaHack) ) {
            core.dom.html.addClass( `is-coverpage--collider is-coverpage--${this.data.id}` );

        } else {
            core.dom.html.removeClass( `is-coverpage--collider is-coverpage--${this.data.id}` );
        }

        if ( this.fixer.length && core.util.isElementVisible( this.element[ 0 ] ) ) {
            this.tweenFixer( coverBounds );

        } else {
            this.tweenFixer({
                y: 0
            });
        }

        if ( this.hover.length && core.util.isElementVisible( this.element[ 0 ] ) ) {
            this.tweenHover( coverBounds );

        } else {
            this.tweenHover({
                y: 0
            });
        }

        if ( this.mission.length ) {
            const missionBounds = this.mission[ 0 ].getBoundingClientRect();

            if ( missionBounds.y <= windowCheck ) {
                this.mission.addClass( "is-active" );
            }
        }

        if ( this.summary.length ) {
            const summaryBounds = this.summary[ 0 ].getBoundingClientRect();

            if ( summaryBounds.y <= windowCheck ) {
                this.summary.addClass( "is-active" );
            }
        }
    }


    tweenFixer ( bounds ) {
        if ( this.tween.fixer ) {
            this.tween.fixer.kill();
        }

        const speed = 1.25;
        const duration = (50 / 1000); // ms to sec
        const position = bounds.y * speed;

        this.tween.fixer = new TweenLite.to( this.fixer[ 0 ], duration, {
            y: Math.max( -window.innerHeight, position ),
            ease: Power3.ease
        });
    }


    tweenHover ( bounds ) {
        if ( this.tween.hover ) {
            this.tween.hover.kill();
        }

        const speed = 0.25;
        const duration = (50 / 1000); // ms to sec
        const position = bounds.y * speed;

        this.tween.hover = new TweenLite.to( this.hover[ 0 ], duration, {
            y: Math.max( -window.innerHeight, position ),
            opacity: 1 - Math.max( 0, Math.abs( (bounds.y / 1000) * 2 ) ),
            ease: Power3.ease
        });
    }


    destroy () {
        if ( this.tween.fixer ) {
            this.tween.fixer.kill();
        }

        if ( this.tween.hover ) {
            this.tween.hover.kill();
        }

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
