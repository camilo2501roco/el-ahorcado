<template>
<q-page class="flex flex-center column relative-position" style="z-index: 1;">
<div class="text-center q-mb-xl titulo-animado">
  <h1 class="text-h2 text-weight-bold"> El ahorcado</h1>
  <p class="text-h6 q-mt-md">adivina las palabras antes que sea tarde!</p>
</div>


<q-btn color="white" text-color="primary"
label="iniciar juego"
to="/login"
size="xl" rounded icon="play_arrow"
class="boton-iniciar"/>
</q-page>

</template>






<style scoped>

.titulo-animado h1{
text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
animation: float 3s ease-in-out infinite;


}
@keyframes float{
  0%,100% {transform: translateY(0);}
  50% {transform: translateY(-10px);}
}


.boton-iniciar{
  
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    transition: transform 0.2s;
  

}


.boton-iniciar:hover{
  transform: scale(1.05);
}
</style>