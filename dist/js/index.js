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

__webpack_require__(9)
__webpack_require__(1)
__webpack_require__(15)

var util = __webpack_require__(0);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @Date:   2018-03-23T14:26:03+08:00
 * @Last modified time: 2018-03-23T14:26:17+08:00
 */

__webpack_require__(10);
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
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(16);

var content = {
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
        //监听滚动
        $(window).scroll(function(event) {
            var scrollTopHeight = $(window).scrollTop();
            //滑动到屏幕高度的一半
            if(scrollTopHeight >= window.screen.height/2){
                $("#scrollTop").fadeIn(500);
            }else{
                $("#scrollTop").fadeOut(500);
            }

        });
        //
        $(document).on('click','#scrollTop',function(event){
            if($('html').scrollTop()){
                $('html').animate( {scrollTop: 0}, 500);
                return;
            }
            if($('body').scrollTop()){
                $('body').animate( {scrollTop: 0}, 500);
            }
        });
	}
}
content.init();


/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[7]);