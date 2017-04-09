<?php
/**
 * Created by PhpStorm.
 * User: 泰佑
 * Date: 2017/4/8
 * Time: 10:06
 */

$name = $_POST["name"];
$email = $_POST["email"];
$pass = $_POST["pass"];

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

$sql = "insert into users (username,password,email) values ('$name','$pass','$email');";

if ($conn->query($sql) === TRUE) {
    echo json_encode($response);
} else {
    $response['type'] = 0;
    echo json_encode($response);
}

$conn->close();