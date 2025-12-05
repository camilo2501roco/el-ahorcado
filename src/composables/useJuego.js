import { reactive, toRefs } from 'vue';

const usuarioGuardado = JSON.parse(localStorage.getItem('jugador_actual') || 'null');
const state = reactive({
  usuario: usuarioGuardado,
  categoria: null,
  nivel: null,
  tiempo: 0,
  timerActivo: null
});

export function useJuego() {
  
  const setUsuario = (nombre) => {
  const nuevoUsuario = { nombre, puntaje: 0 };
    state.usuario = nuevoUsuario;
    
   
    localStorage.setItem('jugador_actual', JSON.stringify(nuevoUsuario));
  };

  const setCategoria = (cat) => state.categoria = cat;
  const setNivel = (niv) => state.nivel = niv;


 const agregarPuntaje = (puntos) => {
    if (state.usuario) {
      state.usuario.puntaje += puntos;
     
      localStorage.setItem('jugador_actual', JSON.stringify(state.usuario));
    }
  };

  const iniciarTimer = () => {
    detenerTimer(); 
    state.tiempo = 0;
    state.timerActivo = setInterval(() => {
      state.tiempo++;
    }, 1000);
  };

  const detenerTimer = () => {
    if (state.timerActivo) {
      clearInterval(state.timerActivo);
      state.timerActivo = null;
    }
  };

  const guardarEnRanking = () => {
    const rankingGuardado = JSON.parse(localStorage.getItem('ahorcado_ranking') || '[]');
    
    
    if (!state.usuario) return;

    const nuevoRegistro = {
      nombre: state.usuario.nombre,
      puntaje: state.usuario.puntaje,
      tiempo: state.tiempo,
      fecha: new Date().toLocaleDateString()
    };

    rankingGuardado.push(nuevoRegistro);
    rankingGuardado.sort((a, b) => {
      if (b.puntaje !== a.puntaje) return b.puntaje - a.puntaje;
      return a.tiempo - b.tiempo;
    });

    const top10 = rankingGuardado.slice(0, 10);
    localStorage.setItem('ahorcado_ranking', JSON.stringify(top10));
  };

  const formatoTiempo = (segundos) => {
    if (!segundos) return "00:00"; 
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60; 
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const reiniciarJuego = () => {
    state.categoria = null;
    state.nivel = null;
    state.tiempo = 0;
    detenerTimer();
  };

  return {
    ...toRefs(state),
    setUsuario, setCategoria, setNivel, agregarPuntaje, reiniciarJuego,
    iniciarTimer, detenerTimer, guardarEnRanking, formatoTiempo
  };
}