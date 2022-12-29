function UserInformacion() {
    let valores = [];

    valores.push(document.getElementById("nombreF").value);
    valores.push(document.getElementById("edadF").value);
    valores.push(document.getElementById("mailF").value);
    let nombreF = valores[0];
    let nombre = nombreF.toString();
    let edadF = valores[1];
    let edad = parseInt(edadF.toString());
    let mailF = valores[2];
    let mail = mailF.toString();


    class Usuario {
        constructor(nombre, edad, mail) {
            this.nombre = nombre;
            this.edad = edad;
            this.mail = mail;
        }
        mostrarUser() {

            if (this.nombre && this.edad && this.mail) {
                console.log('Los datos del usuario ' + this.nombre + ' son:' + 'edad: ' + this.edad + ' email: ' + this.mail);

            } else {
                alert('Uno o mas datos son inválidos, undefined o nulos, por favor intente de nuevo');
            }
        }
    }
    const usuario1 = new Usuario(nombre, edad, mail);
    usuario1.mostrarUser();
    localStorage.setItem("user", JSON.stringify(usuario1));
}

$("#formularioUser").submit(function (e) {
    //Prevenimos el comportamiento de submit 
    e.preventDefault();
    UserInformacion();
});