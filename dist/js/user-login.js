webpackJsonp([1],{

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);


/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

/**
 * @Author: zefey
 * @Date:   2018-03-01T15:22:36+08:00
 * @Last modified by:   devin
 * @Last modified time: 2018-03-27T15:17:00+08:00
 */

__webpack_require__(1);
__webpack_require__(19);
var util = __webpack_require__(0);
var _user = __webpack_require__(20);

var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.error-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.error-msg').text('');
    },
}

var page = {
    init: function(){
        this.bindEvent();
    },
    bindEvent: function(){
        var _this = this;
        $('#submit').click(function (){
            _this.submit();
        });
        $('.user-content').keyup(function (e){
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    submit: function(){
        var formData ={
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        };
        validateResult = this.formValidate(formData);
        if(validateResult.status){
            _user.login(formData,function(res){
                window.location.href = util.getUrlParam('redirect') || './index.html'
            },
            function (errMsg) {
                formError.show(errMsg);
            });
        }else{
            formError.show(validateResult.msg);
        }
    },
    formValidate : function (formData){
        var result = {
            status : false,
            msg : ''
        };
        if(!util.validate(formData.username,'require')){
            result.msg = '用户名不能为空'
            return result;
        }
        if(!util.validate(formData.password,'require')){
            result.msg = '密码不能为空'
            return result;
        }
        result.msg = '验证通过';
        result.status = true;

        return result;
    }
}

$(function(){
    page.init();
})


/***/ }),

/***/ 19:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

/**
 * @Author: devin
 * @Date:   2018-03-27T14:45:17+08:00
 * @Last modified by:
 * @Last modified time: 2018-03-28T11:07:03+08:00
 */

var util = __webpack_require__(0);

var _user = {
	login : function (userInfo, resolve , reject){
		util.request({
			url : util.getServerUrl('/user/login'),
			data : userInfo,
			method : 'POST',
			success: resolve,
			error : reject
		});
	},
    checkUsername: function(username, resolve, reject){
        util.request({
            url : util.getServerUrl('/user/check_valid.do'),
            data : {
                type : 'username',
                str : username
            },
            method : 'POST',
            success : resolve,
            error : reject
        })
    },
    register : function (userInfo, resolve , reject){
		util.request({
			url : util.getServerUrl('/user/register.do'),
			data : userInfo,
			method : 'POST',
			success: resolve,
			error : reject
		});
	},
}

module.exports = _user;


/***/ })

},[17]);