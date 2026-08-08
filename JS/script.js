// ==========================================
// BUCLE CONTINUO PARA VIDEOS DIVIDIDOS
// ==========================================
const v1 = document.getElementById('video1');
const v2 = document.getElementById('video2');

if (v1 && v2) {
    // Cuando termina el Video 1 -> Reproduce el 2 y oculta el 1
    v1.addEventListener('ended', function() {
        v2.currentTime = 0; // Reinicia el video 2 al inicio
        v2.play();
        
        v2.classList.remove('video-oculto');
        v2.classList.add('video-activo');
        
        v1.classList.remove('video-activo');
        v1.classList.add('video-oculto');
    });

    // Cuando termina el Video 2 -> Reproduce el 1 y oculta el 2
    v2.addEventListener('ended', function() {
        v1.currentTime = 0; // Reinicia el video 1 al inicio
        v1.play();
        
        v1.classList.remove('video-oculto');
        v1.classList.add('video-activo');
        
        v2.classList.remove('video-activo');
        v2.classList.add('video-oculto');
    });
}
