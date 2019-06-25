import * as core from "../core";



export default ( json ) => {
    const story = core.dom.main.find( ".js-story" );
    const items = json.items.filter(( item ) => {
        let ret = true;

        if ( story.length ) {
            ret = (story.data().itemId !== item.id);
        }

        return ret;
    });

    return items.length ? `<div class="grid js-search-grid">${items.map(( item ) => {
        return `
            <div class="grid__item js-lazy-anim">
                <a class="grid__link grid__anim" href="${item.itemUrl || item.fullUrl}">
                    <img class="grid__image image js-lazy-image" data-img-src="${item.imageUrl || item.assetUrl}" data-variants="100w,300w,500w,750w,1000w,1500w,2500w" />
                    <div class="grid__info">
                        <div class="grid__title">${item.title}${item.customContent && item.customContent.ctaTextValue ? `, <span>${item.customContent.ctaTextValue}</span>` : ``}</div>
                    </div>
                </a>
            </div>
        `;

    }).join( "" )}</div>` : `<div class="grid js-search-grid"><div class="grid__item"><p class="-grey">no results</p></div></div>`;
};
