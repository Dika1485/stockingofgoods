<?php
require 'connect.php';
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = [];
$username = trim($data['username']);
$password = trim($data['password']);
$query = mysqli_query($connect,"select * from user where username='$username' and password='$password'");
$count = mysqli_num_rows($query);
if ($count != 0) {
    $value = mysqli_fetch_object($query);
    $message['username'] = $value->username;
    $message['id'] = $value->id;
    $message['token'] = time().'_'.$value->password;
    $message['status_login'] = 'success';
}
else{
    $message['status_login'] = 'failed';
}
echo json_encode($message);
echo mysqli_error($connect);
?>