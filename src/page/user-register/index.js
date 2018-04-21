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
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            if(!username){
                return;
            }
            _user.checkUsername(username,function(res){
                formError.hide();
            }, function(errMsg){
                formError.show(errMsg);
            })
        });
    },
    submit: function(){
        var formData ={
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val()),
            passwordComfirm : $.trim($('#passwordComfirm').val()),
            phone : $.trim($('#phone').val()),
            email : $.trim($('#email').val()),
            question : $.trim($('#question').val()),
            answer : $.trim($('#answer').val())
        };
        validateResult = this.formValidate(formData);
        if(validateResult.status){
            _user.register(formData,function(res){
                window.location.href = './result.html?type=register'
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
        if(formData.password.length < 6){
            result.msg = '密码长度不能少于6位'
            return result;
        }
        if(formData.password !== formData.passwordComfirm){
            result.msg = '两次输入的密码不一致'
            return result;
        }
        if(!util.validate(formData.phone, 'phone')){
            result.msg = '手机号格式不正确'
            return result;
        }
        if(!util.validate(formData.email, 'mail')){
            result.msg = '邮箱格式不正确'
            return result;
        }
        if(!util.validate(formData.question,'require')){
            result.msg = '密码提示问题不能为空'
            return result;
        }
        if(!util.validate(formData.answer,'require')){
            result.msg = '密码提示问题答案不能为空'
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
