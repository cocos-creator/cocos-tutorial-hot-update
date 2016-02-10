require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ActorRenderer":[function(require,module,exports){
"use strict";
cc._RFpush(module, '1a792KO87NBg7vCCIp1jq+j', 'ActorRenderer');
// scripts/ActorRenderer.js

'use strict';

var Game = require('Game');
var Types = require('Types');
var Utils = require('Utils');
var ActorPlayingState = Types.ActorPlayingState;

cc.Class({
    'extends': cc.Component,

    properties: {
        playerInfo: {
            'default': null,
            type: cc.Node
        },
        stakeOnTable: {
            'default': null,
            type: cc.Node
        },
        cardInfo: {
            'default': null,
            type: cc.Node
        },
        cardPrefab: {
            'default': null,
            type: cc.Prefab
        },
        anchorCards: {
            'default': null,
            type: cc.Node
        },
        spPlayerName: {
            'default': null,
            type: cc.Sprite
        },
        labelPlayerName: {
            'default': null,
            type: cc.Label
        },
        labelTotalStake: {
            'default': null,
            type: cc.Label
        },
        spPlayerPhoto: {
            'default': null,
            type: cc.Sprite
        },
        spCountdown: {
            'default': null,
            type: cc.Sprite
        },
        labelStakeOnTable: {
            'default': null,
            type: cc.Label
        },
        spChips: {
            'default': [],
            type: cc.Sprite
        },
        labelCardInfo: {
            'default': null,
            type: cc.Label
        },
        spCardInfo: {
            'default': null,
            type: cc.Sprite
        },
        animFX: {
            'default': null,
            type: cc.Node
        },
        cardSpace: 0
    },

    onLoad: function onLoad() {},

    init: function init(playerInfo, playerInfoPos, stakePos, turnDuration, switchSide) {
        // actor
        this.actor = this.getComponent('Actor');

        // nodes
        this.sgCountdown = null;
        this.turnDuration = turnDuration;

        this.playerInfo.position = playerInfoPos;
        this.stakeOnTable.position = stakePos;
        this.labelPlayerName.string = playerInfo.name;
        this.updateTotalStake(playerInfo.gold);
        var photoIdx = playerInfo.photoIdx % 5;
        this.spPlayerPhoto.spriteFrame = Game.instance.assetMng.playerPhotos[photoIdx];
        // fx
        this.animFX = this.animFX.getComponent('FXPlayer');
        this.animFX.init();
        this.animFX.show(false);

        this.cardInfo.active = false;

        this.progressTimer = this.initCountdown();

        // switch side
        if (switchSide) {
            this.spCardInfo.getComponent('SideSwitcher').switchSide();
            this.spPlayerName.getComponent('SideSwitcher').switchSide();
        }
    },

    initDealer: function initDealer() {
        // actor
        this.actor = this.getComponent('Actor');
        // fx
        this.animFX = this.animFX.getComponent('FXPlayer');
        this.animFX.init();
        this.animFX.show(false);
    },

    updateTotalStake: function updateTotalStake(num) {
        this.labelTotalStake.string = '$' + num;
    },

    initCountdown: function initCountdown() {
        var countdownTex = Game.instance.assetMng.texCountdown.getTexture();
        this.sgCountdown = new _ccsg.Sprite(countdownTex);

        var progressTimer = new cc.ProgressTimer(this.sgCountdown);
        progressTimer.setName('progressTimer');
        progressTimer.setMidpoint(cc.p(0.5, 0.5));
        progressTimer.setType(cc.ProgressTimer.Type.RADIAL);
        this.playerInfo._sgNode.addChild(progressTimer);
        progressTimer.setPosition(cc.p(0, 0));
        progressTimer.setPercentage(0);

        return progressTimer;
    },

    startCountdown: function startCountdown() {
        if (this.progressTimer) {
            var fromTo = cc.progressFromTo(this.turnDuration, 0, 100);
            this.progressTimer.runAction(fromTo);
        }
    },

    resetCountdown: function resetCountdown() {
        if (this.progressTimer) {
            this.progressTimer.stopAllActions();
            this.progressTimer.setPercentage(0);
        }
    },

    playBlackJackFX: function playBlackJackFX() {
        this.animFX.playFX('blackjack');
    },

    playBustFX: function playBustFX() {
        this.animFX.playFX('bust');
    },

    onDeal: function onDeal(card, show) {
        var newCard = cc.instantiate(this.cardPrefab).getComponent('Card');
        this.anchorCards.addChild(newCard.node);
        newCard.init(card);
        newCard.reveal(show);

        var startPos = cc.p(0, 0);
        var index = this.actor.cards.length - 1;
        var endPos = cc.p(this.cardSpace * index, 0);
        newCard.node.setPosition(startPos);

        var moveAction = cc.moveTo(0.5, endPos);
        var callback = cc.callFunc(this._onDealEnd, this, this.cardSpace * index);
        newCard.node.runAction(cc.sequence(moveAction, callback));
    },

    _onDealEnd: function _onDealEnd(target, pointX) {
        this.resetCountdown();
        if (this.actor.state === ActorPlayingState.Normal) {
            this.startCountdown();
        }
        this.updatePoint();
        this._updatePointPos(pointX);
    },

    onReset: function onReset() {
        this.cardInfo.active = false;

        this.anchorCards.removeAllChildren();

        this._resetChips();
    },

    onRevealHoldCard: function onRevealHoldCard() {
        var card = cc.find('cardPrefab', this.anchorCards).getComponent('Card');
        card.reveal(true);
        this.updateState();
    },

    updatePoint: function updatePoint() {
        this.cardInfo.active = true;
        this.labelCardInfo.string = this.actor.bestPoint;

        switch (this.actor.hand) {
            case Types.Hand.BlackJack:
                this.animFX.show(true);
                this.animFX.playFX('blackjack');
                break;
            case Types.Hand.FiveCard:
                // TODO
                break;
        }
    },

    _updatePointPos: function _updatePointPos(xPos) {
        this.cardInfo.setPositionX(xPos + 50);
    },

    showStakeChips: function showStakeChips(stake) {
        var chips = this.spChips;
        var count = 0;
        if (stake > 50000) {
            count = 5;
        } else if (stake > 25000) {
            count = 4;
        } else if (stake > 10000) {
            count = 3;
        } else if (stake > 5000) {
            count = 2;
        } else if (stake > 0) {
            count = 1;
        }
        for (var i = 0; i < count; ++i) {
            chips[i].enabled = true;
        }
    },

    _resetChips: function _resetChips() {
        for (var i = 0; i < this.spChips.length; ++i) {
            this.spChips.enabled = false;
        }
    },

    updateState: function updateState() {
        switch (this.actor.state) {
            case ActorPlayingState.Normal:
                this.cardInfo.active = true;
                this.spCardInfo.spriteFrame = Game.instance.assetMng.texCardInfo;
                this.updatePoint();
                break;
            case ActorPlayingState.Bust:
                var min = Utils.getMinMaxPoint(this.actor.cards).min;
                this.labelCardInfo.string = '爆牌(' + min + ')';
                this.spCardInfo.spriteFrame = Game.instance.assetMng.texBust;
                this.cardInfo.active = true;
                this.animFX.show(true);
                this.animFX.playFX('bust');
                this.resetCountdown();
                break;
            case ActorPlayingState.Stand:
                var max = Utils.getMinMaxPoint(this.actor.cards).max;
                this.labelCardInfo.string = '停牌(' + max + ')';
                this.spCardInfo.spriteFrame = Game.instance.assetMng.texCardInfo;
                this.resetCountdown();
                // this.updatePoint();
                break;
        }
    }
});

cc._RFpop();
},{"Game":"Game","Types":"Types","Utils":"Utils"}],"Actor":[function(require,module,exports){
"use strict";
cc._RFpush(module, '7d008dTf6xB2Z0wCAdzh1Rx', 'Actor');
// scripts/Actor.js

'use strict';

var Types = require('Types');
var Utils = require('Utils');
var ActorPlayingState = Types.ActorPlayingState;

cc.Class({
    'extends': cc.Component,

    properties: {
        // 所有明牌
        cards: {
            'default': [],
            serializable: false,
            visible: false
        },
        // 暗牌，demo 暂存
        holeCard: {
            'default': null,
            serializable: false,
            visible: false
        },

        // 手上最接近 21 点的点数（有可能超过 21 点）
        bestPoint: {
            get: function get() {
                var minMax = Utils.getMinMaxPoint(this.cards);
                return minMax.max;
            }
        },

        // 牌型，不考虑是否爆牌
        hand: {
            get: function get() {
                var count = this.cards.length;
                if (this.holeCard) {
                    ++count;
                }
                if (count >= 5) {
                    return Types.Hand.FiveCard;
                }
                if (count === 2 && this.bestPoint === 21) {
                    return Types.Hand.BlackJack;
                }
                return Types.Hand.Normal;
            }
        },

        canReport: {
            get: function get() {
                return this.hand !== Types.Hand.Normal;
            },
            visible: false
        },

        renderer: {
            'default': null,
            type: cc.Node
        },
        state: {
            'default': ActorPlayingState.Normal,
            notify: function notify(oldState) {
                if (this.state !== oldState) {
                    this.renderer.updateState();
                }
            },
            type: ActorPlayingState,
            serializable: false
        }
    },

    init: function init() {
        this.ready = true;
        this.renderer = this.getComponent('ActorRenderer');
    },

    addCard: function addCard(card) {
        this.cards.push(card);
        this.renderer.onDeal(card, true);

        var cards = this.holeCard ? [this.holeCard].concat(this.cards) : this.cards;
        if (Utils.isBust(cards)) {
            this.state = ActorPlayingState.Bust;
        }
    },

    addHoleCard: function addHoleCard(card) {
        this.holeCard = card;
        this.renderer.onDeal(card, false);
    },

    stand: function stand() {
        this.state = ActorPlayingState.Stand;
    },

    revealHoldCard: function revealHoldCard() {
        if (this.holeCard) {
            this.cards.unshift(this.holeCard);
            this.holeCard = null;
            this.renderer.onRevealHoldCard();
        }
    },

    // revealNormalCard: function() {
    //     this.onRevealNormalCard();
    // },

    report: function report() {
        this.state = ActorPlayingState.Report;
    },

    reset: function reset() {
        this.cards = [];
        this.holeCard = null;
        this.reported = false;
        this.state = ActorPlayingState.Normal;
        this.renderer.onReset();
    }
});

cc._RFpop();
},{"Types":"Types","Utils":"Utils"}],"AssetMng":[function(require,module,exports){
"use strict";
cc._RFpush(module, '54522LcoVpPHbrqYgwp/1Qm', 'AssetMng');
// scripts/AssetMng.js

"use strict";

var AssetMng = cc.Class({
    "extends": cc.Component,

    properties: {
        texBust: {
            "default": null,
            type: cc.SpriteFrame
        },
        texCardInfo: {
            "default": null,
            type: cc.SpriteFrame
        },
        texCountdown: {
            "default": null,
            type: cc.SpriteFrame
        },
        texBetCountdown: {
            "default": null,
            type: cc.SpriteFrame
        },
        playerPhotos: {
            "default": [],
            type: cc.SpriteFrame
        }
    }
});

cc._RFpop();
},{}],"AudioMng":[function(require,module,exports){
"use strict";
cc._RFpush(module, '01ca4tStvVH+JmZ5TNcmuAu', 'AudioMng');
// scripts/AudioMng.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {
        winAudio: {
            "default": null,
            url: cc.AudioClip
        },

        loseAudio: {
            "default": null,
            url: cc.AudioClip
        },

        cardAudio: {
            "default": null,
            url: cc.AudioClip
        },

        buttonAudio: {
            "default": null,
            url: cc.AudioClip
        },

        chipsAudio: {
            "default": null,
            url: cc.AudioClip
        },

        bgm: {
            "default": null,
            url: cc.AudioClip
        }
    },

    playMusic: function playMusic() {
        cc.audioEngine.playMusic(this.bgm, true);
    },

    pauseMusic: function pauseMusic() {
        cc.audioEngine.pauseMusic();
    },

    resumeMusic: function resumeMusic() {
        cc.audioEngine.resumeMusic();
    },

    _playSFX: function _playSFX(clip) {
        cc.audioEngine.playEffect(clip, false);
    },

    playWin: function playWin() {
        this._playSFX(this.winAudio);
    },

    playLose: function playLose() {
        this._playSFX(this.loseAudio);
    },

    playCard: function playCard() {
        this._playSFX(this.cardAudio);
    },

    playChips: function playChips() {
        this._playSFX(this.chipsAudio);
    },

    playButton: function playButton() {
        this._playSFX(this.buttonAudio);
    }
});

cc._RFpop();
},{}],"Bet":[function(require,module,exports){
"use strict";
cc._RFpush(module, '28f38yToT1Pw7NgyeCvRxDC', 'Bet');
// scripts/Bet.js

'use strict';

var Game = require('Game');

cc.Class({
    'extends': cc.Component,

    properties: {
        chipPrefab: {
            'default': null,
            type: cc.Prefab
        },
        btnChips: {
            'default': [],
            type: cc.Node
        },
        chipValues: {
            'default': [],
            type: 'Integer'
        },
        anchorChipToss: {
            'default': null,
            type: cc.Node
        }
    },

    // use this for initialization
    init: function init() {
        this._registerBtns();
    },

    _registerBtns: function _registerBtns() {
        var self = this;
        var registerBtn = function registerBtn(index) {
            self.btnChips[i].on('touchstart', function (event) {
                if (Game.instance.addStake(self.chipValues[index])) {
                    self.playAddChip();
                }
            }, this);
        };
        for (var i = 0; i < self.btnChips.length; ++i) {
            registerBtn(i);
        }
    },

    playAddChip: function playAddChip() {
        var startPos = cc.p(cc.randomMinus1To1() * 50, cc.randomMinus1To1() * 50);
        var chip = cc.instantiate(this.chipPrefab);
        this.anchorChipToss.addChild(chip);
        chip.setPosition(startPos);
        chip.getComponent('TossChip').play();
    },

    resetChips: function resetChips() {
        Game.instance.resetStake();
        Game.instance.info.enabled = false;
        this.resetTossedChips();
    },

    resetTossedChips: function resetTossedChips() {
        this.anchorChipToss.removeAllChildren();
    }
});

cc._RFpop();
},{"Game":"Game"}],"ButtonScaler":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'a171dSnCXFMRIqs1IWdvgWM', 'ButtonScaler');
// scripts/UI/ButtonScaler.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        pressedScale: 1,
        transDuration: 0
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        var audioMng = cc.find('Menu/AudioMng') || cc.find('Game/AudioMng');
        if (audioMng) {
            audioMng = audioMng.getComponent('AudioMng');
        }
        self.initScale = this.node.scale;
        self.button = self.getComponent(cc.Button);
        self.scaleDownAction = cc.scaleTo(self.transDuration, self.pressedScale);
        self.scaleUpAction = cc.scaleTo(self.transDuration, self.initScale);
        function onTouchDown(event) {
            this.stopAllActions();
            if (audioMng) audioMng.playButton();
            this.runAction(self.scaleDownAction);
        }
        function onTouchUp(event) {
            this.stopAllActions();
            this.runAction(self.scaleUpAction);
        }
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    }
});

cc._RFpop();
},{}],"Card":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'ab67e5QkiVCBZ3DIMlWhiAt', 'Card');
// scripts/Card.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {
        // nodes
        point: {
            "default": null,
            type: cc.Label
        },
        suit: {
            "default": null,
            type: cc.Sprite
        },
        mainPic: {
            "default": null,
            type: cc.Sprite
        },
        cardBG: {
            "default": null,
            type: cc.Sprite
        },
        // resources
        redTextColor: cc.Color.WHITE,
        blackTextColor: cc.Color.WHITE,
        texFrontBG: {
            "default": null,
            type: cc.SpriteFrame
        },
        texBackBG: {
            "default": null,
            type: cc.SpriteFrame
        },
        texFaces: {
            "default": [],
            type: cc.SpriteFrame
        },
        texSuitBig: {
            "default": [],
            type: cc.SpriteFrame
        },
        texSuitSmall: {
            "default": [],
            type: cc.SpriteFrame
        }
    },

    // use this for initialization
    init: function init(card) {
        var isFaceCard = card.point > 10;

        if (isFaceCard) {
            this.mainPic.spriteFrame = this.texFaces[card.point - 10 - 1];
        } else {
            this.mainPic.spriteFrame = this.texSuitBig[card.suit - 1];
        }

        // for jsb
        this.point.string = card.pointName;

        if (card.isRedSuit) {
            this.point.node.color = this.redTextColor;
        } else {
            this.point.node.color = this.blackTextColor;
        }

        this.suit.spriteFrame = this.texSuitSmall[card.suit - 1];
    },

    reveal: function reveal(isFaceUp) {
        this.point.node.active = isFaceUp;
        this.suit.node.active = isFaceUp;
        this.mainPic.node.active = isFaceUp;
        this.cardBG.spriteFrame = isFaceUp ? this.texFrontBG : this.texBackBG;
    }
});

cc._RFpop();
},{}],"CounterTest":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b0926/aIatATYgTuL0RyW/q', 'CounterTest');
// scripts/CounterTest.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {
        // ...
        target: {
            "default": null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.target.node.color = cc.Color.GREEN;
    },

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();
},{}],"Dealer":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'ce2dfoqEulHCLjS1Z9xPN7t', 'Dealer');
// scripts/Dealer.js

'use strict';

var Actor = require('Actor');
var Utils = require('Utils');

cc.Class({
    'extends': Actor,

    properties: {
        // 手上最接近 21 点的点数（有可能超过 21 点）
        bestPoint: {
            get: function get() {
                var cards = this.holeCard ? [this.holeCard].concat(this.cards) : this.cards;
                var minMax = Utils.getMinMaxPoint(cards);
                return minMax.max;
            },
            override: true
        }
    },

    init: function init() {
        this._super();
        this.renderer.initDealer();
    },

    // 返回是否要牌
    wantHit: function wantHit() {
        var Game = require('Game');
        var Types = require('Types');

        var bestPoint = this.bestPoint;

        // 已经最大点数
        if (bestPoint === 21) {
            return false;
        }

        // 不论抽到什么牌肯定不会爆，那就接着抽
        if (bestPoint <= 21 - 10) {
            return true;
        }

        var player = Game.instance.player;
        var outcome = Game.instance._getPlayerResult(player, this);

        switch (outcome) {
            case Types.Outcome.Win:
                return true;
            case Types.Outcome.Lose:
                return false;
        }

        return this.bestPoint < 17;
    }
});

cc._RFpop();
},{"Actor":"Actor","Game":"Game","Types":"Types","Utils":"Utils"}],"Decks":[function(require,module,exports){
"use strict";
cc._RFpush(module, '17024G0JFpHcLI5GREbF8VN', 'Decks');
// scripts/module/Decks.js

'use strict';

var Types = require('Types');

/**
 * 扑克管理类，用来管理一副或多副牌
 * @class Decks
 * @constructor
 * @param {number} numberOfDecks - 总共几副牌
 */
function Decks(numberOfDecks) {
    // 总共几副牌
    this._numberOfDecks = numberOfDecks;
    // 还没发出去的牌
    this._cardIds = new Array(numberOfDecks * 52);

    this.reset();
}

/**
 * 重置所有牌
 * @method reset
 */
Decks.prototype.reset = function () {
    this._cardIds.length = this._numberOfDecks * 52;
    var index = 0;
    var fromId = Types.Card.fromId;
    for (var i = 0; i < this._numberOfDecks; ++i) {
        for (var cardId = 0; cardId < 52; ++cardId) {
            this._cardIds[index] = fromId(cardId);
            ++index;
        }
    }
};

/**
 * 随机抽一张牌，如果已经没牌了，将返回 null
 * @method draw
 * @return {Card}
 */
Decks.prototype.draw = function () {
    var cardIds = this._cardIds;
    var len = cardIds.length;
    if (len === 0) {
        return null;
    }

    var random = Math.random();
    var index = random * len | 0;
    var result = cardIds[index];

    // 保持数组紧凑
    var last = cardIds[len - 1];
    cardIds[index] = last;
    cardIds.length = len - 1;

    return result;
};

///**
// * 发一张牌
// * @method deal
// * @return {Card}
// */
//Decks.prototype.deal = function () {
//    this._cardIds.pop();
//};

///**
// * 洗牌
// * @method shuffle
// */
//Decks.prototype.shuffle = function () {
//    shuffleArray(this._cardIds);
//};
//
///**
// * Randomize array element order in-place.
// * Using Durstenfeld shuffle algorithm.
// * http://stackoverflow.com/a/12646864
// */
//function shuffleArray(array) {
//    for (var i = array.length - 1; i > 0; i--) {
//        var j = (Math.random() * (i + 1)) | 0;
//        var temp = array[i];
//        array[i] = array[j];
//        array[j] = temp;
//    }
//    return array;
//}

module.exports = Decks;

cc._RFpop();
},{"Types":"Types"}],"FXPlayer":[function(require,module,exports){
"use strict";
cc._RFpush(module, '68da2yjdGVMSYhXLN9DukIB', 'FXPlayer');
// scripts/FXPlayer.js

"use strict";

cc.Class({
    "extends": cc.Component,

    // use this for initialization
    init: function init() {
        this.anim = this.getComponent(cc.Animation);
        this.sprite = this.getComponent(cc.Sprite);
    },

    show: function show(_show) {
        this.sprite.enabled = _show;
    },

    playFX: function playFX(name) {
        // name can be 'blackjack' or 'bust'
        this.anim.play(name);
    },

    hideFX: function hideFX() {
        this.sprite.enabled = false;
    }
});

cc._RFpop();
},{}],"Game":[function(require,module,exports){
"use strict";
cc._RFpush(module, '63738OONCFKHqsf4QSeJSun', 'Game');
// scripts/Game.js

'use strict';

var players = require('PlayerData').players;
var Decks = require('Decks');
var Types = require('Types');
var ActorPlayingState = Types.ActorPlayingState;
var Fsm = require('game-fsm');

var Game = cc.Class({
    'extends': cc.Component,

    properties: {
        playerAnchors: {
            'default': [],
            type: cc.Node
        },
        playerPrefab: {
            'default': null,
            type: cc.Prefab
        },
        dealer: {
            'default': null,
            type: cc.Node
        },
        inGameUI: {
            'default': null,
            type: cc.Node
        },
        betUI: {
            'default': null,
            type: cc.Node
        },
        assetMng: {
            'default': null,
            type: cc.Node
        },
        audioMng: {
            'default': null,
            type: cc.Node
        },
        turnDuration: 0,
        betDuration: 0,
        totalChipsNum: 0,
        totalDiamondNum: 0,
        numberOfDecks: {
            'default': 1,
            type: 'Integer'
        }
    },

    statics: {
        instance: null
    },

    // use this for initialization
    onLoad: function onLoad() {
        Game.instance = this;
        this.inGameUI = this.inGameUI.getComponent('InGameUI');
        this.assetMng = this.assetMng.getComponent('AssetMng');
        this.audioMng = this.audioMng.getComponent('AudioMng');
        this.betUI = this.betUI.getComponent('Bet');
        this.inGameUI.init(this.betDuration);
        this.betUI.init();
        this.dealer = this.dealer.getComponent('Dealer');
        this.dealer.init();

        //
        this.player = null;
        this.createPlayers();

        // shortcut to ui element
        this.info = this.inGameUI.resultTxt;
        this.totalChips = this.inGameUI.labelTotalChips;

        // init logic
        this.decks = new Decks(this.numberOfDecks);
        this.fsm = Fsm;
        this.fsm.init(this);

        // start
        this.updateTotalChips();

        this.audioMng.playMusic();
    },

    addStake: function addStake(delta) {
        if (this.totalChipsNum < delta) {
            console.log('not enough chips!');
            this.info.enabled = true;
            this.info.string = '金币不足!';
            return false;
        } else {
            this.totalChipsNum -= delta;
            this.updateTotalChips();
            this.player.addStake(delta);
            this.audioMng.playChips();
            this.info.enabled = false;
            this.info.string = '请下注';
            return true;
        }
    },

    resetStake: function resetStake() {
        this.totalChipsNum += this.player.stakeNum;
        this.player.resetStake();
        this.updateTotalChips();
    },

    updateTotalChips: function updateTotalChips() {
        this.totalChips.string = this.totalChipsNum;
        this.player.renderer.updateTotalStake(this.totalChipsNum);
    },

    createPlayers: function createPlayers() {
        for (var i = 0; i < 5; ++i) {
            var playerNode = cc.instantiate(this.playerPrefab);
            var anchor = this.playerAnchors[i];
            var switchSide = i > 2;
            anchor.addChild(playerNode);
            playerNode.position = cc.p(0, 0);

            var playerInfoPos = cc.find('anchorPlayerInfo', anchor).getPosition();
            var stakePos = cc.find('anchorStake', anchor).getPosition();
            var actorRenderer = playerNode.getComponent('ActorRenderer');
            actorRenderer.init(players[i], playerInfoPos, stakePos, this.turnDuration, switchSide);
            if (i === 2) {
                this.player = playerNode.getComponent('Player');
                this.player.init();
            }
        }
    },

    // UI EVENT CALLBACKS

    // 玩家要牌
    hit: function hit() {
        this.player.addCard(this.decks.draw());
        if (this.player.state === ActorPlayingState.Bust) {
            // if every player end
            this.fsm.onPlayerActed();
        }

        this.audioMng.playCard();

        //if (this.dealer.state === ActorPlayingState.Normal) {
        //    if (this.dealer.wantHit()) {
        //        this.dealer.addCard(this.decks.draw());
        //    }
        //    else {
        //        this.dealer.stand();
        //    }
        //}
        //
        //if (this.dealer.state === ActorPlayingState.Bust) {
        //    this.state = GamingState.End;
        //}
        this.audioMng.playButton();
    },

    // 玩家停牌
    stand: function stand() {
        this.player.stand();

        this.audioMng.playButton();

        // if every player end
        this.fsm.onPlayerActed();
    },

    //
    deal: function deal() {
        this.fsm.toDeal();
        this.audioMng.playButton();
    },

    //
    start: function start() {
        this.fsm.toBet();
        this.audioMng.playButton();
    },

    // 玩家报到
    report: function report() {
        this.player.report();

        // if every player end
        this.fsm.onPlayerActed();
    },

    quitToMenu: function quitToMenu() {
        cc.director.loadScene('menu');
    },

    // FSM CALLBACKS

    onEnterDealState: function onEnterDealState() {
        this.betUI.resetTossedChips();
        this.inGameUI.resetCountdown();
        this.player.renderer.showStakeChips(this.player.stakeNum);
        this.player.addCard(this.decks.draw());
        var holdCard = this.decks.draw();
        this.dealer.addHoleCard(holdCard);
        this.player.addCard(this.decks.draw());
        this.dealer.addCard(this.decks.draw());
        this.audioMng.playCard();
        this.fsm.onDealed();
    },

    onPlayersTurnState: function onPlayersTurnState(enter) {
        if (enter) {
            this.inGameUI.showGameState();
        }
    },

    onEnterDealersTurnState: function onEnterDealersTurnState() {
        while (this.dealer.state === ActorPlayingState.Normal) {
            if (this.dealer.wantHit()) {
                this.dealer.addCard(this.decks.draw());
            } else {
                this.dealer.stand();
            }
        }
        this.fsm.onDealerActed();
    },

    // 结算
    onEndState: function onEndState(enter) {
        if (enter) {
            this.dealer.revealHoldCard();
            this.inGameUI.showResultState();

            var outcome = this._getPlayerResult(this.player, this.dealer);
            switch (outcome) {
                case Types.Outcome.Win:
                    this.info.string = 'You Win';
                    this.audioMng.pauseMusic();
                    this.audioMng.playWin();
                    // 拿回原先自己的筹码
                    this.totalChipsNum += this.player.stakeNum;
                    // 奖励筹码
                    var winChipsNum = this.player.stakeNum;
                    if (!this.player.state === Types.ActorPlayingState.Report) {
                        if (this.player.hand === Types.Hand.BlackJack) {
                            winChipsNum *= 1.5;
                        } else {
                            // 五小龙
                            winChipsNum *= 2.0;
                        }
                    }
                    this.totalChipsNum += winChipsNum;
                    this.updateTotalChips();
                    break;

                case Types.Outcome.Lose:
                    this.info.string = 'You Lose';
                    this.audioMng.pauseMusic();
                    this.audioMng.playLose();
                    break;

                case Types.Outcome.Tie:
                    this.info.string = 'Draw';
                    // 退还筹码
                    this.totalChipsNum += this.player.stakeNum;
                    this.updateTotalChips();
                    break;
            }
        }

        this.info.enabled = enter;
    },

    // 下注
    onBetState: function onBetState(enter) {
        if (enter) {
            this.decks.reset();
            this.player.reset();
            this.dealer.reset();
            this.info.string = '请下注';
            this.inGameUI.showBetState();
            this.inGameUI.startCountdown();

            this.audioMng.resumeMusic();
        }
        this.info.enabled = enter;
    },

    // PRIVATES

    // 判断玩家输赢
    _getPlayerResult: function _getPlayerResult(player, dealer) {
        var Outcome = Types.Outcome;
        if (player.state === ActorPlayingState.Bust) {
            return Outcome.Lose;
        } else if (dealer.state === ActorPlayingState.Bust) {
            return Outcome.Win;
        } else {
            if (player.state === ActorPlayingState.Report) {
                return Outcome.Win;
            } else {
                if (player.hand > dealer.hand) {
                    return Outcome.Win;
                } else if (player.hand < dealer.hand) {
                    return Outcome.Lose;
                } else {
                    if (player.bestPoint === dealer.bestPoint) {
                        return Outcome.Tie;
                    } else if (player.bestPoint < dealer.bestPoint) {
                        return Outcome.Lose;
                    } else {
                        return Outcome.Win;
                    }
                }
            }
        }
    }

});

cc._RFpop();
},{"Decks":"Decks","PlayerData":"PlayerData","Types":"Types","game-fsm":"game-fsm"}],"HotUpdate":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e390cpl5vpL54CRkH0xI8Ul', 'HotUpdate');
// scripts/module/HotUpdate.js

cc.Class({
    "extends": cc.Component,

    properties: {
        updatePanel: {
            "default": null,
            type: cc.Node
        },
        manifestUrl: {
            "default": null,
            url: cc.RawAsset
        },
        percent: {
            "default": null,
            type: cc.Label
        }
    },

    checkCb: function checkCb(event) {
        cc.log('Code: ' + event.getEventCode());
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                cc.log("No local manifest file found, hot update skipped.");
                cc.eventManager.removeListener(this._checkListener);
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                cc.log("Fail to download manifest file, hot update skipped.");
                cc.eventManager.removeListener(this._checkListener);
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                cc.log("Already up to date with the latest remote version.");
                cc.eventManager.removeListener(this._checkListener);
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                this._needUpdate = true;
                this.updatePanel.active = true;
                cc.eventManager.removeListener(this._checkListener);
                break;
            default:
                break;
        }
    },

    updateCb: function updateCb(event) {
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                cc.log('No local manifest file found, hot update skipped.');
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                var percent = event.getPercent();
                var percentByFile = event.getPercentByFile();

                var msg = event.getMessage();
                if (msg) {
                    cc.log(msg);
                }
                cc.log(percent + '%');
                this.percent.string = percent + '%';
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                cc.log('Fail to download manifest file, hot update skipped.');
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                cc.log('Already up to date with the latest remote version.');
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                cc.log('Update finished. ' + event.getMessage());

                needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                cc.log('Update failed. ' + event.getMessage());

                this._failCount++;
                if (this._failCount < 5) {
                    this._am.downloadFailedAssets();
                } else {
                    cc.log('Reach maximum fail count, exit update process');
                    this._failCount = 0;
                    failed = true;
                }
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                cc.log('Asset update error: ' + event.getAssetId() + ', ' + event.getMessage());
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                cc.log(event.getMessage());
                break;
            default:
                break;
        }

        if (failed) {
            cc.eventManager.removeListener(this._updateListener);
            this.updatePanel.active = false;
        }

        if (needRestart) {
            cc.eventManager.removeListener(this._updateListener);
            // Register the manifest's search path
            var searchPaths = this._am.getLocalManifest().getSearchPaths();
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));

            jsb.fileUtils.setSearchPaths(searchPaths);
            cc.director.loadScene('menu');
        }
    },

    hotUpdate: function hotUpdate() {
        if (this._am && this._needUpdate) {
            this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
            cc.eventManager.addListener(this._updateListener, 1);

            this._failCount = 0;
            this._am.update();
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        // Hot update is only available in Native build
        if (!cc.sys.isNative) {
            return;
        }
        var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'blackjack-remote-asset';
        cc.log('Storage path for remote asset : ' + storagePath);

        // cc.log('Local manifest URL : ' + this.manifestUrl);
        this._am = new jsb.AssetsManager(this.manifestUrl, storagePath);
        this._am.retain();

        this._needUpdate = false;
        if (this._am.getLocalManifest().isLoaded()) {
            this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
            cc.eventManager.addListener(this._checkListener, 1);

            this._am.checkUpdate();
        }
    },

    onDestroy: function onDestroy() {
        this._am && this._am.release();
    }
});

cc._RFpop();
},{}],"InGameUI":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'f192efroeFEyaxtfh8TVXYz', 'InGameUI');
// scripts/UI/InGameUI.js

'use strict';

var Game = require('Game');

cc.Class({
    'extends': cc.Component,

    properties: {
        panelChat: {
            'default': null,
            type: cc.Node
        },
        panelSocial: {
            'default': null,
            type: cc.Node
        },
        betStateUI: {
            'default': null,
            type: cc.Node
        },
        gameStateUI: {
            'default': null,
            type: cc.Node
        },
        resultTxt: {
            'default': null,
            type: cc.Label
        },
        betCounter: {
            'default': null,
            type: cc.Node
        },
        btnStart: {
            'default': null,
            type: cc.Node
        },
        labelTotalChips: {
            'default': null,
            type: cc.Label
        }
    },

    // use this for initialization
    init: function init(betDuration) {
        this.panelChat.active = false;
        this.panelSocial.active = false;
        this.resultTxt.enabled = false;
        this.betStateUI.active = true;
        this.gameStateUI.active = false;
        // this.resultStateUI.active = false;
        this.btnStart.active = false;
        this.betDuration = betDuration;
        this.progressTimer = this.initCountdown();
    },

    initCountdown: function initCountdown() {
        var countdownTex = Game.instance.assetMng.texBetCountdown.getTexture();
        this.sgCountdown = new _ccsg.Sprite(countdownTex);
        this.sgCountdown.setColor(cc.Color.BLACK);

        var progressTimer = new cc.ProgressTimer(this.sgCountdown);
        progressTimer.setName('progressTimer');
        progressTimer.setMidpoint(cc.p(0.5, 0.5));
        progressTimer.setType(cc.ProgressTimer.Type.RADIAL);
        progressTimer.reverseDir = true;
        this.betCounter._sgNode.addChild(progressTimer);
        progressTimer.setPosition(cc.p(0, -this.betCounter.height / 2));
        progressTimer.setPercentage(0);

        return progressTimer;
    },

    startCountdown: function startCountdown() {
        if (this.progressTimer) {
            var fromTo = cc.progressFromTo(this.betDuration, 0, 100);
            this.progressTimer.runAction(fromTo);
        }
    },

    resetCountdown: function resetCountdown() {
        if (this.progressTimer) {
            this.progressTimer.stopAllActions();
            this.progressTimer.setPercentage(100);
        }
    },

    showBetState: function showBetState() {
        this.betStateUI.active = true;
        this.gameStateUI.active = false;
        this.btnStart.active = false;
    },

    showGameState: function showGameState() {
        this.betStateUI.active = false;
        this.gameStateUI.active = true;
        this.btnStart.active = false;
    },

    showResultState: function showResultState() {
        this.betStateUI.active = false;
        this.gameStateUI.active = false;
        this.btnStart.active = true;
    },

    toggleChat: function toggleChat() {
        this.panelChat.active = !this.panelChat.active;
    },

    toggleSocial: function toggleSocial() {
        this.panelSocial.active = !this.panelSocial.active;
    },

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();
},{"Game":"Game"}],"Mask":[function(require,module,exports){
"use strict";
cc._RFpush(module, '3c16c3le6hCsrtnanqK8N2W', 'Mask');
// scripts/module/Mask.js

cc.Class({
    'extends': cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        this.node.on('touchstart', function (event) {
            event.stopPropagation();
        });
        this.node.on('mousedown', function (event) {
            event.stopPropagation();
        });
        this.node.on('mousemove', function (event) {
            event.stopPropagation();
        });
        this.node.on('mouseup', function (event) {
            event.stopPropagation();
        });
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"Menu":[function(require,module,exports){
"use strict";
cc._RFpush(module, '20f60m+3RlGO7x2/ARzZ6Qc', 'Menu');
// scripts/Menu.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        audioMng: {
            'default': null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.audioMng = this.audioMng.getComponent('AudioMng');
        this.audioMng.playMusic();
    },

    playGame: function playGame() {
        cc.director.loadScene('table');
    },

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();
},{}],"PlayerData":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4f9c5eXxqhHAKLxZeRmgHDB', 'PlayerData');
// scripts/module/PlayerData.js

'use strict';

var players = [{
	name: '燃烧吧，蛋蛋儿军',
	gold: 3000,
	photoIdx: 0
}, {
	name: '地方政府',
	gold: 2000,
	photoIdx: 1
}, {
	name: '手机超人',
	gold: 1500,
	photoIdx: 2
}, {
	name: '天灵灵，地灵灵',
	gold: 500,
	photoIdx: 3
}, {
	name: '哟哟，切克闹',
	gold: 9000,
	photoIdx: 4
}, {
	name: '学姐不要死',
	gold: 5000,
	photoIdx: 5
}, {
	name: '提百万',
	gold: 10000,
	photoIdx: 6
}];

module.exports = {
	players: players
};

cc._RFpop();
},{}],"Player":[function(require,module,exports){
"use strict";
cc._RFpush(module, '226a2AvzRpHL7SJGTMy5PDX', 'Player');
// scripts/Player.js

'use strict';

var Actor = require('Actor');

cc.Class({
    'extends': Actor,

    init: function init() {
        this._super();
        this.labelStake = this.renderer.labelStakeOnTable;
        this.stakeNum = 0;
    },

    reset: function reset() {
        this._super();
        this.resetStake();
    },

    addCard: function addCard(card) {
        this._super(card);

        // var Game = require('Game');
        // Game.instance.canReport = this.canReport;
    },

    addStake: function addStake(delta) {
        this.stakeNum += delta;
        this.updateStake(this.stakeNum);
    },

    resetStake: function resetStake(delta) {
        this.stakeNum = 0;
        this.updateStake(this.stakeNum);
    },

    updateStake: function updateStake(number) {
        this.labelStake.string = number;
    }

});

cc._RFpop();
},{"Actor":"Actor"}],"RankItem":[function(require,module,exports){
"use strict";
cc._RFpush(module, '1657ewfijBOXLq5zGqr6PvE', 'RankItem');
// scripts/UI/RankItem.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {
        spRankBG: {
            "default": null,
            type: cc.Sprite
        },
        labelRank: {
            "default": null,
            type: cc.Label
        },
        labelPlayerName: {
            "default": null,
            type: cc.Label
        },
        labelGold: {
            "default": null,
            type: cc.Label
        },
        spPlayerPhoto: {
            "default": null,
            type: cc.Sprite
        },
        texRankBG: {
            "default": [],
            type: cc.SpriteFrame
        },
        texPlayerPhoto: {
            "default": [],
            type: cc.SpriteFrame
        }
        // ...
    },

    // use this for initialization
    init: function init(rank, playerInfo) {
        if (rank < 3) {
            // should display trophy
            this.labelRank.node.active = false;
            this.spRankBG.spriteFrame = this.texRankBG[rank];
        } else {
            this.labelRank.node.active = true;
            this.labelRank.string = (rank + 1).toString();
        }

        this.labelPlayerName.string = playerInfo.name;
        this.labelGold.string = playerInfo.gold.toString();
        this.spPlayerPhoto.spriteFrame = this.texPlayerPhoto[playerInfo.photoIdx];
    },

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();
},{}],"RankList":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'fe3fcIxCFFLrKHg6s5+xRUU', 'RankList');
// scripts/UI/RankList.js

'use strict';

var players = require('PlayerData').players;

cc.Class({
    'extends': cc.Component,

    properties: {
        scrollView: {
            'default': null,
            type: cc.ScrollView
        },
        prefabRankItem: {
            'default': null,
            type: cc.Prefab
        },
        rankCount: 0
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.content = this.scrollView.content;
        this.populateList();
    },

    populateList: function populateList() {
        for (var i = 0; i < this.rankCount; ++i) {
            var playerInfo = players[i];
            var item = cc.instantiate(this.prefabRankItem);
            item.getComponent('RankItem').init(i, playerInfo);
            this.content.addChild(item);
        }
    },

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();
},{"PlayerData":"PlayerData"}],"SideSwitcher":[function(require,module,exports){
"use strict";
cc._RFpush(module, '3aae7lZKyhPqqsLD3wMKl6X', 'SideSwitcher');
// scripts/SideSwitcher.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {
        retainSideNodes: {
            "default": [],
            type: cc.Node
        }
    },

    // use this for initialization
    switchSide: function switchSide() {
        this.node.scaleX = -this.node.scaleX;
        for (var i = 0; i < this.retainSideNodes.length; ++i) {
            var curNode = this.retainSideNodes[i];
            curNode.scaleX = -curNode.scaleX;
        }
    }
});

cc._RFpop();
},{}],"TossChip":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b4eb5Lo6U1IZ4eJWuxShCdH', 'TossChip');
// scripts/TossChip.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        anim: {
            'default': null,
            type: cc.Animation
        }
    },

    // use this for initialization
    play: function play() {
        this.anim.play('chip_toss');
    }
});

cc._RFpop();
},{}],"Types":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5b633QMQxpFmYetofEvK2UD', 'Types');
// scripts/module/Types.js

'use strict';

var Suit = cc.Enum({
    Spade: 1, // 黑桃
    Heart: 2, // 红桃
    Club: 3, // 梅花(黑)
    Diamond: 4 });

// 方块(红)
var A2_10JQK = 'NAN,A,2,3,4,5,6,7,8,9,10,J,Q,K'.split(',');

/**
 * 扑克牌类，只用来表示牌的基本属性，不包含游戏逻辑，所有属性只读，
 * 因此全局只需要有 52 个实例（去掉大小王），不论有多少副牌
 * @class Card
 * @constructor
 * @param {Number} point - 可能的值为 1 到 13
 * @param {Suit} suit
 */
function Card(point, suit) {
    Object.defineProperties(this, {
        point: {
            value: point,
            writable: false
        },
        suit: {
            value: suit,
            writable: false
        },
        /**
         * @property {Number} id - 可能的值为 0 到 51
         */
        id: {
            value: (suit - 1) * 13 + (point - 1),
            writable: false
        },
        //
        pointName: {
            get: function get() {
                return A2_10JQK[this.point];
            }
        },
        suitName: {
            get: function get() {
                return Suit[this.suit];
            }
        },
        isBlackSuit: {
            get: function get() {
                return this.suit === Suit.Spade || this.suit === Suit.Club;
            }
        },
        isRedSuit: {
            get: function get() {
                return this.suit === Suit.Heart || this.suit === Suit.Diamond;
            }
        }
    });
}

Card.prototype.toString = function () {
    return this.suitName + ' ' + this.pointName;
};

// 存放 52 张扑克的实例
var cards = new Array(52);

/**
 * 返回指定 id 的实例
 * @param {Number} id - 0 到 51
 */
Card.fromId = function (id) {
    return cards[id];
};

// 初始化所有扑克牌
(function createCards() {
    for (var s = 1; s <= 4; s++) {
        for (var p = 1; p <= 13; p++) {
            var card = new Card(p, s);
            cards[card.id] = card;
        }
    }
})();

// 手中牌的状态
var ActorPlayingState = cc.Enum({
    Normal: -1,
    Stand: -1, // 停牌
    Report: -1, // 报到
    Bust: -1 });

// 输赢
// 爆了
var Outcome = cc.Enum({
    Win: -1,
    Lose: -1,
    Tie: -1
});

// 牌型，值越大越厉害
var Hand = cc.Enum({
    Normal: -1, // 无
    BlackJack: -1, // 黑杰克
    FiveCard: -1 });

// 五小龙
module.exports = {
    Suit: Suit,
    Card: Card,
    ActorPlayingState: ActorPlayingState,
    Hand: Hand,
    Outcome: Outcome
};

cc._RFpop();
},{}],"Utils":[function(require,module,exports){
"use strict";
cc._RFpush(module, '73590esk6xP9ICqhfUZalMg', 'Utils');
// scripts/module/Utils.js


// 返回尽可能不超过 21 点的最小和最大点数
"use strict";

function getMinMaxPoint(cards) {
    var hasAce = false;
    var min = 0;
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        if (card.point === 1) {
            hasAce = true;
        }
        min += Math.min(10, card.point);
    }
    var max = min;
    // 如果有 1 个 A 可以当成 11
    if (hasAce && min + 10 <= 21) {
        // （如果两个 A 都当成 11，那么总分最小也会是 22，爆了，所以最多只能有一个 A 当成 11）
        max += 10;
    }

    return {
        min: min,
        max: max
    };
}

function isBust(cards) {
    var sum = 0;
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        sum += Math.min(10, card.point);
    }
    return sum > 21;
}

var isMobile = function isMobile() {
    return cc.sys.isMobile;
};

module.exports = {
    isBust: isBust,
    getMinMaxPoint: getMinMaxPoint,
    isMobile: isMobile
};

cc._RFpop();
},{}],"game-fsm":[function(require,module,exports){
"use strict";
cc._RFpush(module, '6510d1SmQRMMYH8FEIA7zXq', 'game-fsm');
// scripts/module/game-fsm.js

"use strict";

var State = require('state.com');

var instance;
var model;
var playing;

function on(message) {
    return function (msgToEvaluate) {
        return msgToEvaluate === message;
    };
}

var evaluating = false;

exports = {
    init: function init(target) {
        // send log messages, warnings and errors to the console
        State.console = console;

        model = new State.StateMachine("root");
        var initial = new State.PseudoState("init-root", model, State.PseudoStateKind.Initial);

        // 当前这一把的状态

        var bet = new State.State("下注", model);
        playing = new State.State("已开局", model);
        var settled = new State.State("结算", model);

        initial.to(bet);
        bet.to(playing).when(on("deal"));
        playing.to(settled).when(on("end"));
        settled.to(bet).when(on("bet"));

        bet.entry(function () {
            target.onBetState(true);
        });
        bet.exit(function () {
            target.onBetState(false);
        });

        settled.entry(function () {
            target.onEndState(true);
        });
        settled.exit(function () {
            target.onEndState(false);
        });

        // 开局后的子状态

        var initialP = new State.PseudoState("init 已开局", playing, State.PseudoStateKind.Initial);
        var deal = new State.State("发牌", playing);
        //var postDeal = new State.State("等待", playing);    // 询问玩家是否买保险，双倍、分牌等
        var playersTurn = new State.State("玩家决策", playing);
        var dealersTurn = new State.State("庄家决策", playing);

        initialP.to(deal);
        deal.to(playersTurn).when(on("dealed"));
        playersTurn.to(dealersTurn).when(on("player acted"));

        deal.entry(function () {
            target.onEnterDealState();
        });
        playersTurn.entry(function () {
            target.onPlayersTurnState(true);
        });
        playersTurn.exit(function () {
            target.onPlayersTurnState(false);
        });
        dealersTurn.entry(function () {
            target.onEnterDealersTurnState();
        });

        // create a State machine instance
        instance = new State.StateMachineInstance("fsm");
        State.initialise(model, instance);
    },

    toDeal: function toDeal() {
        this._evaluate('deal');
    },
    toBet: function toBet() {
        this._evaluate('bet');
    },
    onDealed: function onDealed() {
        this._evaluate('dealed');
    },
    onPlayerActed: function onPlayerActed() {
        this._evaluate('player acted');
    },
    onDealerActed: function onDealerActed() {
        this._evaluate('end');
    },

    _evaluate: function _evaluate(message) {
        if (evaluating) {
            // can not call fsm's evaluate recursively
            setTimeout(function () {
                State.evaluate(model, instance, message);
            }, 1);
            return;
        }
        evaluating = true;
        State.evaluate(model, instance, message);
        evaluating = false;
    },

    _getInstance: function _getInstance() {
        return instance;
    },

    _getModel: function _getModel() {
        return model;
    }
};

module.exports = exports;

cc._RFpop();
},{"state.com":"state.com"}],"state.com":[function(require,module,exports){
"use strict";
cc._RFpush(module, '71d9293mx9CFryhJvRw85ZS', 'state.com');
// scripts/lib/state.com.js

/*
 * Finite state machine library
 * Copyright (c) 2014-5 Steelbreeze Limited
 * Licensed under the MIT and GPL v3 licences
 * http://www.steelbreeze.net/state.cs
 */
"use strict";

var StateJS;
(function (StateJS) {
    /**
     * Behavior encapsulates multiple Action callbacks that can be invoked by a single call.
     * @class Behavior
     */
    var Behavior = (function () {
        /**
         * Creates a new instance of the Behavior class.
         * @param {Behavior} behavior The copy constructor; omit this optional parameter for a simple constructor.
         */
        function Behavior(behavior) {
            this.actions = [];
            if (behavior) {
                this.push(behavior); // NOTE: this ensures a copy of the array is made
            }
        }
        /**
         * Adds an Action or set of Actions callbacks in a Behavior instance to this behavior instance.
         * @method push
         * @param {Behavior} behavior The Action or set of Actions callbacks to add to this behavior instance.
         * @returns {Behavior} Returns this behavior instance (for use in fluent style development).
         */
        Behavior.prototype.push = function (behavior) {
            Array.prototype.push.apply(this.actions, behavior instanceof Behavior ? behavior.actions : arguments);
            return this;
        };
        /**
         * Tests the Behavior instance to see if any actions have been defined.
         * @method hasActions
         * @returns {boolean} True if there are actions defined within this Behavior instance.
         */
        Behavior.prototype.hasActions = function () {
            return this.actions.length !== 0;
        };
        /**
         * Invokes all the action callbacks in this Behavior instance.
         * @method invoke
         * @param {any} message The message that triggered the transition.
         * @param {IActiveStateConfiguration} instance The state machine instance.
         * @param {boolean} history Internal use only
         */
        Behavior.prototype.invoke = function (message, instance, history) {
            if (history === void 0) {
                history = false;
            }
            this.actions.forEach(function (action) {
                return action(message, instance, history);
            });
        };
        return Behavior;
    })();
    StateJS.Behavior = Behavior;
})(StateJS || (StateJS = {}));
/*
 * Finite state machine library
 * Copyright (c) 2014-5 Steelbreeze Limited
 * Licensed under the MIT and GPL v3 licences
 * http://www.steelbreeze.net/state.cs
 */
var StateJS;
(function (StateJS) {
    /**
     * An enumeration of static constants that dictates the precise behaviour of pseudo states.
     *
     * Use these constants as the `kind` parameter when creating new `PseudoState` instances.
     * @class PseudoStateKind
     */
    (function (PseudoStateKind) {
        /**
         * Used for pseudo states that are always the staring point when entering their parent region.
         * @member {PseudoStateKind} Initial
         */
        PseudoStateKind[PseudoStateKind["Initial"] = 0] = "Initial";
        /**
         * Used for pseudo states that are the the starting point when entering their parent region for the first time; subsequent entries will start at the last known state.
         * @member {PseudoStateKind} ShallowHistory
         */
        PseudoStateKind[PseudoStateKind["ShallowHistory"] = 1] = "ShallowHistory";
        /**
         * As per `ShallowHistory` but the history semantic cascades through all child regions irrespective of their initial pseudo state kind.
         * @member {PseudoStateKind} DeepHistory
         */
        PseudoStateKind[PseudoStateKind["DeepHistory"] = 2] = "DeepHistory";
        /**
         * Enables a dynamic conditional branches; within a compound transition.
         * All outbound transition guards from a Choice are evaluated upon entering the PseudoState:
         * if a single transition is found, it will be traversed;
         * if many transitions are found, an arbitary one will be selected and traversed;
         * if none evaluate true, and there is no 'else transition' defined, the machine is deemed illformed and an exception will be thrown.
         * @member {PseudoStateKind} Choice
         */
        PseudoStateKind[PseudoStateKind["Choice"] = 3] = "Choice";
        /**
         * Enables a static conditional branches; within a compound transition.
         * All outbound transition guards from a Choice are evaluated upon entering the PseudoState:
         * if a single transition is found, it will be traversed;
         * if many or none evaluate true, and there is no 'else transition' defined, the machine is deemed illformed and an exception will be thrown.
         * @member {PseudoStateKind} Junction
         */
        PseudoStateKind[PseudoStateKind["Junction"] = 4] = "Junction";
        /**
         * Entering a terminate `PseudoState` implies that the execution of this state machine by means of its state object is terminated.
         * @member {PseudoStateKind} Terminate
         */
        PseudoStateKind[PseudoStateKind["Terminate"] = 5] = "Terminate";
    })(StateJS.PseudoStateKind || (StateJS.PseudoStateKind = {}));
    var PseudoStateKind = StateJS.PseudoStateKind;
})(StateJS || (StateJS = {}));
/*
 * Finite state machine library
 * Copyright (c) 2014-5 Steelbreeze Limited
 * Licensed under the MIT and GPL v3 licences
 * http://www.steelbreeze.net/state.cs
 */
var StateJS;
(function (StateJS) {
    /**
     * An enumeration of static constants that dictates the precise behaviour of transitions.
     *
     * Use these constants as the `kind` parameter when creating new `Transition` instances.
     * @class TransitionKind
     */
    (function (TransitionKind) {
        /**
         * The transition, if triggered, occurs without exiting or entering the source state.
         * Thus, it does not cause a state change. This means that the entry or exit condition of the source state will not be invoked.
         * An internal transition can be taken even if the state machine is in one or more regions nested within this state.
         * @member {TransitionKind} Internal
         */
        TransitionKind[TransitionKind["Internal"] = 0] = "Internal";
        /**
         * The transition, if triggered, will not exit the composite (source) state, but will enter the non-active target vertex ancestry.
         * @member {TransitionKind} Local
         */
        TransitionKind[TransitionKind["Local"] = 1] = "Local";
        /**
         * The transition, if triggered, will exit the source vertex.
         * @member {TransitionKind} External
         */
        TransitionKind[TransitionKind["External"] = 2] = "External";
    })(StateJS.TransitionKind || (StateJS.TransitionKind = {}));
    var TransitionKind = StateJS.TransitionKind;
})(StateJS || (StateJS = {}));
/*
 * Finite state machine library
 * Copyright (c) 2014-5 Steelbreeze Limited
 * Licensed under the MIT and GPL v3 licences
 * http://www.steelbreeze.net/state.cs
 */
var StateJS;
(function (StateJS) {
    /**
     * An abstract class used as the base for the Region and Vertex classes.
     * An element is a node within the tree structure that represents a composite state machine model.
     * @class Element
     */
    var Element = (function () {
        /**
         * Creates a new instance of the element class.
         * @param {string} name The name of the element.
         */
        function Element(name, parent) {
            this.name = name;
            this.qualifiedName = parent ? parent.qualifiedName + Element.namespaceSeparator + name : name;
        }
        /**
         * Returns a the element name as a fully qualified namespace.
         * @method toString
         * @returns {string}
         */
        Element.prototype.toString = function () {
            return this.qualifiedName;
        };
        /**
         * The symbol used to separate element names within a fully qualified name.
         * Change this static member to create different styles of qualified name generated by the toString method.
         * @member {string}
         */
        Element.namespaceSeparator = ".";
        return Element;
    })();
    StateJS.Element = Element;
})(StateJS || (StateJS = {}));
var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*
 * Finite state machine library
 * Copyright (c) 2014-5 Steelbreeze Limited
 * Licensed under the MIT and GPL v3 licences
 * http://www.steelbreeze.net/state.cs
 */
var StateJS;
(function (StateJS) {
    /**
     * An element within a state machine model that is a container of Vertices.
     *
     * Regions are implicitly inserted into composite state machines as a container for vertices.
     * They only need to be explicitly defined if orthogonal states are required.
     *
     * Region extends the Element class and inherits its public interface.
     * @class Region
     * @augments Element
     */
    var Region = (function (_super) {
        __extends(Region, _super);
        /**
         * Creates a new instance of the Region class.
         * @param {string} name The name of the region.
         * @param {State} state The parent state that this region will be a child of.
         */
        function Region(name, state) {
            _super.call(this, name, state);
            /**
             * The set of vertices that are children of the region.
             * @member {Array<Vertex>}
             */
            this.vertices = [];
            this.state = state;
            this.state.regions.push(this);
            this.state.getRoot().clean = false;
        }
        /**
         * Returns the root element within the state machine model.
         * @method getRoot
         * @returns {StateMachine} The root state machine element.
         */
        Region.prototype.getRoot = function () {
            return this.state.getRoot();
        };
        /**
         * Accepts an instance of a visitor and calls the visitRegion method on it.
         * @method accept
         * @param {Visitor<TArg1>} visitor The visitor instance.
         * @param {TArg1} arg1 An optional argument to pass into the visitor.
         * @param {any} arg2 An optional argument to pass into the visitor.
         * @param {any} arg3 An optional argument to pass into the visitor.
         * @returns {any} Any value can be returned by the visitor.
         */
        Region.prototype.accept = function (visitor, arg1, arg2, arg3) {
            return visitor.visitRegion(this, arg1, arg2, arg3);
        };
        /**
         * The name given to regions that are are created automatically when a state is passed as a vertex's parent.
         * Regions are automatically inserted into state machine models as the composite structure is built; they are named using this static member.
         * Update this static member to use a different name for default regions.
         * @member {string}
         */
        Region.defaultName = "default";
        return Region;
    })(StateJS.Element);
    StateJS.Region = Region;
})(StateJS || (StateJS = {}));
/*
 * Finite state machine library
 * Copyright (c) 2014-5 Steelbreeze Limited
 * Licensed under the MIT and GPL v3 licences
 * http://www.steelbreeze.net/state.cs
 */
var StateJS;
(function (StateJS) {
    /**
     * An abstract element within a state machine model that can be the source or target of a transition (states and pseudo states).
     *
     * Vertex extends the Element class and inherits its public interface.
     * @class Vertex
     * @augments Element
     */
    var Vertex = (function (_super) {
        __extends(Vertex, _super);
        /**
         * Creates a new instance of the Vertex class.
         * @param {string} name The name of the vertex.
         * @param {Element} parent The parent region or state.
         */
        function Vertex(name, parent) {
            _super.call(this, name, parent = parent instanceof StateJS.State ? parent.defaultRegion() : parent); // TODO: find a cleaner way to manage implicit conversion
            /**
             * The set of transitions from this vertex.
             * @member {Array<Transition>}
             */
            this.outgoing = [];
            this.region = parent; // NOTE: parent will be a Region due to the conditional logic in the super call above
            if (this.region) {
                this.region.vertices.push(this);
                this.region.getRoot().clean = false;
            }
        }
        /**
         * Returns the root element within the state machine model.
         * @method getRoot
         * @returns {StateMachine} The root state machine element.
         */
        Vertex.prototype.getRoot = function () {
            return this.region.getRoot(); // NOTE: need to keep this dynamic as a state machine may be embedded within another
        };
        /**
         * Creates a new transition from this vertex.
         * Newly created transitions are completion transitions; they will be evaluated after a vertex has been entered if it is deemed to be complete.
         * Transitions can be converted to be event triggered by adding a guard condition via the transitions `where` method.
         * @method to
         * @param {Vertex} target The destination of the transition; omit for internal transitions.
         * @param {TransitionKind} kind The kind the transition; use this to set Local or External (the default if omitted) transition semantics.
         * @returns {Transition} The new transition object.
         */
        Vertex.prototype.to = function (target, kind) {
            if (kind === void 0) {
                kind = StateJS.TransitionKind.External;
            }
            return new StateJS.Transition(this, target, kind);
        };
        /**
         * Accepts an instance of a visitor.
         * @method accept
         * @param {Visitor<TArg>} visitor The visitor instance.
         * @param {TArg} arg An optional argument to pass into the visitor.
         * @returns {any} Any value can be returned by the visitor.
         */
        Vertex.prototype.accept = function (visitor, arg1, arg2, arg3) {};
        return Vertex;
    })(StateJS.Element);
    StateJS.Vertex = Vertex;
})(StateJS || (StateJS = {}));
/*
 * Finite state machine library
 * Copyright (c) 2014-5 Steelbreeze Limited
 * Licensed under the MIT and GPL v3 licences
 * http://www.steelbreeze.net/state.cs
 */
var StateJS;
(function (StateJS) {
    /**
     * An element within a state machine model that represents an transitory Vertex within the state machine model.
     *
     * Pseudo states are required in all state machine models; at the very least, an `Initial` pseudo state is the default stating state when the parent region is entered.
     * Other types of pseudo state are available; typically for defining history semantics or to facilitate more complex transitions.
     * A `Terminate` pseudo state kind is also available to immediately terminate processing within the entire state machine instance.
     *
     * PseudoState extends the Vertex class and inherits its public interface.
     * @class PseudoState
     * @augments Vertex
     */
    var PseudoState = (function (_super) {
        __extends(PseudoState, _super);
        /**
         * Creates a new instance of the PseudoState class.
         * @param {string} name The name of the pseudo state.
         * @param {Element} parent The parent element that this pseudo state will be a child of.
         * @param {PseudoStateKind} kind Determines the behaviour of the PseudoState.
         */
        function PseudoState(name, parent, kind) {
            if (kind === void 0) {
                kind = StateJS.PseudoStateKind.Initial;
            }
            _super.call(this, name, parent);
            this.kind = kind;
        }
        /**
         * Tests a pseudo state to determine if it is a history pseudo state.
         * History pseudo states are of kind: Initial, ShallowHisory, or DeepHistory.
         * @method isHistory
         * @returns {boolean} True if the pseudo state is a history pseudo state.
         */
        PseudoState.prototype.isHistory = function () {
            return this.kind === StateJS.PseudoStateKind.DeepHistory || this.kind === StateJS.PseudoStateKind.ShallowHistory;
        };
        /**
         * Tests a pseudo state to determine if it is an initial pseudo state.
         * Initial pseudo states are of kind: Initial, ShallowHisory, or DeepHistory.
         * @method isInitial
         * @returns {boolean} True if the pseudo state is an initial pseudo state.
         */
        PseudoState.prototype.isInitial = function () {
            return this.kind === StateJS.PseudoStateKind.Initial || this.isHistory();
        };
        /**
         * Accepts an instance of a visitor and calls the visitPseudoState method on it.
         * @method accept
         * @param {Visitor<TArg1>} visitor The visitor instance.
         * @param {TArg1} arg1 An optional argument to pass into the visitor.
         * @param {any} arg2 An optional argument to pass into the visitor.
         * @param {any} arg3 An optional argument to pass into the visitor.
         * @returns {any} Any value can be returned by the visitor.
         */
        PseudoState.prototype.accept = function (visitor, arg1, arg2, arg3) {
            return visitor.visitPseudoState(this, arg1, arg2, arg3);
        };
        return PseudoState;
    })(StateJS.Vertex);
    StateJS.PseudoState = PseudoState;
})(StateJS || (StateJS = {}));
/*
 * Finite state machine library
 * Copyright (c) 2014-5 Steelbreeze Limited
 * Licensed under the MIT and GPL v3 licences
 * http://www.steelbreeze.net/state.cs
 */
var StateJS;
(function (StateJS) {
    /**
     * An element within a state machine model that represents an invariant condition within the life of the state machine instance.
     *
     * States are one of the fundamental building blocks of the state machine model.
     * Behaviour can be defined for both state entry and state exit.
     *
     * State extends the Vertex class and inherits its public interface.
     * @class State
     * @augments Vertex
     */
    var State = (function (_super) {
        __extends(State, _super);
        /**
         * Creates a new instance of the State class.
         * @param {string} name The name of the state.
         * @param {Element} parent The parent state that owns the state.
         */
        function State(name, parent) {
            _super.call(this, name, parent);
            // user defined behaviour (via exit method) to execute when exiting a state.
            this.exitBehavior = new StateJS.Behavior();
            // user defined behaviour (via entry method) to execute when entering a state.
            this.entryBehavior = new StateJS.Behavior();
            /**
             * The set of regions under this state.
             * @member {Array<Region>}
             */
            this.regions = [];
        }
        /**
         * Returns the default region for the state.
         * Note, this will create the default region if it does not already exist.
         * @method defaultRegion
         * @returns {Region} The default region.
         */
        State.prototype.defaultRegion = function () {
            return this.regions.reduce(function (result, region) {
                return region.name === StateJS.Region.defaultName ? region : result;
            }, undefined) || new StateJS.Region(StateJS.Region.defaultName, this);
        };
        /**
         * Tests the state to see if it is a final state;
         * a final state is one that has no outbound transitions.
         * @method isFinal
         * @returns {boolean} True if the state is a final state.
         */
        State.prototype.isFinal = function () {
            return this.outgoing.length === 0;
        };
        /**
         * Tests the state to see if it is a simple state;
         * a simple state is one that has no child regions.
         * @method isSimple
         * @returns {boolean} True if the state is a simple state.
         */
        State.prototype.isSimple = function () {
            return this.regions.length === 0;
        };
        /**
         * Tests the state to see if it is a composite state;
         * a composite state is one that has one or more child regions.
         * @method isComposite
         * @returns {boolean} True if the state is a composite state.
         */
        State.prototype.isComposite = function () {
            return this.regions.length > 0;
        };
        /**
         * Tests the state to see if it is an orthogonal state;
         * an orthogonal state is one that has two or more child regions.
         * @method isOrthogonal
         * @returns {boolean} True if the state is an orthogonal state.
         */
        State.prototype.isOrthogonal = function () {
            return this.regions.length > 1;
        };
        /**
         * Adds behaviour to a state that is executed each time the state is exited.
         * @method exit
         * @param {Action} exitAction The action to add to the state's exit behaviour.
         * @returns {State} Returns the state to allow a fluent style API.
         */
        State.prototype.exit = function (exitAction) {
            this.exitBehavior.push(exitAction);
            this.getRoot().clean = false;
            return this;
        };
        /**
         * Adds behaviour to a state that is executed each time the state is entered.
         * @method entry
         * @param {Action} entryAction The action to add to the state's entry behaviour.
         * @returns {State} Returns the state to allow a fluent style API.
         */
        State.prototype.entry = function (entryAction) {
            this.entryBehavior.push(entryAction);
            this.getRoot().clean = false;
            return this;
        };
        /**
         * Accepts an instance of a visitor and calls the visitState method on it.
         * @method accept
         * @param {Visitor<TArg1>} visitor The visitor instance.
         * @param {TArg1} arg1 An optional argument to pass into the visitor.
         * @param {any} arg2 An optional argument to pass into the visitor.
         * @param {any} arg3 An optional argument to pass into the visitor.
         * @returns {any} Any value can be returned by the visitor.
         */
        State.prototype.accept = function (visitor, arg1, arg2, arg3) {
            return visitor.visitState(this, arg1, arg2, arg3);
        };
        return State;
    })(StateJS.Vertex);
    StateJS.State = State;
})(StateJS || (StateJS = {}));
/*
 * Finite state machine library
 * Copyright (c) 2014-5 Steelbreeze Limited
 * Licensed under the MIT and GPL v3 licences
 * http://www.steelbreeze.net/state.cs
 */
var StateJS;
(function (StateJS) {
    /**
     * An element within a state machine model that represents completion of the life of the containing Region within the state machine instance.
     *
     * A final state cannot have outbound transitions.
     *
     * FinalState extends the State class and inherits its public interface.
     * @class FinalState
     * @augments State
     */
    var FinalState = (function (_super) {
        __extends(FinalState, _super);
        /**
         * Creates a new instance of the FinalState class.
         * @param {string} name The name of the final state.
         * @param {Element} parent The parent element that owns the final state.
         */
        function FinalState(name, parent) {
            _super.call(this, name, parent);
        }
        /**
         * Accepts an instance of a visitor and calls the visitFinalState method on it.
         * @method accept
         * @param {Visitor<TArg>} visitor The visitor instance.
         * @param {TArg} arg An optional argument to pass into the visitor.
         * @returns {any} Any value can be returned by the visitor.
         */
        FinalState.prototype.accept = function (visitor, arg1, arg2, arg3) {
            return visitor.visitFinalState(this, arg1, arg2, arg3);
        };
        return FinalState;
    })(StateJS.State);
    StateJS.FinalState = FinalState;
})(StateJS || (StateJS = {}));
/*
 * Finite state machine library
 * Copyright (c) 2014-5 Steelbreeze Limited
 * Licensed under the MIT and GPL v3 licences
 * http://www.steelbreeze.net/state.cs
 */
var StateJS;
(function (StateJS) {
    /**
     * An element within a state machine model that represents the root of the state machine model.
     *
     * StateMachine extends the State class and inherits its public interface.
     * @class StateMachine
     * @augments State
     */
    var StateMachine = (function (_super) {
        __extends(StateMachine, _super);
        /**
         * Creates a new instance of the StateMachine class.
         * @param {string} name The name of the state machine.
         */
        function StateMachine(name) {
            _super.call(this, name, undefined);
            // flag used to indicate that the state machine model has has structural changes and therefore requires initialising.
            this.clean = false;
        }
        /**
         * Returns the root element within the state machine model.
         * Note that if this state machine is embeded within another state machine, the ultimate root element will be returned.
         * @method getRoot
         * @returns {StateMachine} The root state machine element.
         */
        StateMachine.prototype.getRoot = function () {
            return this.region ? this.region.getRoot() : this;
        };
        /**
         * Accepts an instance of a visitor and calls the visitStateMachine method on it.
         * @method accept
         * @param {Visitor<TArg1>} visitor The visitor instance.
         * @param {TArg1} arg1 An optional argument to pass into the visitor.
         * @param {any} arg2 An optional argument to pass into the visitor.
         * @param {any} arg3 An optional argument to pass into the visitor.
         * @returns {any} Any value can be returned by the visitor.
         */
        StateMachine.prototype.accept = function (visitor, arg1, arg2, arg3) {
            return visitor.visitStateMachine(this, arg1, arg2, arg3);
        };
        return StateMachine;
    })(StateJS.State);
    StateJS.StateMachine = StateMachine;
})(StateJS || (StateJS = {}));
/*
 * Finite state machine library
 * Copyright (c) 2014-5 Steelbreeze Limited
 * Licensed under the MIT and GPL v3 licences
 * http://www.steelbreeze.net/state.cs
 */
var StateJS;
(function (StateJS) {
    /**
     * A transition between vertices (states or pseudo states) that may be traversed in response to a message.
     *
     * Transitions come in a variety of types:
     * internal transitions respond to messages but do not cause a state transition, they only have behaviour;
     * local transitions are contained within a single region therefore the source vertex is exited, the transition traversed, and the target state entered;
     * external transitions are more complex in nature as they cross region boundaries, all elements up to but not not including the common ancestor are exited and entered.
     *
     * Entering a composite state will cause the entry of the child regions within the composite state; this in turn may trigger more transitions.
     * @class Transition
     */
    var Transition = (function () {
        /**
         * Creates a new instance of the Transition class.
         * @param {Vertex} source The source of the transition.
         * @param {Vertex} source The target of the transition; this is an optional parameter, omitting it will create an Internal transition.
         * @param {TransitionKind} kind The kind the transition; use this to set Local or External (the default if omitted) transition semantics.
         */
        function Transition(source, target, kind) {
            var _this = this;
            if (kind === void 0) {
                kind = StateJS.TransitionKind.External;
            }
            // user defined behaviour (via effect) executed when traversing this transition.
            this.transitionBehavior = new StateJS.Behavior();
            // the collected actions to perform when traversing the transition (includes exiting states, traversal, and state entry)
            this.onTraverse = new StateJS.Behavior();
            this.source = source;
            this.target = target;
            this.kind = target ? kind : StateJS.TransitionKind.Internal;
            this.guard = source instanceof StateJS.PseudoState ? Transition.TrueGuard : function (message) {
                return message === _this.source;
            };
            this.source.outgoing.push(this);
            this.source.getRoot().clean = false;
        }
        /**
         * Turns a transition into an else transition.
         *
         * Else transitions can be used at `Junction` or `Choice` pseudo states if no other transition guards evaluate true, an Else transition if present will be traversed.
         * @method else
         * @returns {Transition} Returns the transition object to enable the fluent API.
         */
        Transition.prototype["else"] = function () {
            this.guard = Transition.FalseGuard;
            return this;
        };
        /**
         * Defines the guard condition for the transition.
         * @method when
         * @param {Guard} guard The guard condition that must evaluate true for the transition to be traversed.
         * @returns {Transition} Returns the transition object to enable the fluent API.
         */
        Transition.prototype.when = function (guard) {
            this.guard = guard;
            return this;
        };
        /**
         * Add behaviour to a transition.
         * @method effect
         * @param {Action} transitionAction The action to add to the transitions traversal behaviour.
         * @returns {Transition} Returns the transition object to enable the fluent API.
         */
        Transition.prototype.effect = function (transitionAction) {
            this.transitionBehavior.push(transitionAction);
            this.source.getRoot().clean = false;
            return this;
        };
        /**
         * Accepts an instance of a visitor and calls the visitTransition method on it.
         * @method accept
         * @param {Visitor<TArg1>} visitor The visitor instance.
         * @param {TArg1} arg1 An optional argument to pass into the visitor.
         * @param {any} arg2 An optional argument to pass into the visitor.
         * @param {any} arg3 An optional argument to pass into the visitor.
         * @returns {any} Any value can be returned by the visitor.
         */
        Transition.prototype.accept = function (visitor, arg1, arg2, arg3) {
            return visitor.visitTransition(this, arg1, arg2, arg3);
        };
        /**
         * Returns a the transition name.
         * @method toString
         * @returns {string}
         */
        Transition.prototype.toString = function () {
            return "[" + (this.target ? this.source + " -> " + this.target : this.source) + "]";
        };
        // the default guard condition for pseudo states
        Transition.TrueGuard = function () {
            return true;
        };
        // used as the guard condition for else tranitions
        Transition.FalseGuard = function () {
            return false;
        };
        return Transition;
    })();
    StateJS.Transition = Transition;
})(StateJS || (StateJS = {}));
/*
 * Finite state machine library
 * Copyright (c) 2014-5 Steelbreeze Limited
 * Licensed under the MIT and GPL v3 licences
 * http://www.steelbreeze.net/state.cs
 */
var StateJS;
(function (StateJS) {
    /**
     * Implementation of a visitor pattern.
     * @class Visitor
     */
    var Visitor = (function () {
        function Visitor() {}
        /**
         * Visits an element within a state machine model.
         * @method visitElement
         * @param {Element} element the element being visited.
         * @param {TArg1} arg1 An optional parameter passed into the accept method.
         * @param {any} arg2 An optional parameter passed into the accept method.
         * @param {any} arg3 An optional parameter passed into the accept method.
         * @returns {any} Any value may be returned when visiting an element.
         */
        Visitor.prototype.visitElement = function (element, arg1, arg2, arg3) {};
        /**
         * Visits a region within a state machine model.
         * @method visitRegion
         * @param {Region} region The region being visited.
         * @param {TArg1} arg1 An optional parameter passed into the accept method.
         * @param {any} arg2 An optional parameter passed into the accept method.
         * @param {any} arg3 An optional parameter passed into the accept method.
         * @returns {any} Any value may be returned when visiting an element.
         */
        Visitor.prototype.visitRegion = function (region, arg1, arg2, arg3) {
            var _this = this;
            var result = this.visitElement(region, arg1, arg2, arg3);
            region.vertices.forEach(function (vertex) {
                vertex.accept(_this, arg1, arg2, arg3);
            });
            return result;
        };
        /**
         * Visits a vertex within a state machine model.
         * @method visitVertex
         * @param {Vertex} vertex The vertex being visited.
         * @param {TArg1} arg1 An optional parameter passed into the accept method.
         * @param {any} arg2 An optional parameter passed into the accept method.
         * @param {any} arg3 An optional parameter passed into the accept method.
         * @returns {any} Any value may be returned when visiting an element.
         */
        Visitor.prototype.visitVertex = function (vertex, arg1, arg2, arg3) {
            var _this = this;
            var result = this.visitElement(vertex, arg1, arg2, arg3);
            vertex.outgoing.forEach(function (transition) {
                transition.accept(_this, arg1, arg2, arg3);
            });
            return result;
        };
        /**
         * Visits a pseudo state within a state machine model.
         * @method visitPseudoState
         * @param {PseudoState} pseudoState The pseudo state being visited.
         * @param {TArg1} arg1 An optional parameter passed into the accept method.
         * @param {any} arg2 An optional parameter passed into the accept method.
         * @param {any} arg3 An optional parameter passed into the accept method.
         * @returns {any} Any value may be returned when visiting an element.
         */
        Visitor.prototype.visitPseudoState = function (pseudoState, arg1, arg2, arg3) {
            return this.visitVertex(pseudoState, arg1, arg2, arg3);
        };
        /**
         * Visits a state within a state machine model.
         * @method visitState
         * @param {State} state The state being visited.
         * @param {TArg1} arg1 An optional parameter passed into the accept method.
         * @param {any} arg2 An optional parameter passed into the accept method.
         * @param {any} arg3 An optional parameter passed into the accept method.
         * @returns {any} Any value may be returned when visiting an element.
         */
        Visitor.prototype.visitState = function (state, arg1, arg2, arg3) {
            var _this = this;
            var result = this.visitVertex(state, arg1, arg2, arg3);
            state.regions.forEach(function (region) {
                region.accept(_this, arg1, arg2, arg3);
            });
            return result;
        };
        /**
         * Visits a final state within a state machine model.
         * @method visitFinal
         * @param {FinalState} finalState The final state being visited.
         * @param {TArg1} arg1 An optional parameter passed into the accept method.
         * @param {any} arg2 An optional parameter passed into the accept method.
         * @param {any} arg3 An optional parameter passed into the accept method.
         * @returns {any} Any value may be returned when visiting an element.
         */
        Visitor.prototype.visitFinalState = function (finalState, arg1, arg2, arg3) {
            return this.visitState(finalState, arg1, arg2, arg3);
        };
        /**
         * Visits a state machine within a state machine model.
         * @method visitVertex
         * @param {StateMachine} state machine The state machine being visited.
         * @param {TArg1} arg1 An optional parameter passed into the accept method.
         * @param {any} arg2 An optional parameter passed into the accept method.
         * @param {any} arg3 An optional parameter passed into the accept method.
         * @returns {any} Any value may be returned when visiting an element.
         */
        Visitor.prototype.visitStateMachine = function (stateMachine, arg1, arg2, arg3) {
            return this.visitState(stateMachine, arg1, arg2, arg3);
        };
        /**
         * Visits a transition within a state machine model.
         * @method visitTransition
         * @param {Transition} transition The transition being visited.
         * @param {TArg1} arg1 An optional parameter passed into the accept method.
         * @param {any} arg2 An optional parameter passed into the accept method.
         * @param {any} arg3 An optional parameter passed into the accept method.
         * @returns {any} Any value may be returned when visiting an element.
         */
        Visitor.prototype.visitTransition = function (transition, arg1, arg2, arg3) {};
        return Visitor;
    })();
    StateJS.Visitor = Visitor;
})(StateJS || (StateJS = {}));
/*
 * Finite state machine library
 * Copyright (c) 2014-5 Steelbreeze Limited
 * Licensed under the MIT and GPL v3 licences
 * http://www.steelbreeze.net/state.cs
 */
var StateJS;
(function (StateJS) {
    /**
     * Default working implementation of a state machine instance class.
     *
     * Implements the `IActiveStateConfiguration` interface.
     * It is possible to create other custom instance classes to manage state machine state in other ways (e.g. as serialisable JSON); just implement the same members and methods as this class.
     * @class StateMachineInstance
     * @implements IActiveStateConfiguration
     */
    var StateMachineInstance = (function () {
        /**
         * Creates a new instance of the state machine instance class.
         * @param {string} name The optional name of the state machine instance.
         */
        function StateMachineInstance(name) {
            if (name === void 0) {
                name = "unnamed";
            }
            this.last = {};
            /**
             * Indicates that the state manchine instance reached was terminated by reaching a Terminate pseudo state.
             * @member isTerminated
             */
            this.isTerminated = false;
            this.name = name;
        }
        // Updates the last known state for a given region.
        StateMachineInstance.prototype.setCurrent = function (region, state) {
            this.last[region.qualifiedName] = state;
        };
        // Returns the last known state for a given region.
        StateMachineInstance.prototype.getCurrent = function (region) {
            return this.last[region.qualifiedName];
        };
        /**
         * Returns the name of the state machine instance.
         * @method toString
         * @returns {string} The name of the state machine instance.
         */
        StateMachineInstance.prototype.toString = function () {
            return this.name;
        };
        return StateMachineInstance;
    })();
    StateJS.StateMachineInstance = StateMachineInstance;
})(StateJS || (StateJS = {}));
/*
 * Finite state machine library
 * Copyright (c) 2014-5 Steelbreeze Limited
 * Licensed under the MIT and GPL v3 licences
 * http://www.steelbreeze.net/state.cs
 */
var StateJS;
(function (StateJS) {
    /**
     * Sets a method to select an integer random number less than the max value passed as a parameter.
     *
     * This is only useful when a custom random number generator is required; the default implementation is fine in most circumstances.
     * @function setRandom
     * @param {function} generator A function that takes a max value and returns a random number between 0 and max - 1.
     * @returns A random number between 0 and max - 1
     */
    function setRandom(generator) {
        random = generator;
    }
    StateJS.setRandom = setRandom;
    /**
     * Returns the current method used to select an integer random number less than the max value passed as a parameter.
     *
     * This is only useful when a custom random number generator is required; the default implementation is fine in most circumstances.
     * @function getRandom
     * @returns {function} The function that takes a max value and returns a random number between 0 and max - 1.
     */
    function getRandom() {
        return random;
    }
    StateJS.getRandom = getRandom;
    // the default method used to produce a random number; defaulting to simplified implementation seen in Mozilla Math.random() page; may be overriden for testing
    var random = function random(max) {
        return Math.floor(Math.random() * max);
    };
})(StateJS || (StateJS = {}));
/*
 * Finite state machine library
 * Copyright (c) 2014-5 Steelbreeze Limited
 * Licensed under the MIT and GPL v3 licences
 * http://www.steelbreeze.net/state.cs
 */
var StateJS;
(function (StateJS) {
    /**
     * Determines if an element is currently active; that it has been entered but not yet exited.
     * @function isActive
     * @param {Element} element The state to test.
     * @param {IActiveStateConfiguration} instance The instance of the state machine model.
     * @returns {boolean} True if the element is active.
     */
    function isActive(_x, _x2) {
        var _again = true;

        _function: while (_again) {
            var element = _x,
                stateMachineInstance = _x2;
            _again = false;

            if (element instanceof StateJS.Region) {
                _x = element.state;
                _x2 = stateMachineInstance;
                _again = true;
                continue _function;
            } else if (element instanceof StateJS.State) {
                return element.region ? isActive(element.region, stateMachineInstance) && stateMachineInstance.getCurrent(element.region) === element : true;
            }
        }
    }
    StateJS.isActive = isActive;
})(StateJS || (StateJS = {}));
/*
 * Finite state machine library
 * Copyright (c) 2014-5 Steelbreeze Limited
 * Licensed under the MIT and GPL v3 licences
 * http://www.steelbreeze.net/state.cs
 */
var StateJS;
(function (StateJS) {
    /**
     * Tests an element within a state machine instance to see if its lifecycle is complete.
     * @function isComplete
     * @param {Element} element The element to test.
     * @param {IActiveStateConfiguration} instance The instance of the state machine model to test for completeness.
     * @returns {boolean} True if the element is complete.
     */
    function isComplete(element, instance) {
        if (element instanceof StateJS.Region) {
            return instance.getCurrent(element).isFinal();
        } else if (element instanceof StateJS.State) {
            return element.regions.every(function (region) {
                return isComplete(region, instance);
            });
        }
        return true;
    }
    StateJS.isComplete = isComplete;
})(StateJS || (StateJS = {}));
/*
 * Finite state machine library
 * Copyright (c) 2014-5 Steelbreeze Limited
 * Licensed under the MIT and GPL v3 licences
 * http://www.steelbreeze.net/state.cs
 */
var StateJS;
(function (StateJS) {
    /**
     * Initialises a state machine and/or state machine model.
     *
     * Passing just the state machine model will initialise the model, passing the model and instance will initialse the instance and if necessary, the model.
     * @function initialise
     * @param {StateMachine} stateMachineModel The state machine model. If autoInitialiseModel is true (or no instance is specified) and the model has changed, the model will be initialised.
     * @param {IActiveStateConfiguration} stateMachineInstance The optional state machine instance to initialise.
     * @param {boolean} autoInitialiseModel Defaulting to true, this will cause the model to be initialised prior to initialising the instance if the model has changed.
     */
    function initialise(stateMachineModel, stateMachineInstance, autoInitialiseModel) {
        if (autoInitialiseModel === void 0) {
            autoInitialiseModel = true;
        }
        if (stateMachineInstance) {
            // initialise the state machine model if necessary
            if (autoInitialiseModel && stateMachineModel.clean === false) {
                initialise(stateMachineModel);
            }
            // log as required
            StateJS.console.log("initialise " + stateMachineInstance);
            // enter the state machine instance for the first time
            stateMachineModel.onInitialise.invoke(undefined, stateMachineInstance);
        } else {
            // log as required
            StateJS.console.log("initialise " + stateMachineModel.name);
            // initialise the state machine model
            stateMachineModel.accept(new InitialiseElements(), false);
            stateMachineModel.clean = true;
        }
    }
    StateJS.initialise = initialise;
    /**
     * Passes a message to a state machine for evaluation; messages trigger state transitions.
     * @function evaluate
     * @param {StateMachine} stateMachineModel The state machine model. If autoInitialiseModel is true (or no instance is specified) and the model has changed, the model will be initialised.
     * @param {IActiveStateConfiguration} stateMachineInstance The instance of the state machine model to evaluate the message against.
     * @param {boolean} autoInitialiseModel Defaulting to true, this will cause the model to be initialised prior to initialising the instance if the model has changed.
     * @returns {boolean} True if the message triggered a state transition.
     */
    function evaluate(stateMachineModel, stateMachineInstance, message, autoInitialiseModel) {
        if (autoInitialiseModel === void 0) {
            autoInitialiseModel = true;
        }
        // log as required
        StateJS.console.log(stateMachineInstance + " evaluate " + message);
        // initialise the state machine model if necessary
        if (autoInitialiseModel && stateMachineModel.clean === false) {
            initialise(stateMachineModel);
        }
        // terminated state machine instances will not evaluate messages
        if (stateMachineInstance.isTerminated) {
            return false;
        }
        return evaluateState(stateMachineModel, stateMachineInstance, message);
    }
    StateJS.evaluate = evaluate;
    // evaluates messages against a state, executing transitions as appropriate
    function evaluateState(state, stateMachineInstance, message) {
        var result = false;
        // delegate to child regions first
        state.regions.every(function (region) {
            if (evaluateState(stateMachineInstance.getCurrent(region), stateMachineInstance, message)) {
                result = true;
                return StateJS.isActive(state, stateMachineInstance); // NOTE: this just controls the every loop; also isActive is a litte costly so using sparingly
            }
            return true; // NOTE: this just controls the every loop
        });
        // if a transition occured in a child region, check for completions
        if (result) {
            if (message !== state && StateJS.isComplete(state, stateMachineInstance)) {
                evaluateState(state, stateMachineInstance, state);
            }
        } else {
            // otherwise look for a transition from this state
            var transitions = state.outgoing.filter(function (transition) {
                return transition.guard(message, stateMachineInstance);
            });
            if (transitions.length === 1) {
                // execute if a single transition was found
                result = traverse(transitions[0], stateMachineInstance, message);
            } else if (transitions.length > 1) {
                // error if multiple transitions evaluated true
                StateJS.console.error(state + ": multiple outbound transitions evaluated true for message " + message);
            }
        }
        return result;
    }
    // traverses a transition
    function traverse(transition, instance, message) {
        var onTraverse = new StateJS.Behavior(transition.onTraverse),
            target = transition.target;
        // process static conditional branches
        while (target && target instanceof StateJS.PseudoState && target.kind === StateJS.PseudoStateKind.Junction) {
            target = (transition = selectTransition(target, instance, message)).target;
            // concatenate behaviour before and after junctions
            onTraverse.push(transition.onTraverse);
        }
        // execute the transition behaviour
        onTraverse.invoke(message, instance);
        // process dynamic conditional branches
        if (target && target instanceof StateJS.PseudoState && target.kind === StateJS.PseudoStateKind.Choice) {
            traverse(selectTransition(target, instance, message), instance, message);
        } else if (target && target instanceof StateJS.State && StateJS.isComplete(target, instance)) {
            // test for completion transitions
            evaluateState(target, instance, target);
        }
        return true;
    }
    // select next leg of composite transitions after choice and junction pseudo states
    function selectTransition(pseudoState, stateMachineInstance, message) {
        var results = pseudoState.outgoing.filter(function (transition) {
            return transition.guard(message, stateMachineInstance);
        });
        if (pseudoState.kind === StateJS.PseudoStateKind.Choice) {
            return results.length !== 0 ? results[StateJS.getRandom()(results.length)] : findElse(pseudoState);
        } else {
            if (results.length > 1) {
                StateJS.console.error("Multiple outbound transition guards returned true at " + this + " for " + message);
            } else {
                return results[0] || findElse(pseudoState);
            }
        }
    }
    // look for else transitins from a junction or choice
    function findElse(pseudoState) {
        return pseudoState.outgoing.filter(function (transition) {
            return transition.guard === StateJS.Transition.FalseGuard;
        })[0];
    }
    // functions to retreive specif element behavior
    function leave(elementBehavior) {
        return elementBehavior[0] || (elementBehavior[0] = new StateJS.Behavior());
    }
    function beginEnter(elementBehavior) {
        return elementBehavior[1] || (elementBehavior[1] = new StateJS.Behavior());
    }
    function endEnter(elementBehavior) {
        return elementBehavior[2] || (elementBehavior[2] = new StateJS.Behavior());
    }
    function enter(elementBehavior) {
        return new StateJS.Behavior(beginEnter(elementBehavior)).push(endEnter(elementBehavior));
    }
    // get all the vertex ancestors of a vertex (including the vertex itself)
    function ancestors(vertex) {
        return (vertex.region ? ancestors(vertex.region.state) : []).concat(vertex);
    }
    // determine the type of transition and use the appropriate initiliasition method
    var InitialiseTransitions = (function (_super) {
        __extends(InitialiseTransitions, _super);
        function InitialiseTransitions() {
            _super.apply(this, arguments);
        }
        InitialiseTransitions.prototype.visitTransition = function (transition, behaviour) {
            if (transition.kind === StateJS.TransitionKind.Internal) {
                transition.onTraverse.push(transition.transitionBehavior);
            } else if (transition.kind === StateJS.TransitionKind.Local) {
                this.visitLocalTransition(transition, behaviour);
            } else {
                this.visitExternalTransition(transition, behaviour);
            }
        };
        // initialise internal transitions: these do not leave the source state
        InitialiseTransitions.prototype.visitLocalTransition = function (transition, behaviour) {
            var _this = this;
            transition.onTraverse.push(function (message, instance) {
                var targetAncestors = ancestors(transition.target),
                    i = 0;
                // find the first inactive element in the target ancestry
                while (StateJS.isActive(targetAncestors[i], instance)) {
                    ++i;
                }
                // exit the active sibling
                leave(behaviour(instance.getCurrent(targetAncestors[i].region))).invoke(message, instance);
                // perform the transition action;
                transition.transitionBehavior.invoke(message, instance);
                // enter the target ancestry
                while (i < targetAncestors.length) {
                    _this.cascadeElementEntry(transition, behaviour, targetAncestors[i++], targetAncestors[i], function (behavior) {
                        behavior.invoke(message, instance);
                    });
                }
                // trigger cascade
                endEnter(behaviour(transition.target)).invoke(message, instance);
            });
        };
        // initialise external transitions: these are abritarily complex
        InitialiseTransitions.prototype.visitExternalTransition = function (transition, behaviour) {
            var sourceAncestors = ancestors(transition.source),
                targetAncestors = ancestors(transition.target),
                i = Math.min(sourceAncestors.length, targetAncestors.length) - 1;
            // find the index of the first uncommon ancestor (or for external transitions, the source)
            while (sourceAncestors[i - 1] !== targetAncestors[i - 1]) {
                --i;
            }
            // leave source ancestry as required
            transition.onTraverse.push(leave(behaviour(sourceAncestors[i])));
            // perform the transition effect
            transition.onTraverse.push(transition.transitionBehavior);
            // enter the target ancestry
            while (i < targetAncestors.length) {
                this.cascadeElementEntry(transition, behaviour, targetAncestors[i++], targetAncestors[i], function (behavior) {
                    return transition.onTraverse.push(behavior);
                });
            }
            // trigger cascade
            transition.onTraverse.push(endEnter(behaviour(transition.target)));
        };
        InitialiseTransitions.prototype.cascadeElementEntry = function (transition, behaviour, element, next, task) {
            task(beginEnter(behaviour(element)));
            if (next && element instanceof StateJS.State) {
                element.regions.forEach(function (region) {
                    task(beginEnter(behaviour(region)));
                    if (region !== next.region) {
                        task(endEnter(behaviour(region)));
                    }
                });
            }
        };
        return InitialiseTransitions;
    })(StateJS.Visitor);
    // bootstraps all the elements within a state machine model
    var InitialiseElements = (function (_super) {
        __extends(InitialiseElements, _super);
        function InitialiseElements() {
            _super.apply(this, arguments);
            this.behaviours = {};
        }
        InitialiseElements.prototype.behaviour = function (element) {
            return this.behaviours[element.qualifiedName] || (this.behaviours[element.qualifiedName] = []);
        };
        InitialiseElements.prototype.visitElement = function (element, deepHistoryAbove) {
            if (StateJS.console !== defaultConsole) {
                leave(this.behaviour(element)).push(function (message, instance) {
                    return StateJS.console.log(instance + " leave " + element);
                });
                beginEnter(this.behaviour(element)).push(function (message, instance) {
                    return StateJS.console.log(instance + " enter " + element);
                });
            }
        };
        InitialiseElements.prototype.visitRegion = function (region, deepHistoryAbove) {
            var _this = this;
            var regionInitial = region.vertices.reduce(function (result, vertex) {
                return vertex instanceof StateJS.PseudoState && vertex.isInitial() ? vertex : result;
            }, undefined);
            region.vertices.forEach(function (vertex) {
                vertex.accept(_this, deepHistoryAbove || regionInitial && regionInitial.kind === StateJS.PseudoStateKind.DeepHistory);
            });
            // leave the curent active child state when exiting the region
            leave(this.behaviour(region)).push(function (message, stateMachineInstance) {
                return leave(_this.behaviour(stateMachineInstance.getCurrent(region))).invoke(message, stateMachineInstance);
            });
            // enter the appropriate child vertex when entering the region
            if (deepHistoryAbove || !regionInitial || regionInitial.isHistory()) {
                endEnter(this.behaviour(region)).push(function (message, stateMachineInstance, history) {
                    enter(_this.behaviour(history || regionInitial.isHistory() ? stateMachineInstance.getCurrent(region) || regionInitial : regionInitial)).invoke(message, stateMachineInstance, history || regionInitial.kind === StateJS.PseudoStateKind.DeepHistory);
                });
            } else {
                endEnter(this.behaviour(region)).push(enter(this.behaviour(regionInitial)));
            }
            this.visitElement(region, deepHistoryAbove);
        };
        InitialiseElements.prototype.visitPseudoState = function (pseudoState, deepHistoryAbove) {
            _super.prototype.visitPseudoState.call(this, pseudoState, deepHistoryAbove);
            // evaluate comppletion transitions once vertex entry is complete
            if (pseudoState.isInitial()) {
                endEnter(this.behaviour(pseudoState)).push(function (message, stateMachineInstance) {
                    return traverse(pseudoState.outgoing[0], stateMachineInstance);
                });
            } else if (pseudoState.kind === StateJS.PseudoStateKind.Terminate) {
                // terminate the state machine instance upon transition to a terminate pseudo state
                beginEnter(this.behaviour(pseudoState)).push(function (message, stateMachineInstance) {
                    return stateMachineInstance.isTerminated = true;
                });
            }
        };
        InitialiseElements.prototype.visitState = function (state, deepHistoryAbove) {
            var _this = this;
            // NOTE: manually iterate over the child regions to control the sequence of behaviour
            state.regions.forEach(function (region) {
                region.accept(_this, deepHistoryAbove);
                leave(_this.behaviour(state)).push(leave(_this.behaviour(region)));
                endEnter(_this.behaviour(state)).push(enter(_this.behaviour(region)));
            });
            this.visitVertex(state, deepHistoryAbove);
            // add the user defined behaviour when entering and exiting states
            leave(this.behaviour(state)).push(state.exitBehavior);
            beginEnter(this.behaviour(state)).push(state.entryBehavior);
            // update the parent regions current state
            beginEnter(this.behaviour(state)).push(function (message, stateMachineInstance) {
                if (state.region) {
                    stateMachineInstance.setCurrent(state.region, state);
                }
            });
        };
        InitialiseElements.prototype.visitStateMachine = function (stateMachine, deepHistoryAbove) {
            var _this = this;
            _super.prototype.visitStateMachine.call(this, stateMachine, deepHistoryAbove);
            // initiaise all the transitions once all the elements have been initialised
            stateMachine.accept(new InitialiseTransitions(), function (element) {
                return _this.behaviour(element);
            });
            // define the behaviour for initialising a state machine instance
            stateMachine.onInitialise = enter(this.behaviour(stateMachine));
        };
        return InitialiseElements;
    })(StateJS.Visitor);
    var defaultConsole = {
        log: function log(message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        },
        warn: function warn(message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        },
        error: function error(message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            throw message;
        }
    };
    /**
     * The object used for log, warning and error messages
     * @member {IConsole}
     */
    StateJS.console = defaultConsole;
})(StateJS || (StateJS = {}));
/*
 * Finite state machine library
 * Copyright (c) 2014-5 Steelbreeze Limited
 * Licensed under the MIT and GPL v3 licences
 * http://www.steelbreeze.net/state.cs
 */
var StateJS;
(function (StateJS) {
    /**
     * Validates a state machine model for correctness (see the constraints defined within the UML Superstructure specification).
     * @function validate
     * @param {StateMachine} stateMachineModel The state machine model to validate.
     */
    function validate(stateMachineModel) {
        stateMachineModel.accept(new Validator());
    }
    StateJS.validate = validate;
    function ancestors(vertex) {
        return (vertex.region ? ancestors(vertex.region.state) : []).concat(vertex);
    }
    var Validator = (function (_super) {
        __extends(Validator, _super);
        function Validator() {
            _super.apply(this, arguments);
        }
        Validator.prototype.visitPseudoState = function (pseudoState) {
            _super.prototype.visitPseudoState.call(this, pseudoState);
            if (pseudoState.kind === StateJS.PseudoStateKind.Choice || pseudoState.kind === StateJS.PseudoStateKind.Junction) {
                // [7] In a complete statemachine, a junction vertex must have at least one incoming and one outgoing transition.
                // [8] In a complete statemachine, a choice vertex must have at least one incoming and one outgoing transition.
                if (pseudoState.outgoing.length === 0) {
                    StateJS.console.error(pseudoState + ": " + pseudoState.kind + " pseudo states must have at least one outgoing transition.");
                }
                // choice and junction pseudo state can have at most one else transition
                if (pseudoState.outgoing.filter(function (transition) {
                    return transition.guard === StateJS.Transition.FalseGuard;
                }).length > 1) {
                    StateJS.console.error(pseudoState + ": " + pseudoState.kind + " pseudo states cannot have more than one Else transitions.");
                }
            } else {
                // non choice/junction pseudo state may not have else transitions
                if (pseudoState.outgoing.filter(function (transition) {
                    return transition.guard === StateJS.Transition.FalseGuard;
                }).length !== 0) {
                    StateJS.console.error(pseudoState + ": " + pseudoState.kind + " pseudo states cannot have Else transitions.");
                }
                if (pseudoState.isInitial()) {
                    if (pseudoState.outgoing.length !== 1) {
                        // [1] An initial vertex can have at most one outgoing transition.
                        // [2] History vertices can have at most one outgoing transition.
                        StateJS.console.error(pseudoState + ": initial pseudo states must have one outgoing transition.");
                    } else {
                        // [9] The outgoing transition from an initial vertex may have a behavior, but not a trigger or guard.
                        if (pseudoState.outgoing[0].guard !== StateJS.Transition.TrueGuard) {
                            StateJS.console.error(pseudoState + ": initial pseudo states cannot have a guard condition.");
                        }
                    }
                }
            }
        };
        Validator.prototype.visitRegion = function (region) {
            _super.prototype.visitRegion.call(this, region);
            // [1] A region can have at most one initial vertex.
            // [2] A region can have at most one deep history vertex.
            // [3] A region can have at most one shallow history vertex.
            var initial;
            region.vertices.forEach(function (vertex) {
                if (vertex instanceof StateJS.PseudoState && vertex.isInitial()) {
                    if (initial) {
                        StateJS.console.error(region + ": regions may have at most one initial pseudo state.");
                    }
                    initial = vertex;
                }
            });
        };
        Validator.prototype.visitState = function (state) {
            _super.prototype.visitState.call(this, state);
            if (state.regions.filter(function (state) {
                return state.name === StateJS.Region.defaultName;
            }).length > 1) {
                StateJS.console.error(state + ": a state cannot have more than one region named " + StateJS.Region.defaultName);
            }
        };
        Validator.prototype.visitFinalState = function (finalState) {
            _super.prototype.visitFinalState.call(this, finalState);
            // [1] A final state cannot have any outgoing transitions.
            if (finalState.outgoing.length !== 0) {
                StateJS.console.error(finalState + ": final states must not have outgoing transitions.");
            }
            // [2] A final state cannot have regions.
            if (finalState.regions.length !== 0) {
                StateJS.console.error(finalState + ": final states must not have child regions.");
            }
            // [4] A final state has no entry behavior.
            if (finalState.entryBehavior.hasActions()) {
                StateJS.console.warn(finalState + ": final states may not have entry behavior.");
            }
            // [5] A final state has no exit behavior.
            if (finalState.exitBehavior.hasActions()) {
                StateJS.console.warn(finalState + ": final states may not have exit behavior.");
            }
        };
        Validator.prototype.visitTransition = function (transition) {
            _super.prototype.visitTransition.call(this, transition);
            // Local transition target vertices must be a child of the source vertex
            if (transition.kind === StateJS.TransitionKind.Local) {
                if (ancestors(transition.target).indexOf(transition.source) === -1) {
                    StateJS.console.error(transition + ": local transition target vertices must be a child of the source composite sate.");
                }
            }
        };
        return Validator;
    })(StateJS.Visitor);
})(StateJS || (StateJS = {}));
/*
 * Finite state machine library
 * Copyright (c) 2014-5 Steelbreeze Limited
 * Licensed under the MIT and GPL v3 licences
 * http://www.steelbreeze.net/state.cs
 */
//var module = module;
module.exports = StateJS;

cc._RFpop();
},{}]},{},["AudioMng","RankItem","Decks","ActorRenderer","Menu","Player","Bet","SideSwitcher","Mask","PlayerData","AssetMng","Types","Game","game-fsm","FXPlayer","state.com","Utils","Actor","ButtonScaler","Card","CounterTest","TossChip","Dealer","HotUpdate","InGameUI","RankList"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2ZpcmViYWxsL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL0FjdG9yUmVuZGVyZXIuanMiLCJzY3JpcHRzL0FjdG9yLmpzIiwic2NyaXB0cy9Bc3NldE1uZy5qcyIsInNjcmlwdHMvQXVkaW9NbmcuanMiLCJzY3JpcHRzL0JldC5qcyIsInNjcmlwdHMvVUkvQnV0dG9uU2NhbGVyLmpzIiwic2NyaXB0cy9DYXJkLmpzIiwic2NyaXB0cy9Db3VudGVyVGVzdC5qcyIsInNjcmlwdHMvRGVhbGVyLmpzIiwic2NyaXB0cy9tb2R1bGUvRGVja3MuanMiLCJzY3JpcHRzL0ZYUGxheWVyLmpzIiwic2NyaXB0cy9HYW1lLmpzIiwic2NyaXB0cy9tb2R1bGUvSG90VXBkYXRlLmpzIiwic2NyaXB0cy9VSS9JbkdhbWVVSS5qcyIsInNjcmlwdHMvbW9kdWxlL01hc2suanMiLCJzY3JpcHRzL01lbnUuanMiLCJzY3JpcHRzL21vZHVsZS9QbGF5ZXJEYXRhLmpzIiwic2NyaXB0cy9QbGF5ZXIuanMiLCJzY3JpcHRzL1VJL1JhbmtJdGVtLmpzIiwic2NyaXB0cy9VSS9SYW5rTGlzdC5qcyIsInNjcmlwdHMvU2lkZVN3aXRjaGVyLmpzIiwic2NyaXB0cy9Ub3NzQ2hpcC5qcyIsInNjcmlwdHMvbW9kdWxlL1R5cGVzLmpzIiwic2NyaXB0cy9tb2R1bGUvVXRpbHMuanMiLCJzY3JpcHRzL21vZHVsZS9nYW1lLWZzbS5qcyIsInNjcmlwdHMvbGliL3N0YXRlLmNvbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzFhNzkyS084N05CZzd2Q0NJcDFqcStqJywgJ0FjdG9yUmVuZGVyZXInKTtcbi8vIHNjcmlwdHMvQWN0b3JSZW5kZXJlci5qc1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBHYW1lID0gcmVxdWlyZSgnR2FtZScpO1xudmFyIFR5cGVzID0gcmVxdWlyZSgnVHlwZXMnKTtcbnZhciBVdGlscyA9IHJlcXVpcmUoJ1V0aWxzJyk7XG52YXIgQWN0b3JQbGF5aW5nU3RhdGUgPSBUeXBlcy5BY3RvclBsYXlpbmdTdGF0ZTtcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBwbGF5ZXJJbmZvOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIHN0YWtlT25UYWJsZToge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBjYXJkSW5mbzoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBjYXJkUHJlZmFiOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcbiAgICAgICAgYW5jaG9yQ2FyZHM6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgc3BQbGF5ZXJOYW1lOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWxQbGF5ZXJOYW1lOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBsYWJlbFRvdGFsU3Rha2U6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIHNwUGxheWVyUGhvdG86IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZVxuICAgICAgICB9LFxuICAgICAgICBzcENvdW50ZG93bjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsU3Rha2VPblRhYmxlOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBzcENoaXBzOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IFtdLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsQ2FyZEluZm86IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIHNwQ2FyZEluZm86IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZVxuICAgICAgICB9LFxuICAgICAgICBhbmltRlg6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgY2FyZFNwYWNlOiAwXG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KHBsYXllckluZm8sIHBsYXllckluZm9Qb3MsIHN0YWtlUG9zLCB0dXJuRHVyYXRpb24sIHN3aXRjaFNpZGUpIHtcbiAgICAgICAgLy8gYWN0b3JcbiAgICAgICAgdGhpcy5hY3RvciA9IHRoaXMuZ2V0Q29tcG9uZW50KCdBY3RvcicpO1xuXG4gICAgICAgIC8vIG5vZGVzXG4gICAgICAgIHRoaXMuc2dDb3VudGRvd24gPSBudWxsO1xuICAgICAgICB0aGlzLnR1cm5EdXJhdGlvbiA9IHR1cm5EdXJhdGlvbjtcblxuICAgICAgICB0aGlzLnBsYXllckluZm8ucG9zaXRpb24gPSBwbGF5ZXJJbmZvUG9zO1xuICAgICAgICB0aGlzLnN0YWtlT25UYWJsZS5wb3NpdGlvbiA9IHN0YWtlUG9zO1xuICAgICAgICB0aGlzLmxhYmVsUGxheWVyTmFtZS5zdHJpbmcgPSBwbGF5ZXJJbmZvLm5hbWU7XG4gICAgICAgIHRoaXMudXBkYXRlVG90YWxTdGFrZShwbGF5ZXJJbmZvLmdvbGQpO1xuICAgICAgICB2YXIgcGhvdG9JZHggPSBwbGF5ZXJJbmZvLnBob3RvSWR4ICUgNTtcbiAgICAgICAgdGhpcy5zcFBsYXllclBob3RvLnNwcml0ZUZyYW1lID0gR2FtZS5pbnN0YW5jZS5hc3NldE1uZy5wbGF5ZXJQaG90b3NbcGhvdG9JZHhdO1xuICAgICAgICAvLyBmeFxuICAgICAgICB0aGlzLmFuaW1GWCA9IHRoaXMuYW5pbUZYLmdldENvbXBvbmVudCgnRlhQbGF5ZXInKTtcbiAgICAgICAgdGhpcy5hbmltRlguaW5pdCgpO1xuICAgICAgICB0aGlzLmFuaW1GWC5zaG93KGZhbHNlKTtcblxuICAgICAgICB0aGlzLmNhcmRJbmZvLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NUaW1lciA9IHRoaXMuaW5pdENvdW50ZG93bigpO1xuXG4gICAgICAgIC8vIHN3aXRjaCBzaWRlXG4gICAgICAgIGlmIChzd2l0Y2hTaWRlKSB7XG4gICAgICAgICAgICB0aGlzLnNwQ2FyZEluZm8uZ2V0Q29tcG9uZW50KCdTaWRlU3dpdGNoZXInKS5zd2l0Y2hTaWRlKCk7XG4gICAgICAgICAgICB0aGlzLnNwUGxheWVyTmFtZS5nZXRDb21wb25lbnQoJ1NpZGVTd2l0Y2hlcicpLnN3aXRjaFNpZGUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpbml0RGVhbGVyOiBmdW5jdGlvbiBpbml0RGVhbGVyKCkge1xuICAgICAgICAvLyBhY3RvclxuICAgICAgICB0aGlzLmFjdG9yID0gdGhpcy5nZXRDb21wb25lbnQoJ0FjdG9yJyk7XG4gICAgICAgIC8vIGZ4XG4gICAgICAgIHRoaXMuYW5pbUZYID0gdGhpcy5hbmltRlguZ2V0Q29tcG9uZW50KCdGWFBsYXllcicpO1xuICAgICAgICB0aGlzLmFuaW1GWC5pbml0KCk7XG4gICAgICAgIHRoaXMuYW5pbUZYLnNob3coZmFsc2UpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVUb3RhbFN0YWtlOiBmdW5jdGlvbiB1cGRhdGVUb3RhbFN0YWtlKG51bSkge1xuICAgICAgICB0aGlzLmxhYmVsVG90YWxTdGFrZS5zdHJpbmcgPSAnJCcgKyBudW07XG4gICAgfSxcblxuICAgIGluaXRDb3VudGRvd246IGZ1bmN0aW9uIGluaXRDb3VudGRvd24oKSB7XG4gICAgICAgIHZhciBjb3VudGRvd25UZXggPSBHYW1lLmluc3RhbmNlLmFzc2V0TW5nLnRleENvdW50ZG93bi5nZXRUZXh0dXJlKCk7XG4gICAgICAgIHRoaXMuc2dDb3VudGRvd24gPSBuZXcgX2Njc2cuU3ByaXRlKGNvdW50ZG93blRleCk7XG5cbiAgICAgICAgdmFyIHByb2dyZXNzVGltZXIgPSBuZXcgY2MuUHJvZ3Jlc3NUaW1lcih0aGlzLnNnQ291bnRkb3duKTtcbiAgICAgICAgcHJvZ3Jlc3NUaW1lci5zZXROYW1lKCdwcm9ncmVzc1RpbWVyJyk7XG4gICAgICAgIHByb2dyZXNzVGltZXIuc2V0TWlkcG9pbnQoY2MucCgwLjUsIDAuNSkpO1xuICAgICAgICBwcm9ncmVzc1RpbWVyLnNldFR5cGUoY2MuUHJvZ3Jlc3NUaW1lci5UeXBlLlJBRElBTCk7XG4gICAgICAgIHRoaXMucGxheWVySW5mby5fc2dOb2RlLmFkZENoaWxkKHByb2dyZXNzVGltZXIpO1xuICAgICAgICBwcm9ncmVzc1RpbWVyLnNldFBvc2l0aW9uKGNjLnAoMCwgMCkpO1xuICAgICAgICBwcm9ncmVzc1RpbWVyLnNldFBlcmNlbnRhZ2UoMCk7XG5cbiAgICAgICAgcmV0dXJuIHByb2dyZXNzVGltZXI7XG4gICAgfSxcblxuICAgIHN0YXJ0Q291bnRkb3duOiBmdW5jdGlvbiBzdGFydENvdW50ZG93bigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NUaW1lcikge1xuICAgICAgICAgICAgdmFyIGZyb21UbyA9IGNjLnByb2dyZXNzRnJvbVRvKHRoaXMudHVybkR1cmF0aW9uLCAwLCAxMDApO1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1RpbWVyLnJ1bkFjdGlvbihmcm9tVG8pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlc2V0Q291bnRkb3duOiBmdW5jdGlvbiByZXNldENvdW50ZG93bigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NUaW1lcikge1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1RpbWVyLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzVGltZXIuc2V0UGVyY2VudGFnZSgwKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBwbGF5QmxhY2tKYWNrRlg6IGZ1bmN0aW9uIHBsYXlCbGFja0phY2tGWCgpIHtcbiAgICAgICAgdGhpcy5hbmltRlgucGxheUZYKCdibGFja2phY2snKTtcbiAgICB9LFxuXG4gICAgcGxheUJ1c3RGWDogZnVuY3Rpb24gcGxheUJ1c3RGWCgpIHtcbiAgICAgICAgdGhpcy5hbmltRlgucGxheUZYKCdidXN0Jyk7XG4gICAgfSxcblxuICAgIG9uRGVhbDogZnVuY3Rpb24gb25EZWFsKGNhcmQsIHNob3cpIHtcbiAgICAgICAgdmFyIG5ld0NhcmQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNhcmRQcmVmYWIpLmdldENvbXBvbmVudCgnQ2FyZCcpO1xuICAgICAgICB0aGlzLmFuY2hvckNhcmRzLmFkZENoaWxkKG5ld0NhcmQubm9kZSk7XG4gICAgICAgIG5ld0NhcmQuaW5pdChjYXJkKTtcbiAgICAgICAgbmV3Q2FyZC5yZXZlYWwoc2hvdyk7XG5cbiAgICAgICAgdmFyIHN0YXJ0UG9zID0gY2MucCgwLCAwKTtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5hY3Rvci5jYXJkcy5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgZW5kUG9zID0gY2MucCh0aGlzLmNhcmRTcGFjZSAqIGluZGV4LCAwKTtcbiAgICAgICAgbmV3Q2FyZC5ub2RlLnNldFBvc2l0aW9uKHN0YXJ0UG9zKTtcblxuICAgICAgICB2YXIgbW92ZUFjdGlvbiA9IGNjLm1vdmVUbygwLjUsIGVuZFBvcyk7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGNjLmNhbGxGdW5jKHRoaXMuX29uRGVhbEVuZCwgdGhpcywgdGhpcy5jYXJkU3BhY2UgKiBpbmRleCk7XG4gICAgICAgIG5ld0NhcmQubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UobW92ZUFjdGlvbiwgY2FsbGJhY2spKTtcbiAgICB9LFxuXG4gICAgX29uRGVhbEVuZDogZnVuY3Rpb24gX29uRGVhbEVuZCh0YXJnZXQsIHBvaW50WCkge1xuICAgICAgICB0aGlzLnJlc2V0Q291bnRkb3duKCk7XG4gICAgICAgIGlmICh0aGlzLmFjdG9yLnN0YXRlID09PSBBY3RvclBsYXlpbmdTdGF0ZS5Ob3JtYWwpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRDb3VudGRvd24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZVBvaW50KCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVBvaW50UG9zKHBvaW50WCk7XG4gICAgfSxcblxuICAgIG9uUmVzZXQ6IGZ1bmN0aW9uIG9uUmVzZXQoKSB7XG4gICAgICAgIHRoaXMuY2FyZEluZm8uYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5hbmNob3JDYXJkcy5yZW1vdmVBbGxDaGlsZHJlbigpO1xuXG4gICAgICAgIHRoaXMuX3Jlc2V0Q2hpcHMoKTtcbiAgICB9LFxuXG4gICAgb25SZXZlYWxIb2xkQ2FyZDogZnVuY3Rpb24gb25SZXZlYWxIb2xkQ2FyZCgpIHtcbiAgICAgICAgdmFyIGNhcmQgPSBjYy5maW5kKCdjYXJkUHJlZmFiJywgdGhpcy5hbmNob3JDYXJkcykuZ2V0Q29tcG9uZW50KCdDYXJkJyk7XG4gICAgICAgIGNhcmQucmV2ZWFsKHRydWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZVBvaW50OiBmdW5jdGlvbiB1cGRhdGVQb2ludCgpIHtcbiAgICAgICAgdGhpcy5jYXJkSW5mby5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmxhYmVsQ2FyZEluZm8uc3RyaW5nID0gdGhpcy5hY3Rvci5iZXN0UG9pbnQ7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLmFjdG9yLmhhbmQpIHtcbiAgICAgICAgICAgIGNhc2UgVHlwZXMuSGFuZC5CbGFja0phY2s6XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltRlguc2hvdyh0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1GWC5wbGF5RlgoJ2JsYWNramFjaycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUeXBlcy5IYW5kLkZpdmVDYXJkOlxuICAgICAgICAgICAgICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdXBkYXRlUG9pbnRQb3M6IGZ1bmN0aW9uIF91cGRhdGVQb2ludFBvcyh4UG9zKSB7XG4gICAgICAgIHRoaXMuY2FyZEluZm8uc2V0UG9zaXRpb25YKHhQb3MgKyA1MCk7XG4gICAgfSxcblxuICAgIHNob3dTdGFrZUNoaXBzOiBmdW5jdGlvbiBzaG93U3Rha2VDaGlwcyhzdGFrZSkge1xuICAgICAgICB2YXIgY2hpcHMgPSB0aGlzLnNwQ2hpcHM7XG4gICAgICAgIHZhciBjb3VudCA9IDA7XG4gICAgICAgIGlmIChzdGFrZSA+IDUwMDAwKSB7XG4gICAgICAgICAgICBjb3VudCA9IDU7XG4gICAgICAgIH0gZWxzZSBpZiAoc3Rha2UgPiAyNTAwMCkge1xuICAgICAgICAgICAgY291bnQgPSA0O1xuICAgICAgICB9IGVsc2UgaWYgKHN0YWtlID4gMTAwMDApIHtcbiAgICAgICAgICAgIGNvdW50ID0gMztcbiAgICAgICAgfSBlbHNlIGlmIChzdGFrZSA+IDUwMDApIHtcbiAgICAgICAgICAgIGNvdW50ID0gMjtcbiAgICAgICAgfSBlbHNlIGlmIChzdGFrZSA+IDApIHtcbiAgICAgICAgICAgIGNvdW50ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyArK2kpIHtcbiAgICAgICAgICAgIGNoaXBzW2ldLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9yZXNldENoaXBzOiBmdW5jdGlvbiBfcmVzZXRDaGlwcygpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNwQ2hpcHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMuc3BDaGlwcy5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlU3RhdGU6IGZ1bmN0aW9uIHVwZGF0ZVN0YXRlKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuYWN0b3Iuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgQWN0b3JQbGF5aW5nU3RhdGUuTm9ybWFsOlxuICAgICAgICAgICAgICAgIHRoaXMuY2FyZEluZm8uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwQ2FyZEluZm8uc3ByaXRlRnJhbWUgPSBHYW1lLmluc3RhbmNlLmFzc2V0TW5nLnRleENhcmRJbmZvO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUG9pbnQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0b3JQbGF5aW5nU3RhdGUuQnVzdDpcbiAgICAgICAgICAgICAgICB2YXIgbWluID0gVXRpbHMuZ2V0TWluTWF4UG9pbnQodGhpcy5hY3Rvci5jYXJkcykubWluO1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxDYXJkSW5mby5zdHJpbmcgPSAn54iG54mMKCcgKyBtaW4gKyAnKSc7XG4gICAgICAgICAgICAgICAgdGhpcy5zcENhcmRJbmZvLnNwcml0ZUZyYW1lID0gR2FtZS5pbnN0YW5jZS5hc3NldE1uZy50ZXhCdXN0O1xuICAgICAgICAgICAgICAgIHRoaXMuY2FyZEluZm8uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1GWC5zaG93KHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbUZYLnBsYXlGWCgnYnVzdCcpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRDb3VudGRvd24oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQWN0b3JQbGF5aW5nU3RhdGUuU3RhbmQ6XG4gICAgICAgICAgICAgICAgdmFyIG1heCA9IFV0aWxzLmdldE1pbk1heFBvaW50KHRoaXMuYWN0b3IuY2FyZHMpLm1heDtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsQ2FyZEluZm8uc3RyaW5nID0gJ+WBnOeJjCgnICsgbWF4ICsgJyknO1xuICAgICAgICAgICAgICAgIHRoaXMuc3BDYXJkSW5mby5zcHJpdGVGcmFtZSA9IEdhbWUuaW5zdGFuY2UuYXNzZXRNbmcudGV4Q2FyZEluZm87XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldENvdW50ZG93bigpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMudXBkYXRlUG9pbnQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnN2QwMDhkVGY2eEIyWjB3Q0FkemgxUngnLCAnQWN0b3InKTtcbi8vIHNjcmlwdHMvQWN0b3IuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgVHlwZXMgPSByZXF1aXJlKCdUeXBlcycpO1xudmFyIFV0aWxzID0gcmVxdWlyZSgnVXRpbHMnKTtcbnZhciBBY3RvclBsYXlpbmdTdGF0ZSA9IFR5cGVzLkFjdG9yUGxheWluZ1N0YXRlO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIOaJgOacieaYjueJjFxuICAgICAgICBjYXJkczoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBbXSxcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICAvLyDmmpfniYzvvIxkZW1vIOaaguWtmFxuICAgICAgICBob2xlQ2FyZDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8g5omL5LiK5pyA5o6l6L+RIDIxIOeCueeahOeCueaVsO+8iOacieWPr+iDvei2hei/hyAyMSDngrnvvIlcbiAgICAgICAgYmVzdFBvaW50OiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWluTWF4ID0gVXRpbHMuZ2V0TWluTWF4UG9pbnQodGhpcy5jYXJkcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1pbk1heC5tYXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8g54mM5Z6L77yM5LiN6ICD6JmR5piv5ZCm54iG54mMXG4gICAgICAgIGhhbmQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICAgIHZhciBjb3VudCA9IHRoaXMuY2FyZHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvbGVDYXJkKSB7XG4gICAgICAgICAgICAgICAgICAgICsrY291bnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA+PSA1KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUeXBlcy5IYW5kLkZpdmVDYXJkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT09IDIgJiYgdGhpcy5iZXN0UG9pbnQgPT09IDIxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUeXBlcy5IYW5kLkJsYWNrSmFjaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFR5cGVzLkhhbmQuTm9ybWFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNhblJlcG9ydDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZCAhPT0gVHlwZXMuSGFuZC5Ob3JtYWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICByZW5kZXJlcjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBBY3RvclBsYXlpbmdTdGF0ZS5Ob3JtYWwsXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uIG5vdGlmeShvbGRTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlICE9PSBvbGRTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnVwZGF0ZVN0YXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IEFjdG9yUGxheWluZ1N0YXRlLFxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlbmRlcmVyID0gdGhpcy5nZXRDb21wb25lbnQoJ0FjdG9yUmVuZGVyZXInKTtcbiAgICB9LFxuXG4gICAgYWRkQ2FyZDogZnVuY3Rpb24gYWRkQ2FyZChjYXJkKSB7XG4gICAgICAgIHRoaXMuY2FyZHMucHVzaChjYXJkKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5vbkRlYWwoY2FyZCwgdHJ1ZSk7XG5cbiAgICAgICAgdmFyIGNhcmRzID0gdGhpcy5ob2xlQ2FyZCA/IFt0aGlzLmhvbGVDYXJkXS5jb25jYXQodGhpcy5jYXJkcykgOiB0aGlzLmNhcmRzO1xuICAgICAgICBpZiAoVXRpbHMuaXNCdXN0KGNhcmRzKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IEFjdG9yUGxheWluZ1N0YXRlLkJ1c3Q7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYWRkSG9sZUNhcmQ6IGZ1bmN0aW9uIGFkZEhvbGVDYXJkKGNhcmQpIHtcbiAgICAgICAgdGhpcy5ob2xlQ2FyZCA9IGNhcmQ7XG4gICAgICAgIHRoaXMucmVuZGVyZXIub25EZWFsKGNhcmQsIGZhbHNlKTtcbiAgICB9LFxuXG4gICAgc3RhbmQ6IGZ1bmN0aW9uIHN0YW5kKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gQWN0b3JQbGF5aW5nU3RhdGUuU3RhbmQ7XG4gICAgfSxcblxuICAgIHJldmVhbEhvbGRDYXJkOiBmdW5jdGlvbiByZXZlYWxIb2xkQ2FyZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaG9sZUNhcmQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FyZHMudW5zaGlmdCh0aGlzLmhvbGVDYXJkKTtcbiAgICAgICAgICAgIHRoaXMuaG9sZUNhcmQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5vblJldmVhbEhvbGRDYXJkKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gcmV2ZWFsTm9ybWFsQ2FyZDogZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgIHRoaXMub25SZXZlYWxOb3JtYWxDYXJkKCk7XG4gICAgLy8gfSxcblxuICAgIHJlcG9ydDogZnVuY3Rpb24gcmVwb3J0KCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gQWN0b3JQbGF5aW5nU3RhdGUuUmVwb3J0O1xuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuY2FyZHMgPSBbXTtcbiAgICAgICAgdGhpcy5ob2xlQ2FyZCA9IG51bGw7XG4gICAgICAgIHRoaXMucmVwb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IEFjdG9yUGxheWluZ1N0YXRlLk5vcm1hbDtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5vblJlc2V0KCk7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc1NDUyMkxjb1ZwUEhicnFZZ3dwLzFRbScsICdBc3NldE1uZycpO1xuLy8gc2NyaXB0cy9Bc3NldE1uZy5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIEFzc2V0TW5nID0gY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRleEJ1c3Q6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICAgICAgfSxcbiAgICAgICAgdGV4Q2FyZEluZm86IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICAgICAgfSxcbiAgICAgICAgdGV4Q291bnRkb3duOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgICAgIH0sXG4gICAgICAgIHRleEJldENvdW50ZG93bjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxuICAgICAgICB9LFxuICAgICAgICBwbGF5ZXJQaG90b3M6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBbXSxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzAxY2E0dFN0dlZIK0ptWjVUTmNtdUF1JywgJ0F1ZGlvTW5nJyk7XG4vLyBzY3JpcHRzL0F1ZGlvTW5nLmpzXG5cblwidXNlIHN0cmljdFwiO1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgd2luQXVkaW86IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcblxuICAgICAgICBsb3NlQXVkaW86IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcblxuICAgICAgICBjYXJkQXVkaW86IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcblxuICAgICAgICBidXR0b25BdWRpbzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuXG4gICAgICAgIGNoaXBzQXVkaW86IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcblxuICAgICAgICBiZ206IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBwbGF5TXVzaWM6IGZ1bmN0aW9uIHBsYXlNdXNpYygpIHtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheU11c2ljKHRoaXMuYmdtLCB0cnVlKTtcbiAgICB9LFxuXG4gICAgcGF1c2VNdXNpYzogZnVuY3Rpb24gcGF1c2VNdXNpYygpIHtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VNdXNpYygpO1xuICAgIH0sXG5cbiAgICByZXN1bWVNdXNpYzogZnVuY3Rpb24gcmVzdW1lTXVzaWMoKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZU11c2ljKCk7XG4gICAgfSxcblxuICAgIF9wbGF5U0ZYOiBmdW5jdGlvbiBfcGxheVNGWChjbGlwKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoY2xpcCwgZmFsc2UpO1xuICAgIH0sXG5cbiAgICBwbGF5V2luOiBmdW5jdGlvbiBwbGF5V2luKCkge1xuICAgICAgICB0aGlzLl9wbGF5U0ZYKHRoaXMud2luQXVkaW8pO1xuICAgIH0sXG5cbiAgICBwbGF5TG9zZTogZnVuY3Rpb24gcGxheUxvc2UoKSB7XG4gICAgICAgIHRoaXMuX3BsYXlTRlgodGhpcy5sb3NlQXVkaW8pO1xuICAgIH0sXG5cbiAgICBwbGF5Q2FyZDogZnVuY3Rpb24gcGxheUNhcmQoKSB7XG4gICAgICAgIHRoaXMuX3BsYXlTRlgodGhpcy5jYXJkQXVkaW8pO1xuICAgIH0sXG5cbiAgICBwbGF5Q2hpcHM6IGZ1bmN0aW9uIHBsYXlDaGlwcygpIHtcbiAgICAgICAgdGhpcy5fcGxheVNGWCh0aGlzLmNoaXBzQXVkaW8pO1xuICAgIH0sXG5cbiAgICBwbGF5QnV0dG9uOiBmdW5jdGlvbiBwbGF5QnV0dG9uKCkge1xuICAgICAgICB0aGlzLl9wbGF5U0ZYKHRoaXMuYnV0dG9uQXVkaW8pO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMjhmMzh5VG9UMVB3N05neWVDdlJ4REMnLCAnQmV0Jyk7XG4vLyBzY3JpcHRzL0JldC5qc1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBHYW1lID0gcmVxdWlyZSgnR2FtZScpO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGNoaXBQcmVmYWI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICBidG5DaGlwczoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBbXSxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgY2hpcFZhbHVlczoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBbXSxcbiAgICAgICAgICAgIHR5cGU6ICdJbnRlZ2VyJ1xuICAgICAgICB9LFxuICAgICAgICBhbmNob3JDaGlwVG9zczoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyQnRucygpO1xuICAgIH0sXG5cbiAgICBfcmVnaXN0ZXJCdG5zOiBmdW5jdGlvbiBfcmVnaXN0ZXJCdG5zKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciByZWdpc3RlckJ0biA9IGZ1bmN0aW9uIHJlZ2lzdGVyQnRuKGluZGV4KSB7XG4gICAgICAgICAgICBzZWxmLmJ0bkNoaXBzW2ldLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKEdhbWUuaW5zdGFuY2UuYWRkU3Rha2Uoc2VsZi5jaGlwVmFsdWVzW2luZGV4XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wbGF5QWRkQ2hpcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGYuYnRuQ2hpcHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHJlZ2lzdGVyQnRuKGkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHBsYXlBZGRDaGlwOiBmdW5jdGlvbiBwbGF5QWRkQ2hpcCgpIHtcbiAgICAgICAgdmFyIHN0YXJ0UG9zID0gY2MucChjYy5yYW5kb21NaW51czFUbzEoKSAqIDUwLCBjYy5yYW5kb21NaW51czFUbzEoKSAqIDUwKTtcbiAgICAgICAgdmFyIGNoaXAgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNoaXBQcmVmYWIpO1xuICAgICAgICB0aGlzLmFuY2hvckNoaXBUb3NzLmFkZENoaWxkKGNoaXApO1xuICAgICAgICBjaGlwLnNldFBvc2l0aW9uKHN0YXJ0UG9zKTtcbiAgICAgICAgY2hpcC5nZXRDb21wb25lbnQoJ1Rvc3NDaGlwJykucGxheSgpO1xuICAgIH0sXG5cbiAgICByZXNldENoaXBzOiBmdW5jdGlvbiByZXNldENoaXBzKCkge1xuICAgICAgICBHYW1lLmluc3RhbmNlLnJlc2V0U3Rha2UoKTtcbiAgICAgICAgR2FtZS5pbnN0YW5jZS5pbmZvLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXNldFRvc3NlZENoaXBzKCk7XG4gICAgfSxcblxuICAgIHJlc2V0VG9zc2VkQ2hpcHM6IGZ1bmN0aW9uIHJlc2V0VG9zc2VkQ2hpcHMoKSB7XG4gICAgICAgIHRoaXMuYW5jaG9yQ2hpcFRvc3MucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2ExNzFkU25DWEZNUklxczFJV2R2Z1dNJywgJ0J1dHRvblNjYWxlcicpO1xuLy8gc2NyaXB0cy9VSS9CdXR0b25TY2FsZXIuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHByZXNzZWRTY2FsZTogMSxcbiAgICAgICAgdHJhbnNEdXJhdGlvbjogMFxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgYXVkaW9NbmcgPSBjYy5maW5kKCdNZW51L0F1ZGlvTW5nJykgfHwgY2MuZmluZCgnR2FtZS9BdWRpb01uZycpO1xuICAgICAgICBpZiAoYXVkaW9NbmcpIHtcbiAgICAgICAgICAgIGF1ZGlvTW5nID0gYXVkaW9NbmcuZ2V0Q29tcG9uZW50KCdBdWRpb01uZycpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuaW5pdFNjYWxlID0gdGhpcy5ub2RlLnNjYWxlO1xuICAgICAgICBzZWxmLmJ1dHRvbiA9IHNlbGYuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgICAgIHNlbGYuc2NhbGVEb3duQWN0aW9uID0gY2Muc2NhbGVUbyhzZWxmLnRyYW5zRHVyYXRpb24sIHNlbGYucHJlc3NlZFNjYWxlKTtcbiAgICAgICAgc2VsZi5zY2FsZVVwQWN0aW9uID0gY2Muc2NhbGVUbyhzZWxmLnRyYW5zRHVyYXRpb24sIHNlbGYuaW5pdFNjYWxlKTtcbiAgICAgICAgZnVuY3Rpb24gb25Ub3VjaERvd24oZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgIGlmIChhdWRpb01uZykgYXVkaW9NbmcucGxheUJ1dHRvbigpO1xuICAgICAgICAgICAgdGhpcy5ydW5BY3Rpb24oc2VsZi5zY2FsZURvd25BY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uVG91Y2hVcChldmVudCkge1xuICAgICAgICAgICAgdGhpcy5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5ydW5BY3Rpb24oc2VsZi5zY2FsZVVwQWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoc3RhcnQnLCBvblRvdWNoRG93biwgdGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaGVuZCcsIG9uVG91Y2hVcCwgdGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaGNhbmNlbCcsIG9uVG91Y2hVcCwgdGhpcy5ub2RlKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2FiNjdlNVFraVZDQlozRElNbFdoaUF0JywgJ0NhcmQnKTtcbi8vIHNjcmlwdHMvQ2FyZC5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIG5vZGVzXG4gICAgICAgIHBvaW50OiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIHN1aXQ6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlXG4gICAgICAgIH0sXG4gICAgICAgIG1haW5QaWM6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlXG4gICAgICAgIH0sXG4gICAgICAgIGNhcmRCRzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICAgICAgfSxcbiAgICAgICAgLy8gcmVzb3VyY2VzXG4gICAgICAgIHJlZFRleHRDb2xvcjogY2MuQ29sb3IuV0hJVEUsXG4gICAgICAgIGJsYWNrVGV4dENvbG9yOiBjYy5Db2xvci5XSElURSxcbiAgICAgICAgdGV4RnJvbnRCRzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxuICAgICAgICB9LFxuICAgICAgICB0ZXhCYWNrQkc6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICAgICAgfSxcbiAgICAgICAgdGV4RmFjZXM6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBbXSxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgICAgIH0sXG4gICAgICAgIHRleFN1aXRCaWc6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBbXSxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgICAgIH0sXG4gICAgICAgIHRleFN1aXRTbWFsbDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFtdLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KGNhcmQpIHtcbiAgICAgICAgdmFyIGlzRmFjZUNhcmQgPSBjYXJkLnBvaW50ID4gMTA7XG5cbiAgICAgICAgaWYgKGlzRmFjZUNhcmQpIHtcbiAgICAgICAgICAgIHRoaXMubWFpblBpYy5zcHJpdGVGcmFtZSA9IHRoaXMudGV4RmFjZXNbY2FyZC5wb2ludCAtIDEwIC0gMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1haW5QaWMuc3ByaXRlRnJhbWUgPSB0aGlzLnRleFN1aXRCaWdbY2FyZC5zdWl0IC0gMV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmb3IganNiXG4gICAgICAgIHRoaXMucG9pbnQuc3RyaW5nID0gY2FyZC5wb2ludE5hbWU7XG5cbiAgICAgICAgaWYgKGNhcmQuaXNSZWRTdWl0KSB7XG4gICAgICAgICAgICB0aGlzLnBvaW50Lm5vZGUuY29sb3IgPSB0aGlzLnJlZFRleHRDb2xvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucG9pbnQubm9kZS5jb2xvciA9IHRoaXMuYmxhY2tUZXh0Q29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN1aXQuc3ByaXRlRnJhbWUgPSB0aGlzLnRleFN1aXRTbWFsbFtjYXJkLnN1aXQgLSAxXTtcbiAgICB9LFxuXG4gICAgcmV2ZWFsOiBmdW5jdGlvbiByZXZlYWwoaXNGYWNlVXApIHtcbiAgICAgICAgdGhpcy5wb2ludC5ub2RlLmFjdGl2ZSA9IGlzRmFjZVVwO1xuICAgICAgICB0aGlzLnN1aXQubm9kZS5hY3RpdmUgPSBpc0ZhY2VVcDtcbiAgICAgICAgdGhpcy5tYWluUGljLm5vZGUuYWN0aXZlID0gaXNGYWNlVXA7XG4gICAgICAgIHRoaXMuY2FyZEJHLnNwcml0ZUZyYW1lID0gaXNGYWNlVXAgPyB0aGlzLnRleEZyb250QkcgOiB0aGlzLnRleEJhY2tCRztcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2IwOTI2L2FJYXRBVFlnVHVMMFJ5Vy9xJywgJ0NvdW50ZXJUZXN0Jyk7XG4vLyBzY3JpcHRzL0NvdW50ZXJUZXN0LmpzXG5cblwidXNlIHN0cmljdFwiO1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gLi4uXG4gICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLnRhcmdldC5ub2RlLmNvbG9yID0gY2MuQ29sb3IuR1JFRU47XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7fVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdjZTJkZm9xRXVsSENMalMxWjl4UE43dCcsICdEZWFsZXInKTtcbi8vIHNjcmlwdHMvRGVhbGVyLmpzXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEFjdG9yID0gcmVxdWlyZSgnQWN0b3InKTtcbnZhciBVdGlscyA9IHJlcXVpcmUoJ1V0aWxzJyk7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IEFjdG9yLFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyDmiYvkuIrmnIDmjqXov5EgMjEg54K555qE54K55pWw77yI5pyJ5Y+v6IO96LaF6L+HIDIxIOeCue+8iVxuICAgICAgICBiZXN0UG9pbnQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICAgIHZhciBjYXJkcyA9IHRoaXMuaG9sZUNhcmQgPyBbdGhpcy5ob2xlQ2FyZF0uY29uY2F0KHRoaXMuY2FyZHMpIDogdGhpcy5jYXJkcztcbiAgICAgICAgICAgICAgICB2YXIgbWluTWF4ID0gVXRpbHMuZ2V0TWluTWF4UG9pbnQoY2FyZHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBtaW5NYXgubWF4O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG92ZXJyaWRlOiB0cnVlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5pbml0RGVhbGVyKCk7XG4gICAgfSxcblxuICAgIC8vIOi/lOWbnuaYr+WQpuimgeeJjFxuICAgIHdhbnRIaXQ6IGZ1bmN0aW9uIHdhbnRIaXQoKSB7XG4gICAgICAgIHZhciBHYW1lID0gcmVxdWlyZSgnR2FtZScpO1xuICAgICAgICB2YXIgVHlwZXMgPSByZXF1aXJlKCdUeXBlcycpO1xuXG4gICAgICAgIHZhciBiZXN0UG9pbnQgPSB0aGlzLmJlc3RQb2ludDtcblxuICAgICAgICAvLyDlt7Lnu4/mnIDlpKfngrnmlbBcbiAgICAgICAgaWYgKGJlc3RQb2ludCA9PT0gMjEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOS4jeiuuuaKveWIsOS7gOS5iOeJjOiCr+WumuS4jeS8mueIhu+8jOmCo+WwseaOpeedgOaKvVxuICAgICAgICBpZiAoYmVzdFBvaW50IDw9IDIxIC0gMTApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBsYXllciA9IEdhbWUuaW5zdGFuY2UucGxheWVyO1xuICAgICAgICB2YXIgb3V0Y29tZSA9IEdhbWUuaW5zdGFuY2UuX2dldFBsYXllclJlc3VsdChwbGF5ZXIsIHRoaXMpO1xuXG4gICAgICAgIHN3aXRjaCAob3V0Y29tZSkge1xuICAgICAgICAgICAgY2FzZSBUeXBlcy5PdXRjb21lLldpbjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGNhc2UgVHlwZXMuT3V0Y29tZS5Mb3NlOlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmJlc3RQb2ludCA8IDE3O1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMTcwMjRHMEpGcEhjTEk1R1JFYkY4Vk4nLCAnRGVja3MnKTtcbi8vIHNjcmlwdHMvbW9kdWxlL0RlY2tzLmpzXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFR5cGVzID0gcmVxdWlyZSgnVHlwZXMnKTtcblxuLyoqXG4gKiDmiZHlhYvnrqHnkIbnsbvvvIznlKjmnaXnrqHnkIbkuIDlia/miJblpJrlia/niYxcbiAqIEBjbGFzcyBEZWNrc1xuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyT2ZEZWNrcyAtIOaAu+WFseWHoOWJr+eJjFxuICovXG5mdW5jdGlvbiBEZWNrcyhudW1iZXJPZkRlY2tzKSB7XG4gICAgLy8g5oC75YWx5Yeg5Ymv54mMXG4gICAgdGhpcy5fbnVtYmVyT2ZEZWNrcyA9IG51bWJlck9mRGVja3M7XG4gICAgLy8g6L+Y5rKh5Y+R5Ye65Y6755qE54mMXG4gICAgdGhpcy5fY2FyZElkcyA9IG5ldyBBcnJheShudW1iZXJPZkRlY2tzICogNTIpO1xuXG4gICAgdGhpcy5yZXNldCgpO1xufVxuXG4vKipcbiAqIOmHjee9ruaJgOacieeJjFxuICogQG1ldGhvZCByZXNldFxuICovXG5EZWNrcy5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fY2FyZElkcy5sZW5ndGggPSB0aGlzLl9udW1iZXJPZkRlY2tzICogNTI7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgZnJvbUlkID0gVHlwZXMuQ2FyZC5mcm9tSWQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9udW1iZXJPZkRlY2tzOyArK2kpIHtcbiAgICAgICAgZm9yICh2YXIgY2FyZElkID0gMDsgY2FyZElkIDwgNTI7ICsrY2FyZElkKSB7XG4gICAgICAgICAgICB0aGlzLl9jYXJkSWRzW2luZGV4XSA9IGZyb21JZChjYXJkSWQpO1xuICAgICAgICAgICAgKytpbmRleDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICog6ZqP5py65oq95LiA5byg54mM77yM5aaC5p6c5bey57uP5rKh54mM5LqG77yM5bCG6L+U5ZueIG51bGxcbiAqIEBtZXRob2QgZHJhd1xuICogQHJldHVybiB7Q2FyZH1cbiAqL1xuRGVja3MucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhcmRJZHMgPSB0aGlzLl9jYXJkSWRzO1xuICAgIHZhciBsZW4gPSBjYXJkSWRzLmxlbmd0aDtcbiAgICBpZiAobGVuID09PSAwKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciByYW5kb20gPSBNYXRoLnJhbmRvbSgpO1xuICAgIHZhciBpbmRleCA9IHJhbmRvbSAqIGxlbiB8IDA7XG4gICAgdmFyIHJlc3VsdCA9IGNhcmRJZHNbaW5kZXhdO1xuXG4gICAgLy8g5L+d5oyB5pWw57uE57Sn5YeRXG4gICAgdmFyIGxhc3QgPSBjYXJkSWRzW2xlbiAtIDFdO1xuICAgIGNhcmRJZHNbaW5kZXhdID0gbGFzdDtcbiAgICBjYXJkSWRzLmxlbmd0aCA9IGxlbiAtIDE7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8vKipcbi8vICog5Y+R5LiA5byg54mMXG4vLyAqIEBtZXRob2QgZGVhbFxuLy8gKiBAcmV0dXJuIHtDYXJkfVxuLy8gKi9cbi8vRGVja3MucHJvdG90eXBlLmRlYWwgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICB0aGlzLl9jYXJkSWRzLnBvcCgpO1xuLy99O1xuXG4vLy8qKlxuLy8gKiDmtJfniYxcbi8vICogQG1ldGhvZCBzaHVmZmxlXG4vLyAqL1xuLy9EZWNrcy5wcm90b3R5cGUuc2h1ZmZsZSA9IGZ1bmN0aW9uICgpIHtcbi8vICAgIHNodWZmbGVBcnJheSh0aGlzLl9jYXJkSWRzKTtcbi8vfTtcbi8vXG4vLy8qKlxuLy8gKiBSYW5kb21pemUgYXJyYXkgZWxlbWVudCBvcmRlciBpbi1wbGFjZS5cbi8vICogVXNpbmcgRHVyc3RlbmZlbGQgc2h1ZmZsZSBhbGdvcml0aG0uXG4vLyAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzEyNjQ2ODY0XG4vLyAqL1xuLy9mdW5jdGlvbiBzaHVmZmxlQXJyYXkoYXJyYXkpIHtcbi8vICAgIGZvciAodmFyIGkgPSBhcnJheS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4vLyAgICAgICAgdmFyIGogPSAoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpIHwgMDtcbi8vICAgICAgICB2YXIgdGVtcCA9IGFycmF5W2ldO1xuLy8gICAgICAgIGFycmF5W2ldID0gYXJyYXlbal07XG4vLyAgICAgICAgYXJyYXlbal0gPSB0ZW1wO1xuLy8gICAgfVxuLy8gICAgcmV0dXJuIGFycmF5O1xuLy99XG5cbm1vZHVsZS5leHBvcnRzID0gRGVja3M7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc2OGRhMnlqZEdWTVNZaFhMTjlEdWtJQicsICdGWFBsYXllcicpO1xuLy8gc2NyaXB0cy9GWFBsYXllci5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICB0aGlzLmFuaW0gPSB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICB0aGlzLnNwcml0ZSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgfSxcblxuICAgIHNob3c6IGZ1bmN0aW9uIHNob3coX3Nob3cpIHtcbiAgICAgICAgdGhpcy5zcHJpdGUuZW5hYmxlZCA9IF9zaG93O1xuICAgIH0sXG5cbiAgICBwbGF5Rlg6IGZ1bmN0aW9uIHBsYXlGWChuYW1lKSB7XG4gICAgICAgIC8vIG5hbWUgY2FuIGJlICdibGFja2phY2snIG9yICdidXN0J1xuICAgICAgICB0aGlzLmFuaW0ucGxheShuYW1lKTtcbiAgICB9LFxuXG4gICAgaGlkZUZYOiBmdW5jdGlvbiBoaWRlRlgoKSB7XG4gICAgICAgIHRoaXMuc3ByaXRlLmVuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzYzNzM4T09OQ0ZLSHFzZjRRU2VKU3VuJywgJ0dhbWUnKTtcbi8vIHNjcmlwdHMvR2FtZS5qc1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwbGF5ZXJzID0gcmVxdWlyZSgnUGxheWVyRGF0YScpLnBsYXllcnM7XG52YXIgRGVja3MgPSByZXF1aXJlKCdEZWNrcycpO1xudmFyIFR5cGVzID0gcmVxdWlyZSgnVHlwZXMnKTtcbnZhciBBY3RvclBsYXlpbmdTdGF0ZSA9IFR5cGVzLkFjdG9yUGxheWluZ1N0YXRlO1xudmFyIEZzbSA9IHJlcXVpcmUoJ2dhbWUtZnNtJyk7XG5cbnZhciBHYW1lID0gY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBwbGF5ZXJBbmNob3JzOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IFtdLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBwbGF5ZXJQcmVmYWI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICBkZWFsZXI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgaW5HYW1lVUk6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgYmV0VUk6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgYXNzZXRNbmc6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgYXVkaW9Nbmc6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgdHVybkR1cmF0aW9uOiAwLFxuICAgICAgICBiZXREdXJhdGlvbjogMCxcbiAgICAgICAgdG90YWxDaGlwc051bTogMCxcbiAgICAgICAgdG90YWxEaWFtb25kTnVtOiAwLFxuICAgICAgICBudW1iZXJPZkRlY2tzOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IDEsXG4gICAgICAgICAgICB0eXBlOiAnSW50ZWdlcidcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIGluc3RhbmNlOiBudWxsXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICBHYW1lLmluc3RhbmNlID0gdGhpcztcbiAgICAgICAgdGhpcy5pbkdhbWVVSSA9IHRoaXMuaW5HYW1lVUkuZ2V0Q29tcG9uZW50KCdJbkdhbWVVSScpO1xuICAgICAgICB0aGlzLmFzc2V0TW5nID0gdGhpcy5hc3NldE1uZy5nZXRDb21wb25lbnQoJ0Fzc2V0TW5nJyk7XG4gICAgICAgIHRoaXMuYXVkaW9NbmcgPSB0aGlzLmF1ZGlvTW5nLmdldENvbXBvbmVudCgnQXVkaW9NbmcnKTtcbiAgICAgICAgdGhpcy5iZXRVSSA9IHRoaXMuYmV0VUkuZ2V0Q29tcG9uZW50KCdCZXQnKTtcbiAgICAgICAgdGhpcy5pbkdhbWVVSS5pbml0KHRoaXMuYmV0RHVyYXRpb24pO1xuICAgICAgICB0aGlzLmJldFVJLmluaXQoKTtcbiAgICAgICAgdGhpcy5kZWFsZXIgPSB0aGlzLmRlYWxlci5nZXRDb21wb25lbnQoJ0RlYWxlcicpO1xuICAgICAgICB0aGlzLmRlYWxlci5pbml0KCk7XG5cbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmNyZWF0ZVBsYXllcnMoKTtcblxuICAgICAgICAvLyBzaG9ydGN1dCB0byB1aSBlbGVtZW50XG4gICAgICAgIHRoaXMuaW5mbyA9IHRoaXMuaW5HYW1lVUkucmVzdWx0VHh0O1xuICAgICAgICB0aGlzLnRvdGFsQ2hpcHMgPSB0aGlzLmluR2FtZVVJLmxhYmVsVG90YWxDaGlwcztcblxuICAgICAgICAvLyBpbml0IGxvZ2ljXG4gICAgICAgIHRoaXMuZGVja3MgPSBuZXcgRGVja3ModGhpcy5udW1iZXJPZkRlY2tzKTtcbiAgICAgICAgdGhpcy5mc20gPSBGc207XG4gICAgICAgIHRoaXMuZnNtLmluaXQodGhpcyk7XG5cbiAgICAgICAgLy8gc3RhcnRcbiAgICAgICAgdGhpcy51cGRhdGVUb3RhbENoaXBzKCk7XG5cbiAgICAgICAgdGhpcy5hdWRpb01uZy5wbGF5TXVzaWMoKTtcbiAgICB9LFxuXG4gICAgYWRkU3Rha2U6IGZ1bmN0aW9uIGFkZFN0YWtlKGRlbHRhKSB7XG4gICAgICAgIGlmICh0aGlzLnRvdGFsQ2hpcHNOdW0gPCBkZWx0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ25vdCBlbm91Z2ggY2hpcHMhJyk7XG4gICAgICAgICAgICB0aGlzLmluZm8uZW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmluZm8uc3RyaW5nID0gJ+mHkeW4geS4jei2syEnO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50b3RhbENoaXBzTnVtIC09IGRlbHRhO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUb3RhbENoaXBzKCk7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5hZGRTdGFrZShkZWx0YSk7XG4gICAgICAgICAgICB0aGlzLmF1ZGlvTW5nLnBsYXlDaGlwcygpO1xuICAgICAgICAgICAgdGhpcy5pbmZvLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaW5mby5zdHJpbmcgPSAn6K+35LiL5rOoJztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlc2V0U3Rha2U6IGZ1bmN0aW9uIHJlc2V0U3Rha2UoKSB7XG4gICAgICAgIHRoaXMudG90YWxDaGlwc051bSArPSB0aGlzLnBsYXllci5zdGFrZU51bTtcbiAgICAgICAgdGhpcy5wbGF5ZXIucmVzZXRTdGFrZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVRvdGFsQ2hpcHMoKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlVG90YWxDaGlwczogZnVuY3Rpb24gdXBkYXRlVG90YWxDaGlwcygpIHtcbiAgICAgICAgdGhpcy50b3RhbENoaXBzLnN0cmluZyA9IHRoaXMudG90YWxDaGlwc051bTtcbiAgICAgICAgdGhpcy5wbGF5ZXIucmVuZGVyZXIudXBkYXRlVG90YWxTdGFrZSh0aGlzLnRvdGFsQ2hpcHNOdW0pO1xuICAgIH0sXG5cbiAgICBjcmVhdGVQbGF5ZXJzOiBmdW5jdGlvbiBjcmVhdGVQbGF5ZXJzKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7ICsraSkge1xuICAgICAgICAgICAgdmFyIHBsYXllck5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBsYXllclByZWZhYik7XG4gICAgICAgICAgICB2YXIgYW5jaG9yID0gdGhpcy5wbGF5ZXJBbmNob3JzW2ldO1xuICAgICAgICAgICAgdmFyIHN3aXRjaFNpZGUgPSBpID4gMjtcbiAgICAgICAgICAgIGFuY2hvci5hZGRDaGlsZChwbGF5ZXJOb2RlKTtcbiAgICAgICAgICAgIHBsYXllck5vZGUucG9zaXRpb24gPSBjYy5wKDAsIDApO1xuXG4gICAgICAgICAgICB2YXIgcGxheWVySW5mb1BvcyA9IGNjLmZpbmQoJ2FuY2hvclBsYXllckluZm8nLCBhbmNob3IpLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICB2YXIgc3Rha2VQb3MgPSBjYy5maW5kKCdhbmNob3JTdGFrZScsIGFuY2hvcikuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBhY3RvclJlbmRlcmVyID0gcGxheWVyTm9kZS5nZXRDb21wb25lbnQoJ0FjdG9yUmVuZGVyZXInKTtcbiAgICAgICAgICAgIGFjdG9yUmVuZGVyZXIuaW5pdChwbGF5ZXJzW2ldLCBwbGF5ZXJJbmZvUG9zLCBzdGFrZVBvcywgdGhpcy50dXJuRHVyYXRpb24sIHN3aXRjaFNpZGUpO1xuICAgICAgICAgICAgaWYgKGkgPT09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllck5vZGUuZ2V0Q29tcG9uZW50KCdQbGF5ZXInKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5pbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gVUkgRVZFTlQgQ0FMTEJBQ0tTXG5cbiAgICAvLyDnjqnlrrbopoHniYxcbiAgICBoaXQ6IGZ1bmN0aW9uIGhpdCgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYWRkQ2FyZCh0aGlzLmRlY2tzLmRyYXcoKSk7XG4gICAgICAgIGlmICh0aGlzLnBsYXllci5zdGF0ZSA9PT0gQWN0b3JQbGF5aW5nU3RhdGUuQnVzdCkge1xuICAgICAgICAgICAgLy8gaWYgZXZlcnkgcGxheWVyIGVuZFxuICAgICAgICAgICAgdGhpcy5mc20ub25QbGF5ZXJBY3RlZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hdWRpb01uZy5wbGF5Q2FyZCgpO1xuXG4gICAgICAgIC8vaWYgKHRoaXMuZGVhbGVyLnN0YXRlID09PSBBY3RvclBsYXlpbmdTdGF0ZS5Ob3JtYWwpIHtcbiAgICAgICAgLy8gICAgaWYgKHRoaXMuZGVhbGVyLndhbnRIaXQoKSkge1xuICAgICAgICAvLyAgICAgICAgdGhpcy5kZWFsZXIuYWRkQ2FyZCh0aGlzLmRlY2tzLmRyYXcoKSk7XG4gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy8gICAgZWxzZSB7XG4gICAgICAgIC8vICAgICAgICB0aGlzLmRlYWxlci5zdGFuZCgpO1xuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vfVxuICAgICAgICAvL1xuICAgICAgICAvL2lmICh0aGlzLmRlYWxlci5zdGF0ZSA9PT0gQWN0b3JQbGF5aW5nU3RhdGUuQnVzdCkge1xuICAgICAgICAvLyAgICB0aGlzLnN0YXRlID0gR2FtaW5nU3RhdGUuRW5kO1xuICAgICAgICAvL31cbiAgICAgICAgdGhpcy5hdWRpb01uZy5wbGF5QnV0dG9uKCk7XG4gICAgfSxcblxuICAgIC8vIOeOqeWutuWBnOeJjFxuICAgIHN0YW5kOiBmdW5jdGlvbiBzdGFuZCgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuc3RhbmQoKTtcblxuICAgICAgICB0aGlzLmF1ZGlvTW5nLnBsYXlCdXR0b24oKTtcblxuICAgICAgICAvLyBpZiBldmVyeSBwbGF5ZXIgZW5kXG4gICAgICAgIHRoaXMuZnNtLm9uUGxheWVyQWN0ZWQoKTtcbiAgICB9LFxuXG4gICAgLy9cbiAgICBkZWFsOiBmdW5jdGlvbiBkZWFsKCkge1xuICAgICAgICB0aGlzLmZzbS50b0RlYWwoKTtcbiAgICAgICAgdGhpcy5hdWRpb01uZy5wbGF5QnV0dG9uKCk7XG4gICAgfSxcblxuICAgIC8vXG4gICAgc3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmZzbS50b0JldCgpO1xuICAgICAgICB0aGlzLmF1ZGlvTW5nLnBsYXlCdXR0b24oKTtcbiAgICB9LFxuXG4gICAgLy8g546p5a625oql5YiwXG4gICAgcmVwb3J0OiBmdW5jdGlvbiByZXBvcnQoKSB7XG4gICAgICAgIHRoaXMucGxheWVyLnJlcG9ydCgpO1xuXG4gICAgICAgIC8vIGlmIGV2ZXJ5IHBsYXllciBlbmRcbiAgICAgICAgdGhpcy5mc20ub25QbGF5ZXJBY3RlZCgpO1xuICAgIH0sXG5cbiAgICBxdWl0VG9NZW51OiBmdW5jdGlvbiBxdWl0VG9NZW51KCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ21lbnUnKTtcbiAgICB9LFxuXG4gICAgLy8gRlNNIENBTExCQUNLU1xuXG4gICAgb25FbnRlckRlYWxTdGF0ZTogZnVuY3Rpb24gb25FbnRlckRlYWxTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5iZXRVSS5yZXNldFRvc3NlZENoaXBzKCk7XG4gICAgICAgIHRoaXMuaW5HYW1lVUkucmVzZXRDb3VudGRvd24oKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIucmVuZGVyZXIuc2hvd1N0YWtlQ2hpcHModGhpcy5wbGF5ZXIuc3Rha2VOdW0pO1xuICAgICAgICB0aGlzLnBsYXllci5hZGRDYXJkKHRoaXMuZGVja3MuZHJhdygpKTtcbiAgICAgICAgdmFyIGhvbGRDYXJkID0gdGhpcy5kZWNrcy5kcmF3KCk7XG4gICAgICAgIHRoaXMuZGVhbGVyLmFkZEhvbGVDYXJkKGhvbGRDYXJkKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYWRkQ2FyZCh0aGlzLmRlY2tzLmRyYXcoKSk7XG4gICAgICAgIHRoaXMuZGVhbGVyLmFkZENhcmQodGhpcy5kZWNrcy5kcmF3KCkpO1xuICAgICAgICB0aGlzLmF1ZGlvTW5nLnBsYXlDYXJkKCk7XG4gICAgICAgIHRoaXMuZnNtLm9uRGVhbGVkKCk7XG4gICAgfSxcblxuICAgIG9uUGxheWVyc1R1cm5TdGF0ZTogZnVuY3Rpb24gb25QbGF5ZXJzVHVyblN0YXRlKGVudGVyKSB7XG4gICAgICAgIGlmIChlbnRlcikge1xuICAgICAgICAgICAgdGhpcy5pbkdhbWVVSS5zaG93R2FtZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25FbnRlckRlYWxlcnNUdXJuU3RhdGU6IGZ1bmN0aW9uIG9uRW50ZXJEZWFsZXJzVHVyblN0YXRlKCkge1xuICAgICAgICB3aGlsZSAodGhpcy5kZWFsZXIuc3RhdGUgPT09IEFjdG9yUGxheWluZ1N0YXRlLk5vcm1hbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGVhbGVyLndhbnRIaXQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVhbGVyLmFkZENhcmQodGhpcy5kZWNrcy5kcmF3KCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlYWxlci5zdGFuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZnNtLm9uRGVhbGVyQWN0ZWQoKTtcbiAgICB9LFxuXG4gICAgLy8g57uT566XXG4gICAgb25FbmRTdGF0ZTogZnVuY3Rpb24gb25FbmRTdGF0ZShlbnRlcikge1xuICAgICAgICBpZiAoZW50ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVhbGVyLnJldmVhbEhvbGRDYXJkKCk7XG4gICAgICAgICAgICB0aGlzLmluR2FtZVVJLnNob3dSZXN1bHRTdGF0ZSgpO1xuXG4gICAgICAgICAgICB2YXIgb3V0Y29tZSA9IHRoaXMuX2dldFBsYXllclJlc3VsdCh0aGlzLnBsYXllciwgdGhpcy5kZWFsZXIpO1xuICAgICAgICAgICAgc3dpdGNoIChvdXRjb21lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBUeXBlcy5PdXRjb21lLldpbjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvLnN0cmluZyA9ICdZb3UgV2luJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpb01uZy5wYXVzZU11c2ljKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9NbmcucGxheVdpbigpO1xuICAgICAgICAgICAgICAgICAgICAvLyDmi7/lm57ljp/lhYjoh6rlt7HnmoTnrbnnoIFcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbENoaXBzTnVtICs9IHRoaXMucGxheWVyLnN0YWtlTnVtO1xuICAgICAgICAgICAgICAgICAgICAvLyDlpZblirHnrbnnoIFcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdpbkNoaXBzTnVtID0gdGhpcy5wbGF5ZXIuc3Rha2VOdW07XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5wbGF5ZXIuc3RhdGUgPT09IFR5cGVzLkFjdG9yUGxheWluZ1N0YXRlLlJlcG9ydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyLmhhbmQgPT09IFR5cGVzLkhhbmQuQmxhY2tKYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luQ2hpcHNOdW0gKj0gMS41O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDkupTlsI/pvplcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5DaGlwc051bSAqPSAyLjA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbENoaXBzTnVtICs9IHdpbkNoaXBzTnVtO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRvdGFsQ2hpcHMoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFR5cGVzLk91dGNvbWUuTG9zZTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvLnN0cmluZyA9ICdZb3UgTG9zZSc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9NbmcucGF1c2VNdXNpYygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvTW5nLnBsYXlMb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBUeXBlcy5PdXRjb21lLlRpZTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvLnN0cmluZyA9ICdEcmF3JztcbiAgICAgICAgICAgICAgICAgICAgLy8g6YCA6L+Y562556CBXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxDaGlwc051bSArPSB0aGlzLnBsYXllci5zdGFrZU51bTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUb3RhbENoaXBzKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbmZvLmVuYWJsZWQgPSBlbnRlcjtcbiAgICB9LFxuXG4gICAgLy8g5LiL5rOoXG4gICAgb25CZXRTdGF0ZTogZnVuY3Rpb24gb25CZXRTdGF0ZShlbnRlcikge1xuICAgICAgICBpZiAoZW50ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVja3MucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLmRlYWxlci5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5pbmZvLnN0cmluZyA9ICfor7fkuIvms6gnO1xuICAgICAgICAgICAgdGhpcy5pbkdhbWVVSS5zaG93QmV0U3RhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5HYW1lVUkuc3RhcnRDb3VudGRvd24oKTtcblxuICAgICAgICAgICAgdGhpcy5hdWRpb01uZy5yZXN1bWVNdXNpYygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5mby5lbmFibGVkID0gZW50ZXI7XG4gICAgfSxcblxuICAgIC8vIFBSSVZBVEVTXG5cbiAgICAvLyDliKTmlq3njqnlrrbovpPotaJcbiAgICBfZ2V0UGxheWVyUmVzdWx0OiBmdW5jdGlvbiBfZ2V0UGxheWVyUmVzdWx0KHBsYXllciwgZGVhbGVyKSB7XG4gICAgICAgIHZhciBPdXRjb21lID0gVHlwZXMuT3V0Y29tZTtcbiAgICAgICAgaWYgKHBsYXllci5zdGF0ZSA9PT0gQWN0b3JQbGF5aW5nU3RhdGUuQnVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIE91dGNvbWUuTG9zZTtcbiAgICAgICAgfSBlbHNlIGlmIChkZWFsZXIuc3RhdGUgPT09IEFjdG9yUGxheWluZ1N0YXRlLkJ1c3QpIHtcbiAgICAgICAgICAgIHJldHVybiBPdXRjb21lLldpbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuc3RhdGUgPT09IEFjdG9yUGxheWluZ1N0YXRlLlJlcG9ydCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBPdXRjb21lLldpbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXllci5oYW5kID4gZGVhbGVyLmhhbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE91dGNvbWUuV2luO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGxheWVyLmhhbmQgPCBkZWFsZXIuaGFuZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT3V0Y29tZS5Mb3NlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuYmVzdFBvaW50ID09PSBkZWFsZXIuYmVzdFBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gT3V0Y29tZS5UaWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGxheWVyLmJlc3RQb2ludCA8IGRlYWxlci5iZXN0UG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBPdXRjb21lLkxvc2U7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gT3V0Y29tZS5XaW47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZTM5MGNwbDV2cEw1NENSa0gweEk4VWwnLCAnSG90VXBkYXRlJyk7XG4vLyBzY3JpcHRzL21vZHVsZS9Ib3RVcGRhdGUuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHVwZGF0ZVBhbmVsOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgbWFuaWZlc3RVcmw6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5SYXdBc3NldFxuICAgICAgICB9LFxuICAgICAgICBwZXJjZW50OiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY2hlY2tDYjogZnVuY3Rpb24gY2hlY2tDYihldmVudCkge1xuICAgICAgICBjYy5sb2coJ0NvZGU6ICcgKyBldmVudC5nZXRFdmVudENvZGUoKSk7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQuZ2V0RXZlbnRDb2RlKCkpIHtcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9OT19MT0NBTF9NQU5JRkVTVDpcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJObyBsb2NhbCBtYW5pZmVzdCBmaWxlIGZvdW5kLCBob3QgdXBkYXRlIHNraXBwZWQuXCIpO1xuICAgICAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcih0aGlzLl9jaGVja0xpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9ET1dOTE9BRF9NQU5JRkVTVDpcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9QQVJTRV9NQU5JRkVTVDpcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJGYWlsIHRvIGRvd25sb2FkIG1hbmlmZXN0IGZpbGUsIGhvdCB1cGRhdGUgc2tpcHBlZC5cIik7XG4gICAgICAgICAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLnJlbW92ZUxpc3RlbmVyKHRoaXMuX2NoZWNrTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkFMUkVBRFlfVVBfVE9fREFURTpcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJBbHJlYWR5IHVwIHRvIGRhdGUgd2l0aCB0aGUgbGF0ZXN0IHJlbW90ZSB2ZXJzaW9uLlwiKTtcbiAgICAgICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5fY2hlY2tMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuTkVXX1ZFUlNJT05fRk9VTkQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fbmVlZFVwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQYW5lbC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcih0aGlzLl9jaGVja0xpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlQ2I6IGZ1bmN0aW9uIHVwZGF0ZUNiKGV2ZW50KSB7XG4gICAgICAgIHZhciBuZWVkUmVzdGFydCA9IGZhbHNlO1xuICAgICAgICB2YXIgZmFpbGVkID0gZmFsc2U7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQuZ2V0RXZlbnRDb2RlKCkpIHtcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9OT19MT0NBTF9NQU5JRkVTVDpcbiAgICAgICAgICAgICAgICBjYy5sb2coJ05vIGxvY2FsIG1hbmlmZXN0IGZpbGUgZm91bmQsIGhvdCB1cGRhdGUgc2tpcHBlZC4nKTtcbiAgICAgICAgICAgICAgICBmYWlsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLlVQREFURV9QUk9HUkVTU0lPTjpcbiAgICAgICAgICAgICAgICB2YXIgcGVyY2VudCA9IGV2ZW50LmdldFBlcmNlbnQoKTtcbiAgICAgICAgICAgICAgICB2YXIgcGVyY2VudEJ5RmlsZSA9IGV2ZW50LmdldFBlcmNlbnRCeUZpbGUoKTtcblxuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBldmVudC5nZXRNZXNzYWdlKCk7XG4gICAgICAgICAgICAgICAgaWYgKG1zZykge1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2cobXNnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2MubG9nKHBlcmNlbnQgKyAnJScpO1xuICAgICAgICAgICAgICAgIHRoaXMucGVyY2VudC5zdHJpbmcgPSBwZXJjZW50ICsgJyUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkVSUk9SX0RPV05MT0FEX01BTklGRVNUOlxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkVSUk9SX1BBUlNFX01BTklGRVNUOlxuICAgICAgICAgICAgICAgIGNjLmxvZygnRmFpbCB0byBkb3dubG9hZCBtYW5pZmVzdCBmaWxlLCBob3QgdXBkYXRlIHNraXBwZWQuJyk7XG4gICAgICAgICAgICAgICAgZmFpbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5BTFJFQURZX1VQX1RPX0RBVEU6XG4gICAgICAgICAgICAgICAgY2MubG9nKCdBbHJlYWR5IHVwIHRvIGRhdGUgd2l0aCB0aGUgbGF0ZXN0IHJlbW90ZSB2ZXJzaW9uLicpO1xuICAgICAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuVVBEQVRFX0ZJTklTSEVEOlxuICAgICAgICAgICAgICAgIGNjLmxvZygnVXBkYXRlIGZpbmlzaGVkLiAnICsgZXZlbnQuZ2V0TWVzc2FnZSgpKTtcblxuICAgICAgICAgICAgICAgIG5lZWRSZXN0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5VUERBVEVfRkFJTEVEOlxuICAgICAgICAgICAgICAgIGNjLmxvZygnVXBkYXRlIGZhaWxlZC4gJyArIGV2ZW50LmdldE1lc3NhZ2UoKSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9mYWlsQ291bnQrKztcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZmFpbENvdW50IDwgNSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbS5kb3dubG9hZEZhaWxlZEFzc2V0cygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygnUmVhY2ggbWF4aW11bSBmYWlsIGNvdW50LCBleGl0IHVwZGF0ZSBwcm9jZXNzJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZhaWxDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkVSUk9SX1VQREFUSU5HOlxuICAgICAgICAgICAgICAgIGNjLmxvZygnQXNzZXQgdXBkYXRlIGVycm9yOiAnICsgZXZlbnQuZ2V0QXNzZXRJZCgpICsgJywgJyArIGV2ZW50LmdldE1lc3NhZ2UoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuRVJST1JfREVDT01QUkVTUzpcbiAgICAgICAgICAgICAgICBjYy5sb2coZXZlbnQuZ2V0TWVzc2FnZSgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmFpbGVkKSB7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5fdXBkYXRlTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYW5lbC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZWVkUmVzdGFydCkge1xuICAgICAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLnJlbW92ZUxpc3RlbmVyKHRoaXMuX3VwZGF0ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIC8vIFJlZ2lzdGVyIHRoZSBtYW5pZmVzdCdzIHNlYXJjaCBwYXRoXG4gICAgICAgICAgICB2YXIgc2VhcmNoUGF0aHMgPSB0aGlzLl9hbS5nZXRMb2NhbE1hbmlmZXN0KCkuZ2V0U2VhcmNoUGF0aHMoKTtcbiAgICAgICAgICAgIC8vIFRoaXMgdmFsdWUgd2lsbCBiZSByZXRyaWV2ZWQgYW5kIGFwcGVuZGVkIHRvIHRoZSBkZWZhdWx0IHNlYXJjaCBwYXRoIGR1cmluZyBnYW1lIHN0YXJ0dXAsXG4gICAgICAgICAgICAvLyBwbGVhc2UgcmVmZXIgdG8gc2FtcGxlcy9qcy10ZXN0cy9tYWluLmpzIGZvciBkZXRhaWxlZCB1c2FnZS5cbiAgICAgICAgICAgIC8vICEhISBSZS1hZGQgdGhlIHNlYXJjaCBwYXRocyBpbiBtYWluLmpzIGlzIHZlcnkgaW1wb3J0YW50LCBvdGhlcndpc2UsIG5ldyBzY3JpcHRzIHdvbid0IHRha2UgZWZmZWN0LlxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdIb3RVcGRhdGVTZWFyY2hQYXRocycsIEpTT04uc3RyaW5naWZ5KHNlYXJjaFBhdGhzKSk7XG5cbiAgICAgICAgICAgIGpzYi5maWxlVXRpbHMuc2V0U2VhcmNoUGF0aHMoc2VhcmNoUGF0aHMpO1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdtZW51Jyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaG90VXBkYXRlOiBmdW5jdGlvbiBob3RVcGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9hbSAmJiB0aGlzLl9uZWVkVXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVMaXN0ZW5lciA9IG5ldyBqc2IuRXZlbnRMaXN0ZW5lckFzc2V0c01hbmFnZXIodGhpcy5fYW0sIHRoaXMudXBkYXRlQ2IuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkTGlzdGVuZXIodGhpcy5fdXBkYXRlTGlzdGVuZXIsIDEpO1xuXG4gICAgICAgICAgICB0aGlzLl9mYWlsQ291bnQgPSAwO1xuICAgICAgICAgICAgdGhpcy5fYW0udXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIC8vIEhvdCB1cGRhdGUgaXMgb25seSBhdmFpbGFibGUgaW4gTmF0aXZlIGJ1aWxkXG4gICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0b3JhZ2VQYXRoID0gKGpzYi5maWxlVXRpbHMgPyBqc2IuZmlsZVV0aWxzLmdldFdyaXRhYmxlUGF0aCgpIDogJy8nKSArICdibGFja2phY2stcmVtb3RlLWFzc2V0JztcbiAgICAgICAgY2MubG9nKCdTdG9yYWdlIHBhdGggZm9yIHJlbW90ZSBhc3NldCA6ICcgKyBzdG9yYWdlUGF0aCk7XG5cbiAgICAgICAgLy8gY2MubG9nKCdMb2NhbCBtYW5pZmVzdCBVUkwgOiAnICsgdGhpcy5tYW5pZmVzdFVybCk7XG4gICAgICAgIHRoaXMuX2FtID0gbmV3IGpzYi5Bc3NldHNNYW5hZ2VyKHRoaXMubWFuaWZlc3RVcmwsIHN0b3JhZ2VQYXRoKTtcbiAgICAgICAgdGhpcy5fYW0ucmV0YWluKCk7XG5cbiAgICAgICAgdGhpcy5fbmVlZFVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5fYW0uZ2V0TG9jYWxNYW5pZmVzdCgpLmlzTG9hZGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrTGlzdGVuZXIgPSBuZXcganNiLkV2ZW50TGlzdGVuZXJBc3NldHNNYW5hZ2VyKHRoaXMuX2FtLCB0aGlzLmNoZWNrQ2IuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkTGlzdGVuZXIodGhpcy5fY2hlY2tMaXN0ZW5lciwgMSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2FtLmNoZWNrVXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25EZXN0cm95OiBmdW5jdGlvbiBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX2FtICYmIHRoaXMuX2FtLnJlbGVhc2UoKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2YxOTJlZnJvZUZFeWF4dGZoOFRWWFl6JywgJ0luR2FtZVVJJyk7XG4vLyBzY3JpcHRzL1VJL0luR2FtZVVJLmpzXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEdhbWUgPSByZXF1aXJlKCdHYW1lJyk7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcGFuZWxDaGF0OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIHBhbmVsU29jaWFsOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGJldFN0YXRlVUk6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgZ2FtZVN0YXRlVUk6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgcmVzdWx0VHh0OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBiZXRDb3VudGVyOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGJ0blN0YXJ0OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsVG90YWxDaGlwczoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KGJldER1cmF0aW9uKSB7XG4gICAgICAgIHRoaXMucGFuZWxDaGF0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBhbmVsU29jaWFsLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlc3VsdFR4dC5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYmV0U3RhdGVVSS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmdhbWVTdGF0ZVVJLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyB0aGlzLnJlc3VsdFN0YXRlVUkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYnRuU3RhcnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYmV0RHVyYXRpb24gPSBiZXREdXJhdGlvbjtcbiAgICAgICAgdGhpcy5wcm9ncmVzc1RpbWVyID0gdGhpcy5pbml0Q291bnRkb3duKCk7XG4gICAgfSxcblxuICAgIGluaXRDb3VudGRvd246IGZ1bmN0aW9uIGluaXRDb3VudGRvd24oKSB7XG4gICAgICAgIHZhciBjb3VudGRvd25UZXggPSBHYW1lLmluc3RhbmNlLmFzc2V0TW5nLnRleEJldENvdW50ZG93bi5nZXRUZXh0dXJlKCk7XG4gICAgICAgIHRoaXMuc2dDb3VudGRvd24gPSBuZXcgX2Njc2cuU3ByaXRlKGNvdW50ZG93blRleCk7XG4gICAgICAgIHRoaXMuc2dDb3VudGRvd24uc2V0Q29sb3IoY2MuQ29sb3IuQkxBQ0spO1xuXG4gICAgICAgIHZhciBwcm9ncmVzc1RpbWVyID0gbmV3IGNjLlByb2dyZXNzVGltZXIodGhpcy5zZ0NvdW50ZG93bik7XG4gICAgICAgIHByb2dyZXNzVGltZXIuc2V0TmFtZSgncHJvZ3Jlc3NUaW1lcicpO1xuICAgICAgICBwcm9ncmVzc1RpbWVyLnNldE1pZHBvaW50KGNjLnAoMC41LCAwLjUpKTtcbiAgICAgICAgcHJvZ3Jlc3NUaW1lci5zZXRUeXBlKGNjLlByb2dyZXNzVGltZXIuVHlwZS5SQURJQUwpO1xuICAgICAgICBwcm9ncmVzc1RpbWVyLnJldmVyc2VEaXIgPSB0cnVlO1xuICAgICAgICB0aGlzLmJldENvdW50ZXIuX3NnTm9kZS5hZGRDaGlsZChwcm9ncmVzc1RpbWVyKTtcbiAgICAgICAgcHJvZ3Jlc3NUaW1lci5zZXRQb3NpdGlvbihjYy5wKDAsIC10aGlzLmJldENvdW50ZXIuaGVpZ2h0IC8gMikpO1xuICAgICAgICBwcm9ncmVzc1RpbWVyLnNldFBlcmNlbnRhZ2UoMCk7XG5cbiAgICAgICAgcmV0dXJuIHByb2dyZXNzVGltZXI7XG4gICAgfSxcblxuICAgIHN0YXJ0Q291bnRkb3duOiBmdW5jdGlvbiBzdGFydENvdW50ZG93bigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NUaW1lcikge1xuICAgICAgICAgICAgdmFyIGZyb21UbyA9IGNjLnByb2dyZXNzRnJvbVRvKHRoaXMuYmV0RHVyYXRpb24sIDAsIDEwMCk7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzVGltZXIucnVuQWN0aW9uKGZyb21Ubyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVzZXRDb3VudGRvd246IGZ1bmN0aW9uIHJlc2V0Q291bnRkb3duKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9ncmVzc1RpbWVyKSB7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzVGltZXIuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NUaW1lci5zZXRQZXJjZW50YWdlKDEwMCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvd0JldFN0YXRlOiBmdW5jdGlvbiBzaG93QmV0U3RhdGUoKSB7XG4gICAgICAgIHRoaXMuYmV0U3RhdGVVSS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmdhbWVTdGF0ZVVJLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJ0blN0YXJ0LmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBzaG93R2FtZVN0YXRlOiBmdW5jdGlvbiBzaG93R2FtZVN0YXRlKCkge1xuICAgICAgICB0aGlzLmJldFN0YXRlVUkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlVUkuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5idG5TdGFydC5hY3RpdmUgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2hvd1Jlc3VsdFN0YXRlOiBmdW5jdGlvbiBzaG93UmVzdWx0U3RhdGUoKSB7XG4gICAgICAgIHRoaXMuYmV0U3RhdGVVSS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nYW1lU3RhdGVVSS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5idG5TdGFydC5hY3RpdmUgPSB0cnVlO1xuICAgIH0sXG5cbiAgICB0b2dnbGVDaGF0OiBmdW5jdGlvbiB0b2dnbGVDaGF0KCkge1xuICAgICAgICB0aGlzLnBhbmVsQ2hhdC5hY3RpdmUgPSAhdGhpcy5wYW5lbENoYXQuYWN0aXZlO1xuICAgIH0sXG5cbiAgICB0b2dnbGVTb2NpYWw6IGZ1bmN0aW9uIHRvZ2dsZVNvY2lhbCgpIHtcbiAgICAgICAgdGhpcy5wYW5lbFNvY2lhbC5hY3RpdmUgPSAhdGhpcy5wYW5lbFNvY2lhbC5hY3RpdmU7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7fVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICczYzE2YzNsZTZoQ3NydG5hbnFLOE4yVycsICdNYXNrJyk7XG4vLyBzY3JpcHRzL21vZHVsZS9NYXNrLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHt9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5vZGUub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5vZGUub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5vZGUub24oJ21vdXNldXAnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICcyMGY2MG0rM1JsR083eDIvQVJ6WjZRYycsICdNZW51Jyk7XG4vLyBzY3JpcHRzL01lbnUuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1ZGlvTW5nOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuYXVkaW9NbmcgPSB0aGlzLmF1ZGlvTW5nLmdldENvbXBvbmVudCgnQXVkaW9NbmcnKTtcbiAgICAgICAgdGhpcy5hdWRpb01uZy5wbGF5TXVzaWMoKTtcbiAgICB9LFxuXG4gICAgcGxheUdhbWU6IGZ1bmN0aW9uIHBsYXlHYW1lKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ3RhYmxlJyk7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7fVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc0ZjljNWVYeHFoSEFLTHhaZVJtZ0hEQicsICdQbGF5ZXJEYXRhJyk7XG4vLyBzY3JpcHRzL21vZHVsZS9QbGF5ZXJEYXRhLmpzXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHBsYXllcnMgPSBbe1xuXHRuYW1lOiAn54eD54On5ZCn77yM6JuL6JuL5YS/5YabJyxcblx0Z29sZDogMzAwMCxcblx0cGhvdG9JZHg6IDBcbn0sIHtcblx0bmFtZTogJ+WcsOaWueaUv+W6nCcsXG5cdGdvbGQ6IDIwMDAsXG5cdHBob3RvSWR4OiAxXG59LCB7XG5cdG5hbWU6ICfmiYvmnLrotoXkuronLFxuXHRnb2xkOiAxNTAwLFxuXHRwaG90b0lkeDogMlxufSwge1xuXHRuYW1lOiAn5aSp54G154G177yM5Zyw54G154G1Jyxcblx0Z29sZDogNTAwLFxuXHRwaG90b0lkeDogM1xufSwge1xuXHRuYW1lOiAn5ZOf5ZOf77yM5YiH5YWL6Ze5Jyxcblx0Z29sZDogOTAwMCxcblx0cGhvdG9JZHg6IDRcbn0sIHtcblx0bmFtZTogJ+WtpuWnkOS4jeimgeatuycsXG5cdGdvbGQ6IDUwMDAsXG5cdHBob3RvSWR4OiA1XG59LCB7XG5cdG5hbWU6ICfmj5Dnmb7kuIcnLFxuXHRnb2xkOiAxMDAwMCxcblx0cGhvdG9JZHg6IDZcbn1dO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0cGxheWVyczogcGxheWVyc1xufTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzIyNmEyQXZ6UnBITDdTSkdUTXk1UERYJywgJ1BsYXllcicpO1xuLy8gc2NyaXB0cy9QbGF5ZXIuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQWN0b3IgPSByZXF1aXJlKCdBY3RvcicpO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBBY3RvcixcblxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgICAgIHRoaXMubGFiZWxTdGFrZSA9IHRoaXMucmVuZGVyZXIubGFiZWxTdGFrZU9uVGFibGU7XG4gICAgICAgIHRoaXMuc3Rha2VOdW0gPSAwO1xuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgICAgIHRoaXMucmVzZXRTdGFrZSgpO1xuICAgIH0sXG5cbiAgICBhZGRDYXJkOiBmdW5jdGlvbiBhZGRDYXJkKGNhcmQpIHtcbiAgICAgICAgdGhpcy5fc3VwZXIoY2FyZCk7XG5cbiAgICAgICAgLy8gdmFyIEdhbWUgPSByZXF1aXJlKCdHYW1lJyk7XG4gICAgICAgIC8vIEdhbWUuaW5zdGFuY2UuY2FuUmVwb3J0ID0gdGhpcy5jYW5SZXBvcnQ7XG4gICAgfSxcblxuICAgIGFkZFN0YWtlOiBmdW5jdGlvbiBhZGRTdGFrZShkZWx0YSkge1xuICAgICAgICB0aGlzLnN0YWtlTnVtICs9IGRlbHRhO1xuICAgICAgICB0aGlzLnVwZGF0ZVN0YWtlKHRoaXMuc3Rha2VOdW0pO1xuICAgIH0sXG5cbiAgICByZXNldFN0YWtlOiBmdW5jdGlvbiByZXNldFN0YWtlKGRlbHRhKSB7XG4gICAgICAgIHRoaXMuc3Rha2VOdW0gPSAwO1xuICAgICAgICB0aGlzLnVwZGF0ZVN0YWtlKHRoaXMuc3Rha2VOdW0pO1xuICAgIH0sXG5cbiAgICB1cGRhdGVTdGFrZTogZnVuY3Rpb24gdXBkYXRlU3Rha2UobnVtYmVyKSB7XG4gICAgICAgIHRoaXMubGFiZWxTdGFrZS5zdHJpbmcgPSBudW1iZXI7XG4gICAgfVxuXG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzE2NTdld2ZpakJPWExxNXpHcXI2UHZFJywgJ1JhbmtJdGVtJyk7XG4vLyBzY3JpcHRzL1VJL1JhbmtJdGVtLmpzXG5cblwidXNlIHN0cmljdFwiO1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc3BSYW5rQkc6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsUmFuazoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBsYWJlbFBsYXllck5hbWU6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWxHb2xkOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIHNwUGxheWVyUGhvdG86IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlXG4gICAgICAgIH0sXG4gICAgICAgIHRleFJhbmtCRzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFtdLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICAgICAgfSxcbiAgICAgICAgdGV4UGxheWVyUGhvdG86IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBbXSxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgICAgIH1cbiAgICAgICAgLy8gLi4uXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQocmFuaywgcGxheWVySW5mbykge1xuICAgICAgICBpZiAocmFuayA8IDMpIHtcbiAgICAgICAgICAgIC8vIHNob3VsZCBkaXNwbGF5IHRyb3BoeVxuICAgICAgICAgICAgdGhpcy5sYWJlbFJhbmsubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3BSYW5rQkcuc3ByaXRlRnJhbWUgPSB0aGlzLnRleFJhbmtCR1tyYW5rXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWxSYW5rLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubGFiZWxSYW5rLnN0cmluZyA9IChyYW5rICsgMSkudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGFiZWxQbGF5ZXJOYW1lLnN0cmluZyA9IHBsYXllckluZm8ubmFtZTtcbiAgICAgICAgdGhpcy5sYWJlbEdvbGQuc3RyaW5nID0gcGxheWVySW5mby5nb2xkLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuc3BQbGF5ZXJQaG90by5zcHJpdGVGcmFtZSA9IHRoaXMudGV4UGxheWVyUGhvdG9bcGxheWVySW5mby5waG90b0lkeF07XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7fVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdmZTNmY0l4Q0ZGTHJLSGc2czUreFJVVScsICdSYW5rTGlzdCcpO1xuLy8gc2NyaXB0cy9VSS9SYW5rTGlzdC5qc1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwbGF5ZXJzID0gcmVxdWlyZSgnUGxheWVyRGF0YScpLnBsYXllcnM7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc2Nyb2xsVmlldzoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU2Nyb2xsVmlld1xuICAgICAgICB9LFxuICAgICAgICBwcmVmYWJSYW5rSXRlbToge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG4gICAgICAgIHJhbmtDb3VudDogMFxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQ7XG4gICAgICAgIHRoaXMucG9wdWxhdGVMaXN0KCk7XG4gICAgfSxcblxuICAgIHBvcHVsYXRlTGlzdDogZnVuY3Rpb24gcG9wdWxhdGVMaXN0KCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucmFua0NvdW50OyArK2kpIHtcbiAgICAgICAgICAgIHZhciBwbGF5ZXJJbmZvID0gcGxheWVyc1tpXTtcbiAgICAgICAgICAgIHZhciBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJSYW5rSXRlbSk7XG4gICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudCgnUmFua0l0ZW0nKS5pbml0KGksIHBsYXllckluZm8pO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmFkZENoaWxkKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7fVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICczYWFlN2xaS3loUHFxc0xEM3dNS2w2WCcsICdTaWRlU3dpdGNoZXInKTtcbi8vIHNjcmlwdHMvU2lkZVN3aXRjaGVyLmpzXG5cblwidXNlIHN0cmljdFwiO1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcmV0YWluU2lkZU5vZGVzOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogW10sXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgc3dpdGNoU2lkZTogZnVuY3Rpb24gc3dpdGNoU2lkZSgpIHtcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IC10aGlzLm5vZGUuc2NhbGVYO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucmV0YWluU2lkZU5vZGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY3VyTm9kZSA9IHRoaXMucmV0YWluU2lkZU5vZGVzW2ldO1xuICAgICAgICAgICAgY3VyTm9kZS5zY2FsZVggPSAtY3VyTm9kZS5zY2FsZVg7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2I0ZWI1TG82VTFJWjRlSld1eFNoQ2RIJywgJ1Rvc3NDaGlwJyk7XG4vLyBzY3JpcHRzL1Rvc3NDaGlwLmpzXG5cbid1c2Ugc3RyaWN0JztcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBhbmltOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5BbmltYXRpb25cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBwbGF5OiBmdW5jdGlvbiBwbGF5KCkge1xuICAgICAgICB0aGlzLmFuaW0ucGxheSgnY2hpcF90b3NzJyk7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc1YjYzM1FNUXhwRm1ZZXRvZkV2SzJVRCcsICdUeXBlcycpO1xuLy8gc2NyaXB0cy9tb2R1bGUvVHlwZXMuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU3VpdCA9IGNjLkVudW0oe1xuICAgIFNwYWRlOiAxLCAvLyDpu5HmoYNcbiAgICBIZWFydDogMiwgLy8g57qi5qGDXG4gICAgQ2x1YjogMywgLy8g5qKF6IqxKOm7kSlcbiAgICBEaWFtb25kOiA0IH0pO1xuXG4vLyDmlrnlnZco57qiKVxudmFyIEEyXzEwSlFLID0gJ05BTixBLDIsMyw0LDUsNiw3LDgsOSwxMCxKLFEsSycuc3BsaXQoJywnKTtcblxuLyoqXG4gKiDmiZHlhYvniYznsbvvvIzlj6rnlKjmnaXooajnpLrniYznmoTln7rmnKzlsZ7mgKfvvIzkuI3ljIXlkKvmuLjmiI/pgLvovpHvvIzmiYDmnInlsZ7mgKflj6ror7vvvIxcbiAqIOWboOatpOWFqOWxgOWPqumcgOimgeaciSA1MiDkuKrlrp7kvovvvIjljrvmjonlpKflsI/njovvvInvvIzkuI3orrrmnInlpJrlsJHlia/niYxcbiAqIEBjbGFzcyBDYXJkXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBwb2ludCAtIOWPr+iDveeahOWAvOS4uiAxIOWIsCAxM1xuICogQHBhcmFtIHtTdWl0fSBzdWl0XG4gKi9cbmZ1bmN0aW9uIENhcmQocG9pbnQsIHN1aXQpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICAgIHBvaW50OiB7XG4gICAgICAgICAgICB2YWx1ZTogcG9pbnQsXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgc3VpdDoge1xuICAgICAgICAgICAgdmFsdWU6IHN1aXQsXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBpZCAtIOWPr+iDveeahOWAvOS4uiAwIOWIsCA1MVxuICAgICAgICAgKi9cbiAgICAgICAgaWQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiAoc3VpdCAtIDEpICogMTMgKyAocG9pbnQgLSAxKSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICAvL1xuICAgICAgICBwb2ludE5hbWU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBBMl8xMEpRS1t0aGlzLnBvaW50XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc3VpdE5hbWU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBTdWl0W3RoaXMuc3VpdF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzQmxhY2tTdWl0OiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdWl0ID09PSBTdWl0LlNwYWRlIHx8IHRoaXMuc3VpdCA9PT0gU3VpdC5DbHViO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpc1JlZFN1aXQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN1aXQgPT09IFN1aXQuSGVhcnQgfHwgdGhpcy5zdWl0ID09PSBTdWl0LkRpYW1vbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuQ2FyZC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3VpdE5hbWUgKyAnICcgKyB0aGlzLnBvaW50TmFtZTtcbn07XG5cbi8vIOWtmOaUviA1MiDlvKDmiZHlhYvnmoTlrp7kvotcbnZhciBjYXJkcyA9IG5ldyBBcnJheSg1Mik7XG5cbi8qKlxuICog6L+U5Zue5oyH5a6aIGlkIOeahOWunuS+i1xuICogQHBhcmFtIHtOdW1iZXJ9IGlkIC0gMCDliLAgNTFcbiAqL1xuQ2FyZC5mcm9tSWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICByZXR1cm4gY2FyZHNbaWRdO1xufTtcblxuLy8g5Yid5aeL5YyW5omA5pyJ5omR5YWL54mMXG4oZnVuY3Rpb24gY3JlYXRlQ2FyZHMoKSB7XG4gICAgZm9yICh2YXIgcyA9IDE7IHMgPD0gNDsgcysrKSB7XG4gICAgICAgIGZvciAodmFyIHAgPSAxOyBwIDw9IDEzOyBwKyspIHtcbiAgICAgICAgICAgIHZhciBjYXJkID0gbmV3IENhcmQocCwgcyk7XG4gICAgICAgICAgICBjYXJkc1tjYXJkLmlkXSA9IGNhcmQ7XG4gICAgICAgIH1cbiAgICB9XG59KSgpO1xuXG4vLyDmiYvkuK3niYznmoTnirbmgIFcbnZhciBBY3RvclBsYXlpbmdTdGF0ZSA9IGNjLkVudW0oe1xuICAgIE5vcm1hbDogLTEsXG4gICAgU3RhbmQ6IC0xLCAvLyDlgZzniYxcbiAgICBSZXBvcnQ6IC0xLCAvLyDmiqXliLBcbiAgICBCdXN0OiAtMSB9KTtcblxuLy8g6L6T6LWiXG4vLyDniIbkuoZcbnZhciBPdXRjb21lID0gY2MuRW51bSh7XG4gICAgV2luOiAtMSxcbiAgICBMb3NlOiAtMSxcbiAgICBUaWU6IC0xXG59KTtcblxuLy8g54mM5Z6L77yM5YC86LaK5aSn6LaK5Y6J5a6zXG52YXIgSGFuZCA9IGNjLkVudW0oe1xuICAgIE5vcm1hbDogLTEsIC8vIOaXoFxuICAgIEJsYWNrSmFjazogLTEsIC8vIOm7keadsOWFi1xuICAgIEZpdmVDYXJkOiAtMSB9KTtcblxuLy8g5LqU5bCP6b6ZXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBTdWl0OiBTdWl0LFxuICAgIENhcmQ6IENhcmQsXG4gICAgQWN0b3JQbGF5aW5nU3RhdGU6IEFjdG9yUGxheWluZ1N0YXRlLFxuICAgIEhhbmQ6IEhhbmQsXG4gICAgT3V0Y29tZTogT3V0Y29tZVxufTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzczNTkwZXNrNnhQOUlDcWhmVVphbE1nJywgJ1V0aWxzJyk7XG4vLyBzY3JpcHRzL21vZHVsZS9VdGlscy5qc1xuXG5cbi8vIOi/lOWbnuWwveWPr+iDveS4jei2hei/hyAyMSDngrnnmoTmnIDlsI/lkozmnIDlpKfngrnmlbBcblwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBnZXRNaW5NYXhQb2ludChjYXJkcykge1xuICAgIHZhciBoYXNBY2UgPSBmYWxzZTtcbiAgICB2YXIgbWluID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjYXJkID0gY2FyZHNbaV07XG4gICAgICAgIGlmIChjYXJkLnBvaW50ID09PSAxKSB7XG4gICAgICAgICAgICBoYXNBY2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIG1pbiArPSBNYXRoLm1pbigxMCwgY2FyZC5wb2ludCk7XG4gICAgfVxuICAgIHZhciBtYXggPSBtaW47XG4gICAgLy8g5aaC5p6c5pyJIDEg5LiqIEEg5Y+v5Lul5b2T5oiQIDExXG4gICAgaWYgKGhhc0FjZSAmJiBtaW4gKyAxMCA8PSAyMSkge1xuICAgICAgICAvLyDvvIjlpoLmnpzkuKTkuKogQSDpg73lvZPmiJAgMTHvvIzpgqPkuYjmgLvliIbmnIDlsI/kuZ/kvJrmmK8gMjLvvIzniIbkuobvvIzmiYDku6XmnIDlpJrlj6rog73mnInkuIDkuKogQSDlvZPmiJAgMTHvvIlcbiAgICAgICAgbWF4ICs9IDEwO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIG1pbjogbWluLFxuICAgICAgICBtYXg6IG1heFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGlzQnVzdChjYXJkcykge1xuICAgIHZhciBzdW0gPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FyZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNhcmQgPSBjYXJkc1tpXTtcbiAgICAgICAgc3VtICs9IE1hdGgubWluKDEwLCBjYXJkLnBvaW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHN1bSA+IDIxO1xufVxuXG52YXIgaXNNb2JpbGUgPSBmdW5jdGlvbiBpc01vYmlsZSgpIHtcbiAgICByZXR1cm4gY2Muc3lzLmlzTW9iaWxlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaXNCdXN0OiBpc0J1c3QsXG4gICAgZ2V0TWluTWF4UG9pbnQ6IGdldE1pbk1heFBvaW50LFxuICAgIGlzTW9iaWxlOiBpc01vYmlsZVxufTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzY1MTBkMVNtUVJNTVlIOEZFSUE3elhxJywgJ2dhbWUtZnNtJyk7XG4vLyBzY3JpcHRzL21vZHVsZS9nYW1lLWZzbS5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIFN0YXRlID0gcmVxdWlyZSgnc3RhdGUuY29tJyk7XG5cbnZhciBpbnN0YW5jZTtcbnZhciBtb2RlbDtcbnZhciBwbGF5aW5nO1xuXG5mdW5jdGlvbiBvbihtZXNzYWdlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChtc2dUb0V2YWx1YXRlKSB7XG4gICAgICAgIHJldHVybiBtc2dUb0V2YWx1YXRlID09PSBtZXNzYWdlO1xuICAgIH07XG59XG5cbnZhciBldmFsdWF0aW5nID0gZmFsc2U7XG5cbmV4cG9ydHMgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdCh0YXJnZXQpIHtcbiAgICAgICAgLy8gc2VuZCBsb2cgbWVzc2FnZXMsIHdhcm5pbmdzIGFuZCBlcnJvcnMgdG8gdGhlIGNvbnNvbGVcbiAgICAgICAgU3RhdGUuY29uc29sZSA9IGNvbnNvbGU7XG5cbiAgICAgICAgbW9kZWwgPSBuZXcgU3RhdGUuU3RhdGVNYWNoaW5lKFwicm9vdFwiKTtcbiAgICAgICAgdmFyIGluaXRpYWwgPSBuZXcgU3RhdGUuUHNldWRvU3RhdGUoXCJpbml0LXJvb3RcIiwgbW9kZWwsIFN0YXRlLlBzZXVkb1N0YXRlS2luZC5Jbml0aWFsKTtcblxuICAgICAgICAvLyDlvZPliY3ov5nkuIDmiornmoTnirbmgIFcblxuICAgICAgICB2YXIgYmV0ID0gbmV3IFN0YXRlLlN0YXRlKFwi5LiL5rOoXCIsIG1vZGVsKTtcbiAgICAgICAgcGxheWluZyA9IG5ldyBTdGF0ZS5TdGF0ZShcIuW3suW8gOWxgFwiLCBtb2RlbCk7XG4gICAgICAgIHZhciBzZXR0bGVkID0gbmV3IFN0YXRlLlN0YXRlKFwi57uT566XXCIsIG1vZGVsKTtcblxuICAgICAgICBpbml0aWFsLnRvKGJldCk7XG4gICAgICAgIGJldC50byhwbGF5aW5nKS53aGVuKG9uKFwiZGVhbFwiKSk7XG4gICAgICAgIHBsYXlpbmcudG8oc2V0dGxlZCkud2hlbihvbihcImVuZFwiKSk7XG4gICAgICAgIHNldHRsZWQudG8oYmV0KS53aGVuKG9uKFwiYmV0XCIpKTtcblxuICAgICAgICBiZXQuZW50cnkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGFyZ2V0Lm9uQmV0U3RhdGUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBiZXQuZXhpdChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0YXJnZXQub25CZXRTdGF0ZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldHRsZWQuZW50cnkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGFyZ2V0Lm9uRW5kU3RhdGUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXR0bGVkLmV4aXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGFyZ2V0Lm9uRW5kU3RhdGUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyDlvIDlsYDlkI7nmoTlrZDnirbmgIFcblxuICAgICAgICB2YXIgaW5pdGlhbFAgPSBuZXcgU3RhdGUuUHNldWRvU3RhdGUoXCJpbml0IOW3suW8gOWxgFwiLCBwbGF5aW5nLCBTdGF0ZS5Qc2V1ZG9TdGF0ZUtpbmQuSW5pdGlhbCk7XG4gICAgICAgIHZhciBkZWFsID0gbmV3IFN0YXRlLlN0YXRlKFwi5Y+R54mMXCIsIHBsYXlpbmcpO1xuICAgICAgICAvL3ZhciBwb3N0RGVhbCA9IG5ldyBTdGF0ZS5TdGF0ZShcIuetieW+hVwiLCBwbGF5aW5nKTsgICAgLy8g6K+i6Zeu546p5a625piv5ZCm5Lmw5L+d6Zmp77yM5Y+M5YCN44CB5YiG54mM562JXG4gICAgICAgIHZhciBwbGF5ZXJzVHVybiA9IG5ldyBTdGF0ZS5TdGF0ZShcIueOqeWutuWGs+etllwiLCBwbGF5aW5nKTtcbiAgICAgICAgdmFyIGRlYWxlcnNUdXJuID0gbmV3IFN0YXRlLlN0YXRlKFwi5bqE5a625Yaz562WXCIsIHBsYXlpbmcpO1xuXG4gICAgICAgIGluaXRpYWxQLnRvKGRlYWwpO1xuICAgICAgICBkZWFsLnRvKHBsYXllcnNUdXJuKS53aGVuKG9uKFwiZGVhbGVkXCIpKTtcbiAgICAgICAgcGxheWVyc1R1cm4udG8oZGVhbGVyc1R1cm4pLndoZW4ob24oXCJwbGF5ZXIgYWN0ZWRcIikpO1xuXG4gICAgICAgIGRlYWwuZW50cnkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGFyZ2V0Lm9uRW50ZXJEZWFsU3RhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHBsYXllcnNUdXJuLmVudHJ5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRhcmdldC5vblBsYXllcnNUdXJuU3RhdGUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBwbGF5ZXJzVHVybi5leGl0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRhcmdldC5vblBsYXllcnNUdXJuU3RhdGUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVhbGVyc1R1cm4uZW50cnkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGFyZ2V0Lm9uRW50ZXJEZWFsZXJzVHVyblN0YXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhIFN0YXRlIG1hY2hpbmUgaW5zdGFuY2VcbiAgICAgICAgaW5zdGFuY2UgPSBuZXcgU3RhdGUuU3RhdGVNYWNoaW5lSW5zdGFuY2UoXCJmc21cIik7XG4gICAgICAgIFN0YXRlLmluaXRpYWxpc2UobW9kZWwsIGluc3RhbmNlKTtcbiAgICB9LFxuXG4gICAgdG9EZWFsOiBmdW5jdGlvbiB0b0RlYWwoKSB7XG4gICAgICAgIHRoaXMuX2V2YWx1YXRlKCdkZWFsJyk7XG4gICAgfSxcbiAgICB0b0JldDogZnVuY3Rpb24gdG9CZXQoKSB7XG4gICAgICAgIHRoaXMuX2V2YWx1YXRlKCdiZXQnKTtcbiAgICB9LFxuICAgIG9uRGVhbGVkOiBmdW5jdGlvbiBvbkRlYWxlZCgpIHtcbiAgICAgICAgdGhpcy5fZXZhbHVhdGUoJ2RlYWxlZCcpO1xuICAgIH0sXG4gICAgb25QbGF5ZXJBY3RlZDogZnVuY3Rpb24gb25QbGF5ZXJBY3RlZCgpIHtcbiAgICAgICAgdGhpcy5fZXZhbHVhdGUoJ3BsYXllciBhY3RlZCcpO1xuICAgIH0sXG4gICAgb25EZWFsZXJBY3RlZDogZnVuY3Rpb24gb25EZWFsZXJBY3RlZCgpIHtcbiAgICAgICAgdGhpcy5fZXZhbHVhdGUoJ2VuZCcpO1xuICAgIH0sXG5cbiAgICBfZXZhbHVhdGU6IGZ1bmN0aW9uIF9ldmFsdWF0ZShtZXNzYWdlKSB7XG4gICAgICAgIGlmIChldmFsdWF0aW5nKSB7XG4gICAgICAgICAgICAvLyBjYW4gbm90IGNhbGwgZnNtJ3MgZXZhbHVhdGUgcmVjdXJzaXZlbHlcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIFN0YXRlLmV2YWx1YXRlKG1vZGVsLCBpbnN0YW5jZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBldmFsdWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgU3RhdGUuZXZhbHVhdGUobW9kZWwsIGluc3RhbmNlLCBtZXNzYWdlKTtcbiAgICAgICAgZXZhbHVhdGluZyA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBfZ2V0SW5zdGFuY2U6IGZ1bmN0aW9uIF9nZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH0sXG5cbiAgICBfZ2V0TW9kZWw6IGZ1bmN0aW9uIF9nZXRNb2RlbCgpIHtcbiAgICAgICAgcmV0dXJuIG1vZGVsO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cztcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzcxZDkyOTNteDlDRnJ5aEp2Unc4NVpTJywgJ3N0YXRlLmNvbScpO1xuLy8gc2NyaXB0cy9saWIvc3RhdGUuY29tLmpzXG5cbi8qXG4gKiBGaW5pdGUgc3RhdGUgbWFjaGluZSBsaWJyYXJ5XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtNSBTdGVlbGJyZWV6ZSBMaW1pdGVkXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGFuZCBHUEwgdjMgbGljZW5jZXNcbiAqIGh0dHA6Ly93d3cuc3RlZWxicmVlemUubmV0L3N0YXRlLmNzXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIgU3RhdGVKUztcbihmdW5jdGlvbiAoU3RhdGVKUykge1xuICAgIC8qKlxuICAgICAqIEJlaGF2aW9yIGVuY2Fwc3VsYXRlcyBtdWx0aXBsZSBBY3Rpb24gY2FsbGJhY2tzIHRoYXQgY2FuIGJlIGludm9rZWQgYnkgYSBzaW5nbGUgY2FsbC5cbiAgICAgKiBAY2xhc3MgQmVoYXZpb3JcbiAgICAgKi9cbiAgICB2YXIgQmVoYXZpb3IgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgQmVoYXZpb3IgY2xhc3MuXG4gICAgICAgICAqIEBwYXJhbSB7QmVoYXZpb3J9IGJlaGF2aW9yIFRoZSBjb3B5IGNvbnN0cnVjdG9yOyBvbWl0IHRoaXMgb3B0aW9uYWwgcGFyYW1ldGVyIGZvciBhIHNpbXBsZSBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIEJlaGF2aW9yKGJlaGF2aW9yKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIGlmIChiZWhhdmlvcikge1xuICAgICAgICAgICAgICAgIHRoaXMucHVzaChiZWhhdmlvcik7IC8vIE5PVEU6IHRoaXMgZW5zdXJlcyBhIGNvcHkgb2YgdGhlIGFycmF5IGlzIG1hZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkcyBhbiBBY3Rpb24gb3Igc2V0IG9mIEFjdGlvbnMgY2FsbGJhY2tzIGluIGEgQmVoYXZpb3IgaW5zdGFuY2UgdG8gdGhpcyBiZWhhdmlvciBpbnN0YW5jZS5cbiAgICAgICAgICogQG1ldGhvZCBwdXNoXG4gICAgICAgICAqIEBwYXJhbSB7QmVoYXZpb3J9IGJlaGF2aW9yIFRoZSBBY3Rpb24gb3Igc2V0IG9mIEFjdGlvbnMgY2FsbGJhY2tzIHRvIGFkZCB0byB0aGlzIGJlaGF2aW9yIGluc3RhbmNlLlxuICAgICAgICAgKiBAcmV0dXJucyB7QmVoYXZpb3J9IFJldHVybnMgdGhpcyBiZWhhdmlvciBpbnN0YW5jZSAoZm9yIHVzZSBpbiBmbHVlbnQgc3R5bGUgZGV2ZWxvcG1lbnQpLlxuICAgICAgICAgKi9cbiAgICAgICAgQmVoYXZpb3IucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoYmVoYXZpb3IpIHtcbiAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHRoaXMuYWN0aW9ucywgYmVoYXZpb3IgaW5zdGFuY2VvZiBCZWhhdmlvciA/IGJlaGF2aW9yLmFjdGlvbnMgOiBhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUZXN0cyB0aGUgQmVoYXZpb3IgaW5zdGFuY2UgdG8gc2VlIGlmIGFueSBhY3Rpb25zIGhhdmUgYmVlbiBkZWZpbmVkLlxuICAgICAgICAgKiBAbWV0aG9kIGhhc0FjdGlvbnNcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlcmUgYXJlIGFjdGlvbnMgZGVmaW5lZCB3aXRoaW4gdGhpcyBCZWhhdmlvciBpbnN0YW5jZS5cbiAgICAgICAgICovXG4gICAgICAgIEJlaGF2aW9yLnByb3RvdHlwZS5oYXNBY3Rpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9ucy5sZW5ndGggIT09IDA7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnZva2VzIGFsbCB0aGUgYWN0aW9uIGNhbGxiYWNrcyBpbiB0aGlzIEJlaGF2aW9yIGluc3RhbmNlLlxuICAgICAgICAgKiBAbWV0aG9kIGludm9rZVxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0aGF0IHRyaWdnZXJlZCB0aGUgdHJhbnNpdGlvbi5cbiAgICAgICAgICogQHBhcmFtIHtJQWN0aXZlU3RhdGVDb25maWd1cmF0aW9ufSBpbnN0YW5jZSBUaGUgc3RhdGUgbWFjaGluZSBpbnN0YW5jZS5cbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBoaXN0b3J5IEludGVybmFsIHVzZSBvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBCZWhhdmlvci5wcm90b3R5cGUuaW52b2tlID0gZnVuY3Rpb24gKG1lc3NhZ2UsIGluc3RhbmNlLCBoaXN0b3J5KSB7XG4gICAgICAgICAgICBpZiAoaGlzdG9yeSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgaGlzdG9yeSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb24obWVzc2FnZSwgaW5zdGFuY2UsIGhpc3RvcnkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBCZWhhdmlvcjtcbiAgICB9KSgpO1xuICAgIFN0YXRlSlMuQmVoYXZpb3IgPSBCZWhhdmlvcjtcbn0pKFN0YXRlSlMgfHwgKFN0YXRlSlMgPSB7fSkpO1xuLypcbiAqIEZpbml0ZSBzdGF0ZSBtYWNoaW5lIGxpYnJhcnlcbiAqIENvcHlyaWdodCAoYykgMjAxNC01IFN0ZWVsYnJlZXplIExpbWl0ZWRcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgYW5kIEdQTCB2MyBsaWNlbmNlc1xuICogaHR0cDovL3d3dy5zdGVlbGJyZWV6ZS5uZXQvc3RhdGUuY3NcbiAqL1xudmFyIFN0YXRlSlM7XG4oZnVuY3Rpb24gKFN0YXRlSlMpIHtcbiAgICAvKipcbiAgICAgKiBBbiBlbnVtZXJhdGlvbiBvZiBzdGF0aWMgY29uc3RhbnRzIHRoYXQgZGljdGF0ZXMgdGhlIHByZWNpc2UgYmVoYXZpb3VyIG9mIHBzZXVkbyBzdGF0ZXMuXG4gICAgICpcbiAgICAgKiBVc2UgdGhlc2UgY29uc3RhbnRzIGFzIHRoZSBga2luZGAgcGFyYW1ldGVyIHdoZW4gY3JlYXRpbmcgbmV3IGBQc2V1ZG9TdGF0ZWAgaW5zdGFuY2VzLlxuICAgICAqIEBjbGFzcyBQc2V1ZG9TdGF0ZUtpbmRcbiAgICAgKi9cbiAgICAoZnVuY3Rpb24gKFBzZXVkb1N0YXRlS2luZCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogVXNlZCBmb3IgcHNldWRvIHN0YXRlcyB0aGF0IGFyZSBhbHdheXMgdGhlIHN0YXJpbmcgcG9pbnQgd2hlbiBlbnRlcmluZyB0aGVpciBwYXJlbnQgcmVnaW9uLlxuICAgICAgICAgKiBAbWVtYmVyIHtQc2V1ZG9TdGF0ZUtpbmR9IEluaXRpYWxcbiAgICAgICAgICovXG4gICAgICAgIFBzZXVkb1N0YXRlS2luZFtQc2V1ZG9TdGF0ZUtpbmRbXCJJbml0aWFsXCJdID0gMF0gPSBcIkluaXRpYWxcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVzZWQgZm9yIHBzZXVkbyBzdGF0ZXMgdGhhdCBhcmUgdGhlIHRoZSBzdGFydGluZyBwb2ludCB3aGVuIGVudGVyaW5nIHRoZWlyIHBhcmVudCByZWdpb24gZm9yIHRoZSBmaXJzdCB0aW1lOyBzdWJzZXF1ZW50IGVudHJpZXMgd2lsbCBzdGFydCBhdCB0aGUgbGFzdCBrbm93biBzdGF0ZS5cbiAgICAgICAgICogQG1lbWJlciB7UHNldWRvU3RhdGVLaW5kfSBTaGFsbG93SGlzdG9yeVxuICAgICAgICAgKi9cbiAgICAgICAgUHNldWRvU3RhdGVLaW5kW1BzZXVkb1N0YXRlS2luZFtcIlNoYWxsb3dIaXN0b3J5XCJdID0gMV0gPSBcIlNoYWxsb3dIaXN0b3J5XCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcyBwZXIgYFNoYWxsb3dIaXN0b3J5YCBidXQgdGhlIGhpc3Rvcnkgc2VtYW50aWMgY2FzY2FkZXMgdGhyb3VnaCBhbGwgY2hpbGQgcmVnaW9ucyBpcnJlc3BlY3RpdmUgb2YgdGhlaXIgaW5pdGlhbCBwc2V1ZG8gc3RhdGUga2luZC5cbiAgICAgICAgICogQG1lbWJlciB7UHNldWRvU3RhdGVLaW5kfSBEZWVwSGlzdG9yeVxuICAgICAgICAgKi9cbiAgICAgICAgUHNldWRvU3RhdGVLaW5kW1BzZXVkb1N0YXRlS2luZFtcIkRlZXBIaXN0b3J5XCJdID0gMl0gPSBcIkRlZXBIaXN0b3J5XCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbmFibGVzIGEgZHluYW1pYyBjb25kaXRpb25hbCBicmFuY2hlczsgd2l0aGluIGEgY29tcG91bmQgdHJhbnNpdGlvbi5cbiAgICAgICAgICogQWxsIG91dGJvdW5kIHRyYW5zaXRpb24gZ3VhcmRzIGZyb20gYSBDaG9pY2UgYXJlIGV2YWx1YXRlZCB1cG9uIGVudGVyaW5nIHRoZSBQc2V1ZG9TdGF0ZTpcbiAgICAgICAgICogaWYgYSBzaW5nbGUgdHJhbnNpdGlvbiBpcyBmb3VuZCwgaXQgd2lsbCBiZSB0cmF2ZXJzZWQ7XG4gICAgICAgICAqIGlmIG1hbnkgdHJhbnNpdGlvbnMgYXJlIGZvdW5kLCBhbiBhcmJpdGFyeSBvbmUgd2lsbCBiZSBzZWxlY3RlZCBhbmQgdHJhdmVyc2VkO1xuICAgICAgICAgKiBpZiBub25lIGV2YWx1YXRlIHRydWUsIGFuZCB0aGVyZSBpcyBubyAnZWxzZSB0cmFuc2l0aW9uJyBkZWZpbmVkLCB0aGUgbWFjaGluZSBpcyBkZWVtZWQgaWxsZm9ybWVkIGFuZCBhbiBleGNlcHRpb24gd2lsbCBiZSB0aHJvd24uXG4gICAgICAgICAqIEBtZW1iZXIge1BzZXVkb1N0YXRlS2luZH0gQ2hvaWNlXG4gICAgICAgICAqL1xuICAgICAgICBQc2V1ZG9TdGF0ZUtpbmRbUHNldWRvU3RhdGVLaW5kW1wiQ2hvaWNlXCJdID0gM10gPSBcIkNob2ljZVwiO1xuICAgICAgICAvKipcbiAgICAgICAgICogRW5hYmxlcyBhIHN0YXRpYyBjb25kaXRpb25hbCBicmFuY2hlczsgd2l0aGluIGEgY29tcG91bmQgdHJhbnNpdGlvbi5cbiAgICAgICAgICogQWxsIG91dGJvdW5kIHRyYW5zaXRpb24gZ3VhcmRzIGZyb20gYSBDaG9pY2UgYXJlIGV2YWx1YXRlZCB1cG9uIGVudGVyaW5nIHRoZSBQc2V1ZG9TdGF0ZTpcbiAgICAgICAgICogaWYgYSBzaW5nbGUgdHJhbnNpdGlvbiBpcyBmb3VuZCwgaXQgd2lsbCBiZSB0cmF2ZXJzZWQ7XG4gICAgICAgICAqIGlmIG1hbnkgb3Igbm9uZSBldmFsdWF0ZSB0cnVlLCBhbmQgdGhlcmUgaXMgbm8gJ2Vsc2UgdHJhbnNpdGlvbicgZGVmaW5lZCwgdGhlIG1hY2hpbmUgaXMgZGVlbWVkIGlsbGZvcm1lZCBhbmQgYW4gZXhjZXB0aW9uIHdpbGwgYmUgdGhyb3duLlxuICAgICAgICAgKiBAbWVtYmVyIHtQc2V1ZG9TdGF0ZUtpbmR9IEp1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBQc2V1ZG9TdGF0ZUtpbmRbUHNldWRvU3RhdGVLaW5kW1wiSnVuY3Rpb25cIl0gPSA0XSA9IFwiSnVuY3Rpb25cIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVudGVyaW5nIGEgdGVybWluYXRlIGBQc2V1ZG9TdGF0ZWAgaW1wbGllcyB0aGF0IHRoZSBleGVjdXRpb24gb2YgdGhpcyBzdGF0ZSBtYWNoaW5lIGJ5IG1lYW5zIG9mIGl0cyBzdGF0ZSBvYmplY3QgaXMgdGVybWluYXRlZC5cbiAgICAgICAgICogQG1lbWJlciB7UHNldWRvU3RhdGVLaW5kfSBUZXJtaW5hdGVcbiAgICAgICAgICovXG4gICAgICAgIFBzZXVkb1N0YXRlS2luZFtQc2V1ZG9TdGF0ZUtpbmRbXCJUZXJtaW5hdGVcIl0gPSA1XSA9IFwiVGVybWluYXRlXCI7XG4gICAgfSkoU3RhdGVKUy5Qc2V1ZG9TdGF0ZUtpbmQgfHwgKFN0YXRlSlMuUHNldWRvU3RhdGVLaW5kID0ge30pKTtcbiAgICB2YXIgUHNldWRvU3RhdGVLaW5kID0gU3RhdGVKUy5Qc2V1ZG9TdGF0ZUtpbmQ7XG59KShTdGF0ZUpTIHx8IChTdGF0ZUpTID0ge30pKTtcbi8qXG4gKiBGaW5pdGUgc3RhdGUgbWFjaGluZSBsaWJyYXJ5XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtNSBTdGVlbGJyZWV6ZSBMaW1pdGVkXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGFuZCBHUEwgdjMgbGljZW5jZXNcbiAqIGh0dHA6Ly93d3cuc3RlZWxicmVlemUubmV0L3N0YXRlLmNzXG4gKi9cbnZhciBTdGF0ZUpTO1xuKGZ1bmN0aW9uIChTdGF0ZUpTKSB7XG4gICAgLyoqXG4gICAgICogQW4gZW51bWVyYXRpb24gb2Ygc3RhdGljIGNvbnN0YW50cyB0aGF0IGRpY3RhdGVzIHRoZSBwcmVjaXNlIGJlaGF2aW91ciBvZiB0cmFuc2l0aW9ucy5cbiAgICAgKlxuICAgICAqIFVzZSB0aGVzZSBjb25zdGFudHMgYXMgdGhlIGBraW5kYCBwYXJhbWV0ZXIgd2hlbiBjcmVhdGluZyBuZXcgYFRyYW5zaXRpb25gIGluc3RhbmNlcy5cbiAgICAgKiBAY2xhc3MgVHJhbnNpdGlvbktpbmRcbiAgICAgKi9cbiAgICAoZnVuY3Rpb24gKFRyYW5zaXRpb25LaW5kKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdHJhbnNpdGlvbiwgaWYgdHJpZ2dlcmVkLCBvY2N1cnMgd2l0aG91dCBleGl0aW5nIG9yIGVudGVyaW5nIHRoZSBzb3VyY2Ugc3RhdGUuXG4gICAgICAgICAqIFRodXMsIGl0IGRvZXMgbm90IGNhdXNlIGEgc3RhdGUgY2hhbmdlLiBUaGlzIG1lYW5zIHRoYXQgdGhlIGVudHJ5IG9yIGV4aXQgY29uZGl0aW9uIG9mIHRoZSBzb3VyY2Ugc3RhdGUgd2lsbCBub3QgYmUgaW52b2tlZC5cbiAgICAgICAgICogQW4gaW50ZXJuYWwgdHJhbnNpdGlvbiBjYW4gYmUgdGFrZW4gZXZlbiBpZiB0aGUgc3RhdGUgbWFjaGluZSBpcyBpbiBvbmUgb3IgbW9yZSByZWdpb25zIG5lc3RlZCB3aXRoaW4gdGhpcyBzdGF0ZS5cbiAgICAgICAgICogQG1lbWJlciB7VHJhbnNpdGlvbktpbmR9IEludGVybmFsXG4gICAgICAgICAqL1xuICAgICAgICBUcmFuc2l0aW9uS2luZFtUcmFuc2l0aW9uS2luZFtcIkludGVybmFsXCJdID0gMF0gPSBcIkludGVybmFsXCI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdHJhbnNpdGlvbiwgaWYgdHJpZ2dlcmVkLCB3aWxsIG5vdCBleGl0IHRoZSBjb21wb3NpdGUgKHNvdXJjZSkgc3RhdGUsIGJ1dCB3aWxsIGVudGVyIHRoZSBub24tYWN0aXZlIHRhcmdldCB2ZXJ0ZXggYW5jZXN0cnkuXG4gICAgICAgICAqIEBtZW1iZXIge1RyYW5zaXRpb25LaW5kfSBMb2NhbFxuICAgICAgICAgKi9cbiAgICAgICAgVHJhbnNpdGlvbktpbmRbVHJhbnNpdGlvbktpbmRbXCJMb2NhbFwiXSA9IDFdID0gXCJMb2NhbFwiO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHRyYW5zaXRpb24sIGlmIHRyaWdnZXJlZCwgd2lsbCBleGl0IHRoZSBzb3VyY2UgdmVydGV4LlxuICAgICAgICAgKiBAbWVtYmVyIHtUcmFuc2l0aW9uS2luZH0gRXh0ZXJuYWxcbiAgICAgICAgICovXG4gICAgICAgIFRyYW5zaXRpb25LaW5kW1RyYW5zaXRpb25LaW5kW1wiRXh0ZXJuYWxcIl0gPSAyXSA9IFwiRXh0ZXJuYWxcIjtcbiAgICB9KShTdGF0ZUpTLlRyYW5zaXRpb25LaW5kIHx8IChTdGF0ZUpTLlRyYW5zaXRpb25LaW5kID0ge30pKTtcbiAgICB2YXIgVHJhbnNpdGlvbktpbmQgPSBTdGF0ZUpTLlRyYW5zaXRpb25LaW5kO1xufSkoU3RhdGVKUyB8fCAoU3RhdGVKUyA9IHt9KSk7XG4vKlxuICogRmluaXRlIHN0YXRlIG1hY2hpbmUgbGlicmFyeVxuICogQ29weXJpZ2h0IChjKSAyMDE0LTUgU3RlZWxicmVlemUgTGltaXRlZFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBhbmQgR1BMIHYzIGxpY2VuY2VzXG4gKiBodHRwOi8vd3d3LnN0ZWVsYnJlZXplLm5ldC9zdGF0ZS5jc1xuICovXG52YXIgU3RhdGVKUztcbihmdW5jdGlvbiAoU3RhdGVKUykge1xuICAgIC8qKlxuICAgICAqIEFuIGFic3RyYWN0IGNsYXNzIHVzZWQgYXMgdGhlIGJhc2UgZm9yIHRoZSBSZWdpb24gYW5kIFZlcnRleCBjbGFzc2VzLlxuICAgICAqIEFuIGVsZW1lbnQgaXMgYSBub2RlIHdpdGhpbiB0aGUgdHJlZSBzdHJ1Y3R1cmUgdGhhdCByZXByZXNlbnRzIGEgY29tcG9zaXRlIHN0YXRlIG1hY2hpbmUgbW9kZWwuXG4gICAgICogQGNsYXNzIEVsZW1lbnRcbiAgICAgKi9cbiAgICB2YXIgRWxlbWVudCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBlbGVtZW50IGNsYXNzLlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIEVsZW1lbnQobmFtZSwgcGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgdGhpcy5xdWFsaWZpZWROYW1lID0gcGFyZW50ID8gcGFyZW50LnF1YWxpZmllZE5hbWUgKyBFbGVtZW50Lm5hbWVzcGFjZVNlcGFyYXRvciArIG5hbWUgOiBuYW1lO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIGEgdGhlIGVsZW1lbnQgbmFtZSBhcyBhIGZ1bGx5IHF1YWxpZmllZCBuYW1lc3BhY2UuXG4gICAgICAgICAqIEBtZXRob2QgdG9TdHJpbmdcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIEVsZW1lbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVhbGlmaWVkTmFtZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBzeW1ib2wgdXNlZCB0byBzZXBhcmF0ZSBlbGVtZW50IG5hbWVzIHdpdGhpbiBhIGZ1bGx5IHF1YWxpZmllZCBuYW1lLlxuICAgICAgICAgKiBDaGFuZ2UgdGhpcyBzdGF0aWMgbWVtYmVyIHRvIGNyZWF0ZSBkaWZmZXJlbnQgc3R5bGVzIG9mIHF1YWxpZmllZCBuYW1lIGdlbmVyYXRlZCBieSB0aGUgdG9TdHJpbmcgbWV0aG9kLlxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBFbGVtZW50Lm5hbWVzcGFjZVNlcGFyYXRvciA9IFwiLlwiO1xuICAgICAgICByZXR1cm4gRWxlbWVudDtcbiAgICB9KSgpO1xuICAgIFN0YXRlSlMuRWxlbWVudCA9IEVsZW1lbnQ7XG59KShTdGF0ZUpTIHx8IChTdGF0ZUpTID0ge30pKTtcbnZhciBfX2V4dGVuZHMgPSB1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fZXh0ZW5kcyB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkge1xuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yID0gZDtcbiAgICB9XG4gICAgX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGU7XG4gICAgZC5wcm90b3R5cGUgPSBuZXcgX18oKTtcbn07XG4vKlxuICogRmluaXRlIHN0YXRlIG1hY2hpbmUgbGlicmFyeVxuICogQ29weXJpZ2h0IChjKSAyMDE0LTUgU3RlZWxicmVlemUgTGltaXRlZFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBhbmQgR1BMIHYzIGxpY2VuY2VzXG4gKiBodHRwOi8vd3d3LnN0ZWVsYnJlZXplLm5ldC9zdGF0ZS5jc1xuICovXG52YXIgU3RhdGVKUztcbihmdW5jdGlvbiAoU3RhdGVKUykge1xuICAgIC8qKlxuICAgICAqIEFuIGVsZW1lbnQgd2l0aGluIGEgc3RhdGUgbWFjaGluZSBtb2RlbCB0aGF0IGlzIGEgY29udGFpbmVyIG9mIFZlcnRpY2VzLlxuICAgICAqXG4gICAgICogUmVnaW9ucyBhcmUgaW1wbGljaXRseSBpbnNlcnRlZCBpbnRvIGNvbXBvc2l0ZSBzdGF0ZSBtYWNoaW5lcyBhcyBhIGNvbnRhaW5lciBmb3IgdmVydGljZXMuXG4gICAgICogVGhleSBvbmx5IG5lZWQgdG8gYmUgZXhwbGljaXRseSBkZWZpbmVkIGlmIG9ydGhvZ29uYWwgc3RhdGVzIGFyZSByZXF1aXJlZC5cbiAgICAgKlxuICAgICAqIFJlZ2lvbiBleHRlbmRzIHRoZSBFbGVtZW50IGNsYXNzIGFuZCBpbmhlcml0cyBpdHMgcHVibGljIGludGVyZmFjZS5cbiAgICAgKiBAY2xhc3MgUmVnaW9uXG4gICAgICogQGF1Z21lbnRzIEVsZW1lbnRcbiAgICAgKi9cbiAgICB2YXIgUmVnaW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKFJlZ2lvbiwgX3N1cGVyKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIFJlZ2lvbiBjbGFzcy5cbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJlZ2lvbi5cbiAgICAgICAgICogQHBhcmFtIHtTdGF0ZX0gc3RhdGUgVGhlIHBhcmVudCBzdGF0ZSB0aGF0IHRoaXMgcmVnaW9uIHdpbGwgYmUgYSBjaGlsZCBvZi5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIFJlZ2lvbihuYW1lLCBzdGF0ZSkge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgbmFtZSwgc3RhdGUpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgc2V0IG9mIHZlcnRpY2VzIHRoYXQgYXJlIGNoaWxkcmVuIG9mIHRoZSByZWdpb24uXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHtBcnJheTxWZXJ0ZXg+fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2VzID0gW107XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnJlZ2lvbnMucHVzaCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZ2V0Um9vdCgpLmNsZWFuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCB3aXRoaW4gdGhlIHN0YXRlIG1hY2hpbmUgbW9kZWwuXG4gICAgICAgICAqIEBtZXRob2QgZ2V0Um9vdFxuICAgICAgICAgKiBAcmV0dXJucyB7U3RhdGVNYWNoaW5lfSBUaGUgcm9vdCBzdGF0ZSBtYWNoaW5lIGVsZW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBSZWdpb24ucHJvdG90eXBlLmdldFJvb3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5nZXRSb290KCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBY2NlcHRzIGFuIGluc3RhbmNlIG9mIGEgdmlzaXRvciBhbmQgY2FsbHMgdGhlIHZpc2l0UmVnaW9uIG1ldGhvZCBvbiBpdC5cbiAgICAgICAgICogQG1ldGhvZCBhY2NlcHRcbiAgICAgICAgICogQHBhcmFtIHtWaXNpdG9yPFRBcmcxPn0gdmlzaXRvciBUaGUgdmlzaXRvciBpbnN0YW5jZS5cbiAgICAgICAgICogQHBhcmFtIHtUQXJnMX0gYXJnMSBBbiBvcHRpb25hbCBhcmd1bWVudCB0byBwYXNzIGludG8gdGhlIHZpc2l0b3IuXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBhcmcyIEFuIG9wdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgaW50byB0aGUgdmlzaXRvci5cbiAgICAgICAgICogQHBhcmFtIHthbnl9IGFyZzMgQW4gb3B0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyBpbnRvIHRoZSB2aXNpdG9yLlxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fSBBbnkgdmFsdWUgY2FuIGJlIHJldHVybmVkIGJ5IHRoZSB2aXNpdG9yLlxuICAgICAgICAgKi9cbiAgICAgICAgUmVnaW9uLnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbiAodmlzaXRvciwgYXJnMSwgYXJnMiwgYXJnMykge1xuICAgICAgICAgICAgcmV0dXJuIHZpc2l0b3IudmlzaXRSZWdpb24odGhpcywgYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbmFtZSBnaXZlbiB0byByZWdpb25zIHRoYXQgYXJlIGFyZSBjcmVhdGVkIGF1dG9tYXRpY2FsbHkgd2hlbiBhIHN0YXRlIGlzIHBhc3NlZCBhcyBhIHZlcnRleCdzIHBhcmVudC5cbiAgICAgICAgICogUmVnaW9ucyBhcmUgYXV0b21hdGljYWxseSBpbnNlcnRlZCBpbnRvIHN0YXRlIG1hY2hpbmUgbW9kZWxzIGFzIHRoZSBjb21wb3NpdGUgc3RydWN0dXJlIGlzIGJ1aWx0OyB0aGV5IGFyZSBuYW1lZCB1c2luZyB0aGlzIHN0YXRpYyBtZW1iZXIuXG4gICAgICAgICAqIFVwZGF0ZSB0aGlzIHN0YXRpYyBtZW1iZXIgdG8gdXNlIGEgZGlmZmVyZW50IG5hbWUgZm9yIGRlZmF1bHQgcmVnaW9ucy5cbiAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgUmVnaW9uLmRlZmF1bHROYW1lID0gXCJkZWZhdWx0XCI7XG4gICAgICAgIHJldHVybiBSZWdpb247XG4gICAgfSkoU3RhdGVKUy5FbGVtZW50KTtcbiAgICBTdGF0ZUpTLlJlZ2lvbiA9IFJlZ2lvbjtcbn0pKFN0YXRlSlMgfHwgKFN0YXRlSlMgPSB7fSkpO1xuLypcbiAqIEZpbml0ZSBzdGF0ZSBtYWNoaW5lIGxpYnJhcnlcbiAqIENvcHlyaWdodCAoYykgMjAxNC01IFN0ZWVsYnJlZXplIExpbWl0ZWRcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgYW5kIEdQTCB2MyBsaWNlbmNlc1xuICogaHR0cDovL3d3dy5zdGVlbGJyZWV6ZS5uZXQvc3RhdGUuY3NcbiAqL1xudmFyIFN0YXRlSlM7XG4oZnVuY3Rpb24gKFN0YXRlSlMpIHtcbiAgICAvKipcbiAgICAgKiBBbiBhYnN0cmFjdCBlbGVtZW50IHdpdGhpbiBhIHN0YXRlIG1hY2hpbmUgbW9kZWwgdGhhdCBjYW4gYmUgdGhlIHNvdXJjZSBvciB0YXJnZXQgb2YgYSB0cmFuc2l0aW9uIChzdGF0ZXMgYW5kIHBzZXVkbyBzdGF0ZXMpLlxuICAgICAqXG4gICAgICogVmVydGV4IGV4dGVuZHMgdGhlIEVsZW1lbnQgY2xhc3MgYW5kIGluaGVyaXRzIGl0cyBwdWJsaWMgaW50ZXJmYWNlLlxuICAgICAqIEBjbGFzcyBWZXJ0ZXhcbiAgICAgKiBAYXVnbWVudHMgRWxlbWVudFxuICAgICAqL1xuICAgIHZhciBWZXJ0ZXggPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoVmVydGV4LCBfc3VwZXIpO1xuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgVmVydGV4IGNsYXNzLlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgdmVydGV4LlxuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHBhcmVudCBUaGUgcGFyZW50IHJlZ2lvbiBvciBzdGF0ZS5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIFZlcnRleChuYW1lLCBwYXJlbnQpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIG5hbWUsIHBhcmVudCA9IHBhcmVudCBpbnN0YW5jZW9mIFN0YXRlSlMuU3RhdGUgPyBwYXJlbnQuZGVmYXVsdFJlZ2lvbigpIDogcGFyZW50KTsgLy8gVE9ETzogZmluZCBhIGNsZWFuZXIgd2F5IHRvIG1hbmFnZSBpbXBsaWNpdCBjb252ZXJzaW9uXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSBzZXQgb2YgdHJhbnNpdGlvbnMgZnJvbSB0aGlzIHZlcnRleC5cbiAgICAgICAgICAgICAqIEBtZW1iZXIge0FycmF5PFRyYW5zaXRpb24+fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLm91dGdvaW5nID0gW107XG4gICAgICAgICAgICB0aGlzLnJlZ2lvbiA9IHBhcmVudDsgLy8gTk9URTogcGFyZW50IHdpbGwgYmUgYSBSZWdpb24gZHVlIHRvIHRoZSBjb25kaXRpb25hbCBsb2dpYyBpbiB0aGUgc3VwZXIgY2FsbCBhYm92ZVxuICAgICAgICAgICAgaWYgKHRoaXMucmVnaW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpb24udmVydGljZXMucHVzaCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lvbi5nZXRSb290KCkuY2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IHdpdGhpbiB0aGUgc3RhdGUgbWFjaGluZSBtb2RlbC5cbiAgICAgICAgICogQG1ldGhvZCBnZXRSb290XG4gICAgICAgICAqIEByZXR1cm5zIHtTdGF0ZU1hY2hpbmV9IFRoZSByb290IHN0YXRlIG1hY2hpbmUgZWxlbWVudC5cbiAgICAgICAgICovXG4gICAgICAgIFZlcnRleC5wcm90b3R5cGUuZ2V0Um9vdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZ2lvbi5nZXRSb290KCk7IC8vIE5PVEU6IG5lZWQgdG8ga2VlcCB0aGlzIGR5bmFtaWMgYXMgYSBzdGF0ZSBtYWNoaW5lIG1heSBiZSBlbWJlZGRlZCB3aXRoaW4gYW5vdGhlclxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhIG5ldyB0cmFuc2l0aW9uIGZyb20gdGhpcyB2ZXJ0ZXguXG4gICAgICAgICAqIE5ld2x5IGNyZWF0ZWQgdHJhbnNpdGlvbnMgYXJlIGNvbXBsZXRpb24gdHJhbnNpdGlvbnM7IHRoZXkgd2lsbCBiZSBldmFsdWF0ZWQgYWZ0ZXIgYSB2ZXJ0ZXggaGFzIGJlZW4gZW50ZXJlZCBpZiBpdCBpcyBkZWVtZWQgdG8gYmUgY29tcGxldGUuXG4gICAgICAgICAqIFRyYW5zaXRpb25zIGNhbiBiZSBjb252ZXJ0ZWQgdG8gYmUgZXZlbnQgdHJpZ2dlcmVkIGJ5IGFkZGluZyBhIGd1YXJkIGNvbmRpdGlvbiB2aWEgdGhlIHRyYW5zaXRpb25zIGB3aGVyZWAgbWV0aG9kLlxuICAgICAgICAgKiBAbWV0aG9kIHRvXG4gICAgICAgICAqIEBwYXJhbSB7VmVydGV4fSB0YXJnZXQgVGhlIGRlc3RpbmF0aW9uIG9mIHRoZSB0cmFuc2l0aW9uOyBvbWl0IGZvciBpbnRlcm5hbCB0cmFuc2l0aW9ucy5cbiAgICAgICAgICogQHBhcmFtIHtUcmFuc2l0aW9uS2luZH0ga2luZCBUaGUga2luZCB0aGUgdHJhbnNpdGlvbjsgdXNlIHRoaXMgdG8gc2V0IExvY2FsIG9yIEV4dGVybmFsICh0aGUgZGVmYXVsdCBpZiBvbWl0dGVkKSB0cmFuc2l0aW9uIHNlbWFudGljcy5cbiAgICAgICAgICogQHJldHVybnMge1RyYW5zaXRpb259IFRoZSBuZXcgdHJhbnNpdGlvbiBvYmplY3QuXG4gICAgICAgICAqL1xuICAgICAgICBWZXJ0ZXgucHJvdG90eXBlLnRvID0gZnVuY3Rpb24gKHRhcmdldCwga2luZCkge1xuICAgICAgICAgICAgaWYgKGtpbmQgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIGtpbmQgPSBTdGF0ZUpTLlRyYW5zaXRpb25LaW5kLkV4dGVybmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTdGF0ZUpTLlRyYW5zaXRpb24odGhpcywgdGFyZ2V0LCBraW5kKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFjY2VwdHMgYW4gaW5zdGFuY2Ugb2YgYSB2aXNpdG9yLlxuICAgICAgICAgKiBAbWV0aG9kIGFjY2VwdFxuICAgICAgICAgKiBAcGFyYW0ge1Zpc2l0b3I8VEFyZz59IHZpc2l0b3IgVGhlIHZpc2l0b3IgaW5zdGFuY2UuXG4gICAgICAgICAqIEBwYXJhbSB7VEFyZ30gYXJnIEFuIG9wdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgaW50byB0aGUgdmlzaXRvci5cbiAgICAgICAgICogQHJldHVybnMge2FueX0gQW55IHZhbHVlIGNhbiBiZSByZXR1cm5lZCBieSB0aGUgdmlzaXRvci5cbiAgICAgICAgICovXG4gICAgICAgIFZlcnRleC5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24gKHZpc2l0b3IsIGFyZzEsIGFyZzIsIGFyZzMpIHt9O1xuICAgICAgICByZXR1cm4gVmVydGV4O1xuICAgIH0pKFN0YXRlSlMuRWxlbWVudCk7XG4gICAgU3RhdGVKUy5WZXJ0ZXggPSBWZXJ0ZXg7XG59KShTdGF0ZUpTIHx8IChTdGF0ZUpTID0ge30pKTtcbi8qXG4gKiBGaW5pdGUgc3RhdGUgbWFjaGluZSBsaWJyYXJ5XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtNSBTdGVlbGJyZWV6ZSBMaW1pdGVkXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGFuZCBHUEwgdjMgbGljZW5jZXNcbiAqIGh0dHA6Ly93d3cuc3RlZWxicmVlemUubmV0L3N0YXRlLmNzXG4gKi9cbnZhciBTdGF0ZUpTO1xuKGZ1bmN0aW9uIChTdGF0ZUpTKSB7XG4gICAgLyoqXG4gICAgICogQW4gZWxlbWVudCB3aXRoaW4gYSBzdGF0ZSBtYWNoaW5lIG1vZGVsIHRoYXQgcmVwcmVzZW50cyBhbiB0cmFuc2l0b3J5IFZlcnRleCB3aXRoaW4gdGhlIHN0YXRlIG1hY2hpbmUgbW9kZWwuXG4gICAgICpcbiAgICAgKiBQc2V1ZG8gc3RhdGVzIGFyZSByZXF1aXJlZCBpbiBhbGwgc3RhdGUgbWFjaGluZSBtb2RlbHM7IGF0IHRoZSB2ZXJ5IGxlYXN0LCBhbiBgSW5pdGlhbGAgcHNldWRvIHN0YXRlIGlzIHRoZSBkZWZhdWx0IHN0YXRpbmcgc3RhdGUgd2hlbiB0aGUgcGFyZW50IHJlZ2lvbiBpcyBlbnRlcmVkLlxuICAgICAqIE90aGVyIHR5cGVzIG9mIHBzZXVkbyBzdGF0ZSBhcmUgYXZhaWxhYmxlOyB0eXBpY2FsbHkgZm9yIGRlZmluaW5nIGhpc3Rvcnkgc2VtYW50aWNzIG9yIHRvIGZhY2lsaXRhdGUgbW9yZSBjb21wbGV4IHRyYW5zaXRpb25zLlxuICAgICAqIEEgYFRlcm1pbmF0ZWAgcHNldWRvIHN0YXRlIGtpbmQgaXMgYWxzbyBhdmFpbGFibGUgdG8gaW1tZWRpYXRlbHkgdGVybWluYXRlIHByb2Nlc3Npbmcgd2l0aGluIHRoZSBlbnRpcmUgc3RhdGUgbWFjaGluZSBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIFBzZXVkb1N0YXRlIGV4dGVuZHMgdGhlIFZlcnRleCBjbGFzcyBhbmQgaW5oZXJpdHMgaXRzIHB1YmxpYyBpbnRlcmZhY2UuXG4gICAgICogQGNsYXNzIFBzZXVkb1N0YXRlXG4gICAgICogQGF1Z21lbnRzIFZlcnRleFxuICAgICAqL1xuICAgIHZhciBQc2V1ZG9TdGF0ZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhQc2V1ZG9TdGF0ZSwgX3N1cGVyKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIFBzZXVkb1N0YXRlIGNsYXNzLlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcHNldWRvIHN0YXRlLlxuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHBhcmVudCBUaGUgcGFyZW50IGVsZW1lbnQgdGhhdCB0aGlzIHBzZXVkbyBzdGF0ZSB3aWxsIGJlIGEgY2hpbGQgb2YuXG4gICAgICAgICAqIEBwYXJhbSB7UHNldWRvU3RhdGVLaW5kfSBraW5kIERldGVybWluZXMgdGhlIGJlaGF2aW91ciBvZiB0aGUgUHNldWRvU3RhdGUuXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBQc2V1ZG9TdGF0ZShuYW1lLCBwYXJlbnQsIGtpbmQpIHtcbiAgICAgICAgICAgIGlmIChraW5kID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICBraW5kID0gU3RhdGVKUy5Qc2V1ZG9TdGF0ZUtpbmQuSW5pdGlhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIG5hbWUsIHBhcmVudCk7XG4gICAgICAgICAgICB0aGlzLmtpbmQgPSBraW5kO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUZXN0cyBhIHBzZXVkbyBzdGF0ZSB0byBkZXRlcm1pbmUgaWYgaXQgaXMgYSBoaXN0b3J5IHBzZXVkbyBzdGF0ZS5cbiAgICAgICAgICogSGlzdG9yeSBwc2V1ZG8gc3RhdGVzIGFyZSBvZiBraW5kOiBJbml0aWFsLCBTaGFsbG93SGlzb3J5LCBvciBEZWVwSGlzdG9yeS5cbiAgICAgICAgICogQG1ldGhvZCBpc0hpc3RvcnlcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHBzZXVkbyBzdGF0ZSBpcyBhIGhpc3RvcnkgcHNldWRvIHN0YXRlLlxuICAgICAgICAgKi9cbiAgICAgICAgUHNldWRvU3RhdGUucHJvdG90eXBlLmlzSGlzdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmtpbmQgPT09IFN0YXRlSlMuUHNldWRvU3RhdGVLaW5kLkRlZXBIaXN0b3J5IHx8IHRoaXMua2luZCA9PT0gU3RhdGVKUy5Qc2V1ZG9TdGF0ZUtpbmQuU2hhbGxvd0hpc3Rvcnk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUZXN0cyBhIHBzZXVkbyBzdGF0ZSB0byBkZXRlcm1pbmUgaWYgaXQgaXMgYW4gaW5pdGlhbCBwc2V1ZG8gc3RhdGUuXG4gICAgICAgICAqIEluaXRpYWwgcHNldWRvIHN0YXRlcyBhcmUgb2Yga2luZDogSW5pdGlhbCwgU2hhbGxvd0hpc29yeSwgb3IgRGVlcEhpc3RvcnkuXG4gICAgICAgICAqIEBtZXRob2QgaXNJbml0aWFsXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwc2V1ZG8gc3RhdGUgaXMgYW4gaW5pdGlhbCBwc2V1ZG8gc3RhdGUuXG4gICAgICAgICAqL1xuICAgICAgICBQc2V1ZG9TdGF0ZS5wcm90b3R5cGUuaXNJbml0aWFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMua2luZCA9PT0gU3RhdGVKUy5Qc2V1ZG9TdGF0ZUtpbmQuSW5pdGlhbCB8fCB0aGlzLmlzSGlzdG9yeSgpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQWNjZXB0cyBhbiBpbnN0YW5jZSBvZiBhIHZpc2l0b3IgYW5kIGNhbGxzIHRoZSB2aXNpdFBzZXVkb1N0YXRlIG1ldGhvZCBvbiBpdC5cbiAgICAgICAgICogQG1ldGhvZCBhY2NlcHRcbiAgICAgICAgICogQHBhcmFtIHtWaXNpdG9yPFRBcmcxPn0gdmlzaXRvciBUaGUgdmlzaXRvciBpbnN0YW5jZS5cbiAgICAgICAgICogQHBhcmFtIHtUQXJnMX0gYXJnMSBBbiBvcHRpb25hbCBhcmd1bWVudCB0byBwYXNzIGludG8gdGhlIHZpc2l0b3IuXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBhcmcyIEFuIG9wdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgaW50byB0aGUgdmlzaXRvci5cbiAgICAgICAgICogQHBhcmFtIHthbnl9IGFyZzMgQW4gb3B0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyBpbnRvIHRoZSB2aXNpdG9yLlxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fSBBbnkgdmFsdWUgY2FuIGJlIHJldHVybmVkIGJ5IHRoZSB2aXNpdG9yLlxuICAgICAgICAgKi9cbiAgICAgICAgUHNldWRvU3RhdGUucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uICh2aXNpdG9yLCBhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgICAgICByZXR1cm4gdmlzaXRvci52aXNpdFBzZXVkb1N0YXRlKHRoaXMsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gUHNldWRvU3RhdGU7XG4gICAgfSkoU3RhdGVKUy5WZXJ0ZXgpO1xuICAgIFN0YXRlSlMuUHNldWRvU3RhdGUgPSBQc2V1ZG9TdGF0ZTtcbn0pKFN0YXRlSlMgfHwgKFN0YXRlSlMgPSB7fSkpO1xuLypcbiAqIEZpbml0ZSBzdGF0ZSBtYWNoaW5lIGxpYnJhcnlcbiAqIENvcHlyaWdodCAoYykgMjAxNC01IFN0ZWVsYnJlZXplIExpbWl0ZWRcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgYW5kIEdQTCB2MyBsaWNlbmNlc1xuICogaHR0cDovL3d3dy5zdGVlbGJyZWV6ZS5uZXQvc3RhdGUuY3NcbiAqL1xudmFyIFN0YXRlSlM7XG4oZnVuY3Rpb24gKFN0YXRlSlMpIHtcbiAgICAvKipcbiAgICAgKiBBbiBlbGVtZW50IHdpdGhpbiBhIHN0YXRlIG1hY2hpbmUgbW9kZWwgdGhhdCByZXByZXNlbnRzIGFuIGludmFyaWFudCBjb25kaXRpb24gd2l0aGluIHRoZSBsaWZlIG9mIHRoZSBzdGF0ZSBtYWNoaW5lIGluc3RhbmNlLlxuICAgICAqXG4gICAgICogU3RhdGVzIGFyZSBvbmUgb2YgdGhlIGZ1bmRhbWVudGFsIGJ1aWxkaW5nIGJsb2NrcyBvZiB0aGUgc3RhdGUgbWFjaGluZSBtb2RlbC5cbiAgICAgKiBCZWhhdmlvdXIgY2FuIGJlIGRlZmluZWQgZm9yIGJvdGggc3RhdGUgZW50cnkgYW5kIHN0YXRlIGV4aXQuXG4gICAgICpcbiAgICAgKiBTdGF0ZSBleHRlbmRzIHRoZSBWZXJ0ZXggY2xhc3MgYW5kIGluaGVyaXRzIGl0cyBwdWJsaWMgaW50ZXJmYWNlLlxuICAgICAqIEBjbGFzcyBTdGF0ZVxuICAgICAqIEBhdWdtZW50cyBWZXJ0ZXhcbiAgICAgKi9cbiAgICB2YXIgU3RhdGUgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoU3RhdGUsIF9zdXBlcik7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBTdGF0ZSBjbGFzcy5cbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIHN0YXRlLlxuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHBhcmVudCBUaGUgcGFyZW50IHN0YXRlIHRoYXQgb3ducyB0aGUgc3RhdGUuXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBTdGF0ZShuYW1lLCBwYXJlbnQpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIG5hbWUsIHBhcmVudCk7XG4gICAgICAgICAgICAvLyB1c2VyIGRlZmluZWQgYmVoYXZpb3VyICh2aWEgZXhpdCBtZXRob2QpIHRvIGV4ZWN1dGUgd2hlbiBleGl0aW5nIGEgc3RhdGUuXG4gICAgICAgICAgICB0aGlzLmV4aXRCZWhhdmlvciA9IG5ldyBTdGF0ZUpTLkJlaGF2aW9yKCk7XG4gICAgICAgICAgICAvLyB1c2VyIGRlZmluZWQgYmVoYXZpb3VyICh2aWEgZW50cnkgbWV0aG9kKSB0byBleGVjdXRlIHdoZW4gZW50ZXJpbmcgYSBzdGF0ZS5cbiAgICAgICAgICAgIHRoaXMuZW50cnlCZWhhdmlvciA9IG5ldyBTdGF0ZUpTLkJlaGF2aW9yKCk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSBzZXQgb2YgcmVnaW9ucyB1bmRlciB0aGlzIHN0YXRlLlxuICAgICAgICAgICAgICogQG1lbWJlciB7QXJyYXk8UmVnaW9uPn1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5yZWdpb25zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIGRlZmF1bHQgcmVnaW9uIGZvciB0aGUgc3RhdGUuXG4gICAgICAgICAqIE5vdGUsIHRoaXMgd2lsbCBjcmVhdGUgdGhlIGRlZmF1bHQgcmVnaW9uIGlmIGl0IGRvZXMgbm90IGFscmVhZHkgZXhpc3QuXG4gICAgICAgICAqIEBtZXRob2QgZGVmYXVsdFJlZ2lvblxuICAgICAgICAgKiBAcmV0dXJucyB7UmVnaW9ufSBUaGUgZGVmYXVsdCByZWdpb24uXG4gICAgICAgICAqL1xuICAgICAgICBTdGF0ZS5wcm90b3R5cGUuZGVmYXVsdFJlZ2lvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZ2lvbnMucmVkdWNlKGZ1bmN0aW9uIChyZXN1bHQsIHJlZ2lvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWdpb24ubmFtZSA9PT0gU3RhdGVKUy5SZWdpb24uZGVmYXVsdE5hbWUgPyByZWdpb24gOiByZXN1bHQ7XG4gICAgICAgICAgICB9LCB1bmRlZmluZWQpIHx8IG5ldyBTdGF0ZUpTLlJlZ2lvbihTdGF0ZUpTLlJlZ2lvbi5kZWZhdWx0TmFtZSwgdGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUZXN0cyB0aGUgc3RhdGUgdG8gc2VlIGlmIGl0IGlzIGEgZmluYWwgc3RhdGU7XG4gICAgICAgICAqIGEgZmluYWwgc3RhdGUgaXMgb25lIHRoYXQgaGFzIG5vIG91dGJvdW5kIHRyYW5zaXRpb25zLlxuICAgICAgICAgKiBAbWV0aG9kIGlzRmluYWxcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHN0YXRlIGlzIGEgZmluYWwgc3RhdGUuXG4gICAgICAgICAqL1xuICAgICAgICBTdGF0ZS5wcm90b3R5cGUuaXNGaW5hbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm91dGdvaW5nLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRlc3RzIHRoZSBzdGF0ZSB0byBzZWUgaWYgaXQgaXMgYSBzaW1wbGUgc3RhdGU7XG4gICAgICAgICAqIGEgc2ltcGxlIHN0YXRlIGlzIG9uZSB0aGF0IGhhcyBubyBjaGlsZCByZWdpb25zLlxuICAgICAgICAgKiBAbWV0aG9kIGlzU2ltcGxlXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzdGF0ZSBpcyBhIHNpbXBsZSBzdGF0ZS5cbiAgICAgICAgICovXG4gICAgICAgIFN0YXRlLnByb3RvdHlwZS5pc1NpbXBsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZ2lvbnMubGVuZ3RoID09PSAwO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogVGVzdHMgdGhlIHN0YXRlIHRvIHNlZSBpZiBpdCBpcyBhIGNvbXBvc2l0ZSBzdGF0ZTtcbiAgICAgICAgICogYSBjb21wb3NpdGUgc3RhdGUgaXMgb25lIHRoYXQgaGFzIG9uZSBvciBtb3JlIGNoaWxkIHJlZ2lvbnMuXG4gICAgICAgICAqIEBtZXRob2QgaXNDb21wb3NpdGVcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHN0YXRlIGlzIGEgY29tcG9zaXRlIHN0YXRlLlxuICAgICAgICAgKi9cbiAgICAgICAgU3RhdGUucHJvdG90eXBlLmlzQ29tcG9zaXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVnaW9ucy5sZW5ndGggPiAwO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogVGVzdHMgdGhlIHN0YXRlIHRvIHNlZSBpZiBpdCBpcyBhbiBvcnRob2dvbmFsIHN0YXRlO1xuICAgICAgICAgKiBhbiBvcnRob2dvbmFsIHN0YXRlIGlzIG9uZSB0aGF0IGhhcyB0d28gb3IgbW9yZSBjaGlsZCByZWdpb25zLlxuICAgICAgICAgKiBAbWV0aG9kIGlzT3J0aG9nb25hbFxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3RhdGUgaXMgYW4gb3J0aG9nb25hbCBzdGF0ZS5cbiAgICAgICAgICovXG4gICAgICAgIFN0YXRlLnByb3RvdHlwZS5pc09ydGhvZ29uYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWdpb25zLmxlbmd0aCA+IDE7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGRzIGJlaGF2aW91ciB0byBhIHN0YXRlIHRoYXQgaXMgZXhlY3V0ZWQgZWFjaCB0aW1lIHRoZSBzdGF0ZSBpcyBleGl0ZWQuXG4gICAgICAgICAqIEBtZXRob2QgZXhpdFxuICAgICAgICAgKiBAcGFyYW0ge0FjdGlvbn0gZXhpdEFjdGlvbiBUaGUgYWN0aW9uIHRvIGFkZCB0byB0aGUgc3RhdGUncyBleGl0IGJlaGF2aW91ci5cbiAgICAgICAgICogQHJldHVybnMge1N0YXRlfSBSZXR1cm5zIHRoZSBzdGF0ZSB0byBhbGxvdyBhIGZsdWVudCBzdHlsZSBBUEkuXG4gICAgICAgICAqL1xuICAgICAgICBTdGF0ZS5wcm90b3R5cGUuZXhpdCA9IGZ1bmN0aW9uIChleGl0QWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmV4aXRCZWhhdmlvci5wdXNoKGV4aXRBY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5nZXRSb290KCkuY2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQWRkcyBiZWhhdmlvdXIgdG8gYSBzdGF0ZSB0aGF0IGlzIGV4ZWN1dGVkIGVhY2ggdGltZSB0aGUgc3RhdGUgaXMgZW50ZXJlZC5cbiAgICAgICAgICogQG1ldGhvZCBlbnRyeVxuICAgICAgICAgKiBAcGFyYW0ge0FjdGlvbn0gZW50cnlBY3Rpb24gVGhlIGFjdGlvbiB0byBhZGQgdG8gdGhlIHN0YXRlJ3MgZW50cnkgYmVoYXZpb3VyLlxuICAgICAgICAgKiBAcmV0dXJucyB7U3RhdGV9IFJldHVybnMgdGhlIHN0YXRlIHRvIGFsbG93IGEgZmx1ZW50IHN0eWxlIEFQSS5cbiAgICAgICAgICovXG4gICAgICAgIFN0YXRlLnByb3RvdHlwZS5lbnRyeSA9IGZ1bmN0aW9uIChlbnRyeUFjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5lbnRyeUJlaGF2aW9yLnB1c2goZW50cnlBY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5nZXRSb290KCkuY2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQWNjZXB0cyBhbiBpbnN0YW5jZSBvZiBhIHZpc2l0b3IgYW5kIGNhbGxzIHRoZSB2aXNpdFN0YXRlIG1ldGhvZCBvbiBpdC5cbiAgICAgICAgICogQG1ldGhvZCBhY2NlcHRcbiAgICAgICAgICogQHBhcmFtIHtWaXNpdG9yPFRBcmcxPn0gdmlzaXRvciBUaGUgdmlzaXRvciBpbnN0YW5jZS5cbiAgICAgICAgICogQHBhcmFtIHtUQXJnMX0gYXJnMSBBbiBvcHRpb25hbCBhcmd1bWVudCB0byBwYXNzIGludG8gdGhlIHZpc2l0b3IuXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBhcmcyIEFuIG9wdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgaW50byB0aGUgdmlzaXRvci5cbiAgICAgICAgICogQHBhcmFtIHthbnl9IGFyZzMgQW4gb3B0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyBpbnRvIHRoZSB2aXNpdG9yLlxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fSBBbnkgdmFsdWUgY2FuIGJlIHJldHVybmVkIGJ5IHRoZSB2aXNpdG9yLlxuICAgICAgICAgKi9cbiAgICAgICAgU3RhdGUucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uICh2aXNpdG9yLCBhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgICAgICByZXR1cm4gdmlzaXRvci52aXNpdFN0YXRlKHRoaXMsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gU3RhdGU7XG4gICAgfSkoU3RhdGVKUy5WZXJ0ZXgpO1xuICAgIFN0YXRlSlMuU3RhdGUgPSBTdGF0ZTtcbn0pKFN0YXRlSlMgfHwgKFN0YXRlSlMgPSB7fSkpO1xuLypcbiAqIEZpbml0ZSBzdGF0ZSBtYWNoaW5lIGxpYnJhcnlcbiAqIENvcHlyaWdodCAoYykgMjAxNC01IFN0ZWVsYnJlZXplIExpbWl0ZWRcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgYW5kIEdQTCB2MyBsaWNlbmNlc1xuICogaHR0cDovL3d3dy5zdGVlbGJyZWV6ZS5uZXQvc3RhdGUuY3NcbiAqL1xudmFyIFN0YXRlSlM7XG4oZnVuY3Rpb24gKFN0YXRlSlMpIHtcbiAgICAvKipcbiAgICAgKiBBbiBlbGVtZW50IHdpdGhpbiBhIHN0YXRlIG1hY2hpbmUgbW9kZWwgdGhhdCByZXByZXNlbnRzIGNvbXBsZXRpb24gb2YgdGhlIGxpZmUgb2YgdGhlIGNvbnRhaW5pbmcgUmVnaW9uIHdpdGhpbiB0aGUgc3RhdGUgbWFjaGluZSBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEEgZmluYWwgc3RhdGUgY2Fubm90IGhhdmUgb3V0Ym91bmQgdHJhbnNpdGlvbnMuXG4gICAgICpcbiAgICAgKiBGaW5hbFN0YXRlIGV4dGVuZHMgdGhlIFN0YXRlIGNsYXNzIGFuZCBpbmhlcml0cyBpdHMgcHVibGljIGludGVyZmFjZS5cbiAgICAgKiBAY2xhc3MgRmluYWxTdGF0ZVxuICAgICAqIEBhdWdtZW50cyBTdGF0ZVxuICAgICAqL1xuICAgIHZhciBGaW5hbFN0YXRlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKEZpbmFsU3RhdGUsIF9zdXBlcik7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBGaW5hbFN0YXRlIGNsYXNzLlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZmluYWwgc3RhdGUuXG4gICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gcGFyZW50IFRoZSBwYXJlbnQgZWxlbWVudCB0aGF0IG93bnMgdGhlIGZpbmFsIHN0YXRlLlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gRmluYWxTdGF0ZShuYW1lLCBwYXJlbnQpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIG5hbWUsIHBhcmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFjY2VwdHMgYW4gaW5zdGFuY2Ugb2YgYSB2aXNpdG9yIGFuZCBjYWxscyB0aGUgdmlzaXRGaW5hbFN0YXRlIG1ldGhvZCBvbiBpdC5cbiAgICAgICAgICogQG1ldGhvZCBhY2NlcHRcbiAgICAgICAgICogQHBhcmFtIHtWaXNpdG9yPFRBcmc+fSB2aXNpdG9yIFRoZSB2aXNpdG9yIGluc3RhbmNlLlxuICAgICAgICAgKiBAcGFyYW0ge1RBcmd9IGFyZyBBbiBvcHRpb25hbCBhcmd1bWVudCB0byBwYXNzIGludG8gdGhlIHZpc2l0b3IuXG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9IEFueSB2YWx1ZSBjYW4gYmUgcmV0dXJuZWQgYnkgdGhlIHZpc2l0b3IuXG4gICAgICAgICAqL1xuICAgICAgICBGaW5hbFN0YXRlLnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbiAodmlzaXRvciwgYXJnMSwgYXJnMiwgYXJnMykge1xuICAgICAgICAgICAgcmV0dXJuIHZpc2l0b3IudmlzaXRGaW5hbFN0YXRlKHRoaXMsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRmluYWxTdGF0ZTtcbiAgICB9KShTdGF0ZUpTLlN0YXRlKTtcbiAgICBTdGF0ZUpTLkZpbmFsU3RhdGUgPSBGaW5hbFN0YXRlO1xufSkoU3RhdGVKUyB8fCAoU3RhdGVKUyA9IHt9KSk7XG4vKlxuICogRmluaXRlIHN0YXRlIG1hY2hpbmUgbGlicmFyeVxuICogQ29weXJpZ2h0IChjKSAyMDE0LTUgU3RlZWxicmVlemUgTGltaXRlZFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBhbmQgR1BMIHYzIGxpY2VuY2VzXG4gKiBodHRwOi8vd3d3LnN0ZWVsYnJlZXplLm5ldC9zdGF0ZS5jc1xuICovXG52YXIgU3RhdGVKUztcbihmdW5jdGlvbiAoU3RhdGVKUykge1xuICAgIC8qKlxuICAgICAqIEFuIGVsZW1lbnQgd2l0aGluIGEgc3RhdGUgbWFjaGluZSBtb2RlbCB0aGF0IHJlcHJlc2VudHMgdGhlIHJvb3Qgb2YgdGhlIHN0YXRlIG1hY2hpbmUgbW9kZWwuXG4gICAgICpcbiAgICAgKiBTdGF0ZU1hY2hpbmUgZXh0ZW5kcyB0aGUgU3RhdGUgY2xhc3MgYW5kIGluaGVyaXRzIGl0cyBwdWJsaWMgaW50ZXJmYWNlLlxuICAgICAqIEBjbGFzcyBTdGF0ZU1hY2hpbmVcbiAgICAgKiBAYXVnbWVudHMgU3RhdGVcbiAgICAgKi9cbiAgICB2YXIgU3RhdGVNYWNoaW5lID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKFN0YXRlTWFjaGluZSwgX3N1cGVyKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIFN0YXRlTWFjaGluZSBjbGFzcy5cbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIHN0YXRlIG1hY2hpbmUuXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBTdGF0ZU1hY2hpbmUobmFtZSkge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgbmFtZSwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIC8vIGZsYWcgdXNlZCB0byBpbmRpY2F0ZSB0aGF0IHRoZSBzdGF0ZSBtYWNoaW5lIG1vZGVsIGhhcyBoYXMgc3RydWN0dXJhbCBjaGFuZ2VzIGFuZCB0aGVyZWZvcmUgcmVxdWlyZXMgaW5pdGlhbGlzaW5nLlxuICAgICAgICAgICAgdGhpcy5jbGVhbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnQgd2l0aGluIHRoZSBzdGF0ZSBtYWNoaW5lIG1vZGVsLlxuICAgICAgICAgKiBOb3RlIHRoYXQgaWYgdGhpcyBzdGF0ZSBtYWNoaW5lIGlzIGVtYmVkZWQgd2l0aGluIGFub3RoZXIgc3RhdGUgbWFjaGluZSwgdGhlIHVsdGltYXRlIHJvb3QgZWxlbWVudCB3aWxsIGJlIHJldHVybmVkLlxuICAgICAgICAgKiBAbWV0aG9kIGdldFJvb3RcbiAgICAgICAgICogQHJldHVybnMge1N0YXRlTWFjaGluZX0gVGhlIHJvb3Qgc3RhdGUgbWFjaGluZSBlbGVtZW50LlxuICAgICAgICAgKi9cbiAgICAgICAgU3RhdGVNYWNoaW5lLnByb3RvdHlwZS5nZXRSb290ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVnaW9uID8gdGhpcy5yZWdpb24uZ2V0Um9vdCgpIDogdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFjY2VwdHMgYW4gaW5zdGFuY2Ugb2YgYSB2aXNpdG9yIGFuZCBjYWxscyB0aGUgdmlzaXRTdGF0ZU1hY2hpbmUgbWV0aG9kIG9uIGl0LlxuICAgICAgICAgKiBAbWV0aG9kIGFjY2VwdFxuICAgICAgICAgKiBAcGFyYW0ge1Zpc2l0b3I8VEFyZzE+fSB2aXNpdG9yIFRoZSB2aXNpdG9yIGluc3RhbmNlLlxuICAgICAgICAgKiBAcGFyYW0ge1RBcmcxfSBhcmcxIEFuIG9wdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgaW50byB0aGUgdmlzaXRvci5cbiAgICAgICAgICogQHBhcmFtIHthbnl9IGFyZzIgQW4gb3B0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyBpbnRvIHRoZSB2aXNpdG9yLlxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gYXJnMyBBbiBvcHRpb25hbCBhcmd1bWVudCB0byBwYXNzIGludG8gdGhlIHZpc2l0b3IuXG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9IEFueSB2YWx1ZSBjYW4gYmUgcmV0dXJuZWQgYnkgdGhlIHZpc2l0b3IuXG4gICAgICAgICAqL1xuICAgICAgICBTdGF0ZU1hY2hpbmUucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uICh2aXNpdG9yLCBhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgICAgICByZXR1cm4gdmlzaXRvci52aXNpdFN0YXRlTWFjaGluZSh0aGlzLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFN0YXRlTWFjaGluZTtcbiAgICB9KShTdGF0ZUpTLlN0YXRlKTtcbiAgICBTdGF0ZUpTLlN0YXRlTWFjaGluZSA9IFN0YXRlTWFjaGluZTtcbn0pKFN0YXRlSlMgfHwgKFN0YXRlSlMgPSB7fSkpO1xuLypcbiAqIEZpbml0ZSBzdGF0ZSBtYWNoaW5lIGxpYnJhcnlcbiAqIENvcHlyaWdodCAoYykgMjAxNC01IFN0ZWVsYnJlZXplIExpbWl0ZWRcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgYW5kIEdQTCB2MyBsaWNlbmNlc1xuICogaHR0cDovL3d3dy5zdGVlbGJyZWV6ZS5uZXQvc3RhdGUuY3NcbiAqL1xudmFyIFN0YXRlSlM7XG4oZnVuY3Rpb24gKFN0YXRlSlMpIHtcbiAgICAvKipcbiAgICAgKiBBIHRyYW5zaXRpb24gYmV0d2VlbiB2ZXJ0aWNlcyAoc3RhdGVzIG9yIHBzZXVkbyBzdGF0ZXMpIHRoYXQgbWF5IGJlIHRyYXZlcnNlZCBpbiByZXNwb25zZSB0byBhIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBUcmFuc2l0aW9ucyBjb21lIGluIGEgdmFyaWV0eSBvZiB0eXBlczpcbiAgICAgKiBpbnRlcm5hbCB0cmFuc2l0aW9ucyByZXNwb25kIHRvIG1lc3NhZ2VzIGJ1dCBkbyBub3QgY2F1c2UgYSBzdGF0ZSB0cmFuc2l0aW9uLCB0aGV5IG9ubHkgaGF2ZSBiZWhhdmlvdXI7XG4gICAgICogbG9jYWwgdHJhbnNpdGlvbnMgYXJlIGNvbnRhaW5lZCB3aXRoaW4gYSBzaW5nbGUgcmVnaW9uIHRoZXJlZm9yZSB0aGUgc291cmNlIHZlcnRleCBpcyBleGl0ZWQsIHRoZSB0cmFuc2l0aW9uIHRyYXZlcnNlZCwgYW5kIHRoZSB0YXJnZXQgc3RhdGUgZW50ZXJlZDtcbiAgICAgKiBleHRlcm5hbCB0cmFuc2l0aW9ucyBhcmUgbW9yZSBjb21wbGV4IGluIG5hdHVyZSBhcyB0aGV5IGNyb3NzIHJlZ2lvbiBib3VuZGFyaWVzLCBhbGwgZWxlbWVudHMgdXAgdG8gYnV0IG5vdCBub3QgaW5jbHVkaW5nIHRoZSBjb21tb24gYW5jZXN0b3IgYXJlIGV4aXRlZCBhbmQgZW50ZXJlZC5cbiAgICAgKlxuICAgICAqIEVudGVyaW5nIGEgY29tcG9zaXRlIHN0YXRlIHdpbGwgY2F1c2UgdGhlIGVudHJ5IG9mIHRoZSBjaGlsZCByZWdpb25zIHdpdGhpbiB0aGUgY29tcG9zaXRlIHN0YXRlOyB0aGlzIGluIHR1cm4gbWF5IHRyaWdnZXIgbW9yZSB0cmFuc2l0aW9ucy5cbiAgICAgKiBAY2xhc3MgVHJhbnNpdGlvblxuICAgICAqL1xuICAgIHZhciBUcmFuc2l0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIFRyYW5zaXRpb24gY2xhc3MuXG4gICAgICAgICAqIEBwYXJhbSB7VmVydGV4fSBzb3VyY2UgVGhlIHNvdXJjZSBvZiB0aGUgdHJhbnNpdGlvbi5cbiAgICAgICAgICogQHBhcmFtIHtWZXJ0ZXh9IHNvdXJjZSBUaGUgdGFyZ2V0IG9mIHRoZSB0cmFuc2l0aW9uOyB0aGlzIGlzIGFuIG9wdGlvbmFsIHBhcmFtZXRlciwgb21pdHRpbmcgaXQgd2lsbCBjcmVhdGUgYW4gSW50ZXJuYWwgdHJhbnNpdGlvbi5cbiAgICAgICAgICogQHBhcmFtIHtUcmFuc2l0aW9uS2luZH0ga2luZCBUaGUga2luZCB0aGUgdHJhbnNpdGlvbjsgdXNlIHRoaXMgdG8gc2V0IExvY2FsIG9yIEV4dGVybmFsICh0aGUgZGVmYXVsdCBpZiBvbWl0dGVkKSB0cmFuc2l0aW9uIHNlbWFudGljcy5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIFRyYW5zaXRpb24oc291cmNlLCB0YXJnZXQsIGtpbmQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICBpZiAoa2luZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAga2luZCA9IFN0YXRlSlMuVHJhbnNpdGlvbktpbmQuRXh0ZXJuYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB1c2VyIGRlZmluZWQgYmVoYXZpb3VyICh2aWEgZWZmZWN0KSBleGVjdXRlZCB3aGVuIHRyYXZlcnNpbmcgdGhpcyB0cmFuc2l0aW9uLlxuICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uQmVoYXZpb3IgPSBuZXcgU3RhdGVKUy5CZWhhdmlvcigpO1xuICAgICAgICAgICAgLy8gdGhlIGNvbGxlY3RlZCBhY3Rpb25zIHRvIHBlcmZvcm0gd2hlbiB0cmF2ZXJzaW5nIHRoZSB0cmFuc2l0aW9uIChpbmNsdWRlcyBleGl0aW5nIHN0YXRlcywgdHJhdmVyc2FsLCBhbmQgc3RhdGUgZW50cnkpXG4gICAgICAgICAgICB0aGlzLm9uVHJhdmVyc2UgPSBuZXcgU3RhdGVKUy5CZWhhdmlvcigpO1xuICAgICAgICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgIHRoaXMua2luZCA9IHRhcmdldCA/IGtpbmQgOiBTdGF0ZUpTLlRyYW5zaXRpb25LaW5kLkludGVybmFsO1xuICAgICAgICAgICAgdGhpcy5ndWFyZCA9IHNvdXJjZSBpbnN0YW5jZW9mIFN0YXRlSlMuUHNldWRvU3RhdGUgPyBUcmFuc2l0aW9uLlRydWVHdWFyZCA6IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UgPT09IF90aGlzLnNvdXJjZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnNvdXJjZS5vdXRnb2luZy5wdXNoKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5zb3VyY2UuZ2V0Um9vdCgpLmNsZWFuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFR1cm5zIGEgdHJhbnNpdGlvbiBpbnRvIGFuIGVsc2UgdHJhbnNpdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogRWxzZSB0cmFuc2l0aW9ucyBjYW4gYmUgdXNlZCBhdCBgSnVuY3Rpb25gIG9yIGBDaG9pY2VgIHBzZXVkbyBzdGF0ZXMgaWYgbm8gb3RoZXIgdHJhbnNpdGlvbiBndWFyZHMgZXZhbHVhdGUgdHJ1ZSwgYW4gRWxzZSB0cmFuc2l0aW9uIGlmIHByZXNlbnQgd2lsbCBiZSB0cmF2ZXJzZWQuXG4gICAgICAgICAqIEBtZXRob2QgZWxzZVxuICAgICAgICAgKiBAcmV0dXJucyB7VHJhbnNpdGlvbn0gUmV0dXJucyB0aGUgdHJhbnNpdGlvbiBvYmplY3QgdG8gZW5hYmxlIHRoZSBmbHVlbnQgQVBJLlxuICAgICAgICAgKi9cbiAgICAgICAgVHJhbnNpdGlvbi5wcm90b3R5cGVbXCJlbHNlXCJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5ndWFyZCA9IFRyYW5zaXRpb24uRmFsc2VHdWFyZDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRGVmaW5lcyB0aGUgZ3VhcmQgY29uZGl0aW9uIGZvciB0aGUgdHJhbnNpdGlvbi5cbiAgICAgICAgICogQG1ldGhvZCB3aGVuXG4gICAgICAgICAqIEBwYXJhbSB7R3VhcmR9IGd1YXJkIFRoZSBndWFyZCBjb25kaXRpb24gdGhhdCBtdXN0IGV2YWx1YXRlIHRydWUgZm9yIHRoZSB0cmFuc2l0aW9uIHRvIGJlIHRyYXZlcnNlZC5cbiAgICAgICAgICogQHJldHVybnMge1RyYW5zaXRpb259IFJldHVybnMgdGhlIHRyYW5zaXRpb24gb2JqZWN0IHRvIGVuYWJsZSB0aGUgZmx1ZW50IEFQSS5cbiAgICAgICAgICovXG4gICAgICAgIFRyYW5zaXRpb24ucHJvdG90eXBlLndoZW4gPSBmdW5jdGlvbiAoZ3VhcmQpIHtcbiAgICAgICAgICAgIHRoaXMuZ3VhcmQgPSBndWFyZDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIGJlaGF2aW91ciB0byBhIHRyYW5zaXRpb24uXG4gICAgICAgICAqIEBtZXRob2QgZWZmZWN0XG4gICAgICAgICAqIEBwYXJhbSB7QWN0aW9ufSB0cmFuc2l0aW9uQWN0aW9uIFRoZSBhY3Rpb24gdG8gYWRkIHRvIHRoZSB0cmFuc2l0aW9ucyB0cmF2ZXJzYWwgYmVoYXZpb3VyLlxuICAgICAgICAgKiBAcmV0dXJucyB7VHJhbnNpdGlvbn0gUmV0dXJucyB0aGUgdHJhbnNpdGlvbiBvYmplY3QgdG8gZW5hYmxlIHRoZSBmbHVlbnQgQVBJLlxuICAgICAgICAgKi9cbiAgICAgICAgVHJhbnNpdGlvbi5wcm90b3R5cGUuZWZmZWN0ID0gZnVuY3Rpb24gKHRyYW5zaXRpb25BY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkJlaGF2aW9yLnB1c2godHJhbnNpdGlvbkFjdGlvbik7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZS5nZXRSb290KCkuY2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQWNjZXB0cyBhbiBpbnN0YW5jZSBvZiBhIHZpc2l0b3IgYW5kIGNhbGxzIHRoZSB2aXNpdFRyYW5zaXRpb24gbWV0aG9kIG9uIGl0LlxuICAgICAgICAgKiBAbWV0aG9kIGFjY2VwdFxuICAgICAgICAgKiBAcGFyYW0ge1Zpc2l0b3I8VEFyZzE+fSB2aXNpdG9yIFRoZSB2aXNpdG9yIGluc3RhbmNlLlxuICAgICAgICAgKiBAcGFyYW0ge1RBcmcxfSBhcmcxIEFuIG9wdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgaW50byB0aGUgdmlzaXRvci5cbiAgICAgICAgICogQHBhcmFtIHthbnl9IGFyZzIgQW4gb3B0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyBpbnRvIHRoZSB2aXNpdG9yLlxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gYXJnMyBBbiBvcHRpb25hbCBhcmd1bWVudCB0byBwYXNzIGludG8gdGhlIHZpc2l0b3IuXG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9IEFueSB2YWx1ZSBjYW4gYmUgcmV0dXJuZWQgYnkgdGhlIHZpc2l0b3IuXG4gICAgICAgICAqL1xuICAgICAgICBUcmFuc2l0aW9uLnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbiAodmlzaXRvciwgYXJnMSwgYXJnMiwgYXJnMykge1xuICAgICAgICAgICAgcmV0dXJuIHZpc2l0b3IudmlzaXRUcmFuc2l0aW9uKHRoaXMsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyBhIHRoZSB0cmFuc2l0aW9uIG5hbWUuXG4gICAgICAgICAqIEBtZXRob2QgdG9TdHJpbmdcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIFRyYW5zaXRpb24ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiW1wiICsgKHRoaXMudGFyZ2V0ID8gdGhpcy5zb3VyY2UgKyBcIiAtPiBcIiArIHRoaXMudGFyZ2V0IDogdGhpcy5zb3VyY2UpICsgXCJdXCI7XG4gICAgICAgIH07XG4gICAgICAgIC8vIHRoZSBkZWZhdWx0IGd1YXJkIGNvbmRpdGlvbiBmb3IgcHNldWRvIHN0YXRlc1xuICAgICAgICBUcmFuc2l0aW9uLlRydWVHdWFyZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICAvLyB1c2VkIGFzIHRoZSBndWFyZCBjb25kaXRpb24gZm9yIGVsc2UgdHJhbml0aW9uc1xuICAgICAgICBUcmFuc2l0aW9uLkZhbHNlR3VhcmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBUcmFuc2l0aW9uO1xuICAgIH0pKCk7XG4gICAgU3RhdGVKUy5UcmFuc2l0aW9uID0gVHJhbnNpdGlvbjtcbn0pKFN0YXRlSlMgfHwgKFN0YXRlSlMgPSB7fSkpO1xuLypcbiAqIEZpbml0ZSBzdGF0ZSBtYWNoaW5lIGxpYnJhcnlcbiAqIENvcHlyaWdodCAoYykgMjAxNC01IFN0ZWVsYnJlZXplIExpbWl0ZWRcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgYW5kIEdQTCB2MyBsaWNlbmNlc1xuICogaHR0cDovL3d3dy5zdGVlbGJyZWV6ZS5uZXQvc3RhdGUuY3NcbiAqL1xudmFyIFN0YXRlSlM7XG4oZnVuY3Rpb24gKFN0YXRlSlMpIHtcbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRhdGlvbiBvZiBhIHZpc2l0b3IgcGF0dGVybi5cbiAgICAgKiBAY2xhc3MgVmlzaXRvclxuICAgICAqL1xuICAgIHZhciBWaXNpdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gVmlzaXRvcigpIHt9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWaXNpdHMgYW4gZWxlbWVudCB3aXRoaW4gYSBzdGF0ZSBtYWNoaW5lIG1vZGVsLlxuICAgICAgICAgKiBAbWV0aG9kIHZpc2l0RWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgdGhlIGVsZW1lbnQgYmVpbmcgdmlzaXRlZC5cbiAgICAgICAgICogQHBhcmFtIHtUQXJnMX0gYXJnMSBBbiBvcHRpb25hbCBwYXJhbWV0ZXIgcGFzc2VkIGludG8gdGhlIGFjY2VwdCBtZXRob2QuXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBhcmcyIEFuIG9wdGlvbmFsIHBhcmFtZXRlciBwYXNzZWQgaW50byB0aGUgYWNjZXB0IG1ldGhvZC5cbiAgICAgICAgICogQHBhcmFtIHthbnl9IGFyZzMgQW4gb3B0aW9uYWwgcGFyYW1ldGVyIHBhc3NlZCBpbnRvIHRoZSBhY2NlcHQgbWV0aG9kLlxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fSBBbnkgdmFsdWUgbWF5IGJlIHJldHVybmVkIHdoZW4gdmlzaXRpbmcgYW4gZWxlbWVudC5cbiAgICAgICAgICovXG4gICAgICAgIFZpc2l0b3IucHJvdG90eXBlLnZpc2l0RWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCBhcmcxLCBhcmcyLCBhcmczKSB7fTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZpc2l0cyBhIHJlZ2lvbiB3aXRoaW4gYSBzdGF0ZSBtYWNoaW5lIG1vZGVsLlxuICAgICAgICAgKiBAbWV0aG9kIHZpc2l0UmVnaW9uXG4gICAgICAgICAqIEBwYXJhbSB7UmVnaW9ufSByZWdpb24gVGhlIHJlZ2lvbiBiZWluZyB2aXNpdGVkLlxuICAgICAgICAgKiBAcGFyYW0ge1RBcmcxfSBhcmcxIEFuIG9wdGlvbmFsIHBhcmFtZXRlciBwYXNzZWQgaW50byB0aGUgYWNjZXB0IG1ldGhvZC5cbiAgICAgICAgICogQHBhcmFtIHthbnl9IGFyZzIgQW4gb3B0aW9uYWwgcGFyYW1ldGVyIHBhc3NlZCBpbnRvIHRoZSBhY2NlcHQgbWV0aG9kLlxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gYXJnMyBBbiBvcHRpb25hbCBwYXJhbWV0ZXIgcGFzc2VkIGludG8gdGhlIGFjY2VwdCBtZXRob2QuXG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9IEFueSB2YWx1ZSBtYXkgYmUgcmV0dXJuZWQgd2hlbiB2aXNpdGluZyBhbiBlbGVtZW50LlxuICAgICAgICAgKi9cbiAgICAgICAgVmlzaXRvci5wcm90b3R5cGUudmlzaXRSZWdpb24gPSBmdW5jdGlvbiAocmVnaW9uLCBhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMudmlzaXRFbGVtZW50KHJlZ2lvbiwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgICAgICAgICByZWdpb24udmVydGljZXMuZm9yRWFjaChmdW5jdGlvbiAodmVydGV4KSB7XG4gICAgICAgICAgICAgICAgdmVydGV4LmFjY2VwdChfdGhpcywgYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWaXNpdHMgYSB2ZXJ0ZXggd2l0aGluIGEgc3RhdGUgbWFjaGluZSBtb2RlbC5cbiAgICAgICAgICogQG1ldGhvZCB2aXNpdFZlcnRleFxuICAgICAgICAgKiBAcGFyYW0ge1ZlcnRleH0gdmVydGV4IFRoZSB2ZXJ0ZXggYmVpbmcgdmlzaXRlZC5cbiAgICAgICAgICogQHBhcmFtIHtUQXJnMX0gYXJnMSBBbiBvcHRpb25hbCBwYXJhbWV0ZXIgcGFzc2VkIGludG8gdGhlIGFjY2VwdCBtZXRob2QuXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBhcmcyIEFuIG9wdGlvbmFsIHBhcmFtZXRlciBwYXNzZWQgaW50byB0aGUgYWNjZXB0IG1ldGhvZC5cbiAgICAgICAgICogQHBhcmFtIHthbnl9IGFyZzMgQW4gb3B0aW9uYWwgcGFyYW1ldGVyIHBhc3NlZCBpbnRvIHRoZSBhY2NlcHQgbWV0aG9kLlxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fSBBbnkgdmFsdWUgbWF5IGJlIHJldHVybmVkIHdoZW4gdmlzaXRpbmcgYW4gZWxlbWVudC5cbiAgICAgICAgICovXG4gICAgICAgIFZpc2l0b3IucHJvdG90eXBlLnZpc2l0VmVydGV4ID0gZnVuY3Rpb24gKHZlcnRleCwgYXJnMSwgYXJnMiwgYXJnMykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLnZpc2l0RWxlbWVudCh2ZXJ0ZXgsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICAgICAgICAgICAgdmVydGV4Lm91dGdvaW5nLmZvckVhY2goZnVuY3Rpb24gKHRyYW5zaXRpb24pIHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uLmFjY2VwdChfdGhpcywgYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWaXNpdHMgYSBwc2V1ZG8gc3RhdGUgd2l0aGluIGEgc3RhdGUgbWFjaGluZSBtb2RlbC5cbiAgICAgICAgICogQG1ldGhvZCB2aXNpdFBzZXVkb1N0YXRlXG4gICAgICAgICAqIEBwYXJhbSB7UHNldWRvU3RhdGV9IHBzZXVkb1N0YXRlIFRoZSBwc2V1ZG8gc3RhdGUgYmVpbmcgdmlzaXRlZC5cbiAgICAgICAgICogQHBhcmFtIHtUQXJnMX0gYXJnMSBBbiBvcHRpb25hbCBwYXJhbWV0ZXIgcGFzc2VkIGludG8gdGhlIGFjY2VwdCBtZXRob2QuXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBhcmcyIEFuIG9wdGlvbmFsIHBhcmFtZXRlciBwYXNzZWQgaW50byB0aGUgYWNjZXB0IG1ldGhvZC5cbiAgICAgICAgICogQHBhcmFtIHthbnl9IGFyZzMgQW4gb3B0aW9uYWwgcGFyYW1ldGVyIHBhc3NlZCBpbnRvIHRoZSBhY2NlcHQgbWV0aG9kLlxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fSBBbnkgdmFsdWUgbWF5IGJlIHJldHVybmVkIHdoZW4gdmlzaXRpbmcgYW4gZWxlbWVudC5cbiAgICAgICAgICovXG4gICAgICAgIFZpc2l0b3IucHJvdG90eXBlLnZpc2l0UHNldWRvU3RhdGUgPSBmdW5jdGlvbiAocHNldWRvU3RhdGUsIGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpc2l0VmVydGV4KHBzZXVkb1N0YXRlLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZpc2l0cyBhIHN0YXRlIHdpdGhpbiBhIHN0YXRlIG1hY2hpbmUgbW9kZWwuXG4gICAgICAgICAqIEBtZXRob2QgdmlzaXRTdGF0ZVxuICAgICAgICAgKiBAcGFyYW0ge1N0YXRlfSBzdGF0ZSBUaGUgc3RhdGUgYmVpbmcgdmlzaXRlZC5cbiAgICAgICAgICogQHBhcmFtIHtUQXJnMX0gYXJnMSBBbiBvcHRpb25hbCBwYXJhbWV0ZXIgcGFzc2VkIGludG8gdGhlIGFjY2VwdCBtZXRob2QuXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBhcmcyIEFuIG9wdGlvbmFsIHBhcmFtZXRlciBwYXNzZWQgaW50byB0aGUgYWNjZXB0IG1ldGhvZC5cbiAgICAgICAgICogQHBhcmFtIHthbnl9IGFyZzMgQW4gb3B0aW9uYWwgcGFyYW1ldGVyIHBhc3NlZCBpbnRvIHRoZSBhY2NlcHQgbWV0aG9kLlxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fSBBbnkgdmFsdWUgbWF5IGJlIHJldHVybmVkIHdoZW4gdmlzaXRpbmcgYW4gZWxlbWVudC5cbiAgICAgICAgICovXG4gICAgICAgIFZpc2l0b3IucHJvdG90eXBlLnZpc2l0U3RhdGUgPSBmdW5jdGlvbiAoc3RhdGUsIGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy52aXNpdFZlcnRleChzdGF0ZSwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgICAgICAgICBzdGF0ZS5yZWdpb25zLmZvckVhY2goZnVuY3Rpb24gKHJlZ2lvbikge1xuICAgICAgICAgICAgICAgIHJlZ2lvbi5hY2NlcHQoX3RoaXMsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogVmlzaXRzIGEgZmluYWwgc3RhdGUgd2l0aGluIGEgc3RhdGUgbWFjaGluZSBtb2RlbC5cbiAgICAgICAgICogQG1ldGhvZCB2aXNpdEZpbmFsXG4gICAgICAgICAqIEBwYXJhbSB7RmluYWxTdGF0ZX0gZmluYWxTdGF0ZSBUaGUgZmluYWwgc3RhdGUgYmVpbmcgdmlzaXRlZC5cbiAgICAgICAgICogQHBhcmFtIHtUQXJnMX0gYXJnMSBBbiBvcHRpb25hbCBwYXJhbWV0ZXIgcGFzc2VkIGludG8gdGhlIGFjY2VwdCBtZXRob2QuXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBhcmcyIEFuIG9wdGlvbmFsIHBhcmFtZXRlciBwYXNzZWQgaW50byB0aGUgYWNjZXB0IG1ldGhvZC5cbiAgICAgICAgICogQHBhcmFtIHthbnl9IGFyZzMgQW4gb3B0aW9uYWwgcGFyYW1ldGVyIHBhc3NlZCBpbnRvIHRoZSBhY2NlcHQgbWV0aG9kLlxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fSBBbnkgdmFsdWUgbWF5IGJlIHJldHVybmVkIHdoZW4gdmlzaXRpbmcgYW4gZWxlbWVudC5cbiAgICAgICAgICovXG4gICAgICAgIFZpc2l0b3IucHJvdG90eXBlLnZpc2l0RmluYWxTdGF0ZSA9IGZ1bmN0aW9uIChmaW5hbFN0YXRlLCBhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aXNpdFN0YXRlKGZpbmFsU3RhdGUsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogVmlzaXRzIGEgc3RhdGUgbWFjaGluZSB3aXRoaW4gYSBzdGF0ZSBtYWNoaW5lIG1vZGVsLlxuICAgICAgICAgKiBAbWV0aG9kIHZpc2l0VmVydGV4XG4gICAgICAgICAqIEBwYXJhbSB7U3RhdGVNYWNoaW5lfSBzdGF0ZSBtYWNoaW5lIFRoZSBzdGF0ZSBtYWNoaW5lIGJlaW5nIHZpc2l0ZWQuXG4gICAgICAgICAqIEBwYXJhbSB7VEFyZzF9IGFyZzEgQW4gb3B0aW9uYWwgcGFyYW1ldGVyIHBhc3NlZCBpbnRvIHRoZSBhY2NlcHQgbWV0aG9kLlxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gYXJnMiBBbiBvcHRpb25hbCBwYXJhbWV0ZXIgcGFzc2VkIGludG8gdGhlIGFjY2VwdCBtZXRob2QuXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBhcmczIEFuIG9wdGlvbmFsIHBhcmFtZXRlciBwYXNzZWQgaW50byB0aGUgYWNjZXB0IG1ldGhvZC5cbiAgICAgICAgICogQHJldHVybnMge2FueX0gQW55IHZhbHVlIG1heSBiZSByZXR1cm5lZCB3aGVuIHZpc2l0aW5nIGFuIGVsZW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBWaXNpdG9yLnByb3RvdHlwZS52aXNpdFN0YXRlTWFjaGluZSA9IGZ1bmN0aW9uIChzdGF0ZU1hY2hpbmUsIGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpc2l0U3RhdGUoc3RhdGVNYWNoaW5lLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZpc2l0cyBhIHRyYW5zaXRpb24gd2l0aGluIGEgc3RhdGUgbWFjaGluZSBtb2RlbC5cbiAgICAgICAgICogQG1ldGhvZCB2aXNpdFRyYW5zaXRpb25cbiAgICAgICAgICogQHBhcmFtIHtUcmFuc2l0aW9ufSB0cmFuc2l0aW9uIFRoZSB0cmFuc2l0aW9uIGJlaW5nIHZpc2l0ZWQuXG4gICAgICAgICAqIEBwYXJhbSB7VEFyZzF9IGFyZzEgQW4gb3B0aW9uYWwgcGFyYW1ldGVyIHBhc3NlZCBpbnRvIHRoZSBhY2NlcHQgbWV0aG9kLlxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gYXJnMiBBbiBvcHRpb25hbCBwYXJhbWV0ZXIgcGFzc2VkIGludG8gdGhlIGFjY2VwdCBtZXRob2QuXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBhcmczIEFuIG9wdGlvbmFsIHBhcmFtZXRlciBwYXNzZWQgaW50byB0aGUgYWNjZXB0IG1ldGhvZC5cbiAgICAgICAgICogQHJldHVybnMge2FueX0gQW55IHZhbHVlIG1heSBiZSByZXR1cm5lZCB3aGVuIHZpc2l0aW5nIGFuIGVsZW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBWaXNpdG9yLnByb3RvdHlwZS52aXNpdFRyYW5zaXRpb24gPSBmdW5jdGlvbiAodHJhbnNpdGlvbiwgYXJnMSwgYXJnMiwgYXJnMykge307XG4gICAgICAgIHJldHVybiBWaXNpdG9yO1xuICAgIH0pKCk7XG4gICAgU3RhdGVKUy5WaXNpdG9yID0gVmlzaXRvcjtcbn0pKFN0YXRlSlMgfHwgKFN0YXRlSlMgPSB7fSkpO1xuLypcbiAqIEZpbml0ZSBzdGF0ZSBtYWNoaW5lIGxpYnJhcnlcbiAqIENvcHlyaWdodCAoYykgMjAxNC01IFN0ZWVsYnJlZXplIExpbWl0ZWRcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgYW5kIEdQTCB2MyBsaWNlbmNlc1xuICogaHR0cDovL3d3dy5zdGVlbGJyZWV6ZS5uZXQvc3RhdGUuY3NcbiAqL1xudmFyIFN0YXRlSlM7XG4oZnVuY3Rpb24gKFN0YXRlSlMpIHtcbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHdvcmtpbmcgaW1wbGVtZW50YXRpb24gb2YgYSBzdGF0ZSBtYWNoaW5lIGluc3RhbmNlIGNsYXNzLlxuICAgICAqXG4gICAgICogSW1wbGVtZW50cyB0aGUgYElBY3RpdmVTdGF0ZUNvbmZpZ3VyYXRpb25gIGludGVyZmFjZS5cbiAgICAgKiBJdCBpcyBwb3NzaWJsZSB0byBjcmVhdGUgb3RoZXIgY3VzdG9tIGluc3RhbmNlIGNsYXNzZXMgdG8gbWFuYWdlIHN0YXRlIG1hY2hpbmUgc3RhdGUgaW4gb3RoZXIgd2F5cyAoZS5nLiBhcyBzZXJpYWxpc2FibGUgSlNPTik7IGp1c3QgaW1wbGVtZW50IHRoZSBzYW1lIG1lbWJlcnMgYW5kIG1ldGhvZHMgYXMgdGhpcyBjbGFzcy5cbiAgICAgKiBAY2xhc3MgU3RhdGVNYWNoaW5lSW5zdGFuY2VcbiAgICAgKiBAaW1wbGVtZW50cyBJQWN0aXZlU3RhdGVDb25maWd1cmF0aW9uXG4gICAgICovXG4gICAgdmFyIFN0YXRlTWFjaGluZUluc3RhbmNlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHN0YXRlIG1hY2hpbmUgaW5zdGFuY2UgY2xhc3MuXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBvcHRpb25hbCBuYW1lIG9mIHRoZSBzdGF0ZSBtYWNoaW5lIGluc3RhbmNlLlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gU3RhdGVNYWNoaW5lSW5zdGFuY2UobmFtZSkge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIG5hbWUgPSBcInVubmFtZWRcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubGFzdCA9IHt9O1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgc3RhdGUgbWFuY2hpbmUgaW5zdGFuY2UgcmVhY2hlZCB3YXMgdGVybWluYXRlZCBieSByZWFjaGluZyBhIFRlcm1pbmF0ZSBwc2V1ZG8gc3RhdGUuXG4gICAgICAgICAgICAgKiBAbWVtYmVyIGlzVGVybWluYXRlZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmlzVGVybWluYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBVcGRhdGVzIHRoZSBsYXN0IGtub3duIHN0YXRlIGZvciBhIGdpdmVuIHJlZ2lvbi5cbiAgICAgICAgU3RhdGVNYWNoaW5lSW5zdGFuY2UucHJvdG90eXBlLnNldEN1cnJlbnQgPSBmdW5jdGlvbiAocmVnaW9uLCBzdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5sYXN0W3JlZ2lvbi5xdWFsaWZpZWROYW1lXSA9IHN0YXRlO1xuICAgICAgICB9O1xuICAgICAgICAvLyBSZXR1cm5zIHRoZSBsYXN0IGtub3duIHN0YXRlIGZvciBhIGdpdmVuIHJlZ2lvbi5cbiAgICAgICAgU3RhdGVNYWNoaW5lSW5zdGFuY2UucHJvdG90eXBlLmdldEN1cnJlbnQgPSBmdW5jdGlvbiAocmVnaW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0W3JlZ2lvbi5xdWFsaWZpZWROYW1lXTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIHN0YXRlIG1hY2hpbmUgaW5zdGFuY2UuXG4gICAgICAgICAqIEBtZXRob2QgdG9TdHJpbmdcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIG5hbWUgb2YgdGhlIHN0YXRlIG1hY2hpbmUgaW5zdGFuY2UuXG4gICAgICAgICAqL1xuICAgICAgICBTdGF0ZU1hY2hpbmVJbnN0YW5jZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gU3RhdGVNYWNoaW5lSW5zdGFuY2U7XG4gICAgfSkoKTtcbiAgICBTdGF0ZUpTLlN0YXRlTWFjaGluZUluc3RhbmNlID0gU3RhdGVNYWNoaW5lSW5zdGFuY2U7XG59KShTdGF0ZUpTIHx8IChTdGF0ZUpTID0ge30pKTtcbi8qXG4gKiBGaW5pdGUgc3RhdGUgbWFjaGluZSBsaWJyYXJ5XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtNSBTdGVlbGJyZWV6ZSBMaW1pdGVkXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGFuZCBHUEwgdjMgbGljZW5jZXNcbiAqIGh0dHA6Ly93d3cuc3RlZWxicmVlemUubmV0L3N0YXRlLmNzXG4gKi9cbnZhciBTdGF0ZUpTO1xuKGZ1bmN0aW9uIChTdGF0ZUpTKSB7XG4gICAgLyoqXG4gICAgICogU2V0cyBhIG1ldGhvZCB0byBzZWxlY3QgYW4gaW50ZWdlciByYW5kb20gbnVtYmVyIGxlc3MgdGhhbiB0aGUgbWF4IHZhbHVlIHBhc3NlZCBhcyBhIHBhcmFtZXRlci5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgb25seSB1c2VmdWwgd2hlbiBhIGN1c3RvbSByYW5kb20gbnVtYmVyIGdlbmVyYXRvciBpcyByZXF1aXJlZDsgdGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gaXMgZmluZSBpbiBtb3N0IGNpcmN1bXN0YW5jZXMuXG4gICAgICogQGZ1bmN0aW9uIHNldFJhbmRvbVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGdlbmVyYXRvciBBIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBtYXggdmFsdWUgYW5kIHJldHVybnMgYSByYW5kb20gbnVtYmVyIGJldHdlZW4gMCBhbmQgbWF4IC0gMS5cbiAgICAgKiBAcmV0dXJucyBBIHJhbmRvbSBudW1iZXIgYmV0d2VlbiAwIGFuZCBtYXggLSAxXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2V0UmFuZG9tKGdlbmVyYXRvcikge1xuICAgICAgICByYW5kb20gPSBnZW5lcmF0b3I7XG4gICAgfVxuICAgIFN0YXRlSlMuc2V0UmFuZG9tID0gc2V0UmFuZG9tO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgbWV0aG9kIHVzZWQgdG8gc2VsZWN0IGFuIGludGVnZXIgcmFuZG9tIG51bWJlciBsZXNzIHRoYW4gdGhlIG1heCB2YWx1ZSBwYXNzZWQgYXMgYSBwYXJhbWV0ZXIuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIG9ubHkgdXNlZnVsIHdoZW4gYSBjdXN0b20gcmFuZG9tIG51bWJlciBnZW5lcmF0b3IgaXMgcmVxdWlyZWQ7IHRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGlzIGZpbmUgaW4gbW9zdCBjaXJjdW1zdGFuY2VzLlxuICAgICAqIEBmdW5jdGlvbiBnZXRSYW5kb21cbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IFRoZSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgbWF4IHZhbHVlIGFuZCByZXR1cm5zIGEgcmFuZG9tIG51bWJlciBiZXR3ZWVuIDAgYW5kIG1heCAtIDEuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UmFuZG9tKCkge1xuICAgICAgICByZXR1cm4gcmFuZG9tO1xuICAgIH1cbiAgICBTdGF0ZUpTLmdldFJhbmRvbSA9IGdldFJhbmRvbTtcbiAgICAvLyB0aGUgZGVmYXVsdCBtZXRob2QgdXNlZCB0byBwcm9kdWNlIGEgcmFuZG9tIG51bWJlcjsgZGVmYXVsdGluZyB0byBzaW1wbGlmaWVkIGltcGxlbWVudGF0aW9uIHNlZW4gaW4gTW96aWxsYSBNYXRoLnJhbmRvbSgpIHBhZ2U7IG1heSBiZSBvdmVycmlkZW4gZm9yIHRlc3RpbmdcbiAgICB2YXIgcmFuZG9tID0gZnVuY3Rpb24gcmFuZG9tKG1heCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KTtcbiAgICB9O1xufSkoU3RhdGVKUyB8fCAoU3RhdGVKUyA9IHt9KSk7XG4vKlxuICogRmluaXRlIHN0YXRlIG1hY2hpbmUgbGlicmFyeVxuICogQ29weXJpZ2h0IChjKSAyMDE0LTUgU3RlZWxicmVlemUgTGltaXRlZFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBhbmQgR1BMIHYzIGxpY2VuY2VzXG4gKiBodHRwOi8vd3d3LnN0ZWVsYnJlZXplLm5ldC9zdGF0ZS5jc1xuICovXG52YXIgU3RhdGVKUztcbihmdW5jdGlvbiAoU3RhdGVKUykge1xuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgYW4gZWxlbWVudCBpcyBjdXJyZW50bHkgYWN0aXZlOyB0aGF0IGl0IGhhcyBiZWVuIGVudGVyZWQgYnV0IG5vdCB5ZXQgZXhpdGVkLlxuICAgICAqIEBmdW5jdGlvbiBpc0FjdGl2ZVxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgc3RhdGUgdG8gdGVzdC5cbiAgICAgKiBAcGFyYW0ge0lBY3RpdmVTdGF0ZUNvbmZpZ3VyYXRpb259IGluc3RhbmNlIFRoZSBpbnN0YW5jZSBvZiB0aGUgc3RhdGUgbWFjaGluZSBtb2RlbC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgZWxlbWVudCBpcyBhY3RpdmUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNBY3RpdmUoX3gsIF94Mikge1xuICAgICAgICB2YXIgX2FnYWluID0gdHJ1ZTtcblxuICAgICAgICBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gX3gsXG4gICAgICAgICAgICAgICAgc3RhdGVNYWNoaW5lSW5zdGFuY2UgPSBfeDI7XG4gICAgICAgICAgICBfYWdhaW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBTdGF0ZUpTLlJlZ2lvbikge1xuICAgICAgICAgICAgICAgIF94ID0gZWxlbWVudC5zdGF0ZTtcbiAgICAgICAgICAgICAgICBfeDIgPSBzdGF0ZU1hY2hpbmVJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICBfYWdhaW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlIF9mdW5jdGlvbjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFN0YXRlSlMuU3RhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5yZWdpb24gPyBpc0FjdGl2ZShlbGVtZW50LnJlZ2lvbiwgc3RhdGVNYWNoaW5lSW5zdGFuY2UpICYmIHN0YXRlTWFjaGluZUluc3RhbmNlLmdldEN1cnJlbnQoZWxlbWVudC5yZWdpb24pID09PSBlbGVtZW50IDogdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBTdGF0ZUpTLmlzQWN0aXZlID0gaXNBY3RpdmU7XG59KShTdGF0ZUpTIHx8IChTdGF0ZUpTID0ge30pKTtcbi8qXG4gKiBGaW5pdGUgc3RhdGUgbWFjaGluZSBsaWJyYXJ5XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtNSBTdGVlbGJyZWV6ZSBMaW1pdGVkXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGFuZCBHUEwgdjMgbGljZW5jZXNcbiAqIGh0dHA6Ly93d3cuc3RlZWxicmVlemUubmV0L3N0YXRlLmNzXG4gKi9cbnZhciBTdGF0ZUpTO1xuKGZ1bmN0aW9uIChTdGF0ZUpTKSB7XG4gICAgLyoqXG4gICAgICogVGVzdHMgYW4gZWxlbWVudCB3aXRoaW4gYSBzdGF0ZSBtYWNoaW5lIGluc3RhbmNlIHRvIHNlZSBpZiBpdHMgbGlmZWN5Y2xlIGlzIGNvbXBsZXRlLlxuICAgICAqIEBmdW5jdGlvbiBpc0NvbXBsZXRlXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIHRlc3QuXG4gICAgICogQHBhcmFtIHtJQWN0aXZlU3RhdGVDb25maWd1cmF0aW9ufSBpbnN0YW5jZSBUaGUgaW5zdGFuY2Ugb2YgdGhlIHN0YXRlIG1hY2hpbmUgbW9kZWwgdG8gdGVzdCBmb3IgY29tcGxldGVuZXNzLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBlbGVtZW50IGlzIGNvbXBsZXRlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzQ29tcGxldGUoZWxlbWVudCwgaW5zdGFuY2UpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBTdGF0ZUpTLlJlZ2lvbikge1xuICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlLmdldEN1cnJlbnQoZWxlbWVudCkuaXNGaW5hbCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBTdGF0ZUpTLlN0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5yZWdpb25zLmV2ZXJ5KGZ1bmN0aW9uIChyZWdpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNDb21wbGV0ZShyZWdpb24sIGluc3RhbmNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBTdGF0ZUpTLmlzQ29tcGxldGUgPSBpc0NvbXBsZXRlO1xufSkoU3RhdGVKUyB8fCAoU3RhdGVKUyA9IHt9KSk7XG4vKlxuICogRmluaXRlIHN0YXRlIG1hY2hpbmUgbGlicmFyeVxuICogQ29weXJpZ2h0IChjKSAyMDE0LTUgU3RlZWxicmVlemUgTGltaXRlZFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBhbmQgR1BMIHYzIGxpY2VuY2VzXG4gKiBodHRwOi8vd3d3LnN0ZWVsYnJlZXplLm5ldC9zdGF0ZS5jc1xuICovXG52YXIgU3RhdGVKUztcbihmdW5jdGlvbiAoU3RhdGVKUykge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpc2VzIGEgc3RhdGUgbWFjaGluZSBhbmQvb3Igc3RhdGUgbWFjaGluZSBtb2RlbC5cbiAgICAgKlxuICAgICAqIFBhc3NpbmcganVzdCB0aGUgc3RhdGUgbWFjaGluZSBtb2RlbCB3aWxsIGluaXRpYWxpc2UgdGhlIG1vZGVsLCBwYXNzaW5nIHRoZSBtb2RlbCBhbmQgaW5zdGFuY2Ugd2lsbCBpbml0aWFsc2UgdGhlIGluc3RhbmNlIGFuZCBpZiBuZWNlc3NhcnksIHRoZSBtb2RlbC5cbiAgICAgKiBAZnVuY3Rpb24gaW5pdGlhbGlzZVxuICAgICAqIEBwYXJhbSB7U3RhdGVNYWNoaW5lfSBzdGF0ZU1hY2hpbmVNb2RlbCBUaGUgc3RhdGUgbWFjaGluZSBtb2RlbC4gSWYgYXV0b0luaXRpYWxpc2VNb2RlbCBpcyB0cnVlIChvciBubyBpbnN0YW5jZSBpcyBzcGVjaWZpZWQpIGFuZCB0aGUgbW9kZWwgaGFzIGNoYW5nZWQsIHRoZSBtb2RlbCB3aWxsIGJlIGluaXRpYWxpc2VkLlxuICAgICAqIEBwYXJhbSB7SUFjdGl2ZVN0YXRlQ29uZmlndXJhdGlvbn0gc3RhdGVNYWNoaW5lSW5zdGFuY2UgVGhlIG9wdGlvbmFsIHN0YXRlIG1hY2hpbmUgaW5zdGFuY2UgdG8gaW5pdGlhbGlzZS5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGF1dG9Jbml0aWFsaXNlTW9kZWwgRGVmYXVsdGluZyB0byB0cnVlLCB0aGlzIHdpbGwgY2F1c2UgdGhlIG1vZGVsIHRvIGJlIGluaXRpYWxpc2VkIHByaW9yIHRvIGluaXRpYWxpc2luZyB0aGUgaW5zdGFuY2UgaWYgdGhlIG1vZGVsIGhhcyBjaGFuZ2VkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluaXRpYWxpc2Uoc3RhdGVNYWNoaW5lTW9kZWwsIHN0YXRlTWFjaGluZUluc3RhbmNlLCBhdXRvSW5pdGlhbGlzZU1vZGVsKSB7XG4gICAgICAgIGlmIChhdXRvSW5pdGlhbGlzZU1vZGVsID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGF1dG9Jbml0aWFsaXNlTW9kZWwgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGF0ZU1hY2hpbmVJbnN0YW5jZSkge1xuICAgICAgICAgICAgLy8gaW5pdGlhbGlzZSB0aGUgc3RhdGUgbWFjaGluZSBtb2RlbCBpZiBuZWNlc3NhcnlcbiAgICAgICAgICAgIGlmIChhdXRvSW5pdGlhbGlzZU1vZGVsICYmIHN0YXRlTWFjaGluZU1vZGVsLmNsZWFuID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpc2Uoc3RhdGVNYWNoaW5lTW9kZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gbG9nIGFzIHJlcXVpcmVkXG4gICAgICAgICAgICBTdGF0ZUpTLmNvbnNvbGUubG9nKFwiaW5pdGlhbGlzZSBcIiArIHN0YXRlTWFjaGluZUluc3RhbmNlKTtcbiAgICAgICAgICAgIC8vIGVudGVyIHRoZSBzdGF0ZSBtYWNoaW5lIGluc3RhbmNlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAgICAgc3RhdGVNYWNoaW5lTW9kZWwub25Jbml0aWFsaXNlLmludm9rZSh1bmRlZmluZWQsIHN0YXRlTWFjaGluZUluc3RhbmNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGxvZyBhcyByZXF1aXJlZFxuICAgICAgICAgICAgU3RhdGVKUy5jb25zb2xlLmxvZyhcImluaXRpYWxpc2UgXCIgKyBzdGF0ZU1hY2hpbmVNb2RlbC5uYW1lKTtcbiAgICAgICAgICAgIC8vIGluaXRpYWxpc2UgdGhlIHN0YXRlIG1hY2hpbmUgbW9kZWxcbiAgICAgICAgICAgIHN0YXRlTWFjaGluZU1vZGVsLmFjY2VwdChuZXcgSW5pdGlhbGlzZUVsZW1lbnRzKCksIGZhbHNlKTtcbiAgICAgICAgICAgIHN0YXRlTWFjaGluZU1vZGVsLmNsZWFuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBTdGF0ZUpTLmluaXRpYWxpc2UgPSBpbml0aWFsaXNlO1xuICAgIC8qKlxuICAgICAqIFBhc3NlcyBhIG1lc3NhZ2UgdG8gYSBzdGF0ZSBtYWNoaW5lIGZvciBldmFsdWF0aW9uOyBtZXNzYWdlcyB0cmlnZ2VyIHN0YXRlIHRyYW5zaXRpb25zLlxuICAgICAqIEBmdW5jdGlvbiBldmFsdWF0ZVxuICAgICAqIEBwYXJhbSB7U3RhdGVNYWNoaW5lfSBzdGF0ZU1hY2hpbmVNb2RlbCBUaGUgc3RhdGUgbWFjaGluZSBtb2RlbC4gSWYgYXV0b0luaXRpYWxpc2VNb2RlbCBpcyB0cnVlIChvciBubyBpbnN0YW5jZSBpcyBzcGVjaWZpZWQpIGFuZCB0aGUgbW9kZWwgaGFzIGNoYW5nZWQsIHRoZSBtb2RlbCB3aWxsIGJlIGluaXRpYWxpc2VkLlxuICAgICAqIEBwYXJhbSB7SUFjdGl2ZVN0YXRlQ29uZmlndXJhdGlvbn0gc3RhdGVNYWNoaW5lSW5zdGFuY2UgVGhlIGluc3RhbmNlIG9mIHRoZSBzdGF0ZSBtYWNoaW5lIG1vZGVsIHRvIGV2YWx1YXRlIHRoZSBtZXNzYWdlIGFnYWluc3QuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhdXRvSW5pdGlhbGlzZU1vZGVsIERlZmF1bHRpbmcgdG8gdHJ1ZSwgdGhpcyB3aWxsIGNhdXNlIHRoZSBtb2RlbCB0byBiZSBpbml0aWFsaXNlZCBwcmlvciB0byBpbml0aWFsaXNpbmcgdGhlIGluc3RhbmNlIGlmIHRoZSBtb2RlbCBoYXMgY2hhbmdlZC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWVzc2FnZSB0cmlnZ2VyZWQgYSBzdGF0ZSB0cmFuc2l0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGV2YWx1YXRlKHN0YXRlTWFjaGluZU1vZGVsLCBzdGF0ZU1hY2hpbmVJbnN0YW5jZSwgbWVzc2FnZSwgYXV0b0luaXRpYWxpc2VNb2RlbCkge1xuICAgICAgICBpZiAoYXV0b0luaXRpYWxpc2VNb2RlbCA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBhdXRvSW5pdGlhbGlzZU1vZGVsID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBsb2cgYXMgcmVxdWlyZWRcbiAgICAgICAgU3RhdGVKUy5jb25zb2xlLmxvZyhzdGF0ZU1hY2hpbmVJbnN0YW5jZSArIFwiIGV2YWx1YXRlIFwiICsgbWVzc2FnZSk7XG4gICAgICAgIC8vIGluaXRpYWxpc2UgdGhlIHN0YXRlIG1hY2hpbmUgbW9kZWwgaWYgbmVjZXNzYXJ5XG4gICAgICAgIGlmIChhdXRvSW5pdGlhbGlzZU1vZGVsICYmIHN0YXRlTWFjaGluZU1vZGVsLmNsZWFuID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaW5pdGlhbGlzZShzdGF0ZU1hY2hpbmVNb2RlbCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGVybWluYXRlZCBzdGF0ZSBtYWNoaW5lIGluc3RhbmNlcyB3aWxsIG5vdCBldmFsdWF0ZSBtZXNzYWdlc1xuICAgICAgICBpZiAoc3RhdGVNYWNoaW5lSW5zdGFuY2UuaXNUZXJtaW5hdGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2YWx1YXRlU3RhdGUoc3RhdGVNYWNoaW5lTW9kZWwsIHN0YXRlTWFjaGluZUluc3RhbmNlLCBtZXNzYWdlKTtcbiAgICB9XG4gICAgU3RhdGVKUy5ldmFsdWF0ZSA9IGV2YWx1YXRlO1xuICAgIC8vIGV2YWx1YXRlcyBtZXNzYWdlcyBhZ2FpbnN0IGEgc3RhdGUsIGV4ZWN1dGluZyB0cmFuc2l0aW9ucyBhcyBhcHByb3ByaWF0ZVxuICAgIGZ1bmN0aW9uIGV2YWx1YXRlU3RhdGUoc3RhdGUsIHN0YXRlTWFjaGluZUluc3RhbmNlLCBtZXNzYWdlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgLy8gZGVsZWdhdGUgdG8gY2hpbGQgcmVnaW9ucyBmaXJzdFxuICAgICAgICBzdGF0ZS5yZWdpb25zLmV2ZXJ5KGZ1bmN0aW9uIChyZWdpb24pIHtcbiAgICAgICAgICAgIGlmIChldmFsdWF0ZVN0YXRlKHN0YXRlTWFjaGluZUluc3RhbmNlLmdldEN1cnJlbnQocmVnaW9uKSwgc3RhdGVNYWNoaW5lSW5zdGFuY2UsIG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RhdGVKUy5pc0FjdGl2ZShzdGF0ZSwgc3RhdGVNYWNoaW5lSW5zdGFuY2UpOyAvLyBOT1RFOiB0aGlzIGp1c3QgY29udHJvbHMgdGhlIGV2ZXJ5IGxvb3A7IGFsc28gaXNBY3RpdmUgaXMgYSBsaXR0ZSBjb3N0bHkgc28gdXNpbmcgc3BhcmluZ2x5XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gTk9URTogdGhpcyBqdXN0IGNvbnRyb2xzIHRoZSBldmVyeSBsb29wXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBpZiBhIHRyYW5zaXRpb24gb2NjdXJlZCBpbiBhIGNoaWxkIHJlZ2lvbiwgY2hlY2sgZm9yIGNvbXBsZXRpb25zXG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlICE9PSBzdGF0ZSAmJiBTdGF0ZUpTLmlzQ29tcGxldGUoc3RhdGUsIHN0YXRlTWFjaGluZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgIGV2YWx1YXRlU3RhdGUoc3RhdGUsIHN0YXRlTWFjaGluZUluc3RhbmNlLCBzdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBvdGhlcndpc2UgbG9vayBmb3IgYSB0cmFuc2l0aW9uIGZyb20gdGhpcyBzdGF0ZVxuICAgICAgICAgICAgdmFyIHRyYW5zaXRpb25zID0gc3RhdGUub3V0Z29pbmcuZmlsdGVyKGZ1bmN0aW9uICh0cmFuc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zaXRpb24uZ3VhcmQobWVzc2FnZSwgc3RhdGVNYWNoaW5lSW5zdGFuY2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodHJhbnNpdGlvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gZXhlY3V0ZSBpZiBhIHNpbmdsZSB0cmFuc2l0aW9uIHdhcyBmb3VuZFxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyYXZlcnNlKHRyYW5zaXRpb25zWzBdLCBzdGF0ZU1hY2hpbmVJbnN0YW5jZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRyYW5zaXRpb25zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAvLyBlcnJvciBpZiBtdWx0aXBsZSB0cmFuc2l0aW9ucyBldmFsdWF0ZWQgdHJ1ZVxuICAgICAgICAgICAgICAgIFN0YXRlSlMuY29uc29sZS5lcnJvcihzdGF0ZSArIFwiOiBtdWx0aXBsZSBvdXRib3VuZCB0cmFuc2l0aW9ucyBldmFsdWF0ZWQgdHJ1ZSBmb3IgbWVzc2FnZSBcIiArIG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8vIHRyYXZlcnNlcyBhIHRyYW5zaXRpb25cbiAgICBmdW5jdGlvbiB0cmF2ZXJzZSh0cmFuc2l0aW9uLCBpbnN0YW5jZSwgbWVzc2FnZSkge1xuICAgICAgICB2YXIgb25UcmF2ZXJzZSA9IG5ldyBTdGF0ZUpTLkJlaGF2aW9yKHRyYW5zaXRpb24ub25UcmF2ZXJzZSksXG4gICAgICAgICAgICB0YXJnZXQgPSB0cmFuc2l0aW9uLnRhcmdldDtcbiAgICAgICAgLy8gcHJvY2VzcyBzdGF0aWMgY29uZGl0aW9uYWwgYnJhbmNoZXNcbiAgICAgICAgd2hpbGUgKHRhcmdldCAmJiB0YXJnZXQgaW5zdGFuY2VvZiBTdGF0ZUpTLlBzZXVkb1N0YXRlICYmIHRhcmdldC5raW5kID09PSBTdGF0ZUpTLlBzZXVkb1N0YXRlS2luZC5KdW5jdGlvbikge1xuICAgICAgICAgICAgdGFyZ2V0ID0gKHRyYW5zaXRpb24gPSBzZWxlY3RUcmFuc2l0aW9uKHRhcmdldCwgaW5zdGFuY2UsIG1lc3NhZ2UpKS50YXJnZXQ7XG4gICAgICAgICAgICAvLyBjb25jYXRlbmF0ZSBiZWhhdmlvdXIgYmVmb3JlIGFuZCBhZnRlciBqdW5jdGlvbnNcbiAgICAgICAgICAgIG9uVHJhdmVyc2UucHVzaCh0cmFuc2l0aW9uLm9uVHJhdmVyc2UpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGV4ZWN1dGUgdGhlIHRyYW5zaXRpb24gYmVoYXZpb3VyXG4gICAgICAgIG9uVHJhdmVyc2UuaW52b2tlKG1lc3NhZ2UsIGluc3RhbmNlKTtcbiAgICAgICAgLy8gcHJvY2VzcyBkeW5hbWljIGNvbmRpdGlvbmFsIGJyYW5jaGVzXG4gICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0IGluc3RhbmNlb2YgU3RhdGVKUy5Qc2V1ZG9TdGF0ZSAmJiB0YXJnZXQua2luZCA9PT0gU3RhdGVKUy5Qc2V1ZG9TdGF0ZUtpbmQuQ2hvaWNlKSB7XG4gICAgICAgICAgICB0cmF2ZXJzZShzZWxlY3RUcmFuc2l0aW9uKHRhcmdldCwgaW5zdGFuY2UsIG1lc3NhZ2UpLCBpbnN0YW5jZSwgbWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0ICYmIHRhcmdldCBpbnN0YW5jZW9mIFN0YXRlSlMuU3RhdGUgJiYgU3RhdGVKUy5pc0NvbXBsZXRlKHRhcmdldCwgaW5zdGFuY2UpKSB7XG4gICAgICAgICAgICAvLyB0ZXN0IGZvciBjb21wbGV0aW9uIHRyYW5zaXRpb25zXG4gICAgICAgICAgICBldmFsdWF0ZVN0YXRlKHRhcmdldCwgaW5zdGFuY2UsIHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vIHNlbGVjdCBuZXh0IGxlZyBvZiBjb21wb3NpdGUgdHJhbnNpdGlvbnMgYWZ0ZXIgY2hvaWNlIGFuZCBqdW5jdGlvbiBwc2V1ZG8gc3RhdGVzXG4gICAgZnVuY3Rpb24gc2VsZWN0VHJhbnNpdGlvbihwc2V1ZG9TdGF0ZSwgc3RhdGVNYWNoaW5lSW5zdGFuY2UsIG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBwc2V1ZG9TdGF0ZS5vdXRnb2luZy5maWx0ZXIoZnVuY3Rpb24gKHRyYW5zaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0cmFuc2l0aW9uLmd1YXJkKG1lc3NhZ2UsIHN0YXRlTWFjaGluZUluc3RhbmNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChwc2V1ZG9TdGF0ZS5raW5kID09PSBTdGF0ZUpTLlBzZXVkb1N0YXRlS2luZC5DaG9pY2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzLmxlbmd0aCAhPT0gMCA/IHJlc3VsdHNbU3RhdGVKUy5nZXRSYW5kb20oKShyZXN1bHRzLmxlbmd0aCldIDogZmluZEVsc2UocHNldWRvU3RhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIFN0YXRlSlMuY29uc29sZS5lcnJvcihcIk11bHRpcGxlIG91dGJvdW5kIHRyYW5zaXRpb24gZ3VhcmRzIHJldHVybmVkIHRydWUgYXQgXCIgKyB0aGlzICsgXCIgZm9yIFwiICsgbWVzc2FnZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzWzBdIHx8IGZpbmRFbHNlKHBzZXVkb1N0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBsb29rIGZvciBlbHNlIHRyYW5zaXRpbnMgZnJvbSBhIGp1bmN0aW9uIG9yIGNob2ljZVxuICAgIGZ1bmN0aW9uIGZpbmRFbHNlKHBzZXVkb1N0YXRlKSB7XG4gICAgICAgIHJldHVybiBwc2V1ZG9TdGF0ZS5vdXRnb2luZy5maWx0ZXIoZnVuY3Rpb24gKHRyYW5zaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0cmFuc2l0aW9uLmd1YXJkID09PSBTdGF0ZUpTLlRyYW5zaXRpb24uRmFsc2VHdWFyZDtcbiAgICAgICAgfSlbMF07XG4gICAgfVxuICAgIC8vIGZ1bmN0aW9ucyB0byByZXRyZWl2ZSBzcGVjaWYgZWxlbWVudCBiZWhhdmlvclxuICAgIGZ1bmN0aW9uIGxlYXZlKGVsZW1lbnRCZWhhdmlvcikge1xuICAgICAgICByZXR1cm4gZWxlbWVudEJlaGF2aW9yWzBdIHx8IChlbGVtZW50QmVoYXZpb3JbMF0gPSBuZXcgU3RhdGVKUy5CZWhhdmlvcigpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYmVnaW5FbnRlcihlbGVtZW50QmVoYXZpb3IpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRCZWhhdmlvclsxXSB8fCAoZWxlbWVudEJlaGF2aW9yWzFdID0gbmV3IFN0YXRlSlMuQmVoYXZpb3IoKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVuZEVudGVyKGVsZW1lbnRCZWhhdmlvcikge1xuICAgICAgICByZXR1cm4gZWxlbWVudEJlaGF2aW9yWzJdIHx8IChlbGVtZW50QmVoYXZpb3JbMl0gPSBuZXcgU3RhdGVKUy5CZWhhdmlvcigpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZW50ZXIoZWxlbWVudEJlaGF2aW9yKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3RhdGVKUy5CZWhhdmlvcihiZWdpbkVudGVyKGVsZW1lbnRCZWhhdmlvcikpLnB1c2goZW5kRW50ZXIoZWxlbWVudEJlaGF2aW9yKSk7XG4gICAgfVxuICAgIC8vIGdldCBhbGwgdGhlIHZlcnRleCBhbmNlc3RvcnMgb2YgYSB2ZXJ0ZXggKGluY2x1ZGluZyB0aGUgdmVydGV4IGl0c2VsZilcbiAgICBmdW5jdGlvbiBhbmNlc3RvcnModmVydGV4KSB7XG4gICAgICAgIHJldHVybiAodmVydGV4LnJlZ2lvbiA/IGFuY2VzdG9ycyh2ZXJ0ZXgucmVnaW9uLnN0YXRlKSA6IFtdKS5jb25jYXQodmVydGV4KTtcbiAgICB9XG4gICAgLy8gZGV0ZXJtaW5lIHRoZSB0eXBlIG9mIHRyYW5zaXRpb24gYW5kIHVzZSB0aGUgYXBwcm9wcmlhdGUgaW5pdGlsaWFzaXRpb24gbWV0aG9kXG4gICAgdmFyIEluaXRpYWxpc2VUcmFuc2l0aW9ucyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhJbml0aWFsaXNlVHJhbnNpdGlvbnMsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEluaXRpYWxpc2VUcmFuc2l0aW9ucygpIHtcbiAgICAgICAgICAgIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIEluaXRpYWxpc2VUcmFuc2l0aW9ucy5wcm90b3R5cGUudmlzaXRUcmFuc2l0aW9uID0gZnVuY3Rpb24gKHRyYW5zaXRpb24sIGJlaGF2aW91cikge1xuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb24ua2luZCA9PT0gU3RhdGVKUy5UcmFuc2l0aW9uS2luZC5JbnRlcm5hbCkge1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb24ub25UcmF2ZXJzZS5wdXNoKHRyYW5zaXRpb24udHJhbnNpdGlvbkJlaGF2aW9yKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHJhbnNpdGlvbi5raW5kID09PSBTdGF0ZUpTLlRyYW5zaXRpb25LaW5kLkxvY2FsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aXNpdExvY2FsVHJhbnNpdGlvbih0cmFuc2l0aW9uLCBiZWhhdmlvdXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2l0RXh0ZXJuYWxUcmFuc2l0aW9uKHRyYW5zaXRpb24sIGJlaGF2aW91cik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIGluaXRpYWxpc2UgaW50ZXJuYWwgdHJhbnNpdGlvbnM6IHRoZXNlIGRvIG5vdCBsZWF2ZSB0aGUgc291cmNlIHN0YXRlXG4gICAgICAgIEluaXRpYWxpc2VUcmFuc2l0aW9ucy5wcm90b3R5cGUudmlzaXRMb2NhbFRyYW5zaXRpb24gPSBmdW5jdGlvbiAodHJhbnNpdGlvbiwgYmVoYXZpb3VyKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5vblRyYXZlcnNlLnB1c2goZnVuY3Rpb24gKG1lc3NhZ2UsIGluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldEFuY2VzdG9ycyA9IGFuY2VzdG9ycyh0cmFuc2l0aW9uLnRhcmdldCksXG4gICAgICAgICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAgIC8vIGZpbmQgdGhlIGZpcnN0IGluYWN0aXZlIGVsZW1lbnQgaW4gdGhlIHRhcmdldCBhbmNlc3RyeVxuICAgICAgICAgICAgICAgIHdoaWxlIChTdGF0ZUpTLmlzQWN0aXZlKHRhcmdldEFuY2VzdG9yc1tpXSwgaW5zdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICsraTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZXhpdCB0aGUgYWN0aXZlIHNpYmxpbmdcbiAgICAgICAgICAgICAgICBsZWF2ZShiZWhhdmlvdXIoaW5zdGFuY2UuZ2V0Q3VycmVudCh0YXJnZXRBbmNlc3RvcnNbaV0ucmVnaW9uKSkpLmludm9rZShtZXNzYWdlLCBpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgLy8gcGVyZm9ybSB0aGUgdHJhbnNpdGlvbiBhY3Rpb247XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbi50cmFuc2l0aW9uQmVoYXZpb3IuaW52b2tlKG1lc3NhZ2UsIGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAvLyBlbnRlciB0aGUgdGFyZ2V0IGFuY2VzdHJ5XG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPCB0YXJnZXRBbmNlc3RvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNhc2NhZGVFbGVtZW50RW50cnkodHJhbnNpdGlvbiwgYmVoYXZpb3VyLCB0YXJnZXRBbmNlc3RvcnNbaSsrXSwgdGFyZ2V0QW5jZXN0b3JzW2ldLCBmdW5jdGlvbiAoYmVoYXZpb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yLmludm9rZShtZXNzYWdlLCBpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyB0cmlnZ2VyIGNhc2NhZGVcbiAgICAgICAgICAgICAgICBlbmRFbnRlcihiZWhhdmlvdXIodHJhbnNpdGlvbi50YXJnZXQpKS5pbnZva2UobWVzc2FnZSwgaW5zdGFuY2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIGluaXRpYWxpc2UgZXh0ZXJuYWwgdHJhbnNpdGlvbnM6IHRoZXNlIGFyZSBhYnJpdGFyaWx5IGNvbXBsZXhcbiAgICAgICAgSW5pdGlhbGlzZVRyYW5zaXRpb25zLnByb3RvdHlwZS52aXNpdEV4dGVybmFsVHJhbnNpdGlvbiA9IGZ1bmN0aW9uICh0cmFuc2l0aW9uLCBiZWhhdmlvdXIpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2VBbmNlc3RvcnMgPSBhbmNlc3RvcnModHJhbnNpdGlvbi5zb3VyY2UpLFxuICAgICAgICAgICAgICAgIHRhcmdldEFuY2VzdG9ycyA9IGFuY2VzdG9ycyh0cmFuc2l0aW9uLnRhcmdldCksXG4gICAgICAgICAgICAgICAgaSA9IE1hdGgubWluKHNvdXJjZUFuY2VzdG9ycy5sZW5ndGgsIHRhcmdldEFuY2VzdG9ycy5sZW5ndGgpIC0gMTtcbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCB1bmNvbW1vbiBhbmNlc3RvciAob3IgZm9yIGV4dGVybmFsIHRyYW5zaXRpb25zLCB0aGUgc291cmNlKVxuICAgICAgICAgICAgd2hpbGUgKHNvdXJjZUFuY2VzdG9yc1tpIC0gMV0gIT09IHRhcmdldEFuY2VzdG9yc1tpIC0gMV0pIHtcbiAgICAgICAgICAgICAgICAtLWk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBsZWF2ZSBzb3VyY2UgYW5jZXN0cnkgYXMgcmVxdWlyZWRcbiAgICAgICAgICAgIHRyYW5zaXRpb24ub25UcmF2ZXJzZS5wdXNoKGxlYXZlKGJlaGF2aW91cihzb3VyY2VBbmNlc3RvcnNbaV0pKSk7XG4gICAgICAgICAgICAvLyBwZXJmb3JtIHRoZSB0cmFuc2l0aW9uIGVmZmVjdFxuICAgICAgICAgICAgdHJhbnNpdGlvbi5vblRyYXZlcnNlLnB1c2godHJhbnNpdGlvbi50cmFuc2l0aW9uQmVoYXZpb3IpO1xuICAgICAgICAgICAgLy8gZW50ZXIgdGhlIHRhcmdldCBhbmNlc3RyeVxuICAgICAgICAgICAgd2hpbGUgKGkgPCB0YXJnZXRBbmNlc3RvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXNjYWRlRWxlbWVudEVudHJ5KHRyYW5zaXRpb24sIGJlaGF2aW91ciwgdGFyZ2V0QW5jZXN0b3JzW2krK10sIHRhcmdldEFuY2VzdG9yc1tpXSwgZnVuY3Rpb24gKGJlaGF2aW9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2l0aW9uLm9uVHJhdmVyc2UucHVzaChiZWhhdmlvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGNhc2NhZGVcbiAgICAgICAgICAgIHRyYW5zaXRpb24ub25UcmF2ZXJzZS5wdXNoKGVuZEVudGVyKGJlaGF2aW91cih0cmFuc2l0aW9uLnRhcmdldCkpKTtcbiAgICAgICAgfTtcbiAgICAgICAgSW5pdGlhbGlzZVRyYW5zaXRpb25zLnByb3RvdHlwZS5jYXNjYWRlRWxlbWVudEVudHJ5ID0gZnVuY3Rpb24gKHRyYW5zaXRpb24sIGJlaGF2aW91ciwgZWxlbWVudCwgbmV4dCwgdGFzaykge1xuICAgICAgICAgICAgdGFzayhiZWdpbkVudGVyKGJlaGF2aW91cihlbGVtZW50KSkpO1xuICAgICAgICAgICAgaWYgKG5leHQgJiYgZWxlbWVudCBpbnN0YW5jZW9mIFN0YXRlSlMuU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbiAocmVnaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhc2soYmVnaW5FbnRlcihiZWhhdmlvdXIocmVnaW9uKSkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVnaW9uICE9PSBuZXh0LnJlZ2lvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFzayhlbmRFbnRlcihiZWhhdmlvdXIocmVnaW9uKSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBJbml0aWFsaXNlVHJhbnNpdGlvbnM7XG4gICAgfSkoU3RhdGVKUy5WaXNpdG9yKTtcbiAgICAvLyBib290c3RyYXBzIGFsbCB0aGUgZWxlbWVudHMgd2l0aGluIGEgc3RhdGUgbWFjaGluZSBtb2RlbFxuICAgIHZhciBJbml0aWFsaXNlRWxlbWVudHMgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoSW5pdGlhbGlzZUVsZW1lbnRzLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBJbml0aWFsaXNlRWxlbWVudHMoKSB7XG4gICAgICAgICAgICBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHRoaXMuYmVoYXZpb3VycyA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIEluaXRpYWxpc2VFbGVtZW50cy5wcm90b3R5cGUuYmVoYXZpb3VyID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJlaGF2aW91cnNbZWxlbWVudC5xdWFsaWZpZWROYW1lXSB8fCAodGhpcy5iZWhhdmlvdXJzW2VsZW1lbnQucXVhbGlmaWVkTmFtZV0gPSBbXSk7XG4gICAgICAgIH07XG4gICAgICAgIEluaXRpYWxpc2VFbGVtZW50cy5wcm90b3R5cGUudmlzaXRFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGRlZXBIaXN0b3J5QWJvdmUpIHtcbiAgICAgICAgICAgIGlmIChTdGF0ZUpTLmNvbnNvbGUgIT09IGRlZmF1bHRDb25zb2xlKSB7XG4gICAgICAgICAgICAgICAgbGVhdmUodGhpcy5iZWhhdmlvdXIoZWxlbWVudCkpLnB1c2goZnVuY3Rpb24gKG1lc3NhZ2UsIGluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0ZUpTLmNvbnNvbGUubG9nKGluc3RhbmNlICsgXCIgbGVhdmUgXCIgKyBlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBiZWdpbkVudGVyKHRoaXMuYmVoYXZpb3VyKGVsZW1lbnQpKS5wdXNoKGZ1bmN0aW9uIChtZXNzYWdlLCBpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RhdGVKUy5jb25zb2xlLmxvZyhpbnN0YW5jZSArIFwiIGVudGVyIFwiICsgZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIEluaXRpYWxpc2VFbGVtZW50cy5wcm90b3R5cGUudmlzaXRSZWdpb24gPSBmdW5jdGlvbiAocmVnaW9uLCBkZWVwSGlzdG9yeUFib3ZlKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHJlZ2lvbkluaXRpYWwgPSByZWdpb24udmVydGljZXMucmVkdWNlKGZ1bmN0aW9uIChyZXN1bHQsIHZlcnRleCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2ZXJ0ZXggaW5zdGFuY2VvZiBTdGF0ZUpTLlBzZXVkb1N0YXRlICYmIHZlcnRleC5pc0luaXRpYWwoKSA/IHZlcnRleCA6IHJlc3VsdDtcbiAgICAgICAgICAgIH0sIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICByZWdpb24udmVydGljZXMuZm9yRWFjaChmdW5jdGlvbiAodmVydGV4KSB7XG4gICAgICAgICAgICAgICAgdmVydGV4LmFjY2VwdChfdGhpcywgZGVlcEhpc3RvcnlBYm92ZSB8fCByZWdpb25Jbml0aWFsICYmIHJlZ2lvbkluaXRpYWwua2luZCA9PT0gU3RhdGVKUy5Qc2V1ZG9TdGF0ZUtpbmQuRGVlcEhpc3RvcnkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBsZWF2ZSB0aGUgY3VyZW50IGFjdGl2ZSBjaGlsZCBzdGF0ZSB3aGVuIGV4aXRpbmcgdGhlIHJlZ2lvblxuICAgICAgICAgICAgbGVhdmUodGhpcy5iZWhhdmlvdXIocmVnaW9uKSkucHVzaChmdW5jdGlvbiAobWVzc2FnZSwgc3RhdGVNYWNoaW5lSW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVhdmUoX3RoaXMuYmVoYXZpb3VyKHN0YXRlTWFjaGluZUluc3RhbmNlLmdldEN1cnJlbnQocmVnaW9uKSkpLmludm9rZShtZXNzYWdlLCBzdGF0ZU1hY2hpbmVJbnN0YW5jZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIGVudGVyIHRoZSBhcHByb3ByaWF0ZSBjaGlsZCB2ZXJ0ZXggd2hlbiBlbnRlcmluZyB0aGUgcmVnaW9uXG4gICAgICAgICAgICBpZiAoZGVlcEhpc3RvcnlBYm92ZSB8fCAhcmVnaW9uSW5pdGlhbCB8fCByZWdpb25Jbml0aWFsLmlzSGlzdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgZW5kRW50ZXIodGhpcy5iZWhhdmlvdXIocmVnaW9uKSkucHVzaChmdW5jdGlvbiAobWVzc2FnZSwgc3RhdGVNYWNoaW5lSW5zdGFuY2UsIGhpc3RvcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgZW50ZXIoX3RoaXMuYmVoYXZpb3VyKGhpc3RvcnkgfHwgcmVnaW9uSW5pdGlhbC5pc0hpc3RvcnkoKSA/IHN0YXRlTWFjaGluZUluc3RhbmNlLmdldEN1cnJlbnQocmVnaW9uKSB8fCByZWdpb25Jbml0aWFsIDogcmVnaW9uSW5pdGlhbCkpLmludm9rZShtZXNzYWdlLCBzdGF0ZU1hY2hpbmVJbnN0YW5jZSwgaGlzdG9yeSB8fCByZWdpb25Jbml0aWFsLmtpbmQgPT09IFN0YXRlSlMuUHNldWRvU3RhdGVLaW5kLkRlZXBIaXN0b3J5KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZW5kRW50ZXIodGhpcy5iZWhhdmlvdXIocmVnaW9uKSkucHVzaChlbnRlcih0aGlzLmJlaGF2aW91cihyZWdpb25Jbml0aWFsKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy52aXNpdEVsZW1lbnQocmVnaW9uLCBkZWVwSGlzdG9yeUFib3ZlKTtcbiAgICAgICAgfTtcbiAgICAgICAgSW5pdGlhbGlzZUVsZW1lbnRzLnByb3RvdHlwZS52aXNpdFBzZXVkb1N0YXRlID0gZnVuY3Rpb24gKHBzZXVkb1N0YXRlLCBkZWVwSGlzdG9yeUFib3ZlKSB7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLnZpc2l0UHNldWRvU3RhdGUuY2FsbCh0aGlzLCBwc2V1ZG9TdGF0ZSwgZGVlcEhpc3RvcnlBYm92ZSk7XG4gICAgICAgICAgICAvLyBldmFsdWF0ZSBjb21wcGxldGlvbiB0cmFuc2l0aW9ucyBvbmNlIHZlcnRleCBlbnRyeSBpcyBjb21wbGV0ZVxuICAgICAgICAgICAgaWYgKHBzZXVkb1N0YXRlLmlzSW5pdGlhbCgpKSB7XG4gICAgICAgICAgICAgICAgZW5kRW50ZXIodGhpcy5iZWhhdmlvdXIocHNldWRvU3RhdGUpKS5wdXNoKGZ1bmN0aW9uIChtZXNzYWdlLCBzdGF0ZU1hY2hpbmVJbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJhdmVyc2UocHNldWRvU3RhdGUub3V0Z29pbmdbMF0sIHN0YXRlTWFjaGluZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHNldWRvU3RhdGUua2luZCA9PT0gU3RhdGVKUy5Qc2V1ZG9TdGF0ZUtpbmQuVGVybWluYXRlKSB7XG4gICAgICAgICAgICAgICAgLy8gdGVybWluYXRlIHRoZSBzdGF0ZSBtYWNoaW5lIGluc3RhbmNlIHVwb24gdHJhbnNpdGlvbiB0byBhIHRlcm1pbmF0ZSBwc2V1ZG8gc3RhdGVcbiAgICAgICAgICAgICAgICBiZWdpbkVudGVyKHRoaXMuYmVoYXZpb3VyKHBzZXVkb1N0YXRlKSkucHVzaChmdW5jdGlvbiAobWVzc2FnZSwgc3RhdGVNYWNoaW5lSW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlTWFjaGluZUluc3RhbmNlLmlzVGVybWluYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIEluaXRpYWxpc2VFbGVtZW50cy5wcm90b3R5cGUudmlzaXRTdGF0ZSA9IGZ1bmN0aW9uIChzdGF0ZSwgZGVlcEhpc3RvcnlBYm92ZSkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIC8vIE5PVEU6IG1hbnVhbGx5IGl0ZXJhdGUgb3ZlciB0aGUgY2hpbGQgcmVnaW9ucyB0byBjb250cm9sIHRoZSBzZXF1ZW5jZSBvZiBiZWhhdmlvdXJcbiAgICAgICAgICAgIHN0YXRlLnJlZ2lvbnMuZm9yRWFjaChmdW5jdGlvbiAocmVnaW9uKSB7XG4gICAgICAgICAgICAgICAgcmVnaW9uLmFjY2VwdChfdGhpcywgZGVlcEhpc3RvcnlBYm92ZSk7XG4gICAgICAgICAgICAgICAgbGVhdmUoX3RoaXMuYmVoYXZpb3VyKHN0YXRlKSkucHVzaChsZWF2ZShfdGhpcy5iZWhhdmlvdXIocmVnaW9uKSkpO1xuICAgICAgICAgICAgICAgIGVuZEVudGVyKF90aGlzLmJlaGF2aW91cihzdGF0ZSkpLnB1c2goZW50ZXIoX3RoaXMuYmVoYXZpb3VyKHJlZ2lvbikpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy52aXNpdFZlcnRleChzdGF0ZSwgZGVlcEhpc3RvcnlBYm92ZSk7XG4gICAgICAgICAgICAvLyBhZGQgdGhlIHVzZXIgZGVmaW5lZCBiZWhhdmlvdXIgd2hlbiBlbnRlcmluZyBhbmQgZXhpdGluZyBzdGF0ZXNcbiAgICAgICAgICAgIGxlYXZlKHRoaXMuYmVoYXZpb3VyKHN0YXRlKSkucHVzaChzdGF0ZS5leGl0QmVoYXZpb3IpO1xuICAgICAgICAgICAgYmVnaW5FbnRlcih0aGlzLmJlaGF2aW91cihzdGF0ZSkpLnB1c2goc3RhdGUuZW50cnlCZWhhdmlvcik7XG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHBhcmVudCByZWdpb25zIGN1cnJlbnQgc3RhdGVcbiAgICAgICAgICAgIGJlZ2luRW50ZXIodGhpcy5iZWhhdmlvdXIoc3RhdGUpKS5wdXNoKGZ1bmN0aW9uIChtZXNzYWdlLCBzdGF0ZU1hY2hpbmVJbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5yZWdpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVNYWNoaW5lSW5zdGFuY2Uuc2V0Q3VycmVudChzdGF0ZS5yZWdpb24sIHN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgSW5pdGlhbGlzZUVsZW1lbnRzLnByb3RvdHlwZS52aXNpdFN0YXRlTWFjaGluZSA9IGZ1bmN0aW9uIChzdGF0ZU1hY2hpbmUsIGRlZXBIaXN0b3J5QWJvdmUpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLnZpc2l0U3RhdGVNYWNoaW5lLmNhbGwodGhpcywgc3RhdGVNYWNoaW5lLCBkZWVwSGlzdG9yeUFib3ZlKTtcbiAgICAgICAgICAgIC8vIGluaXRpYWlzZSBhbGwgdGhlIHRyYW5zaXRpb25zIG9uY2UgYWxsIHRoZSBlbGVtZW50cyBoYXZlIGJlZW4gaW5pdGlhbGlzZWRcbiAgICAgICAgICAgIHN0YXRlTWFjaGluZS5hY2NlcHQobmV3IEluaXRpYWxpc2VUcmFuc2l0aW9ucygpLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5iZWhhdmlvdXIoZWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIGRlZmluZSB0aGUgYmVoYXZpb3VyIGZvciBpbml0aWFsaXNpbmcgYSBzdGF0ZSBtYWNoaW5lIGluc3RhbmNlXG4gICAgICAgICAgICBzdGF0ZU1hY2hpbmUub25Jbml0aWFsaXNlID0gZW50ZXIodGhpcy5iZWhhdmlvdXIoc3RhdGVNYWNoaW5lKSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBJbml0aWFsaXNlRWxlbWVudHM7XG4gICAgfSkoU3RhdGVKUy5WaXNpdG9yKTtcbiAgICB2YXIgZGVmYXVsdENvbnNvbGUgPSB7XG4gICAgICAgIGxvZzogZnVuY3Rpb24gbG9nKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25hbFBhcmFtcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICBvcHRpb25hbFBhcmFtc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgd2FybjogZnVuY3Rpb24gd2FybihtZXNzYWdlKSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9uYWxQYXJhbXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uYWxQYXJhbXNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihtZXNzYWdlKSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9uYWxQYXJhbXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uYWxQYXJhbXNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBtZXNzYWdlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgb2JqZWN0IHVzZWQgZm9yIGxvZywgd2FybmluZyBhbmQgZXJyb3IgbWVzc2FnZXNcbiAgICAgKiBAbWVtYmVyIHtJQ29uc29sZX1cbiAgICAgKi9cbiAgICBTdGF0ZUpTLmNvbnNvbGUgPSBkZWZhdWx0Q29uc29sZTtcbn0pKFN0YXRlSlMgfHwgKFN0YXRlSlMgPSB7fSkpO1xuLypcbiAqIEZpbml0ZSBzdGF0ZSBtYWNoaW5lIGxpYnJhcnlcbiAqIENvcHlyaWdodCAoYykgMjAxNC01IFN0ZWVsYnJlZXplIExpbWl0ZWRcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgYW5kIEdQTCB2MyBsaWNlbmNlc1xuICogaHR0cDovL3d3dy5zdGVlbGJyZWV6ZS5uZXQvc3RhdGUuY3NcbiAqL1xudmFyIFN0YXRlSlM7XG4oZnVuY3Rpb24gKFN0YXRlSlMpIHtcbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgYSBzdGF0ZSBtYWNoaW5lIG1vZGVsIGZvciBjb3JyZWN0bmVzcyAoc2VlIHRoZSBjb25zdHJhaW50cyBkZWZpbmVkIHdpdGhpbiB0aGUgVU1MIFN1cGVyc3RydWN0dXJlIHNwZWNpZmljYXRpb24pLlxuICAgICAqIEBmdW5jdGlvbiB2YWxpZGF0ZVxuICAgICAqIEBwYXJhbSB7U3RhdGVNYWNoaW5lfSBzdGF0ZU1hY2hpbmVNb2RlbCBUaGUgc3RhdGUgbWFjaGluZSBtb2RlbCB0byB2YWxpZGF0ZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShzdGF0ZU1hY2hpbmVNb2RlbCkge1xuICAgICAgICBzdGF0ZU1hY2hpbmVNb2RlbC5hY2NlcHQobmV3IFZhbGlkYXRvcigpKTtcbiAgICB9XG4gICAgU3RhdGVKUy52YWxpZGF0ZSA9IHZhbGlkYXRlO1xuICAgIGZ1bmN0aW9uIGFuY2VzdG9ycyh2ZXJ0ZXgpIHtcbiAgICAgICAgcmV0dXJuICh2ZXJ0ZXgucmVnaW9uID8gYW5jZXN0b3JzKHZlcnRleC5yZWdpb24uc3RhdGUpIDogW10pLmNvbmNhdCh2ZXJ0ZXgpO1xuICAgIH1cbiAgICB2YXIgVmFsaWRhdG9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKFZhbGlkYXRvciwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gVmFsaWRhdG9yKCkge1xuICAgICAgICAgICAgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgVmFsaWRhdG9yLnByb3RvdHlwZS52aXNpdFBzZXVkb1N0YXRlID0gZnVuY3Rpb24gKHBzZXVkb1N0YXRlKSB7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLnZpc2l0UHNldWRvU3RhdGUuY2FsbCh0aGlzLCBwc2V1ZG9TdGF0ZSk7XG4gICAgICAgICAgICBpZiAocHNldWRvU3RhdGUua2luZCA9PT0gU3RhdGVKUy5Qc2V1ZG9TdGF0ZUtpbmQuQ2hvaWNlIHx8IHBzZXVkb1N0YXRlLmtpbmQgPT09IFN0YXRlSlMuUHNldWRvU3RhdGVLaW5kLkp1bmN0aW9uKSB7XG4gICAgICAgICAgICAgICAgLy8gWzddIEluIGEgY29tcGxldGUgc3RhdGVtYWNoaW5lLCBhIGp1bmN0aW9uIHZlcnRleCBtdXN0IGhhdmUgYXQgbGVhc3Qgb25lIGluY29taW5nIGFuZCBvbmUgb3V0Z29pbmcgdHJhbnNpdGlvbi5cbiAgICAgICAgICAgICAgICAvLyBbOF0gSW4gYSBjb21wbGV0ZSBzdGF0ZW1hY2hpbmUsIGEgY2hvaWNlIHZlcnRleCBtdXN0IGhhdmUgYXQgbGVhc3Qgb25lIGluY29taW5nIGFuZCBvbmUgb3V0Z29pbmcgdHJhbnNpdGlvbi5cbiAgICAgICAgICAgICAgICBpZiAocHNldWRvU3RhdGUub3V0Z29pbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIFN0YXRlSlMuY29uc29sZS5lcnJvcihwc2V1ZG9TdGF0ZSArIFwiOiBcIiArIHBzZXVkb1N0YXRlLmtpbmQgKyBcIiBwc2V1ZG8gc3RhdGVzIG11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgb3V0Z29pbmcgdHJhbnNpdGlvbi5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNob2ljZSBhbmQganVuY3Rpb24gcHNldWRvIHN0YXRlIGNhbiBoYXZlIGF0IG1vc3Qgb25lIGVsc2UgdHJhbnNpdGlvblxuICAgICAgICAgICAgICAgIGlmIChwc2V1ZG9TdGF0ZS5vdXRnb2luZy5maWx0ZXIoZnVuY3Rpb24gKHRyYW5zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zaXRpb24uZ3VhcmQgPT09IFN0YXRlSlMuVHJhbnNpdGlvbi5GYWxzZUd1YXJkO1xuICAgICAgICAgICAgICAgIH0pLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgU3RhdGVKUy5jb25zb2xlLmVycm9yKHBzZXVkb1N0YXRlICsgXCI6IFwiICsgcHNldWRvU3RhdGUua2luZCArIFwiIHBzZXVkbyBzdGF0ZXMgY2Fubm90IGhhdmUgbW9yZSB0aGFuIG9uZSBFbHNlIHRyYW5zaXRpb25zLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG5vbiBjaG9pY2UvanVuY3Rpb24gcHNldWRvIHN0YXRlIG1heSBub3QgaGF2ZSBlbHNlIHRyYW5zaXRpb25zXG4gICAgICAgICAgICAgICAgaWYgKHBzZXVkb1N0YXRlLm91dGdvaW5nLmZpbHRlcihmdW5jdGlvbiAodHJhbnNpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNpdGlvbi5ndWFyZCA9PT0gU3RhdGVKUy5UcmFuc2l0aW9uLkZhbHNlR3VhcmQ7XG4gICAgICAgICAgICAgICAgfSkubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIFN0YXRlSlMuY29uc29sZS5lcnJvcihwc2V1ZG9TdGF0ZSArIFwiOiBcIiArIHBzZXVkb1N0YXRlLmtpbmQgKyBcIiBwc2V1ZG8gc3RhdGVzIGNhbm5vdCBoYXZlIEVsc2UgdHJhbnNpdGlvbnMuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocHNldWRvU3RhdGUuaXNJbml0aWFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBzZXVkb1N0YXRlLm91dGdvaW5nLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWzFdIEFuIGluaXRpYWwgdmVydGV4IGNhbiBoYXZlIGF0IG1vc3Qgb25lIG91dGdvaW5nIHRyYW5zaXRpb24uXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBbMl0gSGlzdG9yeSB2ZXJ0aWNlcyBjYW4gaGF2ZSBhdCBtb3N0IG9uZSBvdXRnb2luZyB0cmFuc2l0aW9uLlxuICAgICAgICAgICAgICAgICAgICAgICAgU3RhdGVKUy5jb25zb2xlLmVycm9yKHBzZXVkb1N0YXRlICsgXCI6IGluaXRpYWwgcHNldWRvIHN0YXRlcyBtdXN0IGhhdmUgb25lIG91dGdvaW5nIHRyYW5zaXRpb24uXCIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWzldIFRoZSBvdXRnb2luZyB0cmFuc2l0aW9uIGZyb20gYW4gaW5pdGlhbCB2ZXJ0ZXggbWF5IGhhdmUgYSBiZWhhdmlvciwgYnV0IG5vdCBhIHRyaWdnZXIgb3IgZ3VhcmQuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHNldWRvU3RhdGUub3V0Z29pbmdbMF0uZ3VhcmQgIT09IFN0YXRlSlMuVHJhbnNpdGlvbi5UcnVlR3VhcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdGF0ZUpTLmNvbnNvbGUuZXJyb3IocHNldWRvU3RhdGUgKyBcIjogaW5pdGlhbCBwc2V1ZG8gc3RhdGVzIGNhbm5vdCBoYXZlIGEgZ3VhcmQgY29uZGl0aW9uLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgVmFsaWRhdG9yLnByb3RvdHlwZS52aXNpdFJlZ2lvbiA9IGZ1bmN0aW9uIChyZWdpb24pIHtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUudmlzaXRSZWdpb24uY2FsbCh0aGlzLCByZWdpb24pO1xuICAgICAgICAgICAgLy8gWzFdIEEgcmVnaW9uIGNhbiBoYXZlIGF0IG1vc3Qgb25lIGluaXRpYWwgdmVydGV4LlxuICAgICAgICAgICAgLy8gWzJdIEEgcmVnaW9uIGNhbiBoYXZlIGF0IG1vc3Qgb25lIGRlZXAgaGlzdG9yeSB2ZXJ0ZXguXG4gICAgICAgICAgICAvLyBbM10gQSByZWdpb24gY2FuIGhhdmUgYXQgbW9zdCBvbmUgc2hhbGxvdyBoaXN0b3J5IHZlcnRleC5cbiAgICAgICAgICAgIHZhciBpbml0aWFsO1xuICAgICAgICAgICAgcmVnaW9uLnZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24gKHZlcnRleCkge1xuICAgICAgICAgICAgICAgIGlmICh2ZXJ0ZXggaW5zdGFuY2VvZiBTdGF0ZUpTLlBzZXVkb1N0YXRlICYmIHZlcnRleC5pc0luaXRpYWwoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgU3RhdGVKUy5jb25zb2xlLmVycm9yKHJlZ2lvbiArIFwiOiByZWdpb25zIG1heSBoYXZlIGF0IG1vc3Qgb25lIGluaXRpYWwgcHNldWRvIHN0YXRlLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsID0gdmVydGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBWYWxpZGF0b3IucHJvdG90eXBlLnZpc2l0U3RhdGUgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUudmlzaXRTdGF0ZS5jYWxsKHRoaXMsIHN0YXRlKTtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5yZWdpb25zLmZpbHRlcihmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUubmFtZSA9PT0gU3RhdGVKUy5SZWdpb24uZGVmYXVsdE5hbWU7XG4gICAgICAgICAgICB9KS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgU3RhdGVKUy5jb25zb2xlLmVycm9yKHN0YXRlICsgXCI6IGEgc3RhdGUgY2Fubm90IGhhdmUgbW9yZSB0aGFuIG9uZSByZWdpb24gbmFtZWQgXCIgKyBTdGF0ZUpTLlJlZ2lvbi5kZWZhdWx0TmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFZhbGlkYXRvci5wcm90b3R5cGUudmlzaXRGaW5hbFN0YXRlID0gZnVuY3Rpb24gKGZpbmFsU3RhdGUpIHtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUudmlzaXRGaW5hbFN0YXRlLmNhbGwodGhpcywgZmluYWxTdGF0ZSk7XG4gICAgICAgICAgICAvLyBbMV0gQSBmaW5hbCBzdGF0ZSBjYW5ub3QgaGF2ZSBhbnkgb3V0Z29pbmcgdHJhbnNpdGlvbnMuXG4gICAgICAgICAgICBpZiAoZmluYWxTdGF0ZS5vdXRnb2luZy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICBTdGF0ZUpTLmNvbnNvbGUuZXJyb3IoZmluYWxTdGF0ZSArIFwiOiBmaW5hbCBzdGF0ZXMgbXVzdCBub3QgaGF2ZSBvdXRnb2luZyB0cmFuc2l0aW9ucy5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBbMl0gQSBmaW5hbCBzdGF0ZSBjYW5ub3QgaGF2ZSByZWdpb25zLlxuICAgICAgICAgICAgaWYgKGZpbmFsU3RhdGUucmVnaW9ucy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICBTdGF0ZUpTLmNvbnNvbGUuZXJyb3IoZmluYWxTdGF0ZSArIFwiOiBmaW5hbCBzdGF0ZXMgbXVzdCBub3QgaGF2ZSBjaGlsZCByZWdpb25zLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFs0XSBBIGZpbmFsIHN0YXRlIGhhcyBubyBlbnRyeSBiZWhhdmlvci5cbiAgICAgICAgICAgIGlmIChmaW5hbFN0YXRlLmVudHJ5QmVoYXZpb3IuaGFzQWN0aW9ucygpKSB7XG4gICAgICAgICAgICAgICAgU3RhdGVKUy5jb25zb2xlLndhcm4oZmluYWxTdGF0ZSArIFwiOiBmaW5hbCBzdGF0ZXMgbWF5IG5vdCBoYXZlIGVudHJ5IGJlaGF2aW9yLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFs1XSBBIGZpbmFsIHN0YXRlIGhhcyBubyBleGl0IGJlaGF2aW9yLlxuICAgICAgICAgICAgaWYgKGZpbmFsU3RhdGUuZXhpdEJlaGF2aW9yLmhhc0FjdGlvbnMoKSkge1xuICAgICAgICAgICAgICAgIFN0YXRlSlMuY29uc29sZS53YXJuKGZpbmFsU3RhdGUgKyBcIjogZmluYWwgc3RhdGVzIG1heSBub3QgaGF2ZSBleGl0IGJlaGF2aW9yLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgVmFsaWRhdG9yLnByb3RvdHlwZS52aXNpdFRyYW5zaXRpb24gPSBmdW5jdGlvbiAodHJhbnNpdGlvbikge1xuICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS52aXNpdFRyYW5zaXRpb24uY2FsbCh0aGlzLCB0cmFuc2l0aW9uKTtcbiAgICAgICAgICAgIC8vIExvY2FsIHRyYW5zaXRpb24gdGFyZ2V0IHZlcnRpY2VzIG11c3QgYmUgYSBjaGlsZCBvZiB0aGUgc291cmNlIHZlcnRleFxuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb24ua2luZCA9PT0gU3RhdGVKUy5UcmFuc2l0aW9uS2luZC5Mb2NhbCkge1xuICAgICAgICAgICAgICAgIGlmIChhbmNlc3RvcnModHJhbnNpdGlvbi50YXJnZXQpLmluZGV4T2YodHJhbnNpdGlvbi5zb3VyY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBTdGF0ZUpTLmNvbnNvbGUuZXJyb3IodHJhbnNpdGlvbiArIFwiOiBsb2NhbCB0cmFuc2l0aW9uIHRhcmdldCB2ZXJ0aWNlcyBtdXN0IGJlIGEgY2hpbGQgb2YgdGhlIHNvdXJjZSBjb21wb3NpdGUgc2F0ZS5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gVmFsaWRhdG9yO1xuICAgIH0pKFN0YXRlSlMuVmlzaXRvcik7XG59KShTdGF0ZUpTIHx8IChTdGF0ZUpTID0ge30pKTtcbi8qXG4gKiBGaW5pdGUgc3RhdGUgbWFjaGluZSBsaWJyYXJ5XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtNSBTdGVlbGJyZWV6ZSBMaW1pdGVkXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGFuZCBHUEwgdjMgbGljZW5jZXNcbiAqIGh0dHA6Ly93d3cuc3RlZWxicmVlemUubmV0L3N0YXRlLmNzXG4gKi9cbi8vdmFyIG1vZHVsZSA9IG1vZHVsZTtcbm1vZHVsZS5leHBvcnRzID0gU3RhdGVKUztcblxuY2MuX1JGcG9wKCk7Il19
