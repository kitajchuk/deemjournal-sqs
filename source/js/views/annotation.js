export default ( instance ) => {
    return `
        <div class="annotation annotation--${instance.media.length ? `media` : `text`} annotation--${instance.i}">
            <div class="annotation__wrap">
                <div class="annotation__note">
                    ${instance.annotation[ 0 ].outerHTML}
                </div>
                ${instance.media.length ? `
                    <div class="annotation__media">
                        ${instance.media[ 0 ].outerHTML}
                    </div>
                ` : `
                    <div class="annotation__text">
                        ${instance.text[ 0 ].innerHTML}
                    </div>
                `}
            </div>
        </div>
    `;
};
