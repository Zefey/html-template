/**
 * @Author: zefey
 * @Date:   2018-03-01T14:08:49+08:00
 * @Last modified by:   zefey
 * @Last modified time: 2018-03-23T15:40:13+08:00
 */

require('page/common/nav/index.js')
require('page/common/header/index.js')
require('page/common/side/index.js')
require('./index.css')

var util = require('util/util.js');
var Pagination = require('util/pagination/index.js');
var blog = require('service/blog-service.js');
var templateIndex   = require('./index.string');

var page = {
    data: {
        pageNum:1,
        keyWord:'',
        categoryId:'',
        labelId:''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        var keyWord = util.getUrlParam('keyWord');
        var categoryId = util.getUrlParam('categoryId');
		var labelId = util.getUrlParam('labelId');
		if(keyWord){
            this.data.keyWord=keyWord;
			$('.search-input').val(keyWord);
		}
        if(categoryId){
            this.data.categoryId=categoryId;
		}
        if(labelId){
            this.data.labelId=labelId;
		}
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
        
        $(document).on('click','#scrollTop',function(event){
            _this.scrollToTop();
        });
    },
    scrollToTop: function(){
        if($('html').scrollTop()){
            $('html').animate( {scrollTop: 0}, 500);
            return;
        }
        if($('body').scrollTop()){
            $('body').animate( {scrollTop: 0}, 500);
        }
    },
    list: function(){
        var _this =this;
        var reqData ={
            keyWord : this.data.keyWord,
            categoryId : this.data.categoryId,
            labelId : this.data.labelId,
            pageNum:this.data.pageNum
        };

        blog.list(reqData,function(res){
            listHtml = util.renderHtml(templateIndex, {
                list : res.data
            });

            $(".list").append(listHtml);

            //css3动画 animated.css
            $(".item").addClass("animated flipInX");

            if(_this.data.pageNum < res.pages){
                console.log();
                //下拉加载监听
                _this.startBlogInterval();
            }else{
                _this.stopBlogInterval();
            }
        },
        function (errMsg) {
            console.log(errMsg);
        });
    },
    startBlogInterval:function(){
        var _this = this;
        this.blogInterval = setInterval(function(){
            if(util.isScrollToPageBottom()){
                _this.data.pageNum++;
                _this.list();
                _this.stopBlogInterval();
            }
        }, 900);
    },
    stopBlogInterval:function(){
        this.blogInterval && clearInterval(this.blogInterval);
    }
}

$(function(){
    page.init();
})
