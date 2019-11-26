/**
 *
 * @public
 * @module util
 * @description Houses app-wide utility methods.
 *
 */


import $ from "properjs-hobo";
import ImageLoader from "properjs-imageloader";
import dom from "./dom";
// import env from "./env";
import config from "./config";
import detect from "./detect";



/**
 *
 * @description Add pixel units when inline styling
 * @method px
 * @param {string} str The value to pixel-ify
 * @memberof util
 * @returns {string}
 *
 */
const px = function ( str ) {
    return `${str}px`;
};


/**
 *
 * @description Apply a translate3d transform
 * @method translate3d
 * @param {object} el The element to transform
 * @param {string|number} x The x value
 * @param {string|number} y The y value
 * @param {string|number} z The z value
 * @memberof util
 *
 */
const translate3d = function ( el, x, y, z ) {
    el.style[ detect.getPrefixed( "transform" ) ] = `translate3d( ${x}, ${y}, ${z} )`;
};


/**
 *
 * @description Module onImageLoadHander method, handles event
 * @method isElementLoadable
 * @param {object} el The DOMElement to check the offset of
 * @memberof core.util
 * @returns {boolean}
 *
 */
const isElementLoadable = function ( el ) {
    let ret = false;

    if ( el ) {
        const bounds = el.getBoundingClientRect();

        ret = ( bounds.top < (window.innerHeight * 2) );
    }

    return ret;
};


/**
 *
 * @description Module isElementVisible method, handles element boundaries
 * @method isElementVisible
 * @param {object} el The DOMElement to check the offsets of
 * @memberof core.util
 * @returns {boolean}
 *
 */
const isElementVisible = function ( el ) {
    let ret = false;

    if ( el ) {
        const bounds = el.getBoundingClientRect();

        ret = ( bounds.top < window.innerHeight && bounds.bottom > 0 );
    }

    return ret;
};


/**
 *
 * @method getClosestValue
 * @memberof util
 * @param {array} arr The array to process
 * @param {number} closestTo The number to get close to
 * @description Get closest number value without going under
 * @returns {number}
 *
 */
const getClosestValue = function ( arr, closestTo ) {
    // Get the highest number in arr in case it matches nothing.
    let close = Math.max.apply( null, arr );
    let i = arr.length;

    for ( i; i--; ) {
        // Check if it's higher than your number, but lower than your closest value
        if ( arr[ i ] >= closestTo && arr[ i ] < close ) {
            close = arr[ i ];
        }
    }

    return close;
};


const getElementsInView = function ( $nodes ) {
    let i = $nodes.length;
    const $ret = $( [] );

    for ( i; i--; ) {
        if ( isElementVisible( $nodes[ i ] ) ) {
            $ret.push( $nodes[ i ] );
        }
    }

    return $ret;
};


const preDetermineImageAspect = ( image, data ) => {
    const dims = getOriginalDims( data.originalSize );
    const ratio = dims.height / dims.width * 100;

    if ( ratio > 100 ) {
        image.addClass( "image--tall" ).closest( ".js-media" ).addClass( "media--tall" );

    } else if ( ratio >= 75 ) {
        image.addClass( "image--box" );

    } else {
        image.addClass( "image--wide" );
    }

    image[ 0 ].style.paddingBottom = `${ratio}%`;

    // if ( env.isDev() ) {
    //     image[ 0 ].style.backgroundColor = `black`;
    // }
};


const preDetermineImageVariant = ( image, data ) => {
    const vars = data.variants.split( "," ).map(( vnt ) => {
        return parseInt( vnt, 10 );
    });
    const source = data.imgSrc.replace( /\?(.*)$/, "" );
    const width = (image[ 0 ].clientWidth || image[ 0 ].parentNode.clientWidth || window.innerWidth);
    let variant = getClosestValue( vars, width );

    // If the pixel density is higher, use a larger image
    if ( window.devicePixelRatio > 1 ) {
        // Splice off the variant that was matched
        vars.splice( vars.indexOf( variant ), 1 );

        // Apply the new, larger variant as the format
        variant = getClosestValue( vars, variant );
    }

    image.attr( config.lazyImageAttr, `${source}?format=${variant}w` );
};


/**
 *
 * @description Fresh query to lazyload images on page
 * @method loadImages
 * @param {object} images Optional collection of images to load
 * @param {function} handler Optional handler for load conditions
 * @memberof util
 * @returns {instance}
 *
 */
const loadImages = function ( images, handler ) {
    // Normalize the handler
    handler = (handler || isElementLoadable);

    // Normalize the images
    images = (images || dom.main.find( config.lazyImageSelector ));

    images.forEach(( el, i ) => {
        const image = images.eq( i );
        const data = image.data();

        // aspect
        if ( data.originalSize ) {
            preDetermineImageAspect( image, data );
        }

        // Source width from image, parent or Window
        // http://developers.squarespace.com/using-the-imageloader/
        // {original/2500w, 1500w, 1000w, 750w, 500w, 300w, 100w}
        if ( data.variants ) {
            preDetermineImageVariant( image, data );
        }
    });

    return new ImageLoader({
        elements: images,
        property: config.lazyImageAttr,
        executor: handler

    }).on( "load", ( el ) => {
        el.style.paddingBottom = `0`;
    });
};


/**
 *
 * @description Get the applied transition duration from CSS
 * @method getElementDuration
 * @param {object} el The DOMElement
 * @param {string} key The duration type to get eg `transition` or `animation`
 * @memberof util
 * @returns {number}
 *
 */
const getElementDuration = function ( el, key ) {
    let ret = 0;
    let duration = null;
    let isSeconds = false;
    let multiplyBy = 1000;

    key = key || "transition";

    if ( el ) {
        duration = getComputedStyle( el )[ detect.getPrefixed( `${key}-duration` ) ];
        isSeconds = duration.indexOf( "ms" ) === -1;
        multiplyBy = isSeconds ? 1000 : 1;

        ret = parseFloat( duration ) * multiplyBy;
    }

    return ret;
};


/**
 *
 * @description All true all the time
 * @method noop
 * @memberof util
 * @returns {boolean}
 *
 */
const noop = function () {
    return true;
};


/**
 *
 * @public
 * @method getOriginalDims
 * @memberof util
 * @param {string} original The original image dims
 * @description Get an object reference to original dims.
 *              Format: "1600x1600"
 * @returns {object}
 *
 */
const getOriginalDims = function ( original ) {
    const dims = original.split( "x" );

    return {
        width: parseInt( dims[ 0 ], 10 ),
        height: parseInt( dims[ 1 ], 10 )
    };
};


/**
 *
 * @description Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 * @method shuffle
 * @param {object} arr The array to shuffle
 * @memberof core.util
 * @returns {array}
 *
 */
const shuffle = function ( arr ) {
    let i = arr.length - 1;
    let j = 0;
    let temp = arr[ i ];

    for ( i; i > 0; i-- ) {
        j = Math.floor( Math.random() * (i + 1) );
        temp = arr[ i ];

        arr[ i ] = arr[ j ];
        arr[ j ] = temp;
    }

    return arr;
};


const formatTime = ( time ) => {
    const minutes = parseInt( time / (1000 * 60), 10 );
    let seconds = parseInt( time / 1000, 10) % 60;

    if ( seconds < 10 ) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
};


/**
 *
 * Get 2D collision
 * Now `getBoundingClientRect` has x / y properties which mirror top / left
 * @method rectsCollide
 * @param {object} rect1 The client Rect
 * @param {object} rect2 The other client Rect
 * @memberof util
 * @returns {object}
 *
 */
const rectsCollide = ( rect1, rect2 ) => {
    let ret = false;

    if ( rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y ) {
        // collision detected!
        ret = true;
    }

    return ret;
};


/**
 *
 * @method getDefaultHammerOptions
 * @memberof core.util
 * @description The default options for Hammer JS.
 *              Disables cssProps for non-touch experiences.
 * @returns {object}
 *
 */
const getDefaultHammerOptions = () => {
    return detect.isDevice() ? {} : {
        cssProps: {
            contentZoomingString: false,
            tapHighlightColorString: false,
            touchCalloutString: false,
            touchSelectString: false,
            userDragString: false,
            userSelectString: false
        }
    };
};



/******************************************************************************
 * Export
*******************************************************************************/
export {
    px,
    noop,
    shuffle,
    loadImages,
    formatTime,
    translate3d,
    rectsCollide,
    isElementLoadable,
    isElementVisible,
    getElementsInView,
    getElementDuration,
    getDefaultHammerOptions
};
