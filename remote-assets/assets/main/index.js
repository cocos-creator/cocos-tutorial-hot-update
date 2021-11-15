System.register("chunks:///_virtual/HotUpdate.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './UpdatePanel.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Asset, Node, _decorator, Component, game, UpdatePanel;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Asset = module.Asset;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      game = module.game;
    }, function (module) {
      UpdatePanel = module.UpdatePanel;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "8ee7ate7OVDEph2ruFCYLQZ", "HotUpdate", undefined);

      const jsb = window.jsb; // Custom manifest removed the following assets:
      // 1. res/raw-assets/2a/2a40e5e7-4c4a-4350-9e5d-76757755cdd2.png
      // 2. res/raw-assets/2d/2d86a854-63c4-4b90-8b88-a4328b8526c2.png
      // So when custom manifest used, you should be able to find them in downloaded remote assets

      var customManifestStr = JSON.stringify({
        "packageUrl": "http://192.168.55.13:5502/remote-assets/",
        "remoteManifestUrl": "http://192.168.55.13:5502/remote-assets/project.manifest",
        "remoteVersionUrl": "http://192.168.55.13:5502/remote-assets/version.manifest",
        "version": "1.0.0",
        "assets": {
          "src/application.js": {
            "size": 5514,
            "md5": "d09753aaed7c55c4566cecf766cbc5c3"
          },
          "src/cocos-js/ammo-instantiated-45eaa448.js": {
            "size": 2318381,
            "md5": "081a863c98742000893bca3bb87c1775"
          },
          "src/cocos-js/cc.js": {
            "size": 1774495,
            "md5": "c4ba032d442580df30778c0369917917"
          },
          "src/cocos-js/wait-for-ammo-instantiation.js": {
            "size": 625,
            "md5": "c9c1bf74589762eca08ae868d216f243"
          },
          "src/import-map.json": {
            "size": 111,
            "md5": "498f3926fc713deab3e0ac6fcbb3d549"
          },
          "src/settings.json": {
            "size": 31619,
            "md5": "f54273c3c1c29dc9040f129ee11db461"
          },
          "src/system.bundle.js": {
            "size": 6275,
            "md5": "3f3f2b5f3725599ff2c8b9801195ee37"
          },
          "assets/main/config.json": {
            "size": 918,
            "md5": "757c93f3908a069aaaa062541715edcf"
          },
          "assets/main/import/08/0897a7610.json": {
            "size": 248,
            "md5": "12b2792f517c08d878378119a80a09cc"
          },
          "assets/main/import/0f/0f4f09600.json": {
            "size": 8090,
            "md5": "755c01fe8bae77adb19e3b21f11e95d7"
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
            "size": 480,
            "md5": "731f44a39ce9377ee6de8ba34edaf039"
          },
          "assets/main/index.js": {
            "size": 12682,
            "md5": "e2fd04611b129a14138444b6207c1ab7"
          },
          "assets/main/native/70/700faa17-11a6-46cd-aeb5-d6900bc264f8.png": {
            "size": 3765,
            "md5": "878e89a0a3e02b13beee9f3274f2ca39"
          },
          "assets/main/native/80/800f94fd-7424-4202-9629-d3ca77f3b72d.manifest": {
            "size": 2808,
            "md5": "507a24062f30709e41e0891ae6a53c7f"
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
            "size": 170485,
            "md5": "f7f79bebbd40822e195af8f099332b0e"
          },
          "jsb-adapter/jsb-engine.js": {
            "size": 140954,
            "md5": "2846deccc21c73b49e8bae51e3d5387a"
          }
        },
        "searchPaths": []
      });
      const {
        ccclass,
        property
      } = _decorator;
      let HotUpdate = exports('HotUpdate', (_dec = ccclass('HotUpdate'), _dec2 = property(UpdatePanel), _dec3 = property(Asset), _dec4 = property(Node), _dec(_class = (_class2 = (_temp = class HotUpdate extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "panel", _descriptor, this);

          _initializerDefineProperty(this, "manifestUrl", _descriptor2, this);

          _initializerDefineProperty(this, "updateUI", _descriptor3, this);

          _defineProperty(this, "_updating", false);

          _defineProperty(this, "_canRetry", false);

          _defineProperty(this, "_storagePath", '');

          _defineProperty(this, "_am", null);

          _defineProperty(this, "_checkListener", null);

          _defineProperty(this, "_updateListener", null);

          _defineProperty(this, "_failCount", 0);

          _defineProperty(this, "versionCompareHandle", null);
        }

        checkCb(event) {
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

        updateCb(event) {
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
                this.panel.info.string = 'Updated file: ' + msg; // cc.log(event.getPercent()/100 + '% : ' + msg);
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
          }

          if (failed) {
            this._am.setEventCallback(null);

            this._updateListener = null;
            this._updating = false;
          }

          if (needRestart) {
            this._am.setEventCallback(null);

            this._updateListener = null; // Prepend the manifest's search path

            var searchPaths = jsb.fileUtils.getSearchPaths();

            var newPaths = this._am.getLocalManifest().getSearchPaths();

            console.log(JSON.stringify(newPaths));
            Array.prototype.unshift.apply(searchPaths, newPaths); // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.

            localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths); // restart game.

            setTimeout(() => {
              game.restart();
            }, 1000);
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
        } // use this for initialization


        onLoad() {
          // Hot update is only available in Native build
          if (!jsb) {
            return;
          }

          this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'blackjack-remote-asset';
          console.log('Storage path for remote asset : ' + this._storagePath); // Setup your own version compare handler, versionA and B is versions in string
          // if the return value greater than 0, versionA is greater than B,
          // if the return value equals 0, versionA equals to B,
          // if the return value smaller than 0, versionA is smaller than B.

          this.versionCompareHandle = function (versionA, versionB) {
            console.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
            var vA = versionA.split('.');
            var vB = versionB.split('.');

            for (var i = 0; i < vA.length; ++i) {
              var a = parseInt(vA[i]);
              var b = parseInt(vB[i] || '0');

              if (a === b) {
                continue;
              } else {
                return a - b;
              }
            }

            if (vB.length > vA.length) {
              return -1;
            } else {
              return 0;
            }
          }; // Init with empty manifest url for testing custom manifest


          this._am = new jsb.AssetsManager('', this._storagePath, this.versionCompareHandle);
          var panel = this.panel; // Setup the verification callback, but we don't have md5 check function yet, so only print some message
          // Return true if the verification passed, otherwise return false

          this._am.setVerifyCallback(function (path, asset) {
            // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
            var compressed = asset.compressed; // Retrieve the correct md5 value.

            var expectedMD5 = asset.md5; // asset.path is relative path and path is absolute.

            var relativePath = asset.path; // The size of asset file, but this value could be absent.

            var size = asset.size;

            if (compressed) {
              panel.info.string = "Verification passed : " + relativePath;
              return true;
            } else {
              panel.info.string = "Verification passed : " + relativePath + ' (' + expectedMD5 + ')';
              return true;
            }
          });

          this.panel.info.string = 'Hot update is ready, please check or directly update.';
          this.panel.fileProgress.progress = 0;
          this.panel.byteProgress.progress = 0;
        }

        onDestroy() {
          if (this._updateListener) {
            this._am.setEventCallback(null);

            this._updateListener = null;
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "panel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "manifestUrl", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "updateUI", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UpdatePanel.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Label, ProgressBar, Node, _decorator, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      ProgressBar = module.ProgressBar;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _temp;

      cclegacy._RF.push({}, "d896fFhBk9A57gLMvEj3KZ7", "UpdatePanel", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let UpdatePanel = exports('UpdatePanel', (_dec = ccclass('UpdatePanel'), _dec2 = property(Label), _dec3 = property(ProgressBar), _dec4 = property(Label), _dec5 = property(ProgressBar), _dec6 = property(Label), _dec7 = property(Node), _dec8 = property(Node), _dec9 = property(Node), _dec10 = property(Node), _dec(_class = (_class2 = (_temp = class UpdatePanel extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "info", _descriptor, this);

          _initializerDefineProperty(this, "fileProgress", _descriptor2, this);

          _initializerDefineProperty(this, "fileLabel", _descriptor3, this);

          _initializerDefineProperty(this, "byteProgress", _descriptor4, this);

          _initializerDefineProperty(this, "byteLabel", _descriptor5, this);

          _initializerDefineProperty(this, "close", _descriptor6, this);

          _initializerDefineProperty(this, "checkBtn", _descriptor7, this);

          _initializerDefineProperty(this, "retryBtn", _descriptor8, this);

          _initializerDefineProperty(this, "updateBtn", _descriptor9, this);
        }

        onLoad() {}

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "info", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "fileProgress", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "fileLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "byteProgress", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "byteLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "close", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "checkBtn", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "retryBtn", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "updateBtn", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./UpdatePanel.ts', './HotUpdate.ts'], function () {
  'use strict';

  return {
    setters: [null, null],
    execute: function () {}
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});