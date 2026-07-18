document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-reel-toggle]').forEach(function (button) {
        var reel = document.getElementById(button.dataset.reelId);
        if (!reel || !window.bootstrap) {
            return;
        }

        var carousel = bootstrap.Carousel.getOrCreateInstance(reel);
        var count = reel.querySelector('.photo-reel__count');
        var slides = Array.from(reel.querySelectorAll('.carousel-item'));

        button.addEventListener('click', function () {
            var isPaused = button.getAttribute('aria-pressed') === 'true';

            if (isPaused) {
                carousel.cycle();
                button.textContent = 'Pause';
                button.setAttribute('aria-pressed', 'false');
            } else {
                carousel.pause();
                button.textContent = 'Resume';
                button.setAttribute('aria-pressed', 'true');
            }
        });

        reel.addEventListener('slid.bs.carousel', function (event) {
            if (count) {
                count.textContent = String(event.to + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
            }
        });

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            carousel.pause();
            button.textContent = 'Resume';
            button.setAttribute('aria-pressed', 'true');
        }
    });
});
