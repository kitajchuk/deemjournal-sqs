import $ from "properjs-hobo";
// import * as core from "../../core";
import viewSearch from "../../views/search";
import Store from "../../core/Store";



class Search {
    constructor ( element ) {
        this.element = element;
        this.data = {};

        this.load().then(() => {
            this.bind();
        });
    }


    load () {
        return new Promise(( resolve ) => {
            this.element[ 0 ].innerHTML = viewSearch();
            this.search = this.element.find( ".js-search-field" );
            this.button = this.element.find( ".js-search-btn" );
            resolve();
        });
    }


    bind () {
        this.button.on( "click", () => {
            this.fetch();
        });
    }


    clear () {
        this.search[ 0 ].value = "";
    }


    reset () {}


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
                size: 10,
                f_collectionId:	"5caf91b7a4222f77241028dc"
            }
        });
    }


    handle ( response ) {
        console.log( response );
    }


    fetch () {
        this.fetchQuery( this.search[ 0 ].value ).then(( response ) => {
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
