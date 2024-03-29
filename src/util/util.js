/**
 * @Author: zefey
 * @Date:   2018-03-02T10:58:32+08:00
 * @Last modified by:   zefey
 * @Last modified time: 2018-03-27T15:13:43+08:00
 */

var Hogan = require('hogan.js');
var conf = {
	serverHost: 'https://zefey.com'
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
					typeof param.success === 'function' && param.success(res);
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
    dateFormat: function(date){
        var year = date.getFullYear(),
            month = date.getMonth()+1,
            day = date.getDate(),
            hour = date.getHours(),
            min = date.getMinutes(),
            sec = date.getSeconds();
        return year+'-'+month+'-'+day;
    },
	doLogin : function(){
		window.location.href = './user-login.html?redirect='+ encodeURIComponent(window.location.href);
	},
	goHome : function(){
		window.location.href = './';
	},
	isScrollToPageBottom:function(){
        //文档高度
        var documentHeight = document.documentElement.offsetHeight;
        var viewPortHeight = util.getViewportSize().h;
        var scrollHeight = window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop || 0;

        return documentHeight - viewPortHeight - scrollHeight < 100;
	},
	getViewportSize:function(w){
        //使用指定的窗口， 如果不带参数则使用当前窗口
        w = w || window;

        //除了IE8及更早的版本以外，其他浏览器都能用
        if(w.innerWidth != null)
            return {w: w.innerWidth, h: w.innerHeight};

        //对标准模式下的IE（或任意浏览器）
        var d = w.document;
        if(document.compatMode == "CSS1Compat")
            return {w: d.documentElement.clientWidth, h: d.documentElement.clientHeight};

        //对怪异模式下的浏览器
        return {w: d.body.clientWidth, h: d.body.clientHeight};
    }
}

module.exports = util;
