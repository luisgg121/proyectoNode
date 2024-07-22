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
    case "alta":
        $conn = conectarBd();
        $tabla = 'autores';
        $nombre = $_GET['nombre'];
        $apellidos = $_GET['apellidos'];

        // $nombre = "Hugo";
        // $apellidos = "Lomeli";

        // registro_autores1.nombre = nombre;
        // registro_autores1.apellidos = apellidos;
        // id = model.insertar(tabla, registro_autores1);
        $sql = "INSERT INTO autores (nombre,apellidos) VALUES ('" . $nombre . "','" . $apellidos . "')";
        // $sql = "INSERT INTO autores (nombre,apellidos) VALUES (Hugo, Huesca)";
        $result = $conn->query($sql);

        // Convierte el array en una cadena JSON
        $jsonString = json_encode($result);
        // Devuelve la cadena JSON
        echo $jsonString;

        // if (err) throw err;
        //     console.log(result + result.insertId);
        //     console.log("insertId = " + result.insertId);
        //     id = result.insertId;
        //     console.log("model.insertar id = " + id);
        //     console.log("model.response.id = " + id)
        //     console.log("stringify.id = " + JSON.stringify(id));
        //     let objeto = '{"id":' + JSON.stringify(id) + "}"
        //     console.log("Objeto = " + objeto);
        // objeto = JSON.stringify(objeto);
        // console.log("Objeto = " + objeto + " " +typeof(objeto));
        // objeto = JSON.parse(JSON.stringify(objeto));
        // console.log("Objeto = " + objeto + " " +typeof(objeto));

        // res . send(objeto);
        // res . end();

        cerrarConexion($conn);
        break;
    case "baja":
        $conn = conectarBd();
        $tabla = 'autores';

        $sql = "delete from autores where	id = " . $id;
        $result = $conn->query($sql);
        cerrarConexion($conn);
        break;
    case "actualizar":
        $conn = conectarBd();
        $tabla = 'autores';
        $id = $_GET['id'];
        $nombre = $_GET['nombre'];
        $apellidos = $_GET['apellidos'];
        $sql = "UPDATE $tabla SET nombre = " . $nombre . ", apellidos = " . $apellidos . " WHERE id = " . $id;
        $result = $conn->query($sql);
        cerrarConexion($conn);
        break;
    case "consultarAutor":
        $conn = conectarBd();
        $tabla = 'autores';
        // registro_autores.id = q.query.id;
        // console.log("Case consultarAutor --- id = " + q.query.id);
        // // model.consultar_autor(tabla, registro_autores);
        // await connection.query(`select * from ${tabla} where id = ?`, [q.query.id], (err, rows) => {
        //     console.log('Datos del autor recibidos de la base de datos: ');
        //     console.log(rows);
        //     // var respuesta = JSON.parse(JSON.stringify(rows));
        //     var respuesta = JSON.stringify(rows);
        //     respuesta = JSON.parse(respuesta);
        //     console.log("Case consultarAutor --> Datos en json: " + respuesta);
        //     res.send(respuesta);
        //     res.end();
        // });
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
