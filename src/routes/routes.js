
import Categoria from "../views/Categoria.vue";
import Juego from "../views/Juego.vue";
import Intro from "../views/Intro.vue";
import Nivel from "../views/Nivel.vue";
import Login from "../views/Login.vue";
import { createRouter,createWebHashHistory } from "vue-router";


const routes =[
    {path: "/juego", component:Juego},
   {path: "/nivel", component:Nivel},
   {path:"/login", component:Login},
    {path: "/categoria", component:Categoria},
      {path:"/",component:Intro}
]

export const router = createRouter({
    history:createWebHashHistory(),
    routes
})