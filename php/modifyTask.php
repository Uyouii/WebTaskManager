<?php
/**
 * Created by PhpStorm.
 * User: 泰佑
 * Date: 2017/4/6
 * Time: 23:58
 */

//得到前端传过来的表单
$ddl = $_POST["ddl"];
$time = $_POST["time"];
$name = $_POST["name"];
$description = $_POST["description"];
$email = $_POST["email"];
$containername = $_POST["containername"];


//链接MySql数据库
$serverName = "localhost";
$userName = "root";
$password = "3140104431";
$database = "taskManager";
$conn = mysqli_connect($serverName, $userName, $password, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "delete from tasks where taskName = '$name' && taskDDL = '$ddl' && email = '$email' && containername = '$containername';";
$conn->query($sql);

$sql = "insert into tasks (taskDDL,taskName,taskTime,taskDescription,email,containername) values ('$ddl','$name','$time','$description','$email','$containername');";
$conn->query($sql);

$response = array('type'=>1,'name'=>$name);
echo json_encode($response);

$conn->close();
