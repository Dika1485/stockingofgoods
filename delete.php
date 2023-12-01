<?php
require 'connect.php';
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = [];
$id = $_GET['id'];
$query = mysqli_query($connect,"delete from goods where id='$id'");
if ($query) {
http_response_code(201);
$message['status'] = 'success';
}else{
http_response_code(422);
$message['status'] = 'failed';
}
echo json_encode($message);
echo mysqli_error($connect);