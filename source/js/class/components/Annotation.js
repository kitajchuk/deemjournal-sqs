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
    constructor ( annotation, data, i ) {
        this.annotation = annotation;
        this.parent = this.annotation.closest( ".sqs-row" );
        this.text = this.parent.find( ".col:nth-child(2) .sqs-block-content > p, .col:nth-child(2) .sqs-block-content > blockquote" );
        this.media = this.parent.find( ".js-media" );
        this.prevSpace = this.parent.prev( ".sqs-block-spacer" );
        this.nextSpace = this.parent.next( ".sqs-block-spacer" );
        this.prevText = this.prevSpace.prev( ".sqs-block-html" );
        this.nextText = this.nextSpace.next( ".sqs-block-html" );
        this.data = data;
        this.i = i;

        this.init();
    }


    init () {
        this.parent[ 0 ].innerHTML = annotationView( this );

        if ( this.prevText.length && !this.media.length ) {
            this.prevSpace.addClass( "spacer-text" );
        }

        if ( this.nextText.length && !this.media.length ) {
            this.nextSpace.addClass( "spacer-text" );
        }
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Annotation;
