// ==========================================
// BUCLE CONTINUO PARA VIDEOS DIVIDIDOS
// ==========================================
const videoElement = document.getElementById('videoBanner');
const videoSource = document.getElementById('videoSource');

// Lista con la ruta de tus dos partes
const partesVideo = [
    'video/banner1.mp4',
    'video/banner2.mp4'
];

let indiceActual = 0;

if (videoElement) {
    // Escuchar el evento 'ended' (cuando el video actual termina)
    videoElement.addEventListener('ended', function() {
        // Pasa al siguiente video de la lista (0 -> 1 -> 0 -> 1...)
        indiceActual = (indiceActual + 1) % partesVideo.length;
        
        // Cambia la fuente del video
        videoSource.src = partesVideo[indiceActual];
        
        // Carga y reproduce la nueva parte automáticamente
        videoElement.load();
        videoElement.play();
    });
}
