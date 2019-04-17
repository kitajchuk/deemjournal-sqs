export default ( instance ) => {
    return `
        <div class="annotation">
            <div class="annotation__note">
                ${instance.annotation[ 0 ].outerHTML}
            </div>
            <div class="annotation__text">
                ${instance.text[ 0 ].outerHTML}
            </div>
        </div>
    `;
};
