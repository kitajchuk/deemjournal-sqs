import * as core from "../../core";
import $ from "properjs-hobo";
import viewSearchResults from "../../views/search-results";
import viewTags from "../../views/tags";
import ImageController from "../controllers/ImageController";



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
        this.tagcloud = this.element.find( ".js-tagcloud" );
        this.data = data;

        this.init();
    }


    init () {
        if ( this.coverRow.length ) {
            this.initCover();
        }

        if ( this.bolders.length ) {
            this.initBolders();
        }

        if ( this.numerics.length ) {
            this.initNumerics();
        }

        if ( this.listings.length ) {
            this.initListings();
        }

        if ( this.capillary.length ) {
            this.initCapillaries();
        }

        if ( this.summary.length ) {
            this.summary.find( `.js-summary-v2-item--${this.data.itemId}` ).remove();
        }

        if ( this.tagcloud.length ) {
            this.initTagcloud();
        }
    }


    initCover () {
        this.coverRow.find( ".col > .sqs-block-html" ).parent().addClass( "text-col" );
        this.coverRow.find( ".col > .sqs-block-image" ).parent().addClass( "image-col" );
    }


    initBolders () {
        this.bolders.forEach(( el, i ) => {
            const elem = this.bolders.eq( i );
            const strong = elem.find( "strong" );
            const em = elem.find( "em" );

            if ( !em.length && strong.length ) {
                elem.addClass( "p--boldline" );
            }
        });
    }


    initNumerics () {
        this.numerics.forEach(( el, i ) => {
            const elem = this.numerics.eq( i );
            const number = parseInt( el.innerText, 10 );

            if ( Number.isInteger( number ) ) {
                elem.addClass( "ss" );
            }
        });
    }


    initListings () {
        this.listings.forEach(( el, i ) => {
            const elem = this.listings.eq( i );
            const prev = elem.prev( "p" );

            if ( prev.length ) {
                prev.addClass( "p--listings" );
            }
        });
    }


    initCapillaries () {
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


    initTagcloud () {
        this.tagcloudQuery = this.tagcloud.next( ".js-tagcloud-query" );
        this.tagcloudLabel = this.tagcloudQuery.find( ".js-tagcloud-field" );
        this.tagcloudLoader = this.tagcloudQuery.find( ".js-tagcloud-loader" );
        this.tagcloudDisplay = this.tagcloudQuery.find( ".js-tagcloud-display" );
        this.tagcloudClose = this.tagcloudQuery.find( ".js-tagcloud-close" );

        this.tags = this.data.tags.split( "," );
        this.tagcloud[ 0 ].innerHTML = viewTags( this );

        this.tagcloud.on( "click", ".js-tagcloud-link", ( e ) => {
            const target = $( e.target );
            const elem = target.is( ".js-tagcloud-link" ) ? target : target.parent();
            const data = elem.data();

            this.tagcloudQuery.addClass( "is-active" );
            this.tagcloudLoader.addClass( "is-active" );
            this.tagcloudLabel[ 0 ].placeholder = data.tag;
            this.tagcloudLabel[ 0 ].disabled = true;

            this.fetchStories( data.tag ).then( this.handleStories.bind( this ) );
        });

        this.tagcloudClose.on( "click", () => {
            this.tagcloudQuery.removeClass( "is-active" );

            setTimeout( this.handleTimeout.bind( this ), core.config.defaultDuration );
        });
    }


    handleTimeout () {
        this.tagcloudLabel[ 0 ].placeholder = "";
        this.tagcloudDisplay[ 0 ].innerHTML = "";
        this.imageController.destroy();
        this.imageController = null;
    }


    handleStories ( json ) {
        this.tagcloudLoader.removeClass( "is-active" );
        this.tagcloudDisplay[ 0 ].innerHTML = viewSearchResults( json );
        this.imageController = new ImageController( this.tagcloudDisplay.find( core.config.lazyImageSelector ) );
        this.imageController.on( "preloaded", () => {
            this.tagcloudDisplay.find( ".js-search-grid" ).addClass( "is-active" );
        });
    }


    fetchStories ( tag ) {
        return new Promise(( resolve, reject ) => {
            $.ajax({
                url: "/stories/",
                method: "GET",
                dataType: "json",
                data: {
                    format: "json",
                    tag,
                }
            }).then(( response ) => {
                resolve( response );

            }).catch(( error ) => {
                reject( error );
            });
        });
    }


    destroy () {
        if ( this.imageController ) {
            this.imageController.destroy();
        }
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Story;
