(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeSignInShowView/HomeSignInShowView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e21dcywL2VNkaqFGvVQAXQR', 'HomeSignInShowView', __filename);
// Script/HomeScript/HomeSignInShowView/HomeSignInShowView.js

'use strict';

var signInConfigData = require('signIn');
cc.Class({
    extends: cc.Component,

    properties: {
        // 子控件的背景View
        contentView: cc.Node,

        // 签到领取按钮
        getAwardBtn: cc.Node,
        getAwardBtnSpFrames: [cc.SpriteFrame],

        // 每天签到的item
        dayItems: [cc.Node],

        // 签到领取时，弹出礼物弹窗
        getAwardShowViewPrefab: cc.Prefab
    },

    onLoad: function onLoad() {
        this.waitSignInIdx = -1;
        var self = this;
        this.node.getComponent('HomeSyncClickBgNode').onClickLightGrayBg(function () {
            self.onShowView(false, self.signInDataList, self.callback);
        });

        onfire.on("SignInDataHandle", this.getSignInData.bind(this));

        // 初始化弹窗
        this.getAwardShowView = cc.instantiate(this.getAwardShowViewPrefab);
        this.getAwardShowView.getComponent('HomeGiftFetchView').onShowView(false, "+0", null);
        this.node.addChild(this.getAwardShowView);

        this.configUseBtnSPF(false);
    },


    // 配置本类UI
    onConfigUI: function onConfigUI(signInList) {

        var isHaveGetAward = false;
        for (var i = 0; i < signInList.length; i++) {
            var dayItem = this.dayItems[i];
            var signInData = signInList[i];

            if (signInData.status == "1") {
                isHaveGetAward = true;
                this.waitSignInIdx = i;
            }
            dayItem.getComponent('HomeSignInItem').init(signInData);
        }

        this.waitSignInIdx = isHaveGetAward ? this.waitSignInIdx : -1;
        this.configUseBtnSPF(isHaveGetAward);
    },


    // 配置 领取 按钮的背景图片
    configUseBtnSPF: function configUseBtnSPF(isNotClick) {
        var normalSprite = null;
        var pressedSprite = null;
        if (isNotClick) {
            normalSprite = this.getAwardBtnSpFrames[0];
            pressedSprite = this.getAwardBtnSpFrames[1];
        } else {
            normalSprite = this.getAwardBtnSpFrames[2];
            pressedSprite = this.getAwardBtnSpFrames[2];
        }
        var button = this.getAwardBtn.getComponent(cc.Button);
        button.normalSprite = normalSprite;
        button.pressedSprite = pressedSprite;
        this.getAwardBtn.on('click', this.onGetAwardBtnClick, this);
    },


    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow           
     * @param {回调函数，在点击使用的时候回调} callback 
     */
    onShowView: function onShowView(isShow, callback) {
        this.callback = callback;

        this.node.active = isShow;
        if (isShow) {
            var moveAction = cc.moveTo(0.2, cc.p(0, 0));
            this.contentView.runAction(moveAction);

            // 获取签到数据
            this.onGetSignInData();
        } else {
            this.contentView.setPositionY(-1300);
        }
    },


    /****************************************  本类接口相关  ****************************************/
    // 获取签到数据
    onGetSignInData: function onGetSignInData() {
        cc.scn.socket.send(10601);
    },

    // 当天签到接口
    onSignIn: function onSignIn() {
        onfire.on("SignInHandle", this.getSignInCallback.bind(this));
        cc.scn.socket.send(10602);
    },


    /****************************************  本类接口回调相关  ****************************************/
    // 获取服务器返回的签到信息
    getSignInData: function getSignInData(data) {
        if (!data || !data.signList) return;
        this.onSignInDataConfig(data.signList);
    },

    // 发送签到接口后信息回调
    getSignInCallback: function getSignInCallback(data) {
        console.log("签到成功了");
        if (!data || !data.signList) return;
        this.onSignInDataConfig(data.signList);

        var currentSignInItemData = null;
        for (var i = 0; i < data.signList.length; i++) {
            if (data.signList[i] != 2) {
                currentSignInItemData = this.signInDataList[i - 1];
                break;
            }
        }

        var self = this;
        var gold = '+' + currentSignInItemData.gold;
        this.getAwardShowView.getComponent('HomeGiftFetchView').onShowView(true, gold.toString(), function () {});
    },


    // 处理 签到接口/获取签到数据接口 返回的数据
    onSignInDataConfig: function onSignInDataConfig(signInData) {
        var signInDataList = [];
        console.log("signInData == " + signInData);

        for (var i = 0; i < signInData.length; i++) {
            signInDataList.push({
                "status": signInData[i].toString(),
                "gold": signInConfigData[i].gold.toString()
            });
        }

        this.signInDataList = signInDataList;
        if (signInDataList && signInDataList.length == 7) {
            this.onConfigUI(signInDataList);
        }
    },


    /****************************************  本类事件监听  ****************************************/
    /// 关闭按钮的点击
    onCloseBtnClick: function onCloseBtnClick(event) {
        this.onShowView(false, this.signInDataList, this.callback);
    },


    /// 点击领取弹窗
    onGetAwardBtnClick: function onGetAwardBtnClick(event) {
        if (this.waitSignInIdx == -1) return;
        this.onSignIn();
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
        //# sourceMappingURL=HomeSignInShowView.js.map
        