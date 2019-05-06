import $ from "properjs-hobo";



export default ( instance ) => {
    const blockJson = instance.blockJson;
    const svgRight = require( `../../../blocks/svg-right.block` );
    const placeHolder = $( blockJson.description.html );
    const emailField = blockJson.form.parsedFields.find(( field ) => {
        return (field.type === "email");
    });

    return `
        <div class="newsletter__label">
            <h5>${blockJson.title}</h5>
        </div>
        <div class="newsletter__form -exp">
            <div class="newsletter__entry">
                <input type="email" class="newsletter__input inp js-newsletter-field" name="${emailField.id}" placeholder="${placeHolder[ 0 ].innerText}" />
                <button class="newsletter__btn js-newsletter-btn btn">
                    ${svgRight}
                </button>
            </div>
            <div class="newsletter__success">
                ${blockJson.form.parsedSubmissionMessage.html}
            </div>
        </div>
    `;
};
