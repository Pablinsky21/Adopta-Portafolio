<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$correo = $data['correo'];
$usuario = $data['usuario'];
$clave = $data['clave'];
$clave2 = $data['clave2'];

$q = mysqli_query($con, "INSERT INTO usuarios (correo,usuario,clave,claveTwo) VALUES ('$correo','$usuario','$clave','$clave2')");

if($q){
    http_response_code(201);
    $message['status'] = "Success";
}
else{
    http_response_code(422);
    $message['status'] = "Error";
}
echo json_encode($message);
echo mysqli_error($con);