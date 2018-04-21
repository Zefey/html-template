/**
 * @Author: zefey
 * @Date:   2018-03-01T15:22:36+08:00
 * @Last modified by:   devin
 * @Last modified time: 2018-03-27T15:17:00+08:00
 */

require('page/common/header/index.js');
require('./index.css');
var util = require('util/util.js');
var _user = require('service/user-service.js');

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
