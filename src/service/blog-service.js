/**
 * @Author: zefey
 * @Date:   2018-03-27T14:45:17+08:00
 * @Last modified by:
 * @Last modified time: 2018-03-28T11:07:03+08:00
 */

var util = require('util/util.js');

var blog = {
    list : function (reqData, resolve , reject){
		util.request({
			url : util.getServerUrl('/blog'),
			data : reqData,
			method : 'GET',
			success: resolve,
			error : reject
		});
	},
    rank : function (reqData, resolve , reject){
		util.request({
			url : util.getServerUrl('/blog/rank'),
			data : reqData,
			method : 'GET',
			success: resolve,
			error : reject
		});
	},
	category : function (reqData, resolve , reject){
		util.request({
			url : util.getServerUrl('/blog/category'),
			data : reqData,
			method : 'GET',
			success: resolve,
			error : reject
		});
	},
    label: function(reqData, resolve, reject){
        util.request({
            url : util.getServerUrl('/blog/label'),
            data : reqData,
            method : 'GET',
            success : resolve,
            error : reject
        })
    },
    detail: function(reqData, resolve, reject){
        util.request({
            url : util.getServerUrl('/blog/detail'),
            data : reqData,
            method : 'GET',
            success : resolve,
            error : reject
        })
    },
    timeline: function(reqData, resolve, reject){
        util.request({
            url : util.getServerUrl('/blog/timeline'),
            data : reqData,
            method : 'GET',
            success : resolve,
            error : reject
        })
    }
}

module.exports = blog;
