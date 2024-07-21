<?php

header("Content-Type: application/json");
conectarBd();
$tabla = 'autores';
// Accede a los datos enviados por el cliente (si los hay)
$parametro = $_GET['accion'];

if ($parametro == "consultar_tabla") {
    // Consulta SQL para obtener los autores
    $sql = "SELECT * FROM autores";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $data = $result->fetch_all(MYSQLI_ASSOC); // Obtén los datos como un array asociativo
        echo json_encode($data); // Devuelve los datos en formato JSON
    } else {
        echo json_encode(["error" => "No se encontraron productos"]);
    }
};
