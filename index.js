// function loadTable() {
//     const xhttp = new XMLHttpRequest();
//     xhttp.open("GET", "https://www.mecallapi.com/api/users");
//     xhttp.send();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log(this.responseText);
//             var trHTML = "";
//             const objects = JSON.parse(this.responseText);
//             for (let object of objects) {
//                 trHTML += "<tr>";
//                 trHTML += "<td>" + object["id"] + "</td>";
//                 trHTML +=
//                     '<td><img width="50px" src="' +
//                     object["avatar"] +
//                     '" class="avatar"></td>';
//                 trHTML += "<td>" + object["fname"] + "</td>";
//                 trHTML += "<td>" + object["lname"] + "</td>";
//                 trHTML += "<td>" + object["username"] + "</td>";
//                 trHTML +=
//                     '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
//                     object["id"] +
//                     ')">Edit</button>';
//                 trHTML +=
//                     '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
//                     object["id"] +
//                     ')">Del</button></td>';
//                 trHTML += "</tr>";
//             }
//             document.getElementById("mytable").innerHTML = trHTML;
//         }
//     };
// }

// import { XMLHttpRequest } from './node_modules/xmlhttprequest'; 
// import { XMLHttpRequest } from "./node_modules/xmlhttprequest"; 
// require('node_modules/xmlhttprequest').XMLHttpRequest(); 
document.getElementById("Autores").innerHTML = "<h2>Principio</h2>";

// console.log("Antes de la llamada a la función loadTable()");


loadTable();

async function loadTable() {
    document.getElementById("Autores").innerHTML = "Inicio de la función loadTable()";
    fetch('http://localhost:8080/autores?accion=consultar_tabla')
        .then(response => response.json())
        .then(response => {
            // let json = response.json();
            // console.log("Con fetch" + response[0].id);
            document.getElementById("Autores").innerHTML = "Dentro del fetch..." // + this.responseText;
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
                    ')">Edit</button>';
                trHTML +=
                    '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
                    object["id"] +
                    ')">Del</button></td>';
                trHTML += "</tr>";
            }
            document.getElementById("mytable").innerHTML = trHTML;
        })
        .catch(error => {
            console.error('An error occurred in fetch:', error);
        })
}




// async function loadTable_conXMLHttpRequest() {
//     document.getElementById("Autores").innerHTML = "Inicio de la función loadTable()";
//     // console.log("Antes del open: ");
//     const xhttp = new XMLHttpRequest();
//     xhttp.open("GET", "http://localhost:8080/autores?accion=consultar");
//     // xhttp.responseType = "json";
//     xhttp.send();
//     xhttp.onreadystatechange = function () {
//         // console.log("RESPUESta: " + this.JSON);     //responseText);
//         if (this.readyState == 4 && this.status == 200) {
//             document.getElementById("Autores").innerHTML = "Dentro del onready 2..." // + this.responseText;
//             var trHTML = "";
//             // 
//             const objects = JSON.parse(this.JSON);
//             for (let object of objects) {
//                 trHTML += "<tr>";
//                 trHTML += "<td>" + object["id"] + "</td>";
//                 trHTML +=
//                     '<td><img width="50px" src="' +
//                     object["avatar"] +
//                     '" class="avatar"></td>';
//                 trHTML += "<td>" + object["nombre"] + "</td>";
//                 trHTML += "<td>" + object["apellidos"] + "</td>";
//                 // trHTML += "<td>" + object["username"] + "</td>";
//                 trHTML +=
//                     '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
//                     object["id"] +
//                     ')">Edit</button>';
//                 trHTML +=
//                     '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
//                     object["id"] +
//                     ')">Del</button></td>';
//                 trHTML += "</tr>";
//             }
//             document.getElementById("mytable").innerHTML = trHTML;
//         }
//     };
// }


// loadTable();

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
    fetch(`http://localhost:8080/autores?accion=alta&nombre=${nombre}&apellidos=${apellidos}`)
        // .then(response => response.json())
        .then(response => {
            loadTable();
        })
        .catch(error => {
            console.error('An error occurred in fetch:', error);
        })
}

//     const xhttp = new XMLHttpRequest();
//     xhttp.open("POST", "https://www.mecallapi.com/api/users/create");
//     xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     xhttp.send(
//         JSON.stringify({
//             fname: fname,
//             lname: lname,
//             username: username,
//             email: email,
//             avatar: "https://www.mecallapi.com/users/cat.png",
//         })
//     );
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             const objects = JSON.parse(this.responseText);
//             Swal.fire(objects["message"]);
//             loadTable();
//         }
//     };
// }

function showUserEditBox(id) {
    console.log(id);
    fetch(`http://localhost:8080/autores?accion=consultarAutor&id=${id}`)
        // .then(response => response.json())
        .then(response => {
            response => response.json();
            console.log("response = " + response);
            objects = JSON.stringify(response);
            objects = JSON.parse(objects);
            console.log("showUserEditBox -- response.nombre = " + objects.nombre + typeof (response.nombre));
            console.log("objects = " + objects);
            // ***************************************************************
            response.id = 1;
            response.nombre = "Luis";
            response.apellidos = "de la Garza";
            // ***************************************************************
            //for (let object of objects) {
                Swal.fire({
                    title: "Edición de autor",
                    html:
                        '<input id="id" type="hidden" value=' + response.id +
                        // autor["id"] +
                        ">" +
                        '<input id="fname" class="swal2-input" placeholder="First" value="' + response.nombre +
                        // user["nombre"] +
                        '">' +
                        '<input id="lname" class="swal2-input" placeholder="Last" value="' + response.apellidos +
                        // user["apellidos"] +
                        '">',
                    focusConfirm: false,
                    preConfirm: () => {
                        userEdit();
                    }
                }
                )
            // }

        })
        .catch(error => {
            console.error('An error occurred in fetch:', error);
        })
}







// const xhttp = new XMLHttpRequest();

// xhttp.open("GET", "https://www.mecallapi.com/api/users/" + id);
// xhttp.send();
// xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//         const objects = JSON.parse(this.responseText);
//         const user = objects["user"];
//         console.log(user);

// '<input id="username" class="swal2-input" placeholder="Username" value="' +
// user["username"] +
// '">' +
// '<input id="email" class="swal2-input" placeholder="Email" value="' +
// user["email"] +
// '">',

function userEdit() {
    // const id = document.getElementById("id").value;
    const id = document.getElementById("id").value;
    const nombre = document.getElementById("fname").value;
    const apellidos = document.getElementById("lname").value;

    fetch(`http://localhost:8080/autores?accion=actualizar&id=${id}&nombre=${nombre}&apellidos=${apellidos}`)
        // .then(response => response.json())
        .then(response => {
            loadTable();
        })
        .catch(error => {
            console.error('An error occurred in fetch:', error);
        })
}

// function userEdit() {
//     const id = document.getElementById("id").value;
//     const fname = document.getElementById("fname").value;
//     const lname = document.getElementById("lname").value;
//     const username = document.getElementById("username").value;
//     const email = document.getElementById("email").value;

//     const xhttp = new XMLHttpRequest();
//     xhttp.open("PUT", "https://www.mecallapi.com/api/users/update");
//     xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     xhttp.send(
//         JSON.stringify({
//             id: id,
//             fname: fname,
//             lname: lname,
//             username: username,
//             email: email,
//             avatar: "https://www.mecallapi.com/users/cat.png",
//         })
//     );
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             const objects = JSON.parse(this.responseText);
//             Swal.fire(objects["message"]);
//             loadTable();
//         }
//     };
// }

function userDelete(id) {
    // const nombre = document.getElementById("fname").value;
    // const apellidos = document.getElementById("lname").value;
    // const username = document.getElementById("username").value;
    // const email = document.getElementById("email").value;
    fetch(`http://localhost:8080/autores?accion=baja&id=${id}`)
        // .then(response => response.json())
        .then(response => {
            loadTable();
        })
        .catch(error => {
            console.error('An error occurred in fetch:', error);
        })
    // const xhttp = new XMLHttpRequest();
    // xhttp.open("DELETE", "https://www.mecallapi.com/api/users/delete");
    // xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // xhttp.send(
    //     JSON.stringify({
    //         id: id,
    //     })
    // );
    // xhttp.onreadystatechange = function () {
    //     if (this.readyState == 4) {
    //         const objects = JSON.parse(this.responseText);
    //         Swal.fire(objects["message"]);
    //         loadTable();
    //     }
    // };
}

