export default ( instance ) => {
    return `
        <div class="tagcloud__label h6">Tags:</div>
        <div class="tagcloud__list h6">
            ${instance.tags.map(( tag ) => {
                return `<a class="tagcloud__link js-tagcloud-link" href="#" data-tag="${tag}"><span>${tag}</span></a><br />`;

            }).join( "" )}
        </div>
    `;
};
