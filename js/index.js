
const juegoPosibilidades =['opcion1','opcion2','opcion3','opcion4','opcion5','opcion6'];
let movimientosMaquina=[];
let movimientosJugador=[];
let timeComp=1000;
let $botonEmpezar = document.querySelector('#empezar');
let $rounds = document.querySelector('#rounds');
let contador=1;

function inicioSimon(){
   movimientosMaquina=[];
$botonEmpezar.onclick= manejarRonda;
};

function manejarRonda(){ 
    $rounds.textContent=`Round nº ${contador}`;
    $botonEmpezar.textContent='Presta atencion!';
    bloquearJugador();
    movimientosMaqManejador();
    setTimeout(() => {
        $botonEmpezar.textContent='Tu turno!!';
        $botonEmpezar.className='bloqueo';
        resetearInputsJugador();
        desbloquearJugador();     
    }, timeComp);
      
    function resetearInputsJugador(){
        if(movimientosJugador.length!=0){
            movimientosJugador=[]
        }
    }
    contador++;
}

function movimientosMaqManejador(){
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
    timeComp=movimientosMaquina.length*1000;
    return true;
}

function opcionSeleccionada(id){
    movimientosJugador.push('#'+id);
    document.querySelector('#'+id).classList.add('progreso');  
        setTimeout(() => {
            document.querySelector('#'+id).classList.remove('progreso');  
          }, 500);
    compararMovimientos(movimientosJugador,movimientosMaquina);
}

function compararMovimientos(movimientosJugador, movimientosMaquina ){
    if(movimientosMaquina[movimientosJugador.length-1]!==movimientosJugador[movimientosJugador.length-1]){
        $botonEmpezar.textContent='Mal!!';
        contador=1;
        $botonEmpezar.className='';
        inicioSimon();
        setTimeout(()=>{
            $botonEmpezar.textContent='Empezar de nuevo?';
        },1000);
    }
    if(movimientosMaquina[movimientosMaquina.length-1]==movimientosJugador[movimientosJugador.length-1] && movimientosMaquina.length==movimientosJugador.length){
        $botonEmpezar.textContent='Bien!!';
        setTimeout(() => {
            manejarRonda(); 
          }, 1200);   
    }
}

function bloquearJugador(){
    const tablero = document.querySelector('#entire');
    tablero.className ='bloqueo';
}
function desbloquearJugador(){
    const tablero=document.querySelector('#entire');
    tablero.className='';
}
inicioSimon();