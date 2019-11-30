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
<tile> __spfa_title__ </title>
<meta charset="utf-8">
</head>
<body>
<h1> __spfa_title__ </h1>
 __spfa_css__
 __spfa_body__ 
</body>
</html>`;

var cssSkeleton = `<link rel="stylesheet" type="text/css" href=" __css_href__ ">`;

function cssSection(href) {
    return cssSkeleton.replace(" __spfa_css__ ", href);
}

function convert(string, title, style) {
	var info = frontMatter(string);
	console.log(info);
    var ititle = info.attributes.title;
    title = ititle ? ititle : title;
    string = info.body;
    var cssSegs = cssSection("../lib/spfa.css") + "\n";
    cssSegs += "../lib/" + style + ".css\n";
    var htmlBody = marked(string);

    var page = htmlSkeleton
        .replace(" __spfa_css__ ", cssSegs)
        .replace(" __spfa_body__ ", htmlBody)
        .replace(" __spfa_title__ ", title);
}

//TODO: finish generating

/* var header1 = "<!DOCTYPE html><html><head><title>";
var header2 = "</title>";
var header3 = "<meta charset='utf-8'></head><body>";
var back = "</body></html>";

var cssfront = "<link rel='stylesheet' type='text/css' href='";
var cssback = "'>";

function wrap(front, inner, back) {
    return front + inner + back;
}

function convert(string, title, style) {
    var data = wrap(header1, title, header2);

    data += wrap(cssfront, "../lib/" + "spfa" + ".css", cssback);
    data += wrap(cssfront, "../lib/" + style + ".css", cssback);
    data += wrap(header3, marked(string), back);

    return data;
} */

module.exports.md2html = function(from, to, title, theme) {
    console.log(from);
    var f = files.read(from);
    f = f.toString();
    var data = convert(f, title, theme);
    files.write(to, data, "utf8");
    console.log("Generating " + to);
};
