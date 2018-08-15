webpackJsonp([1],{

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);


/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

/**
 * @Author: zefey
 * @Date:   2018-03-01T14:08:49+08:00
 * @Last modified by:   devin
 * @Last modified time: 2018-03-23T15:40:13+08:00
 */

__webpack_require__(2)
__webpack_require__(3)
__webpack_require__(4)
__webpack_require__(25)

var util = __webpack_require__(0);
var Pagination = __webpack_require__(5);
var blog = __webpack_require__(1);
var templateIndex   = __webpack_require__(26);

var page = {
    data: {
        pageNum:1
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.list();
    },
    bindEvent: function(){
        var _this = this;
        //监听滚动
        $(window).scroll(function(event) {
            var scrollTopHeight = $(window).scrollTop();
            var screenHeight = window.screen.height;

            //滑动到屏幕高度的一半
            if(scrollTopHeight >= screenHeight/2){
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
    },
    list: function(){
        var _this =this;
        var reqData ={
            pageNum:this.data.pageNum
        };

        blog.list(reqData,function(res){
            var data = res.data;
            for(var i in data){
                for(var key in data[i]){
                    if(key == 'content' && data[i][key].length > 40){
                        data[i][key] = data[i][key].substring(0,40)+'...';
                    }
                }
            }
            listHtml = util.renderHtml(templateIndex, {
                list : res.data
            });

            $(".list").html(listHtml);

            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });

            //css3动画 animated.css
            $(".item").addClass("animated flipInX");
        },
        function (errMsg) {
            console.log(errMsg);
        });
    },
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.pageNum = pageNum;
                _this.list();
            }
        }));
    }
}

$(function(){
    page.init();
})


/***/ }),

/***/ 25:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

module.exports = "{{#list}}\r\n    <div class=\"item\">\r\n        <div class=\"article\">\r\n            <a class=\"article-title\" href=\"./detail.html?id={{id}}\"><h4>{{title}}</h4></a>\r\n            <p class=\"article-info\">\r\n                <span>post @ {{time}}</span>\r\n                <span>category: {{category}}</span>\r\n                <span></span>\r\n            </p>\r\n            <div class=\"article-content\">\r\n                {{content}}\r\n            </div>\r\n            <span class=\"article-link\">\r\n                <a href=\"./detail.html?id={{id}}\" class=\"link\">阅读原文>></a>\r\n            </span>\r\n        </div>\r\n    </div>\r\n{{/list}}\r\n\r\n{{^list}}\r\n{{/list}}\r\n";

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
* @Author: Rosen
* @Date:   2017-05-28 11:58:08
* @Last Modified by:   Rosen
* @Last Modified time: 2017-05-28 15:36:16
*/


__webpack_require__(6);
var util                 = __webpack_require__(0);
var templatePagination  = __webpack_require__(7);

var Pagination = function(){
    var _this = this;
    this.defaultOption = {
        container       : null,
        pageNum         : 1,
        pageRange       : 3,
        onSelectPage    : null
    };
    // 事件的处理
    $(document).on('click', '.pg-item', function(){
        var $this = $(this);
        // 对于active和disabled按钮点击，不做处理
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return;
        }
        typeof _this.option.onSelectPage === 'function'
            ? _this.option.onSelectPage($this.data('value')) : null;
    });
};
// 渲染分页组件
Pagination.prototype.render = function(userOption){
    // 合并选项
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断容器是否为合法的jquery对象
    if(!(this.option.container instanceof jQuery)){
        return;
    }
    // 判断是否只有1页
    if(this.option.pages <= 1){
        this.option.container.html('');
        return;
    }
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml());
};
// 获取分页的html, |上一页| 2 3 4 =5= 6 7 8|下一页|  5/9
Pagination.prototype.getPaginationHtml = function(){
    var html        = '',
        option      = this.option,
        pageArray   = [],
        start       = option.pageNum - option.pageRange > 0
            ? option.pageNum - option.pageRange : 1,
        end         = option.pageNum + option.pageRange < option.pages
            ? option.pageNum + option.pageRange : option.pages;
    // 上一页按钮的数据
    pageArray.push({
        name : '上一页',
        value : this.option.prePage,
        disabled : !this.option.hasPreviousPage
    });
    // 数字按钮的处理
    for(var i = start; i <= end; i++){
        pageArray.push({
            name : i,
            value : i,
            active : (i === option.pageNum)
        });
    };
    // 下一页按钮的数据
    pageArray.push({
        name : '下一页',
        value : this.option.nextPage,
        disabled : !this.option.hasNextPage
    });
    html = util.renderHtml(templatePagination, {
        pageArray   : pageArray,
        pageNum     : option.pageNum,
        pages       : option.pages
    });
    return html;
};

module.exports = Pagination;


/***/ }),

/***/ 6:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = "<div class=\"pg-content\">\n    {{#pageArray}}\n    {{#disabled}}\n        <span class=\"pg-item disabled\" data-value=\"{{value}}\">{{name}}</span>\n    {{/disabled}}\n    {{^disabled}}\n        {{#active}}\n            <span class=\"pg-item active\" data-value=\"{{value}}\">{{name}}</span>\n        {{/active}}\n        {{^active}}\n            <span class=\"pg-item\" data-value=\"{{value}}\">{{name}}</span>\n        {{/active}}\n    {{/disabled}}\n    {{/pageArray}}\n    <span class=\"pg-total\">{{pageNum}} / {{pages}}</span>\n</div>";

/***/ })

},[14]);