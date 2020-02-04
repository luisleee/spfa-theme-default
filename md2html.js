// Copyright (C) 2020  李嘉嵘
//
// This file is a part of spfa-theme-default.
//
// spfa-theme-default is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// spfa-theme-default is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with spfa-theme-default.  If not, see <https://www.gnu.org/licenses/>.

////////////////////////////////////////////////////////////////////////

var marked = require("marked");
var frontMatter = require("front-matter");
var files = require("./files");
var highlight = require("highlight.js");
marked.setOptions({
    highlight: function(code) {
        return highlight.highlightAuto(code).value;
    }
});

var htmlSkeleton = `<!DOCTYPE html>
<html>
<head>
<title><spfa_title></title>
<meta charset="utf-8">
<spfa_css>
</head>
<body>
<h1><spfa_title></h1>

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
    var cssSegs = cssSection("../../lib/spfa.css") + "\n";
    cssSegs += cssSection("../../lib/" + style + ".css") + "\n";
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