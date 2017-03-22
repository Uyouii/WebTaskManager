<?php
/**
 * Created by PhpStorm.
 * User: 泰佑
 * Date: 2017/3/21
 * Time: 21:38
 */

$ddl = $_POST["ddl"];
$name = $_POST["name"];

//链接MySql数据库
$serverName = "localhost";
$userName = "root";
$password = "3140104431";
$database = "taskManager";
$conn = mysqli_connect($serverName, $userName, $password, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if($ddl != '' && $name != '') {
    $sql = "delete from tasks where taskName = '$name' && taskDDL = '$ddl';";
    $conn->query($sql);
    $response = array('type'=>1,'name'=>$name);
    echo json_encode($response);
}

