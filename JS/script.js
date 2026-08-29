// ==========================================
// 1. LÓGICA DE LUPA / ZOOM (ÁMBITO GLOBAL)
// ==========================================
function activarLupa(card, lens) {
    const img = card.querySelector('img');
    if (!img || !lens) return;

    lens.style.backgroundImage = `url('${img.src}')`;

    card.addEventListener('mousemove', (e) => {
        lens.style.display = 'block';
        const rect = card.getBoundingClientRect();

        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        const lensRadius = 65; // Mitad de 130px
        x = Math.max(lensRadius, Math.min(x, rect.width - lensRadius));
        y = Math.max(lensRadius, Math.min(y, rect.height - lensRadius));

        lens.style.left = `${x - lensRadius}px`;
        lens.style.top = `${y - lensRadius}px`;

        const zoomLevel = 2.2;
        lens.style.backgroundSize = `${rect.width * zoomLevel}px ${rect.height * zoomLevel}px`;
        lens.style.backgroundPosition = `-${(x * zoomLevel) - lensRadius}px -${(y * zoomLevel) - lensRadius}px`;
    });

    card.addEventListener('mouseleave', () => {
        lens.style.display = 'none';
    });
}

// ==========================================
// 2. INICIALIZACIÓN DE LA PÁGINA
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------
    // A. BUCLE CONTINUO PARA BANNER INICIAL (VIDEO1 / VIDEO2)
    // ------------------------------------------
    const v1 = document.getElementById('video1');
    const v2 = document.getElementById('video2');

    if (v1 && v2) {
        // Cuando termina el Video 1 -> Reproduce el 2
        v1.addEventListener('ended', function() {
            v2.currentTime = 0;
            v2.play();
            v2.classList.remove('video-oculto');
            v2.classList.add('video-activo');
            v1.classList.remove('video-activo');
            v1.classList.add('video-oculto');
        });

        // Cuando termina el Video 2 -> Reproduce el 1
        v2.addEventListener('ended', function() {
            v1.currentTime = 0;
            v1.play();
            v1.classList.remove('video-oculto');
            v1.classList.add('video-activo');
            v2.classList.remove('video-activo');
            v2.classList.add('video-oculto');
        });
    }

    // ------------------------------------------
    // B. CARRUSEL DE PIEZAS GRÁFICAS / CARDS
    // ------------------------------------------
    const cards = Array.from(document.querySelectorAll('.card-piezas'));
    const btnImgPrev = document.getElementById('btnPrev') || document.getElementById('btnImgPrev');
    const btnImgNext = document.getElementById('btnNext') || document.getElementById('btnImgNext');
    let currentIndex = 3; // Inicia con fashion.png (posición 3) al centro

    function actualizarCarrusel() {
        const total = cards.length;
        if (total === 0) return;

        cards.forEach((card, index) => {
            // Limpiar clases
            card.className = 'card-piezas';

            // Quitar lupa anterior si existía
            const oldLens = card.querySelector('.lupa-lens');
            if (oldLens) oldLens.remove();

            // Calcular distancia relativa
            let offset = index - currentIndex;
            if (offset < -Math.floor(total / 2)) offset += total;
            if (offset > Math.floor(total / 2)) offset -= total;

            // Asignar posición
            if (offset === 0) {
                card.classList.add('active');
                const lens = document.createElement('div');
                lens.classList.add('lupa-lens');
                card.appendChild(lens);
                activarLupa(card, lens);
            } else if (offset === -1) {
                card.classList.add('prev');
            } else if (offset === 1) {
                card.classList.add('next');
            } else if (offset === -2) {
                card.classList.add('extra-left');
            } else if (offset === 2) {
                card.classList.add('extra-right');
            } else {
                card.classList.add('oculta');
            }
        });
    }

    // Eventos para flechas del carrusel de tarjetas
    if (btnImgPrev && btnImgNext && cards.length > 0) {
        btnImgPrev.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            actualizarCarrusel();
        });

        btnImgNext.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = (currentIndex + 1) % cards.length;
            actualizarCarrusel();
        });

        actualizarCarrusel(); // Renderizado inicial
    }

    // ------------------------------------------
    // C. CARRUSEL DE VIDEOS DE PROCESO (NUEVO)
    // ------------------------------------------
    const videos = document.querySelectorAll('.video-item');
    const btnVideoPrev = document.getElementById('btnVideoPrev');
    const btnVideoNext = document.getElementById('btnVideoNext');
    let videoIndex = 0;

    function cambiarVideo(nuevoIndex) {
        if (videos.length === 0) return;

        // Pausar y ocultar el video actual
        if (videos[videoIndex]) {
            videos[videoIndex].pause();
            videos[videoIndex].classList.remove('active');
        }

        videoIndex = nuevoIndex;

        // Mostrar el nuevo video
        if (videos[videoIndex]) {
            videos[videoIndex].classList.add('active');
        }
    }

    // Eventos para flechas de los videos de proceso
    if (btnVideoPrev && btnVideoNext && videos.length > 0) {
        btnVideoPrev.addEventListener('click', (e) => {
            e.preventDefault();
            let nuevo = (videoIndex - 1 + videos.length) % videos.length;
            cambiarVideo(nuevo);
        });

        btnVideoNext.addEventListener('click', (e) => {
            e.preventDefault();
            let nuevo = (videoIndex + 1) % videos.length;
            cambiarVideo(nuevo);
        });
    }

});
