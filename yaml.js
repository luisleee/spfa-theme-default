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

var fs = require("fs");
var yaml = require("yamljs");

module.exports.read = function read(filename) {
    if (!fs.existsSync(filename)) {
        return null;
    }
    var obj = yaml.load(filename);
    return obj;
};