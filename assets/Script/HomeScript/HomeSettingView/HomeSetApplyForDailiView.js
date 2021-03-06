// 发接口对象
var socket = require("websocketScript");

cc.Class({
    extends: cc.Component,

    properties: {
        contentView: cc.Node,

        /// 姓名输入框
        nameEditBox: cc.EditBox,
        /// 游戏ID标签
        idLabel: cc.Label,
        /// 手机号输入框
        phoneEditBox: cc.EditBox,
        /// 验证码输入框
        yanzhengmaEditBox: cc.EditBox,

        /// 验证码的提示标签
        yzmAlertText: cc.Label,
        /// 倒计时的最大数
        maxCount: 60,

        // 子级弹窗
        dailiIntroView: cc.Node,

    },

    onLoad() {
        // 是否在倒计时
        this.isRunning = false;
        // 当前倒计时的数字
        this.currentCountNum = this.maxCount;

        let ID = ttqp_global.currentUserInfo.roleId.toString();
        var count = 6 - ID.length;
        for (let i = 0; i < count; i++) {
            ID = "0" + ID;
        }
        this.idLabel.string = ID;
        this.nameEditBox.string = "";
        this.phoneEditBox.string = "";
        this.yanzhengmaEditBox.string = "";

        // 获取验证码 接口回调 配置
        onfire.on("ProjectGetVerCodeHandle", this.onGetVerCode.bind(this));
        onfire.on("HomeApplyAgentHandle", this.onApplyAgentRequest.bind(this));
        
    },

    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow       
     * @param {回调函数，在点击使用的时候回调} callback 
     */
    onShowView(isShow, callback) {
        this.callback = callback;
        this.contentView.setScale(0.8, 0.8);

        if (isShow) {
            var scaleAmin1 = cc.scaleTo(0.000001, 0.8, 0.8);
            var scaleAmin2 = cc.scaleTo(0.2, 1, 1);
            this.contentView.runAction(cc.sequence(scaleAmin1, scaleAmin2));
        } else {
            var scaleAmin = cc.scaleTo(0, 0.8, 0.8);
            this.contentView.runAction(scaleAmin);
        }
        this.node.active = isShow;
    },

    /**
     * 关闭获取验证码的倒计时
     */
    onCloseVerCodeTimer() {
        this.isRunning = false;
        this.yzmAlertText.string = "获取验证码";
        this.currentCountNum = this.maxCount;
        if (this.timer) {
            this.unschedule(this.timer);
        }
    },

    /*********************** 发送接口 ***********************/
    onVerCodeRequest() {
        let phone = this.phoneEditBox.string ? this.phoneEditBox.string : "";
        if (phone.length == 0) {
            console.log("请输入手机号码！");
        } else if (phone.length != 11) {
            console.log("请输入正确的手机号码！");
        } else {
            let params = {
                "phone": phone,
                "type": 1
            };
            cc.scn.socket.send(10905, params);
        }
    },

    /**
     * 提交申请
     */
    onCommitRequest() {
        let name = this.nameEditBox.string ? this.nameEditBox.string : "";
        let ID = this.idLabel.string;
        let phone = this.phoneEditBox.string ? this.phoneEditBox.string : "";
        let code = this.yanzhengmaEditBox.string ? this.yanzhengmaEditBox.string : "";
        if (!(name.length >=2 && name.length <=4)) {
            console.log("请输入正确的姓名");
        } else if (phone.length != 11) {
            console.log("请输入正确的手机号码");
        } else if (code.length != 6) {
            console.log("请输入正确的验证码");
        } else {
            let params = {
                "ID": ID,
                "name": name,
                "phone": phone,
                "code": code,
            };
            cc.scn.socket.send(10903, params);
        }
    },

    /*********************** 接口回调 ***********************/
    /**
     * 获取验证码接口
     */
    onGetVerCode(data) {
        if (this.node.active == false) return;
        
        this.isRunning = true;
        this.yzmAlertText.string = this.currentCountNum + "s";

        this.timer = function () {
            if (this.currentCountNum > 0) {
                this.currentCountNum--;
                this.yzmAlertText.string = this.currentCountNum + "s";
            } else {
                // 关闭获取验证码的定时器
                this.onCloseVerCodeTimer();
            }
        }
        this.schedule(this.timer, 1)
    },

    /**
     * 提交申请代理
     */
    onApplyAgentRequest(data) {
        //
        console.log(data);

        // 关掉窗口
        this.onShowView(false, this.callback);
        // 关闭获取验证码的定时器
        this.onCloseVerCodeTimer();
        if (this.callback) {
            this.callback();
        }
    },

    /**
     * 功能按钮点击事件
     */
    onMenusBtnClick(event, customData) {
        let itemIdx = parseInt(customData);
        switch (itemIdx) {
            case 0: {   // 确定
                // 提交申请
                this.onCommitRequest();
            }
                break;
            case 1: {   // 取消
                this.onShowView(false, this.callback);
                // 关闭获取验证码的定时器
                this.onCloseVerCodeTimer();
            }
                break;
            case 2: {   // 获取验证码
                if (!this.isRunning) {
                    // 发送获取验证码接口
                    this.onVerCodeRequest();
                }
            }
                break;
            case 3: {   // 代理说明
                this.dailiIntroView.getComponent('HomeSetDailiIntroView').onShowView(true, () => {
                    //
                });
            }
                break;

            default:
                break;
        }
    },

    /**
     * 点击关闭按钮
     */
    onCloseBtnClick(event) {
        // 关闭获取验证码的定时器
        this.onCloseVerCodeTimer();
        this.onShowView(false, this.callback);
    },
});
