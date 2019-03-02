const fs = require('fs');

function buildHtml(svgList) {
    var header = '<title>SVG Viewer</title><link rel="stylesheet" href="styles.css">';
    return '<!DOCTYPE html>' +
        '<html><head>' + header + '</head><body><div class="svg-list">' + svgList + '</div></body></html>';
};

function getIconItem(svgPath, filename) {
    const iconName = filename.replace('.svg', '');
    return `<div class="icon-item"><div class="svg"><img src="${svgPath}" /></div><div class="name">${iconName}</div></div>`;
}

function generateHtmlFile(html) {
    var fileName = 'svg-viewer.html';
    var stream = fs.createWriteStream(fileName);

    stream.once('open', function (fd) {
        stream.end(html);
    });
}

if (process.argv.length <= 2) {
    console.log(`Usage: ${  __filename  } path/to/directory`);
    process.exit(-1);
}

let svgList = '';
const path = process.argv[2];

fs.readdir(path, (err, items) => {
    for (let i = 0; i < items.length; i++) {
        const iconName = items[i];
        const svgPath = `${path}/${iconName}`;
        const imgTag = getIconItem(svgPath, iconName);
        svgList += imgTag;
    }

    const html = buildHtml(svgList);
    generateHtmlFile(html);
});