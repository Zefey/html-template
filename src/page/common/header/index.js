/**
 * @Author: zefey
 * @Date:   2018-03-23T15:35:59+08:00
 * @Last modified by:   zefey
 * @Last modified time: 2018-03-23T15:58:47+08:00
 */

require('./index.css');

var util = require('util/util.js');

var header = {
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;

        $('.logo span').click(function (){
            util.goHome();
        });

	}
}
header.init();
