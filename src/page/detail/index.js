require('page/common/nav/index.js')
require('page/common/header/index.js')
require('page/common/side/index.js')
require('./index.css')

require('github-markdown-css')
var showdown  = require('showdown');
var util = require('util/util.js');
var blog = require('service/blog-service.js');
var templateDetail   = require('./detail.string');

var page = {
    data:{
        id:util.getUrlParam('id')
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.detail();
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
        //css3动画 animated.css
        $('.detail').addClass('animated bounceInUp');
    },
    detail: function(){
        var _this =this;
        var reqData ={
            id : this.data.id
        };

        blog.detail(reqData,function(res){
            console.log(res);
            listHtml = util.renderHtml(templateDetail, res.data[0]);

            $(".detail").html(listHtml);
            var converter = new showdown.Converter(),
                text      = res.data[0]['content'],
                html      = converter.makeHtml(text);
            $(".article-content").html(html);
        },
        function (errMsg) {
            console.log(errMsg);
        });
    }
}

$(function(){
    page.init();
})
