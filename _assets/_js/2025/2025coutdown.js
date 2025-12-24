function actualizarContador() {
  const fechaEvento = new Date("June 29, 2026 00:00:00").getTime();
  const ahora = new Date().getTime();
  const diferencia = fechaEvento - ahora;

  if (diferencia < 0) {
      document.getElementById("countdown").innerHTML = "¡El evento ha comenzado!";
      return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML = 
      `<div class="count-item"><span>${dias}</span><small>Días</small></div>
       <div class="count-item"><span>${horas}</span><small>Horas</small></div>
       <div class="count-item"><span>${minutos}</span><small>Min</small></div>
       <div class="count-item"><span>${segundos}</span><small>Seg</small></div>`;
}

setInterval(actualizarContador, 1000);
actualizarContador(); // Llamada inicial
