export default ( instance ) => {
    const item = instance.blockJson.product;
    const image = item.items[ 1 ] || item.items[ 0 ];

    return `
        <div class="stack stack--sub js-stack" data-id="${item.id}" id="stack-${item.id}">
            <div class="stack__wrap js-stack-wrap">
                <img class="stack__image js-lazy-image" data-img-src="${image.assetUrl}" data-variants="${image.systemDataVariants}" data-original-size="${image.originalSize}" />
                <div class="stack__info">
                    <h4 class="issue__title">${item.title}</h4>
                    <h6 class="issue__desc">${item.excerpt}</h6>
                    <a class="issue__button _button" href="${item.fullUrl}">${item.structuredContent.customAddButtonText}</a>
                </div>
            </div>
        </div>
    `;
};
