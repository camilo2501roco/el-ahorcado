import { createRouter, createWebHashHistory } from "vue-router";
import Intro from "../views/Intro.vue";
import Login from "../views/Login.vue";
import Categoria from "../views/Categoria.vue";
import Nivel from "../views/Nivel.vue";
import Juego from "../views/Juego.vue";
import Ranking from "../views/Ranking.vue";

const routes = [
    { path: "/", component: Intro },
    { path: "/login", component: Login },
    { path: "/categoria", component: Categoria },
    { path: "/nivel", component: Nivel },
    { path: "/juego", component: Juego },
    { path: "/ranking", component: Ranking }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});