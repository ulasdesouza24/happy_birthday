document.addEventListener('DOMContentLoaded', () => {
    // Geri Sayım Sayacı
    const countDownDate = new Date("Jul 22, 2025 00:00:00").getTime();
    const revealOverlay = document.getElementById('reveal-overlay');
    const countdownElement = document.getElementById("countdown");

    // Geri sayımı siyah katmanın içine taşı
    if (revealOverlay && countdownElement) {
        revealOverlay.appendChild(countdownElement);
    }

    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (countdownElement) {
            countdownElement.innerHTML = `
                <div><span>${days}</span><span class="label">Gün</span></div>
                <div><span>${hours}</span><span class="label">Saat</span></div>
                <div><span>${minutes}</span><span class="label">Dakika</span></div>
                <div><span>${seconds}</span><span class="label">Saniye</span></div>
            `;
        }

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.body.classList.add('revealed');
            // Geri sayım sayacını eski yerine taşıyıp doğum günü mesajını göster
            const container = document.querySelector('.container');
            if(container) {
                container.insertBefore(countdownElement, container.firstChild.nextSibling);
                countdownElement.innerHTML = "<h2>Doğum Günün Kutlu Olsun! 🎉</h2>";
                // Rengini de normale döndürelim
                countdownElement.style.color = "#333";
            }
        }
    }, 1000);


    // Uçan Resimler
    const container = document.getElementById('floating-images-container');
    const imageSources = [
        'iskender1.jpeg',
        'iskender2.jpeg',
        'iskender3.jpeg'
    ];
    // Mobil cihaz kontrolü
    const isMobile = window.innerWidth <= 600;
    const imageCount = isMobile ? 10 : 20; // Mobilse 10, değilse 20 resim

    function createImage() {
        const img = document.createElement('img');
        img.className = 'floating-image';
        img.src = imageSources[Math.floor(Math.random() * imageSources.length)];
        
        // Rastgele başlangıç pozisyonu ve animasyon değişkenleri
        const startX = Math.random() * window.innerWidth;
        const endX = Math.random() * window.innerWidth;
        const delay = Math.random() * -20; // Animasyonların farklı zamanlarda başlaması için
        const duration = 15 + Math.random() * 10; // 15-25 saniye arası süre

        img.style.left = `${startX}px`;
        img.style.setProperty('--x-start', `${startX}px`);
        img.style.setProperty('--x-end', `${endX}px`);
        img.style.animationDelay = `${delay}s`;
        img.style.animationDuration = `${duration}s`;
        
        // Eski resmi yenisiyle değiştirmek için
        img.addEventListener('animationiteration', () => {
            container.removeChild(img);
            createImage();
        });
        
        container.appendChild(img);
    }

    for (let i = 0; i < imageCount; i++) {
        createImage();
    }
});

document.getElementById('specialButton').addEventListener('click', function() {
    const hiddenMessage = document.getElementById('hiddenMessage');
    const jujutsuImage = document.getElementById('jujutsu-image');
    const leftText = document.getElementById('left-text');
    const rightText = document.getElementById('right-text');

    // Mesaj kutusunu görünür yap ama içindekiler başlangıçta animasyonlu olacak
    hiddenMessage.classList.add('show');
    
    // Animasyonları tetikle
    setTimeout(() => {
        jujutsuImage.classList.add('spin');
        leftText.classList.add('slide-in');
        rightText.classList.add('slide-in');
    }, 100); // Küçük bir gecikme animasyonun düzgün başlamasını sağlar

    // Konfeti animasyonunu başlat
    const confettiCanvas = document.getElementById('confetti');
    const myConfetti = confetti.create(confettiCanvas, {
        resize: true,
        useWorker: true
    });
    
    myConfetti({
        particleCount: 150,
        spread: 180
    });

    // Butonları gizle
    document.querySelector('.buttons-container').style.display = 'none';
}); 
