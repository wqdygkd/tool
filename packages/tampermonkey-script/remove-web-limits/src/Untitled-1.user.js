// ==UserScript==
// @namespace         https://greasyfork.org/zh-CN/users/106222-qxin-i

// @name              Remove web limits (re-modified)
// @name:en           Remove web limits (re-modified)
// @name:zh           网页限制解除(改)
// @name:zh-CN        网页限制解除(改)
// @name:ja           ウェブの規制緩和(変更)

// @author            Cat73 & iqxin (Translated by CA)
// @contributor       iqxin & CA

// @description       Pass to kill most of the site, you can lift the restrictions prohibited to copy, cut, select the text, right-click menu.
// @description:en    Pass to kill most of the site, you can lift the restrictions prohibited to copy, cut, select the text, right-click menu.
// @description:zh    通杀大部分网站,可以解除禁止复制、剪切、选择文本、右键菜单的限制。原作者cat73,因为和搜索跳转脚本冲突,遂进行了改动,改为黑名单制。
// @description:zh-CN 通杀大部分网站,可以解除禁止复制、剪切、选择文本、右键菜单的限制。原作者cat73,因为和搜索跳转脚本冲突,遂进行了改动,改为黑名单制。
// @description:zh-TW 通殺大部分網站,可以解除禁止復制、剪切、選擇文本、右鍵菜單的限制。
// @description:ja    サイトのほとんどを殺すために渡し、あなたは、コピー切り取り、テキスト、右クリックメニューを選択することは禁止の制限を解除することができます。

// @description       原作者https://www.github.com/Cat7373/,因为和搜索跳转脚本冲突,遂进行了改动
// @homepageURL       https://cat7373.github.io/remove-web-limits/
// @supportURL        https://greasyfork.org/zh-CN/scripts/28497

// @icon               data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAABpElEQVR4nO3Vv2uUQRDG8c/ebSMWqay0trATAxrUSi1S2AiWFoJYpNCgoBjURsHWJKeNRfAvsDgFixQqKdPZ2ViEiCJYBOQu8f1hEXO59713j7MUfLZ6d2a/O8vMO0OzDnin9Ku2Mjvuaw07xgSAYEVXe2indMhj92zpKJLnBhF8MDeye9hn6zbN70eRiqCw02Bra3up8BBLu1FEBxsBucXqW4csz0ULe4jorSCMuPU89boRELDMHiI6Y8V65bbCUTccc70RkaOwKLOg0IkyXa9qTjOu2LAs6NZuD86hrdTyxRNTkUqqdhXlHrngGRVEZsMpJwex9DxIZSHYclesIb65LCoHgIs66UJq6btDBZHZrPh8V6YBOX66LbOkTGckBYimBW2FVTNeuOZNyrFJ236Yl4NSy5SbVm1PDvhodqgyMledTdRlAtDzqfL9tfkwUtyaRkv9LwFj9B/w7wPycXOhqlJ0yZHKPChMi5MCiM47XhsopbVJAUHfrYbmN/EToN+02eLPfz9OYyZhFJzW1Jn3lTsxaKQjCkp52jy45r1ZvSbTb9M0d4PBozGZAAAAAElFTkSuQmCC

// @version           4.1.4(en)
// @license           LGPLv3

// @compatible        chrome Chrome_46.0.2490.86 + TamperMonkey + 脚本_1.3 测试通过
// @compatible        firefox Firefox_42.0 + GreaseMonkey + 脚本_1.2.1 测试通过
// @compatible        opera Opera_33.0.1990.115 + TamperMonkey + 脚本_1.1.3 测试通过
// @compatible        safari 未测试

// @match             *://*/*
// @exclude        *www.bilibili.com/video*
// @exclude        *www.bilibili.com/bangumi*
// @exclude        *www.panda.tv*

// @connect     eemm.me
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @run-at      document-start
// @downloadURL https://update.greasyfork.org/scripts/386908/Remove%20web%20limits%20%28re-modified%29.user.js
// @updateURL https://update.greasyfork.org/scripts/386908/Remove%20web%20limits%20%28re-modified%29.meta.js
// ==/UserScript==
(function() {
    'use strict';

    var settingData = {
        "status":1,
        "version" : 0.1,
        "message" : "啦啦啦,啦啦啦,我是卖报的小行家",
        // "position" : ["0","0","auto"],
        "positionTop":"0",
        "positionLeft":"0",
        "positionRight":"auto",
        "addBtn" : true,
        "connectToTheServer" : true,
        "waitUpload":[],
        "currentURL":"null",
        // 域名规则列表
        "rules" : {
            "rule_def": {
                "name": "default",
                "hook_eventNames": "contextmenu|select|selectstart|copy|cut|dragstart|mousemove|beforeunload",
                "unhook_eventNames": "mousedown|mouseup|keydown|keyup",
                "dom0": true,
                "hook_addEventListener": true,
                "hook_preventDefault": true,
                "hook_set_returnValue": true,
                "add_css": true
            },
            "rule_plus": {
                "name": "default",
                "hook_eventNames": "contextmenu|select|selectstart|copy|cut|dragstart|mousedown|mouseup|mousemove|beforeunload",
                "unhook_eventNames": "keydown|keyup",
                "dom0": true,
                "hook_addEventListener": true,
                "hook_preventDefault": true,
                "hook_set_returnValue": true,
                "add_css": true
            },
            "rule_zhihu": {
                "name": "default",
                "hook_eventNames": "contextmenu|select|selectstart|copy|cut|dragstart|mousemove",
                "unhook_eventNames": "keydown|keyup",
                "dom0": true,
                "hook_addEventListener": true,
                "hook_preventDefault": true,
                "hook_set_returnValue": true,
                "add_css": true
            }
        },
        "data": [
            "b.faloo.com",
            "bbs.coocaa.com",
            "book.hjsm.tom.com",
            "book.zhulang.com",
            "book.zongheng.com",
            "chokstick.com",
            "chuangshi.qq.com",
            "city.udn.com",
            "cutelisa55.pixnet.net",
            "huayu.baidu.com",
            "imac.hk",
            "life.tw",
            "luxmuscles.com",
            "news.missevan.com",
            "read.qidian.com",
            "www.15yan.com",
            "www.17k.com",
            "www.18183.com",
            "www.360doc.com",
            "www.coco01.net",
            "www.eyu.com",
            "www.hongshu.com",
            "www.hongxiu.com",
            "www.imooc.com",
            "www.jjwxc.net",
            "www.readnovel.com",
            "www.tadu.com",
            "www.xxsy.net",
            "www.z3z4.com",
            "www.zhihu.com",
            "yuedu.163.com",
            "www.ppkao.com",
            "movie.douban.com",
            "www.ruiwen.com",
            "vipreader.qidian.com",
            "www.pigai.org",
            "www.shangc.net",
            "www.sdifen.com"
        ]
    }

    var rwl_userData = null;
    var hostname = window.location.hostname;
    var btn_node = null;
    var rule = null;
    var list = null;

    // 储存名称
    var storageName = "iqxinStorageName";
    // 要处理的 event 列表
    var hook_eventNames, unhook_eventNames, eventNames;
    // 储存被 Hook 的函数
    var EventTarget_addEventListener = EventTarget.prototype.addEventListener;
    var document_addEventListener = document.addEventListener;
    var Event_preventDefault = Event.prototype.preventDefault;


    // 查看本地是否存在旧数据
    rwl_userData = GM_getValue("rwl_userData");
    if(!rwl_userData){
        rwl_userData = settingData
        // GM_setValue("rwl_userData",rwl_userData);
    }

    version_up_3_to_4();

    // 获取黑名单网站
    list = get_black_list();

    // 添加按钮
    if(rwl_userData.addBtn){
        addBtn();  // 添加
        btn_node = document.getElementById("black_node");
        setTimeout(function(){
            try {
                dragBtn()
            } catch (e) {
                console.error("dragBtn函数 报错");
            }
        },1000)
        // dragBtn();  // 增加拖动事件
    }

    // 检查是否在黑名单中
    if(check_black_list(list,hostname)){
        try {
            if(rwl_userData.addBtn){
                btn_node.checked = true;
            }
        } catch (e) {
            console.error("脚本rwl-错误：\n btn_node : %s\n%s\n脚本rwl-错误位置： btn_node.checked = true;",btn_node,e);
        } finally {
            init();
        }
    }

    // 初始化 init func
    function init() {



        // Hook set returnValue
        if(rule.hook_set_returnValue) {
            Event.prototype.__defineSetter__('returnValue', function() {
                if(this.returnValue !== true && hook_eventNames.indexOf(this.type) >= 0) {
                    this.returnValue = true;
                }
            });
        }
    }



    Date.__defineGetter__('caller', function() {
        return '2024'
    });



    // 复制到剪贴板
    function setClipboard(){
        var text_obj = window.getSelection();
        var text = text_obj.toString();
        GM_setClipboard(text);
    }

    // 部分网站采用了其他的防复制手段
    function clear(){
        // console.log("进入clear",hostname,rwl_userData.rules);
        switch (hostname){
            case "www.z3z4.com": clear_covers(".moviedownaddiv"); break;
            case "huayu.baidu.com": clear_covers("#jqContextMenu"); break;
            case "zhihu.com":
            case "www.zhihu.com": return rwl_userData.rules.rule_zhihu; break;
            case "t.bilibili.com": clear_link_bilibili(); break;
            case "www.shangc.net": return rwl_userData.rules.rule_plus; break;
        }
        return rwl_userData.rules.rule_def;
    }
    // 去除覆盖层
    function clear_covers(ele){
        var odiv = document.querySelector(ele);
        if(odiv){
            odiv.parentNode.removeChild(odiv);
        }
    }
    // b站将文字嵌套在链接中
    function clear_link_bilibili(){
        var odiv = document.querySelector(".description");
        // console.log(odiv);
        if(odiv){
            var tDiv = odiv.querySelector(".content-ellipsis");
            var aDiv = odiv.querySelector("a");
             // console.log(tDiv);
             // console.log(aDiv);
             odiv.appendChild(tDiv);
        }
    }
})();
