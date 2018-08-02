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
        $('.link:first').click(function (){
            util.goHome();
        });
        $('.search-icon').click(function (){
            _this.searchSubmit();
        });
        $('.search-input').keyup(function (e){
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });

    },
    searchSubmit : function(){
		var keyWord = $.trim($('.search-input').val());
		if(keyWord){
            window.location.href = './list.html?keyWord='+ keyWord;
		}
	}
}

$(function(){
    page.init();
})
