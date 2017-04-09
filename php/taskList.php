<?php
/**
 * Created by PhpStorm.
 * User: 泰佑
 * Date: 2017/3/21
 * Time: 16:23
 */

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

$sql = "SELECT * FROM tasks where email = '$email' and containername = '$containername' ORDER BY taskDDL;";
$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
    // 输出每行数据
    $i = 0;
    while($row = $result->fetch_assoc()) {
        $data[$i] = $row;
        $i++;
    }
    echo json_encode($data);
} else {
    echo "0 个结果";
}


$conn->close();
