(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeActivityShowView/HomeActivityShowView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '94a10+UcNJMuJdPNVANziZ2', 'HomeActivityShowView', __filename);
// Script/HomeScript/HomeActivityShowView/HomeActivityShowView.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // 子控件的背景View
        contentView: cc.Node,
        // 最新活动 类型按钮
        activityBtn: cc.Node,
        // 游戏任务 类型按钮
        gameTaskBtn: cc.Node,
        // 游戏公告 类型按钮
        gonggaoBtn: cc.Node
    },

    onLoad: function onLoad() {
        //
        this.onConfigActivityTypeBtn(true, false, false);
    },


    // 配置邮件类型按钮
    onConfigActivityTypeBtn: function onConfigActivityTypeBtn(isActivity, isGameTask, isGonggao) {
        //
        this.activityBtn.getComponent('HomeSelectBtn').onStatus(isActivity);
        this.gameTaskBtn.getComponent('HomeSelectBtn').onStatus(isGameTask);
        this.gonggaoBtn.getComponent('HomeSelectBtn').onStatus(isGonggao);
    },


    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow
     */
    onShowView: function onShowView(isShow) {

        this.node.active = isShow;
        if (isShow) {
            var moveAction = cc.moveTo(0.2, cc.p(0, 0));
            this.contentView.runAction(moveAction);
        } else {
            this.contentView.setPositionY(-1300);
        }
    },


    /**
     * 类型按钮切换
     * @param {按钮事件} event 
     * @param {属性编辑器中传递过来的数据} customData 
     */
    onEmailTypeBtnClick: function onEmailTypeBtnClick(event, customData) {
        var typeIdx = parseInt(customData);

        this.itemIdx = typeIdx;

        switch (typeIdx) {
            case 0:
                this.onConfigActivityTypeBtn(true, false, false);
                break;
            case 1:
                this.onConfigActivityTypeBtn(false, true, false);
                break;
            case 2:
                this.onConfigActivityTypeBtn(false, false, true);
                break;

            default:
                break;
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
        //# sourceMappingURL=HomeActivityShowView.js.map
        