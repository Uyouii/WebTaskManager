<?php
/**
 * Created by PhpStorm.
 * User: 泰佑
 * Date: 2017/4/8
 * Time: 15:59
 */
$email = $_POST["email"];

$serverName = "localhost";
$userName = "root";
$password = "3140104431";
$database = "taskManager";
$conn = mysqli_connect($serverName, $userName, $password, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM containers where email = '$email' ORDER BY time;";
$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
    // 输出每行数据
    $i = 0;
    while($row = $result->fetch_assoc()) {
        $data[$i] = $row;
        $i++;
    }
} else {
}
echo json_encode($data);


$conn->close();
