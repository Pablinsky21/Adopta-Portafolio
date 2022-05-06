<?php
include "config.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$titulo = $data['titulo'];         
$subtitulo = $data['subtitulo'];
$descripcion =$data['descripcion'];
$imagen =$data['imagen'];


$q = mysqli_query($con, "INSERT INTO publicaciones (titulo , subtitulo ,descripcion , imagen ) VALUES ('$titulo','$subtitulo','$descripcion' , '$imagen')");

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







