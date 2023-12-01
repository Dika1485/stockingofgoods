<?php
require 'connect.php';
$data = [];
$id = $_GET['id'];
$query = mysqli_query($connect,"select * from goods where user_id='$id'");
while ($row = mysqli_fetch_object($query)) {
$data[] = $row;
}
//tampilkan data dalam bentuk json
echo json_encode($data);
echo mysqli_error($connect);