<template>
<q-page class="flex flex-center categoria-page">
  <div class="container q-pa-md">
    <h2 class="text-center text-h3 q-mb-xl text-weight-bold">
      Selecciona una Categoria
    </h2>

    <div class="row q-col-gutter-ig justify-center">
      <div
      v-for="categoria in categorias" :key="categoria.id" 
      class="col-12 col-sm-6 col-md-4">

      <q-card class="categoria-card cursor-pointer"
      :class="categoria.color" @click="seleccionarCategoria(categoria)">
 <q-card-section class="text-center">
  <div class="text-h1 q-mb-md">{{ categoria.icono }}</div>
  <div class="text-h5 text-white text-weight-bold">
    {{ categoria.nombre }}
  </div>
 </q-card-section>   
    </q-card>
    </div>
    </div>


    <div class="text-center q-mt-xl">
      <q-btn color="grey-7" label="volver al inicio"
      to="/"
      size="md"
      rounded
      outline/>
    </div>
  </div>

</q-page>

</template>

<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();


const categorias = ref([
   {
    id: 1,
    nombre: 'Frutas',
    icono: '🍎',
    color: 'gradient-pink',
    palabras: {
      facil: ['MANGO', 'PERA', 'UVA', 'LIMON', 'COCO', 'KIWI', 'MORA', 'HIGO'],
      medio: ['NARANJA', 'MANZANA', 'PLATANO', 'CEREZA', 'PAPAYA', 'DURAZNO'],
      dificil: ['MARACUYA', 'GRANADILLA', 'MANDARINA', 'FRAMBUESA', 'TORONJA']
    }
  },
  {
    id: 2,
    nombre: 'Animales',
    icono: '🐻',
    color: 'gradient-blue',
    palabras: {
      facil: ['PERRO', 'GATO', 'LEON', 'OSO', 'LOBO', 'PATO', 'PUMA', 'MONO'],
      medio: ['ELEFANTE', 'JIRAFA', 'TIGRE', 'CABALLO', 'DELFIN', 'BALLENA'],
      dificil: ['RINOCERONTE', 'HIPOPOTAMO', 'ORANGUTAN', 'COCODRILO', 'TORTUGA']
    }
  },
  {
    id: 3,
    nombre: 'Países',
    icono: '🌍',
    color: 'gradient-green',
    palabras: {
      facil: ['PERU', 'CHILE', 'CUBA', 'INDIA', 'CHINA', 'JAPON', 'ITALY'],
      medio: ['COLOMBIA', 'ARGENTINA', 'ALEMANIA', 'PORTUGAL', 'BELGICA'],
      dificil: ['UZBEKISTAN', 'KAZAJISTAN', 'AZERBAIJAN', 'MADAGASCAR', 'SINGAPUR']
    }
  },
  {
    id: 4,
    nombre: 'Deportes',
    icono: '⚽',
    color: 'gradient-orange',
    palabras: {
      facil: ['FUTBOL', 'TENIS', 'GOLF', 'BOXEO', 'JUDO', 'RUGBY', 'POLO'],
      medio: ['BALONCESTO', 'VOLEIBOL', 'NATACION', 'CICLISMO', 'ATLETISMO'],
      dificil: ['HALTEROFILIA', 'ESGRIMA', 'TAEKWONDO', 'BADMINTON', 'WATERPOLO']
    }
  },
  {
    id: 5,
    nombre: 'Películas',
    icono: '🎬',
    color: 'gradient-purple',
    palabras: {
      facil: ['TITANIC', 'AVATAR', 'FROZEN', 'COCO', 'UP', 'CARS', 'ALIEN'],
      medio: ['INCEPTION', 'GLADIADOR', 'MATRIX', 'INTERSTELLAR', 'PARASITE'],
      dificil: ['SHAWSHANK', 'PULPFICTION', 'GOODFELLAS', 'CASABLANCA', 'VERTIGO']
    }
  },
  {
    id: 6,
    nombre: 'Ciencia',
    icono: '🔬',
    color: 'gradient-gray',
    palabras: {
      facil: ['ATOMO', 'CELULA', 'VIRUS', 'PLANTA', 'SOL', 'LUNA', 'TIERRA'],
      medio: ['ELECTRON', 'MOLECULA', 'BACTERIA', 'PROTEINA', 'GALAXIA'],
      dificil: ['MITOCONDRIA', 'CROMOSOMA', 'FOTOSINTESIS', 'GRAVITACION', 'TERMODINAMICA']
    }
  }

]);

const seleccionarCategoria = (categoria) => {
  sessionStorage.setItem('categoriaSeleccionada', JSON.stringify(categoria));
  router.push("/nivel");  
};


</script>




<style scoped>

.categoria-page{
 background: linear-gradient(135deg, #a87f0c 0%, #171060) 100%;
  min-height: 100vh;
}

.container{
  max-width: 1200px;
  width: 100%;
}

h2{
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.categoria-card{
  height: 200px;
  border-radius: 20px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.categoria-card:hover{
  transform:  translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.3);
   background: linear-gradient(135deg,#a52ca5 0%, #3c232854 100%);

   border: solid #a87f0c ;
}

.gradient-pink{
  background: linear-gradient(135deg,#38323810 0%, #2e292a25 100%);

}

.gradient-blue{
  background: linear-gradient(135deg, #4da6f41f 0%, #00f1fe37 100%);

}
.gradient-green{
  background: linear-gradient(135deg, #1c1d1c46 0%, #6a968e25 100%);

}

.gradient-orange{
  background: linear-gradient(135deg ,#fa709917 0%, #fee14028 100%);
}

.gradient-purple{
  background: linear-gradient(135deg, #30d0d03d 0%,#3308672d 100% );
}

.gradient-gray{
  background: linear-gradient(135deg, #30d0d03d 0%,#3308672d 100% );
}
</style>