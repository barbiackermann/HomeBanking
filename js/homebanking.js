//Declaración de variables
var nombreUsuario = "Bárbara Ackermann";
var saldoCuenta = 50000;
var saldoCuentaUsd = 5000;
var limiteExtraccion = 1000;
var servicios = {agua : "350", telefono : "425", luz : "210", internet : "570"};
var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;
var pin = 9876;
var cambioUsdCompra = 43.42; 
var cambioUsdVenta=41.01;

function sumarDinero(monto) {
    saldoCuenta += monto;
}

function restarDinero(monto) {
    saldoCuenta -= monto;
}

function validarSaldoDisponible(monto) {
    if (monto <= saldoCuenta) {
        return true;
    } else {
        alert("Saldo Insuficiente");
        return false;
    }
}

function validarLimiteExtraccion(monto) {
    if (monto <= limiteExtraccion) {
        return true;
    } else {
        alert("El monto ingresado supera el límite de extracción");
        return false;
    }
}

function validarBilletesde100(monto) {
    if (monto%100 == 0){
        return true;
    } else {
        alert("Solo puedes extraer en billetes de 100");
                return false;}
}
function validarNull(monto){
    if (isNaN(monto)||monto<0){
        alert ("El valor ingresado es nulo o incorrecto. Reintentar.");
        return false;
    }
    else {
        return true;
    }
}
    
   
//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    iniciarSesion();
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarSaldoUsd();
    actualizarLimiteEnPantalla();
};


//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    var nuevoLimiteExtraccion = parseInt(prompt("Ingresá el nuevo límite de extracción"));
    limiteExtraccion=nuevoLimiteExtraccion;
    if (validarNull(limiteExtraccion)){
        actualizarLimiteEnPantalla();
        alert ("El nuevo límite de extracción es "+limiteExtraccion);
}
}

function extraerDinero() {
    var monto=parseInt(prompt("Cuanto dinero querés extraer?"));
    var saldoAnterior=saldoCuenta;
        if (validarNull(monto) && validarSaldoDisponible(monto) && 
        validarLimiteExtraccion(monto) &&
        validarBilletesde100(monto)){
            restarDinero(monto); 
            actualizarSaldoEnPantalla(); 
            alert ("Extrajiste: $"+monto+"\nSaldo Anterior: $"+saldoAnterior+
            "\nSaldo Actual: $"+saldoCuenta);
        } 
    }

function depositarDinero() {
    var monto=parseInt(prompt("Cuanto dinero querés depositar?"));
    var saldoAnterior=saldoCuenta; 
    if (validarNull (monto)){
        sumarDinero(monto);
        actualizarSaldoEnPantalla();
        alert ("Depositaste: $"+monto+"\nSaldo Anterior: $"+saldoAnterior+
        "\nSaldo Actual: $"+saldoCuenta);
    }
}

function pagarServicio() {
    var saldoAnterior=saldoCuenta; 
    var eleccion = parseInt(prompt("Qué servicio querés pagar?\n1- Agua\n2- Teléfono\n3- Luz\n4- Internet"));
        switch (eleccion){
            case 1: if (validarNull(validarSaldoDisponible(servicios.agua))){
                restarDinero(servicios.agua);
                actualizarSaldoEnPantalla(); 
                alert ("Has pagado el servicio AGUA\nPagaste: $"+servicios.agua+"\nSaldo Anterior: $"+saldoAnterior+
                "\nSaldo Actual: $"+saldoCuenta);
            }
                break;
            case 2: if (validarSaldoDisponible(servicios.telefono)){
                restarDinero(servicios.telefono);
                actualizarSaldoEnPantalla(); 
                alert ("Has pagado el servicio TELEFONO\nPagaste: $"+servicios.telefono+"\nSaldo Anterior: $"+saldoAnterior+
                "\nSaldo Actual: $"+saldoCuenta);
            }
                break;
            case 3: if (validarSaldoDisponible(servicios.luz)){
                restarDinero(servicios.luz);
                actualizarSaldoEnPantalla(); 
                alert ("Has pagado el servicio LUZ\nPagaste: $"+servicios.luz+"\nSaldo Anterior: $"+saldoAnterior+
                "\nSaldo Actual: $"+saldoCuenta);
            }
                break;
            case 4: if (validarSaldoDisponible(servicios.internet)){
                restarDinero(servicios.internet);
                actualizarSaldoEnPantalla(); 
                alert ("Has pagado el servicio INTERNET\nPagaste: $"+servicios.internet+"\nSaldo Anterior: $"+saldoAnterior+
                "\nSaldo Actual: $"+saldoCuenta);
            }
                break;
            default: alert ("El número no corresponde a ningún servicio asociado") ;
                break;
        }
        {
        }
}

function transferirDinero() {
    var transferir= parseInt(prompt ("Cuánto dinero deseas transferir"));
    if (validarNull(transferir) && validarSaldoDisponible(transferir)){
        var cuentaATransferir = parseInt(prompt("Ingrese el nro de cuenta de destino"));
        if (cuentaATransferir==cuentaAmiga1 || cuentaATransferir==cuentaAmiga2) {
            restarDinero(transferir);
            actualizarSaldoEnPantalla(); 
            alert ("Transferiste: $"+transferir+"\nCuenta Destino: "+cuentaATransferir);
        } else {
            alert ("La cuenta no existe en cuentas amigas");
        }
    }
}

function iniciarSesion() {
    if ((validarNull(prompt("Ingrese su PIN:"))) == pin) {
        alert("Bienvenide "+nombreUsuario+", ya puedes operar.");
    } else {
        saldoCuenta=0;
        saldoCuentaUsd=0;
        alert ("Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad");
        return false;
    }
}

function comprarDolares () {
    var montoAComprar = (parseInt(prompt("El precio del dolar para la compra hoy es " + cambioUsdCompra +"\nCuántos U$D querés comprar?")));
    if (validarNull(montoAComprar)==true){
        if (validarSaldoDisponible(montoAComprar*cambioUsdCompra)) {
            saldoCuentaUsd = saldoCuentaUsd + montoAComprar;
            restarDinero(montoAComprar*cambioUsdCompra);
            actualizarSaldoEnPantalla();
            actualizarSaldoUsd();
            alert ("Compraste en dólares: U$D"+ montoAComprar + "\nSaldo actual en dólares: U$D" + saldoCuentaUsd+"\nSaldo Actual en Pesos: $"+saldoCuenta);
    }
}
}

function venderDolares () {
    var montoAVender = (parseInt(prompt("El precio del dolar para la venta hoy es " + cambioUsdVenta +"\nCuántos U$D querés vender?")));
    if (validarNull(montoAVender)==true){
        if (validarSaldoDisponible(montoAVender*cambioUsdVenta)) {
            saldoCuentaUsd = saldoCuentaUsd-montoAVender;
            sumarDinero(montoAVender*cambioUsdVenta);
            actualizarSaldoEnPantalla();
            actualizarSaldoUsd();
            alert ("Vendiste en dólares: U$D"+ montoAVender + "\nSaldo actual en dólares: U$D" + saldoCuentaUsd+"\nSaldo Actual en Pesos: $"+saldoCuenta);
        }
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$ " + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

function actualizarSaldoUsd() {
    document.getElementById("saldo-cuenta-usd").innerHTML = "U$D " + saldoCuentaUsd;
}

