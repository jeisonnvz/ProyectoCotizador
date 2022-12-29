let userStorage = JSON.parse(localStorage.getItem("user"));
console.log("aqui a bajo");

//mostrar los datos capturados del userstorage
console.log(userStorage);

function mostrarUserInfo() {

    $("#inputInfo").prepend(`<div id='infoI' > 
    <h6> <strong> Nombre: ${userStorage.nombre} </strong></h6>
    <h6> <strong> Edad:${userStorage.edad}  </strong></h6> 
    <h6>  <strong>Correo:${userStorage.mail} </strong></h6>
     </div>`);
}

var precioEconIva;

//funcion que ejecuta el  codigo principal del sistema
function EjecutarForm() {
    //capturando eventos del formulario haciendolo string y parseandolo.

    let valores = [];

    valores.push(document.getElementById("pesoForm").value);
    valores.push(document.getElementById("altoForm").value);
    valores.push(document.getElementById("anchoForm").value);
    valores.push(document.getElementById("largoForm").value);
    let jeiPesof = valores[0];
    let pesoFisico = parseInt(jeiPesof.toString());
    let jeiAlto = valores[1];
    let alto = parseInt(jeiAlto.toString());
    let jeiAncho = valores[2];
    let ancho = parseInt(jeiAncho.toString());
    let jeiLargo = valores[3];
    let largo = parseInt(jeiLargo.toString());
    const precioMinimo = 350;
    var iva21 = 21;

    
    //capturando la zona seleccionada en el formulario
    const zonaSe = document.getElementById('selecionzona');
    zonaSeleccionada = zonaSe.options[zonaSe.selectedIndex].value;

    //creando la clase paquete.
    class Paquete {
        constructor(peso, largo, ancho, alto) {
            this.pesoFisico = peso;
            this.largo = largo;
            this.ancho = ancho;
            this.alto = alto;
            this.pesoVolumetrico = this.largo * this.ancho * this.alto / 4000;
        }

        calcularPExP() {
            let precioxP;
            if (this.pesoFisico > this.pesoVolumetrico) {

                switch (true) {
                    case (this.pesoFisico > 2 && this.pesoFisico <= 3):
                        precioxP = 160 * this.pesoFisico;
                        // console.log(precioxP);
                        break;
                    case (this.pesoFisico > 3 && this.pesoFisico <= 5):
                        precioxP = 155 * this.pesoFisico;
                        // console.log(precioxP);
                        break;
                    case (this.pesoFisico > 5 && this.pesoFisico <= 100):
                        precioxP = 145 * this.pesoFisico;
                        // console.log(precioxP);
                        break;
                    case (this.pesoFisico <= 2):
                        precioxP = precioMinimo;
                        // console.log(precioxP);
                        break;
                    default:
                        alert('los parametros ingresados no son soportados11');
                        break;


                }
            } else if (this.pesoVolumetrico > this.pesoFisico) {

                switch (true) {
                    case (this.pesoVolumetrico > 2 && this.pesoVolumetrico <= 3):
                        precioxP = 160 * this.pesoVolumetrico;
                        // console.log(precioxP);
                        break;
                    case (this.pesoVolumetrico > 3 && this.pesoVolumetrico <= 5):
                        precioxP = 155 * this.pesoVolumetrico;
                        // console.log(precioxP);
                        break;
                    case (this.pesoVolumetrico > 5 && this.pesoVolumetrico <= 100):
                        precioxP = 145 * this.pesoVolumetrico;
                        // console.log(precioxP);
                        break;
                    case (this.pesoVolumetrico <= 2):
                        precioxP = precioMinimo;
                        // console.log(precioxP);
                        break;
                    default:
                        alert('los parametros ingresados no son soportados1');
                        break;

                }
            }
            //console.log('el precio por Kg es : $' + precioxP);
            return precioxP;
        }
    }

    
    //definiendo el objeto paquete.
    const paquete1 = new Paquete(pesoFisico, largo, ancho, alto);
    paquete1.calcularPExP();
    var resPrecioxP = paquete1.calcularPExP();


    const zonasHabilitadas = [
        'caba',
        'gba',
        'rosario',
        'entre rios'
    ];

    //Buscando la zona selecionada en el formulario y buscandola en las zonas habilitadas.
    var zonaBus = zonasHabilitadas.find(zonasHabilitadas => zonasHabilitadas == zonaSeleccionada);

    //Funcion para definir el precio por zona
    function precioxZona(zona) {
        let precioZ;
        switch (true) {
            case zona == 'caba':
                precioZ = 100;
                break;
            case zona == 'gba':
                precioZ = 150;
                break;
            case zona == 'rosario':
                precioZ = 200;
                break;
            case zona == 'entre rios':
                precioZ = 100;
                break;

            default:
                alert('zona no soportada');
                break;
        }
        return precioZ;
    }
    var resPrecioxZona = precioxZona(zonaBus);

    //Funcion para calcular el precio del envio sin Iva
    function precioEnvioTsIva(precioExzona, precioExPeso) {
        let precioSIva = precioExzona + precioExPeso;
        return precioSIva;
    }

    var precioEsIva = precioEnvioTsIva(resPrecioxZona, resPrecioxP);
    //Funcion para calcular el valor del iva del envio
    function calcularIvaEnvio(iva, precioEsIva) {
        let ivaEnvio = iva * precioEsIva / 100;
        //console.log('el iva del envio es; ' + ivaEnvio);
        return ivaEnvio;
    }

    var ivaDelEnvio = calcularIvaEnvio(iva21, precioEsIva);
    //funcion para calcular el precio del envio con el iva 
    function precioEcIva(precioEsIva, ivaEnvio) {
        let precioEcIva = precioEsIva + ivaEnvio;
        return precioEcIva;
    }
    precioEconIva = precioEcIva(precioEsIva, ivaDelEnvio);
}
//Funcion para modificar el DOM y mostrar el precio del envio 
function mostrarPrecioHtml() {

    $("#inputPrice").append(`<div id='precioId'><h3>El precio del envio con iva es: $ ${precioEconIva} </h3></div>`);
    $("#inputPrice").css({ color: 'rgb(9, 241, 21)' });
}

function CambioColor(id, colorOver, colorOut) {
    let cambioColor = $(id);
    cambioColor.mouseover(function () {
        $(this).css("background", colorOver);
    });
    cambioColor.mouseout(function () {
        $(this).css("background", colorOut);
    });
}

$(function () {

    $("#saludoInicial").append(`<p>
"<h3> Bienvenido  <strong>  ${userStorage.nombre} </strong> Ingresa los datos de tu cotizacion </h3>"
<p/>`);

    function action() {

        // $("#infoPeso").empty();
        $("#InfoPid").prepend(`<div id="infoEntrega"><img src='imagenes/servicioe.png'>
        <p><h4>  <strong>Servicio de Entrega</strong></h4>  Nuestro servicios varian 
        dependiendo de la zona ingresada si necesitas auida podes contactarnos</h4></p>`);
    }
   
    $("#changeImg").click(function () {
        $("#infoPeso").fadeOut("slow", function () {

            action();
            console.log('entro1')
        });

        $("#infoEntrega").fadeIn("slow", function () {
            $("#infoEntrega").empty();
        });
        
    
    });

    $("#formC").submit(function (e) {
        //Prevenimos el comportamiento de submit 
        e.preventDefault();
        EjecutarForm();
        mostrarPrecioHtml();
    });

    $("#miInfo").click(function () {
        $("#miInfo").fadeIn("slow", function () {
           
            mostrarUserInfo();
        } 
    )});

    CambioColor("#miInfo", "grey", "blue");
    CambioColor("#changeImg", "grey", "blue");
});