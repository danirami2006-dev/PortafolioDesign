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

document.addEventListener('DOMContentLoaded', () => {
    const cards = Array.from(document.querySelectorAll('.card-piezas'));
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    
    let currentIndex = 3; // Inicia con fashion.png (posición 3) en el centro

    function actualizarCarrusel() {
        const total = cards.length;

        cards.forEach((card, index) => {
            // Limpiar clases anteriores
            card.className = 'card-piezas';
            
            // Quitar lente de lupa previa si existía
            const oldLens = card.querySelector('.lupa-lens');
            if (oldLens) oldLens.remove();

            // Calcular distancia relativa
            let offset = index - currentIndex;
            if (offset < -Math.floor(total / 2)) offset += total;
            if (offset > Math.floor(total / 2)) offset -= total;

            // Asignar clases de posición
            if (offset === 0) {
                card.classList.add('active');
                // Añadir lente de lupa a la tarjeta activa
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

   document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LÓGICA DE LUPA / ZOOM
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
    // 2. CARRUSEL DE IMÁGENES / CARDS
    // ==========================================
    // NOTA: Asegúrate de tener estas variables o selectores definidos arriba en tu código principal
    const btnImgPrev = document.getElementById('btnImgPrev'); // Cambia el ID según tu HTML
    const btnImgNext = document.getElementById('btnImgNext'); // Cambia el ID según tu HTML

    if (btnImgPrev && btnImgNext && typeof cards !== 'undefined') {
        btnImgPrev.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            actualizarCarrusel();
        });

        btnImgNext.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            actualizarCarrusel();
        });

        actualizarCarrusel();
    }


    // ==========================================
    // 3. CARRUSEL DE VIDEOS
    // ==========================================
    const videos = document.querySelectorAll('.video-item');
    const btnVideoPrev = document.getElementById('btnVideoPrev');
    const btnVideoNext = document.getElementById('btnVideoNext');
    let videoIndex = 0;

    function cambiarVideo(nuevoIndex) {
        if (videos.length === 0) return;

        // Pausar y desactivar el video actual
        if (videos[videoIndex]) {
            videos[videoIndex].pause();
            videos[videoIndex].classList.remove('active');
        }

        // Actualizar índice
        videoIndex = nuevoIndex;

        // Activar el nuevo video
        if (videos[videoIndex]) {
            videos[videoIndex].classList.add('active');
        }
    }

    if (btnVideoPrev && btnVideoNext && videos.length > 0) {
        btnVideoPrev.addEventListener('click', () => {
            let nuevo = (videoIndex - 1 + videos.length) % videos.length;
            cambiarVideo(nuevo);
        });

        btnVideoNext.addEventListener('click', () => {
            let nuevo = (videoIndex + 1) % videos.length;
            cambiarVideo(nuevo);
        });
    }

});
