var files = require("./files");
var md2html = require("./md2html");
var mkindex = require("./mkindex");
var yaml = require("./yaml");

module.exports.gen = function DFGenerate(path) {
    var config = yaml.read(__dirname + "/config.yaml");
    var codeTheme;
    try {
        codeTheme = config.codeTheme ? config.codeTheme : "vs2015";
    } catch (error) {
        console.log("Detected error in config.yaml");
        console.log("Please check the configuration of config.yaml");
        console.log("Using default code-theme (vs2015)");
        codeTheme = "vs2015";
    }
    try {
        files.cpdir(__dirname + "/lib", path + "/public/lib");
    } catch (error) {
        console.error(error.toString());
    }
    files.mkdir(path + "/public");
    files.mkdir(path + "/public/post");
    files.mkdir(path + "/public/lib");

    var postdir = path + "/post";
    var list = files.ls(postdir, ".md");
    var dirLis_ = files.ls(postdir, "");
    var dirLis=[];
    for (let i = 0; i < dirLis_.length; i++) {
        var dirPath=postdir+"/"+dirLis_[i];
        if(files.isDirectory(dirPath)){
            dirLis.push(dirLis_[i]);
        }
    }

    for (let i = 0; i < list.length; i++) {
        var item = list[i];
        var name = item.replace(".md", "");
        if(dirLis.find(name)){
            files.cpdir(postdir+"/"+name,path+"/public/post/"+name);
        }
        md2html.md2html(
            path + "/post/" + item,
            path + "/public/post/" + name + ".html",
            codeTheme
        );
    }

    mkindex.mkindex(path + "/public/index.html", path + "/public/post");
    console.log("generating /public/index.html");
};
