// import * as core from "../../core";
// import $ from "properjs-hobo";
import coverView from "../../views/cover";


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
        this.element = element;
        this.columns = this.element.find( ".col" );
        this.isImageLeft = this.columns.first().find( ".sqs-block-image" ).length;
        this.image = this.element.find( ".sqs-block-image" );
        this.imageCol = this.image.parent();
        this.textsCol = this.element.find( ".col" ).not( this.imageCol );

        this.init();
    }


    init () {
        this.element[ 0 ].innerHTML = coverView( this );
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Cover;
