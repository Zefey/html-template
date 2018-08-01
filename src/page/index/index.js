/**
 * @Author: zefey
 * @Date:   2018-03-01T14:08:49+08:00
 * @Last modified by:   devin
 * @Last modified time: 2018-03-23T15:40:13+08:00
 */

require('page/common/nav/index.js')
require('page/common/header/index.js')
require('page/common/side/index.js')
require('./index.css')

var util = require('util/util.js');
var Pagination = require('util/pagination/index.js');
var blog = require('service/blog-service.js');
var templateIndex   = require('./string/index.string');
var templateRank   = require('./string/rank.string');
var templateCategory   = require('./string/category.string');
var templateLabel   = require('./string/label.string');

var page = {
    pageData: {
        pageNum:1,
        keyWord:''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.list();
        this.rank();
        this.category();
        this.label();
    },
    bindEvent: function(){
        var _this = this;
        $('.search-icon').click(function (){
            _this.pageData.keyWord = $.trim($('.search-input').val());
            console.log('keyWord',_this.pageData.keyWord);
            _this.list();
        });
        $('.search-input').keyup(function (e){
            if(e.keyCode === 13){
                _this.pageData.keyWord = $.trim($('.search-input').val());
                console.log('keyWord',_this.pageData.keyWord);
                _this.list();
            }
        });
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
            keyWord : this.pageData.keyWord,
            pageNum:this.pageData.pageNum
        };

        blog.list(reqData,function(res){
            var data = res.data;

            for(var i in data){
                for(var key in data[i]){
                    if(key == 'time'){
                        data[i][key] = util.dateFormat(new Date(data[i][key]));
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
        },
        function (errMsg) {
            console.log(errMsg);
        });
    },
    rank: function(){
        var reqData ={
        };

        blog.rank(reqData,function(res){
            listHtml = util.renderHtml(templateRank, {
                list : res.data
            });
            $(".blog-list").html(listHtml);
        },
        function (errMsg) {
            console.log(errMsg);
        });
    },
    category: function(){
        var reqData ={
        };

        blog.category(reqData,function(res){
            listHtml = util.renderHtml(templateCategory, {
                list : res.data
            });
            $(".panel-body .category").html(listHtml);
        },
        function (errMsg) {
            console.log(errMsg);
        });
    },
    label: function(){
        var reqData ={
        };

        blog.label(reqData,function(res){
            var data = res.data;
            var styles = [
                'background-color:rgb(255, 85, 0)',
                'background-color:rgb(248, 167, 42)',
                'background-color:rgb(107, 97, 240)',
                'background-color:rgb(135, 208, 104)',
                'background-color:rgb(16, 142, 233)'
            ]
            for(var i in data){
                let random =  Math.floor(Math.random()*5);
                data[i]['style']=styles[random];
            }
            listHtml = util.renderHtml(templateLabel, {
                list : data
            });
            $(".panel-body .label").html(listHtml);
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
                _this.pageData.pageNum = pageNum;
                _this.list();
            }
        }));
    }
}

$(function(){
    page.init();
})
