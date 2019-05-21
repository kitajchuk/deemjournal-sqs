export default ( instance ) => {
    const items = instance.data.items;

    return `<div class="grid js-shop-grid">${items.map(( item ) => {
        return `
            <div class="grid__item">
                <a class="grid__link" href="${item.fullUrl}">
                    <img class="grid__image image js-lazy-image" data-img-src="${item.assetUrl}" data-variants="${item.systemDataVariants}" data-original-size="${item.originalSize}" />
                    <div class="grid__title">${item.title}</div>
                </a>
            </div>
        `;

    }).join( "" )}</div>`;
};
