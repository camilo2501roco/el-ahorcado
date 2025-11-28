<template>
  <q-page class="flex flex-center login-page">
    <div class="login-container">
      <q-card class="login-card">
        <q-card-section class="text-center q-pb-none">
         
          <div class="text-h4 text-weight-bold q-mb-sm text-grey-1">Bienvenido al Ahorcado</div>
          <div class="text-subtitle1 text-grey-1">Ingresa tu nombre para jugar</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="iniciarSesion" class="q-gutter-md">
         
            <q-input
              v-model="nombreUsuario"
              label="Nombre de usuario"
              placeholder="Ingresa tu nombre"
              outlined
              autofocus
              :rules="[
                val => val && val.length > 0 || 'El nombre es requerido',
                val => val && val.length >= 3 || 'Mínimo 3 caracteres'
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>

        
            <div class="q-gutter-sm">
              <q-btn
                type="submit"
                label="Iniciar Juego"
                color="primary"
                class="full-width"
                size="lg"
                rounded
                unelevated
              />
              
              <q-btn
                label="Volver"
                color="grey-7"
                class="full-width"
                size="md"
                rounded
                outline
                to="/"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const nombreUsuario = ref('');


onMounted(() => {
  const usuarioActual = localStorage.getItem('usuarioActual');
 
});

const iniciarSesion = () => {
  if (!nombreUsuario.value || nombreUsuario.value.length < 3) {
    alert('Por favor ingresa un nombre válido (mínimo 3 caracteres)');
    return;
  }


  const usuario = {
    nombre: nombreUsuario.value,
    fechaRegistro: new Date().toISOString(),
    partidasJugadas: 0,
    partidasGanadas: 0,
    puntajeTotal: 0
  };

 
  localStorage.setItem('usuarioActual', JSON.stringify(usuario));


  router.push('/categoria');
};
</script>

<style scoped>
.login-page {
 background: linear-gradient(135deg, #a87f0c 0%, #171060) 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.login-page::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: moveBackground 20s linear infinite;
}

@keyframes moveBackground {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

.login-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 450px;
  padding: 20px;
}

.login-card {
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.3);
  animation: slideIn 0.5s ease-out;
    background: linear-gradient(135deg,#39129c 0%, #4490dc76 100%);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>