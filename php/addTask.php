<?php
/**
 * Created by PhpStorm.
 * User: 泰佑
 * Date: 2017/3/20
 * Time: 17:01
 */

//得到前端传过来的表单
$ddl = $_POST["ddl"];
$time = $_POST["time"];
$name = $_POST["name"];
$description = $_POST["description"];


//链接MySql数据库
$serverName = "localhost";
$userName = "root";
$password = "3140104431";
$database = "taskManager";
$conn = mysqli_connect($serverName, $userName, $password, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$response = array('type'=>1,'name'=>$name);

if($ddl != '' && $name != '') {
    //插入数据
    $sql = "insert into tasks (taskDDL,taskName,taskTime,taskDescription) values ('$ddl','$name','$time','$description');";

    if ($conn->query($sql) === TRUE) {
        echo json_encode($response);
    } else {
        $response['type'] = 0;
        echo json_encode($response);
    }
}

$conn->close();


?>







