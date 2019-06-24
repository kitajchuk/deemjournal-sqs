import * as core from "../../core";
// import $ from "properjs-hobo";
import issueView from "../../views/issue";
import Stack from "./Stack";

/**
 *
 * @public
 * @global
 * @class Issue
 * @param {Element} element The element to work with
 * @classdesc Handle product blocks for issue module.
 *
 */
class Issue {
    constructor ( element ) {
        this.element = element;
        this.script = this.element.find( "script" ).detach();
        this.blockJson = JSON.parse( this.script[ 0 ].textContent );

        console.log( this );

        this.init();
    }


    init () {
        this.element[ 0 ].innerHTML = issueView( this );
        this.stack = new Stack( this.element.find( ".js-stack" ) );
        core.util.loadImages( this.element.find( core.config.lazyImageSelector ), core.util.noop );
    }


    destroy () {
        if ( this.stack ) {
            this.stack.destroy();
        }
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Issue;
