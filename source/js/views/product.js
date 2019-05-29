export default ( instance ) => {
    const item = instance.data.item;
    const isOutOfStock = (item.structuredContent.variants[ 0 ].qtyInStock === 0);
    const getAttributes = () => {
        const attrs = [];

        for ( const i in item.structuredContent.variants[ 0 ].attributes ) {
            if ( item.structuredContent.variants[ 0 ].attributes.hasOwnProperty( i ) ) {
                attrs.push( `<h6>${item.structuredContent.variants[ 0 ].attributes[ i ]}</h6>` );
            }
        }

        return attrs.join( "" );
    };

    return `
        <div class="p1 ${isOutOfStock ? `is-out-of-stock` : ``}">
            <div class="text-col">
                <div class="p1__title">
                    <h4>${item.isSubscribable ? item.title : (item.excerpt || item.title)}</h4>
                </div>
                <div class="p1__button sqs-row">
                    <div class="_button js-button_" data-block-json="">${item.structuredContent.customAddButtonText}</div>
                    <div class="sqs-block-content">
                        <p class="h6">$${item.structuredContent.variants[ 0 ].priceMoney.value}</p>
                    </div>
                </div>
                <div class="p1__shipping">
                    <h6>Free standard <a href="#" target="_blank">domestic shipping</a></h6>
                </div>
                <div class="p1__attributes">
                    ${getAttributes()}
                </div>
            </div>
            <div class="image-col">
                <div class="media js-media">
                    <div class="media__wrap">
                        <img class="media__node image js-lazy-image" data-img-src="${item.assetUrl}" data-variants="${item.systemDataVariants}" data-original-size="${item.originalSize}" />
                    </div>
                </div>
            </div>
        </div>
        <article data-item-id="${item.id}" class="story js-story">
            <div class="story__blocks">
                ${item.body}
            </div>
        </div>
    `;
};
