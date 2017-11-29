<?php
/**
 * Created by PhpStorm.
 * User: createc
 * Date: 2017/8/25
 * Time: 下午5:37
 */
header("Content-Type: text/html;charset=utf-8");
$host = 'localhost';//数据库ip
$user = 'niveacrm';//数据库user
$pwd = 'CB4Qn!VAJx1z';//数据库密码
$dbname = 'niveacrm';//数据库名称
$port = '3306';//端口
$link = mysqli_connect($host,$user,$pwd,$dbname,$port);
mysql_query("SET NAMES utf8");

$openid = $_POST['openid'];
$name = $_POST['name'];
$initiatoID = $_POST['initiatoID'];
$num = $_POST['num'];
if(isset($initiatoID)){
    if($initiatoID==1){
        $res = mysqli_query($link,"select * from user where openid = '{$openid}';");
        $num_rows = mysqli_num_rows($res);
        if($num_rows==0){
            $res = mysqli_query($link,"insert into user (openid,name,initiatoID,num) values('{$openid}','{$name}','{$openid}',0);");//存入数据库
        }
    }else{
        $res = mysqli_query($link,"select * from user where openid = '{$openid}';");
        $num_rows = mysqli_num_rows($res);
        if($num_rows==0){
            $res = mysqli_query($link,"insert into user (openid,name,initiatoID,num) values('{$openid}','{$name}','{$initiatoID}','{$num}');");//存入数据库
        }
    }
}

$openidIni =  $_POST['openidIni'];
if(isset($openidIni)){
    $res = mysqli_query($link,"select * from user where openid = '{$openidIni}';");
    $res = mysqli_fetch_array($res);
    echo json_encode($res);
}

$answerNum = $_POST['answerNum'];//5题全部答对,修改数据库字段;
if(isset($answerNum)){
    $res = mysqli_query($link,"UPDATE user SET answer = '0' WHERE openid = '{$answerNum}';");
}


///////////////////////---分割线-----上面是index页面的////////////////////////////////


//分享页用户openid
$shareOpenid = $_POST['shareOpenid'];
if(isset($shareOpenid)){
    $res = mysqli_query($link,"select * from user where openid = '{$shareOpenid}';");
    $res = mysqli_fetch_array($res);
    $res2 = mysqli_query($link,"select * from user where initiatoID = '{$res['initiatoID']}';");
    $result = array();
    while ($ary = mysqli_fetch_array($res2)){
        array_push($result,$ary);
    }
    echo json_encode($result);
}


//判断是否玩过游戏
$openid3 = $_POST['openid3'];
if(isset($openid3)){
    $res = mysqli_query($link,"select * from user where openid = '{$openid3}';");
    $num_rows = mysqli_num_rows($res);
    if($num_rows==0){
        echo 1;
    }else{
        $res2 = mysqli_fetch_array($res);
        echo json_encode($res2);
    }
}


//通过授权进来的获取用户信息
$initiatoID2 = $_POST['initiatoID2'];
if(isset($initiatoID2)){
    $res = mysqli_query($link,"select * from user where initiatoID = '{$initiatoID2}';");
    $result = array();
    while ($ary = mysqli_fetch_array($res)){
        array_push($result,$ary);
    }
    echo json_encode($result);
}

//判断该用户有没有参加过活动
$shareOpenid2 = $_POST['shareOpenid2'];
if(isset($shareOpenid2)){
    $res = mysqli_query($link,"select * from user where openid = '{$shareOpenid2}';");
    $num_rows = mysqli_num_rows($res);
    if($num_rows!=0){
        echo 1;
    }else{
        echo 2;
    }
}

//集齐好友后,填写信息储存
$nickNmae = $_POST['nickName'];
$phone = $_POST['phone'];
$add = $_POST['add'];
$openidAdd = $_POST['openidAdd'];
if(isset($nickNmae) && isset($phone) && isset($add) &&isset($openidAdd)){
    $res = mysqli_query($link,"select * from user_add where openid = '{$openidAdd}';");
    $num_rows = mysqli_num_rows($res);
    if($num_rows==0){
        $res = mysqli_query($link,"insert into user_add (openid,nick_name,user_phone,user_add) values('{$openidAdd}','{$nickNmae}','{$phone}','{$add}');");//存入数据库
        echo 1;
    }else{
        echo 2;
    }
}