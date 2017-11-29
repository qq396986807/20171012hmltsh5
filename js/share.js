/**
 * Created by createc on 2017/8/25.
 */
var swiperV = new Swiper('.swiper-container-v', {
    pagination: '.swiper-pagination-v',
    noSwipingClass : 'stop-swiping',
    paginationClickable: true,
});


//获取当前时间
function CurentTime() {
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒
    var clock = year + "-";
    if(month < 10)
        clock += "0";
    clock += month + "-";
    if(day < 10)
        clock += "0";
    clock += day + " ";
    if(hh < 10)
        clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";
    if (ss < 10) clock += '0';
    clock += ss;
    return(clock);
}

//获取url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if ( r != null ){
        return decodeURI(r[2]);
    }else{
        return null;
    }
}

var next = function (num) {
    swiperV.slideTo(num, 1000, true);
}

var myDate = new Date();

//获取sign,参数对象,密匙
function signKey(obj,key) {
    var keys = Object.keys(obj);
    var newKeys = keys.sort();
    var newObjectArray = [];
    for(x in newKeys){
        var attr = newKeys[x];
        console.log(attr);
        if(obj[attr] === '' || obj[attr] === null || obj[attr] === undefined || obj[attr] === 'sign'){
            continue;
        }
        var val = attr + '=' +obj[attr];
        newObjectArray.push(val);
    }
    var str = newObjectArray.join('&');
    str += key;
    str = md5(str).toUpperCase();
    return str;
}

//提示完成测试加积分
function integralAdd() {
    var M = {}
    // 判断是否已存在，如果已存在则直接显示
    if(M.dialog2){
        return M.dialog2.show();
    }
    M.dialog2 = jqueryAlert({
        'content' : '完成测试可获得20积分',
        'modal'   : true,
        'buttons' :{
            '确定' : function(){
                M.dialog2.close();
            }
        }
    })
}

var memberFlag = false;
function member() {
    var obj = {};
    obj.openid = getQueryString('openid');
    // obj.member_uni_id = 'o3o4zxPMqVE6v1U-ewf5S2Y22eYI';
    obj.timestamp = myDate.getTime();
    obj.appid = 'wx3c47e7bd3bbaa405';
    obj.state = 'wx';
    obj.sign = signKey(obj,'2AF0D0FD2B0640A3849684AB544265B9');
    $.ajax({
        url: 'http://nivea.sweetmartmarketing.com/crmSrv/member/checkMemberInfoByWMC.do',
        type: 'POST',
        data: obj,
//        dataType: "json",
        success: function (data) {
            var D = JSON.parse(data);
            if(D['status'] == '2'){
                memberFlag = true;
            }
            if(D['status'] == '1'){
                memberFlag = false;
            }
        }
    })
}

member()//查询是否是会员

//获取积分参数
function getIntegral(url,num,rem,flag) {
    var obj = {};
    obj.member_uni_id = openid;
    console.log(openid);
    // obj.member_uni_id = 'o3o4zxPMqVE6v1U-eazXn5S2YeYI';
    obj.timestamp = myDate.getTime();
    obj.transaction_type_id = num;
    obj.transaction_time = CurentTime();
    obj.channel = '2';
    obj.remark = rem;
    obj.sign = signKey(obj,'2AF0D0FD2B0640A3849684AB544265B9');
    $.ajax({
        url:url,
        type:'POST',
        data:obj,
//        dataType: "json",
        success:function(data){
            var M = {};
            if(M.dialog3){
                return M.dialog1.show();
            }

            var D = JSON.parse(data);
            if(memberFlag){
                var jsonAlert= {
                    'content' : '',
                    'modal'   : true,
                    'buttons' :{
                        '确定' : function(){
                            M.dialog3.close();
                        },
                        '会员中心' : function(){
                            window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx36310fe660ca89bd&redirect_uri=http%3A%2F%2Fnivea.sweetmartmarketing.com%2FcrmSrv%2Fwx%2FzexWxNvy%3fappid%3dwx36310fe660ca89bd&response_type=code&scope=snsapi_userinfo&state=wx&component_appid=wx757dd6d09794aee2#wechat_redirect';
                        }
                    }
                }
            }else{
                var jsonAlert= {
                    'content' : '',
                    'modal'   : true,
                    'buttons' :{
                        '确定' : function(){
                            M.dialog3.close();
                        },
                        '加入会员' : function(){
                            window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx36310fe660ca89bd&redirect_uri=http%3A%2F%2Fnivea.sweetmartmarketing.com%2FcrmSrv%2Fwx%2FzexWxNvy%3fappid%3dwx36310fe660ca89bd&response_type=code&scope=snsapi_userinfo&state=wx&component_appid=wx757dd6d09794aee2#wechat_redirect';
                        }
                    }
                }
            }
            if(D['code'] == '40027'){
                if(flag == 1){
                    jsonAlert.content = '您已获得积分，不再增加！';
                    M.dialog3 = jqueryAlert(jsonAlert);
                }
                if(flag == 2){
                    jsonAlert.content = '您已获得分享积分，每日限1次！';
                    M.dialog3 = jqueryAlert(jsonAlert);
                }
            }
            //区别是否是会员的文案
            function content() {
                if(memberFlag){
                    if(flag == 1){
                        jsonAlert.content = '获得20积分，点击查看！';
                        M.dialog3 = jqueryAlert(jsonAlert);
                    }
                    if(flag == 2){
                        jsonAlert.content = '分享获得积分30积分，点击查看！';
                        M.dialog3 = jqueryAlert(jsonAlert);
                    }
                }else{
                    if(flag == 1){
                        jsonAlert.content = '获得20积分，加入会员查看！';
                        M.dialog3 = jqueryAlert(jsonAlert);
                    }
                    if(flag == 2){
                        jsonAlert.content = '分享获得积分30积分，加入会员查看！';
                        M.dialog3 = jqueryAlert(jsonAlert);
                    }
                }
            }
            if(D['code'] == '40029'){
                content();
            }
            if(D['code'] == '200'){
                content();
            }
        }
    })
}


//进入H5获取积分

var apiUrl = 'http://nivea.sweetmartmarketing.com/crmSrv/transaction/saveTransactionOnline.do';


var falg1 = false;//标记触发事件
var falg2 = false;//标记触发事件
var falg3 = false;//标记触发事件
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

var initiatoID2;//全局
if(openid) {
    //判断是否有玩过游戏
    $.ajax({
        url:'sql.php',
        type:'POST',
        data:{openid3:openid},
        async: false,
        dataType: "json",
        success:function(data){
            if(data==1){
                initiatoID2 = Request['initiatoID2'];
                console.log(initiatoID2);
            }else {
                initiatoID2 = data['initiatoID'];
            }
            //通过授权进入的,获取数据库改用户的信息来遍历召集了几个朋友
            $.ajax({
                url:'sql.php',
                type:'POST',
                data:{initiatoID2:initiatoID2},
                async: false,
                dataType: "json",
                success:function(data){
                    var len = data.length;
                    for(var i=0;i<len;i++){
                        $(".people").eq(data[i]['num']).attr("sign","2");
                        $(".people").eq(data[i]['num']).css("opacity","1");
                        $(".share p").eq(data[i]['num']).text(data[i]['name']);
                        if(data[i]['openid']==openid){
                            falg1 = true;
                        }
                        if(data[i]['answer']==0){
                            falg3 = true;
                        }
                    }
                    if(len==5){
                        falg2 = true;
                    }
                }
            })
        }
    })
}else {
    openid = Request['openid'];
    //通过跳转进来的,获取数据库改用户的信息来遍历召集了几个朋友
    $.ajax({
        url:'sql.php',
        type:'POST',
        data:{shareOpenid:openid},
        async: false,
        dataType: "json",
        success:function(data){
            var len = data.length;
            for(var i=0;i<len;i++){
                $(".people").eq(data[i]['num']).attr("sign","2");
                $(".people").eq(data[i]['num']).css("opacity","1");
                $(".share p").eq(data[i]['num']).text(data[i]['name']);
                if(data[i]['openid']==openid){
                    falg1 = true;
                }
                if(data[i]['answer']==0){
                    falg3 = true;
                }
            }
            initiatoID2 = data[0]['initiatoID'];
            if(len==5){
                falg2 = true;
            }
        }
    })
}

if(getQueryString('dt')){
    getIntegral(apiUrl,'11041','打开获得链接获取积分',1);
}else {
    integralAdd();
}

//点击召集好友
$(".btn1").click(function () {
    $(".mask").fadeIn(500);
    $(".fenxiang").fadeIn(500);
})

//点击遮罩,分享消失
$(".mask").click(function () {
    $(".mask").fadeOut(500);
    $(".fenxiang").fadeOut(500);
    $(".box-div").fadeOut(500);
})

//关闭遮罩
$(".mask2 img").click(function () {
    $(".mask2").fadeOut(500);
    $(".box-div").fadeOut(500);
});

//点击确定,提交表单
$(".sub").click(function () {
    var M = {};
    if(M.dialog1){
        return M.dialog1.show();
    }
    var nickName = $("#name").val();
    var phone = $("#phone").val();
    var add = $("#add").val();
    if(nickName=="" || phone=="" || add==""){

        M.dialog1 = jqueryAlert({
            'content' : '输入不能为空!',
            'closeTime' : 2000
        })
    }else if(!(/^1[34578]\d{9}$/.test(phone))){
        M.dialog1 = jqueryAlert({
            'content' : '请输入正确的手机号码!',
            'closeTime' : 2000
        })
    }else {
        $.ajax({
            url:"sql.php",
            type:"POST",
            data:{nickName:nickName,phone:phone,add:add,openidAdd:openid},
            success:function (data) {
                if(data==1){
                    M.dialog1 = jqueryAlert({
                        'content' : '填写信息成功!',
                        'closeTime' : 2000
                    })
                }else {
                    M.dialog1 = jqueryAlert({
                        'content' : '您已经填写过信息,请勿重复提交!',
                        'closeTime' : 2000
                    })
                }
                $(".mask2").fadeOut(500);
                $(".box-div").fadeOut(500);
            }
        })
    }
});
//点击加入事件
$(".people").click(function () {
    var sign = $(this).attr("sign");
    var num = $(this).attr("num");
    if(sign==1){
        $.ajax({
            url:'sql.php',
            type:'POST',
            data:{shareOpenid2:openid},
            dataType: "json",
            success:function(data){
                if(data==1){
                    var M = {};
                    if(M.dialog1){
                        return M.dialog1.show();
                    }
                    M.dialog1 = jqueryAlert({
                        'content' : '你已经参加过活动了,赶紧召集你的小伙伴来参加!',
                        'closeTime' : 2000
                    })
                }else {
                    var url = encodeURI("http://niveamen.watchinga.net/hmltscs/index.php?openid="+openid+"&initiatoID="+initiatoID2+"&name="+name+"&num="+num+"");
                    url = encodeURI(url);
                    window.location.href=url;
                }
            }
        })
    }else {
        var M = {};
        if(M.dialog1){
            return M.dialog1.show();
        }
        M.dialog1 = jqueryAlert({
            'content' : '该位置已经有人,请重新选择!',
            'closeTime' : 2000
        })
    }
})

var pos = function () {
    var url = encodeURI("http://niveamen.watchinga.net/hmltscs/index.php?openid="+openid+"&initiatoID="+openid+"&name="+name+"&num=0");
    url = encodeURI(url);
    if((!falg1)&&falg2){
        $(".btn1").remove();
        $(".btn2").remove();
        var a = $(" <a href='"+url+"'>\
                        <div class='play-games'></div>\
                    </a>")
        $(".share").append(a);
    }
};
pos();//位置满了,出现我也要玩的按钮

$(".btn2").click(function () {
    var M = {};
    if(M.dialog1){
        return M.dialog1.show();
    }
    if(falg1&&falg2&&falg3){
        _hmt.push(['_trackEvent', '按钮', '领取球衣', 'literature']);
        $(".mask2").fadeIn(500);
        $(".box-div").fadeIn(500);
    }else if(!falg2){
        M.dialog1 = jqueryAlert({
            'content' : '请召集齐你的小伙伴，并至少有一人答对全部题目!',
            'closeTime' : 2000
        })
    }else if(falg1&&falg2&&!falg3){
        M.dialog1 = jqueryAlert({
            'content' : '你们几个小伙伴没有全部对题目,请重新去答题吧!',
            'closeTime' : 2000
        })
    }
})


//微信操作


//微信禁止下拉显示

var eventlistener_handler = function(e){
    e.preventDefault();     // 阻止浏览器默认动作(网页滚动)
};

var touchInit = function(){
    document.body.addEventListener("touchmove",eventlistener_handler, false);
};
touchInit();



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


wx.ready(function () {

    wx.onMenuShareTimeline({
        title: '皇马粉丝聊天室', // 分享标题
        link: "http://niveamen.watchinga.net/hmltscs/share.html?initiatoID2="+initiatoID2+"", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://niveamen.watchinga.net/hmlts/img/page2/ball.png', // 分享图标
        success: function () {
            _hmt.push(['_trackEvent', '分享', '朋友圈', 'literature']);
            getIntegral(apiUrl,'11042','内容分享获取积分',2);
        },
        cancel: function () {

        }
    });

    wx.onMenuShareAppMessage({
        title: '皇马粉丝聊天室', // 分享标题
        desc: '点击加入有机会赢取皇马签名球衣', // 分享描述
        link: "http://niveamen.watchinga.net/hmltscs/share.html?initiatoID2="+initiatoID2+"", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://niveamen.watchinga.net/hmlts/img/page2/ball.png', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            _hmt.push(['_trackEvent', '分享', '朋友', 'literature']);
            getIntegral(apiUrl,'11042','内容分享获取积分',2);
        },
        cancel: function () {

        }
    });


});