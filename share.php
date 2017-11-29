<?php
require_once 'jssdk.php';
$code = $_REQUEST['code'];//我们要的code
$jssdk = new Jssdk("wx36310fe660ca89bd", "4a8246af05807eb13bef49b836119feb");
$ret = $jssdk->getOpenId($code);
$openid=$ret->openid;
$accessToken = $ret->access_token;
$usrinfo=file_get_contents("https://api.weixin.qq.com/sns/userinfo?access_token=$accessToken&openid=$openid&lang=zh_CN");
$usrinfo=(json_decode($usrinfo));
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>皇马粉丝聊天室</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="css/swiper.min.css">
    <link rel="stylesheet" href="css/alert.css">
    <link rel="stylesheet" href="css/share.css">
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?c7e06ba9eea37e725f528eba01190eb7";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
    <script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
    <script src="js/swiper.jquery.min.js"></script>
    <script src="js/md5.min.js"></script>
    <script src="js/alert.js"></script>
    <script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
</head>
<body>
<div class="swiper-container swiper-container-v">
    <div class="swiper-wrapper">
        <div class="swiper-slide share stop-swiping">
            <div class="share-text"></div>
            <div sign="1" num="0" class="people1 people"></div>
            <p style="top: 21%;left: 50%;">点击加入</p>
            <div sign="1" num="1" class="people2 people"></div>
            <p style="top: 26%;left: 7%">点击加入</p>
            <div sign="1" num="2" class="people3 people"></div>
            <p style="top: 31%;left: 72%">点击加入</p>
            <div sign="1" num="3" class="people4 people"></div>
            <p style="top: 67%;left: 3%">点击加入</p>
            <div sign="1" num="4" class="people5 people"></div>
            <p style="top: 72%;left: 64%">点击加入</p>
            <div class="btn1"></div>
            <div class="btn2"></div>
            <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx36310fe660ca89bd&redirect_uri=http%3A%2F%2Fnivea.sweetmartmarketing.com%2FcrmSrv%2Fwx%2FzexWxNvy%3fappid%3dwx36310fe660ca89bd&response_type=code&scope=snsapi_userinfo&state=wx&component_appid=wx757dd6d09794aee2#wechat_redirect"><div class="btn3"></div></a>
            <div class="mask"></div>
            <div class="mask2">
                <img src="img/page7/x.png" alt="">
            </div>
            <div class="fenxiang"></div>
            <div class="box-div">
                <img src="img/page7/txxx.png" alt="">
                <div>
                    姓名: <input id="name" type="text">
                </div>
                <div>
                    电话: <input id="phone" type="text">
                </div>
                <div style="padding-bottom: 5%;">
                    地址: <input id="add" type="text">
                </div>
                <div class="sub"></div>
                <p class="prompt">铁杆球迷，恭喜你通关！请留下你的联系方式，我们会主动联系你哦</p>
            </div>
        </div>
    </div>
</div>
<script>
    var openid = '<?php echo $openid?>';
    var name = '<?php echo $usrinfo->nickname?>';
</script>
<script type="text/javascript" src="js/share.js"></script>
</body>
</html>