<template>
<q-page class="flex flex-center intro-page">

    <div class="intro-container text-center">

        <div class="titulo-animado q-mb-xl">
            <h1 class="text-h2 text-weight-bold text-white ">

                🕹️EL AHORCADO🕹️
            </h1>

            <p class="text-h6 text-white q-mt-md">
                ¡ Adivina la palabra antes de que sea tarde!
            </p>
        </div>

<q-btn   
color="white"
text-color="primary"
label="iniciar juego"
to ="/login"
size="xl"
rounded
class="boton-iniiciar"
icon="play_arrow"
/>


       

    </div>

</q-page>
</template>

<script setup >



</script>

<style scoped>
.intro-page{
    background: linear-gradient(135deg, #a87f0c 0%, #171060) 100%;
    min-height: 100vh;
    position: relative;
    overflow: hidden;


}
.intro-page::before{
content: '';
position: absolute;
width: 200%;
height: 200%;
background: 
radial-gradient(circle,rgba(255,255,255,0.1) 1px,transparent 1px) ;
background-size: 50px 50px;
animation: movebackground 20s linear infinite;
}


@keyframes movebackground{
    0%{
        transform: translate(0,0);

    }
    100%{
        transform: translate(50px,50px);
    }
}


.intro-container{
    position:relative;
        z-index: 1;
max-width: 600px;
padding: 40px 20px;

}

.titulo-animado h1{
     white-space: nowrap;
text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%, 100%{
        transform: translateY(0);

    }
    50%{
        transform: translateY(-10px);
    }
}

@keyframes swing {
  0%, 100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
}
.boton-iniciar {
  font-size: 18px;
  padding: 15px 40px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.boton-iniciar:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 35px rgba(0,0,0,0.3);
}

</style>