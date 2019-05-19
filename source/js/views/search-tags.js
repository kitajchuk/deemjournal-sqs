export default ( json ) => {
    const tags = json.collection.tags;

    return `<div class="tags js-tags"><div class="tags__label h6">Browse by tag:</div>${tags.map(( tag ) => {
        return `<div class="tags__tag h6"><span class="js-tag" data-tag="${tag}">${tag}</span></div>`;

    }).join( "" )}</div>`;
};
