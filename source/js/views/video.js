export default ( blockJson, imageJson ) => {
    const url = blockJson.url.replace( /\?.*?$/, "" );
    const path = "https://player.vimeo.com/video/";
    const id = url.split( "/" ).pop();
    const qrs = `?&wmode=opaque&api=1&loop=0&autoplay=1&player_id=${id}`;
    const source = `${path}${id}${qrs}`;
    const aspect = (blockJson.height || 9) / (blockJson.width || 16) * 100;
    const original = `${(blockJson.width || 16)}x${(blockJson.height || 9)}`;
    const svgIcon = require( `../../../blocks/svg-play.block` );

    return `
        <div class="media media--embed">
            <div class="embed js-embed">
                <div class="embed__aspect" style="padding-bottom:${aspect}%;">
                    <iframe id="${id}" class="embed__element js-embed-iframe js-media-node" data-src="${source}" data-original="${original}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                </div>
                <div class="embed__poster embed__overlay js-embed-poster js-lazy-image -cover -text--center" data-img-src="${imageJson.src}?format=${imageJson.imageResolution || 'original'}"></div>
                <div class="embed__playbtn js-embed-playbtn">
                    ${svgIcon}
                </div>
            </div>
            ${blockJson.description ? `
                <div class="media__cap m">${blockJson.description.html}</div>
            ` : ``}
        </div>
    `;
};
