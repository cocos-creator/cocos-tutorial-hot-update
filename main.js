(function () {
 
    if (cc.sys.localStorage) {
        var hotUpdateSearchPaths = cc.sys.localStorage.getItem("HotUpdateSearchPaths");
        if (hotUpdateSearchPaths) {
            jsb.fileUtils.setSearchPaths(JSON.parse(hotUpdateSearchPaths));
        }
    }
    cc.director.startAnimation();

    function boot () {
        // retrieve minified raw assets
        var rawAssets = _CCSettings.rawAssets;
        for (var mount in rawAssets) {
            var entries = rawAssets[mount];
            for (var uuid in entries) {
                var entry = entries[uuid];
                if (typeof entry === 'object') {
                    if (Array.isArray(entry)) {
                        entries[uuid] = { url: entry[0], raw: false };
                    }
                }
                else {
                    entries[uuid] = { url: entry, raw: true };
                }
            }
        }

        // init engine
        var canvas, div;
        //var width = 640, height = 480;

        if (cc.sys.isBrowser) {
            canvas = document.getElementById('GameCanvas');
            div = document.getElementById('GameDiv');

            //width = div.clientWidth;
            //height = div.clientHeight;
        }

        var onStart = function () {
            cc.view.resizeWithBrowserSize(true);
            //cc.view.setDesignResolutionSize(_CCSettings.designWidth, _CCSettings.designHeight, cc.ResolutionPolicy.SHOW_ALL);

            // cc.game.pause();

            // init assets
            cc.AssetLibrary.init({
                libraryPath: 'res/import',
                rawAssetsBase: 'res/raw-',
                rawAssets: _CCSettings.rawAssets
            });

            var launchScene = _CCSettings.launchScene;

            // load scene
            cc.director.loadScene(launchScene, null,
                function () {
                    if (cc.sys.isBrowser) {
                        var splash = document.getElementById('splash');
                        splash.style.display = 'none';

                        // show canvas
                        canvas.style.visibility = '';
                        var div = document.getElementById('GameDiv');
                        if (div) {
                            div.style.backgroundImage = '';
                        }
                    }

                    // play game
                    // cc.game.resume();

                    console.log('Success to load scene: ' + launchScene);
                }
            );

            // purge
            //noinspection JSUndeclaredVariable
            _CCSettings = undefined;
        };

        var option;

        if (cc.sys.isNative) {
            var txt = jsb.fileUtils.getStringFromFile("project.json");
            if (!txt) txt = jsb.fileUtils.getStringFromFile("project-runtime.json");
            if (!txt) {
                console.log('Can\'t find project.json');
                option = {};
            }
            else {
                option = JSON.parse(txt);
            }

            option.scenes = _CCSettings.scenes;
        }
        else {
            option = {
                //width: width,
                //height: height,
                id: 'GameCanvas',
                scenes: _CCSettings.scenes
            };
        }

        cc.game.run(option, onStart);
    }

    if (cc.sys.isBrowser) {
        window.onload = boot;
    }
    else if (cc.sys.isNative) {
        require('src/settings.js');
        require('src/jsb_polyfill.js');

        boot();
    }

})();
