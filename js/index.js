/**
 * Created by createc on 2017/8/10.
 */
var swiperV = new Swiper('.swiper-container-v', {
    pagination: '.swiper-pagination-v',
    noSwipingClass : 'stop-swiping',
    paginationClickable: true,
    onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
        swiperAnimateCache(swiper); //隐藏动画元素
        swiperAnimate(swiper); //初始化完成开始动画
    },
    onSlideChangeEnd: function(swiper){
        swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
    }
});

//提示完成测试加积分
function integralAdd() {
    var M = {}
    // 判断是否已存在，如果已存在则直接显示
    if(M.dialog2){
        return M.dialog2.show();
    }
    M.dialog2 = jqueryAlert({
        'content' : '完成答题可获得20积分',
        'modal'   : true,
        'buttons' :{
            '确定' : function(){
                M.dialog2.close();
            }
        }
    })
}
integralAdd();

var url = window.location.href;
var appid;
var timestamp;
var nonceStr;
var signature;
$.ajax({
    url:'http://niveamen.watchinga.net/rm/web/jsticket',
    type:'POST',
    async: false,
    data:{url:url},
    dataType: "json",
    success:function(data){
        appid = data['appId'];
        timestamp = data['timestamp'];
        nonceStr = data['nonceStr'];
        signature = data['signature'];
    }
})

wx.config({
    debug: false,
    appId: appid,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: [
        // 所有要调用的 API 都要加到这个列表中,,,,,
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "checkJsApi",
        "chooseImage",
        "uploadImage",
    ]
});

var nextPage = function (num) {
    swiperV.slideTo(num, 1000, true);
};

//点击开球
$(".startBtn").click(function () {
    $(".mask").fadeIn(500);
    $(".rule").fadeIn(500);
    _hmt.push(['_trackEvent', '首页', '点击开球', 'literature']);
})

var answerNum = 0;

//第一题
var falg = 0;
var ball = function (num) {
    if(num==0&&falg==0){
        $(".ball").eq(0).addClass("ballPlay");
        $(".arrow").eq(num).fadeIn(500);
        falg=1;
        window.setTimeout(function () {$(".ball").eq(0).css('display','none')},2000);
        window.setTimeout(function () {swiperV.slideTo(2, 1000, true);},3500);
        answerNum++;
    }else if(num!=0&&falg==0){
        falg=1;
        $(".arrow").eq(num).fadeIn(500);
        window.setTimeout(function () {swiperV.slideTo(2, 1000, true);},2000);
    }
}

//第二题
var falg2 = 0;
var kicker = function (num) {
    var a = num+1;
    if(num==2&&falg2==0){//正确答案
        answerNum++;
        $(".judge").eq(num).fadeIn(500);
        $(".kicker1").fadeOut(500);
        $(".kicker2").fadeOut(500);
        $(".kicker3").animate({"left":"38%"},1000,function () {
            $(".judge").eq(num).fadeOut(500);
            $(".HeaderBall").fadeIn(500);
            window.setTimeout(function () {swiperV.slideTo(3, 1000, true);},2000);
        });
        falg2=1;
    }else if(num!=2&&falg2==0){//错误答案
        $(".judge").eq(num).fadeIn(500);
        falg2=1;
        $(".kicker img").eq(num).attr("src","img/page3/himg3-"+a+".png");
        window.setTimeout(function () {swiperV.slideTo(3, 1000, true);},2000);
    }
}

//第三题
var falg3 = 0;
var question3 = function (num) {
    var a = num+1;
    if(num==1&&falg3==0){
        answerNum++;
        falg3=1;
        $(".judgeQ3").eq(num).fadeIn(500);
        window.setTimeout(function () {swiperV.slideTo(4, 1000, true);},2000);
    }else if(num!=1&&falg3==0){
        $(".pos img").eq(num).attr("src","img/page4/himg4-"+a+".png");
        falg3=1;
        $(".judgeQ3").eq(num).fadeIn(500);
        window.setTimeout(function () {swiperV.slideTo(4, 1000, true);},2000);
    }
}

//第四题
var falg4 = 0;
var question4 = function (num) {
    var a = num+1;
    if(num==2&&falg4==0){
        falg4=1;
        answerNum++;
        $(".judgeQ4").eq(num).fadeIn(500);
        window.setTimeout(function () {swiperV.slideTo(5, 1000, true);},2000);
    }else if(num!=2&&falg4==0){
        $(".Gold img").eq(num).attr("src","img/page5/himg5-"+a+".png");
        falg4=1;
        $(".judgeQ4").eq(num).fadeIn(500);
        window.setTimeout(function () {swiperV.slideTo(5, 1000, true);},2000);
    }
}

//第五题
var previous;//上一个按钮编号
var question5 = function (obj,num) {
    if(num==1 && previous !=false){
        _hmt.push(['_trackEvent', 'Q5', '点击开始', 'literature']);
        $(obj).css("transform","scale(1.2)");
        previous=1;
    }else if(num==2 && previous==1){
        previous=2;
        $(obj).css("transform","scale(1.2)");
        $(".colour img").eq(0).fadeIn(500);
    }else if((num==3 && previous==1) || (num==3 && previous==2)){
        if(previous==1){
            $(".colour img").eq(4).fadeIn(500);
            previous = false;
            window.setTimeout(function () {window.location.href="http://niveamen.watchinga.net/hmltscs/share.php?dt=1&openid="+openid+""},2000);
        }else if(previous==2){
            $(".colour img").eq(1).fadeIn(500);
            previous=3;
        }
        $(obj).css("transform","scale(1.2)");
    }else if(num==4 && previous==3){
        $(obj).css("transform","scale(1.2)");
        $(".colour img").eq(2).fadeIn(500);
        previous=4;
    }else if((num==5 && previous==3) || (num==5 && previous==4)){
        $(obj).css("transform","scale(1.2)");
        if(previous==3){
            $(".colour img").eq(8).fadeIn(500);
            previous=false;
            window.setTimeout(function () {window.location.href="http://niveamen.watchinga.net/hmltscs/share.php?dt=1&openid="+openid+""},2000);
        }else if(previous==4){
            $(".colour img").eq(3).fadeIn(500);
            answerNum++;
            previous=5;
            $.ajax({
                url:'sql.php',
                type:'POST',
                async: false,
                data:{answerNum:openid},
                success:function(data){
                    
                }
            })
            window.setTimeout(function () {window.location.href="http://niveamen.watchinga.net/hmltscs/share.php?dt=1&openid="+openid+""},2000);
        }

    }else if((num==6 && previous==2) || (num==6 && previous==3)){
        $(obj).css("transform","scale(1.2)");
        if(previous==2){
            $(".colour img").eq(10).fadeIn(500);
        }else if(previous==3){
            $(".colour img").eq(11).fadeIn(500);
        }
        previous=false;
        window.setTimeout(function () {window.location.href="http://niveamen.watchinga.net/hmltscs/share.php?dt=1&openid="+openid+""},2000);
    }else if((num==7 && previous==1) || (num==7 && previous==3) || (num==7 && previous==4)){
        $(obj).css("transform","scale(1.2)");
        if(previous==1){
            $(".colour img").eq(5).fadeIn(500);
        }else if(previous==3){
            $(".colour img").eq(6).fadeIn(500);
        }else if(previous==4){
            $(".colour img").eq(7).fadeIn(500);
        }
        previous=false;
        window.setTimeout(function () {window.location.href="http://niveamen.watchinga.net/hmltscs/share.php?dt=1&openid="+openid+""},2000);
    }
}

//获取URL参数函数
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
var Request = new Object();
Request = GetRequest();

var initiatoID = Request['initiatoID'];
var num = 0;
if(!openid){
    openid = Request['openid'];
    name = decodeURI(Request['name'])
    name = decodeURI(name);
    num = Request['num'];
}
//发送用户到后台
$.ajax({
    url:'sql.php',
    type:'POST',
    async: false,
    data:{openid:openid,name:name,initiatoID:initiatoID,num:num},
    success:function(data){

    }
})


//微信端操作

//微信禁止下拉显示

var eventlistener_handler = function(e){
    e.preventDefault();     // 阻止浏览器默认动作(网页滚动)
};

var touchInit = function(){
    document.body.addEventListener("touchmove",eventlistener_handler, false);
};
touchInit();

wx.error(function (res) {
    if(res.errMsg!='config.ok'){
        console.log(res.errMsg);
    }
});
wx.ready(function () {
    //获取用户的initiatoID2
    $.ajax({
        url:'sql.php',
        type:'POST',
        data:{openidIni:openid},
        async: false,
        dataType: "json",
        success:function(data){
            initiatoID2 = data['initiatoID'];
        }
    })


    wx.onMenuShareTimeline({
        title: '皇马粉丝聊天室', // 分享标题
        link: "http://niveamen.watchinga.net/hmltscs/share.html?initiatoID2="+initiatoID2+"", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://niveamen.watchinga.net/hmlts/img/page2/ball.png', // 分享图标
        success: function () {
            
        },
        cancel: function () {

        }
    });

    wx.onMenuShareAppMessage({
        title: '皇马粉丝聊天室', // 分享标题
        desc: '点击加入有机会赢取皇马签名球衣', // 分享描述
        link: "http://niveamen.watchinga.net/hmltscs/share.html?initiatoID2="+initiatoID2+"", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://nivea.watchinga.net/hmlts/img/page2/ball.png', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {

        },
        cancel: function () {

        }
    });
    

});