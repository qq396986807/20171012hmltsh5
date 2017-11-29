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
<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" charset=utf-8" />
    <title>皇马粉丝聊天室</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1,text/html">
    <link rel="stylesheet" href="css/swiper.min.css">
    <link rel="stylesheet" href="css/css.css">
    <link rel="stylesheet" href="css/alert.css">
    <link rel="stylesheet" href="css/animate.min.css">
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?83a662d9b025a6f7bd475fa6badae31b";
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
        <div class="swiper-slide page1 stop-swiping">
            <div class="startBtn"></div>
            <div class="left"></div>
            <div class="right"></div>
            <div class="mask"></div>
            <div onclick="nextPage(1)" class="rule"></div>
        </div>
        <div class="swiper-slide page2 stop-swiping">
            <div class="arrow1 arrow"></div>
            <div class="arrow2 arrow"></div>
            <div class="arrow3 arrow"></div>
            <div onclick="ball(0)" class="ball"></div>
            <div onclick="ball(1)" style="top: 40%;left: 42%" class="ball"></div>
            <div onclick="ball(2)" style="top: 37%;left: 78%" class="ball"></div>
            <div class="finger finger1"></div>
            <div style="top: 37%;left: 53%"  class="finger finger2"></div>
            <div style="top: 35%;left: 90%"  class="finger finger3"></div>
            <div class="question1 ani" swiper-animate-effect="zoomInLeft" swiper-animate-duration="1s" swiper-animate-delay="0.2s"></div>
            <div class="people ani" swiper-animate-effect="zoomInRight" swiper-animate-duration="1s" swiper-animate-delay="0.2s"></div>
        </div>
        <div class="swiper-slide page3 stop-swiping">
            <div class="HeaderBall"></div>
            <div onclick="kicker(0)" class="kicker kicker1">
                <img style="width: 100%;height: auto" src="img/page3/pimg3-1.png" alt="">
            </div>
            <div onclick="kicker(1)" class="kicker kicker2">
                <img style="width: 100%;height: auto" src="img/page3/pimg3-2.png" alt="">
            </div>
            <div onclick="kicker(2)" class="kicker kicker3">
                <img style="width: 100%;height: auto" src="img/page3/pimg3-3.png" alt="">
            </div>
            <div class="judge1 judge"></div>
            <div class="judge2 judge"></div>
            <div class="judge3 judge"></div>
            <div class="question2 ani" swiper-animate-effect="slideInLeft" swiper-animate-duration="1s" swiper-animate-delay="0.2s"></div>
            <div class="ded ani" swiper-animate-effect="slideInRight" swiper-animate-duration="1s" swiper-animate-delay="0.2s"></div>
        </div>
        <div class="swiper-slide page4 stop-swiping">
            <div onclick="question3(0)" class="pos pos1">
                <img style="width: 100%;height: auto" src="img/page4/pimg4-1.png" alt="">
            </div>
            <div onclick="question3(1)" class="pos pos2">
                <img style="width: 100%;height: auto" src="img/page4/pimg4-2.png" alt="">
            </div>
            <div onclick="question3(2)" class="pos pos3">
                <img style="width: 100%;height: auto" src="img/page4/pimg4-3.png" alt="">
            </div>
            <div class="question3 ani" swiper-animate-effect="bounceInLeft" swiper-animate-duration="1s" swiper-animate-delay="0.2s"></div>
            <div class="football ani" swiper-animate-effect="bounceInRight" swiper-animate-duration="1s" swiper-animate-delay="0.2s"></div>
            <div class="judgeQ3-1 judgeQ3"></div>
            <div class="judgeQ3-2 judgeQ3"></div>
            <div class="judgeQ3-3 judgeQ3"></div>
        </div>
        <div class="swiper-slide page5 stop-swiping">
            <div onclick="question4(0)" class="Gold Gold1">
                <img style="width: 100%;height: auto;" src="img/page5/pimg5-1.png" alt="">
            </div>
            <div onclick="question4(1)" class="Gold Gold2">
                <img style="width: 100%;height: auto;" src="img/page5/pimg5-2.png" alt="">
            </div>
            <div onclick="question4(2)" class="Gold Gold3">
                <img style="width: 100%;height: auto;" src="img/page5/pimg5-3.png" alt="">
            </div>
            <div class="judgeQ4-1 judgeQ4"></div>
            <div class="judgeQ4-2 judgeQ4"></div>
            <div class="judgeQ4-3 judgeQ4"></div>
            <div class="question4 ani" swiper-animate-effect="bounceInUp" swiper-animate-duration="1s" swiper-animate-delay="0.2s"></div>
            <div class="Cluo ani" swiper-animate-effect="bounceInUp" swiper-animate-duration="1s" swiper-animate-delay="0.2s"></div>
        </div>
        <div class="swiper-slide page6 stop-swiping">
            <!--原来底线-->
            <div class="original">
                <img class="line1" src="img/page6/h1.png" alt="">
                <img class="line2" src="img/page6/h2.png" alt="">
                <img class="line3" src="img/page6/h3.png" alt="">
                <img class="line4" src="img/page6/h4.png" alt="">
                <img class="line5" src="img/page6/h5.png" alt="">
                <img class="line6" src="img/page6/h6.png" alt="">
                <img class="line7" src="img/page6/h7.png" alt="">
                <img class="line8" src="img/page6/h8.png" alt="">
                <img class="line9" src="img/page6/h9.png" alt="">
                <img class="line10" src="img/page6/h10.png" alt="">
                <img class="line11" src="img/page6/h11.png" alt="">
                <img class="line12" src="img/page6/h12.png" alt="">
            </div>
            <!--有颜色的线-->
            <div class="colour">
                <img class="line1" src="img/page6/1.png" alt="">
                <img class="line2" src="img/page6/2.png" alt="">
                <img class="line3" src="img/page6/3.png" alt="">
                <img class="line4" src="img/page6/4.png" alt="">
                <img class="line5" src="img/page6/5.png" alt="">
                <img class="line6" src="img/page6/6.png" alt="">
                <img class="line7" src="img/page6/7.png" alt="">
                <img class="line8" src="img/page6/8.png" alt="">
                <img class="line9" src="img/page6/9.png" alt="">
                <img class="line10" src="img/page6/10.png" alt="">
                <img class="line11" src="img/page6/11.png" alt="">
                <img class="line12" src="img/page6/12.png" alt="">
            </div>

            <div class="begin"></div>
            <div class="end"></div>
            <p class="prompt">点击起点后，点击<br />下一个传球点进行传球</p>
            <div onclick="question5(this,1)" class="ballPos ballPos1"></div>
            <div onclick="question5(this,2)" class="ballPos ballPos2"></div>
            <div onclick="question5(this,3)" class="ballPos ballPos3"></div>
            <div onclick="question5(this,4)" class="ballPos ballPos4"></div>
            <div onclick="question5(this,5)" class="ballPos ballPos5"></div>
            <div onclick="question5(this,6)" class="ballPos ballPos6"></div>
            <div onclick="question5(this,7)" class="ballPos ballPos7"></div>
            <div class="question5 ani" swiper-animate-effect="rotateInDownLeft" swiper-animate-duration="1s" swiper-animate-delay="0.2s"></div>
            <div class="badge ani" swiper-animate-effect="rotateInDownRight" swiper-animate-duration="1s" swiper-animate-delay="0.2s"></div>
        </div>
    </div>
</div>
<script>
    var openid = '<?php echo $openid ?>'
    var name = '<?php echo $usrinfo->nickname ?>'
</script>
<script type="text/javascript" src="js/swiper.animate1.0.2.min.js"></script>
<script type="text/javascript" src="js/index.js"></script>
</body>
</html>