
const $tableroJuego = document.querySelector('body');
const juegoPosibilidades =['opcion1','opcion2','opcion3','opcion4','opcion5','opcion6'];
const $botonEmpezar = document.querySelector('#empezar');
const $rounds = document.querySelector('#rounds');
let movimientosMaquina=[];
let movimientosJugador=[];
let tiempoMaquina=1000;
let rounds=1;


function iniciarSimon(){
   movimientosMaquina=[];
   $botonEmpezar.onclick= manejarRonda;
    }

function manejarRonda(){ 
    $rounds.textContent=`Round nº ${rounds}`;
    $botonEmpezar.textContent='Presta atencion!';
    bloquearJugador();
    manejarMovimientosMaquina();
    setTimeout(() => {
        $botonEmpezar.textContent='Tu turno!!';
        $botonEmpezar.className='bloqueo';
        resetearInputsJugador();
        desbloquearJugador();     
    }, tiempoMaquina);
    resetearInputsJugador();
    rounds++;
}

function resetearInputsJugador(){
    if(movimientosJugador.length!=0){
        movimientosJugador=[]
    }
}

function manejarMovimientosMaquina(){
    const resultado = Math.floor(Math.random()*(juegoPosibilidades.length)+1);
    let eleccionC = '#opcion'+resultado;
    movimientosMaquina.push(eleccionC);
   
    for(let i=0;i<movimientosMaquina.length;i++){
        let randomEleccion = document.querySelector(movimientosMaquina[i]);
        setTimeout(function time(){
        randomEleccion.classList.add('progreso');
        setTimeout(() => {
            randomEleccion.classList.remove("progreso");
          }, 700);

        },i*1000); 
    } 
    tiempoMaquina=movimientosMaquina.length*1000;
    return true;
}

function aplicarOpcionSeleccionada(id){
    movimientosJugador.push('#'+id);
    document.querySelector('#'+id).classList.add('progreso');  
        setTimeout(() => {
            document.querySelector('#'+id).classList.remove('progreso');  
          }, 500);
    compararMovimientos(movimientosJugador,movimientosMaquina);
}

function compararMovimientos(jugador, maquina ){ 
    const ultimoMovimiento=jugador.length-1;

    if(maquina[ultimoMovimiento]!==jugador[ultimoMovimiento]){
        $botonEmpezar.textContent='Mal!!';
        rounds=1;
        $botonEmpezar.className='';
        iniciarSimon();
        setTimeout(()=>{
            $botonEmpezar.textContent='Empezar de nuevo?';
        },1000);
    }
    if(maquina[ultimoMovimiento]==jugador[ultimoMovimiento] && maquina.length==jugador.length){
        $botonEmpezar.textContent='Bien!!';
        setTimeout(() => {
            manejarRonda(); 
          }, 1200);   
    }
}

function bloquearJugador(){
    $tableroJuego.className ='bloqueo';
}
function desbloquearJugador(){
    $tableroJuego.className='';
}

iniciarSimon();
