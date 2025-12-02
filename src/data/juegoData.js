export const CATEGORIAS = [
  {
    id: 1, nombre: 'Frutas', icono: '🍎',
    palabras: {
      facil: ['MANGO', 'PERA', 'UVA', 'LIMON', 'COCO', 'KIWI'],
      medio: ['NARANJA', 'MANZANA', 'PLATANO', 'CEREZA'],
      dificil: ['MARACUYA', 'GRANADILLA', 'MANDARINA', 'FRAMBUESA']
    }
  },
  {
    id: 2, nombre: 'Animales', icono: '🐻',
    palabras: {
      facil: ['PERRO', 'GATO', 'LEON', 'OSO', 'LOBO', 'PATO'],
      medio: ['ELEFANTE', 'JIRAFA', 'TIGRE', 'CABALLO'],
      dificil: ['RINOCERONTE', 'HIPOPOTAMO', 'ORANGUTAN', 'COCODRILO']
    }
  },
  {
    id: 3, nombre: 'Países', icono: '🌍',
    palabras: {
      facil: ['PERU', 'CHILE', 'CUBA', 'INDIA', 'CHINA'],
      medio: ['COLOMBIA', 'ARGENTINA', 'ALEMANIA', 'PORTUGAL'],
      dificil: ['UZBEKISTAN', 'KAZAJISTAN', 'AZERBAIJAN', 'MADAGASCAR']
    }
  },
  {
    id: 4, nombre: 'Deportes', icono: '⚽',
    palabras: {
      facil: ['FUTBOL', 'TENIS', 'GOLF', 'BOXEO'],
      medio: ['BALONCESTO', 'VOLEIBOL', 'NATACION'],
      dificil: ['HALTEROFILIA', 'ESGRIMA', 'TAEKWONDO']
    }
  },
  {
    id: 5, nombre: 'Películas', icono: '🎬',
    palabras: {
      facil: ['TITANIC', 'AVATAR', 'FROZEN', 'COCO'],
      medio: ['INCEPTION', 'GLADIADOR', 'MATRIX'],
      dificil: ['SHAWSHANK', 'PULPFICTION', 'GOODFELLAS']
    }
  },
  {
    id: 6, nombre: 'Ciencia', icono: '🔬',
    palabras: {
      facil: ['ATOMO', 'CELULA', 'VIRUS', 'PLANTA'],
      medio: ['ELECTRON', 'MOLECULA', 'BACTERIA'],
      dificil: ['MITOCONDRIA', 'CROMOSOMA', 'FOTOSINTESIS']
    }
  }
];

export const NIVELES = [
  { id: 1, nombre: 'Fácil', emoji: '😊', descripcion: 'Palabras cortas', intentos: 6, dificultad: 'facil', color: 'green' },
  { id: 2, nombre: 'Medio', emoji: '😐', descripcion: 'Palabras medias', intentos: 5, dificultad: 'medio', color: 'orange' },
  { id: 3, nombre: 'Difícil', emoji: '😤', descripcion: 'Palabras largas', intentos: 4, dificultad: 'dificil', color: 'red' }
];