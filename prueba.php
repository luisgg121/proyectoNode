<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    // Conexión a la base de datos
    $host = "localhost";
    $user = "root";
    $password = "Luis0908";
    $dbname = "libros";
    $port = 3306;
    $socket = "";
    
    $conexion = new mysqli($host, $user, $password, $dbname, $port, $socket);
    
    if ($conexion->connect_error) {
        die("Error de conexión: " . $conexion->connect_error);
    }
    
    echo "Conexión exitosa a MySQL utilizando MySQLi";
    
    // Cierra la conexión
    $conexion->close();
    ?>
</body>

</html>