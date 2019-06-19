// Load the SASS
require( "../sass/screen.scss" );


// Load the JS
import ResizeController from "properjs-resizecontroller";
import ScrollController from "properjs-scrollcontroller";
import Metrics from "./class/services/Metrics";
import * as core from "./core";
import router from "./router";
import intro from "./modules/intro";
import navi from "./modules/navi";


/**
 *
 * @public
 * @class App
 * @classdesc Load the App application Class to handle it ALL.
 *
 */
class App {
    constructor () {
        this.metrics = new Metrics();
        this.core = core;
        this.intro = intro;
        this.navi = navi;
        this.router = router;
        this.resizer = new ResizeController();
        this.scroller = new ScrollController();
        this.scrollBounce = 300;
        this.scrollTimeout = null;

        this.init();
    }


    init () {
        this.core.detect.init();
        this.intro.init();
        this.navi.init();
        this.router.init();
        this.router.load().then(() => {
            this.bind();
            this.intro.teardown();

        }).catch(( error ) => {
            this.core.log( "warn", error );
        });
    }


    bind () {
        this.resizer.on( "resize", () => {
            core.emitter.fire( "app--resize" );
        });

        this.scroller.on( "scroll", () => {
            core.emitter.fire( "app--scroll", this.scroller.getScrollY() );

            core.dom.html.addClass( "is-scrolling" );

            clearTimeout( this.scrollTimeout );

            this.scrollTimeout = setTimeout(() => {
                core.dom.html.removeClass( "is-scrolling" );

            }, this.scrollBounce );
        });

        this.scroller.on( "scrollup", () => {
            core.dom.html.removeClass( "is-scroll-down" ).addClass( "is-scroll-up" );
            core.emitter.fire( "app--scrollup", this.scroller.getScrollY() );
        });

        this.scroller.on( "scrolldown", () => {
            const scrollY = this.scroller.getScrollY();

            if ( scrollY > 0 ) {
                core.dom.html.removeClass( "is-scroll-up" ).addClass( "is-scroll-down" );
                core.emitter.fire( "app--scrolldown", this.scroller.getScrollY() );
            }
        });
    }
}


// Create {app} instance
window.app = new App();


// Export {app} instance
export default window.app;
