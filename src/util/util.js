/**
 * @Author: zefey
 * @Date:   2018-03-02T10:58:32+08:00
 * @Last modified by:   devin
 * @Last modified time: 2018-03-27T15:13:43+08:00
 */

var Hogan = require('hogan.js');
var conf = {
	serverHost: 'http://www.zefey.com:8888',
}

var util = {
	request : function(param){
		var _this = this;
		$.ajax({
			type : param.method || 'get',
			url : param.url || '',
			dataType : param.type || 'json',
			data : param.data || '',
			success : function(res){
				if(res.status === 1){
					typeof param.success === 'function' && param.success(res.data,res.msg);
				}else if(res.status === 10){
					_this.doLogin();
				}else if(res.status === 0){
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			error : function(err){
				typeof param.error === 'function' && param.error(err.statusText);
			}
		});
	},
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	getUrlParam : function(name){
		var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ?decodeURIComponent(result[2]) : null;
	},
	renderHtml : function(htmlTemplate,data){
		var template = Hogan.compile(htmlTemplate),
			result = template.render(data);
		return result;
	},
	successTips : function(msg){
		alert(msg || '操作成功！');
	},
	errorTips : function(msg){
		alert(msg || '发生错误了喔！');
	},
	validate :function(value,type){
		var value = $.trim(value);
		if(type === 'require'){
			return !!value;
		}else if(type === 'phone'){
			return /^1\d{10}$/.test(value);
		}else if(type === 'mail'){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},
	doLogin : function(){
		window.location.href = './user-login.html?redirect='+ encodeURIComponent(window.location.href);
	},
	goHome : function(){
		window.location.href = './index.html';
	}
}

module.exports = util;