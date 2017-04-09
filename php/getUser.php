<?php
/**
 * Created by PhpStorm.
 * User: 泰佑
 * Date: 2017/4/8
 * Time: 14:39
 */

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

$response = array('type'=>"success",'username'=>"-");

$sql = "select * from users where email='$email';";
$result = $conn->query($sql);

$row = $result->fetch_assoc();
$response['username'] = $row['username'];

echo json_encode($response);

$conn->close();