/**
 * @Date:   2018-03-23T14:26:03+08:00
 * @Last modified time: 2018-03-23T14:26:17+08:00
 */

require('./index.css');
var util = require('util/util.js');

var page = {
    init: function(){
        this.bindEvent();
    },
    bindEvent: function(){
        var _this = this;
        $('.js-login').click(function (){
            util.doLogin();
        });

        $('.js-register').click(function (){
            window.location.href = './user-register.html'
        });

        $('.js-logout').click(function (){
            _user.logout(function(res){
                window.location.reload();
            }, function(errMsg){
                util.errorTips(errMsg);
            })
        });

    }
}

$(function(){
    page.init();
})
