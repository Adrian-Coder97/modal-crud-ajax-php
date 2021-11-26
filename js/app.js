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
                template += '<td> <button id="btnEditar" type="button" class="btn btn-primary" onclick="seleccionar(' + valor.id + ')" data-bs-toggle="modal" data-bs-target="#exampleModal1">Edit</button> | ';
                template += '<input class="btn btn-danger" type="button" onclick="borrar(' + valor.id + ')" value="Borrar" > </td>';
                template += "</tr>";

                cosas.push(template);
            }
        })
        $('#tabla').append(cosas.join(""));
        //console.log(registros);
    });
}
consultar();

// ************************************ Borrar ************************************
function borrar(id) {
    $.get("conexion.php?eliminar=" + id, function () {//jqget
        consultar();
    });
}


// ************************************ Seleccionar ************************************
$idAEditar = 0;
function seleccionar(id) {
    //alert("el id a editar es: "+id);
    $.getJSON("conexion.php?seleccionar=" + id, function (dato) {//jqgetjson
        //console.log(dato);
        $("#txtModalTitulo").text("Editar el registro #"+id);
        $idAEditar = dato[0]['id'];
        $("#txtEditarNombre").val(dato[0]['nombre']);
        $("#txtEditarPrecio").val(dato[0]['precio']);
    });
}

  // ************************************ Editar ************************************
  function editar(){
            
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
        }
    });
}
