import $ from "properjs-hobo";
// import * as core from "../../core";
import viewNewsletter from "../../views/newsletter";
import debounce from "properjs-debounce";



class Newsletter {
    constructor ( element, data ) {
        this.element = element;
        this.blockJson = data.blockJson || {
            formId: "5cafe8ab7817f7af88b17a43",
            objectName: "deem--newsletter"
        };
        this.pageId = "5cafe53bb208fcfd8dc661dd";
        this.data = {};
        this.waiting = 300;
        this.validators = {
            email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        };

        this.load().then(() => {
            this.bind();
        });
    }


    load () {
        return new Promise(( resolve ) => {
            this.element[ 0 ].innerHTML = viewNewsletter( this );
            this.fields = this.element.find( ".js-newsletter-field" );
            this.button = this.element.find( ".js-newsletter-btn" );
            resolve();
        });
    }


    bind () {
        this.button.on( "click", () => {
            this.gather();
            this.send();
        });

        this.fields.on( "keyup", debounce(() => {
            this.fields.forEach(( el, i ) => {
                const field = this.fields.eq( i );
                const type = field[ 0 ].type;
                const value = field[ 0 ].value;

                if ( this.validators[ type ] ) {
                    if ( this.validators[ type ].test( value ) || !value ) {
                        field.removeClass( "is-invalid" );

                    } else {
                        field.addClass( "is-invalid" );
                    }
                }
            });

        }, this.waiting ));
    }


    clear () {
        this.data = {};
        this.fields.removeClass( "is-error" ).forEach(( el ) => {
            el.value = "";
        });
    }


    reset () {
        this.element.removeClass( "is-success" );
    }


    getKey () {
        return $.ajax({
            url: "/api/form/FormSubmissionKey",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            dataType: "json"
        });
    }


    sendForm ( key ) {
        return $.ajax({
            url: "/api/form/SaveFormSubmission",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            dataType: "json",
            payload: {
                collectionId: "",
                contentSource: "c",
                form: JSON.stringify( this.data ),
                formId: this.blockJson.formId,
                key,
                objectName: this.blockJson.objectName,
                pageId: this.pageId,
                pagePath: window.location.pathname,
                pageTitle: document.title
            }
        });
    }


    gather () {
        this.data = {};
        this.fields.forEach(( el ) => {
            this.data[ el.name ] = el.value;
        });
    }


    handle ( response ) {
        if ( response && response.errors ) {
            for ( const i in response.errors ) {
                if ( response.errors.hasOwnProperty( i ) ) {
                    this.fields.filter( `[name='${i}']` ).addClass( "is-error" );
                }
            }

        } else {
            this.element.addClass( "is-success" );
        }
    }


    send () {
        this.fields.removeClass( "is-error" );
        this.getKey().then(( json ) => {
            this.sendForm( json.key ).then(( response ) => {
                this.handle( response );

            }).catch(( response ) => {
                this.handle( response );
            });

        }).catch( () => {} );
    }


    destroy () {}
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Newsletter;
