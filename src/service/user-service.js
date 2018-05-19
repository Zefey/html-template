/**
 * @Author: devin
 * @Date:   2018-03-27T14:45:17+08:00
 * @Last modified by:
 * @Last modified time: 2018-03-28T11:07:03+08:00
 */

var util = require('util/util.js');

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
