window.onload = function(){
  //DECLARACION DE VARIABLES INICIALES
  var derecha= 39;
  var izquierda= 37;
  var arriba= 38;
  var abajo= 40; 
  var principal = document.querySelector('#principal');
  var camion = document.getElementById("camion");
  var bloque1 = document.getElementById("bloque1");
  var bloque2 = document.getElementById("bloque2");
  var bloque3 = document.getElementById("bloque3");
  var botonInicio = document.getElementById("botonInicio");
  var botonReinicio = document.getElementById("botonReinicio");
  var botonMensaje = document.getElementById("botonMensaje");
  var cuentaAtrasdiv = document.getElementById("cuentaAtras");
  var indicadorVida1 = document.getElementById("indicadorVidas1");
  var indicadorVida2 = document.getElementById("indicadorVidas2");
  var indicadorVida3 = document.getElementById("indicadorVidas3");
  var indicadorEscudo = document.getElementById("indicadorEscudo");
  var bloqueVida = document.getElementById("vidas");
  var bloqueEscudo = document.getElementById("escudo");
  var meta = document.getElementById("meta");
  var boom = document.getElementById("boom");
  var contador = 0;
  var cuentaAtras = 3;
  var juegoFinalizado = true;
  var velocidadBloque1 = 4; 
  var velocidadBloque2 = 6; 
  var velocidadBloque3 = 8; 
  var choqueBloque1 = false;
  var choqueBloque2 = false;
  var choqueBloque3 = false;
  var choqueBloqueVida = false;
  var choqueBloqueEscudo = false;
  var escudoActivo = false;
  var choqueMeta = false;
  bloqueVida.style.visibility= "hidden";
  bloqueEscudo.style.visibility= "hidden";
  swal("Camino al Mercado", "El objetivo de este juego es conducir el camión de camino al mercado, pero cuidado, los coches de la carretera van muy rápido y debes evitar chocar con ellos para seguir con vida. De vez en cuando aparecen corazones, intenta cojerlos para recuperar vidas, también intenta cojer los escudos que te vuelven invulnerable durante un tiempo, y ten en cuenta que los coches van aumentando de velocidad. Buena Suerte!!!");
  //---------------------------------------------------------------------------------------------------------
 //BOTON INICIAR
  botonInicio.addEventListener('click', function(){
    botonInicio.style.visibility = "hidden";
    botonInicio.disabled=true;
    cuentaAtrasdiv.style.visibility = "visible";
    iniciarCuentaAtras = setInterval(function(){
      cuentaAtras = cuentaAtras - 1;
      if(cuentaAtras == 0){
        cuentaAtrasdiv.innerHTML="YA";
        iniciarJuego = setTimeout(function(){
          bloque1.style.visibility = "visible";
          bloque2.style.visibility = "visible";
          bloque3.style.visibility = "visible";
          cuentaAtrasdiv.style.visibility= "hidden";
          juegoFinalizado = false;
          iniciarTimeoutMeta = setTimeout(TimeoutMeta,60000);
          iniciarBloqueVIda = setInterval(velocidadVida,8000);
          iniciarBloqueEscudo = setInterval(velocidadEscudo,15000);
        },1000);
        clearInterval(iniciarCuentaAtras);
      }
      else{
        cuentaAtrasdiv.innerHTML= cuentaAtras;
      }
    },1000); 
  });
 //---------------------------------------------------------------------------------------------------------
//MOVIMIENTO CAMION FLECHAS
   document.addEventListener("keydown", function(key){
     if(juegoFinalizado == false){
      if(key.keyCode == izquierda){
        var leftnum = parseInt(window.getComputedStyle(camion).getPropertyValue("left"));
        if(leftnum > 0){
          var leftvalor = leftnum - 40;
          camion.style.left = leftvalor + 'px';
        }
       }
       if(key.keyCode == derecha){
        var leftnum = parseInt(window.getComputedStyle(camion).getPropertyValue("left"));
        var leftvalor = leftnum + 40;
        if(leftvalor < 650){
          camion.style.left = leftvalor + 'px';
        }
       }
       else if(key.keyCode == arriba){
        var topnum = parseInt(window.getComputedStyle(camion).getPropertyValue("top"));
        var topvalor = topnum - 75;
        if(topvalor > 95){
          var topvalor = topnum - 75;
          camion.style.top = topvalor + 'px';
        }
       }
       else if(key.keyCode == abajo){
        var topnum = parseInt(window.getComputedStyle(camion).getPropertyValue("top"));
        if(topnum < 325){
          var topvalor = topnum + 75;
          camion.style.top = topvalor + 'px';
        }
       }   
      }
   });
   //---------------------------------------------------------------------------------------------------------
   //CONTADOR
   setInterval(function (){ 
     document.getElementById("contador").innerHTML = "PUNTUACION: " + contador;
  },100);
 //---------------------------------------------------------------------------------------------------------
   //CONTROL COLISIONES
   setInterval(function (){ 
     var camionTop = parseInt(window.getComputedStyle(camion).getPropertyValue("top"));
     var camionLeft = parseInt(window.getComputedStyle(camion).getPropertyValue("left"));
     var bloque1Top = parseInt(window.getComputedStyle(bloque1).getPropertyValue("top"));
     var bloque1Left = parseInt(window.getComputedStyle(bloque1).getPropertyValue("left"));
     var bloque2Top = parseInt(window.getComputedStyle(bloque2).getPropertyValue("top"));
     var bloque2Left = parseInt(window.getComputedStyle(bloque2).getPropertyValue("left"));
     var bloque3Top = parseInt(window.getComputedStyle(bloque3).getPropertyValue("top"));
     var bloque3Left = parseInt(window.getComputedStyle(bloque3).getPropertyValue("left")); 
     var bloqueVidaTop = parseInt(window.getComputedStyle(bloqueVida).getPropertyValue("top")); 
     var bloqueVidaLeft = parseInt(window.getComputedStyle(bloqueVida).getPropertyValue("left"));
     var bloqueEscudoTop =  parseInt(window.getComputedStyle(bloqueEscudo).getPropertyValue("top")); 
     var bloqueEscudoLeft = parseInt(window.getComputedStyle(bloqueEscudo).getPropertyValue("left"));
     var metaLeft = parseInt(window.getComputedStyle(meta).getPropertyValue("left"));
     var anchoCamion = camionLeft + (parseInt((window.getComputedStyle(camion).getPropertyValue("width"))));
     var anchoBloque1 = bloque1Left + (parseInt((window.getComputedStyle(bloque1).getPropertyValue("width"))));
     var anchoBloque2 = bloque2Left + (parseInt((window.getComputedStyle(bloque2).getPropertyValue("width"))));  
     var anchoBloque3 = bloque3Left + (parseInt((window.getComputedStyle(bloque3).getPropertyValue("width"))));
     var anchoBloqueVida = bloqueVidaLeft + (parseInt((window.getComputedStyle(bloqueVida).getPropertyValue("width"))));
     var anchoBloqueEscudo = bloqueEscudoLeft + (parseInt((window.getComputedStyle(bloqueEscudo).getPropertyValue("width"))));
     var anchoMeta= metaLeft + (parseInt((window.getComputedStyle(meta).getPropertyValue("width"))));
     var visivilidadIndicador1 = window.getComputedStyle(indicadorVida1).getPropertyValue("visibility");
     var visivilidadIndicador2 = window.getComputedStyle(indicadorVida2).getPropertyValue("visibility");
     var visivilidadIndicador3 = window.getComputedStyle(indicadorVida3).getPropertyValue("visibility");
    //BLOQUE 1
     if(choqueBloque1 == false && escudoActivo == false){
      if(camionTop == bloque1Top && (anchoBloque1 >= camionLeft && anchoBloque1 < anchoCamion)){
        boom.style.top = bloque1Top + 'px';
        boom.style.left = bloque1Left +'px';
        boom.style.visibility = 'visible';
        bloque1.style.visibility = 'hidden';
        setTimeout(function(){
          boom.style.visibility = 'hidden';
        },500);
        if(visivilidadIndicador1 == "visible"){
          indicadorVida1.style.visibility = "hidden";
          choqueBloque1 = true;
        }
        else if(visivilidadIndicador1== "hidden" && visivilidadIndicador2 == "visible"){
          indicadorVida2.style.visibility = "hidden";
          choqueBloque1 = true;
        }
        else if(visivilidadIndicador2 == "hidden" && visivilidadIndicador3 == "visible"){
          indicadorVida3.style.visibility = "hidden";
          choqueBloque1 = true;
          finJuego();
        }
      } 
     }   
    //BLOQUE 2
     if(choqueBloque2 == false && escudoActivo == false){
      if(camionTop == bloque2Top && (anchoBloque2 >= camionLeft && anchoBloque2 < anchoCamion)){
        boom.style.top = bloque2Top + 'px';
        boom.style.left = bloque2Left +'px';
        boom.style.visibility = 'visible';
        bloque2.style.visibility = 'hidden';
        setTimeout(function(){
          boom.style.visibility = 'hidden';
        },500);
        if(visivilidadIndicador1 == "visible"){
          indicadorVida1.style.visibility = "hidden";
          choqueBloque2 = true;
        }
        else if(visivilidadIndicador1== "hidden" && visivilidadIndicador2 == "visible"){
          indicadorVida2.style.visibility = "hidden";
          choqueBloque2 = true;
        }
        else if(visivilidadIndicador2 == "hidden" && visivilidadIndicador3 == "visible"){
          indicadorVida3.style.visibility = "hidden";
          choqueBloque2 = true;
          finJuego();
        }
      }
    }
     //BLOQUE 3
    if(choqueBloque3 == false && escudoActivo == false){
      if(camionTop == bloque3Top && (anchoBloque3 >= camionLeft && anchoBloque3 < anchoCamion)){
        boom.style.top = bloque3Top + 'px';
        boom.style.left = bloque3Left +'px';
        boom.style.visibility = 'visible';
        bloque3.style.visibility = 'hidden';
        setTimeout(function(){
          boom.style.visibility = 'hidden';
        },500);
          if(visivilidadIndicador1 == "visible"){
            indicadorVida1.style.visibility = "hidden";
            choqueBloque3 = true;
          }
          else if(visivilidadIndicador1== "hidden" && visivilidadIndicador2 == "visible"){
            indicadorVida2.style.visibility = "hidden";
            choqueBloque3 = true;
          }
          else if(visivilidadIndicador2 == "hidden" && visivilidadIndicador3 == "visible"){
            indicadorVida3.style.visibility = "hidden";
            finJuego();
            choqueBloque3 = true;
          }
        }
      }
      //BLOQUE VIDA
      if (choqueBloqueVida == false){
        if(camionTop == bloqueVidaTop && (anchoBloqueVida >= camionLeft && anchoBloqueVida < anchoCamion)){
          if(visivilidadIndicador1== "hidden" && visivilidadIndicador2 == "visible"){
            choqueBloqueVida = true;
            indicadorVida1.style.visibility = "visible";
            bloqueVida.style.visibility = "hidden";
          }
          else if(visivilidadIndicador2 == "hidden" && visivilidadIndicador3 == "visible"){
            choqueBloqueVida = true;
            indicadorVida2.style.visibility = "visible";
            bloqueVida.style.visibility = "hidden";
          }
        }
      }
      //BLOQUE ESCUDO
      if(choqueBloqueEscudo == false){
        if(camionTop == bloqueEscudoTop && (anchoBloqueEscudo >= camionLeft && anchoBloqueEscudo < anchoCamion)){
          choqueBloqueEscudo = true;
          escudoActivo = true;
          bloqueEscudo.style.visibility = "hidden";
          indicadorEscudo.style.visibility = "visible";
          setTimeout(function(){
            escudoActivo = false;
            indicadorEscudo.style.visibility = "hidden";
          },5000);
        }
      }
      //META
      if(anchoMeta >= camionLeft && anchoMeta < anchoCamion){
        choqueMeta = true;
        finJuego();
      }
   },60);
    //---------------------------------------------------------------------------------------------------------
   function finJuego(){
    if(choqueMeta==false){
      swal("Fin de Juego",  "Puntuación: "+ contador);
    }
    else if(choqueMeta == true){
      swal("Enhorabuena, has llegado al Mercado!!!!!","Puntuación: " + contador, "success");
    }
    clearTimeout(iniciarTimeoutMeta);
    clearInterval(iniciarBloqueVIda);
    clearInterval(iniciarBloqueEscudo);
    camion.style.visibility = "hidden;"
    bloque1.style.visibility = "hidden";
    bloque2.style.visibility = "hidden";
    bloque3.style.visibility = "hidden";
    bloqueVida.style.visibility = "hidden";
    bloqueEscudo.style.visibility = "hidden";
    camion.style.left = "510px";
    camion.style.top = "175px";
    bloque1.style.top = 100 +"px";
    bloque1.style.left = 0 +"px";
    bloque2.style.top = 175 +"px";
    bloque2.style.left = 0 +"px";
    bloque3.style.top = 250 +"px";
    bloque3.style.left = 0 +"px";
    bloqueVida.style.left = 0 +"px";
    meta.style.left = 700 + "px";
    meta.style.visibility = "hidden";
    juegoFinalizado = true;
    principal.style.backgroundImage = "url('images/carretera_background.png')";
    botonReinicio.style.visibility ="visible";
   }
   //---------------------------------------------------------------------------------------------------------
   //VELOCIDAD COCHES & POSICION ALEATORIA COCHES
   setInterval(function(){
     if(juegoFinalizado == false){
      var bloque1Left = parseInt(window.getComputedStyle(bloque1).getPropertyValue("left"));
      var bloque2Left = parseInt(window.getComputedStyle(bloque2).getPropertyValue("left"));
      var bloque3Left = parseInt(window.getComputedStyle(bloque3).getPropertyValue("left"));
      //BLOQUE 1
      var nuevaPosBloque1= bloque1Left + velocidadBloque1;
      if(nuevaPosBloque1 >= 640){
        bloque1.style.left = 0 +'px';
        bloque1.style.visibility = 'visible';
        var posicionIgual = false;
        if(choqueBloque1 == false){
          contador = contador + 2;
        }
        choqueBloque1 = false;
        do{
          var numPosicionpx = numAleatorio();
          var posicionBloque2 = parseInt(window.getComputedStyle(bloque2).getPropertyValue("top"));
          var posicionBloque3 = parseInt(window.getComputedStyle(bloque3).getPropertyValue("top"));
          if(posicionBloque2 != numPosicionpx && posicionBloque3 != numPosicionpx){
            bloque1.style.top =  numPosicionpx +"px";
            posicionIgual = true;
          }
        }while(posicionIgual == false);
      }
      else{
      bloque1.style.left= nuevaPosBloque1 + 'px';
      }
      //BLOQUE 2
      var nuevaPosBloque2= bloque2Left + velocidadBloque2;
      if(nuevaPosBloque2 >= 640){
        bloque2.style.left = 0 +'px';
        bloque2.style.visibility = 'visible';
         var posicionIgual = false;
         if(choqueBloque2 == false){
          contador = contador + 2;
        }
         choqueBloque2 = false;
      do{
        var numPosicionpx = numAleatorio();
        var posicionBloque1 = parseInt(window.getComputedStyle(bloque1).getPropertyValue("top"));
        var posicionBloque3 = parseInt(window.getComputedStyle(bloque3).getPropertyValue("top"));
        if(posicionBloque1 != numPosicionpx && posicionBloque3 != numPosicionpx){
          bloque2.style.top =  numPosicionpx +"px";
          posicionIgual = true;
        }
      }while(posicionIgual == false);
      }
      else{
      bloque2.style.left= nuevaPosBloque2 + 'px';
      }
      //BLOQUE 3
      var nuevaPosBloque3= bloque3Left + velocidadBloque3;
      if(nuevaPosBloque3 >= 640){
        bloque3.style.left = 0+'px';
        bloque3.style.visibility = 'visible';
        var posicionIgual = false;
        if(choqueBloque3 == false){
          contador = contador + 2;
        }
        choqueBloque3 = false;
        do{
          var numPosicionpx = numAleatorio();
          var posicionBloque1 = parseInt(window.getComputedStyle(bloque1).getPropertyValue("top"));
          var posicionBloque2 = parseInt(window.getComputedStyle(bloque2).getPropertyValue("top"));
          if(posicionBloque1 != numPosicionpx && posicionBloque2 != numPosicionpx){
            bloque3.style.top =  numPosicionpx +"px";
            posicionIgual = true;
          }
        }while(posicionIgual == false);
      }
      else{
      bloque3.style.left= nuevaPosBloque3 + 'px';
      }
    }
   },20);
   //BLOQUE VIDA
    function velocidadVida(){   
      bloqueVida.style.visibility = "visible";
        var movimientoBloqueVida = setInterval(function(){
          if(juegoFinalizado == false){
            posicionBloqueVidaLeft = parseInt(window.getComputedStyle(bloqueVida).getPropertyValue("left"));
            var nuevaPosicionBloqueVida = posicionBloqueVidaLeft + 3;
            if(nuevaPosicionBloqueVida >= 665){
              bloqueVida.style.left = -60 + 'px';
              var numPosicionpx = numAleatorio();
              bloqueVida.style.top =  numPosicionpx +"px";
              choqueBloqueVida = false;
              clearInterval(movimientoBloqueVida);
              bloqueVida.style.visibility = "hidden";
            }
            else{
              bloqueVida.style.left = nuevaPosicionBloqueVida +'px';
            }
          }
        },10);
      };
    //BLOQUE ESCUDO
    function velocidadEscudo(){   
      bloqueEscudo.style.visibility = "visible";
        var movimientoBloqueEscudo = setInterval(function(){
          if(juegoFinalizado == false){
            posicionBloqueEscudoLeft = parseInt(window.getComputedStyle(bloqueEscudo).getPropertyValue("left"));
            var nuevaPosicionBloqueEscudo = posicionBloqueEscudoLeft + 3;
            if(nuevaPosicionBloqueEscudo >= 665){
              bloqueEscudo.style.left = -60 + 'px';
              var numPosicionpx = numAleatorio();
              bloqueEscudo.style.top =  numPosicionpx +"px";
              choqueBloqueEscudo = false;
              clearInterval(movimientoBloqueEscudo);
              bloqueEscudo.style.visibility = "hidden";
            }
            else{
              bloqueEscudo.style.left = nuevaPosicionBloqueEscudo +'px';
            }
          }
        },10);
      };
   setInterval(function(){
    switch(contador){}
      if (contador >= 80 && contador < 120){
        velocidadBloque1 = 6; 
        velocidadBloque2 = 8; 
        velocidadBloque3 = 10; 
      }
      else if(contador>=120 && contador < 200){
        velocidadBloque1 = 8; 
        velocidadBloque2 = 10; 
        velocidadBloque3 = 12; 
      }
      else if(contador>=200){
        velocidadBloque1 = 12; 
        velocidadBloque2 = 14; 
        velocidadBloque3 = 16; 
      }
   },200);
   function numAleatorio(){
    var numAleatorio = Math.floor(Math.random() * 4);
    switch(numAleatorio){
      case 0: var numPosicionpx = 100;
      break;
      case 1: var numPosicionpx = 175;
      break;
      case 2: var numPosicionpx = 250; 
      break;
      case 3: var numPosicionpx = 325;
      break;
    }
    return numPosicionpx;
  }
 //---------------------------------------------------------------------------------------------------------
//META
  function TimeoutMeta(){
     intervalMeta = setInterval(moverMeta,10);
  }
  function moverMeta(){
    if(juegoFinalizado == false){
    var posicionMeta =  parseInt(window.getComputedStyle(meta).getPropertyValue("left"));
    var camionLeft = parseInt(window.getComputedStyle(camion).getPropertyValue("left"))-10;
    var nuevaPosicionMeta = posicionMeta -2;
    if (nuevaPosicionMeta > camionLeft){
      meta.style.left = nuevaPosicionMeta + 'px';
    }
    meta.style.visibility = "visible";
  }
}
//---------------------------------------------------------------------------------------------------------
//BOTON REINICIAR
  botonReinicio.addEventListener('click', function(){
    window.location.reload();
  });
//---------------------------------------------------------------------------------------------------------
//BOTON REINICIAR
  botonMensaje.addEventListener('click', function(){
    swal("Camino al Mercado", "El objetivo de este juego es conducir el camión de camino al mercado, pero cuidado, los coches de la carretera van muy rápido y debes evitar chocar con ellos para seguir con vida. De vez en cuando aparecen corazones, intenta cojerlos para recuperar vidas, también intenta cojer los escudos que te vuelven invulnerable durante un tiempo, y ten en cuenta que los coches van aumentando de velocidad. Buena Suerte!!!");
  });
}
