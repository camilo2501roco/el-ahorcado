<template>
  <q-page class="flex flex-center column" style="z-index: 1;">
    <div class="container q-pa-md full-width" style="max-width: 800px">
      
      <h2 class="text-center text-h3 text-weight-bold q-mb-xl">🏆 Mejores Jugadores 🏆</h2>

      <q-card class="ranking-card">
        <q-card-section>
          <q-markup-table flat bordered class="bg-transparent text-white">
            <thead class="text-yellow">
              <tr>
                <th class="text-left">Pos</th>
                <th class="text-left">Jugador</th>
                <th class="text-right">Puntaje</th>
                <th class="text-right">Tiempo</th>
                <th class="text-right">Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(jugador, index) in ranking" :key="index">
                <td class="text-left">
                  <q-icon v-if="index === 0" name="emoji_events" color="yellow" size="sm"/>
                  <span v-else>#{{ index + 1 }}</span>
                </td>
                <td class="text-left text-weight-bold">{{ jugador.nombre }}</td>
                <td class="text-right text-h6 text-green-4">{{ jugador.puntaje }}</td>
                <td class="text-right">{{ formatoTiempo(jugador.tiempo) }}</td>
                <td class="text-right text-grey-4">{{ jugador.fecha }}</td>
              </tr>
              <tr v-if="ranking.length === 0">
                <td colspan="5" class="text-center q-pa-lg">
                  Aún no hay récords. ¡Sé el primero!
                </td>
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
import { ref, onMounted } from 'vue';
import { useJuego } from '../composables/useJuego';

const ranking = ref([]);
const { formatoTiempo } = useJuego();

onMounted(() => {
  const data = localStorage.getItem('ahorcado_ranking');
  if (data) {
    ranking.value = JSON.parse(data);
  }
});
</script>

<style scoped>
.ranking-card {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
}
</style>