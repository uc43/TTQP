(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeGunagBoView/HomeGuangBoItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6d214ypHIBOlpRM85wUqbdu', 'HomeGuangBoItem', __filename);
// Script/HomeScript/HomeGunagBoView/HomeGuangBoItem.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        isStart: false,
        xSpeed: 3,
        intervalX: 100,

        msgLabel: cc.Node
    },

    // onLoad () {},

    init: function init(data) {
        this.getComponent(cc.Label).string = data.sender + '：';
        this.msgLabel.getComponent(cc.Label).string = data.msg.toString();
        this.msgLabel.setPosition(cc.p(this.node.getContentSize().width, 0));

        this.onStart(true);
    },
    onStart: function onStart(isStart) {
        this.isStart = isStart;
        this.startPosition = this.node.position;
    },
    update: function update(dt) {
        if (this.isStart) {

            this.node.setPosition(cc.p(this.node.position.x - this.xSpeed, -20));

            var contentW = this.node.getContentSize().width + this.msgLabel.getContentSize().width;

            if (this.startPosition.x - this.node.position.x - contentW >= this.intervalX && this.startPosition.x - this.node.position.x - contentW < this.intervalX + this.xSpeed) {
                console.log("新广播可以出来了");
                this.node.parent.getComponent('HomeGuangBoView').onNextGuanggao();
            }
            if (this.node.position.x < -contentW) {
                console.log("可以回收回去了！");
                this.isStart = false;
                this.node.parent.getComponent('HomeGuangBoView').onRecyclingNode(this.node);
            }
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=HomeGuangBoItem.js.map
        