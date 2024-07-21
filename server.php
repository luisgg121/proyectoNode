

<!-- $con = new mysqli($host, $user, $password, $dbname, $port, $socket)
	or die ('Could not connect to the database server' . mysqli_connect_error());

//$con->close(); -->
<?php
// Conexión a la base de datos
$host="localhost";
$port=3307;
$socket="";
$user="root";
$password="";
$dbname="libros";
$conexion = new mysqli($host, $user, $password, $dbname, $port, $socket);

// Verificar la conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

echo "Conexión exitosa a MySQL usando MySQLi";
// Aquí puedes realizar consultas y otras operaciones con la base de datos

// Cerrar la conexión
$conexion->close();
?>