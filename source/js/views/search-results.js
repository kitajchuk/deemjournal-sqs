export default ( json ) => {
    const items = json.items;

    return items.length ? `<div class="grid js-search-grid">${items.map(( item ) => {
        return `
            <div class="grid__item">
                <a class="grid__link" href="${item.itemUrl || item.fullUrl}">
                    <img class="grid__image image js-lazy-image" data-img-src="${item.imageUrl || item.assetUrl}" />
                    <div class="grid__title">${item.title}</div>
                </a>
            </div>
        `;

    }).join( "" )}</div>` : `<div class="grid js-search-grid"><div class="grid__item"><p class="-grey">no results</p></div></div>`;
};
