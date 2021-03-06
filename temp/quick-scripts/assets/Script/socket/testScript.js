(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/socket/testScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd628fEuiTRMMoVcEAJMe3Ot', 'testScript', __filename);
// Script/socket/testScript.js

"use strict";

/**
 * 为后端提供 接口测试 
 */

var socket = require("websocketScript");
cc.Class({
    extends: cc.Component,

    properties: {
        name_edit: cc.EditBox,
        psw_edit: cc.EditBox,
        ip_edit: cc.EditBox,
        cmdid_edit: cc.EditBox,
        parm_edit: cc.EditBox
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},

    onclick: function onclick(ev, data) {

        if (data == 1) {
            // 发送
            if (this.cmdid_edit.string.length == 0) {
                console.log("输入命令ID");
                return;
            }
            if (this.parm_edit.string.length != 0) {
                cc.scn.socket.send(this.cmdid_edit.string, this.parm_edit.string);
            } else {
                cc.scn.socket.send(this.cmdid_edit.string);
            }
        } else if (data == 2) {
            // 断开
            cc.scn.socket.socket.close();
            // console.log(cc.scn.socket.socket);
        } else if (data == 3) {
            // 重连 
            cc.scn.socket = socket.connect();
        } else if (data == 4) {
            // 修改IP地址 

            host = this.ip_edit.string;
            cc.scn.socket.socket.close();
            cc.scn.socket = socket.connect();
        } else if (data == 5) {
            // 登录 
            var parm = {
                'userName': this.name_edit.string,
                'userPwd': this.psw_edit.string
            };

            cc.scn.socket.send(10102, parm);
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
        //# sourceMappingURL=testScript.js.map
        