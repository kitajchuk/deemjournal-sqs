import * as core from "../../core";
import $ from "properjs-hobo";
import { TweenLite, Power3 } from "gsap/TweenMax";




/**
 *
 * @public
 * @global
 * @class PuppetMaster
 * @param {Element} element The element to work with
 * @classdesc Handle pulling strings and junk like that ;P
 *
 */
class PuppetMaster {
    constructor ( element ) {
        this.element = element;
        this.fixture = this.element.find( ".js-puppet-fixture" );
        this.content = this.element.find( ".js-puppet-content" );
        this.footer = this.element.find( ".js-puppet-footer" );
        this.scenes = this.element.find( ".js-scene" ).map(( el ) => {
            return this.newScene( el );
        });
        this.smooth = 50;


        this.init();
        // this.bind();
        this.blind();
    }


    blind () {
        this.blindHtml = this.content.find( ".sqs-layout > .sqs-row > .col > .sqs-block-html" );
        this.blindGrid = this.content.find( ".sqs-layout > .sqs-row > .col > .sqs-block-summary-v2" );

        if ( this.blindHtml.length ) {
            this.blindHtmlContent = this.blindHtml.find( ".sqs-block-content" );
            this.blindHtmlContent.addClass( "js-puppet" ).data({
                fix: 1,
                speed: 3
            });

            this.push( this.blindHtml[ 0 ] );
        }

        if ( this.blindGrid.length ) {
            this.blindGridContent = this.blindGrid.find( ".sqs-block-content" );
            this.blindGridContent.addClass( "js-puppet" ).data({
                fix: 1,
                speed: 4
            });

            this.push( this.blindGrid[ 0 ] );
        }

        if ( this.footer.length ) {
            this.footer.find( ".sqs-layout" ).addClass( "js-puppet" ).data({
                fix: 1,
                speed: 6
            });

            this.push( this.footer[ 0 ] );
        }
    }


    push ( el ) {
        const isPushed = this.scenes.find(( scene ) => {
            return (scene.node === el);
        });

        if ( !isPushed ) {
            console.log( "PuppetMaster", "New Scene", el );
            this.scenes.push( this.newScene( el ) );
        }
    }


    bind () {
        this.__appScroll = this.doScroll.bind( this );
        this.__appPuppet = this.doPuppet.bind( this );

        core.emitter.on( "app--scroll", this.__appScroll );
        core.emitter.on( "app--puppet", this.__appPuppet );
    }


    init () {
        // console.log( "PuppetMaster", this );
    }


    doScroll () {
        this.scenes.forEach(( scene ) => {
            const bounds = scene.node.getBoundingClientRect();

            // console.log( "PuppetMaster", "Scene Check", scene );

            if ( bounds.y <= window.innerHeight && (bounds.y + bounds.height > 0) && !scene.on ) {
                scene.on = 1;
                // console.log( "PuppetMaster", "Scene On", scene );
            }

            if ( bounds.y <= window.innerHeight && (bounds.y + bounds.height <= 0) && scene.on ) {
                scene.on = 0;
                // console.log( "PuppetMaster", "Scene Off", scene );
            }

            if ( scene.on ) {
                this.doScene( scene );
            }
        });
    }


    doScene ( scene ) {
        scene.puppets.forEach(( puppet ) => {
            // console.log( "PuppetMaster", "Puppet Check", puppet );

            if ( puppet.tween ) {
                puppet.tween.kill();
                puppet.tween = null;
            }

            if ( puppet.data.wipe ) {
                this.doPuppetWipe( puppet, scene );
            }

            if ( puppet.data.fix ) {
                this.doPuppetFix( puppet, scene );
            }
        });
    }


    doPuppetFix ( puppet ) {
        const fixTransform = core.util.getTransformValues( this.fixture[ 0 ] );
        const position = fixTransform.y / parseFloat( (puppet.data.speed || 2) );

        this.doPuppetTween( puppet, position, this.smooth );
    }


    doPuppetWipe ( puppet ) {
        const scrollY = window.app.scroller.getScrollY();
        const position = -(scrollY + (scrollY / parseFloat( (puppet.data.speed || 10) )));

        this.doPuppetTween( puppet, position, this.smooth );
    }


    doPuppetTween ( puppet, position, duration ) {
        puppet.tween = new TweenLite.to( puppet.node, this.msToSec( duration ), {
            css: { y: position },
            ease: Power3.ease,
            onComplete: () => {
                puppet.tween = null;
            }
        });
    }


    msToSec ( ms ) {
        return parseInt( ms, 10 ) / 1000;
    }


    newScene ( el ) {
        const elem = $( el );

        return {
            on: 0,
            node: el,
            element: elem,
            puppets: elem.find( ".js-puppet" ).map(( ell ) => {
                return this.newPuppet( ell );
            })
        };
    }


    newPuppet ( el ) {
        const elem = $( el );
        const data = elem.data();

        return {
            data,
            node: el,
            element: elem
        };
    }


    doPuppet ( el ) {
        if ( el ) {
            this.push( el );
        }
    }


    destroy () {
        core.emitter.stop();
        core.emitter.off( "app--scroll", this.__appScroll );
        core.emitter.off( "app--puppet", this.__appPuppet );
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default PuppetMaster;
