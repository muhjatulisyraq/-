document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown');
    const container = document.getElementById('container');
    const kometElement = document.getElementById('komet');
    const particlesElement = document.getElementById('particles-js');
    const finaltextElement = document.getElementById('final-text');
    let count = 3;

    // Fungsi Hitungan Mundur
    const startCountdown = () => {
        const interval = setInterval(() => {
            count--;
            countdownElement.textContent = count;

            if (count === 0) {
                clearInterval(interval);
                countdownElement.style.opacity = '0'; // Sembunyikan Hitungan
                
                // 1. Transisi Layar Hitam
                container.classList.add('black-screen');
                container.style.justifyContent = 'flex-start'; // Atur posisi untuk komet dari atas

                // 2. Tunda sebelum Animasi Cahaya/Komet
                setTimeout(startKometAndParticles, 1000); 
            }
        }, 1000);
    };

    // Fungsi Komet dan Partikel
    const startKometAndParticles = () => {
        kometElement.style.opacity = '1';
        
        // 3. Komet selesai, mulai Ledakan Partikel
        kometElement.addEventListener('animationend', () => {
            kometElement.style.opacity = '0';
            
            // Konfigurasi Particle.js untuk Ledakan dan Orbit
            particlesJS('particles-js', {
              "particles": {
                "number": { "value": 150, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true, "anim": { "enable": false } },
                "size": { "value": 5, "random": true },
                "line_linked": { "enable": false },
                "move": {
                  "enable": true,
                  // Tipe pergerakan untuk simulasi ledakan awal
                  "speed": 6, 
                  "direction": "none",
                  "random": true,
                  "straight": false,
                  "out_mode": "out",
                  "bounce": false,
                  "attract": { "enable": false }
                }
              },
              "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false } } },
              // Efek Ledakan Awal
              "retina_detect": true,
              "config_demo": { "hide_card": true } 
            });

            particlesElement.style.opacity = '1';

            // 4. Setelah 3 detik, ubah mode pergerakan menjadi Orbit (Gerakan Pelan)
            setTimeout(() => {
                const pJSDom = window.pJSDom[0];
                if (pJSDom) {
                    pJSDom.pJS.particles.move.speed = 0.5; // Perlambat
                    pJSDom.pJS.particles.move.direction = 'circle'; // Arah Orbit
                    pJSDom.pJS.particles.move.random = false;
                    pJSDom.pJS.fn.particlesRefresh();
                }
                
                // 5. Tampilkan Teks Akhir
                finaltextElement.style.opacity = '1';
                container.style.justifyContent = 'center'; // Kembalikan ke tengah
            }, 3000);

        }, { once: true });
    };

    startCountdown();
});
