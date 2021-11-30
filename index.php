<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
</head>

<body>
    <div class="container-fluid">

        <?php
        include("partials/navbar.php");
        include("partials/aside.php");
        ?>
        <!-- ************************************ TOAST ************************************-->
        <div id="toastContainer" class="toast-container position-absolute bottom-0 end-0">

        </div>
        <div class="row d-flex justify-content-center">
            <!-- ************************************ Modal ************************************-->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Crear Nuevo producto</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <!-- ************************************ Form ************************************-->
                            <form>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Nombre</label>
                                    <input type="text" class="form-control" id="txtNombre" name="txtNombre">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Precio</label>
                                    <input type="number" step="0.01" class="form-control" id="txtPrecio" name="txtPrecio">
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="btnEnviar">Save</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-6 mt-2">
                <!-- ************************************ BUSQUEDA ************************************-->
                <form>
                    <input oninput="buscar()" id="inputBuscar" class="form-control" type="text" placeholder="Buscar...">
                </form>
                <!-- ************************************ TABLE ************************************-->
                <table class="table table-bordered mt-2">
                    <thead>
                        <tr class="text-center">
                            <th scope="col">#id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Accion</th>
                        </tr>
                    </thead>
                    <tbody id="tabla">
                        <tr class="text-center">
                            <th>1</th>
                            <td>Mark</td>
                            <td>500</td>
                            <td>
                                <!-- Button trigger modal -->
                                <button id="btnEditar" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                    Editar
                                </button>
                                <button id="btnEliminar" class="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- ************************************ PAGINACION ************************************-->
            <ul id="paginacion" class="pagination justify-content-center">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            </ul>

            <!-- Edit Modal -->
            <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="txtModalTitulo"></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <!-- ************************************ Edit Form ************************************-->
                            <form>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Nombre</label>
                                    <input type="text" class="form-control" id="txtEditarNombre" name="txtEditarNombre">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Precio</label>
                                    <input type="number" step="0.01" class="form-control" id="txtEditarPrecio" name="txtEditarPrecio">
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onclick="editar()" id="btnEnviar">Edit</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    </div>
</body>

<script src="https://kit.fontawesome.com/325eb5cb64.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script src="./js/app.js"></script>

</html>