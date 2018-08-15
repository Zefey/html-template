require('page/common/nav/index.js')
require('page/common/header/index.js')
require('page/common/side/index.js')
require('./index.css')

var util = require('util/util.js');
var blog = require('service/blog-service.js');
var templateTimeline   = require('./index.string');

var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.timeline();
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
    timeline: function(){
        var _this =this;
        var reqData ={};

        blog.timeline(reqData,function(res){
            var data = res.data;
            var colors = ['point-red','point-blue','point-green','point-yellow','point-purple']
            for(var i in data){
                for(var j in data[i]){
                    for(var k in data[i][j]){
                        var random =  Math.floor(Math.random()*5);
                        data[i][j][k]['color']=colors[random];
                    }
                }
            }
            console.log(res);
            timelineHtml = util.renderHtml(templateTimeline, {
                list : res.data
            });

            $(".timeline").html(timelineHtml);

            //css3动画 animated.css
            $("aside").addClass("animated slideInRight");
        },
        function (errMsg) {
            console.log(errMsg);
        });
    }
}

$(function(){
    page.init();
})
