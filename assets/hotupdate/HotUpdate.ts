import { UpdatePanel } from './UpdatePanel';

const jsb = (<any>window).jsb;

// Custom manifest removed the following assets:
// 1. res/raw-assets/2a/2a40e5e7-4c4a-4350-9e5d-76757755cdd2.png
// 2. res/raw-assets/2d/2d86a854-63c4-4b90-8b88-a4328b8526c2.png
// So when custom manifest used, you should be able to find them in downloaded remote assets
var customManifestStr = JSON.stringify({
    "packageUrl": "http://127.0.0.1:5500/remote-assets/",
    "remoteManifestUrl": "http://127.0.0.1:5500/remote-assets/project.manifest",
    "remoteVersionUrl": "http://127.0.0.1:5500/remote-assets/version.manifest",
    "version": "1.0.1",
    "assets": {
        "src/application.js": {
            "size": 5106,
            "md5": "02ab1ca7d9a0d06d3d7d8ab279881b8d"
        },
        "src/chunks/bundle.js": {
            "size": 1935,
            "md5": "783e7dfdcd833123e46754ad439553af"
        },
        "src/cocos-js/cc.js": {
            "size": 5787090,
            "md5": "4ee4ca556b790be41e8b10e55e8c8102"
        },
        "src/cocos-js/glsl1-ad847f02.js": {
            "size": 129117,
            "md5": "768e74b5b88b232b5587d8f8d9517792"
        },
        "src/cocos-js/glsl3-9896e095.js": {
            "size": 144213,
            "md5": "bb81211de1723253e210ee5ca1057702"
        },
        "src/cocos-js/glsl4-fe9122f5.js": {
            "size": 151634,
            "md5": "c8b174876db8c60db7f80e8e7bad9b2f"
        },
        "src/import-map.json": {
            "size": 51,
            "md5": "0a4b903dc20b74fe4a5a977a98b9d094"
        },
        "src/settings.json": {
            "size": 32156,
            "md5": "bf277e8a18555d638c3746fbf2f01a8b"
        },
        "src/system.bundle.js": {
            "size": 19628,
            "md5": "61644e34333c0b0ac77bd7f3085ccf2b"
        },
        "assets/main/config.json": {
            "size": 2243,
            "md5": "57c06265bde1288eb6d4ab0da3e2f187"
        },
        "assets/main/import/08/0897a7610.json": {
            "size": 318,
            "md5": "31d47437140f3bb8e5fab4936a9725f0"
        },
        "assets/main/import/0f/0f4f09600.json": {
            "size": 7842,
            "md5": "e544000e4d8a737575f704f049072b11"
        },
        "assets/main/import/70/700faa17-11a6-46cd-aeb5-d6900bc264f8.json": {
            "size": 69,
            "md5": "1f9cadcf049e884e057ca8cf797d73a1"
        },
        "assets/main/import/9e/9e71ecbc-8d63-45dd-b0e3-26cefa3d07b1.json": {
            "size": 69,
            "md5": "1f9cadcf049e884e057ca8cf797d73a1"
        },
        "assets/main/import/ae/ae4e2188-2b7b-42a9-85e1-8fb987600b04.json": {
            "size": 69,
            "md5": "1f9cadcf049e884e057ca8cf797d73a1"
        },
        "assets/main/import/c1/c1e757ac-f5bb-46ed-b86a-fdabff7aeb55.json": {
            "size": 69,
            "md5": "1f9cadcf049e884e057ca8cf797d73a1"
        },
        "assets/main/import/ed/edd97988-52a3-4312-8671-90a51bb563ae.json": {
            "size": 69,
            "md5": "1f9cadcf049e884e057ca8cf797d73a1"
        },
        "assets/main/import/fd/fd8ec536-a354-4a17-9c74-4f3883c378c8.json": {
            "size": 675,
            "md5": "de4c2079ad4142452051aced1cc11fba"
        },
        "assets/main/index.js": {
            "size": 24117,
            "md5": "a754392fea5b84716cda88fb617ece87"
        },
        "assets/main/native/70/700faa17-11a6-46cd-aeb5-d6900bc264f8.png": {
            "size": 3765,
            "md5": "878e89a0a3e02b13beee9f3274f2ca39"
        },
        "assets/main/native/80/800f94fd-7424-4202-9629-d3ca77f3b72d.manifest": {
            "size": 2941,
            "md5": "10e6dfa38ddbd0932ab036826db3df2b"
        },
        "assets/main/native/9e/9e71ecbc-8d63-45dd-b0e3-26cefa3d07b1.png": {
            "size": 2548,
            "md5": "ae7a04af25e238a5478170759b55a7ba"
        },
        "assets/main/native/ae/ae4e2188-2b7b-42a9-85e1-8fb987600b04.png": {
            "size": 634171,
            "md5": "07b03f7145b75579708ae05ea2a2c029"
        },
        "assets/main/native/c1/c1e757ac-f5bb-46ed-b86a-fdabff7aeb55.png": {
            "size": 18969,
            "md5": "8eaaf03d4497b39525214bf039a11a7d"
        },
        "assets/main/native/ed/edd97988-52a3-4312-8671-90a51bb563ae.png": {
            "size": 1829,
            "md5": "94d761c4626df88053787f17fa09914d"
        },
        "jsb-adapter/jsb-builtin.js": {
            "size": 170818,
            "md5": "15b9314f7a08f365d2fe6651d0c3bf5e"
        },
        "jsb-adapter/jsb-engine.js": {
            "size": 75321,
            "md5": "c1b82d5d33554752739440fe1514e209"
        }
    },
    "searchPaths": []
});

import { _decorator, Component, Node, Label, ProgressBar, Asset, game, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HotUpdate')
export class HotUpdate extends Component {

    @property(UpdatePanel)
    panel: UpdatePanel = <any>null;

    @property(Asset)
    manifestUrl: Asset = <any>null;

    @property(Node)
    updateUI: Node = <any>null;

    private _updating = false;
    private _canRetry = false;
    private _storagePath = '';
    private _am = <any>null;
    private _checkListener = null;
    private _updateListener = null;
    private _failCount = 0;
    private versionCompareHandle = <any>null;

    checkCb(event: any) {
        console.log('Code: ' + event.getEventCode());
        switch (event.getEventCode()) {
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
                this.panel.info.string = 'New version found, please try to update. (' + Math.ceil(this._am.getTotalBytes() / 1024) + 'kb)';
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
    }

    updateCb(event: any) {
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.panel.info.string = 'No local manifest file found, hot update skipped.';
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                this.panel.byteProgress.progress = event.getPercent();
                this.panel.fileProgress.progress = event.getPercentByFile();

                this.panel.fileLabel.string = event.getDownloadedFiles() + ' / ' + event.getTotalFiles();
                this.panel.byteLabel.string = event.getDownloadedBytes() + ' / ' + event.getTotalBytes();
                console.log(this.panel.fileLabel.string, this.panel.byteLabel.string);
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
            localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);

            // audioEngine.stopAll();
            // this.panel.info.string
            // game.restart();
        }
    }

    loadCustomManifest() {
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            var manifest = new jsb.Manifest(customManifestStr, this._storagePath);
            this._am.loadLocalManifest(manifest, this._storagePath);
            this.panel.info.string = 'Using custom manifest';
        }
    }

    retry() {
        if (!this._updating && this._canRetry) {
            this.panel.retryBtn.active = false;
            this._canRetry = false;

            this.panel.info.string = 'Retry failed Assets...';
            this._am.downloadFailedAssets();
        }
    }

    checkUpdate() {
        if (this._updating) {
            this.panel.info.string = 'Checking or updating ...';
            return;
        }
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            var url = this.manifestUrl.nativeUrl;
            this._am.loadLocalManifest(url);
        }
        if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
            this.panel.info.string = 'Failed to load local manifest ...';
            return;
        }
        this._am.setEventCallback(this.checkCb.bind(this));

        this._am.checkUpdate();
        this._updating = true;
    }

    hotUpdate() {
        if (this._am && !this._updating) {
            this._am.setEventCallback(this.updateCb.bind(this));

            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                var url = this.manifestUrl.nativeUrl;
                this._am.loadLocalManifest(url);
            }

            this._failCount = 0;
            this._am.update();
            this.panel.updateBtn.active = false;
            this._updating = true;
        }
    }

    show() {
        if (this.updateUI.active === false) {
            this.updateUI.active = true;
        }
    }

    // use this for initialization
    onLoad() {
        // Hot update is only available in Native build
        if (!jsb) {
            return;
        }
        this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'blackjack-remote-asset');
        console.log('Storage path for remote asset : ' + this._storagePath);

        // Setup your own version compare handler, versionA and B is versions in string
        // if the return value greater than 0, versionA is greater than B,
        // if the return value equals 0, versionA equals to B,
        // if the return value smaller than 0, versionA is smaller than B.
        this.versionCompareHandle = function (versionA: string, versionB: string) {
            console.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
            var vA = versionA.split('.');
            var vB = versionB.split('.');
            for (var i = 0; i < vA.length; ++i) {
                var a = parseInt(vA[i]);
                var b = parseInt(vB[i] || '0');
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
        this._am.setVerifyCallback(function (path: string, asset: any) {
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

        if (sys.os === sys.OS_ANDROID) {
            // Some Android device may slow down the download process when concurrent tasks is too much.
            // The value may not be accurate, please do more test and find what's most suitable for your game.
            this._am.setMaxConcurrentTask(2);
            this.panel.info.string = "Max concurrent tasks count have been limited to 2";
        }

        this.panel.fileProgress.progress = 0;
        this.panel.byteProgress.progress = 0;
    }

    onDestroy() {
        if (this._updateListener) {
            this._am.setEventCallback(null);
            this._updateListener = null;
        }
    }
}
