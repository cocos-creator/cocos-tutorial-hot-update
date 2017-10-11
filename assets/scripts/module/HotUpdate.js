var UpdatePanel = require('../UI/UpdatePanel');

// Custom manifest removed the following assets:
// 1. res/raw-assets/textures/UI/chat/button_orange.png
// 2. res/raw-assets/textures/UI/chat/gb_inputbox.png
// So when custom manifest used, you should be able to find them in downloaded remote assets
var customManifestStr = JSON.stringify({
    "packageUrl": "http://192.168.54.39:5555/tutorial-hot-update/remote-assets/",
    "remoteManifestUrl": "http://192.168.54.39:5555/tutorial-hot-update/remote-assets/project.manifest",
    "remoteVersionUrl": "http://192.168.54.39:5555/tutorial-hot-update/remote-assets/version.manifest",
    "version": "0.9.0",
    "assets": {
        "src/jsb_anysdk.js": {
            "size": 7418,
            "md5": "7551284fcba1c5543c0454526bb8991a"
        },
        "src/jsb_anysdk_constants.js": {
            "size": 21991,
            "md5": "03a1f55f34f9615052326cb5bfb81bda"
        },
        "src/jsb_polyfill.js": {
            "size": 1299956,
            "md5": "92ea2c1c290f0917e9bb6ccf3e267de7"
        },
        "src/project.dev.js": {
            "size": 127995,
            "md5": "ba2914be0bbc107bb3676ca270ebc9f6"
        },
        "src/settings.js": {
            "size": 7101,
            "md5": "4eb850f4da8a26e02c9fe249cd26536a"
        },
        "res/import/02/022a80ab-4cde-42ca-9e04-8a23745cf138.json": {
            "size": 344,
            "md5": "4d23513ea2ea9379adf3c05191f835a5"
        },
        "res/import/11/11c8b27e-29a0-4c2f-ac31-03a2e5793b7c.json": {
            "size": 285,
            "md5": "78c74eb2be3a20b7b67b1db189c7c8d5"
        },
        "res/import/25/25b2a633-f269-42d2-80f8-110e834238eb.json": {
            "size": 281,
            "md5": "5ec2ba2e98247b9c575dafeefce76868"
        },
        "res/import/26/26f1e1b9-a0c6-41a6-a8ff-3102f3cbc784.json": {
            "size": 281,
            "md5": "92249a05b7d0aadadf22fd65afcacc67"
        },
        "res/import/29/29158224-f8dd-4661-a796-1ffab537140e.json": {
            "size": 351,
            "md5": "321e6f519c8e6371949380648b18d5f0"
        },
        "res/import/2e/2e9b2dc0-65b4-44e5-b624-d61da9ee1095.json": {
            "size": 294,
            "md5": "816d6c419f7d68d060ca817207afcde9"
        },
        "res/import/31/31d39d6b-7784-426a-b1bb-370492f0d5f6.json": {
            "size": 278,
            "md5": "58fd44e490fa7467e061ea48a5a5ae1a"
        },
        "res/import/3f/3f7d6f14-8e3f-432c-a537-09c8c7e03b76.json": {
            "size": 8428,
            "md5": "b805b2a3c837d718fde8a2c938a75ecf"
        },
        "res/import/41/41dc20a6-d60a-4f55-854e-860d2ad6348b.json": {
            "size": 279,
            "md5": "143a327b17d121e3aa5713ef2fc2ff8f"
        },
        "res/import/42/42b84506-55b4-4b98-8d2e-b3f8cfe7fbf8.json": {
            "size": 284,
            "md5": "f819ec05d786092e4ec37a1e685b7ea7"
        },
        "res/import/45/45d0f893-f7b7-4c84-8bd9-dd6409ec6de9.json": {
            "size": 283,
            "md5": "f9fdfe798671b31f8b92352aaeb90484"
        },
        "res/import/55/55e0a94a-b236-4c6b-8e0d-322e198e24a3.json": {
            "size": 281,
            "md5": "7744303e8c89fe31c6c40cc59e0d5aa1"
        },
        "res/import/57/5717c77c-65de-4232-9714-b0c663df738d.json": {
            "size": 279,
            "md5": "3b4fe8448300b3db8204c16cb3ad2208"
        },
        "res/import/5a/5a7ed901-bdc1-4823-8b0d-d2db8d4506ea.json": {
            "size": 282,
            "md5": "436998ef69da439176ef33f4aa88278a"
        },
        "res/import/5b/5bfc8b76-5eb6-4cf9-a83a-24a508103512.json": {
            "size": 280,
            "md5": "8c5055627a2364e1e7fbc4384f44c798"
        },
        "res/import/60/6035fac6-5208-4e0b-bea7-62ff9fb1338b.json": {
            "size": 279,
            "md5": "9ba69e76df5bcceb2530c14c2bcfad71"
        },
        "res/import/65/65f8dd44-9c0c-481b-9b78-c219307a0525.json": {
            "size": 277,
            "md5": "a11bd42fb5de91b77e5cbcbefe7566f1"
        },
        "res/import/67/679e44ab-196f-4a53-9cfa-ca9ba7c8ba43.json": {
            "size": 278,
            "md5": "375f6a8d3ad4c7c17dfd7237f2828cbd"
        },
        "res/import/67/67e68bc9-dad5-4ad9-a2d8-7e03d458e32f.json": {
            "size": 350,
            "md5": "536b330599d9053d608a3eaec97531b7"
        },
        "res/import/6b/6b10b986-3d86-4b46-bae1-fad18ce50e5b.json": {
            "size": 5773,
            "md5": "152a2ba56c8d70080bd12fd7e241ab8b"
        },
        "res/import/74/7459fc8e-3723-4d95-8594-ac8eea99f27e.json": {
            "size": 285,
            "md5": "4698aa20689f02f63ceea0ba6ea34623"
        },
        "res/import/7a/7aee1866-01db-41aa-afe9-e4a791def6aa.json": {
            "size": 284,
            "md5": "3f9f4095e7cae5dc91e874300d0a3922"
        },
        "res/import/7d/7d1d4e60-aba2-48e8-85f8-8e328f34e7cc.json": {
            "size": 346,
            "md5": "6860d6b6442599be495011ee1d3e1304"
        },
        "res/import/7d/7de24e84-21bd-434b-8ca2-b031dcbb438e.json": {
            "size": 284,
            "md5": "be94548155488f9a40ca837aa6faa0d1"
        },
        "res/import/88/88e79fd5-96b4-4a77-a1f4-312467171014.json": {
            "size": 353,
            "md5": "d6b30af49554a4ef4442ec6ce744527f"
        },
        "res/import/8a/8a546935-70d4-42d2-a051-8d0e76f28008.json": {
            "size": 51536,
            "md5": "92c08f8766d2210763f205056cbde200"
        },
        "res/import/8a/8af78d65-4b41-4d59-a683-2659ab6904cb.json": {
            "size": 278,
            "md5": "d0df7e4fb5fbad7a2d7b17d64d40229e"
        },
        "res/import/91/913e121b-7770-4593-9a34-f8ca1b3e3b2f.json": {
            "size": 278,
            "md5": "22187ca903a109d1c6adeb02f6035972"
        },
        "res/import/93/935750ee-2a25-4d60-a10f-06b3000e28ab.json": {
            "size": 284,
            "md5": "d58a8b303270f3203bb62fa14d470623"
        },
        "res/import/94/944b1726-c679-48c6-987c-2abb49f9a11e.json": {
            "size": 282,
            "md5": "183dbd381da3382a1ac2f3adbb5aba2c"
        },
        "res/import/a2/a2da79be-fe22-420a-83b5-e37878367b06.json": {
            "size": 288,
            "md5": "68d9cb158a55b174b3c3cb49fe1fba82"
        },
        "res/import/a5/a5856afd-30ff-43e5-93f6-41e8be2d09d1.json": {
            "size": 281,
            "md5": "4c785aa9dd5bbe96560f060a71156f97"
        },
        "res/import/a8/a8b07ccf-1327-4931-b21a-d327cd0e2cdc.json": {
            "size": 289,
            "md5": "75f5f8811d03070d81dff9bd139a78b5"
        },
        "res/import/ac/ac0ee6f1-b6c2-4288-a1a3-78874f5bd5cb.json": {
            "size": 288,
            "md5": "166cb763f85eb5b9e1735fd350b0bf75"
        },
        "res/import/c0/c01466ea-7283-4fce-b615-4ee78c774af0.json": {
            "size": 285,
            "md5": "104b6bb55f5da857fbb8ed70a44b7d9f"
        },
        "res/import/c2/c2d0f392-28fb-47a7-aaf9-af40e75f40d3.json": {
            "size": 279,
            "md5": "b50b5d97b6927c26cdf8ca31c4beb8a9"
        },
        "res/import/ca/ca7dd73d-526a-4c85-9702-eb51e93b9d99.json": {
            "size": 353,
            "md5": "a78b0628aad6d9ab6792d6ee8322055f"
        },
        "res/import/d1/d1933017-c845-492d-aa72-bf71d7b48726.json": {
            "size": 340,
            "md5": "ff385bc93a011f217b4c6e0377a2f9bf"
        },
        "res/import/d5/d58859db-6a64-489b-aa1c-683e5f9a646b.json": {
            "size": 285,
            "md5": "3dcecab01d68022caad82558e5f0b94d"
        },
        "res/import/e4/e4f21e55-ed4f-46f8-b9a1-7ee9775d710c.json": {
            "size": 281,
            "md5": "72f940eabf7a9cc957e7e0ab0a205aad"
        },
        "res/import/e9/e9ec654c-97a2-4787-9325-e6a10375219a.json": {
            "size": 350,
            "md5": "140f529b491009e9d0b4e9e5b64ad3a3"
        },
        "res/import/ef/ef0e92d8-6db3-4e01-a1f0-5988bf72b4ec.json": {
            "size": 277,
            "md5": "317b0c75aa059d3a5f382c190d1ffdb0"
        },
        "res/import/ef/ef287833-459f-4ff4-a43a-7a6ddc8c95a9.json": {
            "size": 278,
            "md5": "c8560de161cca9b30912ce458d3a12a2"
        },
        "res/import/f0/f0048c10-f03e-4c97-b9d3-3506e1d58952.json": {
            "size": 349,
            "md5": "9cce7d772ea5910b267faad5656597cd"
        },
        "res/raw-assets/font/poker_number.png": {
            "size": 24298,
            "md5": "5dc839e4febcbe674ef00459c057a31e"
        },
        "res/raw-assets/project.manifest": {
            "size": 8738,
            "md5": "503559d7da0ebce8d9d3fc7ae24aaf3c"
        },
        "res/raw-assets/sfx/bgm2.mp3": {
            "size": 971644,
            "md5": "b291235f22a5c3e66430a5c4c25c84df"
        },
        "res/raw-assets/sfx/button.mp3": {
            "size": 3179,
            "md5": "91e69bb24ff6173032d04e232c275ad7"
        },
        "res/raw-assets/textures/UI/lobby/bg_changjing.png": {
            "size": 634171,
            "md5": "583bb4dbd4a4078aa306c4fcfb511f31"
        },
        "res/raw-assets/textures/UI/lobby/bg_gold.png": {
            "size": 2406,
            "md5": "2aa8e02bad500178f40f5af802bcf9a1"
        },
        "res/raw-assets/textures/UI/lobby/button_jjc.png": {
            "size": 94313,
            "md5": "17fb5c02c7470d95e84a97b264a54140"
        },
        "res/raw-assets/textures/UI/lobby/button_ksks.png": {
            "size": 82257,
            "md5": "2bb161d732a84fee4af197c89883a94f"
        },
        "res/raw-assets/textures/UI/lobby/button_zbc.png": {
            "size": 91423,
            "md5": "457f3d1bb5c1639a3f24be98e6420c1f"
        },
        "res/raw-assets/textures/UI/lobby/icon_back.png": {
            "size": 2209,
            "md5": "dd6ef4efc8f05eb77a7cbd50b7f0e6c2"
        },
        "res/raw-assets/textures/UI/lobby/icon_diamond.png": {
            "size": 6911,
            "md5": "7123a767755b66ffb65ca37818e35b99"
        },
        "res/raw-assets/textures/UI/lobby/icon_gold_big.png": {
            "size": 6417,
            "md5": "931cda98808c79f0a744da6be0764460"
        },
        "res/raw-assets/textures/UI/lobby/icon_gold_small.png": {
            "size": 3963,
            "md5": "d607637391fe90bd89057cf8b2d9f44f"
        },
        "res/raw-assets/textures/UI/lobby/icon_plus.png": {
            "size": 1530,
            "md5": "99194ee176ac173f78a2a5e1a03dea3a"
        },
        "res/raw-assets/textures/UI/lobby/icon_rule.png": {
            "size": 3840,
            "md5": "22ac7030c2348d7c08a444dddb7498ca"
        },
        "res/raw-assets/textures/UI/lobby/icon_set.png": {
            "size": 4665,
            "md5": "671960aa83d654972f3c42daf1b9e429"
        },
        "res/raw-assets/textures/UI/lobby/trophy_1.png": {
            "size": 11935,
            "md5": "9721c1c30e77661dd0e82888f8009fd5"
        },
        "res/raw-assets/textures/UI/lobby/trophy_2.png": {
            "size": 10982,
            "md5": "fa59b66c80741d535aabc8ad51363cb3"
        },
        "res/raw-assets/textures/UI/lobby/trophy_3.png": {
            "size": 11636,
            "md5": "4c073d3df7fb012f02b7b8636e9e5b04"
        },
        "res/raw-assets/textures/UI/lobby/user-image.png": {
            "size": 25205,
            "md5": "a488f02e3722fe6108cb17d92f94ba47"
        },
        "res/raw-assets/textures/UI/lobby/user-image2.png": {
            "size": 8755,
            "md5": "5e244875f0339e053b511be7f6757407"
        },
        "res/raw-assets/textures/UI/lobby/user-image3.png": {
            "size": 10878,
            "md5": "f5d719456ba026b007b3c411d0671153"
        },
        "res/raw-assets/textures/UI/lobby/user-image4.png": {
            "size": 9638,
            "md5": "6bed0fd7d1221112a99a6fb743a9d615"
        },
        "res/raw-assets/textures/UI/lobby/user-image5.png": {
            "size": 9754,
            "md5": "bd05dd20b2a5d315486cdbde5ee9933c"
        },
        "res/raw-assets/textures/UI/lobby/user-image6.png": {
            "size": 10370,
            "md5": "54120eb972495c03845eaf0d8f25405a"
        },
        "res/raw-assets/textures/UI/new/Stroke_photo.png": {
            "size": 1641,
            "md5": "e0c2c19a572a8a978a68afbd0e34069a"
        },
        "res/raw-assets/textures/UI/new/Stroke_photo_oneself.png": {
            "size": 10422,
            "md5": "cfd3e73de6518b301de7dded4b5ce392"
        },
        "res/raw-assets/textures/UI/new/bg_icon.png": {
            "size": 2711,
            "md5": "bfc16c6854c6e1e0e95130c16266612a"
        },
        "res/raw-assets/textures/UI/new/bg_rankinglist.png": {
            "size": 3765,
            "md5": "b07f8e27ba911157ac7090d82f394cbb"
        },
        "res/raw-assets/textures/UI/new/bg_xiamian.png": {
            "size": 3782,
            "md5": "81d98c57e21e5ebe15a7087660c82c61"
        },
        "res/raw-assets/textures/UI/new/fengexian.png": {
            "size": 15379,
            "md5": "d2ea7c8c18b389b54fe538e9a64a553c"
        },
        "res/raw-assets/textures/UI/new/icon_back.png": {
            "size": 2290,
            "md5": "a96d8745a2878f0e1a26caebeaf55462"
        },
        "res/raw-assets/textures/UI/new/icon_boy.png": {
            "size": 2187,
            "md5": "bf512a3db19ad66fad5a434e8760d2b7"
        },
        "res/raw-assets/textures/UI/new/rankinglist_bg.png": {
            "size": 1627,
            "md5": "f36f0460093a11eb58a76ffdfbdc6164"
        },
        "res/raw-assets/textures/UI/new/rankinglist_title.png": {
            "size": 7380,
            "md5": "fe805c3ec15c0452179d341948952112"
        },
        "res/raw-assets/textures/UI/table/bg_jinbishu.png": {
            "size": 1829,
            "md5": "b07b649a1bdd69bbfa2aa8f923dffa8e"
        },
        "res/raw-assets/textures/UI/user/circle_2.png": {
            "size": 55581,
            "md5": "f213f46f342cecadb0fe2943b1245561"
        },
        "res/raw-internal/image/default_btn_disabled.png": {
            "size": 1256,
            "md5": "ccbd56c4f14890bbc94d17004e501e9f"
        },
        "res/raw-internal/image/default_btn_normal.png": {
            "size": 1243,
            "md5": "ffdc9657918740e0f5d088acaaada3af"
        },
        "res/raw-internal/image/default_btn_pressed.png": {
            "size": 1156,
            "md5": "c1daa456037cc3884aabad81bb91b5cc"
        },
        "res/raw-internal/image/default_progressbar.png": {
            "size": 988,
            "md5": "67b4a8eb285b47bbcd7144512611c0a1"
        },
        "res/raw-internal/image/default_progressbar_bg.png": {
            "size": 996,
            "md5": "feadf32efa5c4557c81045711e5e6211"
        }
    },
    "searchPaths": []
});

cc.Class({
    extends: cc.Component,

    properties: {
        panel: UpdatePanel,
        manifestUrl: cc.RawAsset,
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
        
        cc.eventManager.removeListener(this._checkListener);
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
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
            this._updating = false;
        }

        if (needRestart) {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
            // Prepend the manifest's search path
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this._am.getLocalManifest().getSearchPaths();
            console.log(JSON.stringify(newPaths));
            Array.prototype.unshift(searchPaths, newPaths);
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
            this._am.loadLocalManifest(this.manifestUrl);
        }
        if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
            this.panel.info.string = 'Failed to load local manifest ...';
            return;
        }
        this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
        cc.eventManager.addListener(this._checkListener, 1);

        this._am.checkUpdate();
        this._updating = true;
    },

    hotUpdate: function () {
        if (this._am && !this._updating) {
            this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
            cc.eventManager.addListener(this._updateListener, 1);

            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                this._am.loadLocalManifest(this.manifestUrl);
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
        if (!cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
            this._am.retain();
        }

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
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
        }
        if (this._am && !cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
            this._am.release();
        }
    }
});
