// import * as core from "../../core";
// import $ from "properjs-hobo";


/**
 *
 * @public
 * @global
 * @class Story
 * @param {Element} element The element to work with
 * @classdesc Handle CMS stories.
 *
 */
class Story {
    constructor ( element, data ) {
        this.element = element;
        this.coverRow = this.element.find( ".sqs-layout > .sqs-row > .col > .sqs-row:first-child" );
        this.bolders = this.element.find( ".sqs-layout > .sqs-row > .col .sqs-block-html .sqs-block-content > p" );
        this.numerics = this.element.find( ".sqs-layout > .sqs-row > .col .sqs-block-html .sqs-block-content > p > em" );
        this.listings = this.element.find( ".sqs-layout > .sqs-row > .col .sqs-block-html .sqs-block-content > ul, .sqs-layout > .sqs-row > .col .sqs-block-html .sqs-block-content > ol" );
        this.summary = this.element.find( ".js-summary-v2" );
        this.capillary = this.element.find( ".sqs-layout > .sqs-row > .col .sqs-block-gallery + .sqs-block-html > .sqs-block-content > blockquote:first-child " );
        this.data = data;

        this.init();
    }


    init () {
        if ( this.coverRow.length ) {
            this.coverRow.find( ".col > .sqs-block-html" ).parent().addClass( "text-col" );
            this.coverRow.find( ".col > .sqs-block-image" ).parent().addClass( "image-col" );
            this.element.addClass( "story--alt" );
        }

        if ( this.bolders.length ) {
            this.bolders.forEach(( el, i ) => {
                const elem = this.bolders.eq( i );
                const strong = elem.find( "strong" );
                const em = elem.find( "em" );

                if ( !em.length && strong.length ) {
                    elem.addClass( "p--boldline" );
                }
            });
        }

        if ( this.numerics.length ) {
            this.numerics.forEach(( el, i ) => {
                const elem = this.numerics.eq( i );
                const number = parseInt( el.innerText, 10 );

                if ( Number.isInteger( number ) ) {
                    elem.addClass( "ss" );
                }
            });
        }

        if ( this.listings.length ) {
            this.listings.forEach(( el, i ) => {
                const elem = this.listings.eq( i );
                const prev = elem.prev( "p" );

                if ( prev.length ) {
                    prev.addClass( "p--listings" );
                }
            });
        }

        if ( this.capillary.length ) {
            this.capillary.forEach(( el, i ) => {
                const gallery = this.capillary
                    .eq( i )
                    .closest( ".sqs-block-html" )
                    .prev( ".sqs-block-gallery" );

                gallery
                    .addClass( "is-capillary" )
                    .find( ".sqs-block-content" )
                    .append( el );
            });
        }

        if ( this.summary.length ) {
            this.summary.find( `.js-summary-v2-item--${this.data.itemId}` ).remove();
        }
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Story;
