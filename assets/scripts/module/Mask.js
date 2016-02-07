cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
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
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
