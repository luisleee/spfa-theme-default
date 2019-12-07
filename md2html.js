var marked = require("marked");
var frontMatter = require("front-matter");
var files = require("./files");
var highlight = require("highlight.js");
marked.setOptions({
    highlight: function(code) {
        return highlight.highlightAuto(code).value;
    }
});

const htmlSkeleton = `<!DOCTYPE html>
<html>
<head>
<title><spfa_title></title>
<meta charset="utf-8">
</head>
<body>
<h1><spfa_title></h1>
<spfa_css>
<spfa_body>
</body>
</html>`;

var cssSkeleton = `<link rel="stylesheet" type="text/css" href="<spfa_href>">`;

function cssSection(href) {
    return cssSkeleton.replace(/<spfa_href>/g, href);
}

function convert(string, style) {
    var info = frontMatter(string);
    var title = info.attributes.title;
    title = title ? title : "Untitled";
    string = info.body;
    var cssSegs = cssSection("../lib/spfa.css") + "\n";
    cssSegs += cssSection("../lib/" + style + ".css") + "\n";
    var htmlBody = marked(string);

    var page = htmlSkeleton
        .replace(/<spfa_css>/g, cssSegs)
        .replace(/<spfa_body>/g, htmlBody)
        .replace(/<spfa_title>/g, title);
    return page;
}

module.exports.md2html = function(from, to, theme) {
    var file = files.read(from).toString();
    var data = convert(file, theme);
    files.write(to, data, "utf8");
    console.log("Generating " + to);
};
