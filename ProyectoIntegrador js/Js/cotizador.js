
$(document).ready(function () {
    obtenerCotizacion("dai");
    obtenerCotizacion("btc");
    obtenerCotizacion("eth");
    obtenerCotizacion("usdc");
});

function obtenerCotizacion(moneda) {
    $.get("https://criptoya.com/api/ripioexchange/" + moneda + "/ars/100").done(function (resultado, estado) {
        console.log(resultado);
        if (estado == "success") {

            $("#" + moneda).append(`  <p> venta:$ ${resultado.ask}</p>
                                    <p> compra: $ ${resultado.bid}</p>`);


        }
    });
}
