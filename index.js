document.getElementById("Autores").innerHTML = "<h2>Principio</h2>";
const host = 'localhost/env.php';
const port = 80;
const protocolo = 'http';

var renglon = 1;

datos = {
    tabla: 'autores',
    accion: 'consultar_tabla'
};

loadTable(datos);

async function loadTable(datos) {
    // url = `${protocolo}://${host}:${port}?tabla=autores&accion=consultar_tabla`;
    url = "http://localhost/env.php?tabla=autores&accion=consultar_tabla";
    document.getElementById("Autores").innerHTML = `Inicio de la función loadTable() <<>> ${url}`;
    // fetch(`${protocolo}://${host}:${port}/autores?accion=consultar_tabla`)
    // fetch(`${protocolo}://${host}:${port}?tabla=autores&accion=consultar_tabla`)
    // 

    // fetch('http://localhost/index.php', {
    //     method: 'POST',
    //     body: JSON.stringify(datos), // Convierte los datos a formato JSON
    //     headers: {
    //         'Content-Type': 'application/json; charset=UTF-8'
    //     }
    // })

    // ===============================================================================
    // fetch(url, {
    //     method: 'GET',
    //     headers: { "Content-type": "application/json;charset=UTF-8" }
    // })
    fetch("http://localhost/env.php?tabla=autores&accion=consultar_tabla")
        .then(response => response.json())
        .then(response => {
            // let json = response.json();
            // console.log("Con fetch" + response[0].id);
            document.getElementById("Autores").innerHTML = "Dentro del fetch..>>" // + this.responseText;
            console.log("Dentro del fetch results = : " + response); // JSON.parse(JSON.stringify(response)));
            var trHTML = "";
            // var objects = JSON.stringify(response);

            // console.log(objects[0].id);
            //objects = JSON.parse(objects);
            console.log("response = " + response);
            objects = JSON.stringify(response);
            objects = JSON.parse(objects);
            console.log("objects = " + objects);
            for (let object of objects) {
                console.log("Object = " + object);
                console.log("Object = " + object.id);
                trHTML += "<tr>";
                trHTML += "<td>" + object["id"] + "</td>";
                trHTML += "<td>" + object["nombre"] + "</td>";
                trHTML += "<td>" + object["apellidos"] + "</td>";
                // trHTML += "<td>" + object["username"] + "</td>";
                trHTML +=
                    '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
                    object["id"] +
                    '); guardaRow(this);">Editar</button>';
                trHTML +=
                    '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
                    object["id"] +
                    '); deleteRow(this);">Borrar</button></td>';
                trHTML += "</tr>";
                // onclick="
            }
            document.getElementById("mytable").innerHTML = trHTML;
        })
        .catch(error => {
            console.error('An error occurred in fetch:', error);
        })
}

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    console.log("ParentNode row = " + i)
    document.getElementById("tabla").deleteRow(i);
}



function showUserCreateBox() {
    Swal.fire({
        title: "Crear autor",
        html:
            '<input id="id" type="hidden">' +
            '<input id="fname" class="swal2-input" placeholder="Nombre">' +
            '<input id="lname" class="swal2-input" placeholder="Apellidos">',
        // '<input id="username" class="swal2-input" placeholder="Username">' +
        // '<input id="email" class="swal2-input" placeholder="Email">',
        focusConfirm: false,
        preConfirm: () => {
            userCreate();
        },
    });
}

function userCreate() {
    const nombre = document.getElementById("fname").value;
    const apellidos = document.getElementById("lname").value;
    // const username = document.getElementById("username").value;
    // const email = document.getElementById("email").value;
    fetch(`${protocolo}://${host}:${port}?tabla=autores&accion=alta&nombre=${nombre}&apellidos=${apellidos}`)
        .then(response => response.json())
        .then(response => {
            alert(response);
            // console.log("Dentro de userCreate, response = " + JSON.parse(JSON.stringify(response)));
            // console.log( JSON.parse(response));
            object = JSON.stringify(response);
            object = JSON.parse(object);
            console.log("Dentro de userCreate, response = " + object);
            console.log("Dentro de userCreate, response id = " + object["id"]);
            console.log(nombre);
            console.log(apellidos);
            addRow(object["id"], nombre, apellidos);
            // loadTable();
        })
        .catch(error => {
            console.error('An error occurred in fetch:', error);
        })
}

function addRow(id, nombre, apellidos) {
    // Get the table element in which you want to add row
    let table = document.getElementById("mytable");

    // Create a row using the inserRow() method and
    // specify the index where you want to add the row
    let row = table.insertRow(-1); // We are adding at the end

    // Create table cells
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);

    // Add data to c1 ... c4
    c1.innerText = id;
    c2.innerText = nombre;
    c3.innerText = apellidos;
    c4.innerHTML = '<button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
        id + ')";>Editar</button>' +
        '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
        id + '); deleteRow(this);">Borrar</button></td>';
}

function guardaRow(r) {
    rowIndex = r.parentNode.parentNode.rowIndex;;
    console.log("RowIndex = " + rowIndex);
    return;
}

function updateRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    console.log("ParentNode row = " + i)
    // document.getElementById("tabla").deleteRow(i);
    return i;
}


function showUserEditBox(id) {
    console.log(id);
    fetch(`${protocolo}://${host}:${port}?tabla=autores&accion=consultarAutor&id=${id}`)
        .then(response => response.json())
        .then(response => {
            object = JSON.stringify(response);
            object = JSON.parse(object);
            console.log("Dentro de showUserEditBox, object = " + object);
            console.log("showUserEditBox, response id = " + object[0]["id"]);
            console.log("response = " + response);
            console.log("showUserEditBox -- response.nombre = " + object[0]["nombre"] + typeof (object[0]["nombre"]));

            Swal.fire({
                title: "Edición de autor",
                html:
                    '<input id="id" type="hidden" value=' + object[0]["id"] +
                    // autor["id"] +
                    ">" +
                    '<input id="fname" class="swal2-input" placeholder="First" value="' + object[0]["nombre"] +
                    // user["nombre"] +
                    '">' +
                    '<input id="lname" class="swal2-input" placeholder="Last" value="' + object[0]["apellidos"] +
                    // user["apellidos"] +
                    '">',
                focusConfirm: false,
                preConfirm: () => {
                    userEdit();
                }

            })
        })
        .catch(error => {
            console.error('An error occurred in fetch:', error);
        })
}


function userEdit() {
    // const id = document.getElementById("id").value;
    const id = document.getElementById("id").value;
    const nombre = document.getElementById("fname").value;
    const apellidos = document.getElementById("lname").value;

    console.log('Datos para actualizar = ' + id + ' ' + nombre + ' ' + apellidos + ' ' + rowIndex);
    fetch(`${protocolo}://${host}:${port}/autores?accion=actualizar&id=${id}&nombre=${nombre}&apellidos=${apellidos}`)
        .then(response => {
            response.json();
            console.log("response.json");
        })
        .then(response => {
            object = JSON.stringify(response);
            object = JSON.parse(object);
            console.log("userEdit -- response.nombre = " + object[0]["nombre"] + typeof (object[0]["nombre"]));
            table = document.getElementById("mytable");
            row = table.rows[rowIndex];
            console.log("Renglón a actualizar: " + rowIndex);
            let c2 = row.SelectSingleNode("td[1]");
            let c3 = row.SelectSingleNode("td[2]");

            c2.innerText = nombre;
            c3.innerText = apellidos;

        })

        .catch(error => {
            console.error('An error occurred in fetch:', error);
        })
    i = rowIndex - 1
    console.log("Renglón a actualizar: " + i);
    document.getElementById('mytable').rows[i].cells[1].innerText = nombre;
    document.getElementById('mytable').rows[i].cells[2].innerText = apellidos;
    // table = document.getElementById("mytable");
    // row = table.rows[rowIndex];
    // console.log("Renglón a actualizar: " + rowIndex);
    // let c2 = row.SelectSingleNode("td[1]");
    // let c3 = row.SelectSingleNode("td[2]");
    // c2.innerText = nombre;
    // c3.innerText = apellidos;
}


function userDelete(id) {
    // const nombre = document.getElementById("fname").value;
    // const apellidos = document.getElementById("lname").value;
    // const username = document.getElementById("username").value;
    // const email = document.getElementById("email").value;
    alert(`http://localhost/env.php?tabla=autores&accion=baja&id=${id}`);
    fetch(`http://localhost/env.php?tabla=autores&accion=baja&id=${id}`)
        // .then(response => response.json())
        .then(response => {
            loadTable();
        })
        .catch(error => {
            console.error('An error occurred in fetch:', error);
        })
}

