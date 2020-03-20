'use strict';

var Fs = require("fire-fs");
var Path = require("fire-path");

module.exports = {
    load: function () {
        // 当 package 被正确加载的时候执行
    },

    unload: function () {
        // 当 package 被正确卸载的时候执行
    },

    messages: {
        'editor:build-finished': function (event, target) {
            var root = Path.normalize(target.dest);
            var url = Path.join(root, "main.js");
            Fs.readFile(url, "utf8", function (err, data) {
                if (err) {
                    throw err;
                }

                var newStr =
                "(function () {\n" +
                "    if (typeof window.jsb === 'object') {\n" +
                "        var hotUpdateSearchPaths = localStorage.getItem('HotUpdateSearchPaths');\n" +
                "        if (hotUpdateSearchPaths) {\n" +
                "            var paths = JSON.parse(hotUpdateSearchPaths);\n" +                
                "            jsb.AssetsManager.checkFinish && jsb.AssetsManager.checkFinish(paths[0]);\n" +
                "            jsb.fileUtils.setSearchPaths(paths);\n" +
                "        }\n" +
                "    }\n" +
                "})();\n";
                newStr += data;
                Fs.writeFile(url, newStr, function (error) {
                    if (err) {
                        throw err;
                    }
                    Editor.log("SearchPath updated in built main.js for hot update");
                });
            });
        }
    }
};