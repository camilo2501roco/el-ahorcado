<template>
  <q-page class="flex flex-center column" style="z-index: 1;">
    <q-btn 
      icon="arrow_back" 
      flat 
      round 
      color="white" 
      size="lg" 
      to="/nivel"
      class="absolute-top-left q-ma-md" 
    >
      <q-tooltip>Volver a Nivel</q-tooltip>
    </q-btn>
    <div class="container q-pa-md full-width text-center" style="max-width: 800px">
      
      <div class="row justify-center q-gutter-md q-mb-lg">
         <q-chip color="info" text-color="white" icon="timer">
            {{ formatoTiempo(tiempo) }}
         </q-chip>
      </div>

      <div class="row justify-center q-gutter-md q-mb-lg">
        <q-chip color="white" text-color="primary">Usuario: {{ usuario?.nombre }}</q-chip>
        <q-chip color="warning" text-color="black">Puntos: {{ usuario?.puntaje }}</q-chip>
        <q-chip :color="nivel?.color" text-color="white">Vidas: {{ intentosRestantes }}</q-chip>
      </div>

     <div class="contenedor-dibujo flex flex-center q-mb-lg">
  <img 
    :src="`/img/ahorcado_${errores}.png`" 
    alt="Ahorcado"
    class="imagen-ahorcado"
  />
</div>

      <div v-if="pistaActual" class="q-mb-md text-center">
   <q-chip color="primary" text-color="white" icon="lightbulb">
      Pista: {{ pistaActual }}
   </q-chip>
</div>
      <div class="row justify-center q-gutter-sm q-mb-xl">
        <div v-for="(letra, i) in palabraArray" :key="i" class="letra-box flex flex-center">
          {{ letra }}
        </div>
      </div>

      <div class="row justify-center q-gutter-sm" style="max-width: 600px; margin: 0 auto;">
        <q-btn
          v-for="letra in alfabeto" :key="letra"
          :label="letra"
          :color="getColorBoton(letra)"
          :text-color="getTextColorBoton(letra)"
          :disable="letrasUsadas.includes(letra) || juegoTerminado"
          @click="intentar(letra)"
          round size="md" unelevated
          class="text-weight-bold"
        />
      </div>

      <q-dialog v-model="mostrarDialogo" persistent>
        <q-card class="bg-white text-black text-center q-pa-lg" style="border-radius: 20px;">
          <div class="text-h2">{{ juegoGanado ? '🎉' : '💀' }}</div>
          <div class="text-h5 text-weight-bold q-my-md">
            {{ juegoGanado ? '¡Ganaste!' : 'Fin del Juego' }}
          </div>
          <div v-if="!juegoGanado">La palabra era: <b>{{ palabraObjetivo }}</b></div>
          <div v-if="juegoGanado" class="text-subtitle1 text-grey-8 q-mt-sm">
             Tiempo: {{ formatoTiempo(tiempo) }}
          </div>

          <q-card-actions align="center" class="q-mt-lg">
            <q-btn label="Ver Récords" to="/ranking" color="orange" outline rounded />
            <q-btn label="Menu Principal" to="/categoria" color="grey-8" outline rounded />
            <q-btn label="Jugar Otra Vez" @click="iniciarPartida" color="primary" rounded />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useJuego } from '../composables/useJuego.js';

const router = useRouter();


const { 
  usuario, categoria, nivel, tiempo, 
  agregarPuntaje, iniciarTimer, detenerTimer, 
  guardarEnRanking, formatoTiempo 
} = useJuego();

const alfabeto = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const palabraObjetivo = ref('');
const letrasUsadas = ref([]);
const errores = ref(0);
const mostrarDialogo = ref(false);
const pistaActual = ref('');

const palabraArray = computed(() => 
  palabraObjetivo.value.split('').map(l => letrasUsadas.value.includes(l) ? l : '_')
);
const intentosRestantes = computed(() => (nivel.value?.intentos || 0) - errores.value);


const juegoTerminado = computed(() => errores.value >= (nivel.value?.intentos || 6) || !palabraArray.value.includes('_'));


const juegoGanado = computed(() => !palabraArray.value.includes('_') && errores.value < (nivel.value?.intentos || 6));

onMounted(() => {
  if (!categoria.value || !nivel.value) return router.push('/categoria');
  iniciarPartida();
});

onUnmounted(() => {
  detenerTimer();
});

const iniciarPartida = () => {
  const lista = categoria.value.palabras[nivel.value.dificultad];
  const seleccion = lista[Math.floor(Math.random() * lista.length)];


  palabraObjetivo.value = seleccion.palabra; 
  pistaActual.value = seleccion.pista;       
  letrasUsadas.value = [];
  errores.value = 0;
  mostrarDialogo.value = false;
  iniciarTimer(); 
};


const intentar = (letra) => {
  if (mostrarDialogo.value) return;

  letrasUsadas.value.push(letra);

  if (!palabraObjetivo.value.includes(letra)) {
    errores.value++;
  }

 
  const maxIntentos = nivel.value?.intentos || 6;
  const perdioAhora = errores.value >= maxIntentos;
  
  const letrasDeLaPalabra = palabraObjetivo.value.split('');
  const ganoAhora = letrasDeLaPalabra.every(l => letrasUsadas.value.includes(l));

  if (ganoAhora || perdioAhora) {
    detenerTimer();

    if (ganoAhora) {
      agregarPuntaje(100);
      guardarEnRanking();
    }
    
    setTimeout(() => {
      mostrarDialogo.value = true;
    }, 500);
  }
};

const getColorBoton = (letra) => {
  if (!letrasUsadas.value.includes(letra)) return 'white';
  return palabraObjetivo.value.includes(letra) ? 'green' : 'red';
};

const getTextColorBoton = (letra) => {
  if (!letrasUsadas.value.includes(letra)) return 'primary';
  return 'white'; 
};
</script>

<style scoped>
.letra-box {
  width: 40px; height: 50px;
  background: white; color: #333;
  font-weight: bold; font-size: 24px;
  border-radius: 8px;
}

.imagen-ahorcado {
  height: 100%;      
  width: auto;        
  max-width: 100%;
  filter: drop-shadow(0 5px 5px rgba(0,0,0,0.3));
  transition: transform 0.2s ease;
}
.contenedor-dibujo {
 
  height: 200px; 
  width: 100%;
  overflow: hidden; 
}
</style>