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
        $('.link:eq(0)').click(function (){
            util.goHome();
        });
        $('.link:eq(1)').click(function (){
            window.location.href = './list.html';
        });
        $('.link:eq(2)').click(function (){
            window.location.href = './timeline.html';
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
