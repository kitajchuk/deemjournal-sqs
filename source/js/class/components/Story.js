import * as core from "../../core";
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
        this.data = data;

        this.init();
    }


    init () {
        if ( this.data.hex ) {
            core.dom.html[ 0 ].style.backgroundColor = this.data.hex;
        }

        if ( this.data.lit ) {
            core.dom.html.addClass( "is-inverse-text" );
        }

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
    }


    destroy () {
        if ( this.data.hex ) {
            core.dom.html[ 0 ].style.backgroundColor = "transparent";
        }

        if ( this.data.lit ) {
            core.dom.html.removeClass( "is-inverse-text" );
        }
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Story;
