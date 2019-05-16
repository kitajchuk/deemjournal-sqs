import * as core from "../../core";
import $ from "properjs-hobo";
import viewSearch from "../../views/search";
import viewSearchResults from "../../views/search-results";
import Store from "../../core/Store";
import debounce from "properjs-debounce";



let _instance = null;



class Search {
    constructor ( element, data ) {
        if ( !_instance ) {
            this.element = element;
            this.parent = this.element.parent();
            this.elemData = data;
            this.searchBlock = core.dom.body.find( ".js-search-block" ).detach();
            this.blockJson = this.searchBlock.find( ".js-search" ).data().blockJson;
            this.element.data( "instance", this );
            this.data = {};
            this.ajax = null;

            this.load().then(() => {
                this.bind();

                if ( this.elemData.results ) {
                    this.bindResults();
                }
            });

            _instance = this;
        }

        return _instance;
    }


    load () {
        return new Promise(( resolve ) => {
            this.element[ 0 ].innerHTML = viewSearch( this );
            this.search = this.element.find( ".js-search-field" );
            this.button = this.element.find( ".js-search-btn" );
            resolve();
        });
    }


    bind () {
        this.button.on( "click", () => {
            this.clear();
        });

        this.search.on( "keyup", () => {
            if ( this.search[ 0 ].value ) {
                this.button.addClass( "is-active" );

            } else {
                this.button.removeClass( "is-active" );
            }
        });
    }


    bindResults () {
        this.results = this.parent.find( this.elemData.results );
        this.loader = this.results.find( ".js-search-loader" );
        this.display = this.results.find( ".js-search-display" );
        this.waiting = 300;
        this.isFetch = false;

        this.button.on( "click", () => {
            this.emptyResults();
        });

        this.search.on( "keyup", debounce(() => {
            // Abort existing request to start anew
            if ( this.isFetch ) {
                this.ajax.abort();
                this.isFetch = false;
                this.fetch();

            // Make a clean request starting from scratch
            } else if ( !this.isFetch && this.search[ 0 ].value ) {
                this.fetch();
            }

        }, this.waiting ));
    }


    emptyResults () {
        this.display.find( ".js-search-grid" ).removeClass( "is-active" );
        setTimeout(() => {
            this.display[ 0 ].innerHTML = "";

        }, 500 );
    }


    displayResults ( json ) {
        this.display[ 0 ].innerHTML = viewSearchResults( (json || { totalCount: 0, items: [] }) );
        core.util.loadImages( this.display.find( core.config.lazyImageSelector ) );
        setTimeout(() => {
            this.display.find( ".js-search-grid" ).addClass( "is-active" );

        }, 0 );
    }


    reset () {
        this.search[ 0 ].blur();
        this.search[ 0 ].value = "";
        this.emptyResults();
        this.button.removeClass( "is-active" );
        this.loader.removeClass( "is-active" );
    }


    clear () {
        this.search[ 0 ].value = "";
        this.search[ 0 ].focus();
        this.button.removeClass( "is-active" );
    }


    fetchQuery ( query ) {
        return $.ajax({
            url: "/api/search/GeneralSearch",
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            dataType: "json",
            data: {
                crumb: Store.crumb,
                q: query,
                p: 0,
                size: 12,
                f_collectionId:	this.blockJson.collectionId
            }
        });
    }


    handle ( response ) {
        this.isFetch = false;
        this.loader.removeClass( "is-active" );

        if ( response.serviceError ) {
            this.displayResults( null );

        } else {
            this.displayResults( response );
        }
    }


    fetch () {
        this.isFetch = true;
        this.loader.addClass( "is-active" );
        this.emptyResults();
        this.ajax = this.fetchQuery( this.search[ 0 ].value );
        this.ajax.then(( response ) => {
            this.handle( response );

        }).catch(( response ) => {
            this.handle( response );
        });
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Search;
