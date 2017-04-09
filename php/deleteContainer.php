<?php
/**
 * Created by PhpStorm.
 * User: 泰佑
 * Date: 2017/4/8
 * Time: 19:13
 */

$containername = $_POST["containername"];
$email = $_POST["email"];


//链接MySql数据库
$serverName = "localhost";
$userName = "root";
$password = "3140104431";
$database = "taskManager";
$conn = mysqli_connect($serverName, $userName, $password, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$response = array('type'=>1);

$sql1 = "delete from containers where containername = '$containername' and email = '$email';";
$sql2 = "delete from tasks where  email = '$email' && containername = '$containername';";

if ($conn->query($sql1) == TRUE && $conn->query($sql2) == TRUE) {
    echo json_encode($response);
} else {
    $response['type'] = 0;
    echo json_encode($response);
}

$conn->close();