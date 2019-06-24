import $ from "properjs-hobo";



export default ( instance ) => {
    const item = instance.blockJson.product;
    const image = item.items[ 1 ] || item.items[ 0 ];
    const htmlText = $( instance.productJson.item.body ).find( ".sqs-block-html" )[ 0 ].innerText;
    const color = window.Y.Squarespace.Template.getTweakValue( "issueModuleColor" );

    return `
        <div class="stack stack--sub js-stack js-puppet" id="${item.id}" data-fix="1" data-speed="5">
            <style class="js-stack-style">
                html.is-stack--${item.id} .fixture,
                html.is-stack--${item.id} .header,
                html.is-stack--${item.id} {
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
            <div class="stack__wrap">
                <img class="stack__image js-lazy-image" data-img-src="${image.assetUrl}" data-variants="${image.systemDataVariants}" data-original-size="${image.originalSize}" />
                <div class="stack__info">
                    <h4 class="issue__title">${item.excerpt || item.title}</h4>
                    <h6 class="issue__desc">${htmlText}</h6>
                    <a class="issue__button _button _button--lit" href="${item.fullUrl}">${item.structuredContent.customAddButtonText}</a>
                </div>
            </div>
        </div>
    `;
};
