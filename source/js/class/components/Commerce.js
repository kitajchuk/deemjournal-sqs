import * as core from "../../core";
import $ from "properjs-hobo";
import shopView from "../../views/shop";
import productView from "../../views/product";
import Controllers from "../Controllers";
import Store from "../../core/Store";


/*
Y.Squarespace.Commerce:
    COMMERCE_DATE_TIME_FORMAT: "lllLT"
    capitalizeFirst: ƒ (t)
    destroyCommerce: ƒ ()
    dimensionUnit: ƒ ()
    fromPrice: ƒ (t)
    generateSKU: ƒ ()
    generateVariantId: ƒ ()
    getLabelForWorkflowState: ƒ (e)
    getTotalStockRemaining: ƒ (e)
    goToCheckoutPage: ƒ ()
    goToDonatePage: ƒ (t)
    goToGiftCardPage: ƒ (t,n)
    goToSubscriptionPage: ƒ (e)
    hasVariants: ƒ (e)
    initializeCommerce: ƒ ()
    isExpressCheckout: ƒ ()
    isFiniteSubscriptionPlan: ƒ (e)
    isValidUSZip: ƒ (e)
    maxes: ƒ ()
    measurementStandard: ƒ ()
    merchantSubscriptionDetailsString: ƒ (e)
    moneyString: ƒ (e,t)
    normalPrice: ƒ (t)
    onSale: ƒ (e)
    priceString: ƒ (e)
    salePrice: ƒ (t)
    soldOut: ƒ (e)
    summaryFormFieldString: ƒ (t)
    variantFormat: ƒ (t,n)
    variedPrices: ƒ (e)
    weightUnit: ƒ ()
*/


/**
 *
 * @public
 * @global
 * @class Commerce
 * @param {Element} element The element to work with
 * @classdesc Handle sqs Commerce.
 *
 */
class Commerce {
    constructor ( element, data ) {
        this.element = element;
        this.data = data;
        this.shop = this.element.is( ".js-shop" ) ? this.element : [];
        this.product = this.element.is( ".js-product" ) ? this.element : [];
        this.cart = this.element.is( "#sqs-cart-root" ) ? this.element : [];
        this.view = this.shop.length ? shopView : productView;

        this.init();
        this.exec();
        this.bind();
        this.fetchCart().then(( response ) => {
            console.log( "Commerce:fetchCart", response );
        });
    }


    bind () {
        this.element.on( "click", ".js-button_", () => {
            const payload = {
                sku: this.data.item.structuredContent.variants[ 0 ].sku,
                itemId: this.data.item.id,
                quantity: 1,
                additionalFields: null
            };

            this.addCart( payload, () => {
                window.Y.Squarespace.Commerce.goToCheckoutPage();
            });
        });
    }


    exec () {
        this.controllers = new Controllers({
            el: this.element
        });
        this.controllers.exec();
    }


    init () {
        if ( this.cart.length ) {
            window.Squarespace.initializeCartPage( window.Y );

        } else {
            window.Squarespace.initializeCommerce( window.Y );
            this.element[ 0 ].innerHTML = this.view( this );
        }
    }


    fetchCart () {
        return $.ajax({
            url: `/api/commerce/shopping-cart/?crumb=${Store.crumb}`,
            method: "GET",
            dataType: "json"
        });
    }


    addCart ( payload, callback ) {
        $.ajax({
            url: `/api/commerce/shopping-cart/entries/?crumb=${Store.crumb}`,
            payload: payload,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            dataType: "json"
        })
        .then(( json ) => {
            if ( json.crumbFail ) {
                Store.crumb = json.crumb;
                core.log( "warn", "Crumb fail. Trying again." );
                this.addCart( payload, callback );

            } else if ( callback ) {
                callback();
            }
        })
        .catch(( error ) => {
            core.log( "warn", error );
        });
    }


    destroy () {
        this.controllers.destroy();
    }
}



/******************************************************************************
 * Export
*******************************************************************************/
export default Commerce;
