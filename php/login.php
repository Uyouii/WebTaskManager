<?php
/**
 * Created by PhpStorm.
 * User: 泰佑
 * Date: 2017/4/8
 * Time: 10:05
 */

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

$response = array('type'=>"success");

$sql = "select * from users where email='$email';";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    if($row['password'] != $pass) {
        $response['type'] = "wrongPassword";
    }
    else $response['type'] = "success";
    echo json_encode($response);
} else {
    $response['type'] = "noEmail";
    echo json_encode($response);
}

$conn->close();
