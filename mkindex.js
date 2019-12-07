var files = require("./files");

var htmlSkeleton = `<!DOCTYPE html>
<html>
<head>
<title>Welcome!</title>
<meta charset="utf-8">
<spfa_css>
</head>
<body>
<h1>Welcome!</h1>
<spfa_search>
<spfa_script>
<spfa_link>
</body>
</html>`;
var linkSkeleton = `<p><a href="<spfa_href>"><spfa_name></a><p>`;
var cssSkeleton = `<link rel="stylesheet" type="text/css" href="<spfa_href>">`;
var scriptSkeleton = `<script src="<spfa_src>"></script>`;
function cssSection(href) {
    return cssSkeleton.replace(/<spfa_href>/g, href);
}
function linkSection(href, name) {
    return linkSkeleton
        .replace(/<spfa_href>/g, href)
        .replace(/<spfa_name>/g, name);
}
function scriptSection(src) {
    return scriptSkeleton.replace(/<spfa_src>/g, src);
}
function gen(list) {
    var search = "<input id='search-name' type='text'>\n";
    search += "<button id='search-btn'>go!</button>\n";
    var link="";
    for (var i = 0; i < list.length; i++) {
        var file = list[i];
        var name = file.replace(".html", "");
        var lnk = linkSection("post/" + name + "/index.html",name);
        link += lnk;
    }
    var script = scriptSection("lib/jquery-3.4.1.js");
    script += scriptSection("lib/search.js");
    var css = cssSection("lib/spfa.css");
    var page = htmlSkeleton
        .replace(/<spfa_search>/g, search)
        .replace(/<spfa_link>/g, link)
        .replace(/<spfa_script>/g, script)
        .replace(/<spfa_css>/g, css);

    return page;
}
module.exports.mkindex = function(location, src) {
    var f = files.ls(src, ".html");
    var page = gen(f);
    try {
        files.write(location, page);
    } catch (err) {
        console.error(err.toString());
    }
};
