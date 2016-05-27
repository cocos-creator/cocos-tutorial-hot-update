(function () {

    // 在 main.js 的开头添加如下代码
    if (cc.sys.isNative) {
        var hotUpdateSearchPaths = cc.sys.localStorage.getItem('HotUpdateSearchPaths');
        if (hotUpdateSearchPaths) {
            jsb.fileUtils.setSearchPaths(JSON.parse(hotUpdateSearchPaths));
        }
    }

    function boot () {

        if ( !_CCSettings.debug ) {
            // retrieve minified raw assets
            var rawAssets = _CCSettings.rawAssets;
            var assetTypes = _CCSettings.assetTypes;
            for (var mount in rawAssets) {
                var entries = rawAssets[mount];
                for (var uuid in entries) {
                    var entry = entries[uuid];
                    var type = entry[1];
                    if (typeof type === 'number') {
                        entry[1] = assetTypes[type];
                    }
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

        function setLoadingDisplay () {
            // Loading splash scene
            var splash = document.getElementById('splash');
            var progressBar = splash.querySelector('.progress-bar span');
            var currentResCount = cc.loader.getResCount();
            cc.loader.onProgress = function (completedCount, totalCount, item) {
                var percent = 100 * (completedCount - currentResCount) / (totalCount - currentResCount);
                if (progressBar) {
                    progressBar.style.width = percent.toFixed(2) + '%';
                }
            };
            splash.style.display = 'block';

            cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
                splash.style.display = 'none';
            });
        }

        var onStart = function () {
            cc.view.resizeWithBrowserSize(true);
            // UC browser on many android devices have performance issue with retina display
            if (cc.sys.os !== cc.sys.OS_ANDROID || cc.sys.browserType !== cc.sys.BROWSER_TYPE_UC) {
                cc.view.enableRetina(true);
            }
            //cc.view.setDesignResolutionSize(_CCSettings.designWidth, _CCSettings.designHeight, cc.ResolutionPolicy.SHOW_ALL);
        
            if (cc.sys.isBrowser) {
                setLoadingDisplay();
            }

            if (_CCSettings.orientation === 'landscape') {
                cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
            }
            else if (_CCSettings.orientation === 'portrait') {
                cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
            }

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

        var option = {
            //width: width,
            //height: height,
            id: 'GameCanvas',
            scenes: _CCSettings.scenes,
            debugMode: _CCSettings.debug ? cc.DebugMode.INFO : cc.DebugMode.ERROR,
            showFPS: _CCSettings.debug,
            frameRate: 60,
            jsList: [
                _CCSettings.debug ? 'src/project.dev.js' : 'src/project.js'
            ],
            groupList: _CCSettings.groupList,
            collisionMatrix: _CCSettings.collisionMatrix
        };

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
