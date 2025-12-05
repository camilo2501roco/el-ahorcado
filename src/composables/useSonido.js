
const audioAcierto = new Audio('/audio/true.mp3'); 
const audioError = new Audio('/audio/false.mp3');



export function useSonido() {
  
  const playAcierto = () => {
    audioAcierto.currentTime = 0; 
    audioAcierto.play();
  };

  const playError = () => {
    audioError.currentTime = 0;
    audioError.play();
  };

  return { playAcierto, playError };
}