// import * as core from "../../core";
// import $ from "properjs-hobo";
// import coverView from "../../views/cover";


/**
 *
 * @public
 * @global
 * @class Annotation
 * @param {Element} element The element to work with
 * @classdesc Handle cover styles C & D.
 *
 */
class Cover {
    constructor ( element ) {
        this.spacerStart = element.addClass( "cover-start" );
        this.spacerEnd = null;

        this.init();
    }


    init () {
        this.isSeeking = true;
        this.currElem = this.spacerStart;

        while ( this.isSeeking ) {
            this.currElem = this.currElem.next();

            // Stop
            if ( this.currElem.is( ".sqs-block-spacer" ) ) {
                this.spacerEnd = this.currElem.addClass( "cover-end" );
                this.isSeeking = false;
                break;
            }

            this.currElem.addClass( "cover-block" );
            this.currElem.find( ".col > .sqs-block-html" ).parent().addClass( "text-col" );
            this.currElem.find( ".col > .sqs-block-image" ).parent().addClass( "image-col" );
        }
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Cover;
