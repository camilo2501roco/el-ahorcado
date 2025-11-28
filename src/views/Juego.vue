<template>
  <q-page class="juego-page">
    <div class="container q-pa-md">
      <!-- Header con información -->
      <div class="row q-mb-lg justify-center q-gutter-sm">
        <q-chip color="white" text-color="primary" icon="category" size="lg">
          {{ categoriaSeleccionada?.icono }} {{ categoriaSeleccionada?.nombre }}
        </q-chip>
        <q-chip :color="nivelColor" text-color="white" icon="trending_up" size="lg">
          {{ nivelSeleccionado?.emoji }} {{ nivelSeleccionado?.nombre }}
        </q-chip>
        <q-chip color="warning" text-color="white" icon="favorite" size="lg">
          Intentos: {{ intentosRestantes }} / {{ nivelSeleccionado?.intentos }}
        </q-chip>
      </div>

      <!-- Ahorcado SVG -->
      <div class="text-center q-mb-xl">
        <div class="ahorcado-container">
          <svg width="300" height="300" viewBox="0 0 300 300">
            <!-- Base -->
            <line x1="20" y1="280" x2="150" y2="280" stroke="#8B4513" stroke-width="4"/>
            <!-- Poste vertical -->
            <line x1="60" y1="280" x2="60" y2="20" stroke="#8B4513" stroke-width="4"/>
            <!-- Poste horizontal -->
            <line x1="60" y1="20" x2="180" y2="20" stroke="#8B4513" stroke-width="4"/>
            <!-- Cuerda -->
            <line x1="180" y1="20" x2="180" y2="60" stroke="#8B4513" stroke-width="3"/>
            
            <!-- Cabeza -->
            <circle v-if="errores >= 1" cx="180" cy="80" r="20" stroke="#333" stroke-width="3" fill="none"/>
            
            <!-- Cuerpo -->
            <line v-if="errores >= 2" x1="180" y1="100" x2="180" y2="170" stroke="#333" stroke-width="3"/>
            
            <!-- Brazo izquierdo -->
            <line v-if="errores >= 3" x1="180" y1="120" x2="150" y2="150" stroke="#333" stroke-width="3"/>
            
            <!-- Brazo derecho -->
            <line v-if="errores >= 4" x1="180" y1="120" x2="210" y2="150" stroke="#333" stroke-width="3"/>
            
            <!-- Pierna izquierda -->
            <line v-if="errores >= 5" x1="180" y1="170" x2="160" y2="220" stroke="#333" stroke-width="3"/>
            
            <!-- Pierna derecha -->
            <line v-if="errores >= 6" x1="180" y1="170" x2="200" y2="220" stroke="#333" stroke-width="3"/>
            
            <!-- Ojos X cuando pierde -->
            <g v-if="juegoTerminado && !juegoGanado">
              <line x1="173" y1="76" x2="177" y2="80" stroke="#333" stroke-width="2"/>
              <line x1="177" y1="76" x2="173" y2="80" stroke="#333" stroke-width="2"/>
              <line x1="183" y1="76" x2="187" y2="80" stroke="#333" stroke-width="2"/>
              <line x1="187" y1="76" x2="183" y2="80" stroke="#333" stroke-width="2"/>
            </g>
          </svg>
        </div>
      </div>

      <!-- Palabra -->
      <div class="text-center q-mb-xl">
        <div class="palabra-container">
          <span 
            v-for="(letra, index) in palabraArray" 
            :key="index"
            class="letra-box"
            :class="{ 'letra-revelada': letra !== '_' }"
          >
            {{ letra }}
          </span>
        </div>
        <div class="q-mt-md">
          <q-badge color="warning" class="text-body2 q-pa-md">
            💡 {{ pista }}
          </q-badge>
        </div>
      </div>

      <!-- Teclado -->
      <div class="teclado-container q-mb-lg">
        <div v-for="(fila, i) in tecladoFilas" :key="i" class="row justify-center q-gutter-sm q-mb-sm">
          <q-btn
            v-for="letra in fila"
            :key="letra"
            :label="letra"
            :disable="letrasUsadas.includes(letra) || juegoTerminado"
            :color="colorLetra(letra)"
            @click="intentarLetra(letra)"
            rounded
            size="md"
            class="letra-btn"
          />
        </div>
      </div>

      <!-- Diálogo resultado -->
      <q-dialog v-model="mostrarDialogo" persistent>
        <q-card class="resultado-card">
          <q-card-section class="text-center">
            <div class="text-h1 q-mb-md">{{ juegoGanado ? '🎉' : '😢' }}</div>
            <div class="text-h4 text-weight-bold q-mb-md">
              {{ juegoGanado ? '¡Felicidades!' : '¡Oh no!' }}
            </div>
            <div class="text-h6 q-mb-md">
              {{ juegoGanado ? '¡Has adivinado la palabra!' : 'La palabra era:' }}
            </div>
            <div v-if="!juegoGanado" class="text-h5 text-primary text-weight-bold q-mb-lg">
              {{ palabraCompleta }}
            </div>
          </q-card-section>
          <q-card-actions align="center" class="q-pb-lg">
            <q-btn color="primary" label="Jugar de nuevo" @click="reiniciarJuego" rounded size="lg"/>
            <q-btn color="grey-7" label="Menú principal" to="/" rounded outline size="lg"/>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Botones control -->
      <div class="text-center">
        <q-btn color="grey-7" label="Cambiar nivel" to="/nivel" size="md" rounded outline class="q-mr-sm"/>
        <q-btn color="primary" label="Reiniciar" @click="reiniciarJuego" size="md" rounded/>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Estados
const categoriaSeleccionada = ref(null);
const nivelSeleccionado = ref(null);
const palabraCompleta = ref('');
const palabraArray = ref([]);
const letrasUsadas = ref([]);
const errores = ref(0);
const juegoTerminado = ref(false);
const juegoGanado = ref(false);
const mostrarDialogo = ref(false);

// (No se necesitan URLs de CDN con SVG)

// Constantes
const PISTAS = {
  'Frutas': 'Un alimento dulce y saludable',
  'Animales': 'Un ser vivo que se mueve',
  'Países': 'Un lugar en el mapa mundial',
  'Deportes': 'Una actividad física competitiva',
  'Películas': 'Una obra cinematográfica',
  'Ciencia': 'Un concepto científico o natural'
};

const PUNTAJES = { facil: 50, medio: 100, dificil: 200 };

const TECLADO = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],
  ['N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
];

// Computed
const intentosRestantes = computed(() => nivelSeleccionado.value?.intentos - errores.value || 0);

const nivelColor = computed(() => {
  const colores = { facil: 'green', medio: 'orange', dificil: 'red' };
  return colores[nivelSeleccionado.value?.dificultad] || 'primary';
});

const pista = computed(() => PISTAS[categoriaSeleccionada.value?.nombre] || '');

const tecladoFilas = computed(() => TECLADO);

// (computed no necesario con SVG)

// Lifecycle
onMounted(() => {
  const categoria = sessionStorage.getItem('categoriaSeleccionada');
  const nivel = sessionStorage.getItem('nivelSeleccionado');
  
  if (categoria && nivel) {
    categoriaSeleccionada.value = JSON.parse(categoria);
    nivelSeleccionado.value = JSON.parse(nivel);
    iniciarJuego();
  } else {
    router.push('/categoria');
  }
});

// Métodos
const iniciarJuego = () => {
  const palabras = categoriaSeleccionada.value.palabras[nivelSeleccionado.value.dificultad];
  palabraCompleta.value = palabras[Math.floor(Math.random() * palabras.length)];
  palabraArray.value = Array(palabraCompleta.value.length).fill('_');
  letrasUsadas.value = [];
  errores.value = 0;
  juegoTerminado.value = false;
  juegoGanado.value = false;
  mostrarDialogo.value = false;
};

const intentarLetra = (letra) => {
  if (letrasUsadas.value.includes(letra) || juegoTerminado.value) return;
  
  letrasUsadas.value.push(letra);
  
  if (palabraCompleta.value.includes(letra)) {
    revelarLetra(letra);
    verificarVictoria();
  } else {
    errores.value++;
    verificarDerrota();
  }
};

const revelarLetra = (letra) => {
  palabraCompleta.value.split('').forEach((l, i) => {
    if (l === letra) palabraArray.value[i] = letra;
  });
};

const verificarVictoria = () => {
  if (!palabraArray.value.includes('_')) {
    juegoGanado.value = true;
    juegoTerminado.value = true;
    mostrarDialogo.value = true;
    registrarPartida(true);
  }
};

const verificarDerrota = () => {
  if (errores.value >= nivelSeleccionado.value.intentos) {
    juegoTerminado.value = true;
    mostrarDialogo.value = true;
    palabraArray.value = palabraCompleta.value.split('');
    registrarPartida(false);
  }
};

const calcularPuntaje = () => {
  const base = PUNTAJES[nivelSeleccionado.value.dificultad] || 50;
  return base + (intentosRestantes.value * 10);
};

const registrarPartida = (gano) => {
  const usuarioActual = localStorage.getItem('usuarioActual');
  if (!usuarioActual) return;
  
  const usuario = JSON.parse(usuarioActual);
  const puntaje = gano ? calcularPuntaje() : 0;
  
  usuario.partidasJugadas = (usuario.partidasJugadas || 0) + 1;
  usuario.partidasGanadas = (usuario.partidasGanadas || 0) + (gano ? 1 : 0);
  usuario.puntajeTotal = (usuario.puntajeTotal || 0) + puntaje;
  usuario.ultimaPartida = new Date().toISOString();
  
  localStorage.setItem('usuarioActual', JSON.stringify(usuario));
};

const colorLetra = (letra) => {
  if (!letrasUsadas.value.includes(letra)) return 'primary';
  return palabraCompleta.value.includes(letra) ? 'positive' : 'negative';
};

const reiniciarJuego = () => iniciarJuego();
</script>

<style scoped>
.juego-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding-top: 20px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.ahorcado-container {
  background: white;
  border-radius: 20px;
  padding: 20px;
  display: inline-block;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.ahorcado-container svg {
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1));
}

.palabra-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.letra-box {
  width: 50px;
  height: 60px;
  background: white;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  color: #667eea;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.letra-revelada {
  transform: scale(1.1);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.teclado-container {
  max-width: 800px;
  margin: 0 auto;
}

.letra-btn {
  min-width: 45px;
  font-weight: bold;
}

.resultado-card {
  min-width: 350px;
  border-radius: 20px;
}

@media (max-width: 600px) {
  .ahorcado-container {
    width: 300px;
    height: 300px;
  }
  
  .letra-box {
    width: 40px;
    height: 50px;
    font-size: 24px;
  }
  
  .letra-btn {
    min-width: 35px;
    font-size: 12px;
  }
}
</style>