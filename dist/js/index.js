webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @Author: zefey
 * @Date:   2018-03-01T14:08:49+08:00
 * @Last modified by:   devin
 * @Last modified time: 2018-03-23T15:40:13+08:00
 */

__webpack_require__(1)
__webpack_require__(13)
__webpack_require__(15)

var util = __webpack_require__(0);


/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @Date:   2018-03-23T14:26:03+08:00
 * @Last modified time: 2018-03-23T14:26:17+08:00
 */

__webpack_require__(14);
var util = __webpack_require__(0);

var page = {
    init: function(){
        this.bindEvent();
    },
    bindEvent: function(){
        var _this = this;
        $('.js-login').click(function (){
            util.doLogin();
        });

        $('.js-register').click(function (){
            window.location.href = './user-register.html'
        });

        $('.js-logout').click(function (){
            _user.logout(function(res){
                window.location.reload();
            }, function(errMsg){
                util.errorTips(errMsg);
            })
        });

    }
}

$(function(){
    page.init();
})


/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @Author: devin
 * @Date:   2018-03-23T15:35:59+08:00
 * @Last modified by:   devin
 * @Last modified time: 2018-03-23T15:58:47+08:00
 */

__webpack_require__(16);

var util = __webpack_require__(0);

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


/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[7]);