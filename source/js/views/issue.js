// import $ from "properjs-hobo";



export default ( instance ) => {
    const item = instance.blockJson.product;
    const image = item.items[ 1 ] || item.items[ 0 ];
    const color = window.Y.Squarespace.Template.getTweakValue( "issueModuleColor" );

    return `
        <div class="stack stack--sub js-stack" data-id="${item.id}" id="stack-${item.id}">
            <style class="js-stack-style">
                #stack-${item.id} {
                    @media only screen and ( max-width: 640px ) {
                        background-color: ${color};
                    }
                }
                #stack-${item.id} .stack__fixer {
                    background-color: ${color};
                }
                .is-stack--${item.id} .navi__a {
                    color: #fff;
                }
                .is-stack--${item.id} .navi__a.is-active,
                .is-stack--${item.id}.is-hoverable .navi__a:hover {
                    border-bottom-color: #fff;
                }
                .is-stack--${item.id} ._svg--list,
                .is-stack--${item.id} ._svg--logo {
                    fill: #fff;
                }
            </style>
            <div class="stack__fixer js-stack-fixer"></div>
            <div class="stack__wrap js-stack-wrap">
                <img class="stack__image js-lazy-image" data-img-src="${image.assetUrl}" data-variants="${image.systemDataVariants}" data-original-size="${image.originalSize}" />
                <div class="stack__info">
                    <h4 class="issue__title">${item.title}</h4>
                    <h6 class="issue__desc">${item.excerpt}</h6>
                    <a class="issue__button _button _button--lit" href="${item.fullUrl}">${item.structuredContent.customAddButtonText}</a>
                </div>
            </div>
        </div>
    `;
};
