import * as core from "../core";
import BaseController from "./controllers/BaseController";
import ImageController from "./controllers/ImageController";
import Newsletter from "./components/Newsletter";
import View from "./components/View";
import Search from "./components/Search";
import Video from "./components/Video";
import Annotation from "./components/Annotation";
import Audio from "./components/Audio";
import Story from "./components/Story";
import Cover from "./components/Cover";
import CTA from "./components/CTA";


/**
 *
 * @public
 * @global
 * @class Controllers
 * @classdesc Handle controller functions.
 * @param {object} options Optional config
 *
 */
class Controllers {
    constructor ( options ) {
        this.element = options.el;
        this.callback = options.cb;
        this.controllers = [];
    }


    push ( id, elements, controller, component ) {
        this.controllers.push({
            id,
            elements,
            instance: null,
            Controller: controller,
            component
        });
    }


    init () {
        this.controllers.forEach(( controller ) => {
            if ( controller.elements.length ) {
                controller.instance = new controller.Controller(
                    controller.elements,
                    controller.component
                );
            }
        });
    }


    kill () {
        this.controllers.forEach(( controller ) => {
            if ( controller.instance ) {
                controller.instance.destroy();
            }
        });

        this.controllers = [];
    }


    exec () {
        this.controllers = [];

        this.push( "view", core.dom.body.find( ".js-view" ), BaseController, View );
        this.push( "newsletter", core.dom.body.find( ".js-newsletter" ), BaseController, Newsletter );
        this.push( "search", core.dom.body.find( ".js-search" ), BaseController, Search );
        this.push( "audio", core.dom.body.find( ".js-audio" ), BaseController, Audio );
        this.push( "story", core.dom.body.find( ".js-story" ), BaseController, Story );
        this.push( "cta", core.dom.body.find( ".js-button_" ), BaseController, CTA );

        // Hinge on Squarespace selectors...
        this.push( "cover", core.dom.body.find( ".sqs-block-spacer:nth-child(1)" ), BaseController, Cover );
        this.push( "video", core.dom.body.find( ".sqs-block-video" ), BaseController, Video );
        this.push( "annotation", core.dom.body.find( ".sqs-layout > .sqs-row > .col > .sqs-row > .col:nth-child(1) > .sqs-block-html:nth-child(1) > .sqs-block-content > blockquote:nth-child(1)" ), BaseController, Annotation );

        this.images = this.element.find( core.config.lazyImageSelector );
        this.imageController = new ImageController( this.images );
        this.imageController.on( "preloaded", () => {
            this.init();

            if ( this.callback ) {
                this.callback();
            }
        });
    }


    destroy () {
        if ( this.imageController ) {
            this.imageController.destroy();
        }

        this.kill();
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Controllers;
