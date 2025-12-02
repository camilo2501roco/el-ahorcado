<template>
  <q-page class="flex flex-center" style="z-index: 1;"
  >
  <q-card class="login-card q-pa-lg">
    <q-card-section class="text-center">
<div class="text-h4 text-weight-bold q-mb-sm">Bienvenido</div>
<div class="text-subtitle1 text-grey-3">ingresa tu nombre para jugar</div>
    </q-card-section>

    <q-card-section>
      <q-form @submit.prevent="iniciar" class="q-gutter-md">
        <q-input v-model="nombre"
        dark outlined label="Nombre de usuario"
        :rules="[val => !! val || 'Requerido', val => val.length >= 3 
        || 'Minimo 3 letras']">
<template v-slot:prepend><q-icon name="person"/></template>
        </q-input>
<q-btn type="submit" label="jugar" color="primary" 
class="full-width" size="lg" rounded unelevated/>

<q-btn label="volver" color="white" flat class="full-width" to="/" rounded/>


      </q-form>
    </q-card-section>
  </q-card>
  </q-page>
</template>



<script setup>
import { ref } from 'vue';
import{useRouter} from 'vue-router';
import {useJuego} from '../composables/useJuego.js'



const router = useRouter();
const{setUsuario} = useJuego()
const nombre = ref('');



const iniciar = () =>{
  setUsuario(nombre.value);
  router.push('/categoria');
}


</script>


<style scoped
>

.login-card{
  width: 100%;
  max-width: 400px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.2);
}
</style>