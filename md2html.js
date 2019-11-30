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
<title> __spfa_title__ </title>
<meta charset="utf-8">
</head>
<body>
<h1> __spfa_title__ </h1>
 __spfa_css__ 
 __spfa_body__ 
</body>
</html>`;

var cssSkeleton = `<link rel="stylesheet" type="text/css" href=" __spfa_href__ ">`;

function cssSection(href) {
    return cssSkeleton.replace(/ __spfa_href__ /g, href);
}

function convert(string, title, style) {
    var info = frontMatter(string);
    var ititle = info.attributes.title;
    title = ititle ? ititle : title;
    string = info.body;
    var cssSegs = cssSection("../lib/spfa.css") + "\n";
    cssSegs += cssSection("../lib/" + style + ".css") + "\n";
    var htmlBody = marked(string);

    var page = htmlSkeleton
        .replace(/ __spfa_css__ /g, cssSegs)
        .replace(/ __spfa_body__ /g, htmlBody)
        .replace(/ __spfa_title__ /g, title);
    return page;
}

module.exports.md2html = function(from, to, title, theme) {
    console.log(from);
    var f = files.read(from);
    f = f.toString();
    var data = convert(f, title, theme);
    files.write(to, data, "utf8");
    console.log("Generating " + to);
};
