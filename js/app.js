$(document).ready(function () {

});

// ************************************ Insertar ************************************
$("#btnEnviar").click(function () {
    insertar();
})
function insertar() {
    var datos = new FormData();
    datos.append('nombre', $('#txtNombre').val());
    datos.append('precio', $('#txtPrecio').val());

    $.ajax({//jqajax
        type: "post",
        url: "conexion.php?accion=insertar",
        data: datos,
        processData: false,
        contentType: false,
        success: function (response) {
            //console.log(response);
            consultar();
            tostear("Nuevo registro creado");
        }
    });

    $('#txtNombre').val("");
    $('#txtPrecio').val("");
}

// ************************************ Consultar ************************************
function consultar() {
    $('#tabla').empty();
    $.getJSON("conexion.php", function (registros) {//jqgetjson
        var cosas = [];
        $.each(registros, function (llave, valor) {
            if (llave >= 0) {
                var template = "<tr class='text-center'>";
                template += "<td>" + valor.id + "</td>";
                template += "<td>" + valor.nombre + "</td>";
                template += "<td>" + valor.precio + "</td>";
                template += '<td> <button id="btnEditar" type="button" class="btn btn-primary" onclick="seleccionar(' + valor.id + ')" data-bs-toggle="modal" data-bs-target="#exampleModal1">Editar</button> | ';
                template += '<input class="btn btn-danger" type="button" onclick="borrar(' + valor.id + ')" value="Borrar" > </td>';
                template += "</tr>";
                cosas.push(template);
            }
        })
        $('#tabla').append(cosas.join(""));
        //console.log(registros);

        // ************************************ Paginacion ************************************
        $('#paginacion').empty();
        var totalCosas = cosas.length, limitePorPagina = 5, totalPaginas = Math.ceil(totalCosas / limitePorPagina);
        $('#tabla tr:gt(' + (limitePorPagina - 1) + ')').hide();//ocultar los elementos si son mas de 5
        $('#paginacion').append('<li id="prev-page" class="page-item"><a class="page-link" href="#">Previous</a></li>');
        $('#paginacion').append('<li class="page-item paginaActual active"><a class="page-link" href="#">1</a></li>');//boton 1 con clase active
        for (var i = 2; i <= totalPaginas; i++) {
            $('#paginacion').append('<li class="page-item paginaActual"><a class="page-link" href="#">' + i + '</a></li>');
        }
        $('#paginacion').append('<li id="next-page" class="page-item"><a class="page-link" href="#">Next</a></li>');
        $("#paginacion li.paginaActual").on("click", function () {
            if ($(this).hasClass("active")) {//verificar si el elemento tiene la clase active (si si lo tiene no hacemos nada)
                return false;
            } else {
                var paginaActual = $(this).index();//obtener el index de la pagina a la que se dio clic 
                $("#paginacion li").removeClass("active");//quitar la clase active de todos los elementos
                $(this).addClass("active");
                $('#tabla tr').hide();
                var granTotal = limitePorPagina * paginaActual;
                for (var i = granTotal - limitePorPagina; i < granTotal; i++) {
                    $('#tabla tr:eq(' + i + ')').show();
                }
            }
        })
        //funcionamiento de boton next: 
        $("#next-page").on("click", function () {
            var paginaActual = $("#paginacion li.active").index();//obtener pagina activa
            if (paginaActual === totalPaginas) {//si da clic en next pero esta en la ultima pagina no hacer nada
                return false;
            } else {
                paginaActual++;
                $("#paginacion li").removeClass("active");//quitar la clase active de todos los elementos
                $('#tabla tr').hide();
                var granTotal = limitePorPagina * paginaActual;
                for (var i = granTotal - limitePorPagina; i < granTotal; i++) {
                    $('#tabla tr:eq(' + i + ')').show();
                }
                $("#paginacion li.paginaActual:eq(" + (paginaActual - 1) + ")").addClass("active");
            }
        })

        //funcionamiento de boton prev: 
        $("#prev-page").on("click", function () {
            var paginaActual = $("#paginacion li.active").index();//obtener pagina activa
            if (paginaActual === 1) {//si da clic en prev pero esta en la pagina 1 no hacer nada
                return false;
            } else {
                paginaActual--;
                $("#paginacion li").removeClass("active");//quitar la clase active de todos los elementos
                $('#tabla tr').hide();
                var granTotal = limitePorPagina * paginaActual;
                for (var i = granTotal - limitePorPagina; i < granTotal; i++) {
                    $('#tabla tr:eq(' + i + ')').show();
                }
                $("#paginacion li.paginaActual:eq(" + (paginaActual - 1) + ")").addClass("active");
            }
        })

    });
}
consultar();

// ************************************ Borrar ************************************
function borrar(id) {
    $.get("conexion.php?eliminar=" + id, function () {//jqget
        consultar();
        tostear("El registro " + id + " a sido eliminado");
    });
}


// ************************************ Seleccionar ************************************
$idAEditar = 0;
function seleccionar(id) {
    //alert("el id a editar es: "+id);
    $.getJSON("conexion.php?seleccionar=" + id, function (dato) {//jqgetjson
        //console.log(dato);
        $("#txtModalTitulo").text("Editar el registro #" + id);
        $idAEditar = dato[0]['id'];
        $("#txtEditarNombre").val(dato[0]['nombre']);
        $("#txtEditarPrecio").val(dato[0]['precio']);
    });
}

// ************************************ Editar ************************************
function editar() {

    var datos = new FormData();
    datos.append('id', $idAEditar);
    datos.append('nombre', $('#txtEditarNombre').val());
    datos.append('precio', $('#txtEditarPrecio').val());

    $.ajax({//jqajax
        type: "post",
        url: "conexion.php?actualizar=1",
        data: datos,
        processData: false,
        contentType: false,
        success: function (response) {
            //console.log(response);
            consultar();
            tostear("El registro " + $idAEditar + " a sido editado");
        }
    });
}


// ************************************ Toast ************************************
var option = {
    animation: true,
    delay: 4000
}
function tostear(mensaje) {
    $toast = '<div id="tostada" class="toast" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header bg-primary text-white"><strong class="me-auto">Exito</strong><small>Ahora</small><button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button></div><div class="toast-body">' + mensaje + ' </div></div>';
    $("#toastContainer").append($toast);
    var tostadas = document.querySelectorAll("#tostada");
    var ultimaTostada = tostadas[tostadas.length - 1];
    var toastElement = new bootstrap.Toast(ultimaTostada, option);
    toastElement.show();
    mensaje = "";
}

// ************************************ Busqueda ************************************

function buscar() {
    var texto = $("#inputBuscar").val()
    if (texto == "") {//si no hay nada en el input volvemos a mostrar todo 
        consultar();
        $('#paginacion').show();
    } else {
        $('#paginacion').hide();//ocultar paginacion
        $('#tabla').empty();
        $.getJSON("conexion.php?buscar=" + texto, function (registros) {//jqgetjson
            //console.log(registros);
            var cosas = [];
            $.each(registros, function (llave, valor) {
                if (llave >= 0) {
                    var template = "<tr class='text-center'>";
                    template += "<td>" + valor.id + "</td>";
                    template += "<td>" + valor.nombre + "</td>";
                    template += "<td>" + valor.precio + "</td>";
                    template += '<td> <button id="btnEditar" type="button" class="btn btn-primary" onclick="seleccionar(' + valor.id + ')" data-bs-toggle="modal" data-bs-target="#exampleModal1">Editar</button> | ';
                    template += '<input class="btn btn-danger" type="button" onclick="borrar(' + valor.id + ')" value="Borrar" > </td>';
                    template += "</tr>";
                    cosas.push(template);
                }
            })
            $('#tabla').append(cosas.join(""));
        });
    }
}
