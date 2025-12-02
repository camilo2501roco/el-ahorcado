<template>
  <q-layout view="lHh Lpr lFf" class="app-container">

    <q-page-container>
      <router-view v-slot="{Component}">
        <Transition name="fade" mode="out-in">
          <component :is="Component"/>

        </Transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>



<style>
body, .app-container{
  overflow-x: hidden;
  background: linear-gradient(135deg,#a87f0c 0%, #171060)100%;
  color: white;
  min-height: 100vh;

}
.app-container::before{
  content: '';
  position: fixed;
  top: 0; left: 0; width: 200%; height: 200%;
  background: radial-gradient(circle,rgba(255,255,255,0.1)1px, transparent 1px);
  background-size: 50px 50px;
  animation: moveBackground 20s linear infinite;
  z-index: 0;
  pointer-events: none;
}

@keyframes moveBackground{
  0%{ transform: translate(0,0);}
  100%{transform: translate(50px,50px);}
}


.fade-enter-active, .fade-leave-active{
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to{
  opacity: 0;
}
</style>