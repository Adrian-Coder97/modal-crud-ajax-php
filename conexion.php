<?php
$link = "mysql:host=localhost;dbname=modal";
$usuario = "root";
$pass = "";

try {
    $pdo = new PDO($link, $usuario, $pass);
    //echo "CONECTADO A LA BASE DE DATOS";
    /*foreach ($pdo->query('SELECT * FROM `colores`') as $row) {
        print_r($row);
    }*/
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}


// ************************************ Insertar ************************************
if (isset($_GET["accion"]) == "insertar") {
    $nombre = $_POST['nombre'];
    $precio = $_POST['precio'];
    $sql_agregar = "INSERT INTO datos (nombre, precio) VALUES (?,?)";
    $sentencia_agregar = $pdo->prepare($sql_agregar);
    $sentencia_agregar->execute(array($nombre, $precio));
    exit();
}

// ************************************ Eliminar ************************************
if (isset($_GET["eliminar"])) {
    $id = $_GET["eliminar"];
    $sql_eliminar = "DELETE FROM datos WHERE id=?";
    $sentencia_eliminar = $pdo->prepare($sql_eliminar);
    $sentencia_eliminar->execute(array($id));
    exit();
}


// ************************************ seleccionar ************************************
if (isset($_GET["seleccionar"])) {
    $id2 = $_GET["seleccionar"];
    $sql_leer = "SELECT * FROM datos WHERE id=" . $id2;
    $gsent = $pdo->prepare($sql_leer);
    $gsent->execute();
    $lista = $gsent->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($lista);
    exit();
}

// ************************************ actualizar ************************************
if (isset($_GET["actualizar"])) {
    $id3 = $_POST["id"];
    $nombre = $_POST["nombre"];
    $precio = $_POST["precio"];
    $sql_editar = "UPDATE datos SET nombre=?,precio=? WHERE id=?";
    $sentencia_editar = $pdo->prepare($sql_editar);
    $sentencia_editar->execute(array($nombre, $precio, $id3));
    echo json_encode(["success" => 1]);
    exit();
}
// ************************************ BUSCAR ************************************
if (isset($_GET["buscar"])) {
    $texto = $_GET["buscar"];
    $sql_leer = "SELECT * FROM `datos` WHERE `nombre` LIKE '%{$texto}%';";
    $gsent = $pdo->prepare($sql_leer);
    $gsent->execute();
    $lista = $gsent->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($lista);
    exit();
}
// ************************************ Leer ************************************
$sql_leer = "SELECT * FROM datos";
$gsent = $pdo->prepare($sql_leer);
$gsent->execute();
$lista = $gsent->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($lista);
