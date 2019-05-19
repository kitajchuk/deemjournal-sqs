import * as core from "../../core";
import $ from "properjs-hobo";
import viewSearch from "../../views/search";
import viewSearchTags from "../../views/search-tags";
import viewSearchResults from "../../views/search-results";
import Store from "../../core/Store";
import debounce from "properjs-debounce";
import ResizeController from "properjs-resizecontroller";



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
            this.placeholders = {
                default: "Start typing to search",
                mobile: "Search"
            };
            this.data = {};
            this.ajax = null;
            this.waiting = 300;
            this.isFetch = false;

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
            this.doResize();
            this.fetchTags();
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

        this.resizer = new ResizeController();
        this.resizer.on( "resize", () => {
            this.doResize();
        });
    }


    bindResults () {
        this.results = this.parent.find( this.elemData.results );
        this.loader = this.results.find( ".js-search-loader" );
        this.display = this.results.find( ".js-search-display" );

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


    bindTags () {
        this.tagsEl.on( "click", ".js-tag", ( e ) => {
            const tag = $( e.target );
            const data = tag.data();

            this.tags.removeClass( "is-active" );
            tag.addClass( "is-active" );
            this.clear();
            this.search[ 0 ].blur();
            this.fetchTag( data.tag );
        });
    }


    doResize () {
        if ( window.innerWidth <= core.config.mobileMediaHack ) {
            this.search[ 0 ].placeholder = this.placeholders.mobile;

        } else {
            this.search[ 0 ].placeholder = this.placeholders.default;
        }
    }


    emptyResults () {
        this.display.find( ".js-search-grid" ).removeClass( "is-active" );
        this.display[ 0 ].innerHTML = "";
        // setTimeout(() => {
        //     this.display[ 0 ].innerHTML = "";
        //
        // }, 500 );
    }


    displayResults ( json ) {
        this.display[ 0 ].innerHTML = viewSearchResults( (json || { items: [] }) );
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
        this.tags.removeClass( "is-active" );
    }


    clear () {
        this.search[ 0 ].value = "";
        this.search[ 0 ].focus();
        this.button.removeClass( "is-active" );
    }


    clearTags () {
        this.tags.removeClass( "is-active" );
    }


    fetchTags () {
        return new Promise(( resolve, reject ) => {
            $.ajax({
                url: "/stories/",
                method: "GET",
                dataType: "json",
                data: {
                    format: "json"
                }
            }).then(( response ) => {
                resolve( response );
                this.filters = this.parent.find( ".js-search-filters" );
                this.filters[ 0 ].innerHTML = viewSearchTags( response );
                this.tagsEl = this.filters.find( ".js-tags" );
                this.tags = this.filters.find( ".js-tag" );
                this.bindTags();

            }).catch(( error ) => {
                reject( error );
            });
        });
    }


    fetchTag ( tag ) {
        this.isFetch = true;
        this.loader.addClass( "is-active" );
        this.emptyResults();

        return new Promise(( resolve, reject ) => {
            $.ajax({
                url: "/stories/",
                method: "GET",
                dataType: "json",
                data: {
                    format: "json",
                    tag
                }

            }).then(( response ) => {
                resolve();
                this.handle( response );

            }).catch(( response ) => {
                reject();
                this.handle( response );
            });
        });
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
        this.clearTags();
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
