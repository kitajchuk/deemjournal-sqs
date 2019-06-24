export default ( instance ) => {
    const items = instance.data.items.filter(( item ) => {
        return !item.isSubscribable;
    });
    const subItem = instance.data.items.find(( item ) => {
        return item.isSubscribable;
    });
    const isGridView = (items.length >= 3);
    const getGridView = () => {
        return `<div class="grid js-shop-grid">${items.map(( item ) => {
            return `
                <div class="grid__item">
                    <a class="grid__link" href="${item.fullUrl}">
                        <img class="grid__image image js-lazy-image" data-img-src="${item.assetUrl}" data-variants="${item.systemDataVariants}" data-original-size="${item.originalSize}" />
                        <div class="grid__info">
                            <div class="grid__title">
                                ${item.title}, <span>$${item.structuredContent.variants[ 0 ].priceMoney.value.split( "." )[ 0 ]}</span>
                            </div>
                        </div>
                    </a>
                </div>
            `;

        }).join( "" )}</div>`;
    };
    const getStackView = () => {
        return `${items.map(( item ) => {
            const isIssue = (item.tags[ 0 ] === "Issue");

            return `
                <div class="stack">
                    <div class="stack__wrap">
                        <img class="stack__image image js-lazy-image" data-img-src="${item.assetUrl}" data-variants="${item.systemDataVariants}" data-original-size="${item.originalSize}" />
                        <div class="stack__info">
                            <h4>${item.excerpt || item.title}</h4>
                            <a class="h6" href="${item.fullUrl}">${isIssue ? `View Issue` : `Learn More`}</a>
                        </div>
                    </div>
                </div>
            `;

        }).join( "" )}`;
    };

    return `
        ${isGridView ? getGridView() : getStackView()}
        ${subItem ? `
            <div class="stack stack--sub js-stack" id="${subItem.id}">
                <style class="js-stack-style">
                    html.is-stack--${subItem.id} {
                        background-color: ${window.Y.Squarespace.Template.getTweakValue( "subModuleColor" )};
                    }
                    .is-stack--${subItem.id} .navi__a {
                        color: #fff;
                    }
                    .is-stack--${subItem.id} .navi__a.is-active,
                    .is-stack--${subItem.id}.is-hoverable .navi__a:hover {
                        border-bottom-color: #fff;
                    }
                    .is-stack--${subItem.id} ._svg--list,
                    .is-stack--${subItem.id} ._svg--logo {
                        fill: #fff;
                    }
                </style>
                <div class="stack__wrap">
                    <img class="stack__image js-lazy-image" data-img-src="${subItem.assetUrl}" data-variants="${subItem.systemDataVariants}" data-original-size="${subItem.originalSize}" />
                    <div class="stack__info">
                        <h4 class="issue__title">${subItem.title}</h4>
                        <h6 class="issue__desc">${subItem.excerpt}</h6>
                        <a class="issue__button _button _button--lit" href="${subItem.fullUrl}">${subItem.structuredContent.customAddButtonText}</a>
                    </div>
                </div>
            </div>
        ` : ``}
    `;
};
