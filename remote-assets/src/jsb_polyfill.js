!function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = "function" == typeof require && require;
                if (!u && a) {
                    return a(o, !0);
                }
                if (i) {
                    return i(o, !0);
                }
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f;
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
        }
        return n[o].exports;
    }
    var i = "function" == typeof require && require;
    for (var o = 0; o < r.length; o++) {
        s(r[o]);
    }
    return s;
}({
    1: [ function(require, module, exports) {
        cc._LogInfos = {
            ActionManager: {
                addAction: "cc.ActionManager.addAction(): action must be non-null",
                removeAction: "cocos2d: removeAction: Target not found",
                removeActionByTag: "cc.ActionManager.removeActionByTag(): an invalid tag",
                removeActionByTag_2: "cc.ActionManager.removeActionByTag(): target must be non-null",
                getActionByTag: "cc.ActionManager.getActionByTag(): an invalid tag",
                getActionByTag_2: "cocos2d : getActionByTag(tag = %s): Action not found"
            },
            configuration: {
                dumpInfo: "cocos2d: **** WARNING **** CC_ENABLE_PROFILERS is defined. Disable it when you finish profiling (from ccConfig.js)",
                loadConfigFile: "Expected 'data' dict, but not found. Config file: %s",
                loadConfigFile_2: "Please load the resource first : %s"
            },
            Director: {
                resume: "cocos2d: Director: Error in gettimeofday",
                setProjection: "cocos2d: Director: unrecognized projection",
                popToSceneStackLevel: "cocos2d: Director: unrecognized projection",
                popToSceneStackLevel_2: "cocos2d: Director: Error in gettimeofday",
                popScene: "running scene should not null",
                pushScene: "the scene should not null"
            },
            Array: {
                verifyType: "element type is wrong!"
            },
            deprecated: '"%s" is deprecated, please use "%s" instead.',
            Scheduler: {
                scheduleCallbackForTarget: "CCSheduler#scheduleCallback. Callback already scheduled. Updating interval from:%s to %s",
                scheduleCallbackForTarget_2: "cc.scheduler.scheduleCallbackForTarget(): callback_fn should be non-null.",
                scheduleCallbackForTarget_3: "cc.scheduler.scheduleCallbackForTarget(): target should be non-null.",
                pauseTarget: "cc.Scheduler.pauseTarget():target should be non-null",
                resumeTarget: "cc.Scheduler.resumeTarget():target should be non-null",
                isTargetPaused: "cc.Scheduler.isTargetPaused():target should be non-null"
            },
            Node: {
                getZOrder: "getZOrder is deprecated. Please use getLocalZOrder instead.",
                setZOrder: "setZOrder is deprecated. Please use setLocalZOrder instead.",
                getRotation: "RotationX != RotationY. Don't know which one to return",
                getScale: "ScaleX != ScaleY. Don't know which one to return",
                addChild: "An Node can't be added as a child of itself.",
                addChild_2: "child already added. It can't be added again",
                addChild_3: "child must be non-null",
                removeFromParentAndCleanup: "removeFromParentAndCleanup is deprecated. Use removeFromParent instead",
                boundingBox: "boundingBox is deprecated. Use getBoundingBox instead",
                removeChildByTag: "argument tag is an invalid tag",
                removeChildByTag_2: "cocos2d: removeChildByTag(tag = %s): child not found!",
                removeAllChildrenWithCleanup: "removeAllChildrenWithCleanup is deprecated. Use removeAllChildren instead",
                stopActionByTag: "cc.Node.stopActionBy(): argument tag an invalid tag",
                getActionByTag: "cc.Node.getActionByTag(): argument tag is an invalid tag",
                reumeSchedulerAndActions: "resumeSchedulerAndActions is deprecated, please use resume instead.",
                pauseSchedulerAndActions: "pauseSchedulerAndActions is deprecated, please use pause instead.",
                _arrayMakeObjectsPerformSelector: "Unknown callback function",
                reorderChild: "child must be non-null",
                runAction: "cc.Node.runAction(): action must be non-null",
                schedule: "callback function must be non-null",
                schedule_2: "interval must be positive",
                initWithTexture: "cocos2d: Could not initialize cc.AtlasNode. Invalid Texture.",
                _requestDirtyFlag: "_ccsg.Node._requestDirtyFlag: failed to satisfy the request, key (%s) for flag have already been taken"
            },
            AtlasNode: {
                _updateAtlasValues: "cc.AtlasNode.updateAtlasValues(): Shall be overridden in subclasses",
                _initWithTileFile: "",
                _initWithTexture: "cocos2d: Could not initialize cc.AtlasNode. Invalid Texture."
            },
            _checkEventListenerAvailable: {
                keyboard: "cc._EventListenerKeyboard.checkAvailable(): Invalid EventListenerKeyboard!",
                touchOneByOne: "cc._EventListenerTouchOneByOne.checkAvailable(): Invalid EventListenerTouchOneByOne!",
                touchAllAtOnce: "cc._EventListenerTouchAllAtOnce.checkAvailable(): Invalid EventListenerTouchAllAtOnce!",
                acceleration: "cc._EventListenerAcceleration.checkAvailable(): _onAccelerationEvent must be non-nil"
            },
            EventListener: {
                create: "Invalid parameter."
            },
            __getListenerID: "Don't call this method if the event is for touch.",
            LayerMultiplex: {
                initWithLayers: "parameters should not be ending with null in Javascript",
                switchTo: "Invalid index in MultiplexLayer switchTo message",
                switchToAndReleaseMe: "Invalid index in MultiplexLayer switchTo message",
                addLayer: "cc.Layer.addLayer(): layer should be non-null"
            },
            view: {
                setDesignResolutionSize: "Resolution not valid",
                setDesignResolutionSize_2: "should set resolutionPolicy"
            },
            inputManager: {
                handleTouchesBegin: "The touches is more than MAX_TOUCHES, nUnusedIndex = %s"
            },
            swap: "cc.swap is being modified from original macro, please check usage",
            checkGLErrorDebug: "WebGL error %s",
            spriteFrameAnimationCache: {
                _addAnimationsWithDictionary: "cocos2d: cc.SpriteFrameAnimationCache: No animations were found in provided dictionary.",
                _addAnimationsWithDictionary_2: "cc.SpriteFrameAnimationCache. Invalid animation format",
                addAnimations: "cc.SpriteFrameAnimationCache.addAnimations(): File could not be found",
                _parseVersion1: "cocos2d: cc.SpriteFrameAnimationCache: Animation '%s' found in dictionary without any frames - cannot add to animation cache.",
                _parseVersion1_2: "cocos2d: cc.SpriteFrameAnimationCache: Animation '%s' refers to frame '%s' which is not currently in the cc.SpriteFrameCache. This frame will not be added to the animation.",
                _parseVersion1_3: "cocos2d: cc.SpriteFrameAnimationCache: None of the frames for animation '%s' were found in the cc.SpriteFrameCache. Animation is not being added to the Animation Cache.",
                _parseVersion1_4: "cocos2d: cc.SpriteFrameAnimationCache: An animation in your dictionary refers to a frame which is not in the cc.SpriteFrameCache. Some or all of the frames for the animation '%s' may be missing.",
                _parseVersion2: "cocos2d: CCAnimationCache: Animation '%s' found in dictionary without any frames - cannot add to animation cache.",
                _parseVersion2_2: "cocos2d: cc.SpriteFrameAnimationCache: Animation '%s' refers to frame '%s' which is not currently in the cc.SpriteFrameCache. This frame will not be added to the animation.",
                addAnimations_2: "cc.SpriteFrameAnimationCache.addAnimations(): Invalid texture file name"
            },
            Sprite: {
                reorderChild: "cc.Sprite.reorderChild(): this child is not in children list",
                ignoreAnchorPointForPosition: "cc.Sprite.ignoreAnchorPointForPosition(): it is invalid in cc.Sprite when using SpriteBatchNode",
                setDisplayFrameWithAnimationName: "cc.Sprite.setDisplayFrameWithAnimationName(): Frame not found",
                setDisplayFrameWithAnimationName_2: "cc.Sprite.setDisplayFrameWithAnimationName(): Invalid frame index",
                setDisplayFrame: "setDisplayFrame is deprecated, please use setSpriteFrame instead.",
                _updateBlendFunc: "cc.Sprite._updateBlendFunc(): _updateBlendFunc doesn't work when the sprite is rendered using a cc.CCSpriteBatchNode",
                initWithSpriteFrame: "cc.Sprite.initWithSpriteFrame(): spriteFrame should be non-null",
                initWithSpriteFrameName: "cc.Sprite.initWithSpriteFrameName(): spriteFrameName should be non-null",
                initWithSpriteFrameName1: " is null, please check.",
                initWithFile: "cc.Sprite.initWithFile(): filename should be non-null",
                setDisplayFrameWithAnimationName_3: "cc.Sprite.setDisplayFrameWithAnimationName(): animationName must be non-null",
                reorderChild_2: "cc.Sprite.reorderChild(): child should be non-null",
                addChild: "cc.Sprite.addChild(): cc.Sprite only supports cc.Sprites as children when using cc.SpriteBatchNode",
                addChild_2: "cc.Sprite.addChild(): cc.Sprite only supports a sprite using same texture as children when using cc.SpriteBatchNode",
                addChild_3: "cc.Sprite.addChild(): child should be non-null",
                setTexture: "cc.Sprite.texture setter: Batched sprites should use the same texture as the batchnode",
                updateQuadFromSprite: "cc.SpriteBatchNode.updateQuadFromSprite(): cc.SpriteBatchNode only supports cc.Sprites as children",
                insertQuadFromSprite: "cc.SpriteBatchNode.insertQuadFromSprite(): cc.SpriteBatchNode only supports cc.Sprites as children",
                addChild_4: "cc.SpriteBatchNode.addChild(): cc.SpriteBatchNode only supports cc.Sprites as children",
                addChild_5: "cc.SpriteBatchNode.addChild(): cc.Sprite is not using the same texture",
                initWithTexture: "Sprite.initWithTexture(): Argument must be non-nil ",
                setSpriteFrame: "Invalid spriteFrameName",
                setTexture_2: "Invalid argument: cc.Sprite.texture setter expects a CCTexture2D.",
                updateQuadFromSprite_2: "cc.SpriteBatchNode.updateQuadFromSprite(): sprite should be non-null",
                insertQuadFromSprite_2: "cc.SpriteBatchNode.insertQuadFromSprite(): sprite should be non-null"
            },
            SpriteBatchNode: {
                addSpriteWithoutQuad: "cc.SpriteBatchNode.addQuadFromSprite(): SpriteBatchNode only supports cc.Sprites as children",
                increaseAtlasCapacity: "cocos2d: CCSpriteBatchNode: resizing TextureAtlas capacity from %s to %s.",
                increaseAtlasCapacity_2: "cocos2d: WARNING: Not enough memory to resize the atlas",
                reorderChild: "cc.SpriteBatchNode.addChild(): Child doesn't belong to Sprite",
                removeChild: "cc.SpriteBatchNode.addChild(): sprite batch node should contain the child",
                addSpriteWithoutQuad_2: "cc.SpriteBatchNode.addQuadFromSprite(): child should be non-null",
                reorderChild_2: "cc.SpriteBatchNode.addChild(): child should be non-null",
                updateQuadFromSprite: "cc.SpriteBatchNode.updateQuadFromSprite(): cc.SpriteBatchNode only supports cc.Sprites as children",
                insertQuadFromSprite: "cc.SpriteBatchNode.insertQuadFromSprite(): cc.SpriteBatchNode only supports cc.Sprites as children",
                addChild: "cc.SpriteBatchNode.addChild(): cc.SpriteBatchNode only supports cc.Sprites as children",
                initWithTexture: "Sprite.initWithTexture(): Argument must be non-nil ",
                addChild_2: "cc.Sprite.addChild(): child should be non-null",
                setSpriteFrame: "Invalid spriteFrameName",
                setTexture: "Invalid argument: cc.Sprite texture setter expects a CCTexture2D.",
                updateQuadFromSprite_2: "cc.SpriteBatchNode.updateQuadFromSprite(): sprite should be non-null",
                insertQuadFromSprite_2: "cc.SpriteBatchNode.insertQuadFromSprite(): sprite should be non-null",
                addChild_3: "cc.SpriteBatchNode.addChild(): child should be non-null"
            },
            spriteFrameCache: {
                _getFrameConfig: "cocos2d: WARNING: originalWidth/Height not found on the cc.SpriteFrame. AnchorPoint won't work as expected. Regenrate the .plist",
                addSpriteFrames: "cocos2d: WARNING: an alias with name %s already exists",
                _checkConflict: "cocos2d: WARNING: Sprite frame: %s has already been added by another source, please fix name conflit",
                getSpriteFrame: "cocos2d: cc.SpriteFrameCahce: Frame %s not found",
                _getFrameConfig_2: "Please load the resource first : %s",
                addSpriteFrames_2: "cc.SpriteFrameCache.addSpriteFrames(): plist should be non-null",
                addSpriteFrames_3: "Argument must be non-nil"
            },
            TextureAtlas: {
                initWithFile: "cocos2d: Could not open file: %s",
                insertQuad: "cc.TextureAtlas.insertQuad(): invalid totalQuads",
                initWithTexture: "cc.TextureAtlas.initWithTexture():texture should be non-null",
                updateQuad: "cc.TextureAtlas.updateQuad(): quad should be non-null",
                updateQuad_2: "cc.TextureAtlas.updateQuad(): Invalid index",
                insertQuad_2: "cc.TextureAtlas.insertQuad(): Invalid index",
                insertQuads: "cc.TextureAtlas.insertQuad(): Invalid index + amount",
                insertQuadFromIndex: "cc.TextureAtlas.insertQuadFromIndex(): Invalid newIndex",
                insertQuadFromIndex_2: "cc.TextureAtlas.insertQuadFromIndex(): Invalid fromIndex",
                removeQuadAtIndex: "cc.TextureAtlas.removeQuadAtIndex(): Invalid index",
                removeQuadsAtIndex: "cc.TextureAtlas.removeQuadsAtIndex(): index + amount out of bounds",
                moveQuadsFromIndex: "cc.TextureAtlas.moveQuadsFromIndex(): move is out of bounds",
                moveQuadsFromIndex_2: "cc.TextureAtlas.moveQuadsFromIndex(): Invalid newIndex",
                moveQuadsFromIndex_3: "cc.TextureAtlas.moveQuadsFromIndex(): Invalid oldIndex"
            },
            textureCache: {
                addPVRTCImage: "TextureCache:addPVRTCImage does not support on HTML5",
                addETCImage: "TextureCache:addPVRTCImage does not support on HTML5",
                textureForKey: "textureForKey is deprecated. Please use getTextureForKey instead.",
                addPVRImage: "addPVRImage does not support on HTML5",
                addUIImage: "cocos2d: Couldn't add UIImage in TextureCache",
                dumpCachedTextureInfo: "cocos2d: '%s' id=%s %s x %s",
                dumpCachedTextureInfo_2: "cocos2d: '%s' id= HTMLCanvasElement %s x %s",
                dumpCachedTextureInfo_3: "cocos2d: TextureCache dumpDebugInfo: %s textures, HTMLCanvasElement for %s KB (%s MB)",
                addUIImage_2: "cc.Texture.addUIImage(): image should be non-null",
                invalidKey: "TextureCache: url should be non-null"
            },
            Texture2D: {
                initWithETCFile: "initWithETCFile does not support on HTML5",
                initWithPVRFile: "initWithPVRFile does not support on HTML5",
                initWithPVRTCData: "initWithPVRTCData does not support on HTML5",
                addImage: "cc.Texture.addImage(): path should be non-null",
                initWithImage: "cocos2d: cc.Texture2D. Can't create Texture. UIImage is nil",
                initWithImage_2: "cocos2d: WARNING: Image (%s x %s) is bigger than the supported %s x %s",
                initWithString: "initWithString isn't supported on cocos2d-html5",
                initWithETCFile_2: "initWithETCFile does not support on HTML5",
                initWithPVRFile_2: "initWithPVRFile does not support on HTML5",
                initWithPVRTCData_2: "initWithPVRTCData does not support on HTML5",
                bitsPerPixelForFormat: "bitsPerPixelForFormat: %s, cannot give useful result, it's a illegal pixel format",
                _initPremultipliedATextureWithImage: "cocos2d: cc.Texture2D: Using RGB565 texture since image has no alpha",
                addImage_2: "cc.Texture.addImage(): path should be non-null",
                initWithData: "NSInternalInconsistencyException"
            },
            MissingFile: "Missing file: %s",
            radiansToDegress: "cc.radiansToDegress() should be called cc.radiansToDegrees()",
            RectWidth: "Rect width exceeds maximum margin: %s",
            RectHeight: "Rect height exceeds maximum margin: %s",
            EventManager: {
                addListener: "0 priority is forbidden for fixed priority since it's used for scene graph based priority.",
                removeListeners: "Invalid listener type!",
                setPriority: "Can't set fixed priority with scene graph based listener.",
                addListener_2: "Invalid parameters.",
                addListener_3: "listener must be a cc.EventListener object when adding a fixed priority listener",
                addListener_4: "The listener has been registered, please don't register it again.",
                _forceAddEventListener: "Invalid scene graph priority!",
                _updateListeners: "If program goes here, there should be event in dispatch.",
                _updateListeners_2: "_inDispatch should be 1 here."
            }
        };
        if (false) {
            cc._LogInfos.Editor = {
                Class: {
                    callSuperCtor: "cc.Class will automatically call super constructor of %s, you should not call it manually."
                }
            };
        }
        cc._logToWebPage = function(msg) {
            if (!cc._canvas) {
                return;
            }
            var logList = cc._logList;
            var doc = document;
            if (!logList) {
                var logDiv = doc.createElement("Div");
                var logDivStyle = logDiv.style;
                logDiv.setAttribute("id", "logInfoDiv");
                cc._canvas.parentNode.appendChild(logDiv);
                logDiv.setAttribute("width", "200");
                logDiv.setAttribute("height", cc._canvas.height);
                logDivStyle.zIndex = "99999";
                logDivStyle.position = "absolute";
                logDivStyle.top = "0";
                logDivStyle.left = "0";
                logList = cc._logList = doc.createElement("textarea");
                var logListStyle = logList.style;
                logList.setAttribute("rows", "20");
                logList.setAttribute("cols", "30");
                logList.setAttribute("disabled", true);
                logDiv.appendChild(logList);
                logListStyle.backgroundColor = "transparent";
                logListStyle.borderBottom = "1px solid #cccccc";
                logListStyle.borderRightWidth = "0px";
                logListStyle.borderLeftWidth = "0px";
                logListStyle.borderTopWidth = "0px";
                logListStyle.borderTopStyle = "none";
                logListStyle.borderRightStyle = "none";
                logListStyle.borderLeftStyle = "none";
                logListStyle.padding = "0px";
                logListStyle.margin = 0;
            }
            logList.value = logList.value + msg + "\r\n";
            logList.scrollTop = logList.scrollHeight;
        };
        cc._formatString = function(arg) {
            if (cc.js.isObject(arg)) {
                try {
                    return JSON.stringify(arg);
                } catch (err) {
                    return "";
                }
            } else {
                return arg;
            }
        };
        cc.DebugMode = cc.Enum({
            NONE: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            INFO_FOR_WEB_PAGE: 4,
            WARN_FOR_WEB_PAGE: 5,
            ERROR_FOR_WEB_PAGE: 6
        });
        cc._initDebugSetting = function(mode) {
            if (mode === cc.DebugMode.NONE) {
                return;
            }
            var locLog;
            if (mode > cc.DebugMode.ERROR) {
                locLog = cc._logToWebPage.bind(cc);
                cc.error = function() {
                    locLog("ERROR :  " + cc.formatStr.apply(cc, arguments));
                };
                cc.assert = function(cond, msg) {
                    "use strict";
                    if (!cond && msg) {
                        for (var i = 2; i < arguments.length; i++) {
                            msg = msg.replace(/(%s)|(%d)/, cc._formatString(arguments[i]));
                        }
                        locLog("Assert: " + msg);
                    }
                };
                if (mode !== cc.DebugMode.ERROR_FOR_WEB_PAGE) {
                    cc.warn = function() {
                        locLog("WARN :  " + cc.formatStr.apply(cc, arguments));
                    };
                }
                if (mode === cc.DebugMode.INFO_FOR_WEB_PAGE) {
                    cc.log = cc.info = function() {
                        locLog(cc.formatStr.apply(cc, arguments));
                    };
                }
            } else {
                if (console && console.log.apply) {
                    if (!console.error) {
                        console.error = console.log;
                    }
                    if (!console.warn) {
                        console.warn = console.log;
                    }
                    if (console.error.bind) {
                        cc.error = console.error.bind(console);
                    } else {
                        cc.error = function() {
                            return console.error.apply(console, arguments);
                        };
                    }
                    cc.assert = function(cond, msg) {
                        if (!cond && msg) {
                            for (var i = 2; i < arguments.length; i++) {
                                msg = msg.replace(/(%s)|(%d)/, cc._formatString(arguments[i]));
                            }
                            throw new Error(msg);
                        }
                    };
                    if (mode !== cc.DebugMode.ERROR) {
                        cc.warn = function() {
                            return console.warn.apply(console, arguments);
                        };
                    }
                    if (mode === cc.DebugMode.INFO) {
                        cc.log = function() {
                            return console.log.apply(console, arguments);
                        };
                        cc.info = function() {
                            (console.info || console.log).apply(console, arguments);
                        };
                    }
                }
            }
            cc._throw = function(error) {
                cc.error(error.stack || error);
            };
        };
    }, {} ],
    2: [ function(require, module, exports) {
        var JS = cc.js;
        var Animator = require("./animators").Animator;
        var DynamicAnimCurve = require("./animation-curves").DynamicAnimCurve;
        var SampledAnimCurve = require("./animation-curves").SampledAnimCurve;
        var sampleMotionPaths = require("./motion-path-helper").sampleMotionPaths;
        var EventAnimCurve = require("./animation-curves").EventAnimCurve;
        var EventInfo = require("./animation-curves").EventInfo;
        var WrapModeMask = require("./types").WrapModeMask;
        var binarySearch = require("./binary-search");
        function AnimationAnimator(target, animation) {
            Animator.call(this, target);
            this.animation = animation;
        }
        JS.extend(AnimationAnimator, Animator);
        var p = AnimationAnimator.prototype;
        p.playState = function(state, startTime) {
            if (!state.clip) {
                return;
            }
            if (!state.curveLoaded) {
                initClipData(this.target, state);
            }
            this.playingAnims.push(state);
            state.play();
            if ("number" === typeof startTime) {
                state.time = startTime;
            }
            this.play();
        };
        p.sample = function() {
            var anims = this.playingAnims;
            for (var i = 0; i < anims.length; i++) {
                var anim = anims[i];
                anim.sample();
            }
        };
        p.stopState = function(state) {
            if (JS.array.remove(this.playingAnims, state)) {
                state.stop();
            }
        };
        p.pauseState = function(state) {
            if (state) {
                state.pause();
            }
        };
        p.resumeState = function(state) {
            if (state) {
                state.resume();
            }
            if (this.isPaused) {
                this.resume();
            }
        };
        p.setStateTime = function(state, time) {
            if (state) {
                state.setTime(time);
            }
        };
        p.onStop = function() {
            var anims = this.playingAnims;
            for (var i = 0, l = anims.length; i < l; i++) {
                anims[i].stop();
            }
            Animator.prototype.onStop.call(this);
        };
        p.onPause = function() {
            var anims = this.playingAnims;
            for (var i = 0, l = anims.length; i < l; i++) {
                anims[i].pause();
            }
        };
        p.onResume = function() {
            var anims = this.playingAnims;
            for (var i = 0, l = anims.length; i < l; i++) {
                anims[i].resume();
            }
        };
        if (false) {
            p.reloadClip = function(state) {
                initClipData(this.target, state);
            };
        }
        function createBatchedProperty(propPath, firstDotIndex, mainValue, animValue) {
            mainValue = mainValue.clone();
            var nextValue = mainValue;
            var leftIndex = firstDotIndex + 1;
            var rightIndex = propPath.indexOf(".", leftIndex);
            while (-1 !== rightIndex) {
                var nextName = propPath.slice(leftIndex, rightIndex);
                nextValue = nextValue[nextName];
                leftIndex = rightIndex + 1;
                rightIndex = propPath.indexOf(".", leftIndex);
            }
            var lastPropName = propPath.slice(leftIndex);
            nextValue[lastPropName] = animValue;
            return mainValue;
        }
        if (false) {
            cc._Test.createBatchedProperty = createBatchedProperty;
        }
        function splitPropPath(propPath) {
            var array = propPath.split(".");
            array.shift();
            return array.length > 0 ? array : null;
        }
        function initClipData(root, state) {
            var clip = state.clip;
            var curves = state.curves;
            curves.length = 0;
            state.duration = clip.duration;
            state.speed = clip.speed;
            state.wrapMode = clip.wrapMode;
            state.frameRate = clip.sample;
            if ((state.wrapMode & WrapModeMask.Loop) === WrapModeMask.Loop) {
                state.repeatCount = 1 / 0;
            } else {
                state.repeatCount = 1;
            }
            function checkMotionPath(motionPath) {
                if (!Array.isArray(motionPath)) {
                    return false;
                }
                for (var i = 0, l = motionPath.length; i < l; i++) {
                    var controls = motionPath[i];
                    if (!Array.isArray(controls) || 6 !== controls.length) {
                        return false;
                    }
                }
                return true;
            }
            function createPropCurve(target, propPath, keyframes) {
                var curve;
                var isMotionPathProp = target instanceof cc.Node && "position" === propPath;
                var motionPaths = [];
                var curve;
                if (isMotionPathProp) {
                    curve = new SampledAnimCurve();
                } else {
                    curve = new DynamicAnimCurve();
                }
                curve.target = target;
                var propName, propValue;
                var dotIndex = propPath.indexOf(".");
                var hasSubProp = -1 !== dotIndex;
                if (hasSubProp) {
                    propName = propPath.slice(0, dotIndex);
                    propValue = target[propName];
                } else {
                    propName = propPath;
                }
                curve.prop = propName;
                curve.subProps = splitPropPath(propPath);
                for (var j = 0, l = keyframes.length; j < l; j++) {
                    var keyframe = keyframes[j];
                    var ratio = keyframe.frame / state.duration;
                    curve.ratios.push(ratio);
                    if (isMotionPathProp) {
                        var motionPath = keyframe.motionPath;
                        if (motionPath && !checkMotionPath(motionPath)) {
                            cc.error("motion path of target [" + target.name + "] in prop [" + propPath + "] frame [" + j + "] is not valid");
                            motionPath = null;
                        }
                        motionPaths.push(motionPath);
                    }
                    var curveValue = keyframe.value;
                    curve.values.push(curveValue);
                    var curveTypes = keyframe.curve;
                    if (curveTypes) {
                        if ("string" === typeof curveTypes) {
                            curve.types.push(curveTypes);
                            continue;
                        } else {
                            if (Array.isArray(curveTypes)) {
                                if (curveTypes[0] === curveTypes[1] && curveTypes[2] === curveTypes[3]) {
                                    curve.types.push(DynamicAnimCurve.Linear);
                                } else {
                                    curve.types.push(DynamicAnimCurve.Bezier(curveTypes));
                                }
                                continue;
                            }
                        }
                    }
                    curve.types.push(DynamicAnimCurve.Linear);
                }
                if (isMotionPathProp) {
                    sampleMotionPaths(motionPaths, curve, clip.duration, clip.sample);
                }
                return curve;
            }
            function createTargetCurves(target, curveData) {
                var propsData = curveData.props;
                var compsData = curveData.comps;
                if (propsData) {
                    for (var propPath in propsData) {
                        var data = propsData[propPath];
                        var curve = createPropCurve(target, propPath, data);
                        curves.push(curve);
                    }
                }
                if (compsData) {
                    for (var compName in compsData) {
                        var comp = target.getComponent(compName);
                        if (!comp) {
                            continue;
                        }
                        var compData = compsData[compName];
                        for (var propPath in compData) {
                            var data = compData[propPath];
                            var curve = createPropCurve(comp, propPath, data);
                            curves.push(curve);
                        }
                    }
                }
            }
            var events = clip.events;
            if (true && events) {
                var curve;
                for (var i = 0, l = events.length; i < l; i++) {
                    if (!curve) {
                        curve = new EventAnimCurve();
                        curve.target = root;
                        curves.push(curve);
                    }
                    var eventData = events[i];
                    var ratio = eventData.frame / state.duration;
                    var eventInfo;
                    var index = binarySearch(curve.ratios, ratio);
                    if (index >= 0) {
                        eventInfo = curve.events[index];
                    } else {
                        eventInfo = new EventInfo();
                        curve.ratios.push(ratio);
                        curve.events.push(eventInfo);
                    }
                    eventInfo.add(eventData.func, eventData.params);
                }
            }
            var curveData = clip.curveData;
            var childrenCurveDatas = curveData.paths;
            createTargetCurves(root, curveData);
            for (var namePath in childrenCurveDatas) {
                var target = cc.find(namePath, root);
                if (!target) {
                    continue;
                }
                var childCurveDatas = childrenCurveDatas[namePath];
                createTargetCurves(target, childCurveDatas);
            }
        }
        if (false) {
            cc._Test.initClipData = initClipData;
        }
        module.exports = AnimationAnimator;
    }, {
        "./animation-curves": 4,
        "./animators": 7,
        "./binary-search": 9,
        "./motion-path-helper": 12,
        "./types": 14
    } ],
    3: [ function(require, module, exports) {
        var AnimationClip = cc.Class({
            name: "cc.AnimationClip",
            "extends": cc.Asset,
            properties: {
                _duration: {
                    "default": 0,
                    type: "Float"
                },
                duration: {
                    get: function() {
                        return this._duration;
                    }
                },
                sample: {
                    "default": 60
                },
                speed: {
                    "default": 1
                },
                wrapMode: {
                    "default": cc.WrapMode.Normal
                },
                curveData: {
                    "default": {},
                    visible: false
                },
                events: {
                    "default": [],
                    visible: false
                }
            }
        });
        cc.AnimationClip = module.exports = AnimationClip;
    }, {} ],
    4: [ function(require, module, exports) {
        var bezierByTime = require("./bezier").bezierByTime;
        var binarySearch = require("./binary-search");
        var WrapModeMask = require("./types").WrapModeMask;
        function computeRatioByType(ratio, type) {
            if ("string" === typeof type) {
                var func = cc.Easing[type];
                if (func) {
                    ratio = func(ratio);
                } else {
                    cc.error("Can't find easing type [" + type + "]");
                }
            } else {
                if (Array.isArray(type)) {
                    ratio = bezierByTime(type, ratio);
                }
            }
            return ratio;
        }
        var AnimCurve = cc.Class({
            name: "cc.AnimCurve",
            sample: function(time, ratio, animationNode) {},
            onTimeChangedManually: function() {}
        });
        var DynamicAnimCurve = cc.Class({
            name: "cc.DynamicAnimCurve",
            "extends": AnimCurve,
            properties: {
                target: null,
                prop: "",
                values: [],
                ratios: [],
                types: [],
                subProps: null
            },
            _calcValue: function(frameIndex, ratio) {
                var values = this.values;
                var fromVal = values[frameIndex - 1];
                var toVal = values[frameIndex];
                var value;
                if ("number" === typeof fromVal) {
                    value = fromVal + (toVal - fromVal) * ratio;
                } else {
                    var lerp = fromVal.lerp;
                    if (lerp) {
                        value = fromVal.lerp(toVal, ratio);
                    } else {
                        value = fromVal;
                    }
                }
                return value;
            },
            _applyValue: function(target, prop, value) {
                target[prop] = value;
            },
            _findFrameIndex: binarySearch,
            sample: function(time, ratio, animationNode) {
                var values = this.values;
                var ratios = this.ratios;
                var frameCount = ratios.length;
                if (0 === frameCount) {
                    return;
                }
                var value;
                var index = this._findFrameIndex(ratios, ratio);
                if (index < 0) {
                    index = ~index;
                    if (index <= 0) {
                        value = values[0];
                    } else {
                        if (index >= frameCount) {
                            value = values[frameCount - 1];
                        } else {
                            var fromRatio = ratios[index - 1];
                            var toRatio = ratios[index];
                            var type = this.types[index - 1];
                            var ratioBetweenFrames = (ratio - fromRatio) / (toRatio - fromRatio);
                            ratioBetweenFrames = computeRatioByType(ratioBetweenFrames, type);
                            value = this._calcValue(index, ratioBetweenFrames);
                        }
                    }
                } else {
                    value = values[index];
                }
                var subProps = this.subProps;
                if (subProps) {
                    var mainProp = this.target[this.prop];
                    var subProp = mainProp;
                    for (var i = 0; i < subProps.length - 1; i++) {
                        var subPropName = subProps[i];
                        if (subProp) {
                            subProp = subProp[subPropName];
                        } else {
                            return;
                        }
                    }
                    var propName = subProps[subProps.length - 1];
                    if (subProp) {
                        this._applyValue(subProp, propName, value);
                    } else {
                        return;
                    }
                    value = mainProp;
                }
                this._applyValue(this.target, this.prop, value);
            }
        });
        DynamicAnimCurve.Linear = null;
        DynamicAnimCurve.Bezier = function(controlPoints) {
            return controlPoints;
        };
        var SampledAnimCurve = cc.Class({
            name: "cc.SampledAnimCurve",
            "extends": DynamicAnimCurve,
            _findFrameIndex: function(ratios, ratio) {
                var length = ratios.length - 1;
                if (0 === length) {
                    return 0;
                }
                var start = ratios[0];
                if (ratio < start) {
                    return 0;
                }
                var end = ratios[length];
                if (ratio > end) {
                    return length;
                }
                ratio = (ratio - start) / (end - start);
                var eachLength = 1 / length;
                var index = ratio / eachLength;
                var floorIndex = 0 | index;
                var EPSILON = 1e-6;
                if (index - floorIndex < EPSILON) {
                    return floorIndex;
                }
                return ~(floorIndex + 1);
            }
        });
        var EventInfo = function() {
            this.events = [];
        };
        EventInfo.prototype.add = function(func, params) {
            this.events.push({
                func: func || "",
                params: params || []
            });
        };
        var EventAnimCurve = cc.Class({
            name: "cc.EventAnimCurve",
            "extends": AnimCurve,
            properties: {
                target: null,
                ratios: [],
                events: [],
                _lastWrappedInfo: null
            },
            _wrapIterations: function(iterations) {
                if (iterations - (0 | iterations) === 0) {
                    iterations -= 1;
                }
                return 0 | iterations;
            },
            sample: function(time, ratio, animationNode) {
                var length = this.ratios.length;
                var currentWrappedInfo = animationNode.getWrappedInfo(animationNode.time);
                var direction = currentWrappedInfo.direction;
                var currentIndex = binarySearch(this.ratios, currentWrappedInfo.ratio);
                if (currentIndex < 0) {
                    currentIndex = ~currentIndex - 1;
                    if (direction < 0) {
                        currentIndex += 1;
                    }
                }
                var lastWrappedInfo = this._lastWrappedInfo;
                currentWrappedInfo.frameIndex = currentIndex;
                this._lastWrappedInfo = currentWrappedInfo;
                if (!lastWrappedInfo) {
                    this._fireEvent(currentIndex);
                    return;
                }
                var lastIndex = lastWrappedInfo.frameIndex;
                var wrapMode = animationNode.wrapMode;
                var currentIterations = this._wrapIterations(currentWrappedInfo.iterations);
                var lastIterations = this._wrapIterations(lastWrappedInfo.iterations);
                var interationsChanged = -1 !== lastIterations && currentIterations !== lastIterations;
                if (lastIndex === currentIndex && interationsChanged && 1 === length) {
                    this._fireEvent(0);
                } else {
                    if (lastIndex !== currentIndex || interationsChanged) {
                        direction = lastWrappedInfo.direction;
                        do {
                            if (lastIndex !== currentIndex) {
                                if (-1 === direction && 0 === lastIndex && currentIndex > 0) {
                                    if ((wrapMode & WrapModeMask.PingPong) === WrapModeMask.PingPong) {
                                        direction *= -1;
                                    } else {
                                        lastIndex = length;
                                    }
                                    lastIterations++;
                                } else {
                                    if (1 === direction && lastIndex === length - 1 && currentIndex < length - 1) {
                                        if ((wrapMode & WrapModeMask.PingPong) === WrapModeMask.PingPong) {
                                            direction *= -1;
                                        } else {
                                            lastIndex = -1;
                                        }
                                        lastIterations++;
                                    }
                                }
                                if (lastIndex === currentIndex) {
                                    break;
                                }
                                if (lastIterations > currentIterations) {
                                    break;
                                }
                            }
                            lastIndex += direction;
                            this._fireEvent(lastIndex);
                        } while (lastIndex !== currentIndex && lastIndex > -1 && lastIndex < length);
                    }
                }
            },
            _fireEvent: function(index) {
                if (index < 0 || index >= this.events.length) {
                    return;
                }
                var eventInfo = this.events[index];
                var events = eventInfo.events;
                var components = this.target._components;
                for (var i = 0; i < events.length; i++) {
                    var event = events[i];
                    var funcName = event.func;
                    for (var j = 0; j < components.length; j++) {
                        var component = components[j];
                        var func = component[funcName];
                        if (func) {
                            func.apply(component, event.params);
                        }
                    }
                }
            },
            onTimeChangedManually: function() {
                this._lastWrappedInfo = null;
            }
        });
        if (false) {
            cc._Test.DynamicAnimCurve = DynamicAnimCurve;
            cc._Test.SampledAnimCurve = SampledAnimCurve;
            cc._Test.EventAnimCurve = EventAnimCurve;
        }
        module.exports = {
            AnimCurve: AnimCurve,
            DynamicAnimCurve: DynamicAnimCurve,
            SampledAnimCurve: SampledAnimCurve,
            EventAnimCurve: EventAnimCurve,
            EventInfo: EventInfo,
            computeRatioByType: computeRatioByType
        };
    }, {
        "./bezier": 8,
        "./binary-search": 9,
        "./types": 14
    } ],
    5: [ function(require, module, exports) {
        var JS = cc.js;
        var AnimationManager = cc.Class({
            ctor: function() {
                this.animators = [];
                this.__instanceId = cc.ClassManager.getNewInstanceId();
            },
            update: function(dt) {
                var animators = this.animators;
                for (var i = 0, len = animators.length; i < len; i++) {
                    var animator = animators[i];
                    if (animator._isPlaying && !animator._isPaused) {
                        animator.update(dt);
                        if (!animator._isPlaying) {
                            i--;
                            len--;
                        }
                    }
                }
            },
            destruct: function() {},
            addAnimator: function(animator) {
                this.animators.push(animator);
            },
            removeAnimator: function(animator) {
                var index = this.animators.indexOf(animator);
                if (index >= 0) {
                    this.animators.splice(index, 1);
                } else {
                    cc.error("animator not added or already removed");
                }
            }
        });
        cc.AnimationManager = module.exports = AnimationManager;
    }, {} ],
    6: [ function(require, module, exports) {
        var JS = cc.js;
        var AnimationNode = require("./types").AnimationNode;
        function AnimationState(clip, name) {
            AnimationNode.call(this, null, null, {
                duration: clip.length
            });
            this._clip = clip;
            this._name = name || clip.name;
        }
        JS.extend(AnimationState, AnimationNode);
        var state = AnimationState.prototype;
        JS.get(state, "clip", function() {
            return this._clip;
        });
        JS.get(state, "name", function() {
            return this._name;
        });
        JS.obsolete(state, "AnimationState.length", "duration");
        JS.getset(state, "curveLoaded", function() {
            return this.curves.length > 0;
        }, function(value) {
            this.curves.length = 0;
        });
        state.onPlay = function() {
            this.setTime(0);
        };
        state.setTime = function(time) {
            this.time = time || 0;
            this.curves.forEach(function(curve) {
                curve.onTimeChangedManually();
            });
        };
        cc.AnimationState = module.exports = AnimationState;
    }, {
        "./types": 14
    } ],
    7: [ function(require, module, exports) {
        var JS = cc.js;
        var Playable = require("./playable");
        var AnimationNode = require("./types").AnimationNode;
        var DynamicAnimCurve = require("./animation-curves").DynamicAnimCurve;
        function Animator(target) {
            this.target = target;
            this.playingAnims = [];
        }
        JS.extend(Animator, Playable);
        var animProto = Animator.prototype;
        animProto.update = function(deltaTime) {
            var anims = this.playingAnims;
            for (var i = 0; i < anims.length; i++) {
                var anim = anims[i];
                if (anim._isPlaying && !anim._isPaused) {
                    anim.update(deltaTime);
                    if (!anim._isPlaying) {
                        anims.splice(i, 1);
                        i--;
                    }
                }
            }
            if (0 === anims.length) {
                this.stop();
            }
        };
        animProto.onPlay = function() {
            cc.director.getAnimationManager().addAnimator(this);
        };
        animProto.onStop = function() {
            this.playingAnims.length = 0;
            cc.director.getAnimationManager().removeAnimator(this);
        };
        function EntityAnimator(target) {
            Animator.call(this, target);
        }
        JS.extend(EntityAnimator, Animator);
        var entProto = EntityAnimator.prototype;
        function computeNullRatios(keyFrames) {
            var lastIndex = 0;
            var lastRatio = 0;
            var len = keyFrames.length;
            for (var i = 0; i < len; i++) {
                var frame = keyFrames[i];
                var ratio = frame.ratio;
                if (0 === i && "number" !== typeof ratio) {
                    frame.computedRatio = ratio = 0;
                } else {
                    if (i === len - 1 && "number" !== typeof ratio) {
                        frame.computedRatio = ratio = 1;
                    }
                }
                if ("number" === typeof ratio) {
                    if (lastIndex + 1 < i) {
                        var count = i - lastIndex;
                        var step = (ratio - lastRatio) / count;
                        for (var j = lastIndex + 1; j < i; j++) {
                            lastRatio += step;
                            keyFrames[j].computedRatio = lastRatio;
                        }
                    }
                    lastIndex = i;
                    lastRatio = ratio;
                }
            }
        }
        if (false) {
            cc._Test.computeNullRatios = computeNullRatios;
        }
        entProto.animate = function(keyFrames, timingInput) {
            if (!keyFrames) {
                cc.error("[animate] keyFrames must be non-nil");
                return null;
            }
            computeNullRatios(keyFrames);
            var anim = this._doAnimate(keyFrames, timingInput);
            this.play();
            return anim;
        };
        function findCurve(curves, target, propName) {
            var i = 0, curve;
            for (;i < curves.length; i++) {
                curve = curves[i];
                if (curve.target === target && curve.prop === propName) {
                    return curve;
                }
            }
            return null;
        }
        function createPropCurve(curves, target, propName, value, ratio) {
            var curve = findCurve(curves, target, propName);
            if (!curve) {
                curve = new DynamicAnimCurve();
                curves.push(curve);
                curve.target = target;
                curve.prop = propName;
            }
            curve.values.push(value);
            curve.ratios.push(ratio);
        }
        entProto._doAnimate = function(keyFrames, timingInput) {
            var anim = new AnimationNode(this, null, timingInput);
            anim.play();
            var curves = anim.curves;
            var lastRatio = -1;
            for (var i = 0; i < keyFrames.length; i++) {
                var frame = keyFrames[i];
                var ratio = frame.ratio;
                if ("number" !== typeof ratio) {
                    ratio = frame.computedRatio;
                }
                if (ratio < 0) {
                    cc.error("[animate] ratio should >= 0!");
                    continue;
                }
                if (ratio < lastRatio) {
                    cc.error("[animate] ratio should in the order of smallest to largest!");
                    continue;
                }
                lastRatio = ratio;
                for (var key in frame) {
                    var data = frame[key];
                    if ("props" === key) {
                        for (var propName in data) {
                            createPropCurve(curves, this.target, propName, data[propName], ratio);
                        }
                    } else {
                        if ("comps" === key) {
                            for (var compName in data) {
                                var comp = this.target.getComponent(compName);
                                var compData = data[compName];
                                for (var propName in compData) {
                                    createPropCurve(curves, comp, propName, compData[propName], ratio);
                                }
                            }
                        }
                    }
                }
            }
            this.playingAnims.push(anim);
            return anim;
        };
        if (false) {
            cc._Test.EntityAnimator = EntityAnimator;
        }
        module.exports = {
            Animator: Animator,
            EntityAnimator: EntityAnimator
        };
    }, {
        "./animation-curves": 4,
        "./playable": 13,
        "./types": 14
    } ],
    8: [ function(require, module, exports) {
        function bezier(C1, C2, C3, C4, t) {
            var t1 = 1 - t;
            return C1 * t1 * t1 * t1 + 3 * C2 * t1 * t1 * t + 3 * C3 * t1 * t * t + C4 * t * t * t;
        }
        var cos = Math.cos, acos = Math.acos, max = Math.max, pi = Math.PI, tau = 2 * pi, sqrt = Math.sqrt;
        function crt(v) {
            if (v < 0) {
                return -Math.pow(-v, 1 / 3);
            } else {
                return Math.pow(v, 1 / 3);
            }
        }
        function cardano(curve, x) {
            var pa = x - 0;
            var pb = x - curve[0];
            var pc = x - curve[2];
            var pd = x - 1;
            var pa3 = 3 * pa;
            var pb3 = 3 * pb;
            var pc3 = 3 * pc;
            var d = -pa + pb3 - pc3 + pd, rd = 1 / d, r3 = 1 / 3, a = (pa3 - 6 * pb + pc3) * rd, a3 = a * r3, b = (-pa3 + pb3) * rd, c = pa * rd, p = (3 * b - a * a) * r3, p3 = p * r3, q = (2 * a * a * a - 9 * a * b + 27 * c) / 27, q2 = q / 2, discriminant = q2 * q2 + p3 * p3 * p3, u1, v1, x1, x2, x3;
            if (discriminant < 0) {
                var mp3 = -p * r3, mp33 = mp3 * mp3 * mp3, r = sqrt(mp33), t = -q / (2 * r), cosphi = t < -1 ? -1 : t > 1 ? 1 : t, phi = acos(cosphi), crtr = crt(r), t1 = 2 * crtr;
                x1 = t1 * cos(phi * r3) - a3;
                x2 = t1 * cos((phi + tau) * r3) - a3;
                x3 = t1 * cos((phi + 2 * tau) * r3) - a3;
                if (0 <= x1 && x1 <= 1) {
                    if (0 <= x2 && x2 <= 1) {
                        if (0 <= x3 && x3 <= 1) {
                            return max(x1, x2, x3);
                        } else {
                            return max(x1, x2);
                        }
                    } else {
                        if (0 <= x3 && x3 <= 1) {
                            return max(x1, x3);
                        } else {
                            return x1;
                        }
                    }
                } else {
                    if (0 <= x2 && x2 <= 1) {
                        if (0 <= x3 && x3 <= 1) {
                            return max(x2, x3);
                        } else {
                            return x2;
                        }
                    } else {
                        return x3;
                    }
                }
            } else {
                if (0 === discriminant) {
                    u1 = q2 < 0 ? crt(-q2) : -crt(q2);
                    x1 = 2 * u1 - a3;
                    x2 = -u1 - a3;
                    if (0 <= x1 && x1 <= 1) {
                        if (0 <= x2 && x2 <= 1) {
                            return max(x1, x2);
                        } else {
                            return x1;
                        }
                    } else {
                        return x2;
                    }
                } else {
                    var sd = sqrt(discriminant);
                    u1 = crt(-q2 + sd);
                    v1 = crt(q2 + sd);
                    x1 = u1 - v1 - a3;
                    return x1;
                }
            }
        }
        function bezierByTime(controlPoints, x) {
            var percent = cardano(controlPoints, x);
            var p0y = 0;
            var p1y = controlPoints[1];
            var p2y = controlPoints[3];
            var p3y = 1;
            var t1 = 1 - percent;
            return p0y * t1 * t1 * t1 + 3 * p1y * percent * t1 * t1 + 3 * p2y * percent * percent * t1 + p3y * percent * percent * percent;
        }
        if (false) {
            cc._Test.bezier = bezier;
            cc._Test.bezierByTime = bezierByTime;
        }
        module.exports = {
            bezier: bezier,
            bezierByTime: bezierByTime
        };
    }, {} ],
    9: [ function(require, module, exports) {
        var EPSILON = 1e-6;
        function binarySearch(array, value) {
            var l = 0, h = array.length - 1;
            while (l <= h) {
                var m = l + h >> 1;
                if (Math.abs(array[m] - value) < EPSILON) {
                    return m;
                }
                if (array[m] > value) {
                    h = m - 1;
                } else {
                    l = m + 1;
                }
            }
            return ~l;
        }
        module.exports = binarySearch;
    }, {} ],
    10: [ function(require, module, exports) {
        var Easing = {
            linear: function(k) {
                return k;
            },
            quadIn: function(k) {
                return k * k;
            },
            quadOut: function(k) {
                return k * (2 - k);
            },
            quadInOut: function(k) {
                if ((k *= 2) < 1) {
                    return .5 * k * k;
                }
                return -.5 * (--k * (k - 2) - 1);
            },
            cubicIn: function(k) {
                return k * k * k;
            },
            cubicOut: function(k) {
                return --k * k * k + 1;
            },
            cubicInOut: function(k) {
                if ((k *= 2) < 1) {
                    return .5 * k * k * k;
                }
                return .5 * ((k -= 2) * k * k + 2);
            },
            quartIn: function(k) {
                return k * k * k * k;
            },
            quartOut: function(k) {
                return 1 - --k * k * k * k;
            },
            quartInOut: function(k) {
                if ((k *= 2) < 1) {
                    return .5 * k * k * k * k;
                }
                return -.5 * ((k -= 2) * k * k * k - 2);
            },
            quintIn: function(k) {
                return k * k * k * k * k;
            },
            quintOut: function(k) {
                return --k * k * k * k * k + 1;
            },
            quintInOut: function(k) {
                if ((k *= 2) < 1) {
                    return .5 * k * k * k * k * k;
                }
                return .5 * ((k -= 2) * k * k * k * k + 2);
            },
            sineIn: function(k) {
                return 1 - Math.cos(k * Math.PI / 2);
            },
            sineOut: function(k) {
                return Math.sin(k * Math.PI / 2);
            },
            sineInOut: function(k) {
                return .5 * (1 - Math.cos(Math.PI * k));
            },
            expoIn: function(k) {
                return 0 === k ? 0 : Math.pow(1024, k - 1);
            },
            expoOut: function(k) {
                return 1 === k ? 1 : 1 - Math.pow(2, -10 * k);
            },
            expoInOut: function(k) {
                if (0 === k) {
                    return 0;
                }
                if (1 === k) {
                    return 1;
                }
                if ((k *= 2) < 1) {
                    return .5 * Math.pow(1024, k - 1);
                }
                return .5 * (-Math.pow(2, -10 * (k - 1)) + 2);
            },
            circIn: function(k) {
                return 1 - Math.sqrt(1 - k * k);
            },
            circOut: function(k) {
                return Math.sqrt(1 - --k * k);
            },
            circInOut: function(k) {
                if ((k *= 2) < 1) {
                    return -.5 * (Math.sqrt(1 - k * k) - 1);
                }
                return .5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
            },
            elasticIn: function(k) {
                var s, a = .1, p = .4;
                if (0 === k) {
                    return 0;
                }
                if (1 === k) {
                    return 1;
                }
                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                } else {
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                }
                return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin(2 * (k - s) * Math.PI / p));
            },
            elasticOut: function(k) {
                var s, a = .1, p = .4;
                if (0 === k) {
                    return 0;
                }
                if (1 === k) {
                    return 1;
                }
                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                } else {
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                }
                return a * Math.pow(2, -10 * k) * Math.sin(2 * (k - s) * Math.PI / p) + 1;
            },
            elasticInOut: function(k) {
                var s, a = .1, p = .4;
                if (0 === k) {
                    return 0;
                }
                if (1 === k) {
                    return 1;
                }
                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                } else {
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                }
                if ((k *= 2) < 1) {
                    return -.5 * a * Math.pow(2, 10 * (k -= 1)) * Math.sin(2 * (k - s) * Math.PI / p);
                }
                return a * Math.pow(2, -10 * (k -= 1)) * Math.sin(2 * (k - s) * Math.PI / p) * .5 + 1;
            },
            backIn: function(k) {
                var s = 1.70158;
                return k * k * ((s + 1) * k - s);
            },
            backOut: function(k) {
                var s = 1.70158;
                return --k * k * ((s + 1) * k + s) + 1;
            },
            backInOut: function(k) {
                var s = 2.5949095;
                if ((k *= 2) < 1) {
                    return .5 * k * k * ((s + 1) * k - s);
                }
                return .5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
            },
            bounceOut: function(k) {
                if (k < 1 / 2.75) {
                    return 7.5625 * k * k;
                } else {
                    if (k < 2 / 2.75) {
                        return 7.5625 * (k -= 1.5 / 2.75) * k + .75;
                    } else {
                        if (k < 2.5 / 2.75) {
                            return 7.5625 * (k -= 2.25 / 2.75) * k + .9375;
                        } else {
                            return 7.5625 * (k -= 2.625 / 2.75) * k + .984375;
                        }
                    }
                }
            },
            smooth: function(t) {
                if (t <= 0) {
                    return 0;
                }
                if (t >= 1) {
                    return 1;
                }
                return t * t * (3 - 2 * t);
            },
            fade: function(t) {
                if (t <= 0) {
                    return 0;
                }
                if (t >= 1) {
                    return 1;
                }
                return t * t * t * (t * (6 * t - 15) + 10);
            }
        };
        function _makeOutIn(fnIn, fnOut) {
            return function(k) {
                if (k < .5) {
                    return fnOut(2 * k) / 2;
                }
                return fnIn(2 * k - 1) / 2 + .5;
            };
        }
        Easing.quadOutIn = _makeOutIn(Easing.quadIn, Easing.quadOut);
        Easing.cubicOutIn = _makeOutIn(Easing.cubicIn, Easing.cubicOut);
        Easing.quartOutIn = _makeOutIn(Easing.quartIn, Easing.quartOut);
        Easing.quintOutIn = _makeOutIn(Easing.quintIn, Easing.quintOut);
        Easing.sineOutIn = _makeOutIn(Easing.sineIn, Easing.sineOut);
        Easing.expoOutIn = _makeOutIn(Easing.expoIn, Easing.expoOut);
        Easing.circOutIn = _makeOutIn(Easing.circIn, Easing.circOut);
        Easing.backOutIn = _makeOutIn(Easing.backIn, Easing.backOut);
        Easing.backOutIn = _makeOutIn(Easing.backIn, Easing.backOut);
        Easing.bounceIn = function(k) {
            return 1 - Easing.bounceOut(1 - k);
        };
        Easing.bounceInOut = function(k) {
            if (k < .5) {
                return .5 * Easing.bounceIn(2 * k);
            }
            return .5 * Easing.bounceOut(2 * k - 1) + .5;
        };
        Easing.bounceOutIn = _makeOutIn(Easing.bounceIn, Easing.bounceOut);
        cc.Easing = module.exports = Easing;
    }, {} ],
    11: [ function(require, module, exports) {
        require("./bezier");
        require("./easing");
        require("./types");
        require("./motion-path-helper");
        require("./animation-curves");
        require("./animation-clip");
        require("./animators");
        require("./animation-manager");
        require("./animation-state");
        require("./animation-animator");
    }, {
        "./animation-animator": 2,
        "./animation-clip": 3,
        "./animation-curves": 4,
        "./animation-manager": 5,
        "./animation-state": 6,
        "./animators": 7,
        "./bezier": 8,
        "./easing": 10,
        "./motion-path-helper": 12,
        "./types": 14
    } ],
    12: [ function(require, module, exports) {
        var DynamicAnimCurve = require("./animation-curves").DynamicAnimCurve;
        var computeRatioByType = require("./animation-curves").computeRatioByType;
        var bezier = require("./bezier").bezier;
        var binarySearch = require("./binary-search");
        var v2 = cc.v2;
        function Curve(points) {
            this.points = points || [];
            this.beziers = [];
            this.ratios = [];
            this.progresses = [];
            this.length = 0;
            this.computeBeziers();
        }
        Curve.prototype.computeBeziers = function() {
            this.beziers.length = 0;
            this.ratios.length = 0;
            this.progresses.length = 0;
            this.length = 0;
            var bezier;
            for (var i = 1; i < this.points.length; i++) {
                var startPoint = this.points[i - 1];
                var endPoint = this.points[i];
                bezier = new Bezier();
                bezier.start = startPoint.pos;
                bezier.startCtrlPoint = startPoint.out;
                bezier.end = endPoint.pos;
                bezier.endCtrlPoint = endPoint["in"];
                this.beziers.push(bezier);
                this.length += bezier.getLength();
            }
            var current = 0;
            for (var i = 0; i < this.beziers.length; i++) {
                bezier = this.beziers[i];
                this.ratios[i] = bezier.getLength() / this.length;
                this.progresses[i] = current += this.ratios[i];
            }
            return this.beziers;
        };
        function Bezier() {
            this.start = v2();
            this.end = v2();
            this.startCtrlPoint = v2();
            this.endCtrlPoint = v2();
        }
        Bezier.prototype.getPointAt = function(u) {
            var t = this.getUtoTmapping(u);
            return this.getPoint(t);
        };
        Bezier.prototype.getPoint = function(t) {
            var x = bezier(this.start.x, this.startCtrlPoint.x, this.endCtrlPoint.x, this.end.x, t);
            var y = bezier(this.start.y, this.startCtrlPoint.y, this.endCtrlPoint.y, this.end.y, t);
            return new v2(x, y);
        };
        Bezier.prototype.getLength = function() {
            var lengths = this.getLengths();
            return lengths[lengths.length - 1];
        };
        Bezier.prototype.getLengths = function(divisions) {
            if (!divisions) {
                divisions = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200;
            }
            if (this.cacheArcLengths && this.cacheArcLengths.length === divisions + 1) {
                return this.cacheArcLengths;
            }
            var cache = [];
            var current, last = this.getPoint(0);
            var p, sum = 0;
            cache.push(0);
            for (p = 1; p <= divisions; p++) {
                current = this.getPoint(p / divisions);
                sum += cc.pDistance(current, last);
                cache.push(sum);
                last = current;
            }
            this.cacheArcLengths = cache;
            return cache;
        };
        Bezier.prototype.getUtoTmapping = function(u, distance) {
            var arcLengths = this.getLengths();
            var i = 0, il = arcLengths.length;
            var targetArcLength;
            if (distance) {
                targetArcLength = distance;
            } else {
                targetArcLength = u * arcLengths[il - 1];
            }
            var low = 0, high = il - 1, comparison;
            while (low <= high) {
                i = Math.floor(low + (high - low) / 2);
                comparison = arcLengths[i] - targetArcLength;
                if (comparison < 0) {
                    low = i + 1;
                    continue;
                } else {
                    if (comparison > 0) {
                        high = i - 1;
                        continue;
                    } else {
                        high = i;
                        break;
                    }
                }
            }
            i = high;
            if (arcLengths[i] === targetArcLength) {
                var t = i / (il - 1);
                return t;
            }
            var lengthBefore = arcLengths[i];
            var lengthAfter = arcLengths[i + 1];
            var segmentLength = lengthAfter - lengthBefore;
            var segmentFraction = (targetArcLength - lengthBefore) / segmentLength;
            var t = (i + segmentFraction) / (il - 1);
            return t;
        };
        function sampleMotionPaths(motionPaths, data, duration, fps) {
            function createControlPoints(array) {
                if (array instanceof cc.Vec2) {
                    return {
                        "in": array,
                        pos: array,
                        out: array
                    };
                } else {
                    if (Array.isArray(array) && 6 === array.length) {
                        return {
                            "in": v2(array[2], array[3]),
                            pos: v2(array[0], array[1]),
                            out: v2(array[4], array[5])
                        };
                    }
                }
                return {
                    "in": cc.Vec2.ZERO,
                    pos: cc.Vec2.ZERO,
                    out: cc.Vec2.ZERO
                };
            }
            var values = data.values;
            if (0 === motionPaths.length || 0 === values.length) {
                return;
            }
            values = values.map(function(value) {
                return v2(value[0], value[1]);
            });
            if (1 === values.length) {
                data.values = values;
                return;
            }
            var types = data.types;
            var ratios = data.ratios;
            var newValues = data.values = [];
            var newTypes = data.types = [];
            var newRatios = data.ratios = [];
            function addNewDatas(value, type, ratio) {
                newValues.push(value);
                newTypes.push(type);
                newRatios.push(ratio);
            }
            var startRatioOffset = 0;
            var EPSILON = 1e-6;
            for (var i = 0, l = motionPaths.length; i < l - 1; i++) {
                var motionPath = motionPaths[i];
                var ratio = ratios[i];
                var nextRatio = ratios[i + 1];
                var betweenRatio = nextRatio - ratio;
                var value = values[i];
                var nextValue = values[i + 1];
                var type = types[i];
                var results = [];
                var progress = startRatioOffset / betweenRatio;
                var speed = 1 / (betweenRatio * duration * fps);
                var finalProgress;
                if (motionPath && motionPath.length > 0) {
                    var points = [];
                    points.push(createControlPoints(value));
                    for (var j = 0, l2 = motionPath.length; j < l2; j++) {
                        var controlPoints = createControlPoints(motionPath[j]);
                        points.push(controlPoints);
                    }
                    points.push(createControlPoints(nextValue));
                    var curve = new Curve(points);
                    curve.computeBeziers();
                    var progresses = curve.progresses;
                    while (1 - progress > EPSILON) {
                        finalProgress = progress;
                        finalProgress = computeRatioByType(finalProgress, type);
                        var pos, bezier, normal, length;
                        if (finalProgress < 0) {
                            bezier = curve.beziers[0];
                            length = (0 - finalProgress) * bezier.getLength();
                            normal = bezier.start.sub(bezier.endCtrlPoint).normalize();
                            pos = bezier.start.add(normal.mul(length));
                        } else {
                            if (finalProgress > 1) {
                                bezier = curve.beziers[curve.beziers.length - 1];
                                length = (finalProgress - 1) * bezier.getLength();
                                normal = bezier.end.sub(bezier.startCtrlPoint).normalize();
                                pos = bezier.end.add(normal.mul(length));
                            } else {
                                var bezierIndex = binarySearch(progresses, finalProgress);
                                if (bezierIndex < 0) {
                                    bezierIndex = ~bezierIndex;
                                }
                                finalProgress -= bezierIndex > 0 ? progresses[bezierIndex - 1] : 0;
                                finalProgress /= curve.ratios[bezierIndex];
                                pos = curve.beziers[bezierIndex].getPointAt(finalProgress);
                            }
                        }
                        results.push(pos);
                        progress += speed;
                    }
                } else {
                    while (1 - progress > EPSILON) {
                        finalProgress = progress;
                        finalProgress = computeRatioByType(finalProgress, type);
                        results.push(value.lerp(nextValue, finalProgress));
                        progress += speed;
                    }
                }
                for (var j = 0, l2 = results.length; j < l2; j++) {
                    var newRatio = ratio + startRatioOffset + speed * j * betweenRatio;
                    addNewDatas(results[j], DynamicAnimCurve.Linear, newRatio);
                }
                if (Math.abs(progress - 1) > EPSILON) {
                    startRatioOffset = (progress - 1) * betweenRatio;
                } else {
                    startRatioOffset = 0;
                }
            }
            if (ratios[ratios.length - 1] !== newRatios[newRatios.length - 1]) {
                addNewDatas(values[values.length - 1], DynamicAnimCurve.Linear, ratios[ratios.length - 1]);
            }
        }
        if (false) {
            cc._Test.sampleMotionPaths = sampleMotionPaths;
        }
        module.exports = {
            sampleMotionPaths: sampleMotionPaths,
            Curve: Curve,
            Bezier: Bezier
        };
    }, {
        "./animation-curves": 4,
        "./bezier": 8,
        "./binary-search": 9
    } ],
    13: [ function(require, module, exports) {
        var JS = cc.js;
        function Playable() {
            this._isPlaying = false;
            this._isPaused = false;
            this._stepOnce = false;
        }
        var prototype = Playable.prototype;
        JS.get(prototype, "isPlaying", function() {
            return this._isPlaying;
        }, true);
        JS.get(prototype, "isPaused", function() {
            return this._isPaused;
        }, true);
        var virtual = function() {};
        prototype.onPlay = virtual;
        prototype.onPause = virtual;
        prototype.onResume = virtual;
        prototype.onStop = virtual;
        prototype.onError = virtual;
        prototype.play = function() {
            if (this._isPlaying) {
                if (this._isPaused) {
                    this._isPaused = false;
                    this.onResume();
                } else {
                    this.onError("already-playing");
                }
            } else {
                this._isPlaying = true;
                this.onPlay();
            }
        };
        prototype.stop = function() {
            if (this._isPlaying) {
                this._isPlaying = false;
                this._isPaused = false;
                this.onStop();
            }
        };
        prototype.pause = function() {
            this._isPaused = true;
            this.onPause();
        };
        prototype.resume = function() {
            this._isPaused = false;
            this.onResume();
        };
        prototype.step = function() {
            this.pause();
            this._stepOnce = true;
            if (!this._isPlaying) {
                this.play();
            }
        };
        module.exports = Playable;
    }, {} ],
    14: [ function(require, module, exports) {
        var JS = cc.js;
        var Playable = require("./playable");
        var WrapModeMask = {
            Loop: 2,
            ShouldWrap: 4,
            PingPong: 22,
            Reverse: 36
        };
        var WrapMode = cc.Enum({
            Default: 0,
            Normal: 1,
            Reverse: WrapModeMask.Reverse,
            Loop: WrapModeMask.Loop,
            LoopReverse: WrapModeMask.Loop | WrapModeMask.Reverse,
            PingPong: WrapModeMask.PingPong,
            PingPongReverse: WrapModeMask.PingPong | WrapModeMask.Reverse
        });
        cc.WrapMode = WrapMode;
        var AnimationNodeBase = function() {
            Playable.call(this);
        };
        JS.extend(AnimationNodeBase, Playable);
        AnimationNodeBase.prototype.update = function(deltaTime) {};
        function AnimationNode(animator, curves, timingInput) {
            AnimationNodeBase.call(this);
            this.animator = animator;
            this.curves = curves || [];
            this.delay = 0;
            this.repeatCount = 1;
            this.duration = 1;
            this.speed = 1;
            this.wrapMode = WrapMode.Normal;
            if (timingInput) {
                this.delay = timingInput.delay || this.delay;
                var duration = timingInput.duration;
                if ("undefined" !== typeof duration) {
                    this.duration = duration;
                }
                var speed = timingInput.speed;
                if ("undefined" !== typeof speed) {
                    this.speed = speed;
                }
                var wrapMode = timingInput.wrapMode;
                if ("undefined" !== typeof wrapMode) {
                    var isEnum = "number" === typeof wrapMode;
                    if (isEnum) {
                        this.wrapMode = wrapMode;
                    } else {
                        this.wrapMode = WrapMode[wrapMode];
                    }
                }
                var repeatCount = timingInput.repeatCount;
                if ("undefined" !== typeof repeatCount) {
                    this.repeatCount = repeatCount;
                } else {
                    if (this.wrapMode & WrapModeMask.Loop) {
                        this.repeatCount = 1 / 0;
                    }
                }
            }
            this.time = 0;
            this._timeNoScale = 0;
            this._firstFramePlayed = false;
            this._duringDelay = false;
            if (this.delay > 0) {
                this._duringDelay = true;
            }
        }
        JS.extend(AnimationNode, AnimationNodeBase);
        JS.mixin(AnimationNode.prototype, {
            update: function(delta) {
                if (this._duringDelay) {
                    this._timeNoScale += delta;
                    if (this._timeNoScale < this.delay) {
                        return;
                    } else {
                        this._duringDelay = false;
                    }
                }
                if (this._firstFramePlayed) {
                    this.time += delta * this.speed;
                } else {
                    this._firstFramePlayed = true;
                }
                if (this.sample()) {
                    this.stop();
                }
            },
            _needRevers: function(currentIterations) {
                var wrapMode = this.wrapMode;
                var needRevers = false;
                if ((wrapMode & WrapModeMask.PingPong) === WrapModeMask.PingPong) {
                    var isEnd = currentIterations - (0 | currentIterations) === 0;
                    if (isEnd && currentIterations > 0) {
                        currentIterations -= 1;
                    }
                    var isOddIteration = 1 & currentIterations;
                    if (isOddIteration) {
                        needRevers = !needRevers;
                    }
                }
                if ((wrapMode & WrapModeMask.Reverse) === WrapModeMask.Reverse) {
                    needRevers = !needRevers;
                }
                return needRevers;
            },
            getWrappedInfo: function(time) {
                var stopped = false;
                var duration = this.duration;
                var ratio = 0;
                var wrapMode = this.wrapMode;
                var currentIterations = Math.abs(time / duration);
                if (currentIterations > this.repeatCount) {
                    currentIterations = this.repeatCount;
                }
                var needRevers = false;
                if (wrapMode & WrapModeMask.ShouldWrap) {
                    needRevers = this._needRevers(currentIterations);
                }
                var direction = needRevers ? -1 : 1;
                if (this.speed < 0) {
                    direction *= -1;
                }
                if (currentIterations >= this.repeatCount) {
                    stopped = true;
                    var tempRatio = this.repeatCount - (0 | this.repeatCount);
                    if (0 === tempRatio) {
                        tempRatio = 1;
                    }
                    time = tempRatio * duration * (time > 0 ? 1 : -1);
                }
                if (time > duration) {
                    var tempTime = time % duration;
                    time = 0 === tempTime ? duration : tempTime;
                } else {
                    if (time < 0) {
                        time %= duration;
                        if (0 !== time) {
                            time += duration;
                        }
                    }
                }
                if (wrapMode & WrapModeMask.ShouldWrap) {
                    if (needRevers) {
                        time = duration - time;
                    }
                }
                ratio = time / duration;
                return {
                    ratio: ratio,
                    time: time,
                    direction: direction,
                    stopped: stopped,
                    iterations: currentIterations
                };
            },
            sample: function() {
                var info = this.getWrappedInfo(this.time);
                var curves = this.curves;
                for (var i = 0, len = curves.length; i < len; i++) {
                    var curve = curves[i];
                    curve.sample(info.time, info.ratio, this);
                }
                return info.stopped;
            }
        });
        cc.AnimationNode = AnimationNode;
        module.exports = {
            WrapModeMask: WrapModeMask,
            WrapMode: WrapMode,
            AnimationNode: AnimationNode
        };
    }, {
        "./playable": 13
    } ],
    15: [ function(require, module, exports) {
        "use strict";
        var EventTarget = require("./event/event-target");
        var JS = cc.js;
        var Flags = cc.Object.Flags;
        var Destroying = Flags.Destroying;
        var DontDestroy = Flags.DontDestroy;
        var EventType = cc.Enum({
            TOUCH_START: "touchstart",
            TOUCH_MOVE: "touchmove",
            TOUCH_END: "touchend",
            TOUCH_CANCEL: "touchcancel",
            MOUSE_DOWN: "mousedown",
            MOUSE_MOVE: "mousemove",
            MOUSE_ENTER: "mouseenter",
            MOUSE_LEAVE: "mouseleave",
            MOUSE_UP: "mouseup",
            MOUSE_WHEEL: "mousewheel"
        });
        var _touchEvents = [ EventType.TOUCH_START, EventType.TOUCH_MOVE, EventType.TOUCH_END, EventType.TOUCH_CANCEL ];
        var _mouseEvents = [ EventType.MOUSE_DOWN, EventType.MOUSE_ENTER, EventType.MOUSE_MOVE, EventType.MOUSE_LEAVE, EventType.MOUSE_UP, EventType.MOUSE_WHEEL ];
        var _touchStartHandler = function(touch, event) {
            var pos = touch.getLocation();
            var node = this.owner;
            if (node._hitTest(pos, this)) {
                event.type = EventType.TOUCH_START;
                event.touch = touch;
                event.bubbles = true;
                node.dispatchEvent(event);
                return true;
            }
            return false;
        };
        var _touchMoveHandler = function(touch, event) {
            var node = this.owner;
            event.type = EventType.TOUCH_MOVE;
            event.touch = touch;
            event.bubbles = true;
            node.dispatchEvent(event);
        };
        var _touchEndHandler = function(touch, event) {
            var pos = touch.getLocation();
            var node = this.owner;
            if (node._hitTest(pos, this)) {
                event.type = EventType.TOUCH_END;
            } else {
                event.type = EventType.TOUCH_CANCEL;
            }
            event.touch = touch;
            event.bubbles = true;
            node.dispatchEvent(event);
        };
        var _mouseDownHandler = function(event) {
            var pos = event.getLocation();
            var node = this.owner;
            if (node._hitTest(pos, this)) {
                event.type = EventType.MOUSE_DOWN;
                node.dispatchEvent(event);
                event.stopPropagation();
            }
        };
        var _mouseMoveHandler = function(event) {
            var pos = event.getLocation();
            var node = this.owner;
            if (node._hitTest(pos, this)) {
                event.stopPropagation();
                if (!this._previousIn) {
                    event.type = EventType.MOUSE_ENTER;
                    node.dispatchEvent(event);
                    this._previousIn = true;
                }
                event.type = EventType.MOUSE_MOVE;
                node.dispatchEvent(event);
            } else {
                if (this._previousIn) {
                    event.type = EventType.MOUSE_LEAVE;
                    node.dispatchEvent(event);
                    this._previousIn = false;
                }
            }
        };
        var _mouseUpHandler = function(event) {
            var pos = event.getLocation();
            var node = this.owner;
            if (node._hitTest(pos, this)) {
                event.type = EventType.MOUSE_UP;
                node.dispatchEvent(event);
                event.stopPropagation();
            }
        };
        var _mouseWheelHandler = function(event) {
            var pos = event.getLocation();
            var node = this.owner;
            if (node._hitTest(pos, this)) {
                event.type = EventType.MOUSE_WHEEL;
                node.dispatchEvent(event);
                event.stopPropagation();
            }
        };
        var _searchMaskParent = function(node) {
            if (cc.Mask) {
                var index = 0;
                var mask = null;
                for (var curr = node; curr && curr instanceof cc.Node; curr = curr.parent, ++index) {
                    mask = curr.getComponent(cc.Mask);
                    if (mask) {
                        return {
                            index: index,
                            node: curr
                        };
                    }
                }
            }
            return null;
        };
        var Node = cc.Class({
            name: "cc.Node",
            "extends": require("./utils/base-node"),
            mixins: [ EventTarget ],
            properties: {
                active: {
                    get: function() {
                        return this._active;
                    },
                    set: function(value) {
                        value = !!value;
                        if (this._active !== value) {
                            this._active = value;
                            var canActiveInHierarchy = this._parent && this._parent._activeInHierarchy;
                            if (canActiveInHierarchy) {
                                this._onActivatedInHierarchy(value);
                                this.emit("active-in-hierarchy-changed", this);
                            }
                        }
                    }
                },
                activeInHierarchy: {
                    get: function() {
                        return this._activeInHierarchy;
                    }
                },
                _active: true,
                _components: [],
                _prefab: {
                    "default": null,
                    editorOnly: true
                },
                _persistNode: {
                    get: function() {
                        return (this._objFlags & DontDestroy) > 0;
                    },
                    set: function(value) {
                        if (value) {
                            this._objFlags |= DontDestroy;
                        } else {
                            this._objFlags &= ~DontDestroy;
                        }
                    }
                }
            },
            ctor: function() {
                var name = arguments[0];
                this._name = "undefined" !== typeof name ? name : "New Node";
                this._activeInHierarchy = false;
                this.__instanceId = this._id || cc.ClassManager.getNewInstanceId();
                this._widget = null;
                this._touchListener = null;
                this._mouseListener = null;
                this.__eventTargets = [];
                if (cc.sys.isNative) {
                    this._retainedActions = [];
                }
            },
            statics: {
                _DirtyFlags: require("./utils/misc").DirtyFlags
            },
            destroy: function() {
                if (cc.Object.prototype.destroy.call(this)) {
                    if (this._activeInHierarchy) {
                        this._deactivateChildComponents();
                    }
                }
            },
            _onPreDestroy: function() {
                var i, len;
                this._objFlags |= Destroying;
                var parent = this._parent;
                var destroyByParent = parent && parent._objFlags & Destroying;
                if (!destroyByParent) {
                    if (false) {
                        this._registerIfAttached(false);
                    }
                }
                var children = this._children;
                for (i = 0, len = children.length; i < len; ++i) {
                    children[i]._destroyImmediate();
                }
                for (i = 0, len = this._components.length; i < len; ++i) {
                    var component = this._components[i];
                    component._destroyImmediate();
                }
                this.stopAllActions();
                this._releaseAllActions();
                cc.eventManager.removeListeners(this);
                for (i = 0, len = this.__eventTargets.length; i < len; ++i) {
                    var target = this.__eventTargets[i];
                    target && target.targetOff(this);
                }
                this.__eventTargets.length = 0;
                if (this._persistNode) {
                    cc.game.removePersistRootNode(this);
                }
                if (!destroyByParent) {
                    if (parent) {
                        var childIndex = parent._children.indexOf(this);
                        parent._children.splice(childIndex, 1);
                        parent.emit("child-removed", this);
                    }
                    this._removeSgNode();
                    if (false) {
                        this._parent = null;
                    }
                } else {
                    this._sgNode.release();
                }
            },
            getComponent: function(typeOrClassName) {
                if (!typeOrClassName) {
                    cc.error("getComponent: Type must be non-nil");
                    return null;
                }
                var constructor;
                if ("string" === typeof typeOrClassName) {
                    constructor = JS.getClassByName(typeOrClassName);
                } else {
                    constructor = typeOrClassName;
                }
                if (constructor) {
                    for (var c = 0; c < this._components.length; ++c) {
                        var component = this._components[c];
                        if (component instanceof constructor) {
                            return component;
                        }
                    }
                }
                return null;
            },
            _checkMultipleComp: false,
            addComponent: function(typeOrClassName) {
                if (this._objFlags & Destroying && false) {
                    cc.error("isDestroying");
                    return null;
                }
                var constructor;
                if ("string" === typeof typeOrClassName) {
                    constructor = JS.getClassByName(typeOrClassName);
                    if (!constructor) {
                        cc.error('addComponent: Failed to get class "%s"', typeOrClassName);
                        if (cc._RFpeek()) {
                            cc.error('addComponent: Should not add component ("%s") when the scripts are still loading.', typeOrClassName);
                        }
                        return null;
                    }
                } else {
                    if (!typeOrClassName) {
                        cc.error("addComponent: Type must be non-nil");
                        return null;
                    }
                    constructor = typeOrClassName;
                }
                if ("function" !== typeof constructor) {
                    cc.error("addComponent: The component to add must be a constructor");
                    return null;
                }
                if (!cc.isChildClassOf(constructor, cc.Component)) {
                    cc.error("addComponent: The component to add must be child class of cc.Component");
                    return null;
                }
                if (constructor._disallowMultiple && false) {
                    if (!this._checkMultipleComp(constructor)) {
                        return null;
                    }
                }
                var ReqComp = constructor._requireComponent;
                if (ReqComp && !this.getComponent(ReqComp)) {
                    var depended = this.addComponent(ReqComp);
                    if (!depended) {
                        return null;
                    }
                }
                if (false) {
                    return null;
                }
                var component = new constructor();
                component.node = this;
                this._components.push(component);
                if (this._activeInHierarchy) {
                    component.__onNodeActivated(true);
                }
                return component;
            },
            _addComponentAt: false,
            removeComponent: function(component) {
                if (!component) {
                    cc.error("removeComponent: Component must be non-nil");
                    return;
                }
                if ("object" !== typeof component) {
                    component = this.getComponent(component);
                }
                if (component) {
                    component.destroy();
                }
            },
            _getDependComponent: false,
            _removeComponent: function(component) {
                if (!component) {
                    cc.error("Argument must be non-nil");
                    return;
                }
                if (!(this._objFlags & Destroying)) {
                    var i = this._components.indexOf(component);
                    if (-1 !== i) {
                        this._components.splice(i, 1);
                    } else {
                        if (component.node !== this) {
                            cc.error("Component not owned by this entity");
                        }
                    }
                }
            },
            _registerIfAttached: false,
            _onActivatedInHierarchy: function(newActive) {
                this._activeInHierarchy = newActive;
                var originCount = this._components.length;
                for (var c = 0; c < originCount; ++c) {
                    var component = this._components[c];
                    if (!(component instanceof cc.Component) && false) {
                        cc.error('Sorry, the component of entity "%s" which with an index of %s is corrupted! It has been removed.\nSee DevTools for details.', this.name, c);
                        console.log("Corrupted component value:", component);
                        if (component) {
                            this._removeComponent(component);
                        } else {
                            this._components.splice(c, 1);
                        }
                        --c;
                        --originCount;
                    } else {
                        component.__onNodeActivated(newActive);
                    }
                }
                for (var i = 0, len = this.childrenCount; i < len; ++i) {
                    var child = this._children[i];
                    if (child._active) {
                        child._onActivatedInHierarchy(newActive);
                    }
                }
                if (newActive) {
                    cc.director.getActionManager().resumeTarget(this);
                    cc.eventManager.resumeTarget(this);
                } else {
                    cc.director.getActionManager().pauseTarget(this);
                    cc.eventManager.pauseTarget(this);
                }
            },
            _onHierarchyChanged: function(oldParent) {
                var newParent = this._parent;
                if (this._persistNode && !(newParent instanceof cc.Scene)) {
                    cc.game.removePersistRootNode(this);
                    if (false) {
                        cc.warn('Set "%s" to normal node (not persist root node).');
                    }
                }
                var activeInHierarchyBefore = this._active && !!(oldParent && oldParent._activeInHierarchy);
                var shouldActiveNow = this._active && !!(newParent && newParent._activeInHierarchy);
                if (activeInHierarchyBefore !== shouldActiveNow) {
                    this._onActivatedInHierarchy(shouldActiveNow);
                }
                if (false) {
                    var scene = cc.director.getScene();
                    var inCurrentSceneBefore = oldParent && oldParent.isChildOf(scene);
                    var inCurrentSceneNow = newParent && newParent.isChildOf(scene);
                    if (!inCurrentSceneBefore && inCurrentSceneNow) {
                        this._registerIfAttached(true);
                    } else {
                        if (inCurrentSceneBefore && !inCurrentSceneNow) {
                            this._registerIfAttached(false);
                        }
                    }
                    var newPrefabRoot = newParent && newParent._prefab && newParent._prefab.root;
                    var myPrefabInfo = this._prefab;
                    if (myPrefabInfo) {
                        if (newPrefabRoot) {
                            Editor.PrefabUtils.linkPrefab(newPrefabRoot._prefab.asset, newPrefabRoot, this);
                        } else {
                            if (myPrefabInfo.root !== this) {
                                Editor.PrefabUtils.unlinkPrefab(this);
                            }
                        }
                    } else {
                        if (newPrefabRoot) {
                            Editor.PrefabUtils.linkPrefab(newPrefabRoot._prefab.asset, newPrefabRoot, this);
                        }
                    }
                }
            },
            _deactivateChildComponents: function() {
                var originCount = this._components.length;
                for (var c = 0; c < originCount; ++c) {
                    var component = this._components[c];
                    component.__onNodeActivated(false);
                }
                for (var i = 0, len = this.childrenCount; i < len; ++i) {
                    var entity = this._children[i];
                    if (entity._active) {
                        entity._deactivateChildComponents();
                    }
                }
            },
            _instantiate: function() {
                var clone = cc.instantiate._clone(this, this);
                clone._parent = null;
                if (false) {
                    this._name += " (Clone)";
                }
                clone._onBatchCreated();
                return clone;
            },
            _onColorChanged: function() {
                for (var c = 0; c < this._components.length; ++c) {
                    var comp = this._components[c];
                    if (comp instanceof cc._ComponentInSG && comp.isValid && comp._sgNode) {
                        comp._sgNode.setColor(this._color);
                        if (!this._cascadeOpacityEnabled) {
                            comp._sgNode.setOpacity(this._opacity);
                        }
                    }
                }
            },
            _onCascadeChanged: function() {
                var opacity = this._cascadeOpacityEnabled ? 255 : this._opacity;
                for (var c = 0; c < this._components.length; ++c) {
                    var comp = this._components[c];
                    if (comp instanceof cc._ComponentInSG && comp.isValid && comp._sgNode) {
                        comp._sgNode.setOpacity(opacity);
                    }
                }
            },
            _onAnchorChanged: function() {
                for (var c = 0; c < this._components.length; ++c) {
                    var comp = this._components[c];
                    if (comp instanceof cc._ComponentInSG && comp.isValid && comp._sgNode) {
                        comp._sgNode.setAnchorPoint(this._anchorPoint);
                        comp._sgNode.ignoreAnchorPointForPosition(this._ignoreAnchorPointForPosition);
                    }
                }
            },
            _onOpacityModifyRGBChanged: function() {
                for (var c = 0; c < this._components.length; ++c) {
                    var comp = this._components[c];
                    if (comp instanceof cc._ComponentInSG && comp.isValid && comp._sgNode) {
                        comp._sgNode.setOpacityModifyRGB(this._opacityModifyRGB);
                    }
                }
            },
            on: function(type, callback, target) {
                if (-1 !== _touchEvents.indexOf(type)) {
                    if (!this._touchListener) {
                        this._touchListener = cc.EventListener.create({
                            event: cc.EventListener.TOUCH_ONE_BY_ONE,
                            swallowTouches: true,
                            owner: this,
                            mask: _searchMaskParent(this),
                            onTouchBegan: _touchStartHandler,
                            onTouchMoved: _touchMoveHandler,
                            onTouchEnded: _touchEndHandler
                        });
                        this._touchListener.retain();
                        cc.eventManager.addListener(this._touchListener, this);
                    }
                } else {
                    if (-1 !== _mouseEvents.indexOf(type)) {
                        if (!this._mouseListener) {
                            this._mouseListener = cc.EventListener.create({
                                event: cc.EventListener.MOUSE,
                                _previousIn: false,
                                owner: this,
                                mask: _searchMaskParent(this),
                                onMouseDown: _mouseDownHandler,
                                onMouseMove: _mouseMoveHandler,
                                onMouseUp: _mouseUpHandler,
                                onMouseScroll: _mouseWheelHandler
                            });
                            this._mouseListener.retain();
                            cc.eventManager.addListener(this._mouseListener, this);
                        }
                    }
                }
                EventTarget.prototype.on.call(this, type, callback, target);
            },
            off: function(type, callback, target) {
                EventTarget.prototype.off.call(this, type, callback, target);
                if (-1 !== _touchEvents.indexOf(type)) {
                    this._checkTouchListeners();
                } else {
                    if (-1 !== _mouseEvents.indexOf(type)) {
                        this._checkMouseListeners();
                    }
                }
            },
            targetOff: function(target) {
                EventTarget.prototype.targetOff.call(this, target);
                this._checkTouchListeners();
                this._checkMouseListeners();
            },
            _checkTouchListeners: function() {
                if (this._bubblingListeners && this._touchListener) {
                    for (var e in _touchEvents) {
                        if (this._bubblingListeners.has(e)) {
                            return;
                        }
                    }
                    cc.eventManager.removeListener(this._touchListener);
                    this._touchListener = null;
                }
            },
            _checkMouseListeners: function() {
                if (this._bubblingListeners && this._mouseListener) {
                    for (var e in _mouseEvents) {
                        if (this._bubblingListeners.has(e)) {
                            return;
                        }
                    }
                    cc.eventManager.removeListener(this._mouseListener);
                    this._mouseListener = null;
                }
            },
            _hitTest: function(point, listener) {
                var apx = this._anchorPoint.x, apy = this._anchorPoint.y, w = this.width, h = this.height;
                var rect = cc.rect(-apx * w, -apy * h, w, h);
                var trans = this.getNodeToWorldTransform();
                cc._rectApplyAffineTransformIn(rect, trans);
                var left = point.x - rect.x, right = rect.x + rect.width - point.x, bottom = point.y - rect.y, top = rect.y + rect.height - point.y;
                if (left >= 0 && right >= 0 && top >= 0 && bottom >= 0) {
                    if (listener && listener.mask) {
                        var mask = listener.mask;
                        var parent = this;
                        for (var i = 0; parent && i < mask.index; ++i, parent = parent.parent) {}
                        if (parent === mask.node) {
                            return parent._hitTest(point);
                        } else {
                            listener.mask = null;
                            return true;
                        }
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            },
            _getBubblingTargets: function(type, array) {
                var parent = this.parent;
                while (parent) {
                    if (parent.hasEventListener(type)) {
                        array.push(parent);
                    }
                    parent = parent.parent;
                }
            },
            isRunning: function() {
                return this.active;
            },
            runAction: function(action) {
                if (!this.active) {
                    return;
                }
                cc.assert(action, cc._LogInfos.Node.runAction);
                if (cc.sys.isNative) {
                    this._retainAction(action);
                }
                cc.director.getActionManager().addAction(action, this, false);
                return action;
            },
            stopAllActions: function() {
                cc.director.getActionManager().removeAllActionsFromTarget(this);
            },
            stopAction: function(action) {
                cc.director.getActionManager().removeAction(action);
            },
            stopActionByTag: function(tag) {
                if (tag === cc.ACTION_TAG_INVALID) {
                    cc.log(cc._LogInfos.Node.stopActionByTag);
                    return;
                }
                cc.director.getActionManager().removeActionByTag(tag, this);
            },
            getActionByTag: function(tag) {
                if (tag === cc.ACTION_TAG_INVALID) {
                    cc.log(cc._LogInfos.Node.getActionByTag);
                    return null;
                }
                cc.director.getActionManager().getActionByTag(tag, this);
            },
            getNumberOfRunningActions: function() {
                cc.director.getActionManager().numberOfRunningActionsInTarget(this);
            },
            _retainAction: function(action) {
                if (cc.sys.isNative && action instanceof cc.Action && -1 === this._retainedActions.indexOf(action)) {
                    this._retainedActions.push(action);
                    action.retain();
                }
            },
            _releaseAllActions: function() {
                if (cc.sys.isNative) {
                    for (var i = 0; i < this._retainedActions.length; ++i) {
                        this._retainedActions[i].release();
                    }
                    this._retainedActions.length = 0;
                }
            }
        });
        if (cc.sys.isNative) {
            cc.js.getset(Node.prototype, "_sgNode", function() {
                return this.__sgNode;
            }, function(value) {
                this.__sgNode = value;
                if (this._touchListener) {
                    this._touchListener.retain();
                    cc.eventManager.removeListener(this._touchListener);
                    cc.eventManager.addListener(this._touchListener, this);
                    this._touchListener.release();
                }
                if (this._mouseListener) {
                    this._mouseListener.retain();
                    cc.eventManager.removeListener(this._mouseListener);
                    cc.eventManager.addListener(this._mouseListener, this);
                    this._mouseListener.release();
                }
            }, true);
        }
        Node.EventType = EventType;
        cc.Node = module.exports = Node;
    }, {
        "./event/event-target": 49,
        "./utils/base-node": 69,
        "./utils/misc": 71
    } ],
    16: [ function(require, module, exports) {
        var NIL = function() {};
        cc.Scene = cc.Class({
            name: "cc.Scene",
            "extends": require("./utils/base-node"),
            ctor: function() {
                var sgNode = this._sgNode = new _ccsg.Scene();
                sgNode.retain();
                sgNode.setAnchorPoint(0, 0);
                this._anchorPoint.x = 0;
                this._anchorPoint.y = 0;
                this._activeInHierarchy = false;
                this._inited = !cc.game._isCloning;
            },
            destroy: function() {
                var children = this._children;
                var DontDestroy = cc.Object.Flags.DontDestroy;
                for (var i = 0, len = children.length; i < len; ++i) {
                    var child = children[i];
                    if (child.isValid) {
                        if (!(child._objFlags & DontDestroy)) {
                            child.destroy();
                        }
                    }
                }
                this._super();
                this._activeInHierarchy = false;
            },
            _onHierarchyChanged: NIL,
            _onColorChanged: NIL,
            _onAnchorChanged: NIL,
            _onOpacityModifyRGBChanged: NIL,
            _onCascadeChanged: NIL,
            _load: function() {
                if (!this._inited) {
                    this._onBatchCreated();
                    this._inited = true;
                }
            },
            _activate: function(active) {
                active = false !== active;
                var i, child, children = this._children, len = children.length;
                if (false) {
                    for (i = 0; i < len; ++i) {
                        child = children[i];
                        child._registerIfAttached(active);
                    }
                }
                this._activeInHierarchy = active;
                for (i = 0; i < len; ++i) {
                    child = children[i];
                    if (child._active) {
                        child._onActivatedInHierarchy(active);
                    }
                }
            }
        });
        module.exports = cc.Scene;
        if (false) {
            var ERR = '"%s" is not defined in the Scene, it is only defined in child nodes.';
            Object.defineProperties(cc.Scene.prototype, {
                active: {
                    get: function() {
                        cc.error(ERR, "active");
                        return true;
                    },
                    set: function() {
                        cc.error(ERR, "active");
                    }
                },
                activeInHierarchy: {
                    get: function() {
                        cc.error(ERR, "activeInHierarchy");
                        return true;
                    }
                },
                getComponent: {
                    get: function() {
                        cc.error(ERR, "getComponent");
                        return function() {
                            return null;
                        };
                    }
                },
                addComponent: {
                    get: function() {
                        cc.error(ERR, "addComponent");
                        return function() {
                            return null;
                        };
                    }
                }
            });
        }
    }, {
        "./utils/base-node": 69
    } ],
    17: [ function(require, module, exports) {
        var RawAsset = require("./CCRawAsset");
        cc.Asset = cc.Class({
            name: "cc.Asset",
            "extends": RawAsset,
            ctor: function() {
                Object.defineProperty(this, "_uuid", {
                    value: "",
                    writable: true,
                    enumerable: false
                });
            },
            properties: {
                url: {
                    get: function() {
                        if (this._rawFiles) {
                            if (cc.AssetLibrary) {
                                var url = cc.AssetLibrary.getImportedDir(this._uuid);
                                var filename = this._rawFiles[0];
                                return url + "/" + filename;
                            } else {
                                cc.error("asset.url is not usable in core process");
                            }
                        }
                        return "";
                    },
                    visible: false
                },
                urls: {
                    get: function() {
                        if (this._rawFiles) {
                            if (cc.AssetLibrary) {
                                var url = cc.AssetLibrary.getImportedDir(this._uuid);
                                return this._rawFiles.map(function(filename) {
                                    return url + "/" + filename;
                                });
                            } else {
                                cc.error("asset.urls is not usable in core process");
                            }
                        }
                        return [];
                    },
                    visible: false
                },
                _rawFiles: null
            },
            statics: {
                deserialize: function(data) {
                    return cc.deserialize(data);
                }
            },
            serialize: function() {
                return Editor.serialize(this);
            },
            createNode: null,
            _setRawFiles: function(rawFiles) {
                rawFiles = rawFiles.map(function(item) {
                    if ("." === item.charAt(0)) {
                        item = item.slice(1);
                    }
                    var nextChar = item.charAt(0);
                    if ("/" === nextChar || "\\" === nextChar) {
                        item = item.slice(1);
                    }
                    return item;
                });
                this._rawFiles = rawFiles.length > 0 ? rawFiles : null;
            }
        });
        module.exports = cc.Asset;
    }, {
        "./CCRawAsset": 22
    } ],
    18: [ function(require, module, exports) {
        var AudioClip = cc.Class({
            name: "cc.AudioClip",
            "extends": cc.RawAsset
        });
        cc.AudioClip = AudioClip;
        module.exports = AudioClip;
    }, {} ],
    19: [ function(require, module, exports) {
        var BitmapFont = cc.Class({
            name: "cc.BitmapFont",
            "extends": cc.Font
        });
        cc.BitmapFont = BitmapFont;
        module.exports = BitmapFont;
    }, {} ],
    20: [ function(require, module, exports) {
        var Font = cc.Class({
            name: "cc.Font",
            "extends": cc.RawAsset
        });
        cc.Font = Font;
        module.exports = Font;
    }, {} ],
    21: [ function(require, module, exports) {
        function visitWrapper(wrapper, visitor) {
            visitor(wrapper);
            var children = wrapper._children;
            for (var i = 0; i < children.length; i++) {
                visitor(children[i]);
            }
        }
        var Prefab = cc.Class({
            name: "cc.Prefab",
            "extends": cc.Asset,
            properties: {
                data: null
            },
            createNode: function(cb) {
                if (false) {
                    var node = cc.instantiate(this);
                    cb(null, node);
                }
            },
            _instantiate: function() {
                var node = cc.instantiate(this.data);
                if (false) {
                    Editor.PrefabUtils.linkPrefab(this, node);
                }
                return node;
            }
        });
        cc.Prefab = module.exports = Prefab;
        cc.js.obsolete(cc, "cc._Prefab", "Prefab");
    }, {} ],
    22: [ function(require, module, exports) {
        var CCObject = require("../platform/CCObject");
        cc.RawAsset = cc.Class({
            name: "cc.RawAsset",
            "extends": CCObject,
            statics: {
                createNodeByInfo: null,
                isRawAssetType: function(ctor) {
                    return cc.isChildClassOf(ctor, cc.RawAsset) && !cc.isChildClassOf(ctor, cc.Asset);
                }
            }
        });
        module.exports = cc.RawAsset;
    }, {
        "../platform/CCObject": 55
    } ],
    23: [ function(require, module, exports) {
        var Scene = cc.Class({
            name: "cc.SceneAsset",
            "extends": cc.Asset,
            properties: {
                scene: null
            }
        });
        cc.SceneAsset = Scene;
        module.exports = Scene;
    }, {} ],
    24: [ function(require, module, exports) {
        var Script = cc.Class({
            name: "cc.Script",
            "extends": cc.Asset
        });
        cc._Script = Script;
        var JavaScript = cc.Class({
            name: "cc.JavaScript",
            "extends": Script
        });
        cc._JavaScript = JavaScript;
        var CoffeeScript = cc.Class({
            name: "cc.CoffeeScript",
            "extends": Script
        });
        cc._CoffeeScript = CoffeeScript;
    }, {} ],
    25: [ function(require, module, exports) {
        var SpriteAnimationAsset = cc.Class({
            name: "cc.SpriteAnimationAsset",
            "extends": cc.Asset,
            properties: {
                0: {
                    "default": "",
                    url: cc.Texture2D
                },
                1: {
                    "default": "",
                    url: cc.Texture2D
                },
                2: {
                    "default": "",
                    url: cc.Texture2D
                },
                3: {
                    "default": "",
                    url: cc.Texture2D
                },
                4: {
                    "default": "",
                    url: cc.Texture2D
                },
                5: {
                    "default": "",
                    url: cc.Texture2D
                },
                6: {
                    "default": "",
                    url: cc.Texture2D
                },
                7: {
                    "default": "",
                    url: cc.Texture2D
                },
                8: {
                    "default": "",
                    url: cc.Texture2D
                },
                9: {
                    "default": "",
                    url: cc.Texture2D
                },
                loop: {
                    "default": true
                },
                delay: {
                    "default": .5
                }
            }
        });
        cc.SpriteAnimationAsset = SpriteAnimationAsset;
        module.exports = SpriteAnimationAsset;
    }, {} ],
    26: [ function(require, module, exports) {
        var SpriteAtlas = cc.Class({
            name: "cc.SpriteAtlas",
            "extends": cc.Asset
        });
        cc.SpriteAtlas = SpriteAtlas;
        module.exports = SpriteAtlas;
    }, {} ],
    27: [ function(require, module, exports) {
        var TTFFont = cc.Class({
            name: "cc.TTFFont",
            "extends": cc.Font
        });
        cc.TTFFont = TTFFont;
        module.exports = TTFFont;
    }, {} ],
    28: [ function(require, module, exports) {
        var TiledMapAsset = cc.Class({
            name: "cc.TiledMapAsset",
            "extends": cc.RawAsset,
            statics: {
                createNodeByInfo: function(info, callback) {
                    if (false) {
                        var Url = require("fire-url");
                        cc.TiledMapWrapper.preloadTmx(info.url, function(err, textures) {
                            if (err) {
                                callback(err);
                                return;
                            }
                            var node;
                            try {
                                node = new cc.TMXTiledMap(info.url);
                                node._file = info.url;
                            } catch (e) {
                                return callback(e);
                            }
                            var wrapper = cc.getWrapper(node);
                            wrapper.name = Url.basenameNoExt(info.url);
                            wrapper._textures = textures;
                            return callback(null, node);
                        }.bind(this));
                    }
                }
            }
        });
        cc.TiledMapAsset = TiledMapAsset;
        module.exports = TiledMapAsset;
    }, {
        "fire-url": void 0
    } ],
    29: [ function(require, module, exports) {
        require("./CCRawAsset");
        require("./CCAsset");
        require("./CCFont");
        require("./CCPrefab");
        require("./CCAudioClip");
        require("./CCBitmapFont");
        require("./CCScripts");
        require("./CCSceneAsset");
        require("../sprites/CCSpriteFrame");
        require("../textures/CCTexture2D");
        require("./CCTTFFont");
        require("./CCSpriteAnimation");
        require("./CCSpriteAtlas");
        require("./CCTiledMapAsset");
    }, {
        "../sprites/CCSpriteFrame": 103,
        "../textures/CCTexture2D": 103,
        "./CCAsset": 17,
        "./CCAudioClip": 18,
        "./CCBitmapFont": 19,
        "./CCFont": 20,
        "./CCPrefab": 21,
        "./CCRawAsset": 22,
        "./CCSceneAsset": 23,
        "./CCScripts": 24,
        "./CCSpriteAnimation": 25,
        "./CCSpriteAtlas": 26,
        "./CCTTFFont": 27,
        "./CCTiledMapAsset": 28
    } ],
    30: [ function(require, module, exports) {
        function getParentSize(parent) {
            if (parent instanceof cc.Scene) {
                return false ? cc.engine.getDesignResolutionSize() : cc.visibleRect;
            } else {
                if (!parent._sizeProvider || parent._sizeProvider instanceof _ccsg.Node) {
                    return parent._contentSize;
                } else {
                    return parent.getContentSize();
                }
            }
        }
        function alignToParent(node, widget) {
            var parent = node._parent;
            var parentSize = getParentSize(parent);
            var parentWidth = parentSize.width;
            var parentHeight = parentSize.height;
            var parentAnchor = parent._anchorPoint;
            var localLeft, localRight, localTop, localBottom;
            if (true && parent instanceof cc.Scene) {
                var visibleRect = cc.visibleRect;
                localLeft = visibleRect.left.x;
                localRight = visibleRect.right.x;
                localBottom = visibleRect.bottom.y;
                localTop = visibleRect.top.y;
            } else {
                localLeft = -parentAnchor.x * parentWidth;
                localRight = localLeft + parentWidth;
                localBottom = -parentAnchor.y * parentHeight;
                localTop = localBottom + parentHeight;
            }
            localLeft += widget._isAbsLeft ? widget._left : widget._left * parentWidth;
            localRight -= widget._isAbsRight ? widget._right : widget._right * parentWidth;
            localBottom += widget._isAbsBottom ? widget._bottom : widget._bottom * parentHeight;
            localTop -= widget._isAbsTop ? widget._top : widget._top * parentHeight;
            var anchor = node.getAnchorPoint();
            var width, x = node._position.x, anchorX = anchor.x;
            if (widget.isStretchWidth) {
                width = localRight - localLeft;
                node.width = width;
                x = localLeft + anchorX * width;
            } else {
                width = node.width;
                if (widget.isAlignHorizontalCenter) {
                    var parentCenter = (.5 - parentAnchor.x) * parentWidth;
                    x = parentCenter + (anchorX - .5) * width;
                } else {
                    if (widget.isAlignLeft) {
                        x = localLeft + anchorX * width;
                    } else {
                        if (widget.isAlignRight) {
                            x = localRight + anchorX * width - width;
                        }
                    }
                }
            }
            var height, y = node._position.y, anchorY = anchor.y;
            if (widget.isStretchHeight) {
                height = localTop - localBottom;
                node.height = height;
                y = localBottom + anchorY * height;
            } else {
                height = node.height;
                if (widget.isAlignVerticalCenter) {
                    var parentMiddle = (.5 - parentAnchor.y) * parentHeight;
                    y = parentMiddle + (anchorY - .5) * height;
                } else {
                    if (widget.isAlignBottom) {
                        y = localBottom + anchorY * height;
                    } else {
                        if (widget.isAlignTop) {
                            y = localTop + anchorY * height - height;
                        }
                    }
                }
            }
            node.setPosition(x, y);
        }
        function visitNode(node) {
            var widget = node._widget;
            if (widget) {
                alignToParent(node, widget);
            }
            var children = node._children;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child._active) {
                    visitNode(child);
                }
            }
        }
        function visit() {
            var scene = cc.director.getScene();
            if (scene) {
                widgetManager.isAligning = true;
                visitNode(scene);
                widgetManager.isAligning = false;
            }
        }
        var adjustWidgetToAllowMovingInEditor = false;
        var adjustWidgetToAllowResizingInEditor = false;
        var widgetManager = cc._widgetManager = {
            isAligning: false,
            init: function(director) {
                director.on(cc.Director.EVENT_BEFORE_VISIT, visit);
            },
            add: function(widget) {
                widget.node._widget = widget;
                if (false) {
                    widget.node.on("position-changed", adjustWidgetToAllowMovingInEditor, widget);
                    widget.node.on("size-changed", adjustWidgetToAllowResizingInEditor, widget);
                }
            },
            remove: function(widget) {
                widget.node._widget = null;
                if (false) {
                    widget.node.off("position-changed", adjustWidgetToAllowMovingInEditor, widget);
                    widget.node.off("size-changed", adjustWidgetToAllowResizingInEditor, widget);
                }
            },
            _getParentSize: getParentSize
        };
    }, {} ],
    31: [ function(require, module, exports) {
        var AnimationAnimator = require("../../animation/animation-animator");
        var AnimationClip = require("../../animation/animation-clip");
        function equalClips(clip1, clip2) {
            if (clip1 === clip2) {
                return true;
            }
            return clip1 && clip2 && (clip1.name === clip2.name || clip1._uuid === clip2._uuid);
        }
        var Animation = cc.Class({
            name: "cc.Animation",
            "extends": require("./CCComponent"),
            editor: false,
            ctor: function() {
                this._animator = null;
                this._nameToState = {};
                this._didInit = false;
                this._currentClip = null;
            },
            properties: {
                _defaultClip: {
                    "default": null,
                    type: AnimationClip
                },
                defaultClip: {
                    type: AnimationClip,
                    get: function() {
                        return this._defaultClip;
                    },
                    set: function(value) {
                        var engine = cc.engine;
                        if (true) {
                            return;
                        }
                        this._defaultClip = value;
                        var clips = this._clips;
                        for (var i = 0, l = clips.length; i < l; i++) {
                            if (equalClips(value, clips[i])) {
                                return;
                            }
                        }
                        this.addClip(value);
                    },
                    tooltip: "i18n:COMPONENT.animation.default_clip"
                },
                currentClip: {
                    get: function() {
                        return this._currentClip;
                    },
                    set: function(value, force) {
                        this._currentClip = value;
                        if (false) {
                            this._updateClip(value);
                        }
                    },
                    type: AnimationClip,
                    visible: false
                },
                _clips: {
                    "default": [],
                    type: [ AnimationClip ],
                    tooltip: "i18n:COMPONENT.animation.clips",
                    visible: true
                },
                playOnLoad: {
                    "default": false,
                    tooltip: "i18n:COMPONENT.animation.play_on_load"
                }
            },
            onLoad: function() {
                if (false) {
                    return;
                }
                this._init();
                if (this.playOnLoad && this._defaultClip) {
                    var state = this.getAnimationState(this._defaultClip.name);
                    this._animator.playState(state);
                }
            },
            onDisable: function() {
                this.stop();
            },
            getClips: function() {
                return this._clips;
            },
            play: function(name, startTime) {
                this._init();
                var state = this.getAnimationState(name || this._defaultClip.name);
                if (state) {
                    var animator = this._animator;
                    if (animator.isPlaying && state.isPlaying) {
                        if (state.isPaused) {
                            animator.resumeState(state);
                        } else {
                            animator.stopState(state);
                            animator.playState(state, startTime);
                        }
                    } else {
                        animator.playState(state, startTime);
                    }
                    this.currentClip = state.clip;
                }
                return state;
            },
            stop: function(name) {
                if (!this._didInit) {
                    return;
                }
                if (name) {
                    var state = this._nameToState[name];
                    if (state) {
                        this._animator.stopState(state);
                    }
                } else {
                    this._animator.stop();
                }
            },
            pause: function(name) {
                if (!this._didInit) {
                    return;
                }
                if (name) {
                    var state = this._nameToState[name];
                    if (state) {
                        this._animator.pauseState(state);
                    }
                } else {
                    this._animator.pause();
                }
            },
            resume: function(name) {
                if (!this._didInit) {
                    return;
                }
                if (name) {
                    var state = this._nameToState[name];
                    if (state) {
                        this._animator.resumeState(state);
                    }
                } else {
                    this._animator.resume();
                }
            },
            setCurrentTime: function(time, name) {
                this._init();
                if (name) {
                    var state = this._nameToState[name];
                    if (state) {
                        this._animator.setStateTime(state, time);
                    }
                } else {
                    for (var name in this._nameToState) {
                        state = this._nameToState[name];
                        this._animator.setStateTime(state, time);
                    }
                }
            },
            getAnimationState: function(name) {
                this._init();
                var state = this._nameToState[name];
                if (false) {
                    this._didInit = false;
                    if (this.animator) {
                        this.animator.stop();
                    }
                    this._init();
                    state = this._nameToState[name];
                }
                return state || null;
            },
            addClip: function(clip, newName) {
                if (!clip) {
                    cc.warn("Invalid clip to add");
                    return;
                }
                this._init();
                if (!cc.js.array.contains(this._clips, clip)) {
                    this._clips.push(clip);
                }
                newName = newName || clip.name;
                var oldState = this._nameToState[newName];
                if (oldState) {
                    if (oldState.clip === clip) {
                        return oldState;
                    } else {
                        this._clips.splice(this._clips.indexOf(oldState.clip), 1);
                    }
                }
                var newState = new cc.AnimationState(clip, newName);
                this._nameToState[newName] = newState;
                return newState;
            },
            _removeStateIfNotUsed: function(state, force) {
                var needRemove = state.clip !== this._defaultClip && !cc.js.array.contains(this._clips, state.clip);
                if (force || needRemove) {
                    if (state.isPlaying) {
                        this.stop(state.name);
                    }
                    delete this._nameToState[state.name];
                }
            },
            removeClip: function(clip, force) {
                if (!clip) {
                    cc.warn("Invalid clip to remove");
                    return;
                }
                this._init();
                this._clips = this._clips.filter(function(item) {
                    return item !== clip;
                });
                var state;
                for (var name in this._nameToState) {
                    state = this._nameToState[name];
                    var stateClip = state.clip;
                    if (stateClip === clip) {
                        this._removeStateIfNotUsed(state, force);
                    }
                }
            },
            sample: function() {
                this._init();
                this._animator.sample();
            },
            _init: function() {
                if (this._didInit) {
                    return;
                }
                this._didInit = true;
                this._animator = new AnimationAnimator(this.node, this);
                this._createStates();
            },
            _createStates: function() {
                var state = null;
                var defaultClipState = false;
                for (var i = 0; i < this._clips.length; ++i) {
                    var clip = this._clips[i];
                    if (clip) {
                        state = new cc.AnimationState(clip);
                        if (false) {
                            this._animator.reloadClip(state);
                        }
                        this._nameToState[state.name] = state;
                        if (equalClips(this._defaultClip, clip)) {
                            defaultClipState = state;
                        }
                    }
                }
                if (this._defaultClip && !defaultClipState) {
                    state = new cc.AnimationState(this._defaultClip);
                    if (false) {
                        this._animator.reloadClip(state);
                    }
                    this._nameToState[state.name] = state;
                }
            },
            _updateClip: false
        });
        cc.Animation = module.exports = Animation;
    }, {
        "../../animation/animation-animator": 2,
        "../../animation/animation-clip": 3,
        "./CCComponent": 35
    } ],
    32: [ function(require, module, exports) {
        var audioEngine = cc.audioEngine;
        var AudioSource = cc.Class({
            name: "cc.AudioSource",
            "extends": require("./CCComponent"),
            editor: false,
            ctor: function() {
                this.audio = null;
            },
            properties: {
                _clip: {
                    "default": "",
                    url: cc.AudioClip
                },
                _volume: 1,
                _mute: false,
                _loop: false,
                isPlaying: {
                    get: function() {
                        return !cc.sys.isNative && this.audio && this.audio.getPlaying();
                    },
                    visible: false
                },
                clip: {
                    get: function() {
                        return this._clip;
                    },
                    set: function(value) {
                        this._clip = value;
                    },
                    url: cc.AudioClip,
                    tooltip: "i18n.COMPONENT.audio.clip",
                    animatable: false
                },
                volume: {
                    get: function() {
                        return this._volume;
                    },
                    set: function(value) {
                        this._volume = value;
                        if (this.audio) {
                            if (cc.sys.isNative) {
                                cc.audioEngine.setEffectsVolume(value);
                            } else {
                                this.audio.setVolume(value);
                            }
                        }
                    },
                    tooltip: "i18n.COMPONENT.audio.volume"
                },
                mute: {
                    get: function() {
                        return this._mute;
                    },
                    set: function(value) {
                        this._mute = value;
                        if (this.audio) {
                            if (this._mute) {
                                if (cc.sys.isNative) {
                                    cc.audioEngine.setEffectsVolume(0);
                                } else {
                                    this.audio.setVolume(0);
                                }
                            } else {
                                if (cc.sys.isNative) {
                                    cc.audioEngine.setEffectsVolume(this._volume);
                                } else {
                                    this.audio.setVolume(this._volume);
                                }
                            }
                        }
                    },
                    animatable: false,
                    tooltip: "i18n.COMPONENT.audio.mute"
                },
                loop: {
                    get: function() {
                        return this._loop;
                    },
                    set: function(value) {
                        this._loop = value;
                        if ("object" === typeof this.audio) {
                            this.audio.loop = this._loop;
                        }
                    },
                    animatable: false,
                    tooltip: "i18n.COMPONENT.audio.loop"
                },
                playOnLoad: {
                    "default": false,
                    tooltip: "i18n.COMPONENT.audio.play_on_load",
                    animatable: false
                }
            },
            onLoad: function() {
                if (this.isPlaying) {
                    this.stop();
                }
            },
            onEnable: function() {
                if (this.playOnLoad) {
                    this.play();
                }
            },
            onDisable: function() {
                this.stop();
            },
            onDestroy: function() {
                this.stop();
            },
            play: function() {
                if (this._clip) {
                    this.audio = audioEngine.playEffect(this._clip, this._loop);
                }
            },
            stop: function() {
                if (this.audio) {
                    cc.audioEngine.stopEffect(this.audio);
                }
            },
            pause: function() {
                if (this.audio) {
                    cc.audioEngine.pauseEffect(this.audio);
                }
            },
            resume: function() {
                if (this.audio) {
                    cc.audioEngine.resumeEffect(this.audio);
                }
            },
            rewind: function() {
                if (this.audio) {
                    cc.audioEngine.stopEffect(this.audio);
                    cc.audioEngine.playEffect(this.audio);
                }
            }
        });
        cc.AudioSource = module.exports = AudioSource;
    }, {
        "./CCComponent": 35
    } ],
    33: [ function(require, module, exports) {
        var Transition = cc.Enum({
            NONE: 0,
            COLOR: 1,
            SPRITE: 2
        });
        var Button = cc.Class({
            name: "cc.Button",
            "extends": require("./CCComponent"),
            ctor: function() {
                this._pressed = false;
                this._hovered = false;
                this._sprite = null;
                this._fromColor = null;
                this._toColor = null;
                this._time = 0;
                this._transitionFinished = true;
            },
            editor: false,
            properties: {
                interactable: {
                    "default": true,
                    tooltip: "i18n:COMPONENT.button.interactable",
                    notify: function() {
                        this._updateState();
                    },
                    animatable: false
                },
                transition: {
                    "default": Transition.NONE,
                    tooltip: "i18n:COMPONENT.button.transition",
                    type: Transition,
                    animatable: false
                },
                normalColor: {
                    "default": cc.color(214, 214, 214),
                    displayName: "Normal",
                    tooltip: "i18n:COMPONENT.button.normal_color",
                    notify: function() {
                        this._updateState();
                    }
                },
                pressedColor: {
                    "default": cc.color(211, 211, 211),
                    displayName: "Pressed",
                    tooltip: "i18n:COMPONENT.button.pressed_color"
                },
                hoverColor: {
                    "default": cc.Color.WHITE,
                    displayName: "Hover",
                    tooltip: "i18n:COMPONENT.button.hover_color"
                },
                disabledColor: {
                    "default": cc.color(124, 124, 124),
                    displayName: "Disabled",
                    tooltip: "i18n:COMPONENT.button.diabled_color",
                    notify: function() {
                        this._updateState();
                    }
                },
                duration: {
                    "default": .1,
                    range: [ 0, Number.MAX_VALUE ],
                    tooltip: "i18n:COMPONENT.button.duration"
                },
                normalSprite: {
                    "default": null,
                    type: cc.SpriteFrame,
                    displayName: "Normal",
                    tooltip: "i18n:COMPONENT.button.normal_sprite",
                    notify: function() {
                        this._updateState();
                    }
                },
                pressedSprite: {
                    "default": null,
                    type: cc.SpriteFrame,
                    displayName: "Pressed",
                    tooltip: "i18n:COMPONENT.button.pressed_sprite"
                },
                hoverSprite: {
                    "default": null,
                    type: cc.SpriteFrame,
                    displayName: "Hover",
                    tooltip: "i18n:COMPONENT.button.hover_sprite"
                },
                disabledSprite: {
                    "default": null,
                    type: cc.SpriteFrame,
                    displayName: "Disabled",
                    tooltip: "i18n:COMPONENT.button.disabled_sprite",
                    notify: function() {
                        this._updateState();
                    }
                },
                target: {
                    "default": null,
                    type: cc.Node,
                    tooltip: "i18n:COMPONENT.button.target",
                    notify: function() {
                        this._applyTarget();
                    }
                },
                clickEvents: {
                    "default": [],
                    type: cc.Component.EventHandler,
                    tooltip: "i18n:COMPONENT.button.click_events"
                }
            },
            statics: {
                Transition: Transition
            },
            onLoad: function() {
                if (!this.target) {
                    this.target = this.node;
                }
                if (true) {
                    this._registerEvent();
                }
            },
            start: function() {
                this._applyTarget();
                this._updateState();
            },
            update: function(dt) {
                var target = this.target;
                if (!this.transition === Transition.COLOR || !target || this._transitionFinished) {
                    return;
                }
                this.time += dt;
                var ratio = this.time / this.duration;
                if (ratio > 1) {
                    ratio = 1;
                    this._transitionFinished = true;
                }
                target.color = this._fromColor.lerp(this._toColor, ratio);
            },
            _registerEvent: function() {
                this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
                this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
                this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
                this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
                this.node.on(cc.Node.EventType.MOUSE_ENTER, this._onMouseMoveIn, this);
                this.node.on(cc.Node.EventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
            },
            _handleClickEvent: function() {
                var events = this.clickEvents;
                for (var i = 0, l = events.length; i < l; i++) {
                    var event = events[i];
                    var target = event.target;
                    if (!target) {
                        continue;
                    }
                    var comp = target.getComponent(event.component);
                    if (!comp) {
                        continue;
                    }
                    var handler = comp[event.handler];
                    if (!handler) {
                        continue;
                    }
                    handler.call(comp);
                }
            },
            _cancelButtonClick: function() {
                this._pressed = false;
            },
            _applyTarget: function() {
                var target = this.target;
                if (target) {
                    this._sprite = target.getComponent(cc.Sprite);
                } else {
                    this._sprite = null;
                }
            },
            _onTouchBegan: function(event) {
                if (!this.interactable || !this.enabledInHierarchy) {
                    return;
                }
                this._pressed = true;
                this._updateState();
            },
            _onTouchMove: function(event) {
                var touch = event.touch;
                var hit = this.node._hitTest(touch.getLocation());
                if (this._hovered !== hit) {
                    this._hovered = hit;
                    this._updateState();
                }
            },
            _onTouchEnded: function() {
                if (this._pressed) {
                    this._handleClickEvent();
                }
                this._pressed = false;
                this._updateState();
            },
            _onTouchCancel: function() {
                this._pressed = false;
                this._updateState();
            },
            _onMouseMoveIn: function(event) {
                if (this._pressed || !this.interactable || !this.enabledInHierarchy) {
                    return;
                }
                if (!this._hovered) {
                    this._hovered = true;
                    this._updateState();
                }
            },
            _onMouseMoveOut: function() {
                if (!this.interactable || !this.enabledInHierarchy) {
                    return;
                }
                if (this._hovered) {
                    this._hovered = false;
                    this._updateState();
                }
            },
            _updateState: function() {
                var state;
                if (!this.interactable) {
                    state = "disabled";
                } else {
                    if (this._pressed) {
                        state = "pressed";
                    } else {
                        if (this._hovered) {
                            state = "hover";
                        } else {
                            state = "normal";
                        }
                    }
                }
                var color = this[state + "Color"];
                var sprite = this[state + "Sprite"];
                this._applyTransition(color, sprite);
            },
            _applyTransition: function(color, sprite) {
                var transition = this.transition;
                if (transition === Transition.COLOR) {
                    var target = this.target;
                    if (false) {
                        target.color = color;
                    } else {
                        this._fromColor = target.color.clone();
                        this._toColor = color;
                        this.time = 0;
                        this._transitionFinished = false;
                    }
                } else {
                    if (transition === Transition.SPRITE && this._sprite && sprite) {
                        this._sprite.spriteFrame = sprite;
                    }
                }
            }
        });
        cc.Button = module.exports = Button;
    }, {
        "./CCComponent": 35
    } ],
    34: [ function(require, module, exports) {
        var designResolutionWrapper = {
            getContentSize: function() {
                return false ? cc.engine.getDesignResolutionSize() : cc.visibleRect;
            },
            setContentSize: function(size) {},
            _getWidth: function() {
                return this.getContentSize().width;
            },
            _getHeight: function() {
                return this.getContentSize().height;
            }
        };
        var Canvas = cc.Class({
            name: "cc.Canvas",
            "extends": require("./CCComponent"),
            editor: false,
            statics: {
                instance: null
            },
            properties: {
                _designResolution: cc.size(960, 640),
                designResolution: {
                    get: function() {
                        return cc.size(this._designResolution);
                    },
                    set: function(value) {
                        this._designResolution.width = value.width;
                        this._designResolution.height = value.height;
                        this.applySettings();
                    },
                    tooltip: "i18n:COMPONENT.canvas.design_resolution"
                },
                _fitWidth: false,
                _fitHeight: true,
                fitHeight: {
                    get: function() {
                        return this._fitHeight;
                    },
                    set: function(value) {
                        if (this._fitHeight !== value) {
                            this._fitHeight = value;
                            this.applySettings();
                        }
                    },
                    tooltip: "i18n:COMPONENT.canvas.fit_height"
                },
                fitWidth: {
                    get: function() {
                        return this._fitWidth;
                    },
                    set: function(value) {
                        if (this._fitWidth !== value) {
                            this._fitWidth = value;
                            this.applySettings();
                        }
                    },
                    tooltip: "i18n:COMPONENT.canvas.fit_width"
                }
            },
            ctor: function() {
                this._thisOnResized = this.onResized.bind(this);
            },
            onLoad: function() {
                var Flags = cc.Object.Flags;
                this._objFlags |= Flags.IsPositionLocked | Flags.IsAnchorLocked | Flags.IsSizeLocked;
                if (Canvas.instance) {
                    return cc.error("Can't init canvas '%s' because it conflicts with the existing '%s', the scene should only have one active canvas at the same time", this.node.name, Canvas.instance.node.name);
                }
                Canvas.instance = this;
                if (!this.node._sizeProvider) {
                    this.node._sizeProvider = designResolutionWrapper;
                } else {
                    cc.error("CCCanvas: Node can only have one size.");
                }
                cc.director.on(cc.Director.EVENT_BEFORE_VISIT, this.alignWithScreen, this);
                if (false) {
                    cc.engine.on("design-resolution-changed", this._thisOnResized);
                } else {
                    if (!cc.sys.isNative) {
                        if (cc.sys.isMobile) {
                            window.addEventListener("resize", this._thisOnResized);
                        } else {
                            cc.eventManager.addCustomListener("canvas-resize", this._thisOnResized);
                        }
                    }
                }
                this.applySettings();
                this.onResized();
            },
            onDestroy: function() {
                if (this.node._sizeProvider === designResolutionWrapper) {
                    this.node._sizeProvider = null;
                }
                cc.director.off(cc.Director.EVENT_BEFORE_VISIT, this.alignWithScreen, this);
                if (false) {
                    cc.engine.off("design-resolution-changed", this._thisOnResized);
                } else {
                    if (!cc.sys.isNative) {
                        if (cc.sys.isMobile) {
                            window.removeEventListener("resize", this._thisOnResized);
                        } else {
                            cc.eventManager.removeCustomListeners("canvas-resize", this._thisOnResized);
                        }
                    }
                }
                if (Canvas.instance === this) {
                    Canvas.instance = null;
                }
            },
            alignWithScreen: function() {
                var designSize;
                if (false) {
                    designSize = cc.engine.getDesignResolutionSize();
                    this.node.setPosition(.5 * designSize.width, .5 * designSize.height);
                } else {
                    var canvasSize = cc.visibleRect;
                    var clipTopRight = !this.fitHeight && !this.fitWidth;
                    var offsetX = 0;
                    var offsetY = 0;
                    if (clipTopRight) {
                        designSize = cc.view.getDesignResolutionSize();
                        offsetX = .5 * (designSize.width - canvasSize.width);
                        offsetY = .5 * (designSize.height - canvasSize.height);
                    }
                    this.node.setPosition(.5 * canvasSize.width + offsetX, .5 * canvasSize.height + offsetY);
                }
            },
            onResized: function() {
                this.alignWithScreen();
            },
            applySettings: function() {
                var ResolutionPolicy = cc.ResolutionPolicy;
                var policy;
                if (this.fitHeight && this.fitWidth) {
                    policy = ResolutionPolicy.SHOW_ALL;
                } else {
                    if (!this.fitHeight && !this.fitWidth) {
                        policy = ResolutionPolicy.NO_BORDER;
                    } else {
                        if (this.fitWidth) {
                            policy = ResolutionPolicy.FIXED_WIDTH;
                        } else {
                            policy = ResolutionPolicy.FIXED_HEIGHT;
                        }
                    }
                }
                var designRes = this._designResolution;
                if (false) {
                    cc.engine.setDesignResolutionSize(designRes.width, designRes.height);
                } else {
                    cc.view.setDesignResolutionSize(designRes.width, designRes.height, policy);
                }
            }
        });
        cc.Canvas = module.exports = Canvas;
    }, {
        "./CCComponent": 35
    } ],
    35: [ function(require, module, exports) {
        require("../platform/CCObject");
        require("../CCNode");
        var Flags = cc.Object.Flags;
        var IsOnEnableCalled = Flags.IsOnEnableCalled;
        var IsOnLoadStarted = Flags.IsOnLoadStarted;
        var IsOnLoadCalled = Flags.IsOnLoadCalled;
        var IsOnStartCalled = Flags.IsOnStartCalled;
        var ExecInTryCatchTmpl = false;
        if (false) {
            ExecInTryCatchTmpl = "(function call_FUNC_InTryCatch (c) { c._FUNC_() })";
        }
        var callOnEnableInTryCatch = false;
        var callOnDisableInTryCatch = false;
        var callOnLoadInTryCatch = false;
        var callStartInTryCatch = false;
        var callOnDestroyInTryCatch = false;
        var callOnFocusInTryCatch = false;
        var callOnLostFocusInTryCatch = false;
        function callOnEnable(self, enable) {
            if (false) {
                if (!(cc.engine.isPlaying || self.constructor._executeInEditMode)) {
                    return;
                }
            }
            var enableCalled = self._objFlags & IsOnEnableCalled;
            if (enable) {
                if (!enableCalled) {
                    if (self.onEnable) {
                        if (false) {
                            callOnEnableInTryCatch(self);
                        } else {
                            self.onEnable();
                        }
                    }
                    cc.director.getScheduler().resumeTarget(self);
                    _registerEvent(self, true);
                    self._objFlags |= IsOnEnableCalled;
                }
            } else {
                if (enableCalled) {
                    if (self.onDisable) {
                        if (false) {
                            callOnDisableInTryCatch(self);
                        } else {
                            self.onDisable();
                        }
                    }
                    cc.director.getScheduler().pauseTarget(self);
                    _registerEvent(self, false);
                    self._objFlags &= ~IsOnEnableCalled;
                }
            }
        }
        function _registerEvent(self, on) {
            if (false) {
                return;
            }
            if (on && self.start && !(self._objFlags & IsOnStartCalled)) {
                cc.director.once(cc.Director.EVENT_BEFORE_UPDATE, _callStart, self);
            }
            if (self.update) {
                if (on) {
                    cc.director.on(cc.Director.EVENT_COMPONENT_UPDATE, _callUpdate, self);
                } else {
                    cc.director.off(cc.Director.EVENT_COMPONENT_UPDATE, _callUpdate, self);
                }
            }
            if (self.lateUpdate) {
                if (on) {
                    cc.director.on(cc.Director.EVENT_COMPONENT_LATE_UPDATE, _callLateUpdate, self);
                } else {
                    cc.director.off(cc.Director.EVENT_COMPONENT_LATE_UPDATE, _callLateUpdate, self);
                }
            }
        }
        var _callStart = false ? function() {
            callStartInTryCatch(this);
            this._objFlags |= IsOnStartCalled;
        } : function() {
            this.start();
            this._objFlags |= IsOnStartCalled;
        };
        var _callUpdate = false ? function(event) {
            try {
                this.update(event.detail);
            } catch (e) {
                cc._throw(e);
            }
        } : function(event) {
            this.update(event.detail);
        };
        var _callLateUpdate = false ? function(event) {
            try {
                this.lateUpdate(event.detail);
            } catch (e) {
                cc._throw(e);
            }
        } : function(event) {
            this.lateUpdate(event.detail);
        };
        var CompId = 0;
        var IdPrefix = false;
        var getNewId = false;
        var Component = cc.Class({
            name: "cc.Component",
            "extends": cc.Object,
            ctor: function() {
                if (false) {
                    Editor._AssetsWatcher.initComponent(this);
                }
                Object.defineProperty(this, "_id", {
                    value: "",
                    enumerable: false
                });
                this.__instanceId = this._id || cc.ClassManager.getNewInstanceId();
            },
            properties: {
                node: {
                    "default": null,
                    visible: false
                },
                name: {
                    get: function() {
                        return this._name || this.node.name;
                    },
                    set: function(value) {
                        this._name = value;
                    },
                    visible: false
                },
                _id: {
                    "default": "",
                    serializable: false
                },
                uuid: {
                    get: function() {
                        var id = this._id;
                        if (id) {
                            return id;
                        }
                        if (false) {
                            id = this._id = getNewId();
                            cc.engine.attachedObjsForEditor[id] = this;
                            return id;
                        }
                    },
                    visible: false
                },
                __scriptAsset: false,
                _enabled: true,
                enabled: {
                    get: function() {
                        return this._enabled;
                    },
                    set: function(value) {
                        if (this._enabled !== value) {
                            this._enabled = value;
                            if (this.node._activeInHierarchy) {
                                callOnEnable(this, value);
                            }
                        }
                    },
                    visible: false
                },
                enabledInHierarchy: {
                    get: function() {
                        return this._enabled && this.node._activeInHierarchy;
                    },
                    visible: false
                },
                _isOnLoadCalled: {
                    get: function() {
                        return this._objFlags & IsOnLoadCalled;
                    }
                },
                __eventTargets: {
                    "default": [],
                    serializable: false
                },
                localSize: {
                    get: function() {
                        return cc.size(0, 0);
                    },
                    visible: false
                }
            },
            update: null,
            lateUpdate: null,
            onLoad: null,
            start: null,
            onEnable: null,
            onDisable: null,
            onDestroy: null,
            onFocusInEditor: null,
            onLostFocusInEditor: null,
            addComponent: function(typeOrTypename) {
                return this.node.addComponent(typeOrTypename);
            },
            getComponent: function(typeOrTypename) {
                return this.node.getComponent(typeOrTypename);
            },
            destroy: function() {
                if (false) {
                    var depend = this.node._getDependComponent(this);
                    if (depend) {
                        return cc.error("Can't remove '%s' because '%s' depends on it.", cc.js.getClassName(this), cc.js.getClassName(depend));
                    }
                }
                if (this._super()) {
                    if (this._enabled && this.node._activeInHierarchy) {
                        callOnEnable(this, false);
                    }
                }
            },
            __onNodeActivated: false ? function(active) {
                if (!(this._objFlags & IsOnLoadStarted) && (cc.engine._isPlaying || this.constructor._executeInEditMode)) {
                    this._objFlags |= IsOnLoadStarted;
                    if (this.onLoad) {
                        callOnLoadInTryCatch(this);
                    }
                    this._objFlags |= IsOnLoadCalled;
                    if (this.onLoad && !cc.engine._isPlaying) {
                        var focused = Editor.Selection.curActivate("node") === this.node.uuid;
                        if (focused && this.onFocusInEditor) {
                            callOnFocusInTryCatch(this);
                        } else {
                            if (this.onLostFocusInEditor) {
                                callOnLostFocusInTryCatch(this);
                            }
                        }
                    }
                    Editor._AssetsWatcher.start(this);
                }
                if (this._enabled) {
                    callOnEnable(this, active);
                }
            } : function(active) {
                if (!(this._objFlags & IsOnLoadStarted)) {
                    this._objFlags |= IsOnLoadStarted;
                    if (this.onLoad) {
                        this.onLoad();
                    }
                    this._objFlags |= IsOnLoadCalled;
                }
                if (this._enabled) {
                    callOnEnable(this, active);
                }
            },
            _onPreDestroy: function() {
                var i, l, target;
                callOnEnable(this, false);
                this.unscheduleAllCallbacks();
                for (i = 0, l = this.__eventTargets.length; i < l; ++i) {
                    target = this.__eventTargets[i];
                    target && target.targetOff(this);
                }
                this.__eventTargets.length = 0;
                cc.eventManager.removeListeners(this);
                if (false) {
                    Editor._AssetsWatcher.stop(this);
                    if (cc.engine._isPlaying || this.constructor._executeInEditMode) {
                        if (this.onDestroy) {
                            callOnDestroyInTryCatch(this);
                        }
                    }
                } else {
                    if (this.onDestroy) {
                        this.onDestroy();
                    }
                }
                this.node._removeComponent(this);
                if (false) {
                    delete cc.engine.attachedObjsForEditor[this._id];
                }
            },
            isRunning: function() {
                return this.enabledInHierarchy;
            },
            schedule: function(callback, interval, repeat, delay) {
                cc.assert(callback, cc._LogInfos.Node.schedule);
                cc.assert(interval >= 0, cc._LogInfos.Node.schedule_2);
                interval = interval || 0;
                repeat = isNaN(repeat) ? cc.REPEAT_FOREVER : repeat;
                delay = delay || 0;
                cc.director.getScheduler().scheduleCallbackForTarget(this, callback, interval, repeat, delay, !this.enabledInHierarchy);
            },
            scheduleOnce: function(callback, delay) {
                this.schedule(callback, 0, 0, delay);
            },
            unschedule: function(callback_fn) {
                if (!callback_fn) {
                    return;
                }
                cc.director.getScheduler().unschedule(callback_fn, this);
            },
            unscheduleAllCallbacks: function() {
                cc.director.getScheduler().unscheduleAllForTarget(this);
            }
        });
        Component._requireComponent = null;
        if (false) {
            Component._executeInEditMode = false;
            Component._playOnFocus = false;
            Component._disallowMultiple = null;
            Object.defineProperty(Component, "_inspector", {
                value: "",
                enumerable: false
            });
            Object.defineProperty(Component, "_icon", {
                value: "",
                enumerable: false
            });
            cc._componentMenuItems = [];
            Component._addMenuItem = function(cls, path, priority) {
                cc._componentMenuItems.push({
                    component: cls,
                    menuPath: path,
                    priority: priority
                });
            };
        }
        Object.defineProperty(Component, "_registerEditorProps", {
            value: function(cls, props) {
                var reqComp = props.requireComponent;
                if (reqComp) {
                    cls._requireComponent = reqComp;
                }
                if (false) {
                    var name = cc.js.getClassName(cls);
                    for (var key in props) {
                        var val = props[key];
                        switch (key) {
                          case "executeInEditMode":
                            cls._executeInEditMode = !!val;
                            break;

                          case "playOnFocus":
                            if (val) {
                                var willExecuteInEditMode = "executeInEditMode" in props ? props.executeInEditMode : cls._executeInEditMode;
                                if (willExecuteInEditMode) {
                                    cls._playOnFocus = true;
                                } else {
                                    cc.warn('The editor property "playOnFocus" should be used with "executeInEditMode" in class "%s".', name);
                                }
                            }
                            break;

                          case "inspector":
                            Object.defineProperty(cls, "_inspector", {
                                value: val
                            });
                            break;

                          case "icon":
                            Object.defineProperty(cls, "_icon", {
                                value: val
                            });
                            break;

                          case "menu":
                            Component._addMenuItem(cls, val, props.menuPriority);
                            break;

                          case "disallowMultiple":
                            cls._disallowMultiple = cls;
                            break;

                          case "requireComponent":
                            break;

                          default:
                            cc.warn('Unknown editor property "%s" in class "%s".', key, name);
                        }
                    }
                }
            }
        });
        Component.prototype.__scriptUuid = "";
        cc.Component = module.exports = Component;
    }, {
        "../CCNode": 15,
        "../platform/CCObject": 55
    } ],
    36: [ function(require, module, exports) {
        cc.Component.EventHandler = cc.Class({
            name: "cc.ClickEvent",
            properties: {
                target: {
                    "default": null,
                    type: cc.Node
                },
                component: {
                    "default": ""
                },
                handler: {
                    "default": ""
                }
            }
        });
    }, {} ],
    37: [ function(require, module, exports) {
        var SceneGraphHelper = require("../utils/scene-graph-helper");
        var ComponentInSG = cc.Class({
            "extends": require("./CCComponent"),
            editor: false,
            ctor: function() {
                this._sgNode = this._createSgNode();
                this._sgNode.retain();
            },
            onLoad: function() {
                var sgNode = this._sgNode;
                this._initSgNode();
                this._appendSgNode(sgNode);
                if (!this.node._sizeProvider) {
                    this.node._sizeProvider = sgNode;
                }
            },
            onEnable: function() {
                if (this._sgNode) {
                    this._sgNode.visible = true;
                }
            },
            onDisable: function() {
                if (this._sgNode) {
                    this._sgNode.visible = false;
                }
            },
            onDestroy: function() {
                if (this.node._sizeProvider === this._sgNode) {
                    this.node._sizeProvider = null;
                }
                this._removeSgNode();
            },
            _createSgNode: null,
            _initSgNode: null,
            _removeSgNode: SceneGraphHelper.removeSgNode,
            _appendSgNode: function(sgNode) {
                var node = this.node;
                sgNode.setColor(node._color);
                if (!node._cascadeOpacityEnabled) {
                    sgNode.setOpacity(node._opacity);
                }
                sgNode.setAnchorPoint(node._anchorPoint);
                sgNode.ignoreAnchorPointForPosition(node._ignoreAnchorPointForPosition);
                sgNode.setOpacityModifyRGB(node._opacityModifyRGB);
                sgNode.setLocalZOrder(-1);
                var sgParent = node._sgNode;
                sgParent.addChild(sgNode);
            }
        });
        cc._ComponentInSG = module.exports = ComponentInSG;
    }, {
        "../utils/scene-graph-helper": 72,
        "./CCComponent": 35
    } ],
    38: [ function(require, module, exports) {
        var KeyboardReturnType = _ccsg.EditBox.KeyboardReturnType;
        var InputMode = _ccsg.EditBox.InputMode;
        var InputFlag = _ccsg.EditBox.InputFlag;
        var EditBox = cc.Class({
            name: "cc.EditBox",
            "extends": cc._ComponentInSG,
            editor: false,
            properties: {
                string: {
                    "default": "",
                    notify: function() {
                        this._sgNode.string = this.string;
                    }
                },
                backgroundImage: {
                    "default": null,
                    type: cc.SpriteFrame,
                    notify: function() {
                        var sgNode = this._sgNode;
                        var backgroundSprite = sgNode.getBackgroundSprite();
                        backgroundSprite.setSpriteFrame(this.backgroundImage);
                        backgroundSprite.setContentSize(sgNode.getContentSize());
                    }
                },
                returnType: {
                    "default": KeyboardReturnType.DEFAULT,
                    type: KeyboardReturnType,
                    notify: function() {
                        this._sgNode.returnType = this.returnType;
                    }
                },
                inputFlag: {
                    "default": InputFlag.INITIAL_CAPS_ALL_CHARACTERS,
                    type: InputFlag,
                    notify: function() {
                        this._sgNode.inputFlag = this.inputFlag;
                    }
                },
                inputMode: {
                    "default": InputMode.ANY,
                    type: InputMode,
                    notify: function() {
                        this._sgNode.inputMode = this.inputMode;
                    }
                },
                fontSize: {
                    "default": 20,
                    notify: function() {
                        this._sgNode.fontSize = this.fontSize;
                    }
                },
                fontColor: {
                    "default": cc.Color.WHITE,
                    notify: function() {
                        this._sgNode.fontColor = this.fontColor;
                    }
                },
                placeHolder: {
                    "default": "Enter text here...",
                    notify: function() {
                        this._sgNode.placeHolder = this.placeHolder;
                    }
                },
                placeHolderFontSize: {
                    "default": 20,
                    notify: function() {
                        this._sgNode.placeHolderFontSize = this.placeHolderFontSize;
                    }
                },
                placeHolderFontColor: {
                    "default": cc.Color.GRAY,
                    notify: function() {
                        this._sgNode.placeHolderFontColor = this.placeHolderFontColor;
                    }
                },
                maxLength: {
                    "default": 20,
                    notify: function() {
                        this._sgNode.maxLength = this.maxLength;
                    }
                },
                editingDidBegan: {
                    "default": [],
                    type: cc.Component.EventHandler
                },
                textChanged: {
                    "default": [],
                    type: cc.Component.EventHandler
                },
                editingDidEnded: {
                    "default": [],
                    type: cc.Component.EventHandler
                }
            },
            statics: {
                KeyboardReturnType: KeyboardReturnType,
                InputFlag: InputFlag,
                InputMode: InputMode
            },
            _createSgNode: function() {
                return new _ccsg.EditBox(cc.size(300, 100));
            },
            _initSgNode: function() {
                var sgNode = this._sgNode;
                var bgSprite = new cc.Scale9Sprite(this.backgroundImage);
                sgNode.initWithSizeAndBackgroundSprite(this.node.getContentSize(), bgSprite);
                sgNode.setContentSize(this.node.getContentSize());
                sgNode.inputMode = this.inputMode;
                sgNode.maxLength = this.maxLength;
                sgNode.string = this.string;
                sgNode.fontSize = this.fontSize;
                sgNode.fontColor = this.fontColor;
                sgNode.placeHolder = this.placeHolder;
                sgNode.placeHolderFontSize = this.placeHolderFontSize;
                sgNode.placeHolderFontColor = this.placeHolderFontColor;
                sgNode.inputFlag = this.inputFlag;
                sgNode.returnType = this.returnType;
                sgNode.setDelegate(this);
            },
            _handleComponentEvent: function(events, text) {
                for (var i = 0, l = events.length; i < l; i++) {
                    var event = events[i];
                    var target = event.target;
                    if (!cc.isValid(target)) {
                        continue;
                    }
                    var comp = target.getComponent(event.component);
                    if (!cc.isValid(comp)) {
                        continue;
                    }
                    var handler = comp[event.handler];
                    if (!handler) {
                        continue;
                    }
                    handler.call(comp, text);
                }
            },
            editBoxEditingDidBegan: function() {
                var events = this.editingDidBegin;
                this._handleComponentEvent(events);
            },
            editBoxEditingDidEnded: function() {
                var events = this.editingDidEnd;
                this._handleComponentEvent(events);
            },
            editBoxTextChanged: function(editBox, text) {
                var events = this.textChanged;
                this._handleComponentEvent(events, text);
            }
        });
        cc.EditBox = module.exports = EditBox;
    }, {} ],
    39: [ function(require, module, exports) {
        var HorizontalAlign = cc.TextAlignment;
        var VerticalAlign = cc.VerticalTextAlignment;
        var Overflow = _ccsg.Label.Overflow;
        var LabelType = _ccsg.Label.Type;
        var Label = cc.Class({
            name: "cc.Label",
            "extends": cc._ComponentInSG,
            editor: false,
            properties: {
                _useOriginalSize: true,
                string: {
                    "default": "Label",
                    multiline: true,
                    tooltip: "i18n:COMPONENT.label.string",
                    notify: function() {
                        this._sgNode.setString(this.string);
                        this._updateNodeSize();
                    }
                },
                horizontalAlign: {
                    "default": HorizontalAlign.LEFT,
                    type: HorizontalAlign,
                    tooltip: "i18n:COMPONENT.label.horizontal_align",
                    notify: function() {
                        this._sgNode.setHorizontalAlign(this.horizontalAlign);
                    },
                    animatable: false
                },
                verticalAlign: {
                    "default": VerticalAlign.TOP,
                    type: VerticalAlign,
                    tooltip: "i18n:COMPONENT.label.vertical_align",
                    notify: function() {
                        this._sgNode.setVerticalAlign(this.verticalAlign);
                    },
                    animatable: false
                },
                _fontSize: 40,
                fontSize: {
                    get: function() {
                        this._fontSize = this._sgNode.getFontSize();
                        return this._fontSize;
                    },
                    set: function(value) {
                        this._fontSize = value;
                        this._sgNode.setFontSize(value);
                        this._updateNodeSize();
                    },
                    tooltip: "i18n:COMPONENT.label.font_size"
                },
                _lineHeight: 20,
                lineHeight: {
                    get: function() {
                        this._lineHeight = this._sgNode.getLineHeight();
                        return this._lineHeight;
                    },
                    set: function(value) {
                        this._lineHeight = value;
                        this._sgNode.setLineHeight(value);
                        this._updateNodeSize();
                    },
                    tooltip: "i18n:COMPONENT.label.line_height"
                },
                overflow: {
                    "default": Overflow.NONE,
                    type: Overflow,
                    tooltip: "i18n:COMPONENT.label.overflow",
                    notify: function() {
                        this._sgNode.setOverflow(this.overflow);
                        this._updateNodeSize();
                    },
                    animatable: false
                },
                _enableWrapText: true,
                enableWrapText: {
                    get: function() {
                        this._enableWrapText = this._sgNode.isWrapTextEnabled();
                        return this._enableWrapText;
                    },
                    set: function(value) {
                        this._enableWrapText = value;
                        this._sgNode.enableWrapText(value);
                    },
                    animatable: false,
                    tooltip: "i18n:COMPONENT.label.wrap"
                },
                file: {
                    "default": "Arial",
                    url: cc.Font,
                    tooltip: "i18n:COMPONENT.label.file",
                    notify: function() {
                        this._sgNode.setFontFileOrFamily(this.file);
                    },
                    animatable: false
                },
                _isSystemFontUsed: true,
                useSystemFont: {
                    get: function() {
                        this._isSystemFontUsed = this._sgNode.isSystemFontUsed();
                        return this._isSystemFontUsed;
                    },
                    set: function(value) {
                        this._isSystemFontUsed = value;
                        if (value) {
                            this.file = "";
                            this._sgNode.setSystemFontUsed(value);
                        }
                    },
                    animatable: false,
                    tooltip: "i18n:COMPONENT.label.system_font"
                }
            },
            statics: {
                HorizontalAlign: HorizontalAlign,
                VerticalAlign: VerticalAlign,
                Overflow: Overflow
            },
            onLoad: function() {
                this._super();
                this.node.on("size-changed", this._resized, this);
                var sgSizeInitialized = this._sgNode._isUseSystemFont;
                if (sgSizeInitialized) {
                    this._updateNodeSize();
                } else {
                    if (this.node._sizeProvider === this._sgNode) {
                        this.node._sizeProvider = null;
                    }
                }
                if (!cc.sys.isNative) {
                    this._sgNode.on("load", this._updateNodeSize, this);
                }
            },
            onDestroy: function() {
                this._super();
                this.node.off("size-changed", this._resized, this);
            },
            _createSgNode: function() {
                return new _ccsg.Label();
            },
            _initSgNode: function() {
                var sgNode = this._sgNode;
                sgNode.setHorizontalAlign(this.horizontalAlign);
                sgNode.setVerticalAlign(this.verticalAlign);
                sgNode.setFontSize(this._fontSize);
                sgNode.setOverflow(this.overflow);
                sgNode.enableWrapText(this._enableWrapText);
                sgNode.setLineHeight(this._lineHeight);
                sgNode.setString(this.string);
                sgNode.setFontFileOrFamily(this.file);
                if (!this._useOriginalSize) {
                    sgNode.setContentSize(this.node.getContentSize());
                }
                sgNode.setColor(this.node.color);
            },
            _resized: function() {
                this._useOriginalSize = false;
            },
            _updateNodeSize: function() {
                if (this.overflow === Overflow.NONE) {
                    this.node.setContentSize(this._sgNode.getContentSize());
                }
                if (!this.node._sizeProvider) {
                    this.node._sizeProvider = this._sgNode;
                }
            }
        });
        cc.Label = module.exports = Label;
    }, {} ],
    40: [ function(require, module, exports) {
        var Type = cc.Enum({
            NONE: 0,
            HORIZONTAL: 1,
            VERTICAL: 2,
            GRID: 3
        });
        var ResizeType = cc.Enum({
            NONE: 0,
            CONTAINER: 1,
            CHILDREN: 2
        });
        var AxisDirection = cc.Enum({
            HORIZONTAL: 0,
            VERTICAL: 1
        });
        var VerticalDirection = cc.Enum({
            BOTTOM_TO_TOP: 0,
            TOP_TO_BOTTOM: 1
        });
        var HorizontalDirection = cc.Enum({
            LEFT_TO_RIGHT: 0,
            RIGHT_TO_LEFT: 1
        });
        var Layout = cc.Class({
            name: "cc.Layout",
            "extends": require("./CCComponent"),
            editor: false,
            properties: {
                _layoutSize: cc.size(300, 200),
                _layoutDirty: {
                    "default": true,
                    serializable: false
                },
                layoutType: {
                    "default": Type.NONE,
                    type: Type,
                    notify: function() {
                        this._doLayoutDirty();
                    },
                    animatable: false,
                    tooltip: "i18n:COMPONENT.layout.layout_type"
                },
                _resize: ResizeType.NONE,
                resize: {
                    type: ResizeType,
                    tooltip: "i18n:COMPONENT.layout.auto_resize",
                    get: function() {
                        return this._resize;
                    },
                    set: function(value) {
                        if (this.layoutType === Type.NONE && value === ResizeType.CHILDREN) {
                            return;
                        }
                        this._doLayoutDirty();
                        this._resize = value;
                    },
                    animatable: false
                },
                cellSize: {
                    "default": cc.size(40, 40),
                    type: cc.Size,
                    notify: function() {
                        this._doLayoutDirty();
                    },
                    animatable: false
                },
                startAxis: {
                    "default": AxisDirection.HORIZONTAL,
                    type: AxisDirection,
                    notify: function() {
                        this._doLayoutDirty();
                    },
                    animatable: false
                },
                padding: {
                    "default": 0,
                    notify: function() {
                        this._doLayoutDirty();
                    },
                    animatable: false
                },
                spacingX: {
                    "default": 0,
                    notify: function() {
                        this._doLayoutDirty();
                    },
                    animatable: false,
                    tooltip: "i18n:COMPONENT.layout.space_x"
                },
                spacingY: {
                    "default": 0,
                    notify: function() {
                        this._doLayoutDirty();
                    },
                    animatable: false,
                    tooltip: "i18n:COMPONENT.layout.space_y"
                },
                verticalDirection: {
                    "default": VerticalDirection.TOP_TO_BOTTOM,
                    type: VerticalDirection,
                    notify: function() {
                        this._doLayoutDirty();
                    },
                    animatable: false,
                    tooltip: "i18n:COMPONENT.layout.vertical_direction"
                },
                horizontalDirection: {
                    "default": HorizontalDirection.LEFT_TO_RIGHT,
                    type: HorizontalDirection,
                    notify: function() {
                        this._doLayoutDirty();
                    },
                    animatable: false,
                    tooltip: "i18n:COMPONENT.layout.horizontal_direction"
                }
            },
            statics: {
                Type: Type,
                VerticalDirection: VerticalDirection,
                HorizontalDirection: HorizontalDirection,
                ResizeType: ResizeType,
                AxisDirection: AxisDirection
            },
            onLoad: function() {
                this.node.setContentSize(this._layoutSize);
                this.node.on("size-changed", this._resized, this);
                this.node.on("anchor-changed", this._doLayoutDirty, this);
                this.node.on("child-added", this._childrenAddOrDeleted, this);
                this.node.on("child-removed", this._childrenAddOrDeleted, this);
                this._updateChildrenEventListener();
            },
            _doLayoutDirty: function() {
                this._layoutDirty = true;
            },
            _updateChildrenEventListener: function() {
                var children = this.node.children;
                children.forEach(function(child) {
                    child.on("size-changed", this._doLayoutDirty, this);
                    child.on("position-changed", this._doLayoutDirty, this);
                    child.on("anchor-changed", this._doLayoutDirty, this);
                    child.on("active-in-hierarchy-changed", this._doLayoutDirty, this);
                }.bind(this));
            },
            _childrenAddOrDeleted: function() {
                this._updateChildrenEventListener();
                this._doLayoutDirty();
            },
            _resized: function() {
                this._layoutSize = this.node.getContentSize();
                this._doLayoutDirty();
            },
            _doLayoutHorizontally: function(baseWidth, rowBreak, fnPositionY, applyChildren) {
                var layoutAnchor = this.node.getAnchorPoint();
                var children = this.node.children;
                var sign = 1;
                var leftBoundaryOfLayout = -layoutAnchor.x * baseWidth;
                if (this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
                    sign = -1;
                    leftBoundaryOfLayout = (1 - layoutAnchor.x) * baseWidth;
                }
                var nextX = leftBoundaryOfLayout + sign * this.padding - sign * this.spacingX;
                var rowMaxHeight = 0;
                var tempMaxHeight = 0;
                var secondMaxHeight = 0;
                var row = 0;
                var containerResizeBoundary;
                var maxHeightChildAnchor;
                var newChildWidth = this.cellSize.width;
                if (this.layoutType !== Type.GRID && this.resize === ResizeType.CHILDREN) {
                    newChildWidth = (baseWidth - 2 * this.padding - (children.length - 1) * this.spacingX) / children.length;
                }
                children.forEach(function(child) {
                    if (!child.activeInHierarchy) {
                        return;
                    }
                    if (this._resize === ResizeType.CHILDREN) {
                        child.width = newChildWidth;
                        if (this.layoutType === Type.GRID) {
                            child.height = this.cellSize.height;
                        }
                    }
                    var anchorX = child.anchorX;
                    if (secondMaxHeight > tempMaxHeight) {
                        tempMaxHeight = secondMaxHeight;
                    }
                    if (child.height >= tempMaxHeight) {
                        secondMaxHeight = tempMaxHeight;
                        tempMaxHeight = child.height;
                        maxHeightChildAnchor = child.getAnchorPoint();
                    }
                    if (this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
                        anchorX = 1 - child.anchorX;
                    }
                    nextX = nextX + sign * anchorX * child.width + sign * this.spacingX;
                    var rightBoundaryOfChild = sign * (1 - anchorX) * child.width;
                    if (rowBreak) {
                        var rowBreakBoundary = nextX + rightBoundaryOfChild + sign * this.padding;
                        var leftToRightRowBreak = this.horizontalDirection === HorizontalDirection.LEFT_TO_RIGHT && rowBreakBoundary > (1 - layoutAnchor.x) * baseWidth;
                        var rightToLeftRowBreak = this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT && rowBreakBoundary < -layoutAnchor.x * baseWidth;
                        if (leftToRightRowBreak || rightToLeftRowBreak) {
                            if (child.height >= tempMaxHeight) {
                                if (0 === secondMaxHeight) {
                                    secondMaxHeight = tempMaxHeight;
                                }
                                rowMaxHeight += secondMaxHeight;
                                secondMaxHeight = tempMaxHeight;
                            } else {
                                rowMaxHeight += tempMaxHeight;
                                secondMaxHeight = child.height;
                                tempMaxHeight = 0;
                            }
                            nextX = leftBoundaryOfLayout + sign * (this.padding + anchorX * child.width);
                            row++;
                        }
                    }
                    var finalPositionY = fnPositionY(child, rowMaxHeight, row);
                    if (baseWidth >= child.width + 2 * this.padding) {
                        if (applyChildren) {
                            child.setPosition(cc.p(nextX, finalPositionY));
                        }
                    }
                    var signX = 1;
                    var tempFinalPositionY;
                    var topMarign = 0 === tempMaxHeight ? child.height : tempMaxHeight;
                    if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                        containerResizeBoundary = containerResizeBoundary || this.node._contentSize.height;
                        signX = -1;
                        tempFinalPositionY = finalPositionY + signX * (topMarign * maxHeightChildAnchor.y + this.padding);
                        if (tempFinalPositionY < containerResizeBoundary) {
                            containerResizeBoundary = tempFinalPositionY;
                        }
                    } else {
                        containerResizeBoundary = containerResizeBoundary || -this.node._contentSize.height;
                        tempFinalPositionY = finalPositionY + signX * (topMarign * maxHeightChildAnchor.y + this.padding);
                        if (tempFinalPositionY > containerResizeBoundary) {
                            containerResizeBoundary = tempFinalPositionY;
                        }
                    }
                    nextX += rightBoundaryOfChild;
                }.bind(this));
                return containerResizeBoundary;
            },
            _getVerticalBaseHeight: function(children) {
                var newHeight = 0;
                if (this.resize === ResizeType.CONTAINER) {
                    children.forEach(function(child) {
                        newHeight += child.height;
                    });
                    newHeight += (children.length - 1) * this.spacingY + 2 * this.padding;
                } else {
                    newHeight = this.node.getContentSize().height;
                }
                return newHeight;
            },
            _doLayoutVertically: function(baseHeight, columnBreak, fnPositionX, applyChildren) {
                var layoutAnchor = this.node.getAnchorPoint();
                var children = this.node.children;
                var sign = 1;
                var bottomBoundaryOfLayout = -layoutAnchor.y * baseHeight;
                if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                    sign = -1;
                    bottomBoundaryOfLayout = (1 - layoutAnchor.y) * baseHeight;
                }
                var nextY = bottomBoundaryOfLayout + sign * this.padding - sign * this.spacingY;
                var columnMaxWidth = 0;
                var tempMaxWidth = 0;
                var secondMaxWidth = 0;
                var column = 0;
                var containerResizeBoundary;
                var maxWidthChildAnchor;
                var newChildHeight = this.cellSize.height;
                if (this.layoutType !== Type.GRID && this.resize === ResizeType.CHILDREN) {
                    newChildHeight = (baseHeight - 2 * this.padding - (children.length - 1) * this.spacingY) / children.length;
                }
                children.forEach(function(child) {
                    if (!child.activeInHierarchy) {
                        return;
                    }
                    if (this.resize === ResizeType.CHILDREN) {
                        child.height = newChildHeight;
                        if (this.layoutType === Type.GRID) {
                            child.width = this.cellSize.width;
                        }
                    }
                    var anchorY = child.anchorY;
                    if (secondMaxWidth > tempMaxWidth) {
                        tempMaxWidth = secondMaxWidth;
                    }
                    if (child.width >= tempMaxWidth) {
                        secondMaxWidth = tempMaxWidth;
                        tempMaxWidth = child.width;
                        maxWidthChildAnchor = child.getAnchorPoint();
                    }
                    if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                        anchorY = 1 - child.anchorY;
                    }
                    nextY = nextY + sign * anchorY * child.height + sign * this.spacingY;
                    var topBoundaryOfChild = sign * (1 - anchorY) * child.height;
                    if (columnBreak) {
                        var columnBreakBoundary = nextY + topBoundaryOfChild + sign * this.padding;
                        var bottomToTopColumnBreak = this.verticalDirection === VerticalDirection.BOTTOM_TO_TOP && columnBreakBoundary > (1 - layoutAnchor.y) * baseHeight;
                        var topToBottomColumnBreak = this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM && columnBreakBoundary < -layoutAnchor.y * baseHeight;
                        if (bottomToTopColumnBreak || topToBottomColumnBreak) {
                            if (child.width >= tempMaxWidth) {
                                if (0 === secondMaxWidth) {
                                    secondMaxWidth = tempMaxWidth;
                                }
                                columnMaxWidth += secondMaxWidth;
                                secondMaxWidth = tempMaxWidth;
                            } else {
                                columnMaxWidth += tempMaxWidth;
                                secondMaxWidth = child.width;
                                tempMaxWidth = 0;
                            }
                            nextY = bottomBoundaryOfLayout + sign * (this.padding + anchorY * child.height);
                            column++;
                        }
                    }
                    var finalPositionX = fnPositionX(child, columnMaxWidth, column);
                    if (baseHeight >= child.height + 2 * this.padding) {
                        if (applyChildren) {
                            child.setPosition(cc.p(finalPositionX, nextY));
                        }
                    }
                    var signX = 1;
                    var tempFinalPositionX;
                    var rightMarign = 0 === tempMaxWidth ? child.width : tempMaxWidth;
                    if (this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
                        signX = -1;
                        containerResizeBoundary = containerResizeBoundary || this.node._contentSize.width;
                        tempFinalPositionX = finalPositionX + signX * (rightMarign * maxWidthChildAnchor.x + this.padding);
                        if (tempFinalPositionX < containerResizeBoundary) {
                            containerResizeBoundary = tempFinalPositionX;
                        }
                    } else {
                        containerResizeBoundary = containerResizeBoundary || -this.node._contentSize.width;
                        tempFinalPositionX = finalPositionX + signX * (rightMarign * maxWidthChildAnchor.x + this.padding);
                        if (tempFinalPositionX > containerResizeBoundary) {
                            containerResizeBoundary = tempFinalPositionX;
                        }
                    }
                    nextY += topBoundaryOfChild;
                }.bind(this));
                return containerResizeBoundary;
            },
            _doLayoutBasic: function() {
                var children = this.node.children;
                var allChildrenBoundingBox = null;
                children.forEach(function(child) {
                    if (!allChildrenBoundingBox) {
                        allChildrenBoundingBox = child.getBoundingBoxToWorld();
                    } else {
                        allChildrenBoundingBox = cc.rectUnion(allChildrenBoundingBox, child.getBoundingBoxToWorld());
                    }
                });
                if (allChildrenBoundingBox) {
                    var leftBottomInParentSpace = this.node.parent.convertToNodeSpaceAR(cc.p(allChildrenBoundingBox.x, allChildrenBoundingBox.y));
                    var rightTopInParentSpace = this.node.parent.convertToNodeSpaceAR(cc.p(allChildrenBoundingBox.x + allChildrenBoundingBox.width, allChildrenBoundingBox.y + allChildrenBoundingBox.height));
                    var newSize = cc.size(rightTopInParentSpace.x - leftBottomInParentSpace.x, rightTopInParentSpace.y - leftBottomInParentSpace.y);
                    var layoutPosition = this.node.getPosition();
                    var newAnchor = cc.p((layoutPosition.x - leftBottomInParentSpace.x) / newSize.width, (layoutPosition.y - leftBottomInParentSpace.y) / newSize.height);
                    this.node.setAnchorPoint(newAnchor);
                    this.node.setContentSize(newSize);
                }
            },
            _doLayoutGridAxisHorizontal: function(layoutAnchor, layoutSize) {
                var baseWidth = layoutSize.width;
                var sign = 1;
                var bottomBoundaryOfLayout = -layoutAnchor.y * layoutSize.height;
                if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                    sign = -1;
                    bottomBoundaryOfLayout = (1 - layoutAnchor.y) * layoutSize.height;
                }
                var fnPositionY = function(child, topOffset, row) {
                    return bottomBoundaryOfLayout + sign * (topOffset + child.anchorY * child.height + this.padding + row * this.spacingY);
                }.bind(this);
                var newHeight = 0;
                if (this.resize === ResizeType.CONTAINER) {
                    var boundary = this._doLayoutHorizontally(baseWidth, true, fnPositionY, false);
                    newHeight = bottomBoundaryOfLayout - boundary;
                    if (newHeight < 0) {
                        newHeight *= -1;
                    }
                    bottomBoundaryOfLayout = -layoutAnchor.y * newHeight;
                    if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                        sign = -1;
                        bottomBoundaryOfLayout = (1 - layoutAnchor.y) * newHeight;
                    }
                }
                this._doLayoutHorizontally(baseWidth, true, fnPositionY, true);
                if (this.resize === ResizeType.CONTAINER) {
                    this.node.setContentSize(baseWidth, newHeight);
                }
            },
            _doLayoutGridAxisVertical: function(layoutAnchor, layoutSize) {
                var baseHeight = layoutSize.height;
                var sign = 1;
                var leftBoundaryOfLayout = -layoutAnchor.x * layoutSize.width;
                if (this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
                    sign = -1;
                    leftBoundaryOfLayout = (1 - layoutAnchor.x) * layoutSize.width;
                }
                var fnPositionX = function(child, leftOffset, column) {
                    return leftBoundaryOfLayout + sign * (leftOffset + child.anchorX * child.width + this.padding + column * this.spacingX);
                }.bind(this);
                var newWidth = 0;
                if (this.resize === ResizeType.CONTAINER) {
                    var boundary = this._doLayoutVertically(baseHeight, true, fnPositionX, false);
                    newWidth = leftBoundaryOfLayout - boundary;
                    if (newWidth < 0) {
                        newWidth *= -1;
                    }
                    leftBoundaryOfLayout = -layoutAnchor.x * newWidth;
                    if (this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
                        sign = -1;
                        leftBoundaryOfLayout = (1 - layoutAnchor.x) * newWidth;
                    }
                }
                this._doLayoutVertically(baseHeight, true, fnPositionX, true);
                if (this.resize === ResizeType.CONTAINER) {
                    this.node.setContentSize(newWidth, baseHeight);
                }
            },
            _doLayoutGrid: function() {
                var layoutAnchor = this.node.getAnchorPoint();
                var layoutSize = this.node.getContentSize();
                if (this.startAxis === AxisDirection.HORIZONTAL) {
                    this._doLayoutGridAxisHorizontal(layoutAnchor, layoutSize);
                } else {
                    if (this.startAxis === AxisDirection.VERTICAL) {
                        this._doLayoutGridAxisVertical(layoutAnchor, layoutSize);
                    }
                }
            },
            _getHorizontalBaseWidth: function(children) {
                var newWidth = 0;
                if (this.resize === ResizeType.CONTAINER) {
                    children.forEach(function(child) {
                        newWidth += child.width;
                    });
                    newWidth += (children.length - 1) * this.spacingX + 2 * this.padding;
                } else {
                    newWidth = this.node.getContentSize().width;
                }
                return newWidth;
            },
            _doLayout: function() {
                if (this.layoutType === Type.HORIZONTAL) {
                    var newWidth = this._getHorizontalBaseWidth(this.node.children);
                    var fnPositionY = function(child) {
                        return child.y;
                    };
                    this._doLayoutHorizontally(newWidth, false, fnPositionY, true);
                    this.node.width = newWidth;
                } else {
                    if (this.layoutType === Type.VERTICAL) {
                        var newHeight = this._getVerticalBaseHeight(this.node.children);
                        var fnPositionX = function(child) {
                            return child.x;
                        };
                        this._doLayoutVertically(newHeight, false, fnPositionX, true);
                        this.node.height = newHeight;
                    } else {
                        if (this.layoutType === Type.NONE) {
                            if (this.resize === ResizeType.CONTAINER) {
                                this._doLayoutBasic();
                            }
                        } else {
                            if (this.layoutType === Type.GRID) {
                                this._doLayoutGrid();
                            }
                        }
                    }
                }
            },
            lateUpdate: function() {
                if (this._layoutDirty && this.node.children.length > 0) {
                    this._doLayout();
                    this._layoutDirty = false;
                }
            }
        });
        cc.Layout = module.exports = Layout;
    }, {
        "./CCComponent": 35
    } ],
    41: [ function(require, module, exports) {
        var Mask = cc.Class({
            name: "cc.Mask",
            "extends": cc.Component,
            editor: false,
            properties: {
                _clippingNode: {
                    "default": null,
                    serializable: false
                },
                _clippingStencil: {
                    "default": null,
                    serializable: false
                }
            },
            onLoad: function() {
                this._clippingStencil = new cc.DrawNode();
                this._clippingNode = new cc.ClippingNode(this._clippingStencil);
                if (cc.sys.isNative) {
                    this._clippingStencil.retain();
                    this._clippingNode.retain();
                }
            },
            onDestroy: function() {
                if (cc.sys.isNative) {
                    this._clippingStencil && this._clippingStencil.release();
                    this._clippingNode && this._clippingNode.release();
                }
            },
            _refreshStencil: function() {
                var contentSize = this.node._contentSize;
                var anchorPoint = this.node._anchorPoint;
                var x = contentSize.width * anchorPoint.x;
                var y = contentSize.height * anchorPoint.y;
                this._clippingStencil.clear();
                var rectangle = [ cc.v2(-x, -y), cc.v2(contentSize.width - x, -y), cc.v2(contentSize.width - x, contentSize.height - y), cc.v2(-x, contentSize.height - y) ];
                this._clippingStencil.drawPoly(rectangle, cc.color(255, 255, 255, 0), 0, cc.color(255, 255, 255, 0));
            },
            onEnable: function() {
                var oldNode = this.node._sgNode;
                this._refreshStencil();
                this.node._replaceSgNode(this._clippingNode);
                this.node.on("size-changed", this._onContentSizeChanged, this);
                this.node.on("anchor-changed", this._onAnchorChanged, this);
            },
            onDisable: function() {
                var oldNode = this.node._sgNode;
                var newNode = new _ccsg.Node();
                this.node._replaceSgNode(newNode);
                this.node.off("size-changed", this._onContentSizeChanged, this);
                this.node.off("anchor-changed", this._onAnchorChanged, this);
            },
            _onContentSizeChanged: function() {
                if (this._clippingStencil) {
                    this._refreshStencil();
                }
            },
            _onAnchorChanged: function() {
                if (this._clippingStencil) {
                    this._refreshStencil();
                }
            }
        });
        cc.Mask = module.exports = Mask;
    }, {} ],
    42: [ function(require, module, exports) {
        var Mode = cc.Enum({
            HORIZONTAL: 0,
            VERTICAL: 1
        });
        var ProgressBar = cc.Class({
            name: "cc.ProgressBar",
            "extends": require("./CCComponent"),
            editor: false,
            _initBarSprite: function() {
                if (this.barSprite) {
                    var entity = this.barSprite.node;
                    var nodeSize = this.node.getContentSize();
                    var nodeAnchor = this.node.getAnchorPoint();
                    var entitySize = entity.getContentSize();
                    if (entity.parent === this.node) {
                        this.node.setContentSize(entitySize);
                    }
                    var barSpriteSize = entity.getContentSize();
                    if (this.mode === Mode.HORIZONTAL) {
                        this.totalLength = barSpriteSize.width;
                    } else {
                        this.totalLength = barSpriteSize.height;
                    }
                    if (entity.parent === this.node) {
                        var x = -nodeSize.width * nodeAnchor.x;
                        var y = 0;
                        entity.setPosition(cc.p(x, y));
                    }
                }
            },
            _updateBarStatus: function() {
                if (this.barSprite) {
                    var entity = this.barSprite.node;
                    var entityAnchorPoint = entity.getAnchorPoint();
                    var entitySize = entity.getContentSize();
                    var entityPosition = entity.getPosition();
                    var anchorPoint = cc.p(0, .5);
                    var actualLenth = this.totalLength * this.progress;
                    var finalContentSize;
                    var totalWidth;
                    var totalHeight;
                    switch (this.mode) {
                      case Mode.HORIZONTAL:
                        if (this.reverse) {
                            anchorPoint = cc.p(1, .5);
                        }
                        finalContentSize = cc.size(actualLenth, entitySize.height);
                        totalWidth = this.totalLength;
                        totalHeight = entitySize.height;
                        break;

                      case Mode.VERTICAL:
                        if (this.reverse) {
                            anchorPoint = cc.p(.5, 1);
                        } else {
                            anchorPoint = cc.p(.5, 0);
                        }
                        finalContentSize = cc.size(entitySize.width, actualLenth);
                        totalWidth = entitySize.width;
                        totalHeight = this.totalLength;
                    }
                    var anchorOffsetX = anchorPoint.x - entityAnchorPoint.x;
                    var anchorOffsetY = anchorPoint.y - entityAnchorPoint.y;
                    var finalPosition = cc.p(totalWidth * anchorOffsetX, totalHeight * anchorOffsetY);
                    entity.setPosition(cc.pAdd(entityPosition, finalPosition));
                    entity.setAnchorPoint(anchorPoint);
                    entity.setContentSize(finalContentSize);
                }
            },
            properties: {
                barSprite: {
                    "default": null,
                    type: cc.Sprite,
                    tooltip: "i18n:COMPONENT.progress.bar_sprite",
                    notify: function() {
                        this._initBarSprite();
                    },
                    animatable: false
                },
                mode: {
                    "default": Mode.HORIZONTAL,
                    type: Mode,
                    tooltip: "i18n:COMPONENT.progress.mode",
                    notify: function() {
                        if (this.barSprite) {
                            var entity = this.barSprite.node;
                            var entitySize = entity.getContentSize();
                            if (this.mode === Mode.HORIZONTAL) {
                                this.totalLength = entitySize.width;
                            } else {
                                if (this.mode === Mode.VERTICAL) {
                                    this.totalLength = entitySize.height;
                                }
                            }
                        }
                    },
                    animatable: false
                },
                totalLength: {
                    "default": 1,
                    range: [ 0, Number.MAX_VALUE ],
                    tooltip: "i18n:COMPONENT.progress.total_length",
                    notify: function(value) {
                        this._updateBarStatus();
                    }
                },
                progress: {
                    "default": 1,
                    type: "Float",
                    range: [ 0, 1, .1 ],
                    tooltip: "i18n:COMPONENT.progress.progress",
                    notify: function() {
                        this._updateBarStatus();
                    }
                },
                reverse: {
                    "default": false,
                    tooltip: "i18n:COMPONENT.progress.reverse",
                    notify: function() {
                        this._updateBarStatus();
                    },
                    animatable: false
                }
            },
            statics: {
                Mode: Mode
            }
        });
        cc.ProgressBar = module.exports = ProgressBar;
    }, {
        "./CCComponent": 35
    } ],
    43: [ function(require, module, exports) {
        var GETTINGSHORTERFACTOR = 20;
        var Direction = cc.Enum({
            HORIZONTAL: 0,
            VERTICAL: 1
        });
        var Scrollbar = cc.Class({
            name: "cc.Scrollbar",
            "extends": require("./CCComponent"),
            editor: false,
            properties: {
                _scrollView: null,
                _touching: false,
                _autoHideRemainingTime: {
                    "default": 0,
                    serializable: false
                },
                _opacity: 255,
                handle: {
                    "default": null,
                    type: cc.Sprite,
                    tooltip: "i18n:COMPONENT.scrollbar.handle",
                    notify: function() {
                        this._onScroll(cc.p(0, 0));
                    },
                    animatable: false
                },
                direction: {
                    "default": Direction.HORIZONTAL,
                    type: Direction,
                    tooltip: "i18n:COMPONENT.scrollbar.direction",
                    notify: function() {
                        this._onScroll(cc.p(0, 0));
                    },
                    animatable: false
                },
                enableAutoHide: {
                    "default": true,
                    animatable: false,
                    tooltip: "i18n:COMPONENT.scrollbar.auto_hide"
                },
                autoHideTime: {
                    "default": 1,
                    animatable: false,
                    tooltip: "i18n:COMPONENT.scrollbar.auto_hide_time"
                }
            },
            statics: {
                Direction: Direction
            },
            setTargetScrollView: function(scrollView) {
                this._scrollView = scrollView;
            },
            _convertToScrollViewSpace: function(content) {
                var worldSpacePos = content.convertToWorldSpace(cc.p(0, 0));
                var scrollViewSpacePos = this._scrollView.node.convertToNodeSpace(worldSpacePos);
                return scrollViewSpacePos;
            },
            _setOpacity: function(opacity) {
                if (this.handle) {
                    this.node.setOpacity(opacity);
                }
            },
            _onScroll: function(outOfBoundary) {
                if (this._scrollView) {
                    var content = this._scrollView.content;
                    if (content) {
                        var contentSize = content.getContentSize();
                        var scrollViewSize = this._scrollView.node.getContentSize();
                        if (this._conditionalDisableScrollBar(contentSize, scrollViewSize)) {
                            return;
                        }
                        if (this.enableAutoHide) {
                            this._autoHideRemainingTime = this.autoHideTime;
                            this._setOpacity(this._opacity);
                        }
                        var contentMeasure = 0;
                        var scrollViewMeasure = 0;
                        var outOfBoundaryValue = 0;
                        var contentPosition = 0;
                        if (this.direction === Direction.HORIZONTAL) {
                            contentMeasure = contentSize.width;
                            scrollViewMeasure = scrollViewSize.width;
                            outOfBoundaryValue = outOfBoundary.x;
                            contentPosition = -this._convertToScrollViewSpace(content).x;
                        } else {
                            if (this.direction === Direction.VERTICAL) {
                                contentMeasure = contentSize.height;
                                scrollViewMeasure = scrollViewSize.height;
                                outOfBoundaryValue = outOfBoundary.y;
                                contentPosition = -this._convertToScrollViewSpace(content).y;
                            }
                        }
                        var length = this._calculateLength(contentMeasure, scrollViewMeasure, outOfBoundaryValue);
                        var position = this._calculatePosition(contentMeasure, scrollViewMeasure, contentPosition, outOfBoundaryValue, length);
                        this._updateLength(length);
                        this._updateHanlderPosition(position);
                    }
                }
            },
            _updateHanlderPosition: function(position) {
                if (this.handle) {
                    var oldPosition = this._fixupHandlerPosition();
                    this.handle.node.setPosition(cc.pAdd(position, oldPosition));
                }
            },
            _fixupHandlerPosition: function() {
                var barSize = this.node.getContentSize();
                var barAnchor = this.node.getAnchorPoint();
                var barPosition = this.node.getPosition();
                var fixupPosition;
                var handleParent = this.handle.node.parent;
                if (this.direction === Direction.HORIZONTAL) {
                    var leftSideWorldPosition = this.node.convertToWorldSpaceAR(cc.p(-barSize.width * barAnchor.x, -barSize.height * barAnchor.y));
                    fixupPosition = handleParent.convertToNodeSpaceAR(leftSideWorldPosition);
                } else {
                    if (this.direction === Direction.VERTICAL) {
                        var bottomSideWorldPosition = this.node.convertToWorldSpaceAR(cc.p(-barSize.width * barAnchor.x, -barSize.height * barAnchor.y));
                        fixupPosition = handleParent.convertToNodeSpaceAR(bottomSideWorldPosition);
                    }
                }
                this.handle.node.setPosition(fixupPosition);
                return fixupPosition;
            },
            _onTouchBegan: function() {
                if (!this.enableAutoHide) {
                    return;
                }
                this._touching = true;
            },
            _conditionalDisableScrollBar: function(contentSize, scrollViewSize) {
                if (contentSize.width <= scrollViewSize.width && this.direction === Direction.HORIZONTAL) {
                    return true;
                }
                if (contentSize.height <= scrollViewSize.height && this.direction === Direction.VERTICAL) {
                    return true;
                }
                return false;
            },
            _onTouchEnded: function() {
                if (!this.enableAutoHide) {
                    return;
                }
                this._touching = false;
                if (this.autoHideTime <= 0) {
                    return;
                }
                if (this._scrollView) {
                    var content = this._scrollView.content;
                    if (content) {
                        var contentSize = content.getContentSize();
                        var scrollViewSize = this._scrollView.node.getContentSize();
                        if (this._conditionalDisableScrollBar(contentSize, scrollViewSize)) {
                            return;
                        }
                    }
                }
                this._autoHideRemainingTime = this.autoHideTime;
            },
            _calculateLength: function(contentMeasure, scrollViewMeasure, outOfBoundary) {
                var denominatorValue = contentMeasure;
                if (outOfBoundary) {
                    denominatorValue += (outOfBoundary > 0 ? outOfBoundary : -outOfBoundary) * GETTINGSHORTERFACTOR;
                }
                var lengthRation = scrollViewMeasure / denominatorValue;
                return scrollViewMeasure * lengthRation;
            },
            _calculatePosition: function(contentMeasure, scrollViewMeasure, contentPosition, outOfBoundary, actualLenth) {
                var denominatorValue = contentMeasure - scrollViewMeasure;
                if (outOfBoundary) {
                    denominatorValue += Math.abs(outOfBoundary);
                }
                var positionRatio = 0;
                if (denominatorValue) {
                    positionRatio = contentPosition / denominatorValue;
                    positionRatio = cc.clamp01(positionRatio);
                }
                var position = (scrollViewMeasure - actualLenth) * positionRatio;
                if (this.direction === Direction.VERTICAL) {
                    return cc.p(0, position);
                } else {
                    return cc.p(position, 0);
                }
            },
            _updateLength: function(length) {
                if (this.handle) {
                    var handleNode = this.handle.node;
                    var handleNodeSize = this.node.getContentSize();
                    handleNode.setAnchorPoint(cc.p(0, 0));
                    if (this.direction === Direction.HORIZONTAL) {
                        handleNode.setContentSize(length, handleNodeSize.height);
                    } else {
                        handleNode.setContentSize(handleNodeSize.width, length);
                    }
                }
            },
            _processAutoHide: function(deltaTime) {
                if (!this.enableAutoHide || this._autoHideRemainingTime <= 0) {
                    return;
                } else {
                    if (this._touching) {
                        return;
                    }
                }
                this._autoHideRemainingTime -= deltaTime;
                if (this._autoHideRemainingTime <= this.autoHideTime) {
                    this._autoHideRemainingTime = Math.max(0, this._autoHideRemainingTime);
                    var opacity = this._opacity * (this._autoHideRemainingTime / this.autoHideTime);
                    this._setOpacity(opacity);
                }
            },
            start: function() {
                if (this.enableAutoHide) {
                    this._setOpacity(0);
                }
            },
            update: function(dt) {
                this._processAutoHide(dt);
            }
        });
        cc.Scrollbar = module.exports = Scrollbar;
    }, {
        "./CCComponent": 35
    } ],
    44: [ function(require, module, exports) {
        var NUMBER_OF_GATHERED_TOUCHES_FOR_MOVE_SPEED = 5;
        var OUT_OF_BOUNDARY_BREAKING_FACTOR = .05;
        var EPSILON = 1e-7;
        var MOVEMENT_FACTOR = .7;
        var quintEaseOut = function(time) {
            time -= 1;
            return time * time * time * time * time + 1;
        };
        var getTimeInMilliseconds = function() {
            var currentTime = new Date();
            return currentTime.getMilliseconds();
        };
        var ScrollView = cc.Class({
            name: "cc.ScrollView",
            "extends": require("./CCComponent"),
            editor: false,
            ctor: function() {
                this._topBoundary = 0;
                this._bottomBoundary = 0;
                this._leftBoundary = 0;
                this._rightBoundary = 0;
                this._touchMoveDisplacements = [];
                this._touchMoveTimeDeltas = [];
                this._touchMovePreviousTimestamp = 0;
                this._autoScrolling = false;
                this._autoScrollAttenuate = false;
                this._autoScrollStartPosition = cc.p(0, 0);
                this._autoScrollTargetDelta = cc.p(0, 0);
                this._autoScrollTotalTime = 0;
                this._autoScrollAccumulatedTime = 0;
                this._autoScrollCurrentlyOutOfBoundary = false;
                this._autoScrollBraking = false;
                this._autoScrollBrakingStartPosition = cc.p(0, 0);
                this._outOfBoundaryAmount = cc.p(0, 0);
                this._outOfBoundaryAmountDirty = true;
            },
            properties: {
                content: {
                    "default": null,
                    type: cc.Node,
                    tooltip: "i18n:COMPONENT.scrollview.content"
                },
                horizontal: {
                    "default": true,
                    animatable: false,
                    tooltip: "i18n:COMPONENT.scrollview.horizontal"
                },
                vertical: {
                    "default": true,
                    animatable: false,
                    tooltip: "i18n:COMPONENT.scrollview.vertical"
                },
                inertia: {
                    "default": true,
                    animatable: false,
                    tooltip: "i18n:COMPONENT.scrollview.inertia"
                },
                brake: {
                    "default": .5,
                    type: "Float",
                    range: [ 0, 1, .1 ],
                    animatable: false
                },
                elastic: {
                    "default": true,
                    animatable: false
                },
                bounceDuration: {
                    "default": 1,
                    range: [ 0, 10 ],
                    animatable: false
                },
                horizontalScrollBar: {
                    "default": null,
                    type: cc.Scrollbar,
                    tooltip: "i18n:COMPONENT.scrollview.horizontal_bar",
                    notify: function() {
                        this.horizontalScrollBar.setTargetScrollView(this);
                        this._updateScrollBar(0);
                    },
                    animatable: false
                },
                verticalScrollBar: {
                    "default": null,
                    type: cc.Scrollbar,
                    tooltip: "i18n:COMPONENT.scrollview.vertical_bar",
                    notify: function() {
                        this.verticalScrollBar.setTargetScrollView(this);
                        this._updateScrollBar(0);
                    },
                    animatable: false
                }
            },
            scrollToBottom: function(timeInSecond, attenuated) {
                var moveDelta = this._calculateMovePercentDelta({
                    anchor: cc.p(0, 0),
                    applyToHorizontal: false,
                    applyToVertical: true
                });
                if (timeInSecond) {
                    this._startAutoScroll(moveDelta, timeInSecond, false !== attenuated);
                } else {
                    this._moveContent(moveDelta, true);
                }
            },
            scrollToTop: function(timeInSecond, attenuated) {
                var moveDelta = this._calculateMovePercentDelta({
                    anchor: cc.p(0, 1),
                    applyToHorizontal: false,
                    applyToVertical: true
                });
                if (timeInSecond) {
                    this._startAutoScroll(moveDelta, timeInSecond, false !== attenuated);
                } else {
                    this._moveContent(moveDelta);
                }
            },
            scrollToLeft: function(timeInSecond, attenuated) {
                var moveDelta = this._calculateMovePercentDelta({
                    anchor: cc.p(0, 0),
                    applyToHorizontal: true,
                    applyToVertical: false
                });
                if (timeInSecond) {
                    this._startAutoScroll(moveDelta, timeInSecond, false !== attenuated);
                } else {
                    this._moveContent(moveDelta);
                }
            },
            scrollToRight: function(timeInSecond, attenuated) {
                var moveDelta = this._calculateMovePercentDelta({
                    anchor: cc.p(1, 0),
                    applyToHorizontal: true,
                    applyToVertical: false
                });
                if (timeInSecond) {
                    this._startAutoScroll(moveDelta, timeInSecond, false !== attenuated);
                } else {
                    this._moveContent(moveDelta);
                }
            },
            scrollToTopLeft: function(timeInSecond, attenuated) {
                var moveDelta = this._calculateMovePercentDelta({
                    anchor: cc.p(0, 1),
                    applyToHorizontal: true,
                    applyToVertical: true
                });
                if (timeInSecond) {
                    this._startAutoScroll(moveDelta, timeInSecond, false !== attenuated);
                } else {
                    this._moveContent(moveDelta);
                }
            },
            scrollToTopRight: function(timeInSecond, attenuated) {
                var moveDelta = this._calculateMovePercentDelta({
                    anchor: cc.p(1, 1),
                    applyToHorizontal: true,
                    applyToVertical: true
                });
                if (timeInSecond) {
                    this._startAutoScroll(moveDelta, timeInSecond, false !== attenuated);
                } else {
                    this._moveContent(moveDelta);
                }
            },
            scrollToBottomLeft: function(timeInSecond, attenuated) {
                var moveDelta = this._calculateMovePercentDelta({
                    anchor: cc.p(0, 0),
                    applyToHorizontal: true,
                    applyToVertical: true
                });
                if (timeInSecond) {
                    this._startAutoScroll(moveDelta, timeInSecond, false !== attenuated);
                } else {
                    this._moveContent(moveDelta);
                }
            },
            scrollToBottomRight: function(timeInSecond, attenuated) {
                var moveDelta = this._calculateMovePercentDelta({
                    anchor: cc.p(1, 0),
                    applyToHorizontal: true,
                    applyToVertical: true
                });
                if (timeInSecond) {
                    this._startAutoScroll(moveDelta, timeInSecond, false !== attenuated);
                } else {
                    this._moveContent(moveDelta);
                }
            },
            scrollToPercentHorizontal: function(percent, timeInSecond, attenuated) {
                var moveDelta = this._calculateMovePercentDelta({
                    anchor: cc.p(percent, 0),
                    applyToHorizontal: true,
                    applyToVertical: false
                });
                if (timeInSecond) {
                    this._startAutoScroll(moveDelta, timeInSecond, false !== attenuated);
                } else {
                    this._moveContent(moveDelta);
                }
            },
            scrollTo: function(anchor, timeInSecond, attenuated) {
                var moveDelta = this._calculateMovePercentDelta({
                    anchor: anchor,
                    applyToHorizontal: true,
                    applyToVertical: true
                });
                if (timeInSecond) {
                    this._startAutoScroll(moveDelta, timeInSecond, false !== attenuated);
                } else {
                    this._moveContent(moveDelta);
                }
            },
            scrollToPercentVertical: function(percent, timeInSecond, attenuated) {
                var moveDelta = this._calculateMovePercentDelta({
                    anchor: cc.p(0, percent),
                    applyToHorizontal: false,
                    applyToVertical: true
                });
                if (timeInSecond) {
                    this._startAutoScroll(moveDelta, timeInSecond, false !== attenuated);
                } else {
                    this._moveContent(moveDelta);
                }
            },
            setContentPosition: function(position) {
                if (cc.pFuzzyEqual(position, this.getContentPosition(), EPSILON)) {
                    return;
                }
                this.content.setPosition(position);
                this._outOfBoundaryAmountDirty = true;
            },
            getContentPosition: function() {
                return this.content.getPosition();
            },
            _registerEvent: function() {
                this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
                this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
                this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
                this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this);
            },
            _calculateMovePercentDelta: function(options) {
                var anchor = options.anchor;
                var applyToHorizontal = options.applyToHorizontal;
                var applyToVertical = options.applyToVertical;
                anchor = cc.pClamp(anchor, cc.p(0, 0), cc.p(1, 1));
                var scrollSize = this.node.getContentSize();
                var contentSize = this.content.getContentSize();
                var bottomDeta = Math.abs(this._getContentBottomBoundary() - this._bottomBoundary);
                var leftDeta = Math.abs(this._getContentLeftBoundary() - this._leftBoundary);
                var moveDelta = cc.p(0, 0);
                if (applyToHorizontal) {
                    moveDelta.x = (contentSize.width - scrollSize.width) * anchor.x - leftDeta;
                }
                if (applyToVertical) {
                    moveDelta.y = (contentSize.height - scrollSize.height) * anchor.y - bottomDeta;
                }
                moveDelta = cc.pNeg(moveDelta);
                return moveDelta;
            },
            _calculateBoundary: function() {
                if (this.content) {
                    var scrollViewSize = this.node.getContentSize();
                    var leftBottomPosition = this._convertToContentParentSpace(cc.p(0, 0));
                    this._leftBoundary = leftBottomPosition.x;
                    this._bottomBoundary = leftBottomPosition.y;
                    var topRightPosition = this._convertToContentParentSpace(cc.p(scrollViewSize.width, scrollViewSize.height));
                    this._rightBoundary = topRightPosition.x;
                    this._topBoundary = topRightPosition.y;
                }
            },
            _convertToContentParentSpace: function(position) {
                var scrollViewPositionInWorldSpace = this.node.convertToWorldSpace(position);
                var contentParent = this.content.parent;
                return contentParent.convertToNodeSpaceAR(scrollViewPositionInWorldSpace);
            },
            _onTouchBegan: function(event) {
                var touch = event.touch;
                if (this.content) {
                    this._handlePressLogic(touch);
                }
                event.stopPropagation();
            },
            _cancelButtonClick: function(touch) {
                var deltaMove = touch.getDelta();
                var needCancelTouch = false;
                if (cc.sys.isMobile) {
                    var TOUCH_CANCEL_POINT = 7;
                    if (cc.pLength(deltaMove) > TOUCH_CANCEL_POINT) {
                        needCancelTouch = true;
                    }
                } else {
                    needCancelTouch = true;
                }
                return needCancelTouch;
            },
            _onTouchMoved: function(event) {
                var touch = event.touch;
                if (this.content) {
                    var buttonComponent = event.target.getComponent(cc.Button);
                    if (buttonComponent && this._cancelButtonClick(touch)) {
                        buttonComponent._cancelButtonClick();
                    }
                    this._handleMoveLogic(touch);
                }
                event.stopPropagation();
            },
            _onTouchEnded: function(event) {
                var touch = event.touch;
                if (this.content) {
                    this._handleReleaseLogic(touch);
                }
                event.stopPropagation();
            },
            _onTouchCancelled: function(event) {
                var touch = event.touch;
                if (this.content) {
                    this._handleReleaseLogic(touch);
                }
                event.stopPropagation();
            },
            _handleMoveLogic: function(touch) {
                var deltaMove = touch.getDelta();
                this._scrollChildren(deltaMove);
                this._gatherTouchMove(deltaMove);
            },
            _scrollChildren: function(deltaMove) {
                deltaMove = this._clampDelta(deltaMove);
                var realMove = deltaMove;
                var outOfBoundary;
                if (this.elastic) {
                    outOfBoundary = this._getHowMuchOutOfBoundary();
                    realMove.x *= 0 === outOfBoundary.x ? 1 : .5;
                    realMove.y *= 0 === outOfBoundary.y ? 1 : .5;
                }
                if (!this.elastic) {
                    outOfBoundary = this._getHowMuchOutOfBoundary(realMove);
                    realMove = cc.pAdd(realMove, outOfBoundary);
                }
                this._moveContent(realMove, false);
            },
            _handlePressLogic: function(touch) {
                this._autoScrolling = false;
                this._touchMovePreviousTimestamp = getTimeInMilliseconds();
                this._touchMoveDisplacements = [];
                this._touchMoveTimeDeltas = [];
                this._onScrollBarTouchBegan();
            },
            _clampDelta: function(delta) {
                var contentSize = this.content.getContentSize();
                var scrollViewSize = this.node.getContentSize();
                if (contentSize.width <= scrollViewSize.width) {
                    delta.x = 0;
                }
                if (contentSize.height <= scrollViewSize.height) {
                    delta.y = 0;
                }
                return delta;
            },
            _gatherTouchMove: function(delta) {
                delta = this._clampDelta(delta);
                while (this._touchMoveDisplacements.length >= NUMBER_OF_GATHERED_TOUCHES_FOR_MOVE_SPEED) {
                    this._touchMoveDisplacements.shift();
                    this._touchMoveTimeDeltas.shift();
                }
                this._touchMoveDisplacements.push(delta);
                var timeStamp = getTimeInMilliseconds();
                this._touchMoveTimeDeltas.push((timeStamp - this._touchMovePreviousTimestamp) / 1e3);
                this._touchMovePreviousTimestamp = timeStamp;
            },
            _startBounceBackIfNeeded: function() {
                if (!this.elastic) {
                    return false;
                }
                var bounceBackAmount = this._getHowMuchOutOfBoundary();
                bounceBackAmount = this._clampDelta(bounceBackAmount);
                if (cc.pFuzzyEqual(bounceBackAmount, cc.p(0, 0), EPSILON)) {
                    return false;
                }
                var bounceBackTime = Math.max(this.bounceDuration, 0);
                this._startAutoScroll(bounceBackAmount, bounceBackTime, true);
                return true;
            },
            _handleReleaseLogic: function(touch) {
                var delta = touch.getDelta();
                this._gatherTouchMove(delta);
                var bounceBackStarted = this._startBounceBackIfNeeded();
                if (!bounceBackStarted && this.inertia) {
                    var touchMoveVelocity = this._calculateTouchMoveVelocity();
                    if (!cc.pFuzzyEqual(touchMoveVelocity, cc.p(0, 0), EPSILON) && this.brake < 1) {
                        this._startInertiaScroll(touchMoveVelocity);
                    }
                }
                this._onScrollBarTouchEnded();
            },
            _isOutOfBoundary: function() {
                var outOfBoundary = this._getHowMuchOutOfBoundary();
                return !cc.pFuzzyEqual(outOfBoundary, cc.p(0, 0), EPSILON);
            },
            _isNecessaryAutoScrollBrake: function() {
                if (this._autoScrollBraking) {
                    return true;
                }
                if (this._isOutOfBoundary()) {
                    if (!this._autoScrollCurrentlyOutOfBoundary) {
                        this._autoScrollCurrentlyOutOfBoundary = true;
                        this._autoScrollBraking = true;
                        this._autoScrollBrakingStartPosition = this.getContentPosition();
                        return true;
                    }
                } else {
                    this._autoScrollCurrentlyOutOfBoundary = false;
                }
                return false;
            },
            _processAutoScrolling: function(dt) {
                var isAutoScrollBrake = this._isNecessaryAutoScrollBrake();
                var brakingFactor = isAutoScrollBrake ? OUT_OF_BOUNDARY_BREAKING_FACTOR : 1;
                this._autoScrollAccumulatedTime += dt * (1 / brakingFactor);
                var percentage = Math.min(1, this._autoScrollAccumulatedTime / this._autoScrollTotalTime);
                if (this._autoScrollAttenuate) {
                    percentage = quintEaseOut(percentage);
                }
                var newPosition = cc.pAdd(this._autoScrollStartPosition, cc.pMult(this._autoScrollTargetDelta, percentage));
                var reachedEnd = 1 === percentage;
                if (this.elastic) {
                    var brakeOffsetPosition = cc.pSub(newPosition, this._autoScrollBrakingStartPosition);
                    if (isAutoScrollBrake) {
                        brakeOffsetPosition = cc.pMult(brakeOffsetPosition, brakingFactor);
                    }
                    newPosition = cc.pAdd(this._autoScrollBrakingStartPosition, brakeOffsetPosition);
                } else {
                    var moveDelta = cc.pSub(newPosition, this.getContentPosition());
                    var outOfBoundary = this._getHowMuchOutOfBoundary(moveDelta);
                    if (!cc.pFuzzyEqual(outOfBoundary, cc.p(0, 0), EPSILON)) {
                        newPosition = cc.pAdd(newPosition, outOfBoundary);
                        reachedEnd = true;
                    }
                }
                if (reachedEnd) {
                    this._autoScrolling = false;
                }
                var contentPos = cc.pSub(newPosition, this.getContentPosition());
                this._moveContent(contentPos, reachedEnd);
            },
            _startInertiaScroll: function(touchMoveVelocity) {
                var inertiaTotalMovement = cc.pMult(touchMoveVelocity, MOVEMENT_FACTOR);
                this._startAttenuatingAutoScroll(inertiaTotalMovement, touchMoveVelocity);
            },
            _calculateAttenuatedFactor: function(distance) {
                if (this.brake <= 0) {
                    return 1 - this.brake;
                }
                var attenuatedFactor = (1 - this.brake) * (1 / (1 + 14e-6 * distance + distance * distance * 8e-9));
                return attenuatedFactor;
            },
            _startAttenuatingAutoScroll: function(deltaMove, initialVelocity) {
                var time = this._calculateAutoScrollTimeByInitalSpeed(cc.pLength(initialVelocity));
                var originalMoveLength = cc.pLength(deltaMove);
                var targetDelta = cc.pNormalize(deltaMove);
                var contentSize = this.content.getContentSize();
                var scrollviewSize = this.node.getContentSize();
                var totalMoveWidth = contentSize.width - scrollviewSize.width;
                var totalMoveHeight = contentSize.height - scrollviewSize.height;
                var attenuatedFactorX = this._calculateAttenuatedFactor(totalMoveWidth);
                var attenuatedFactorY = this._calculateAttenuatedFactor(totalMoveHeight);
                targetDelta = cc.p(targetDelta.x * totalMoveWidth * (1 - this.brake) * attenuatedFactorX, targetDelta.y * totalMoveHeight * attenuatedFactorY * (1 - this.brake));
                targetDelta = cc.pAdd(deltaMove, targetDelta);
                var factor = cc.pLength(targetDelta) / originalMoveLength;
                time *= factor;
                this._startAutoScroll(targetDelta, time, true);
            },
            _calculateAutoScrollTimeByInitalSpeed: function(initalSpeed) {
                var time = Math.sqrt(Math.sqrt(initalSpeed / 5));
                return time;
            },
            _startAutoScroll: function(deltaMove, timeInSecond, attenuated) {
                var adjustedDeltaMove = this._flattenVectorByDirection(deltaMove);
                this._autoScrolling = true;
                this._autoScrollTargetDelta = adjustedDeltaMove;
                this._autoScrollAttenuate = attenuated;
                this._autoScrollStartPosition = this.getContentPosition();
                this._autoScrollTotalTime = timeInSecond;
                this._autoScrollAccumulatedTime = 0;
                this._autoScrollBraking = false;
                this._autoScrollBrakingStartPosition = cc.p(0, 0);
                var currentOutOfBoundary = this._getHowMuchOutOfBoundary();
                if (!cc.pFuzzyEqual(currentOutOfBoundary, cc.p(0, 0), EPSILON)) {
                    this._autoScrollCurrentlyOutOfBoundary = true;
                    var afterOutOfBoundary = this._getHowMuchOutOfBoundary(adjustedDeltaMove);
                    if (currentOutOfBoundary.x * afterOutOfBoundary.x > 0 || currentOutOfBoundary.y * afterOutOfBoundary.y > 0) {
                        this._autoScrollBraking = true;
                    }
                }
            },
            _calculateTouchMoveVelocity: function() {
                var totalTime = 0;
                totalTime = this._touchMoveTimeDeltas.reduce(function(a, b) {
                    return a + b;
                }, totalTime);
                if (totalTime <= 0 || totalTime >= .5) {
                    return cc.p(0, 0);
                }
                var totalMovement = cc.p(0, 0);
                totalMovement = this._touchMoveDisplacements.reduce(function(a, b) {
                    return cc.pAdd(a, b);
                }, totalMovement);
                return cc.p(totalMovement.x / totalTime, totalMovement.y / totalTime);
            },
            _flattenVectorByDirection: function(vector) {
                var result = vector;
                result.x = this.horizontal ? result.x : 0;
                result.y = this.vertical ? result.y : 0;
                return result;
            },
            _moveContent: function(deltaMove, canStartBounceBack) {
                var adjustedMove = this._flattenVectorByDirection(deltaMove);
                var newPosition = cc.pAdd(this.getContentPosition(), adjustedMove);
                this.setContentPosition(newPosition);
                var outOfBoundary = this._getHowMuchOutOfBoundary();
                this._updateScrollBar(outOfBoundary);
                if (this.elastic && canStartBounceBack) {
                    this._startBounceBackIfNeeded();
                }
            },
            _getContentLeftBoundary: function() {
                var contentPos = this.getContentPosition();
                var leftBoundary = contentPos.x - this.content.getAnchorPoint().x * this.content.getContentSize().width;
                return leftBoundary;
            },
            _getContentRightBoundary: function() {
                var contentSize = this.content.getContentSize();
                return this._getContentLeftBoundary() + contentSize.width;
            },
            _getContentTopBoundary: function() {
                var contentSize = this.content.getContentSize();
                return this._getContentBottomBoundary() + contentSize.height;
            },
            _getContentBottomBoundary: function() {
                var contentPos = this.getContentPosition();
                var bottomBoundary = contentPos.y - this.content.getAnchorPoint().y * this.content.getContentSize().height;
                return bottomBoundary;
            },
            _getHowMuchOutOfBoundary: function(addition) {
                addition = addition || cc.p(0, 0);
                if (cc.pFuzzyEqual(addition, cc.p(0, 0), EPSILON) && !this._outOfBoundaryAmountDirty) {
                    return this._outOfBoundaryAmount;
                }
                var outOfBoundaryAmount = cc.p(0, 0);
                if (this._getContentLeftBoundary() + addition.x > this._leftBoundary) {
                    outOfBoundaryAmount.x = this._leftBoundary - (this._getContentLeftBoundary() + addition.x);
                } else {
                    if (this._getContentRightBoundary() + addition.x < this._rightBoundary) {
                        outOfBoundaryAmount.x = this._rightBoundary - (this._getContentRightBoundary() + addition.x);
                    }
                }
                if (this._getContentTopBoundary() + addition.y < this._topBoundary) {
                    outOfBoundaryAmount.y = this._topBoundary - (this._getContentTopBoundary() + addition.y);
                } else {
                    if (this._getContentBottomBoundary() + addition.y > this._bottomBoundary) {
                        outOfBoundaryAmount.y = this._bottomBoundary - (this._getContentBottomBoundary() + addition.y);
                    }
                }
                if (cc.pFuzzyEqual(addition, cc.p(0, 0), EPSILON)) {
                    this._outOfBoundaryAmount = outOfBoundaryAmount;
                    this._outOfBoundaryAmountDirty = false;
                }
                outOfBoundaryAmount = this._clampDelta(outOfBoundaryAmount);
                return outOfBoundaryAmount;
            },
            _updateScrollBar: function(outOfBoundary) {
                if (this.horizontalScrollBar) {
                    this.horizontalScrollBar._onScroll(outOfBoundary);
                }
                if (this.verticalScrollBar) {
                    this.verticalScrollBar._onScroll(outOfBoundary);
                }
            },
            _onScrollBarTouchBegan: function() {
                if (this.horizontalScrollBar) {
                    this.horizontalScrollBar._onTouchBegan();
                }
                if (this.verticalScrollBar) {
                    this.verticalScrollBar._onTouchBegan();
                }
            },
            _onScrollBarTouchEnded: function() {
                if (this.horizontalScrollBar) {
                    this.horizontalScrollBar._onTouchEnded();
                }
                if (this.verticalScrollBar) {
                    this.verticalScrollBar._onTouchEnded();
                }
            },
            onLoad: function() {
                if (true) {
                    this._registerEvent();
                }
            },
            start: function() {
                this._calculateBoundary();
            },
            update: function(dt) {
                if (this._autoScrolling) {
                    this._processAutoScrolling(dt);
                }
            }
        });
        cc.ScrollView = module.exports = ScrollView;
    }, {
        "./CCComponent": 35
    } ],
    45: [ function(require, module, exports) {
        var SpriteType = cc.Scale9Sprite.RenderingType;
        var FillType = cc.Scale9Sprite.FillType;
        var SizeMode = cc.Enum({
            CUSTOM: 0,
            TRIMMED: 1,
            RAW: 2
        });
        var Sprite = cc.Class({
            name: "cc.Sprite",
            "extends": require("./CCComponentInSG"),
            editor: false,
            properties: {
                _spriteFrame: {
                    "default": null,
                    type: cc.SpriteFrame
                },
                _type: SpriteType.SIMPLE,
                _useOriginalSize: true,
                _sizeMode: -1,
                _fillType: 0,
                _fillCenter: cc.v2(0, 0),
                _fillStart: 0,
                _fillRange: 0,
                _isTrimmedMode: true,
                _atlas: {
                    "default": "",
                    type: cc.SpriteAtlas,
                    tooltip: "i18n:COMPONENT.sprite.atlas",
                    editorOnly: true,
                    visible: true,
                    animatable: false
                },
                spriteFrame: {
                    get: function() {
                        return this._spriteFrame;
                    },
                    set: function(value, force) {
                        var lastSprite = this._spriteFrame;
                        this._spriteFrame = value;
                        this._applySpriteFrame(lastSprite);
                        this._sgNode.setColor(this.node._color);
                        this._sgNode.setOpacity(this.node._opacity);
                    },
                    type: cc.SpriteFrame
                },
                type: {
                    get: function() {
                        return this._type;
                    },
                    set: function(value) {
                        this._type = value;
                        this._sgNode.setRenderingType(this._type);
                        this._applyCapInset();
                    },
                    type: SpriteType,
                    animatable: false,
                    tooltip: "i18n:COMPONENT.sprite.type"
                },
                fillType: {
                    get: function() {
                        return this._fillType;
                    },
                    set: function(value) {
                        this._fillType = value;
                        this._sgNode && this._sgNode.setFillType(value);
                    },
                    type: FillType
                },
                fillCenter: {
                    get: function() {
                        return this._fillCenter;
                    },
                    set: function(value) {
                        this._fillCenter = cc.v2(value);
                        this._sgNode && this._sgNode.setFillCenter(this._fillCenter);
                    }
                },
                fillStart: {
                    get: function() {
                        return this._fillStart;
                    },
                    set: function(value) {
                        this._fillStart = value;
                        this._sgNode && this._sgNode.setFillStart(value);
                    }
                },
                fillRange: {
                    get: function() {
                        return this._fillRange;
                    },
                    set: function(value) {
                        this._fillRange = value;
                        this._sgNode && this._sgNode.setFillRange(value);
                    }
                },
                isTrimmedMode: {
                    get: function() {
                        return this._isTrimmedMode;
                    },
                    set: function(value) {
                        if (this._isTrimmedMode !== value) {
                            this._isTrimmedMode = value;
                            this._sgNode.enableTrimmedContentSize(value);
                        }
                    },
                    animatable: false
                },
                useOriginalSize: {
                    get: function() {
                        return this._useOriginalSize;
                    },
                    set: function(value) {
                        this._useOriginalSize = value;
                        if (value) {
                            this._applySpriteSize();
                        }
                    },
                    animatable: false,
                    tooltip: "i18n:COMPONENT.sprite.original_size"
                },
                sizeMode: {
                    get: function() {
                        return this._sizeMode;
                    },
                    set: function(value) {
                        this._sizeMode = value;
                        if (value !== SizeMode.CUSTOM) {
                            this._applySpriteSize();
                        }
                    },
                    animatable: false,
                    type: SizeMode
                },
                localSize: {
                    get: function() {
                        var sgNode = this._sgNode;
                        return cc.size(sgNode.width, sgNode.height);
                    },
                    visible: false,
                    override: true
                }
            },
            setVisible: function(visible) {
                this.enabled = visible;
            },
            setScale9Enabled: function(enabled) {
                this.type = enabled ? cc.Scale9Sprite.RenderingType.SLICED : cc.Scale9Sprite.RenderingType.SIMPLE;
            },
            isScale9Enabled: function() {
                return this.type === cc.Scale9Sprite.RenderingType.SLICED;
            },
            initWithFile: function(file) {
                this._sgNode.initWithFile(file);
            },
            initWithSpriteFrame: function(spriteFrame) {
                this._spriteFrame = spriteFrame;
                this._sgNode.initWithSpriteFrame(spriteFrame);
            },
            initWithSpriteFrameName: function(spriteFrameName) {
                var initialized = this._sgNode.initWithSpriteFrame(spriteFrameName);
                if (false === initialized) {
                    return;
                }
                this._spriteFrame = this._sgNode.getSpriteFrame();
            },
            getOriginalSize: function() {
                return this._sgNode.getOriginalSize();
            },
            setInsetLeft: function(insetLeft) {
                this._sgNode.setInsetLeft(insetLeft);
            },
            getInsetLeft: function() {
                return this._sgNode.getInsetLeft();
            },
            setInsetTop: function(insetTop) {
                this._sgNode.setInsetTop(insetTop);
            },
            getInsetTop: function() {
                return this._sgNode.getInsetTop();
            },
            setInsetRight: function(insetRight) {
                this._sgNode.setInsetRight(insetRight);
            },
            getInsetRight: function() {
                return this._sgNode.getInsetRight();
            },
            setInsetBottom: function(insetBottom) {
                this._sgNode.setInsetBottom(insetBottom);
            },
            getInsetBottom: function() {
                return this._sgNode.getInsetBottom();
            },
            onLoad: function() {
                this._super();
                this.node.on("size-changed", this._resized, this);
            },
            onDestroy: function() {
                this._super();
                this.node.off("size-changed", this._resized, this);
            },
            _validateSizeMode: function() {
                if (-1 === this._sizeMode) {
                    if (this._useOriginalSize) {
                        this._sizeMode = SizeMode.TRIMMED;
                    } else {
                        this._sizeMode = SizeMode.CUSTOM;
                    }
                    this._isTrimmedMode = true;
                }
            },
            _applyAtlas: false,
            _applyCapInset: function() {
                if (this._type === SpriteType.SLICED && this._spriteFrame) {
                    var sgNode = this._sgNode;
                    sgNode.setInsetTop(this._spriteFrame.insetTop);
                    sgNode.setInsetBottom(this._spriteFrame.insetBottom);
                    sgNode.setInsetRight(this._spriteFrame.insetRight);
                    sgNode.setInsetLeft(this._spriteFrame.insetLeft);
                }
            },
            _applySpriteSize: function() {
                if (SizeMode.CUSTOM === this._sizeMode || !this._spriteFrame) {
                    this.node.setContentSize(this.node.getContentSize(true));
                } else {
                    if (SizeMode.RAW === this._sizeMode) {
                        var size = this._spriteFrame.getOriginalSize();
                        this.node.setContentSize(size);
                    } else {
                        if (SizeMode.TRIMMED === this._sizeMode) {
                            var rect = this._spriteFrame.getRect();
                            this.node.setContentSize(cc.size(rect.width, rect.height));
                        } else {
                            this.node.setContentSize(this.node.getContentSize(true));
                        }
                    }
                }
            },
            _onSpriteFrameLoaded: function(event) {
                var self = this;
                var sgNode = this._sgNode;
                sgNode.setSpriteFrame(self._spriteFrame);
                self._applyCapInset();
                self._applySpriteSize();
                if (this.enabledInHierarchy && !sgNode.isVisible()) {
                    sgNode.setVisible(true);
                }
            },
            _applySpriteFrame: function(oldFrame) {
                var sgNode = this._sgNode;
                if (oldFrame && oldFrame.off) {
                    oldFrame.off("load", this._onSpriteFrameLoaded, this);
                }
                if (this._spriteFrame) {
                    if (this._spriteFrame.textureLoaded()) {
                        this._onSpriteFrameLoaded(null);
                    } else {
                        this._spriteFrame.once("load", this._onSpriteFrameLoaded, this);
                    }
                } else {
                    sgNode.setVisible(false);
                }
                if (false) {
                    this._applyAtlas(this._spriteFrame);
                }
            },
            _createSgNode: function() {
                return new cc.Scale9Sprite();
            },
            _initSgNode: function() {
                var sgNode = this._sgNode;
                if (!this.enabledInHierarchy) {
                    sgNode.setVisible(false);
                }
                this._validateSizeMode();
                this._applySpriteFrame(null);
                sgNode.setContentSize(this.node.getContentSize(true));
                this._applySpriteSize();
                sgNode.setRenderingType(this._type);
                sgNode.setFillType(this._fillType);
                sgNode.setFillCenter(this._fillCenter);
                sgNode.setFillStart(this._fillStart);
                sgNode.setFillRange(this._fillRange);
                sgNode.enableTrimmedContentSize(this._isTrimmedMode);
            },
            _resized: function() {
                if (this._spriteFrame) {
                    var actualSize = this.node.getContentSize();
                    var expectedW = actualSize.width;
                    var expectedH = actualSize.height;
                    if (this._sizeMode === SizeMode.RAW) {
                        var size = this._spriteFrame.getOriginalSize();
                        expectedW = size.width;
                        expectedH = size.height;
                    } else {
                        if (this._sizeMode === SizeMode.TRIMMED) {
                            var rect = this._spriteFrame.getRect();
                            expectedW = rect.width;
                            expectedH = rect.height;
                        } else {}
                    }
                    if (expectedW !== actualSize.width || expectedH !== actualSize.height) {
                        this._sizeMode = SizeMode.CUSTOM;
                    }
                }
            }
        });
        var misc = require("../utils/misc");
        var SameNameGetSets = [ "atlas", "capInsets", "insetLeft", "insetTop", "insetRight", "insetBottom" ];
        var DiffNameGetSets = {
            type: [ null, "setRenderingType" ]
        };
        misc.propertyDefine(Sprite, SameNameGetSets, DiffNameGetSets);
        cc.Sprite = module.exports = Sprite;
    }, {
        "../utils/misc": 71,
        "./CCComponentInSG": 37
    } ],
    46: [ function(require, module, exports) {
        var TOP = 1;
        var MID = 2;
        var BOT = 4;
        var LEFT = 8;
        var CENTER = 16;
        var RIGHT = 32;
        var TOP_BOT = TOP | BOT;
        var LEFT_RIGHT = LEFT | RIGHT;
        var Widget = cc.Class({
            name: "cc.Widget",
            "extends": require("./CCComponent"),
            editor: false,
            properties: {
                isAlignTop: {
                    get: function() {
                        return (this._alignFlags & TOP) > 0;
                    },
                    set: function(value) {
                        this._setAlign(TOP, value);
                    },
                    animatable: false,
                    tooltip: "i18n:COMPONENT.widget.align_top"
                },
                isAlignVerticalCenter: {
                    get: function() {
                        return (this._alignFlags & MID) > 0;
                    },
                    set: function(value) {
                        if (value) {
                            this.isAlignTop = false;
                            this.isAlignBottom = false;
                            this._alignFlags |= MID;
                        } else {
                            this._alignFlags &= ~MID;
                        }
                    },
                    animatable: false,
                    tooltip: "i18n:COMPONENT.widget.align_v_center"
                },
                isAlignBottom: {
                    get: function() {
                        return (this._alignFlags & BOT) > 0;
                    },
                    set: function(value) {
                        this._setAlign(BOT, value);
                    },
                    animatable: false,
                    tooltip: "i18n:COMPONENT.widget.align_bottom"
                },
                isAlignLeft: {
                    get: function() {
                        return (this._alignFlags & LEFT) > 0;
                    },
                    set: function(value) {
                        this._setAlign(LEFT, value);
                    },
                    animatable: false,
                    tooltip: "i18n:COMPONENT.widget.align_left"
                },
                isAlignHorizontalCenter: {
                    get: function() {
                        return (this._alignFlags & CENTER) > 0;
                    },
                    set: function(value) {
                        if (value) {
                            this.isAlignLeft = false;
                            this.isAlignRight = false;
                            this._alignFlags |= CENTER;
                        } else {
                            this._alignFlags &= ~CENTER;
                        }
                    },
                    animatable: false,
                    tooltip: "i18n:COMPONENT.widget.align_h_center"
                },
                isAlignRight: {
                    get: function() {
                        return (this._alignFlags & RIGHT) > 0;
                    },
                    set: function(value) {
                        this._setAlign(RIGHT, value);
                    },
                    animatable: false,
                    tooltip: "i18n:COMPONENT.widget.align_right"
                },
                isStretchWidth: {
                    get: function() {
                        return (this._alignFlags & LEFT_RIGHT) === LEFT_RIGHT;
                    },
                    visible: false
                },
                isStretchHeight: {
                    get: function() {
                        return (this._alignFlags & TOP_BOT) === TOP_BOT;
                    },
                    visible: false
                },
                top: {
                    get: function() {
                        return this._top;
                    },
                    set: function(value) {
                        this._top = value;
                    },
                    tooltip: "i18n:COMPONENT.widget.top"
                },
                bottom: {
                    get: function() {
                        return this._bottom;
                    },
                    set: function(value) {
                        this._bottom = value;
                    },
                    tooltip: "i18n:COMPONENT.widget.bottom"
                },
                left: {
                    get: function() {
                        return this._left;
                    },
                    set: function(value) {
                        this._left = value;
                    },
                    tooltip: "i18n:COMPONENT.widget.left"
                },
                right: {
                    get: function() {
                        return this._right;
                    },
                    set: function(value) {
                        this._right = value;
                    },
                    tooltip: "i18n:COMPONENT.widget.right"
                },
                isAbsoluteTop: {
                    get: function() {
                        return this._isAbsTop;
                    },
                    set: function(value) {
                        this._isAbsTop = value;
                    },
                    animatable: false
                },
                isAbsoluteBottom: {
                    get: function() {
                        return this._isAbsBottom;
                    },
                    set: function(value) {
                        this._isAbsBottom = value;
                    },
                    animatable: false
                },
                isAbsoluteLeft: {
                    get: function() {
                        return this._isAbsLeft;
                    },
                    set: function(value) {
                        this._isAbsLeft = value;
                    },
                    animatable: false
                },
                isAbsoluteRight: {
                    get: function() {
                        return this._isAbsRight;
                    },
                    set: function(value) {
                        this._isAbsRight = value;
                    },
                    animatable: false
                },
                _alignFlags: 0,
                _left: 0,
                _right: 0,
                _top: 0,
                _bottom: 0,
                _isAbsLeft: true,
                _isAbsRight: true,
                _isAbsTop: true,
                _isAbsBottom: true,
                _originalWidth: 0,
                _originalHeight: 0
            },
            onLoad: function() {
                cc._widgetManager.add(this);
            },
            onDestroy: function() {
                cc._widgetManager.remove(this);
            },
            _setAlign: function(flag, isAlign) {
                var current = (this._alignFlags & flag) > 0;
                if (isAlign == current) {
                    return;
                }
                var isHorizontal = (flag & LEFT_RIGHT) > 0;
                if (isAlign) {
                    this._alignFlags |= flag;
                    if (isHorizontal) {
                        this.isAlignHorizontalCenter = false;
                        if (this.isStretchWidth) {
                            this._originalWidth = this.node.width;
                        }
                    } else {
                        this.isAlignVerticalCenter = false;
                        if (this.isStretchHeight) {
                            this._originalHeight = this.node.height;
                        }
                    }
                    if (false) {
                        var type;
                        if (flag & TOP) {
                            type = "top";
                        } else {
                            if (flag & LEFT) {
                                type = "left";
                            } else {
                                if (flag & RIGHT) {
                                    type = "right";
                                } else {
                                    if (flag & BOT) {
                                        type = "bottom";
                                    }
                                }
                            }
                        }
                        cc._widgetManager.updateOffsetsToStayPut(this, type);
                    }
                } else {
                    if (isHorizontal) {
                        if (this.isStretchWidth) {
                            this.node.width = this._originalWidth;
                        }
                    } else {
                        if (this.isStretchHeight) {
                            this.node.height = this._originalHeight;
                        }
                    }
                    this._alignFlags &= ~flag;
                }
            }
        });
        cc.Widget = module.exports = Widget;
    }, {
        "./CCComponent": 35
    } ],
    47: [ function(require, module, exports) {
        require("./CCComponent");
        require("./CCComponentInSG");
        require("./CCComponentEventHandler");
        module.exports = [ require("./CCSprite"), require("./CCWidget"), require("./CCCanvas"), require("./CCAudioSource"), require("./CCAnimation"), require("./CCButton"), require("./CCLabel"), require("./CCProgressBar"), require("./CCMask"), require("./CCScrollBar"), require("./CCScrollView"), require("./CCLayout"), require("./CCEditBox") ];
    }, {
        "./CCAnimation": 31,
        "./CCAudioSource": 32,
        "./CCButton": 33,
        "./CCCanvas": 34,
        "./CCComponent": 35,
        "./CCComponentEventHandler": 36,
        "./CCComponentInSG": 37,
        "./CCEditBox": 38,
        "./CCLabel": 39,
        "./CCLayout": 40,
        "./CCMask": 41,
        "./CCProgressBar": 42,
        "./CCScrollBar": 43,
        "./CCScrollView": 44,
        "./CCSprite": 45,
        "./CCWidget": 46
    } ],
    48: [ function(require, module, exports) {
        var JS = cc.js;
        var CallbacksHandler = require("../platform/callbacks-invoker").CallbacksHandler;
        function EventListeners() {
            CallbacksHandler.call(this);
        }
        JS.extend(EventListeners, CallbacksHandler);
        EventListeners.prototype.invoke = function(event) {
            var list = this._callbackTable[event.type], i, endIndex, lastItem, callingFunc, target, hasTarget;
            if (list) {
                if (1 === list.length) {
                    list[0].call(event.currentTarget, event);
                    return;
                }
                endIndex = list.length - 1;
                lastItem = list[endIndex];
                for (i = 0; i <= endIndex; ) {
                    callingFunc = list[i];
                    target = list[i + 1];
                    hasTarget = target && "object" === typeof target;
                    var increment;
                    if (hasTarget) {
                        callingFunc.call(target, event);
                        increment = 2;
                    } else {
                        callingFunc.call(event.currentTarget, event);
                        increment = 1;
                    }
                    if (event._propagationImmediateStopped || i + increment > endIndex) {
                        break;
                    }
                    if (list[endIndex] !== lastItem) {
                        if (list[endIndex - 1] === lastItem) {
                            endIndex -= 1;
                        } else {
                            if (list[endIndex - 2] === lastItem) {
                                endIndex -= 2;
                            } else {
                                return cc.error("Call event.stopPropagationImmediate() when you remove more than one callbacks in a event callback.");
                            }
                        }
                        if (list[i] !== callingFunc) {
                            continue;
                        }
                    }
                    i += increment;
                }
            }
        };
        module.exports = EventListeners;
    }, {
        "../platform/callbacks-invoker": 58
    } ],
    49: [ function(require, module, exports) {
        var EventListeners = require("./event-listeners");
        require("./event");
        var JS = cc.js;
        var cachedArray = new Array(16);
        cachedArray.length = 0;
        var _doDispatchEvent = function(owner, event) {
            var target, i;
            event.target = owner;
            owner._getCapturingTargets(event.type, cachedArray);
            event.eventPhase = 1;
            for (i = cachedArray.length - 1; i >= 0; --i) {
                target = cachedArray[i];
                if (target._isTargetActive(event.type) && target._capturingListeners) {
                    event.currentTarget = target;
                    target._capturingListeners.invoke(event);
                    if (event._propagationStopped) {
                        return;
                    }
                }
            }
            cachedArray.length = 0;
            if (owner._isTargetActive(event.type)) {
                _doSendEvent(owner, event);
                if (event._propagationStopped) {
                    return;
                }
            }
            if (event.bubbles) {
                owner._getBubblingTargets(event.type, cachedArray);
                event.eventPhase = 3;
                for (i = 0; i < cachedArray.length; ++i) {
                    target = cachedArray[i];
                    if (target._isTargetActive(event.type) && target._bubblingListeners) {
                        event.currentTarget = target;
                        target._bubblingListeners.invoke(event);
                        if (event._propagationStopped) {
                            return;
                        }
                    }
                }
            }
            cachedArray.length = 0;
        };
        var _doSendEvent = function(owner, event) {
            event.eventPhase = 2;
            event.currentTarget = owner;
            if (owner._capturingListeners) {
                owner._capturingListeners.invoke(event);
                if (event._propagationStopped) {
                    return;
                }
            }
            if (owner._bubblingListeners) {
                owner._bubblingListeners.invoke(event);
            }
        };
        var EventTarget = function() {
            this._capturingListeners = null;
            this._bubblingListeners = null;
        };
        JS.mixin(EventTarget.prototype, {
            hasEventListener: function(type) {
                if (this._bubblingListeners && this._bubblingListeners.has(type)) {
                    return true;
                }
                if (this._capturingListeners && this._capturingListeners.has(type)) {
                    return true;
                }
                return false;
            },
            on: function(type, callback, target, useCapture) {
                if ("boolean" === typeof target) {
                    useCapture = target;
                    target = void 0;
                } else {
                    useCapture = !!useCapture;
                }
                if (!callback) {
                    cc.error("Callback of event must be non-nil");
                    return;
                }
                var listeners = null;
                if (useCapture) {
                    listeners = this._capturingListeners = this._capturingListeners || new EventListeners();
                } else {
                    listeners = this._bubblingListeners = this._bubblingListeners || new EventListeners();
                }
                if (!listeners.has(type, callback, target)) {
                    listeners.add(type, callback, target);
                    if (target && target.__eventTargets) {
                        target.__eventTargets.push(this);
                    }
                }
                return callback;
            },
            off: function(type, callback, target, useCapture) {
                if ("boolean" === typeof target) {
                    useCapture = target;
                    target = void 0;
                } else {
                    useCapture = !!useCapture;
                }
                if (!callback) {
                    return;
                }
                var listeners = useCapture ? this._capturingListeners : this._bubblingListeners;
                if (listeners) {
                    listeners.remove(type, callback, target);
                    if (target && target.__eventTargets) {
                        var index = target.__eventTargets.indexOf(this);
                        target.__eventTargets.splice(index, 1);
                    }
                }
            },
            targetOff: function(target) {
                if (this._capturingListeners) {
                    this._capturingListeners.removeAll(target);
                }
                if (this._bubblingListeners) {
                    this._bubblingListeners.removeAll(target);
                }
            },
            once: function(type, callback, target, useCapture) {
                var self = this;
                var cb = function(event) {
                    self.off(type, cb, target, useCapture);
                    callback.call(this, event);
                };
                this.on(type, cb, target, useCapture);
            },
            dispatchEvent: function(event) {
                _doDispatchEvent(this, event);
                cachedArray.length = 0;
                var notPrevented = !event._defaultPrevented;
                return notPrevented;
            },
            emit: function(message, detail) {
                if ("string" === typeof message) {
                    var event = new cc.Event.EventCustom(message);
                    event.detail = detail;
                    _doSendEvent(this, event);
                } else {
                    cc.error("The message must be provided");
                }
            },
            _isTargetActive: function(type) {
                return true;
            },
            _getCapturingTargets: function(type, array) {},
            _getBubblingTargets: function(type, array) {}
        });
        cc.EventTarget = module.exports = EventTarget;
    }, {
        "./event": 103,
        "./event-listeners": 48
    } ],
    50: [ function(require, module, exports) {
        require("./event.js");
        require("./event-listeners.js");
        require("./event-target.js");
    }, {
        "./event-listeners.js": 48,
        "./event-target.js": 49,
        "./event.js": 103
    } ],
    51: [ function(require, module, exports) {
        require("./platform");
        require("./assets");
        if (true) {
            require("./CCNode");
            require("./CCScene");
            require("./components");
        }
        require("./base-ui/CCWidgetManager");
    }, {
        "./CCNode": 15,
        "./CCScene": 16,
        "./assets": 29,
        "./base-ui/CCWidgetManager": 30,
        "./components": 47,
        "./platform": 60
    } ],
    52: [ function(require, module, exports) {
        var JS = require("./js");
        var Asset = require("../assets/CCAsset");
        var callInNextTick = require("./utils").callInNextTick;
        var LoadManager = require("./load-manager");
        var CallbacksInvoker = require("./callbacks-invoker");
        var _libraryBase = "";
        var _rawAssetsBase = "";
        var _uuidToRawAssets;
        var _uuidToCallbacks = new CallbacksInvoker();
        var _tdInfo = new cc.deserialize.Details();
        var _cc_loader_loadJson = cc.loader.loadJson.bind(cc.loader);
        function LoadingHandle(readMainCache, writeMainCache, recordAssets, deserializeInfo) {
            this.readMainCache = false;
            this.writeMainCache = false;
            var needIndieCache = !(this.readMainCache && this.writeMainCache);
            this.taskIndieCache = needIndieCache ? {} : null;
            this.pendingCache = {};
            this.assetsNeedPostLoad = recordAssets ? [] : null;
            this.deserializeInfo = deserializeInfo;
        }
        LoadingHandle.prototype.readCache = function(uuid) {
            if (this.readMainCache && this.writeMainCache) {
                return AssetLibrary._uuidToAsset[uuid];
            } else {
                if (this.readMainCache) {
                    return AssetLibrary._uuidToAsset[uuid] || this.taskIndieCache[uuid];
                } else {
                    return this.taskIndieCache[uuid];
                }
            }
        };
        LoadingHandle.prototype.writeCache = function(uuid, asset, hasRawType) {
            if (this.writeMainCache) {
                AssetLibrary._uuidToAsset[uuid] = asset;
            }
            if (this.taskIndieCache) {
                this.taskIndieCache[uuid] = asset;
            }
            if (this.assetsNeedPostLoad && asset._rawFiles && !hasRawType) {
                this.assetsNeedPostLoad.push(asset);
            }
        };
        var AssetLibrary = {
            loadAsset: function(uuid, callback, options) {
                var readMainCache = "undefined" !== typeof (options && options.readMainCache) ? readMainCache : true;
                var writeMainCache = "undefined" !== typeof (options && options.writeMainCache) ? writeMainCache : true;
                var handle = new LoadingHandle(readMainCache, writeMainCache, options && options.recordAssets, options && options.deserializeInfo);
                this._loadAssetByUuid(uuid, callback, handle, options && options.existingAsset);
                return handle;
            },
            _LoadingHandle: LoadingHandle,
            getImportedDir: function(uuid) {
                return _libraryBase + uuid.slice(0, 2);
            },
            _queryAssetInfoInEditor: function(uuid, callback) {
                if (false) {
                    Editor.sendRequestToCore("scene:query-asset-info-by-uuid", uuid, function(info) {
                        if (info) {
                            Editor.onRawAssetUsed(info.url, uuid);
                            var ctor = Editor.assets[info.type];
                            if (ctor) {
                                var isRawAsset = !cc.isChildClassOf(ctor, Asset);
                                callback(null, info.url, isRawAsset, ctor);
                            } else {
                                callback(new Error("Can not find asset type " + info.type));
                            }
                        } else {
                            callback(new Error("Can not get asset url by uuid " + uuid));
                        }
                    });
                }
            },
            _getAssetInfoInRuntime: function(uuid) {
                var info = _uuidToRawAssets[uuid];
                if (info) {
                    return {
                        url: _rawAssetsBase + info.url,
                        raw: info.raw
                    };
                } else {
                    var url = this.getImportedDir(uuid) + "/" + uuid + ".json";
                    return {
                        url: url,
                        raw: false
                    };
                }
            },
            queryAssetInfo: function(uuid, callback) {
                if (false) {
                    this._queryAssetInfoInEditor(uuid, callback);
                } else {
                    var info = this._getAssetInfoInRuntime(uuid);
                    callback(null, info.url, info.raw);
                }
            },
            parseUuidInEditor: function(url) {
                if (false) {
                    var uuid = "";
                    var isImported = url.startsWith(_libraryBase);
                    if (isImported) {
                        var dir = cc.path.dirname(url);
                        var dirBasename = cc.path.basename(dir);
                        var isAssetUrl = 2 === dirBasename.length;
                        if (isAssetUrl) {
                            uuid = cc.path.basename(url);
                            var index = uuid.indexOf(".");
                            if (-1 !== index) {
                                uuid = uuid.slice(0, index);
                            }
                        } else {
                            uuid = dirBasename;
                        }
                    }
                    return uuid;
                }
            },
            _loadAssetByUuid: function(uuid, callback, handle, existingAsset) {
                if ("string" !== typeof uuid) {
                    return callInNextTick(callback, new Error("[AssetLibrary] uuid must be string"), null);
                }
                if (!existingAsset) {
                    var asset = handle.readCache(uuid);
                    if (asset) {
                        return callInNextTick(callback, null, asset);
                    }
                }
                var canShareLoadingTask = handle.readMainCache && !existingAsset;
                if (canShareLoadingTask && !_uuidToCallbacks.add(uuid, callback)) {
                    return;
                }
                var loading = handle.pendingCache[uuid];
                if (loading) {
                    return callInNextTick(callback, null, loading);
                }
                function onload(error, json, url) {
                    function onDeserializedWithDepends(err, asset, hasRawType) {
                        if (asset) {
                            asset._uuid = uuid;
                            handle.writeCache(uuid, asset, hasRawType);
                        }
                        if (canShareLoadingTask) {
                            _uuidToCallbacks.invokeAndRemove(uuid, err, asset);
                        } else {
                            if (callback) {
                                callback(err, asset);
                            }
                        }
                    }
                    if (json) {
                        AssetLibrary._deserializeWithDepends(json, url, uuid, onDeserializedWithDepends, handle, existingAsset);
                    } else {
                        onDeserializedWithDepends(error, null);
                    }
                }
                if (false) {
                    this._queryAssetInfoInEditor(uuid, function(err, url, isRawAsset) {
                        if (err) {
                            callback(err);
                        } else {
                            var shouldLoadByEngine = !isRawAsset;
                            if (!shouldLoadByEngine) {
                                return callback(new Error("Should not load raw file in AssetLibrary, uuid: " + uuid));
                            }
                            LoadManager.loadByLoader(_cc_loader_loadJson, url, function(error, json) {
                                onload(error, json, url);
                            });
                        }
                    });
                } else {
                    var info = this._getAssetInfoInRuntime(uuid);
                    if (info.raw) {
                        return callback(new Error("Should not load raw file in AssetLibrary, uuid: " + uuid));
                    }
                    LoadManager.loadByLoader(_cc_loader_loadJson, info.url, function(error, json) {
                        onload(error, json, info.url);
                    });
                }
            },
            loadJson: function(json, callback, dontCache, recordAssets) {
                var handle = new LoadingHandle(!dontCache, !dontCache, recordAssets);
                var thisTick = true;
                this._deserializeWithDepends(json, "", "", function(p1, p2) {
                    if (thisTick) {
                        callInNextTick(callback, p1, p2);
                    } else {
                        callback(p1, p2);
                    }
                }, handle);
                thisTick = false;
                return handle;
            },
            _loadDepends: function(asset, _tdInfo, url, handle, callback) {
                var pendingCount = _tdInfo.uuidList.length;
                var rawProp = _tdInfo.rawProp;
                if (rawProp) {
                    var attrs = cc.Class.attr(asset.constructor, _tdInfo.rawProp);
                    var rawType = attrs.rawType;
                    ++pendingCount;
                    LoadManager.load(url, rawType, asset._rawext, function onRawObjLoaded(error, raw) {
                        if (error) {
                            cc.error("[AssetLibrary] Failed to load %s of %s. %s", rawType, url, error);
                        }
                        asset[rawProp] = raw;
                        --pendingCount;
                        if (0 === pendingCount) {
                            callback();
                            callback = null;
                        }
                    });
                }
                if (0 === pendingCount) {
                    if (callback) {
                        callback();
                    }
                    return;
                }
                for (var i = 0; i < _tdInfo.uuidList.length; i++) {
                    var dependsUuid = _tdInfo.uuidList[i];
                    !function(dependsUuid, obj, prop) {
                        AssetLibrary.queryAssetInfo(dependsUuid, function(err, dependsUrl, isRawAsset) {
                            if (err) {
                                cc.error('[AssetLibrary] Failed to load "%s", %s', dependsUuid, err);
                                --pendingCount;
                                if (callback && 0 === pendingCount) {
                                    callback();
                                    callback = null;
                                }
                                obj[prop] = obj[prop];
                                return;
                            } else {
                                if (isRawAsset) {
                                    cc.loader.load(dependsUrl, function(err, assets) {
                                        if (err) {
                                            cc.error('[AssetLibrary] Failed to load "%s"', dependsUrl);
                                            obj[prop] = "";
                                        } else {
                                            obj[prop] = dependsUrl;
                                        }
                                        --pendingCount;
                                        if (callback && 0 === pendingCount) {
                                            callback();
                                            callback = null;
                                        }
                                    });
                                    return;
                                }
                            }
                            var onDependsAssetLoaded = function(error, dependsAsset, hasRawType) {
                                if (false) {
                                    if (Editor.AssetDB && Editor.AssetDB.isValidUuid(dependsUuid)) {
                                        cc.error('[AssetLibrary] Failed to load "%s", %s', dependsUuid, error);
                                    }
                                }
                                obj[prop] = dependsAsset;
                                --pendingCount;
                                if (callback && 0 === pendingCount) {
                                    callback();
                                    callback = null;
                                }
                            };
                            AssetLibrary._loadAssetByUuid(dependsUuid, onDependsAssetLoaded, handle);
                        });
                    }(dependsUuid, _tdInfo.uuidObjList[i], _tdInfo.uuidPropList[i]);
                }
                if (callback && 0 === pendingCount) {
                    callback();
                    callback = null;
                }
            },
            _deserializeWithDepends: function(json, url, uuid, callback, handle, existingAsset) {
                var classFinder = function(id) {
                    var cls = JS._getClassById(id);
                    if (cls) {
                        return cls;
                    }
                    cc.warn('Can not get class "%s"', id);
                    return Object;
                };
                var tdInfo = cc.sys.isNative ? new cc.deserialize.Details() : handle.deserializeInfo || _tdInfo;
                var asset = cc.deserialize(json, tdInfo, {
                    classFinder: classFinder,
                    target: existingAsset
                });
                var hasRawType = !!tdInfo.rawProp;
                if (uuid) {
                    handle.pendingCache[uuid] = asset;
                }
                this._loadDepends(asset, tdInfo, url, handle, function() {
                    if (uuid) {
                        delete handle.pendingCache[uuid];
                    }
                    callback(null, asset, hasRawType);
                });
                tdInfo.reset();
            },
            getAssetByUuid: function(uuid) {
                return AssetLibrary._uuidToAsset[uuid] || null;
            },
            init: function(options) {
                if (false) {
                    cc.error("AssetLibrary has already been initialized!");
                    return;
                }
                var libraryPath = options.libraryPath;
                libraryPath = libraryPath.replace(/\\/g, "/");
                _libraryBase = cc.path._setEndWithSep(libraryPath, "/");
                _rawAssetsBase = options.rawAssetsBase;
                _uuidToRawAssets = {};
                var rawAssets = options.rawAssets;
                if (rawAssets) {
                    for (var mountPoint in rawAssets) {
                        var assets = rawAssets[mountPoint];
                        for (var uuid in assets) {
                            var info = assets[uuid];
                            _uuidToRawAssets[uuid] = {
                                url: mountPoint + "/" + info.url,
                                raw: !!info.raw
                            };
                        }
                    }
                }
                var mountPaths = options.mountPaths;
                if (!mountPaths) {
                    mountPaths = {
                        assets: _rawAssetsBase + "assets",
                        internal: _rawAssetsBase + "internal"
                    };
                }
                cc.url._init(mountPaths);
            }
        };
        AssetLibrary._uuidToAsset = {};
        cc.AssetLibrary = AssetLibrary;
    }, {
        "../assets/CCAsset": 17,
        "./callbacks-invoker": 58,
        "./js": 62,
        "./load-manager": 63,
        "./utils": 68
    } ],
    53: [ function(require, module, exports) {
        var JS = require("./js");
        var Enum = require("../value-types/CCEnum");
        var Utils = require("./utils");
        var _isPlainEmptyObj_DEV = Utils.isPlainEmptyObj_DEV;
        var _cloneable_DEV = Utils.cloneable_DEV;
        var Attr = require("./attribute");
        var getTypeChecker = Attr.getTypeChecker;
        var preprocessAttrs = require("./preprocess-attrs");
        var BUILTIN_ENTRIES = [ "name", "extends", "mixins", "ctor", "properties", "statics", "editor" ];
        var TYPO_TO_CORRECT = false;
        var INVALID_STATICS = false;
        var deferredInitializer = {
            datas: null,
            push: function(data) {
                if (this.datas) {
                    this.datas.push(data);
                } else {
                    this.datas = [ data ];
                    var self = this;
                    setTimeout(function() {
                        self.init();
                    }, 0);
                }
            },
            init: function() {
                var datas = this.datas;
                if (datas) {
                    for (var i = 0; i < datas.length; ++i) {
                        var data = datas[i];
                        var cls = data.cls;
                        var properties = data.props;
                        if ("function" === typeof properties) {
                            properties = properties();
                        }
                        var name = JS.getClassName(cls);
                        if (properties) {
                            declareProperties(cls, name, properties, cls.$super, data.mixins);
                        } else {
                            cc.error('Properties function of "%s" should return an object!', name);
                        }
                    }
                    this.datas = null;
                }
            }
        };
        function appendProp(cls, name) {
            if (false) {
                if (-1 !== name.indexOf(".")) {
                    cc.error('Disallow to use "." in property name');
                    return;
                }
            }
            var index = cls.__props__.indexOf(name);
            if (index < 0) {
                cls.__props__.push(name);
            }
        }
        function defineProp(cls, className, propName, defaultValue, attrs) {
            if (false) {
                if ("object" === typeof defaultValue && defaultValue) {
                    if (Array.isArray(defaultValue)) {
                        if (defaultValue.length > 0) {
                            cc.error('Default array must be empty, set default value of %s.%s to [], and initialize in "onLoad" or "ctor" please. (just like "this.%s = [...];")', className, propName, propName);
                            return;
                        }
                    } else {
                        if (!_isPlainEmptyObj_DEV(defaultValue)) {
                            if (!_cloneable_DEV(defaultValue)) {
                                cc.error('Do not set default value to non-empty object, unless the object defines its own "clone" function. Set default value of %s.%s to null or {}, and initialize in "onLoad" or "ctor" please. (just like "this.%s = {foo: bar};")', className, propName, propName);
                                return;
                            }
                        }
                    }
                }
                for (var base = cls.$super; base; base = base.$super) {
                    if (base.prototype.hasOwnProperty(propName)) {
                        cc.error("Can not declare %s.%s, it is already defined in the prototype of %s", className, propName, className);
                        return;
                    }
                }
            }
            Attr.attr(cls, propName, {
                "default": defaultValue
            });
            appendProp(cls, propName);
            if (attrs) {
                var onAfterProp = null;
                for (var i = 0; i < attrs.length; i++) {
                    var attr = attrs[i];
                    Attr.attr(cls, propName, attr);
                    if (attr._onAfterProp) {
                        onAfterProp = onAfterProp || [];
                        onAfterProp.push(attr._onAfterProp);
                    }
                }
                if (onAfterProp) {
                    for (var c = 0; c < onAfterProp.length; c++) {
                        onAfterProp[c](cls, propName);
                    }
                }
            }
        }
        function defineGetSet(cls, name, propName, val, attrs) {
            var getter = val.get;
            var setter = val.set;
            var proto = cls.prototype;
            var d = Object.getOwnPropertyDescriptor(proto, propName);
            if (getter) {
                if (d && d.get && false) {
                    cc.error('"%s": the getter of "%s" is already defined!', name, propName);
                    return;
                }
                if (attrs) {
                    for (var i = 0; i < attrs.length; ++i) {
                        var attr = attrs[i];
                        if (false === attr._canUsedInGetter && false) {
                            cc.error('Can not apply the specified attribute to the getter of "%s.%s", attribute index: %s', name, propName, i);
                            continue;
                        }
                        Attr.attr(cls, propName, attr);
                        if ((false === attr.serializable || true === attr.editorOnly) && false) {
                            cc.warn('No need to use "serializable: false" or "editorOnly: true" for the getter of "%s.%s", every getter is actually non-serialized.', name, propName);
                        }
                    }
                }
                var ForceSerializable = false;
                if (!ForceSerializable) {
                    Attr.attr(cls, propName, Attr.NonSerialized);
                }
                if (ForceSerializable || false) {
                    appendProp(cls, propName);
                }
                if (d) {
                    Object.defineProperty(proto, propName, {
                        get: getter
                    });
                } else {
                    Object.defineProperty(proto, propName, {
                        get: getter,
                        configurable: true,
                        enumerable: true
                    });
                }
                if (false) {
                    Attr.attr(cls, propName, {
                        hasGetter: true
                    });
                }
            }
            if (setter) {
                if (false) {
                    if (d && d.set) {
                        return cc.error('"%s": the setter of "%s" is already defined!', name, propName);
                    }
                    Object.defineProperty(proto, propName, {
                        set: setter,
                        configurable: true,
                        enumerable: true
                    });
                    Attr.attr(cls, propName, {
                        hasSetter: true
                    });
                } else {
                    if (d) {
                        Object.defineProperty(proto, propName, {
                            set: setter
                        });
                    } else {
                        Object.defineProperty(proto, propName, {
                            set: setter,
                            configurable: true,
                            enumerable: true
                        });
                    }
                }
            }
        }
        function getDefault(defaultVal) {
            if ("function" === typeof defaultVal) {
                if (false) {
                    try {
                        return defaultVal();
                    } catch (e) {
                        cc._throw(e);
                        return void 0;
                    }
                } else {
                    return defaultVal();
                }
            }
            return defaultVal;
        }
        function instantiateProps(instance, itsClass) {
            var propList = itsClass.__props__;
            if (null === propList) {
                deferredInitializer.init();
                propList = itsClass.__props__;
            }
            for (var i = 0; i < propList.length; i++) {
                var prop = propList[i];
                var attrs = Attr.attr(itsClass, prop);
                if (attrs && attrs.hasOwnProperty("default")) {
                    var def = attrs["default"];
                    if (def) {
                        if ("object" === typeof def && def) {
                            if ("function" === typeof def.clone) {
                                def = def.clone();
                            } else {
                                if (Array.isArray(def)) {
                                    def = [];
                                } else {
                                    def = {};
                                }
                            }
                        } else {
                            if ("function" === typeof def) {
                                def = getDefault(def);
                            }
                        }
                    }
                    instance[prop] = def;
                }
            }
        }
        cc.isChildClassOf = function(subclass, superclass) {
            if (subclass && superclass) {
                if ("function" !== typeof subclass) {
                    return false;
                }
                if ("function" !== typeof superclass) {
                    if (false) {
                        cc.warn("[isChildClassOf] superclass should be function type, not", superclass);
                    }
                    return false;
                }
                for (;subclass && subclass.$super; subclass = subclass.$super) {
                    if (subclass === superclass) {
                        return true;
                    }
                }
                if (subclass === superclass) {
                    return true;
                }
                var dunderProto = Object.getPrototypeOf(subclass.prototype);
                while (dunderProto) {
                    subclass = dunderProto.constructor;
                    if (subclass === superclass) {
                        return true;
                    }
                    dunderProto = Object.getPrototypeOf(subclass.prototype);
                }
            }
            return false;
        };
        function doDefine(className, baseClass, mixins, constructor, options) {
            var fireClass = _createCtor(constructor, baseClass, mixins, className, options);
            Object.defineProperty(fireClass, "extend", {
                value: function(options) {
                    options["extends"] = this;
                    return CCClass(options);
                },
                writable: true,
                configurable: true
            });
            if (baseClass) {
                JS.extend(fireClass, baseClass);
                fireClass.$super = baseClass;
            }
            if (mixins) {
                for (var m = 0; m < mixins.length; ++m) {
                    var mixin = mixins[m];
                    JS.mixin(fireClass.prototype, mixin.prototype);
                    for (var p in mixin) {
                        if (mixin.hasOwnProperty(p) && INVALID_STATICS.indexOf(p) < 0) {
                            fireClass[p] = mixin[p];
                        }
                    }
                }
                fireClass.prototype.constructor = fireClass;
            }
            JS.setClassName(className, fireClass);
            return fireClass;
        }
        function define(className, baseClasses, mixins, constructor, options) {
            if (cc.isChildClassOf(baseClasses, cc.Component)) {
                var frame = cc._RFpeek();
                if (frame) {
                    if (false) {
                        cc.warn("cc.Class: Should not define constructor for cc.Component.");
                    }
                    if (frame.beh) {
                        cc.error("Each script can have at most one Component.");
                        return;
                    }
                    var uuid = frame.uuid;
                    if (uuid) {
                        if (className && false) {
                            cc.warn("Should not specify class name for Component which defines in project.");
                        }
                    }
                    className = className || frame.script;
                    var cls = doDefine(className, baseClasses, mixins, constructor, options);
                    if (uuid) {
                        JS._setClassId(uuid, cls);
                        if (false) {
                            cc.Component._addMenuItem(cls, "i18n:MAIN_MENU.component.scripts/" + className, -1);
                            cls.prototype.__scriptUuid = Editor.decompressUuid(uuid);
                        }
                    }
                    frame.beh = cls;
                    return cls;
                }
            }
            return doDefine(className, baseClasses, mixins, constructor, options);
        }
        function _checkCtor(ctor) {
            if (false) {
                if (CCClass._isCCClass(ctor)) {
                    cc.error("Constructor can not be another CCClass");
                    return;
                }
                if ("function" !== typeof ctor) {
                    cc.error("Constructor of CCClass must be function type");
                    return;
                }
                if (ctor.length > 0) {
                    cc.warn("Can not instantiate CCClass with arguments.");
                    return;
                }
            }
        }
        function normalizeClassName(className) {
            if (false) {
                var DefaultName = "CCClass";
                if (className) {
                    className = className.replace(/\./g, "_");
                    className = className.split("").filter(function(x) {
                        return /^[a-zA-Z0-9_$]/.test(x);
                    }).join("");
                    if (/^[0-9]/.test(className[0])) {
                        className = "_" + className;
                    }
                    try {
                        eval("function " + className + "(){}");
                    } catch (e) {
                        className = "FireClass_" + className;
                        try {
                            eval("function " + className + "(){}");
                        } catch (e) {
                            return DefaultName;
                        }
                    }
                    return className;
                }
                return DefaultName;
            }
        }
        function _createCtor(ctor, baseClass, mixins, className, options) {
            var useTryCatch = !(className && className.startsWith("cc."));
            var shouldAddProtoCtor;
            if (false) {
                var originCtor = ctor;
                if (SuperCallReg.test(ctor)) {
                    cc.warn(cc._LogInfos.Editor.Class.callSuperCtor, className);
                    ctor = function() {
                        this._super = function() {};
                        var ret = originCtor.apply(this, arguments);
                        this._super = null;
                        return ret;
                    };
                }
                if (/\bprototype.ctor\b/.test(originCtor)) {
                    cc.warn(cc._LogInfos.Editor.Class.callSuperCtor, className);
                    shouldAddProtoCtor = true;
                }
            }
            var superCallBounded = options && baseClass && boundSuperCalls(baseClass, options);
            if (ctor && false) {
                _checkCtor(ctor);
            }
            var ctors = [];
            var baseOrMixins = [ baseClass ].concat(mixins);
            for (var b = 0; b < baseOrMixins.length; b++) {
                var baseOrMixin = baseOrMixins[b];
                if (baseOrMixin) {
                    if (CCClass._isCCClass(baseOrMixin)) {
                        var baseCtors = baseOrMixin.__ctors__;
                        if (baseCtors) {
                            ctors = ctors.concat(baseCtors);
                        }
                    } else {
                        if (baseOrMixin) {
                            ctors.push(baseOrMixin);
                        }
                    }
                }
            }
            if (ctor) {
                ctors.push(ctor);
            }
            var body;
            if (false) {
                body = "(function " + normalizeClassName(className) + "(){\n";
            } else {
                body = "(function(){\n";
            }
            if (superCallBounded) {
                body += "this._super=null;\n";
            }
            body += "instantiateProps(this,fireClass);\n";
            if (ctors.length > 0) {
                body += "var cs=fireClass.__ctors__;\n";
                if (useTryCatch) {
                    body += "try{\n";
                }
                if (ctors.length <= 5) {
                    for (var i = 0; i < ctors.length; i++) {
                        body += "(cs[" + i + "]).apply(this,arguments);\n";
                    }
                } else {
                    body += "for(var i=0,l=cs.length;i<l;++i){\n";
                    body += "(cs[i]).apply(this,arguments);\n}\n";
                }
                if (useTryCatch) {
                    body += "}catch(e){\ncc._throw(e);\n}\n";
                }
            }
            body += "})";
            var fireClass = eval(body);
            Object.defineProperty(fireClass, "__ctors__", {
                value: ctors.length > 0 ? ctors : null
            });
            if (shouldAddProtoCtor && false) {
                fireClass.prototype.ctor = function() {};
            }
            return fireClass;
        }
        var SuperCallReg = /xyz/.test(function() {
            xyz;
        }) ? /\b_super\b/ : /.*/;
        function _boundSuperCall(func, funcName, base) {
            var superFunc = null;
            var pd = JS.getPropertyDescriptor(base.prototype, funcName);
            if (pd) {
                if (pd.value) {
                    if ("function" === typeof pd.value) {
                        superFunc = pd.value;
                    }
                } else {
                    if (pd.get) {
                        var got = pd.get();
                        if ("function" === typeof got) {
                            superFunc = got;
                        }
                    }
                }
            }
            if (superFunc) {
                var hasSuperCall = SuperCallReg.test(func);
                if (hasSuperCall) {
                    return function() {
                        var tmp = this._super;
                        this._super = superFunc;
                        var ret = func.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                }
            }
            return null;
        }
        function boundSuperCalls(baseClass, options) {
            var hasSuperCall = false;
            for (var funcName in options) {
                if (BUILTIN_ENTRIES.indexOf(funcName) < 0) {
                    var func = options[funcName];
                    if ("function" === typeof func) {
                        var bounded = _boundSuperCall(func, funcName, baseClass);
                        if (bounded) {
                            hasSuperCall = true;
                            options[funcName] = bounded;
                        }
                    }
                }
            }
            return hasSuperCall;
        }
        function declareProperties(cls, className, properties, baseClass, mixins) {
            cls.__props__ = [];
            if (baseClass && baseClass.__props__) {
                cls.__props__ = baseClass.__props__.slice();
            }
            if (mixins) {
                for (var m = 0; m < mixins.length; ++m) {
                    var mixin = mixins[m];
                    if (mixin.__props__) {
                        cls.__props__ = cls.__props__.concat(mixin.__props__.filter(function(x) {
                            return cls.__props__.indexOf(x) < 0;
                        }));
                    }
                }
            }
            if (properties) {
                preprocessAttrs(properties, className, cls);
                for (var propName in properties) {
                    var val = properties[propName];
                    var attrs = parseAttributes(val, className, propName);
                    if ("default" in val) {
                        defineProp(cls, className, propName, val["default"], attrs);
                    } else {
                        defineGetSet(cls, className, propName, val, attrs);
                    }
                }
            }
        }
        function CCClass(options) {
            if (0 === arguments.length) {
                return define();
            }
            if (!options) {
                cc.error("cc.Class: Option must be non-nil");
                return define();
            }
            var name = options.name;
            var base = options["extends"];
            var mixins = options.mixins;
            var cls;
            cls = define(name, base, mixins, options.ctor, options);
            if (!name) {
                name = cc.js.getClassName(cls);
            }
            var properties = options.properties;
            if ("function" === typeof properties || base && null === base.__props__ || mixins && mixins.some(function(x) {
                return null === x.__props__;
            })) {
                deferredInitializer.push({
                    cls: cls,
                    props: properties,
                    mixins: mixins
                });
                cls.__props__ = null;
            } else {
                declareProperties(cls, name, properties, base, options.mixins);
            }
            var statics = options.statics;
            if (statics) {
                var staticPropName;
                if (false) {
                    for (staticPropName in statics) {
                        if (-1 !== INVALID_STATICS.indexOf(staticPropName)) {
                            cc.error('Cannot define %s.%s because static member name can not be "%s".', name, staticPropName, staticPropName);
                            continue;
                        }
                    }
                }
                for (staticPropName in statics) {
                    cls[staticPropName] = statics[staticPropName];
                }
            }
            for (var funcName in options) {
                if (BUILTIN_ENTRIES.indexOf(funcName) >= 0) {
                    continue;
                }
                var func = options[funcName];
                if ("function" === typeof func || null === func) {
                    cls.prototype[funcName] = func;
                } else {
                    if (false) {
                        var correct = TYPO_TO_CORRECT[funcName];
                        if (correct) {
                            cc.warn('Unknown type of %s.%s, maybe you want is "%s".', name, funcName, correct);
                        } else {
                            if (func) {
                                cc.error('Unknown type of %s.%s, property should be defined in "properties" or "ctor"', name, funcName);
                            }
                        }
                    }
                }
            }
            if (false) {
                var editor = options.editor;
                if (editor) {
                    if (cc.isChildClassOf(base, cc.Component)) {
                        cc.Component._registerEditorProps(cls, editor);
                    } else {
                        cc.warn('Can not use "editor" attribute, "%s" not inherits from Components.', name);
                    }
                }
            }
            return cls;
        }
        CCClass._isCCClass = function(constructor) {
            return !!constructor && "undefined" !== typeof constructor.__ctors__;
        };
        CCClass._fastDefine = function(className, constructor, serializableFields) {
            JS.setClassName(className, constructor);
            constructor.__props__ = serializableFields;
            for (var i = 0; i < serializableFields.length; i++) {
                Attr.attr(constructor, serializableFields[i], {
                    visible: false
                });
            }
        };
        CCClass.attr = Attr.attr;
        var tmpAttrs = [];
        function parseAttributes(attrs, className, propName) {
            var ERR_Type = false ? "The %s of %s must be type %s" : "";
            tmpAttrs.length = 0;
            var result = tmpAttrs;
            var type = attrs.type;
            if (type) {
                switch (type) {
                  case "Integer":
                    result.push({
                        type: "Integer"
                    });
                    break;

                  case "Float":
                    result.push({
                        type: "Float"
                    });
                    break;

                  case "Boolean":
                    result.push({
                        type: "Boolean",
                        _onAfterProp: getTypeChecker("Boolean", "Boolean")
                    });
                    break;

                  case "String":
                    result.push({
                        type: "String",
                        _onAfterProp: getTypeChecker("String", "String")
                    });
                    break;

                  case "Object":
                    if (false) {
                        cc.error('Please define "type" parameter of %s.%s as the actual constructor.', className, propName);
                    }
                    break;

                  default:
                    if (type === Attr.ScriptUuid) {
                        var attr = Attr.ObjectType(cc.ScriptAsset);
                        attr.type = "Script";
                        result.push(attr);
                    } else {
                        if ("object" === typeof type) {
                            if (Enum.isEnum(type)) {
                                result.push({
                                    type: "Enum",
                                    enumList: Enum.getList(type)
                                });
                            } else {
                                if (false) {
                                    cc.error('Please define "type" parameter of %s.%s as the constructor of %s.', className, propName, type);
                                }
                            }
                        } else {
                            if ("function" === typeof type) {
                                result.push(Attr.ObjectType(type));
                            } else {
                                if (false) {
                                    cc.error('Unknown "type" parameter of %s.%s：%s', className, propName, type);
                                }
                            }
                        }
                    }
                }
            }
            function parseSimpleAttr(attrName, expectType, attrCreater) {
                var val = attrs[attrName];
                if (val) {
                    if (typeof val === expectType) {
                        if ("undefined" === typeof attrCreater) {
                            var attr = {};
                            attr[attrName] = val;
                            result.push(attr);
                        } else {
                            result.push("function" === typeof attrCreater ? attrCreater(val) : attrCreater);
                        }
                    } else {
                        if (false) {
                            cc.error("The %s of %s.%s must be type %s", attrName, className, propName, expectType);
                        }
                    }
                }
            }
            parseSimpleAttr("rawType", "string", Attr.RawType);
            parseSimpleAttr("editorOnly", "boolean", Attr.EditorOnly);
            if (false) {
                parseSimpleAttr("displayName", "string");
                parseSimpleAttr("multiline", "boolean", {
                    multiline: true
                });
                parseSimpleAttr("readonly", "boolean", {
                    readonly: true
                });
                parseSimpleAttr("tooltip", "string");
            }
            if (attrs.url) {
                result.push({
                    saveUrlAsAsset: true
                });
            }
            if (false === attrs.serializable) {
                result.push(Attr.NonSerialized);
            }
            if (false) {
                if ("animatable" in attrs && !attrs.animatable) {
                    result.push({
                        animatable: false
                    });
                }
            }
            if (false) {
                var visible = attrs.visible;
                if ("undefined" !== typeof visible) {
                    if (!attrs.visible) {
                        result.push({
                            visible: false
                        });
                    }
                } else {
                    var startsWithUS = 95 === propName.charCodeAt(0);
                    if (startsWithUS) {
                        result.push({
                            visible: false
                        });
                    }
                }
            }
            var range = attrs.range;
            if (range) {
                if (Array.isArray(range)) {
                    if (range.length >= 2) {
                        result.push(Attr.Range(range[0], range[1]));
                    } else {
                        if (false) {
                            cc.error("The length of range array must be 2");
                        }
                    }
                } else {
                    if (false) {
                        cc.error(ERR_Type, '"range"', className + "." + propName, "array");
                    }
                }
            }
            return result;
        }
        cc.Class = CCClass;
        module.exports = {
            instantiateProps: instantiateProps,
            isArray: function(defaultVal) {
                defaultVal = getDefault(defaultVal);
                return Array.isArray(defaultVal);
            },
            fastDefine: CCClass._fastDefine
        };
    }, {
        "../value-types/CCEnum": 75,
        "./attribute": 57,
        "./js": 62,
        "./preprocess-attrs": 65,
        "./utils": 68
    } ],
    54: [ function(require, module, exports) {
        cc.INVALID_INDEX = -1;
        cc.PI = Math.PI;
        cc.FLT_MAX = parseFloat("3.402823466e+38F");
        cc.FLT_MIN = parseFloat("1.175494351e-38F");
        cc.RAD = cc.PI / 180;
        cc.DEG = 180 / cc.PI;
        cc.UINT_MAX = 4294967295;
        cc.swap = function(x, y, ref) {
            if (cc.js.isObject(ref) && !cc.js.isUndefined(ref.x) && !cc.js.isUndefined(ref.y)) {
                var tmp = ref[x];
                ref[x] = ref[y];
                ref[y] = tmp;
            } else {
                cc.log(cc._LogInfos.swap);
            }
        };
        cc.lerp = function(a, b, r) {
            return a + (b - a) * r;
        };
        cc.rand = function() {
            return 16777215 * Math.random();
        };
        cc.randomMinus1To1 = function() {
            return 2 * (Math.random() - .5);
        };
        cc.random0To1 = Math.random;
        cc.degreesToRadians = function(angle) {
            return angle * cc.RAD;
        };
        cc.radiansToDegrees = function(angle) {
            return angle * cc.DEG;
        };
        cc.radiansToDegress = function(angle) {
            cc.log(cc._LogInfos.radiansToDegress);
            return angle * cc.DEG;
        };
        cc.REPEAT_FOREVER = cc.sys.isNative ? 4294967295 : Number.MAX_VALUE - 1;
        cc.nodeDrawSetup = function(node) {
            if (node._shaderProgram) {
                node._shaderProgram.use();
                node._shaderProgram.setUniformForModelViewAndProjectionMatrixWithMat4();
            }
        };
        cc.enableDefaultGLStates = function() {};
        cc.disableDefaultGLStates = function() {};
        cc.incrementGLDraws = function(addNumber) {
            cc.g_NumberOfDraws += addNumber;
        };
        cc.FLT_EPSILON = 1.192092896e-7;
        cc.contentScaleFactor = cc.IS_RETINA_DISPLAY_SUPPORTED ? function() {
            return cc.director.getContentScaleFactor();
        } : function() {
            return 1;
        };
        cc.pointPointsToPixels = function(points) {
            var scale = cc.contentScaleFactor();
            return cc.p(points.x * scale, points.y * scale);
        };
        cc.pointPixelsToPoints = function(pixels) {
            var scale = cc.contentScaleFactor();
            return cc.p(pixels.x / scale, pixels.y / scale);
        };
        cc._pointPixelsToPointsOut = function(pixels, outPoint) {
            var scale = cc.contentScaleFactor();
            outPoint.x = pixels.x / scale;
            outPoint.y = pixels.y / scale;
        };
        cc.sizePointsToPixels = function(sizeInPoints) {
            var scale = cc.contentScaleFactor();
            return cc.size(sizeInPoints.width * scale, sizeInPoints.height * scale);
        };
        cc.sizePixelsToPoints = function(sizeInPixels) {
            var scale = cc.contentScaleFactor();
            return cc.size(sizeInPixels.width / scale, sizeInPixels.height / scale);
        };
        cc._sizePixelsToPointsOut = function(sizeInPixels, outSize) {
            var scale = cc.contentScaleFactor();
            outSize.width = sizeInPixels.width / scale;
            outSize.height = sizeInPixels.height / scale;
        };
        cc.rectPixelsToPoints = cc.IS_RETINA_DISPLAY_SUPPORTED ? function(pixel) {
            var scale = cc.contentScaleFactor();
            return cc.rect(pixel.x / scale, pixel.y / scale, pixel.width / scale, pixel.height / scale);
        } : function(p) {
            return cc.rect(p);
        };
        cc.rectPointsToPixels = cc.IS_RETINA_DISPLAY_SUPPORTED ? function(point) {
            var scale = cc.contentScaleFactor();
            return cc.rect(point.x * scale, point.y * scale, point.width * scale, point.height * scale);
        } : function(p) {
            return cc.rect(p);
        };
        cc.ONE = 1;
        cc.ZERO = 0;
        cc.SRC_ALPHA = 770;
        cc.SRC_ALPHA_SATURATE = 776;
        cc.SRC_COLOR = 768;
        cc.DST_ALPHA = 772;
        cc.DST_COLOR = 774;
        cc.ONE_MINUS_SRC_ALPHA = 771;
        cc.ONE_MINUS_SRC_COLOR = 769;
        cc.ONE_MINUS_DST_ALPHA = 773;
        cc.ONE_MINUS_DST_COLOR = 775;
        cc.ONE_MINUS_CONSTANT_ALPHA = 32772;
        cc.ONE_MINUS_CONSTANT_COLOR = 32770;
        cc.LINEAR = 9729;
        cc.defineGetterSetter(cc, "BLEND_SRC", function() {
            if (cc._renderType === cc.game.RENDER_TYPE_WEBGL && cc.OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA) {
                return cc.ONE;
            } else {
                return cc.SRC_ALPHA;
            }
        });
        cc.BLEND_DST = 771;
        cc.checkGLErrorDebug = function() {
            if (cc.renderMode === cc.game.RENDER_TYPE_WEBGL) {
                var _error = cc._renderContext.getError();
                if (_error) {
                    cc.log(cc._LogInfos.checkGLErrorDebug, _error);
                }
            }
        };
        cc.DEVICE_ORIENTATION_PORTRAIT = 0;
        cc.DEVICE_ORIENTATION_LANDSCAPE_LEFT = 1;
        cc.DEVICE_ORIENTATION_PORTRAIT_UPSIDE_DOWN = 2;
        cc.DEVICE_ORIENTATION_LANDSCAPE_RIGHT = 3;
        cc.DEVICE_MAX_ORIENTATIONS = 2;
        cc.VERTEX_ATTRIB_FLAG_NONE = 0;
        cc.VERTEX_ATTRIB_FLAG_POSITION = 1;
        cc.VERTEX_ATTRIB_FLAG_COLOR = 2;
        cc.VERTEX_ATTRIB_FLAG_TEX_COORDS = 4;
        cc.VERTEX_ATTRIB_FLAG_POS_COLOR_TEX = cc.VERTEX_ATTRIB_FLAG_POSITION | cc.VERTEX_ATTRIB_FLAG_COLOR | cc.VERTEX_ATTRIB_FLAG_TEX_COORDS;
        cc.GL_ALL = 0;
        cc.VERTEX_ATTRIB_POSITION = 0;
        cc.VERTEX_ATTRIB_COLOR = 1;
        cc.VERTEX_ATTRIB_TEX_COORDS = 2;
        cc.VERTEX_ATTRIB_MAX = 3;
        cc.UNIFORM_PMATRIX = 0;
        cc.UNIFORM_MVMATRIX = 1;
        cc.UNIFORM_MVPMATRIX = 2;
        cc.UNIFORM_TIME = 3;
        cc.UNIFORM_SINTIME = 4;
        cc.UNIFORM_COSTIME = 5;
        cc.UNIFORM_RANDOM01 = 6;
        cc.UNIFORM_SAMPLER = 7;
        cc.UNIFORM_MAX = 8;
        cc.SHADER_POSITION_TEXTURECOLOR = "ShaderPositionTextureColor";
        cc.SHADER_POSITION_TEXTURECOLORALPHATEST = "ShaderPositionTextureColorAlphaTest";
        cc.SHADER_POSITION_COLOR = "ShaderPositionColor";
        cc.SHADER_POSITION_TEXTURE = "ShaderPositionTexture";
        cc.SHADER_POSITION_TEXTURE_UCOLOR = "ShaderPositionTexture_uColor";
        cc.SHADER_POSITION_TEXTUREA8COLOR = "ShaderPositionTextureA8Color";
        cc.SHADER_POSITION_UCOLOR = "ShaderPosition_uColor";
        cc.SHADER_POSITION_LENGTHTEXTURECOLOR = "ShaderPositionLengthTextureColor";
        cc.UNIFORM_PMATRIX_S = "CC_PMatrix";
        cc.UNIFORM_MVMATRIX_S = "CC_MVMatrix";
        cc.UNIFORM_MVPMATRIX_S = "CC_MVPMatrix";
        cc.UNIFORM_TIME_S = "CC_Time";
        cc.UNIFORM_SINTIME_S = "CC_SinTime";
        cc.UNIFORM_COSTIME_S = "CC_CosTime";
        cc.UNIFORM_RANDOM01_S = "CC_Random01";
        cc.UNIFORM_SAMPLER_S = "CC_Texture0";
        cc.UNIFORM_ALPHA_TEST_VALUE_S = "CC_alpha_value";
        cc.ATTRIBUTE_NAME_COLOR = "a_color";
        cc.ATTRIBUTE_NAME_POSITION = "a_position";
        cc.ATTRIBUTE_NAME_TEX_COORD = "a_texCoord";
        cc.ITEM_SIZE = 32;
        cc.CURRENT_ITEM = 3233828865;
        cc.ZOOM_ACTION_TAG = 3233828866;
        cc.NORMAL_TAG = 8801;
        cc.SELECTED_TAG = 8802;
        cc.DISABLE_TAG = 8803;
    }, {} ],
    55: [ function(require, module, exports) {
        var JS = require("./js");
        var Destroyed = 1;
        var ToDestroy = 2;
        var DontSave = 4;
        var EditorOnly = 8;
        var Dirty = 16;
        var DontDestroy = 32;
        var Destroying = 64;
        var HideInGame = 512;
        var HideInEditor = 1024;
        var IsOnEnableCalled = 4096;
        var IsOnLoadCalled = 8192;
        var IsOnLoadStarted = 16384;
        var IsOnStartCalled = 32768;
        var IsRotationLocked = 65536;
        var IsScaleLocked = 1 << 17;
        var IsAnchorLocked = 1 << 18;
        var IsSizeLocked = 1 << 19;
        var IsPositionLocked = 1 << 20;
        var Hide = HideInGame | HideInEditor;
        var PersistentMask = ~(ToDestroy | Dirty | Destroying | DontDestroy | IsOnEnableCalled | IsOnLoadStarted | IsOnLoadCalled | IsOnStartCalled);
        function CCObject() {
            this._name = "";
            this._objFlags = 0;
        }
        CCObject.Flags = {
            Destroyed: Destroyed,
            DontSave: DontSave,
            EditorOnly: EditorOnly,
            Dirty: Dirty,
            DontDestroy: DontDestroy,
            PersistentMask: PersistentMask,
            Destroying: Destroying,
            HideInGame: HideInGame,
            HideInEditor: HideInEditor,
            Hide: Hide,
            IsOnLoadCalled: IsOnLoadCalled,
            IsOnLoadStarted: IsOnLoadStarted,
            IsOnEnableCalled: IsOnEnableCalled,
            IsOnStartCalled: IsOnStartCalled,
            IsPositionLocked: IsPositionLocked,
            IsRotationLocked: IsRotationLocked,
            IsScaleLocked: IsScaleLocked,
            IsAnchorLocked: IsAnchorLocked,
            IsSizeLocked: IsSizeLocked
        };
        require("./CCClass").fastDefine("cc.Object", CCObject, [ "_name", "_objFlags" ]);
        var objectsToDestroy = [];
        function deferredDestroy() {
            var deleteCount = objectsToDestroy.length;
            for (var i = 0; i < deleteCount; ++i) {
                var obj = objectsToDestroy[i];
                if (!(obj._objFlags & Destroyed)) {
                    obj._destroyImmediate();
                }
            }
            if (deleteCount === objectsToDestroy.length) {
                objectsToDestroy.length = 0;
            } else {
                objectsToDestroy.splice(0, deleteCount);
            }
            if (false) {
                deferredDestroyTimer = null;
            }
        }
        Object.defineProperty(CCObject, "_deferredDestroy", {
            value: deferredDestroy
        });
        if (false) {
            Object.defineProperty(CCObject, "_clearDeferredDestroyTimer", {
                value: function() {
                    if (null !== deferredDestroyTimer) {
                        clearImmediate(deferredDestroyTimer);
                        deferredDestroyTimer = null;
                    }
                },
                enumerable: false
            });
        }
        var prototype = CCObject.prototype;
        JS.getset(prototype, "name", function() {
            return this._name;
        }, function(value) {
            this._name = value;
        });
        JS.get(prototype, "isValid", function() {
            return !(this._objFlags & Destroyed);
        });
        var deferredDestroyTimer = null;
        prototype.destroy = function() {
            if (this._objFlags & Destroyed) {
                cc.warn("object already destroyed");
                return false;
            }
            if (this._objFlags & ToDestroy) {
                return false;
            }
            this._objFlags |= ToDestroy;
            objectsToDestroy.push(this);
            if (null === deferredDestroyTimer && cc.engine && !cc.engine._isUpdating && false) {
                deferredDestroyTimer = setImmediate(deferredDestroy);
            }
            return true;
        };
        if (false) {
            prototype.realDestroyInEditor = function() {
                if (this._objFlags & Destroyed) {
                    cc.warn("object already destroyed");
                    return false;
                }
                if (this._objFlags & ToDestroy) {
                    return false;
                }
                this._objFlags |= ToDestroy;
                objectsToDestroy.push(this);
                if (null === deferredDestroyTimer && cc.engine && !cc.engine._isUpdating && false) {
                    deferredDestroyTimer = setImmediate(deferredDestroy);
                }
                return true;
            };
        }
        prototype._destruct = function() {
            if (false) {
                return cc.error("object not yet destroyed");
            }
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    switch (typeof this[key]) {
                      case "string":
                        this[key] = "";
                        break;

                      case "object":
                      case "function":
                        this[key] = null;
                    }
                }
            }
        };
        prototype._onPreDestroy = null;
        prototype._destroyImmediate = function() {
            if (this._objFlags & Destroyed) {
                cc.error("object already destroyed");
                return;
            }
            if (this._onPreDestroy) {
                this._onPreDestroy();
            }
            if (true) {
                this._destruct();
            }
            this._objFlags |= Destroyed;
        };
        if (false) {
            prototype._serialize = null;
        }
        prototype._deserialize = null;
        cc.isValid = function(value) {
            if ("object" === typeof value) {
                return !!value && !(value._objFlags & Destroyed);
            } else {
                return "undefined" !== typeof value;
            }
        };
        if (false) {
            Object.defineProperty(CCObject, "_willDestroy", {
                value: function(obj) {
                    return !(obj._objFlags & Destroyed) && (obj._objFlags & ToDestroy) > 0;
                }
            });
            Object.defineProperty(CCObject, "_cancelDestroy", {
                value: function(obj) {
                    obj._objFlags &= ~ToDestroy;
                    var index = objectsToDestroy.indexOf(obj);
                    if (-1 !== index) {
                        objectsToDestroy.splice(index, 1);
                    }
                }
            });
        }
        cc.Object = CCObject;
        module.exports = CCObject;
    }, {
        "./CCClass": 53,
        "./js": 62
    } ],
    56: [ function(require, module, exports) {
        if (cc.sys) {
            return;
        }
        cc.sys = {};
        var sys = cc.sys;
        sys.LANGUAGE_ENGLISH = "en";
        sys.LANGUAGE_CHINESE = "zh";
        sys.LANGUAGE_FRENCH = "fr";
        sys.LANGUAGE_ITALIAN = "it";
        sys.LANGUAGE_GERMAN = "de";
        sys.LANGUAGE_SPANISH = "es";
        sys.LANGUAGE_DUTCH = "du";
        sys.LANGUAGE_RUSSIAN = "ru";
        sys.LANGUAGE_KOREAN = "ko";
        sys.LANGUAGE_JAPANESE = "ja";
        sys.LANGUAGE_HUNGARIAN = "hu";
        sys.LANGUAGE_PORTUGUESE = "pt";
        sys.LANGUAGE_ARABIC = "ar";
        sys.LANGUAGE_NORWEGIAN = "no";
        sys.LANGUAGE_POLISH = "pl";
        sys.LANGUAGE_UNKNOWN = "unkonwn";
        sys.OS_IOS = "iOS";
        sys.OS_ANDROID = "Android";
        sys.OS_WINDOWS = "Windows";
        sys.OS_MARMALADE = "Marmalade";
        sys.OS_LINUX = "Linux";
        sys.OS_BADA = "Bada";
        sys.OS_BLACKBERRY = "Blackberry";
        sys.OS_OSX = "OS X";
        sys.OS_WP8 = "WP8";
        sys.OS_WINRT = "WINRT";
        sys.OS_UNKNOWN = "Unknown";
        sys.UNKNOWN = -1;
        sys.WIN32 = 0;
        sys.LINUX = 1;
        sys.MACOS = 2;
        sys.ANDROID = 3;
        sys.IPHONE = 4;
        sys.IPAD = 5;
        sys.BLACKBERRY = 6;
        sys.NACL = 7;
        sys.EMSCRIPTEN = 8;
        sys.TIZEN = 9;
        sys.WINRT = 10;
        sys.WP8 = 11;
        sys.MOBILE_BROWSER = 100;
        sys.DESKTOP_BROWSER = 101;
        sys.EDITOR_PAGE = 102;
        sys.EDITOR_CORE = 103;
        sys.BROWSER_TYPE_WECHAT = "wechat";
        sys.BROWSER_TYPE_ANDROID = "androidbrowser";
        sys.BROWSER_TYPE_IE = "ie";
        sys.BROWSER_TYPE_QQ = "qqbrowser";
        sys.BROWSER_TYPE_MOBILE_QQ = "mqqbrowser";
        sys.BROWSER_TYPE_UC = "ucbrowser";
        sys.BROWSER_TYPE_360 = "360browser";
        sys.BROWSER_TYPE_BAIDU_APP = "baiduboxapp";
        sys.BROWSER_TYPE_BAIDU = "baidubrowser";
        sys.BROWSER_TYPE_MAXTHON = "maxthon";
        sys.BROWSER_TYPE_OPERA = "opera";
        sys.BROWSER_TYPE_OUPENG = "oupeng";
        sys.BROWSER_TYPE_MIUI = "miuibrowser";
        sys.BROWSER_TYPE_FIREFOX = "firefox";
        sys.BROWSER_TYPE_SAFARI = "safari";
        sys.BROWSER_TYPE_CHROME = "chrome";
        sys.BROWSER_TYPE_LIEBAO = "liebao";
        sys.BROWSER_TYPE_QZONE = "qzone";
        sys.BROWSER_TYPE_SOUGOU = "sogou";
        sys.BROWSER_TYPE_UNKNOWN = "unknown";
        sys.isNative = false;
        sys.isBrowser = "object" === typeof window && "object" === typeof document;
        if ("undefined" !== typeof Editor && Editor.isCoreLevel) {
            sys.isMobile = false;
            sys.platform = sys.EDITOR_CORE;
            sys.language = sys.LANGUAGE_UNKNOWN;
            sys.os = {
                darwin: sys.OS_OSX,
                win32: sys.OS_WINDOWS,
                linux: sys.OS_LINUX
            }[process.platform] || sys.OS_UNKNOWN;
            sys.browserType = null;
            sys.browserVersion = null;
            sys.windowPixelResolution = {
                width: 0,
                height: 0
            };
        } else {
            var win = window, nav = win.navigator, doc = document, docEle = doc.documentElement;
            var ua = nav.userAgent.toLowerCase();
            if (cc.isEditor) {
                sys.isMobile = false;
                sys.platform = sys.EDITOR_PAGE;
            } else {
                sys.isMobile = -1 !== ua.indexOf("mobile") || -1 !== ua.indexOf("android");
                sys.platform = sys.isMobile ? sys.MOBILE_BROWSER : sys.DESKTOP_BROWSER;
            }
            var currLanguage = nav.language;
            currLanguage = currLanguage ? currLanguage : nav.browserLanguage;
            currLanguage = currLanguage ? currLanguage.split("-")[0] : sys.LANGUAGE_ENGLISH;
            sys.language = currLanguage;
            var iOS = ua.match(/(iPad|iPhone|iPod)/i) ? true : false;
            var isAndroid = ua.match(/android/i) || nav.platform.match(/android/i) ? true : false;
            var osName = sys.OS_UNKNOWN;
            if (-1 !== nav.appVersion.indexOf("Win")) {
                osName = sys.OS_WINDOWS;
            } else {
                if (iOS) {
                    osName = sys.OS_IOS;
                } else {
                    if (-1 !== nav.appVersion.indexOf("Mac")) {
                        osName = sys.OS_OSX;
                    } else {
                        if (-1 !== nav.appVersion.indexOf("X11") && -1 === nav.appVersion.indexOf("Linux")) {
                            osName = sys.OS_UNIX;
                        } else {
                            if (isAndroid) {
                                osName = sys.OS_ANDROID;
                            } else {
                                if (-1 !== nav.appVersion.indexOf("Linux")) {
                                    osName = sys.OS_LINUX;
                                }
                            }
                        }
                    }
                }
            }
            sys.os = osName;
            sys.browserType = sys.BROWSER_TYPE_UNKNOWN;
            !function() {
                var typeReg1 = /mqqbrowser|sogou|qzone|liebao|micromessenger|ucbrowser|360 aphone|360browser|baiduboxapp|baidubrowser|maxthon|mxbrowser|trident|miuibrowser/i;
                var typeReg2 = /qqbrowser|chrome|safari|firefox|opr|oupeng|opera/i;
                var browserTypes = typeReg1.exec(ua);
                if (!browserTypes) {
                    browserTypes = typeReg2.exec(ua);
                }
                var browserType = browserTypes ? browserTypes[0] : sys.BROWSER_TYPE_UNKNOWN;
                if ("micromessenger" === browserType) {
                    browserType = sys.BROWSER_TYPE_WECHAT;
                } else {
                    if ("safari" === browserType && ua.match(/android.*applewebkit/)) {
                        browserType = sys.BROWSER_TYPE_ANDROID;
                    } else {
                        if ("trident" === browserType) {
                            browserType = sys.BROWSER_TYPE_IE;
                        } else {
                            if ("360 aphone" === browserType) {
                                browserType = sys.BROWSER_TYPE_360;
                            } else {
                                if ("mxbrowser" === browserType) {
                                    browserType = sys.BROWSER_TYPE_MAXTHON;
                                } else {
                                    if ("opr" === browserType) {
                                        browserType = sys.BROWSER_TYPE_OPERA;
                                    }
                                }
                            }
                        }
                    }
                }
                sys.browserType = browserType;
            }();
            sys.browserVersion = "";
            !function() {
                var versionReg1 = /(micromessenger|qq|mx|maxthon|baidu|sogou)(mobile)?(browser)?\/?([\d.]+)/i;
                var versionReg2 = /(msie |rv:|firefox|chrome|ucbrowser|oupeng|opera|opr|safari|miui)(mobile)?(browser)?\/?([\d.]+)/i;
                var tmp = ua.match(versionReg1);
                if (!tmp) {
                    tmp = ua.match(versionReg2);
                }
                sys.browserVersion = tmp ? tmp[4] : "";
            }();
            var w = window.innerWidth || document.documentElement.clientWidth;
            var h = window.innerHeight || document.documentElement.clientHeight;
            var ratio = window.devicePixelRatio || 1;
            sys.windowPixelResolution = {
                width: ratio * w,
                height: ratio * h
            };
            sys._checkWebGLRenderMode = function() {
                if (cc._renderType !== cc.game.RENDER_TYPE_WEBGL) {
                    throw new Error("This feature supports WebGL render mode only.");
                }
            };
            var _tmpCanvas1 = document.createElement("canvas"), _tmpCanvas2 = document.createElement("canvas");
            cc.create3DContext = function(canvas, opt_attribs) {
                var names = [ "webgl", "experimental-webgl", "webkit-3d", "moz-webgl" ];
                var context = null;
                for (var ii = 0; ii < names.length; ++ii) {
                    try {
                        context = canvas.getContext(names[ii], opt_attribs);
                    } catch (e) {}
                    if (context) {
                        break;
                    }
                }
                return context;
            };
            sys._supportCanvasNewBlendModes = function() {
                var canvas = _tmpCanvas1;
                canvas.width = 1;
                canvas.height = 1;
                var context = canvas.getContext("2d");
                context.fillStyle = "#000";
                context.fillRect(0, 0, 1, 1);
                context.globalCompositeOperation = "multiply";
                var canvas2 = _tmpCanvas2;
                canvas2.width = 1;
                canvas2.height = 1;
                var context2 = canvas2.getContext("2d");
                context2.fillStyle = "#fff";
                context2.fillRect(0, 0, 1, 1);
                context.drawImage(canvas2, 0, 0, 1, 1);
                return 0 === context.getImageData(0, 0, 1, 1).data[0];
            }();
            if (cc.sys.isMobile) {
                var fontStyle = document.createElement("style");
                fontStyle.type = "text/css";
                document.body.appendChild(fontStyle);
                fontStyle.textContent = "body,canvas,div{ -moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;-webkit-tap-highlight-color:rgba(0,0,0,0);}";
            }
            try {
                var localStorage = sys.localStorage = win.localStorage;
                localStorage.setItem("storage", "");
                localStorage.removeItem("storage");
                localStorage = null;
            } catch (e) {
                var warn = function() {
                    cc.warn("Warning: localStorage isn't enabled. Please confirm browser cookie or privacy option");
                };
                sys.localStorage = {
                    getItem: warn,
                    setItem: warn,
                    removeItem: warn,
                    clear: warn
                };
            }
            var _supportCanvas = !!_tmpCanvas1.getContext("2d");
            var _supportWebGL = false;
            var tmpCanvas = document.createElement("CANVAS");
            if (win.WebGLRenderingContext) {
                try {
                    var context = cc.create3DContext(tmpCanvas, {
                        stencil: true,
                        preserveDrawingBuffer: true
                    });
                    if (context) {
                        _supportWebGL = true;
                    }
                    if (sys.os === sys.OS_ANDROID) {
                        _supportWebGL = false;
                        var browserVer = parseFloat(sys.browserVersion);
                        if (sys.browserType === sys.BROWSER_TYPE_MOBILE_QQ && browserVer >= 6.2) {
                            _supportWebGL = true;
                        } else {
                            if (sys.osMainVersion && sys.osMainVersion >= 5 && sys.browserType === sys.BROWSER_TYPE_ANDROID) {
                                _supportWebGL = true;
                            }
                        }
                    }
                } catch (e) {}
            }
            var capabilities = sys.capabilities = {
                canvas: _supportCanvas,
                opengl: _supportWebGL
            };
            if (void 0 !== docEle["ontouchstart"] || void 0 !== doc["ontouchstart"] || nav.msPointerEnabled) {
                capabilities["touches"] = true;
            }
            if (void 0 !== docEle["onmouseup"]) {
                capabilities["mouse"] = true;
            }
            if (void 0 !== docEle["onkeyup"]) {
                capabilities["keyboard"] = true;
            }
            if (win.DeviceMotionEvent || win.DeviceOrientationEvent) {
                capabilities["accelerometer"] = true;
            }
            delete _tmpCanvas1;
            delete _tmpCanvas2;
        }
        sys.garbageCollect = function() {};
        sys.dumpRoot = function() {};
        sys.restartVM = function() {};
        sys.cleanScript = function(jsfile) {};
        sys.isObjectValid = function(obj) {
            if (obj) {
                return true;
            } else {
                return false;
            }
        };
        sys.dump = function() {
            var self = this;
            var str = "";
            str += "isMobile : " + self.isMobile + "\r\n";
            str += "language : " + self.language + "\r\n";
            str += "browserType : " + self.browserType + "\r\n";
            str += "browserVersion : " + self.browserVersion + "\r\n";
            str += "capabilities : " + JSON.stringify(self.capabilities) + "\r\n";
            str += "os : " + self.os + "\r\n";
            str += "osVersion : " + self.osVersion + "\r\n";
            str += "platform : " + self.platform + "\r\n";
            str += "Using " + (cc._renderType === cc.game.RENDER_TYPE_WEBGL ? "WEBGL" : "CANVAS") + " renderer.\r\n";
            cc.log(str);
        };
        sys.openURL = function(url) {
            window.open(url);
        };
        module.exports = sys;
    }, {} ],
    57: [ function(require, module, exports) {
        var JS = require("./js");
        var isPlainEmptyObj = require("./utils").isPlainEmptyObj_DEV;
        function attr(constructor, propertyName, attributes) {
            var key = "_attr$" + propertyName;
            var instance, attrs, name;
            if ("function" === typeof constructor) {
                instance = constructor.prototype;
                attrs = instance[key];
                if ("undefined" !== typeof attributes) {
                    if ("object" === typeof attributes) {
                        if (!attrs) {
                            instance[key] = attrs = {};
                        }
                        for (name in attributes) {
                            if ("_" !== name[0]) {
                                attrs[name] = attributes[name];
                            }
                        }
                    } else {
                        instance[key] = attributes;
                        return attributes;
                    }
                }
                return attrs;
            } else {
                instance = constructor;
                if ("undefined" !== typeof attributes) {
                    if ("object" === typeof attributes) {
                        if (instance.hasOwnProperty(key)) {
                            attrs = instance[key];
                        }
                        if (!attrs) {
                            instance[key] = attrs = {};
                        }
                        for (name in attributes) {
                            if ("_" !== name[0]) {
                                attrs[name] = attributes[name];
                            }
                        }
                        return JS.addon({}, attrs, instance.constructor.prototype[key]);
                    } else {
                        instance[key] = attributes;
                        return attributes;
                    }
                } else {
                    attrs = instance[key];
                    if ("object" === typeof attrs) {
                        return JS.addon({}, attrs, instance.constructor.prototype[key]);
                    } else {
                        return attrs;
                    }
                }
            }
        }
        cc.Integer = "Integer";
        cc.Float = "Float";
        cc.Boolean = "Boolean";
        cc.String = "String";
        var NonSerialized = {
            serializable: false,
            _canUsedInGetter: false
        };
        var EditorOnly = {
            editorOnly: true,
            _canUsedInGetter: false
        };
        function getTypeChecker(type, attrName, objectTypeCtor) {
            if (false) {
                return function(constructor, mainPropName) {
                    var mainPropAttrs = cc.Class.attr(constructor, mainPropName) || {};
                    if (mainPropAttrs.type !== type) {
                        cc.warn("Can only indicate one type attribute for %s.%s.", JS.getClassName(constructor), mainPropName);
                        return;
                    }
                    if (!mainPropAttrs.hasOwnProperty("default")) {
                        return;
                    }
                    var defaultVal = mainPropAttrs["default"];
                    if ("undefined" === typeof defaultVal) {
                        return;
                    }
                    var isContainer = Array.isArray(defaultVal) || isPlainEmptyObj(defaultVal);
                    if (isContainer) {
                        return;
                    }
                    var defaultType = typeof defaultVal;
                    var type_lowerCase = type.toLowerCase();
                    if (defaultType === type_lowerCase) {
                        if ("object" === type_lowerCase) {
                            if (defaultVal && !(defaultVal instanceof objectTypeCtor)) {
                                cc.warn("The default value of %s.%s is not instance of %s.", JS.getClassName(constructor), mainPropName, JS.getClassName(objectTypeCtor));
                            } else {
                                return;
                            }
                        } else {
                            cc.warn('No needs to indicate the "%s" attribute for %s.%s, which its default value is type of %s.', attrName, JS.getClassName(constructor), mainPropName, type);
                        }
                    } else {
                        if ("function" !== defaultType) {
                            cc.warn('Can not indicate the "%s" attribute for %s.%s, which its default value is type of %s.', attrName, JS.getClassName(constructor), mainPropName, defaultType);
                        }
                    }
                    delete mainPropAttrs.type;
                };
            }
        }
        function ObjectType(typeCtor) {
            return {
                type: "Object",
                ctor: typeCtor
            };
        }
        function RawType(typename) {
            var NEED_EXT_TYPES = [ "image", "json", "text", "audio" ];
            return {
                rawType: typename,
                serializable: false,
                _canUsedInGetter: false,
                _onAfterProp: function(constructor, mainPropName) {
                    var checked = true;
                }
            };
        }
        function Range(min, max) {
            return {
                min: min,
                max: max
            };
        }
        module.exports = {
            attr: attr,
            getTypeChecker: getTypeChecker,
            NonSerialized: NonSerialized,
            EditorOnly: EditorOnly,
            ObjectType: ObjectType,
            RawType: RawType,
            ScriptUuid: {},
            Range: Range
        };
    }, {
        "./js": 62,
        "./utils": 68
    } ],
    58: [ function(require, module, exports) {
        var JS = require("./js");
        var CallbacksHandler = function() {
            this._callbackTable = {};
        };
        CallbacksHandler.prototype.add = function(key, callback, target) {
            var list = this._callbackTable[key];
            if ("undefined" !== typeof list) {
                if ("function" === typeof callback) {
                    if (null !== list) {
                        list.push(callback);
                    } else {
                        list = [ callback ];
                        this._callbackTable[key] = list;
                    }
                    if ("object" === typeof target) {
                        list.push(target);
                    }
                }
                return false;
            } else {
                list = "function" === typeof callback ? [ callback ] : null;
                if (list && "object" === typeof target) {
                    list.push(target);
                }
                this._callbackTable[key] = list;
                return true;
            }
        };
        CallbacksHandler.prototype.has = function(key, callback, target) {
            var list = this._callbackTable[key], callbackTarget, index;
            if (list && list.length > 0) {
                if (!callback) {
                    return true;
                } else {
                    if ("function" !== typeof callback) {
                        return false;
                    }
                }
                index = list.indexOf(callback);
                while (-1 !== index) {
                    callbackTarget = list[index + 1];
                    if ("object" !== typeof callbackTarget) {
                        callbackTarget = void 0;
                    }
                    if (callbackTarget === target) {
                        return true;
                    }
                    index = cc.js.array.indexOf.call(list, callback, index + 1);
                }
                return false;
            }
            return false;
        };
        CallbacksHandler.prototype.removeAll = function(key) {
            if ("object" === typeof key) {
                var target = key, list, index, callback;
                for (key in this._callbackTable) {
                    list = this._callbackTable[key];
                    index = list.lastIndexOf(target);
                    while (-1 !== index) {
                        callback = list[index - 1];
                        if ("function" === typeof callback) {
                            list.splice(index - 1, 2);
                        } else {
                            list.splice(index, 1);
                        }
                        index = list.lastIndexOf(target);
                    }
                }
            } else {
                delete this._callbackTable[key];
            }
        };
        CallbacksHandler.prototype.remove = function(key, callback, target) {
            var list = this._callbackTable[key], index, callbackTarget;
            if (list) {
                index = list.indexOf(callback);
                while (-1 !== index) {
                    callbackTarget = list[index + 1];
                    if ("object" !== typeof callbackTarget) {
                        callbackTarget = void 0;
                    }
                    if (callbackTarget === target) {
                        list.splice(index, callbackTarget ? 2 : 1);
                        break;
                    }
                    index = cc.js.array.indexOf.call(list, callback, index + 1);
                }
                return true;
            }
            return false;
        };
        var CallbacksInvoker = function() {
            CallbacksHandler.call(this);
        };
        JS.extend(CallbacksInvoker, CallbacksHandler);
        if (false) {
            cc._Test.CallbacksInvoker = CallbacksInvoker;
        }
        CallbacksInvoker.prototype.invoke = function(key, p1, p2, p3, p4, p5) {
            var list = this._callbackTable[key];
            if (list) {
                var endIndex = list.length - 1;
                var lastItem = list[endIndex];
                for (var i = 0; i <= endIndex; ) {
                    var callingFunc = list[i];
                    var target = list[i + 1];
                    var hasTarget = target && "object" === typeof target;
                    var increment;
                    if (hasTarget) {
                        list[i].call(target, p1, p2, p3, p4, p5);
                        increment = 2;
                    } else {
                        callingFunc(p1, p2, p3, p4, p5);
                        increment = 1;
                    }
                    if (list[endIndex] !== lastItem && i + increment <= endIndex) {
                        if (list[endIndex - 1] === lastItem) {
                            endIndex -= 1;
                        } else {
                            if (list[endIndex - 2] === lastItem) {
                                endIndex -= 2;
                            } else {
                                return cc.error("Can remove only a callback at a time.");
                            }
                        }
                        if (list[i] !== callingFunc) {
                            continue;
                        }
                    }
                    i += increment;
                }
            }
        };
        CallbacksInvoker.prototype.invokeAndRemove = function(key, p1, p2, p3, p4, p5) {
            var list = this._callbackTable[key], i, l, target;
            if (list) {
                for (i = 0, l = list.length; i < l; ) {
                    target = list[i + 1];
                    if (target && "object" === typeof target) {
                        list[i].call(target, p1, p2, p3, p4, p5);
                        i += 2;
                    } else {
                        list[i](p1, p2, p3, p4, p5);
                        ++i;
                    }
                }
            }
            this.removeAll(key);
        };
        CallbacksInvoker.prototype.bindKey = function(key, remove) {
            var self = this;
            return function bindedInvocation(p1, p2, p3, p4, p5) {
                var list = self._callbackTable[key], i, l, target;
                if (list) {
                    for (i = 0, l = list.length; i < l; ) {
                        target = list[i + 1];
                        if (target && "object" === typeof target) {
                            list[i].call(target, p1, p2, p3, p4, p5);
                            i += 2;
                        } else {
                            list[i](p1, p2, p3, p4, p5);
                            ++i;
                        }
                    }
                }
                if (remove) {
                    self.removeAll(key);
                }
            };
        };
        CallbacksInvoker.CallbacksHandler = CallbacksHandler;
        module.exports = CallbacksInvoker;
    }, {
        "./js": 62
    } ],
    59: [ function(require, module, exports) {
        var JS = require("./js");
        var CCObject = require("./CCObject");
        var EDITOR = false;
        var ENABLE_TARGET = EDITOR;
        var Details = function() {
            this.uuidList = [];
            this.uuidObjList = [];
            this.uuidPropList = [];
            this.rawProp = "";
            if (EDITOR) {
                this.visitorInEditor = null;
                this.visitObjList = [];
                this.visitPropList = [];
            }
        };
        Details.prototype.reset = function() {
            this.uuidList.length = 0;
            this.uuidObjList.length = 0;
            this.uuidPropList.length = 0;
            this.rawProp = "";
            if (EDITOR) {
                this.visitorInEditor = null;
                this.visitObjList.length = 0;
                this.visitPropList.length = 0;
            }
        };
        if (EDITOR) {
            Details.prototype.visitLater = function(obj, propName) {
                this.visitObjList.push(obj);
                this.visitPropList.push(propName);
            };
        }
        Details.prototype.getUuidOf = function(obj, propName) {
            for (var i = 0; i < this.uuidObjList.length; i++) {
                if (this.uuidObjList[i] === obj && this.uuidPropList[i] === propName) {
                    return this.uuidList[i];
                }
            }
            return "";
        };
        Details.prototype.assignAssetsBy = function(getter) {
            var success = true;
            for (var i = 0, len = this.uuidList.length; i < len; i++) {
                var uuid = this.uuidList[i];
                var asset = getter(uuid);
                if (asset) {
                    var obj = this.uuidObjList[i];
                    var prop = this.uuidPropList[i];
                    obj[prop] = asset;
                } else {
                    cc.error("Failed to assign asset: " + uuid);
                    success = false;
                }
            }
            return success;
        };
        Details.prototype.push = function(obj, propName, uuid) {
            this.uuidList.push(uuid);
            this.uuidObjList.push(obj);
            this.uuidPropList.push(propName);
        };
        var _Deserializer = function() {
            function _Deserializer(jsonObj, result, target, classFinder) {
                this._classFinder = classFinder;
                if (ENABLE_TARGET) {
                    this._target = target;
                }
                this._idList = [];
                this._idObjList = [];
                this._idPropList = [];
                this.result = result || new Details();
                if (Array.isArray(jsonObj)) {
                    var jsonArray = jsonObj;
                    var refCount = jsonArray.length;
                    this.deserializedList = new Array(refCount);
                    for (var i = 0; i < refCount; i++) {
                        if (jsonArray[i]) {
                            var mainTarget;
                            if (ENABLE_TARGET) {
                                mainTarget = 0 === i && target;
                            }
                            this.deserializedList[i] = _deserializeObject(this, jsonArray[i], mainTarget);
                        }
                    }
                    this.deserializedData = refCount > 0 ? this.deserializedList[0] : [];
                } else {
                    this.deserializedList = [ null ];
                    this.deserializedData = jsonObj ? _deserializeObject(this, jsonObj, target) : null;
                    this.deserializedList[0] = this.deserializedData;
                }
                _dereference(this);
                if (EDITOR) {
                    this._callVisitorInEditor();
                }
            }
            var _dereference = function(self) {
                var deserializedList = self.deserializedList;
                for (var i = 0, len = self._idList.length; i < len; i++) {
                    var propName = self._idPropList[i];
                    var id = self._idList[i];
                    self._idObjList[i][propName] = deserializedList[id];
                }
            };
            if (EDITOR) {
                _Deserializer.prototype._callVisitorInEditor = function() {
                    var result = this.result;
                    if (result.visitorInEditor) {
                        result.visitorInEditor(result.visitObjList, result.visitPropList, this);
                    }
                };
            }
            _Deserializer.prototype._deserializeObjField = function(obj, jsonObj, propName, target) {
                var id = jsonObj.__id__;
                if ("undefined" === typeof id) {
                    var uuid = jsonObj.__uuid__;
                    if (uuid) {
                        this.result.uuidList.push(uuid);
                        this.result.uuidObjList.push(obj);
                        this.result.uuidPropList.push(propName);
                    } else {
                        if (ENABLE_TARGET) {
                            obj[propName] = _deserializeObject(this, jsonObj, target && target[propName]);
                        } else {
                            obj[propName] = _deserializeObject(this, jsonObj);
                        }
                        if (this.result.visitorInEditor && EDITOR) {
                            this.result.visitLater(obj, propName);
                        }
                    }
                } else {
                    var dObj = this.deserializedList[id];
                    if (dObj) {
                        obj[propName] = dObj;
                    } else {
                        this._idList.push(id);
                        this._idObjList.push(obj);
                        this._idPropList.push(propName);
                    }
                    if (this.result.visitorInEditor && EDITOR) {
                        this.result.visitLater(obj, propName);
                    }
                }
            };
            function _deserializePrimitiveObject(self, instance, serialized) {
                for (var propName in serialized) {
                    if (serialized.hasOwnProperty(propName)) {
                        var prop = serialized[propName];
                        if ("object" !== typeof prop) {
                            if ("__type__" !== propName) {
                                instance[propName] = prop;
                                if (self.result.visitorInEditor && EDITOR) {
                                    self.result.visitLater(instance, propName);
                                }
                            }
                        } else {
                            if (prop) {
                                if (ENABLE_TARGET) {
                                    self._deserializeObjField(instance, prop, propName, self._target && instance);
                                } else {
                                    self._deserializeObjField(instance, prop, propName);
                                }
                            } else {
                                instance[propName] = null;
                            }
                        }
                    }
                }
            }
            function _deserializeTypedObject(self, instance, serialized) {
                for (var propName in instance) {
                    var prop = serialized[propName];
                    if ("undefined" !== typeof prop && serialized.hasOwnProperty(propName)) {
                        if ("object" !== typeof prop) {
                            instance[propName] = prop;
                        } else {
                            if (prop) {
                                if (ENABLE_TARGET) {
                                    self._deserializeObjField(instance, prop, propName, self._target && instance);
                                } else {
                                    self._deserializeObjField(instance, prop, propName);
                                }
                            } else {
                                instance[propName] = null;
                            }
                        }
                    }
                }
            }
            function _deserializeFireClass(self, obj, serialized, klass, target) {
                var props = klass.__props__;
                for (var p = 0; p < props.length; p++) {
                    var propName = props[p];
                    var attrs = cc.Class.attr(klass, propName);
                    var rawType = attrs.rawType;
                    if (!rawType) {
                        if (!EDITOR && attrs.editorOnly) {
                            continue;
                        }
                        if (false === attrs.serializable) {
                            continue;
                        }
                        var prop = serialized[propName];
                        if ("undefined" === typeof prop) {
                            continue;
                        }
                        if ("object" !== typeof prop) {
                            obj[propName] = prop;
                        } else {
                            if (prop) {
                                if (ENABLE_TARGET) {
                                    self._deserializeObjField(obj, prop, propName, target && obj);
                                } else {
                                    self._deserializeObjField(obj, prop, propName);
                                }
                            } else {
                                obj[propName] = null;
                            }
                        }
                    } else {
                        if (self.result.rawProp) {
                            cc.error("not support multi raw object in a file");
                        }
                        self.result.rawProp = propName;
                    }
                }
                if ("_$erialized" === props[props.length - 1]) {
                    obj._$erialized = serialized;
                    _deserializePrimitiveObject(self, obj._$erialized, serialized);
                }
            }
            var _deserializeObject = function(self, serialized, target) {
                var propName, prop;
                var obj = null;
                var klass = null;
                if (serialized.__type__) {
                    klass = self._classFinder(serialized.__type__);
                    if (!klass) {
                        cc.error("[cc.deserialize] unknown type: " + serialized.__type__);
                        return null;
                    }
                    if (ENABLE_TARGET && target) {
                        if (!(target instanceof klass)) {
                            cc.warn("Type of target to deserialize not matched with data: target is %s, data is %s", JS.getClassName(target), klass);
                        }
                        obj = target;
                    } else {
                        obj = new klass();
                        if (cc.sys.isNative && klass === cc.SpriteFrame) {
                            obj.retain();
                        }
                    }
                    if (obj._deserialize) {
                        obj._deserialize(serialized.content, self);
                        return obj;
                    }
                    if (cc.Class._isCCClass(klass)) {
                        _deserializeFireClass(self, obj, serialized, klass, target);
                    } else {
                        _deserializeTypedObject(self, obj, serialized);
                    }
                } else {
                    if (!Array.isArray(serialized)) {
                        obj = ENABLE_TARGET && target || {};
                        _deserializePrimitiveObject(self, obj, serialized);
                    } else {
                        if (ENABLE_TARGET && target) {
                            target.length = serialized.length;
                            obj = target;
                        } else {
                            obj = new Array(serialized.length);
                        }
                        for (var i = 0; i < serialized.length; i++) {
                            prop = serialized[i];
                            if ("object" === typeof prop && prop) {
                                if (ENABLE_TARGET) {
                                    self._deserializeObjField(obj, prop, "" + i, target && obj);
                                } else {
                                    self._deserializeObjField(obj, prop, "" + i);
                                }
                            } else {
                                obj[i] = prop;
                                if (self.result.visitorInEditor && EDITOR) {
                                    self.result.visitLater(obj, "" + i);
                                }
                            }
                        }
                    }
                }
                return obj;
            };
            return _Deserializer;
        }();
        cc.deserialize = function(data, result, options) {
            var classFinder = options && options.classFinder || JS._getClassById;
            var createAssetRefs = options && options.createAssetRefs || cc.sys.platform === cc.sys.EDITOR_CORE;
            var target = ENABLE_TARGET && options && options.target;
            if (false) {
                data = data.toString();
            }
            if ("string" === typeof data) {
                data = JSON.parse(data);
            }
            if (createAssetRefs && !result) {
                result = new Details();
            }
            cc.game._isCloning = true;
            var deserializer = new _Deserializer(data, result, target, classFinder);
            cc.game._isCloning = false;
            if (createAssetRefs) {
                result.assignAssetsBy(Editor.serialize.asAsset);
            }
            return deserializer.deserializedData;
        };
        cc.deserialize.Details = Details;
    }, {
        "./CCObject": 55,
        "./js": 62
    } ],
    60: [ function(require, module, exports) {
        require("./js");
        require("./CCClass");
        require("./CCObject");
        require("./callbacks-invoker");
        require("./url");
        require("./deserialize");
        require("./instantiate");
        require("./prefab-info");
        require("./requiring-frame");
        require("./CCSys");
        require("./CCLoader");
        require("./CCMacro");
        if (cc.sys.isBrowser || cc.sys.isNative) {
            require("./load-manager");
            require("./CCAssetLibrary");
        }
    }, {
        "./CCAssetLibrary": 52,
        "./CCClass": 53,
        "./CCLoader": 103,
        "./CCMacro": 54,
        "./CCObject": 55,
        "./CCSys": 56,
        "./callbacks-invoker": 58,
        "./deserialize": 59,
        "./instantiate": 61,
        "./js": 62,
        "./load-manager": 63,
        "./prefab-info": 64,
        "./requiring-frame": 66,
        "./url": 67
    } ],
    61: [ function(require, module, exports) {
        var CCObject = require("./CCObject");
        var PersistentMask = CCObject.Flags.PersistentMask;
        var _isDomNode = require("./utils").isDomNode;
        function instantiate(original) {
            if ("object" !== typeof original || Array.isArray(original)) {
                cc.error("The thing you want to instantiate must be an object");
                return null;
            }
            if (!original) {
                cc.error("The thing you want to instantiate is nil");
                return null;
            }
            if (original instanceof CCObject && !original.isValid) {
                cc.error("The thing you want to instantiate is destroyed");
                return null;
            }
            var clone;
            if (original instanceof CCObject) {
                if (original._instantiate) {
                    cc.game._isCloning = true;
                    clone = original._instantiate();
                    cc.game._isCloning = false;
                    return clone;
                } else {
                    if (original instanceof cc.Asset) {
                        cc.error("The instantiate method for given asset do not implemented");
                        return null;
                    }
                }
            }
            cc.game._isCloning = true;
            clone = doInstantiate(original);
            cc.game._isCloning = false;
            return clone;
        }
        var objsToClearTmpVar = [];
        function doInstantiate(obj, parent) {
            if (Array.isArray(obj)) {
                cc.error("Can not instantiate array");
                return null;
            }
            if (_isDomNode && _isDomNode(obj)) {
                cc.error("Can not instantiate DOM element");
                return null;
            }
            var clone = enumerateObject(obj, parent);
            for (var i = 0, len = objsToClearTmpVar.length; i < len; ++i) {
                objsToClearTmpVar[i]._iN$t = null;
            }
            objsToClearTmpVar.length = 0;
            return clone;
        }
        var enumerateObject = function(obj, parent) {
            var value, type, key;
            var klass = obj.constructor;
            var clone = new klass();
            obj._iN$t = clone;
            objsToClearTmpVar.push(obj);
            if (cc.Class._isCCClass(klass)) {
                var props = klass.__props__;
                for (var p = 0; p < props.length; p++) {
                    key = props[p];
                    var attrs = cc.Class.attr(klass, key);
                    if (false !== attrs.serializable) {
                        value = obj[key];
                        type = typeof value;
                        if ("object" === type) {
                            clone[key] = value ? instantiateObj(value, parent, clone, key) : value;
                        } else {
                            clone[key] = "function" !== type ? value : null;
                        }
                    }
                }
                if (clone instanceof cc._BaseNode && false) {
                    clone._id = "";
                }
            } else {
                for (key in obj) {
                    if (!obj.hasOwnProperty(key) || 95 === key.charCodeAt(0) && 95 === key.charCodeAt(1)) {
                        continue;
                    }
                    value = obj[key];
                    if (value === clone) {
                        continue;
                    }
                    type = typeof value;
                    if ("object" === type) {
                        clone[key] = value ? instantiateObj(value, parent, clone, key) : value;
                    } else {
                        clone[key] = "function" !== type ? value : null;
                    }
                }
            }
            if (obj instanceof CCObject) {
                clone._objFlags &= PersistentMask;
            }
            return clone;
        };
        function instantiateObj(obj, parent, ownerObj, ownerKey) {
            var clone = obj._iN$t;
            if (clone) {
                return clone;
            }
            if (!cc.isValid(obj)) {
                return null;
            }
            if (obj instanceof cc.Asset) {
                return obj;
            } else {
                if (Array.isArray(obj)) {
                    var len = obj.length;
                    clone = new Array(len);
                    obj._iN$t = clone;
                    for (var i = 0; i < len; ++i) {
                        var value = obj[i];
                        var type = typeof value;
                        if ("object" === type) {
                            clone[i] = value ? instantiateObj(value, parent, clone, "" + i) : value;
                        } else {
                            clone[i] = "function" !== type ? value : null;
                        }
                    }
                    objsToClearTmpVar.push(obj);
                    return clone;
                } else {
                    if (obj instanceof cc.ValueType) {
                        return obj.clone();
                    } else {
                        var ctor = obj.constructor;
                        if (cc.Class._isCCClass(ctor)) {
                            if (parent) {
                                if (obj instanceof cc._BaseNode) {
                                    if (!obj.isChildOf(parent)) {
                                        return obj;
                                    }
                                } else {
                                    if (obj instanceof cc.Component) {
                                        if (!obj.node.isChildOf(parent)) {
                                            return obj;
                                        }
                                    }
                                }
                            }
                        } else {
                            if (ctor !== Object) {
                                return obj;
                            }
                        }
                        return enumerateObject(obj, parent);
                    }
                }
            }
        }
        instantiate._clone = doInstantiate;
        cc.instantiate = instantiate;
        module.exports = instantiate;
    }, {
        "./CCObject": 55,
        "./utils": 68
    } ],
    62: [ function(require, module, exports) {
        function _getPropertyDescriptor(obj, name) {
            var pd = Object.getOwnPropertyDescriptor(obj, name);
            if (pd) {
                return pd;
            }
            var p = Object.getPrototypeOf(obj);
            if (p) {
                return _getPropertyDescriptor(p, name);
            } else {
                return null;
            }
        }
        function _copyprop(name, source, target) {
            var pd = _getPropertyDescriptor(source, name);
            Object.defineProperty(target, name, pd);
        }
        var js = {
            isFunction: function(obj) {
                return "function" === typeof obj;
            },
            isNumber: function(obj) {
                return "number" === typeof obj || "[object Number]" === Object.prototype.toString.call(obj);
            },
            isString: function(obj) {
                return "string" === typeof obj || "[object String]" === Object.prototype.toString.call(obj);
            },
            isArray: function(obj) {
                return Array.isArray(obj) || "object" === typeof obj && "[object Array]" === Object.prototype.toString.call(obj);
            },
            isUndefined: function(obj) {
                return "undefined" === typeof obj;
            },
            isObject: function(obj) {
                return "object" === typeof obj && "[object Object]" === Object.prototype.toString.call(obj);
            },
            addon: function(obj) {
                "use strict";
                obj = obj || {};
                for (var i = 1, length = arguments.length; i < length; i++) {
                    var source = arguments[i];
                    if (source) {
                        if ("object" !== typeof source) {
                            cc.error("cc.js.addon called on non-object:", source);
                            continue;
                        }
                        for (var name in source) {
                            if (!(name in obj)) {
                                _copyprop(name, source, obj);
                            }
                        }
                    }
                }
                return obj;
            },
            mixin: function(obj) {
                "use strict";
                obj = obj || {};
                for (var i = 1, length = arguments.length; i < length; i++) {
                    var source = arguments[i];
                    if (source) {
                        if ("object" !== typeof source) {
                            cc.error("cc.js.mixin: arguments must be type object:", source);
                            continue;
                        }
                        for (var name in source) {
                            _copyprop(name, source, obj);
                        }
                    }
                }
                return obj;
            },
            extend: function(cls, base) {
                if (false) {
                    if (!base) {
                        cc.error("The base class to extend from must be non-nil");
                        return;
                    }
                    if (!cls) {
                        cc.error("The class to extend must be non-nil");
                        return;
                    }
                }
                for (var p in base) {
                    if (base.hasOwnProperty(p)) {
                        cls[p] = base[p];
                    }
                }
                cls.prototype = Object.create(base.prototype);
                cls.prototype.constructor = cls;
                return cls;
            },
            clear: function(obj) {
                var keys = Object.keys(obj);
                for (var i = 0; i < keys.length; i++) {
                    delete obj[keys[i]];
                }
            },
            getPropertyDescriptor: _getPropertyDescriptor
        };
        js.getClassName = function(obj) {
            if ("function" === typeof obj) {
                if (obj.prototype.__classname__) {
                    return obj.prototype.__classname__;
                }
            } else {
                if (obj && obj.constructor) {
                    if (obj.constructor.prototype && obj.constructor.prototype.hasOwnProperty("__classname__")) {
                        return obj.__classname__;
                    }
                    var retval;
                    if (obj.constructor.name) {
                        retval = obj.constructor.name;
                    }
                    if (obj.constructor.toString) {
                        var arr, str = obj.constructor.toString();
                        if ("[" === str.charAt(0)) {
                            arr = str.match(/\[\w+\s*(\w+)\]/);
                        } else {
                            arr = str.match(/function\s*(\w+)/);
                        }
                        if (arr && 2 === arr.length) {
                            retval = arr[1];
                        }
                    }
                    return "Object" !== retval ? retval : "";
                }
            }
            return "";
        };
        var TCID_PREFIX = "cc.TmpCId.";
        var id = 0;
        function getTempCID() {
            return TCID_PREFIX + id++;
        }
        js._isTempClassId = function(id) {
            return false;
        };
        !function() {
            var _idToClass = {};
            var _nameToClass = {};
            function getRegister(key, table) {
                return function(id, constructor) {
                    if (constructor.prototype.hasOwnProperty(key)) {
                        delete table[constructor.prototype[key]];
                    }
                    constructor.prototype[key] = id;
                    if (id) {
                        var registered = table[id];
                        if (registered && registered !== constructor) {
                            var error = "A Class already exists with the same " + key + ' : "' + id + '".';
                            if (false) {
                                error += ' (This may be caused by error of unit test.) If you dont need serialization, you can set class id to "". You can also call cc.js.unregisterClass to remove the id of unused class';
                            }
                            cc.error(error);
                        } else {
                            table[id] = constructor;
                        }
                    }
                };
            }
            js._setClassId = getRegister("__cid__", _idToClass);
            var doSetClassName = getRegister("__classname__", _nameToClass);
            js.setClassName = function(className, constructor) {
                doSetClassName(className, constructor);
                if (!constructor.prototype.hasOwnProperty("__cid__")) {
                    var id = className || getTempCID();
                    if (id) {
                        js._setClassId(id, constructor);
                    }
                }
            };
            js.unregisterClass = function(constructor) {
                "use strict";
                for (var i = 0; i < arguments.length; i++) {
                    var p = arguments[i].prototype;
                    var classId = p.__cid__;
                    if (classId) {
                        delete _idToClass[classId];
                    }
                    var classname = p.__classname__;
                    if (classname) {
                        delete _nameToClass[classname];
                    }
                }
            };
            js._getClassById = function(classId) {
                return _idToClass[classId];
            };
            js.getClassByName = function(classname) {
                return _nameToClass[classname];
            };
            js._getClassId = function(obj, allowTempId) {
                allowTempId = "undefined" !== typeof allowTempId ? allowTempId : true;
                var res;
                if ("function" === typeof obj && obj.prototype.hasOwnProperty("__cid__")) {
                    res = obj.prototype.__cid__;
                    if (!allowTempId && js._isTempClassId(res)) {
                        return "";
                    }
                    return res;
                }
                if (obj && obj.constructor) {
                    var prototype = obj.constructor.prototype;
                    if (prototype && prototype.hasOwnProperty("__cid__")) {
                        res = obj.__cid__;
                        if (!allowTempId && js._isTempClassId(res)) {
                            return "";
                        }
                        return res;
                    }
                }
                return "";
            };
            if (false) {
                Object.defineProperty(js, "_registeredClassIds", {
                    get: function() {
                        var dump = {};
                        for (var id in _idToClass) {
                            dump[id] = _idToClass[id];
                        }
                        return dump;
                    },
                    set: function(value) {
                        js.clear(_idToClass);
                        for (var id in value) {
                            _idToClass[id] = value[id];
                        }
                    }
                });
                Object.defineProperty(js, "_registeredClassNames", {
                    get: function() {
                        var dump = {};
                        for (var id in _nameToClass) {
                            dump[id] = _nameToClass[id];
                        }
                        return dump;
                    },
                    set: function(value) {
                        js.clear(_nameToClass);
                        for (var id in value) {
                            _nameToClass[id] = value[id];
                        }
                    }
                });
            }
        }();
        js.getset = function(obj, prop, getter, setter, enumerable) {
            if ("function" !== typeof setter) {
                enumerable = setter;
                setter = void 0;
            }
            Object.defineProperty(obj, prop, {
                get: getter,
                set: setter,
                enumerable: !!enumerable
            });
        };
        js.get = function(obj, prop, getter, enumerable) {
            Object.defineProperty(obj, prop, {
                get: getter,
                enumerable: !!enumerable
            });
        };
        js.set = function(obj, prop, setter, enumerable) {
            Object.defineProperty(obj, prop, {
                set: setter,
                enumerable: !!enumerable
            });
        };
        js.obsolete = function(obj, obsoleted, newPropName, writable) {
            var oldName = obsoleted.split(".").slice(-1);
            js.get(obj, oldName, function() {
                if (false) {
                    cc.warn('"%s" is deprecated, use "%s" instead please.', obsoleted, newPropName);
                }
                return obj[newPropName];
            });
            if (writable) {
                js.set(obj, oldName, function(value) {
                    if (false) {
                        cc.warn('"%s" is deprecated, use "%s" instead please.', obsoleted, newPropName);
                    }
                    obj[newPropName] = value;
                });
            }
        };
        js.obsoletes = function(obj, objName, props, writable) {
            for (var obsoleted in props) {
                var newName = props[obsoleted];
                js.obsolete(obj, objName + "." + obsoleted, newName, writable);
            }
        };
        js.array = {
            remove: function(array, value) {
                var index = array.indexOf(value);
                if (-1 !== index) {
                    array.splice(index, 1);
                    return true;
                } else {
                    return false;
                }
            },
            removeAt: function(array, index) {
                array.splice(index, 1);
            },
            contains: function(array, value) {
                return -1 !== array.indexOf(value);
            },
            verifyType: function(array, type) {
                if (array && array.length > 0) {
                    for (var i = 0; i < array.length; i++) {
                        if (!(array[i] instanceof type)) {
                            cc.log(cc._LogInfos.Array.verifyType);
                            return false;
                        }
                    }
                }
                return true;
            },
            removeArray: function(array, minusArr) {
                for (var i = 0, l = minusArr.length; i < l; i++) {
                    remove(array, minusArr[i]);
                }
            },
            appendObjectsAt: function(array, addObjs, index) {
                array.splice.apply(array, [ index, 0 ].concat(addObjs));
                return array;
            },
            copy: function(array) {
                var i, len = array.length, arr_clone = new Array(len);
                for (i = 0; i < len; i += 1) {
                    arr_clone[i] = array[i];
                }
                return arr_clone;
            },
            indexOf: Array.prototype.indexOf
        };
        cc.js = js;
        module.exports = js;
    }, {} ],
    63: [ function(require, module, exports) {
        var CallbacksInvoker = require("./callbacks-invoker");
        function getBuiltinRawTypes() {
            return {
                image: {
                    loader: cc.loader.loadImg.bind(cc.loader),
                    defaultExtname: ".host"
                },
                json: {
                    loader: cc.loader.loadJson.bind(cc.loader),
                    defaultExtname: ".json"
                },
                text: {
                    loader: cc.loader.loadTxt.bind(cc.loader),
                    defaultExtname: ".txt"
                }
            };
        }
        var urlToCallbacks = new CallbacksInvoker();
        var loadQueue = [];
        var loadNext = function() {
            if (LoadManager._curConcurrent >= LoadManager.maxConcurrent) {
                cc.error("too many concurrent requests");
                return;
            }
            var nextOne = loadQueue.pop();
            if (nextOne) {
                doLoad(nextOne.loader, nextOne.url, nextOne.callback);
            }
        };
        function doLoad(loader, url, callback) {
            LoadManager._curConcurrent += 1;
            loader(url, function doLoadCB(error, asset) {
                callback(error, asset);
                LoadManager._curConcurrent = Math.max(0, LoadManager._curConcurrent - 1);
                loadNext();
            });
        }
        var LoadManager = {
            maxConcurrent: 2,
            _curConcurrent: 0,
            loadByLoader: function(loader, url, callback) {
                if (urlToCallbacks.add(url, callback)) {
                    var callbackBundle = urlToCallbacks.bindKey(url, true);
                    if (this._curConcurrent < this.maxConcurrent) {
                        doLoad(loader, url, callbackBundle);
                    } else {
                        loadQueue.push({
                            url: url,
                            loader: loader,
                            callback: callbackBundle
                        });
                    }
                }
            },
            load: function(url, rawType, rawExtname, callback) {
                if ("function" === typeof rawExtname) {
                    callback = rawExtname;
                }
                var typeInfo = this._rawTypes[rawType];
                if (typeInfo) {
                    var extname = rawExtname ? "." + rawExtname : typeInfo.defaultExtname;
                    if (extname) {
                        var rawUrl = url + extname;
                        this.loadByLoader(typeInfo.loader, rawUrl, callback);
                    } else {
                        callback(new Error("Undefined extname for the raw " + rawType + " file of " + url), null);
                    }
                } else {
                    callback(new Error('Unknown raw type "' + rawType + '" of ' + url), null);
                }
            },
            _rawTypes: getBuiltinRawTypes(),
            registerRawTypes: function(rawType, loader, defaultExtname) {
                if (false) {
                    if (!rawType) {
                        cc.error("[AssetLibrary.registerRawTypes] rawType must be non-nil");
                        return;
                    }
                    if ("string" !== typeof rawType) {
                        cc.error("[AssetLibrary.registerRawTypes] rawType must be string");
                        return;
                    }
                    if (!loader) {
                        cc.error("[AssetLibrary.registerRawTypes] loader must be non-nil");
                        return;
                    }
                    if ("function" !== typeof loader) {
                        cc.error("[AssetLibrary.registerRawTypes] loader must be function");
                        return;
                    }
                }
                if (this._rawTypes[rawType]) {
                    cc.error('rawType "%s" has already defined', rawType);
                    return;
                }
                if (defaultExtname && "." !== defaultExtname[0]) {
                    defaultExtname = "." + defaultExtname;
                }
                this._rawTypes[rawType] = {
                    loader: loader,
                    defaultExtname: defaultExtname
                };
            },
            reset: function() {
                if (false) {
                    var audio = this._rawTypes.audio;
                    this._rawTypes = getBuiltinRawTypes();
                    this._rawTypes.audio = audio;
                }
            },
            isLoading: function(url, alsoCheckRaw) {
                if (false) {
                    if (0 === this._curConcurrent) {
                        return false;
                    }
                    if (urlToCallbacks.has(url)) {
                        return true;
                    }
                    if (alsoCheckRaw) {
                        for (var u in urlToCallbacks._callbackTable) {
                            if (0 === u.indexOf(url)) {
                                return true;
                            }
                        }
                    }
                    return false;
                }
            }
        };
        cc._LoadManager = LoadManager;
        module.exports = LoadManager;
    }, {
        "./callbacks-invoker": 58
    } ],
    64: [ function(require, module, exports) {
        var PrefabInfo = cc.Class({
            name: "cc.PrefabInfo",
            properties: {
                root: {
                    "default": null
                },
                asset: {
                    "default": null
                },
                fileId: {
                    "default": ""
                }
            }
        });
        cc._PrefabInfo = module.exports = PrefabInfo;
    }, {} ],
    65: [ function(require, module, exports) {
        var Attr = require("./attribute");
        var SerializableAttrs = {
            url: {
                canUsedInGet: true
            },
            "default": {},
            serializable: {},
            editorOnly: {},
            rawType: {}
        };
        function parseNotify(val, propName, notify, properties) {
            if (val.get || val.set) {
                if (false) {
                    cc.warn('"notify" can\'t work with "get/set" !');
                }
                return;
            }
            if (val.hasOwnProperty("default")) {
                var newKey = "_N$" + propName;
                val.get = function() {
                    return this[newKey];
                };
                val.set = function(value) {
                    var oldValue = this[newKey];
                    this[newKey] = value;
                    notify.call(this, oldValue);
                };
                var newValue = {};
                properties[newKey] = newValue;
                for (var attr in SerializableAttrs) {
                    var v = SerializableAttrs[attr];
                    if (val.hasOwnProperty(attr)) {
                        newValue[attr] = val[attr];
                        if (!v.canUsedInGet) {
                            delete val[attr];
                        }
                    }
                }
            } else {
                if (false) {
                    cc.warn('"notify" must work with "default" !');
                }
            }
        }
        function checkUrl(val, className, propName, url) {
            if (Array.isArray(url)) {
                if (url.length > 0) {
                    url = url[0];
                } else {
                    if (false) {
                        return cc.error("Invalid url of %s.%s", className, propName);
                    }
                }
            }
            if (false) {
                if (null == url) {
                    return cc.warn('The "url" attribute of "%s.%s" is undefined when loading script.', className, propName);
                }
                if ("function" !== typeof url || !cc.isChildClassOf(url, cc.RawAsset)) {
                    return cc.error('The "url" type of "%s.%s" must be child class of cc.RawAsset.', className, propName);
                }
                if (cc.isChildClassOf(url, cc.Asset)) {
                    return cc.error('The "url" type of "%s.%s" must not be child class of cc.Asset, otherwise you should use "type: %s" instead.', className, propName, cc.js.getClassName(url));
                }
                if (val.type) {
                    return cc.warn('Can not specify "type" attribute for "%s.%s", because its "url" is already defined.', className, propName);
                }
            }
            val.type = url;
        }
        function parseType(val, type, className, propName) {
            if (Array.isArray(type)) {
                if (false) {
                    var isArray = require("./CCClass").isArray;
                    if (!isArray(val["default"])) {
                        cc.warn('The "default" attribute of "%s.%s" must be an array', className, propName);
                    }
                }
                if (type.length > 0) {
                    val.type = type = type[0];
                } else {
                    return cc.error("Invalid type of %s.%s", className, propName);
                }
            }
            if (false) {
                if ("function" === typeof type) {
                    if (cc.RawAsset.isRawAssetType(type)) {
                        cc.warn('The "type" attribute of "%s.%s" must be child class of cc.Asset, otherwise you should use "url: %s" instead', className, propName, cc.js.getClassName(type));
                    }
                } else {
                    if ("Number" === type) {
                        cc.warn('The "type" attribute of "%s.%s" can not be "Number", use "Float" or "Integer" instead please.', className, propName);
                    } else {
                        if (null == type) {
                            cc.warn('The "type" attribute of "%s.%s" is undefined when loading script.', className, propName);
                        }
                    }
                }
            }
        }
        function postCheckType(val, type, className, propName) {
            if ("function" === typeof type && false) {
                if (cc.Class._isCCClass(type) && false !== val.serializable && !cc.js._getClassId(type, false)) {
                    cc.warn('Can not serialize "%s.%s" because the specified type is anonymous, please provide a class name or set the "serializable" attribute of "%s.%s" to "false".', className, propName, className, propName);
                }
            }
        }
        function getBaseClassWherePropertyDefined(propName, cls) {
            if (false) {
                var res;
                for (;cls && cls.__props__ && -1 !== cls.__props__.indexOf(propName); cls = cls.$super) {
                    res = cls;
                }
                if (!res) {
                    cc.error("unknown error");
                }
                return res;
            }
        }
        module.exports = function(properties, className, cls) {
            for (var propName in properties) {
                var val = properties[propName];
                var isLiteral = val && val.constructor === Object;
                if (!isLiteral) {
                    if (Array.isArray(val) && val.length > 0) {
                        val = {
                            "default": [],
                            type: val
                        };
                    } else {
                        if ("function" === typeof val) {
                            if (cc.isChildClassOf(val, cc.ValueType)) {
                                val = {
                                    "default": new val(),
                                    type: val
                                };
                            } else {
                                val = {
                                    "default": cc.RawAsset.isRawAssetType(val) ? "" : null,
                                    type: val
                                };
                            }
                        } else {
                            val = {
                                "default": val
                            };
                        }
                    }
                    properties[propName] = val;
                }
                if (val) {
                    if (false) {
                        if ("default" in val) {
                            if (val.get) {
                                cc.error('The "default" value of "%s.%s" should not be used with a "get" function.', className, propName);
                            } else {
                                if (val.set) {
                                    cc.error('The "default" value of "%s.%s" should not be used with a "set" function.', className, propName);
                                }
                            }
                        } else {
                            if (!val.get && !val.set) {
                                cc.error('Property "%s.%s" must define at least one of "default", "get" or "set".', className, propName);
                            }
                        }
                    }
                    if (!val.override && -1 !== cls.__props__.indexOf(propName) && false) {
                        var baseClass = cc.js.getClassName(getBaseClassWherePropertyDefined(propName, cls));
                        cc.warn('"%s.%s" hides inherited property "%s.%s". To make the current property override that implementation, add the `override: true` attribute please.', className, propName, baseClass, propName);
                    }
                    var notify = val.notify;
                    if (notify) {
                        parseNotify(val, propName, notify, properties);
                    }
                    if ("type" in val) {
                        parseType(val, val.type, className, propName);
                    }
                    if ("url" in val) {
                        checkUrl(val, className, propName, val.url);
                    }
                    if ("type" in val) {
                        postCheckType(val, val.type, className, propName);
                    }
                }
            }
        };
    }, {
        "./CCClass": 53,
        "./attribute": 57
    } ],
    66: [ function(require, module, exports) {
        var requiringFrames = [];
        cc._RFpush = function(module, uuid, script) {
            if (2 === arguments.length) {
                script = uuid;
                uuid = "";
            }
            requiringFrames.push({
                uuid: uuid,
                script: script,
                module: module,
                exports: module.exports,
                beh: null
            });
        };
        cc._RFpop = function() {
            var frameInfo = requiringFrames.pop();
            var module = frameInfo.module;
            var exports = module.exports;
            if (exports === frameInfo.exports) {
                for (var anyKey in exports) {
                    return;
                }
                module.exports = exports = frameInfo.beh;
            }
        };
        cc._RFpeek = function() {
            return requiringFrames[requiringFrames.length - 1];
        };
        if (false) {
            cc._RFreset = function() {
                requiringFrames = [];
            };
        }
    }, {} ],
    67: [ function(require, module, exports) {
        var _mounts = {};
        cc.url = {
            _rawAssets: "",
            _builtinRawAssets: "",
            raw: function(url) {
                if (!this._rawAssets && false) {
                    cc.error("Failed to init asset's raw path.");
                    return "";
                }
                if ("." === url[0] && "/" === url[1]) {
                    url = url.slice(2);
                } else {
                    if ("/" === url[0]) {
                        url = url.slice(1);
                    }
                }
                return this._rawAssets + url;
            },
            builtinRaw: function(url) {
                if (!this._rawAssets && false) {
                    cc.error("Failed to init builtin asset's raw path.");
                    return "";
                }
                if ("." === url[0] && "/" === url[1]) {
                    url = url.slice(2);
                } else {
                    if ("/" === url[0]) {
                        url = url.slice(1);
                    }
                }
                return this._builtinRawAssets + url;
            },
            _init: function(mountPaths) {
                for (var dir in mountPaths) {
                    var path = mountPaths[dir];
                    path = cc.path._setEndWithSep(path, "/");
                    _mounts[dir] = path;
                }
                this._rawAssets = _mounts.assets;
                this._builtinRawAssets = _mounts.internal;
            }
        };
        module.exports = cc.url;
    }, {} ],
    68: [ function(require, module, exports) {
        module.exports = {
            isDomNode: "object" === typeof window && function(obj) {
                return "object" === typeof Node ? obj instanceof Node : obj && "object" === typeof obj && "number" === typeof obj.nodeType && "string" === typeof obj.nodeName;
            },
            callInNextTick: function(callback, p1, p2) {
                if (callback) {
                    setTimeout(function() {
                        callback(p1, p2);
                    }, 1);
                }
            }
        };
        if (false) {
            cc.js.mixin(module.exports, {
                isPlainEmptyObj_DEV: function(obj) {
                    if (!obj || obj.constructor !== Object) {
                        return false;
                    }
                    for (var k in obj) {
                        return false;
                    }
                    return true;
                },
                cloneable_DEV: function(obj) {
                    return obj && "function" === typeof obj.clone && (obj.constructor.prototype.hasOwnProperty("clone") || obj.hasOwnProperty("clone"));
                }
            });
        }
        if (false) {
            if ("undefined" === typeof Editor) {
                Editor = {};
            }
            Editor.uuid = function() {
                return "" + (new Date().getTime() + Math.random());
            };
            Editor.NonUuidMark = ".";
        }
    }, {} ],
    69: [ function(require, module, exports) {
        var JS = cc.js;
        var SceneGraphHelper = require("./scene-graph-helper");
        var Destroying = require("../platform/CCObject").Flags.Destroying;
        var DirtyFlags = require("./misc").DirtyFlags;
        function setMaxZOrder(node) {
            var siblings = node.parent.getChildren();
            var z = 0;
            if (siblings.length >= 2) {
                var prevNode = siblings[siblings.length - 2];
                z = prevNode.getOrderOfArrival() + 1;
            }
            node.setOrderOfArrival(z);
            return z;
        }
        var POSITION_CHANGED = "position-changed";
        var ROTATION_CHANGED = "rotation-changed";
        var SCALE_CHANGED = "scale-changed";
        var SIZE_CHANGED = "size-changed";
        var ANCHOR_CHANGED = "anchor-changed";
        var COLOR_CHANGED = "color-changed";
        var OPACITY_CHANGED = "opacity-changed";
        var CHILD_ADDED = "child-added";
        var CHILD_REMOVED = "child-removed";
        var ERR_INVALID_NUMBER = false;
        var BaseNode = cc.Class({
            "extends": cc.Object,
            mixins: [ cc.EventTarget ],
            properties: {
                _opacity: 255,
                _color: cc.Color.WHITE,
                _cascadeOpacityEnabled: true,
                _parent: null,
                _anchorPoint: cc.p(.5, .5),
                _contentSize: cc.size(0, 0),
                _children: [],
                _rotationX: 0,
                _rotationY: 0,
                _scaleX: 1,
                _scaleY: 1,
                _position: cc.p(0, 0),
                _skewX: 0,
                _skewY: 0,
                _localZOrder: 0,
                _globalZOrder: 0,
                _ignoreAnchorPointForPosition: false,
                _tag: cc.NODE_TAG_INVALID,
                _opacityModifyRGB: false,
                name: {
                    get: function() {
                        return this._name;
                    },
                    set: function(value) {
                        this._name = value;
                    }
                },
                parent: {
                    get: function() {
                        return this._parent;
                    },
                    set: function(value) {
                        if (this._parent === value) {
                            return;
                        }
                        var node = this._sgNode;
                        if (node.parent) {
                            node.parent.removeChild(node, false);
                        }
                        if (value) {
                            var parent = value._sgNode;
                            parent.addChild(node);
                            setMaxZOrder(node);
                            value._children.push(this);
                            value.emit(CHILD_ADDED, this);
                        }
                        var oldParent = this._parent;
                        this._parent = value || null;
                        if (oldParent) {
                            if (!(oldParent._objFlags & Destroying)) {
                                var removeAt = oldParent._children.indexOf(this);
                                if (removeAt < 0 && false) {
                                    return cc.error("Internal error, should not remove unknown node from parent.");
                                }
                                oldParent._children.splice(removeAt, 1);
                                oldParent.emit(CHILD_REMOVED, removeAt);
                                this._onHierarchyChanged(oldParent);
                                if (false) {
                                    _Scene.DetectConflict.afterAddChild(this);
                                }
                            }
                        } else {
                            if (value) {
                                this._onHierarchyChanged(null);
                            }
                        }
                    }
                },
                _id: {
                    "default": "",
                    editorOnly: true
                },
                uuid: {
                    get: function() {
                        return this._id || (this._id = window.Editor ? Editor.uuid() : "");
                    }
                },
                skewX: {
                    get: function() {
                        return this._skewX;
                    },
                    set: function(value) {
                        this._skewX = value;
                        this._sgNode.skewX = value;
                    }
                },
                skewY: {
                    get: function() {
                        return this._skewY;
                    },
                    set: function(value) {
                        this._skewY = value;
                        this._sgNode.skewY = value;
                    }
                },
                zIndex: {
                    get: function() {
                        return this._localZOrder;
                    },
                    set: function(value) {
                        this._localZOrder = value;
                        this._sgNode.zIndex = value;
                    }
                },
                rotation: {
                    get: function() {
                        if (this._rotationX !== this._rotationY) {
                            cc.log(cc._LogInfos.Node.getRotation);
                        }
                        return this._rotationX;
                    },
                    set: function(value) {
                        if (this._rotationX !== value || this._rotationY !== value) {
                            var old = this._rotationX;
                            this._rotationX = this._rotationY = value;
                            this._sgNode.rotation = value;
                            this.emit(ROTATION_CHANGED, old);
                        }
                    }
                },
                rotationX: {
                    get: function() {
                        return this._rotationX;
                    },
                    set: function(value) {
                        if (this._rotationX !== value) {
                            var old = this._rotationX;
                            this._rotationX = value;
                            this._sgNode.rotationX = value;
                            this.emit(ROTATION_CHANGED, old);
                        }
                    }
                },
                rotationY: {
                    get: function() {
                        return this._rotationY;
                    },
                    set: function(value) {
                        if (this._rotationY !== value) {
                            var oldX = this._rotationX;
                            this._rotationY = value;
                            this._sgNode.rotationY = value;
                            this.emit(ROTATION_CHANGED, oldX);
                        }
                    }
                },
                scaleX: {
                    get: function() {
                        return this._scaleX;
                    },
                    set: function(value) {
                        if (this._scaleX !== value) {
                            var oldX = this._scaleX;
                            this._scaleX = value;
                            this._sgNode.scaleX = value;
                            this.emit(SCALE_CHANGED, new cc.Vec2(oldX, this._scaleY));
                        }
                    }
                },
                scaleY: {
                    get: function() {
                        return this._scaleY;
                    },
                    set: function(value) {
                        if (this._scaleY !== value) {
                            var oldY = this._scaleY;
                            this._scaleY = value;
                            this._sgNode.scaleY = value;
                            this.emit(SCALE_CHANGED, new cc.Vec2(this._scaleX, oldY));
                        }
                    }
                },
                x: {
                    get: function() {
                        return this._position.x;
                    },
                    set: function(value) {
                        var localPosition = this._position;
                        if (value !== localPosition.x) {
                            if (isFinite(value) || true) {
                                var oldValue = localPosition.x;
                                localPosition.x = value;
                                this._sgNode.x = value;
                                if (this.emit) {
                                    this.emit(POSITION_CHANGED, new cc.Vec2(oldValue, localPosition.y));
                                }
                            } else {
                                cc.error(ERR_INVALID_NUMBER, "new x");
                            }
                        }
                    }
                },
                y: {
                    get: function() {
                        return this._position.y;
                    },
                    set: function(value) {
                        var localPosition = this._position;
                        if (value !== localPosition.y) {
                            if (isFinite(value) || true) {
                                var oldValue = localPosition.y;
                                localPosition.y = value;
                                this._sgNode.y = value;
                                if (this.emit) {
                                    this.emit(POSITION_CHANGED, new cc.Vec2(localPosition.x, oldValue));
                                }
                            } else {
                                cc.error(ERR_INVALID_NUMBER, "new y");
                            }
                        }
                    }
                },
                children: {
                    get: function() {
                        return this._children;
                    }
                },
                childrenCount: {
                    get: function() {
                        return this._children.length;
                    }
                },
                anchorX: {
                    get: function() {
                        return this._anchorPoint.x;
                    },
                    set: function(value) {
                        if (this._anchorPoint.x !== value) {
                            var old = cc.v2(this._anchorPoint);
                            this._anchorPoint.x = value;
                            this._onAnchorChanged();
                            this.emit(ANCHOR_CHANGED, old);
                        }
                    }
                },
                anchorY: {
                    get: function() {
                        return this._anchorPoint.y;
                    },
                    set: function(value) {
                        if (this._anchorPoint.y !== value) {
                            var old = cc.v2(this._anchorPoint);
                            this._anchorPoint.y = value;
                            this._onAnchorChanged();
                            this.emit(ANCHOR_CHANGED, old);
                        }
                    }
                },
                width: {
                    get: function() {
                        if (this._sizeProvider) {
                            var w = this._sizeProvider._getWidth();
                            this._contentSize.width = w;
                            return w;
                        } else {
                            return this._contentSize.width;
                        }
                    },
                    set: function(value) {
                        if (value !== this._contentSize.width) {
                            if (this._sizeProvider) {
                                this._sizeProvider.setContentSize(value, this._sizeProvider._getHeight());
                            }
                            var clone = cc.size(this._contentSize);
                            this._contentSize.width = value;
                            this.emit(SIZE_CHANGED, clone);
                        }
                    }
                },
                height: {
                    get: function() {
                        if (this._sizeProvider) {
                            var h = this._sizeProvider._getHeight();
                            this._contentSize.height = h;
                            return h;
                        } else {
                            return this._contentSize.height;
                        }
                    },
                    set: function(value) {
                        if (value !== this._contentSize.height) {
                            if (this._sizeProvider) {
                                this._sizeProvider.setContentSize(this._sizeProvider._getWidth(), value);
                            }
                            var clone = cc.size(this._contentSize);
                            this._contentSize.height = value;
                            this.emit(SIZE_CHANGED, clone);
                        }
                    }
                },
                ignoreAnchor: {
                    get: function() {
                        return this._ignoreAnchorPointForPosition;
                    },
                    set: function(value) {
                        if (this._ignoreAnchorPointForPosition !== value) {
                            this._ignoreAnchorPointForPosition = value;
                            this._sgNode.ignoreAnchor = value;
                            this._onAnchorChanged();
                            this.emit(ANCHOR_CHANGED, this._anchorPoint);
                        }
                    }
                },
                tag: {
                    get: function() {
                        return this._tag;
                    },
                    set: function(value) {
                        this._tag = value;
                        this._sgNode.tag = value;
                    }
                },
                opacity: {
                    get: function() {
                        return this._opacity;
                    },
                    set: function(value) {
                        if (this._opacity !== value) {
                            var old = this._opacity;
                            this._opacity = value;
                            this._sgNode.opacity = value;
                            this._onColorChanged();
                            this.emit(OPACITY_CHANGED, old);
                        }
                    },
                    range: [ 0, 255 ]
                },
                cascadeOpacity: {
                    get: function() {
                        return this._cascadeOpacityEnabled;
                    },
                    set: function(value) {
                        if (this._cascadeOpacityEnabled !== value) {
                            this._cascadeOpacityEnabled = value;
                            this._sgNode.cascadeOpacity = value;
                            this._onCascadeChanged();
                        }
                    }
                },
                color: {
                    get: function() {
                        var color = this._color;
                        return new cc.Color(color.r, color.g, color.b, color.a);
                    },
                    set: function(value) {
                        if (!this._color.equals(value)) {
                            var color = this._color;
                            var old = cc.color(color);
                            color.r = value.r;
                            color.g = value.g;
                            color.b = value.b;
                            if (false) {
                                cc.warn('Should not set alpha via "color", use "opacity" please.');
                            }
                            this._onColorChanged();
                            this.emit(COLOR_CHANGED, old);
                        }
                    }
                }
            },
            ctor: function() {
                Object.defineProperty(this, "_id", {
                    value: "",
                    enumerable: false
                });
                var sgNode = this._sgNode = new _ccsg.Node();
                if (cc.sys.isNative) {
                    sgNode.retain();
                    var entity = this;
                    sgNode.onEnter = function() {
                        _ccsg.Node.prototype.onEnter.call(this);
                        if (!entity._active) {
                            cc.director.getActionManager().pauseTarget(this);
                            cc.eventManager.pauseTarget(this);
                        }
                    };
                }
                if (!cc.game._isCloning) {
                    sgNode.cascadeOpacity = true;
                }
                this._dirtyFlags = DirtyFlags.ALL;
                this._sizeProvider = null;
            },
            _onPreDestroy: function() {
                this._sgNode.release();
            },
            _onHierarchyChanged: null,
            _onColorChanged: null,
            _onAnchorChanged: null,
            _onCascadeChanged: null,
            _onOpacityModifyRGBChanged: null,
            init: function() {
                return true;
            },
            attr: function(attrs) {
                for (var key in attrs) {
                    this[key] = attrs[key];
                }
            },
            setGlobalZOrder: function(globalZOrder) {
                this._globalZOrder = globalZOrder;
                this._sgNode.setGlobalZOrder(globalZOrder);
            },
            getGlobalZOrder: function() {
                this._globalZOrder = this._sgNode.getGlobalZOrder();
                return this._globalZOrder;
            },
            getScale: function() {
                if (this._scaleX !== this._scaleY) {
                    cc.log(cc._LogInfos.Node.getScale);
                }
                return this._scaleX;
            },
            setScale: function(scale, scaleY) {
                if (scale instanceof cc.Vec2) {
                    scaleY = scale.y;
                    scale = scale.x;
                } else {
                    scaleY = scaleY || 0 === scaleY ? scaleY : scale;
                }
                if (this._scaleX !== scale || this._scaleY !== scaleY) {
                    var old = new cc.Vec2(this._scaleX, this._scaleY);
                    this._scaleX = scale;
                    this._scaleY = scaleY;
                    this._sgNode.setScale(scale, scaleY);
                    this.emit(SCALE_CHANGED, old);
                }
            },
            getPosition: function() {
                return cc.p(this._position);
            },
            setPosition: function(newPosOrxValue, yValue) {
                var xValue;
                if (void 0 === yValue) {
                    xValue = newPosOrxValue.x;
                    yValue = newPosOrxValue.y;
                } else {
                    xValue = newPosOrxValue;
                    yValue = yValue;
                }
                var locPosition = this._position;
                if (locPosition.x === xValue && locPosition.y === yValue) {
                    return;
                }
                var oldPosition = new cc.Vec2(locPosition);
                if (isFinite(xValue) || true) {
                    locPosition.x = xValue;
                } else {
                    return cc.error(ERR_INVALID_NUMBER, "x of new position");
                }
                if (isFinite(yValue) || true) {
                    locPosition.y = yValue;
                } else {
                    return cc.error(ERR_INVALID_NUMBER, "y of new position");
                }
                this._sgNode.setPosition(locPosition);
                if (this.emit) {
                    this.emit(POSITION_CHANGED, oldPosition);
                }
            },
            getAnchorPoint: function() {
                return cc.p(this._anchorPoint);
            },
            setAnchorPoint: function(point, y) {
                var locAnchorPoint = this._anchorPoint;
                var old;
                if (void 0 === y) {
                    if (point.x === locAnchorPoint.x && point.y === locAnchorPoint.y) {
                        return;
                    }
                    old = cc.v2(locAnchorPoint);
                    locAnchorPoint.x = point.x;
                    locAnchorPoint.y = point.y;
                } else {
                    if (point === locAnchorPoint.x && y === locAnchorPoint.y) {
                        return;
                    }
                    old = cc.v2(locAnchorPoint);
                    locAnchorPoint.x = point;
                    locAnchorPoint.y = y;
                }
                this._onAnchorChanged();
                this.emit(ANCHOR_CHANGED, old);
            },
            getAnchorPointInPoints: function() {
                return this._sgNode.getAnchorPointInPoints();
            },
            getContentSize: function(ignoreSizeProvider) {
                if (this._sizeProvider && !ignoreSizeProvider) {
                    var size = this._sizeProvider.getContentSize();
                    this._contentSize = size;
                    return size;
                } else {
                    return cc.size(this._contentSize);
                }
            },
            setContentSize: function(size, height) {
                var locContentSize = this._contentSize;
                var clone;
                if (void 0 === height) {
                    if (size.width === locContentSize.width && size.height === locContentSize.height) {
                        return;
                    }
                    clone = cc.size(locContentSize);
                    locContentSize.width = size.width;
                    locContentSize.height = size.height;
                } else {
                    if (size === locContentSize.width && height === locContentSize.height) {
                        return;
                    }
                    clone = cc.size(locContentSize);
                    locContentSize.width = size;
                    locContentSize.height = height;
                }
                if (this._sizeProvider) {
                    this._sizeProvider.setContentSize(locContentSize);
                }
                this.emit(SIZE_CHANGED, clone);
            },
            getBoundingBox: function() {
                var rect = cc.rect(0, 0, this._contentSize.width, this._contentSize.height);
                return cc._rectApplyAffineTransformIn(rect, this.getNodeToParentTransform());
            },
            cleanup: function() {
                var i, len = this._children.length, node;
                for (i = 0; i < len; ++i) {
                    node = this._children[i];
                    if (node) {
                        node.cleanup();
                    }
                }
            },
            getChildByTag: function(aTag) {
                var children = this._children;
                if (null !== children) {
                    for (var i = 0; i < children.length; i++) {
                        var node = children[i];
                        if (node && node.tag === aTag) {
                            return node;
                        }
                    }
                }
                return null;
            },
            getChildByName: function(name) {
                if (!name) {
                    cc.log("Invalid name");
                    return null;
                }
                var locChildren = this._children;
                for (var i = 0, len = locChildren.length; i < len; i++) {
                    if (locChildren[i]._name === name) {
                        return locChildren[i];
                    }
                }
                return null;
            },
            addChild: function(child, localZOrder, tag) {
                localZOrder = void 0 === localZOrder ? child._localZOrder : localZOrder;
                var name, setTag = false;
                if (cc.js.isUndefined(tag)) {
                    tag = void 0;
                    name = child._name;
                } else {
                    if (cc.js.isString(tag)) {
                        name = tag;
                        tag = void 0;
                    } else {
                        if (cc.js.isNumber(tag)) {
                            setTag = true;
                            name = "";
                        }
                    }
                }
                cc.assert(child, cc._LogInfos.Node.addChild_3);
                cc.assert(null === child._parent, "child already added. It can't be added again");
                this._addChildHelper(child, localZOrder, tag, name, setTag);
            },
            _addChildHelper: function(child, localZOrder, tag, name, setTag) {
                this._insertChild(child, localZOrder);
                if (setTag) {
                    child.setTag(tag);
                } else {
                    child.setName(name);
                }
            },
            _insertChild: function(child, z) {
                child.parent = this;
                child.zIndex = z;
            },
            removeFromParent: function(cleanup) {
                if (this._parent) {
                    if (void 0 === cleanup) {
                        cleanup = true;
                    }
                    this._parent.removeChild(this, cleanup);
                }
            },
            removeChild: function(child, cleanup) {
                if (0 === this._children.length) {
                    return;
                }
                if (void 0 === cleanup) {
                    cleanup = true;
                }
                if (this._children.indexOf(child) > -1) {
                    this._detachChild(child, cleanup);
                }
            },
            removeChildByTag: function(tag, cleanup) {
                if (tag === cc.NODE_TAG_INVALID) {
                    cc.log(cc._LogInfos.Node.removeChildByTag);
                }
                var child = this.getChildByTag(tag);
                if (!child) {
                    cc.log(cc._LogInfos.Node.removeChildByTag_2, tag);
                } else {
                    this.removeChild(child, cleanup);
                }
            },
            removeAllChildren: function(cleanup) {
                var children = this._children;
                if (void 0 === cleanup) {
                    cleanup = true;
                }
                for (var i = children.length - 1; i >= 0; i--) {
                    var node = children[i];
                    if (node) {
                        if (cleanup) {
                            node.cleanup();
                        }
                        node.parent = null;
                    }
                }
                this._children.length = 0;
            },
            _detachChild: function(child, doCleanup) {
                if (doCleanup) {
                    child.cleanup();
                }
                child.parent = null;
                cc.js.array.remove(this._children, child);
                this.emit(CHILD_REMOVED, child);
            },
            setNodeDirty: function() {
                this._sgNode.setNodeDirty();
            },
            getParentToNodeTransform: function() {
                return this._sgNode.getParentToNodeTransform();
            },
            getNodeToWorldTransform: function() {
                return this._sgNode.getNodeToWorldTransform();
            },
            getWorldToNodeTransform: function() {
                return this._sgNode.getWorldToNodeTransform();
            },
            convertToNodeSpace: function(worldPoint) {
                var nodePositionIgnoreAnchorPoint = this._sgNode.convertToNodeSpace(worldPoint);
                return cc.pAdd(nodePositionIgnoreAnchorPoint, cc.p(this._anchorPoint.x * this._contentSize.width, this._anchorPoint.y * this._contentSize.height));
            },
            convertToWorldSpace: function(nodePoint) {
                var worldPositionIgnoreAnchorPoint = this._sgNode.convertToWorldSpace(nodePoint);
                return cc.pSub(worldPositionIgnoreAnchorPoint, cc.p(this._anchorPoint.x * this._contentSize.width, this._anchorPoint.y * this._contentSize.height));
            },
            convertToNodeSpaceAR: function(worldPoint) {
                return this._sgNode.convertToNodeSpaceAR(worldPoint);
            },
            convertToWorldSpaceAR: function(nodePoint) {
                return cc.v2(this._sgNode.convertToWorldSpaceAR(nodePoint));
            },
            convertTouchToNodeSpace: function(touch) {
                return this.convertToNodeSpace(touch.getLocation());
            },
            convertTouchToNodeSpaceAR: function(touch) {
                return this.convertToNodeSpaceAR(touch.getLocation());
            },
            getNodeToParentTransform: function(ancestor) {
                return this._sgNode.getNodeToParentTransform();
            },
            getBoundingBoxToWorld: function() {
                return this._sgNode.getBoundingBoxToWorld();
            },
            getDisplayedOpacity: function() {
                return this._sgNode.getDisplayedOpacity();
            },
            _updateDisplayedOpacity: function(parentOpacity) {
                this._sgNode.updateDisplayedOpacity(parentOpacity);
            },
            getDisplayedColor: function() {
                return this._sgNode.getDisplayedColor();
            },
            setOpacityModifyRGB: function(opacityValue) {
                if (this._opacityModifyRGB !== opacityValue) {
                    this._opacityModifyRGB = opacityValue;
                    this._sgNode.setOpacityModifyRGB(opacityValue);
                    this._onOpacityModifyRGBChanged();
                }
            },
            isOpacityModifyRGB: function() {
                return this._opacityModifyRGB;
            },
            getSiblingIndex: function() {
                if (this._parent) {
                    return this._parent._children.indexOf(this);
                } else {
                    return 0;
                }
            },
            setSiblingIndex: function(index) {
                if (!this._parent) {
                    return;
                }
                var array = this._parent._children;
                index = -1 !== index ? index : array.length - 1;
                var oldIndex = array.indexOf(this);
                if (index !== oldIndex) {
                    array.splice(oldIndex, 1);
                    if (index < array.length) {
                        array.splice(index, 0, this);
                    } else {
                        array.push(this);
                    }
                    var siblings = this._parent._children;
                    for (var i = 0, len = siblings.length; i < len; i++) {
                        var sibling = siblings[i];
                        sibling._sgNode.arrivalOrder = i;
                    }
                    if (cc.renderer) {
                        cc.renderer.childrenOrderDirty = this._parent._sgNode._reorderChildDirty = true;
                    }
                }
            },
            isChildOf: function(parent) {
                var child = this;
                do {
                    if (child === parent) {
                        return true;
                    }
                    child = child._parent;
                } while (child);
                return false;
            },
            _onBatchCreated: function() {
                var sgNode = this._sgNode;
                sgNode.setOpacity(this._opacity);
                sgNode.setCascadeOpacityEnabled(this._cascadeOpacityEnabled);
                sgNode.setRotationX(this._rotationX);
                sgNode.setRotationY(this._rotationY);
                sgNode.setScale(this._scaleX, this._scaleY);
                sgNode.setPosition(this._position);
                sgNode.setSkewX(this._skewX);
                sgNode.setSkewY(this._skewY);
                sgNode.setLocalZOrder(this._localZOrder);
                sgNode.setGlobalZOrder(this._globalZOrder);
                sgNode.ignoreAnchorPointForPosition(this._ignoreAnchorPointForPosition);
                sgNode.setTag(this._tag);
                sgNode.setOpacityModifyRGB(this._opacityModifyRGB);
                if (this._parent) {
                    this._parent._sgNode.addChild(sgNode);
                }
                var children = this._children;
                for (var i = 0, len = children.length; i < len; i++) {
                    children[i]._onBatchCreated();
                }
            },
            _removeSgNode: SceneGraphHelper.removeSgNode,
            _replaceSgNode: function(sgNode) {
                if (sgNode instanceof _ccsg.Node) {
                    var oldSgNode = this._sgNode;
                    sgNode.setPosition(this._position);
                    sgNode.setRotationX(this._rotationX);
                    sgNode.setRotationY(this._rotationY);
                    sgNode.setScale(this._scaleX, this._scaleY);
                    sgNode.setSkewX(this._skewX);
                    sgNode.setSkewY(this._skewY);
                    sgNode.setLocalZOrder(this._localZOrder);
                    sgNode.setGlobalZOrder(this._globalZOrder);
                    sgNode.setOpacity(this._opacity);
                    sgNode.setCascadeOpacityEnabled(this._cascadeOpacityEnabled);
                    sgNode.ignoreAnchorPointForPosition(this._ignoreAnchorPointForPosition);
                    sgNode.setTag(this._tag);
                    sgNode.setColor(this._color);
                    sgNode.setOpacityModifyRGB(this._opacityModifyRGB);
                    var children = oldSgNode.getChildren().slice(0);
                    oldSgNode.removeAllChildren();
                    for (var index = 0; index < children.length; ++index) {
                        sgNode.addChild(children[index]);
                    }
                    var parentNode = oldSgNode.getParent();
                    parentNode.removeChild(oldSgNode);
                    parentNode.addChild(sgNode);
                    sgNode.arrivalOrder = oldSgNode.arrivalOrder;
                    if (cc.renderer) {
                        cc.renderer.childrenOrderDirty = this._parent._sgNode._reorderChildDirty = true;
                    }
                    this._sgNode = sgNode;
                    if (cc.sys.isNative) {
                        oldSgNode.release();
                        sgNode.retain();
                    }
                } else {
                    throw new Error("Invalid sgNode. It must an instance of _ccsg.Node");
                }
            }
        });
        !function() {
            var SameNameGetSets = [ "name", "skewX", "skewY", "position", "rotation", "rotationX", "rotationY", "scale", "scaleX", "scaleY", "children", "childrenCount", "parent", "running", "scheduler", "opacity", "color", "tag" ];
            var DiffNameGetSets = {
                x: [ "getPositionX", "setPositionX" ],
                y: [ "getPositionY", "setPositionY" ],
                zIndex: [ "getLocalZOrder", "setLocalZOrder" ],
                ignoreAnchor: [ "isIgnoreAnchorPointForPosition", "ignoreAnchorPointForPosition" ],
                opacityModifyRGB: [ "isOpacityModifyRGB" ],
                cascadeOpacity: [ "isCascadeOpacityEnabled", "setCascadeOpacityEnabled" ],
                cascadeColor: [ "isCascadeColorEnabled", "setCascadeColorEnabled" ]
            };
            var propName, np = BaseNode.prototype;
            for (var i = 0; i < SameNameGetSets.length; i++) {
                propName = SameNameGetSets[i];
                var suffix = propName[0].toUpperCase() + propName.slice(1);
                var pd = Object.getOwnPropertyDescriptor(np, propName);
                if (pd) {
                    if (pd.get) {
                        np["get" + suffix] = pd.get;
                    }
                    if (pd.set) {
                        np["set" + suffix] = pd.set;
                    }
                } else {
                    JS.getset(np, propName, np["get" + suffix], np["set" + suffix]);
                }
            }
            for (propName in DiffNameGetSets) {
                var getset = DiffNameGetSets[propName];
                var pd = Object.getOwnPropertyDescriptor(np, propName);
                if (pd) {
                    np[getset[0]] = pd.get;
                    if (getset[1]) {
                        np[getset[1]] = pd.set;
                    }
                } else {
                    JS.getset(np, propName, np[getset[0]], np[getset[1]]);
                }
            }
        }();
        cc._BaseNode = module.exports = BaseNode;
    }, {
        "../platform/CCObject": 55,
        "./misc": 71,
        "./scene-graph-helper": 72
    } ],
    70: [ function(require, module, exports) {
        cc.find = module.exports = function(path, referenceNode) {
            if (null == path) {
                cc.error("Argument must be non-nil");
                return null;
            }
            if (!referenceNode) {
                var scene = cc.director.getScene();
                if (!scene) {
                    cc.warn("Can not get current scene.");
                    return null;
                }
                referenceNode = scene;
            }
            var match = referenceNode;
            var startIndex = "/" !== path[0] ? 0 : 1;
            var nameList = path.split("/");
            for (var n = startIndex; n < nameList.length; n++) {
                var name = nameList[n];
                var findByComp = "<" === name[0] && ">" === name[name.length - 1];
                var Comp;
                if (findByComp) {
                    var compName = name.slice(1, -1);
                    Comp = cc.js.getClassByName(compName);
                    if (!Comp) {
                        cc.warn("Failed to find component " + compName);
                        return null;
                    }
                }
                var children = match._children;
                match = null;
                for (var t = 0, len = children.length; t < len; ++t) {
                    var subChild = children[t];
                    if (findByComp) {
                        if (subChild.getComponent(Comp)) {
                            match = subChild;
                            break;
                        }
                    } else {
                        if (subChild.name === name) {
                            match = subChild;
                            break;
                        }
                    }
                }
                if (!match) {
                    return null;
                }
            }
            return match;
        };
    }, {} ],
    71: [ function(require, module, exports) {
        var JS = cc.js;
        var misc = {};
        misc.propertyDefine = function(ctor, sameNameGetSets, diffNameGetSets) {
            var propName, np = ctor.prototype;
            for (var i = 0; i < sameNameGetSets.length; i++) {
                propName = sameNameGetSets[i];
                var suffix = propName[0].toUpperCase() + propName.slice(1);
                var pd = Object.getOwnPropertyDescriptor(np, propName);
                if (pd) {
                    if (pd.get) {
                        np["get" + suffix] = pd.get;
                    }
                    if (pd.set) {
                        np["set" + suffix] = pd.set;
                    }
                } else {
                    JS.getset(np, propName, np["get" + suffix], np["set" + suffix]);
                }
            }
            for (propName in diffNameGetSets) {
                var getset = diffNameGetSets[propName];
                var pd = Object.getOwnPropertyDescriptor(np, propName);
                if (pd) {
                    np[getset[0]] = pd.get;
                    if (getset[1]) {
                        np[getset[1]] = pd.set;
                    }
                } else {
                    JS.getset(np, propName, np[getset[0]], np[getset[1]]);
                }
            }
        };
        var DirtyFlags = misc.DirtyFlags = {
            TRANSFORM: 1,
            SIZE: 2,
            ALL: 3
        };
        DirtyFlags.WIDGET = DirtyFlags.TRANSFORM | DirtyFlags.SIZE;
        module.exports = misc;
    }, {} ],
    72: [ function(require, module, exports) {
        var SceneGraphUtils = {
            removeSgNode: function() {
                var node = this._sgNode;
                if (node) {
                    node.release();
                    if (node._parent) {
                        node._parent.removeChild(node);
                    }
                }
            }
        };
        if (false) {
            SceneGraphUtils._getChildrenOffset = function(entityParent) {
                if (entityParent) {
                    var sgParent = entityParent._sgNode;
                    var firstChildEntity = entityParent._children[0];
                    if (firstChildEntity) {
                        var firstChildSg = firstChildEntity._sgNode;
                        var offset = sgParent._children.indexOf(firstChildSg);
                        if (-1 !== offset) {
                            return offset;
                        } else {
                            cc.error("%s's scene graph node not contains in the parent's children", firstChildEntity.name);
                            return -1;
                        }
                    } else {
                        return sgParent._children.length;
                    }
                } else {
                    return 0;
                }
            };
            SceneGraphUtils.checkMatchCurrentScene = function() {
                var scene = cc.director.getScene();
                var sgScene = cc.director.getRunningScene();
                function checkMatch(ent, sgNode) {
                    if (ent._sgNode !== sgNode) {
                        throw new Error("scene graph node not equal: " + ent.name);
                    }
                    var childCount = ent._children.length;
                    var childrenOffset = SceneGraphUtils._getChildrenOffset(ent);
                    if (sgNode._children.length !== childCount + childrenOffset) {
                        throw new Error("Mismatched child scene graphs: " + ent.name);
                    }
                    for (var i = 0; i < childCount; i++) {
                        checkMatch(ent._children[i], sgNode._children[childrenOffset + i]);
                    }
                }
                checkMatch(scene, sgScene);
            };
            cc._Test.SceneGraphUtils = SceneGraphUtils;
        }
        module.exports = SceneGraphUtils;
    }, {} ],
    73: [ function(require, module, exports) {
        cc.AffineTransform = function(a, b, c, d, tx, ty) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        };
        cc.affineTransformMake = function(a, b, c, d, tx, ty) {
            return {
                a: a,
                b: b,
                c: c,
                d: d,
                tx: tx,
                ty: ty
            };
        };
        cc.affineTransformClone = function(t) {
            return {
                a: t.a,
                b: t.b,
                c: t.c,
                d: t.d,
                tx: t.tx,
                ty: t.ty
            };
        };
        cc.pointApplyAffineTransform = function(point, transOrY, t) {
            var x, y;
            if (void 0 === t) {
                t = transOrY;
                x = point.x;
                y = point.y;
            } else {
                x = point;
                y = transOrY;
            }
            return {
                x: t.a * x + t.c * y + t.tx,
                y: t.b * x + t.d * y + t.ty
            };
        };
        cc._pointApplyAffineTransform = function(x, y, t) {
            return cc.pointApplyAffineTransform(x, y, t);
        };
        cc.sizeApplyAffineTransform = function(size, t) {
            return {
                width: t.a * size.width + t.c * size.height,
                height: t.b * size.width + t.d * size.height
            };
        };
        cc.affineTransformMakeIdentity = function() {
            return {
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                tx: 0,
                ty: 0
            };
        };
        cc.affineTransformIdentity = function() {
            return {
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                tx: 0,
                ty: 0
            };
        };
        cc.rectApplyAffineTransform = function(rect, anAffineTransform) {
            var top = cc.rectGetMinY(rect);
            var left = cc.rectGetMinX(rect);
            var right = cc.rectGetMaxX(rect);
            var bottom = cc.rectGetMaxY(rect);
            var topLeft = cc.pointApplyAffineTransform(left, top, anAffineTransform);
            var topRight = cc.pointApplyAffineTransform(right, top, anAffineTransform);
            var bottomLeft = cc.pointApplyAffineTransform(left, bottom, anAffineTransform);
            var bottomRight = cc.pointApplyAffineTransform(right, bottom, anAffineTransform);
            var minX = Math.min(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
            var maxX = Math.max(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
            var minY = Math.min(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);
            var maxY = Math.max(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);
            return cc.rect(minX, minY, maxX - minX, maxY - minY);
        };
        cc._rectApplyAffineTransformIn = function(rect, anAffineTransform) {
            var top = cc.rectGetMinY(rect);
            var left = cc.rectGetMinX(rect);
            var right = cc.rectGetMaxX(rect);
            var bottom = cc.rectGetMaxY(rect);
            var topLeft = cc.pointApplyAffineTransform(left, top, anAffineTransform);
            var topRight = cc.pointApplyAffineTransform(right, top, anAffineTransform);
            var bottomLeft = cc.pointApplyAffineTransform(left, bottom, anAffineTransform);
            var bottomRight = cc.pointApplyAffineTransform(right, bottom, anAffineTransform);
            var minX = Math.min(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
            var maxX = Math.max(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
            var minY = Math.min(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);
            var maxY = Math.max(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);
            rect.x = minX;
            rect.y = minY;
            rect.width = maxX - minX;
            rect.height = maxY - minY;
            return rect;
        };
        cc.affineTransformTranslate = function(t, tx, ty) {
            return {
                a: t.a,
                b: t.b,
                c: t.c,
                d: t.d,
                tx: t.tx + t.a * tx + t.c * ty,
                ty: t.ty + t.b * tx + t.d * ty
            };
        };
        cc.affineTransformScale = function(t, sx, sy) {
            return {
                a: t.a * sx,
                b: t.b * sx,
                c: t.c * sy,
                d: t.d * sy,
                tx: t.tx,
                ty: t.ty
            };
        };
        cc.affineTransformRotate = function(aTransform, anAngle) {
            var fSin = Math.sin(anAngle);
            var fCos = Math.cos(anAngle);
            return {
                a: aTransform.a * fCos + aTransform.c * fSin,
                b: aTransform.b * fCos + aTransform.d * fSin,
                c: aTransform.c * fCos - aTransform.a * fSin,
                d: aTransform.d * fCos - aTransform.b * fSin,
                tx: aTransform.tx,
                ty: aTransform.ty
            };
        };
        cc.affineTransformConcat = function(t1, t2) {
            return {
                a: t1.a * t2.a + t1.b * t2.c,
                b: t1.a * t2.b + t1.b * t2.d,
                c: t1.c * t2.a + t1.d * t2.c,
                d: t1.c * t2.b + t1.d * t2.d,
                tx: t1.tx * t2.a + t1.ty * t2.c + t2.tx,
                ty: t1.tx * t2.b + t1.ty * t2.d + t2.ty
            };
        };
        cc.affineTransformConcatIn = function(t1, t2) {
            var a = t1.a, b = t1.b, c = t1.c, d = t1.d, tx = t1.tx, ty = t1.ty;
            t1.a = a * t2.a + b * t2.c;
            t1.b = a * t2.b + b * t2.d;
            t1.c = c * t2.a + d * t2.c;
            t1.d = c * t2.b + d * t2.d;
            t1.tx = tx * t2.a + ty * t2.c + t2.tx;
            t1.ty = tx * t2.b + ty * t2.d + t2.ty;
            return t1;
        };
        cc.affineTransformEqualToTransform = function(t1, t2) {
            return t1.a === t2.a && t1.b === t2.b && t1.c === t2.c && t1.d === t2.d && t1.tx === t2.tx && t1.ty === t2.ty;
        };
        cc.affineTransformInvert = function(t) {
            var determinant = 1 / (t.a * t.d - t.b * t.c);
            return {
                a: determinant * t.d,
                b: -determinant * t.b,
                c: -determinant * t.c,
                d: determinant * t.a,
                tx: determinant * (t.c * t.ty - t.d * t.tx),
                ty: determinant * (t.b * t.tx - t.a * t.ty)
            };
        };
    }, {} ],
    74: [ function(require, module, exports) {
        var ValueType = require("./CCValueType");
        var JS = require("../platform/js");
        var Color = function() {
            function Color(r, g, b, a) {
                if ("object" === typeof r) {
                    g = r.g;
                    b = r.b;
                    a = r.a;
                    r = r.r;
                }
                this.r = "number" === typeof r ? r : 0;
                this.g = "number" === typeof g ? g : 0;
                this.b = "number" === typeof b ? b : 0;
                this.a = "number" === typeof a ? a : 255;
            }
            JS.extend(Color, ValueType);
            require("../platform/CCClass").fastDefine("cc.Color", Color, [ "r", "g", "b", "a" ]);
            var DefaultColors = {
                WHITE: [ 255, 255, 255, 255 ],
                BLACK: [ 0, 0, 0, 255 ],
                TRANSPARENT: [ 0, 0, 0, 0 ],
                GRAY: [ 127.5, 127.5, 127.5 ],
                RED: [ 255, 0, 0 ],
                GREEN: [ 0, 255, 0 ],
                BLUE: [ 0, 0, 255 ],
                YELLOW: [ 255, 235, 4 ],
                ORANGE: [ 255, 127, 0 ],
                CYAN: [ 0, 255, 255 ],
                MAGENTA: [ 255, 0, 255 ]
            };
            for (var colorName in DefaultColors) {
                var colorGetter = function(r, g, b, a) {
                    return function() {
                        return new Color(r, g, b, a);
                    };
                }.apply(null, DefaultColors[colorName]);
                Object.defineProperty(Color, colorName, {
                    get: colorGetter
                });
            }
            Color.prototype.clone = function() {
                return new Color(this.r, this.g, this.b, this.a);
            };
            Color.prototype.equals = function(other) {
                return other && this.r === other.r && this.g === other.g && this.b === other.b && this.a === other.a;
            };
            Color.prototype.lerp = function(to, ratio, out) {
                out = out || new Color();
                var r = this.r;
                var g = this.g;
                var b = this.b;
                var a = this.a;
                out.r = r + (to.r - r) * ratio;
                out.g = g + (to.g - g) * ratio;
                out.b = b + (to.b - b) * ratio;
                out.a = a + (to.a - a) * ratio;
                return out;
            };
            Color.prototype.toString = function() {
                return "rgba(" + this.r.toFixed() + ", " + this.g.toFixed() + ", " + this.b.toFixed() + ", " + this.a.toFixed() + ")";
            };
            Color.prototype.setR = function(red) {
                this.r = red;
                return this;
            };
            Color.prototype.setG = function(green) {
                this.g = green;
                return this;
            };
            Color.prototype.setB = function(blue) {
                this.b = blue;
                return this;
            };
            Color.prototype.setA = function(alpha) {
                this.a = alpha;
                return this;
            };
            Color.prototype.toCSS = function(opt) {
                if ("rgba" === opt) {
                    return "rgba(" + (0 | this.r) + "," + (0 | this.g) + "," + (0 | this.b) + "," + (this.a / 255).toFixed(2) + ")";
                } else {
                    if ("rgb" === opt) {
                        return "rgb(" + (0 | this.r) + "," + (0 | this.g) + "," + (0 | this.b) + ")";
                    } else {
                        return "#" + this.toHEX(opt);
                    }
                }
            };
            Color.prototype.clamp = function() {
                this.r = cc.clampf(this.r, 0, 255);
                this.g = cc.clampf(this.g, 0, 255);
                this.b = cc.clampf(this.b, 0, 255);
                this.a = cc.clampf(this.a, 0, 255);
            };
            Color.prototype.fromHEX = function(hexString) {
                var hex = parseInt(hexString.indexOf("#") > -1 ? hexString.substring(1) : hexString, 16);
                this.r = hex >> 16;
                this.g = (65280 & hex) >> 8;
                this.b = 255 & hex;
                return this;
            };
            Color.prototype.toHEX = function(fmt) {
                var hex = [ (0 | this.r).toString(16), (0 | this.g).toString(16), (0 | this.b).toString(16) ];
                var i = -1;
                if ("#rgb" === fmt) {
                    for (i = 0; i < hex.length; ++i) {
                        if (hex[i].length > 1) {
                            hex[i] = hex[i][0];
                        }
                    }
                } else {
                    if ("#rrggbb" === fmt) {
                        for (i = 0; i < hex.length; ++i) {
                            if (1 === hex[i].length) {
                                hex[i] = "0" + hex[i];
                            }
                        }
                    }
                }
                return hex.join("");
            };
            Color.prototype.toRGBValue = function() {
                return (cc.clampf(this.r, 0, 255) << 16) + (cc.clampf(this.g, 0, 255) << 8) + cc.clampf(this.b, 0, 255);
            };
            Color.prototype.fromHSV = function(h, s, v) {
                var rgb = Color.hsv2rgb(h, s, v);
                this.r = rgb.r;
                this.g = rgb.g;
                this.b = rgb.b;
                return this;
            };
            Color.prototype.toHSV = function() {
                return Color.rgb2hsv(this.r, this.g, this.b);
            };
            return Color;
        }();
        Color.rgb2hsv = function(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;
            var hsv = {
                h: 0,
                s: 0,
                v: 0
            };
            var max = Math.max(r, g, b);
            var min = Math.min(r, g, b);
            var delta = 0;
            hsv.v = max;
            hsv.s = max ? (max - min) / max : 0;
            if (!hsv.s) {
                hsv.h = 0;
            } else {
                delta = max - min;
                if (r === max) {
                    hsv.h = (g - b) / delta;
                } else {
                    if (g === max) {
                        hsv.h = 2 + (b - r) / delta;
                    } else {
                        hsv.h = 4 + (r - g) / delta;
                    }
                }
                hsv.h /= 6;
                if (hsv.h < 0) {
                    hsv.h += 1;
                }
            }
            return hsv;
        };
        Color.hsv2rgb = function(h, s, v) {
            var rgb = {
                r: 0,
                g: 0,
                b: 0
            };
            if (0 === s) {
                rgb.r = rgb.g = rgb.b = v;
            } else {
                if (0 === v) {
                    rgb.r = rgb.g = rgb.b = 0;
                } else {
                    if (1 === h) {
                        h = 0;
                    }
                    h *= 6;
                    s = s;
                    v = v;
                    var i = Math.floor(h);
                    var f = h - i;
                    var p = v * (1 - s);
                    var q = v * (1 - s * f);
                    var t = v * (1 - s * (1 - f));
                    switch (i) {
                      case 0:
                        rgb.r = v;
                        rgb.g = t;
                        rgb.b = p;
                        break;

                      case 1:
                        rgb.r = q;
                        rgb.g = v;
                        rgb.b = p;
                        break;

                      case 2:
                        rgb.r = p;
                        rgb.g = v;
                        rgb.b = t;
                        break;

                      case 3:
                        rgb.r = p;
                        rgb.g = q;
                        rgb.b = v;
                        break;

                      case 4:
                        rgb.r = t;
                        rgb.g = p;
                        rgb.b = v;
                        break;

                      case 5:
                        rgb.r = v;
                        rgb.g = p;
                        rgb.b = q;
                    }
                }
            }
            rgb.r *= 255;
            rgb.g *= 255;
            rgb.b *= 255;
            return rgb;
        };
        cc.Color = Color;
        cc.color = function color(r, g, b, a) {
            if (JS.isString(r)) {
                var result = new cc.Color();
                return result.fromHEX(r);
            }
            if (cc.js.isObject(r)) {
                return new cc.Color(r.r, r.g, r.b, r.a);
            }
            return new cc.Color(r, g, b, a);
        };
        cc.colorEqual = function(color1, color2) {
            return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b;
        };
        cc.hexToColor = function(hex) {
            hex = hex.replace(/^#?/, "0x");
            var c = parseInt(hex);
            var r = c >> 16;
            var g = (65280 & c) >> 8;
            var b = 255 & c;
            return cc.color(r, g, b);
        };
        cc.colorToHex = function(color) {
            var hR = color.r.toString(16), hG = color.g.toString(16), hB = color.b.toString(16);
            return "#" + (color.r < 16 ? "0" + hR : hR) + (color.g < 16 ? "0" + hG : hG) + (color.b < 16 ? "0" + hB : hB);
        };
        module.exports = cc.Color;
    }, {
        "../platform/CCClass": 53,
        "../platform/js": 62,
        "./CCValueType": 81
    } ],
    75: [ function(require, module, exports) {
        cc.Enum = function(obj) {
            var enumType = {};
            Object.defineProperty(enumType, "__enums__", {
                value: void 0,
                writable: true
            });
            var lastIndex = -1;
            for (var key in obj) {
                var val = obj[key];
                if (-1 === val) {
                    val = ++lastIndex;
                } else {
                    lastIndex = val;
                }
                enumType[key] = val;
                var reverseKey = "" + val;
                if (key !== reverseKey) {
                    Object.defineProperty(enumType, reverseKey, {
                        value: key,
                        enumerable: false
                    });
                }
            }
            return enumType;
        };
        cc.Enum.isEnum = function(enumType) {
            return enumType && enumType.hasOwnProperty("__enums__");
        };
        cc.Enum.getList = function(enumDef) {
            if (void 0 !== enumDef.__enums__) {
                return enumDef.__enums__;
            }
            var enums = [];
            for (var entry in enumDef) {
                if (enumDef.hasOwnProperty(entry)) {
                    var value = enumDef[entry];
                    var isInteger = "number" === typeof value && (0 | value) === value;
                    if (isInteger) {
                        enums.push({
                            name: entry,
                            value: value
                        });
                    }
                }
            }
            enums.sort(function(a, b) {
                return a.value - b.value;
            });
            enumDef.__enums__ = enums;
            return enums;
        };
        if (false) {
            var _TestEnum = cc.Enum({
                ZERO: -1,
                ONE: -1,
                TWO: -1,
                THREE: -1
            });
            if (0 !== _TestEnum.ZERO || 1 !== _TestEnum.ONE || 2 !== _TestEnum.TWO || 3 !== _TestEnum.THREE) {
                cc.error('Sorry, "cc.Enum" not available on this platform, please report this error here: https://github.com/fireball-x/fireball/issues/new');
            }
        }
        module.exports = cc.Enum;
    }, {} ],
    76: [ function(require, module, exports) {
        cc.POINT_EPSILON = parseFloat("1.192092896e-07F");
        cc.pNeg = function(point) {
            return cc.p(-point.x, -point.y);
        };
        cc.pAdd = function(v1, v2) {
            return cc.p(v1.x + v2.x, v1.y + v2.y);
        };
        cc.pSub = function(v1, v2) {
            return cc.p(v1.x - v2.x, v1.y - v2.y);
        };
        cc.pMult = function(point, floatVar) {
            return cc.p(point.x * floatVar, point.y * floatVar);
        };
        cc.pMidpoint = function(v1, v2) {
            return cc.pMult(cc.pAdd(v1, v2), .5);
        };
        cc.pDot = function(v1, v2) {
            return v1.x * v2.x + v1.y * v2.y;
        };
        cc.pCross = function(v1, v2) {
            return v1.x * v2.y - v1.y * v2.x;
        };
        cc.pPerp = function(point) {
            return cc.p(-point.y, point.x);
        };
        cc.pRPerp = function(point) {
            return cc.p(point.y, -point.x);
        };
        cc.pProject = function(v1, v2) {
            return cc.pMult(v2, cc.pDot(v1, v2) / cc.pDot(v2, v2));
        };
        cc.pRotate = function(v1, v2) {
            return cc.p(v1.x * v2.x - v1.y * v2.y, v1.x * v2.y + v1.y * v2.x);
        };
        cc.pUnrotate = function(v1, v2) {
            return cc.p(v1.x * v2.x + v1.y * v2.y, v1.y * v2.x - v1.x * v2.y);
        };
        cc.pLengthSQ = function(v) {
            return cc.pDot(v, v);
        };
        cc.pDistanceSQ = function(point1, point2) {
            return cc.pLengthSQ(cc.pSub(point1, point2));
        };
        cc.pLength = function(v) {
            return Math.sqrt(cc.pLengthSQ(v));
        };
        cc.pDistance = function(v1, v2) {
            return cc.pLength(cc.pSub(v1, v2));
        };
        cc.pNormalize = function(v) {
            var n = cc.pLength(v);
            return 0 === n ? cc.p(v) : cc.pMult(v, 1 / n);
        };
        cc.pForAngle = function(a) {
            return cc.p(Math.cos(a), Math.sin(a));
        };
        cc.pToAngle = function(v) {
            return Math.atan2(v.y, v.x);
        };
        cc.clampf = function(value, min_inclusive, max_inclusive) {
            if (min_inclusive > max_inclusive) {
                var temp = min_inclusive;
                min_inclusive = max_inclusive;
                max_inclusive = temp;
            }
            return value < min_inclusive ? min_inclusive : value < max_inclusive ? value : max_inclusive;
        };
        cc.clamp01 = function(value) {
            return value < 0 ? 0 : value < 1 ? value : 1;
        };
        cc.pClamp = function(p, min_inclusive, max_inclusive) {
            return cc.p(cc.clampf(p.x, min_inclusive.x, max_inclusive.x), cc.clampf(p.y, min_inclusive.y, max_inclusive.y));
        };
        cc.pFromSize = function(s) {
            return cc.p(s.width, s.height);
        };
        cc.pCompOp = function(p, opFunc) {
            return cc.p(opFunc(p.x), opFunc(p.y));
        };
        cc.pLerp = function(a, b, alpha) {
            return cc.pAdd(cc.pMult(a, 1 - alpha), cc.pMult(b, alpha));
        };
        cc.pFuzzyEqual = function(a, b, variance) {
            if (a.x - variance <= b.x && b.x <= a.x + variance) {
                if (a.y - variance <= b.y && b.y <= a.y + variance) {
                    return true;
                }
            }
            return false;
        };
        cc.pCompMult = function(a, b) {
            return cc.p(a.x * b.x, a.y * b.y);
        };
        cc.pAngleSigned = function(a, b) {
            var a2 = cc.pNormalize(a);
            var b2 = cc.pNormalize(b);
            var angle = Math.atan2(a2.x * b2.y - a2.y * b2.x, cc.pDot(a2, b2));
            if (Math.abs(angle) < cc.POINT_EPSILON) {
                return 0;
            }
            return angle;
        };
        cc.pAngle = function(a, b) {
            var angle = Math.acos(cc.pDot(cc.pNormalize(a), cc.pNormalize(b)));
            if (Math.abs(angle) < cc.POINT_EPSILON) {
                return 0;
            }
            return angle;
        };
        cc.pRotateByAngle = function(v, pivot, angle) {
            var r = cc.pSub(v, pivot);
            var cosa = Math.cos(angle), sina = Math.sin(angle);
            var t = r.x;
            r.x = t * cosa - r.y * sina + pivot.x;
            r.y = t * sina + r.y * cosa + pivot.y;
            return r;
        };
        cc.pLineIntersect = function(A, B, C, D, retP) {
            if (A.x === B.x && A.y === B.y || C.x === D.x && C.y === D.y) {
                return false;
            }
            var BAx = B.x - A.x;
            var BAy = B.y - A.y;
            var DCx = D.x - C.x;
            var DCy = D.y - C.y;
            var ACx = A.x - C.x;
            var ACy = A.y - C.y;
            var denom = DCy * BAx - DCx * BAy;
            retP.x = DCx * ACy - DCy * ACx;
            retP.y = BAx * ACy - BAy * ACx;
            if (0 === denom) {
                if (0 === retP.x || 0 === retP.y) {
                    return true;
                }
                return false;
            }
            retP.x = retP.x / denom;
            retP.y = retP.y / denom;
            return true;
        };
        cc.pSegmentIntersect = function(A, B, C, D) {
            var retP = cc.p(0, 0);
            if (cc.pLineIntersect(A, B, C, D, retP)) {
                if (retP.x >= 0 && retP.x <= 1 && retP.y >= 0 && retP.y <= 1) {
                    return true;
                }
            }
            return false;
        };
        cc.pIntersectPoint = function(A, B, C, D) {
            var retP = cc.p(0, 0);
            if (cc.pLineIntersect(A, B, C, D, retP)) {
                var P = cc.p(0, 0);
                P.x = A.x + retP.x * (B.x - A.x);
                P.y = A.y + retP.x * (B.y - A.y);
                return P;
            }
            return cc.p(0, 0);
        };
        cc.pSameAs = function(A, B) {
            if (null != A && null != B) {
                return A.x === B.x && A.y === B.y;
            }
            return false;
        };
        cc.pZeroIn = function(v) {
            v.x = 0;
            v.y = 0;
        };
        cc.pIn = function(v1, v2) {
            v1.x = v2.x;
            v1.y = v2.y;
        };
        cc.pMultIn = function(point, floatVar) {
            point.x *= floatVar;
            point.y *= floatVar;
        };
        cc.pSubIn = function(v1, v2) {
            v1.x -= v2.x;
            v1.y -= v2.y;
        };
        cc.pAddIn = function(v1, v2) {
            v1.x += v2.x;
            v1.y += v2.y;
        };
        cc.pNormalizeIn = function(v) {
            cc.pMultIn(v, 1 / Math.sqrt(v.x * v.x + v.y * v.y));
        };
    }, {} ],
    77: [ function(require, module, exports) {
        var ValueType = require("./CCValueType");
        var JS = require("../platform/js");
        function Rect(x, y, w, h) {
            if (x && "object" === typeof x) {
                y = x.y;
                w = x.width;
                h = x.height;
                x = x.x;
            }
            this.x = "number" === typeof x ? x : 0;
            this.y = "number" === typeof y ? y : 0;
            this.width = "number" === typeof w ? w : 0;
            this.height = "number" === typeof h ? h : 0;
        }
        JS.extend(Rect, ValueType);
        require("../platform/CCClass").fastDefine("cc.Rect", Rect, [ "x", "y", "width", "height" ]);
        Rect.fromMinMax = function(v1, v2) {
            var min_x = Math.min(v1.x, v2.x);
            var min_y = Math.min(v1.y, v2.y);
            var max_x = Math.max(v1.x, v2.x);
            var max_y = Math.max(v1.y, v2.y);
            return new Rect(min_x, min_y, max_x - min_x, max_y - min_y);
        };
        Rect.contain = function _Contain(a, b) {
            if (a.x <= b.x && a.x + a.width >= b.x + b.width && a.y <= b.y && a.y + a.height >= b.y + b.height) {
                return 1;
            }
            if (b.x <= a.x && b.x + b.width >= a.x + a.width && b.y <= a.y && b.y + b.height >= a.y + a.height) {
                return -1;
            }
            return 0;
        };
        var proto = Rect.prototype;
        proto.clone = function() {
            return new Rect(this.x, this.y, this.width, this.height);
        };
        proto.equals = function(other) {
            return other && this.x === other.x && this.y === other.y && this.width === other.width && this.height === other.height;
        };
        proto.lerp = function(to, ratio, out) {
            out = out || new Rect();
            var x = this.x;
            var y = this.y;
            var width = this.width;
            var height = this.height;
            out.x = x + (to.x - x) * ratio;
            out.y = y + (to.y - y) * ratio;
            out.width = width + (to.width - width) * ratio;
            out.height = height + (to.height - height) * ratio;
            return out;
        };
        proto.toString = function() {
            return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ", " + this.width.toFixed(2) + ", " + this.height.toFixed(2) + ")";
        };
        Object.defineProperty(proto, "xMin", {
            get: function() {
                return this.x;
            },
            set: function(value) {
                this.width += this.x - value;
                this.x = value;
            }
        });
        Object.defineProperty(proto, "yMin", {
            get: function() {
                return this.y;
            },
            set: function(value) {
                this.height += this.y - value;
                this.y = value;
            }
        });
        Object.defineProperty(proto, "xMax", {
            get: function() {
                return this.x + this.width;
            },
            set: function(value) {
                this.width = value - this.x;
            }
        });
        Object.defineProperty(proto, "yMax", {
            get: function() {
                return this.y + this.height;
            },
            set: function(value) {
                this.height = value - this.y;
            }
        });
        Object.defineProperty(proto, "center", {
            get: function() {
                return new cc.Vec2(this.x + .5 * this.width, this.y + .5 * this.height);
            },
            set: function(value) {
                this.x = value.x - .5 * this.width;
                this.y = value.y - .5 * this.height;
            }
        });
        Object.defineProperty(proto, "size", {
            get: function() {
                return new cc.Size(this.width, this.height);
            },
            set: function(value) {
                this.width = value.width;
                this.height = value.height;
            }
        });
        proto.intersects = function(rect) {
            return cc.rectIntersectsRect(this, rect);
        };
        proto.contains = function(point) {
            return this.x <= point.x && this.x + this.width >= point.x && this.y <= point.y && this.y + this.height >= point.y;
        };
        proto.containsRect = function(rect) {
            return this.x <= rect.x && this.x + this.width >= rect.x + rect.width && this.y <= rect.y && this.y + this.height >= rect.y + rect.height;
        };
        cc.Rect = Rect;
        cc.rect = function rect(x, y, w, h) {
            return new Rect(x, y, w, h);
        };
        cc.rectEqualToRect = function(rect1, rect2) {
            return rect1 && rect2 && rect1.x === rect2.x && rect1.y === rect2.y && rect1.width === rect2.width && rect1.height === rect2.height;
        };
        cc._rectEqualToZero = function(rect) {
            return rect && 0 === rect.x && 0 === rect.y && 0 === rect.width && 0 === rect.height;
        };
        cc.rectContainsRect = function(rect1, rect2) {
            if (!rect1 || !rect2) {
                return false;
            }
            return !(rect1.x >= rect2.x || rect1.y >= rect2.y || rect1.x + rect1.width <= rect2.x + rect2.width || rect1.y + rect1.height <= rect2.y + rect2.height);
        };
        cc.rectGetMaxX = function(rect) {
            return rect.x + rect.width;
        };
        cc.rectGetMidX = function(rect) {
            return rect.x + rect.width / 2;
        };
        cc.rectGetMinX = function(rect) {
            return rect.x;
        };
        cc.rectGetMaxY = function(rect) {
            return rect.y + rect.height;
        };
        cc.rectGetMidY = function(rect) {
            return rect.y + rect.height / 2;
        };
        cc.rectGetMinY = function(rect) {
            return rect.y;
        };
        cc.rectContainsPoint = function(rect, point) {
            return point.x >= cc.rectGetMinX(rect) && point.x <= cc.rectGetMaxX(rect) && point.y >= cc.rectGetMinY(rect) && point.y <= cc.rectGetMaxY(rect);
        };
        cc.rectIntersectsRect = function(ra, rb) {
            var maxax = ra.x + ra.width, maxay = ra.y + ra.height, maxbx = rb.x + rb.width, maxby = rb.y + rb.height;
            return !(maxax < rb.x || maxbx < ra.x || maxay < rb.y || maxby < ra.y);
        };
        cc.rectOverlapsRect = function(rectA, rectB) {
            return !(rectA.x + rectA.width < rectB.x || rectB.x + rectB.width < rectA.x || rectA.y + rectA.height < rectB.y || rectB.y + rectB.height < rectA.y);
        };
        cc.rectUnion = function(rectA, rectB) {
            var rect = cc.rect(0, 0, 0, 0);
            rect.x = Math.min(rectA.x, rectB.x);
            rect.y = Math.min(rectA.y, rectB.y);
            rect.width = Math.max(rectA.x + rectA.width, rectB.x + rectB.width) - rect.x;
            rect.height = Math.max(rectA.y + rectA.height, rectB.y + rectB.height) - rect.y;
            return rect;
        };
        cc.rectIntersection = function(rectA, rectB) {
            var intersection = cc.rect(Math.max(cc.rectGetMinX(rectA), cc.rectGetMinX(rectB)), Math.max(cc.rectGetMinY(rectA), cc.rectGetMinY(rectB)), 0, 0);
            intersection.width = Math.min(cc.rectGetMaxX(rectA), cc.rectGetMaxX(rectB)) - cc.rectGetMinX(intersection);
            intersection.height = Math.min(cc.rectGetMaxY(rectA), cc.rectGetMaxY(rectB)) - cc.rectGetMinY(intersection);
            return intersection;
        };
        module.exports = cc.Rect;
    }, {
        "../platform/CCClass": 53,
        "../platform/js": 62,
        "./CCValueType": 81
    } ],
    78: [ function(require, module, exports) {
        var ValueType = require("./CCValueType");
        var JS = require("../platform/js");
        function Size(width, height) {
            if (width && "object" === typeof width) {
                height = width.height;
                width = width.width;
            }
            this.width = "number" === typeof width ? width : 0;
            this.height = "number" === typeof height ? height : 0;
        }
        JS.extend(Size, ValueType);
        require("../platform/CCClass").fastDefine("cc.Size", Size, [ "width", "height" ]);
        JS.get(Size, "ZERO", function() {
            return new Size(0, 0);
        });
        var proto = Size.prototype;
        proto.clone = function() {
            return new Size(this.width, this.height);
        };
        proto.equals = function(other) {
            return other && this.width === other.width && this.height === other.height;
        };
        proto.lerp = function(to, ratio, out) {
            out = out || new Size();
            var width = this.width;
            var height = this.height;
            out.width = width + (to.width - width) * ratio;
            out.height = height + (to.height - height) * ratio;
            return out;
        };
        proto.toString = function() {
            return "(" + this.width.toFixed(2) + ", " + this.height.toFixed(2) + ")";
        };
        cc.size = function(w, h) {
            return new Size(w, h);
        };
        cc.sizeEqualToSize = function(size1, size2) {
            return size1 && size2 && size1.width === size2.width && size1.height === size2.height;
        };
        cc.Size = module.exports = Size;
    }, {
        "../platform/CCClass": 53,
        "../platform/js": 62,
        "./CCValueType": 81
    } ],
    79: [ function(require, module, exports) {
        cc.Acceleration = function(x, y, z, timestamp) {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
            this.timestamp = timestamp || 0;
        };
        cc.BlendFunc = function(src1, dst1) {
            this.src = src1;
            this.dst = dst1;
        };
        cc.BlendFunc._disable = function() {
            return new cc.BlendFunc(cc.ONE, cc.ZERO);
        };
        cc.BlendFunc._alphaPremultiplied = function() {
            return new cc.BlendFunc(cc.ONE, cc.ONE_MINUS_SRC_ALPHA);
        };
        cc.BlendFunc._alphaNonPremultiplied = function() {
            return new cc.BlendFunc(cc.SRC_ALPHA, cc.ONE_MINUS_SRC_ALPHA);
        };
        cc.BlendFunc._additive = function() {
            return new cc.BlendFunc(cc.SRC_ALPHA, cc.ONE);
        };
        cc.BlendFunc.DISABLE;
        cc.js.get(cc.BlendFunc, "DISABLE", cc.BlendFunc._disable);
        cc.BlendFunc.ALPHA_PREMULTIPLIED;
        cc.js.get(cc.BlendFunc, "ALPHA_PREMULTIPLIED", cc.BlendFunc._alphaPremultiplied);
        cc.BlendFunc.ALPHA_NON_PREMULTIPLIED;
        cc.js.get(cc.BlendFunc, "ALPHA_NON_PREMULTIPLIED", cc.BlendFunc._alphaNonPremultiplied);
        cc.BlendFunc.ADDITIVE;
        cc.js.get(cc.BlendFunc, "ADDITIVE", cc.BlendFunc._additive);
        cc.blendFuncDisable = function() {
            return new cc.BlendFunc(cc.ONE, cc.ZERO);
        };
        cc.FontDefinition = function(properties) {
            var _t = this;
            _t.fontName = "Arial";
            _t.fontSize = 12;
            _t.textAlign = cc.TextAlignment.CENTER;
            _t.verticalAlign = cc.VerticalTextAlignment.TOP;
            _t.fillStyle = cc.color(255, 255, 255, 255);
            _t.boundingWidth = 0;
            _t.boundingHeight = 0;
            _t.strokeEnabled = false;
            _t.strokeStyle = cc.color(255, 255, 255, 255);
            _t.lineWidth = 1;
            _t.lineHeight = "normal";
            _t.fontStyle = "normal";
            _t.fontWeight = "normal";
            _t.shadowEnabled = false;
            _t.shadowOffsetX = 0;
            _t.shadowOffsetY = 0;
            _t.shadowBlur = 0;
            _t.shadowOpacity = 1;
            if (properties && properties instanceof Object) {
                for (var key in properties) {
                    _t[key] = properties[key];
                }
            }
        };
        cc.FontDefinition.prototype._getCanvasFontStr = function() {
            var lineHeight = !this.lineHeight.charAt ? this.lineHeight + "px" : this.lineHeight;
            return this.fontStyle + " " + this.fontWeight + " " + this.fontSize + "px/" + lineHeight + " '" + this.fontName + "'";
        };
        cc.TextAlignment = cc.Enum({
            LEFT: 0,
            CENTER: 1,
            RIGHT: 2
        });
        cc.VerticalTextAlignment = cc.Enum({
            TOP: 0,
            CENTER: 1,
            BOTTOM: 2
        });
        cc._Dictionary = cc.Class({
            ctor: function() {
                this._keyMapTb = {};
                this._valueMapTb = {};
                this.__currId = 2 << (0 | 10 * Math.random());
            },
            __getKey: function() {
                this.__currId++;
                return "key_" + this.__currId;
            },
            setObject: function(value, key) {
                if (null == key) {
                    return;
                }
                var keyId = this.__getKey();
                this._keyMapTb[keyId] = key;
                this._valueMapTb[keyId] = value;
            },
            objectForKey: function(key) {
                if (null == key) {
                    return null;
                }
                var locKeyMapTb = this._keyMapTb;
                for (var keyId in locKeyMapTb) {
                    if (locKeyMapTb[keyId] === key) {
                        return this._valueMapTb[keyId];
                    }
                }
                return null;
            },
            valueForKey: function(key) {
                return this.objectForKey(key);
            },
            removeObjectForKey: function(key) {
                if (null == key) {
                    return;
                }
                var locKeyMapTb = this._keyMapTb;
                for (var keyId in locKeyMapTb) {
                    if (locKeyMapTb[keyId] === key) {
                        delete this._valueMapTb[keyId];
                        delete locKeyMapTb[keyId];
                        return;
                    }
                }
            },
            removeObjectsForKeys: function(keys) {
                if (null == keys) {
                    return;
                }
                for (var i = 0; i < keys.length; i++) {
                    this.removeObjectForKey(keys[i]);
                }
            },
            allKeys: function() {
                var keyArr = [], locKeyMapTb = this._keyMapTb;
                for (var key in locKeyMapTb) {
                    keyArr.push(locKeyMapTb[key]);
                }
                return keyArr;
            },
            removeAllObjects: function() {
                this._keyMapTb = {};
                this._valueMapTb = {};
            },
            count: function() {
                return this.allKeys().length;
            }
        });
    }, {} ],
    80: [ function(require, module, exports) {
        cc.WebGLColor = function(r, g, b, a, arrayBuffer, offset) {
            this._arrayBuffer = arrayBuffer || new ArrayBuffer(cc.WebGLColor.BYTES_PER_ELEMENT);
            this._offset = offset || 0;
            var locArrayBuffer = this._arrayBuffer, locOffset = this._offset, locElementLen = Uint8Array.BYTES_PER_ELEMENT;
            this._rU8 = new Uint8Array(locArrayBuffer, locOffset, 1);
            this._gU8 = new Uint8Array(locArrayBuffer, locOffset + locElementLen, 1);
            this._bU8 = new Uint8Array(locArrayBuffer, locOffset + 2 * locElementLen, 1);
            this._aU8 = new Uint8Array(locArrayBuffer, locOffset + 3 * locElementLen, 1);
            this._rU8[0] = r || 0;
            this._gU8[0] = g || 0;
            this._bU8[0] = b || 0;
            this._aU8[0] = null == a ? 255 : a;
            if (void 0 === a) {
                this.a_undefined = true;
            }
        };
        cc.WebGLColor.BYTES_PER_ELEMENT = 4;
        var _p = cc.WebGLColor.prototype;
        _p._getR = function() {
            return this._rU8[0];
        };
        _p._setR = function(value) {
            this._rU8[0] = value < 0 ? 0 : value;
        };
        _p._getG = function() {
            return this._gU8[0];
        };
        _p._setG = function(value) {
            this._gU8[0] = value < 0 ? 0 : value;
        };
        _p._getB = function() {
            return this._bU8[0];
        };
        _p._setB = function(value) {
            this._bU8[0] = value < 0 ? 0 : value;
        };
        _p._getA = function() {
            return this._aU8[0];
        };
        _p._setA = function(value) {
            this._aU8[0] = value < 0 ? 0 : value;
        };
        _p.r;
        cc.js.getset(_p, "r", _p._getR, _p._setR);
        _p.g;
        cc.js.getset(_p, "g", _p._getG, _p._setG);
        _p.b;
        cc.js.getset(_p, "b", _p._getB, _p._setB);
        _p.a;
        cc.js.getset(_p, "a", _p._getA, _p._setA);
        cc.Vertex2F = function(x, y, arrayBuffer, offset) {
            this._arrayBuffer = arrayBuffer || new ArrayBuffer(cc.Vertex2F.BYTES_PER_ELEMENT);
            this._offset = offset || 0;
            this._xF32 = new Float32Array(this._arrayBuffer, this._offset, 1);
            this._yF32 = new Float32Array(this._arrayBuffer, this._offset + 4, 1);
            this._xF32[0] = x || 0;
            this._yF32[0] = y || 0;
        };
        cc.Vertex2F.BYTES_PER_ELEMENT = 8;
        _p = cc.Vertex2F.prototype;
        _p._getX = function() {
            return this._xF32[0];
        };
        _p._setX = function(xValue) {
            this._xF32[0] = xValue;
        };
        _p._getY = function() {
            return this._yF32[0];
        };
        _p._setY = function(yValue) {
            this._yF32[0] = yValue;
        };
        _p.x;
        cc.js.getset(_p, "x", _p._getX, _p._setX);
        _p.y;
        cc.js.getset(_p, "y", _p._getY, _p._setY);
        cc.Vertex3F = function(x, y, z, arrayBuffer, offset) {
            this._arrayBuffer = arrayBuffer || new ArrayBuffer(cc.Vertex3F.BYTES_PER_ELEMENT);
            this._offset = offset || 0;
            var locArrayBuffer = this._arrayBuffer, locOffset = this._offset;
            this._xF32 = new Float32Array(locArrayBuffer, locOffset, 1);
            this._xF32[0] = x || 0;
            this._yF32 = new Float32Array(locArrayBuffer, locOffset + Float32Array.BYTES_PER_ELEMENT, 1);
            this._yF32[0] = y || 0;
            this._zF32 = new Float32Array(locArrayBuffer, locOffset + 2 * Float32Array.BYTES_PER_ELEMENT, 1);
            this._zF32[0] = z || 0;
        };
        cc.Vertex3F.BYTES_PER_ELEMENT = 12;
        _p = cc.Vertex3F.prototype;
        _p._getX = function() {
            return this._xF32[0];
        };
        _p._setX = function(xValue) {
            this._xF32[0] = xValue;
        };
        _p._getY = function() {
            return this._yF32[0];
        };
        _p._setY = function(yValue) {
            this._yF32[0] = yValue;
        };
        _p._getZ = function() {
            return this._zF32[0];
        };
        _p._setZ = function(zValue) {
            this._zF32[0] = zValue;
        };
        _p.x;
        cc.js.getset(_p, "x", _p._getX, _p._setX);
        _p.y;
        cc.js.getset(_p, "y", _p._getY, _p._setY);
        _p.z;
        cc.js.getset(_p, "z", _p._getZ, _p._setZ);
        cc.Tex2F = function(u, v, arrayBuffer, offset) {
            this._arrayBuffer = arrayBuffer || new ArrayBuffer(cc.Tex2F.BYTES_PER_ELEMENT);
            this._offset = offset || 0;
            this._uF32 = new Float32Array(this._arrayBuffer, this._offset, 1);
            this._vF32 = new Float32Array(this._arrayBuffer, this._offset + 4, 1);
            this._uF32[0] = u || 0;
            this._vF32[0] = v || 0;
        };
        cc.Tex2F.BYTES_PER_ELEMENT = 8;
        _p = cc.Tex2F.prototype;
        _p._getU = function() {
            return this._uF32[0];
        };
        _p._setU = function(xValue) {
            this._uF32[0] = xValue;
        };
        _p._getV = function() {
            return this._vF32[0];
        };
        _p._setV = function(yValue) {
            this._vF32[0] = yValue;
        };
        _p.u;
        cc.js.getset(_p, "u", _p._getU, _p._setU);
        _p.v;
        cc.js.getset(_p, "v", _p._getV, _p._setV);
        cc.Quad2 = function(tl, tr, bl, br, arrayBuffer, offset) {
            this._arrayBuffer = arrayBuffer || new ArrayBuffer(cc.Quad2.BYTES_PER_ELEMENT);
            this._offset = offset || 0;
            var locArrayBuffer = this._arrayBuffer, locElementLen = cc.Vertex2F.BYTES_PER_ELEMENT;
            this._tl = tl ? new cc.Vertex2F(tl.x, tl.y, locArrayBuffer, 0) : new cc.Vertex2F(0, 0, locArrayBuffer, 0);
            this._tr = tr ? new cc.Vertex2F(tr.x, tr.y, locArrayBuffer, locElementLen) : new cc.Vertex2F(0, 0, locArrayBuffer, locElementLen);
            this._bl = bl ? new cc.Vertex2F(bl.x, bl.y, locArrayBuffer, 2 * locElementLen) : new cc.Vertex2F(0, 0, locArrayBuffer, 2 * locElementLen);
            this._br = br ? new cc.Vertex2F(br.x, br.y, locArrayBuffer, 3 * locElementLen) : new cc.Vertex2F(0, 0, locArrayBuffer, 3 * locElementLen);
        };
        cc.Quad2.BYTES_PER_ELEMENT = 32;
        _p = cc.Quad2.prototype;
        _p._getTL = function() {
            return this._tl;
        };
        _p._setTL = function(tlValue) {
            this._tl.x = tlValue.x;
            this._tl.y = tlValue.y;
        };
        _p._getTR = function() {
            return this._tr;
        };
        _p._setTR = function(trValue) {
            this._tr.x = trValue.x;
            this._tr.y = trValue.y;
        };
        _p._getBL = function() {
            return this._bl;
        };
        _p._setBL = function(blValue) {
            this._bl.x = blValue.x;
            this._bl.y = blValue.y;
        };
        _p._getBR = function() {
            return this._br;
        };
        _p._setBR = function(brValue) {
            this._br.x = brValue.x;
            this._br.y = brValue.y;
        };
        _p.tl;
        cc.js.getset(_p, "tl", _p._getTL, _p._setTL);
        _p.tr;
        cc.js.getset(_p, "tr", _p._getTR, _p._setTR);
        _p.bl;
        cc.js.getset(_p, "bl", _p._getBL, _p._setBL);
        _p.br;
        cc.js.getset(_p, "br", _p._getBR, _p._setBR);
        cc.Quad3 = function(bl1, br1, tl1, tr1) {
            this.bl = bl1 || new cc.Vertex3F(0, 0, 0);
            this.br = br1 || new cc.Vertex3F(0, 0, 0);
            this.tl = tl1 || new cc.Vertex3F(0, 0, 0);
            this.tr = tr1 || new cc.Vertex3F(0, 0, 0);
        };
        cc.V3F_C4B_T2F = function(vertices, colors, texCoords, arrayBuffer, offset) {
            this._arrayBuffer = arrayBuffer || new ArrayBuffer(cc.V3F_C4B_T2F.BYTES_PER_ELEMENT);
            this._offset = offset || 0;
            var locArrayBuffer = this._arrayBuffer, locOffset = this._offset, locElementLen = cc.Vertex3F.BYTES_PER_ELEMENT;
            this._vertices = vertices ? new cc.Vertex3F(vertices.x, vertices.y, vertices.z, locArrayBuffer, locOffset) : new cc.Vertex3F(0, 0, 0, locArrayBuffer, locOffset);
            this._colors = colors ? new cc.WebGLColor(colors.r, colors.g, colors.b, colors.a, locArrayBuffer, locOffset + locElementLen) : new cc.WebGLColor(0, 0, 0, 0, locArrayBuffer, locOffset + locElementLen);
            this._texCoords = texCoords ? new cc.Tex2F(texCoords.u, texCoords.v, locArrayBuffer, locOffset + locElementLen + cc.WebGLColor.BYTES_PER_ELEMENT) : new cc.Tex2F(0, 0, locArrayBuffer, locOffset + locElementLen + cc.WebGLColor.BYTES_PER_ELEMENT);
        };
        cc.V3F_C4B_T2F.BYTES_PER_ELEMENT = 24;
        _p = cc.V3F_C4B_T2F.prototype;
        _p._getVertices = function() {
            return this._vertices;
        };
        _p._setVertices = function(verticesValue) {
            var locVertices = this._vertices;
            locVertices.x = verticesValue.x;
            locVertices.y = verticesValue.y;
            locVertices.z = verticesValue.z;
        };
        _p._getColor = function() {
            return this._colors;
        };
        _p._setColor = function(colorValue) {
            var locColors = this._colors;
            locColors.r = colorValue.r;
            locColors.g = colorValue.g;
            locColors.b = colorValue.b;
            locColors.a = colorValue.a;
        };
        _p._getTexCoords = function() {
            return this._texCoords;
        };
        _p._setTexCoords = function(texValue) {
            this._texCoords.u = texValue.u;
            this._texCoords.v = texValue.v;
        };
        _p.vertices;
        cc.js.getset(_p, "vertices", _p._getVertices, _p._setVertices);
        _p.colors;
        cc.js.getset(_p, "colors", _p._getColor, _p._setColor);
        _p.texCoords;
        cc.js.getset(_p, "texCoords", _p._getTexCoords, _p._setTexCoords);
        cc.V3F_C4B_T2F_Quad = function(tl, bl, tr, br, arrayBuffer, offset) {
            this._arrayBuffer = arrayBuffer || new ArrayBuffer(cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT);
            this._offset = offset || 0;
            var locArrayBuffer = this._arrayBuffer, locOffset = this._offset, locElementLen = cc.V3F_C4B_T2F.BYTES_PER_ELEMENT;
            this._tl = tl ? new cc.V3F_C4B_T2F(tl.vertices, tl.colors, tl.texCoords, locArrayBuffer, locOffset) : new cc.V3F_C4B_T2F(null, null, null, locArrayBuffer, locOffset);
            this._bl = bl ? new cc.V3F_C4B_T2F(bl.vertices, bl.colors, bl.texCoords, locArrayBuffer, locOffset + locElementLen) : new cc.V3F_C4B_T2F(null, null, null, locArrayBuffer, locOffset + locElementLen);
            this._tr = tr ? new cc.V3F_C4B_T2F(tr.vertices, tr.colors, tr.texCoords, locArrayBuffer, locOffset + 2 * locElementLen) : new cc.V3F_C4B_T2F(null, null, null, locArrayBuffer, locOffset + 2 * locElementLen);
            this._br = br ? new cc.V3F_C4B_T2F(br.vertices, br.colors, br.texCoords, locArrayBuffer, locOffset + 3 * locElementLen) : new cc.V3F_C4B_T2F(null, null, null, locArrayBuffer, locOffset + 3 * locElementLen);
        };
        cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT = 96;
        _p = cc.V3F_C4B_T2F_Quad.prototype;
        _p._getTL = function() {
            return this._tl;
        };
        _p._setTL = function(tlValue) {
            var locTl = this._tl;
            locTl.vertices = tlValue.vertices;
            locTl.colors = tlValue.colors;
            locTl.texCoords = tlValue.texCoords;
        };
        _p._getBL = function() {
            return this._bl;
        };
        _p._setBL = function(blValue) {
            var locBl = this._bl;
            locBl.vertices = blValue.vertices;
            locBl.colors = blValue.colors;
            locBl.texCoords = blValue.texCoords;
        };
        _p._getTR = function() {
            return this._tr;
        };
        _p._setTR = function(trValue) {
            var locTr = this._tr;
            locTr.vertices = trValue.vertices;
            locTr.colors = trValue.colors;
            locTr.texCoords = trValue.texCoords;
        };
        _p._getBR = function() {
            return this._br;
        };
        _p._setBR = function(brValue) {
            var locBr = this._br;
            locBr.vertices = brValue.vertices;
            locBr.colors = brValue.colors;
            locBr.texCoords = brValue.texCoords;
        };
        _p._getArrayBuffer = function() {
            return this._arrayBuffer;
        };
        _p.tl;
        cc.js.getset(_p, "tl", _p._getTL, _p._setTL);
        _p.tr;
        cc.js.getset(_p, "tr", _p._getTR, _p._setTR);
        _p.bl;
        cc.js.getset(_p, "bl", _p._getBL, _p._setBL);
        _p.br;
        cc.js.getset(_p, "br", _p._getBR, _p._setBR);
        _p.arrayBuffer;
        cc.js.get(_p, "arrayBuffer", _p._getArrayBuffer);
        cc.V3F_C4B_T2F_QuadZero = function() {
            return new cc.V3F_C4B_T2F_Quad();
        };
        cc.V3F_C4B_T2F_QuadCopy = function(sourceQuad) {
            if (!sourceQuad) {
                return cc.V3F_C4B_T2F_QuadZero();
            }
            var srcTL = sourceQuad.tl, srcBL = sourceQuad.bl, srcTR = sourceQuad.tr, srcBR = sourceQuad.br;
            return {
                tl: {
                    vertices: {
                        x: srcTL.vertices.x,
                        y: srcTL.vertices.y,
                        z: srcTL.vertices.z
                    },
                    colors: {
                        r: srcTL.colors.r,
                        g: srcTL.colors.g,
                        b: srcTL.colors.b,
                        a: srcTL.colors.a
                    },
                    texCoords: {
                        u: srcTL.texCoords.u,
                        v: srcTL.texCoords.v
                    }
                },
                bl: {
                    vertices: {
                        x: srcBL.vertices.x,
                        y: srcBL.vertices.y,
                        z: srcBL.vertices.z
                    },
                    colors: {
                        r: srcBL.colors.r,
                        g: srcBL.colors.g,
                        b: srcBL.colors.b,
                        a: srcBL.colors.a
                    },
                    texCoords: {
                        u: srcBL.texCoords.u,
                        v: srcBL.texCoords.v
                    }
                },
                tr: {
                    vertices: {
                        x: srcTR.vertices.x,
                        y: srcTR.vertices.y,
                        z: srcTR.vertices.z
                    },
                    colors: {
                        r: srcTR.colors.r,
                        g: srcTR.colors.g,
                        b: srcTR.colors.b,
                        a: srcTR.colors.a
                    },
                    texCoords: {
                        u: srcTR.texCoords.u,
                        v: srcTR.texCoords.v
                    }
                },
                br: {
                    vertices: {
                        x: srcBR.vertices.x,
                        y: srcBR.vertices.y,
                        z: srcBR.vertices.z
                    },
                    colors: {
                        r: srcBR.colors.r,
                        g: srcBR.colors.g,
                        b: srcBR.colors.b,
                        a: srcBR.colors.a
                    },
                    texCoords: {
                        u: srcBR.texCoords.u,
                        v: srcBR.texCoords.v
                    }
                }
            };
        };
        cc.V3F_C4B_T2F_QuadsCopy = function(sourceQuads) {
            if (!sourceQuads) {
                return [];
            }
            var retArr = [];
            for (var i = 0; i < sourceQuads.length; i++) {
                retArr.push(cc.V3F_C4B_T2F_QuadCopy(sourceQuads[i]));
            }
            return retArr;
        };
        cc.V2F_C4B_T2F = function(vertices, colors, texCoords, arrayBuffer, offset) {
            this._arrayBuffer = arrayBuffer || new ArrayBuffer(cc.V2F_C4B_T2F.BYTES_PER_ELEMENT);
            this._offset = offset || 0;
            var locArrayBuffer = this._arrayBuffer, locOffset = this._offset, locElementLen = cc.Vertex2F.BYTES_PER_ELEMENT;
            this._vertices = vertices ? new cc.Vertex2F(vertices.x, vertices.y, locArrayBuffer, locOffset) : new cc.Vertex2F(0, 0, locArrayBuffer, locOffset);
            this._colors = colors ? new cc.WebGLColor(colors.r, colors.g, colors.b, colors.a, locArrayBuffer, locOffset + locElementLen) : new cc.WebGLColor(0, 0, 0, 0, locArrayBuffer, locOffset + locElementLen);
            this._texCoords = texCoords ? new cc.Tex2F(texCoords.u, texCoords.v, locArrayBuffer, locOffset + locElementLen + cc.WebGLColor.BYTES_PER_ELEMENT) : new cc.Tex2F(0, 0, locArrayBuffer, locOffset + locElementLen + cc.WebGLColor.BYTES_PER_ELEMENT);
        };
        cc.V2F_C4B_T2F.BYTES_PER_ELEMENT = 20;
        _p = cc.V2F_C4B_T2F.prototype;
        _p._getVertices = function() {
            return this._vertices;
        };
        _p._setVertices = function(verticesValue) {
            this._vertices.x = verticesValue.x;
            this._vertices.y = verticesValue.y;
        };
        _p._getColor = function() {
            return this._colors;
        };
        _p._setColor = function(colorValue) {
            var locColors = this._colors;
            locColors.r = colorValue.r;
            locColors.g = colorValue.g;
            locColors.b = colorValue.b;
            locColors.a = colorValue.a;
        };
        _p._getTexCoords = function() {
            return this._texCoords;
        };
        _p._setTexCoords = function(texValue) {
            this._texCoords.u = texValue.u;
            this._texCoords.v = texValue.v;
        };
        _p.vertices;
        cc.js.getset(_p, "vertices", _p._getVertices, _p._setVertices);
        _p.colors;
        cc.js.getset(_p, "colors", _p._getColor, _p._setColor);
        _p.texCoords;
        cc.js.getset(_p, "texCoords", _p._getTexCoords, _p._setTexCoords);
        cc.V2F_C4B_T2F_Triangle = function(a, b, c, arrayBuffer, offset) {
            this._arrayBuffer = arrayBuffer || new ArrayBuffer(cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT);
            this._offset = offset || 0;
            var locArrayBuffer = this._arrayBuffer, locOffset = this._offset, locElementLen = cc.V2F_C4B_T2F.BYTES_PER_ELEMENT;
            this._a = a ? new cc.V2F_C4B_T2F(a.vertices, a.colors, a.texCoords, locArrayBuffer, locOffset) : new cc.V2F_C4B_T2F(null, null, null, locArrayBuffer, locOffset);
            this._b = b ? new cc.V2F_C4B_T2F(b.vertices, b.colors, b.texCoords, locArrayBuffer, locOffset + locElementLen) : new cc.V2F_C4B_T2F(null, null, null, locArrayBuffer, locOffset + locElementLen);
            this._c = c ? new cc.V2F_C4B_T2F(c.vertices, c.colors, c.texCoords, locArrayBuffer, locOffset + 2 * locElementLen) : new cc.V2F_C4B_T2F(null, null, null, locArrayBuffer, locOffset + 2 * locElementLen);
        };
        cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT = 60;
        _p = cc.V2F_C4B_T2F_Triangle.prototype;
        _p._getA = function() {
            return this._a;
        };
        _p._setA = function(aValue) {
            var locA = this._a;
            locA.vertices = aValue.vertices;
            locA.colors = aValue.colors;
            locA.texCoords = aValue.texCoords;
        };
        _p._getB = function() {
            return this._b;
        };
        _p._setB = function(bValue) {
            var locB = this._b;
            locB.vertices = bValue.vertices;
            locB.colors = bValue.colors;
            locB.texCoords = bValue.texCoords;
        };
        _p._getC = function() {
            return this._c;
        };
        _p._setC = function(cValue) {
            var locC = this._c;
            locC.vertices = cValue.vertices;
            locC.colors = cValue.colors;
            locC.texCoords = cValue.texCoords;
        };
        _p.a;
        cc.js.getset(_p, "a", _p._getA, _p._setA);
        _p.b;
        cc.js.getset(_p, "b", _p._getB, _p._setB);
        _p.c;
        cc.js.getset(_p, "c", _p._getC, _p._setC);
    }, {} ],
    81: [ function(require, module, exports) {
        var JS = require("../platform/js");
        function ValueType() {}
        JS.setClassName("cc.ValueType", ValueType);
        JS.mixin(ValueType.prototype, {
            clone: false,
            equals: false,
            toString: function() {
                return "" + {};
            },
            lerp: false
        });
        cc.ValueType = ValueType;
        module.exports = ValueType;
    }, {
        "../platform/js": 62
    } ],
    82: [ function(require, module, exports) {
        var ValueType = require("./CCValueType");
        var JS = require("../platform/js");
        var FireClass = require("../platform/CCClass");
        function Vec2(x, y) {
            if (x && "object" === typeof x) {
                y = x.y;
                x = x.x;
            }
            this.x = "number" === typeof x ? x : 0;
            this.y = "number" === typeof y ? y : 0;
        }
        JS.extend(Vec2, ValueType);
        FireClass.fastDefine("cc.Vec2", Vec2, [ "x", "y" ]);
        JS.mixin(Vec2.prototype, {
            clone: function() {
                return new Vec2(this.x, this.y);
            },
            set: function(newValue) {
                this.x = newValue.x;
                this.y = newValue.y;
                return this;
            },
            equals: function(other) {
                return other && this.x === other.x && this.y === other.y;
            },
            toString: function() {
                return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ")";
            },
            lerp: function(to, ratio, out) {
                out = out || new Vec2();
                var x = this.x;
                var y = this.y;
                out.x = x + (to.x - x) * ratio;
                out.y = y + (to.y - y) * ratio;
                return out;
            },
            addSelf: function(vector) {
                this.x += vector.x;
                this.y += vector.y;
                return this;
            },
            add: function(vector, out) {
                out = out || new Vec2();
                out.x = this.x + vector.x;
                out.y = this.y + vector.y;
                return out;
            },
            subSelf: function(vector) {
                this.x -= vector.x;
                this.y -= vector.y;
                return this;
            },
            sub: function(vector, out) {
                out = out || new Vec2();
                out.x = this.x - vector.x;
                out.y = this.y - vector.y;
                return out;
            },
            mulSelf: function(num) {
                this.x *= num;
                this.y *= num;
                return this;
            },
            mul: function(num, out) {
                out = out || new Vec2();
                out.x = this.x * num;
                out.y = this.y * num;
                return out;
            },
            scaleSelf: function(vector) {
                this.x *= vector.x;
                this.y *= vector.y;
                return this;
            },
            scale: function(vector, out) {
                out = out || new Vec2();
                out.x = this.x * vector.x;
                out.y = this.y * vector.y;
                return out;
            },
            divSelf: function(num) {
                this.x /= num;
                this.y /= num;
                return this;
            },
            div: function(num, out) {
                out = out || new Vec2();
                out.x = this.x / num;
                out.y = this.y / num;
                return out;
            },
            negSelf: function() {
                this.x = -this.x;
                this.y = -this.y;
                return this;
            },
            neg: function(out) {
                out = out || new Vec2();
                out.x = -this.x;
                out.y = -this.y;
                return out;
            },
            dot: function(vector) {
                return this.x * vector.x + this.y * vector.y;
            },
            cross: function(vector) {
                return this.y * vector.x - this.x * vector.y;
            },
            mag: function() {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            magSqr: function() {
                return this.x * this.x + this.y * this.y;
            },
            normalizeSelf: function() {
                var magSqr = this.x * this.x + this.y * this.y;
                if (1 === magSqr) {
                    return this;
                }
                if (0 === magSqr) {
                    console.warn("Can't normalize zero vector");
                    return this;
                }
                var invsqrt = 1 / Math.sqrt(magSqr);
                this.x *= invsqrt;
                this.y *= invsqrt;
                return this;
            },
            normalize: function(out) {
                out = out || new Vec2();
                out.x = this.x;
                out.y = this.y;
                out.normalizeSelf();
                return out;
            },
            angle: function(vector) {
                var magSqr1 = this.magSqr();
                var magSqr2 = vector.magSqr();
                if (0 === magSqr1 || 0 === magSqr2) {
                    console.warn("Can't get angle between zero vector");
                    return 0;
                }
                var dot = this.dot(vector);
                var theta = dot / Math.sqrt(magSqr1 * magSqr2);
                theta = cc.clampf(theta, -1, 1);
                return Math.acos(theta);
            },
            signAngle: function(vector) {
                return Math.atan2(this.y, this.x) - Math.atan2(vector.y, vector.x);
            },
            rotate: function(radians, out) {
                out = out || new Vec2();
                out.x = this.x;
                out.y = this.y;
                return out.rotateSelf(radians);
            },
            rotateSelf: function(radians) {
                var sin = Math.sin(radians);
                var cos = Math.cos(radians);
                var x = this.x;
                this.x = cos * x - sin * this.y;
                this.y = sin * x + cos * this.y;
                return this;
            }
        });
        JS.get(Vec2, "ONE", function() {
            return new Vec2(1, 1);
        });
        JS.get(Vec2, "ZERO", function() {
            return new Vec2(0, 0);
        });
        JS.get(Vec2, "UP", function() {
            return new Vec2(0, 1);
        });
        JS.get(Vec2, "RIGHT", function() {
            return new Vec2(1, 0);
        });
        cc.Vec2 = Vec2;
        cc.v2 = function v2(x, y) {
            return new Vec2(x, y);
        };
        cc.p = cc.v2;
        cc.pointEqualToPoint = function(point1, point2) {
            return point1 && point2 && point1.x === point2.x && point1.y === point2.y;
        };
        module.exports = cc.Vec2;
    }, {
        "../platform/CCClass": 53,
        "../platform/js": 62,
        "./CCValueType": 81
    } ],
    83: [ function(require, module, exports) {
        require("./CCValueType");
        require("./CCEnum");
        require("./CCVec2");
        require("./CCPointExtension");
        require("./CCSize");
        require("./CCRect");
        require("./CCColor");
        require("./CCTypes");
        require("./CCAffineTransform");
        require("./CCTypesWebGL");
    }, {
        "./CCAffineTransform": 73,
        "./CCColor": 74,
        "./CCEnum": 75,
        "./CCPointExtension": 76,
        "./CCRect": 77,
        "./CCSize": 78,
        "./CCTypes": 79,
        "./CCTypesWebGL": 80,
        "./CCValueType": 81,
        "./CCVec2": 82
    } ],
    84: [ function(require, module, exports) {
        var ParticleAsset = cc.Class({
            name: "cc.ParticleAsset",
            "extends": cc.RawAsset
        });
        cc.ParticleAsset = module.exports = ParticleAsset;
    }, {} ],
    85: [ function(require, module, exports) {
        var EmitterMode = cc.Enum({
            GRAVITY: 0,
            RADIUS: 1
        });
        var PositionType = cc.Enum({
            FREE: 0,
            RELATIVE: 1,
            GROUPED: 2
        });
        var properties = {
            preview: {
                "default": true,
                editorOnly: true,
                notify: false,
                animatable: false
            },
            _custom: false,
            custom: {
                get: function() {
                    return this._custom;
                },
                set: function(value) {
                    if (false) {
                        return cc.warn("Custom should not be false if file is not specified.");
                    }
                    if (this._custom !== value) {
                        this._custom = value;
                        if (value) {
                            this._applyCustoms();
                        } else {
                            this._applyFile();
                        }
                        if (false) {
                            cc.engine.repaintInEditMode();
                        }
                    }
                },
                animatable: false
            },
            _file: {
                "default": "",
                url: cc.ParticleAsset
            },
            file: {
                get: function() {
                    return this._file;
                },
                set: function(value, force) {
                    if (this._file !== value || false) {
                        this._file = value;
                        if (value) {
                            this._applyFile();
                            cc.engine.repaintInEditMode();
                        } else {
                            this.custom = true;
                        }
                    }
                },
                animatable: false,
                url: cc.ParticleAsset
            },
            _texture: {
                "default": "",
                url: cc.Texture2D
            },
            texture: {
                get: function() {
                    return this._texture;
                },
                set: function(value) {
                    this._texture = value;
                    this._sgNode.texture = value ? cc.textureCache.addImage(value) : null;
                },
                url: cc.Texture2D
            },
            particleCount: {
                get: function() {
                    return this._sgNode.particleCount;
                },
                set: function(value) {
                    this._sgNode.particleCount = value;
                },
                visible: false
            },
            playOnLoad: true,
            _autoRemoveOnFinish: false,
            autoRemoveOnFinish: {
                get: function() {
                    return this._autoRemoveOnFinish;
                },
                set: function(value) {
                    if (this._autoRemoveOnFinish !== value) {
                        this._autoRemoveOnFinish = value;
                        if (true) {
                            this._applyAutoRemove();
                        }
                    }
                },
                animatable: false
            },
            active: {
                get: function() {
                    return this._sgNode ? this._sgNode.isActive() : false;
                },
                visible: false
            }
        };
        var CustomProps = function() {
            var DefaultValues = {
                totalParticles: 150,
                duration: -1,
                emissionRate: 10,
                life: 1,
                lifeVar: 0,
                startColor: cc.Color.WHITE,
                startColorVar: cc.Color.BLACK,
                endColor: cc.color(255, 255, 255, 0),
                endColorVar: cc.color(0, 0, 0, 0),
                angle: 90,
                angleVar: 20,
                startSize: 50,
                startSizeVar: 0,
                endSize: 0,
                endSizeVar: 0,
                startSpin: 0,
                startSpinVar: 0,
                endSpin: 0,
                endSpinVar: 0,
                sourcePos: cc.p(0, 0),
                posVar: cc.p(0, 0),
                positionType: PositionType.FREE,
                emitterMode: EmitterMode.GRAVITY,
                gravity: cc.p(0, 0),
                speed: 180,
                speedVar: 50,
                tangentialAccel: 80,
                tangentialAccelVar: 0,
                radialAccel: 0,
                radialAccelVar: 0,
                rotationIsDir: false,
                startRadius: 0,
                startRadiusVar: 0,
                endRadius: 0,
                endRadiusVar: 0,
                rotatePerS: 0,
                rotatePerSVar: 0
            };
            var props = Object.keys(DefaultValues);
            for (var i = 0; i < props.length; ++i) {
                var prop = props[i];
                !function(prop, defaultValue) {
                    var internalProp = "_" + prop;
                    properties[internalProp] = defaultValue;
                    var type = defaultValue.constructor;
                    var propDef = properties[prop] = {};
                    if (cc.isChildClassOf(type, cc.ValueType)) {
                        propDef.get = function() {
                            return new type(this[internalProp]);
                        };
                        propDef.type = type;
                    } else {
                        propDef.get = function() {
                            return this[internalProp];
                        };
                    }
                    if (cc.isChildClassOf(type, cc.ValueType)) {
                        propDef.set = function(value) {
                            this[internalProp] = new type(value);
                            this._sgNode[prop] = value;
                        };
                    } else {
                        if (false) {
                            propDef.set = function(value) {
                                this[internalProp] = value;
                                if (!isNaN(value)) {
                                    this._sgNode[prop] = value;
                                } else {
                                    cc.error("The new %s must not be NaN", prop);
                                }
                            };
                        } else {
                            propDef.set = function(value) {
                                this[internalProp] = value;
                                this._sgNode[prop] = value;
                            };
                        }
                    }
                }(prop, DefaultValues[prop]);
            }
            return props;
        }();
        properties.positionType.type = PositionType;
        properties.emitterMode.type = EmitterMode;
        var ParticleSystem = cc.Class({
            name: "cc.ParticleSystem",
            "extends": cc._ComponentInSG,
            editor: false,
            ctor: function() {
                this._previewTimer = null;
                this._focused = false;
                this._willStart = false;
            },
            properties: properties,
            statics: {
                DURATION_INFINITY: -1,
                START_SIZE_EQUAL_TO_END_SIZE: -1,
                START_RADIUS_EQUAL_TO_END_RADIUS: -1,
                EmitterMode: EmitterMode,
                PositionType: PositionType
            },
            onLoad: function() {
                this._super();
                if (true) {
                    if (this.playOnLoad) {
                        this.resetSystem();
                    }
                    this._applyAutoRemove();
                }
            },
            onDestroy: function() {
                if (this._autoRemoveOnFinish) {
                    this.autoRemoveOnFinish = false;
                }
                this._super();
            },
            onFocusInEditor: false,
            onLostFocusInEditor: false,
            _createSgNode: function() {
                return new _ccsg.ParticleSystem();
            },
            _initSgNode: function() {
                var sgNode = this._sgNode;
                var loadCustomAfterFile = false;
                if (this._file) {
                    var missCustomTexture = this._custom && !this._texture;
                    loadCustomAfterFile = missCustomTexture;
                    this._applyFile(loadCustomAfterFile && this._applyCustoms.bind(this));
                }
                if (this._custom && !loadCustomAfterFile) {
                    this._applyCustoms();
                }
                sgNode.stopSystem();
            },
            addParticle: function() {
                return this._sgNode.addParticle();
            },
            stopSystem: function() {
                this._sgNode.stopSystem();
            },
            resetSystem: function() {
                this._sgNode.resetSystem();
            },
            isFull: function() {
                return this.particleCount >= this._totalParticles;
            },
            setDisplayFrame: function(spriteFrame) {
                if (!spriteFrame) {
                    return;
                }
                var texture = spriteFrame.getTexture();
                if (texture) {
                    this._texture = texture.url;
                }
                this._sgNode.setDisplayFrame(spriteFrame);
            },
            setTextureWithRect: function(texture, rect) {
                if (texture instanceof cc.Texture2D) {
                    this._texture = texture.url;
                }
                this._sgNode.setTextureWithRect(texture, rect);
            },
            _applyFile: function(done) {
                var sgNode = this._sgNode;
                var file = this._file;
                if (file) {
                    var self = this;
                    cc.loader.load(file, function(err, results) {
                        if (err) {
                            throw err;
                        }
                        sgNode.particleCount = 0;
                        var active = sgNode.isActive();
                        sgNode.initWithFile(file);
                        if (!active) {
                            sgNode.stopSystem();
                        }
                        var sourcePos = sgNode.getPosition();
                        if (false) {
                            cc.log('Discard sourcePosition: %s from "%s", you can set position in the node directly.', sourcePos, cc.path.basename(file));
                        }
                        sgNode.setPosition(0, 0);
                        if (true) {
                            self._applyAutoRemove();
                        }
                        if (done) {
                            done();
                        }
                    });
                }
            },
            _applyCustoms: function() {
                var sgNode = this._sgNode;
                var active = sgNode.isActive();
                for (var i = 0; i < CustomProps.length; i++) {
                    var prop = CustomProps[i];
                    sgNode[prop] = this["_" + prop];
                }
                if (this._texture) {
                    sgNode.texture = cc.textureCache.addImage(this._texture);
                }
                if (!active) {
                    sgNode.stopSystem();
                }
                if (true) {
                    this._applyAutoRemove();
                }
            },
            _applyAutoRemove: function() {
                var sgNode = this._sgNode;
                var autoRemove = this._autoRemoveOnFinish;
                sgNode.autoRemoveOnFinish = autoRemove;
                if (autoRemove) {
                    cc.assert(!sgNode.onExit);
                    var self = this;
                    sgNode.onExit = function() {
                        _ccsg.Node.prototype.onExit.call(this);
                        self.node.destroy();
                    };
                } else {
                    if (sgNode.hasOwnProperty("onExit")) {
                        sgNode.onExit = _ccsg.Node.prototype.onExit;
                    }
                }
            }
        });
        cc.ParticleSystem = module.exports = ParticleSystem;
    }, {} ],
    86: [ function(require, module, exports) {
        require("./cocos2d/core");
        require("./cocos2d/animation");
        require("./cocos2d/particle/CCParticleAsset");
        if (true) {
            require("./cocos2d/particle/CCParticleSystem");
        }
        require("./extensions/spine");
    }, {
        "./cocos2d/animation": 11,
        "./cocos2d/core": 51,
        "./cocos2d/particle/CCParticleAsset": 84,
        "./cocos2d/particle/CCParticleSystem": 85,
        "./extensions/spine": 88
    } ],
    87: [ function(require, module, exports) {
        var SpineAsset = cc.Class({
            name: "sp.SpineAsset",
            "extends": cc.RawAsset
        });
        sp.SpineAsset = module.exports = SpineAsset;
    }, {} ],
    88: [ function(require, module, exports) {
        sp = {};
        if (false) {
            require("./Skeleton");
            require("./SkeletonCanvasRenderCmd");
            require("./SkeletonWebGLRenderCmd");
            require("./SkeletonAnimation");
        }
        require("./SpineAsset");
    }, {
        "./Skeleton": 103,
        "./SkeletonAnimation": 103,
        "./SkeletonCanvasRenderCmd": 103,
        "./SkeletonWebGLRenderCmd": 103,
        "./SpineAsset": 87
    } ],
    89: [ function(require, module, exports) {
        "use strict";
        cc.initEngine = function(config, cb) {
            require("script/jsb.js");
            cc._renderType = cc.game.RENDER_TYPE_OPENGL;
            cc._initDebugSetting(config[cc.game.CONFIG_KEY.debugMode]);
            cc._engineLoaded = true;
            cc.log(cc.ENGINE_VERSION);
            if (cb) {
                cb();
            }
        };
        require("./jsb-predefine");
        require("./jsb-game");
        require("./jsb-director");
        require("./jsb-tex-sprite-frame");
        require("./jsb-scale9sprite");
        require("./jsb-label");
        require("./jsb-particle");
        require("./jsb-enums");
        require("./jsb-event");
        require("./jsb-etc");
        var _engineNumberVersion = function() {
            var result = /Cocos2d\-JS\sv([\d]+)\.([\d]+)/.exec(cc.ENGINE_VERSION);
            if (result && result[1]) {
                return {
                    major: parseInt(result[1]),
                    minor: parseInt(result[2])
                };
            } else {
                return null;
            }
        }();
        if (_engineNumberVersion) {
            if (3 === _engineNumberVersion.major) {
                if (_engineNumberVersion.minor < 6) {
                    require("./versions/jsb-polyfill-v3.5");
                }
                if (_engineNumberVersion.minor < 9) {
                    require("./versions/jsb-polyfill-v3.8");
                }
                if (_engineNumberVersion.minor < 10) {
                    require("./versions/jsb-polyfill-v3.9");
                }
            }
        }
        var log = function() {
            console.log.call(console, cc.formatStr.apply(null, arguments));
        };
        cc.log = log;
        cc.error = log;
        cc.warn = log;
        cc.info = log;
    }, {
        "./jsb-director": 90,
        "./jsb-enums": 91,
        "./jsb-etc": 92,
        "./jsb-event": 93,
        "./jsb-game": 94,
        "./jsb-label": 95,
        "./jsb-particle": 96,
        "./jsb-predefine": 97,
        "./jsb-scale9sprite": 98,
        "./jsb-tex-sprite-frame": 99,
        "./versions/jsb-polyfill-v3.5": 100,
        "./versions/jsb-polyfill-v3.8": 101,
        "./versions/jsb-polyfill-v3.9": 102,
        "script/jsb.js": void 0
    } ],
    90: [ function(require, module, exports) {
        "use strict";
        cc.js.mixin(cc.director, {
            sharedInit: function() {
                if (cc.AnimationManager) {
                    this._animationManager = new cc.AnimationManager();
                    this.getScheduler().scheduleUpdate(this._animationManager, cc.Scheduler.PRIORITY_SYSTEM, false);
                } else {
                    this._animationManager = null;
                }
                cc._widgetManager.init(this);
            },
            reset: function() {
                this.purgeDirector();
                if (cc.eventManager) {
                    cc.eventManager.setEnabled(true);
                }
                var actionManager = this.getActionManager();
                if (actionManager) {
                    this.getScheduler().scheduleUpdate(actionManager, cc.Scheduler.PRIORITY_SYSTEM, false);
                }
                if (this._animationManager) {
                    this.getScheduler().scheduleUpdate(this._animationManager, cc.Scheduler.PRIORITY_SYSTEM, false);
                }
                this.startAnimation();
            },
            getAnimationManager: function() {
                return this._animationManager;
            },
            getScene: function() {
                return this._scene;
            },
            runScene: function(scene, onBeforeLoadScene) {
                cc.assert(scene, cc._LogInfos.Director.pushScene);
                var i, node, game = cc.game;
                var persistNodes = game._persistRootNodes;
                for (i = persistNodes.length - 1; i >= 0; --i) {
                    node = persistNodes[i];
                    game._ignoreRemovePersistNode = node;
                    node.parent = null;
                    game._ignoreRemovePersistNode = null;
                }
                var oldScene = this._scene;
                if (cc.isValid(oldScene)) {
                    oldScene.destroy();
                }
                this._scene = null;
                cc.Object._deferredDestroy();
                if (onBeforeLoadScene) {
                    onBeforeLoadScene();
                }
                this.emit(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, scene);
                var sgScene = scene;
                if (scene instanceof cc.Scene) {
                    scene._load();
                    this._scene = scene;
                    sgScene = scene._sgNode;
                    for (i = 0; i < persistNodes.length; ++i) {
                        node = persistNodes[i];
                        node.parent = scene;
                    }
                }
                if (!this.getRunningScene()) {
                    this.runWithScene(sgScene);
                } else {
                    this.once(cc.Director.EVENT_AFTER_DRAW, function() {
                        this.replaceScene(sgScene);
                    });
                }
                if (scene instanceof cc.Scene) {
                    scene._activate();
                }
            },
            loadScene: function(sceneName, onLaunched, onUnloaded) {
                var uuid, info;
                if (this._loadingScene) {
                    cc.error('[loadScene] Failed to load scene "%s" because "%s" is already loading', sceneName, this._loadingScene);
                    return false;
                }
                if ("string" === typeof sceneName) {
                    if (!sceneName.endsWith(".fire")) {
                        sceneName += ".fire";
                    }
                    if ("/" !== sceneName[0] && !sceneName.startsWith("db://assets/")) {
                        sceneName = "/" + sceneName;
                    }
                    for (var i = 0; i < cc.game._sceneInfos.length; i++) {
                        info = cc.game._sceneInfos[i];
                        var url = info.url;
                        if (url.endsWith(sceneName)) {
                            uuid = info.uuid;
                            break;
                        }
                    }
                } else {
                    info = cc.game._sceneInfos[sceneName];
                    if ("object" === typeof info) {
                        uuid = info.uuid;
                    } else {
                        cc.error("[loadScene] The scene index to load (%s) is out of range.", sceneName);
                        return false;
                    }
                }
                if (uuid) {
                    this._loadingScene = sceneName;
                    this._loadSceneByUuid(uuid, onLaunched, onUnloaded);
                    return true;
                } else {
                    cc.error('[loadScene] Can not load the scene "%s" because it has not been added to the build settings before play.', sceneName);
                    return false;
                }
            },
            _loadRawAssets: function(assetObjects, done) {
                var urls = assetObjects.map(function(asset) {
                    return asset.url;
                });
                var index = 0;
                var count = 30;
                var total = urls.length;
                function preload() {
                    if (index + count > total) {
                        count = total - index;
                    }
                    var assets = urls.slice(index, count);
                    index += count;
                    if (index < total) {
                        cc.loader.load(assets, preload);
                    } else {
                        done();
                    }
                }
                preload();
            },
            _loadSceneByUuid: function(uuid, onLaunched, onUnloaded) {
                cc.AssetLibrary.loadAsset(uuid, function(error, sceneAsset) {
                    var self = cc.director;
                    var scene;
                    if (error) {
                        error = "Failed to load scene: " + error;
                        cc.error(error);
                        if (false) {
                            console.assert(false, error);
                        }
                    } else {
                        var uuid = sceneAsset._uuid;
                        scene = sceneAsset.scene;
                        if (scene instanceof cc.Scene) {
                            scene._id = uuid;
                            self.runScene(scene, onUnloaded);
                        } else {
                            error = "The asset " + uuid + " is not a scene";
                            cc.error(error);
                            scene = null;
                        }
                    }
                    self._loadingScene = "";
                    if (onLaunched) {
                        onLaunched(error, scene);
                    }
                }, {
                    recordAssets: true
                });
            }
        });
        cc.EventTarget.call(cc.director);
        cc.js.addon(cc.director, cc.EventTarget.prototype);
        cc.Director.EVENT_PROJECTION_CHANGED = "director_projection_changed";
        cc.Director.EVENT_AFTER_DRAW = "director_after_draw";
        cc.Director.EVENT_BEFORE_VISIT = "director_before_visit";
        cc.Director.EVENT_AFTER_VISIT = "director_after_visit";
        cc.Director.EVENT_BEFORE_UPDATE = "director_before_update";
        cc.Director.EVENT_AFTER_UPDATE = "director_after_update";
        cc.Director.EVENT_BEFORE_SCENE_LAUNCH = "director_before_scene_launch";
        cc.Director.EVENT_COMPONENT_UPDATE = "director_component_update";
        cc.Director.EVENT_COMPONENT_LATE_UPDATE = "director_component_late_update";
        cc.eventManager.addCustomListener(cc.Director.EVENT_BEFORE_UPDATE, function() {
            var dt = 1 / 60;
            cc.director.emit(cc.Director.EVENT_BEFORE_UPDATE);
            cc.director.emit(cc.Director.EVENT_COMPONENT_UPDATE, dt);
        });
        cc.eventManager.addCustomListener(cc.Director.EVENT_AFTER_UPDATE, function() {
            var dt = 1 / 60;
            cc.director.emit(cc.Director.EVENT_COMPONENT_LATE_UPDATE, dt);
            cc.director.emit(cc.Director.EVENT_AFTER_UPDATE);
            cc.director.emit(cc.Director.EVENT_BEFORE_VISIT, this);
        });
        cc.eventManager.addCustomListener(cc.Director.EVENT_AFTER_VISIT, function() {
            cc.director.emit(cc.Director.EVENT_AFTER_VISIT, this);
        });
        cc.eventManager.addCustomListener(cc.Director.EVENT_AFTER_DRAW, function() {
            cc.director.emit(cc.Director.EVENT_AFTER_DRAW, this);
        });
    }, {} ],
    91: [ function(require, module, exports) {
        "use strict";
        cc.ProgressTimer.Type = cc.Enum({
            RADIAL: 0,
            BAR: 1
        });
        cc.EditBox.InputMode = cc.Enum({
            ANY: 0,
            EMAILADDR: 1,
            NUMERIC: 2,
            PHONENUMBER: 3,
            URL: 4,
            DECIMAL: 5,
            SINGLELINE: 6
        });
        cc.EditBox.InputFlag = cc.Enum({
            PASSWORD: 0,
            SENSITIVE: 1,
            INITIAL_CAPS_WORD: 2,
            INITIAL_CAPS_SENTENCE: 3,
            INITIAL_CAPS_ALL_CHARACTERS: 4
        });
        cc.EditBox.KeyboardReturnType = cc.Enum({
            DEFAULT: 0,
            DONE: 1,
            SEND: 2,
            SEARCH: 3,
            GO: 4
        });
        cc.TextAlignment = cc.Enum({
            LEFT: 0,
            CENTER: 1,
            RIGHT: 2
        });
        cc.VerticalTextAlignment = cc.Enum({
            TOP: 0,
            CENTER: 1,
            BOTTOM: 2
        });
        ccui.RelativeLayoutParameter.Type = cc.Enum({
            NONE: 0,
            PARENT_TOP_LEFT: 1,
            PARENT_TOP_CENTER_HORIZONTAL: 2,
            PARENT_TOP_RIGHT: 3,
            PARENT_LEFT_CENTER_VERTICAL: 4,
            CENTER_IN_PARENT: 5,
            PARENT_RIGHT_CENTER_VERTICAL: 6,
            PARENT_LEFT_BOTTOM: 7,
            PARENT_BOTTOM_CENTER_HORIZONTAL: 8,
            PARENT_RIGHT_BOTTOM: 9,
            LOCATION_ABOVE_LEFTALIGN: 10,
            LOCATION_ABOVE_CENTER: 11,
            LOCATION_ABOVE_RIGHTALIGN: 12,
            LOCATION_LEFT_OF_TOPALIGN: 13,
            LOCATION_LEFT_OF_CENTER: 14,
            LOCATION_LEFT_OF_BOTTOMALIGN: 15,
            LOCATION_RIGHT_OF_TOPALIGN: 16,
            LOCATION_RIGHT_OF_CENTER: 17,
            LOCATION_RIGHT_OF_BOTTOMALIGN: 18,
            LOCATION_BELOW_LEFTALIGN: 19,
            LOCATION_BELOW_CENTER: 20,
            LOCATION_BELOW_RIGHTALIGN: 21
        });
        ccui.Layout.Type = cc.Enum({
            ABSOLUTE: 0,
            LINEAR_VERTICAL: 1,
            LINEAR_HORIZONTAL: 2,
            RELATIVE: 3
        });
        ccui.LoadingBar.Type = cc.Enum({
            LEFT: 0,
            RIGHT: 1
        });
        ccui.ScrollView.Dir = cc.Enum({
            NONE: 0,
            VERTICAL: 1,
            HORIZONTAL: 2,
            BOTH: 3
        });
    }, {} ],
    92: [ function(require, module, exports) {
        "use strict";
        cc.js.mixin(cc.path, {
            _normalize: function(url) {
                var oldUrl = url = String(url);
                do {
                    oldUrl = url;
                    url = url.replace(this.normalizeRE, "");
                } while (oldUrl.length !== url.length);
                return url;
            },
            sep: cc.sys.os === cc.sys.OS_WINDOWS ? "\\" : "/",
            _setEndWithSep: function(path, endsWithSep) {
                var sep = cc.path.sep;
                if ("undefined" === typeof endsWithSep) {
                    endsWithSep = true;
                } else {
                    if ("string" === typeof endsWithSep) {
                        sep = endsWithSep;
                        endsWithSep = !!endsWithSep;
                    }
                }
                var endChar = path[path.length - 1];
                var oldEndWithSep = "\\" === endChar || "/" === endChar;
                if (!oldEndWithSep && endsWithSep) {
                    path += sep;
                } else {
                    if (oldEndWithSep && !endsWithSep) {
                        path = path.slice(0, -1);
                    }
                }
                return path;
            }
        });
        cc.Scheduler.prototype.scheduleUpdate = cc.Scheduler.prototype.scheduleUpdateForTarget;
        cc.Scheduler.prototype._unschedule = cc.Scheduler.prototype.unschedule;
        cc.Scheduler.prototype.unschedule = function(callback, target) {
            if ("function" === typeof target) {
                var tmp = target;
                target = callback;
                callback = tmp;
            }
            this._unschedule(target, callback);
        };
        var actionArr = [ "ActionEase", "EaseExponentialIn", "EaseExponentialOut", "EaseExponentialInOut", "EaseSineIn", "EaseSineOut", "EaseSineInOut", "EaseBounce", "EaseBounceIn", "EaseBounceOut", "EaseBounceInOut", "EaseBackIn", "EaseBackOut", "EaseBackInOut", "EaseRateAction", "EaseIn", "EaseElastic", "EaseElasticIn", "EaseElasticOut", "EaseElasticInOut", "RemoveSelf", "FlipX", "FlipY", "Place", "CallFunc", "DelayTime", "Sequence", "Spawn", "Speed", "Repeat", "RepeatForever", "Follow", "TargetedAction", "Animate", "OrbitCamera", "GridAction", "ProgressTo", "ProgressFromTo", "ActionInterval", "RotateTo", "RotateBy", "MoveBy", "MoveTo", "SkewTo", "SkewBy", "JumpTo", "JumpBy", "ScaleTo", "ScaleBy", "Blink", "FadeTo", "FadeIn", "FadeOut", "TintTo", "TintBy" ];
        function setCtorReplacer(proto) {
            var ctor = proto._ctor;
            proto._ctor = function() {
                ctor.apply(this, arguments);
                this.retain();
                this._retained = true;
            };
        }
        function setAliasReplacer(name, type) {
            var aliasName = name[0].toLowerCase() + name.substr(1);
            cc[aliasName] = function() {
                var action = type.create.apply(this, arguments);
                action.retain();
                action._retained = true;
                return action;
            };
        }
        for (var i = 0; i < actionArr.length; ++i) {
            var name = actionArr[i];
            var type = cc[name];
            if (!type) {
                continue;
            }
            var proto = type.prototype;
            setCtorReplacer(proto);
            setAliasReplacer(name, type);
        }
        function setChainFuncReplacer(proto, name) {
            var oldFunc = proto[name];
            proto[name] = function() {
                if (this._retained) {
                    this.release();
                    this._retained = false;
                }
                var newAction = oldFunc.apply(this, arguments);
                newAction.retain();
                newAction._retained = true;
                return newAction;
            };
        }
        setChainFuncReplacer(cc.ActionInterval.prototype, "repeat");
        setChainFuncReplacer(cc.ActionInterval.prototype, "repeatForever");
        setChainFuncReplacer(cc.ActionInterval.prototype, "easing");
        var jsbRunAction = cc.Node.prototype.runAction;
        cc.Node.prototype.runAction = function(action) {
            jsbRunAction.call(this, action);
            if (action._retained) {
                action.release();
                action._retained = false;
            }
        };
        function getSGTarget(target) {
            if (target instanceof cc.Component) {
                target = target.node._sgNode;
            }
            if (target instanceof cc.Node) {
                target = target._sgNode;
            }
            return target;
        }
        var jsbAddAction = cc.ActionManager.prototype.addAction;
        cc.ActionManager.prototype.addAction = function(action, target, paused) {
            target = getSGTarget(target);
            jsbAddAction.call(this, action, target, paused);
            if (action._retained) {
                action.release();
                action._retained = false;
            }
        };
        function actionMgrFuncReplacer(funcName, targetPos) {
            var proto = cc.ActionManager.prototype;
            var oldFunc = proto[funcName];
            proto[funcName] = function() {
                arguments[targetPos] = getSGTarget(arguments[targetPos]);
                return oldFunc.apply(this, arguments);
            };
        }
        var targetRelatedFuncs = [ [ "removeAllActionsFromTarget", 0 ], [ "removeActionByTag", 1 ], [ "getActionByTag", 1 ], [ "numberOfRunningActionsInTarget", 0 ], [ "pauseTarget", 0 ], [ "resumeTarget", 0 ] ];
        for (var i = 0; i < targetRelatedFuncs.length; ++i) {
            actionMgrFuncReplacer.apply(null, targetRelatedFuncs[i]);
        }
        cc.ActionManager.prototype.resumeTargets = function(targetsToResume) {
            if (!targetsToResume) {
                return;
            }
            for (var i = 0; i < targetsToResume.length; i++) {
                if (targetsToResume[i]) {
                    this.resumeTarget(targetsToResume[i]);
                }
            }
        };
        cc.ActionManager.prototype.pauseTargets = function(targetsToPause) {
            if (!targetsToPause) {
                return;
            }
            for (var i = 0; i < targetsToPause.length; i++) {
                if (targetsToPause[i]) {
                    this.pauseTarget(targetsToPause[i]);
                }
            }
        };
        window._ccsg = {
            Node: cc.Node,
            Scene: cc.Scene,
            Sprite: cc.Sprite,
            ParticleSystem: cc.ParticleSystem,
            Label: cc.Label,
            EditBox: cc.EditBox
        };
        cc._Class = cc.Class;
    }, {} ],
    93: [ function(require, module, exports) {
        "use strict";
        cc.Event.NO_TYPE = "no_type";
        cc.Event.NONE = 0;
        cc.Event.CAPTURING_PHASE = 1;
        cc.Event.AT_TARGET = 2;
        cc.Event.BUBBLING_PHASE = 3;
        cc.Event.prototype._getCurrentTarget = cc.Event.prototype.getCurrentTarget;
        cc.Event.prototype.getCurrentTarget = function() {
            return this.currentTarget || this._getCurrentTarget();
        };
        cc.Event.prototype._stopPropagation = cc.Event.prototype.stopPropagation;
        cc.Event.prototype.stopPropagation = function() {
            this._propagationStopped = true;
            this._stopPropagation();
        };
        cc.Event.prototype._isStopped = cc.Event.prototype.isStopped;
        cc.Event.prototype.isStopped = function() {
            return this._propagationStopped || this._propagationImmediateStopped || this._isStopped();
        };
        cc.js.mixin(cc.Event.prototype, {
            type: "no_type",
            target: null,
            currentTarget: null,
            eventPhase: 0,
            bubbles: false,
            _defaultPrevented: false,
            _propagationStopped: false,
            _propagationImmediateStopped: false,
            unuse: function() {
                this.type = cc.Event.NO_TYPE;
                this.target = null;
                this.currentTarget = null;
                this.eventPhase = cc.Event.NONE;
                this._defaultPrevented = false;
                this._propagationStopped = false;
                this._propagationImmediateStopped = false;
            },
            reuse: function(type, bubbles) {
                this.type = type;
                this.bubbles = bubbles || false;
            },
            preventDefault: function() {
                this._defaultPrevented = true;
            },
            stopPropagationImmediate: function() {
                this._propagationImmediateStopped = true;
            }
        });
        cc.Event.EventCustom = function(type, bubbles) {
            cc.Event.call(this, cc.Event.CUSTOM);
            this.type = type;
            this.bubbles = bubbles || false;
            this.detail = null;
        };
        cc.js.extend(cc.Event.EventCustom, cc.Event);
        cc.js.mixin(cc.Event.EventCustom.prototype, {
            setUserData: function(data) {
                this.detail = data;
            },
            getUserData: function() {
                return this.detail;
            },
            getEventName: cc.Event.prototype.getType
        });
        cc.eventManager.addListener = function(listener, nodeOrPriority) {
            if (!(listener instanceof cc.EventListener)) {
                listener = cc.EventListener.create(listener);
            }
            if ("number" === typeof nodeOrPriority) {
                if (0 === nodeOrPriority) {
                    cc.log("0 priority is forbidden for fixed priority since it's used for scene graph based priority.");
                    return;
                }
                cc.eventManager.addEventListenerWithFixedPriority(listener, nodeOrPriority);
            } else {
                var node = nodeOrPriority;
                if (nodeOrPriority instanceof cc.Component) {
                    node = nodeOrPriority.node._sgNode;
                }
                if (nodeOrPriority instanceof cc.Node) {
                    node = nodeOrPriority._sgNode;
                }
                if (node !== nodeOrPriority) {
                    var keys = Object.keys(listener);
                    for (var i = 0; i < keys.length; ++i) {
                        var key = keys[i];
                        var value = listener[key];
                        if ("function" === typeof value) {
                            listener[key] = function(realCallback) {
                                return function(event1, event2) {
                                    var event = event2 || event1;
                                    if (event) {
                                        event.target = nodeOrPriority;
                                        event.currentTarget = nodeOrPriority;
                                        event.bubbles = false;
                                        event.eventPhase = 0;
                                        event._defaultPrevented = false;
                                        event._propagationStopped = false;
                                        event._propagationImmediateStopped = false;
                                    }
                                    return realCallback.call(this, event1, event2);
                                };
                            }(value);
                        }
                    }
                }
                cc.eventManager.addEventListenerWithSceneGraphPriority(listener, node);
            }
            return listener;
        };
        cc.eventManager._removeListeners = cc.eventManager.removeListeners;
        cc.eventManager.removeListeners = function(target, recursive) {
            if (target instanceof cc.Component) {
                target = target.node._sgNode;
            }
            if (target instanceof cc.Node) {
                target = target._sgNode;
            }
            this._removeListeners(target, recursive || false);
        };
        cc.eventManager._pauseTarget = cc.eventManager.pauseTarget;
        cc.eventManager.pauseTarget = function(target, recursive) {
            if (target instanceof cc.Component) {
                target = target.node._sgNode;
            }
            if (target instanceof cc.Node) {
                target = target._sgNode;
            }
            this._pauseTarget(target, recursive || false);
        };
        cc.eventManager._resumeTarget = cc.eventManager.resumeTarget;
        cc.eventManager.resumeTarget = function(target, recursive) {
            if (target instanceof cc.Component) {
                target = target.node._sgNode;
            }
            if (target instanceof cc.Node) {
                target = target._sgNode;
            }
            this._resumeTarget(target, recursive || false);
        };
    }, {} ],
    94: [ function(require, module, exports) {
        "use strict";
        cc.js.mixin(cc.game, {
            _paused: false,
            _sceneInfos: [],
            _persistRootNodes: [],
            _ignoreRemovePersistNode: null,
            CONFIG_KEY: {
                width: "width",
                height: "height",
                engineDir: "engineDir",
                modules: "modules",
                debugMode: "debugMode",
                showFPS: "showFPS",
                frameRate: "frameRate",
                id: "id",
                renderMode: "renderMode",
                registerSystemEvent: "registerSystemEvent",
                jsList: "jsList",
                scenes: "scenes"
            },
            pause: function() {
                this._paused = true;
                cc.director.pause();
            },
            resume: function() {
                this._paused = false;
                cc.director.resume();
            },
            isPaused: function() {
                return this._paused;
            },
            prepare: function(cb) {
                var self = this, config = self.config, CONFIG_KEY = self.CONFIG_KEY;
                this._loadConfig();
                if (this._prepared) {
                    if (cb) {
                        cb();
                    }
                    return;
                }
                if (this._prepareCalled) {
                    return;
                }
                if (cc._engineLoaded) {
                    this._prepareCalled = true;
                    cc.director.sharedInit();
                    var jsList = config[CONFIG_KEY.jsList];
                    if (jsList) {
                        cc.loader.loadJs(jsList, function(err) {
                            if (err) {
                                throw new Error(err);
                            }
                            self._prepared = true;
                            if (cb) {
                                cb();
                            }
                        });
                    } else {
                        if (cb) {
                            cb();
                        }
                    }
                    return;
                }
                cc.initEngine(this.config, function() {
                    self.prepare(cb);
                });
            },
            run: function(config, onStart) {
                if ("function" === typeof config) {
                    cc.game.onStart = config;
                } else {
                    if (config) {
                        cc.game.config = config;
                    }
                    if ("function" === typeof onStart) {
                        cc.game.onStart = onStart;
                    }
                }
                this.prepare(cc.game.onStart && cc.game.onStart.bind(cc.game));
            },
            addPersistRootNode: function(node) {
                if (!(node instanceof cc.Node)) {
                    return;
                }
                var index = this._persistRootNodes.indexOf(node);
                if (-1 === index) {
                    var scene = cc.director._scene;
                    if (cc.isValid(scene)) {
                        if (!node.parent) {
                            node.parent = scene;
                        } else {
                            if (!(node.parent instanceof cc.Scene)) {
                                cc.warn("The node can not be made persist because it's not under root node.");
                                return;
                            } else {
                                if (node.parent !== scene) {
                                    cc.warn("The node can not be made persist because it's not in current scene.");
                                    return;
                                }
                            }
                        }
                        this._persistRootNodes.push(node);
                        node._persistNode = true;
                    }
                }
            },
            removePersistRootNode: function(node) {
                if (node !== this._ignoreRemovePersistNode) {
                    var index = this._persistRootNodes.indexOf(node);
                    if (-1 !== index) {
                        this._persistRootNodes.splice(index, 1);
                    }
                    node._persistNode = false;
                }
            },
            isPersistRootNode: function(node) {
                return node._persistNode;
            },
            _loadConfig: function() {
                if (this.config) {
                    this._initConfig(this.config);
                } else {
                    try {
                        var txt = jsb.fileUtils.getStringFromFile("project.json");
                        var data = JSON.parse(txt);
                        this._initConfig(data || {});
                    } catch (e) {
                        console.log("Failed to read or parse project.json");
                        this._initConfig({});
                    }
                }
            },
            _initConfig: function(config) {
                var CONFIG_KEY = this.CONFIG_KEY;
                config[CONFIG_KEY.showFPS] = config[CONFIG_KEY.showFPS] || true;
                config[CONFIG_KEY.engineDir] = config[CONFIG_KEY.engineDir] || "frameworks/cocos2d-html5";
                if (null == config[CONFIG_KEY.debugMode]) {
                    config[CONFIG_KEY.debugMode] = 0;
                }
                config[CONFIG_KEY.frameRate] = config[CONFIG_KEY.frameRate] || 60;
                if (null == config[CONFIG_KEY.renderMode]) {
                    config[CONFIG_KEY.renderMode] = 0;
                }
                this._sceneInfos = this._sceneInfos.concat(config[CONFIG_KEY.scenes]);
                cc.director.setDisplayStats(this.config[CONFIG_KEY.showFPS]);
                cc.director.setAnimationInterval(1 / this.config[CONFIG_KEY.frameRate]);
                this.config = config;
            }
        });
        cc.EventTarget.call(cc.game);
        cc.js.addon(cc.game, cc.EventTarget.prototype);
    }, {} ],
    95: [ function(require, module, exports) {
        "use strict";
        var jsbLabel = cc.Label;
        if (!jsbLabel.createWithTTF && jsbLabel.prototype.createWithTTF) {
            jsbLabel.createWithTTF = jsbLabel.prototype.createWithTTF;
        }
        jsbLabel.prototype.setHorizontalAlign = jsbLabel.prototype.setHorizontalAlignment;
        jsbLabel.prototype.setVerticalAlign = jsbLabel.prototype.setVerticalAlignment;
        if (!jsbLabel.prototype.setBMFontSize) {
            jsbLabel.prototype.setBMFontSize = function() {};
        }
        if (!jsbLabel.prototype.getBMFontSize) {
            jsbLabel.prototype.getBMFontSize = function() {};
        }
        if (!jsbLabel.prototype.setOverflow) {
            jsbLabel.prototype.setOverflow = function() {};
        }
        if (!jsbLabel.prototype.getOverflow) {
            jsbLabel.prototype.getOverflow = function() {};
        }
        jsbLabel.prototype.setFontSize = function(size) {
            if (this._labelType === _ccsg.Label.Type.SystemFont) {
                this.setSystemFontSize(size);
            } else {
                if (this._labelType === _ccsg.Label.Type.BMFont) {
                    this.setBMFontSize(size);
                } else {
                    if (this._labelType === _ccsg.Label.Type.TTF) {
                        var ttfConfig = this.getTTFConfig();
                        ttfConfig.fontSize = size;
                        this.setTTFConfig(ttfConfig);
                    }
                }
            }
        };
        jsbLabel.prototype.enableWrapText = jsbLabel.prototype.enableWrap || function() {};
        jsbLabel.prototype.isWrapTextEnabled = jsbLabel.prototype.isWrapEnabled || function() {};
        jsbLabel.prototype._setLineHeight = jsbLabel.prototype.setLineHeight;
        jsbLabel.prototype.setLineHeight = function(height) {
            if (this._labelType !== _ccsg.Label.Type.SystemFont) {
                this._setLineHeight(height);
            }
        };
        jsbLabel.prototype._setTTFConfig = jsbLabel.prototype.setTTFConfig;
        jsbLabel.prototype.setTTFConfig = function(config) {
            this._setTTFConfig(config);
            this._ttfConfig = config;
        };
        jsbLabel.prototype.getTTFConfig = function() {
            return this._ttfConfig;
        };
        jsbLabel.prototype.setContentSize = function(size, height) {
            if (void 0 !== height) {
                this.setDimensions(size, height);
            } else {
                this.setDimensions(size.width, size.height);
            }
        };
        jsbLabel.prototype.setFontFileOrFamily = function(fontHandle) {
            fontHandle = fontHandle || "";
            var extName = cc.path.extname(fontHandle);
            if (null === extName) {
                this._labelType = _ccsg.Label.Type.SystemFont;
                this.setSystemFontName(fontHandle);
            } else {
                fontHandle = cc.path.join(cc.loader.resPath, fontHandle);
                if (".ttf" === extName) {
                    this._labelType = _ccsg.Label.Type.TTF;
                } else {
                    if (".fnt" === extName) {
                        this._labelType = _ccsg.Label.Type.BMFont;
                        this.setBMFontFilePath(fontHandle, cc.v2(0, 0), this.getBMFontSize());
                    }
                }
            }
        };
        cc.Label = function(string, fontHandle) {
            fontHandle = fontHandle || "Arial";
            var extName = cc.path.extname(fontHandle);
            var type = _ccsg.Label.Type.TTF;
            var label;
            if (".ttf" === extName) {
                var ttfConfig = {
                    fontFilePath: fontHandle,
                    fontSize: 40,
                    outlineSize: 0,
                    glyphs: 0,
                    customGlyphs: "",
                    distanceFieldEnable: false
                };
                label = jsbLabel.createWithTTF(ttfConfig, string, 40);
                label._ttfConfig = ttfConfig;
            } else {
                if (".fnt" === extName) {
                    label = jsbLabel.createWithBMFont(fontHandle, string);
                    type = _ccsg.Label.Type.BMFont;
                } else {
                    label = jsbLabel.createWithSystemFont(string || "", fontHandle, 40);
                    type = _ccsg.Label.Type.SystemFont;
                }
            }
            label._labelType = type;
            return label;
        };
        cc.Label.Type = cc.Enum({
            TTF: 0,
            BMFont: 1
        });
        cc.Label.Overflow = cc.Enum({
            CLAMP: 1,
            SHRINK: 2,
            RESIZE_HEIGHT: 3
        });
    }, {} ],
    96: [ function(require, module, exports) {
        "use strict";
        cc.ParticleSystem.Mode = cc.Enum({
            GRAVITY: 0,
            RADIUS: 1
        });
        cc.ParticleSystem.Type = cc.Enum({
            FREE: 0,
            RELATIVE: 1,
            GROUPED: 2
        });
        var funcNames = [ {
            tangentialAccel: "setTangentialAccel",
            tangentialAccelVar: "setTangentialAccelVar",
            radialAccel: "setRadialAccel",
            radialAccelVar: "setRadialAccelVar",
            rotationIsDir: "setRotationIsDir",
            gravity: "setGravity",
            speed: "setSpeed",
            speedVar: "setSpeedVar"
        }, {
            startRadius: "setStartRadius",
            startRadiusVar: "setStartRadiusVar",
            endRadius: "setEndRadius",
            endRadiusVar: "setEndRadiusVar",
            rotatePerS: "setRotatePerSecond",
            rotatePerSVar: "setRotatePerSecondVar"
        } ];
        function getReplacer(oldFunc, mode) {
            return function(value) {
                if (this.getEmitterMode() === mode) {
                    oldFunc.call(this, value);
                }
            };
        }
        var proto = cc.ParticleSystem.prototype;
        for (var mode = 0; mode < funcNames.length; mode++) {
            var modeFuncs = funcNames[mode];
            for (var propName in modeFuncs) {
                var funcName = modeFuncs[propName];
                var func = proto[funcName];
                proto[funcName] = getReplacer(func, mode);
                var getter = funcName.replace("set", "get");
                cc.defineGetterSetter(proto, propName, proto[getter], proto[funcName]);
            }
        }
    }, {} ],
    97: [ function(require, module, exports) {
        cc.initEngine({
            debugMode: cc.game.DEBUG_MODE_INFO
        });
        if (!cc.ClassManager) {
            cc.ClassManager = window.ClassManager || {
                id: 0 | 998 * Math.random(),
                instanceId: 0 | 998 * Math.random(),
                getNewID: function() {
                    return this.id++;
                },
                getNewInstanceId: function() {
                    return this.instanceId++;
                }
            };
        }
        if (false) {
            cc._Test = {};
        }
        require("../cocos2d/core/platform/js");
        require("../cocos2d/core/value-types");
        require("../cocos2d/core/utils/find");
        require("../cocos2d/core/event");
        require("../CCDebugger");
    }, {
        "../CCDebugger": 1,
        "../cocos2d/core/event": 50,
        "../cocos2d/core/platform/js": 62,
        "../cocos2d/core/utils/find": 70,
        "../cocos2d/core/value-types": 83
    } ],
    98: [ function(require, module, exports) {
        "use strict";
        cc.Scale9Sprite.state = {
            NORMAL: 0,
            GRAY: 1
        };
        cc.Scale9Sprite.RenderingType = cc.Enum({
            SIMPLE: 0,
            SLICED: 1,
            TILED: 2,
            FILLED: 3
        });
        cc.Scale9Sprite.FillType = cc.Enum({
            Horizontal: 0,
            Vertical: 1,
            RADIAL: 2
        });
        var s9sPrototype = cc.Scale9Sprite.prototype;
        s9sPrototype.setFillType = function() {};
        s9sPrototype.setFillCenter = function() {};
        s9sPrototype.setFillStart = function() {};
        s9sPrototype.setFillRange = function() {};
        s9sPrototype.enableTrimmedContentSize = function() {};
        s9sPrototype._lazyInit = function() {
            if (this._onceInit) {
                return;
            }
            this._onceInit = true;
            this._insets = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            };
            this._trim = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            };
            this._contentSizeTrimmed = new cc.Size(0, 0);
            this._anchorPointTrimmed = new cc.Vec2(0, 0);
            this._sizeAfterTrimmed = new cc.Size(0, 0);
        };
        s9sPrototype._applyInsetsContentAnchor = function() {
            var renderingType = this._renderingType || this.getRenderingType && this.getRenderingType();
            var trimScaleX = 1;
            var trimScaleY = 1;
            if (renderingType === cc.Scale9Sprite.RenderingType.SIMPLE) {
                trimScaleX = this._contentSizeTrimmed.width / this._sizeAfterTrimmed.width;
                trimScaleY = this._contentSizeTrimmed.height / this._sizeAfterTrimmed.height;
            }
            var contentSize = new cc.Size(0, 0);
            contentSize.width = this._contentSizeTrimmed.width + (this._trim.left + this._trim.right) * trimScaleX;
            contentSize.height = this._contentSizeTrimmed.height + (this._trim.top + this._trim.bottom) * trimScaleY;
            this._setContentSize(contentSize);
            var anchorPoint = new cc.Vec2(0, 0);
            anchorPoint.x = this._contentSizeTrimmed.width * this._anchorPointTrimmed.x + this._trim.left * trimScaleX;
            anchorPoint.y = this._contentSizeTrimmed.height * this._anchorPointTrimmed.y + this._trim.bottom * trimScaleY;
            anchorPoint.x = anchorPoint.x / contentSize.width;
            anchorPoint.y = anchorPoint.y / contentSize.height;
            this._setAnchorPoint(anchorPoint);
            var capinsets = new cc.Rect(0, 0, 0, 0);
            capinsets.x = this._trim.left + this._insets.left;
            capinsets.y = this._trim.top + this._insets.top;
            capinsets.width = this._sizeAfterTrimmed.width - this._insets.left - this._insets.right;
            capinsets.height = this._sizeAfterTrimmed.height - this._insets.top - this._insets.bottom;
            this.setCapInsets(capinsets);
        };
        s9sPrototype._setBlendFunc = s9sPrototype.setBlendFunc;
        s9sPrototype.setBlendFunc = function(blendFunc, dst) {
            if (void 0 !== dst) {
                blendFunc = {
                    src: blendFunc,
                    dst: dst
                };
            }
            this._setBlendFunc(blendFunc);
        };
        s9sPrototype._getContentSize = s9sPrototype.getContentSize;
        s9sPrototype.getContentSize = function() {
            return new cc.Size(this._contentSizeTrimmed);
        };
        s9sPrototype._setContentSize = s9sPrototype.setContentSize;
        s9sPrototype.setContentSize = function(size, height) {
            this._lazyInit();
            if (void 0 !== height) {
                size = new cc.Size(size, height);
            }
            this._contentSizeTrimmed = new cc.Size(size);
            this._applyInsetsContentAnchor();
        };
        s9sPrototype._getAnchorPoint = s9sPrototype.getAnchorPoint;
        s9sPrototype.getAnchorPoint = function() {
            return new cc.Vec2(this._anchorPointTrimmed);
        };
        s9sPrototype._setAnchorPoint = s9sPrototype.setAnchorPoint;
        s9sPrototype.setAnchorPoint = function(anchorPoint, y) {
            this._lazyInit();
            if (void 0 !== y) {
                anchorPoint = new cc.Vec2(anchorPoint, y);
            }
            this._anchorPointTrimmed = new cc.Vec2(anchorPoint);
            this._applyInsetsContentAnchor();
        };
        s9sPrototype._getInsetLeft = s9sPrototype.getInsetLeft;
        s9sPrototype._getInsetRight = s9sPrototype.getInsetRight;
        s9sPrototype._getInsetBottom = s9sPrototype.getInsetBottom;
        s9sPrototype._getInsetTop = s9sPrototype.getInsetTop;
        s9sPrototype.getInsetLeft = function() {
            return this._insets.left;
        };
        s9sPrototype.getInsetRight = function() {
            return this._insets.right;
        };
        s9sPrototype.getInsetBottom = function() {
            return this._insets.bottom;
        };
        s9sPrototype.getInsetTop = function() {
            return this._insets.top;
        };
        s9sPrototype._setInsetLeft = s9sPrototype.setInsetLeft;
        s9sPrototype.setInsetLeft = function(insetLeft) {
            this._lazyInit();
            this._insets.left = insetLeft;
            this._applyInsetsContentAnchor();
        };
        s9sPrototype._setInsetRight = s9sPrototype.setInsetRight;
        s9sPrototype.setInsetRight = function(insetRight) {
            this._lazyInit();
            this._insets.right = insetRight;
            this._applyInsetsContentAnchor();
        };
        s9sPrototype._setInsetTop = s9sPrototype.setInsetTop;
        s9sPrototype.setInsetTop = function(insetTop) {
            this._lazyInit();
            this._insets.top = insetTop;
            this._applyInsetsContentAnchor();
        };
        s9sPrototype._setInsetBottom = s9sPrototype.setInsetBottom;
        s9sPrototype.setInsetBottom = function(insetBottom) {
            this._lazyInit();
            this._insets.bottom = insetBottom;
            this._applyInsetsContentAnchor();
        };
        s9sPrototype._setSpriteFrame = s9sPrototype.setSpriteFrame;
        s9sPrototype.setSpriteFrame = function(spriteFrame) {
            this._lazyInit();
            var originalSize = spriteFrame.getOriginalSize();
            var spriteRect = spriteFrame.getRect();
            var offset = spriteFrame.getOffset();
            var leftTrim = (originalSize.width + 2 * offset.x - spriteRect.width) / 2;
            var rightTrim = originalSize.width - leftTrim - spriteRect.width;
            var bottomTrim = (originalSize.height + 2 * offset.y - spriteRect.height) / 2;
            var topTrim = originalSize.height - bottomTrim - spriteRect.height;
            this._trim.left = leftTrim;
            this._trim.right = rightTrim;
            this._trim.top = topTrim;
            this._trim.bottom = bottomTrim;
            this._sizeAfterTrimmed = new cc.Size(spriteRect.width, spriteRect.height);
            this._setSpriteFrame(spriteFrame);
            this._applyInsetsContentAnchor();
        };
    }, {} ],
    99: [ function(require, module, exports) {
        "use strict";
        cc.spriteFrameAnimationCache = cc.animationCache;
        cc.SpriteFrameAnimation = cc.Animation;
        cc.textureCache._textures = {};
        cc.textureCache.cacheImage = function(key, texture) {
            if (texture instanceof cc.Texture2D) {
                this._textures[key] = texture;
            }
        };
        cc.textureCache._getTextureForKey = cc.textureCache.getTextureForKey;
        cc.textureCache.getTextureForKey = function(key) {
            var tex = this._getTextureForKey(key);
            if (!tex) {
                tex = this._textures[key];
            }
            return tex || null;
        };
        cc.Texture2D.prototype.isLoaded = function() {
            return true;
        };
        cc.Texture2D.prototype.getPixelWidth = cc.Texture2D.prototype.getPixelsWide;
        cc.Texture2D.prototype.getPixelHeight = cc.Texture2D.prototype.getPixelsHigh;
        cc.js.mixin(cc.SpriteFrame.prototype, cc.EventTarget.prototype);
        cc.SpriteFrame.prototype.textureLoaded = function() {
            return null !== this.getTexture();
        };
        cc.SpriteFrame.prototype._initWithTexture = cc.SpriteFrame.prototype.initWithTexture;
        cc.SpriteFrame.prototype.initWithTexture = function(texture, rect, rotated, offset, originalSize, _uuid) {
            function check(texture) {
                if (texture && texture.isLoaded()) {
                    var _x, _y;
                    if (rotated) {
                        _x = rect.x + rect.height;
                        _y = rect.y + rect.width;
                    } else {
                        _x = rect.x + rect.width;
                        _y = rect.y + rect.height;
                    }
                    if (_x > texture.getPixelWidth()) {
                        cc.error(cc._LogInfos.RectWidth, _uuid);
                    }
                    if (_y > texture.getPixelHeight()) {
                        cc.error(cc._LogInfos.RectHeight, _uuid);
                    }
                }
            }
            if (2 === arguments.length) {
                rect = cc.rectPointsToPixels(rect);
            }
            offset = offset || cc.p(0, 0);
            originalSize = originalSize || rect;
            rotated = rotated || false;
            if (void 0 === this.insetTop) {
                this.insetTop = 0;
                this.insetBottom = 0;
                this.insetLeft = 0;
                this.insetRight = 0;
            }
            var locTexture;
            if (!texture && _uuid) {
                var info = cc.AssetLibrary._getAssetInfoInRuntime(_uuid);
                if (!info) {
                    cc.error('SpriteFrame: Failed to load sprite texture "%s"', _uuid);
                    return;
                }
                this._textureFilename = info.url;
                locTexture = cc.textureCache.addImage(info.url);
                this._initWithTexture(locTexture, rect, rotated, offset, originalSize);
            } else {
                if (cc.js.isString(texture)) {
                    this._textureFilename = texture;
                    locTexture = cc.textureCache.addImage(this._textureFilename);
                    this._initWithTexture(locTexture, rect, rotated, offset, originalSize);
                } else {
                    if (texture instanceof cc.Texture2D) {
                        this._textureFilename = "";
                        this._initWithTexture(texture, rect, rotated, offset, originalSize);
                    }
                }
            }
            this.emit("load");
            check(this.getTexture());
            return true;
        };
        cc.SpriteFrame.prototype._deserialize = function(data, handle) {
            var rect = data.rect ? new cc.Rect(data.rect[0], data.rect[1], data.rect[2], data.rect[3]) : void 0;
            var offset = data.offset ? new cc.Vec2(data.offset[0], data.offset[1]) : void 0;
            var size = data.originalSize ? new cc.Size(data.originalSize[0], data.originalSize[1]) : void 0;
            var rotated = 1 === data.rotated;
            this._name = data.name;
            var capInsets = data.capInsets;
            if (capInsets) {
                this.insetLeft = capInsets[0];
                this.insetTop = capInsets[1];
                this.insetRight = capInsets[2];
                this.insetBottom = capInsets[3];
            }
            var textureUuid = data.texture;
            if (textureUuid) {
                handle.result.push(this, "_textureFilenameSetter", textureUuid);
            }
            this.initWithTexture(null, rect, rotated, offset, size, textureUuid);
        };
        cc.SpriteFrame.prototype._checkRect = function(texture) {
            var rect = this.getRectInPixels();
            var maxX = rect.x, maxY = rect.y;
            if (this._rotated) {
                maxX += rect.height;
                maxY += rect.width;
            } else {
                maxX += rect.width;
                maxY += rect.height;
            }
            if (maxX > texture.getPixelWidth()) {
                cc.error(cc._LogInfos.RectWidth, texture.url);
            }
            if (maxY > texture.getPixelHeight()) {
                cc.error(cc._LogInfos.RectHeight, texture.url);
            }
        };
        var getTextureJSB = cc.SpriteFrame.prototype.getTexture;
        cc.SpriteFrame.prototype.getTexture = function() {
            var tex = getTextureJSB.call(this);
            this._texture = tex;
            return tex;
        };
        cc.js.set(cc.SpriteFrame.prototype, "_textureFilenameSetter", function(url) {
            this._textureFilename = url;
            if (url) {
                var texture = this.getTexture();
                if (this.textureLoaded()) {
                    this._checkRect(texture);
                    this.emit("load");
                } else {
                    this._texture = null;
                    this.setTexture(texture);
                }
            }
        });
        cc.js.setClassName("cc.SpriteFrame", cc.SpriteFrame);
    }, {} ],
    100: [ function(require, module, exports) {
        "use strict";
        if (!cc.Scheduler.prototype.unscheduleAllForTarget) {
            cc.Scheduler.prototype.unscheduleAllForTarget = function(target) {
                this.unscheduleAllCallbacksForTarget(target);
            };
        }
        if (!cc.Scheduler.prototype._unschedule) {
            cc.Scheduler.prototype._unschedule = cc.Scheduler.prototype.unscheduleCallbackForTarget;
        }
        cc.SpriteFrame.prototype.initWithTexture = function(texture, rect, rotated, offset, originalSize, _uuid) {
            function check(texture) {
                if (texture && texture.isLoaded()) {
                    var _x, _y;
                    if (rotated) {
                        _x = rect.x + rect.height;
                        _y = rect.y + rect.width;
                    } else {
                        _x = rect.x + rect.width;
                        _y = rect.y + rect.height;
                    }
                    if (_x > texture.getPixelWidth()) {
                        cc.error(cc._LogInfos.RectWidth, _uuid);
                    }
                    if (_y > texture.getPixelHeight()) {
                        cc.error(cc._LogInfos.RectHeight, _uuid);
                    }
                }
            }
            if (2 === arguments.length) {
                rect = cc.rectPointsToPixels(rect);
            }
            offset = cc.p(0, 0);
            originalSize = originalSize || rect;
            rotated = rotated || false;
            if (void 0 === this.insetTop) {
                this.insetTop = 0;
                this.insetBottom = 0;
                this.insetLeft = 0;
                this.insetRight = 0;
            }
            var locTexture;
            if (!texture && _uuid) {
                var info = cc.AssetLibrary._getAssetInfoInRuntime(_uuid);
                if (!info) {
                    cc.error('SpriteFrame: Failed to load sprite texture "%s"', _uuid);
                    return;
                }
                this._textureFilename = info.url;
                locTexture = cc.textureCache.addImage(info.url);
                this._initWithTexture(locTexture, rect, rotated, offset, originalSize);
            } else {
                if (cc.js.isString(texture)) {
                    this._textureFilename = texture;
                    locTexture = cc.textureCache.addImage(this._textureFilename);
                    this._initWithTexture(locTexture, rect, rotated, offset, originalSize);
                } else {
                    if (texture instanceof cc.Texture2D) {
                        this._textureFilename = "";
                        this._initWithTexture(texture, rect, rotated, offset, originalSize);
                    }
                }
            }
            this.emit("load");
            check(this.getTexture());
            return true;
        };
    }, {} ],
    101: [ function(require, module, exports) {
        "use strict";
        var scheduleTarget = {
            update: function(dt) {
                cc.director.emit(cc.Director.EVENT_BEFORE_UPDATE);
                cc.director.emit(cc.Director.EVENT_COMPONENT_UPDATE, dt);
            }
        };
        cc.Director.getInstance().getScheduler().scheduleUpdateForTarget(scheduleTarget, -1e3, false);
    }, {} ],
    102: [ function(require, module, exports) {
        "use strict";
        cc.Scale9Sprite.prototype.setRenderingType = function(type) {
            if (this._renderingType === type) {
                return;
            }
            this._renderingType = type;
            if (!this.isScale9Enabled()) {
                this.setScale9Enabled(true);
            }
            if (type === cc.Scale9Sprite.RenderingType.SIMPLE) {
                this.setInsetLeft(0);
                this.setInsetTop(0);
                this.setInsetBottom(0);
                this.setInsetRight(0);
            }
        };
    }, {} ],
    103: [ function(require, module, exports) {}, {} ]
}, {}, [ 89, 86 ]);