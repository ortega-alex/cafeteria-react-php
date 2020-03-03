<?php

require_once '../config/dbClassMysql.php';
require_once '../config/helper.php';

getHeader();

$con = new dbClassMysql();
$res['err'] = "true";
$res['msj'] = "404 Pagina no encontrada";

$intIdTipo = isset($_POST['id_tipo']) ? intval($_POST['id_tipo']) : 0;

if (isset($_GET['get_tipos'])) {
    $strQuery = "   SELECT id_tipo, nombre, path, estado,
                            IF(estado = 1 , 'Activo', 'Inactivo') AS _estado
                    FROM db_cafeteria.tipo
                    ORDER BY nombre";
    $qTmp = $con->db_consulta($strQuery);
    $arr = array();
    while ($rTmp = $con->db_fetch_object($qTmp)) {
        $arr[] = array(
            'id_tipo' => $rTmp->id_tipo,
            'nombre' => $rTmp->nombre,
            'path' => $rTmp->path,
            'estado' => $rTmp->estado,
            '_estado' => $rTmp->_estado,
        );
    }
    $res['tipos'] = $arr;
}

if (isset($_GET['get_tipos_activos'])) {
    $strQuery = "   SELECT id_tipo, nombre, path
                    FROM db_cafeteria.tipo
                    WHERE estado = 1
                    ORDER BY nombre";
    $qTmp = $con->db_consulta($strQuery);
    $arr = array();
    while ($rTmp = $con->db_fetch_object($qTmp)) {
        $arr[] = array(
            'id_tipo' => $rTmp->id_tipo,
            'nombre' => $rTmp->nombre,
            'path' => $rTmp->path
        );
    }
    $res['tipos_activos'] = $arr;
}

if (isset($_GET['get_productos_tipo'])) {
    $strQuery = "   SELECT a.id_producto, a.nombre, a.path, a.precio,
                            b.id_tipo, b.nombre AS tipo, b.path AS path_tipo
                    FROM db_cafeteria.producto a 
                    INNER JOIN db_cafeteria.tipo b ON a.id_tipo = b.id_tipo
                    WHERE a.id_tipo = 1
                    AND a.estado = 1
                    AND b.estado = 1
                    ORDER BY nombre";
    $qTmp = $con->db_consulta($strQuery);
    $arr = array();
    while ($rTmp = $con->db_fetch_object($qTmp)) {
        $arr[] = array(
            'id_producto' => $rTmp->id_producto,
            'nombre' => $rTmp->nombre,
            'precio' => $rTmp->precio,
            'path' => $rTmp->path,
            'id_tipo' => $rTmp->id_tipo,
            'tipo' => $rTmp->tipo,
            'path_tipo' => $rTmp->path_tipo
        );
    }
    $res['productos_tipo'] = $arr;
}

if (isset($_GET['get_productos'])) {
    $strQuery = "   SELECT id_producto, id_tipo, nombre, precio, path, estado,
                            IF(estado = 1 , 'Activo', 'Inactivo') AS _estado
                    FROM db_cafeteria.producto
                    ORDER BY nombre";
    $qTmp = $con->db_consulta($strQuery);
    $arr = array();
    while ($rTmp = $con->db_fetch_object($qTmp)) {
        $arr[] = array(
            'id_producto' => $rTmp->id_producto,
            'id_tipo' => $rTmp->id_tipo,
            'nombre' => $rTmp->nombre,
            'precio' => $rTmp->precio,
            'path' => $rTmp->path,
            'estado' => $rTmp->estado,
            '_estado' => $rTmp->_estado
        );
    }
    $res['productos'] = $arr;
}

if (isset($_GET['get_productos_activos'])) {
    $strQuery = "   SELECT id_producto, id_tipo, nombre, precio, path
                    FROM db_cafeteria.producto
                    WHERE estado = 1
                    ORDER BY nombre";
    $qTmp = $con->db_consulta($strQuery);
    $arr = array();
    while ($rTmp = $con->db_fetch_object($qTmp)) {
        $arr[] = array(
            'id_producto' => $rTmp->id_producto,
            'id_tipo' => $rTmp->id_tipo,
            'nombre' => $rTmp->nombre,
            'precio' => $rTmp->precio,
            'path' => $rTmp->path
        );
    }
    $res['productos_activos'] = $arr;
}

print(json_encode($res));
$con->db_close();
