export default ( instance ) => {
    console.log( instance );

    return `
        <div class="cover cover--${instance.isImageLeft ? `left` : `right`}">
            <div class="cover__wrap">
                ${instance.isImageLeft ? `
                    <div class="cover__image">
                        ${instance.imageCol[ 0 ].innerHTML}
                    </div>
                    <div class="cover__texts">
                        ${instance.textsCol[ 0 ].innerHTML}
                    </div>
                ` : `
                    <div class="cover__texts">
                        ${instance.textsCol[ 0 ].innerHTML}
                    </div>
                    <div class="cover__image">
                        ${instance.imageCol[ 0 ].innerHTML}
                    </div>
                `}
            </div>
        </div>
    `;
};
