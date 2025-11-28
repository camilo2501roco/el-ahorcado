<template>
  <q-page class="flex flex-center nivel-page">
    <div class="container q-pa-md">
      <h2 class="text-center text-h3 q-mb-md text-weight-bold text-white">
        Selecciona el Nivel
      </h2>
      
      <div class="text-center q-mb-xl">
        <q-chip 
          v-if="categoriaSeleccionada"
          color="white" 
          text-color="primary" 
          icon="category"
          size="lg"
        >
          Categoría: {{ categoriaSeleccionada.nombre }} {{ categoriaSeleccionada.icono }}
        </q-chip>
      </div>

      <div class="row q-col-gutter-lg justify-center">
        <div 
          v-for="nivel in niveles" 
          :key="nivel.id"
          class="col-12 col-md-8"
        >
          <q-card 
            class="nivel-card cursor-pointer"
            @click="seleccionarNivel(nivel)"
          >
            <q-card-section class="row items-center">
              <div class="col-auto q-mr-md">
                <q-avatar 
                  :color="nivel.color" 
                  size="80px"
                  text-color="white"
                  class="text-h3"
                >
                  {{ nivel.emoji }}
                </q-avatar>
              </div>
              
              <div class="col">
                <div class="text-h5 text-weight-bold">{{ nivel.nombre }}</div>
                <div class="text-grey-7">{{ nivel.descripcion }}</div>
                <div class="text-caption text-grey-6 q-mt-xs">
                  {{ nivel.intentos }} intentos
                </div>
              </div>

              <div class="col-auto">
                <q-icon name="chevron_right" size="md" color="grey-6" />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="text-center q-mt-xl">
        <q-btn 
          color="white" 
          text-color="primary"
          label="Volver a categorías" 
          to="/categoria"
          size="md"
          rounded
          outline
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const categoriaSeleccionada = ref(null);

const niveles = ref([
  {
    id: 1,
    nombre: 'Fácil',
    emoji: '😊',
    descripcion: 'Palabras de 4-6 letras',
    intentos: 6,  // ← 6 intentos (todas las partes del cuerpo)
    color: 'green',
    dificultad: 'facil'
  },
  {
    id: 2,
    nombre: 'Medio',
    emoji: '😐',
    descripcion: 'Palabras de 7-9 letras',
    intentos: 5,  // ← 5 intentos
    color: 'orange',
    dificultad: 'medio'
  },
  {
    id: 3,
    nombre: 'Difícil',
    emoji: '😤',
    descripcion: 'Palabras de 10+ letras',
    intentos: 4,  // ← 4 intentos
    color: 'red',
    dificultad: 'dificil'
  }
]);

onMounted(() => {
  const categoria = sessionStorage.getItem('categoriaSeleccionada');
  if (categoria) {
    categoriaSeleccionada.value = JSON.parse(categoria);
  } else {
    router.push('/categoria');
  }
});

const seleccionarNivel = (nivel) => {
  sessionStorage.setItem('nivelSeleccionado', JSON.stringify(nivel));
  router.push('/juego');
};
</script>

<style scoped>
.nivel-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.container {
  max-width: 900px;
  width: 100%;
}

.nivel-card {
  border-radius: 15px;
  transition: all 0.3s ease;
  border-left: 5px solid transparent;
}

.nivel-card:hover {
  transform: translateX(10px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  border-left-color: #667eea;
}
</style>