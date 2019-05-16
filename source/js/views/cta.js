export default ( instance ) => {

    return `
        <div class="cta cta--static">
            <div class="cta__wrap">
                <div class="cta__button">
                    ${instance.cta[ 0 ].outerHTML}
                </div>
                <div class="cta__text">
                    ${instance.text[ 0 ].outerHTML}
                </div>
            </div>
        </div>
        <div class="cta cta--global">
            <div class="cta__wrap">
                <div class="cta__button js-cta">
                    ${instance.cta[ 0 ].outerHTML}
                </div>
                <div class="cta__text">
                    ${instance.text[ 0 ].outerHTML}
                </div>
            </div>
        </div>
    `;
};
