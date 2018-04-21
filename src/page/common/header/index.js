/**
 * @Author: devin
 * @Date:   2018-03-23T15:35:59+08:00
 * @Last modified by:   devin
 * @Last modified time: 2018-03-23T15:58:47+08:00
 */

require('./index.css');

var util = require('util/util.js');

var header = {
	init : function(){
		this.bindEvent();
	},
	onLoad : function(){
		var keyword = util.getUrlParm('keyword');
		if(keyword){
			$('#search-input').val(keyword);
		};
	},
	bindEvent : function(){
		var _this = this;
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		$('#search-input').keyup(function(e){
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		});
	},
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}else{
			util.goHome();
		}
	}
}
header.init();
