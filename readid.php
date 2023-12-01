<?php
require 'connect.php';
$data = [];
$id = $_GET['id'];
$query = mysqli_query($connect,"select * from goods where id ='$id'");
$count = mysqli_num_rows($query);
if ($count == 1) {
$row = mysqli_fetch_object($query);
$data = $row;
}
echo json_encode($data);
echo mysqli_error($connect);