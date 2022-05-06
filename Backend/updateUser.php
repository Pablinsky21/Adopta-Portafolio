<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$correo = $data['correo'];
$usuario = $data['usuario'];
$clave = $data['clave'];
$id = $_GET['id'];

$q = mysqli_query($con , "UPDATE usuarios  SET correo = '$correo', usuario = '$usuario' , clave = '$clave' WHERE id = '{$id}' LIMIT 1");

if($q){
    
    $message['status'] = "Success";
}
else{
    http_response_code(422);
    $message['status'] = "Error";
}
echo json_encode($message);
echo mysqli_error($con);

