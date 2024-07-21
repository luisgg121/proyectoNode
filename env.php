<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');

// function leerAutores($conexion)
// {
//     $sql = "SELECT * FROM autores";

//     $resultado = $conexion->query($sql);

//     if ($resultado->num_rows > 0) {
//         echo "Número de registros: " . $resultado->num_rows . "<br>";
//         // Itera sobre los registros y muestra los datos
//         while ($fila = $resultado->fetch_assoc()) {
//             echo "ID: " . $fila["id"] . " - Nombre: " . $fila["nombre"] . " - Apellidos: " . $fila["apellidos"] . "<br>";
//         }
//     } else {
//         echo "No se encontraron registros.";
//     }
//     return $resultado;
// }

// $conexion = conectarBd();
// leerAutores($conexion);

// ======================================================
if (isset($_GET['accion'])) {
    $parametro = $_GET['accion'];
    //     echo "El valor del parámetro accion es: " . $parametro;
    //     echo "El valor de los parámetro es: " . print_r($_GET);
} else {
    if (isset($_POST['accion'])) {
        $parametro = $_POST['accion'];
    } else {
        echo "El valor del parámetro en ////> no está definido";
        $parametro = "";
    }
}
// ======================================================

// Accede a los datos enviados por el cliente (si los hay)

// $parametro = "consultar_tabla";
// if (isset($_POST['accion'])) {
//     $parametro = $_POST['accion'];
//     echo "El valor del parámetro accion es: " . $parametro;
//     echo "El valor de los parámetro es: " . print_r($_POST);
// } else {
//     echo "El valor del parámetro _POST no está definido";
// }


// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     // Accede a los datos enviados por POST
//     $parametro = $_POST['accion'];
//     echo "Parámetro = " . $parametro;
// } else {
//     echo "No recibí método POST";
// }

// $parametro = "consultar_tabla";
switch ($parametro) {
    case "baja":
        $conn = conectarBd();
        $tabla = 'autores';
        $id = $_GET['id'];
        $sql = "delete from autores where	id = " . $id;
        $result = $conn->query($sql);
        cerrarConexion($conn);
        break;
    case "consultar_tabla":
        header("Content-Type: application/json");
        $conn = conectarBd();
        $tabla = 'autores';
        // Consulta SQL para obtener los autores
        $sql = "SELECT * FROM autores";
        $result = $conn->query($sql);
        //
        if ($result->num_rows > 0) {

            // echo json_encode($result);

            // echo "Número de registros: " . $result->num_rows . "<br>";
            // Itera sobre los registros y muestra los datos
            // $fila = $result->fetch_object();
            while ($fila = $result->fetch_assoc()) {
                // echo json_encode("ID: " . $fila["id"] . "Nombre: " . $fila["nombre"] . "Apellidos: " . $fila["apellidos"]);
                // echo PHP_EOL;
                //echo "ID: " . $fila["id"] . " - Nombre: " . $fila["nombre"] . " - Apellidos: " . $fila["apellidos"] . "<br>";
                // '{"name":"John", "age":30, "city":"New York"}'

                // $linea = "{" . '"ID":' . '"' .$fila["id"] . '", ';
                // $linea = $linea .  '"Nombre":'  . '"' .$fila["nombre"] . '", ';
                // $linea = $linea .  '"Apellidos":'  . '"' .$fila["apellidos"] . '"' . "}" . PHP_EOL;
                // echo $linea;

                // Convierte el resultado en un array asociativo
                $data = array();
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }

                // Convierte el array en una cadena JSON
                $jsonString = json_encode($data);

                // Imprime la cadena JSON
                echo $jsonString;
            }
        } else {
            echo "No pude ejecutar la consulta de la tabla.";
        }
        //

        // if ($result->num_rows > 0) {
        //     echo json_encode($result); // Devuelve los datos en formato JSON
        // } else {
        //     echo json_encode(["error" => "No se encontraron registros de autores"]);
        // }
        cerrarConexion($conn);
};



// $conexion = conectarBd();
// leerAutores($conexion);
function conectarBd()
{
    // Conexión a la base de datos
    $host = "localhost";
    $port = 3306;
    $socket = "";
    $user = "root";
    $password = "Luis0908";
    $dbname = "libros";
    $conexion = new mysqli($host, $user, $password, $dbname, $port, $socket);
    // Verificar la conexión
    if ($conexion->connect_error) {
        die("Error de conexión: " . $conexion->connect_error);
    }
    // echo "Conexión exitosa a MySQL usando MySQLi";
    // Aquí puedes realizar consultas y otras operaciones con la base de datos
    return ($conexion);
}

// Cerrar la conexión
function cerrarConexion($conexion)
{
    $conexion->close();
}
