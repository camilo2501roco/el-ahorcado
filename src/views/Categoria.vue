<template>
  <q-page class="flex flex-center column" style="z-index:1;">
    <div class="container q-pa-md text-center full-width" style="max-width:1000px">
      <h2 class="text-h3 q-mb-xl text-weight-bold">Selecciona Categoria</h2>
    <div class="row q-col-gutter-lg justify-center">
      <div v-for="cat in CATEGORIAS" :key="cat.id" class="col-12 col-sm-6 col-md-4">
        <q-card class="cat-card cursor-pointer" v-ripple @click="seleccionar(cat)" >
<q-card-section>
  <div class="text-h1 q-mb-md">{{ cat.icono }}</div>
  <div class="text-h5 text-weight-bold">{{ cat.nombre }}</div>
</q-card-section>

        </q-card>

      </div>
    </div>
    <q-btn class="q-mt-xl" color="white" outline label="volver" to="/login" rounded/>
    </div>
  </q-page>
</template>


<script setup>

import { useRouter } from 'vue-router';
import {useJuego} from '../composables/useJuego.js';
import {CATEGORIAS} from '../data/juegoData.js'





const router = useRouter();
const {setCategoria} = useJuego();


const seleccionar = (cat) =>{
  setCategoria(cat);
  router.push('/nivel');
}
</script>


<style scoped>



.cat-card{
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  transition: transform 0.3s;
  color: white;
}


.cat-card:hover{
  transform: translateY(-5px);
  background: rgba(255,255,255,0.25);
}


</style>