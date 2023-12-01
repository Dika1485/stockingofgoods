<?php
require 'connect.php';
$input = file_get_contents('php://input');
$data = json_decode($input,true);
//terima data dari mobile
$id=trim($data['id']);
$item=trim($data['item']);
$stock=trim($data['stock']);
http_response_code(201);
if($item!='' and $stock!=''){
$query = mysqli_query($connect,"update goods set item='$item',stock='$stock' where
id='$id'");
$message = true;
}else{
$message = false;
}
echo json_encode($message);
echo mysqli_error($connect);