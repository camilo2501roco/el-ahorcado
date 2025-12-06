<template>
  <q-page class="flex flex-center column" style="z-index:1;">

    <div class="container q-pa-md full-width " style="max-width: 800px;">

      <h2 class="text-center text-h3 text-weight-bold q-mb-xl">
        🏆 Mejores Jugadores 🏆
      </h2>
<div class="row justify-center q-mb-lg">
    <q-btn-toggle
        v-model="dificultadSeleccionada"
        spread
        no-caps
        rounded
        toggle-color="yellow-8"
        color="grey-8"
        text-color="white"
        :options="NIVELES.map(n => ({ label: n.nombre, value: n.dificultad }))"
    />
</div>

      <q-card class="ranking-card">
        <q-card-section>
          <q-markup-table flat bordered class="bg-transparent text-white">

            <thead class="text-yellow">
              <tr>
                <th class="text-left">#</th>
                <th class="text-left">Jugador</th>
              <th class="text-left">Categoría</th>
               <th class="text-right">Puntaje</th>
                <th class="text-right">Tiempo</th>
                <th class="text-rigth">Fecha</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(jugador, index) in ranking" :key="index" >

                <td class="text-left">
                  <q-icon v-if="index=== 0" name="emoji_events"
                  color="yellow" size="sm"/>
                  <span v-else> #{{ index + 1 }}</span>
                </td>

                <td class="text-left text-weight-bold" >{{ jugador.nombre }}</td>
                <td class="text-left text-weight-medium text-grey-3">{{ jugador.categoria }}</td>
                <td class="text-right text-h6 text-green-4">{{ jugador.puntaje }}</td>
             <td class="text-right">{{ formatoTiempo(jugador.tiempo) }}</td>
             <td class="text-right text-grey-4"> {{ jugador.fecha }}</td>
              </tr>
              
            </tbody>
          </q-markup-table>
        </q-card-section>
      </q-card>

<div class="text-center q-mt-xl">
        <q-btn 
          color="white" text-color="primary" 
          label="Volver al Inicio" 
          to="/" 
          rounded size="lg" icon="home"
        />
      </div>


    </div>
  </q-page>
</template>


<script setup>
import { ref,watch } from 'vue';
import {NIVELES} from '../data/juegoData.js'
import { useJuego } from '../composables/useJuego';
const ranking = ref([]);
const {formatoTiempo} = useJuego();


const dificultadSeleccionada = ref('facil');


const cargarRanking = (dificultad) => {
    
    const claveRanking = `ahorcado_ranking_${dificultad}`;
    const data = localStorage.getItem(claveRanking);
  
    ranking.value = data ? JSON.parse(data) : [];
};
watch(dificultadSeleccionada, (nuevaDificultad) => {
    cargarRanking(nuevaDificultad);
}, { immediate: true }); 

</script>

<style scoped>
.ranking-card {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
}
</style>