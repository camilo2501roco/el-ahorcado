<template>
  <q-page class="flex flex-center column" style="z-index: 1;">
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

      <div class="q-mb-lg">
        <svg width="200" height="200" viewBox="0 0 300 300">
          <line x1="20" y1="280" x2="150" y2="280" stroke="#fff" stroke-width="4"/>
          <line x1="60" y1="280" x2="60" y2="20" stroke="#fff" stroke-width="4"/>
          <line x1="60" y1="20" x2="180" y2="20" stroke="#fff" stroke-width="4"/>
          <line x1="180" y1="20" x2="180" y2="60" stroke="#fff" stroke-width="3"/>
          <circle v-if="errores >= 1" cx="180" cy="80" r="20" stroke="#fff" stroke-width="3" fill="none"/>
          <line v-if="errores >= 2" x1="180" y1="100" x2="180" y2="170" stroke="#fff" stroke-width="3"/>
          <line v-if="errores >= 3" x1="180" y1="120" x2="150" y2="150" stroke="#fff" stroke-width="3"/>
          <line v-if="errores >= 4" x1="180" y1="120" x2="210" y2="150" stroke="#fff" stroke-width="3"/>
          <line v-if="errores >= 5" x1="180" y1="170" x2="160" y2="220" stroke="#fff" stroke-width="3"/>
          <line v-if="errores >= 6" x1="180" y1="170" x2="200" y2="220" stroke="#fff" stroke-width="3"/>
        </svg>
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
import { useJuego } from '../composables/useJuego';

const router = useRouter();

// CORRECCIÓN AQUÍ: Agregué 'tiempo' a la lista de extracción
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

// Computed
const palabraArray = computed(() => 
  palabraObjetivo.value.split('').map(l => letrasUsadas.value.includes(l) ? l : '_')
);
const intentosRestantes = computed(() => (nivel.value?.intentos || 0) - errores.value);
const juegoTerminado = computed(() => errores.value >= nivel.value?.intentos || !palabraArray.value.includes('_'));
const juegoGanado = computed(() => !palabraArray.value.includes('_') && errores.value < nivel.value?.intentos);

onMounted(() => {
  if (!categoria.value || !nivel.value) return router.push('/categoria');
  iniciarPartida();
});

onUnmounted(() => {
  detenerTimer();
});

const iniciarPartida = () => {
  const lista = categoria.value.palabras[nivel.value.dificultad];
  palabraObjetivo.value = lista[Math.floor(Math.random() * lista.length)];
  letrasUsadas.value = [];
  errores.value = 0;
  mostrarDialogo.value = false;
  iniciarTimer(); // Iniciar reloj
};

const intentar = (letra) => {
  letrasUsadas.value.push(letra);
  if (!palabraObjetivo.value.includes(letra)) errores.value++;
  
  if (juegoTerminado.value) {
    detenerTimer(); // Parar reloj inmediatamente
    
    if (juegoGanado.value) {
      agregarPuntaje(100);
      guardarEnRanking();
    }
    
    // Mostrar diálogo después de 500ms (una sola vez)
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
</style>