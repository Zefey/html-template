require('./index.css');

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
