<?php
require 'connect.php';
$input = file_get_contents('php://input');
$data = json_decode($input,true);
//terima data dari mobile
$item=trim($data['item']);
$stock=trim($data['stock']);
$id=trim($data['id']);
http_response_code(201);
if($item!='' and $stock!=''){
$query = mysqli_query($connect,"insert into goods(item,stock,user_id) values('$item','$stock','$id')");
$message = true;
}else{
$message = false;
}
echo json_encode($message);
echo mysqli_error($connect);