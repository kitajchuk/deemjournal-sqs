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
        this.data = data;

        this.init();
    }


    init () {
        if ( this.coverRow.length ) {
            this.coverRow.find( ".col > .sqs-block-html" ).parent().addClass( "text-col" );
            this.coverRow.find( ".col > .sqs-block-image" ).parent().addClass( "image-col" );
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
