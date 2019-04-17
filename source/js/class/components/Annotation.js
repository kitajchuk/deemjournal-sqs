// import * as core from "../../core";
// import $ from "properjs-hobo";
import annotationView from "../../views/annotation";


/**
 *
 * @public
 * @global
 * @class Annotation
 * @param {Element} element The element to work with
 * @classdesc Handle annotated text nodes.
 *
 */
class Annotation {
    constructor ( annotation ) {
        this.annotation = annotation;
        this.parent = this.annotation.closest( ".sqs-row" );
        this.text = this.parent.find( ".sqs-block-content > p" );

        this.init();
    }


    init () {
        this.parent[ 0 ].innerHTML = annotationView( this );
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Annotation;
