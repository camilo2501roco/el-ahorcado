<template>
  <q-page class="flex flex-center column" style="z-index: 1;">
    <div class="container q-pa-md text-center full-width" style="max-width: 900px">
      <h2 class="text-h3 q-mb-md text-weight-bold">Dificultad</h2>
      
      <q-chip 
        v-if="categoria" 
        color="white" 
        text-color="primary" 
        icon="category" 
        class="q-mb-xl"
      >
        {{ categoria.icono }} {{ categoria.nombre }}
      </q-chip>

      <div class="row q-col-gutter-lg justify-center">
        <div v-for="niv in NIVELES" :key="niv.id" class="col-12 col-md-4">
          <q-card class="nivel-card cursor-pointer" @click="seleccionar(niv)">
            <q-card-section>
              <div class="text-h2">{{ niv.emoji }}</div>
              <div class="text-h5 text-weight-bold">{{ niv.nombre }}</div>
              <div class="text-caption text-grey-3">{{ niv.descripcion }}</div>
              <q-badge :color="niv.color" class="q-mt-sm">{{ niv.intentos }} intentos</q-badge>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-btn class="q-mt-xl" color="white" outline label="Cambiar Categoría" to="/categoria" rounded />
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useJuego } from '../composables/useJuego';
import { NIVELES } from '../data/juegoData';

const router = useRouter();


const { categoria, setNivel } = useJuego();

onMounted(() => { 

  if (!categoria.value) {
    router.push('/categoria');
  }
});

const seleccionar = (nivel) => {
  setNivel(nivel);
  router.push('/juego');
};
</script>

<style scoped>
.nivel-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  transition: all 0.3s;
  color: white;
}
.nivel-card:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.25);
}
</style>