/**
 * @Author: zefey
 * @Date:   2018-03-01T14:08:49+08:00
 * @Last modified by:   devin
 * @Last modified time: 2018-03-23T15:40:13+08:00
 */

require('./index.css')

var util = require('util/util.js');
var blog = require('service/blog-service.js');
var templateRank   = require('./string/rank.string');
var templateCategory   = require('./string/category.string');
var templateLabel   = require('./string/label.string');

var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.rank();
        this.category();
        this.label();
    },
    bindEvent: function(){
        //css3动画 animated.css
        $(".panel").addClass('animated lightSpeedIn');
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
    }
}

$(function(){
    page.init();
})
