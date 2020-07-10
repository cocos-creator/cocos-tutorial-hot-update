window.__require = function t(e, i, n) {
function a(o, r) {
if (!i[o]) {
if (!e[o]) {
var c = o.split("/");
c = c[c.length - 1];
if (!e[c]) {
var u = "function" == typeof __require && __require;
if (!r && u) return u(c, !0);
if (s) return s(c, !0);
throw new Error("Cannot find module '" + o + "'");
}
o = c;
}
var d = i[o] = {
exports: {}
};
e[o][0].call(d.exports, function(t) {
return a(e[o][1][t] || t);
}, d, d.exports, t, e, i, n);
}
return i[o].exports;
}
for (var s = "function" == typeof __require && __require, o = 0; o < n.length; o++) a(n[o]);
return a;
}({
ActorRenderer: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "1a792KO87NBg7vCCIp1jq+j", "ActorRenderer");
var n = t("Game"), a = t("Types"), s = t("Utils"), o = a.ActorPlayingState;
cc.Class({
extends: cc.Component,
properties: {
playerInfo: {
default: null,
type: cc.Node
},
stakeOnTable: {
default: null,
type: cc.Node
},
cardInfo: {
default: null,
type: cc.Node
},
cardPrefab: {
default: null,
type: cc.Prefab
},
anchorCards: {
default: null,
type: cc.Node
},
spPlayerName: {
default: null,
type: cc.Sprite
},
labelPlayerName: {
default: null,
type: cc.Label
},
labelTotalStake: {
default: null,
type: cc.Label
},
spPlayerPhoto: {
default: null,
type: cc.Sprite
},
spCountdown: {
default: null,
type: cc.Sprite
},
labelStakeOnTable: {
default: null,
type: cc.Label
},
spChips: {
default: [],
type: cc.Sprite
},
labelCardInfo: {
default: null,
type: cc.Label
},
spCardInfo: {
default: null,
type: cc.Sprite
},
animFX: {
default: null,
type: cc.Node
},
cardSpace: 0
},
onLoad: function() {},
init: function(t, e, i, a, s) {
this.actor = this.getComponent("Actor");
this.sgCountdown = null;
this.turnDuration = a;
this.playerInfo.position = e;
this.stakeOnTable.position = i;
this.labelPlayerName.string = t.name;
this.updateTotalStake(t.gold);
var o = t.photoIdx % 5;
this.spPlayerPhoto.spriteFrame = n.instance.assetMng.playerPhotos[o];
this.animFX = this.animFX.getComponent("FXPlayer");
this.animFX.init();
this.animFX.show(!1);
this.cardInfo.active = !1;
this.progressTimer = this.initCountdown();
if (s) {
this.spCardInfo.getComponent("SideSwitcher").switchSide();
this.spPlayerName.getComponent("SideSwitcher").switchSide();
}
},
initDealer: function() {
this.actor = this.getComponent("Actor");
this.animFX = this.animFX.getComponent("FXPlayer");
this.animFX.init();
this.animFX.show(!1);
},
updateTotalStake: function(t) {
this.labelTotalStake.string = "$" + t;
},
initCountdown: function() {
var t = n.instance.assetMng.texCountdown.getTexture();
this.sgCountdown = new _ccsg.Sprite(t);
var e = new cc.ProgressTimer(this.sgCountdown);
e.setName("progressTimer");
e.setMidpoint(cc.v2(.5, .5));
e.setType(cc.ProgressTimer.Type.RADIAL);
this.playerInfo._sgNode.addChild(e);
e.setPosition(cc.v2(0, 0));
e.setPercentage(0);
return e;
},
startCountdown: function() {
if (this.progressTimer) {
var t = cc.progressFromTo(this.turnDuration, 0, 100);
this.progressTimer.runAction(t);
}
},
resetCountdown: function() {
if (this.progressTimer) {
this.progressTimer.stopAllActions();
this.progressTimer.setPercentage(0);
}
},
playBlackJackFX: function() {
this.animFX.playFX("blackjack");
},
playBustFX: function() {
this.animFX.playFX("bust");
},
onDeal: function(t, e) {
var i = cc.instantiate(this.cardPrefab).getComponent("Card");
this.anchorCards.addChild(i.node);
i.init(t);
i.reveal(e);
var n = cc.v2(0, 0), a = this.actor.cards.length - 1, s = cc.v2(this.cardSpace * a, 0);
i.node.setPosition(n);
var o = cc.moveTo(.5, s), r = cc.callFunc(this._onDealEnd, this, this.cardSpace * a);
i.node.runAction(cc.sequence(o, r));
},
_onDealEnd: function(t, e) {
this.resetCountdown();
this.actor.state === o.Normal && this.startCountdown();
this.updatePoint();
this._updatePointPos(e);
},
onReset: function() {
this.cardInfo.active = !1;
this.anchorCards.removeAllChildren();
this._resetChips();
},
onRevealHoldCard: function() {
cc.find("cardPrefab", this.anchorCards).getComponent("Card").reveal(!0);
this.updateState();
},
updatePoint: function() {
this.cardInfo.active = !0;
this.labelCardInfo.string = this.actor.bestPoint;
switch (this.actor.hand) {
case a.Hand.BlackJack:
this.animFX.show(!0);
this.animFX.playFX("blackjack");
break;

case a.Hand.FiveCard:
}
},
_updatePointPos: function(t) {
this.cardInfo.x = t + 50;
},
showStakeChips: function(t) {
var e = this.spChips, i = 0;
t > 5e4 ? i = 5 : t > 25e3 ? i = 4 : t > 1e4 ? i = 3 : t > 5e3 ? i = 2 : t > 0 && (i = 1);
for (var n = 0; n < i; ++n) e[n].enabled = !0;
},
_resetChips: function() {
for (var t = 0; t < this.spChips.length; ++t) this.spChips.enabled = !1;
},
updateState: function() {
switch (this.actor.state) {
case o.Normal:
this.cardInfo.active = !0;
this.spCardInfo.spriteFrame = n.instance.assetMng.texCardInfo;
this.updatePoint();
break;

case o.Bust:
var t = s.getMinMaxPoint(this.actor.cards).min;
this.labelCardInfo.string = "爆牌(" + t + ")";
this.spCardInfo.spriteFrame = n.instance.assetMng.texBust;
this.cardInfo.active = !0;
this.animFX.show(!0);
this.animFX.playFX("bust");
this.resetCountdown();
break;

case o.Stand:
var e = s.getMinMaxPoint(this.actor.cards).max;
this.labelCardInfo.string = "停牌(" + e + ")";
this.spCardInfo.spriteFrame = n.instance.assetMng.texCardInfo;
this.resetCountdown();
}
}
});
cc._RF.pop();
}, {
Game: "Game",
Types: "Types",
Utils: "Utils"
} ],
Actor: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "7d008dTf6xB2Z0wCAdzh1Rx", "Actor");
var n = t("Types"), a = t("Utils"), s = n.ActorPlayingState;
cc.Class({
extends: cc.Component,
properties: {
cards: {
default: [],
serializable: !1,
visible: !1
},
holeCard: {
default: null,
serializable: !1,
visible: !1
},
bestPoint: {
get: function() {
return a.getMinMaxPoint(this.cards).max;
}
},
hand: {
get: function() {
var t = this.cards.length;
this.holeCard && ++t;
return t >= 5 ? n.Hand.FiveCard : 2 === t && 21 === this.bestPoint ? n.Hand.BlackJack : n.Hand.Normal;
}
},
canReport: {
get: function() {
return this.hand !== n.Hand.Normal;
},
visible: !1
},
renderer: {
default: null,
type: cc.Node
},
state: {
default: s.Normal,
notify: function(t) {
this.state !== t && this.renderer.updateState();
},
type: s,
serializable: !1
}
},
init: function() {
this.ready = !0;
this.renderer = this.getComponent("ActorRenderer");
},
addCard: function(t) {
this.cards.push(t);
this.renderer.onDeal(t, !0);
var e = this.holeCard ? [ this.holeCard ].concat(this.cards) : this.cards;
a.isBust(e) && (this.state = s.Bust);
},
addHoleCard: function(t) {
this.holeCard = t;
this.renderer.onDeal(t, !1);
},
stand: function() {
this.state = s.Stand;
},
revealHoldCard: function() {
if (this.holeCard) {
this.cards.unshift(this.holeCard);
this.holeCard = null;
this.renderer.onRevealHoldCard();
}
},
report: function() {
this.state = s.Report;
},
reset: function() {
this.cards = [];
this.holeCard = null;
this.reported = !1;
this.state = s.Normal;
this.renderer.onReset();
}
});
cc._RF.pop();
}, {
Types: "Types",
Utils: "Utils"
} ],
AssetMng: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "54522LcoVpPHbrqYgwp/1Qm", "AssetMng");
cc.Class({
extends: cc.Component,
properties: {
texBust: {
default: null,
type: cc.SpriteFrame
},
texCardInfo: {
default: null,
type: cc.SpriteFrame
},
texCountdown: {
default: null,
type: cc.SpriteFrame
},
texBetCountdown: {
default: null,
type: cc.SpriteFrame
},
playerPhotos: {
default: [],
type: cc.SpriteFrame
}
}
});
cc._RF.pop();
}, {} ],
AudioMng: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "01ca4tStvVH+JmZ5TNcmuAu", "AudioMng");
cc.Class({
extends: cc.Component,
properties: {
winAudio: {
default: null,
type: cc.AudioClip
},
loseAudio: {
default: null,
type: cc.AudioClip
},
cardAudio: {
default: null,
type: cc.AudioClip
},
buttonAudio: {
default: null,
type: cc.AudioClip
},
chipsAudio: {
default: null,
type: cc.AudioClip
},
bgm: {
default: null,
type: cc.AudioClip
}
},
playMusic: function() {
cc.audioEngine.playMusic(this.bgm, !0);
},
pauseMusic: function() {
cc.audioEngine.pauseMusic();
},
resumeMusic: function() {
cc.audioEngine.resumeMusic();
},
_playSFX: function(t) {
cc.audioEngine.playEffect(t, !1);
},
playWin: function() {
this._playSFX(this.winAudio);
},
playLose: function() {
this._playSFX(this.loseAudio);
},
playCard: function() {
this._playSFX(this.cardAudio);
},
playChips: function() {
this._playSFX(this.chipsAudio);
},
playButton: function() {
this._playSFX(this.buttonAudio);
}
});
cc._RF.pop();
}, {} ],
Bet: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "28f38yToT1Pw7NgyeCvRxDC", "Bet");
var n = t("Game");
cc.Class({
extends: cc.Component,
properties: {
chipPrefab: {
default: null,
type: cc.Prefab
},
btnChips: {
default: [],
type: cc.Node
},
chipValues: {
default: [],
type: "Integer"
},
anchorChipToss: {
default: null,
type: cc.Node
}
},
init: function() {
this._registerBtns();
},
_registerBtns: function() {
for (var t = this, e = function(e) {
t.btnChips[i].on("touchstart", function(i) {
n.instance.addStake(t.chipValues[e]) && t.playAddChip();
}, this);
}, i = 0; i < t.btnChips.length; ++i) e(i);
},
playAddChip: function() {
var t = cc.v2(2 * (Math.random() - .5) * 50, 2 * (Math.random() - .5) * 50), e = cc.instantiate(this.chipPrefab);
this.anchorChipToss.addChild(e);
e.setPosition(t);
e.getComponent("TossChip").play();
},
resetChips: function() {
n.instance.resetStake();
n.instance.info.enabled = !1;
this.resetTossedChips();
},
resetTossedChips: function() {
this.anchorChipToss.removeAllChildren();
}
});
cc._RF.pop();
}, {
Game: "Game"
} ],
ButtonScaler: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "a171dSnCXFMRIqs1IWdvgWM", "ButtonScaler");
cc.Class({
extends: cc.Component,
properties: {
pressedScale: 1,
transDuration: 0
},
onLoad: function() {
var t = this, e = cc.find("Menu/AudioMng") || cc.find("Game/AudioMng");
e && (e = e.getComponent("AudioMng"));
t.initScale = this.node.scale;
t.button = t.getComponent(cc.Button);
t.scaleDownAction = cc.scaleTo(t.transDuration, t.pressedScale);
t.scaleUpAction = cc.scaleTo(t.transDuration, t.initScale);
function i(e) {
this.stopAllActions();
this.runAction(t.scaleUpAction);
}
this.node.on("touchstart", function(i) {
this.stopAllActions();
e && e.playButton();
this.runAction(t.scaleDownAction);
}, this.node);
this.node.on("touchend", i, this.node);
this.node.on("touchcancel", i, this.node);
}
});
cc._RF.pop();
}, {} ],
Card: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "ab67e5QkiVCBZ3DIMlWhiAt", "Card");
cc.Class({
extends: cc.Component,
properties: {
point: {
default: null,
type: cc.Label
},
suit: {
default: null,
type: cc.Sprite
},
mainPic: {
default: null,
type: cc.Sprite
},
cardBG: {
default: null,
type: cc.Sprite
},
redTextColor: cc.Color.WHITE,
blackTextColor: cc.Color.WHITE,
texFrontBG: {
default: null,
type: cc.SpriteFrame
},
texBackBG: {
default: null,
type: cc.SpriteFrame
},
texFaces: {
default: [],
type: cc.SpriteFrame
},
texSuitBig: {
default: [],
type: cc.SpriteFrame
},
texSuitSmall: {
default: [],
type: cc.SpriteFrame
}
},
init: function(t) {
var e = t.point > 10;
this.mainPic.spriteFrame = e ? this.texFaces[t.point - 10 - 1] : this.texSuitBig[t.suit - 1];
this.point.string = t.pointName;
t.isRedSuit ? this.point.node.color = this.redTextColor : this.point.node.color = this.blackTextColor;
this.suit.spriteFrame = this.texSuitSmall[t.suit - 1];
},
reveal: function(t) {
this.point.node.active = t;
this.suit.node.active = t;
this.mainPic.node.active = t;
this.cardBG.spriteFrame = t ? this.texFrontBG : this.texBackBG;
}
});
cc._RF.pop();
}, {} ],
CounterTest: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "b0926/aIatATYgTuL0RyW/q", "CounterTest");
cc.Class({
extends: cc.Component,
properties: {
target: {
default: null,
type: cc.Label
}
},
onLoad: function() {
this.target.node.color = cc.Color.GREEN;
},
update: function(t) {}
});
cc._RF.pop();
}, {} ],
Dealer: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "ce2dfoqEulHCLjS1Z9xPN7t", "Dealer");
var n = t("Actor"), a = t("Utils");
cc.Class({
extends: n,
properties: {
bestPoint: {
get: function() {
var t = this.holeCard ? [ this.holeCard ].concat(this.cards) : this.cards;
return a.getMinMaxPoint(t).max;
},
override: !0
}
},
init: function() {
this._super();
this.renderer.initDealer();
},
wantHit: function() {
var e = t("Game"), i = t("Types"), n = this.bestPoint;
if (21 === n) return !1;
if (n <= 11) return !0;
var a = e.instance.player;
switch (e.instance._getPlayerResult(a, this)) {
case i.Outcome.Win:
return !0;

case i.Outcome.Lose:
return !1;
}
return this.bestPoint < 17;
}
});
cc._RF.pop();
}, {
Actor: "Actor",
Game: "Game",
Types: "Types",
Utils: "Utils"
} ],
Decks: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "17024G0JFpHcLI5GREbF8VN", "Decks");
var n = t("Types");
function a(t) {
this._numberOfDecks = t;
this._cardIds = new Array(52 * t);
this.reset();
}
a.prototype.reset = function() {
this._cardIds.length = 52 * this._numberOfDecks;
for (var t = 0, e = n.Card.fromId, i = 0; i < this._numberOfDecks; ++i) for (var a = 0; a < 52; ++a) {
this._cardIds[t] = e(a);
++t;
}
};
a.prototype.draw = function() {
var t = this._cardIds, e = t.length;
if (0 === e) return null;
var i = Math.random() * e | 0, n = t[i], a = t[e - 1];
t[i] = a;
t.length = e - 1;
return n;
};
e.exports = a;
cc._RF.pop();
}, {
Types: "Types"
} ],
FXPlayer: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "68da2yjdGVMSYhXLN9DukIB", "FXPlayer");
cc.Class({
extends: cc.Component,
init: function() {
this.anim = this.getComponent(cc.Animation);
this.sprite = this.getComponent(cc.Sprite);
},
show: function(t) {
this.sprite.enabled = t;
},
playFX: function(t) {
this.anim.play(t);
},
hideFX: function() {
this.sprite.enabled = !1;
}
});
cc._RF.pop();
}, {} ],
Game: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "63738OONCFKHqsf4QSeJSun", "Game");
var n = t("PlayerData").players, a = t("Decks"), s = t("Types"), o = s.ActorPlayingState, r = t("game-fsm"), c = cc.Class({
extends: cc.Component,
properties: {
playerAnchors: {
default: [],
type: cc.Node
},
playerPrefab: {
default: null,
type: cc.Prefab
},
dealer: {
default: null,
type: cc.Node
},
inGameUI: {
default: null,
type: cc.Node
},
betUI: {
default: null,
type: cc.Node
},
assetMng: {
default: null,
type: cc.Node
},
audioMng: {
default: null,
type: cc.Node
},
turnDuration: 0,
betDuration: 0,
totalChipsNum: 0,
totalDiamondNum: 0,
numberOfDecks: {
default: 1,
type: "Integer"
}
},
statics: {
instance: null
},
onLoad: function() {
c.instance = this;
this.inGameUI = this.inGameUI.getComponent("InGameUI");
this.assetMng = this.assetMng.getComponent("AssetMng");
this.audioMng = this.audioMng.getComponent("AudioMng");
this.betUI = this.betUI.getComponent("Bet");
this.inGameUI.init(this.betDuration);
this.betUI.init();
this.dealer = this.dealer.getComponent("Dealer");
this.dealer.init();
this.player = null;
this.createPlayers();
this.info = this.inGameUI.resultTxt;
this.totalChips = this.inGameUI.labelTotalChips;
this.decks = new a(this.numberOfDecks);
this.fsm = r;
this.fsm.init(this);
this.updateTotalChips();
this.audioMng.playMusic();
},
addStake: function(t) {
if (this.totalChipsNum < t) {
console.log("not enough chips!");
this.info.enabled = !0;
this.info.string = "金币不足!";
return !1;
}
this.totalChipsNum -= t;
this.updateTotalChips();
this.player.addStake(t);
this.audioMng.playChips();
this.info.enabled = !1;
this.info.string = "请下注";
return !0;
},
resetStake: function() {
this.totalChipsNum += this.player.stakeNum;
this.player.resetStake();
this.updateTotalChips();
},
updateTotalChips: function() {
this.totalChips.string = this.totalChipsNum;
this.player.renderer.updateTotalStake(this.totalChipsNum);
},
createPlayers: function() {
for (var t = 0; t < 5; ++t) {
var e = cc.instantiate(this.playerPrefab), i = this.playerAnchors[t], a = t > 2;
i.addChild(e);
e.position = cc.v2(0, 0);
var s = cc.find("anchorPlayerInfo", i).getPosition(), o = cc.find("anchorStake", i).getPosition();
e.getComponent("ActorRenderer").init(n[t], s, o, this.turnDuration, a);
if (2 === t) {
this.player = e.getComponent("Player");
this.player.init();
}
}
},
hit: function() {
this.player.addCard(this.decks.draw());
this.player.state === o.Bust && this.fsm.onPlayerActed();
this.audioMng.playCard();
this.audioMng.playButton();
},
stand: function() {
this.player.stand();
this.audioMng.playButton();
this.fsm.onPlayerActed();
},
deal: function() {
this.fsm.toDeal();
this.audioMng.playButton();
},
start: function() {
this.fsm.toBet();
this.audioMng.playButton();
},
report: function() {
this.player.report();
this.fsm.onPlayerActed();
},
quitToMenu: function() {
cc.director.loadScene("menu");
},
onEnterDealState: function() {
this.betUI.resetTossedChips();
this.inGameUI.resetCountdown();
this.player.renderer.showStakeChips(this.player.stakeNum);
this.player.addCard(this.decks.draw());
var t = this.decks.draw();
this.dealer.addHoleCard(t);
this.player.addCard(this.decks.draw());
this.dealer.addCard(this.decks.draw());
this.audioMng.playCard();
this.fsm.onDealed();
},
onPlayersTurnState: function(t) {
t && this.inGameUI.showGameState();
},
onEnterDealersTurnState: function() {
for (;this.dealer.state === o.Normal; ) this.dealer.wantHit() ? this.dealer.addCard(this.decks.draw()) : this.dealer.stand();
this.fsm.onDealerActed();
},
onEndState: function(t) {
if (t) {
this.dealer.revealHoldCard();
this.inGameUI.showResultState();
switch (this._getPlayerResult(this.player, this.dealer)) {
case s.Outcome.Win:
this.info.string = "You Win";
this.audioMng.pauseMusic();
this.audioMng.playWin();
this.totalChipsNum += this.player.stakeNum;
var e = this.player.stakeNum;
!this.player.state === s.ActorPlayingState.Report && (this.player.hand === s.Hand.BlackJack ? e *= 1.5 : e *= 2);
this.totalChipsNum += e;
this.updateTotalChips();
break;

case s.Outcome.Lose:
this.info.string = "You Lose";
this.audioMng.pauseMusic();
this.audioMng.playLose();
break;

case s.Outcome.Tie:
this.info.string = "Draw";
this.totalChipsNum += this.player.stakeNum;
this.updateTotalChips();
}
}
this.info.enabled = t;
},
onBetState: function(t) {
if (t) {
this.decks.reset();
this.player.reset();
this.dealer.reset();
this.info.string = "请下注";
this.inGameUI.showBetState();
this.inGameUI.startCountdown();
this.audioMng.resumeMusic();
}
this.info.enabled = t;
},
_getPlayerResult: function(t, e) {
var i = s.Outcome;
return t.state === o.Bust ? i.Lose : e.state === o.Bust ? i.Win : t.state === o.Report ? i.Win : t.hand > e.hand ? i.Win : t.hand < e.hand ? i.Lose : t.bestPoint === e.bestPoint ? i.Tie : t.bestPoint < e.bestPoint ? i.Lose : i.Win;
}
});
cc._RF.pop();
}, {
Decks: "Decks",
PlayerData: "PlayerData",
Types: "Types",
"game-fsm": "game-fsm"
} ],
HotUpdate: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "e390cpl5vpL54CRkH0xI8Ul", "HotUpdate");
var n = t("../UI/UpdatePanel"), a = JSON.stringify({
packageUrl: "http://192.168.50.220:5555/tutorial-hot-update/remote-assets/",
remoteManifestUrl: "http://192.168.50.220:5555/tutorial-hot-update/remote-assets/project.manifest",
remoteVersionUrl: "http://192.168.50.220:5555/tutorial-hot-update/remote-assets/version.manifest",
version: "1.10",
assets: {
"src/cocos2d-jsb.js": {
size: 3341465,
md5: "fafdde66bd0a81d1e096799fb8b7af95"
},
"src/project.dev.js": {
size: 97814,
md5: "ed7f5acd411a09d4d298db800b873b00"
},
"src/settings.js": {
size: 3849,
md5: "deb03998a4cfb8f8b468fba8575cb1c9"
},
"res/import/03/0379fb962.json": {
size: 1107,
md5: "d102d0f14ed6b6cb42cc28d88b3b9069"
},
"res/import/0c/0cd5de143.json": {
size: 80883,
md5: "f06347880038a1381043ed505d6f8a9a"
},
"res/import/0d/0d756af45.json": {
size: 10137,
md5: "02dc8b795e79b9fd62e00d4a2c70c8c1"
},
"res/import/0d/0dc6a4e59.json": {
size: 14970,
md5: "a500f696892df6869341dff5f31b1a33"
},
"res/import/41/4128b78b-00ae-4d8a-ae35-4e5ca5c5cde9.json": {
size: 76,
md5: "3f79d93ce8d42b186ecd43d868c8d023"
},
"res/import/49/49539cb0-3893-459a-b310-7cc1b7f6d335.json": {
size: 72,
md5: "8a36388cda7c3773b5bf7a53d8824535"
},
"res/import/9e/9e2ae507-fae5-4511-940b-f2e46f81b790.json": {
size: 74,
md5: "98f6b1d93a4ee3a1f2074be9ce00fbb2"
},
"res/raw-assets/0e/0ed8cf6e-8c04-4569-8d17-626a26e1099f.png": {
size: 4665,
md5: "9e8bf9af30ac7a9ea9d3b72f37a193e1"
},
"res/raw-assets/13/137d1ca6-e90c-440b-9fa2-4b9ffff569f7.png": {
size: 1627,
md5: "75060291e24294abd6a52553fa22317e"
},
"res/raw-assets/15/15d5f3f0-f965-4c00-945b-d2c8faee78b6.png": {
size: 3840,
md5: "cb525edab8063a845e6bd1e9d29b8cde"
},
"res/raw-assets/19/19509bb1-dc08-4cbf-ab8f-2460e207265c.png": {
size: 9638,
md5: "6e159c9cc1b971d3921bc8908071a70b"
},
"res/raw-assets/26/26e9a867-3d2f-4981-8a33-82d440de7aff.png": {
size: 6417,
md5: "5c139729708dd26bd461bcd3e8201823"
},
"res/raw-assets/2d/2ddfe005-2129-41d8-aeec-2b1f51f02962.png": {
size: 2290,
md5: "874dccfd88108a9f0188bda59c5df183"
},
"res/raw-assets/34/3459ab36-782c-4c4e-8aef-7280aff8b272.png": {
size: 18969,
md5: "3a810a636f3779b357e854155eafa4b6"
},
"res/raw-assets/36/36b6ea73-ff48-430e-a0c7-0e5e8defe341.png": {
size: 2711,
md5: "e64625aeb59a1de225e718a7126634ad"
},
"res/raw-assets/39/394bac82-54fb-472f-a27f-b5107821bfb8.png": {
size: 1641,
md5: "049d2201d7d99fc6dbdb017d8d8bd9b8"
},
"res/raw-assets/3c/3cedb8b4-8532-4037-a00e-b8d3e0013158.png": {
size: 94313,
md5: "a2e763866c1bdd6b189be69f3d37eedd"
},
"res/raw-assets/41/4128b78b-00ae-4d8a-ae35-4e5ca5c5cde9.manifest": {
size: 6358,
md5: "c1d18879851e567545ea04bf135a325f"
},
"res/raw-assets/49/49539cb0-3893-459a-b310-7cc1b7f6d335.mp3": {
size: 971644,
md5: "f45ec6666f06b729d8c0461bc89d4b94"
},
"res/raw-assets/4e/4e06c7f1-72ac-4e4e-90de-683e16905156.png": {
size: 2406,
md5: "5f0c28e0eed7ec0cb75e45f5937dd7c6"
},
"res/raw-assets/50/50da5486-dfa1-46d2-9d4f-686eb5527c1a.png": {
size: 6911,
md5: "51cf32529c923146f06019a58398c98d"
},
"res/raw-assets/52/5245e25c-010c-45fb-84a3-f3bce95793e7.png": {
size: 3963,
md5: "0f050ba45e09986b3d785b7b23ffcc1e"
},
"res/raw-assets/6d/6de06a23-d0de-4766-a9e1-a0314136d62e.png": {
size: 10878,
md5: "9f89eec7a1b0f615a3c1bab0857aefff"
},
"res/raw-assets/70/700faa17-11a6-46cd-aeb5-d6900bc264f8.png": {
size: 3765,
md5: "878e89a0a3e02b13beee9f3274f2ca39"
},
"res/raw-assets/71/71561142-4c83-4933-afca-cb7a17f67053.png": {
size: 1050,
md5: "c06a93f5f1a8a1c6edc4fd8b52e96cbf"
},
"res/raw-assets/80/8071df9d-029b-40e8-98f3-8eab08dbf6ca.png": {
size: 25205,
md5: "f688777a92fba11bfe85c3061a4476e5"
},
"res/raw-assets/82/82fe58d4-ae13-4806-9a41-2e73902ea811.png": {
size: 24298,
md5: "b807df8ffcb540f3dd20db75ac95b73b"
},
"res/raw-assets/83/83cc2086-d713-47a0-8d86-a8d6068b6258.png": {
size: 3782,
md5: "9827ce705349caa604e1aba1d53b0fd9"
},
"res/raw-assets/96/96e3e293-4e36-426d-a0a6-eb8d025c0d5b.png": {
size: 15379,
md5: "d6ce47aed38348a1ea0f003fa0063079"
},
"res/raw-assets/97/97a6316c-7fcb-4ffe-9045-35625bc6abf6.png": {
size: 2187,
md5: "f3f41b4c0783a751e561f1b84d91a70b"
},
"res/raw-assets/97/97bb9c9c-5568-4419-af04-4ed5a2969a02.png": {
size: 10370,
md5: "48ab94f1c34b0e9a047297cab1aeabc4"
},
"res/raw-assets/99/99170b0b-d210-46f1-b213-7d9e3f23098a.png": {
size: 1177,
md5: "d1118d133683bb4227d5e60c79c846b7"
},
"res/raw-assets/99/99acc716-33df-4c4c-879d-cc3407f0cd8c.png": {
size: 9754,
md5: "23e7221934021f3fbe6c6a52b023ded8"
},
"res/raw-assets/9e/9e2ae507-fae5-4511-940b-f2e46f81b790.mp3": {
size: 3179,
md5: "90d17b1a25200c90e292d9a3748c9fec"
},
"res/raw-assets/ac/ac11439d-3758-49f5-8728-81ed22c1ed96.png": {
size: 11935,
md5: "c20ae4a74c42b2aed28bb8c9247eb5d5"
},
"res/raw-assets/ae/ae4e2188-2b7b-42a9-85e1-8fb987600b04.png": {
size: 634171,
md5: "07b03f7145b75579708ae05ea2a2c029"
},
"res/raw-assets/af/afe329a6-e85e-46a0-98ed-8a34e128907b.png": {
size: 2209,
md5: "30ae2fe844c7c53f1d00291051230607"
},
"res/raw-assets/b2/b2037f34-04ff-4351-b9da-5be4bb557017.png": {
size: 1530,
md5: "bb96dacb8b09e0443d83462cc7b20095"
},
"res/raw-assets/b4/b43ff3c2-02bb-4874-81f7-f2dea6970f18.png": {
size: 1114,
md5: "83fcc9912e01ae5411c357651fb8b1cf"
},
"res/raw-assets/c3/c39ea496-96eb-4dc5-945a-e7c919b77c21.png": {
size: 2548,
md5: "ae7a04af25e238a5478170759b55a7ba"
},
"res/raw-assets/ca/caaaf9ff-5036-4232-a8a7-88b80b2e4c88.png": {
size: 1829,
md5: "94d761c4626df88053787f17fa09914d"
},
"res/raw-assets/ca/cacafa85-d8e9-4716-bcdb-7eba457e409c.png": {
size: 7380,
md5: "e6bb0f4d041257653f07da2dfe1edd09"
},
"res/raw-assets/ce/ce6d2de9-7056-4ba8-a1b1-40b00bb6f469.png": {
size: 10982,
md5: "52aa0df577edafe11de1cfdb44422895"
},
"res/raw-assets/cf/cfef78f1-c8df-49b7-8ed0-4c953ace2621.png": {
size: 1140,
md5: "a4b5953dffeb145b4b70072d91c4052b"
},
"res/raw-assets/d5/d5dfe6a8-eb19-4aae-a74f-83b71eaa57dc.png": {
size: 8755,
md5: "aeb1055ced334ce20fe030579e187494"
},
"res/raw-assets/da/da3e556f-1bce-4c31-87dc-897ea2d788e2.png": {
size: 11636,
md5: "d81124346c110eb1377f7b56346b31e4"
},
"res/raw-assets/e8/e851e89b-faa2-4484-bea6-5c01dd9f06e2.png": {
size: 1082,
md5: "90cf45d059d0408bec327f66eae5764c"
},
"res/raw-assets/ec/ec244ee5-6f1f-4920-9b69-d4df0e78ec2d.png": {
size: 55581,
md5: "68fdff7430b1b02f3a6e76bea92c6372"
},
"res/raw-assets/fc/fccc4d85-6ad4-496d-9b33-ea76e69da132.png": {
size: 82257,
md5: "df4359cdcb956f52f2e5b4ef777bbb7d"
}
},
searchPaths: []
});
cc.Class({
extends: cc.Component,
properties: {
panel: n,
manifestUrl: {
type: cc.Asset,
default: null
},
updateUI: cc.Node,
_updating: !1,
_canRetry: !1,
_storagePath: ""
},
checkCb: function(t) {
cc.log("Code: " + t.getEventCode());
switch (t.getEventCode()) {
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
this.panel.info.string = "New version found, please try to update. (" + this._am.getTotalBytes() + ")";
this.panel.checkBtn.active = !1;
this.panel.fileProgress.progress = 0;
this.panel.byteProgress.progress = 0;
break;

default:
return;
}
this._am.setEventCallback(null);
this._checkListener = null;
this._updating = !1;
},
updateCb: function(t) {
var e = !1, i = !1;
switch (t.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
this.panel.info.string = "No local manifest file found, hot update skipped.";
i = !0;
break;

case jsb.EventAssetsManager.UPDATE_PROGRESSION:
this.panel.byteProgress.progress = t.getPercent();
this.panel.fileProgress.progress = t.getPercentByFile();
this.panel.fileLabel.string = t.getDownloadedFiles() + " / " + t.getTotalFiles();
this.panel.byteLabel.string = t.getDownloadedBytes() + " / " + t.getTotalBytes();
var n = t.getMessage();
n && (this.panel.info.string = "Updated file: " + n);
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
this.panel.info.string = "Fail to download manifest file, hot update skipped.";
i = !0;
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
this.panel.info.string = "Already up to date with the latest remote version.";
i = !0;
break;

case jsb.EventAssetsManager.UPDATE_FINISHED:
this.panel.info.string = "Update finished. " + t.getMessage();
e = !0;
break;

case jsb.EventAssetsManager.UPDATE_FAILED:
this.panel.info.string = "Update failed. " + t.getMessage();
this.panel.retryBtn.active = !0;
this._updating = !1;
this._canRetry = !0;
break;

case jsb.EventAssetsManager.ERROR_UPDATING:
this.panel.info.string = "Asset update error: " + t.getAssetId() + ", " + t.getMessage();
break;

case jsb.EventAssetsManager.ERROR_DECOMPRESS:
this.panel.info.string = t.getMessage();
}
if (i) {
this._am.setEventCallback(null);
this._updateListener = null;
this._updating = !1;
}
if (e) {
this._am.setEventCallback(null);
this._updateListener = null;
var a = jsb.fileUtils.getSearchPaths(), s = this._am.getLocalManifest().getSearchPaths();
console.log(JSON.stringify(s));
Array.prototype.unshift.apply(a, s);
cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(a));
jsb.fileUtils.setSearchPaths(a);
cc.audioEngine.stopAll();
cc.game.restart();
}
},
loadCustomManifest: function() {
if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
var t = new jsb.Manifest(a, this._storagePath);
this._am.loadLocalManifest(t, this._storagePath);
this.panel.info.string = "Using custom manifest";
}
},
retry: function() {
if (!this._updating && this._canRetry) {
this.panel.retryBtn.active = !1;
this._canRetry = !1;
this.panel.info.string = "Retry failed Assets...";
this._am.downloadFailedAssets();
}
},
checkUpdate: function() {
if (this._updating) this.panel.info.string = "Checking or updating ..."; else {
if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
var t = this.manifestUrl.nativeUrl;
cc.loader.md5Pipe && (t = cc.loader.md5Pipe.transformURL(t));
this._am.loadLocalManifest(t);
}
if (this._am.getLocalManifest() && this._am.getLocalManifest().isLoaded()) {
this._am.setEventCallback(this.checkCb.bind(this));
this._am.checkUpdate();
this._updating = !0;
} else this.panel.info.string = "Failed to load local manifest ...";
}
},
hotUpdate: function() {
if (this._am && !this._updating) {
this._am.setEventCallback(this.updateCb.bind(this));
if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
var t = this.manifestUrl.nativeUrl;
cc.loader.md5Pipe && (t = cc.loader.md5Pipe.transformURL(t));
this._am.loadLocalManifest(t);
}
this._failCount = 0;
this._am.update();
this.panel.updateBtn.active = !1;
this._updating = !0;
}
},
show: function() {
!1 === this.updateUI.active && (this.updateUI.active = !0);
},
onLoad: function() {
if (cc.sys.isNative) {
this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "blackjack-remote-asset";
cc.log("Storage path for remote asset : " + this._storagePath);
this.versionCompareHandle = function(t, e) {
cc.log("JS Custom Version Compare: version A is " + t + ", version B is " + e);
for (var i = t.split("."), n = e.split("."), a = 0; a < i.length; ++a) {
var s = parseInt(i[a]), o = parseInt(n[a] || 0);
if (s !== o) return s - o;
}
return n.length > i.length ? -1 : 0;
};
this._am = new jsb.AssetsManager("", this._storagePath, this.versionCompareHandle);
var t = this.panel;
this._am.setVerifyCallback(function(e, i) {
var n = i.compressed, a = i.md5, s = i.path;
i.size;
if (n) {
t.info.string = "Verification passed : " + s;
return !0;
}
t.info.string = "Verification passed : " + s + " (" + a + ")";
return !0;
});
this.panel.info.string = "Hot update is ready, please check or directly update.";
if (cc.sys.os === cc.sys.OS_ANDROID) {
this._am.setMaxConcurrentTask(2);
this.panel.info.string = "Max concurrent tasks count have been limited to 2";
}
this.panel.fileProgress.progress = 0;
this.panel.byteProgress.progress = 0;
}
},
onDestroy: function() {
if (this._updateListener) {
this._am.setEventCallback(null);
this._updateListener = null;
}
}
});
cc._RF.pop();
}, {
"../UI/UpdatePanel": "UpdatePanel"
} ],
InGameUI: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "f192efroeFEyaxtfh8TVXYz", "InGameUI");
var n = t("Game");
cc.Class({
extends: cc.Component,
properties: {
panelChat: {
default: null,
type: cc.Node
},
panelSocial: {
default: null,
type: cc.Node
},
betStateUI: {
default: null,
type: cc.Node
},
gameStateUI: {
default: null,
type: cc.Node
},
resultTxt: {
default: null,
type: cc.Label
},
betCounter: {
default: null,
type: cc.Node
},
btnStart: {
default: null,
type: cc.Node
},
labelTotalChips: {
default: null,
type: cc.Label
}
},
init: function(t) {
this.panelChat.active = !1;
this.panelSocial.active = !1;
this.resultTxt.enabled = !1;
this.betStateUI.active = !0;
this.gameStateUI.active = !1;
this.btnStart.active = !1;
this.betDuration = t;
this.progressTimer = this.initCountdown();
},
initCountdown: function() {
var t = n.instance.assetMng.texBetCountdown.getTexture();
this.sgCountdown = new _ccsg.Sprite(t);
this.sgCountdown.setColor(cc.Color.BLACK);
var e = new cc.ProgressTimer(this.sgCountdown);
e.setName("progressTimer");
e.setMidpoint(cc.v2(.5, .5));
e.setType(cc.ProgressTimer.Type.RADIAL);
e.reverseDir = !0;
this.betCounter._sgNode.addChild(e);
e.setPosition(cc.v2(0, -this.betCounter.height / 2));
e.setPercentage(0);
return e;
},
startCountdown: function() {
if (this.progressTimer) {
var t = cc.progressFromTo(this.betDuration, 0, 100);
this.progressTimer.runAction(t);
}
},
resetCountdown: function() {
if (this.progressTimer) {
this.progressTimer.stopAllActions();
this.progressTimer.setPercentage(100);
}
},
showBetState: function() {
this.betStateUI.active = !0;
this.gameStateUI.active = !1;
this.btnStart.active = !1;
},
showGameState: function() {
this.betStateUI.active = !1;
this.gameStateUI.active = !0;
this.btnStart.active = !1;
},
showResultState: function() {
this.betStateUI.active = !1;
this.gameStateUI.active = !1;
this.btnStart.active = !0;
},
toggleChat: function() {
this.panelChat.active = !this.panelChat.active;
},
toggleSocial: function() {
this.panelSocial.active = !this.panelSocial.active;
},
update: function(t) {}
});
cc._RF.pop();
}, {
Game: "Game"
} ],
Mask: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "3c16c3le6hCsrtnanqK8N2W", "Mask");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.node.on("touchstart", function(t) {
t.stopPropagation();
});
this.node.on("mousedown", function(t) {
t.stopPropagation();
});
this.node.on("mousemove", function(t) {
t.stopPropagation();
});
this.node.on("mouseup", function(t) {
t.stopPropagation();
});
}
});
cc._RF.pop();
}, {} ],
Menu: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "20f60m+3RlGO7x2/ARzZ6Qc", "Menu");
cc.Class({
extends: cc.Component,
properties: {
audioMng: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.audioMng = this.audioMng.getComponent("AudioMng");
this.audioMng.playMusic();
},
playGame: function() {
cc.director.loadScene("table");
},
update: function(t) {}
});
cc._RF.pop();
}, {} ],
PlayerData: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "4f9c5eXxqhHAKLxZeRmgHDB", "PlayerData");
e.exports = {
players: [ {
name: "燃烧吧，蛋蛋儿军",
gold: 3e3,
photoIdx: 0
}, {
name: "地方政府",
gold: 2e3,
photoIdx: 1
}, {
name: "手机超人",
gold: 1500,
photoIdx: 2
}, {
name: "天灵灵，地灵灵",
gold: 500,
photoIdx: 3
}, {
name: "哟哟，切克闹",
gold: 9e3,
photoIdx: 4
}, {
name: "学姐不要死",
gold: 5e3,
photoIdx: 5
}, {
name: "提百万",
gold: 1e4,
photoIdx: 6
} ]
};
cc._RF.pop();
}, {} ],
Player: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "226a2AvzRpHL7SJGTMy5PDX", "Player");
var n = t("Actor");
cc.Class({
extends: n,
init: function() {
this._super();
this.labelStake = this.renderer.labelStakeOnTable;
this.stakeNum = 0;
},
reset: function() {
this._super();
this.resetStake();
},
addCard: function(t) {
this._super(t);
},
addStake: function(t) {
this.stakeNum += t;
this.updateStake(this.stakeNum);
},
resetStake: function(t) {
this.stakeNum = 0;
this.updateStake(this.stakeNum);
},
updateStake: function(t) {
this.labelStake.string = t;
}
});
cc._RF.pop();
}, {
Actor: "Actor"
} ],
RankItem: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "1657ewfijBOXLq5zGqr6PvE", "RankItem");
cc.Class({
extends: cc.Component,
properties: {
spRankBG: {
default: null,
type: cc.Sprite
},
labelRank: {
default: null,
type: cc.Label
},
labelPlayerName: {
default: null,
type: cc.Label
},
labelGold: {
default: null,
type: cc.Label
},
spPlayerPhoto: {
default: null,
type: cc.Sprite
},
texRankBG: {
default: [],
type: cc.SpriteFrame
},
texPlayerPhoto: {
default: [],
type: cc.SpriteFrame
}
},
init: function(t, e) {
if (t < 3) {
this.labelRank.node.active = !1;
this.spRankBG.spriteFrame = this.texRankBG[t];
} else {
this.labelRank.node.active = !0;
this.labelRank.string = (t + 1).toString();
}
this.labelPlayerName.string = e.name;
this.labelGold.string = e.gold.toString();
this.spPlayerPhoto.spriteFrame = this.texPlayerPhoto[e.photoIdx];
},
update: function(t) {}
});
cc._RF.pop();
}, {} ],
RankList: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "fe3fcIxCFFLrKHg6s5+xRUU", "RankList");
var n = t("PlayerData").players;
cc.Class({
extends: cc.Component,
properties: {
scrollView: {
default: null,
type: cc.ScrollView
},
prefabRankItem: {
default: null,
type: cc.Prefab
},
rankCount: 0
},
onLoad: function() {
this.content = this.scrollView.content;
this.populateList();
},
populateList: function() {
for (var t = 0; t < this.rankCount; ++t) {
var e = n[t], i = cc.instantiate(this.prefabRankItem);
i.getComponent("RankItem").init(t, e);
this.content.addChild(i);
}
},
update: function(t) {}
});
cc._RF.pop();
}, {
PlayerData: "PlayerData"
} ],
SideSwitcher: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "3aae7lZKyhPqqsLD3wMKl6X", "SideSwitcher");
cc.Class({
extends: cc.Component,
properties: {
retainSideNodes: {
default: [],
type: cc.Node
}
},
switchSide: function() {
this.node.scaleX = -this.node.scaleX;
for (var t = 0; t < this.retainSideNodes.length; ++t) {
var e = this.retainSideNodes[t];
e.scaleX = -e.scaleX;
}
}
});
cc._RF.pop();
}, {} ],
TossChip: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "b4eb5Lo6U1IZ4eJWuxShCdH", "TossChip");
cc.Class({
extends: cc.Component,
properties: {
anim: {
default: null,
type: cc.Animation
}
},
play: function() {
this.anim.play("chip_toss");
}
});
cc._RF.pop();
}, {} ],
Types: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "5b633QMQxpFmYetofEvK2UD", "Types");
var n = cc.Enum({
Spade: 1,
Heart: 2,
Club: 3,
Diamond: 4
}), a = "NAN,A,2,3,4,5,6,7,8,9,10,J,Q,K".split(",");
function s(t, e) {
Object.defineProperties(this, {
point: {
value: t,
writable: !1
},
suit: {
value: e,
writable: !1
},
id: {
value: 13 * (e - 1) + (t - 1),
writable: !1
},
pointName: {
get: function() {
return a[this.point];
}
},
suitName: {
get: function() {
return n[this.suit];
}
},
isBlackSuit: {
get: function() {
return this.suit === n.Spade || this.suit === n.Club;
}
},
isRedSuit: {
get: function() {
return this.suit === n.Heart || this.suit === n.Diamond;
}
}
});
}
s.prototype.toString = function() {
return this.suitName + " " + this.pointName;
};
var o = new Array(52);
s.fromId = function(t) {
return o[t];
};
(function() {
for (var t = 1; t <= 4; t++) for (var e = 1; e <= 13; e++) {
var i = new s(e, t);
o[i.id] = i;
}
})();
var r = cc.Enum({
Normal: -1,
Stand: -1,
Report: -1,
Bust: -1
}), c = cc.Enum({
Win: -1,
Lose: -1,
Tie: -1
}), u = cc.Enum({
Normal: -1,
BlackJack: -1,
FiveCard: -1
});
e.exports = {
Suit: n,
Card: s,
ActorPlayingState: r,
Hand: u,
Outcome: c
};
cc._RF.pop();
}, {} ],
UpdatePanel: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "2db08jFZqNN+rw8vpeF4j70", "UpdatePanel");
e.exports = cc.Class({
extends: cc.Component,
properties: {
info: cc.Label,
fileProgress: cc.ProgressBar,
fileLabel: cc.Label,
byteProgress: cc.ProgressBar,
byteLabel: cc.Label,
close: cc.Node,
checkBtn: cc.Node,
retryBtn: cc.Node,
updateBtn: cc.Node
},
onLoad: function() {
this.close.on(cc.Node.EventType.TOUCH_END, function() {
this.node.parent.active = !1;
}, this);
}
});
cc._RF.pop();
}, {} ],
Utils: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "73590esk6xP9ICqhfUZalMg", "Utils");
e.exports = {
isBust: function(t) {
for (var e = 0, i = 0; i < t.length; i++) {
var n = t[i];
e += Math.min(10, n.point);
}
return e > 21;
},
getMinMaxPoint: function(t) {
for (var e = !1, i = 0, n = 0; n < t.length; n++) {
var a = t[n];
1 === a.point && (e = !0);
i += Math.min(10, a.point);
}
var s = i;
e && i + 10 <= 21 && (s += 10);
return {
min: i,
max: s
};
},
isMobile: function() {
return cc.sys.isMobile;
}
};
cc._RF.pop();
}, {} ],
"game-fsm": [ function(t, e, i) {
"use strict";
cc._RF.push(e, "6510d1SmQRMMYH8FEIA7zXq", "game-fsm");
var n, a, s, o = t("state.com");
function r(t) {
return function(e) {
return e === t;
};
}
var c = !1;
i = {
init: function(t) {
o.console = console;
a = new o.StateMachine("root");
var e = new o.PseudoState("init-root", a, o.PseudoStateKind.Initial), i = new o.State("下注", a);
s = new o.State("已开局", a);
var c = new o.State("结算", a);
e.to(i);
i.to(s).when(r("deal"));
s.to(c).when(r("end"));
c.to(i).when(r("bet"));
i.entry(function() {
t.onBetState(!0);
});
i.exit(function() {
t.onBetState(!1);
});
c.entry(function() {
t.onEndState(!0);
});
c.exit(function() {
t.onEndState(!1);
});
var u = new o.PseudoState("init 已开局", s, o.PseudoStateKind.Initial), d = new o.State("发牌", s), l = new o.State("玩家决策", s), h = new o.State("庄家决策", s);
u.to(d);
d.to(l).when(r("dealed"));
l.to(h).when(r("player acted"));
d.entry(function() {
t.onEnterDealState();
});
l.entry(function() {
t.onPlayersTurnState(!0);
});
l.exit(function() {
t.onPlayersTurnState(!1);
});
h.entry(function() {
t.onEnterDealersTurnState();
});
n = new o.StateMachineInstance("fsm");
o.initialise(a, n);
},
toDeal: function() {
this._evaluate("deal");
},
toBet: function() {
this._evaluate("bet");
},
onDealed: function() {
this._evaluate("dealed");
},
onPlayerActed: function() {
this._evaluate("player acted");
},
onDealerActed: function() {
this._evaluate("end");
},
_evaluate: function(t) {
if (c) setTimeout(function() {
o.evaluate(a, n, t);
}, 1); else {
c = !0;
o.evaluate(a, n, t);
c = !1;
}
},
_getInstance: function() {
return n;
},
_getModel: function() {
return a;
}
};
e.exports = i;
cc._RF.pop();
}, {
"state.com": "state.com"
} ],
"state.com": [ function(t, e, i) {
"use strict";
cc._RF.push(e, "71d9293mx9CFryhJvRw85ZS", "state.com");
(function(t) {
var e = function() {
function t(t) {
this.actions = [];
t && this.push(t);
}
t.prototype.push = function(e) {
Array.prototype.push.apply(this.actions, e instanceof t ? e.actions : arguments);
return this;
};
t.prototype.hasActions = function() {
return 0 !== this.actions.length;
};
t.prototype.invoke = function(t, e, i) {
void 0 === i && (i = !1);
this.actions.forEach(function(n) {
return n(t, e, i);
});
};
return t;
}();
t.Behavior = e;
})(n || (n = {}));
(function(t) {
(function(t) {
t[t.Initial = 0] = "Initial";
t[t.ShallowHistory = 1] = "ShallowHistory";
t[t.DeepHistory = 2] = "DeepHistory";
t[t.Choice = 3] = "Choice";
t[t.Junction = 4] = "Junction";
t[t.Terminate = 5] = "Terminate";
})(t.PseudoStateKind || (t.PseudoStateKind = {}));
t.PseudoStateKind;
})(n || (n = {}));
(function(t) {
(function(t) {
t[t.Internal = 0] = "Internal";
t[t.Local = 1] = "Local";
t[t.External = 2] = "External";
})(t.TransitionKind || (t.TransitionKind = {}));
t.TransitionKind;
})(n || (n = {}));
(function(t) {
var e = function() {
function t(e, i) {
this.name = e;
this.qualifiedName = i ? i.qualifiedName + t.namespaceSeparator + e : e;
}
t.prototype.toString = function() {
return this.qualifiedName;
};
t.namespaceSeparator = ".";
return t;
}();
t.Element = e;
})(n || (n = {}));
var n, a = function(t, e) {
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
function n() {
this.constructor = t;
}
n.prototype = e.prototype;
t.prototype = new n();
};
(function(t) {
var e = function(t) {
a(e, t);
function e(e, i) {
t.call(this, e, i);
this.vertices = [];
this.state = i;
this.state.regions.push(this);
this.state.getRoot().clean = !1;
}
e.prototype.getRoot = function() {
return this.state.getRoot();
};
e.prototype.accept = function(t, e, i, n) {
return t.visitRegion(this, e, i, n);
};
e.defaultName = "default";
return e;
}(t.Element);
t.Region = e;
})(n || (n = {}));
(function(t) {
var e = function(e) {
a(i, e);
function i(i, n) {
e.call(this, i, n = n instanceof t.State ? n.defaultRegion() : n);
this.outgoing = [];
this.region = n;
if (this.region) {
this.region.vertices.push(this);
this.region.getRoot().clean = !1;
}
}
i.prototype.getRoot = function() {
return this.region.getRoot();
};
i.prototype.to = function(e, i) {
void 0 === i && (i = t.TransitionKind.External);
return new t.Transition(this, e, i);
};
i.prototype.accept = function(t, e, i, n) {};
return i;
}(t.Element);
t.Vertex = e;
})(n || (n = {}));
(function(t) {
var e = function(e) {
a(i, e);
function i(i, n, a) {
void 0 === a && (a = t.PseudoStateKind.Initial);
e.call(this, i, n);
this.kind = a;
}
i.prototype.isHistory = function() {
return this.kind === t.PseudoStateKind.DeepHistory || this.kind === t.PseudoStateKind.ShallowHistory;
};
i.prototype.isInitial = function() {
return this.kind === t.PseudoStateKind.Initial || this.isHistory();
};
i.prototype.accept = function(t, e, i, n) {
return t.visitPseudoState(this, e, i, n);
};
return i;
}(t.Vertex);
t.PseudoState = e;
})(n || (n = {}));
(function(t) {
var e = function(e) {
a(i, e);
function i(i, n) {
e.call(this, i, n);
this.exitBehavior = new t.Behavior();
this.entryBehavior = new t.Behavior();
this.regions = [];
}
i.prototype.defaultRegion = function() {
return this.regions.reduce(function(e, i) {
return i.name === t.Region.defaultName ? i : e;
}, void 0) || new t.Region(t.Region.defaultName, this);
};
i.prototype.isFinal = function() {
return 0 === this.outgoing.length;
};
i.prototype.isSimple = function() {
return 0 === this.regions.length;
};
i.prototype.isComposite = function() {
return this.regions.length > 0;
};
i.prototype.isOrthogonal = function() {
return this.regions.length > 1;
};
i.prototype.exit = function(t) {
this.exitBehavior.push(t);
this.getRoot().clean = !1;
return this;
};
i.prototype.entry = function(t) {
this.entryBehavior.push(t);
this.getRoot().clean = !1;
return this;
};
i.prototype.accept = function(t, e, i, n) {
return t.visitState(this, e, i, n);
};
return i;
}(t.Vertex);
t.State = e;
})(n || (n = {}));
(function(t) {
var e = function(t) {
a(e, t);
function e(e, i) {
t.call(this, e, i);
}
e.prototype.accept = function(t, e, i, n) {
return t.visitFinalState(this, e, i, n);
};
return e;
}(t.State);
t.FinalState = e;
})(n || (n = {}));
(function(t) {
var e = function(t) {
a(e, t);
function e(e) {
t.call(this, e, void 0);
this.clean = !1;
}
e.prototype.getRoot = function() {
return this.region ? this.region.getRoot() : this;
};
e.prototype.accept = function(t, e, i, n) {
return t.visitStateMachine(this, e, i, n);
};
return e;
}(t.State);
t.StateMachine = e;
})(n || (n = {}));
(function(t) {
var e = function() {
function e(i, n, a) {
var s = this;
void 0 === a && (a = t.TransitionKind.External);
this.transitionBehavior = new t.Behavior();
this.onTraverse = new t.Behavior();
this.source = i;
this.target = n;
this.kind = n ? a : t.TransitionKind.Internal;
this.guard = i instanceof t.PseudoState ? e.TrueGuard : function(t) {
return t === s.source;
};
this.source.outgoing.push(this);
this.source.getRoot().clean = !1;
}
e.prototype.else = function() {
this.guard = e.FalseGuard;
return this;
};
e.prototype.when = function(t) {
this.guard = t;
return this;
};
e.prototype.effect = function(t) {
this.transitionBehavior.push(t);
this.source.getRoot().clean = !1;
return this;
};
e.prototype.accept = function(t, e, i, n) {
return t.visitTransition(this, e, i, n);
};
e.prototype.toString = function() {
return "[" + (this.target ? this.source + " -> " + this.target : this.source) + "]";
};
e.TrueGuard = function() {
return !0;
};
e.FalseGuard = function() {
return !1;
};
return e;
}();
t.Transition = e;
})(n || (n = {}));
(function(t) {
var e = function() {
function t() {}
t.prototype.visitElement = function(t, e, i, n) {};
t.prototype.visitRegion = function(t, e, i, n) {
var a = this, s = this.visitElement(t, e, i, n);
t.vertices.forEach(function(t) {
t.accept(a, e, i, n);
});
return s;
};
t.prototype.visitVertex = function(t, e, i, n) {
var a = this, s = this.visitElement(t, e, i, n);
t.outgoing.forEach(function(t) {
t.accept(a, e, i, n);
});
return s;
};
t.prototype.visitPseudoState = function(t, e, i, n) {
return this.visitVertex(t, e, i, n);
};
t.prototype.visitState = function(t, e, i, n) {
var a = this, s = this.visitVertex(t, e, i, n);
t.regions.forEach(function(t) {
t.accept(a, e, i, n);
});
return s;
};
t.prototype.visitFinalState = function(t, e, i, n) {
return this.visitState(t, e, i, n);
};
t.prototype.visitStateMachine = function(t, e, i, n) {
return this.visitState(t, e, i, n);
};
t.prototype.visitTransition = function(t, e, i, n) {};
return t;
}();
t.Visitor = e;
})(n || (n = {}));
(function(t) {
var e = function() {
function t(t) {
void 0 === t && (t = "unnamed");
this.last = {};
this.isTerminated = !1;
this.name = t;
}
t.prototype.setCurrent = function(t, e) {
this.last[t.qualifiedName] = e;
};
t.prototype.getCurrent = function(t) {
return this.last[t.qualifiedName];
};
t.prototype.toString = function() {
return this.name;
};
return t;
}();
t.StateMachineInstance = e;
})(n || (n = {}));
(function(t) {
t.setRandom = function(t) {
e = t;
};
t.getRandom = function() {
return e;
};
var e = function(t) {
return Math.floor(Math.random() * t);
};
})(n || (n = {}));
(function(t) {
t.isActive = function e(i, n) {
return i instanceof t.Region ? e(i.state, n) : i instanceof t.State ? !i.region || e(i.region, n) && n.getCurrent(i.region) === i : void 0;
};
})(n || (n = {}));
(function(t) {
t.isComplete = function e(i, n) {
return i instanceof t.Region ? n.getCurrent(i).isFinal() : !(i instanceof t.State) || i.regions.every(function(t) {
return e(t, n);
});
};
})(n || (n = {}));
(function(t) {
function e(i, n, a) {
void 0 === a && (a = !0);
if (n) {
a && !1 === i.clean && e(i);
t.console.log("initialise " + n);
i.onInitialise.invoke(void 0, n);
} else {
t.console.log("initialise " + i.name);
i.accept(new p(), !1);
i.clean = !0;
}
}
t.initialise = e;
t.evaluate = function(n, a, s, o) {
void 0 === o && (o = !0);
t.console.log(a + " evaluate " + s);
o && !1 === n.clean && e(n);
return !a.isTerminated && i(n, a, s);
};
function i(e, a, s) {
var o = !1;
e.regions.every(function(n) {
if (i(a.getCurrent(n), a, s)) {
o = !0;
return t.isActive(e, a);
}
return !0;
});
if (o) s !== e && t.isComplete(e, a) && i(e, a, e); else {
var r = e.outgoing.filter(function(t) {
return t.guard(s, a);
});
1 === r.length ? o = n(r[0], a, s) : r.length > 1 && t.console.error(e + ": multiple outbound transitions evaluated true for message " + s);
}
return o;
}
function n(e, a, o) {
for (var r = new t.Behavior(e.onTraverse), c = e.target; c && c instanceof t.PseudoState && c.kind === t.PseudoStateKind.Junction; ) {
c = (e = s(c, a, o)).target;
r.push(e.onTraverse);
}
r.invoke(o, a);
c && c instanceof t.PseudoState && c.kind === t.PseudoStateKind.Choice ? n(s(c, a, o), a, o) : c && c instanceof t.State && t.isComplete(c, a) && i(c, a, c);
return !0;
}
function s(e, i, n) {
var a = e.outgoing.filter(function(t) {
return t.guard(n, i);
});
if (e.kind === t.PseudoStateKind.Choice) return 0 !== a.length ? a[t.getRandom()(a.length)] : o(e);
if (!(a.length > 1)) return a[0] || o(e);
t.console.error("Multiple outbound transition guards returned true at " + this + " for " + n);
}
function o(e) {
return e.outgoing.filter(function(e) {
return e.guard === t.Transition.FalseGuard;
})[0];
}
function r(e) {
return e[0] || (e[0] = new t.Behavior());
}
function c(e) {
return e[1] || (e[1] = new t.Behavior());
}
function u(e) {
return e[2] || (e[2] = new t.Behavior());
}
function d(e) {
return new t.Behavior(c(e)).push(u(e));
}
function l(t) {
return (t.region ? l(t.region.state) : []).concat(t);
}
var h = function(e) {
a(i, e);
function i() {
e.apply(this, arguments);
}
i.prototype.visitTransition = function(e, i) {
e.kind === t.TransitionKind.Internal ? e.onTraverse.push(e.transitionBehavior) : e.kind === t.TransitionKind.Local ? this.visitLocalTransition(e, i) : this.visitExternalTransition(e, i);
};
i.prototype.visitLocalTransition = function(e, i) {
var n = this;
e.onTraverse.push(function(a, s) {
for (var o = l(e.target), c = 0; t.isActive(o[c], s); ) ++c;
r(i(s.getCurrent(o[c].region))).invoke(a, s);
e.transitionBehavior.invoke(a, s);
for (;c < o.length; ) n.cascadeElementEntry(e, i, o[c++], o[c], function(t) {
t.invoke(a, s);
});
u(i(e.target)).invoke(a, s);
});
};
i.prototype.visitExternalTransition = function(t, e) {
for (var i = l(t.source), n = l(t.target), a = Math.min(i.length, n.length) - 1; i[a - 1] !== n[a - 1]; ) --a;
t.onTraverse.push(r(e(i[a])));
t.onTraverse.push(t.transitionBehavior);
for (;a < n.length; ) this.cascadeElementEntry(t, e, n[a++], n[a], function(e) {
return t.onTraverse.push(e);
});
t.onTraverse.push(u(e(t.target)));
};
i.prototype.cascadeElementEntry = function(e, i, n, a, s) {
s(c(i(n)));
a && n instanceof t.State && n.regions.forEach(function(t) {
s(c(i(t)));
t !== a.region && s(u(i(t)));
});
};
return i;
}(t.Visitor), p = function(e) {
a(i, e);
function i() {
e.apply(this, arguments);
this.behaviours = {};
}
i.prototype.behaviour = function(t) {
return this.behaviours[t.qualifiedName] || (this.behaviours[t.qualifiedName] = []);
};
i.prototype.visitElement = function(e, i) {
if (t.console !== f) {
r(this.behaviour(e)).push(function(i, n) {
return t.console.log(n + " leave " + e);
});
c(this.behaviour(e)).push(function(i, n) {
return t.console.log(n + " enter " + e);
});
}
};
i.prototype.visitRegion = function(e, i) {
var n = this, a = e.vertices.reduce(function(e, i) {
return i instanceof t.PseudoState && i.isInitial() ? i : e;
}, void 0);
e.vertices.forEach(function(e) {
e.accept(n, i || a && a.kind === t.PseudoStateKind.DeepHistory);
});
r(this.behaviour(e)).push(function(t, i) {
return r(n.behaviour(i.getCurrent(e))).invoke(t, i);
});
i || !a || a.isHistory() ? u(this.behaviour(e)).push(function(i, s, o) {
d(n.behaviour((o || a.isHistory()) && s.getCurrent(e) || a)).invoke(i, s, o || a.kind === t.PseudoStateKind.DeepHistory);
}) : u(this.behaviour(e)).push(d(this.behaviour(a)));
this.visitElement(e, i);
};
i.prototype.visitPseudoState = function(i, a) {
e.prototype.visitPseudoState.call(this, i, a);
i.isInitial() ? u(this.behaviour(i)).push(function(t, e) {
return n(i.outgoing[0], e);
}) : i.kind === t.PseudoStateKind.Terminate && c(this.behaviour(i)).push(function(t, e) {
return e.isTerminated = !0;
});
};
i.prototype.visitState = function(t, e) {
var i = this;
t.regions.forEach(function(n) {
n.accept(i, e);
r(i.behaviour(t)).push(r(i.behaviour(n)));
u(i.behaviour(t)).push(d(i.behaviour(n)));
});
this.visitVertex(t, e);
r(this.behaviour(t)).push(t.exitBehavior);
c(this.behaviour(t)).push(t.entryBehavior);
c(this.behaviour(t)).push(function(e, i) {
t.region && i.setCurrent(t.region, t);
});
};
i.prototype.visitStateMachine = function(t, i) {
var n = this;
e.prototype.visitStateMachine.call(this, t, i);
t.accept(new h(), function(t) {
return n.behaviour(t);
});
t.onInitialise = d(this.behaviour(t));
};
return i;
}(t.Visitor), f = {
log: function(t) {
for (var e = [], i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
},
warn: function(t) {
for (var e = [], i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
},
error: function(t) {
for (var e = [], i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
throw t;
}
};
t.console = f;
})(n || (n = {}));
(function(t) {
t.validate = function(t) {
t.accept(new i());
};
function e(t) {
return (t.region ? e(t.region.state) : []).concat(t);
}
var i = function(i) {
a(n, i);
function n() {
i.apply(this, arguments);
}
n.prototype.visitPseudoState = function(e) {
i.prototype.visitPseudoState.call(this, e);
if (e.kind === t.PseudoStateKind.Choice || e.kind === t.PseudoStateKind.Junction) {
0 === e.outgoing.length && t.console.error(e + ": " + e.kind + " pseudo states must have at least one outgoing transition.");
e.outgoing.filter(function(e) {
return e.guard === t.Transition.FalseGuard;
}).length > 1 && t.console.error(e + ": " + e.kind + " pseudo states cannot have more than one Else transitions.");
} else {
0 !== e.outgoing.filter(function(e) {
return e.guard === t.Transition.FalseGuard;
}).length && t.console.error(e + ": " + e.kind + " pseudo states cannot have Else transitions.");
e.isInitial() && (1 !== e.outgoing.length ? t.console.error(e + ": initial pseudo states must have one outgoing transition.") : e.outgoing[0].guard !== t.Transition.TrueGuard && t.console.error(e + ": initial pseudo states cannot have a guard condition."));
}
};
n.prototype.visitRegion = function(e) {
i.prototype.visitRegion.call(this, e);
var n;
e.vertices.forEach(function(i) {
if (i instanceof t.PseudoState && i.isInitial()) {
n && t.console.error(e + ": regions may have at most one initial pseudo state.");
n = i;
}
});
};
n.prototype.visitState = function(e) {
i.prototype.visitState.call(this, e);
e.regions.filter(function(e) {
return e.name === t.Region.defaultName;
}).length > 1 && t.console.error(e + ": a state cannot have more than one region named " + t.Region.defaultName);
};
n.prototype.visitFinalState = function(e) {
i.prototype.visitFinalState.call(this, e);
0 !== e.outgoing.length && t.console.error(e + ": final states must not have outgoing transitions.");
0 !== e.regions.length && t.console.error(e + ": final states must not have child regions.");
e.entryBehavior.hasActions() && t.console.warn(e + ": final states may not have entry behavior.");
e.exitBehavior.hasActions() && t.console.warn(e + ": final states may not have exit behavior.");
};
n.prototype.visitTransition = function(n) {
i.prototype.visitTransition.call(this, n);
n.kind === t.TransitionKind.Local && -1 === e(n.target).indexOf(n.source) && t.console.error(n + ": local transition target vertices must be a child of the source composite sate.");
};
return n;
}(t.Visitor);
})(n || (n = {}));
e.exports = n;
cc._RF.pop();
}, {} ],
"use_v2.0.x_cc.Toggle_event": [ function(t, e, i) {
"use strict";
cc._RF.push(e, "d9e368NROhHIbdCvtgVksYq", "use_v2.0.x_cc.Toggle_event");
cc.Toggle && (cc.Toggle._triggerEventInScript_check = !0);
cc._RF.pop();
}, {} ]
}, {}, [ "use_v2.0.x_cc.Toggle_event", "Actor", "ActorRenderer", "AssetMng", "AudioMng", "Bet", "Card", "CounterTest", "Dealer", "FXPlayer", "Game", "Menu", "Player", "SideSwitcher", "TossChip", "ButtonScaler", "InGameUI", "RankItem", "RankList", "UpdatePanel", "state.com", "Decks", "HotUpdate", "Mask", "PlayerData", "Types", "Utils", "game-fsm" ]);