var UpdatePanel = require('../UI/UpdatePanel');

// Custom manifest removed the following assets:
// 1. res/raw-assets/2a/2a40e5e7-4c4a-4350-9e5d-76757755cdd2.png
// 2. res/raw-assets/2d/2d86a854-63c4-4b90-8b88-a4328b8526c2.png
// So when custom manifest used, you should be able to find them in downloaded remote assets
var customManifestStr = JSON.stringify({
    "packageUrl": "http://192.168.50.220:5555/tutorial-hot-update/remote-assets/",
    "remoteManifestUrl": "http://192.168.50.220:5555/tutorial-hot-update/remote-assets/project.manifest",
    "remoteVersionUrl": "http://192.168.50.220:5555/tutorial-hot-update/remote-assets/version.manifest",
    "version": "1.10",
    "assets": {
        "src/cocos2d-jsb.js": {
            "size": 3341465,
            "md5": "fafdde66bd0a81d1e096799fb8b7af95"
        },
        "src/project.dev.js": {
            "size": 97814,
            "md5": "ed7f5acd411a09d4d298db800b873b00"
        },
        "src/settings.js": {
            "size": 3849,
            "md5": "deb03998a4cfb8f8b468fba8575cb1c9"
        },
        "res/import/03/0379fb962.json": {
            "size": 1107,
            "md5": "d102d0f14ed6b6cb42cc28d88b3b9069"
        },
        "res/import/0c/0cd5de143.json": {
            "size": 80883,
            "md5": "f06347880038a1381043ed505d6f8a9a"
        },
        "res/import/0d/0d756af45.json": {
            "size": 10137,
            "md5": "02dc8b795e79b9fd62e00d4a2c70c8c1"
        },
        "res/import/0d/0dc6a4e59.json": {
            "size": 14970,
            "md5": "a500f696892df6869341dff5f31b1a33"
        },
        "res/import/41/4128b78b-00ae-4d8a-ae35-4e5ca5c5cde9.json": {
            "size": 76,
            "md5": "3f79d93ce8d42b186ecd43d868c8d023"
        },
        "res/import/49/49539cb0-3893-459a-b310-7cc1b7f6d335.json": {
            "size": 72,
            "md5": "8a36388cda7c3773b5bf7a53d8824535"
        },
        "res/import/9e/9e2ae507-fae5-4511-940b-f2e46f81b790.json": {
            "size": 74,
            "md5": "98f6b1d93a4ee3a1f2074be9ce00fbb2"
        },
        "res/raw-assets/0e/0ed8cf6e-8c04-4569-8d17-626a26e1099f.png": {
            "size": 4665,
            "md5": "9e8bf9af30ac7a9ea9d3b72f37a193e1"
        },
        "res/raw-assets/13/137d1ca6-e90c-440b-9fa2-4b9ffff569f7.png": {
            "size": 1627,
            "md5": "75060291e24294abd6a52553fa22317e"
        },
        "res/raw-assets/15/15d5f3f0-f965-4c00-945b-d2c8faee78b6.png": {
            "size": 3840,
            "md5": "cb525edab8063a845e6bd1e9d29b8cde"
        },
        "res/raw-assets/19/19509bb1-dc08-4cbf-ab8f-2460e207265c.png": {
            "size": 9638,
            "md5": "6e159c9cc1b971d3921bc8908071a70b"
        },
        "res/raw-assets/26/26e9a867-3d2f-4981-8a33-82d440de7aff.png": {
            "size": 6417,
            "md5": "5c139729708dd26bd461bcd3e8201823"
        },
        "res/raw-assets/2d/2ddfe005-2129-41d8-aeec-2b1f51f02962.png": {
            "size": 2290,
            "md5": "874dccfd88108a9f0188bda59c5df183"
        },
        "res/raw-assets/34/3459ab36-782c-4c4e-8aef-7280aff8b272.png": {
            "size": 18969,
            "md5": "3a810a636f3779b357e854155eafa4b6"
        },
        "res/raw-assets/36/36b6ea73-ff48-430e-a0c7-0e5e8defe341.png": {
            "size": 2711,
            "md5": "e64625aeb59a1de225e718a7126634ad"
        },
        "res/raw-assets/39/394bac82-54fb-472f-a27f-b5107821bfb8.png": {
            "size": 1641,
            "md5": "049d2201d7d99fc6dbdb017d8d8bd9b8"
        },
        "res/raw-assets/3c/3cedb8b4-8532-4037-a00e-b8d3e0013158.png": {
            "size": 94313,
            "md5": "a2e763866c1bdd6b189be69f3d37eedd"
        },
        "res/raw-assets/41/4128b78b-00ae-4d8a-ae35-4e5ca5c5cde9.manifest": {
            "size": 6358,
            "md5": "c1d18879851e567545ea04bf135a325f"
        },
        "res/raw-assets/49/49539cb0-3893-459a-b310-7cc1b7f6d335.mp3": {
            "size": 971644,
            "md5": "f45ec6666f06b729d8c0461bc89d4b94"
        },
        "res/raw-assets/4e/4e06c7f1-72ac-4e4e-90de-683e16905156.png": {
            "size": 2406,
            "md5": "5f0c28e0eed7ec0cb75e45f5937dd7c6"
        },
        "res/raw-assets/50/50da5486-dfa1-46d2-9d4f-686eb5527c1a.png": {
            "size": 6911,
            "md5": "51cf32529c923146f06019a58398c98d"
        },
        "res/raw-assets/52/5245e25c-010c-45fb-84a3-f3bce95793e7.png": {
            "size": 3963,
            "md5": "0f050ba45e09986b3d785b7b23ffcc1e"
        },
        "res/raw-assets/6d/6de06a23-d0de-4766-a9e1-a0314136d62e.png": {
            "size": 10878,
            "md5": "9f89eec7a1b0f615a3c1bab0857aefff"
        },
        "res/raw-assets/70/700faa17-11a6-46cd-aeb5-d6900bc264f8.png": {
            "size": 3765,
            "md5": "878e89a0a3e02b13beee9f3274f2ca39"
        },
        "res/raw-assets/71/71561142-4c83-4933-afca-cb7a17f67053.png": {
            "size": 1050,
            "md5": "c06a93f5f1a8a1c6edc4fd8b52e96cbf"
        },
        "res/raw-assets/80/8071df9d-029b-40e8-98f3-8eab08dbf6ca.png": {
            "size": 25205,
            "md5": "f688777a92fba11bfe85c3061a4476e5"
        },
        "res/raw-assets/82/82fe58d4-ae13-4806-9a41-2e73902ea811.png": {
            "size": 24298,
            "md5": "b807df8ffcb540f3dd20db75ac95b73b"
        },
        "res/raw-assets/83/83cc2086-d713-47a0-8d86-a8d6068b6258.png": {
            "size": 3782,
            "md5": "9827ce705349caa604e1aba1d53b0fd9"
        },
        "res/raw-assets/96/96e3e293-4e36-426d-a0a6-eb8d025c0d5b.png": {
            "size": 15379,
            "md5": "d6ce47aed38348a1ea0f003fa0063079"
        },
        "res/raw-assets/97/97a6316c-7fcb-4ffe-9045-35625bc6abf6.png": {
            "size": 2187,
            "md5": "f3f41b4c0783a751e561f1b84d91a70b"
        },
        "res/raw-assets/97/97bb9c9c-5568-4419-af04-4ed5a2969a02.png": {
            "size": 10370,
            "md5": "48ab94f1c34b0e9a047297cab1aeabc4"
        },
        "res/raw-assets/99/99170b0b-d210-46f1-b213-7d9e3f23098a.png": {
            "size": 1177,
            "md5": "d1118d133683bb4227d5e60c79c846b7"
        },
        "res/raw-assets/99/99acc716-33df-4c4c-879d-cc3407f0cd8c.png": {
            "size": 9754,
            "md5": "23e7221934021f3fbe6c6a52b023ded8"
        },
        "res/raw-assets/9e/9e2ae507-fae5-4511-940b-f2e46f81b790.mp3": {
            "size": 3179,
            "md5": "90d17b1a25200c90e292d9a3748c9fec"
        },
        "res/raw-assets/ac/ac11439d-3758-49f5-8728-81ed22c1ed96.png": {
            "size": 11935,
            "md5": "c20ae4a74c42b2aed28bb8c9247eb5d5"
        },
        "res/raw-assets/ae/ae4e2188-2b7b-42a9-85e1-8fb987600b04.png": {
            "size": 634171,
            "md5": "07b03f7145b75579708ae05ea2a2c029"
        },
        "res/raw-assets/af/afe329a6-e85e-46a0-98ed-8a34e128907b.png": {
            "size": 2209,
            "md5": "30ae2fe844c7c53f1d00291051230607"
        },
        "res/raw-assets/b2/b2037f34-04ff-4351-b9da-5be4bb557017.png": {
            "size": 1530,
            "md5": "bb96dacb8b09e0443d83462cc7b20095"
        },
        "res/raw-assets/b4/b43ff3c2-02bb-4874-81f7-f2dea6970f18.png": {
            "size": 1114,
            "md5": "83fcc9912e01ae5411c357651fb8b1cf"
        },
        "res/raw-assets/c3/c39ea496-96eb-4dc5-945a-e7c919b77c21.png": {
            "size": 2548,
            "md5": "ae7a04af25e238a5478170759b55a7ba"
        },
        "res/raw-assets/ca/caaaf9ff-5036-4232-a8a7-88b80b2e4c88.png": {
            "size": 1829,
            "md5": "94d761c4626df88053787f17fa09914d"
        },
        "res/raw-assets/ca/cacafa85-d8e9-4716-bcdb-7eba457e409c.png": {
            "size": 7380,
            "md5": "e6bb0f4d041257653f07da2dfe1edd09"
        },
        "res/raw-assets/ce/ce6d2de9-7056-4ba8-a1b1-40b00bb6f469.png": {
            "size": 10982,
            "md5": "52aa0df577edafe11de1cfdb44422895"
        },
        "res/raw-assets/cf/cfef78f1-c8df-49b7-8ed0-4c953ace2621.png": {
            "size": 1140,
            "md5": "a4b5953dffeb145b4b70072d91c4052b"
        },
        "res/raw-assets/d5/d5dfe6a8-eb19-4aae-a74f-83b71eaa57dc.png": {
            "size": 8755,
            "md5": "aeb1055ced334ce20fe030579e187494"
        },
        "res/raw-assets/da/da3e556f-1bce-4c31-87dc-897ea2d788e2.png": {
            "size": 11636,
            "md5": "d81124346c110eb1377f7b56346b31e4"
        },
        "res/raw-assets/e8/e851e89b-faa2-4484-bea6-5c01dd9f06e2.png": {
            "size": 1082,
            "md5": "90cf45d059d0408bec327f66eae5764c"
        },
        "res/raw-assets/ec/ec244ee5-6f1f-4920-9b69-d4df0e78ec2d.png": {
            "size": 55581,
            "md5": "68fdff7430b1b02f3a6e76bea92c6372"
        },
        "res/raw-assets/fc/fccc4d85-6ad4-496d-9b33-ea76e69da132.png": {
            "size": 82257,
            "md5": "df4359cdcb956f52f2e5b4ef777bbb7d"
        }
    },
    "searchPaths": []
});

cc.Class({
    extends: cc.Component,

    properties: {
        panel: UpdatePanel,
        manifestUrl: {
            type: cc.Asset,
            default: null
        },
        updateUI: cc.Node,
        _updating: false,
        _canRetry: false,
        _storagePath: ''
    },

    checkCb: function (event) {
        cc.log('Code: ' + event.getEventCode());
        switch (event.getEventCode())
        {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.panel.info.string = "No local manifest file found, hot update skipped.";
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.panel.info.string = "Fail to download manifest file, hot update skipped.";
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.panel.info.string = "Already up to date with the latest remote version.";
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                this.panel.info.string = 'New version found, please try to update.';
                this.panel.checkBtn.active = false;
                this.panel.fileProgress.progress = 0;
                this.panel.byteProgress.progress = 0;
                break;
            default:
                return;
        }
        
        this._am.setEventCallback(null);
        this._checkListener = null;
        this._updating = false;
    },

    updateCb: function (event) {
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode())
        {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.panel.info.string = 'No local manifest file found, hot update skipped.';
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                this.panel.byteProgress.progress = event.getPercent();
                this.panel.fileProgress.progress = event.getPercentByFile();

                this.panel.fileLabel.string = event.getDownloadedFiles() + ' / ' + event.getTotalFiles();
                this.panel.byteLabel.string = event.getDownloadedBytes() + ' / ' + event.getTotalBytes();

                var msg = event.getMessage();
                if (msg) {
                    this.panel.info.string = 'Updated file: ' + msg;
                    // cc.log(event.getPercent()/100 + '% : ' + msg);
                }
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.panel.info.string = 'Fail to download manifest file, hot update skipped.';
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.panel.info.string = 'Already up to date with the latest remote version.';
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this.panel.info.string = 'Update finished. ' + event.getMessage();
                needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                this.panel.info.string = 'Update failed. ' + event.getMessage();
                this.panel.retryBtn.active = true;
                this._updating = false;
                this._canRetry = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                this.panel.info.string = 'Asset update error: ' + event.getAssetId() + ', ' + event.getMessage();
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                this.panel.info.string = event.getMessage();
                break;
            default:
                break;
        }

        if (failed) {
            this._am.setEventCallback(null);
            this._updateListener = null;
            this._updating = false;
        }

        if (needRestart) {
            this._am.setEventCallback(null);
            this._updateListener = null;
            // Prepend the manifest's search path
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this._am.getLocalManifest().getSearchPaths();
            console.log(JSON.stringify(newPaths));
            Array.prototype.unshift.apply(searchPaths, newPaths);
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);

            cc.audioEngine.stopAll();
            cc.game.restart();
        }
    },

    loadCustomManifest: function () {
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            var manifest = new jsb.Manifest(customManifestStr, this._storagePath);
            this._am.loadLocalManifest(manifest, this._storagePath);
            this.panel.info.string = 'Using custom manifest';
        }
    },
    
    retry: function () {
        if (!this._updating && this._canRetry) {
            this.panel.retryBtn.active = false;
            this._canRetry = false;
            
            this.panel.info.string = 'Retry failed Assets...';
            this._am.downloadFailedAssets();
        }
    },
    
    checkUpdate: function () {
        if (this._updating) {
            this.panel.info.string = 'Checking or updating ...';
            return;
        }
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            // Resolve md5 url
            var url = this.manifestUrl.nativeUrl;
            if (cc.loader.md5Pipe) {
                url = cc.loader.md5Pipe.transformURL(url);
            }
            this._am.loadLocalManifest(url);
        }
        if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
            this.panel.info.string = 'Failed to load local manifest ...';
            return;
        }
        this._am.setEventCallback(this.checkCb.bind(this));

        this._am.checkUpdate();
        this._updating = true;
    },

    hotUpdate: function () {
        if (this._am && !this._updating) {
            this._am.setEventCallback(this.updateCb.bind(this));

            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                // Resolve md5 url
                var url = this.manifestUrl.nativeUrl;
                if (cc.loader.md5Pipe) {
                    url = cc.loader.md5Pipe.transformURL(url);
                }
                this._am.loadLocalManifest(url);
            }

            this._failCount = 0;
            this._am.update();
            this.panel.updateBtn.active = false;
            this._updating = true;
        }
    },
    
    show: function () {
        if (this.updateUI.active === false) {
            this.updateUI.active = true;
        }
    },

    // use this for initialization
    onLoad: function () {
        // Hot update is only available in Native build
        if (!cc.sys.isNative) {
            return;
        }
        this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'blackjack-remote-asset');
        cc.log('Storage path for remote asset : ' + this._storagePath);

        // Setup your own version compare handler, versionA and B is versions in string
        // if the return value greater than 0, versionA is greater than B,
        // if the return value equals 0, versionA equals to B,
        // if the return value smaller than 0, versionA is smaller than B.
        this.versionCompareHandle = function (versionA, versionB) {
            cc.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
            var vA = versionA.split('.');
            var vB = versionB.split('.');
            for (var i = 0; i < vA.length; ++i) {
                var a = parseInt(vA[i]);
                var b = parseInt(vB[i] || 0);
                if (a === b) {
                    continue;
                }
                else {
                    return a - b;
                }
            }
            if (vB.length > vA.length) {
                return -1;
            }
            else {
                return 0;
            }
        };

        // Init with empty manifest url for testing custom manifest
        this._am = new jsb.AssetsManager('', this._storagePath, this.versionCompareHandle);

        var panel = this.panel;
        // Setup the verification callback, but we don't have md5 check function yet, so only print some message
        // Return true if the verification passed, otherwise return false
        this._am.setVerifyCallback(function (path, asset) {
            // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
            var compressed = asset.compressed;
            // Retrieve the correct md5 value.
            var expectedMD5 = asset.md5;
            // asset.path is relative path and path is absolute.
            var relativePath = asset.path;
            // The size of asset file, but this value could be absent.
            var size = asset.size;
            if (compressed) {
                panel.info.string = "Verification passed : " + relativePath;
                return true;
            }
            else {
                panel.info.string = "Verification passed : " + relativePath + ' (' + expectedMD5 + ')';
                return true;
            }
        });

        this.panel.info.string = 'Hot update is ready, please check or directly update.';

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            // Some Android device may slow down the download process when concurrent tasks is too much.
            // The value may not be accurate, please do more test and find what's most suitable for your game.
            this._am.setMaxConcurrentTask(2);
            this.panel.info.string = "Max concurrent tasks count have been limited to 2";
        }
        
        this.panel.fileProgress.progress = 0;
        this.panel.byteProgress.progress = 0;
    },

    onDestroy: function () {
        if (this._updateListener) {
            this._am.setEventCallback(null);
            this._updateListener = null;
        }
    }
});
